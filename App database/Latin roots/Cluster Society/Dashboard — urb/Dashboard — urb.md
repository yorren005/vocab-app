---
status: unread
type: root_dashboard
---
# Dashboard — urb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">urb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“city”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **urb** means city. It refers to an organized urban settlement with civic institutions. In English, this root forms words such as *urban*, *suburb*, *suburban*, and *urbane*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: city
> The root **urb** means city. It refers to an organized urban settlement with civic institutions. In English, this root forms words such as *urban*, *suburb*, *suburban*, and *urbane*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">City</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *urban* and *suburb*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **urb** comes from a Latin word that means *"city"*.
  - At its core, it describes city.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **urb** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of city.
  - **Mental & Social**: How people experience, organize, or communicate about city.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Urban**: In, relating to, or characteristic of a city or town.
  - **Suburb**: An outlying district of a city, especially a residential one.
  - **Suburban**: Of or characteristic of a suburb.
  - **Urbane**: Courteous and refined in manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">urb</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin urbs, urbis (walled city, Rome)
  │
  ├── Physical & Spatial Geography
  │     ├── urbānus ────────────────────────> urban (relating to cities)
  │     ├── + -ite ─────────────────────────> urbanite (city resident)
  │     ├── + -ize ─────────────────────────> urbanize, urbanization
  │     ├── sub- + urbs ────────────────────> suburb, suburban
  │     ├── ex- + urbs ─────────────────────> exurban
  │     └── inter- + urbs ──────────────────> interurban
  │
  └── Cultural Sophistication & Demeanor
        ├── urbānus (refined city manners) ─> urbane (suave, elegant, courteous)
        ├── urbānitās ──────────────────────> urbanity (polished sophistication)
        └── in- + urbānus ──────────────────> inurbane (lacking refinement, uncourtly)
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

### Distinct Spheres of Manifestation
1. **The Physical Metropolis**: *urban*, *urbanite*, *urbanize*, *urbanization* (city architecture, dense populations, rapid municipal development).
2. **Regional Topography & Suburbs**: *suburb*, *suburban*, *exurban*, *interurban* (residential outskirts, commuting networks, transit connections).
3. **Manners & Aesthetic Refinement**: *urbane*, *urbanity* (cultivated elegance, diplomatic charm, worldly conversational grace).
4. **Provincial Clumsiness**: *inurbane* (lacking social polish; discourteous, rustic, or uncouth).

---

## 🔀 4. Prefix & Combining Dynamics on urb

### Spatial Prefix Variations
- **sub- ("under, below, close to")**: *suburb*, *suburban* (literally, at the foot of or immediately adjacent to the city walls).
- **ex- ("outside of, beyond")**: *exurban* (lying in the outer commuter territory beyond suburban subdivisions).
- **inter- ("between, among")**: *interurban* (connecting two or more separate urban centers).
- **in- (privative "not, un-")**: *inurbane* (lacking the refined manners of the city).

### Suffix Morphologies
- **-an**: *urban*, *suburban*, *exurban*, *interurban* (geographical classification).
- **-e**: *urbane* (specialized semantic spelling distinguishing cultural polish from physical *urban* geography).
- **-ite**: *urbanite* (person inhabiting the city).
- **-ity**: *urbanity* (the quality of suave social grace).
- **-ize / -ization**: *urbanize*, *urbanization* (the structural transformation of rural land or agrarian societies into cities).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Urban Planning & Architecture** | Zoning laws, downtown renewal, public transit, city densities | *urban*, *urbanize*, *urbanization*, *urban planner* |
| **Human Geography & Demography** | Suburban sprawl, commuter belts, exurban migration | *suburb*, *suburban*, *exurban*, *interurban* |
| **Sociology & Cultural Studies** | Metropolitan lifestyle, city subcultures, gentrification | *urbanite*, *suburbanite*, *urban culture* |
| **Literature & Social Criticism** | Sophisticated salon wit, diplomatic demeanor, comedy of manners | *urbane*, *urbanity*, *inurbane* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[asurbanipal]] | noun | **1.** King of assyria who built a magnificent palace and library at nineveh (668-627 bc). | *"In academic literature, asurbanipal designates king of assyria who built a magnificent palace and library at nineveh (668-627 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conurbation]] | noun | **1.** An aggregation or continuous network of urban communities. | *"In academic literature, conurbation designates an aggregation or continuous network of urban communities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[courbaril]] | noun | **1.** West indian locust tree having pinnate leaves and panicles of large white or purplish flowers; yields very hard tough wood. | *"In academic literature, courbaril designates west indian locust tree having pinnate leaves and panicles of large white or purplish flowers; yields very hard tough wood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[courbet]] | noun | **1.** French painter noted for his realistic depiction of everyday scenes (1819-1877). | *"In academic literature, courbet designates french painter noted for his realistic depiction of everyday scenes (1819-1877)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exurban]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urb within the domain of Society.<br>**2.** A technical or specialized form exhibiting the properties of urb in systematic terminology. | *"In academic literature, exurban designates pertaining to, derived from, or characteristic of latin urb within the domain of society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exurbia]] | noun | **1.** A residential area outside of a city and beyond suburbia. | *"In academic literature, exurbia designates a residential area outside of a city and beyond suburbia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interurban]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urb within the domain of Society.<br>**2.** A technical or specialized form exhibiting the properties of urb in systematic terminology. | *"This is represented by the Interstate Commerce Act (at first weakly, and more vigorously after its amendment), and by the great mass of state legislation putting the local and interurban public utilities under the control of regulative commissions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inurbane]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urb within the domain of Society.<br>**2.** A technical or specialized form exhibiting the properties of urb in systematic terminology. | *"In academic literature, inurbane designates pertaining to, derived from, or characteristic of latin urb within the domain of society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburb]] | noun | **1.** A residential district located on the outskirts of a city. | *"But the king of the city, whose name was Daizan, had a daughter, and when it was with her after the manner of women she went forth from the city and dwelt for a time in the suburb, for such was the custom of the place."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[suburban]] | adjective | **1.** Relating to or characteristic of or situated in suburbs. | *"There is Mortimer’s, the tobacconist, the little newspaper shop, the Coburg branch of the City and Suburban Bank, the Vegetarian Restaurant, and McFarlane’s carriage-building depot."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[suburbanise]] | verb | **1.** Take on suburban character.<br>**2.** Make suburban in character. | *"In academic literature, suburbanise designates take on suburban character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburbanised]] | verb | **1.** Take on suburban character.<br>**2.** Make suburban in character. | *"In academic literature, suburbanised designates take on suburban character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburbanite]] | noun | **1.** A resident of a suburb. | *"In academic literature, suburbanite designates a resident of a suburb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburbanize]] | verb | **1.** Take on suburban character.<br>**2.** Make suburban in character. | *"In academic literature, suburbanize designates take on suburban character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburbanized]] | verb | **1.** Take on suburban character.<br>**2.** Make suburban in character. | *"In academic literature, suburbanized designates take on suburban character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suburbia]] | noun | **1.** A residential district located on the outskirts of a city.<br>**2.** Suburbanites considered as a cultural class or subculture. | *"In academic literature, suburbia designates a residential district located on the outskirts of a city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urban]] | adjective | **1.** Relating to or concerned with a city or densely populated area.<br>**2.** Located in or characteristic of a city or city life. | *"But there is a way some men have, rural and urban alike, for which the mind is more responsible than flesh and sinew: it is a way of curtailing their dimensions by their manner of showing them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[urbana]] | noun | **1.** A university town in east central illinois adjoining champaign. | *"Judge Corwin, of Urbana, Ohio, separated in this manner from his party, wandered for two days on the plains south of Hays City, subsisting on a little corn which had been dropped by some passing wagon."* — W. E. Webb, *Buffalo Land* |
| [[urbane]] | adjective | **1.** Showing a high degree of refinement and the assurance that comes from wide social experience. | *"But his French breeding triumphed and he remained, except for that one furtive twinkle, the conscientious valet, nescient and urbane."* — Anthony Pryde, *Nightfall* |
| [[urbanely]] | adverb | **1.** In an urbane manner. | *"He had seen her lift her eyes, and waved his hand urbanely to her, while he blew her a kiss."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[urbanisation]] | noun | **1.** The condition of being urbanized.<br>**2.** The social process whereby cities grow and societies become more urban. | *"In academic literature, urbanisation designates the condition of being urbanized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanise]] | verb | **1.** Impart urban habits, ways of life, or responsibilities upon.<br>**2.** Make more industrial or city-like. | *"In academic literature, urbanise designates impart urban habits, ways of life, or responsibilities upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanised]] | verb | **1.** Impart urban habits, ways of life, or responsibilities upon.<br>**2.** Make more industrial or city-like. | *"In academic literature, urbanised designates impart urban habits, ways of life, or responsibilities upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanite]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urb within the domain of Society.<br>**2.** A technical or specialized form exhibiting the properties of urb in systematic terminology. | *"In academic literature, urbanite designates pertaining to, derived from, or characteristic of latin urb within the domain of society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanity]] | noun | **1.** Polished courtesy; elegance of manner.<br>**2.** The quality or character of life in a city or town. | *"Not with the greatest urbanity, I must say."* — Charles Dickens, *Bleak House* |
| [[urbanization]] | noun | **1.** The condition of being urbanized.<br>**2.** The social process whereby cities grow and societies become more urban. | *"In academic literature, urbanization designates the condition of being urbanized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanize]] | verb | **1.** Make more industrial or city-like.<br>**2.** Impart urban habits, ways of life, or responsibilities upon. | *"In academic literature, urbanize designates make more industrial or city-like."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urbanized]] | verb | **1.** Make more industrial or city-like.<br>**2.** Impart urban habits, ways of life, or responsibilities upon. | *"In academic literature, urbanized designates make more industrial or city-like."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · URB
  </div>
</div>
