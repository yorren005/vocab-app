---
status: unread
type: root_dashboard
---
# Dashboard — vitr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vitr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“glass”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **vitr** means glass. It refers to glass, transparent fused solid, vitreous humor, vitriol, in-glass laboratory testing. In English, this root forms words such as *woad*, *vitreous*, *vitrify*, and *vitrification*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: glass
> The root **vitr** means glass. It refers to glass, transparent fused solid, vitreous humor, vitriol, in-glass laboratory testing. In English, this root forms words such as *woad*, *vitreous*, *vitrify*, and *vitrification*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Glass</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *woad* and *vitreous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vitr** comes from a Latin word that means *"glass"*.
  - At its core, it describes glass.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **vitr** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of glass.
  - **Mental & Social**: How people experience, organize, or communicate about glass.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Woad**: An everyday English word showing the root's idea of *glass*.
  - **Vitreous**: Of, relating to, resembling, or having the physical properties of glass.
  - **Vitrify**: To convert or change into glass or a glass-like amorphous substance through the application of intense furnace heat.
  - **Vitrification**: The conversion of a substance into an amorphous glassy solid by thermal fusion or rapid supercooling.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vitr</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *vitrum* is a second-declension neuter noun:
> - **Nominative / Accusative Singular:** *vitrum* ("glass")
> - **Genitive Singular:** *vitrī* ("of glass")
> - **Ablative Singular:** *vitrō* (as preserved in the scientific phrase *in vitrō*, "in glass")
> - **Classical Adjective:** *vitreus* ("glassy, made of glass, transparent")
>
> ### Primary Word Formation Pathways into English:
> 1. **Direct Adjectival & Anatomical Stems (`vitre-`):**
>    - *vitre-ous* (glass-like; vitreous humor of the eye).
>    - *vitr-ectomy* (surgical excision of the vitreous gel).
> 2. **Verbal Fusing Stems (`vitri-fy` < Latin *vitrum* + *facere*):**
>    - *vitri-fy* (to convert into glass by furnace heat).
>    - *vitri-fic-ation* (the process of glassy solidification).
>    - *vitri-fi-able* (capable of being fused into glass).
>    - *de-vitri-fy* / *de-vitri-fic-ation* (loss of glassy state via crystal nucleation).
> 3. **Alchemical & Rhetorical Stems (`vitriol-`):**
>    - *vitriol* (glassy sulfate salt; sulfuric acid; scathing venom).
>    - *vitriol-ic* (caustic, biting, savagely hostile).
>    - *vitriol-ize* (to attack with vitriol; make acidic).
> 4. **Latin Prepositional Phrases (`in vitro`):**
>    - *in vitro* (literally "in glass", in laboratory glassware/petri dishes).
> 5. **Materials & Industrial Glass Stems (`vitr-`):**
>    - *vitr-ite* (hard black glass lamp cement).
>    - *vitr-ain* (glossy, vitreous coal bands).

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

> [!tip] 🌈 Conceptual Vectors of *vitrum*
> 1. **Material State & Thermal Fusion:** Converting non-crystalline ceramic glazes, rocks, and nuclear waste into solid glass (*vitrify*, *vitrification*, *vitrifiable*, *devitrify*).
> 2. **Ophthalmology & Eye Anatomy:** The clear optical gel stabilizing the eyeball, and microsurgical retinal repair (*vitreous*, *vitrectomy*).
> 3. **Experimental Biological Science:** Laboratory experiments performed in synthetic glassware rather than living organisms (*in vitro*, *in vitro fertilization*).
> 4. **Alchemical Chemistry & Caustic Rhetoric:** Hydrated sulfate salts, concentrated sulfuric acid, and scathing, venomous language (*vitriol*, *vitriolic*, *vitriolize*).
> 5. **Cryobiology & Cell Preservation:** Flash-freezing reproductive cells into a protective amorphous glassy state (*vitrification*).

---

## 🔀 4. Prefix & Combining Dynamics on vitr

### Prefix Dynamics

| Prefix | Literal Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | in, within | [[in vitro]] | Conducted "in glass"—meaning within an artificial laboratory test tube, petri dish, or culture flask. |
| `dē-` | away, reverse, un- | [[devitrify]] | To reverse the amorphous glassy state; causing a glass or obsidian melt to crystallize and turn opaque. |
| `dē-` | away, reverse | [[devitrification]] | The unwanted or natural crystallization of glass during prolonged thermal holding. |

### Suffix Dynamics

| Suffix | Origin & Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-eous` | Latin *-eus* (made of, resembling) | [[vitreous]] | Resembling glass; possessing a smooth, glassy luster or transparency. |
| `-fy` | Latin *facere* ("to make, convert") | [[vitrify]] | To fuse or convert into a non-porous glassy solid under extreme thermal heat. |
| `-cation` | Latin *-icātiō* (process noun) | [[vitrification]] | The technological or biological process of converting into an amorphous glassy state. |
| `-ol` | Chemical/alchemical sulfate suffix | [[vitriol]] | Originally a glassy sulfate hydrate crystal; later sulfuric acid; figuratively venomous speech. |
| `-ic` | Adjective formative | [[vitriolic]] | Filled with savage malice, stinging bitterness, or caustic rancor. |
| `-ectomy` | Greek -εκτομία (surgical excision) | [[vitrectomy]] | The microsurgical procedure removing cloudy or hemorrhaged vitreous humor from the eye. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 👁️ **Ophthalmology & Retinal Surgery** | [[vitreous]], [[vitrectomy]] | Posterior vitreous detachment, diabetic vitreous hemorrhage, pars plana vitrectomy. |
| 🧬 **Cell Biology & Reproductive Medicine** | [[in vitro]], [[vitrification]] | In vitro fertilization (IVF), high-throughput drug screening, embryo cryopreservation. |
| ☢️ **Nuclear Engineering & Waste Management** | [[vitrification]], [[vitrify]] | Immobilizing radioactive fission products inside molten borosilicate glass logs. |
| 🏺 **Ceramics & Geological Petrology** | [[vitrify]], [[devitrify]], [[vitreous]] | Kiln firing porcelain to vitrification; devitrification of volcanic obsidian into spherulites. |
| 🗣️ **Rhetoric, Politics & Literary Criticism** | [[vitriol]], [[vitriolic]] | Denouncing partisan media vitriol, scathing satirical reviews, venomous political polemics. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[devitrify]] | verb | **1.** Become crystalline.<br>**2.** Make (glassy materials) brittle or opaque. | *"In academic literature, devitrify designates become crystalline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[in vitro]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vitr within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of vitr in systematic terminology. | *"In academic literature, in vitro designates pertaining to, derived from, or characteristic of latin vitr within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unvitrified]] | adjective | **1.** (of ceramics) lacking a vitreous finish. | *"In academic literature, unvitrified designates (of ceramics) lacking a vitreous finish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitrectomy]] | noun | **1.** A surgical procedure that removes the vitreous humor and replace it with saline solution. | *"In academic literature, vitrectomy designates a surgical procedure that removes the vitreous humor and replace it with saline solution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitreous]] | adjective | **1.** Of or relating to or constituting the vitreous humor of the eye.<br>**2.** Relating to or resembling or derived from or containing glass. | *"It was composed of black and vitreous lava, mixed with fragments of felspar."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[vitrification]] | noun | **1.** A vitrified substance; the glassy result of being vitrified.<br>**2.** The process of becoming vitreous. | *"In academic literature, vitrification designates a vitrified substance; the glassy result of being vitrified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitrified]] | verb | **1.** Change into glass or a glass-like substance by applying heat.<br>**2.** Undergo vitrification; become glassy or glass-like. | *"Evidence of volcanic action appeared along the canyon in the form of vitrified fragments and occasional masses of lava resembling rock."* — W. E. Webb, *Buffalo Land* |
| [[vitrify]] | verb | **1.** Change into glass or a glass-like substance by applying heat.<br>**2.** Undergo vitrification; become glassy or glass-like. | *"Evidence of volcanic action appeared along the canyon in the form of vitrified fragments and occasional masses of lava resembling rock."* — W. E. Webb, *Buffalo Land* |
| [[vitrine]] | noun | **1.** A glass container used to store and display items in a shop or museum or home. | *"In academic literature, vitrine designates a glass container used to store and display items in a shop or museum or home."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitriol]] | noun | **1.** (h2so4) a highly corrosive acid made from sulfur dioxide; widely used in the chemical industry.<br>**2.** Abusive or venomous language used to express blame or censure or bitter deep-seated ill will. | *"Série, iii. (1872) pp. 21 _sq._ The writer says that the candidate has to keep his arms plunged up to the shoulders in vessels full of ants, "as in a bath of vitriol," for hours."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[vitriolic]] | adjective | **1.** Harsh or corrosive in tone.<br>**2.** Of a substance, especially a strong acid; capable of destroying or eating away by chemical action. | *"If you are not good, none is good”—those little words may give a terrific meaning to responsibility, may hold a vitriolic intensity for remorse."* — George Eliot, *Middlemarch* |
| [[vitriolically]] | adverb | **1.** In a caustic vitriolic manner. | *"In academic literature, vitriolically designates in a caustic vitriolic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vitro]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vitr within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of vitr in systematic terminology. | *"In academic literature, vitro designates pertaining to, derived from, or characteristic of latin vitr within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VITR
  </div>
</div>
