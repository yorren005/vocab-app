---
status: unread
type: root_dashboard
---
# Dashboard — trunc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">trunc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“trunk or cut short”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **trunc** means trunk or cut short. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *truncate*, *truncation*, *truncated*, and *truncature*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: trunk or cut short
> The root **trunc** means trunk or cut short. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *truncate*, *truncation*, *truncated*, and *truncature*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Trunk or cut short</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *truncate* and *truncation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **trunc** comes from a Latin word that means *"trunk or cut short"*.
  - At its core, it describes trunk or cut short.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **trunc** in an English word, think of **breaking apart and destruction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of trunk or cut short.
  - **Mental & Social**: How people experience, organize, or communicate about trunk or cut short.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Truncate**: To shorten by or as if by cutting off the end or a part.
  - **Truncation**: The act of truncating, or the state of being truncated.
  - **Truncated**: Cut short.
  - **Truncature**: The state of being truncated or cut short.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">trunc</mark>, think of <mark class="hl-def">breaking apart and destruction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Lexical Evolution
> The root **trunc** operates through three historical linguistic pathways into English:
> - **Direct Classical Verbal Stem (`truncat-`):** Borrowed directly from the Latin past participle *truncātus*, forming standard intellectual, mathematical, and technical verbs and nouns: [[truncate]], [[truncation]], [[truncated]], [[truncature]].
> - **Direct Nominal Core (`trunc-` / `trunk`):** Transmitted through Old French *tronc* into Middle English *tronke* / *trunk*, retaining the primary physical noun senses: tree bole, human torso, packing chest, elephant proboscis, and arterial vessel.
> - **Old French Diminutive & Derivative Stems (`tronçon-` / `trognon-`):** Medieval Romance added diminutive suffixes (*-on*, *-onchel*), yielding weapon terms like [[truncheon]] (a thick stick / shattered lance piece) and mechanical artillery mountings like [[trunnion]] (the cylindrical pivot pins resembling lopped branch stumps on cannon barrels).
> - **Prefixed Classical Compounds (`de-` / `ob-`):** Combining with Latin prefixes *de-* ("down, off") and *ob-* ("in front of, over"), producing intensive forms like [[detruncate]] and [[obtruncate]] ("to lop off limbs, behead").

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

> [!tip] 🌈 Five Major Facets of the `trunc` Family
> - **Mathematical & Computational Facet:** [[truncate]], [[truncation]], [[truncated]] — dropping digits beyond a precision limit without rounding, or stopping a Taylor series at an $n$-th degree polynomial.
> - **Anatomical & Embryological Facet:** [[trunk]], [[truncal]], *truncus arteriosus* — designating the torso of the body, central nerve/artery channels, and congenital heart anomalies.
> - **Material Culture & Luggage Facet:** [[trunk]] — traveling chests, steamer trunks, automobile storage boots, and elephant proboscises (by visual and structural analogy).
> - **Martial, Law Enforcement & Weaponry Facet:** [[truncheon]] — a heavy club of office, riot baton, or broken lance shaft.
> - **Surgical & Decapitative Facet:** [[detruncate]], [[detruncation]] — historical and obstetric terms for severing the head or lopping extremities.

---

## 🔀 4. Prefix & Combining Dynamics on trunc

### Prefix Modulation on `trunc`

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | core root | `trunc-` $\to$ **[[truncate]]**, **[[trunk]]** | "To cut off the top or ends; the solid bole or body that remains after severance." |
| `de-` | completely, down, away | `de-` + `truncāre` $\to$ **[[detruncate]]** | Intensive / privative prefix: "to cut off from above; to decapitate, lop off limbs, or prune down severely." |
| `ob-` | against, completely | `ob-` + `truncāre` $\to$ **[[obtruncate]]** | Intensive prefix: "to cut down, lop off branches or head; to prune thoroughly." |

### Suffix Transformations on `trunc`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ate` | Verb formative | [[truncate]], [[detruncate]] | To perform the act of shortening by cutting off extremities. |
| `-tion` | Abstract noun of action / state | [[truncation]], [[detruncation]] | The process of lopping off, or the resulting truncated state. |
| `-ed` | Participial adjective | [[truncated]] | Shortened, curtailed; geometrically lacking an apex or vertex. |
| `-al` | Adjective (relational) | [[truncal]] | Pertaining to the trunk or torso of the human body. |
| `-eon` / `-on` | Noun (Romance diminutive / agent) | [[truncheon]], [[trunnion]] | From Old French *-on*: a broken piece, short thick staff, or cylindrical pivot pin. |
| `-ature` | Noun of state / form | [[truncature]] | The physical appearance or plane produced by truncating a crystal angle. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| 💻 **Computer Science & Numerical Analysis** | [[truncate]], [[truncation]] | Truncation error occurs when an infinite mathematical algorithm is terminated after a finite number of steps, or when floating-point numbers drop fractional bits. |
| 📐 **Geometry & Crystallography** | [[truncated]], [[truncature]] | Truncated polyhedra (e.g., the truncated icosahedron forming a soccer ball or buckminsterfullerene $C_{60}$) have their vertices sliced off by planes. |
| 🩺 **Anatomy, Cardiology & Neurology** | [[truncal]], *truncus arteriosus* | Truncal obesity (visceral fat accumulation around the torso); truncal ataxia (loss of balance in the core musculature); *truncus arteriosus* (failure of aorta and pulmonary artery to divide). |
| 🛡️ **Law Enforcement & Medieval History** | [[truncheon]] | Constables carried turned wooden truncheons stamped with royal ciphers as both an offensive weapon and an official badge of authority. |
| 🚗 **Automotive Engineering & Travel** | [[trunk]], [[trunkline]] | The rear luggage compartment of an automobile derives its name from early motorcars carrying actual leather-and-wood trunks strapped to an external folding rack. |
| 🪓 **Forestry & Botany** | [[trunk]], [[detruncate]] | The primary woody stem (bole) of an arborescent plant; pollarding and pruning practices that lop upper boughs to promote dense growth. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[detruncate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin trunc within the domain of Destruction.<br>**2.** A technical or specialized form exhibiting the properties of trunc in systematic terminology. | *"In academic literature, detruncate designates pertaining to, derived from, or characteristic of latin trunc within the domain of destruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[truncate]] | verb | **1.** Replace a corner by a plane.<br>**2.** Approximate by ignoring all terms beyond a chosen one. | *"IRIS BRAND; spots obliterated; sori oblong, brown, surrounded by the scarious epidermis; spores obovate-oblong, even, attenuated below, upper cell abruptly truncate.—On _Iris fœtidissima_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[truncated]] | verb | **1.** Replace a corner by a plane.<br>**2.** Approximate by ignoring all terms beyond a chosen one. | *"The truncated apex of the Extractor's teleport gate cone glowed red, then violet, and thirty meters of its length disappeared into its new hyperspace home."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[truncation]] | noun | **1.** The property of being truncated or short.<br>**2.** The replacement of an edge or solid angle (as in cutting a gemstone) by a plane (especially by a plane that is equally inclined to the adjacent faces). | *"In academic literature, truncation designates the property of being truncated or short."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[truncheon]] | noun | **1.** A short stout club used primarily by policemen. | *"Falstaff meets him, playing on his truncheon like a fife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[truncocolumella]] | noun | **1.** A genus of fungi belonging to the family rhizopogonaceae. | *"In academic literature, truncocolumella designates a genus of fungi belonging to the family rhizopogonaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TRUNC
  </div>
</div>
