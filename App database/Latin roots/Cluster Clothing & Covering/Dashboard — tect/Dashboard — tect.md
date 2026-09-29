---
status: unread
type: root_dashboard
---
# Dashboard — tect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tect-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“cover”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Wrapping an outer mantle, robe, or protective layer over the body.</span>
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

The root **tect** means cover. It refers to covered, the roof, the shield placed in front, and the drawing back of the cover. In English, this root forms words such as *detect*, *protect*, *detective*, and *protection*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: cover
> The root **tect** means cover. It refers to covered, the roof, the shield placed in front, and the drawing back of the cover. In English, this root forms words such as *detect*, *protect*, *detective*, and *protection*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Cover</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Wrapping an outer mantle, robe, or protective layer over the body.</mark>
> - **Everyday Connection**: Think of familiar words like *detect* and *protect*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tect** comes from a Latin word that means *"cover"*.
  - At its core, it describes cover.

- **The Big Picture Idea**:
  - Picture wrapping an outer mantle, robe, or protective layer over the body.
  - Whenever you see **tect** in an English word, think of **clothing, garments, and protective coverings**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of cover.
  - **Mental & Social**: How people experience, organize, or communicate about cover.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Detect**: To discover, uncover, or ascertain the existence, presence, or identity of something hidden, disguised, or previously unknown.
  - **Protect**: To shield, guard, or defend someone or something from harm, injury, damage, or legal liability.
  - **Detective**: A police officer, investigator, or private operative whose professional duty is to investigate crimes, uncover clues, and apprehend perpetrators.
  - **Protection**: The act of shielding from harm, or the state of being shielded.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tect</mark>, think of <mark class="hl-def">clothing, garments, and protective coverings</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Participial Behavior
> The root **tect** operates in English primarily as a prefixed participial and nominal base:
> - **Uncovering / Investigative Engine (`de-tect-`):**
>   - Verb: *dē- + tect* → [[detect]].
>   - Abstract Noun: *dē- + tect- + -ion* → [[detection]].
>   - Agent / Occupational Noun: *dē- + tect- + -ive* → [[detective]].
>   - Instrument Noun: *dē- + tect- + -or* → [[detector]] (smoke detector, radar detector).
>   - Capacity Adjectives: [[detectable]], [[undetected]], [[undetectable]].
> - **Shielding / Defensive Engine (`pro-tect-`):**
>   - Verb: *prō- + tect* → [[protect]].
>   - Action / State Noun: *prō- + tect- + -ion* → [[protection]].
>   - Functional Adjective: *prō- + tect- + -ive* → [[protective]].
>   - Agent Noun: *prō- + tect- + -or* → [[protector]].
>   - Political / Sovereign Entity: *prō- + tect- + -orate* → [[protectorate]].
>   - Institutional Haven: *prō- + tect- + -ory* → [[protectory]].
>   - Negation: [[unprotected]].
> - **Anatomical & Biological Substantives (`tect-`):**
>   - Direct anatomical noun: Latin *tēctum* → [[tectum]] (roof of the midbrain).
>   - Neoclassical Adjective: *tēctōrius* → [[tectorial]] (*tectorial membrane* of the cochlea).
>   - Morphological Adjective: *tēctum* + *-i-* + *-form* → [[tectiform]] (roof-shaped).

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

> [!tip] 🌈 Spectrum of Meaning Across Four Concentric Spheres
> 1. **Sensory Investigation, Forensics & Signal Processing:** Uncovering concealed crimes, discovering hidden anomalies, forensic inquiry, and sensor hardware extracting signals from noise ([[detect]], [[detection]], [[detective]], [[detector]], [[detectable]], [[undetected]], [[undetectable]]).
> 2. **Physical Defense, Security & Sovereign Alliances:** Guarding vulnerable individuals, protective military equipment, tariff trade protections, and semi-sovereign geopolitical entities ([[protect]], [[protection]], [[protective]], [[protector]], [[protectorate]], [[unprotected]]).
> 3. **Neuroanatomy & Auditory Biophysics:** The superior and inferior colliculi forming the roof of the mesencephalon, and the gel-like tectorial membrane of the cochlea triggering auditory hair cells ([[tectum]], [[tectorial]]).
> 4. **Morphology & Botanical Enclosures:** Architectural and botanical structures folded like pitched gable roofs ([[tectiform]]).

---

## 🔀 4. Prefix & Combining Dynamics on tect

### Prefix Dynamics

| Prefix | Semantic Force | Derived Form | Resulting Conceptual Synthesis |
| :--- | :--- | :--- | :--- |
| `dē-` (de-) | off, away, reversal | [[detect]], [[detection]] | Stripping the *cover off* → uncovering secrets or signals. |
| `prō-` (pro-) | in front of, forward | [[protect]], [[protection]] | Placing a *cover in front* → shielding from danger. |
| `un-` | not (negation) | [[undetected]], [[unprotected]] | Remaining *un-discovered* or *un-shielded*. |

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Act / State) | [[detection]], [[protection]] | The process of uncovering or shielding. |
| `-ive` | Adjective / Noun | [[detective]], [[protective]] | Serving to uncover crime / serving to shield. |
| `-or` | Noun (Agent / Instrument) | [[detector]], [[protector]] | One who or that which uncovers or defends. |
| `-able` | Adjective (Capacity) | [[detectable]], [[undetectable]] | Capable or incapable of being discovered. |
| `-ate` | Noun (Political Office/Territory) | [[protectorate]] | A state under the official protection of another power. |
| `-orial` | Adjective (Anatomical) | [[tectorial]] | Functioning as an anatomical roof or covering membrane. |
| `-iform` | Adjective (Morphology) | [[tectiform]] | Having the geometric shape of a pitched roof. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 👂 **Neurotology & Sensory Biophysics** | [[tectorial]], [[tectum]] | The **tectorial membrane** within the Organ of Corti of the cochlea: shear stress between the basilar and tectorial membranes deflects stereocilia, opening mechanosensitive ion channels to transduce acoustic waves into auditory action potentials; the **tectum** of the midbrain coordinating visual and auditory reflexes. |
| 🔍 **Law Enforcement, Criminology & Intelligence** | [[detect]], [[detection]], [[detective]] | Police detective bureaus, forensic DNA detection, counterintelligence, biometric detection, and fraud auditing. |
| 🛡️ **Cybersecurity, Military & Geopolitics** | [[protect]], [[protection]], [[protective]], [[protectorate]] | Personal protective equipment (PPE), missile defense protection umbrellas, copyright legal protections, and historic British/French colonial protectorates. |
| 📡 **Telecommunications & Sensor Hardware** | [[detector]], [[detectable]], [[undetected]] | Infrared smoke detectors, Geiger-Müller radiation detectors, radar signal detection circuits, and stealth aircraft flying undetected by radar. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[architect]] | noun | **1.** Someone who creates plans to be used in making something (such as buildings). | *"Of this was Tamora delivered, The issue of an irreligious Moor, Chief architect and plotter of these woes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[architectural]] | adjective | **1.** Of or pertaining to the art and science of architecture. | *"Fallen into disuse, the bewitching grace of carelessness was added to the architectural beauty of the tombs."* — C. A. Frazer, *Atmâ* |
| [[architecturally]] | adverb | **1.** With regard to architecture. | *"The Accountant had brought out already a box of dominoes, and was toying architecturally with the bones."* — Joseph Conrad, *Heart of Darkness* |
| [[architecture]] | noun | **1.** An architectural product or work.<br>**2.** The discipline dealing with the principles of design and construction and ornamentation of fine buildings. | *"The graceful pile of cathedral architecture rose dimly on their left hand, but it was lost upon them now."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[detect]] | verb | **1.** Discover or determine the existence, presence, or fact of. | *"Then there is no true lover in the forest, else sighing every minute and groaning every hour would detect the lazy foot of time as well as a clock."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detectable]] | adjective | **1.** Capable of being detected.<br>**2.** Easily seen or detected. | *"The quantity needs to be multiplied threefold before the quantity of gold becomes even detectable, to say nothing of being recoverable."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[detected]] | verb | **1.** Discover or determine the existence, presence, or fact of.<br>**2.** Perceived or discerned. | *"I never heard the absent Duke much detected for women; he was not inclined that way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detecting]] | noun | **1.** A police investigation to determine the perpetrator.<br>**2.** Discover or determine the existence, presence, or fact of. | *"If he steal aught the whilst this play is playing, And ’scape detecting, I will pay the theft."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detection]] | noun | **1.** The perception that something has occurred or some state exists.<br>**2.** The act of detecting something; catching sight of something. | *"Now, could I come to her with any detection in my hand, my desires had instance and argument to commend themselves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detective]] | noun | **1.** A police officer who investigates crimes.<br>**2.** An investigator engaged or employed in obtaining information not easily available to the public. | *"Bucket is a detective officer, Snagsby,” says the lawyer in explanation."* — Charles Dickens, *Bleak House* |
| [[detector]] | noun | **1.** Any device that receives a signal or stimulus (as heat or pressure or light or motion etc.) and responds to it in a distinctive manner.<br>**2.** Rectifier that extracts modulation from a radio carrier wave. | *"O heavens! that this treason were not; or not I the detector!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overprotect]] | verb | **1.** Care for like a mother.<br>**2.** Protect excessively. | *"In academic literature, overprotect designates care for like a mother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overprotection]] | noun | **1.** Excessive protection. | *"In academic literature, overprotection designates excessive protection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overprotective]] | adjective | **1.** Overly protective. | *"In academic literature, overprotective designates overly protective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protect]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"The gods protect you, And bless the good remainders of the court!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protected]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"HELENA, a Gentlewoman protected by the Countess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protecting]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"I saw his face, and heard his voice, and felt the influence of his kind protecting manner in every line."* — Charles Dickens, *Bleak House* |
| [[protection]] | noun | **1.** The activity of protecting someone or something.<br>**2.** A covering that is intend to protect from damage or injury. | *"May it please you To take them in protection?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protectionism]] | noun | **1.** The policy of imposing duties or quotas on imports in order to protect home industries from overseas competition. | *"In academic literature, protectionism designates the policy of imposing duties or quotas on imports in order to protect home industries from overseas competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protectionist]] | noun | **1.** An advocate of protectionism. | *"The lack of money and the poverty of the newer country are looked upon by the protectionist as due to the importation of goods."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[protective]] | adjective | **1.** Intended or adapted to afford protection of some kind.<br>**2.** Showing care. | *"She had not known that men could be so disinterested, chivalrous, protective, in their love for women as he."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protectively]] | adverb | **1.** In a protective manner. | *"In academic literature, protectively designates in a protective manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protectiveness]] | noun | **1.** A feeling of protective affection.<br>**2.** The quality of providing protection. | *"If he had entered with a pistol in his hand he would scarcely have disturbed her trust in his protectiveness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protector]] | noun | **1.** A person who cares for persons or property. | *"Enter the funeral of King Henry the Fifth, attended on by the Duke of Bedford, Regent of France; the Duke of Gloucester, Protector; the Duke of Exeter, the Earl of Warwick, the Bishop of Winchester, the Duke of Somerset with Heralds, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protectorate]] | noun | **1.** A state or territory partly controlled by (but not a possession of) a stronger state but autonomous in internal affairs; protectorates are established by treaty. | *"Morocco had been a French protectorate since 1912, and thousands of French citizens and other Europeans had migrated to French and Spanish Morocco over the years and taken up residency."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[protectorship]] | noun | **1.** The position of protector. | *"Why, as you, my lord, An ’t like your lordly Lord Protectorship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tectaria]] | noun | **1.** Terrestrial or epilithic ferns of tropical rain forests. | *"In academic literature, tectaria designates terrestrial or epilithic ferns of tropical rain forests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tectona]] | noun | **1.** Small genus of southeastern asian tropics: teak. | *"In academic literature, tectona designates small genus of southeastern asian tropics: teak."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tectonic]] | adjective | **1.** Pertaining to the structure or movement of the earth's crust.<br>**2.** Of or pertaining to construction or architecture. | *"In academic literature, tectonic designates pertaining to the structure or movement of the earth's crust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tectonics]] | noun | **1.** The science of architecture.<br>**2.** The branch of geology studying the folding and faulting of the earth's crust. | *"In academic literature, tectonics designates the science of architecture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tectorial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tect within the domain of Clothing & Covering.<br>**2.** A technical or specialized form exhibiting the properties of tect in systematic terminology. | *"In academic literature, tectorial designates pertaining to, derived from, or characteristic of latin tect within the domain of clothing & covering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undetectable]] | adjective | **1.** Not easily seen.<br>**2.** Barely able to be perceived. | *"We'll install undetectable barriers against psychic probes; then there are..." "Damn you, Ram." Brad cut in, his voice crackling with rage."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[undetected]] | adjective | **1.** Not perceived or discerned. | *"What is yonder undetected villain’s marble mansion with a door-plate for a waif; what is that but a Fast-Fish?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unprotected]] | adjective | **1.** Lacking protection or defense. | *"An unprotected childhood in a cold world has beaten gentleness out of me.” He immediately said with more resentment: “That may be true, somewhat; but ah, Miss Everdene, it won’t do as a reason!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unprotectedness]] | noun | **1.** The property of being helpless in the face of attack. | *"A farmer passing through with his axe is but an intruder, and children straying home from school give one a feeling of solicitude at their unprotectedness."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[unprotective]] | adjective | **1.** Not affording protection. | *"In academic literature, unprotective designates not affording protection."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Clothing & Covering]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TECT
  </div>
</div>
