---
status: unread
type: root_dashboard
---
# Dashboard — celer
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">celer-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“swift”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **celer** means swift. It describes moving with great speed, quickness, or prompt haste. In English, this root forms words such as *celerity*, *celeritous*, *accelerate*, and *accelerated*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: swift
> The root **celer** means swift. It describes moving with great speed, quickness, or prompt haste. In English, this root forms words such as *celerity*, *celeritous*, *accelerate*, and *accelerated*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Swift</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *celerity* and *celeritous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **celer** comes from a Latin word that means *"swift"*.
  - At its core, it describes the quality or state of being swift.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **celer** in an English word, think of **speed, haste, and rapid movement**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are swift.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Celerity**: Swiftness of movement or action.
  - **Celeritous**: Swift, speedy, or marked by rapid dispatch.
  - **Accelerate**: To increase the speed, velocity, or rate of motion of a physical body or vehicle.
  - **Accelerated**: Moving, occurring, or progressing at an increased speed or faster rate than normal.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">celer</mark>, think of <mark class="hl-def">speed, haste, and rapid movement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **celer** operates through three primary morphological bases:
> - **Primary Adjectival Stem `celer-` (Latin *celer, celeris, celere*):**
>   - Direct adjectival preservation in classical antiquity: Latin *Celerēs* $\to$ English [[Celeres]].
>   - Abstract noun of quality formed with Latin suffix *-itās*: Latin *celeritās* $\to$ Old French *célérité* $\to$ English [[celerity]].
>   - Adjectival derivation with English *-ous* (Latin *-ōsus*): *celerity* + *-ous* $\to$ English [[celeritous]].
> - **Causative / Intensified Verbal Stem `accelerat-` (Latin *accelerāre, accelerātus* < *ad-* + *celerāre*):**
>   - Primary verb: Latin *accelerāre* $\to$ English [[accelerate]].
>   - Past participle & participial adjective: Latin *accelerātus* $\to$ English [[accelerated]].
>   - Present participle & verbal adjective: Latin *accelerāns, accelerantis* $\to$ English [[accelerating]].
>   - Noun of action, process & vector quantity: Latin *accelerātiō, accelerātiōnis* $\to$ English [[acceleration]].
>   - Adjectives of tendency & functional disposition: *accelerāt-* + *-īvus* / *-ōrius* $\to$ English [[accelerative]], [[acceleratory]].
>   - Agent & mechanical instrument noun: Latin *accelerātor* $\to$ English [[accelerator]].
>   - Greco-Latin technological hybrid: *accelerāre* + Greek *métron* (μέτρον) $\to$ English [[accelerometer]].
>   - Italian gerundive doublet: Italian *accelerando* (< Latin *accelerandum*) $\to$ English musical directive [[accelerando]].
> - **Reversive / Privative Verbal Stem `decelerat-` (19th-Century Back-Formation < *dē-* + *accelerate*):**
>   - Formed modern technical verb: English [[decelerate]].
>   - Past participle & participial adjective: English [[decelerated]].
>   - Present participle & verbal adjective: English [[decelerating]].
>   - Noun of negative acceleration / deceleration: English [[deceleration]].
>   - Adjective of braking tendency: English [[decelerative]].
>   - Braking agent / slowing apparatus: English [[decelerator]].
>   - Instrumentation for measuring braking force: English [[decelerometer]].
>
> The morphological architecture of **celer** is structurally unique: it is **prefix-sparse but conceptually polar**. In classical Latin, it accepted only the directional-intensifying prefix *ad-* (assimilating to *ac-* before *c*). In nineteenth-century industrial physics, engineers supplied its missing counterpart by prefixing *dē-* ("down from, away from, reversing"), creating an impeccably balanced scalar polarity of acceleration versus deceleration.

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
> Although unified by the foundational concept of **"swiftness and rate of change"**, the derivatives of `celer` diverge into specialized operational planes across the arts and sciences:
> - **Classical Mechanics & Vector Kinematics:** In [[acceleration]], [[accelerate]], [[deceleration]], and [[decelerate]], the root serves as a rigorously quantified physical vector ($a = \frac{dv}{dt}$) defining the change in an object's velocity over time, whether speeding up, slowing down, or curving along an orbital trajectory.
> - **High-Energy Particle Physics & Relativistic Collisions:** In [[accelerator]] and [[decelerator]], the root names colossal laboratory installations (such as the Large Hadron Collider and Antiproton Decelerator at CERN) that propel subatomic particles to near-light speed or slow antiparticles down for precision quantum spectroscopy.
> - **Automotive, Aerospace & Inertial Engineering:** In [[accelerator]], [[accelerometer]], [[decelerator]], and [[decelerometer]], the root designates mechanical vehicle throttles, high-precision MEMS sensors, braking mechanisms, and g-force testing apparatus critical for airbag deployment, rocketry, and guidance systems.
> - **Formal Rhetoric, Literature & Historical Administration:** In [[celerity]] and [[celeritous]], the root retains its classical Latin elegance, designating promptness of action, swiftness of execution, and the rapid dispatch of public affairs without colloquial harshness.
> - **Temporal, Socioeconomic & Pathological Progression:** In [[accelerated]], [[accelerating]], [[accelerative]], [[acceleratory]], [[decelerated]], [[decelerating]], and [[decelerative]], the root describes escalating or slowing processes—accelerated depreciation in tax accounting, accelerating inflation, accelerated medical pathology (such as malignant hypertension), and acceleratory cardiac nerve responses.
> - **Musicology & Expressive Performance:** In [[accelerando]], the root enters the concert hall via Italian notation to indicate a gradual, thrilling quickening of musical tempo.
> - **Roman Antiquity & Military History:** In [[Celeres]], the root memorializes the mounted personal guard of Romulus, the cradle of Rome's equestrian aristocracy.

---

## 🔀 4. Prefix & Combining Dynamics on celer

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (assimilated to `ac-`) | to, toward; intensification | [[accelerate]], [[acceleration]], [[accelerator]], [[accelerometer]], [[accelerando]] | Movement *toward* greater swiftness; to increase the rate of motion, velocity, or process progression. |
| `dē-` | down, away from; reversing | [[decelerate]], [[deceleration]], [[decelerator]], [[decelerometer]], [[decelerative]] | Movement *down* from swiftness; reversing speed; the reduction of velocity per unit time (modern industrial coinage). |
| *(unprefixed base)* | — | [[celerity]], [[celeritous]], [[Celeres]] | Direct manifestation of swiftness, rapid dispatch, or the swift historical horsemen of early Rome. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ity` (Latin *-itās*) | Abstract Noun (Quality / State) | [[celerity]] | The condition or quality of being swift, rapid, or prompt. |
| `-ous` (Latin *-ōsus*) | Adjective (Full of / Marked by) | [[celeritous]] | Characterized by great speed, celerity, or swift action. |
| `-ate` (Latin *-āre / -ātus*) | Causative Verb | [[accelerate]], [[decelerate]] | To cause to move faster or slower; to undergo a change in velocity. |
| `-ed` (participial suffix) | Adjective / Past Participle | [[accelerated]], [[decelerated]] | Having undergone an increase or decrease in velocity or developmental rate. |
| `-ing` (participial suffix) | Adjective / Present Participle | [[accelerating]], [[decelerating]] | Currently undergoing positive or negative acceleration; quickening or slowing. |
| `-ation` (Latin *-ātiō*) | Noun (Process / Vector Quantity) | [[acceleration]], [[deceleration]] | The act, process, or mathematical measure of rate of change in velocity. |
| `-ive` (Latin *-īvus*) | Adjective (Tending to / Disposition) | [[accelerative]], [[decelerative]] | Pertaining to, tending toward, or producing an increase or decrease in velocity. |
| `-ory` (Latin *-ōrius*) | Adjective (Functional / Serving as) | [[acceleratory]] | Functioning to accelerate (e.g., *acceleratory cardiac nerves*). |
| `-or` (Latin *-tor*) | Agent / Instrument Noun | [[accelerator]], [[decelerator]] | A device, throttle pedal, machine, or chemical agent that alters velocity or reaction rate. |
| `-ometer` (Greek *métron*) | Noun (Measurement Instrument) | [[accelerometer]], [[decelerometer]] | A precision technological instrument calibrated to measure acceleration or braking deceleration. |
| `-ando` (Italian < Latin *-andum*) | Adverb / Adjective (Musical Direction) | [[accelerando]] | Musical performance instruction directing a gradual, progressive increase in tempo. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Classical & Modern Physics** | [[acceleration]], [[accelerator]], [[decelerator]], [[accelerative]] | Formulation of Newton's second law of motion ($F = ma$); Einstein's equivalence principle between gravitational mass and inertial acceleration; subatomic particle propulsion in synchrotron beamlines and colliders (CERN's Large Hadron Collider and Antiproton Decelerator). |
| ⚙️ **Automotive & Aerospace Engineering** | [[accelerator]], [[accelerometer]], [[decelerometer]], [[deceleration]] | Internal combustion and EV throttle controls; micro-electromechanical (MEMS) triaxial accelerometers for vehicle airbag deployment and flight stability; deceleration parachutes and thrust reversers; testing vehicle brake fade and stopping distances. |
| 🎵 **Musicology & Performance Arts** | [[accelerando]] | Expressive tempo markings in orchestral and solo scores, directing ensembles to gradually quicken pulse and build dramatic tension toward an impending musical climax or cadenza. |
| 🏛️ **Military History & Roman Antiquity** | [[Celeres]], [[celerity]] | The legendary 300 mounted royal bodyguards of King Romulus (*Celeres*); Julius Caesar's operational doctrine of strategic marching speed (*celeritās Caesariana*) during the Gallic and civil wars. |
| 💼 **Finance, Law & Supply Chain** | [[acceleration]], [[accelerated]], [[decelerating]] | Acceleration clauses in commercial credit agreements making debt balances payable upon default; accelerated depreciation schedules (MACRS) in corporate tax accounting; supply chain velocity and lead-time compression. |
| 🩺 **Clinical Medicine & Pathology** | [[accelerated]], [[acceleratory]], [[deceleration]] | Cardiotocographic monitoring of fetal heart-rate decelerations during labor contractions; accelerated-phase chronic myelogenous leukemia (CML); acceleratory sympathetic cardiac responses. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accelerando]] | noun | **1.** A gradually increasing tempo of music.<br>**2.** Gradually increasing in tempo. | *"In academic literature, accelerando designates a gradually increasing tempo of music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerate]] | verb | **1.** Move faster.<br>**2.** Cause to move faster. | *"Moreover, the ship’s forge was ordered to be hoisted out of its temporary idleness in the hold; and, to accelerate the affair, the blacksmith was commanded to proceed at once to the forging of whatever iron contrivances might be needed."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[accelerated]] | verb | **1.** Move faster.<br>**2.** Cause to move faster. | *"In due time a small stream began to trickle through the seventy feet of aerial space between its mouth and the ground, which the water-drops smote like duckshot in their accelerated velocity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[acceleration]] | noun | **1.** An increase in rate of change.<br>**2.** The act of accelerating; increasing the speed. | *"Signaling Hodak for minimal repulse and acceleration to increase the drift, Brad ordered all hands immediately into accelo-nets."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[accelerative]] | adjective | **1.** Tending to increase velocity. | *"In academic literature, accelerative designates tending to increase velocity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerator]] | noun | **1.** A pedal that controls the throttle valve.<br>**2.** A valve that regulates the supply of fuel to the engine. | *"In academic literature, accelerator designates a pedal that controls the throttle valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceleratory]] | adjective | **1.** Tending to increase velocity. | *"In academic literature, acceleratory designates tending to increase velocity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerometer]] | noun | **1.** An instrument for measuring the acceleration of aircraft or rockets. | *"In academic literature, accelerometer designates an instrument for measuring the acceleration of aircraft or rockets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celeriac]] | noun | **1.** Grown for its thickened edible aromatic root.<br>**2.** Thickened edible aromatic root of a variety of celery plant. | *"In academic literature, celeriac designates grown for its thickened edible aromatic root."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celerity]] | noun | **1.** A rate that is rapid. | *"I do think there is mettle in death which commits some loving act upon her, she hath such a celerity in dying."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celery]] | noun | **1.** Widely cultivated herb with aromatic leaf stalks that are eaten raw or cooked.<br>**2.** Stalks eaten raw or cooked or used as seasoning. | *"Nothing has tasted quite so good to me in a year,” said she when the steak had vanished, dipping a white celery-heart in salt and biting the end off with teeth still whiter."* — Grace S. Richmond, *Red Pepper Burns* |
| [[decelerate]] | verb | **1.** Lose velocity; move more slowly.<br>**2.** Reduce the speed of. | *"In academic literature, decelerate designates lose velocity; move more slowly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deceleration]] | noun | **1.** A decrease in rate of change.<br>**2.** (physics) a rate of decrease in velocity. | *"Plenty of time to kick-in vector and deceleration programs." Brad paused, shifted position, rubbed his jaws, sighed deeply, glanced sideways at Xindral and, his voice tighter, continued."* — Meyer Moldeven, *The Universe — or Nothing* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CELER
  </div>
</div>
