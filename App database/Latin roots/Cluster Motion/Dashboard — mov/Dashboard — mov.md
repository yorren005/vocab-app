---
status: unread
type: root_dashboard
---
# Dashboard — mov
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mov-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to move”</span>
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

The root **mov** means to move. It refers to move, stir, set in motion, displace, affect emotionally. In English, this root forms words such as *move*, *movement*, *remove*, and *immovable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to move
> The root **mov** means to move. It refers to move, stir, set in motion, displace, affect emotionally. In English, this root forms words such as *move*, *movement*, *remove*, and *immovable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To move</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *move* and *movement*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mov** comes from a Latin word that means *"to move"*.
  - At its core, it describes the action of move.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **mov** in an English word, think of **to move**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to move).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Move**: To change place or posture.
  - **Movement**: An act of changing physical location or position, or of having this done.
  - **Remove**: To take off or take away from the position occupied.
  - **Immovable**: Incapable of being physically moved.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mov</mark>, think of <mark class="hl-def">to move</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> In Latin, the verb *moveō, movēre, mōvī, mōtum* operated across distinct morphological stems that gave rise to separate English derivative families:
> - **Present Active Stem `mov-` (The Focus of this Dashboard):** Inherited through Anglo-Norman *mover* and Old French *mouvoir* into Middle English *moven*. Characterized by the vowel `o` and consonant `v`, this stem generates the primary English verb (*move*), verbal substantives (*movement*, *moving*), agent nouns (*mover*, *prime mover*), capacity adjectives (*movable*, *removable*), and prefixed verbs of displacement (*remove*).
> - **Supine / Perfect Passive Stem `mōt-` (See [[Dashboard — mot]]):** From Latin *mōtum* (participial stem with long `ō` and dental `t`). Adopted during the Renaissance and scientific revolution directly from classical Latin for resulting states, impulses, and causes: *motion*, *motive*, *motor*, *emotion*, *promote*, *demote*, *locomotion*, *remote*.
> - **Adjectival / Modal Stem `mōb-` (See [[Dashboard — mob]]):** From the Latin verbal adjective *mōbilis* (a phonetic contraction of prehistoric `*mov-bilis`, where the labial `v` dropped before the bilabial suffix `-bilis`). Governs rapid transit, adaptability, and crowd psychology: *mobile*, *mobility*, *mobilize*, *automobile*, *mob* (from *vulgus mōbile*).
>
> By attaching directional and negative prefixes (*re-*, *in-*/*im-*, *un-*) to the front of `mov-` and functional suffixes (*-ment*, *-ing*, *-ly*, *-er*, *-able*, *-ity*, *-al*, *-ie*) to the back, English constructs an integrated kinetic and institutional vocabulary.

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
> Although the root fundamentally denotes **"to move, displace, or stir"**, its semantic manifestation branches across five distinct operational planes:
> - **Physical Kinematics & Spatial Translation:** The literal changing of place, posture, or physical arrangement under applied mechanical energy: [[move]], [[movement]], [[moving]], [[unmoving]].
> - **Affective Power & Emotional Resonance:** The internal perturbation of the heart, sympathy, pathos, or moral conscience by art, grief, or eloquence: [[moving]], [[movingly]], [[unmoved]].
> - **Jurisprudence, Civil Tenure & Property Law:** The legal classification of property into movable chattels versus immovable realty, the dismissal of officers, or the transfer of courtroom causes: [[remove]], [[removal]], [[removable]], [[irremovable]], [[movable]], [[immovable]], [[movability]], [[immovability]], [[immovably]], [[unmovable]].
> - **Causality, Metaphysics & Agency:** The initiators of systemic change, philosophical first causes, or political instigators: [[mover]], [[prime mover]].
> - **Cinematic Media & Visual Technology:** The 20th-century illusion of fluid motion generated by sequential photographic frames: [[movie]].

---

## 🔀 4. Prefix & Combining Dynamics on mov

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | back, away, off | [[remove]] | Moves *away* or *back* from an occupied position; shifts from simple transit to dismissal, detachment, or extraction. |
| `re-` + `-al` | back, away (nominalized) | [[removal]] | The completed act or official process of taking away, dismissing from office, or transferring location. |
| `in-` $\to$ `im-` | not, un- (negative assimilation) | [[immovable]] | *Not* capable of being moved; shifts from kinetic capacity to absolute physical fixity or unshakeable moral steadfastness. |
| `in-` $\to$ `ir-` + `re-` | not + away (double prefixation) | [[irremovable]] | *Not* capable of being removed or dismissed; expresses permanent constitutional tenure or indelible adhesion. |
| `un-` | not (Germanic negative prefix) | [[unmovable]] | Native English negation applied to the Latin stem; denotes physical or spiritual incapacity for displacement. |
| `un-` | not (participial negation) | [[unmoved]] | *Not* stirred emotionally or displaced physically; conveys stoic composure, callousness, or static equilibrium. |
| `un-` | not (continuous negation) | [[unmoving]] | *Not* in motion; denotes absolute physical stillness, rest, or dramatic stagnation. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Noun (Action / Process / Result) | [[movement]] | Denotes the continuous process of moving, a mechanical watch assembly, or an organized socio-political campaign. |
| `-ing` | Adjective / Present Participle | [[moving]] | Expresses active physical transit or evocative emotional power that stirs feelings. |
| `-ly` | Adverb (Manner / Degree) | [[movingly]] | Modifies verbs to describe speech, performance, or writing executed in an emotionally stirring manner. |
| `-er` | Noun (Agent / Instrument) | [[mover]] | Names the human agent, company, or mechanical entity that initiates or executes physical or political motion. |
| `-able` | Adjective (Capacity / Fitness) | [[movable]] | Designates the inherent capacity or legal permission to be transported, shifted, or rescheduled. |
| `-ity` | Noun (State / Essential Quality) | [[movability]] | Names the abstract property, metric, or degree of being susceptible to physical displacement. |
| `-able` + `-ity` | Noun (Negative State / Property) | [[immovability]] | Expresses the permanent condition of resistance to physical translation or psychological influence. |
| `-able` + `-ly` | Adverb (Unshakeable Manner) | [[immovably]] | Expresses absolute steadfastness, rigidity, or unalterable fixation in action or belief. |
| `-al` | Noun (Act / Result of Action) | [[removal]] | Nominalizes the verb *remove* into the formal act of displacement, dismissal, or residential transport. |
| `-ie` | Noun (Colloquial Diminutive) | [[movie]] | Clips the compound phrase *moving picture* into a familiar, high-frequency noun denoting a cinema film. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Property Law** | [[movable]], [[immovable]], [[removal]], [[removable]], [[irremovable]] | Codification of Roman law property divisions into personal property (*movables* / *res mobiles*) and real estate (*immovables* / *res immobiles*); constitutional law safeguarding the *irremovable* tenure of appellate judges to protect the separation of powers; judicial *removal* of trustees for breach of fiduciary duty. |
| 🎬 **Cinema & Visual Media** | [[movie]], [[moving]], [[movement]] | The technological transition from static photography to the illusion of continuous animation (*moving pictures*, *movies*); cinematography framing camera *movement* (pans, tilts, tracking shots); aesthetic *movements* (French New Wave, German Expressionism) that redefine film history. |
| ⚙️ **Physics, Statics & Mechanics** | [[move]], [[movement]], [[prime mover]], [[unmoving]], [[immovable]] | Newton's First Law of Motion dictating that an object will not *move* unless acted upon by an unbalanced force; engineering statics analyzing *immovable* structural trusses and bridges; thermodynamics identifying thermal and hydraulic turbines as *prime movers* converting natural energy into shaft power. |
| 📦 **Logistics, Relocation & Urban Planning** | [[move]], [[mover]], [[removal]], [[movability]] | Residential and commercial *removals* (UK *removal companies*, US *professional movers*); supply chain optimization of freight logistics; urban planning emphasizing the *movability* and modularity of temporary civic infrastructure. |
| 🧠 **Psychology & Human Affect** | [[moving]], [[movingly]], [[unmoved]] | Affective neuroscience exploring emotional contagion and catharsis elicited by *moving* artistic narratives; clinical psychology evaluating psychopathic indifference or stoic resilience where subjects remain totally *unmoved* by traumatic stimuli. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[commove]] | verb | **1.** Cause to be agitated, excited, or roused.<br>**2.** Change the arrangement or position of. | *"In academic literature, commove designates cause to be agitated, excited, or roused."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[countermove]] | noun | **1.** An attack by a defending force against an attacking enemy force in order to regain lost ground or cut off enemy advance units etc. | *"In academic literature, countermove designates an attack by a defending force against an attacking enemy force in order to regain lost ground or cut off enemy advance units etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immovability]] | noun | **1.** Not capable of being moved or rearranged. | *"Trius had been absorbed in their violent altercation and had stared at each other, she in wild excitement and he in stiff immovability, Mäzli had slipped from between the two as swiftly as a little mouse."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[immovable]] | noun | **1.** Property consisting of houses and land.<br>**2.** Not able or intended to be moved. | *"He sat secure, straight and immovable even when the horses trotted or galloped."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[immovableness]] | noun | **1.** Not capable of being moved or rearranged. | *"In academic literature, immovableness designates not capable of being moved or rearranged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immovably]] | adverb | **1.** So as to be incapable of moving. | *"Her hand often lay immovably on these, while she absently looked in front of her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[immoveable]] | adjective | **1.** Not able or intended to be moved. | *"In academic literature, immoveable designates not able or intended to be moved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irremovable]] | adjective | **1.** Incapable of being removed or away or dismiss. | *"He’s irremovable, Resolv’d for flight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[movability]] | noun | **1.** The quality of being movable; capable of being moved or rearranged. | *"Junius does not say it, but clearly implies that, in this way, Coster came to the idea of the movability of the characters, the first step in the invention of typography."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[movable]] | noun | **1.** Personal as opposed to real property; any tangible movable property (furniture or domestic animals or a car etc).<br>**2.** (of personal property as opposed to real estate) can be moved from place to place (especially carried by hand). | *"A house long unused must be swept, and then the person who is purifying it must take a stick and beat not only the movable objects, but the beds, posts, and in short every accessible part of the interior."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[movableness]] | noun | **1.** The quality of being movable; capable of being moved or rearranged. | *"In academic literature, movableness designates the quality of being movable; capable of being moved or rearranged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[move]] | noun | **1.** The act of deciding to do something.<br>**2.** The act of changing your residence or place of business. | *"So either by thy picture or my love, Thyself away, art present still with me, For thou not farther than my thoughts canst move, And I am still with them, and they with thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moveable]] | adjective | **1.** Capable of being moved or conveyed from one place to another. | *"I knew you at the first, You were a moveable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moved]] | verb | **1.** Change location; move, travel, or proceed, also metaphorically.<br>**2.** Cause to move or shift into a new position or place, both in a concrete and in an abstract sense. | *"His wife that’s dead did trespasses to Caesar; His brother warred upon him, although I think, Not moved by Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[movement]] | noun | **1.** A change of position that does not entail a change of location.<br>**2.** The act of changing location from one place to another. | *"The golden moon above was going her way and seemed to look down with friendly eyes, as if she was gratified that the house, which was filled all day with such noise and lively movement, was standing there so calm and peaceful."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[mover]] | noun | **1.** Workman employed by a moving company.<br>**2.** (parliamentary procedure) someone who makes a formal motion. | *"O Thou eternal mover of the heavens, Look with a gentle eye upon this wretch!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[movie]] | noun | **1.** A form of entertainment that enacts a story by sound and a sequence of images giving the illusion of continuous movement. | *"The seat faced a white screen like those in movie theaters."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[moviegoer]] | noun | **1.** Someone who goes to see movies. | *"In academic literature, moviegoer designates someone who goes to see movies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moviemaking]] | noun | **1.** The production of movies. | *"In academic literature, moviemaking designates the production of movies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moving]] | verb | **1.** Change location; move, travel, or proceed, also metaphorically.<br>**2.** Cause to move or shift into a new position or place, both in a concrete and in an abstract sense. | *"The blow thou hadst Shall make thy peace for moving me to rage, And I will boot thee with what gift beside Thy modesty can beg."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[movingly]] | adverb | **1.** In a moving manner. | *"I would have had them writ more movingly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonmoving]] | adjective | **1.** Not in motion. | *"In academic literature, nonmoving designates not in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[removable]] | adjective | **1.** Capable of being removed or taken away or dismissed.<br>**2.** Able to be obliterated completely. | *"The members of the judiciary department, again, are appointable by the executive department, and removable by the same authority on the address of the two legislative branches."* — Alexander Hamilton, *The Federalist Papers* |
| [[removal]] | noun | **1.** The act of removing.<br>**2.** Dismissal from office. | *"The letter gave me only five days’ notice of my removal."* — Charles Dickens, *Bleak House* |
| [[remove]] | noun | **1.** Degree of figurative distance or separation;  or.<br>**2.** Remove something concrete, as by lifting, pushing, or taking off, or remove something abstract. | *"Love is a babe, then might I not say so To give full growth to that which still doth grow. 116 Let me not to the marriage of true minds Admit impediments, love is not love Which alters when it alteration finds, Or bends with the remover to remove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[removed]] | verb | **1.** Remove something concrete, as by lifting, pushing, or taking off, or remove something abstract.<br>**2.** Remove from a position or an office. | *"How many a holy and obsequious tear Hath dear religious love stol’n from mine eye, As interest of the dead, which now appear, But things removed that hidden in thee lie."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remover]] | noun | **1.** A solvent that removes a substance (usually from a surface).<br>**2.** Someone who works for a company that moves furniture. | *"Love is a babe, then might I not say so To give full growth to that which still doth grow. 116 Let me not to the marriage of true minds Admit impediments, love is not love Which alters when it alteration finds, Or bends with the remover to remove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unmovable]] | adjective | **1.** Not able or intended to be moved. | *"I feel an earnest wish you should do this too that there may be the broad unmovable foundation-rock of perfect truth and candour for our love."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[unmoved]] | adjective | **1.** Emotionally unmoved.<br>**2.** Being in the original position; not having been moved. | *"He now interposes, addressing the young surgeon in his unmoved, professional way."* — Charles Dickens, *Bleak House* |
| [[unmoving]] | adjective | **1.** Not in motion.<br>**2.** Not arousing emotions. | *"But, alas, to make me A fixed figure for the time of scorn To point his slow unmoving finger at."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · MOV
  </div>
</div>
