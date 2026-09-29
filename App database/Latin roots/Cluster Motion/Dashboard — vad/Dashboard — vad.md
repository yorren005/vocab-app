---
status: unread
type: root_dashboard
---
# Dashboard — vad
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vad-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to go”</span>
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

The root **vad** means to go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *invade*, *evade*, and *pervade*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to go
> The root **vad** means to go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *invade*, *evade*, and *pervade*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To go</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *invade* and *evade*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vad** comes from a Latin word that means *"to go"*.
  - At its core, it describes the action of go.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **vad** in an English word, think of **to go**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to go).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Invade**: To enter a country, territory, or domain with armed forces in order to conquer, occupy, or plunder.
  - **Evade**: To escape, slip away from, or elude through physical agility, speed, or stratagem.
  - **Pervade**: To spread through, pass through, and be perceptible in every part of.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vad</mark>, think of <mark class="hl-def">to go</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vad** operates through three morphological stems in English:
> - **Primary Latin Present Base Stem (`vad-`):** From *vādō, vādere* ("to go, stride"):
>   - Forms verbs via directional prefixes: *in-* + *vādere* $\to$ [[invade]]; *ē-* + *vādere* $\to$ [[evade]]; *per-* + *vādere* $\to$ [[pervade]].
>   - Retained in fossilized Latin idioms: the imperative in [[vade-mecum]] ("go with me") and the interrogative present in [[quovadis]] ("whither goest thou?").
>   - Retained in the Latin adjective *vadōsus* ("shallow, pertaining to fords") $\to$ [[vadose]], [[vadose zone]], [[vadose water]].
> - **Latin Supine / Participial Stem (`vas-`):** From the supine *vāsum* and past participle *vāsus*:
>   - Latin compound nouns of action took the suffix *-iō, -iōnis*: *invāsiō* $\to$ [[invasion]], *ēvāsiō* $\to$ [[evasion]], *pervāsiō* $\to$ [[pervasion]].
>   - Latin descriptive adjectives took *-īvus*: *invāsīvus* $\to$ [[invasive]], *ēvāsīvus* $\to$ [[evasive]], *pervāsīvus* $\to$ [[pervasive]].
>   - These supine stems form secondary English adverbs and abstract nouns via Anglo-Saxon suffixes: [[invasively]], [[invasiveness]], [[noninvasive]], [[noninvasively]], [[evasively]], [[evasiveness]], [[pervasively]], [[pervasiveness]].
> - **Cognate Germanic Stem (`wad-`):** From Proto-Indo-European *\*weh₂dʰ-* via Proto-Germanic *\*wadaną*:
>   - Preserved natively in English through continuous Germanic inheritance: [[wade]], with its agentive noun [[wader]] and participial adjective/gerund [[wading]].

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
> Although the root fundamentally denotes **"to stride, advance, go"**, its semantic vectors branch dramatically across distinctive operational planes:
> - **Hostile Incursion & Sovereignty Violation:** [[invade]], [[invader]], [[invading]], [[invasion]] portray armed cross-border assaults, territorial conquests, or unauthorized trespass into physical and digital property.
> - **Oncology, Pathology & Surgical Intervention:** [[invasive]], [[invasively]], [[invasiveness]], [[noninvasive]], [[noninvasively]] classify the destructive infiltration of cancer cells through basement membranes into adjacent tissue, contrasting with benign lesions and non-cutting diagnostic imaging modalities (MRI, ultrasound).
> - **Flight, Circumvention & Rhetorical Elusiveness:** [[evade]], [[evader]], [[evading]], [[evasion]], [[evasive]], [[evasively]], [[evasiveness]], [[evadable]] depict physical flight from pursuit, deceptive circumvention of legal and fiscal obligations (e.g., tax evasion, draft evaders), and prevaricating ambiguity in political discourse.
> - **Atmospheric Permeation, Diffusion & Cultural Ubiquity:** [[pervade]], [[pervasion]], [[pervasive]], [[pervasively]], [[pervasiveness]] capture scents, atmospheric moods, philosophical ideologies, and pervasive computing technologies that disperse effortlessly throughout an entire space or society.
> - **Hydrogeology, Speleology & Soil Mechanics:** [[vadose]], [[vadose zone]], [[vadose water]] track gravitational water movement through unsaturated subsoil layers above the phreatic groundwater table, governing karst cave formation and aquifer recharge.
> - **Aquatic Locomotion & Heavy Fording:** [[wade]], [[wader]], [[wading]] describe deliberate, laborious striding through water, mud, snow, or dense physical obstacles.
> - **Literary, Ethical & Theological Waypoints:** [[vade-mecum]], [[quovadis]] provide portable guides for intellectual travelers and monumental questions of conscience and direction.

---

## 🔀 4. Prefix & Combining Dynamics on vad

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **in-** | into, upon, against | [[invade]], [[invasion]], [[invasive]] | *in-* + *vādere* $\to$ *invādere* ("to stride into") $\to$ hostile military assault, territorial breach, pathogen infection, or cancerous tissue infiltration. |
| **ē-** / **ex-** | out of, away from | [[evade]], [[evasion]], [[evasive]] | *ē-* + *vādere* $\to$ *ēvādere* ("to stride out of") $\to$ to escape confinement, dodge an attack, circumvent taxation, or answer questions deceptively. |
| **per-** | through, thoroughly, throughout | [[pervade]], [[pervasion]], [[pervasive]] | *per-* + *vādere* $\to$ *pervādere* ("to stride through") $\to$ to diffuse through every crevice, saturate an atmosphere, or become ubiquitous. |
| **non-** + **in-** | not + into | [[noninvasive]], [[noninvasively]] | Modern medical negation of *invasive* $\to$ diagnostic procedures (ultrasound, MRI) that do not penetrate the skin or body cavities. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-e** | Verb formative | [[invade]], [[evade]], [[pervade]], [[wade]] | Denotes the active kinetic movement: to enter aggressively, escape adroitly, spread through, or ford water. |
| **-er** | Agent noun | [[invader]], [[evader]], [[wader]] | The person, army, biological organism, or bird that performs the act of entering, dodging, or wading. |
| **-ing** | Present participle / Gerund | [[invading]], [[evading]], [[wading]] | Continuous action or participial description (e.g., *invading armies*, *evading detection*, *wading pool*). |
| **-ion** (*-siō*) | Noun of action / state | [[invasion]], [[evasion]], [[pervasion]] | The act, instance, or historical occurrence of incursion, avoidance, or diffusion. |
| **-ive** (*-sīvus*) | Adjective of tendency / capability | [[invasive]], [[evasive]], [[pervasive]] | Characterized by a propensity to infiltrate, dodge, or diffuse everywhere. |
| **-ively** | Adverb of manner | [[invasively]], [[evasively]], [[pervasively]], [[noninvasively]] | In an infiltrating, dodging, all-permeating, or non-penetrating manner. |
| **-iveness** | Abstract noun of quality | [[invasiveness]], [[evasiveness]], [[pervasiveness]] | The intrinsic degree or quality of aggressiveness, ambiguity, or omnipresence. |
| **-able** | Adjective of capacity | [[evadable]] | Capable of being avoided, circumvented, or eluded. |
| **-ose** (*-ōsus*) | Adjective of fullness / nature | [[vadose]] | Pertaining to shallows (*vadum*); geological zone characterized by unsaturated percolation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚔️ **Military Strategy & Geopolitics** | [[invade]], [[invasion]], [[invader]] | Amphibious landings (Normandy D-Day), sovereignty violations under international law (UN Charter Art. 2[4]), defensive deterrent doctrines against foreign invaders. |
| ⚖️ **Constitutional & Criminal Law** | [[invasion]], [[evasion]], [[evasive]], [[evader]] | Criminal tax evasion (IRC § 7201 vs. legal tax avoidance), draft evaders, Fourth Amendment protections against unlawful government "invasion of privacy" and unreasonable search and seizure. |
| 🩺 **Oncology & Clinical Surgery** | [[invasive]], [[noninvasive]], [[noninvasively]], [[invasiveness]] | Histological grading of tumor malignancy (invasive ductal carcinoma breaking the basal lamina), minimally invasive laparoscopic surgery, noninvasive blood pressure and MRI diagnostics. |
| 🌍 **Hydrology, Speleology & Geology** | [[vadose]], [[vadose zone]], [[vadose water]] | Hydrogeology of the unsaturated zone (vadose zone) between the ground surface and water table; gravitationally percolating vadose water dissolving limestone to carve out subterranean karst caves. |
| 🌿 **Ecology & Conservation Biology** | [[invasive]], [[invader]] | Exotic invasive species (kudzu, zebra mussels, cane toads) displacing indigenous flora and fauna; ecological invasion biology tracking biome disruption. |
| 📖 **Literature, Philosophy & Religion** | [[vade-mecum]], [[quovadis]] | Classical vade-mecum pocket companions and handbooks; Christian legendary confrontation *Domine, Quo Vadis?* on the Via Appia framing moral reckoning and purpose. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[evade]] | verb | **1.** Avoid or try to avoid fulfilling, answering, or performing (duties, questions, or issues).<br>**2.** Escape, either physically or mentally. | *"If he evade us there, Enforce him with his envy to the people, And that the spoil got on the Antiates Was ne’er distributed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invade]] | verb | **1.** March aggressively into another's territory by military force for the purposes of conquest and occupation.<br>**2.** To intrude upon, infringe, encroach on, violate. | *"We must not only arm to invade the French, But lay down our proportions to defend Against the Scot, who will make road upon us With all advantages."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invader]] | noun | **1.** Someone who enters by force in order to conquer. | *"We have seen the invader enter our doors; we have been obliged to spread our table for him, and give him of our best."* — Mrs. Oliphant, *A Beleaguered City* |
| [[invading]] | verb | **1.** March aggressively into another's territory by military force for the purposes of conquest and occupation.<br>**2.** To intrude upon, infringe, encroach on, violate. | *"Some of Rouncewell’s hands have just knocked off for dinner-time and seem to be invading the whole town."* — Charles Dickens, *Bleak House* |
| [[pervade]] | verb | **1.** Spread or diffuse through. | *"By day guns and voices are heard ringing in the woods, horsemen and carriages enliven the park roads, servants and hangers-on pervade the village and the Dedlock Arms."* — Charles Dickens, *Bleak House* |
| [[vaduz]] | noun | **1.** The capital and largest city of liechtenstein. | *"In academic literature, vaduz designates the capital and largest city of liechtenstein."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VAD
  </div>
</div>
