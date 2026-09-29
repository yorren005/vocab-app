---
status: unread
type: root_dashboard
---
# Dashboard — grad
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">grad-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“step or walk”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **grad** means step or walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *graduate*, *gradual*, *grade*, and *degrade*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: step or walk
> The root **grad** means step or walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *graduate*, *gradual*, *grade*, and *degrade*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Step or walk</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *graduate* and *gradual*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **grad** comes from a Latin word that means *"step or walk"*.
  - At its core, it describes step or walk.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **grad** in an English word, think of **motion, travel, and moving forward**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of step or walk.
  - **Mental & Social**: How people experience, organize, or communicate about step or walk.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Graduate**: To successfully complete a prescribed course of academic study and receive a diploma or academic degree.
  - **Gradual**: Proceeding, developing, or changing by small, regular steps or degrees.
  - **Grade**: A stage, step, or station in an official hierarchy, rank, scale of quality, or school system.
  - **Degrade**: To lower in dignity, character, status, or rank.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">grad</mark>, think of <mark class="hl-def">motion, travel, and moving forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The Latin root **grad** operates through two fundamental morphological manifestations:
> - **Nominal Base Stem:** `grad-` (from 4th-declension masculine noun *gradus, gradūs*, genitive plural *graduum*) — generates English nouns, adjectives, and verbs expressing stages, slopes, and measurements: *grade*, *gradient*, *gradual*, *degree* (< *\*degradus*).
> - **Verbal Present Stem:** `grad-` / `gradi-` (from 3rd-conjugation deponent verb *gradior, gradī, gressus sum*) — preserved directly in compound verbs and participial adjectives: *retrograde*, *plantigrade*, *aggrade*, *degrade*. In classical prefixed compounds, the root vowel often underwent apophonic reduction (*grad-* → *-gred-* as in *ingredior* → *ingredient*), while English modern scientific coinages preserved the intact Latin base *grad-*.
> - **Zoological Combining Suffix `-igrade`:** Formed from Latin *gradī* / *gradus*, combined with anatomical noun stems (*planta* "sole" → *plantigrade*; *digitus* "toe" → *digitigrade*; *ungula* "hoof" → *unguligrade*; *tardus* "slow" → *tardigrade*; *saltus* "leap" → *saltigrade*; *latus, lateris* "side" → *laterigrade*).
> - **Morphological Division between `grad` and `gress`:**
>   - The present/nominal base **`grad-`** governs continuous or stepped scales, academic ranks, rates of change, and modes of walking (*grade*, *gradual*, *gradient*, *centigrade*, *plantigrade*).
>   - The perfect passive / supine stem **`gress-`** (from *gressus*) governs completed motion, directional transit, encounters, and spatial transgressions (*progress*, *congress*, *ingress*, *egress*, *regress*, *transgress*, *aggression*), fully explored on [[Dashboard — gress]].
>
> By attaching directional prefixes (*ad-*, *de-*, *retro-*, *pro-*, *sub-*, *multi-*, *centi-*), vernacular Germanic prefixes (*up-*, *down-*), and derivational suffixes (*-al*, *-ation*, *-able*, *-ism*, *-ist*, *-ient*, *-ate*), the root produces an exceptionally diverse technical and general lexicon.

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
> Although the root fundamentally denotes **"step, walk, degree, rank, stage"**, its semantic focus branches across distinct cognitive and operational domains:
> - **Terrestrial Locomotion & Anatomical Gait:** In zoological classifications like [[plantigrade]] (bears, humans), [[digitigrade]] (cats, dogs), [[unguligrade]] (horses, deer), [[laterigrade]] (crabs, crab spiders), and [[saltigrade]] (jumping spiders), the root denotes the exact anatomical mechanism of foot-to-ground contact. In [[tardigrade]], it reflects microscopic slow-stepping resilience.
> - **Temporal Progression & Incremental Continuity:** In words like [[gradual]], [[gradually]], and philosophical [[gradualism]], the root captures processes that unfold by tiny, almost imperceptible successive stages rather than sudden catastrophic leaps.
> - **Physical Metrology, Thermal Calibration & Mathematical Rates:** In [[gradient]] and [[centigrade]], the step becomes a strictly quantified unit: the spatial rate of change of temperature, pressure, or elevation over distance, or the division of the thermal spectrum into 100 equal degrees.
> - **Institutional, Academic & Societal Hierarchy:** In [[grade]], [[graduate]], [[graduation]], [[undergraduate]], [[postgraduate]], and [[degree]], a step is a certified milestone in educational attainment, professional competence, or bureaucratic rank.
> - **Geological, Geomorphological & Fluvial Dynamics:** In [[aggrade]], [[aggradation]], and [[degrade]], the root describes the physical raising (sediment accumulation) or lowering (stream-bed erosion and downcutting) of landforms step by step.
> - **Moral, Structural & Chemical Decomposition:** In [[degrade]], [[degradation]], [[degradable]], and [[biodegradable]], the downward step shifts from literal physical descent to social dishonor, structural material weathering, and the metabolic breakdown of complex molecules by biological organisms.
> - **Planetary Dynamics & Directional Motion:** In [[retrograde]], [[retrogradation]], and [[prograde]], the root maps the apparent or true orbital direction of celestial spheres—stepping backward or forward relative to the celestial backdrop.

---

## 🔀 4. Prefix & Combining Dynamics on grad

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (as `ag-`) | to, toward, upon | [[aggrade]], [[aggradation]] | To step or build up sediment upon a riverbed; to raise a valley floor by deposition. |
| `de-` | down, away from | [[degrade]], [[degradation]], [[degree]] | To step downward in rank, moral character, physical structure, or molecular complexity. |
| `retro-` | backward, behind | [[retrograde]], [[retrogradation]] | Moving or stepping in a backward direction; contrary to the standard order of planetary orbit or cultural progress. |
| `pro-` | forward, forth | [[prograde]] | Moving, rotating, or orbiting in the normal forward direction of celestial revolution. |
| `sub-` | under, below | [[subgrade]] | The prepared native soil or foundational earth layer lying beneath a road or railway bed. |
| `centi-` | hundred | [[centigrade]] | Having a scale divided into one hundred equal degree-steps between freezing and boiling points. |
| `multi-` | many, multiple | [[multigrade]] | Encompassing multiple grades, ranks, or viscosity classes within a single framework. |
| `bio-` | life, living organisms | [[biodegradable]], [[biodegradability]] | Capable of being broken down step by step into harmless natural substances by living microorganisms. |
| `up-` | upward | [[upgrade]] | To raise to a higher step, standard, rank, or quality level; an upward incline. |
| `down-` | downward | [[downgrade]] | To reduce to a lower step, rank, or priority; a downward slope or decline. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective forming | [[gradual]], [[gradational]] | Proceeding by small, measured steps; characterized by sequential stages. |
| `-ly` | Adverb forming | [[gradually]] | In a step-by-step, incremental manner over time. |
| `-ate` | Verb / Noun / Adj. | [[graduate]], [[aggrade]] | To confer or receive an academic degree; to divide into regular steps; or one who has completed a degree. |
| `-ation` | Action / Result noun | [[graduation]], [[degradation]], [[aggradation]], [[retrogradation]], [[gradation]] | The formal act, historical process, or cumulative result of stepping, ranking, or changing state. |
| `-ient` | Participial adjective / noun | [[gradient]] | Rising or descending by regular steps; the rate of change of a physical variable over distance. |
| `-ism` | Doctrine / Principle noun | [[gradualism]] | The philosophical, political, or evolutionary belief that change occurs through slow, cumulative steps. |
| `-ist` | Agent / Adherent noun | [[gradualist]] | An advocate who champions incremental reform or gradual evolutionary change over sudden upheaval. |
| `-able` | Passive capability adjective | [[degradable]], [[biodegradable]] | Capable of being decomposed, broken down, or reduced step by step. |
| `-ity` | Abstract quality noun | [[biodegradability]] | The inherent capacity or property of a substance to be broken down by microorganisms. |
| `-igrade` | Locomotion combining form | [[plantigrade]], [[digitigrade]], [[unguligrade]], [[tardigrade]], [[laterigrade]], [[saltigrade]] | Characterized by a specific anatomical mode or posture of stepping upon the ground. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🐾 **Zoology & Comparative Anatomy** | [[plantigrade]], [[digitigrade]], [[unguligrade]], [[tardigrade]], [[laterigrade]], [[saltigrade]] | Classification of vertebrate and invertebrate locomotor postures, limb biomechanics, predator-prey cursorial adaptations, and micro-invertebrate cryptobiosis. |
| 🌍 **Geology, Geomorphology & Sedimentology** | [[gradient]], [[aggrade]], [[aggradation]], [[degrade]], [[degradation]], [[gradational]], [[subgrade]] | Quantitative analysis of stream profiles, fluvial sediment deposition and erosion cycles, highway sub-base engineering, and transitional rock strata boundaries. |
| 🔭 **Astronomy & Celestial Mechanics** | [[retrograde]], [[retrogradation]], [[prograde]] | Analysis of apparent planetary loops against background constellations, retrograde moons, axial tilt rotation directions, and protoplanetary disk formation. |
| 🎓 **Higher Education & Academic Administration** | [[grade]], [[graduate]], [[graduation]], [[undergraduate]], [[postgraduate]], [[multigrade]], [[degree]] | Institutional certification of academic attainment, hierarchical curriculum design, student evaluation metrics, and university degree conferral. |
| 🌡️ **Thermodynamics, Physics & Engineering** | [[centigrade]], [[gradient]], [[subgrade]], [[multigrade]] | Thermal calibration scales (Celsius), pressure and concentration gradients in fluid dynamics, roadbed foundation stability, and multigrade motor oil viscosity. |
| 🌿 **Environmental Chemistry & Ecology** | [[biodegradable]], [[biodegradability]], [[degradable]], [[degradation]] | Polymer life-cycle assessment, environmental decomposition kinetics, waste management standards, and soil health monitoring. |
| 🏛️ **Politics, Philosophy & Evolutionary Biology** | [[gradualism]], [[gradualist]], [[gradual]], [[gradation]], [[degradation]] | Philosophical theories of evolutionary change (Darwinian gradualism vs. punctuated equilibrium), incremental political reform, and sociopolitical decline. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aggrade]] | verb | **1.** Build up to a level by depositing sediment. | *"In academic literature, aggrade designates build up to a level by depositing sediment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centigrade]] | adjective | **1.** Of or relating to a temperature scale on which the freezing point of water is 0 degrees and the boiling point of water is 100 degrees. | *"The cold of interstellar space, thousands of degrees below freezing point or the absolute zero of Fahrenheit, Centigrade or Réaumur: the incipient intimations of proximate dawn."* — James Joyce, *Ulysses* |
| [[degradation]] | noun | **1.** Changing to a lower state (a less respected state).<br>**2.** A low or downcast state; - h.l.menchken. | *"Sir Walter could not have borne the degradation of being known to design letting his house."* — Jane Austen, *Persuasion* |
| [[degrade]] | verb | **1.** Reduce the level of land, as by erosion.<br>**2.** Reduce in worth or character, usually verbally. | *"As for me, without shame I tell you the only reason I do not spit upon you is that I cannot demean myself nor so degrade my spittle.” “I’ve reached the limit of my patience!” he bellowed."* — Jack London, *The Jacket (The Star-Rover)* |
| [[degraded]] | verb | **1.** Reduce the level of land, as by erosion.<br>**2.** Reduce in worth or character, usually verbally. | *"When you disgraced me in my embassade, Then I degraded you from being king, And come now to create you Duke of York."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[degrader]] | noun | **1.** A person who lowers the quality or character or value (as by adding cheaper metal to coins). | *"In academic literature, degrader designates a person who lowers the quality or character or value (as by adding cheaper metal to coins)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[degrading]] | verb | **1.** Reduce the level of land, as by erosion.<br>**2.** Reduce in worth or character, usually verbally. | *"He thought it a very degrading alliance; and Lady Russell, though with more tempered and pardonable pride, received it as a most unfortunate one."* — Jane Austen, *Persuasion* |
| [[grad]] | noun | **1.** One-hundredth of a right angle.<br>**2.** A person who has received a degree from a school (high school or college or university). | *"BY WILLIAM BEATTIE, M.D., GRAD."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[gradable]] | adjective | **1.** Capable of being graded (for quality or rank or size etc.). | *"In academic literature, gradable designates capable of being graded (for quality or rank or size etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gradate]] | verb | **1.** Arrange according to grades.<br>**2.** Pass imperceptibly from one degree, shade, or tone into another. | *"In academic literature, gradate designates arrange according to grades."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gradation]] | noun | **1.** Relative position in a graded series.<br>**2.** A degree of ablaut. | *"Him I’ll desire To meet me at the consecrated fount, A league below the city; and from thence, By cold gradation and well-balanced form."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gradational]] | adjective | **1.** Taking place by degrees. | *"In academic literature, gradational designates taking place by degrees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gradatory]] | adjective | **1.** Taking place by degrees. | *"In academic literature, gradatory designates taking place by degrees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grade]] | noun | **1.** A body of students who are taught together.<br>**2.** A relative position or degree of value in a graded group. | *"In many parts of the world were enormous deposits of low-grade ores, before useless, that could be worked economically by the new methods."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[grade-appropriate]] | adjective | **1.** The quality of ability and work that is appropriate for students in a specified grade. | *"In academic literature, grade-appropriate designates the quality of ability and work that is appropriate for students in a specified grade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grade-constructed]] | adjective | **1.** Constructed at ground level. | *"In academic literature, grade-constructed designates constructed at ground level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graded]] | verb | **1.** Assign a rank or rating to.<br>**2.** Level to the right gradient. | *"It had the same long regularly graded retreating slope from above the brows, which were likewise very projecting, like two long promontories thickly wooded on top."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[grader]] | noun | **1.** A judge who assigns grades to something. | *"In academic literature, grader designates a judge who assigns grades to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gradient]] | noun | **1.** A graded change in the magnitude of some physical quantity or dimension.<br>**2.** The property possessed by a line or surface that departs from the horizontal. | *"O, get, rev on a gradient one in nine."* — James Joyce, *Ulysses* |
| [[grading]] | noun | **1.** The act of arranging in a graduated series.<br>**2.** Changing the ground level to a smooth horizontal or gently sloping surface. | *"The "grading camps" of the railroads were followed by belts of these self-asserting annuals."* — W. E. Webb, *Buffalo Land* |
| [[gradual]] | noun | **1.** (roman catholic church) an antiphon (usually from the book of psalms) immediately after the epistle at mass.<br>**2.** Proceeding in small stages. | *"Drink, Henry Fray—drink,” magnanimously said Jan Coggan, a person who held Saint-Simonian notions of share and share alike where liquor was concerned, as the vessel showed signs of approaching him in its gradual revolution among them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[graduality]] | noun | **1.** The quality of being gradual or of coming about by gradual stages. | *"In academic literature, graduality designates the quality of being gradual or of coming about by gradual stages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gradually]] | adverb | **1.** In a gradual manner. | *"Gradually the whole knot moved into the house and towards the uncle's armchair."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[gradualness]] | noun | **1.** The property possessed by a slope that is very gradual.<br>**2.** The quality of being gradual or of coming about by gradual stages. | *"In academic literature, gradualness designates the property possessed by a slope that is very gradual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graduate]] | noun | **1.** A person who has received a degree from a school (high school or college or university).<br>**2.** A measuring instrument for measuring fluid volume; a glass container (cup or cylinder or flask) whose sides are marked with or divided into amounts. | *"I learned to suffer passively, as, undoubtedly, all men have learned who have passed through the post-graduate courses of strait-jacketing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[graduated]] | verb | **1.** Receive an academic degree upon completion of one's studies.<br>**2.** Confer an academic degree upon. | *"From the Maiden’s Blush, through all varieties of the Provence down to the Crimson Tuscany, the countenance of Oak’s acquaintance quickly graduated; whereupon he, in considerateness, turned away his head."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[graduation]] | noun | **1.** The successful completion of a program of study.<br>**2.** An academic exercise in which diplomas are conferred. | *"The graduation principle. § 10."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[postgraduate]] | noun | **1.** A student who continues studies after graduation.<br>**2.** Of or relating to studies beyond a bachelor's degree. | *"In academic literature, postgraduate designates a student who continues studies after graduation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrograde]] | verb | **1.** Move backward in an orbit, of celestial bodies.<br>**2.** Move in a direction contrary to the usual one. | *"When he was retrograde, I think rather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undergrad]] | noun | **1.** A university student who has not yet received a first degree. | *"In academic literature, undergrad designates a university student who has not yet received a first degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undergraduate]] | noun | **1.** A university student who has not yet received a first degree. | *"When I was an undergraduate, I well remember that most of my friends who were likely to take high mathematical honors were already so ultimately acquainted with Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[ungraded]] | adjective | **1.** (of roads) not leveled or drained; unsuitable for all year travel.<br>**2.** Not arranged in order hierarchically. | *"In academic literature, ungraded designates (of roads) not leveled or drained; unsuitable for all year travel."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GRAD
  </div>
</div>
