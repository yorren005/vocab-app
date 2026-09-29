---
status: unread
type: root_dashboard
---
# Dashboard — scop
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">scop-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to look or examine”</span>
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

The root **scop** means to look or examine. It refers to the action of looking and carrying out this process. In English, this root forms words such as *observe*, *scope*, *telescope*, and *telescopic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to look or examine
> The root **scop** means to look or examine. It refers to the action of looking and carrying out this process. In English, this root forms words such as *observe*, *scope*, *telescope*, and *telescopic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To look or examine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *observe* and *scope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scop** comes from a Latin word that means *"to look or examine"*.
  - At its core, it describes the action of look or examine.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **scop** in an English word, think of **to look or examine**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to look or examine).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Observe**: An everyday English word showing the root's idea of *to look or examine*.
  - **Scope**: N.** 1. The extent of the area or subject matter that something deals with or to which it is relevant.
  - **Telescope**: N.** An optical instrument designed to make distant objects appear nearer through lenses or curved mirrors.
  - **Telescopic**: Relating to or made with a telescope.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">scop</mark>, think of <mark class="hl-def">to look or examine</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **scop** operates as an independent noun/verb (`scope`), a ubiquitous terminal combining element (`-scope`, `-scopic`, `-scopy`, `-scopist`), and an initial combining stem:
> - **1. Independent Word:** `scope` (noun: extent, range of view, intellectual breadth, aim; verb: to examine or survey).
> - **2. Instrument Suffix:** `-scope` (denoting an optical, acoustic, or electronic viewing instrument):
>   - *tele-* (far) + `-scope` → *telescope*
>   - *micro-* (small) + `-scope` → *microscope*
>   - *peri-* (around) + `-scope` → *periscope*
>   - *stetho-* (chest) + `-scope` → *stethoscope*
>   - *endo-* (inside) + `-scope` → *endoscope*
>   - *gyro-* (circle) + `-scope` → *gyroscope*
>   - *oscillo-* (swing) + `-scope` → *oscilloscope*
> - **3. Discipline / Process Suffix:** `-scopy` (the technique of visual or instrumental inspection):
>   - *microscopy*, *endoscopy*, *arthroscopy*, *laparoscopy*, *spectroscopy*, *colonoscopy*.
> - **4. Adjectival Suffixes:** `-scopic` / `-scopical` (*microscopic*, *telescopic*, *periscopic*, *kaleidoscopic*, *macroscopic*).
> - **5. Inverted Metathesized Stem:** `skept-` (< Greek *sképtomai*): *skeptic*, *skeptical*, *skepticism*.
> - **6. Prefixed Ecclesiastical Form:** `epi-` + `scop-` → *episcopal*, *episcopate*, *bishop*.

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
> The semantic manifestations of **scop** expand into five core conceptual domains:
> - **1. Physical Range & Intellectual Horizon:** In [[scope]], the root denotes breadth of coverage, latitude of action, the visual field, or project management boundaries.
> - **2. Macro- and Microscopic Optics:** In [[telescope]], [[microscope]], [[periscope]], [[kaleidoscope]], and [[stereoscope]], the root captures instruments that pierce physical limits to reveal deep galaxies, cellular organelles, or optical illusions.
> - **3. Clinical Internal Diagnostics:** In [[stethoscope]], [[endoscope]], [[arthroscope]], [[laparoscope]], and [[ophthalmoscope]], the root designates minimally invasive medical instruments enabling surgeons to examine living organs without major incisions.
> - **4. Physics, Signals & Rotational Inertia:** In [[gyroscope]], [[oscilloscope]], [[stroboscope]], and [[spectroscope]], the root designates laboratory instruments tracking waveform frequencies, chemical absorption lines, and angular momentum.
> - **5. Critical Philosophy & Epistemology:** In [[skeptic]], [[skeptical]], and [[skepticism]], the root reflects its cognitive origin: looking closely at claims, suspending dogma, and demanding rigorous empirical proof.
> - **6. Destiny, Time & Pastoral Oversight:** In [[horoscope]] and [[episcopal]] / [[bishop]], the root tracks celestial hours at birth or pastoral vigilance over a diocese.

---

## 🔀 4. Prefix & Combining Dynamics on scop

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `tēle-` + `-scope` | far (*tēle*) + watcher | [[telescope]] | An optical instrument for making distant celestial objects appear nearer. |
| `mikro-` + `-scope` | small (*mikrós*) + watcher | [[microscope]] | An optical instrument used for viewing objects too small to be seen by the naked eye. |
| `perí-` + `-scope` | around (*perí*) + watcher | [[periscope]] | An apparatus with prisms/mirrors enabling a submerged submarine to see above water. |
| `kalós-eîdos-` + `-scope` | beautiful form + watcher | [[kaleidoscope]] | A tube containing mirrors and colored glass showing endless symmetrical patterns. |
| `gŷros-` + `-scope` | circle/ring (*gŷros*) + watcher | [[gyroscope]] | A spinning wheel mounted on gimbals used for navigation and attitude control. |
| `stēthos-` + `-scope` | chest (*stēthos*) + watcher | [[stethoscope]] | A medical acoustic device for listening to internal heart, lung, and bowel sounds. |
| `éndon-` + `-scope` | within (*éndon*) + watcher | [[endoscope]] | An illuminated optical tube inserted into hollow organs for diagnostic inspection. |
| `árthron-` + `-scope` | joint (*árthron*) + watcher | [[arthroscope]] | An endoscope inserted into a joint cavity (e.g., knee) for surgical repair. |
| `lapára-` + `-scope` | flank, abdomen + watcher | [[laparoscope]] | A surgical instrument inserted through the abdominal wall for keyhole surgery. |
| `hōra-` + `-scope` | hour/season (*hōra*) + watcher | [[horoscope]] | An astrological chart of planetary positions at the hour of a person's birth. |
| `epí-` + `-scopos` | over (*epí*) + watcher | [[episcopal]] | Pertaining to a bishop or system of ecclesiastical oversight. |
| `skept-` + `-ic` | inquiring (*sképtomai*) + agent | [[skeptic]] | A person who habitually questions accepted dogma or demands verifiable evidence. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ic` / `-ical` | Adjective | [[microscopic]], [[telescopic]], [[skeptical]] | Pertaining to visual inspection, extreme scale, or critical inquiry. |
| `-ically` | Adverb | [[microscopically]], [[telescopically]] | By means of an optical instrument, or with microscopic precision. |
| `-y` | Noun (Technique / Field) | [[microscopy]], [[endoscopy]], [[spectroscopy]] | The practical art, technique, or science of instrumental examination. |
| `-ist` | Noun (Specialist) | [[microscopist]] | An expert scientist who operates microscopes and interprets microscopic slides. |
| `-ism` | Noun (Philosophy / State) | [[skepticism]] | The philosophical attitude of doubting claims and withholding assent. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔭 **Astronomy, Cosmology & Optics** | [[telescope]], [[telescopic]], [[spectroscope]], [[spectroscopy]] | Hubble and James Webb Space Telescopes, stellar spectroscopy determining stellar composition, and optical chromatic aberration correction. |
| 🔬 **Microbiology, Pathology & Nanotechnology** | [[microscope]], [[microscopic]], [[microscopy]], [[microscopist]] | Transmission electron microscopy (TEM), confocal laser scanning, histology of cancer margins, and viral capsid imaging. |
| 🏥 **Medicine, Surgery & Diagnostic Imaging** | [[stethoscope]], [[endoscope]], [[arthroscope]], [[laparoscope]], [[colonoscopy]] | Cardiac auscultation for murmurs, minimally invasive laparoscopic cholecystectomy, and screening colonoscopies. |
| ⚡ **Electrical Engineering & Avionics** | [[oscilloscope]], [[gyroscope]], [[stroboscope]] | Digital phosphor oscilloscopes measuring signal frequency, ring-laser gyroscopic inertial navigation on aircraft, and stroboscopic engine timing. |
| 🧠 **Epistemology, Philosophy & Critical Thinking** | [[skeptic]], [[skeptical]], [[skepticism]] | Scientific skepticism, David Hume's critique of induction, and the philosophical debunking of pseudoscientific claims. |
| ⛪ **Ecclesiastical History & Canon Law** | [[episcopal]], [[bishop]] | Episcopal governance structures, apostolic succession, and diocese administration. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arthroscope]] | noun | **1.** A type of endoscope that is inserted into a joint for visual examination. | *"In academic literature, arthroscope designates a type of endoscope that is inserted into a joint for visual examination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscope]] | noun | **1.** A long slender medical instrument for examining the interior of a bodily organ or performing minor surgery. | *"In academic literature, endoscope designates a long slender medical instrument for examining the interior of a bodily organ or performing minor surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopic]] | adjective | **1.** Of or relating to endoscopy. | *"In academic literature, endoscopic designates of or relating to endoscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopy]] | noun | **1.** Visual examination of the interior of a hollow body organ by use of an endoscope. | *"In academic literature, endoscopy designates visual examination of the interior of a hollow body organ by use of an endoscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopal]] | adjective | **1.** Of or pertaining to or characteristic of the episcopal church.<br>**2.** Denoting or governed by or relating to a bishop or bishops. | *"Some quarrel the Presbyter gown, Some quarrel Episcopal graithing; But every good fellow will own Their quarrel is a’ about—naething."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[episcopate]] | noun | **1.** The term of office of a bishop.<br>**2.** The territorial jurisdiction of a bishop. | *"In academic literature, episcopate designates the term of office of a bishop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gyroscope]] | noun | **1.** Rotating mechanism in the form of a universally mounted spinning wheel that offers resistance to turns in any direction. | *"A comparatively small amount of such work would serve as a gyroscope to preserve the balance of employment for a large part of the less skilled workers."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[gyroscopic]] | adjective | **1.** Having the characteristics of a gyroscope. | *"Thus the gyroscopic action is very free indeed to exercise its function of keeping the contrivance pointing always in the one way."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[horoscope]] | noun | **1.** A prediction of someone's future based on the relative positions of the planets.<br>**2.** A diagram of the positions of the planets and signs of the zodiac at a particular time and place. | *"Though no higher 121:9 revelation than the horoscope was to them dis- played upon the empyrean, earth and heaven were bright, and bird and blossom were glad in God's 121:12 perennial and happy sunshine, golden with Truth."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[kaleidoscope]] | noun | **1.** A complex pattern of constantly changing colors and shapes.<br>**2.** An optical toy in a tube; it produces symmetrical patterns as bits of colored glass are reflected by mirrors. | *"In consequence of this, poetic diction has become latterly a kaleidoscope, and one's chief curiosity is as to the precise combinations into which the pieces will be shifted."* — Francis Thompson, *Shelley: An Essay* |
| [[kaleidoscopic]] | adjective | **1.** Continually shifting or rapidly changing. | *"And the kaleidoscopic scene moves against a background of shops and houses gay with paint and gilding."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[kaleidoscopical]] | adjective | **1.** Continually shifting or rapidly changing. | *"In academic literature, kaleidoscopical designates continually shifting or rapidly changing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscope]] | noun | **1.** Magnifier of the image of small objects. | *"She hardly observed that a tear descended slowly upon his cheek, a tear so large that it magnified the pores of the skin over which it rolled, like the object lens of a microscope."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopic]] | adjective | **1.** Of or relating to or used in microscopy.<br>**2.** Visible under a microscope; using a microscope. | *"As the inimical plant could only be present in very microscopic dimensions to have escaped ordinary observation, to find it seemed rather a hopeless attempt in the stretch of rich grass before them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopical]] | adjective | **1.** Of or relating to or used in microscopy.<br>**2.** Visible under a microscope; using a microscope. | *"Some cable-lengths off the shores of the Island of Clermont I admired the gigantic work accomplished by these microscopical workers."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[microscopically]] | adverb | **1.** By using a microscope; so as to be visible only with a microscope; as seen with a microscope.<br>**2.** As if by using a microscope; with extreme precision and attention to detail; in minute detail. | *"FeS (copper 71·7 per cent.), when examined microscopically, appeared to be homogeneous, and indicated some form of combination between the sulphides in these proportions."* — Donald M. Levy, *Modern Copper Smelting* |
| [[microscopist]] | noun | **1.** A scientist who specializes in research with the use of microscopes. | *"There are not many features in the rest of the species of this genus of sufficient interest to the general reader or microscopist to render it advisable to furnish any detailed account of them."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[microscopy]] | noun | **1.** Research with the use of microscopes. | *"Any person possessed of the cardinal virtues of microscopy—patience and perseverance—will be rewarded in this instance; whilst those who are deficient will lose an object worthy of the virtues they dare not boast."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[periscope]] | noun | **1.** An optical instrument that provides a view of an otherwise obstructed field. | *"This time there was no chance of damaging the motive power, but we could make the pilot wish he had a periscope."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[scopal]] | adjective | **1.** Of or relating to scope. | *"In academic literature, scopal designates of or relating to scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scope]] | noun | **1.** An area in which something acts or operates or has power or control:.<br>**2.** The state of the environment in which a situation exists. | *"Blessed are you whose worthiness gives scope, Being had to triumph, being lacked to hope. 53 What is your substance, whereof are you made, That millions of strange shadows on you tend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scopes]] | noun | **1.** Tennessee highschool teacher who violated a state law by teaching evolution; in a highly publicized trial in 1925 he was prosecuted by william jennings bryan and defended by clarence darrow (1900-1970).<br>**2.** An area in which something acts or operates or has power or control:. | *"As Brad expected, the fire control center consisted of dozens of consoles, scopes, directional and power control devices, and clusters of computer terminals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[scopolamine]] | noun | **1.** An alkaloid with anticholinergic effects that is used as a sedative and to treat nausea and to dilate the pupils in ophthalmic procedures. | *"In academic literature, scopolamine designates an alkaloid with anticholinergic effects that is used as a sedative and to treat nausea and to dilate the pupils in ophthalmic procedures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scopolia]] | noun | **1.** Genus of european perennial herbs yielding medicinal alkaloids. | *"In academic literature, scopolia designates genus of european perennial herbs yielding medicinal alkaloids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stethoscope]] | noun | **1.** A medical instrument for listening to the sounds generated inside the body. | *"He not only used his stethoscope (which had not become a matter of course in practice at that time), but sat quietly by his patient and watched him."* — George Eliot, *Middlemarch* |
| [[ultramicroscope]] | noun | **1.** Light microscope that uses scattered light to show particles too small to see with ordinary microscopes. | *"In academic literature, ultramicroscope designates light microscope that uses scattered light to show particles too small to see with ordinary microscopes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramicroscopic]] | adjective | **1.** Too small to be seen without an ultramicroscope. | *"In academic literature, ultramicroscopic designates too small to be seen without an ultramicroscope."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SCOP
  </div>
</div>
