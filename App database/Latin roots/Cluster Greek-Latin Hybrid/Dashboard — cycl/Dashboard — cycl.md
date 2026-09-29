---
status: unread
type: root_dashboard
---
# Dashboard — cycl
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cycl-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“circle or wheel”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **cycl** means circle or wheel. It refers to circle, wheel, recurring cycle, rotation. In English, this root forms words such as *acyclic*, *anticyclone*, *anticyclonic*, and *bicycle*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: circle or wheel
> The root **cycl** means circle or wheel. It refers to circle, wheel, recurring cycle, rotation. In English, this root forms words such as *acyclic*, *anticyclone*, *anticyclonic*, and *bicycle*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Circle or wheel</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *acyclic* and *anticyclone*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cycl** comes from a Latin word that means *"circle or wheel"*.
  - At its core, it describes circle or wheel.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **cycl** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of circle or wheel.
  - **Mental & Social**: How people experience, organize, or communicate about circle or wheel.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Acyclic**: Not cyclic.
  - **Anticyclone**: A meteorological weather system with high atmospheric pressure at its center, around which winds circulate outward in a clockwise direction.
  - **Anticyclonic**: Pertaining to, caused by, or characteristic of an anticyclone.
  - **Bicycle**: A two-wheeled vehicle propelled by pedals and steered with handlebars.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cycl</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cycl-** operates with immense vitality across multiple structural positions:
> - **Primary Nominal / Verbal Stem:** `cycl-` (from *kýklos*, giving *cycle*, *cyclic*, *cyclical*, *cyclist*, *cycling*)
> - **Prefixed Vehicular Compounds:** `bi-cycle`, `tri-cycle`, `uni-cycle`, `motor-cycle`
> - **Prefixed Reversative / Directional Stems:** `re-cycle`, `up-cycle`, `down-cycle`, `a-cyclic`, `epi-cycle`
> - **Scientific Combining Suffixes:** `-cycl-` + `-oid` (*cycloid*), `-tron` (*cyclotron*), `-orama` (*cyclorama*), `-thymia` (*cyclothymia*)
> - **Mythological & Anatomical Formations:** `Cyclops` (*kýklos* + *ṓps*), `cyclopean`, `cyclopia`

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
> The semantic power of `cycl` organizes into five primary domains:
> - **Vehicular Transport & Athletics:** *bicycle*, *tricycle*, *unicycle*, *motorcycle*, *cyclist*, *cycling* describe wheeled human- and motor-powered vehicles.
> - **Meteorology & Fluid Dynamics:** *cyclone*, *cyclonic*, *anticyclone* describe massive circular vortex weather phenomena and swirling air masses.
> - **Organic Chemistry & Molecular Rings:** *cyclic*, *acyclic*, *heterocyclic*, *polycyclic*, *cyclohexane* designate molecular structures arranged in closed carbon rings.
> - **Reference Works & General Education:** *encyclopedia*, *encyclopedic*, *encyclopedist* denote the all-encompassing circle of human arts and sciences.
> - **Mythology, Geology & Architecture:** *Cyclops*, *cyclopean*, *Cyclades* describe one-eyed giants, colossal ancient stone walls, and Aegean island rings.

---

## 🔀 4. Prefix & Combining Dynamics on cycl

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `bi-` (Latin) | two | [[bicycle]] | A vehicle with *two* wheels placed in tandem. |
| `tri-` (Latin/Greek) | three | [[tricycle]] | A vehicle with *three* wheels for stability. |
| `uni-` (Latin) | one, single | [[unicycle]] | A single-wheeled vehicle requiring balance. |
| `re-` (Latin) | again, back | [[recycle]] | To process materials through a new *cycle* of use. |
| `anti-` (Greek) | opposite, counter | [[anticyclone]] | An atmospheric circulation rotating in the *opposite* direction of a cyclone. |
| `epi-` (Greek) | upon, in addition to | [[epicycle]] | A circle rotating *upon* the circumference of another circle. |
| `a-` (Greek privative) | without, not | [[acyclic]] | Not circular; an open-chain chemical compound. |
| `hetero-` (Greek) | different, other | [[heterocyclic]] | A chemical ring containing atoms of *different* elements (e.g., carbon and nitrogen). |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix / Second Element | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ic` / `-ical` | Adjective (Pertaining to) | [[cyclic]], [[cyclical]] | Recurring in regular cycles; having circular ring structure. |
| `-ist` | Noun (Agent / Practitioner) | [[cyclist]], [[bicyclist]] | An individual who rides a cycle or bicycle. |
| `-oid` (< *eîdos*, form) | Noun / Adjective (Resembling) | [[cycloid]] | The geometric curve traced by a point on a rolling circle. |
| `-tron` (< Greek suffix) | Noun (Instrument / Machine) | [[cyclotron]] | A machine that accelerates particles in circular magnetic spirals. |
| `-pedia` (< *paideía*, training) | Noun (Education / System) | [[encyclopedia]] | A compendium covering the entire circle of human knowledge. |
| `-orama` (< *horāma*, view) | Noun (Panoramic Display) | [[cyclorama]] | A circular panoramic painting viewed from the center. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🚲 **Urban Transit & Athletics** | [[bicycle]], [[cyclist]], [[cycling]] | Urban bike share systems; Tour de France; dedicated metropolitan cycling infrastructure. |
| 🌪️ **Meteorology & Climate Science** | [[cyclone]], [[anticyclone]], [[cyclonic]] | Tropical cyclone tracking; barometric pressure gradient winds; hurricane evacuation models. |
| 🧪 **Organic Chemistry & Pharmacology** | [[cyclic]], [[acyclic]], [[heterocyclic]] | Benzene and cyclohexane rings; heterocyclic antibiotic molecules; steroid ring structures. |
| ⚛️ **High-Energy Particle Physics** | [[cyclotron]], [[cycloidal]] | Particle accelerators producing radioisotopes (e.g., fluorine-18 for PET scans); cycloidal gear drives. |
| 🏛️ **Archaeology & Classical Lore** | [[Cyclops]], [[cyclopean]], [[Cyclades]] | Excavating the Lion Gate of Mycenae (*cyclopean masonry*); Homeric literature; Aegean island archaeology. |
| 📚 **Publishing, AI & Education** | [[encyclopedia]], [[encyclopedic]] | Encyclopedic knowledge bases; Denis Diderot's *Encyclopédie*; Wikipedia. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acyclic]] | adjective | **1.** Not cyclic; especially having parts arranged in spirals rather than whorls.<br>**2.** Having an open chain structure. | *"In academic literature, acyclic designates not cyclic; especially having parts arranged in spirals rather than whorls."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticyclone]] | noun | **1.** (meteorology) winds spiraling outward from a high pressure center; circling clockwise in the northern hemisphere and counterclockwise in the southern. | *"In academic literature, anticyclone designates (meteorology) winds spiraling outward from a high pressure center; circling clockwise in the northern hemisphere and counterclockwise in the southern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticyclonic]] | adjective | **1.** Of or relating to or characteristic of the atmosphere around a high pressure center. | *"In academic literature, anticyclonic designates of or relating to or characteristic of the atmosphere around a high pressure center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bicycle]] | noun | **1.** A wheeled vehicle that has two wheels and is moved by foot pedals.<br>**2.** Ride a bicycle. | *"When Drury drove up in a borrowed farm cart, Isabel without expecting or receiving many thanks dragged her bicycle to the top of the glen and pelted off across the moor."* — Anthony Pryde, *Nightfall* |
| [[bicycler]] | noun | **1.** A person who rides a bicycle. | *"Fuseblue peer from barrel rev. evensong Love on hackney jaunt Blazes blind coddoubled bicyclers Dilly with snowcake no fancy clothes."* — James Joyce, *Ulysses* |
| [[bicyclic]] | adjective | **1.** Having molecules consisting of two fused rings. | *"In academic literature, bicyclic designates having molecules consisting of two fused rings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bicycling]] | noun | **1.** Riding a bicycle.<br>**2.** Ride a bicycle. | *"My father had a small factory at Coventry, which he enlarged at the time of the invention of bicycling."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[bicyclist]] | noun | **1.** A person who rides a bicycle. | *"Come, let us seek somewhere that we may eat, and then we shall go on our way.” We dined at “Jack Straw’s Castle” along with a little crowd of bicyclists and others who were genially noisy."* — Bram Stoker, *Dracula* |
| [[cyclades]] | noun | **1.** The bronze age civilization on the cyclades islands in the southern aegean sea that flourished 3000-1100 bc.<br>**2.** A group of over 200 islands in the southern aegean. | *"Were this world an endless plain, and by sailing eastward we could for ever reach new distances, and discover sights more sweet and strange than any Cyclades or Islands of King Solomon, then there were promise in the voyage."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cyclamen]] | noun | **1.** Mediterranean plant widely cultivated as a houseplant for its showy dark green leaves splotched with silver and nodding white or pink to reddish flowers with reflexed petals. | *"In academic literature, cyclamen designates mediterranean plant widely cultivated as a houseplant for its showy dark green leaves splotched with silver and nodding white or pink to reddish flowers with reflexed petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cycle]] | noun | **1.** An interval during which a recurring sequence of events occurs.<br>**2.** A series of poems or songs on the same theme. | *"Gabriel wished he had not nailed up his colours as a shepherd, but had laid himself out for anything in the whole cycle of labour that was required in the fair."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[cyclic]] | adjective | **1.** Conforming to the carnot cycle.<br>**2.** Forming a whorl or having parts arranged in a whorl. | *"The speed or slowness of his recognition of such periodic or cyclic changes in nature will depend largely on the length of the particular cycle."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[cyclical]] | adjective | **1.** Recurring in cycles. | *"Reducing cyclical unemployment and its effects. § 1. #Evils of early factory conditions#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cyclicity]] | noun | **1.** The quality of recurring at regular intervals. | *"In academic literature, cyclicity designates the quality of recurring at regular intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cycling]] | noun | **1.** The sport of traveling on a bicycle or motorcycle.<br>**2.** Cause to go through a recurring sequence. | *"About six and a half years ago, however, having exhausted all material means at my command, - /materia medica/, electricity, gymnastics, cycling, and so on, - and being in a hopeless state, the study of Christian Science was taken up."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[cycliophora]] | noun | **1.** Tiny marine organisms each the size of a period found in great numbers on lobsters' lips; identified tentatively in 1995 as a new phylum or as possible link between entoprocta and ectoprocta. | *"In academic literature, cycliophora designates tiny marine organisms each the size of a period found in great numbers on lobsters' lips; identified tentatively in 1995 as a new phylum or as possible link between entoprocta and ectoprocta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclist]] | noun | **1.** A person who rides a bicycle. | *"He eyed the horseshoe poster over the gate of college park: cyclist doubled up like a cod in a pot."* — James Joyce, *Ulysses* |
| [[cyclobenzaprine]] | noun | **1.** Muscle relaxant (trade name flexeril) used for muscle spasms or acute injury. | *"In academic literature, cyclobenzaprine designates muscle relaxant (trade name flexeril) used for muscle spasms or acute injury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclohexanol]] | noun | **1.** A colorless oily alcohol that smells like camphor. | *"In academic literature, cyclohexanol designates a colorless oily alcohol that smells like camphor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cycloid]] | noun | **1.** A line generated by a point on a circle rolling along a straight line.<br>**2.** Resembling a circle. | *"In the first course, there was a shoulder of mutton cut into an equilateral triangle, a piece of beef into a rhomboides, and a pudding into a cycloid."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[cycloidal]] | adjective | **1.** Resembling a circle. | *"In academic literature, cycloidal designates resembling a circle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cycloloma]] | noun | **1.** A caryophyllaceous genus of the family chenopodiaceae. | *"In academic literature, cycloloma designates a caryophyllaceous genus of the family chenopodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclonal]] | adjective | **1.** Of or relating to or characteristic of the atmosphere around a low pressure center.<br>**2.** Of or relating to or characteristic of a violent tropical storm. | *"In academic literature, cyclonal designates of or relating to or characteristic of the atmosphere around a low pressure center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclone]] | noun | **1.** (meteorology) rapid inward circulation of air masses about a low pressure center; circling counterclockwise in the northern hemisphere and clockwise in the southern.<br>**2.** A violent rotating windstorm. | *"I know, because I am one, and have just been waked up by the gyrations of the cyclone; and I'm deeply confounded."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[cyclonic]] | adjective | **1.** Of or relating to or characteristic of the atmosphere around a low pressure center.<br>**2.** Of or relating to or characteristic of a violent tropical storm. | *"From the reports of eyewitnesses it transpires that the seismic waves were accompanied by a violent atmospheric perturbation of cyclonic character."* — James Joyce, *Ulysses* |
| [[cyclonical]] | adjective | **1.** Of or relating to or characteristic of the atmosphere around a low pressure center.<br>**2.** Of or relating to or characteristic of a violent tropical storm. | *"In academic literature, cyclonical designates of or relating to or characteristic of the atmosphere around a low pressure center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclooxygenase]] | noun | **1.** Either of two related enzymes that control the production of prostaglandins and are blocked by aspirin. | *"In academic literature, cyclooxygenase designates either of two related enzymes that control the production of prostaglandins and are blocked by aspirin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclooxygenase-1]] | noun | **1.** An enzyme that regulates prostaglandins that are important for the health of the stomach lining and kidneys. | *"In academic literature, cyclooxygenase-1 designates an enzyme that regulates prostaglandins that are important for the health of the stomach lining and kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclooxygenase-2]] | noun | **1.** An enzyme that makes prostaglandins that cause inflammation and pain and fever. | *"In academic literature, cyclooxygenase-2 designates an enzyme that makes prostaglandins that cause inflammation and pain and fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopaedia]] | noun | **1.** A reference work (often in several volumes) containing articles on various topics (often arranged in alphabetical order) dealing with the entire range of human knowledge or with some particular specialty. | *"In the oldest existing cyclopaedia--the _Natural History_ of Pliny--the list of dangers apprehended from menstruation is longer than any furnished by mere barbarians."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[cyclopean]] | adjective | **1.** Of or relating to or resembling the cyclops. | *"In academic literature, cyclopean designates of or relating to or resembling the cyclops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopedia]] | noun | **1.** A reference work (often in several volumes) containing articles on various topics (often arranged in alphabetical order) dealing with the entire range of human knowledge or with some particular specialty. | *"What Charlie don't have in his pants pocket ain't in the 'cyclopedia."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[cyclopes]] | noun | **1.** Only the silky anteater.<br>**2.** (greek mythology) one of a race of giants having a single eye in the middle of their forehead. | *"In academic literature, cyclopes designates only the silky anteater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclophorus]] | noun | **1.** Tropical old world ferns having closely crowded circular sori and no indusia. | *"In academic literature, cyclophorus designates tropical old world ferns having closely crowded circular sori and no indusia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopia]] | noun | **1.** A developmental abnormality in which there is only one eye. | *"In academic literature, cyclopia designates a developmental abnormality in which there is only one eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopropane]] | noun | **1.** A colorless flammable gas sometimes used as an inhalation anesthetic. | *"In academic literature, cyclopropane designates a colorless flammable gas sometimes used as an inhalation anesthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclops]] | noun | **1.** (greek mythology) one of a race of giants having a single eye in the middle of their forehead.<br>**2.** Minute free-swimming freshwater copepod having a large median eye and pear-shaped body and long antennae used in swimming; important in some food chains and as intermediate hosts of parasitic worms that affect man e.g. guinea worms. | *"To birds on the wing its glassy surface, reflecting the light sky, must have been visible for miles around as a glistening Cyclops’ eye in a green face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[cyclopteridae]] | noun | **1.** Lumpfishes. | *"In academic literature, cyclopteridae designates lumpfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopterus]] | noun | **1.** Type genus of the cyclopteridae: lumpfishes. | *"In academic literature, cyclopterus designates type genus of the cyclopteridae: lumpfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclorama]] | noun | **1.** A picture (or series of pictures) representing a continuous scene. | *"In academic literature, cyclorama designates a picture (or series of pictures) representing a continuous scene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cycloserine]] | noun | **1.** An antibiotic that is especially active against the tubercle bacillus. | *"In academic literature, cycloserine designates an antibiotic that is especially active against the tubercle bacillus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclosis]] | noun | **1.** The circulation of cytoplasm within a cell. | *"In academic literature, cyclosis designates the circulation of cytoplasm within a cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclosorus]] | noun | **1.** Small genus of terrestrial ferns of tropical and subtropical southern hemisphere. | *"In academic literature, cyclosorus designates small genus of terrestrial ferns of tropical and subtropical southern hemisphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclosporeae]] | noun | **1.** In more recent classifications superseded by the order fucales. | *"In academic literature, cyclosporeae designates in more recent classifications superseded by the order fucales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclostomata]] | noun | **1.** Primitive jawless aquatic vertebrate: lampreys; hagfishes. | *"In academic literature, cyclostomata designates primitive jawless aquatic vertebrate: lampreys; hagfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclostome]] | noun | **1.** Primitive aquatic vertebrate. | *"In academic literature, cyclostome designates primitive aquatic vertebrate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclostyle]] | noun | **1.** A writing implement with a small toothed wheel that cuts small holes in a stencil.<br>**2.** Print with an implement with small toothed wheels that cuts small holes in a stencil. | *"In academic literature, cyclostyle designates a writing implement with a small toothed wheel that cuts small holes in a stencil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclothymia]] | noun | **1.** A mild bipolar disorder that persists over a long time. | *"In academic literature, cyclothymia designates a mild bipolar disorder that persists over a long time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclothymic]] | adjective | **1.** Of or relating to or exhibiting cyclothymia. | *"In academic literature, cyclothymic designates of or relating to or exhibiting cyclothymia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclotron]] | noun | **1.** An accelerator that imparts energies of several million electron-volts to rapidly moving particles. | *"In academic literature, cyclotron designates an accelerator that imparts energies of several million electron-volts to rapidly moving particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclia]] | noun | **1.** Large genus of epiphytic and lithophytic orchids of tropical and subtropical americas and west indies; formerly included in genus epidendrum. | *"In academic literature, encyclia designates large genus of epiphytic and lithophytic orchids of tropical and subtropical americas and west indies; formerly included in genus epidendrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclical]] | noun | **1.** A letter from the pope sent to all roman catholic bishops throughout the world.<br>**2.** Intended for wide distribution. | *"In academic literature, encyclical designates a letter from the pope sent to all roman catholic bishops throughout the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclopaedia]] | noun | **1.** A reference work (often in several volumes) containing articles on various topics (often arranged in alphabetical order) dealing with the entire range of human knowledge or with some particular specialty. | *"Black to prepare the Index to the ninth edition of the _Encyclopaedia Britannica_, then in course of publication."* — John Cairns, *Principal Cairns* |
| [[encyclopaedic]] | adjective | **1.** Broad in scope or content. | *"The high hall of Horne’s house had never beheld an assembly so representative and so varied nor had the old rafters of that establishment ever listened to a language so encyclopaedic."* — James Joyce, *Ulysses* |
| [[encyclopaedism]] | noun | **1.** Profound scholarly knowledge. | *"In academic literature, encyclopaedism designates profound scholarly knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclopaedist]] | noun | **1.** A person who compiles information for encyclopedias. | *"In academic literature, encyclopaedist designates a person who compiles information for encyclopedias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclopedia]] | noun | **1.** A reference work (often in several volumes) containing articles on various topics (often arranged in alphabetical order) dealing with the entire range of human knowledge or with some particular specialty. | *"In 1858 appeared the important article on "Kant," in the eighth edition of the _Encyclopedia Britannica_, which was written at the urgent request of his friend Adam Black, and which cost him ten months reading and preparation."* — John Cairns, *Principal Cairns* |
| [[encyclopedic]] | adjective | **1.** Broad in scope or content. | *"And surely among all men whose vocation requires them to exhibit their powers of speech, the happiest is a prosperous provincial auctioneer keenly alive to his own jokes and sensible of his encyclopedic knowledge."* — George Eliot, *Middlemarch* |
| [[encyclopedism]] | noun | **1.** Profound scholarly knowledge. | *"In academic literature, encyclopedism designates profound scholarly knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encyclopedist]] | noun | **1.** A person who compiles information for encyclopedias. | *"In academic literature, encyclopedist designates a person who compiles information for encyclopedias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicycle]] | noun | **1.** A circle that rolls around (inside or outside) another circle; generates an epicycloid or hypocycloid. | *"In academic literature, epicycle designates a circle that rolls around (inside or outside) another circle; generates an epicycloid or hypocycloid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicyclic]] | adjective | **1.** Of or relating to an epicycle. | *"In academic literature, epicyclic designates of or relating to an epicycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicyclical]] | adjective | **1.** Of or relating to an epicycle. | *"In academic literature, epicyclical designates of or relating to an epicycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorcycle]] | noun | **1.** A motor vehicle with two wheels and a strong frame.<br>**2.** Ride a motorcycle. | *"Here comes a dispatch rider." The man on the motorcycle dashed up, saluted."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[motorcycling]] | noun | **1.** Riding a motorcycle.<br>**2.** Ride a motorcycle. | *"In academic literature, motorcycling designates riding a motorcycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorcyclist]] | noun | **1.** A traveler who rides a motorcycle. | *"In academic literature, motorcyclist designates a traveler who rides a motorcycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncyclic]] | adjective | **1.** Not cyclic.<br>**2.** Not having repeated cycles. | *"In academic literature, noncyclic designates not cyclic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncyclical]] | adjective | **1.** Not cyclic. | *"In academic literature, noncyclical designates not cyclic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nontricyclic]] | noun | **1.** A class of antidepressant drugs that are not tricyclic drugs and do not act by inhibiting mao. | *"In academic literature, nontricyclic designates a class of antidepressant drugs that are not tricyclic drugs and do not act by inhibiting mao."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procyclidine]] | noun | **1.** Drug (trade name kemadrin) used to reduce tremors in parkinsonism. | *"In academic literature, procyclidine designates drug (trade name kemadrin) used to reduce tremors in parkinsonism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recyclable]] | adjective | **1.** Capable of being used again. | *"In academic literature, recyclable designates capable of being used again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recycle]] | verb | **1.** Cause to repeat a cycle.<br>**2.** Use again after processing. | *"He repeated charges that the UIPS non-renewables deficits resulted from poor control and excessive consumption of raw materials, plus breakdown in recycling and conservation policies."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[recycling]] | noun | **1.** The act of processing used or abandoned materials for use in creating new products.<br>**2.** Cause to repeat a cycle. | *"He repeated charges that the UIPS non-renewables deficits resulted from poor control and excessive consumption of raw materials, plus breakdown in recycling and conservation policies."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tricycle]] | noun | **1.** A vehicle with three wheels that is moved by foot pedals. | *"The next time I went down he advised me to go and learn to ride a tricycle first."* — Mark Twain, *What Is Man? and Other Essays* |
| [[tricyclic]] | noun | **1.** An antidepressant drug that acts by blocking the reuptake of norepinephrine and serotonin and thus making more of those substances available to act on receptors in the brain. | *"In academic literature, tricyclic designates an antidepressant drug that acts by blocking the reuptake of norepinephrine and serotonin and thus making more of those substances available to act on receptors in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CYCL
  </div>
</div>
