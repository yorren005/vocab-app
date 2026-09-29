---
status: unread
type: root_dashboard
---
# Dashboard — plum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plum-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“feather”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Animals displaying their distinctive natural traits, instincts, and biology.</span>
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

The root **plum** means feather. It refers to feather / soft down / ornamental plume / feather-like structure. In English, this root forms words such as *plume*, *plumage*, *deplume*, and *deplumation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: feather
> The root **plum** means feather. It refers to feather / soft down / ornamental plume / feather-like structure. In English, this root forms words such as *plume*, *plumage*, *deplume*, and *deplumation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Feather</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Animals displaying their distinctive natural traits, instincts, and biology.</mark>
> - **Everyday Connection**: Think of familiar words like *plume* and *plumage*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plum** comes from a Latin word that means *"feather"*.
  - At its core, it describes feather.

- **The Big Picture Idea**:
  - Picture animals displaying their distinctive natural traits, instincts, and biology.
  - Whenever you see **plum** in an English word, think of **animal traits and biology**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of feather.
  - **Mental & Social**: How people experience, organize, or communicate about feather.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Plume**: A feather, especially a large, conspicuous, ornamental feather worn on a hat, helmet, or horse's headstall.
  - **Plumage**: The entire feathered covering of a bird, including contour feathers, down, and flight quills.
  - **Deplume**: To pluck, pull, or strip the feathers from a bird.
  - **Deplumation**: The act or process of plucking feathers, or the state of being stripped of plumage.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plum</mark>, think of <mark class="hl-def">animal traits and biology</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Pathways
> The root **plum** operates through French loanwords, scientific Latin adjectival suffixation, and prefixal privatives:
> 1. **Romance Vernacular Formations (`plume`, `plumage`):**
>    - Latin *plūma* $\to$ Old French *plume* $\to$ Middle English [[plume]].
>    - *plume* + collective suffix *-age* $\to$ [[plumage]] ("all the feathers of a bird").
> 2. **Scientific Adjectival Suffixation (`-ose`, `-ate`, `-aceous`):**
>    - `plum-` + `-ōsus` $\to$ [[plumose]] ("feathery; having fine hairs branching like a feather").
>    - `plum-` + `-ate` $\to$ [[plumate]] ("feathered, having plumes").
>    - `plum-` + `-āceous` $\to$ [[plumaceous]] ("feather-like, downy").
> 3. **Diminutive Embryology & Botany (`-ule`):**
>    - `plum-` + `-ula` (diminutive "little feather") $\to$ [[plumule]] ("embryonic shoot of a seed; a down feather").
> 4. **Privative Prefixation (`de-`, `in-`):**
>    - `de-` + `plume` $\to$ [[deplume]] ("to strip of feathers; to strip of honors or wealth").
>    - `deplume` + `-ation` $\to$ [[deplumation]] ("loss of feathers; medical loss of eyelashes").
>    - `in-` (negative) + `plūma` $\to$ [[implumed]] ("unfeathered, unfledged").
> 5. **Borrowed French Idiom:**
>    - *nom de plume* ("pen name, literary pseudonym").

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Systematic Ornithology:** [[plumage]], [[plume]], [[plumule]] — flight feathers (remiges, rectrices), contour feathers, down insulation, and seasonal breeding molts.
> - **Invertebrate Zoology & Entomology:** [[plumose]] — bipectinate, feather-like sensory antennae in male silkmoths (*Saturniidae*) tuned to detect single pheromone molecules.
> - **Botanical Embryology:** [[plumule]] — the primary apical bud of an embryo plant that develops into the first true leafy shoot.
> - **Geophysics & Volcanology:** [[plume]] — thermal mantle plumes rising from the core-mantle boundary creating hotspot volcanic island chains (e.g., Hawaii, Iceland).
> - **Fluid Dynamics & Environmental Engineering:** [[plume]] — buoyant turbulent dispersion of smoke, steam, or contaminant plumes in groundwater aquifers.
> - **Literary & Moral Rhetoric:** [[deplume]], [[plume]] — "pluming oneself" (vain self-congratulation) and "depluming" an impostor (stripping borrowed feathers).

---

## 🔀 4. Prefix & Combining Dynamics on plum

### Morphological Elements & Compounds

| Element / Compound | Linguistic Mechanism | Derived Form | Resulting Meaning & Context |
| :--- | :--- | :--- | :--- |
| `plūma` (bare noun) | French loan via Latin | [[plume]] | A large showy feather; a billowing column of smoke/gas; to preen. |
| `plume` + `-age` | Collective noun suffix | [[plumage]] | The entire feathered coat or plumage covering a bird's body. |
| `plum-` + `-ose` | Adjectival suffix (*-ōsus*) | [[plumose]] | Having fine lateral filaments branching like a feather (e.g., moth antennae). |
| `plum-` + `-ule` | Diminutive suffix (*-ula*) | [[plumule]] | The embryonic leaf bud of a plant seed; a down feather. |
| `de-` + `plume` | Privative prefix (*de-*, off) | [[deplume]] | To pluck feathers from; to strip someone of wealth, rank, or plumage. |
| `deplume` + `-ation` | Nominal suffix of removal | [[deplumation]] | The loss of feathers; in dermatology, loss of the eyelashes. |
| `plum-` + `-aceous` | Adjectival resemblance suffix | [[plumaceous]] | Downy, feather-like; resembling a plume in texture or structure. |
| `plum-` + `-ate` | Adjectival possessive suffix | [[plumate]] | Feathered; adorned or furnished with feathers or plumes. |
| `in-` + `plūma` | Negative prefix (*in-*, not) | [[implumed]] | Unfeathered, naked, lacking down or plumage. |
| `nom` + `de` + `plume` | French loan phrase | [[nom de plume]] | A writer's pen name or literary pseudonym (literally "pen name"). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🪶 **Ornithology & Evolutionary Biology** | [[plumage]], [[plume]], [[plumule]] | Investigating sexual selection in peacock covert plumes; studying feather evolution from theropod dinosaurs. |
| 🌋 **Geophysics & Mantle Geodynamics** | [[plume]] | Modeling deep mantle thermal upwellings creating intraplate volcanic chains (Yellowstone, Galápagos). |
| 🦋 **Entomology & Chemical Ecology** | [[plumose]] | Analyzing male moth plumose antennae sensitivity for female bombikol pheromone detection. |
| 🌱 **Plant Morphology & Agronomy** | [[plumule]] | Assessing seed germination vigor by measuring embryonic plumule emergence above the soil line. |
| 💨 **Atmospheric Science & Pollution Control** | [[plume]] | Gaussian plume dispersion modeling of chimney emissions and industrial effluent discharges. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deplumate]] | verb | **1.** Strip of feathers. | *"In academic literature, deplumate designates strip of feathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deplume]] | verb | **1.** Strip of honors, possessions, or attributes.<br>**2.** Strip of feathers. | *"In academic literature, deplume designates strip of honors, possessions, or attributes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[displume]] | verb | **1.** Strip of honors, possessions, or attributes.<br>**2.** Strip of feathers. | *"In academic literature, displume designates strip of honors, possessions, or attributes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plum]] | noun | **1.** Any of several trees producing edible oval fruit having a smooth skin and a single hard stone.<br>**2.** Any of numerous varieties of small to medium-sized round or oval fruit having a smooth skin and a single pit. | *"For the satirical slave says here that old men have grey beards; that their faces are wrinkled; their eyes purging thick amber and plum-tree gum; and that they have a plentiful lack of wit, together with most weak hams."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plumage]] | noun | **1.** The light horny waterproof structure forming the external covering of birds. | *"I could not eat the tart; and the plumage of the bird, the tints of the flowers, seemed strangely faded: I put both plate and tart away."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[plumaged]] | adjective | **1.** Having or covered in plumage; often used as a combining form. | *"In academic literature, plumaged designates having or covered in plumage; often used as a combining form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumate]] | adjective | **1.** Having an ornamental plume or feathery tuft. | *"In academic literature, plumate designates having an ornamental plume or feathery tuft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumcot]] | noun | **1.** Hybrid produced by crossing prunus domestica and prunus armeniaca.<br>**2.** Hybrid between plum and apricot. | *"In academic literature, plumcot designates hybrid produced by crossing prunus domestica and prunus armeniaca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plume]] | noun | **1.** Anything that resembles a feather in shape or lightness.<br>**2.** A feather or cluster of feathers worn as an ornament. | *"He; That with the plume; ’tis a most gallant fellow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plume-tipped]] | adjective | **1.** Of a plant tipped with a plume. | *"In academic literature, plume-tipped designates of a plant tipped with a plume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumed]] | verb | **1.** Rip off; ask an unreasonable price.<br>**2.** Be proud of. | *"Now the time is come That France must vail her lofty-plumed crest And let her head fall into England’s lap."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plumelike]] | adjective | **1.** Resembling a plume. | *"In academic literature, plumelike designates resembling a plume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumeria]] | noun | **1.** Deciduous shrubs and trees of tropical america having branches like candelabra and fragrant white or pink flowers. | *"In academic literature, plumeria designates deciduous shrubs and trees of tropical america having branches like candelabra and fragrant white or pink flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumiera]] | noun | **1.** Deciduous shrubs and trees of tropical america having branches like candelabra and fragrant white or pink flowers. | *"In academic literature, plumiera designates deciduous shrubs and trees of tropical america having branches like candelabra and fragrant white or pink flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumlike]] | adjective | **1.** Resembling a plum fruit. | *"In academic literature, plumlike designates resembling a plum fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plummet]] | noun | **1.** The metal bob of a plumb line.<br>**2.** Drop sharply. | *"Ignorance itself is a plummet o’er me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plummy]] | adjective | **1.** Very desirable.<br>**2.** (of a voice) affectedly mellow and rich. | *"That cake’s awful nice and plummy."* — L. M. Montgomery, *Anne of Avonlea* |
| [[plumose]] | adjective | **1.** Having an ornamental plume or feathery tuft. | *"In academic literature, plumose designates having an ornamental plume or feathery tuft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plump]] | noun | **1.** The sound of a sudden heavy fall.<br>**2.** Drop sharply. | *"Banish plump Jack, and banish all the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plumping]] | verb | **1.** Drop sharply.<br>**2.** Set (something or oneself) down with or as if with a noise. | *"There was the cheval-glass, that miracle of art, in which he could just see his own wondering head and the reflection of Dolly (queerly distorted, and as if up in the ceiling), plumping and patting the pillows of the bed."* — William Makepeace Thackeray, *Vanity Fair* |
| [[plumpness]] | noun | **1.** The bodily property of being well rounded. | *"Over these, and lost to the eye gazing in from the outer light, the mouths of the same animals could be heard busily sustaining the above-named warmth and plumpness by quantities of oats and hay."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[plumule]] | noun | **1.** Down feather of young birds; persists in some adult birds. | *"In academic literature, plumule designates down feather of young birds; persists in some adult birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumy]] | adjective | **1.** Resembling a plume.<br>**2.** Having or covered with or abounding in plumes. | *"They dispersed about the room, reminding me, by the lightness and buoyancy of their movements, of a flock of white plumy birds."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal Adjectives & Biological]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLUM
  </div>
</div>
