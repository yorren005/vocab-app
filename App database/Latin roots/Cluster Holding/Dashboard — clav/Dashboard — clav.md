---
status: unread
type: root_dashboard
---
# Dashboard — clav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">clav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“key”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **clav** means key. It refers to keys, locks, custody, anatomical struts, and nail-shaped structures. In English, this root forms words such as *clavicle*, *clavicular*, *claviculate*, and *subclavian*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: key
> The root **clav** means key. It refers to keys, locks, custody, anatomical struts, and nail-shaped structures. In English, this root forms words such as *clavicle*, *clavicular*, *claviculate*, and *subclavian*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Key</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *clavicle* and *clavicular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **clav** comes from a Latin word that means *"key"*.
  - At its core, it describes key.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **clav** in an English word, think of **holding tightly and keeping steady**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of key.
  - **Mental & Social**: How people experience, organize, or communicate about key.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Clavicle**: In human anatomy, the collarbone: an S-shaped bone linking the scapula and the sternum.
  - **Clavicular**: Relating to or situated near the clavicle.
  - **Claviculate**: In zoology, possessing clavicles.
  - **Subclavian**: Adj.** Situated beneath the clavicle.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">clav</mark>, think of <mark class="hl-def">holding tightly and keeping steady</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Unlike verbal roots that conjugate across active and passive stems, **clav** is an ancient nominal stem displaying two primary classical variants:
> - **1. The "Key" Stem:** `clāv-` / `clāvic-` (< Latin *clāvis* "key"):
>   - *clavier*, *clavichord*, *claviature*, *claviger*, *conclave*, *enclave*, *exclave*, *autoclave*.
> - **2. The Diminutive "Collarbone" Stem:** `clāvicul-` (< Latin *clāvicula* "little key"):
>   - *clavicle*, *clavicular*, *claviculate*.
>   - With positional anatomical prefixes: *sub-* (*subclavian*), *supra-* (*supraclavicular*), *infra-* (*infraclavicular*), *sterno-* (*sternoclavicular*), *acromio-* (*acromioclavicular*).
> - **3. The "Nail" Stem:** `clāv-` (< Latin *clāvus* "nail, spike"):
>   - *clove* (the nail-shaped spice), *clove hitch*, *clavus* (callus / senatorial tunic stripe), *clavate* (club- or nail-shaped).
> - **4. International Hybrid Formations:**
>   - `auto-` (Greek: self) + `clave` (Latin: key) $\to$ *autoclave* (Charles Chamberland, 1879: a vessel whose lid seals itself shut under internal steam pressure).

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
> The semantic branches of **clav** divide into five distinct modern applications:
> - **1. Skeletal Anatomy & Surgical Access:** In [[clavicle]], [[subclavian]], [[supraclavicular]], and [[acromioclavicular]], the root designates the vital collarbone strut and the major neurovascular bundles (subclavian artery and vein, brachial plexus) that route beneath it.
> - **2. Ecclesiastical Seclusion & Territorial Sovereignty:** In [[conclave]], [[enclave]], and [[exclave]], the root signifies physical enclosure under lock and key—whether cardinals voting in secret or parcels of sovereign land surrounded by alien borders.
> - **3. Musical Acoustics & Keyboard Mechanics:** In [[clavier]], [[clavichord]], and [[claviature]], the root denotes the physical levers pressed by a musician's fingers to strike or pluck strings.
> - **4. Sterilization Engineering & Laboratory Science:** In [[autoclave]], the root denotes the hermetically sealed pressure vessel used in surgical suites, autoclaving instruments at $121^\circ\text{C}$ to denature bacterial endospores.
> - **5. Botany, Gastronomy & Pathology:** In [[clove]], [[clavus]], and [[clavate]], the root preserves the shape of miniature Roman nails—in dried spice buds, Senegalese acacia thorns, or club-shaped fungal basidia.

---

## 🔀 4. Prefix & Combining Dynamics on clav

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `cum` + `clāve` | with, under + key | [[conclave]] | A room locked with a key; the secret assembly of cardinals electing a pope. |
| `in-` + `clāve` | in, within + key | [[enclave]] | An outlying territory completely enclosed and locked within foreign borders. |
| `ex-` + `clāve` | out of + key | [[exclave]] | A portion of a state geographically detached and locked away from the main body. |
| `sub-` + `clāvicula` | under + clavicle | [[subclavian]] | Situated beneath the clavicle (collarbone), as the subclavian artery or vein. |
| `supra-` + `clāvicula` | above + clavicle | [[supraclavicular]] | Situated above the collarbone (e.g., supraclavicular lymph nodes). |
| `infra-` + `clāvicula` | below + clavicle | [[infraclavicular]] | Situated below the collarbone, in the upper thoracic fossa. |
| `auto-` + `clāvis` | self + key | [[autoclave]] | A vessel with a lid that seals and keys itself tight under steam pressure. |
| `clāvis` + `chorda` | key + musical string | [[clavichord]] | A stringed musical keyboard instrument with small brass tangent hammers. |
| `clāvis` + `gerere` | key + to bear | [[claviger]] | A keeper of the keys; a warden, custodian, or ecclesiastical gatekeeper. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-icle` (< *-icula*) | Noun (Diminutive) | [[clavicle]] | A small key-like bone; the anatomical collarbone. |
| `-ar` / `-ate` | Adjective | [[clavicular]], [[clavate]] | Pertaining to the clavicle; thickened or shaped like a club or nail. |
| `-ian` | Adjective / Noun | [[subclavian]] | Belonging to the anatomical region beneath the collarbone. |
| `-ier` | Noun (Instrument / Collective) | [[clavier]] | The entire keyboard mechanism or keyboard instrument. |
| `-ist` | Noun (Specialist / Agent) | [[conclavist]] | A personal ecclesiastical secretary or attendant assisting a cardinal in conclave. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏥 **Anatomy, Surgery & Orthopedics** | [[clavicle]], [[subclavian]], [[acromioclavicular]], [[supraclavicular]] | Midshaft clavicle fractures, central venous catheter line insertion into the subclavian vein, and Virchow's supraclavicular node biopsy. |
| 🔬 **Microbiology & Hospital Sterilization** | [[autoclave]], [[autoclaving]] | Moist-heat steam sterilization cycles ($121^\circ\text{C}$ at 15 psi), killing spore-forming *Bacillus stearothermophilus*. |
| ⛪ **Vatican Canon Law & Church History** | [[conclave]], [[conclavist]], [[claviger]] | Papal apostolic constitutions, the Sistine Chapel ballot burning, and the traditional Petrine power of the keys (*potestās clāvium*). |
| 🗺️ **Political Geography & International Borders** | [[enclave]], [[exclave]], [[enclaved]] | The enclave republic of San Marino inside Italy, Lesotho inside South Africa, and the Russian exclave of Kaliningrad. |
| 🎹 **Musicology & Baroque Performance** | [[clavier]], [[clavichord]], [[claviature]] | J. S. Bach's *The Well-Tempered Clavier*, clavichord *Bebung* finger vibrato, and Renaissance keyboard actions. |
| 🌿 **Gastronomy, Botany & Mycology** | [[clove]], [[clavus]], [[clavate]] | Spice trade history of the Moluccas (*Syzygium aromaticum*), and clavate mushroom spore morphology. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[autoclave]] | noun | **1.** A device for heating substances above their boiling point; used to manufacture chemicals or to sterilize surgical instruments.<br>**2.** Subject to the action of an autoclave. | *"In academic literature, autoclave designates a device for heating substances above their boiling point; used to manufacture chemicals or to sterilize surgical instruments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clavariaceae]] | noun | **1.** Fleshy fungi: coral fungi. | *"In academic literature, clavariaceae designates fleshy fungi: coral fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[claver]] | verb | **1.** Talk socially without exchanging too much information. | *"The Country Lass In simmer, when the hay was mawn, And corn wav’d green in ilka field, While claver blooms white o’er the lea And roses blaw in ilka beild!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[claviceps]] | noun | **1.** Fungi parasitic upon the ovaries of various grasses. | *"In academic literature, claviceps designates fungi parasitic upon the ovaries of various grasses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clavichord]] | noun | **1.** An early stringed instrument like a piano but with more delicate sound. | *"Well, and it was graceful of them: they’d break talk off and afford --She, to bite her mask’s black velvet, he, to finger on his sword, While you sat and played Toccatas, stately at the clavichord? -- St. 6."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[clavicipitaceae]] | noun | **1.** Any of various mushrooms of the class ascomycetes. | *"In academic literature, clavicipitaceae designates any of various mushrooms of the class ascomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clavicle]] | noun | **1.** Bone linking the scapula and sternum. | *"In academic literature, clavicle designates bone linking the scapula and sternum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clavier]] | noun | **1.** A bank of keys on a musical instrument.<br>**2.** A stringed instrument that has a keyboard. | *"In academic literature, clavier designates a bank of keys on a musical instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[claviger]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin clav within the domain of Holding.<br>**2.** A technical or specialized form exhibiting the properties of clav in systematic terminology. | *"In academic literature, claviger designates pertaining to, derived from, or characteristic of latin clav within the domain of holding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clavus]] | noun | **1.** A hard thickening of the skin (especially on the top or sides of the toes) caused by the pressure of ill-fitting shoes. | *"Valentin._ 5. [85] _de cor. mil._ 13, _clavus latus in cruce ipsius_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[conclave]] | noun | **1.** A confidential or secret meeting. | *"And once more in mine arms I bid him welcome, And thank the holy conclave for their loves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enclave]] | noun | **1.** An enclosed territory that is culturally distinct from the foreign territory that surrounds it. | *"In academic literature, enclave designates an enclosed territory that is culturally distinct from the foreign territory that surrounds it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exclave]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin clav within the domain of Holding.<br>**2.** A technical or specialized form exhibiting the properties of clav in systematic terminology. | *"In academic literature, exclave designates pertaining to, derived from, or characteristic of latin clav within the domain of holding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subclavian]] | adjective | **1.** Situated beneath the clavicle. | *"In academic literature, subclavian designates situated beneath the clavicle."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CLAV
  </div>
</div>
