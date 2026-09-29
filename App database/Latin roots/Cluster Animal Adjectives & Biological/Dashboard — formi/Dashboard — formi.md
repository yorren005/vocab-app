---
status: unread
type: root_dashboard
---
# Dashboard — formi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">formi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“ant”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Animals displaying their distinctive natural traits, instincts, and biology.</span>
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

The root **formi** means ant. It refers to ant / formic acid distillation / crawling paresthesia. In English, this root forms words such as *formate*, *formaldehyde*, *formalin*, and *chloroform*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ant
> The root **formi** means ant. It refers to ant / formic acid distillation / crawling paresthesia. In English, this root forms words such as *formate*, *formaldehyde*, *formalin*, and *chloroform*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ant</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Animals displaying their distinctive natural traits, instincts, and biology.</mark>
> - **Everyday Connection**: Think of familiar words like *formate* and *formaldehyde*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **formi** comes from a Latin word that means *"ant"*.
  - At its core, it describes ant.

- **The Big Picture Idea**:
  - Picture animals displaying their distinctive natural traits, instincts, and biology.
  - Whenever you see **formi** in an English word, think of **animal traits and biology**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ant.
  - **Mental & Social**: How people experience, organize, or communicate about ant.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Formate**: Any salt or ester derived from formic acid, containing the monovalent anion.
  - **Formaldehyde**: An everyday English word showing the root's idea of *ant*.
  - **Formalin**: A saturated aqueous solution of formaldehyde gas , stabilized with methanol, utilized universally as a tissue fixative, disinfectant, and embalming agent.
  - **Chloroform**: Trichloromethane.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">formi</mark>, think of <mark class="hl-def">animal traits and biology</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Pathways
> The root operates across three distinct scientific and medical domains:
> 1. **Organic Chemistry & Industrial Synthesis:**
>    - `formic-` + `acid` $\to$ [[formic acid]] ($\text{HCOOH}$, methanoic acid).
>    - `form-` + `-ate` $\to$ [[formate]] (a salt or ester of formic acid).
>    - `form-` + `aldehyde` $\to$ [[formaldehyde]] ($\text{HCHO}$).
>    - `form-` + `aldehyde` + `-in` $\to$ [[formalin]] (buffered aqueous preservative solution).
>    - `chloro-` + `form` $\to$ [[chloroform]] ($\text{CHCl}_3$, trichloromethane).
>    - `iodo-` + `form` $\to$ [[iodoform]] ($\text{CHI}_3$, antiseptic).
>    - `form-` + `amide` $\to$ [[formamide]] ($\text{HCONH}_2$).
> 2. **Clinical Neurology & Symptomatology:**
>    - `formīcāre` (to crawl like ants) + `-ātiō` $\to$ [[formication]] (tactile hallucination of creeping insects).
>    - `formīcāns` (participle) $\to$ [[formicant pulse]] (a thready, creeping arterial pulse).
> 3. **Systematics & Entomology:**
>    - Nom. *Formica* $\to$ [[Formica]] (the Linnaean wood ant genus).
>    - `formīc-` + `-idae` $\to$ [[Formicidae]] (the global ant family).
>    - `formīc-` + `-ary` / `-arium` $\to$ [[formicary]] / [[formicarium]] (an ant nest or ant farm).
>    - `formīc-` + `-ine` $\to$ [[formicine]] (ant-like; belonging to Formicinae).
>    - `formīc-` + `-cide` $\to$ [[formicicide]] (an ant poison).

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **C1 Organic Chemistry & Industrial Materials:** [[formic acid]], [[formate]], [[formaldehyde]], [[formalin]], [[formamide]] — textile dyeing, leather tanning, urea-formaldehyde resins, and disinfectant solutions.
> - **Pharmacology & History of Anesthesia:** [[chloroform]], [[iodoform]] — 19th-century surgical anesthesia (administered famously to Queen Victoria by John Snow) and surgical wound dressings.
> - **Clinical Neurology & Psychopathology:** [[formication]], [[formicant pulse]] — tactile hallucinatory paresthesia in alcohol withdrawal (delirium tremens), menopausal estrogen fluctuation, and cocaine toxicosis.
> - **Systematic Entomology & Sociobiology:** [[Formicidae]], [[Formica]], [[formicine]] — eusocial caste division, pheromone trail recruitment, and formic acid defense sprays.
> - **Husbandry & Invertebrate Observation:** [[formicary]], [[formicarium]] — plaster and acrylic formicariums for studying laboratory colonies.

---

## 🔀 4. Prefix & Combining Dynamics on formi

### Morphological Elements & Compounds

| Element / Compound | Linguistic Mechanism | Derived Form | Resulting Meaning & Context |
| :--- | :--- | :--- | :--- |
| `formic-` + `-ic` | Chemical acid suffix | [[formic acid]] | Methanoic acid ($\text{HCOOH}$), originally distilled from ants. |
| `form-` + `-ate` | Chemical salt/ester suffix | [[formate]] | Any salt (e.g., sodium formate) or ester of formic acid. |
| `form-` + `aldehyde` | Chemical condensation compound | [[formaldehyde]] | Methanal ($\text{HCHO}$), pungent gas used in resins and preservation. |
| `form-` + `chloro-` | Haloform chemical compound | [[chloroform]] | Trichloromethane ($\text{CHCl}_3$), volatile liquid surgical anesthetic. |
| `form-` + `iodo-` | Haloform chemical compound | [[iodoform]] | Triiodomethane ($\text{CHI}_3$), yellow crystalline antiseptic. |
| `formīcāre` + `-ation` | Nominal suffix of action (*-ātiō*) | [[formication]] | The hallucination or paresthesia of ants swarming on the skin. |
| `formīca` + `-arium` | Noun of place (*-ārium*) | [[formicarium]] / [[formicary]] | An ant nest, artificial observation chamber, or ant farm. |
| `formīc-` + `-idae` | Zoological family suffix | [[Formicidae]] | The global taxonomic insect family comprising all ants. |
| `formīc-` + `-ine` | Adjectival suffix (*-īnus*) | [[formicine]] | Resembling an ant; belonging to the subfamily Formicinae. |
| `formīca` + `-cide` | Nominal compound (*caedere*) | [[formicicide]] | An insecticide or chemical bait formulated to eradicate ants. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **Organic Chemistry & Manufacturing** | [[formic acid]], [[formaldehyde]], [[formate]] | Manufacturing phenolic resins, industrial descaling, leather tanning, and silage preservation. |
| 🧠 **Clinical Neurology & Psychiatry** | [[formication]] | Diagnosing tactile paresthesias in diabetic peripheral neuropathy, chronic stimulant abuse, and spinal cord lesions. |
| 🐜 **Entomology & Chemical Ecology** | [[Formicidae]], [[Formica]], [[formicary]] | Investigating formic acid spray projection in *Formica* defense and chemical communication trails. |
| 🩺 **Histology & Mortuary Science** | [[formalin]] | Fixing biopsy tissue specimens to cross-link proteins for microscopic slide examination; arterial embalming. |
| 💉 **History of Medicine & Surgery** | [[chloroform]], [[iodoform]] | Tracing the evolution of general inhalation anesthesia in 19th-century battlefield trauma surgery. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conforming]] | verb | **1.** Be similar, be in line with.<br>**2.** Adapt or conform oneself to new or different conditions. | *"The place became less strange, and the people less formidable; and if there were some amongst them whom she could not cease to fear, she began at least to know their ways, and to catch the best manner of conforming to them."* — Jane Austen, *Mansfield Park* |
| [[conformism]] | noun | **1.** Orthodoxy in thoughts and belief. | *"In academic literature, conformism designates orthodoxy in thoughts and belief."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conformist]] | noun | **1.** Someone who conforms to established standards of conduct (especially in religious matters).<br>**2.** Marked by convention and conformity to customs or rules or styles. | *"In academic literature, conformist designates someone who conforms to established standards of conduct (especially in religious matters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conformity]] | noun | **1.** Correspondence in form or appearance.<br>**2.** Acting according to certain accepted standards. | *"Spelling and punctuation have been largely brought into conformity with modern British usage."* — Jane Austen, *Northanger Abbey* |
| [[deformity]] | noun | **1.** An affliction in which some part of the body is misshapen or malformed.<br>**2.** An appearance that has been spoiled or is misshapen. | *"Proper deformity seems not in the fiend So horrid as in woman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formic]] | adjective | **1.** Of or relating to or derived from ants.<br>**2.** Of or containing or derived from formic acid. | *"In academic literature, formic designates of or relating to or derived from ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formica]] | noun | **1.** Any of various plastic laminates containing melamine.<br>**2.** Type genus of the formicidae. | *"In academic literature, formica designates any of various plastic laminates containing melamine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicariidae]] | noun | **1.** Antbirds. | *"Classical and authoritative lexicons catalog formicariidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicarius]] | noun | **1.** Type genus of the formicariidae. | *"In academic literature, formicarius designates type genus of the formicariidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicary]] | noun | **1.** A mound of earth made by ants as they dig their nest. | *"In academic literature, formicary designates a mound of earth made by ants as they dig their nest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicate]] | verb | **1.** Crawl about like ants. | *"In academic literature, formicate designates crawl about like ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formication]] | noun | **1.** Hallucinated sensation that insects or snakes are crawling over the skin; a common side-effect of extensive use of cocaine or amphetamines. | *"In academic literature, formication designates hallucinated sensation that insects or snakes are crawling over the skin; a common side-effect of extensive use of cocaine or amphetamines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicidae]] | noun | **1.** Ants. | *"Classical and authoritative lexicons catalog formicidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informing]] | noun | **1.** To furnish incriminating evidence to an officer of the law (usually in return for favors).<br>**2.** A speech act that conveys information. | *"Boythorn informing him that one of their clerks would wait upon him at noon."* — Charles Dickens, *Bleak House* |
| [[nonconforming]] | adjective | **1.** Not conforming to established customs or doctrines especially in religion. | *"In academic literature, nonconforming designates not conforming to established customs or doctrines especially in religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconformism]] | noun | **1.** A lack of orthodoxy in thoughts or beliefs.<br>**2.** The practice of nonconformity. | *"In academic literature, nonconformism designates a lack of orthodoxy in thoughts or beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconformist]] | noun | **1.** A protestant in england who is not a member of the church of england.<br>**2.** Someone who refuses to conform to established standards of conduct. | *"Present at the managers' meeting were Val, still in breeches: Jack Bendish in a dinner jacket and black tie: Garrett the blacksmith, cursorily washed: Thurlow, a leading Nonconformist tradesman: and Mrs."* — Anthony Pryde, *Nightfall* |
| [[nonconformity]] | noun | **1.** Lack of harmony or correspondence.<br>**2.** A lack of orthodoxy in thoughts or beliefs. | *"She was far from being seriously concerned about his nonconformity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[performing]] | noun | **1.** The performance of a part or role in a drama.<br>**2.** Carry out or perform an action. | *"That will ask some tears in the true performing of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reformism]] | noun | **1.** A doctrine of reform. | *"In academic literature, reformism designates a doctrine of reform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reformist]] | noun | **1.** A disputant who advocates reform.<br>**2.** Favoring or promoting reform (often by government action). | *"Pimble, the ardent reformist, is at present detained from her labors by the illness of her eldest son, Garrison."* — Effie Afton, *Eventide* |
| [[unconformist]] | adjective | **1.** Not conforming to some norm or socially approved pattern of behavior or thought. | *"In academic literature, unconformist designates not conforming to some norm or socially approved pattern of behavior or thought."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal Adjectives & Biological]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FORMI
  </div>
</div>
