---
status: unread
type: root_dashboard
---
# Dashboard — merg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">merg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to plunge or dip”</span>
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

The root **merg** means to plunge or dip. It refers to dip, plunge, sink, immerse, overwhelm. In English, this root forms words such as *merge*, *submerge*, *emerge*, and *emergency*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to plunge or dip
> The root **merg** means to plunge or dip. It refers to dip, plunge, sink, immerse, overwhelm. In English, this root forms words such as *merge*, *submerge*, *emerge*, and *emergency*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To plunge or dip</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *merge* and *submerge*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **merg** comes from a Latin word that means *"to plunge or dip"*.
  - At its core, it describes the action of plunge or dip.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **merg** in an English word, think of **to plunge or dip**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to plunge or dip).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Merge**: To cause two or more things to combine, coalesce, or blend into a single unified whole.
  - **Submerge**: To put, plunge, or push under the surface of water or other liquid.
  - **Emerge**: To rise up out of an enveloping fluid, mist, or darkness.
  - **Emergency**: A sudden, unexpected, and typically dangerous situation or combination of circumstances demanding immediate, decisive intervention.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">merg</mark>, think of <mark class="hl-def">to plunge or dip</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **merg** operates through two fundamental morphological stems derived from the classical principal parts *mergō, mergere, mersī, mersum*:
> - **Primary Active Stem (`merg-`):** Derived from the present active infinitive *mergere*. It governs dynamic verbal actions of blending, surfacing, or plunging: *merge*, *remerge*, *demerge*, *emerge*, *submerge*, *immerge*, and the avian compound *merganser*.
> - **Participial / Supine Stem (`mers-`):** Derived from the perfect passive participle and supine *mersum* (with regular Latin phonological assimilation: *merg- + -tos* $\to$ *mersus*). It governs resultant states, process nouns, adjectives of capacity, and technical designations: *merger*, *demerger*, *emersion*, *submersion*, *submersible*, *submersed*, *immerse*, *immersion*, *immersive*, *immersively*, *immersible*.
> - **Vowel Shifts & Present Participle (`-mergent-`):** From the Latin present participle *emergēns* (genitive *emergentis*), giving rise to active adjectival and abstract nominal formations: *emergent*, *emergently*, *emergence*, and *emergency*.
>
> Prefixes attach to the root to establish directional vectors:
> - **`ex-` / `e-` (out of, upward from):** *ēmergere* $\to$ breaking out of fluid, surfacing into view (*emerge*, *emergence*, *emergency*, *emergent*, *emergently*, *emersion*).
> - **`sub-` (under, beneath):** *submergere* $\to$ plunging beneath the surface, overwhelming (*submerge*, *submersion*, *submersible*, *submersed*, *submergence*, *submerged*).
> - **`in-` $\to$ `im-` (in, into, upon):** *immergere* $\to$ plunging deeply into, steeping, engrossing (*immerge*, *immerse*, *immersion*, *immersive*, *immersively*, *immersible*).
> - **`de-` (down, away; reversal / undoing):** *demerge*, *demerger* (modern reverse formation: undoing an amalgamated corporate merger); historical *demerge* / *demersion* (sinking down).
> - **`re-` (again, back):** *remerge* (coalescing anew).

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
> Although the root fundamentally denotes **"to plunge, sink, dip, or overwhelm in fluid,"** its conceptual reach spans five distinct operational planes:
> - **Physical Hydrodynamics & Immersion:** In [[submerge]], [[submerged]], [[submersion]], [[submersible]], [[submersed]], and [[submergence]], the root preserves its purest literal mechanics—physical descent beneath a liquid surface, hydrostatic concealment, and deep-sea exploration.
> - **Cognitive Absorption & Sensory Simulation:** In [[immerse]], [[immersion]], [[immersive]], [[immersively]], and [[immersible]], the physical bath becomes a psychological and technological state—total concentration in study, linguistic fluency through cultural living, or multi-sensory engulfment in virtual environments.
> - **Revelation, Complexity & Crisis:** In [[emerge]], [[emergence]], [[emergent]], [[emergently]], [[emergency]], and [[emersion]], the vector reverses from descent to ascent. It captures entities rising out of obscurity into light, new macro-level behaviors spontaneously crystallizing from micro-interactions (complexity science), or unforeseen crises suddenly surfacing from the depths to demand instant action.
> - **Corporate Synthesis & Structural Coalescence:** In [[merge]], [[merger]], [[remerge]], [[demerge]], and [[demerger]], the fluid metaphor shifts to mingling streams—two sovereign corporations, legal contracts, or traffic lanes flowing into a single unified body, or reversing that integration through corporate spin-offs.
> - **Zoological & Ecological Taxonomy:** In [[merganser]], the ancient Roman diver-bird (*mergus*) combines with *ānser* ("goose") to designate the sawbill duck that plunges into rushing rivers to pursue aquatic prey.

---

## 🔀 4. Prefix & Combining Dynamics on merg

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ex-` / `e-` | out of, upward from, forth | [[emerge]], [[emergence]], [[emergency]], [[emersion]] | Directs motion upward and out of water or obscurity; transforms deep concealment into visible reality, crisis, or celestial revelation. |
| `sub-` | under, beneath, below | [[submerge]], [[submersion]], [[submersible]], [[submergence]] | Directs motion vertically downward beneath a water surface; denotes physical drowning, naval submergence, or ideological suppression. |
| `in-` (assimilated to `im-`) | in, into, upon, within | [[immerse]], [[immersion]], [[immersive]], [[immerge]] | Directs motion into the interior of a liquid or abstract medium; emphasizes thorough steeping, deep mental concentration, or sensory enveloping. |
| `de-` | down, away from; reversal / undoing | [[demerge]], [[demerger]] | Reverses an existing corporate consolidation; separates an integrated corporate conglomerate back into autonomous operating units. |
| `re-` | again, back, anew | [[remerge]] | Signifies repeated or renewed coalescence; blending back together after temporary division or divergence. |
| `(base)` (unprefixed) | dip, sink, plunge $\to$ combine | [[merge]], [[merger]] | In modern English, shifts from literal sinking to two entities flowing together and losing individual distinction in a greater whole. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-er` / `-or` (Anglo-French *-er*) | Noun (Action / Legal Result) | [[merger]], [[demerger]] | Denotes the formal, legal act or institutional event of absorption or division between entities. |
| `-ence` / `-ency` (Latin *-entia*) | Abstract Noun (State / Process / Event) | [[emergence]], [[emergency]], [[submergence]] | Constructs nouns denoting the quality, process, or sudden manifestation of surfacing or sinking. |
| `-ent` (Latin *-ēns*, *-entis*) | Adjective / Present Participle | [[emergent]] | Expresses active, ongoing arising, unfolding, or newly appearing properties. |
| `-ently` | Adverb (Manner) | [[emergently]] | Expresses the urgent, unexpected, or spontaneous manner in which something surfaces or is resolved. |
| `-ion` (Latin *-iō*, supine *-siō*) | Noun (Act / Result of Process) | [[submersion]], [[immersion]], [[emersion]] | Denotes the completed action, technical condition, or physical phenomenon of plunging, steeping, or exiting eclipse. |
| `-ible` (Latin *-ibilis*) | Adjective (Potential / Capacity) | [[submersible]], [[immersible]] | Denotes the capability of being placed under water without structural or functional destruction. |
| `-ed` | Participial Adjective | [[submerged]], [[submersed]] | Designates a current condition or botanical habit of resting permanently beneath the waterline. |
| `-ive` (Latin *-īvus*) | Adjective (Tendency / Quality) | [[immersive]] | Characterizes environments, simulations, or narratives that produce complete sensory absorption. |
| `-ively` | Adverb (Manner) | [[immersively]] | In a manner that fully surrounds, absorbs, or captivates the senses or attention. |
| `-anser` (Latin *ānser*) | Noun Compound (Avian) | [[merganser]] | Combines the diving bird root *merg-* with *ānser* ("goose") to form a specific zoological genus name. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌊 **Hydrodynamics & Naval Architecture** | [[submerge]], [[submersible]], [[submersion]], [[submerged]] | Autonomous underwater vehicles (AUVs), bathyscaphes diving into the Mariana Trench, ballast tanks controlling submarine buoyancy, and hydrographic survey of deep-sea wreckage. |
| 💼 **Corporate Finance & Antitrust Law** | [[merge]], [[merger]], [[demerge]], [[demerger]] | Horizontal and vertical corporate acquisitions, FTC and European Commission regulatory scrutiny, cross-border corporate consolidations, and spinoffs of non-core subsidiary assets. |
| 🥽 **Virtual Reality & Spatial Computing** | [[immerse]], [[immersion]], [[immersive]], [[immersively]] | Full-dome cinematic environments, 6DoF (six degrees of freedom) VR headsets, spatial audio engine rendering, and high-fidelity flight simulation for military and commercial pilots. |
| 🔭 **Observational Astronomy & Celestial Mechanics** | [[emersion]], [[emerge]] | Precise timing of a star, planet, or Galilean satellite reappearing from behind the Moon or a planetary disk following an occultation or total solar eclipse. |
| 🏥 **Emergency Medicine & Critical Care** | [[emergency]], [[emergent]], [[emergently]] | Level 1 trauma center triage algorithms, resuscitation protocols for cardiac arrest, rapid-response surgical teams, and emergency medical services (EMS) dispatch systems. |
| 🧬 **Complexity Science & Evolutionary Biology** | [[emergence]], [[emergent]], [[merganser]] | Self-organization in ant colonies, flocking behaviors in starlings, spontaneous order in neural networks, and ecological niches of piscivorous diving waterfowl. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[emerge]] | verb | **1.** Come out into view, as from concealment.<br>**2.** Come out of. | *"By the noisome ways through which they descended into that pit, they gradually emerge from it, the crowd flitting, and whistling, and skulking about them until they come to the verge, where restoration of the bull’s-eyes is made to Darby."* — Charles Dickens, *Bleak House* |
| [[emergence]] | noun | **1.** The gradual beginning or coming forth.<br>**2.** The becoming visible. | *"Emergence of the railroad problem. § 9."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[emergency]] | noun | **1.** A sudden unforeseen crisis (usually involving danger) that requires immediate action.<br>**2.** A state in which martial law applies. | *"Leonore really needed no more special care, and in case of an emergency Mea could easily run down to fetch her mother."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[emergent]] | adjective | **1.** Occurring unexpectedly and requiring urgent action.<br>**2.** Coming into existence. | *"In academic literature, emergent designates occurring unexpectedly and requiring urgent action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emerging]] | verb | **1.** Come out into view, as from concealment.<br>**2.** Come out of. | *"Guppy becomes conscious of a manly whisker emerging from the cloistered walk below and turning itself up in the direction of his face."* — Charles Dickens, *Bleak House* |
| [[merganser]] | noun | **1.** Large crested fish-eating diving duck having a slender hooked bill with serrated edges. | *"In academic literature, merganser designates large crested fish-eating diving duck having a slender hooked bill with serrated edges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merge]] | verb | **1.** Become one.<br>**2.** Mix together different elements. | *"These various kinds so merge into each other that they cannot always be distinguished in practice."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[merged]] | verb | **1.** Become one.<br>**2.** Mix together different elements. | *"He may be a very superior man, but he is, so to speak, merged—merged—in the more shining qualities of his wife.” Mr."* — Charles Dickens, *Bleak House* |
| [[mergenthaler]] | noun | **1.** United states inventor (born in germany) of the linotype machine (1854-1899). | *"In academic literature, mergenthaler designates united states inventor (born in germany) of the linotype machine (1854-1899)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merger]] | noun | **1.** The combination of two or more commercial companies.<br>**2.** An occurrence that involves the production of a union. | *"In academic literature, merger designates the combination of two or more commercial companies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merginae]] | noun | **1.** Mergansers and closely related diving birds. | *"In academic literature, merginae designates mergansers and closely related diving birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merging]] | noun | **1.** The act of joining together as one.<br>**2.** A flowing together. | *"Opposed to this is a movement toward the merging of farms of 50 to 100 acres into larger farms of 300 acres, more or less."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mergus]] | noun | **1.** Mergansers. | *"In academic literature, mergus designates mergansers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsubmergible]] | adjective | **1.** Not submersible or submergible. | *"In academic literature, nonsubmergible designates not submersible or submergible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submerge]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Cover completely or make imperceptible. | *"Master Benjamin, or Ben, as he was called everywhere except in his own family, had got possession of the black kitten, and appeared to be submerging her in the hogshead of rainwater."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[submerged]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Cover completely or make imperceptible. | *"O, I would thou didst, So half my Egypt were submerged and made A cistern for scaled snakes!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submergence]] | noun | **1.** Sinking until covered completely with water. | *"Purification by Spirit; submergence in 581:24 Spirit."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[submergible]] | adjective | **1.** Capable of being immersed in water or functioning while submerged. | *"In academic literature, submergible designates capable of being immersed in water or functioning while submerged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submerging]] | noun | **1.** Sinking until covered completely with water.<br>**2.** Sink below the surface; go under or as if under water. | *"Master Benjamin, or Ben, as he was called everywhere except in his own family, had got possession of the black kitten, and appeared to be submerging her in the hogshead of rainwater."* — Jr. Horatio Alger, *Paul Prescott's Charge* |

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
    ROOT DASHBOARD · MERG
  </div>
</div>
