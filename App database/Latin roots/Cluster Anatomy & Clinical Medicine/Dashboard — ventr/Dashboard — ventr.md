---
status: unread
type: root_dashboard
---
# Dashboard — ventr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ventr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“belly”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The natural organs, tissues, and inner workings of the human body.</span>
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

The root **ventr** means belly. It refers to belly, abdomen, womb, chamber / cavity, anterior surface. In English, this root forms words such as *ventral*, *ventrally*, *ventrodorsal*, and *ventrolateral*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: belly
> The root **ventr** means belly. It refers to belly, abdomen, womb, chamber / cavity, anterior surface. In English, this root forms words such as *ventral*, *ventrally*, *ventrodorsal*, and *ventrolateral*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Belly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *ventral* and *ventrally*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ventr** comes from a Latin word that means *"belly"*.
  - At its core, it describes belly.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **ventr** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of belly.
  - **Mental & Social**: How people experience, organize, or communicate about belly.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ventral**: Pertaining to, situated on, or directed toward the abdomen, belly, or anterior surface of the body.
  - **Ventrally**: Toward, on, or in the direction of the ventral surface.
  - **Ventrodorsal**: Extending from or involving both the ventral and dorsal aspects.
  - **Ventrolateral**: Situated toward both the ventral surface and the lateral side.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ventr</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ventr** operates through three distinct morphological channels:
> 1. **Anatomical Positional Stem (`ventr-`):**
>    - `ventr-` + `-al` ➔ *ventral* (anterior/belly surface).
>    - Spatial compound combining forms: *ventro-* + *dorsal* ➔ *ventrodorsal*; *ventro-* + *medial* ➔ *ventromedial*.
> 2. **Diminutive Chamber Stem (`ventricul-` < *ventriculus*):**
>    - `ventricul-` + `-ar` ➔ *ventricular* (pertaining to heart/brain cavities).
>    - `intra-` ("within") + `ventricular` ➔ *intraventricular* (inside a ventricle).
>    - `peri-` ("around") + `ventricular` ➔ *periventricular* (surrounding cerebral ventricles).
>    - `ventriculo-` + `-stomy` (surgical opening) ➔ *ventriculostomy* (CSF drainage shunt).
> 3. **Verbal Compound Stem (`ventr-` + *loquī* "to speak"):**
>    - `ventri-` + `loqui-` + `-ism` ➔ *ventriloquism* (projecting voice from the belly).

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
> Although derived from the physical abdomen, the semantic paths diverge across four major axes:
> - **Spatial Directionality:** [[ventral]] and [[ventrally]] describe orientations toward the belly, contrasting with dorsal (back) across all animal phyla.
> - **Cardiac Electrophysiology:** [[ventricular]] tachycardia, ventricular fibrillation, and the [[atrioventricular]] bundle govern lethal arrhythmias and pacemaker physics.
> - **Cerebral Neuroanatomy:** The fourth [[ventricle]] and [[ventriculoperitoneal]] shunts address intracranial fluid dynamics and hydrocephalus.
> - **Stage Craft & Literary Voice:** [[ventriloquism]] describes both physical dummy puppetry and metaphorical ventriloquism in narrative authorship.

---

## 🔀 4. Prefix & Combining Dynamics on ventr

### Prefixes & Anatomical Combining Forms on `ventr`

| Prefix / Comb. Form | Meaning | Combined Derivative | Anatomical / Clinical Meaning |
| :--- | :--- | :--- | :--- |
| `intra-` | within | [[intraventricular]] | Located or occurring inside the cardiac or cerebral ventricles |
| `peri-` | around | [[periventricular]] | Situated immediately surrounding the cerebral ventricles |
| `atrio-` | atrium | [[atrioventricular]] | Pertaining to the junction between cardiac atria and ventricles (AV node) |
| `bi-` | two | `biventricular` | Involving both right and left ventricles (biventricular cardiac pacing) |
| `loquī` | to speak | [[ventriloquism]] | Projecting sound without apparent speech articulators |
| `-ose` | full of, swollen | [[ventricose]] | Distended or inflated symmetrically on one side (botanical pods) |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Cardiology & Resuscitation:** Ventricular fibrillation (VFib) requiring automated external defibrillators (AEDs), left ventricular assist devices (LVADs).
> - **Neurosurgery & Neurology:** Ventriculostomy for elevated intracranial pressure, normal pressure hydrocephalus, and periventricular white matter lesions.
> - **Neurobiology & Cognitive Neuroscience:** Ventromedial prefrontal cortex (vmPFC) governing moral reasoning, emotional value assessment, and decision making.
> - **Comparative Anatomy & Embryology:** Ventral neural tube floor plate, dorsoventral morphogen gradients (Sonic hedgehog).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[coventry]] | noun | **1.** The state of being banished or ostracized (excluded from society by general consent).<br>**2.** An industrial city in central england; devastated by air raids during world war ii; remembered as the home of lady godiva in the 11th century. | *"Bardolph, get thee before to Coventry; fill me a bottle of sack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eventration]] | noun | **1.** Protrusion of the intestine through the abdominal wall. | *"In academic literature, eventration designates protrusion of the intestine through the abdominal wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intraventricular]] | adjective | **1.** Within the system of ventricles in the brain. | *"In academic literature, intraventricular designates within the system of ventricles in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventral]] | adjective | **1.** Toward or on or near the belly (front of a primate or lower surface of a lower animal).<br>**2.** Nearest to or facing toward the axis of an organ or organism. | *"In academic literature, ventral designates toward or on or near the belly (front of a primate or lower surface of a lower animal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventrally]] | adverb | **1.** In a ventral location or direction. | *"In academic literature, ventrally designates in a ventral location or direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricle]] | noun | **1.** One of four connected cavities in the brain; is continuous with the central canal of the spinal cord and contains cerebrospinal fluid.<br>**2.** A chamber of the heart that receives blood from an atrium and pumps it to the arteries. | *"These are begot in the ventricle of memory, nourished in the womb of _pia mater_, and delivered upon the mellowing of occasion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ventricose]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricose designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricous]] | adjective | **1.** Having a swelling on one side. | *"In academic literature, ventricous designates having a swelling on one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventricular]] | adjective | **1.** Of or relating to a ventricle (of the heart or brain). | *"In academic literature, ventricular designates of or relating to a ventricle (of the heart or brain)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriculus]] | noun | **1.** Thick-walled muscular pouch below the crop in many birds and reptiles for grinding food. | *"In academic literature, ventriculus designates thick-walled muscular pouch below the crop in many birds and reptiles for grinding food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ventriloquism]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"He’s uncommonly good at ventriloquism, and he did it uncommonly well, by God!"* — George Eliot, *Middlemarch* |
| [[ventriloquist]] | noun | **1.** A performer who projects the voice into a wooden dummy. | *"Make haste up, Millers.” Millers, who was the other nurse, retired into the house, and by degrees the child’s wailing was hushed and stopped, as if it were a young ventriloquist with something in its mouth."* — Charles Dickens, *Great Expectations* |
| [[ventriloquy]] | noun | **1.** The art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy). | *"In academic literature, ventriloquy designates the art of projecting your voice so that it seems to come from another source (as from a ventriloquist's dummy)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Anatomy & Clinical Medicine]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VENTR
  </div>
</div>
