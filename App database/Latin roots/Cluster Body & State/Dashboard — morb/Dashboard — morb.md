---
status: unread
type: root_dashboard
---
# Dashboard — morb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">morb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“disease”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body and its healthy or changing physical states.</span>
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

The root **morb** means disease. It refers to disease, sickness, pathological state, morbidity. In English, this root forms words such as *morbid* and *morbidity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: disease
> The root **morb** means disease. It refers to disease, sickness, pathological state, morbidity. In English, this root forms words such as *morbid* and *morbidity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Disease</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *morbid* and *morbidity*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **morb** comes from a Latin word that means *"disease"*.
  - At its core, it describes disease.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **morb** in an English word, think of **the human body and its conditions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of disease.
  - **Mental & Social**: How people experience, organize, or communicate about disease.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Morbid**: Of, relating to, or characteristic of disease.
  - **Morbidity**: The condition of being diseased or unhealthy.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">morb</mark>, think of <mark class="hl-def">the human body and its conditions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **morb** operates across English through:
> - **Nominal Base:** Latin *morbus* (stem `morb-`), source of medical compounds (*cholera morbus*).
> - **Adjectival Base:** Latin *morbidus* ("sickly, diseased" → English *morbid*).
> - **Diminutive Noun:** Medieval Latin *morbilli* ("measles", diminutive of *morbus* → *morbilliform*, *morbillivirus*).
> - **Causative Compound:** Latin *morbificus* (*morbus* + *facere* "to make" → English *morbific*).
> - **Prefixal Modifications:** *co-* ("together" → *comorbid*, *comorbidity*), *multi-* ("many" → *multimorbidity*), *pre-* ("before" → *premorbid*, *premorbidity*).
>
> English forms abstract public health nouns (*-ity*), adverbs of degree (*morbidly obese*), and virological classifications.

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
> The family distributes across epidemiology, clinical medicine, virology, and psychology:
> - **Epidemiology & Public Health:** [[morbidity]] (disease incidence rate; clinical illness), [[comorbid]] (existing simultaneously with another condition), [[comorbidity]] (co-occurrence of multiple diseases), [[multimorbidity]] (presence of multiple chronic conditions), [[premorbid]] (existing before illness onset), [[premorbidity]] (pre-disease clinical baseline).
> - **General Clinical Medicine & Pathology:** [[morbid]] (diseased, pathological; unsound), [[morbidly]] (in a morbid or diseased manner, e.g. *morbidly obese*), [[morbidness]] (state of disease), [[morbific]] (causing disease; pathogenic), [[morbifical]] (disease-producing).
> - **Virology & Infectious Diseases:** [[morbilli]] (measles), [[morbilliform]] (resembling a measles rash), [[morbillivirus]] (viral genus containing measles and canine distemper).
> - **Psychology & Gothic Sensibility:** [[morbid]] (unwholesome fascination with death, horror, or gloom), [[morbidly]] (characterized by macabre obsession).
> - **Historical Medical Nosology:** [[morbus]] (disease entity, e.g. *morbus cordis*), [[cholera morbus]] (acute historical choleraic gastroenteritis).

---

## 🔀 4. Prefix & Combining Dynamics on morb

### Modifying Elements with `morb`

| Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **co- (com-)** | together, jointly | [[comorbid]] / [[comorbidity]] | The concurrent manifestation of two or more distinct pathological conditions. |
| **multi-** | many (*multus*) | [[multimorbidity]] | The concurrent presence of multiple chronic diseases in an elderly or vulnerable patient. |
| **pre-** | before (*prae*) | [[premorbid]] / [[premorbidity]] | Pertaining to the state of health, cognition, or personality prior to disease onset. |
| **-fic** | making, causing (*facere*) | [[morbific]] | Generating, producing, or predisposing an organism to active disease. |
| **-form** | shape, appearance | [[morbilliform]] | Displaying the cutaneous appearance of a measles maculopapular rash. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-id** | Adjective of state (*-idus*) | [[morbid]] | Affected with, characteristic of, or induced by disease. |
| **-ity** | Statistical / Abstract noun | [[morbidity]] | The rate of disease occurrence; state of being pathological. |
| **-ly** | Adverb of degree / manner | [[morbidly]] | To an unwholesome or medically dangerous degree (*morbidly obese*). |
| **-illi** | Diminutive plural (*-illus*) | [[morbilli]] | Literally "little diseases"; historical name for measles. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Epidemiology & Biostatistics** | [[morbidity]], [[comorbidity]], [[multimorbidity]] | Calculating disability-adjusted life years (DALYs), tracking hospital readmission rates, and modeling chronic disease comorbidity indices. |
| **Clinical Psychiatry & Psychology** | [[morbid]], [[premorbid]], [[morbidly]] | Assessing premorbid cognitive function in schizophrenia, evaluating morbid ideation, and managing obsessive-compulsive fixations on mortality. |
| **Dermatology & Infectious Diseases** | [[morbilli]], [[morbilliform]], [[morbillivirus]] | Diagnosing drug-induced morbilliform eruptions, distinguishing measles exanthems from scarlet fever, and vaccinating against canine distemper morbillivirus. |
| **Bariatric Medicine & Public Health** | [[morbidly]], [[morbid]] | Defining clinical criteria for Class III obesity (BMI ≥ 40 kg/m², historically termed *morbid obesity*) qualifying patients for bariatric surgery. |
| **Legal History & Forensic Medicine** | [[morbus]], [[cholera morbus]] | Examining classical Roman excuse doctrines (*morbus sonticus*) and interpreting nineteenth-century historical autopsy death certificates. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[morbid]] | adjective | **1.** Suggesting an unhealthy mental state.<br>**2.** Suggesting the horror of death and decay. | *"With almost a morbid dread of being thought a gushing girl, this guileless woman too well concealed from the world under a manner of carelessness the warm depths of her strong emotions."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[morbidity]] | noun | **1.** The relative incidence of a particular disease.<br>**2.** An abnormally gloomy or unhealthy state of mind. | *"In academic literature, morbidity designates the relative incidence of a particular disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morbidly]] | adverb | **1.** In a morbid manner or to a morbid degree. | *"This was a good time, to be sure, to sit down morbidly and cry!"* — Charles Dickens, *Bleak House* |
| [[morbidness]] | noun | **1.** An abnormally gloomy or unhealthy state of mind.<br>**2.** The quality of being unhealthful and generally bad for you. | *"Nor will it at all detract from him, dramatically regarded, if either by birth or other circumstances, he have what seems a half wilful overruling morbidness at the bottom of his nature."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[morbific]] | adjective | **1.** Able to cause disease. | *"In academic literature, morbific designates able to cause disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morbilli]] | noun | **1.** An acute and highly contagious viral disease marked by distinct red spots followed by a rash; occurs primarily in children. | *"In academic literature, morbilli designates an acute and highly contagious viral disease marked by distinct red spots followed by a rash; occurs primarily in children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morbilliform]] | adjective | **1.** Of a rash that resembles that of measles. | *"In academic literature, morbilliform designates of a rash that resembles that of measles."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MORB
  </div>
</div>
