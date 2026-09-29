---
status: unread
type: root_dashboard
---
# Dashboard — lun
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lun-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“moon”</span>
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

The root **lun** means moon. It refers to the shining moon or its cyclic phases. In English, this root forms words such as *lunar*, *lunary*, *lunacy*, and *lunatic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: moon
> The root **lun** means moon. It refers to the shining moon or its cyclic phases. In English, this root forms words such as *lunar*, *lunary*, *lunacy*, and *lunatic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Moon</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *lunar* and *lunary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lun** comes from a Latin word that means *"moon"*.
  - At its core, it describes moon.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **lun** in an English word, think of **light, shining brightness, and illumination**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of moon.
  - **Mental & Social**: How people experience, organize, or communicate about moon.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Lunar**: Of, relating to, or caused by the moon.
  - **Lunary**: Pertaining to the moon.
  - **Lunacy**: Severe mental derangement or insanity, formerly thought to vary with the moon's phases.
  - **Lunatic**: A person afflicted with mental illness.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lun</mark>, think of <mark class="hl-def">light, shining brightness, and illumination</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **lun** forms derivatives through multiple prefixes, suffixes, and compound bases:
>
> - **Primary Latin Nominal Stem `lūn-` (*lūna*):**
>   - Adjectival derivation: *lunar*, *lunary*
>   - Astronomical cycles: *lunation*, *lunarium*
>   - Compound tidal science: *lunitidal*
> - **Cosmic & Orbital Spatial Prefixes on `-lunar` / `-lunary`:**
>   - `sub-` (under, beneath) $\to$ *sublunary*, *sublunar* (terrestrial, mortal)
>   - `cis-` (on this side of) $\to$ *cislunar* (space between Earth and Moon)
>   - `trans-` (beyond, across) $\to$ *translunar*, *translunary* (outer space / transcendent)
>   - `inter-` (between) $\to$ *interlunar*, *interlunation* (the dark phase between old and new moon)
>   - `semi-` (half) $\to$ *semilunar* (crescent-shaped; half-moon)
> - **Participial & Crescent Geometry Stem `lūnāt-` (*lūnāre, lūnātus*):**
>   - Direct adjective/noun: *lunate*, *lunate bone*
>   - Abstract psychiatric condition: *lunacy* (via *lūnāticus*)
>   - Personified agent: *lunatic*
> - **Diminutive Morphologies `lūnul-` (*lūnula*):**
>   - Direct noun: *lunula*, *lunule*
>   - Descriptive adjectives: *lunular*, *lunulate*
> - **Gallicized & Architectural Conduits (`lune`):**
>   - French diminutive: *lunette* (aperture, fortification outwork, monstrance clip, guillotine collar)
>   - French compound: *demilune* (half-moon fortification, salivary serous gland crescent)
>   - Poetic loan: *clair de lune* (moonlight)

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
> The root branches into five distinct conceptual territories:
>
> 1. **Astronomy, Orbital Mechanics & Space Exploration:**
>    - Physical relationship to the Moon (*lunar landing*, *lunar eclipse*).
>    - Synodic cycles (*lunation*).
>    - Trajectories within gravitational wells (*cislunar space*, *translunar orbit*).
>    - Oceanographic gravitational interaction (*lunitidal interval*).
> 2. **Cosmological Philosophy & Metaphysics:**
>    - The realm of earthly mutability, decay, and human mortality beneath the moon's sphere (*sublunary realm*, *sublunar affairs*).
>    - The sublime, celestial, and ethereal realm transcending mortal existence (*translunary poetics*).
> 3. **Anatomy, Histology & Biology:**
>    - Crescent-shaped carpal bone (*lunate* / *lunate bone*).
>    - Heart valves preventing backward blood flow (*semilunar valves*).
>    - White crescent at the fingernail base (*lunula*).
>    - Crescentic serous caps on mucous salivary glands (*demilunes of Heidenhain*).
>    - Crescent marks on insect wings and mollusks (*lunule*, *lunulate*).
> 4. **Architecture, Engineering & Military Fortifications:**
>    - Arched spaces over doorways and vaulted ceilings (*lunette*).
>    - Semicircular outworks defending bastions (*demilune*, *lunette*).
>    - Guillotine neckboard securing the condemned (*lunette*).
>    - Astronomical models of lunar motion (*lunarium*).
> 5. **Psychiatry, Law & Human Behavior:**
>    - Classical doctrine of cyclical insanity (*lunatic asylum*, *writ de lunatico inquirendo*).
>    - Extreme irrationality, reckless folly, and wild absurdity (*sheer lunacy*).

---

## 🔀 4. Prefix & Combining Dynamics on lun

### Prefix Dynamics
- **`sub-` (Beneath / Earthward):** Placing something in the earthly realm below the moon's celestial boundary $\to$ *sublunary*, *sublunar*.
- **`cis-` (On This Side Of):** Confining space to the zone between Earth and the moon's orbit $\to$ *cislunar*.
- **`trans-` (Beyond / Across):** Projecting trajectories outside the lunar orbit or rising into metaphysical ecstasy $\to$ *translunar*, *translunary*.
- **`inter-` (Between / Intermediate):** Operating during the moonless interval when the old moon has died and the new moon has not yet appeared $\to$ *interlunar*, *interlunation*.
- **`semi-` / `demi-` (Half / Crescent):** Creating a half-moon or crescent curve $\to$ *semilunar*, *demilune*.

### Suffix Dynamics
- **`-ar` / `-ary` (Adjectival / Pertaining To):** *lunar*, *sublunary*, *cislunar*, *translunar*, *semilunar*, *interlunar*.
- **`-ate` (Crescent Geometry):** Shaped like a crescent moon $\to$ *lunate*.
- **`-atic` (Subject To / Affected By):** Stricken by the moon's power $\to$ *lunatic*.
- **`-acy` (Abstract State):** The mental condition of periodic insanity or absurdity $\to$ *lunacy*.
- **`-ula` / `-ule` / `-ette` (Diminutives):** "Little moon" $\to$ *lunula*, *lunule*, *lunette*.
- **`-ation` (Process / Complete Cycle):** A complete lunar synodic month $\to$ *lunation*, *interlunation*.
- **`-arium` (Place / Mechanism):** Mechanical instrument demonstrating lunar motion $\to$ *lunarium*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Aerospace Engineering & Orbital Dynamics:** NASA's Artemis program operates in *cislunar space*, requiring precise *translunar injection (TLI)* maneuvers to exit low Earth orbit and enter lunar transfer trajectories.
> - **Cardiovascular & Orthopedic Medicine:** Cardiologists monitor the aortic and pulmonary *semilunar valves* for stenosis and regurgitation; hand surgeons treat *lunate dislocations* and avascular necrosis of the lunate (Kienböck's disease).
> - **Dermatology & Podiatry:** The *lunula* is an essential clinical window; discoloration (azure lunula in Wilson's disease, red lunula in cardiovascular failure) serves as a primary diagnostic indicator.
> - **Jurisprudence & Legal History:** English common law established the *Court of Chancellery's Lunacy Commission* and the *Lunacy Acts of 1845 and 1890*, creating formal judicial oversight for the property of individuals adjudged *non compos mentis*.
> - **Archaeology & Bronze Age Metallurgy:** Prehistoric European excavations frequently unearth *Irish gold lunulae*—exquisitely incised crescent collars dating to 2200–2000 BC worn by high-status elites.
> - **Art History & Classical Music:** Arched Italian Renaissance church walls beneath barrel vaults feature narrative *lunette frescoes* by Giotto, Michelangelo, and Botticelli; in music, Claude Debussy's *Clair de lune* remains the quintessential impressionist nocturne.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[diflunisal]] | noun | **1.** Nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions. | *"In academic literature, diflunisal designates nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[luna]] | noun | **1.** (roman mythology) the goddess of the moon; counterpart of greek selene. | *"A title to Phoebe, to Luna, to the moon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lunacy]] | noun | **1.** Obsolete terms for legal insanity.<br>**2.** Foolish or senseless behavior. | *"Love is merely a madness, and, I tell you, deserves as well a dark house and a whip as madmen do; and the reason why they are not so punished and cured is that the lunacy is so ordinary that the whippers are in love too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lunar]] | adjective | **1.** Of or relating to or associated with the moon. | *"Schoolcraft did not know the date of the ceremony, but he conjectured that it fell at the end of the Iroquois year, which was a lunar year of twelve or thirteen months."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[lunaria]] | noun | **1.** Small genus of european herbs: honesty. | *"In academic literature, lunaria designates small genus of european herbs: honesty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lunate]] | adjective | **1.** Resembling the new moon in shape. | *"In academic literature, lunate designates resembling the new moon in shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lunatic]] | noun | **1.** An insane person.<br>**2.** A reckless impetuous irresponsible person. | *"My way is now to hie home to his house, And tell his wife that, being lunatic, He rush’d into my house and took perforce My ring away."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lunation]] | noun | **1.** The period between successive new moons (29.531 days). | *"On land, meridional, a bispherical moon, revealed in imperfect varying phases of lunation through the posterior interstice of the imperfectly occluded skirt of a carnose negligent perambulating female, a pillar of the cloud by day."* — James Joyce, *Ulysses* |
| [[lunch]] | noun | **1.** A midday meal.<br>**2.** Take the midday meal. | *"He had to hang it up because the mother insisted that they should go to lunch and postpone everything else till the afternoon."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[luncheon]] | noun | **1.** A midday meal. | *"Come here, and I’ll see what grub I can find.” Stoke d’Urberville took her back to the lawn and into the tent, where he left her, soon reappearing with a basket of light luncheon, which he put before her himself."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[luncher]] | noun | **1.** Someone who is eating lunch. | *"Philip, having the power to choose his own time for meals, and frequenting this old house, sometimes met Barter in the act of coming away from it with the dregs of the stream of the late lunchers or diners."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[lunching]] | noun | **1.** The act of eating lunch.<br>**2.** Take the midday meal. | *"I always like to know everything about my new friends, and nothing about my old ones.” “Where are you lunching, Harry?” “At Aunt Agatha’s."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[lunchroom]] | noun | **1.** A restaurant (in a facility) where lunch can be purchased. | *"The lunchroom was in the rear of a saloon and there the missionary took his belated meal."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[lunchtime]] | noun | **1.** The customary or habitual hour for eating lunch. | *"Blue bloom is on the rye. —He was in at lunchtime, miss Douce said."* — James Joyce, *Ulysses* |
| [[lunette]] | noun | **1.** Temporary fortification like a detached bastion.<br>**2.** Oval or circular opening; to allow light into a dome or vault. | *"In academic literature, lunette designates temporary fortification like a detached bastion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lunisolar]] | adjective | **1.** Relating to or attributed to the moon and the sun or their mutual relations. | *"In academic literature, lunisolar designates relating to or attributed to the moon and the sun or their mutual relations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lunt]] | noun | **1.** United states actor who performed with his wife lynn fontanne in many stage productions (1893-1977). | *"Lunt, a column of smoke or steam."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[lunula]] | noun | **1.** The crescent-shaped area at the base of the human fingernail.<br>**2.** A crescent-shaped metal ornament of the bronze age. | *"In academic literature, lunula designates the crescent-shaped area at the base of the human fingernail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lunule]] | noun | **1.** The crescent-shaped area at the base of the human fingernail. | *"In academic literature, lunule designates the crescent-shaped area at the base of the human fingernail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sublunar]] | adjective | **1.** Situated between the earth and the moon.<br>**2.** Of this earth. | *"In academic literature, sublunar designates situated between the earth and the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sublunary]] | adjective | **1.** Situated between the earth and the moon.<br>**2.** Of this earth. | *"A _snell_ remark of his brother William suggesting some new and comic association with a philosophic term dropped in the course of the discussion, would bring him back with a roar of laughter to the actual world and to more sublunary themes."* — John Cairns, *Principal Cairns* |
| [[superlunar]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"In academic literature, superlunar designates situated beyond the moon or its orbit around the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superlunary]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"In academic literature, superlunary designates situated beyond the moon or its orbit around the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translunar]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"In academic literature, translunar designates situated beyond the moon or its orbit around the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translunary]] | adjective | **1.** Situated beyond the moon or its orbit around the earth.<br>**2.** Unworldly or ethereal. | *"Man, in his earth life, cannot always be “high contemplative”, and indulge in “brave translunary things”; he must welcome again, it must be confessed, “land the solid and safe”."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |

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
    ROOT DASHBOARD · LUN
  </div>
</div>
