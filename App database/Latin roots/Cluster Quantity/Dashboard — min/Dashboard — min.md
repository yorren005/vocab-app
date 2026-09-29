---
status: unread
type: root_dashboard
---
# Dashboard — min
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">min-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“less, smaller OR project, or threaten”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking at a large overflowing basket filled to the brim with goods.</span>
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

The root **min** means less, smaller OR project, or threaten. It describes being smaller in size, projecting outward, or lessening. In English, this root forms words such as *minor*, *minimum*, *minute*, and *diminish*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: less, smaller OR project, or threaten
> The root **min** means less, smaller OR project, or threaten. It describes being smaller in size, projecting outward, or lessening. In English, this root forms words such as *minor*, *minimum*, *minute*, and *diminish*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Less, smaller OR project, or threaten</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *minor* and *minimum*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **min** comes from a Latin word that means *"less, smaller OR project, or threaten"*.
  - At its core, it describes less, smaller OR project, or threaten.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **min** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of less, smaller OR project, or threaten.
  - **Mental & Social**: How people experience, organize, or communicate about less, smaller OR project, or threaten.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Minor**: Lesser in size, importance, extent, or degree.
  - **Minimum**: The lowest or least quantity, degree, or value possible or allowable.
  - **Minute**: An everyday English word showing the root's idea of *less, smaller OR project, or threaten*.
  - **Diminish**: To make or become smaller, less, or less important.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">min</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems & Phonological Shifts

- **Comparative Stem:** *minor-* (nominative *minor*, neuter *minus*, genitive *minōris*) $\to$ *minor, minority, minus, minuscule*.

- **Verbal Stem:** *minu-* (present *minuō*, infinitive *minuere*, perfect *minuī*, supine *minūtum*) $\to$ *diminish, diminution, diminutive*.

- **Participle / Adjectival Stem:** *minūt-* (literally "made small, shaved down") $\to$ *minute* (/maɪˈnjuːt/ "extremely small"; /ˈmɪnɪt/ "sixtieth of an hour"), *minutely, minutiae*.

- **Relational Agent Stem:** *minister-* (*minor* + *-ter* contrastive suffix) $\to$ *minister, ministry, administer, administration*.

- **Superlative Stem:** *minimus* ("smallest, least") $\to$ *minimum, minimal, minimize*.



### 2.2 Productive Affixation & Compounding

- **Prefixation:**

  - `de-` / `di-` + *minuere* $\to$ *diminish* (progressive wearing away or gradual decrease).

  - `ad-` + *minister* $\to$ *administer* (to serve towards, manage affairs for the public).

- **Suffixation:**

  - `-cule` (Latin diminutive *-culus*) $\to$ *minuscule* (originally small cursive script).

  - `-ize` / `-ist` $\to$ *minimize, minimalist, minimalism*.



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



### 1. Numerical & Mathematical Subtraction

- *minus* (the mathematical operator of subtraction; negative quantity).

- *minimum* (the lowest possible amount, degree, or boundary).

- *minimize* (to reduce to the smallest possible amount, risk, or estimation).

- *minimal* (barely adequate, smallest possible degree).



### 2. Temporal & Chronological Precision

- *minute* (a 60th of an hour; historically *pars minuta prima* "first small part", subdivided into *partes minutae secundae* "second small parts" $\to$ *seconds*).

- *minutely* (occurring at intervals of a minute; or examining with extreme, microscopic detail).

- *minutiae* (trifling matters, precise microscopic details of an investigation or text).



### 3. Sociopolitical Governance & Service

- *minister* (a person authorized to conduct religious worship; a high government official heading an executive department).

- *ministry* (the office, duties, or period of service of a minister; government cabinet department).

- *administer* (to manage, direct, or dispense justice, medicine, or resources).

- *administration* (the management of public or private affairs; the executive branch of government).



### 4. Physical Scale, Craft, and Arts

- *miniature* (a small-scale reproduction, painting, or model).

- *miniaturize* (to design or construct on a drastically reduced physical scale, especially microelectronics).

- *minuscule* (exceedingly small; lowercase letterform in paleography).

- *mince* (to chop into very fine bits; to speak or walk with exaggerated delicacy).



---



## 🔀 4. Prefix & Combining Dynamics on min



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `ad-`** | `ad-` + *minister* | **administer** | Directing service toward public duty | *"The committee was formed to administer relief funds."* |

| **Prefix `di-`** | `di-` + *minuere* | **diminish** | Scattering/reducing volume away | *"No amount of criticism could diminish her triumph."* |

| **Diminutive `-culus`** | *minus* + *-culus* | **minuscule** | Extreme reduction to fine micro-script | *"The scribe penned the codex in delicate Carolingian minuscule."* |

| **Superlative `-imus`** | *min-* + *-imus* | **minimum** | Absolute lowest floor or limit | *"The regulations established a minimum wage requirement."* |

| **Action `-tion`** | `di-` + *minu-* + *-tiō* | **diminution** | The process or state of lessening | *"A noticeable diminution of hearing acuity with age."* |

| **Verbalizer `-ize`** | *minimus* + *-ize* | **minimize** | Active downward reduction | *"Engineers worked to minimize aerodynamic drag."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Law & Jurisprudence:** *minor* (a person under legal majority), *minority* (the state of being under legal age; group holding fewer votes), *administer* (executing an estate or trust).

- 🔬 **Science & Technology:** *miniaturization* (semiconductor fabrication from vacuum tubes to nanometer nodes), *minute* (microscopic biological analysis), *minimum* (minimum lethal dose, global minimum of energy state).

- 💻 **Computing & Mathematics:** *minus* (arithmetic operator), *minimize* (reducing window to taskbar; mathematical optimization), *minutiae* (algorithmic edge points in fingerprint biometrics).

- 💼 **Governance & Public Policy:** *minister* (prime minister, cabinet portfolio), *ministry* (state bureaucracy), *administration* (executive branch).

- 🎭 **Art & Design:** *miniature* (portrait miniatures, diorama models), *minimalism* (artistic and architectural movement stripping elements down to essential forms).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[administer]] | verb | **1.** Work in an administrative capacity; supervise or be in charge of.<br>**2.** Perform (a church sacrament) ritually. | *"He sits there to administer the system."* — Charles Dickens, *Bleak House* |
| [[administrable]] | adjective | **1.** Capable of being administered or managed. | *"In academic literature, administrable designates capable of being administered or managed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[administrate]] | verb | **1.** Work in an administrative capacity; supervise or be in charge of. | *"In academic literature, administrate designates work in an administrative capacity; supervise or be in charge of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[administration]] | noun | **1.** A method of tending to or managing the affairs of a some group of people (especially the group's business affairs).<br>**2.** The persons (or committees or departments etc.) who make up a body for the purpose of administering something. | *"Unless he has left a will (which is not at all likely) I shall take out letters of administration."* — Charles Dickens, *Bleak House* |
| [[administrative]] | adjective | **1.** Of or relating to or responsible for administration. | *"So it is, and so it must be, because like the dogs in the hymn, ‘it is our nature to.’ Now, here is Miss Summerson with a fine administrative capacity and a knowledge of details perfectly surprising."* — Charles Dickens, *Bleak House* |
| [[administratively]] | adverb | **1.** By or for an administrator. | *"In academic literature, administratively designates by or for an administrator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[administrator]] | noun | **1.** Someone who administers a business.<br>**2.** The party appointed by a probate court to distribute the estate of someone who dies without a will or without naming an executor. | *"Ye-es,” repeated Miss Flite in her most genteel accents, “my executor, administrator, and assign. (Our Chancery phrases, my love.) I have reflected that if I should wear out, he will be able to watch that judgment."* — Charles Dickens, *Bleak House* |
| [[administrivia]] | noun | **1.** The tiresome but essential details that must be taken care of and tasks that must be performed in running an organization. | *"In academic literature, administrivia designates the tiresome but essential details that must be taken care of and tasks that must be performed in running an organization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armin]] | noun | **1.** German hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19). | *"In academic literature, armin designates german hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arminian]] | noun | **1.** Adherent of arminianism.<br>**2.** Of or relating to arminianism. | *"Nae poison’d soor Arminian stank He let them taste; Frae Calvin’s well, aye clear, drank,— O, sic a feast! [Footnote 1: Rev."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[arminianism]] | noun | **1.** 17th century theology (named after its founder jacobus arminius) that opposes the absolute predestinarianism of john calvin and holds that human free will is compatible with god's sovereignty. | *"We dwell on the points of distinction between Calvinism and Arminianism when the greater part of our people do not know the difference between an Arminian and an Armenian, and some good old sister thinks we are preaching on the cruelty of the Turks."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[arminius]] | noun | **1.** Dutch protestant theologian who founded arminianism which opposed the absolute predestinarianism of john calvin (1559-1609).<br>**2.** German hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19). | *"I have asked my friend Arminius, of Buda-Pesth University, to make his record; and, from all the means that are, he tell me of what he has been."* — Bram Stoker, *Dracula* |
| [[comint]] | noun | **1.** Technical and intelligence information derived from foreign communications by other than the intended recipients. | *"In academic literature, comint designates technical and intelligence information derived from foreign communications by other than the intended recipients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comminate]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment. | *"A garland of grey hair on his comminated head see him me clambering down to the footpace (_descende!_), clutching a monstrance, basiliskeyed."* — James Joyce, *Ulysses* |
| [[commination]] | noun | **1.** Prayers proclaiming god's anger against sinners; read in the church of england on ash wednesday.<br>**2.** A threat of divine punishment or vengeance. | *"Rawdon Crawley, the Dowager Countess wrote back such a letter regarding Becky, with such particulars, hints, facts, falsehoods, and general comminations, that intimacy between Mrs."* — William Makepeace Thackeray, *Vanity Fair* |
| [[comminatory]] | adjective | **1.** Containing warning of punishment. | *"In academic literature, comminatory designates containing warning of punishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comminute]] | verb | **1.** Reduce to small pieces or particles by pounding or abrading. | *"The leaves become sickly and yellow as the mycelium of the fungus spreads over them, when they present a peculiar appearance, as if growing beside a chalky road in dry dusty weather, and had become covered with comminuted chalk."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[countermine]] | noun | **1.** (military) a tunnel dug to defeat similar activities by the enemy.<br>**2.** Destroy property or hinder normal operations. | *"The concavities of it is not sufficient; for, look you, the athversary, you may discuss unto the Duke, look you, is digt himself four yard under the countermines."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demineralisation]] | noun | **1.** Abnormal loss of mineral salts (especially from bone).<br>**2.** The removal of minerals and mineral salts from a liquid (especially from water). | *"In academic literature, demineralisation designates abnormal loss of mineral salts (especially from bone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralise]] | verb | **1.** Remove the minerals or salts from. | *"In academic literature, demineralise designates remove the minerals or salts from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralization]] | noun | **1.** Abnormal loss of mineral salts (especially from bone).<br>**2.** The removal of minerals and mineral salts from a liquid (especially from water). | *"In academic literature, demineralization designates abnormal loss of mineral salts (especially from bone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralize]] | verb | **1.** Remove the minerals or salts from. | *"In academic literature, demineralize designates remove the minerals or salts from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diminish]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Lessen the authority, dignity, or reputation of. | *"Whiles a wedlock hymn we sing, Feed yourselves with questioning, That reason wonder may diminish How thus we met, and these things finish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diminished]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Lessen the authority, dignity, or reputation of. | *"The same formal politeness, the same composed deference that might as well be defiance; the whole man the same dark, cold object, at the same distance, which nothing has ever diminished."* — Charles Dickens, *Bleak House* |
| [[diminishing]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Lessen the authority, dignity, or reputation of. | *"Ah, do not tear away thyself from me; For know, my love, as easy mayst thou fall A drop of water in the breaking gulf, And take unmingled thence that drop again Without addition or diminishing, As take from me thyself, and not me too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diminuendo]] | noun | **1.** (music) a gradual decrease in loudness.<br>**2.** Gradually decreasing in volume. | *"I hope you are going to say a good word for Richard, don’t you know, for my sake. _(Laughter)_ BUCKMULLIGAN: (_Piano, diminuendo_) Then outspoke medical Dick To his comrade medical Davy..."* — James Joyce, *Ulysses* |
| [[diminution]] | noun | **1.** Change toward something smaller or lower.<br>**2.** The statement of a theme in notes of lesser duration (usually half the length of the original). | *"To be furious Is to be frighted out of fear, and in that mood The dove will peck the estridge; and I see still A diminution in our captain’s brain Restores his heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diminutive]] | noun | **1.** A word that is formed with a suffix (such as -let or -kin) to indicate smallness.<br>**2.** Very small. | *"He loves us not: He wants the natural touch; for the poor wren, The most diminutive of birds, will fight, Her young ones in her nest, against the owl."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diminutiveness]] | noun | **1.** The property of being very small in size. | *"What bond could there exist between two such totally distinct species of fish? the one strong, powerful and noted for its voracity, the other for its diminutiveness, beauty of form and weakness?"* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[eminence]] | noun | **1.** High status importance owing to marked superiority.<br>**2.** A protuberance on a bone especially for attachment of a muscle or ligament. | *"I do invest you jointly with my power, Pre-eminence, and all the large effects That troop with majesty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eminent]] | adjective | **1.** Standing above others in quality or position.<br>**2.** Of imposing height; especially standing out above others. | *"Who were below him He us’d as creatures of another place, And bow’d his eminent top to their low ranks, Making them proud of his humility, In their poor praise he humbled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eminently]] | adverb | **1.** In an eminent manner. | *"It is eminently respectable, and likewise, in a general way, retainer-like."* — Charles Dickens, *Bleak House* |
| [[imminence]] | noun | **1.** The state of being imminent and liable to happen soon. | *"I do not speak of flight, of fear of death, But dare all imminence that gods and men Address their dangers in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imminency]] | noun | **1.** The state of being imminent and liable to happen soon. | *"In academic literature, imminency designates the state of being imminent and liable to happen soon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imminent]] | adjective | **1.** Close in time; about to occur. | *"Virtue itself ’scapes not calumnious strokes: The canker galls the infants of the spring Too oft before their buttons be disclos’d, And in the morn and liquid dew of youth Contagious blastments are most imminent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imminently]] | adverb | **1.** In an imminent manner. | *"The necessity for securing an independent position seemed to press imminently upon her."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[imminentness]] | noun | **1.** The state of being imminent and liable to happen soon. | *"In academic literature, imminentness designates the state of being imminent and liable to happen soon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interminable]] | adjective | **1.** Tiresomely long; seemingly without end. | *"Sir Leicester has no objection to an interminable Chancery suit."* — Charles Dickens, *Bleak House* |
| [[interminably]] | adverb | **1.** All the time; seemingly without stopping. | *"I guessed how little she would hear; how bitter must be the dread at her heart; how endlessly, interminably long the moments must seem."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[min]] | noun | **1.** A unit of time equal to 60 seconds or 1/60th of an hour.<br>**2.** Any of the forms of chinese spoken in fukien province. | *"In truth, she was the Lady Om, princess of the house of Min."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mina]] | noun | **1.** Tropical asian starlings. | *"Mina Harker’s Journal How these papers have been placed in sequence will be made manifest in the reading of them."* — Bram Stoker, *Dracula* |
| [[minacious]] | adjective | **1.** Threatening or foreshadowing evil or tragic developments. | *"In academic literature, minacious designates threatening or foreshadowing evil or tragic developments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minah]] | noun | **1.** Tropical asian starlings. | *"In academic literature, minah designates tropical asian starlings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minaret]] | noun | **1.** Slender tower with balconies. | *"Ehrenberg (the Prussian traveller) was in Egypt, he said to a peasant, I suppose you are quite happy now; the country looks like a garden, and every village has its minaret."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[minatory]] | adjective | **1.** Threatening or foreshadowing evil or tragic developments. | *"Now, though we know not precisely the nature of the arguments that were used with the farmer, we may conclude they were of the minatory species, for the young fellow could not, for some time, look any person in the face."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[mince]] | noun | **1.** Food chopped into small bits.<br>**2.** Make less severe or harsh. | *"Speak to me home; mince not the general tongue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mincemeat]] | noun | **1.** Spiced mixture of chopped raisins and apples and other ingredients with or without meat. | *"Cut out the heart, or, better, fling the flesh-remnant into a machine of a thousand blades and make mincemeat of it—and I, _I_, don’t you understand, all the spirit and the mystery and the vital fire and life of me, am off and away."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mincer]] | noun | **1.** A kitchen utensil that cuts or chops food (especially meat) into small pieces. | *"After being severed from the whale, the white-horse is first cut into portable oblongs ere going to the mincer."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mincing]] | verb | **1.** Make less severe or harsh.<br>**2.** Walk daintily. | *"Mincing, B.A., Francis Troy, only son of the late Edward Troy, Esq., M.D., of Weatherbury, and sergeant with Dragoon Guards, to Bathsheba, only surviving daughter of the late Mr."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mincingly]] | adverb | **1.** In a mincing manner. | *"I collect my thoughts here for the business of the day,” said the old lady mincingly."* — Charles Dickens, *Bleak House* |
| [[mine]] | noun | **1.** Excavation in the earth from which ores and minerals are extracted.<br>**2.** Explosive device that explodes on contact; designed to destroy vehicles or ships or to kill or maim personnel. | *"How much more praise deserv’d thy beauty’s use, If thou couldst answer ‘This fair child of mine Shall sum my count, and make my old excuse,’ Proving his beauty by succession thine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mined]] | verb | **1.** Get from the earth by excavation.<br>**2.** Lay mines. | *"Here was beauty native, to be picked like a nugget, not to be mined for in bitter hours of torment and distress."* — Donn Byrne, *The Wind Bloweth* |
| [[minefield]] | noun | **1.** A region in which explosives mines have been placed. | *"It is of interest to note that the buoy shown on the left of the photograph on the lower part of p. 140 marks the resting-place of the German submarine which was sunk in this minefield a few days before the Armistice."* — C. W. Burrows, *Scapa and a Camera* |
| [[minelayer]] | noun | **1.** Ship equipped for laying marine mines. | *"Just say that the fighters are going after the Terminals' minelayers and destroyers that just popped out through the force field's gate."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[minelaying]] | noun | **1.** Laying explosive mines in concealed places to destroy enemy personnel and equipment. | *"In academic literature, minelaying designates laying explosive mines in concealed places to destroy enemy personnel and equipment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miner]] | noun | **1.** Laborer who works in a mine. | *"I was a dyer’s helper in Pyonhan, a gold-miner in the placers of Kang-wun, a rope-maker and twine-twister in Chiksan."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mineral]] | noun | **1.** Solid homogeneous inorganic substances occurring in nature having a definite chemical composition.<br>**2.** Relating to minerals. | *"She did confess she had For you a mortal mineral, which, being took, Should by the minute feed on life, and ling’ring, By inches waste you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mineralize]] | verb | **1.** Convert into a mineral substance.<br>**2.** Transform (a metal) into an ore. | *"During this interval we had fairly unearthed an oblong chest of wood, which, from its perfect preservation and wonderful hardness, had plainly been subjected to some mineralizing process—perhaps that of the bichloride of mercury."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[mineralocorticoid]] | noun | **1.** Hormone that is one of the steroids of the adrenal cortex that influences the metabolism of sodium and potassium. | *"In academic literature, mineralocorticoid designates hormone that is one of the steroids of the adrenal cortex that influences the metabolism of sodium and potassium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mineralogist]] | noun | **1.** A scientist trained in mineralogy. | *"Had this man been an intelligent mineralogist he would not have parted with it for L60,000, as the sequel will prove."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[mineralogy]] | noun | **1.** The branch of geology that studies minerals: their structure and properties and the ways of distinguishing them. | *"In the midst he would rush out to a lecture on mineralogy, and come back sighing that it was all about "stones, stones, stones"!"* — Sydney Waterlow, *Shelley* |
| [[minerva]] | noun | **1.** (roman mythology) goddess of wisdom; counterpart of greek athena. | *"Hark, Tranio! thou mayst hear Minerva speak."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mineshaft]] | noun | **1.** Excavation consisting of a vertical or sloping passageway for finding or mining ore or for ventilating a mine. | *"In academic literature, mineshaft designates excavation consisting of a vertical or sloping passageway for finding or mining ore or for ventilating a mine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minestrone]] | noun | **1.** Soup made with a variety of vegetables. | *"In academic literature, minestrone designates soup made with a variety of vegetables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minesweeper]] | noun | **1.** Ship equipped to detect and then destroy or neutralize or remove marine mines. | *"Got me a tail-end charlie minesweeper."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[minesweeping]] | noun | **1.** The activity of detecting and disposing of marine mines. | *"In academic literature, minesweeping designates the activity of detecting and disposing of marine mines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mineworker]] | noun | **1.** Laborer who works in a mine. | *"In academic literature, mineworker designates laborer who works in a mine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mini]] | noun | **1.** A very short skirt.<br>**2.** Used of women's clothing; very short with hemline above the knee. | *"She was Med-Exec to a research team in a mini-tank town off Venus."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[miniate]] | verb | **1.** Paint with red lead or vermilion.<br>**2.** Decorate (manuscripts) with letters painted red. | *"In academic literature, miniate designates paint with red lead or vermilion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniature]] | noun | **1.** Painting or drawing included in a book (especially in illuminated medieval manuscripts).<br>**2.** A copy that reproduces a person or thing in greatly reduced size. | *"Look here,” said he, unfolding a parcel in his hand, and displaying a small miniature painting, “do you know who that is?” “Certainly: Captain Benwick.” “Yes, and you may guess who it is for."* — Jane Austen, *Persuasion* |
| [[miniaturisation]] | noun | **1.** Act of making on a greatly reduced scale. | *"In academic literature, miniaturisation designates act of making on a greatly reduced scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniaturise]] | verb | **1.** Design or construct on a smaller scale. | *"In academic literature, miniaturise designates design or construct on a smaller scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniaturist]] | noun | **1.** Someone who paints tiny pictures in great detail. | *"That is probably the work of Vinesse,” said Pierre, mentioning a celebrated miniaturist, and he leaned over the table to take the snuffbox while trying to hear what was being said at the other table."* — graf Leo Tolstoy, *War and Peace* |
| [[miniaturization]] | noun | **1.** Act of making on a greatly reduced scale. | *"In academic literature, miniaturization designates act of making on a greatly reduced scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniaturize]] | verb | **1.** Design or construct on a smaller scale. | *"In academic literature, miniaturize designates design or construct on a smaller scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minibar]] | noun | **1.** Sideboard with compartments for holding bottles. | *"In academic literature, minibar designates sideboard with compartments for holding bottles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minibike]] | noun | **1.** Small motorcycle with a low frame and small wheels and elevated handlebars. | *"In academic literature, minibike designates small motorcycle with a low frame and small wheels and elevated handlebars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minibus]] | noun | **1.** A light bus (4 to 10 passengers). | *"In academic literature, minibus designates a light bus (4 to 10 passengers)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minicab]] | noun | **1.** A minicar used as a taxicab. | *"In academic literature, minicab designates a minicar used as a taxicab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minicar]] | noun | **1.** A car that is even smaller than a subcompact car. | *"In academic literature, minicar designates a car that is even smaller than a subcompact car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minicomputer]] | noun | **1.** A digital computer of medium size. | *"In academic literature, minicomputer designates a digital computer of medium size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniconju]] | noun | **1.** A member of a group of siouan people who constituted a division of the teton sioux. | *"In academic literature, miniconju designates a member of a group of siouan people who constituted a division of the teton sioux."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minify]] | verb | **1.** Make smaller. | *"But by no means do I ever overlook or minify the fact that this is one of the most extraordinary experiences of my life."* — Mark Twain, *What Is Man? and Other Essays* |
| [[minim]] | noun | **1.** A british imperial capacity measure (liquid or dry) equal to 1/60th fluid dram or 0.059194 cubic centimeters.<br>**2.** A united states liquid unit equal to 1/60 fluidram. | *"He rests his minim rest, one, two, and the third in your bosom: the very butcher of a silk button, a duellist, a duellist; a gentleman of the very first house, of the first and second cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minimal]] | adjective | **1.** The least possible. | *"Set environment controls at minimal levels for an indefinite stay."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[minimalism]] | noun | **1.** An art movement in sculpture and painting that began in the 1950s and emphasized extreme simplification of form and color. | *"In academic literature, minimalism designates an art movement in sculpture and painting that began in the 1950s and emphasized extreme simplification of form and color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minimalist]] | noun | **1.** A conservative who advocates only minor reforms in government or politics.<br>**2.** A practitioner or advocate of artistic minimalism. | *"In academic literature, minimalist designates a conservative who advocates only minor reforms in government or politics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minimally]] | adverb | **1.** To a minimal degree. | *"Among the migrants were artisans and technicians, minimally to highly-skilled administrators, sociologists, teachers, scientists and engineers and, scattered among them, contemporary philosophers who preached the metaphysical."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[minimisation]] | noun | **1.** The act of reducing something to the least possible amount or degree or position. | *"In academic literature, minimisation designates the act of reducing something to the least possible amount or degree or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minimise]] | verb | **1.** Represent as less significant or important.<br>**2.** Make small or insignificant. | *"Lockhart’s _Life of Napoleon_ (cover wanting, marginal annotations, minimising victories, aggrandising defeats of the protagonist). _Soll und Haben_ by Gustav Freytag (black boards, Gothic characters, cigarette coupon bookmark at p. 24)."* — James Joyce, *Ulysses* |
| [[minimization]] | noun | **1.** The act of reducing something to the least possible amount or degree or position. | *"In academic literature, minimization designates the act of reducing something to the least possible amount or degree or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minimize]] | verb | **1.** Make small or insignificant.<br>**2.** Represent as less significant or important. | *"But they occur also in the periods following crises, when the workers seek to minimize cuts in wages and to prevent the depression of working conditions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[minimized]] | verb | **1.** Make small or insignificant.<br>**2.** Represent as less significant or important. | *"Moreover, this conflict of interest was minimized and often quite avoided by the native changing to another occupation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[minimum]] | noun | **1.** The smallest possible quantity.<br>**2.** The point on a curve where the tangent changes from negative on the left to positive on the right. | *"The general price level fluctuated, but on the whole tended downward between 1884 and 1893 (the year of panic), and reached a minimum in the year 1895 in Germany, 1896 in England, and 1897 in America."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[minimus]] | noun | **1.** The fifth digit; the little finger or little toe. | *"Get you gone, you dwarf; You minimus, of hind’ring knot-grass made; You bead, you acorn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mining]] | noun | **1.** The act of extracting ores or coal etc from the earth.<br>**2.** Laying explosive mines in concealed places to destroy enemy personnel and equipment. | *"It will but skin and film the ulcerous place, Whilst rank corruption, mining all within, Infects unseen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minion]] | noun | **1.** A servile or fawning dependant. | *"Yet fear her O thou minion of her pleasure, She may detain, but not still keep her treasure!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minipress]] | noun | **1.** Antihypertensive drug (trade name minipress). | *"In academic literature, minipress designates antihypertensive drug (trade name minipress)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniscule]] | adjective | **1.** Very small. | *"In academic literature, miniscule designates very small."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniskirt]] | noun | **1.** A very short skirt. | *"In academic literature, miniskirt designates a very short skirt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minister]] | noun | **1.** A person authorized to conduct religious worship.<br>**2.** A person appointed to a high office in the government. | *"He that of greatest works is finisher Oft does them by the weakest minister."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ministerial]] | adjective | **1.** Of or relating to a minister of religion or the minister's office.<br>**2.** Of or relating to a government minister or ministry. | *"There falls to be mentioned first a Memoir of his friend John Clark, who, after a brief and troubled ministerial career, had died of cholera in 1849."* — John Cairns, *Principal Cairns* |
| [[ministerially]] | adverb | **1.** In the manner of a minister or clergyman. | *"In academic literature, ministerially designates in the manner of a minister or clergyman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ministrant]] | noun | **1.** Someone who serves as a minister.<br>**2.** Giving practical help to. | *"Moreover, by chance or by devilry, the ministrant was antecedently made interesting by being a handsome stranger who had evidently seen better days."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ministration]] | noun | **1.** Assistance in time of difficulty. | *"You must not marvel, Helen, at my course, Which holds not colour with the time, nor does The ministration and required office On my particular."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ministry]] | noun | **1.** Religious ministers collectively (especially presbyterian).<br>**2.** Building where the business of a government department is transacted. | *"Chadband’s being much given to describe himself, both verbally and in writing, as a vessel, he is occasionally mistaken by strangers for a gentleman connected with navigation, but he is, as he expresses it, “in the ministry.” Mr."* — Charles Dickens, *Bleak House* |
| [[minisub]] | noun | **1.** Submersible vessel for one or two persons; for naval operations or underwater exploration. | *"In academic literature, minisub designates submersible vessel for one or two persons; for naval operations or underwater exploration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minisubmarine]] | noun | **1.** Submersible vessel for one or two persons; for naval operations or underwater exploration. | *"In academic literature, minisubmarine designates submersible vessel for one or two persons; for naval operations or underwater exploration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minium]] | noun | **1.** A reddish oxide of lead (pb3o4) used as a pigment in paints and in glass and ceramics. | *"In academic literature, minium designates a reddish oxide of lead (pb3o4) used as a pigment in paints and in glass and ceramics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minivan]] | noun | **1.** A small box-shaped passenger van; usually has removable seats; used as a family car. | *"In academic literature, minivan designates a small box-shaped passenger van; usually has removable seats; used as a family car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miniver]] | noun | **1.** Trimming on ceremonial robes consisting of white or light grey fur. | *"In academic literature, miniver designates trimming on ceremonial robes consisting of white or light grey fur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minneapolis]] | noun | **1.** Largest city in minnesota; located in southeastern minnesota on the mississippi river; noted for flour mills; one of the twin cities. | *"The most notable examples of profit-sharing in the United States are the Pillsbury Mills in Minneapolis, Procter and Gamble's soap-factories, in Ivorydale, Ohio, the Nelson Mfg."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[minnesota]] | noun | **1.** A midwestern state. | *"I was born on a quarter-section in Minnesota."* — Jack London, *The Jacket (The Star-Rover)* |
| [[minnesotan]] | noun | **1.** A native or resident of minnesota. | *"In academic literature, minnesotan designates a native or resident of minnesota."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minnewit]] | noun | **1.** Dutch colonist who bought manhattan from the native americans for the equivalent of $24 (1580-1638). | *"In academic literature, minnewit designates dutch colonist who bought manhattan from the native americans for the equivalent of $24 (1580-1638)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minniebush]] | noun | **1.** Low shrub of the eastern united states with downy twigs. | *"In academic literature, minniebush designates low shrub of the eastern united states with downy twigs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minnow]] | noun | **1.** Very small european freshwater fish common in gravelly streams. | *"There did I see that low-spirited swain, that base minnow of thy mirth—_ COSTARD."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minoan]] | noun | **1.** A cretan who lived in the bronze-age culture of crete about 3000-1100 bc.<br>**2.** Of or relating to or characteristic of the bronze age culture of crete. | *"In academic literature, minoan designates a cretan who lived in the bronze-age culture of crete about 3000-1100 bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minocin]] | noun | **1.** Tetracycline antibiotic (trade name minocin) used to treat a variety of bacterial and rickettsial infections. | *"In academic literature, minocin designates tetracycline antibiotic (trade name minocin) used to treat a variety of bacterial and rickettsial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minocycline]] | noun | **1.** Tetracycline antibiotic (trade name minocin) used to treat a variety of bacterial and rickettsial infections. | *"In academic literature, minocycline designates tetracycline antibiotic (trade name minocin) used to treat a variety of bacterial and rickettsial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minor]] | noun | **1.** A young person of either sex.<br>**2.** Of lesser importance or stature or rank. | *"Only at meal times was this interrupted, for Apollonie did not look at this as a minor matter, and she carefully planned what to give her master."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[minority]] | noun | **1.** A group of people who differ racially or politically from a larger group of which it is a part.<br>**2.** Being or relating to the smaller in number of two parts. | *"He shall present Hercules in minority."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minors]] | noun | **1.** A league of teams that do not belong to a major league (especially baseball).<br>**2.** A young person of either sex. | *"If we have studi'd our Majors and our Minors, Antecedents and Consequents, to be concluded Coxcombs, w'have made a fair hand on't."* — John Fletcher, *The Elder Brother* |
| [[minos]] | noun | **1.** Son of zeus and europa; king of ancient crete; ordered daedalus to build the labyrinth; after death minos became a judge in the underworld. | *"I, Daedalus; my poor boy, Icarus; Thy father, Minos, that denied our course; The sun that seared the wings of my sweet boy, Thy brother Edward; and thyself, the sea Whose envious gulf did swallow up his life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minotaur]] | noun | **1.** (greek mythology) a mythical monster with the head of a bull and the body of a man; slain by theseus. | *"Probably he was identical with the Minotaur, and stripped of his mythical features was nothing but a bronze image of the sun represented as a man with a bull's head."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[minoxidil]] | noun | **1.** A vasodilator (trade name loniten) used to treat severe hypertension; one side effect is hirsutism so it is also sold (trade name rogaine) as a treatment for male-patterned baldness. | *"In academic literature, minoxidil designates a vasodilator (trade name loniten) used to treat severe hypertension; one side effect is hirsutism so it is also sold (trade name rogaine) as a treatment for male-patterned baldness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minsk]] | noun | **1.** The capital of belarus and of the commonwealth of independent states. | *"In academic literature, minsk designates the capital of belarus and of the commonwealth of independent states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minster]] | noun | **1.** Any of certain cathedrals and large churches; originally connected to a monastery. | *"The nuptials of our hero, thus formally approved by his father, were celebrated in the most august of temples, the noble Minster of York."* — Walter Scott, *Ivanhoe: A Romance* |
| [[minstrel]] | noun | **1.** A singer of folk songs.<br>**2.** A performer in a minstrel show. | *"Song—A Fiddler In The North The Minstrel At Lincluden A Vision Song—A Red, Red Rose Song—Young Jamie, Pride Of A’ The Plain Song—The Flowery Banks Of Cree Monody On a lady famed for her Caprice."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[minstrelsy]] | noun | **1.** A troupe of minstrels.<br>**2.** Ballads sung by minstrels. | *"How you delight, my lords, I know not, I, But I protest I love to hear him lie, And I will use him for my minstrelsy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mint]] | noun | **1.** (often followed by `of') a large number or amount or extent.<br>**2.** Any north temperate plant of the genus mentha with aromatic leaves and small mauve flowers. | *"You should then have accosted her, and with some excellent jests, fire-new from the mint, you should have banged the youth into dumbness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mint-scented]] | adjective | **1.** Smelling of mint. | *"In academic literature, mint-scented designates smelling of mint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mintage]] | noun | **1.** Coins collectively.<br>**2.** Fee paid to a mint by the government for minting a coin. | *"In academic literature, mintage designates coins collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minter]] | noun | **1.** A skilled worker who coins or stamps money. | *"In academic literature, minter designates a skilled worker who coins or stamps money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mintmark]] | noun | **1.** A mark on a coin that identifies the mint where it was produced. | *"In academic literature, mintmark designates a mark on a coin that identifies the mint where it was produced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minty]] | adjective | **1.** Relating to or suggestive of mint. | *"In academic literature, minty designates relating to or suggestive of mint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minuartia]] | noun | **1.** Mostly perennial herbs of northern hemisphere often with mat-forming habit; most often placed in genus arenaria: sandworts. | *"In academic literature, minuartia designates mostly perennial herbs of northern hemisphere often with mat-forming habit; most often placed in genus arenaria: sandworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minuend]] | noun | **1.** The number from which the subtrahend is subtracted. | *"In academic literature, minuend designates the number from which the subtrahend is subtracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minuet]] | noun | **1.** A stately court dance in the 17th century.<br>**2.** A stately piece of music composed for dancing the minuet; often incorporated into a sonata or suite. | *"A tune much iterated has the ridiculous effect of making the words in my mind perform a sort of minuet to keep time—an effect hardly tolerable, I imagine, after boyhood."* — George Eliot, *Middlemarch* |
| [[minuit]] | noun | **1.** Dutch colonist who bought manhattan from the native americans for the equivalent of $24 (1580-1638). | *"In academic literature, minuit designates dutch colonist who bought manhattan from the native americans for the equivalent of $24 (1580-1638)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minus]] | noun | **1.** An arithmetic operation in which the difference between two numbers is calculated.<br>**2.** On the negative side or lower end of a scale. | *"The _gold shipping points_ for importing or exporting gold are respectively par of exchange plus or minus the cost of moving the actual metal."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[minuscular]] | adjective | **1.** Of or relating to a small cursive script developed from uncial; 7th to 9th centuries. | *"In academic literature, minuscular designates of or relating to a small cursive script developed from uncial; 7th to 9th centuries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minuscule]] | noun | **1.** The characters that were once kept in bottom half of a compositor's type case.<br>**2.** A small cursive script developed from uncial between the 7th and 9th centuries and used in medieval manuscripts. | *"In academic literature, minuscule designates the characters that were once kept in bottom half of a compositor's type case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minute]] | noun | **1.** A unit of time equal to 60 seconds or 1/60th of an hour.<br>**2.** An indefinitely short time. | *"There’s not a minute of our lives should stretch Without some pleasure now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minutely]] | adverb | **1.** In minute detail. | *"Reed a hard-hearted, bad woman?” “She has been unkind to you, no doubt; because you see, she dislikes your cast of character, as Miss Scatcherd does mine; but how minutely you remember all she has done and said to you!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[minuteman]] | noun | **1.** An american militiaman prior to and during the american revolution.<br>**2.** A strategic weapon system using a guided missile of intercontinental range; missiles are equipped with nuclear warheads and dispersed in hardened silos. | *"In academic literature, minuteman designates an american militiaman prior to and during the american revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minuteness]] | noun | **1.** The property of being very small in size.<br>**2.** Great precision; painstaking attention to details. | *"But my affair is widely different; I bring back my heroine to her home in solitude and disgrace; and no sweet elation of spirits can lead me into minuteness."* — Jane Austen, *Northanger Abbey* |
| [[minutes]] | noun | **1.** A written account of what transpired at a meeting.<br>**2.** A unit of time equal to 60 seconds or 1/60th of an hour. | *"If Nature (sovereign mistress over wrack) As thou goest onwards still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace, and wretched minutes kill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[minutia]] | noun | **1.** A small or minor detail. | *"In academic literature, minutia designates a small or minor detail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[minyan]] | noun | **1.** The quorum required by jewish law to be present for public worship (at least ten males over thirteen years of age). | *"In academic literature, minyan designates the quorum required by jewish law to be present for public worship (at least ten males over thirteen years of age)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preeminence]] | noun | **1.** High status importance owing to marked superiority. | *"It was not many decades since the study of Latin and Roman institutions had been forced to yield preeminence of position in Germany to the study of Greek."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[preeminent]] | adjective | **1.** Greatest in importance or degree or significance or achievement. | *"Vital significance of preeminent objective in European continent cannot be overemphasized."* — Effendi Shoghi, *Citadel of Faith* |
| [[preeminently]] | adverb | **1.** To a preeminent degree; with superiority or distinction above others; in a preeminent manner. | *"Karl Marx (1818-1883), preeminently the philosophic leader of the movement, sought to give a solider foundation of reason to the somewhat romantic socialist philosophy current in his day."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prominence]] | noun | **1.** The state of being prominent: widely known or eminent.<br>**2.** Relative importance. | *"No—I’ve hardly looked at her at all,” simpered Joseph, reducing his body smaller whilst talking, apparently from a meek sense of undue prominence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[prominent]] | adjective | **1.** Having a quality that thrusts itself into attention.<br>**2.** Conspicuous in position or importance. | *"She was a formidable style of lady with spectacles, a prominent nose, and a loud voice, who had the effect of wanting a great deal of room."* — Charles Dickens, *Bleak House* |
| [[prominently]] | adverb | **1.** In a prominent way. | *"I think it cannot be too prominently kept before the whole establishment."* — Charles Dickens, *Bleak House* |
| [[reminisce]] | verb | **1.** Recall the past. | *"Minchley, I want--" [_Left reminiscing._ THE BRIDE (_as the page boy's gloomy eye catches hers, "smiles as she was wont to smile_")."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[reminiscence]] | noun | **1.** A mental impression retained and recalled from the past.<br>**2.** The process of remembering (especially the process of recovering information by mental effort). | *"Afterwards, as you shall learn, I identified this reminiscence and knew that the moaning and the groaning was of the sweep-slaves manacled to their benches, which I heard from above, on the poop, a soldier passenger on a galley of old Rome."* — Jack London, *The Jacket (The Star-Rover)* |
| [[reminiscent]] | adjective | **1.** Serving to bring to mind; - wilder hobson. | *"The turkey in the poultry-yard, always troubled with a class-grievance (probably Christmas), may be reminiscent of that summer morning wrongfully taken from him when he got into the lane among the felled trees, where there was a barn and barley."* — Charles Dickens, *Bleak House* |
| [[reminiscently]] | adverb | **1.** In a reminiscent manner. | *"In academic literature, reminiscently designates in a reminiscent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminal]] | adjective | **1.** Pertaining to or containing or consisting of semen.<br>**2.** Containing seeds of later development. | *"Since I have undertaken to manhandle this Leviathan, it behoves me to approve myself omnisciently exhaustive in the enterprise; not overlooking the minutest seminal germs of his blood, and spinning him out to the uttermost coil of his bowels."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[seminar]] | noun | **1.** Any meeting for an exchange of ideas.<br>**2.** A course offered for a small group of advanced students. | *"In academic literature, seminar designates any meeting for an exchange of ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminarian]] | noun | **1.** A student at a seminary (especially a roman catholic seminary). | *"Systematic Theology has its difficulties to the seminarian, but more for him who attempts to master it alone."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[seminarist]] | noun | **1.** A student at a seminary (especially a roman catholic seminary). | *"An enormous crowd of factory hands, house serfs, and peasants, with whom some officials, seminarists, and gentry were mingled, had gone early that morning to the Three Hills."* — graf Leo Tolstoy, *War and Peace* |
| [[seminary]] | noun | **1.** A private place of education for the young.<br>**2.** A theological school for training ministers or priests or rabbis. | *"In the Fall of 1858, H----, a student in the Theological Seminary at Princeton, N.J., was in great need of a new pair of boots."* — Classic Author, *The wonders of prayer* |
| [[seminiferous]] | adjective | **1.** Bearing or producing seed or semen. | *"In academic literature, seminiferous designates bearing or producing seed or semen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminole]] | noun | **1.** A member of the muskhogean people who moved into florida in the 18th century.<br>**2.** The muskhogean language of the seminole. | *"To this day, also, the remnant of the Seminole Indians of Florida, a people of the same stock as the Creeks, hold an annual purification and festival called the Green Corn Dance, at which the new corn is eaten."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[seminoma]] | noun | **1.** Malignant tumor of the testis; usually occurring in older men. | *"In academic literature, seminoma designates malignant tumor of the testis; usually occurring in older men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminude]] | adjective | **1.** Partially clothed. | *"In academic literature, seminude designates partially clothed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undermine]] | verb | **1.** Destroy property or hinder normal operations.<br>**2.** Hollow out as if making a cave or opening. | *"Man setting down before you will undermine you and blow you up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undiminished]] | adjective | **1.** Not lessened or diminished. | *"That I have ever had the strongest affection for her, and that I retain it undiminished."* — Charles Dickens, *Bleak House* |
| [[unmined]] | adjective | **1.** Not mined. | *"In academic literature, unmined designates not mined."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Quantity]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MIN
  </div>
</div>
