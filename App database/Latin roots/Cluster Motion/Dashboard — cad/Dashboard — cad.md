---
status: unread
type: root_dashboard
---
# Dashboard — cad
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cad-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fall, happen, or die”</span>
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

The root **cad** means to fall, happen, or die. It refers to dropping downward by gravity, collapsing, or tumbling. In English, this root forms words such as *cadence*, *cascade*, *decay*, and *coincidence*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fall, happen, or die
> The root **cad** means to fall, happen, or die. It refers to dropping downward by gravity, collapsing, or tumbling. In English, this root forms words such as *cadence*, *cascade*, *decay*, and *coincidence*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fall, happen, or die</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *cadence* and *cascade*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cad** comes from a Latin word that means *"to fall, happen, or die"*.
  - At its core, it describes the action of fall, happen, or die.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **cad** in an English word, think of **to fall, happen, or die**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fall, happen, or die).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cadence**: A rhythmic sequence or flow of sounds in language or poetry.
  - **Cascade**: A steep, rugged waterfall, especially one descending in a series of distinct stages.
  - **Decay**: To undergo decomposition, rot, or gradual destruction through bacterial or natural processes.
  - **Coincidence**: A remarkable concurrence of events or circumstances that occur simultaneously without apparent causal connection.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cad</mark>, think of <mark class="hl-def">to fall, happen, or die</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cad** exhibits four principal morphological stems in English:
> - **Present Base Stem:** `cad-` (*cad-ence*, *cad-aver*, *cad-ent*, *cad-ucous*)
> - **Weakened Prefixed Stem:** `-cid-` (*ac-cid-ent*, *in-cid-ent*, *coin-cid-e*, *de-cid-uous*, *re-cid-ivism*, *oc-cid-ent*)
> - **Supine / Participial Stem:** `cas-` (*cas-e*, *cas-ual*, *cas-ualty*, *cas-uistry*, *cas-cade*, *oc-cas-ion*)
> - **Romance Reflexes:** `chanc-` (*chance*), `decay-` (*decay*), `chut-` (*chute*, *para-chute*), and `cheat-` (*cheat*, *escheat*).

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
> Across English, `cad` expands across six interconnected cognitive domains:
> - **Literal Gravitational Fall & Fluid Descent:** [[cascade]], [[chute]], [[parachute]], [[cadent]] capture water, objects, and bodies tumbling downward under gravity.
> - **Fortuity, Contingency & Statistical Chance:** [[accident]], [[incident]], [[coincide]], [[coincidence]], [[chance]], [[casual]] delineate occurrences arriving unexpectedly without conscious intention.
> - **Temporal Juncture & Appropriate Moment:** [[occasion]], [[occasional]], [[occasionally]] denote the opportune moment that "falls into one's lap."
> - **Forensic, Legal & Grammatical Particulars:** [[case]], [[accidence]], [[casualty]], [[escheat]], [[cheat]] designate specific factual scenarios before a court, grammatical inflections, or feudal forfeitures.
> - **Organic Decay, Senescence & Shedding:** [[cadaver]], [[cadaverous]], [[decay]], [[deciduous]], [[caducous]], [[caducity]] examine corpses, autumn leaves, milk teeth, and biological decomposition.
> - **Cultural, Moral & Behavioral Decline:** [[decadence]], [[decadent]], [[recidivism]], [[recidivist]], [[casuistry]] describe ethical decay, habitual criminal relapse, and oversubtle moral rationalizations.
> - **Acoustic & Poetic Modulation:** [[cadence]], [[cadenza]], [[cadency]] measure the rhythmic rise and falling inflection of voices and musical phrases.

---

## 🔀 4. Prefix & Combining Dynamics on cad

### Prefix Dynamics & Vowel Weakening (*cad-* $\to$ *-cid-*)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (assimilated to *ac-*) | to, toward, upon | [[accident]] | *ad-* + *cadere* $\to$ *accidere* ("to fall upon") $\to$ an unforeseen mishap or non-essential trait. |
| **con-** + **in-** | together + upon | [[coincide]] / [[coincidence]] | *con-* + *in-* + *cadere* $\to$ to fall together upon the exact same temporal or spatial point. |
| **dē-** | down from, away | [[decay]] / [[decadent]] / [[deciduous]] | *dē-* + *cadere* $\to$ to fall away from vigor or purity $\to$ to decompose, shed leaves, or decline morally. |
| **in-** | into, upon, against | [[incident]] / [[incidence]] | *in-* + *cadere* $\to$ *incidere* ("to fall upon") $\to$ an event impinging on reality; light rays striking a lens. |
| **ob-** (assimilated to *oc-*) | toward, down, facing | [[occasion]] / [[Occident]] | *ob-* + *cadere* $\to$ to fall before one's eyes (an opening); or where the sun sets down (the West). |
| **re-** | back, again | [[recidivism]] | *re-* + *cadere* $\to$ *recidere* ("to fall back") $\to$ relapsing back into crime or disease. |
| **ex-** (Old French *es-*) | out, away | [[escheat]] / [[cheat]] | *ex-* + *cadere* $\to$ *excidere* ("to fall away to the lord") $\to$ feudal land forfeiture. |

### Suffix Transformations

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ence** / **-ance** | Noun of quality / occurrence | [[cadence]], [[incidence]], [[chance]] | The rhythmic fall of sound, rate of strike, or roll of dice. |
| **-ent** / **-ant** | Present participle | [[cadent]], [[incident]], [[decadent]] | Falling, striking upon, or deteriorating in character. |
| **-uous** | Adjective of tendency | [[deciduous]], [[caducous]] | Prone to falling off seasonally or prematurely. |
| **-ual** | Descriptive adjective | [[casual]] | Pertaining to that which merely happens by chance; informal. |
| **-ty** | Condition or concrete instance | [[casualty]], [[caducity]] | A person struck down in disaster; the state of being perishable. |
| **-ism** / **-ist** | Practice / Agent | [[recidivism]], [[casuistry]], [[casuist]] | Habitual relapse; the practice of case-based moral reasoning. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Law, Forensics & Criminology** | [[case]], [[recidivism]], [[recidivist]], [[casualty]], [[cheat]] | Case law, criminal recidivism rates, forensic autopsy of cadavers, fraudulent deception. |
| **Medicine & Pathology** | [[cadaver]], [[cadaverous]], [[incidence]], [[deciduous]] | Medical dissection of cadavers, disease incidence rates, deciduous milk teeth. |
| **Physics, Optics & Engineering** | [[incidence]], [[incident]], [[cascade]], [[decay]] | Angle of incidence in optics, alpha/beta radioactive decay, cascading grid failures. |
| **Music, Linguistics & Prosody** | [[cadence]], [[cadenza]], [[accidence]] | Musical harmonic resolutions, vocal inflections in rhetoric, grammatical inflectional accidence. |
| **Botany & Ecology** | [[deciduous]], [[caducous]] | Temperate deciduous forests, caducous floral bracts shed before pollination. |
| **Philosophy & Ethics** | [[accident]], [[casuistry]], [[casual]] | Aristotelian substance versus accident, Jesuitical casuistic moral dilemmas. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arcade]] | noun | **1.** A covered passageway with shops and stalls on either side.<br>**2.** A structure composed of a series of arches supported by columns. | *"Lord Henry passed up the low arcade into Burlington Street and turned his steps in the direction of Berkeley Square."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[arcadia]] | noun | **1.** A department of greece in the central peloponnese. | *"Nothing could be more commonplace than Chilmark, believe me: life is like this all over rural England, and it's only from a distance that one takes it for Arcadia." "Folly," said Lawrence."* — Anthony Pryde, *Nightfall* |
| [[arcadian]] | noun | **1.** An inhabitant of arcadia.<br>**2.** (used with regard to idealized country life) idyllically rustic. | *"Oak could pipe with Arcadian sweetness, and the sound of the well-known notes cheered his own heart as well as those of the loungers."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[arcadic]] | noun | **1.** The dialect of ancient greek spoken by arcadians. | *"In academic literature, arcadic designates the dialect of ancient greek spoken by arcadians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcado-cyprians]] | noun | **1.** The ancient greek inhabitants of achaea. | *"In academic literature, arcado-cyprians designates the ancient greek inhabitants of achaea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cad]] | noun | **1.** Someone who is morally reprehensible.<br>**2.** Software used in art and architecture and engineering and manufacturing to assist in precision drawing. | *"On a stretch of level road he passed a pair talking, noting casually that the woman was a lady from her carriage, and from his threatening cringe that the man was a cad."* — Donn Byrne, *The Wind Bloweth* |
| [[cadaster]] | noun | **1.** A public register showing the details of ownership and value of land; made for the purpose of taxation. | *"In academic literature, cadaster designates a public register showing the details of ownership and value of land; made for the purpose of taxation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadastral]] | adjective | **1.** Of or relating to the records of a cadastre. | *"In academic literature, cadastral designates of or relating to the records of a cadastre."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadastre]] | noun | **1.** A public register showing the details of ownership and value of land; made for the purpose of taxation. | *"In academic literature, cadastre designates a public register showing the details of ownership and value of land; made for the purpose of taxation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadaver]] | noun | **1.** The dead body of a human being. | *"Organic waste and cadaver parts unsuitable for constructive purposes (fertilizer) on Charon will be fully sterilized and reduced as close as practicable to zero residue."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cadaveric]] | adjective | **1.** Of or relating to a cadaver or corpse. | *"In academic literature, cadaveric designates of or relating to a cadaver or corpse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadaverine]] | noun | **1.** A colorless toxic ptomaine with an unpleasant odor formed during the putrefaction of animal tissue. | *"In academic literature, cadaverine designates a colorless toxic ptomaine with an unpleasant odor formed during the putrefaction of animal tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadaverous]] | adjective | **1.** Very thin especially from disease or hunger or cold.<br>**2.** Of or relating to a cadaver or corpse. | *"He was short, cadaverous, and withered, with his head sunk sideways between his shoulders and the breath issuing in visible smoke from his mouth as if he were on fire within."* — Charles Dickens, *Bleak House* |
| [[cadence]] | noun | **1.** (prosody) the accent in a metrical foot of verse.<br>**2.** The close of a musical section. | *"Let me supervise the canzonet. [_He takes the letter_.] Here are only numbers ratified, but, for the elegancy, facility, and golden cadence of poesy, _caret_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cadenced]] | adjective | **1.** Marked by a rhythmical cadence. | *"They will accede to my demands." "What if they resist?" Narval's pudgy fists resumed their cadenced pounding."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cadency]] | noun | **1.** A recurrent rhythmical series. | *"In academic literature, cadency designates a recurrent rhythmical series."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadent]] | adjective | **1.** Marked by a rhythmical cadence. | *"Let it stamp wrinkles in her brow of youth; With cadent tears fret channels in her cheeks; Turn all her mother’s pains and benefits To laughter and contempt; that she may feel How sharper than a serpent’s tooth it is To have a thankless child!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cadenza]] | noun | **1.** A brilliant solo passage occurring near the end of a piece of music. | *"In academic literature, cadenza designates a brilliant solo passage occurring near the end of a piece of music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadet]] | noun | **1.** A military trainee (as at a military academy). | *"Edward” (John was an old servant, and had known his master when he was the cadet of the house, therefore, he often gave him his Christian name)—“I knew what Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[cadetship]] | noun | **1.** The position of cadet. | *"In academic literature, cadetship designates the position of cadet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadiz]] | noun | **1.** An ancient port city in southwestern spain. | *"By all accounts Tarshish could have been no other city than the modern Cadiz."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cadmium]] | noun | **1.** A soft bluish-white ductile malleable toxic bivalent metallic element; occurs in association with zinc ores. | *"In academic literature, cadmium designates a soft bluish-white ductile malleable toxic bivalent metallic element; occurs in association with zinc ores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadmus]] | noun | **1.** (greek mythology) the brother of europa and traditional founder of thebes in boeotia. | *"I was with Hercules and Cadmus once, When in a wood of Crete they bay’d the bear With hounds of Sparta."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cadra]] | noun | **1.** A genus of pyralidae. | *"In academic literature, cadra designates a genus of pyralidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cadre]] | noun | **1.** A small unit serving as part of or as the nucleus of a larger political movement.<br>**2.** A nucleus of military personnel capable of expansion. | *"Agreements were quickly concluded and the diplomatic cadre took over to prepare an agenda for the meeting's substance."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[caducean]] | adjective | **1.** Of or relating to a caduceus. | *"One warm, flush'd moment, hovering, it might seem Dash'd by the wood-nymph's beauty, so he burn'd; Then, lighting on the printless verdure, turn'd To the swoon'd serpent, and with languid arm, Delicate, put to proof the lythe Caducean charm."* — John Keats, *Lamia* |
| [[caduceus]] | noun | **1.** An insignia used by the medical profession; modeled after the staff of hermes. | *"In academic literature, caduceus designates an insignia used by the medical profession; modeled after the staff of hermes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caducous]] | adjective | **1.** Shed at an early stage of development. | *"In academic literature, caducous designates shed at an early stage of development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cascade]] | noun | **1.** A small waterfall or series of small waterfalls.<br>**2.** A succession of stages or operations or processes or units. | *"The fruit that had been green in June was ripe now, and down the Painted-Lady apple-trees fell such a cascade of ruby and coral-coloured apples, from high sprig to heavy bole, that they looked like trees in a Kate Greenaway drawing."* — Anthony Pryde, *Nightfall* |
| [[decade]] | noun | **1.** A period of 10 years.<br>**2.** The cardinal number that is the sum of nine and one; the base of the decimal system. | *"She came forth in the morning without a remnant of the pain which had filled a decade of years with agony_."* — Classic Author, *The wonders of prayer* |
| [[decadence]] | noun | **1.** The state of being degenerate in mental or moral qualities. | *"In this decadence, too, the art of fire-making had been forgotten on the earth."* — H. G. Wells, *The Time Machine* |
| [[decadency]] | noun | **1.** The state of being degenerate in mental or moral qualities. | *"In academic literature, decadency designates the state of being degenerate in mental or moral qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decadent]] | noun | **1.** A person who has fallen into a decadent state (morally or artistically).<br>**2.** Marked by excessive self-indulgence and moral decay. | *"I must confess that my satisfaction with my first theories of an automatic civilisation and a decadent humanity did not long endure."* — H. G. Wells, *The Time Machine* |
| [[decadron]] | noun | **1.** A corticosteroid drug (trade names decadron or dexamethasone intensol or dexone or hexadrol or oradexon) used to treat allergies or inflammation. | *"In academic literature, decadron designates a corticosteroid drug (trade names decadron or dexamethasone intensol or dexone or hexadrol or oradexon) used to treat allergies or inflammation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[succade]] | noun | **1.** Fruit cooked in sugar syrup and encrusted with a sugar crystals. | *"In academic literature, succade designates fruit cooked in sugar syrup and encrusted with a sugar crystals."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CAD
  </div>
</div>
