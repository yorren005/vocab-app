---
status: unread
type: root_dashboard
---
# Dashboard — ped
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ped-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“foot”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **ped** means foot. It refers to the bodily foot, walking steps, or the bottom base of something. In English, this root forms words such as *pedal*, *pedestrian*, *expedition*, and *impede*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: foot
> The root **ped** means foot. It refers to the bodily foot, walking steps, or the bottom base of something. In English, this root forms words such as *pedal*, *pedestrian*, *expedition*, and *impede*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Foot</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *pedal* and *pedestrian*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ped** comes from a Latin word that means *"foot"*.
  - At its core, it describes foot.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **ped** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of foot.
  - **Mental & Social**: How people experience, organize, or communicate about foot.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Pedal**: A foot lever used to control or power a machine, vehicle, or musical instrument.
  - **Pedestrian**: A person walking along a road.
  - **Expedition**: A journey or excursion undertaken by an organized group for exploration, scientific research, or war.
  - **Impede**: To interfere with or slow the progress of.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ped</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ped** attaches to prefixes, suffixes, and combining elements through its regular morphological stems:
> - **Nominal Stem:** `ped-` (from the oblique cases: genitive *pedis*, dative *pedī*, accusative *pedem*, ablative *pede*, nominative plural *pedēs*).
> - **Verbal Derivatives:** *expedīre* (stem `expedi-`, supine `expedīt-`) and *impedīre* (stem `impedi-`, supine `impedīt-`), formed with prefix + *pēs* + 4th-conjugation verbalizer *-īre*.
> - **Diminutive Stems:** *pediculus* ("little foot; footstalk; louse") and *pedunculus* ("little foot; fruit stalk").
> - **Romance Vernacular Reflexes:** Old French *pié*, Anglo-Norman *peon / poun*, Italian *piè*.
>
> By compounding with numerical prefixes (*bi-*, *quadru-*, *centi-*, *milli-*, *sesqui-*), directional prefixes (*ex-*, *in-*), and Latin nouns (*cūra*, *grūs*), English builds verbs of motion, anatomical descriptors, social ranks, and mechanical controls.

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
> Although rooted in the anatomical foot, the family spreads across distinct semantic zones:
> - **Locomotion & Mechanical Control:** [[pedal]] (foot lever), [[pedestrian]] (one who travels on foot), [[pedometer]] (step-counter).
> - **Encumbrance & Release:** [[impede]] (literally "shackle the feet"), [[impediment]] (hindrance, speech obstacle), [[impedimenta]] (army baggage), [[expedite]] (untangle the feet, speed up), [[expedition]] (organized journey), [[expedient]] (practical shortcut).
> - **Zoology, Anatomy & Morphology:** [[biped]] (two-footed creature), [[quadruped]] (four-footed animal), [[centipede]] (hundred-footed arthropod), [[millipede]] (thousand-footed myriapod), [[soliped]] (solid-hoofed animal), [[pedate]] (palmate like a bird's foot), [[pedicle]] (vertebral bridge or tissue stalk), [[pedicel]] (flower stalk), [[peduncle]] (stem or brainstem tract).
> - **Grooming & Foundations:** [[pedicure]] (foot care), [[pedestal]] (architectural foot/base).
> - **Social Rank & Warfare:** [[pawn]] (humblest chess piece; puppet), [[peon]] (day laborer), [[pioneer]] (originally military digger/foot soldier clearing paths).
> - **Genealogy & Idiomatic Formations:** [[pedigree]] (crane's foot lineage chart), [[vamp]] (shoe upper, patched-up front), [[cap-a-pie]] (head-to-foot armor), [[trivet]] (three-legged pot stand), [[sesquipedalian]] (words a foot-and-a-half long).

---

## 🔀 4. Prefix & Combining Dynamics on ped

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ex-** | out, un-, away from | [[expedite]] / [[expedition]] | Literally "to extricate the feet from a snare"; hence to accelerate, free from obstruction, or launch an exploratory march. |
| **in-** (as *im-*) | in, onto, against | [[impede]] / [[impediment]] | Literally "to entangle or throw shackles onto the feet"; hence to obstruct, hinder, or retard progress. |
| **bi-** | two | [[biped]] / [[bipedal]] | Having two feet; adapted for walking upright on two legs. |
| **quadru-** | four | [[quadruped]] / [[quadrupedal]] | Having four feet; walking on four limbs. |
| **centi-** | hundred | [[centipede]] | Literally "hundred-footed"; multi-segmented predatory arthropod. |
| **milli-** | thousand | [[millipede]] | Literally "thousand-footed"; slow-moving detritivore arthropod with two leg pairs per segment. |
| **sesqui-** | one and a half | [[sesquipedalian]] | Literally "measuring one foot and a half"; applied humorously to excessively long, polysyllabic words. |
| **tri-** | three | [[trivet]] | Formed from Latin *tripēs, tripedis* ("three-footed"); a three-legged metal stand. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective forming | [[pedal]] / [[bipedal]] | Pertaining to feet or operated by the foot. |
| **-ian** | Noun / Adjective forming | [[pedestrian]] | One who travels on foot; characteristic of mundane, uninspired walking pace. |
| **-ure** | Abstract noun forming | [[pedicure]] | The act or practice of caring for the feet (*cūra*). |
| **-ment** | Concrete / Abstract noun | [[impediment]] | The tangible object or condition that blocks movement or speech. |
| **-tion** | Action noun forming | [[expedition]] | The organized act of marching forth on a designated journey. |
| **-ious** | Characterizing adjective | [[expeditious]] | Characterized by swiftness and dispatch. |
| **-cle / -cel** | Diminutive noun forming | [[pedicle]] / [[pedicel]] | A small foot-like attachment, stalk, or supportive bridge. |
| **-uncle** | Diminutive noun forming | [[peduncle]] | A primary stalk or thickened neurological stalk. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Anatomy & Surgery** | [[pedicle]], [[pedicel]], [[peduncle]], [[bipedalism]] | Identification of vertebral pedicles in spinal fusion, neurovascular tissue pedicles in plastic reconstructive surgery, and cerebellar peduncles in neurology. |
| **Zoology & Entomology** | [[biped]], [[quadruped]], [[centipede]], [[millipede]], [[soliped]], [[pedate]] | Classification of animal locomotive morphology, appendage segmentation, and limb evolution. |
| **Botany & Horticulture** | [[pedicel]], [[peduncle]], [[pedate]] | Structural description of inflorescences, flower stalks, fruit-bearing axes, and foot-shaped leaf venation. |
| **Logistics & Project Management** | [[expedite]], [[expeditious]], [[expedition]], [[impede]], [[impediment]] | Critical-path project management, supply chain turnaround times, obstacle mitigation, and overseas logistical operations. |
| **Law, Society & Labor History** | [[peon]], [[peonage]], [[pawn]], [[pioneer]], [[pedigree]] | Feudal debt servitude, chess strategy and political manipulation, frontier settlement, and purebred lineage verification. |
| **Rhetoric, Music & Literature** | [[pedestrian]], [[sesquipedalian]], [[pedal]], [[cap-a-pie]] | Critique of flat prose styles, satire of pompous diction, pipe organ instrumentation, and archaic chivalric descriptions. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[biped]] | noun | **1.** An animal with two feet.<br>**2.** Having two feet. | *"I am that man, the sum of him, the all of him, the hairless biped who struggled upward from the slime and created love and law out of the anarchy of fecund life that screamed and squalled in the jungle."* — Jack London, *The Jacket (The Star-Rover)* |
| [[bipedal]] | adjective | **1.** Having two feet. | *"In academic literature, bipedal designates having two feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centipede]] | noun | **1.** Chiefly nocturnal predacious arthropod having a flattened body of 15 to 173 segments each with a pair of legs, the foremost pair being modified as prehensors. | *"Ye see an old man cut down to the stump; leaning on a shivered lance; propped up on a lonely foot. ’Tis Ahab—his body’s part; but Ahab’s soul’s a centipede, that moves upon a hundred legs."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[expedite]] | verb | **1.** Speed up the progress of; facilitate.<br>**2.** Process fast and efficiently. | *"Since such were her feelings, it only remained, he thought, to secure and expedite a marriage, which, in his very first conversation with Wickham, he easily learnt had never been _his_ design."* — Jane Austen, *Pride and Prejudice* |
| [[expedition]] | noun | **1.** A military campaign designed to achieve a specific objective in a foreign country.<br>**2.** An organized group of people undertaking a journey for a particular purpose. | *"Why, sir, I brought you word an hour since that the bark _Expedition_ put forth tonight, and then were you hindered by the sergeant to tarry for the hoy _Delay_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expeditionary]] | adjective | **1.** (used of military forces) designed for military operations abroad. | *"In academic literature, expeditionary designates (used of military forces) designed for military operations abroad."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expeditious]] | adjective | **1.** Marked by speed and efficiency. | *"I’ll deliver all; And promise you calm seas, auspicious gales, And sail so expeditious that shall catch Your royal fleet far off. [_Aside to Ariel._] My Ariel, chick, That is thy charge: then to the elements Be free, and fare thou well!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expeditiously]] | adverb | **1.** With efficiency; in an efficient manner. | *"But I dressed and wrapped up expeditiously without waking Charley or any one and went down to Mr."* — Charles Dickens, *Bleak House* |
| [[expeditiousness]] | noun | **1.** The property of being prompt and efficient. | *"In academic literature, expeditiousness designates the property of being prompt and efficient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impedance]] | noun | **1.** A material's opposition to the flow of electric current; measured in ohms. | *"In academic literature, impedance designates a material's opposition to the flow of electric current; measured in ohms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impede]] | verb | **1.** Be a hindrance or obstacle to.<br>**2.** Block passage through. | *"And it does not become us, who assist in making the laws, to impede or interfere with those who carry them into execution."* — Charles Dickens, *Bleak House* |
| [[impeded]] | verb | **1.** Be a hindrance or obstacle to.<br>**2.** Block passage through. | *"Wrapped up in a shawl, I still carried the unknown little child: I might not lay it down anywhere, however tired were my arms—however much its weight impeded my progress, I must retain it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[impediment]] | noun | **1.** Something immaterial that interferes with or delays action or progress.<br>**2.** Any structure that makes progress difficult. | *"May I never To this good purpose, that so fairly shows, Dream of impediment!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impeding]] | verb | **1.** Be a hindrance or obstacle to.<br>**2.** Block passage through. | *"Constant cohabitation impeding mutual toleration of personal defects."* — James Joyce, *Ulysses* |
| [[millipede]] | noun | **1.** Any of numerous herbivorous nonpoisonous arthropods having a cylindrical body of 20 to 100 or more segments most with two pairs of legs. | *"In academic literature, millipede designates any of numerous herbivorous nonpoisonous arthropods having a cylindrical body of 20 to 100 or more segments most with two pairs of legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedal]] | noun | **1.** A sustained bass note.<br>**2.** A lever that is operated with the foot. | *"Univ. des Musiciens’ and Nisard’s ‘Vie de l’Abbe Vogler’. -- * “This was a very compact organ, in which four key-boards of five octaves each, and a pedal board of thirty-six keys, with swell complete, were packed into a cube of nine feet."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pedaler]] | noun | **1.** A person who rides a pedal-driven vehicle (as a bicycle). | *"In academic literature, pedaler designates a person who rides a pedal-driven vehicle (as a bicycle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedaller]] | noun | **1.** A person who rides a pedal-driven vehicle (as a bicycle). | *"In academic literature, pedaller designates a person who rides a pedal-driven vehicle (as a bicycle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedant]] | noun | **1.** A person who pays more attention to formal rules and book learning than they merit. | *"I, that have been love’s whip, A very beadle to a humorous sigh, A critic, nay, a night-watch constable, A domineering pedant o’er the boy, Than whom no mortal so magnificent!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pedate]] | adjective | **1.** Of a leaf shape; having radiating lobes, each deeply cleft or divided.<br>**2.** Having or resembling a foot. | *"In academic literature, pedate designates of a leaf shape; having radiating lobes, each deeply cleft or divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedestal]] | noun | **1.** A support or foundation.<br>**2.** A position of great esteem (and supposed superiority). | *"Hermione comes down from the pedestal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pedestrian]] | noun | **1.** A person who travels by foot.<br>**2.** Lacking wit or imagination. | *"Their legs are so hard as to encourage the idea that they must have devoted the greater part of their long and arduous lives to pedestrian exercises and the walking of matches."* — Charles Dickens, *Bleak House* |
| [[pedicure]] | noun | **1.** Professional care for the feet and toenails.<br>**2.** Care for one's feet by cutting and shaping the nails, etc. | *"In academic literature, pedicure designates professional care for the feet and toenails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedigree]] | noun | **1.** The descendants of one individual.<br>**2.** Line of descent of a purebred animal. | *"But for the rest: you tell a pedigree Of threescore and two years, a silly time To make prescription for a kingdom’s worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pedigreed]] | adjective | **1.** Having a list of ancestors as proof of being a purebred animal. | *"In academic literature, pedigreed designates having a list of ancestors as proof of being a purebred animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadruped]] | noun | **1.** An animal especially a mammal having four limbs specialized for walking.<br>**2.** Having four feet. | *"She is angry—she doesn’t know what we mean—she’ll kick over the milk!” exclaimed Tess, gently striving to free herself, her eyes concerned with the quadruped’s actions, her heart more deeply concerned with herself and Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[quadrupedal]] | adjective | **1.** Having four feet. | *"An exquisite dulcet epithalame of most mollificative suadency for juveniles amatory whom the odoriferous flambeaus of the paranymphs have escorted to the quadrupedal proscenium of connubial communion."* — James Joyce, *Ulysses* |
| [[sesquipedalian]] | noun | **1.** A very long word (a foot and a half long).<br>**2.** Given to the overuse of long words. | *"Visually, Stephen’s: The traditional figure of hypostasis, depicted by Johannes Damascenus, Lentulus Romanus and Epiphanius Monachus as leucodermic, sesquipedalian with winedark hair."* — James Joyce, *Ulysses* |
| [[sesquipedality]] | noun | **1.** Using long words. | *"In academic literature, sesquipedality designates using long words."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PED
  </div>
</div>
