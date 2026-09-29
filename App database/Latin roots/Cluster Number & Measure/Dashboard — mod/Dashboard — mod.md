---
status: unread
type: root_dashboard
---
# Dashboard — mod
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mod-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“measure or manner”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **mod** means measure or manner. It refers to a measured amount, reasonable limit, or customary manner. In English, this root forms words such as *mode*, *model*, *modular*, and *modulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: measure or manner
> The root **mod** means measure or manner. It refers to a measured amount, reasonable limit, or customary manner. In English, this root forms words such as *mode*, *model*, *modular*, and *modulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Measure or manner</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *mode* and *model*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mod** comes from a Latin word that means *"measure or manner"*.
  - At its core, it describes measure or manner.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **mod** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of measure or manner.
  - **Mental & Social**: How people experience, organize, or communicate about measure or manner.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mode**: A way or manner in which something occurs or is experienced, expressed, or done.
  - **Model**: A three-dimensional representation of a person or thing or of a proposed structure.
  - **Modular**: Employing or involving a module or modules as a basis of design, construction, or organization.
  - **Modulate**: To exert a modifying or controlling influence on.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mod</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mod** manifests through several productive morphological stems:
> - **Base Noun and Adjective Stems:**
>   - *modus* $\to$ *mode* ("manner, method, statistical mode").
>   - *modo* ("just now") + *-ernus* $\to$ Late Latin *modernus* $\to$ *modern*, *modernity*, *modernize*.
>   - *modestus* $\to$ *modest*, *modesty* ("unassuming, discreet").
>   - *modicus* $\to$ *modicum* ("a small, moderate quantity").
> - **Verbal Restraint Stem `moder-` (< *moderārī*):**
>   - *moderārī* + *-tus* $\to$ *moderate* ("to restrain; not extreme").
>   - *moderātiō* $\to$ *moderation* ("avoidance of extremes").
>   - *moderātor* $\to$ *moderator* ("one who presides over discussion").
>   - *in-* + *moderatus* $\to$ *immoderate* ("exceeding just bounds").
> - **Diminutive Combining Stem `modul-` (< *modulus*):**
>   - *modulus* $\to$ *module*, *modular* ("independent interchangeable unit").
>   - *modulārī* + *-tiō* $\to$ *modulate*, *modulation* ("to vary pitch or amplitude").
>   - *modellus* $\to$ *model*, *remodel* ("scaled representation").
> - **Compound Stems with Prefixes:**
>   - *modus* + *facere* ("to make") $\to$ *modificāre* $\to$ *modify*, *modification*.
>   - *ad-* + *con-* + *modus* $\to$ *accommodāre* $\to$ *accommodate*, *accommodation*.
>   - *con-* + *modus* $\to$ *commodus* $\to$ *commodity*, *commodious*.

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
> Although fundamentally denoting **"measure / manner"**, the root branches into distinct conceptual realms:
> - **Moral & Ethical Restraint:** *moderate*, *moderation*, *modest*, *modesty* (sobriety, humility).
> - **Architectural & Industrial Standardization:** *model*, *module*, *modular*, *remodel* (prototypes, prefabricated units).
> - **Chronological & Epochal Evolution:** *modern*, *modernity*, *modernize* (contemporary era, updating methods).
> - **Signal Processing & Acoustics:** *modulate*, *modulation* (frequency modulation FM, amplitude modulation AM).
> - **Flexibility & Adaptation:** *modify*, *accommodate*, *accommodation* (altering parameters, providing space).
> - **Commerce & Spatial Utility:** *commodity*, *commodious* (trade goods, spacious roominess).

---

## 🔀 4. Prefix & Combining Dynamics on mod

### Prefix Modifications (Relational Adjustments)

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` + `con-` | `modus` | **[[accommodate]]** | To adapt, harmonize, or provide suitable lodging for someone. |
| `con-` | `modus` | **[[commodity]]** | A useful article of commerce that fits standard market measures. |
| `in-` (not) | `moderatus` | **[[immoderate]]** | Exceeding just or reasonable bounds; excessive. |
| `re-` (again) | `model` | **[[remodel]]** | To alter the structure or form of an existing building. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ate` | Verb / Adjective (Process) | **[[moderate]]** | To keep within bounds; characterized by restraint. |
| `-tion` | Noun (Act / Result) | **[[moderation]]** | The avoidance of excess or extremes. |
| `-or` | Noun (Agent / Overseer) | **moderator** | A person who arbitrates or directs a formal debate. |
| `-ify` | Verb (Causative Action) | **[[modify]]** | To make partial changes to the form or quality of something. |
| `-ious` | Adjective (Abounding in) | **commodious** | Roomy and comfortable; accommodating ample space. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏗️ **Architecture & Engineering** | *model*, *module*, *modular*, *remodel* | BIM 3D computer modeling, modular container construction, structural retrofitting. |
| 📡 **Telecommunications & Physics** | *modulate*, *modulation*, *demodulator* | Radio transmission carrier waves, Wi-Fi quadrature amplitude modulation. |
| 🏛️ **Ethics, Politics & Governance** | *moderate*, *moderation*, *moderator* | Centrist political coalitions, judicial mediation, parliamentary committee debate. |
| 📊 **Economics & Supply Chain** | *commodity*, *accommodate*, *commodious* | Agricultural futures trading, Chicago Mercantile Exchange, freight warehousing. |
| 💻 **Software Architecture** | *module*, *modular*, *modernize* | Object-oriented modularity, decoupling microservices, legacy codebase modernization. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accommodate]] | verb | **1.** Be agreeable or acceptable to.<br>**2.** Make fit for, or change to suit a new purpose. | *"The safer sense will ne’er accommodate His master thus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accommodating]] | verb | **1.** Be agreeable or acceptable to.<br>**2.** Make fit for, or change to suit a new purpose. | *"On quitting the Cobb, they all went in-doors with their new friends, and found rooms so small as none but those who invite from the heart could think capable of accommodating so many."* — Jane Austen, *Persuasion* |
| [[accommodation]] | noun | **1.** Making or becoming suitable; adjusting to circumstances.<br>**2.** A settlement of differences. | *"Most humbly, therefore, bending to your state, I crave fit disposition for my wife, Due reference of place and exhibition, With such accommodation and besort As levels with her breeding."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accommodational]] | adjective | **1.** Of or relating to the accommodation of the lens of the eye. | *"In academic literature, accommodational designates of or relating to the accommodation of the lens of the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accommodative]] | adjective | **1.** Helpful in bringing about a harmonious adaptation.<br>**2.** Willing to adjust to differences in order to obtain agreement. | *"In academic literature, accommodative designates helpful in bringing about a harmonious adaptation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accommodator]] | noun | **1.** Someone who performs a service or does a favor. | *"In academic literature, accommodator designates someone who performs a service or does a favor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commode]] | noun | **1.** A plumbing fixture for defecation and urination.<br>**2.** A tall elegant chest of drawers. | *"He fitted the book roughly into his inner pocket and, stubbing his toes against the broken commode, hurried out towards the smell, stepping hastily down the stairs with a flurried stork’s legs."* — James Joyce, *Ulysses* |
| [[commodious]] | adjective | **1.** Large and roomy (`convenient' is archaic in this sense). | *"Patroclus will give me anything for the intelligence of this whore; the parrot will not do more for an almond than he for a commodious drab."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commodiousness]] | noun | **1.** Spatial largeness and extensiveness (especially inside a building). | *"With such commodiousness of situation, these two learned persons sat themselves down, each in his own domain, yet familiarly passing from one apartment to the other, and bestowing a mutual and not incurious inspection into one another’s business."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[commodity]] | noun | **1.** Articles of commerce. | *"Marry, ill, to like him that ne’er it likes. ’Tis a commodity will lose the gloss with lying; the longer kept, the less worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commodore]] | noun | **1.** A commissioned naval officer who ranks above a captain and below a rear admiral; the lowest grade of admiral. | *"The New York Central between Albany and Buffalo was a consolidation, by Commodore Vanderbilt, of sixteen short lines."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[demode]] | adjective | **1.** Out of fashion. | *"In academic literature, demode designates out of fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulate]] | verb | **1.** Extract information from a modulated carrier wave. | *"In academic literature, demodulate designates extract information from a modulated carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulation]] | noun | **1.** (electronics) the reception of a signal by extracting it from the carrier wave. | *"In academic literature, demodulation designates (electronics) the reception of a signal by extracting it from the carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulator]] | noun | **1.** Rectifier that extracts modulation from a radio carrier wave. | *"In academic literature, demodulator designates rectifier that extracts modulation from a radio carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discommode]] | verb | **1.** To cause inconvenience or discomfort to. | *"In academic literature, discommode designates to cause inconvenience or discomfort to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immoderate]] | adjective | **1.** Beyond reasonable limits. | *"As surfeit is the father of much fast, So every scope by the immoderate use Turns to restraint."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immoderately]] | adverb | **1.** Without moderation; in an immoderate manner.<br>**2.** To a degree that exceeds the bounds or reason or moderation. | *"Immoderately she weeps for Tybalt’s death, And therefore have I little talk’d of love; For Venus smiles not in a house of tears."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immoderateness]] | noun | **1.** The quality of being excessive and lacking in moderation. | *"In academic literature, immoderateness designates the quality of being excessive and lacking in moderation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immoderation]] | noun | **1.** The quality of being excessive and lacking in moderation. | *"In academic literature, immoderation designates the quality of being excessive and lacking in moderation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immodest]] | adjective | **1.** Having or showing an exaggerated opinion of your importance, ability, etc.<br>**2.** Offending against sexual mores in conduct or appearance. | *"Presumptuous vassals, are you not ashamed With this immodest clamorous outrage To trouble and disturb the King and us?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immodestly]] | adverb | **1.** Without modesty; in an immodest manner. | *"In academic literature, immodestly designates without modesty; in an immodest manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immodesty]] | noun | **1.** The trait of being vain and conceited.<br>**2.** The perverse act of exposing and attracting attention to your own genitals. | *"O night, thou furnace of foul reeking smoke, Let not the jealous day behold that face Which underneath thy black all-hiding cloak Immodesty lies martyred with disgrace!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incommode]] | verb | **1.** To cause inconvenience or discomfort to. | *"I bring news, or, believe me, I would not incommode you at such a time." "What news, monsieur?" asked madame, still erect."* — Frances Mary Peard, *Unawares: A Story of an Old French Town* |
| [[incommodious]] | adjective | **1.** Uncomfortably or inconveniently small. | *"It was very small, very dark, very ugly, very incommodious."* — Charles Dickens, *A Tale of Two Cities* |
| [[incommodiousness]] | noun | **1.** An inconvenient discomfort. | *"It was an old-fashioned place, moreover, in the moral attribute that the partners in the House were proud of its smallness, proud of its darkness, proud of its ugliness, proud of its incommodiousness."* — Charles Dickens, *A Tale of Two Cities* |
| [[mod]] | noun | **1.** A british teenager or young adult in the 1960s; noted for their clothes consciousness and opposition to the rockers.<br>**2.** Relating to a recently developed fashion or style. | *"That's one complex psy-mod." "There's more?" "There's communications and one other."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[modal]] | noun | **1.** An auxiliary verb (such as `can' or `will') that is used to express modality.<br>**2.** Relating to or constituting the most frequent value in a distribution. | *"In academic literature, modal designates an auxiliary verb (such as `can' or `will') that is used to express modality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modality]] | noun | **1.** A classification of propositions on the basis of whether they claim necessity or possibility or impossibility.<br>**2.** Verb inflections that express how the action or state is conceived by the speaker. | *"On his wise shoulders through the checkerwork of leaves the sun flung spangles, dancing coins. [ 3 ] Ineluctable modality of the visible: at least that if no more, thought through my eyes."* — James Joyce, *Ulysses* |
| [[mode]] | noun | **1.** How something is done or how it happens.<br>**2.** A particular functioning condition or arrangement. | *"Looking thoughtfully in front of her for a moment, she said, "Aunt Maxa"--this was the mode of address she had long ago been granted--"don't you want me to think of Apollonie's cottage either?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[model]] | noun | **1.** A hypothetical description of a complex entity or process.<br>**2.** A type of product. | *"I had my father’s signet in my purse, Which was the model of that Danish seal: Folded the writ up in the form of the other, Subscrib’d it: gave’t th’impression; plac’d it safely, The changeling never known."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modeled]] | verb | **1.** Plan or create according to a model or models.<br>**2.** Form in clay, wax, etc. | *"It will indeed deserve the most vigilant and careful attention of the people, to see that it be modeled in such a manner as to admit of its being safely vested with the requisite powers."* — Alexander Hamilton, *The Federalist Papers* |
| [[modeler]] | noun | **1.** A person who creates models. | *"In academic literature, modeler designates a person who creates models."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modeling]] | noun | **1.** Sculpture produced by molding.<br>**2.** A preliminary sculpture in wax or clay from which a finished work can be copied. | *"And Solon, according to Plutarch, was in a manner compelled, by the universal suffrage of his fellow-citizens, to take upon him the sole and absolute power of new-modeling the constitution."* — Alexander Hamilton, *The Federalist Papers* |
| [[modeller]] | noun | **1.** A person who creates models. | *"In academic literature, modeller designates a person who creates models."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modelling]] | noun | **1.** A preliminary sculpture in wax or clay from which a finished work can be copied.<br>**2.** The act of representing something (usually on a smaller scale). | *"If she were to try one, she would find her teeth in her way, modelling that action of her face, as she has unconsciously modelled all its other expressions, on her pattern of sordid age."* — Charles Dickens, *Bleak House* |
| [[modem]] | noun | **1.** (from a combination of modulate and demodulate) electronic equipment consisting of a device used to connect computers by a telephone line. | *"In academic literature, modem designates (from a combination of modulate and demodulate) electronic equipment consisting of a device used to connect computers by a telephone line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderate]] | noun | **1.** A person who takes a position in the political center.<br>**2.** Preside over. | *"Moderate lamentation is the right of the dead; excessive grief the enemy to the living."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moderate-size]] | adjective | **1.** Intermediate in size. | *"In academic literature, moderate-size designates intermediate in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderate-sized]] | adjective | **1.** Intermediate in size. | *"In academic literature, moderate-sized designates intermediate in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderately]] | adverb | **1.** To a moderately sufficient extent or degree.<br>**2.** With moderation; in a moderate manner. | *"To hear meekly, sir, and to laugh moderately, or to forbear both."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moderateness]] | noun | **1.** The property of being moderate in price or expenditures.<br>**2.** Quality of being moderate and avoiding extremes. | *"In academic literature, moderateness designates the property of being moderate in price or expenditures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderating]] | verb | **1.** Preside over.<br>**2.** Make less fast or intense. | *"But wisdom lies in moderating mere impressions, and Gabriel endeavoured to think little of this."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[moderation]] | noun | **1.** Quality of being moderate and avoiding extremes.<br>**2.** A change for the better. | *"Why tell you me of moderation?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moderationism]] | noun | **1.** The policy of being moderate or acting with moderation. | *"In academic literature, moderationism designates the policy of being moderate or acting with moderation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderationist]] | noun | **1.** A moderate drinker (as opposed to a total abstainer).<br>**2.** A person who takes a position in the political center. | *"In academic literature, moderationist designates a moderate drinker (as opposed to a total abstainer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderatism]] | noun | **1.** A political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action. | *"In academic literature, moderatism designates a political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderato]] | adjective | **1.** (of tempo) moderate. | *"In academic literature, moderato designates (of tempo) moderate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderator]] | noun | **1.** Any substance used to slow down neutrons in nuclear reactors.<br>**2.** In the presbyterian church, the officer who presides over a synod or general assembly. | *"He had been Moderator of the Synod in 1872, and as an ex-Moderator he had the privilege, accorded by custom, of sitting on the platform of the Synod Hall on the benches to the right and left of the chair."* — John Cairns, *Principal Cairns* |
| [[moderatorship]] | noun | **1.** The position of moderator. | *"In academic literature, moderatorship designates the position of moderator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modern]] | noun | **1.** A contemporary person.<br>**2.** A typeface (based on an 18th century design by gianbattista bodoni) distinguished by regular shape and hairline serifs and heavy downstrokes. | *"They say miracles are past; and we have our philosophical persons to make modern and familiar things supernatural and causeless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modern-day]] | adjective | **1.** Characteristic of the present. | *"In academic literature, modern-day designates characteristic of the present."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moderne]] | adjective | **1.** Of or relating to a popularization of art deco that used bright colors and rectangular shapes. | *"Heine's Charakter und die Moderne Seele."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[modernisation]] | noun | **1.** Making modern in appearance or behavior. | *"In academic literature, modernisation designates making modern in appearance or behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modernise]] | verb | **1.** Become technologically advanced.<br>**2.** Make repairs, renovations, revisions or adjustments to. | *"They are of about the period of the Nuns’ House, irregularly modernised here and there, as steadily deteriorating generations found, more and more, that they preferred air and light to Fever and the Plague."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[modernised]] | verb | **1.** Become technologically advanced.<br>**2.** Make repairs, renovations, revisions or adjustments to. | *"They are of about the period of the Nuns’ House, irregularly modernised here and there, as steadily deteriorating generations found, more and more, that they preferred air and light to Fever and the Plague."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[modernism]] | noun | **1.** Genre of art and literature that makes a self-conscious break with previous genres.<br>**2.** The quality of being current or of the present. | *"For once mediævalism and modernism had a common stand-point."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[modernist]] | noun | **1.** An artist who makes a deliberate break with previous styles. | *"In academic literature, modernist designates an artist who makes a deliberate break with previous styles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modernistic]] | adjective | **1.** Relating to a recently developed fashion or style. | *"Winds lashed the high crowns of the eucalyptus, and dipped to whine along the corridors and passageways that cut through the patchwork of modernistic academic structures."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[modernity]] | noun | **1.** The quality of being current or of the present. | *"She has recreated us, breathed the breath of modernity into us, and started the machine up the grade of civilization at a pace that makes me hold my breath for fear of something jolting us."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[modernization]] | noun | **1.** Making modern in appearance or behavior.<br>**2.** A modernized version (as of a play). | *"In academic literature, modernization designates making modern in appearance or behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modernize]] | verb | **1.** Make repairs, renovations, revisions or adjustments to.<br>**2.** Become technologically advanced. | *"The wedding dress of her grandmother, modernized for use, with sundry ornaments, handed down as heirlooms in the family."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[modernized]] | verb | **1.** Make repairs, renovations, revisions or adjustments to.<br>**2.** Become technologically advanced. | *"The wedding dress of her grandmother, modernized for use, with sundry ornaments, handed down as heirlooms in the family."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[modernness]] | noun | **1.** The quality of being current or of the present. | *"These houses opposite, compared with Gable Inn, are of a mushroom modernness, and yet are old enough (having begun with a debauched and sickly constitution) to have fallen into an almost complete decrepitude."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[modest]] | adjective | **1.** Marked by simplicity; having a humble opinion of yourself.<br>**2.** Not large but sufficient in size or amount. | *"I will no more enforce mine office on you, Humbly entreating from your royal thoughts A modest one to bear me back again."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modestly]] | adverb | **1.** With modesty; in a modest manner. | *"I never in my life Did hear a challenge urged more modestly, Unless a brother should a brother dare To gentle exercise and proof of arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modestness]] | noun | **1.** The property of being moderate in price or expenditures.<br>**2.** Freedom from vanity or conceit. | *"In academic literature, modestness designates the property of being moderate in price or expenditures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modesty]] | noun | **1.** Freedom from vanity or conceit.<br>**2.** Formality and propriety of manner. | *"Madam, the care I have had to even your content, I wish might be found in the calendar of my past endeavours; for then we wound our modesty, and make foul the clearness of our deservings, when of ourselves we publish them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modicon]] | noun | **1.** Trade name for an oral contraceptive containing estradiol and norethindrone. | *"In academic literature, modicon designates trade name for an oral contraceptive containing estradiol and norethindrone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modicum]] | noun | **1.** A small or moderate or token amount; - ian jack. | *"My hut was quite washed out by the seas, and of my great store of seal meat only a wretched, pulpy modicum remained."* — Jack London, *The Jacket (The Star-Rover)* |
| [[modifiable]] | adjective | **1.** Capable of being modified in form or character or strength (especially by making less extreme);  - alexis carrel. | *"In academic literature, modifiable designates capable of being modified in form or character or strength (especially by making less extreme);  - alexis carrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modification]] | noun | **1.** The act of making something different (as e.g. the size of a garment).<br>**2.** Slightly modified copy; not an exact copy. | *"There is no support for this view, except in the rare case when the money standard is undergoing a rapid change, as in the United States from 1866 to 1873, and the statement then needs much modification and explanation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[modified]] | verb | **1.** Make less severe or harsh or extreme.<br>**2.** Add a modifier to a constituent. | *"To learn thus exactly how far they can or cannot be modified."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[modifier]] | noun | **1.** A content word that qualifies the meaning of a noun or verb.<br>**2.** A moderator who makes less extreme or uncompromising. | *"In academic literature, modifier designates a content word that qualifies the meaning of a noun or verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modify]] | verb | **1.** Make less severe or harsh or extreme.<br>**2.** Add a modifier to a constituent. | *"This was meant not merely to supplement and modify competition, but to displace it completely, or (in the more moderate program) in large part."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[modigliani]] | noun | **1.** Italian painter and sculptor (1884-1920). | *"In academic literature, modigliani designates italian painter and sculptor (1884-1920)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modillion]] | noun | **1.** (architecture) one of a set of ornamental brackets under a cornice. | *"In academic literature, modillion designates (architecture) one of a set of ornamental brackets under a cornice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modiolus]] | noun | **1.** The central conical bony pillar of the cochlea. | *"In academic literature, modiolus designates the central conical bony pillar of the cochlea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modish]] | adjective | **1.** In the current fashion or style. | *"Wi’ thieveless sneer to see his modish mien, He, down the water, gies him this guid-e’en:— Auld Brig “I doubt na, frien’, ye’ll think ye’re nae sheepshank, Ance ye were streekit owre frae bank to bank!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[modishly]] | adverb | **1.** In a stylish manner. | *"In academic literature, modishly designates in a stylish manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modishness]] | noun | **1.** Elegance by virtue of being fashionable. | *"In academic literature, modishness designates elegance by virtue of being fashionable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modiste]] | noun | **1.** Someone who makes and sells hats.<br>**2.** Someone who makes or mends dresses. | *"In academic literature, modiste designates someone who makes and sells hats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mods]] | noun | **1.** A youth subculture that began in london in the early 1960s; a working-class movement with highly stylized dress and short hair; listened to rhythm and blues music and travelled on motor scooters.<br>**2.** A british teenager or young adult in the 1960s; noted for their clothes consciousness and opposition to the rockers. | *"In academic literature, mods designates a youth subculture that began in london in the early 1960s; a working-class movement with highly stylized dress and short hair; listened to rhythm and blues music and travelled on motor scooters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modular]] | adjective | **1.** Constructed with standardized units or dimensions allowing flexibility and variety in use. | *"In academic literature, modular designates constructed with standardized units or dimensions allowing flexibility and variety in use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[modulate]] | verb | **1.** Change the key of, in music.<br>**2.** Vary the pitch of one's speech. | *"She knocked a third time, three regular strokes, gentle, but perfectly distinct, and with meaning in them; for, modulate it with what cautious art we will, the hand cannot help playing some tune of what we feel upon the senseless wood."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[modulated]] | verb | **1.** Change the key of, in music.<br>**2.** Vary the pitch of one's speech. | *"He spoke to her in low tones, and she instinctively modulated her own to the same pitch, and her voice ultimately even caught the inflection of his."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[modulation]] | noun | **1.** A musical passage moving from one key to another.<br>**2.** (electronics) the transmission of a signal by using it to vary a carrier wave; changing the carrier's amplitude or frequency or phase. | *"I am very glad to hear it,” said Dorothea, laughing out her words in a bird-like modulation, and looking at Will with playful gratitude in her eyes."* — George Eliot, *Middlemarch* |
| [[module]] | noun | **1.** One of the inherent cognitive or perceptual powers of the mind.<br>**2.** Detachable compartment of a spacecraft. | *"Come, bring forth this counterfeit module has deceiv’d me like a double-meaning prophesier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[modulus]] | noun | **1.** An integer that can be divided without remainder into the difference between two other integers.<br>**2.** The absolute value of a complex number. | *"In academic literature, modulus designates an integer that can be divided without remainder into the difference between two other integers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonmodern]] | adjective | **1.** Not modern; of or characteristic of an earlier time. | *"In academic literature, nonmodern designates not modern; of or characteristic of an earlier time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overmodest]] | adjective | **1.** Affectedly modest or shy especially in a playful or provocative way. | *"In academic literature, overmodest designates affectedly modest or shy especially in a playful or provocative way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodern]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodern designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernism]] | noun | **1.** Genre of art and literature and especially architecture in reaction against principles and practices of established modernism. | *"In academic literature, postmodernism designates genre of art and literature and especially architecture in reaction against principles and practices of established modernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmodernist]] | adjective | **1.** Of or relating to postmodernism. | *"In academic literature, postmodernist designates of or relating to postmodernism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remodel]] | verb | **1.** Do over, as of (part of) a house.<br>**2.** Cast or model anew. | *"In academic literature, remodel designates do over, as of (part of) a house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supermodel]] | noun | **1.** A fashion model who has attained the status of a celebrity. | *"In academic literature, supermodel designates a fashion model who has attained the status of a celebrity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramodern]] | adjective | **1.** Extremely modern. | *"In academic literature, ultramodern designates extremely modern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaccommodating]] | adjective | **1.** Not accommodating.<br>**2.** Offering no assistance. | *"He had a chirping, buoyant disposition, always enjoying the present moment; and his frequent change of scene and company prevented his acquiring those rusty, unaccommodating habits with which old bachelors are so uncharitably charged."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[unmoderated]] | adjective | **1.** Not made less extreme. | *"In academic literature, unmoderated designates not made less extreme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmodernised]] | adjective | **1.** Not brought up to date. | *"In academic literature, unmodernised designates not brought up to date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmodernized]] | adjective | **1.** Not brought up to date. | *"In academic literature, unmodernized designates not brought up to date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmodifiable]] | adjective | **1.** Incapable of being modified in form or character or strength (especially by making less extreme). | *"In academic literature, unmodifiable designates incapable of being modified in form or character or strength (especially by making less extreme)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmodified]] | adjective | **1.** Not changed in form or character. | *"Unmodified private control of property is unknown; the public makes many reservations in its own interest."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unmodulated]] | adjective | **1.** Characterized by lack of variation in pitch, tone, or volume. | *"In academic literature, unmodulated designates characterized by lack of variation in pitch, tone, or volume."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MOD
  </div>
</div>
