---
status: unread
type: root_dashboard
---
# Dashboard — centr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">centr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“center”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **centr** means center. It refers to the central midpoint, core, or hub of something. In English, this root forms words such as *kentron*, *central*, *centralize*, and *concentrate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: center
> The root **centr** means center. It refers to the central midpoint, core, or hub of something. In English, this root forms words such as *kentron*, *central*, *centralize*, and *concentrate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Center</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *kentron* and *central*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **centr** comes from a Latin word that means *"center"*.
  - At its core, it describes center.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **centr** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of center.
  - **Mental & Social**: How people experience, organize, or communicate about center.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Kentron**: An everyday English word showing the root's idea of *center*.
  - **Central**: At the point that is equally distant from the edges.
  - **Centralize**: To concentrate control of an activity or organization under a single authority.
  - **Concentrate**: To focus all one's attention or mental effort on a particular object or activity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">centr</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Greek κέντρον (compass prick) ──> Latin centrum (geometric center)
  │
  ├── Physical & Geometric Foundations
  │     ├── center / central (core, middle)
  │     ├── com- + centrum ─────────> concentric (sharing the same center)
  │     ├── epi- + centrum ─────────> epicenter (surface point above quake focus)
  │     └── Physics: centrifugal (fleeing center) / centripetal (seeking center)
  │
  ├── Cognitive & Organizational Dynamics
  │     ├── con- + centrum + -ate ──> concentrate, concentration
  │     ├── centralize ─────────────> centralization
  │     └── de- + centralize ───────> decentralize, decentralization
  │
  └── Deviation from the Norm
        └── ek- + kentron ──────────> eccentric, eccentricity
```

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

### Contextual Arenas
1. **Geometry & Astronomy**: *central*, *concentric*, *eccentric* (midpoints, concentric rings, non-circular orbits).
2. **Physics & Mechanics**: *centrifugal*, *centripetal* (forces acting away from or toward the center of curvature).
3. **Cognitive Focus & Chemistry**: *concentrate*, *concentration* (deep mental focus; ratio of solute in a solution).
4. **Governance & Organizational Structure**: *centralize*, *decentralize* (gathering or dispersing administrative power).
5. **Geology & Natural Disasters**: *epicenter* (the focal ground point of seismic ruptures).
6. **Psychology & Character**: *eccentric*, *eccentricity* (unconventional, peculiar personality).

---

## 🔀 4. Prefix & Combining Dynamics on centr

### Prefix Variations
- **con- / com- ("together, with")**: *concentric* (circles sharing a center); *concentrate* (drawing all thoughts or substances to a center).
- **de- ("away from, reverse")**: *decentralize* (dispersing authority away from the central hub).
- **ek- / ec- ("out of, off")**: *eccentric* (literally, out of the center, unconventional).
- **epi- ("upon, above")**: *epicenter* (the point on the earth's crust directly above the earthquake focus).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Real-World Application | Key Vocabulary |
| :--- | :--- | :--- |
| **Physics & Engineering** | Centrifugal pumps, centrifuges, orbital mechanics | *centrifugal*, *centripetal*, *concentric* |
| **Political Science & Management** | Federalism vs unitarism, corporate reorganizations | *centralize*, *decentralize*, *centralization* |
| **Geophysics & Seismology** | Fault rupture mapping, earthquake intensity reporting | *epicenter*, *hypocenter* |
| **Psychology & Neuroscience** | Sustained attention span, neurodivergence, idiosyncratic habits | *concentrate*, *concentration*, *eccentric* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[central]] | noun | **1.** A workplace that serves as a telecommunications facility where lines from telephones can be connected together to permit communication.<br>**2.** Serving as an essential component. | *"They were about to disperse, when a smart footstep, entering the porch and coming up the central passage, arrested their attention."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[centralisation]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"In academic literature, centralisation designates the act of consolidating power under a central control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralise]] | verb | **1.** Make central. | *"In academic literature, centralise designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralised]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"In academic literature, centralised designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralising]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"In academic literature, centralising designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralism]] | noun | **1.** The political policy of concentrating power in a central organization. | *"In academic literature, centralism designates the political policy of concentrating power in a central organization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralist]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralist designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralistic]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralistic designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrality]] | noun | **1.** The property of being central. | *"In academic literature, centrality designates the property of being central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralization]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"By this means the reserves of the several district banks may be "piped together" and thus be practically made into one central bank under governmental control, altho centralization was in outward form avoided by the bill."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralize]] | verb | **1.** Make central. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centralized]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralizing]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centrally]] | adverb | **1.** In or near or toward a center or according to a central role or function. | *"In academic literature, centrally designates in or near or toward a center or according to a central role or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centranthus]] | noun | **1.** Genus of southern european herbs and subshrubs. | *"In academic literature, centranthus designates genus of southern european herbs and subshrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchid]] | noun | **1.** Small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed. | *"In academic literature, centrarchid designates small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchidae]] | noun | **1.** Sunfish family. | *"In academic literature, centrarchidae designates sunfish family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centre]] | noun | **1.** A low-lying region in central france.<br>**2.** An area that is approximately central within some larger region. | *"Take this from this, if this be otherwise. [_Points to his head and shoulder._] If circumstances lead me, I will find Where truth is hid, though it were hid indeed Within the centre."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centreboard]] | noun | **1.** A retractable fin keel used on sailboats to prevent drifting to leeward. | *"In academic literature, centreboard designates a retractable fin keel used on sailboats to prevent drifting to leeward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrefold]] | noun | **1.** A magazine center spread; especially a foldout of a large photograph or map or other feature. | *"In academic literature, centrefold designates a magazine center spread; especially a foldout of a large photograph or map or other feature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrepiece]] | noun | **1.** The central or most important feature.<br>**2.** Something placed at the center of something else (as on a table). | *"Even the cabin table itself had been knocked into kindling-wood; and the cabin mess dined off the broad head of an oil-butt, lashed down to the floor for a centrepiece."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[centrex]] | noun | **1.** (central exchange) a kind of telephone exchange. | *"In academic literature, centrex designates (central exchange) a kind of telephone exchange."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centric]] | adjective | **1.** Having or situated at or near a center. | *"In academic literature, centric designates having or situated at or near a center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrical]] | adjective | **1.** Having or situated at or near a center. | *"It is time, then,” said Fitzurse, “to draw our party to a head, either at York, or some other centrical place."* — Walter Scott, *Ivanhoe: A Romance* |
| [[centrifugal]] | adjective | **1.** Tending to move away from a center.<br>**2.** Tending away from centralization, as of authority. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centrifugate]] | verb | **1.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifugate designates rotate at very high speed in order to separate the liquids from the solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifugation]] | noun | **1.** The process of separating substances of different densities by the use of a centrifuge. | *"In academic literature, centrifugation designates the process of separating substances of different densities by the use of a centrifuge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifuge]] | noun | **1.** An apparatus that uses centrifugal force to separate particles from a suspension.<br>**2.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifuge designates an apparatus that uses centrifugal force to separate particles from a suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centriole]] | noun | **1.** One of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis. | *"In academic literature, centriole designates one of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centripetal]] | adjective | **1.** Tending to move toward a center.<br>**2.** Tending to unify. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centriscidae]] | noun | **1.** Shrimpfishes. | *"In academic literature, centriscidae designates shrimpfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrism]] | noun | **1.** A political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action. | *"In academic literature, centrism designates a political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrist]] | noun | **1.** A person who takes a position in the political center.<br>**2.** Supporting or pursuing a course of action that is neither liberal nor conservative. | *"In academic literature, centrist designates a person who takes a position in the political center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrocercus]] | noun | **1.** Sage grouse. | *"In academic literature, centrocercus designates sage grouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroid]] | noun | **1.** The center of mass of an object of uniform density. | *"In academic literature, centroid designates the center of mass of an object of uniform density."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroidal]] | adjective | **1.** Of or relating to (especially passing through) a centroid. | *"In academic literature, centroidal designates of or relating to (especially passing through) a centroid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrolobium]] | noun | **1.** A genus of centrolobium. | *"In academic literature, centrolobium designates a genus of centrolobium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromere]] | noun | **1.** A specialized condensed region of each chromosome that appears during mitosis where the chromatids are held together to form an x shape. | *"In academic literature, centromere designates a specialized condensed region of each chromosome that appears during mitosis where the chromatids are held together to form an x shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromeric]] | adjective | **1.** Pertaining to the dense specialized portion of a chromosome to which the spindle attaches during mitosis. | *"In academic literature, centromeric designates pertaining to the dense specialized portion of a chromosome to which the spindle attaches during mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomidae]] | noun | **1.** A family of fish or the order perciformes including robalos. | *"In academic literature, centropomidae designates a family of fish or the order perciformes including robalos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomus]] | noun | **1.** Type genus of the centropomidae: snooks. | *"In academic literature, centropomus designates type genus of the centropomidae: snooks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropristis]] | noun | **1.** Sea basses. | *"In academic literature, centropristis designates sea basses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropus]] | noun | **1.** A genus of cuculidae. | *"In academic literature, centropus designates a genus of cuculidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosema]] | noun | **1.** A genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers. | *"In academic literature, centrosema designates a genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosome]] | noun | **1.** Small region of cytoplasm adjacent to the nucleus; contains the centrioles and serves to organize the microtubules. | *"In academic literature, centrosome designates small region of cytoplasm adjacent to the nucleus; contains the centrioles and serves to organize the microtubules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosomic]] | adjective | **1.** Of or relating to a centrosome. | *"In academic literature, centrosomic designates of or relating to a centrosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrospermae]] | noun | **1.** Used in former classification systems; approximately synonymous with order caryophyllales. | *"In academic literature, centrospermae designates used in former classification systems; approximately synonymous with order caryophyllales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosymmetric]] | adjective | **1.** Having a symmetrical arrangement of radiating parts about a central point. | *"In academic literature, centrosymmetric designates having a symmetrical arrangement of radiating parts about a central point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrum]] | noun | **1.** The main body of a vertebra. | *"In academic literature, centrum designates the main body of a vertebra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concentrate]] | noun | **1.** The desired mineral that is left after impurities have been removed from mined ore.<br>**2.** A concentrated form of a foodstuff; the bulk is reduced by removing water. | *"But I have so much to think of, in connexion with Borrioboola-Gha and it is so necessary I should concentrate myself that there is my remedy, you see.” As Caddy gave me a glance of entreaty, and as Mrs."* — Charles Dickens, *Bleak House* |
| [[concentrated]] | verb | **1.** Make denser, stronger, or purer.<br>**2.** Direct one's attention on something. | *"It is thoughtful, gloomy, concentrated."* — Charles Dickens, *Bleak House* |
| [[concentration]] | noun | **1.** The strength of a solution; number of molecules of a substance in a given volume.<br>**2.** The spatial property of being crowded together. | *"But though I liked him more and more the better I knew him, I still felt more and more how much it was to be regretted that he had been educated in no habits of application and concentration."* — Charles Dickens, *Bleak House* |
| [[concentre]] | verb | **1.** Bring into focus or alignment; to converge or cause to converge; of ideas or emotions. | *"In danger, the president may concentre to a point every effort of the continent."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[concentric]] | adjective | **1.** Having a common center. | *"It is demonstrable that the scratches are going everywhere impartially and it is only your candle which produces the flattering illusion of a concentric arrangement, its light falling with an exclusive optical selection."* — George Eliot, *Middlemarch* |
| [[concentrical]] | adjective | **1.** Having a common center. | *"In academic literature, concentrical designates having a common center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concentricity]] | noun | **1.** The quality of having the same center (as circles inside one another). | *"In academic literature, concentricity designates the quality of having the same center (as circles inside one another)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralisation]] | noun | **1.** The spread of power away from the center to local branches or governments. | *"In academic literature, decentralisation designates the spread of power away from the center to local branches or governments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralise]] | verb | **1.** Make less central. | *"In academic literature, decentralise designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralised]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"In academic literature, decentralised designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralising]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralising designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralization]] | noun | **1.** The social process in which population and industry moves from urban centers to outlying districts.<br>**2.** The spread of power away from the center to local branches or governments. | *"In one important respect, however, it is different; it provides for more decentralization of control and of reserves than did the Aldrich plan."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralize]] | verb | **1.** Make less central. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralized]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralizing]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralizing designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconcentrate]] | verb | **1.** Make less central. | *"In academic literature, deconcentrate designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicentra]] | noun | **1.** North american and asian herbs with divided leaves and irregular flowers. | *"In academic literature, dicentra designates north american and asian herbs with divided leaves and irregular flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eccentric]] | noun | **1.** A person with an unusual or odd personality.<br>**2.** A person of a specified kind (usually with many eccentricities). | *"He is a very eccentric person."* — Charles Dickens, *Bleak House* |
| [[eccentrically]] | adverb | **1.** In an eccentric or bizarre manner.<br>**2.** Not symmetrically with respect to the center. | *"The air, afflicted to pallor with the hoary multitudes that infested it, twisted and spun them eccentrically, suggesting an achromatic chaos of things."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[eccentricity]] | noun | **1.** Strange and unconventional behavior.<br>**2.** (geometry) a ratio describing the shape of a conic section; the ratio of the distance between the foci to the length of the major axis. | *"He knew her so well that no eccentricity of behaviour in her would alarm him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nonconcentric]] | adjective | **1.** Not having a common center; not concentric. | *"In academic literature, nonconcentric designates not having a common center; not concentric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifugation]] | noun | **1.** Centrifugation at very high speeds. | *"In academic literature, ultracentrifugation designates centrifugation at very high speeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifuge]] | noun | **1.** A high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins.<br>**2.** Subject to the action of an ultracentrifuge. | *"In academic literature, ultracentrifuge designates a high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CENTR
  </div>
</div>
