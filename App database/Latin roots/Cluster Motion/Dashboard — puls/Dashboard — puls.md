---
status: unread
type: root_dashboard
---
# Dashboard — puls
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">puls-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to drive or push”</span>
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

The root **puls** means to drive or push. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *pulse*, *impulse*, *repulsive*, and *compulsion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to drive or push
> The root **puls** means to drive or push. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *pulse*, *impulse*, *repulsive*, and *compulsion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To drive or push</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *pulse* and *impulse*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **puls** comes from a Latin word that means *"to drive or push"*.
  - At its core, it describes the action of drive or push.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **puls** in an English word, think of **to drive or push**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to drive or push).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Pulse**: The rhythmic expansion and recoil of an artery produced by the surge of blood ejected into the arterial tree by ventricular contraction of the heart, palpable at superficial points.
  - **Impulse**: A sudden, spontaneous, unpremeditated inclination, urge, or emotional impetus prompting an immediate action without deliberate forethought or moral reflection.
  - **Repulsive**: Arousing intense physical disgust, visceral revulsion, or moral abhorrence.
  - **Compulsion**: The act of compelling or the state of being forced to do something under overwhelming external duress, judicial authority, or physical coercion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">puls</mark>, think of <mark class="hl-def">to drive or push</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **puls** operates as a supine, participial, and frequentative engine within English morphology:
> - **Primary Participial / Supine Stem:** `puls-` (from Latin *pulsum*, neuter past participle of *pellere*). It serves as the base for Latin fourth-declension abstract nouns (*pulsus, pulsūs* $\to$ English **pulse**) and joins directly with prefixes to form nouns of completed action or state (*compulsion*, *expulsion*, *impulse*, *propulsion*, *repulsion*, *appulse*).
> - **Frequentative / Iterative Stem:** `pulsāt-` (from Latin *pulsāre*, frequentative of *pellere*). In Latin, frequentative verbs were formed on the supine stem to denote repeated, intensive, or habitual action. From *pulsātus* English derives the verb **pulsate**, the abstract noun **pulsation**, the adjective **pulsatile**, and the mechanical agent **pulsator**.
> - **Morphological Split: Present Stem `pel-` vs. Supine Stem `puls-`:**
>   - The present active stem **`pel-`** (covered in [[Dashboard — pel]]) creates transitive verbs of ongoing action and active participles: *propel*, *repel*, *compel*, *expel*, *impel*, *dispel*, *propeller*, *repellent*.
>   - The supine stem **`puls-`** (the focus of this dashboard) creates nouns denoting completed action, resulting states, or physical forces (*propulsion*, *repulsion*, *compulsion*, *expulsion*, *impulse*), dispositional adjectives (*propulsive*, *repulsive*, *compulsive*, *expulsive*, *impulsive*, *compulsory*), and rhythmic phenomena (*pulse*, *pulsation*, *pulsar*).
> - **Prefix Assimilation Rules:**
>   - *com-* + *puls-* $\to$ **compulsion**, **compulsive**, **compulsory** (bilabial *m* remains stable before voiceless stop *p*).
>   - *in-* + *puls-* $\to$ **impulse**, **impulsive**, **impulsion** (dental *n* assimilates to bilabial *m* before *p*).
>   - *ad-* + *puls-* $\to$ **appulse** (dental *d* assimilates completely to *p*).
>   - *ex-* + *puls-* $\to$ **expulsion**, **expulsive** (consonant group *xp* remains stable).
>   - *pro-* + *puls-* $\to$ **propulsion**, **propulsive** (*pro-* prefixes directly).
>   - *re-* + *puls-* $\to$ **repulse**, **repulsion**, **repulsive** (*re-* prefixes directly).
>   - *dis-* + *puls-* $\to$ **dispulsion** (*dis-* prefixes directly).
> - **Suffix Branching & Syntactic Conversion:**
>   - **-ion:** Creates abstract nouns denoting an act, process, or resulting state (*compulsion*, *expulsion*, *impulsion*, *propulsion*, *repulsion*, *pulsation*, *dispulsion*).
>   - **-ive:** Creates adjectives indicating a tendency, disposition, or operational function (*compulsive*, *expulsive*, *impulsive*, *propulsive*, *repulsive*).
>   - **-ory:** Creates adjectives denoting obligation, prescription, or authority (*compulsory*).
>   - **-ile:** Creates adjectives indicating physiological rhythm or acoustic striking (*pulsatile*).
>   - **-ar:** Coined in modern astrophysics as a substantive clipping (*pulsar* < *pulsating star*).
>   - **-or:** Agent noun or mechanical apparatus (*pulsator*).
>   - **-ance:** Physical or electrical property denoting angular frequency (*pulsance*).
>   - **-meter:** Instrument for counting or measuring rhythmic beats (*pulsometer*).
>   - **-less:** Privative adjective indicating absence of arterial beats (*pulseless*).
>   - **-ness / -ly:** Secondary nominal and adverbial derivations (*impulsiveness*, *compulsiveness*, *compulsoriness*, *repulsiveness*; *impulsively*, *compulsively*, *repulsively*).

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
> Although the root fundamentally denotes striking or driving, its semantic realization diversifies across distinct operational planes:
> - **Cardiovascular Physiology, Hemodynamics & Clinical Care:** [[pulse]], [[pulsate]], [[pulsation]], [[pulsatile]], [[pulseless]], [[pulsator]], [[pulsometer]] govern the mechanical rhythm of cardiac contraction, arterial pressure waves, and resuscitation diagnostics.
> - **Astrophysics, Electrodynamics & Wave Mechanics:** [[pulsar]], [[pulse]], [[pulsation]], [[pulsance]], [[appulse]] describe periodic electromagnetic radiation from neutron stars, transient laser bursts, alternating current angular frequency, and orbital close approaches.
> - **Depth Psychology, Psychiatry & Behavioral Dynamics:** [[impulse]], [[impulsive]], [[impulsively]], [[impulsiveness]], [[impulsion]], [[compulsion]], [[compulsive]], [[compulsively]], [[compulsiveness]] articulate the tension between conscious executive control, unmediated instinctual urges, and pathological repetitive rituals.
> - **Aeronautics, Astronautics & Mechanical Kinetics:** [[propulsion]], [[propulsive]], [[impulse]], [[pulsator]], [[pulsometer]] form the core technical lexicon of rocket thrust, specific impulse ($I_{sp}$), jet engines, and reciprocating hydraulic machinery.
> - **Jurisprudence, Sovereignty & Institutional Coercion:** [[compulsory]], [[compulsoriness]], [[compulsion]], [[expulsion]], [[expulsive]], [[dispulsion]] delineate the formal powers of the state, judicial mandates, institutional banishment, and the scattering of assemblies.
> - **Combat Tactics, Sensory Aversion & Electromagnetism:** [[repulse]], [[repulsion]], [[repulsive]], [[repulsively]], [[repulsiveness]] encompass the battlefield defeat of advancing assault forces, electrostatic repulsion of like charges, and visceral sensory or moral revulsion.

---

## 🔀 4. Prefix & Combining Dynamics on puls

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **com-** (*con-*) | together, completely, intensely | [[compulsion]], [[compulsive]], [[compulsory]], [[compulsoriness]] | *com-* + *pulsum* $\to$ driving together into an inescapable corner $\to$ irresistible psychological obsession or statutory legal obligation. |
| **ex-** | out of, away from | [[expulsion]], [[expulsive]] | *ex-* + *pulsum* $\to$ driving out beyond an established perimeter $\to$ permanent institutional banishment or muscular evacuation. |
| **in-** (assimilated to *im-*) | into, upon, within | [[impulse]], [[impulsive]], [[impulsively]], [[impulsiveness]], [[impulsion]] | *in-* + *pulsum* $\to$ striking into or from within $\to$ sudden spontaneous urge of the will, neural action potential, or physical momentum. |
| **pro-** | forward, forth, onward | [[propulsion]], [[propulsive]] | *pro-* + *pulsum* $\to$ driving forward through a medium $\to$ aerodynamic thrust, rocket acceleration, or peristaltic movement. |
| **re-** | back, away, in reverse | [[repulse]], [[repulsion]], [[repulsive]], [[repulsively]], [[repulsiveness]] | *re-* + *pulsum* $\to$ driving back an oncoming force $\to$ defeating an assault, physical force separating identical charges, or moral disgust. |
| **ad-** (assimilated to *ap-*) | to, toward, near | [[appulse]] | *ad-* + *pulsum* $\to$ driving toward or striking against $\to$ striking upon a shore, or the close apparent approach of two celestial bodies. |
| **dis-** | apart, asunder, in all directions | [[dispulsion]] | *dis-* + *pulsum* $\to$ driving apart into scattered fragments $\to$ formal or metaphorical dispersion of dogmas, doubts, or crowds. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ion** | Abstract noun of action or state | [[compulsion]], [[expulsion]], [[impulsion]], [[propulsion]], [[repulsion]], [[pulsation]], [[dispulsion]] | Encodes the completed act, institutional procedure, or physical force resulting from the root's strike. |
| **-ive** | Dispositional / operational adjective | [[compulsive]], [[expulsive]], [[impulsive]], [[propulsive]], [[repulsive]] | Designates an entity, behavior, or mechanism that exerts, tends toward, or is characterized by a driving strike. |
| **-ory** | Prescriptive / obligatory adjective | [[compulsory]] | Designates that which must be done under force of law, statutory mandate, or official authority. |
| **-ate** | Frequentative verbalizer | [[pulsate]] | Transforms the frequentative Latin stem *pulsāt-* into an active English verb denoting rhythmic throbbing or vibrating. |
| **-ile** | Qualitative / capacity adjective | [[pulsatile]] | Designates a physiological, medical, or musical quality characterized by regular, throbbing arterial beats or percussion. |
| **-ar** | Astronomical substantive noun | [[pulsar]] | Modern astronomical clipping (*pulsating star*) naming a magnetized rotating neutron star emitting periodic radiation. |
| **-or** | Agent / instrument noun | [[pulsator]] | Designates an apparatus, rotor, or mechanical valve that imparts alternating pulses or rhythmic suction to a system. |
| **-meter** | Measurement instrument | [[pulsometer]] | Designates a steam-driven pump or specialized medical gauge designed to move fluids or evaluate arterial pulse rates. |
| **-ance** | Physical / electrical noun of property | [[pulsance]] | Designates the angular frequency ($\omega = 2\pi f$) of an alternating current or periodic oscillatory wave. |
| **-less** | Privative adjective | [[pulseless]] | Designates the complete absence of a detectable arterial beat, indicating circulatory arrest or clinical death. |
| **-ly** | Adverb of manner | [[impulsively]], [[compulsively]], [[repulsively]] | Specifies that an action is executed under the influence of an irresistible urge, repetitive ritual, or offensive demeanor. |
| **-ness** | Abstract noun of quality or state | [[impulsiveness]], [[compulsiveness]], [[compulsoriness]], [[repulsiveness]] | Quantifies the behavioral trait, clinical severity, legal status, or aesthetic offensiveness of the root's quality. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Cardiovascular Medicine & Physiology** | [[pulse]], [[pulsate]], [[pulsation]], [[pulsatile]], [[pulseless]], [[pulsometer]] | Radial and carotid arterial pulse palpation, pulsatile perfusion in cardiopulmonary bypass, pulseless electrical activity (PEA) in advanced cardiac life support (ACLS), pulsatile tinnitus. |
| **Astrophysics & Radio Astronomy** | [[pulsar]], [[pulse]], [[pulsation]], [[appulse]] | Millisecond pulsars as celestial gravitational-wave detectors, clockwork radio frequency dispersion, optical pulsations of variable stars, orbital appulses between planets and background stars. |
| **Psychiatry, Clinical Psychology & Neuroscience** | [[impulse]], [[impulsive]], [[impulsively]], [[impulsiveness]], [[compulsion]], [[compulsive]], [[compulsively]], [[compulsiveness]] | Diagnostic criteria for Obsessive-Compulsive Disorder (OCD), frontostriatal dopamine dysfunction, impulsive-compulsive spectrum disorders, neural action potentials (nerve impulses). |
| **Aerospace & Marine Propulsion Engineering** | [[propulsion]], [[propulsive]], [[impulse]] | Specific impulse ($I_{sp}$) in rocket engines, hall-effect plasma propulsion, variable-geometry jet engine nozzles, propulsive efficiency of hydrojet marine drives. |
| **Constitutional Law, Governance & Education** | [[compulsory]], [[compulsoriness]], [[compulsion]], [[expulsion]], [[expulsive]], [[dispulsion]] | Compulsory education statutes, Fifth Amendment protections against compelled self-incrimination, parliamentary expulsion of corrupt legislators, judicial motions to compel. |
| **Physics, Wave Mechanics & Electrical Engineering** | [[pulse]], [[pulsance]], [[repulsion]], [[repulsive]], [[dispulsion]] | Ultrashort femtosecond laser pulses, angular frequency (pulsance) in AC circuit analysis, Coulombic electrostatic repulsion between like charges, acoustic wave dispersion. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compulsion]] | noun | **1.** An urge to do or say something that might be better left undone or unsaid.<br>**2.** An irrational motive for performing trivial or repetitive actions, even against your will. | *"Zounds, an I were at the strappado, or all the racks in the world, I would not tell you on compulsion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compulsive]] | noun | **1.** A person with a compulsive disposition; someone who feels compelled to do certain things.<br>**2.** Caused by or suggestive of psychological compulsion. | *"Proclaim no shame When the compulsive ardour gives the charge, Since frost itself as actively doth burn, And reason panders will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compulsively]] | adverb | **1.** In a compulsive manner. | *"In academic literature, compulsively designates in a compulsive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compulsiveness]] | noun | **1.** The trait of acting compulsively. | *"In academic literature, compulsiveness designates the trait of acting compulsively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compulsivity]] | noun | **1.** The trait of acting compulsively. | *"In academic literature, compulsivity designates the trait of acting compulsively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compulsorily]] | adverb | **1.** In a manner that cannot be evaded. | *"Payments compulsorily made by employers (by all, without exception) will ultimately be offset by a lower wage, and if transferred to the workmen will ultimately be offset by a higher wage."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[compulsory]] | adjective | **1.** Required by rule. | *"She had a goodly fortune in her own right, so that marriage had not been compulsory."* — Jack London, *The Jacket (The Star-Rover)* |
| [[expulsion]] | noun | **1.** The act of forcing out someone or something.<br>**2.** Squeezing out by applying pressure. | *"A merrier day did never yet greet Rome, No, not th’ expulsion of the Tarquins."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impulse]] | noun | **1.** An instinctive motive.<br>**2.** A sudden desire. | *"When she found them empty, she opened the door of the old fencing-hall by some strange impulse."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impulse-buy]] | verb | **1.** Buy on impulse without proper reflection. | *"In academic literature, impulse-buy designates buy on impulse without proper reflection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impulsion]] | noun | **1.** A force that moves something along.<br>**2.** The act of applying force suddenly. | *"It shows the possibilities derived from divine Mind, though it is said to be a gift whose endowment 88:30 is obtained from books or received from the impulsion of departed spirits."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[impulsive]] | adjective | **1.** Proceeding from natural feeling or impulse without external stimulus.<br>**2.** Without forethought. | *"Of the five children the eldest is the high-spirited, impulsive Bruno, who is just of an age to go away to a city school."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impulsively]] | adverb | **1.** In an impulsive or impetuous way; without taking cautions. | *"My Lady, changing her position, sees the papers on the table—looks at them nearer—looks at them nearer still—asks impulsively, “Who copied that?” Mr."* — Charles Dickens, *Bleak House* |
| [[impulsiveness]] | noun | **1.** The trait of acting suddenly on impulse without reflection. | *"As it was, she distrusted the elderly woman who showed an impulsiveness foreign to her years."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[propulsion]] | noun | **1.** A propelling force.<br>**2.** The act of propelling. | *"To the whale, his tail is the sole means of propulsion."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[propulsive]] | adjective | **1.** Having the power to propel.<br>**2.** Tending to or capable of propelling. | *"For example, to increase the air chamber would mean enlarging the whole torpedo, calling for more propulsive power and larger engines, and these larger engines would call for more air, thus defeating the object in view."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[pulsar]] | noun | **1.** A degenerate neutron star; small and extremely dense; rotates very fast and emits regular pulses of polarized radiation. | *"In academic literature, pulsar designates a degenerate neutron star; small and extremely dense; rotates very fast and emits regular pulses of polarized radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pulsate]] | verb | **1.** Expand and contract rhythmically; beat rhythmically.<br>**2.** Move with or as if with a regular alternating motion. | *"Dorlan's veins began to pulsate with indignation as he reflected on the fact that the ludicrous in the race was the only feature that had free access to the public gaze."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[pulsatilla]] | noun | **1.** Includes a group of plants that in some classifications are included in the genus anemone: pasqueflowers. | *"Consult index for agitated fear of aconite, melancholy of muriatic, priapic pulsatilla."* — James Joyce, *Ulysses* |
| [[pulsation]] | noun | **1.** (electronics) a sharp transient wave in the normal electrical state (or a series of such transients).<br>**2.** A periodically recurring phenomenon that alternately increases and decreases some quantity. | *"All the strong feelings which had been scattered over her existence since she knew what feeling was, seemed gathered together into one pulsation now."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pulse]] | noun | **1.** (electronics) a sharp transient wave in the normal electrical state (or a series of such transients).<br>**2.** The rhythmic contraction and expansion of the arteries with each beat of the heart. | *"God shield you mean it not! daughter and mother So strive upon your pulse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pulseless]] | adjective | **1.** Appearing dead; not breathing or having no perceptible pulse. | *"This is a fleshly woman,--let the free bestow their life blood, thou art pulseless now!’ . . ."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pulsing]] | noun | **1.** (electronics) a sharp transient wave in the normal electrical state (or a series of such transients).<br>**2.** Expand and contract rhythmically; beat rhythmically. | *"Boldwood?” she faltered, a guilty warmth pulsing in her face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[repulse]] | noun | **1.** An instance of driving away or warding off.<br>**2.** Force or drive back. | *"He received in the repulse of Tarquin seven hurts i’ th’ body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repulsion]] | noun | **1.** The force by which bodies repel one another.<br>**2.** Intense aversion. | *"A stagnant, sickening oil with some natural repulsion in it that makes them both shudder."* — Charles Dickens, *Bleak House* |
| [[repulsive]] | adjective | **1.** Offensive to the mind.<br>**2.** Possessing the ability to repel. | *"Mary was not so repulsive and unsisterly as Elizabeth, nor so inaccessible to all influence of hers; neither was there anything among the other component parts of the cottage inimical to comfort."* — Jane Austen, *Persuasion* |
| [[repulsively]] | adverb | **1.** In an offensive and hateful manner. | *"Anne could command herself enough to receive that look, and not repulsively."* — Jane Austen, *Persuasion* |
| [[repulsiveness]] | noun | **1.** The quality of being disgusting to the senses or emotions. | *"It is in no slight degree through the constant recognition of its truth, that he has been enabled to divest of repulsiveness even the most abstract speculations, and to impart a glow of human interest to all that he has touched."* — Classic Author, *John Stuart Mill; His Life and Works* |

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
    ROOT DASHBOARD · PULS
  </div>
</div>
