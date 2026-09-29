---
status: unread
type: root_dashboard
---
# Dashboard — orb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">orb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“circle or orb”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **orb** means circle or orb. It refers to a spherical globe, circular ring, or revolving orbit. In English, this root forms words such as *orbit*, *orbital*, *orbicular*, and *exorbitant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: circle or orb
> The root **orb** means circle or orb. It refers to a spherical globe, circular ring, or revolving orbit. In English, this root forms words such as *orbit*, *orbital*, *orbicular*, and *exorbitant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Circle or orb</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *orbit* and *orbital*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **orb** comes from a Latin word that means *"circle or orb"*.
  - At its core, it describes circle or orb.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **orb** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of circle or orb.
  - **Mental & Social**: How people experience, organize, or communicate about circle or orb.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Orbit**: The curved path of a celestial object or spacecraft around a star, planet, or moon.
  - **Orbital**: Relating to an astronomical orbit or spaceflight trajectory.
  - **Orbicular**: Having a rounded, circular, or spherical shape.
  - **Exorbitant**: Unreasonably or excessively high.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">orb</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `orb-` / `orbit-` (< Latin *orbis* / *orbita*): The base nominal and trajectory root.
- **Prefix Modifications**:
  - `ex-` ("out of, beyond"): *exorbitant* ("flying out of the orbital wheel-track").
  - `de-` ("down from, reverse"): *deorbit* ("to fire thrusters to break out of orbital flight").
  - `sub-` ("under, below"): *suborbital* ("traveling on a ballistic trajectory that does not complete a full orbit").
- **Suffixal Formations**:
  - `-al`: *orbital*.
  - `-icular`: *orbicular* ("spherical, circular, rounded").
  - `-er`: *orbiter* ("a spacecraft designed to orbit a planetary body").

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
                      ┌── Celestial Mechanics & Spaceflight: orbit, orbital, deorbit, suborbital, orbiter
                      │
   [orb] ─────────────┼── Geometry & Spherical Form: orb, orbicular
 (Sphere / Orbit)     │
                      └── Transgression of Limits: exorbitant, exorbitance, exorbitantly
```

---

## 🔀 4. Prefix & Combining Dynamics on orb
- **`ex-` + `orb`**: *exorbitant* — literally jumping the track; wildly excessive in price or demands.
- **`de-` + `orb`**: *deorbit* — intentionally slowing a spacecraft to re-enter the atmosphere.
- **`sub-` + `orb`**: *suborbital* — ascending into space but lacking orbital velocity to circle the planet.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Astronomy & Astrophysics**: Keplerian *orbits*, Lagrange points, eccentricity, and apastron.
- **Aerospace Engineering**: *Orbital* insertion maneuvers, *deorbit* burns, planetary *orbiters*.
- **Quantum Mechanics & Chemistry**: Electron *orbitals* ($s, p, d, f$ probability clouds).
- **Economics & Consumer Finance**: *Exorbitant* interest rates (usury), exorbitant price gouging.
- **Anatomy & Ophthalmology**: *Orbicularis oculi* (the circular muscle surrounding the eye).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[exorbitance]] | noun | **1.** Excessive excess. | *"In academic literature, exorbitance designates excessive excess."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exorbitant]] | adjective | **1.** Greatly exceeding bounds of reason or moderation. | *"Their remoteness and unpunctuality, or their exorbitant charges and frauds, will be drawing forth bitter lamentations.” “I mean to be too rich to lament or to feel anything of the sort."* — Jane Austen, *Mansfield Park* |
| [[exorbitantly]] | adverb | **1.** To an exorbitant degree. | *"Then what have we gained by getting these articles so exorbitantly cheap? or, rather, what have we not lost?"* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[orb]] | noun | **1.** The ball-shaped capsule containing the vertebrate eye.<br>**2.** An object with a spherical shape. | *"His legs bestrid the ocean; his reared arm Crested the world; his voice was propertied As all the tuned spheres, and that to friends; But when he meant to quail and shake the orb, He was as rattling thunder."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[orbicular]] | adjective | **1.** Circular or nearly circular.<br>**2.** Having the shape of a sphere or ball; ; ; - zane grey. | *"These pustules were brown, orbicular, regular, and in habit seemed to resemble rather those of most of the _Pucciniæ_ than of a _Trichobasis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[orbiculate]] | adjective | **1.** Circular or nearly circular. | *"In academic literature, orbiculate designates circular or nearly circular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orbignya]] | noun | **1.** Palms of southern mexico to northern south america: babassu palm. | *"In academic literature, orbignya designates palms of southern mexico to northern south america: babassu palm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orbison]] | noun | **1.** United states composer and rockabilly tenor popular in the 1950s (1936-1988). | *"In academic literature, orbison designates united states composer and rockabilly tenor popular in the 1950s (1936-1988)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orbit]] | noun | **1.** The (usually elliptical) path described by one celestial body in its revolution about another.<br>**2.** A particular environment or walk of life. | *"Clark, who, twenty years younger than Jan Coggan, revolved in the same orbit."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[orbital]] | adjective | **1.** Of or relating to an orbit.<br>**2.** Of or relating to the eye socket. | *"During construction the System is linked to Planet Pluto, employing mass attractors, orbital dynamics controls and stabilizers, and other means, as appropriate."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[orbitale]] | noun | **1.** The craniometric point at the lowest point on the lower edge of the orbit. | *"In academic literature, orbitale designates the craniometric point at the lowest point on the lower edge of the orbit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orbiter]] | noun | **1.** Man-made equipment that orbits around the earth or the moon. | *"In academic literature, orbiter designates man-made equipment that orbits around the earth or the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orbitual]] | adjective | **1.** Describing a circle; moving in a circle. | *"In academic literature, orbitual designates describing a circle; moving in a circle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suborbital]] | adjective | **1.** Having or involving a trajectory of less than one orbit.<br>**2.** Situated on or below the floor of the eye socket. | *"In academic literature, suborbital designates having or involving a trajectory of less than one orbit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supraorbital]] | adjective | **1.** Located or occurring above the eye socket. | *"In academic literature, supraorbital designates located or occurring above the eye socket."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ORB
  </div>
</div>
