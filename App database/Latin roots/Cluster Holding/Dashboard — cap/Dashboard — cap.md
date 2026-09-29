---
status: unread
type: root_dashboard
---
# Dashboard — cap
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cap-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to take, seize, or grasp”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands reaching out and gripping an object firmly to hold it.</span>
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

The root **cap** means to take, seize, or grasp. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *capable*, *capability*, *capacity*, and *capture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to take, seize, or grasp
> The root **cap** means to take, seize, or grasp. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *capable*, *capability*, *capacity*, and *capture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To take, seize, or grasp</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands reaching out and gripping an object firmly to hold it.</mark>
> - **Everyday Connection**: Think of familiar words like *capable* and *capability*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cap** comes from a Latin word that means *"to take, seize, or grasp"*.
  - At its core, it describes the action of take, seize, or grasp.

- **The Big Picture Idea**:
  - Picture hands reaching out and gripping an object firmly to hold it.
  - Whenever you see **cap** in an English word, think of **hands taking hold and keeping control**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to take, seize, or grasp).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Capable**: Having the ability, fitness, or quality necessary to achieve a specified thing.
  - **Capability**: The power, competence, or physical/intellectual ability to do something.
  - **Capacity**: The maximum amount that something can contain.
  - **Capture**: An everyday English word showing the root's idea of *to take, seize, or grasp*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cap</mark>, think of <mark class="hl-def">hands taking hold and keeping control</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cap** reaches English through several distinct morphological pathways:
> - **1. Unprefixed Base Stem:** `cap-` / `capac-` (< Latin *capāx*, *capācitās*):
>   - *capable*, *capability*, *capacity*, *capacious*, *capacitor*, *capacitance*.
>   - With negative prefix *in-*: *incapable*, *incapacity*, *incapacitate*.
> - **2. Prefixed Assimilation Without Vowel Weakening:** `oc-` + `cup-` (< *ob-* + *capere* "to take over completely"):
>   - *occupy*, *occupant*, *occupancy*, *occupation*, *preoccupy*.
> - **3. Vowel-Weakened Present Compounds (`-cip-`):**
>   - `ante-` + `capere` → *anticipare* → *anticipate*, *anticipation*.
>   - `pars` + `capere` → *participare* → *participate*, *participant*, *participle*.
>   - `ē-` + `manus` + `capere` → *emancipare* → *emancipate*, *emancipation*.
>   - `prīmus` + `capere` → *prīnceps* → *prince*, *principal*, *principle*.
>   - `mūnia` + `capere` → *mūniceps* → *municipal*, *municipality*.
>   - `in-` + `capere` → *incipere* → *incipient*, *incipit*.
>   - `re-` + `capere` → *recipere* → *recipe*, *recipient*.
>   - `dis-` + `capere` → *discipulus* → *disciple*, *discipline*.
> - **4. Romance / Old French Doublets:**
>   - Vulgar Latin *\*captiāre* (frequentative of *capere*) split in Norman and Old French:
>     - Norman French *cachier* → Middle English **catch**.
>     - Central Old French *chacier* → Middle English **chase**.

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
> The semantic manifestations of **cap** branch into five powerful conceptual domains:
> - **1. Physical Volume, Capacity & Electrical Storage:** In [[capacity]], [[capacious]], [[capacitor]], and [[capacitance]], the root denotes the physical volume an enclosure can contain or the electrostatic charge a component can store.
> - **2. Competence, Ability & Disqualification:** In [[capable]], [[capability]], [[incapable]], and [[incapacitate]], the root measures physical strength, mental aptitude, or legal eligibility to act.
> - **3. Civic, Legal & Municipal Institutions:** In [[municipal]], [[municipality]], [[emancipate]], and [[emancipation]], the root preserves Roman legal actions of taking on civic duties or releasing citizens from servitude.
> - **4. Political Rank, Primacy & Fundamental Axioms:** In [[prince]], [[principal]], [[principality]], and [[principle]], the root signifies taking the premier place, either as a ruler, an investment sum, or a foundational philosophical law.
> - **5. Dynamic Interaction, Seizure & Temporal Foreknowledge:** In [[occupy]], [[participate]], [[anticipate]], [[incipient]], [[catch]], and [[chase]], the root describes active involvement, moving into vacant territory, or taking hold of events before they arrive.

---

## 🔀 4. Prefix & Combining Dynamics on cap

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ante-` + `capere` | before (*ante*) + to take | [[anticipate]] | To take into consideration beforehand; to foresee and act in advance. |
| `ob-` + `capere` | against, over (*ob-*) + to take | [[occupy]] | To take possession of; to fill or hold space, time, or territory. |
| `pars` + `capere` | part (*pars*) + to take | [[participate]] | To take part in an activity, event, or collective enterprise. |
| `ē-` + `manus` + `capere` | out + hand + to take | [[emancipate]] | To release from legal custody, parental power, or enslavement. |
| `prīmus` + `capere` | first (*prīmus*) + to take | [[principal]] | First in order of importance; the head of an institution or primary capital sum. |
| `prīmus` + `capere` | first (*prīmus*) + to take | [[principle]] | A fundamental truth, law, or doctrine that is taken as the starting foundation. |
| `mūnia` + `capere` | public duties (*mūnia*) + to take | [[municipal]] | Pertaining to a city or town and its self-governing local public administration. |
| `in-` + `capere` | in, into (*in-*) + to take | [[incipient]] | In an initial stage; just taking hold or beginning to develop. |
| `dis-` + `capere` | apart, thoroughly + to take | [[discipline]] | Training that teaches order and obedience; taking in instruction systematically. |
| `re-` + `capere` | back, again (*re-*) + to take | [[recipient]] | A person who receives, accepts, or takes delivery of something. |
| `re-` + `capere` (imperative) | take thou! | [[recipe]] | A prescribed list of ingredients and instructions for medical or culinary preparation. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-able` | Adjective (Potential) | [[capable]] | Having the power, skill, or capacity to take on and achieve tasks. |
| `-ity` | Noun (State / Degree) | [[capacity]], [[capability]], [[municipality]] | The measure of volume, potential skill, or administrative civic entity. |
| `-ious` | Adjective (Abundance) | [[capacious]] | Having plenty of space; roomy; able to contain much. |
| `-or` | Noun (Instrument / Device) | [[capacitor]] | An electrical device designed to take in and store electrostatic charge. |
| `-ate` | Verb | [[incapacitate]], [[emancipate]], [[anticipate]] | To render powerless; to set free; to take action prior to an event. |
| `-ant` / `-ent` | Noun / Adjective (Agent) | [[occupant]], [[participant]], [[incipient]] | One who occupies or participates; characterized by taking initial form. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Electrical Engineering & Physics** | [[capacitor]], [[capacitance]], [[capacity]] | Dielectric charge storage in electronic filters, electric vehicle battery capacity, and Faraday capacitance. |
| ⚖️ **Jurisprudence, Civil Rights & History** | [[emancipate]], [[emancipation]], [[incapacitate]], [[municipal]] | Abraham Lincoln's Emancipation Proclamation, legal incapacitation of trustees, and municipal zoning ordinances. |
| 🏛️ **Political Philosophy & Statecraft** | [[prince]], [[principal]], [[principality]], [[principle]] | Niccolò Machiavelli's *Il Principe*, constitutional separation of powers, and international law principles. |
| 🏥 **Medicine, Pharmacology & Surgery** | [[incipient]], [[incapacitate]], [[recipe]], [[recipient]] | Incipient dementia diagnosis, organ transplant recipient immunosuppression, and prescription formulas ($\text{Rx}$). |
| 📚 **Linguistics & Pedagogy** | [[participle]], [[disciple]], [[discipline]] | Participial verb phrases (*running water*), academic disciplines, and classroom management. |
| 🏢 **Real Estate, Management & Logistics** | [[occupy]], [[occupant]], [[occupancy]], [[occupation]], [[capacity]] | Commercial building occupancy permits, manufacturing capacity utilization, and occupational health standards. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cap]] | noun | **1.** A tight-fitting headdress.<br>**2.** A top (as for a bottle). | *"Virginity, like an old courtier, wears her cap out of fashion, richly suited, but unsuitable, just like the brooch and the toothpick, which wear not now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capable]] | adjective | **1.** (usually followed by `of') having capacity or ability.<br>**2.** Possibly accepting or permitting. | *"Scratch thee but with a pin, and there remains Some scar of it; lean upon a rush, The cicatrice and capable impressure Thy palm some moment keeps."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cape]] | noun | **1.** A strip of land projecting into a body of water.<br>**2.** A sleeveless garment like a cloak but shorter. | *"Yea, but a little charge will trench him here, And on this north side win this cape of land, And then he runs straight and even."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caper]] | noun | **1.** Any of numerous plants of the genus capparis.<br>**2.** Pickled flower buds used as a pungent relish in various dishes and sauces. | *"The truth is, I am only old in judgement and understanding; and he that will caper with me for a thousand marks, let him lend me the money, and have at him!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capital]] | noun | **1.** Assets available for use in the production of further assets.<br>**2.** Wealth in the form of money or property owned by a person or business and human resources of economic value. | *"What you have seen him do and heard him speak, Beating your officers, cursing yourselves, Opposing laws with strokes, and here defying Those whose great power must try him—even this, So criminal and in such capital kind, Deserves th’ extremest death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capitalise]] | verb | **1.** Supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders.<br>**2.** Draw advantages from. | *"In academic literature, capitalise designates supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitalism]] | noun | **1.** An economic system based on private ownership of capital. | *"In academic literature, capitalism designates an economic system based on private ownership of capital."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitalist]] | noun | **1.** A conservative advocate of capitalism.<br>**2.** A person who invests capital in a business (especially a large business). | *"At first, proceeding from the problems of our own age, it seemed clear as daylight to me that the gradual widening of the present merely temporary and social difference between the Capitalist and the Labourer was the key to the whole position."* — H. G. Wells, *The Time Machine* |
| [[capitalistic]] | adjective | **1.** Favoring or practicing capitalism.<br>**2.** Of or relating to capitalism or capitalists. | *"Farming viewed as a capitalistic enterprise. § 5."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[capitalize]] | verb | **1.** Draw advantages from.<br>**2.** Supply with capital, as of a business by using a combination of capital used by investors and debt capital provided by lenders. | *"This is payment for his ability to water the stock successfully, to capitalize it for more than its former value."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[capitate]] | noun | **1.** The wrist bone with a rounded head shape that articulates with the 3rd metacarpus.<br>**2.** Being abruptly enlarged and globose at the tip. | *"In academic literature, capitate designates the wrist bone with a rounded head shape that articulates with the 3rd metacarpus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capitation]] | noun | **1.** A tax levied on the basis of a fixed amount per person. | *"We believe the capitation tax restriction upon the suffrage in Virginia to be in conflict with the XIVth Amendment to the Constitution of the United States."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[capitol]] | noun | **1.** A building occupied by a state legislature.<br>**2.** The government building in washington where the united states senate and the house of representatives meet. | *"And what Made the all-honoured, honest Roman, Brutus, With the armed rest, courtiers of beauteous freedom, To drench the Capitol, but that they would Have one man but a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captain]] | noun | **1.** An officer holding a rank below a major but above a lieutenant.<br>**2.** The naval officer in command of a military ship. | *"Therefore are feasts so solemn and so rare, Since seldom coming in that long year set, Like stones of worth they thinly placed are, Or captain jewels in the carcanet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[captainship]] | noun | **1.** The post of captain. | *"The itch of his affection should not then Have nicked his captainship, at such a point, When half to half the world opposed, he being The mered question. ’Twas a shame no less Than was his loss, to course your flying flags And leave his navy gazing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caption]] | noun | **1.** Taking exception; especially a quibble based on a captious argument.<br>**2.** Translation of foreign dialogue of a movie or tv program; usually displayed at the bottom of the screen. | *"Emancipation and its attendant agitations brought to the front a new class of political questions, which can best be grouped under the above caption."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[decapitate]] | verb | **1.** Cut the head of. | *"When the Alake or king of Abeokuta in West Africa dies, the principal men decapitate his body, and placing the head in a large earthen vessel deliver it to the new sovereign; it becomes his fetish and he is bound to pay it honours."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[decapitated]] | verb | **1.** Cut the head of.<br>**2.** Having had the head cut off. | *"The Pequod’s whale being decapitated and the body stripped, the head was hoisted against the ship’s side—about half way out of the sea, so that it might yet in great part be buoyed up by its native element."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decapitation]] | noun | **1.** Execution by cutting off the victim's head.<br>**2.** Killing by cutting off the head. | *"Who would believe that there could be any one so cruel as to long for the decapitation of the luckless Pedro; yet the sailors pray every minute, selfish fellows, that the miserable fowl may be brought to his end."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[overcapitalise]] | verb | **1.** Estimate the capital value of (a company) at an unreasonably or unlawfully high level.<br>**2.** Overestimate the market value of. | *"In academic literature, overcapitalise designates estimate the capital value of (a company) at an unreasonably or unlawfully high level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcapitalize]] | verb | **1.** Estimate the capital value of (a company) at an unreasonably or unlawfully high level.<br>**2.** Overestimate the market value of. | *"If, in turn, any of the minor factors, as materials or uses of goods, are overvalued (overcapitalized) it will appear ultimately in a check in the demand for them at these prices, and in a reduction in the demand for money loans."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[recap]] | noun | **1.** A summary at the end that repeats the substance of a longer discussion.<br>**2.** A used automobile tire that has been remolded to give it new treads. | *"At this moment I can recap to my mind their slender shafts, and the graceful inequalities of their bark, on which my eye was accustomed to dwell day after day in the midst of my solitary musings."* — Herman Melville, *Typee: A Romance of the South Seas* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAP
  </div>
</div>
