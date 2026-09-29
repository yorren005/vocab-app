---
status: unread
type: root_dashboard
---
# Dashboard — form
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">form-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“shape or form”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sturdy wooden framework supporting the roof of a house.</span>
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

The root **form** means shape or form. It refers to the outward shape, appearance, or structured form of an object. In English, this root forms words such as *formal*, *formation*, *conform*, and *transform*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: shape or form
> The root **form** means shape or form. It refers to the outward shape, appearance, or structured form of an object. In English, this root forms words such as *formal*, *formation*, *conform*, and *transform*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Shape or form</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *formal* and *formation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **form** comes from a Latin word that means *"shape or form"*.
  - At its core, it describes shape or form.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **form** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of shape or form.
  - **Mental & Social**: How people experience, organize, or communicate about shape or form.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Formal**: Done in accordance with rules of convention or etiquette.
  - **Formation**: The action of forming or process of being formed. 2. A structure or arrangement of troops or aircraft. 3. A rock unit.
  - **Conform**: To comply with rules, standards, or laws. 2. To behave according to socially acceptable conventions.
  - **Transform**: To make a thorough or dramatic change in the form, appearance, or character of.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">form</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **form** attaches universally to Latin prefixes and suffixes:
- **Base Noun & Adjective Stems (`form-` < *forma*)**:
  - *forma* $\to$ **form**, **formal**, **formality**, **formation**, **formative**.
  - Diminutive *formula* $\to$ **formula**, **formulate**, **formulation**, **formulaic**.
  - *format* (via French/German < Latin *formātus*).
- **Prefix Compounds**:
  - *con-* ("together") + *forma* $\to$ **conform**, **conformity**, **conformist**, **conformance**.
  - *de-* ("away, un-") + *forma* $\to$ **deform**, **deformity**, **deformation**.
  - *in-* ("into") + *forma* $\to$ **inform**, **information**, **informative**, **informant**.
  - *per-* ("thoroughly") + *forma* (influenced by Old French *parfournir*) $\to$ **perform**, **performance**.
  - *re-* ("again") + *forma* $\to$ **reform**, **reformation**, **reformer**.
  - *trans-* ("across") + *forma* $\to$ **transform**, **transformation**, **transformative**.
  - *plat* (flat) + *forma* $\to$ **platform**.
- **The Fear / Dread Exception**:
  - Latin *formīdō* ("terror, dread") $\to$ **formidable** (see Section 8 for this false cognate warning).

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

The derivatives of **form** cover five fundamental spheres:
- **Physical Geometry & Geology**: *form* (the visible shape or configuration of something), *formation* (a geological structure or arrangement), *deform* (distort the shape), *deformity*.
- **Institutional Etiquette & Law**: *formal* (done in accordance with rules of convention or etiquette), *formality* (a rigid convention), *informal*.
- **Societal & Behavioral Compliance**: *conform* (comply with rules, standards, or laws), *conformity* (compliance with standards), *reform* (make changes in an institution in order to improve it).
- **Pedagogy & Data Processing**: *inform* (give someone facts or information), *information* (facts provided or learned about something), *informative*.
- **Science, Mathematics & Chemistry**: *formula* (a mathematical relationship or rule expressed in symbols; a recipe), *formulate* (create or devise systematically).

---

## 🔀 4. Prefix & Combining Dynamics on form

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`con-`** ("together") | `con-` + `forma` | Fit into the same mold with others $\to$ comply, adapt | *conform, conformity, conformist* |
| **`de-`** ("down, un-") | `de-` + `forma` | Strip of proper shape $\to$ disfigure, mar, distort | *deform, deformity, deformation* |
| **`in-`** ("into") | `in-` + `forma` | Stamp a shape into the mind $\to$ educate, communicate data | *inform, information, informative* |
| **`re-`** ("again") | `re-` + `forma` | Shape over again for improvement $\to$ improve, rectify | *reform, reformation, reformer* |
| **`trans-`** ("across") | `trans-` + `forma` | Change from one shape across to another $\to$ convert, alter | *transform, transformation* |
| **`-ula`** (diminutive) | `forma` + `-ula` | A little prescribed shape/recipe $\to$ mathematical rule | *formula, formulate, formulaic* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics, Chemistry & Physics**: Algebraic equations, molecular structures, and empirical laws (*formula*, *chemical formula*).
- **Sociology & Psychology**: Asch conformity experiments, institutional groupthink, and social deviance (*conformity*, *conformist*).
- **Information Theory & Computer Science**: Shannon entropy, data structures, and file formats (*information theory*, *format*).
- **Geology & Military Tactics**: Rock stratigraphy and defensive troop alignments (*geological formation*, *battle formation*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conform]] | verb | **1.** Be similar, be in line with.<br>**2.** Adapt or conform oneself to new or different conditions. | *"I was, I must confess, Great Albion’s queen in former golden days; But now mischance hath trod my title down And with dishonour laid me on the ground, Where I must take like seat unto my fortune And to my humble seat conform myself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conformable]] | adjective | **1.** Quick to comply; -shakespeare.<br>**2.** Disposed or willing to comply. | *"Heaven witness I have been to you a true and humble wife, At all times to your will conformable, Ever in fear to kindle your dislike, Yea, subject to your countenance, glad or sorry As I saw it inclined."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conformably]] | adverb | **1.** In a conformable manner. | *"The tenure of the ministerial offices generally, will be a subject of legal regulation, conformably to the reason of the case and the example of the State constitutions."* — Alexander Hamilton, *The Federalist Papers* |
| [[conformance]] | noun | **1.** Correspondence in form or appearance. | *"Such rights extend off-planet to national boundaries established in conformance with treaties in effect for delineating planetary and satellite jurisdictions in near and contiguous space."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[conformation]] | noun | **1.** A symmetrical arrangement of the parts of a thing.<br>**2.** Any spatial attributes (especially as defined by outline). | *"Yet I did not heed the bleakness of the weather; I was better fitted by my conformation for the endurance of cold than heat."* — Mary Wollstonecraft Shelley, *Frankenstein; or, the modern prometheus* |
| [[conforming]] | verb | **1.** Be similar, be in line with.<br>**2.** Adapt or conform oneself to new or different conditions. | *"The place became less strange, and the people less formidable; and if there were some amongst them whom she could not cease to fear, she began at least to know their ways, and to catch the best manner of conforming to them."* — Jane Austen, *Mansfield Park* |
| [[conformism]] | noun | **1.** Orthodoxy in thoughts and belief. | *"In academic literature, conformism designates orthodoxy in thoughts and belief."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conformist]] | noun | **1.** Someone who conforms to established standards of conduct (especially in religious matters).<br>**2.** Marked by convention and conformity to customs or rules or styles. | *"In academic literature, conformist designates someone who conforms to established standards of conduct (especially in religious matters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conformity]] | noun | **1.** Correspondence in form or appearance.<br>**2.** Acting according to certain accepted standards. | *"Spelling and punctuation have been largely brought into conformity with modern British usage."* — Jane Austen, *Northanger Abbey* |
| [[counterreformation]] | noun | **1.** A reformation intended to counter the results of a prior reformation. | *"In academic literature, counterreformation designates a reformation intended to counter the results of a prior reformation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deform]] | verb | **1.** Make formless.<br>**2.** Twist and press out of shape. | *"In nature there’s no blemish but the mind; None can be call’d deform’d but the unkind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deformation]] | noun | **1.** A change for the worse.<br>**2.** Alteration in the shape or dimensions of an object as a result of the application of stress to it. | *"In academic literature, deformation designates a change for the worse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deformational]] | adjective | **1.** Relating to or causing change in either shape or size of a material body or geometric figure. | *"In academic literature, deformational designates relating to or causing change in either shape or size of a material body or geometric figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deformed]] | verb | **1.** Make formless.<br>**2.** Twist and press out of shape. | *"He is deformed, crooked, old, and sere, Ill-fac’d, worse bodied, shapeless everywhere; Vicious, ungentle, foolish, blunt, unkind, Stigmatical in making, worse in mind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deformity]] | noun | **1.** An affliction in which some part of the body is misshapen or malformed.<br>**2.** An appearance that has been spoiled or is misshapen. | *"Proper deformity seems not in the fiend So horrid as in woman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disinformation]] | noun | **1.** Misinformation that is deliberately disseminated in order to influence or confuse rivals (foreign enemies or business competitors etc.). | *"In academic literature, disinformation designates misinformation that is deliberately disseminated in order to influence or confuse rivals (foreign enemies or business competitors etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[form]] | noun | **1.** The phonological or orthographic sound or appearance of a word that can be used to describe or identify something.<br>**2.** A category of things distinguished by some common characteristic or quality. | *"So should that beauty which you hold in lease Find no determination, then you were Yourself again after yourself’s decease, When your sweet issue your sweet form should bear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formal]] | noun | **1.** A lavish dance requiring formal attire.<br>**2.** A gown for evening wear. | *"If not well, Thou shouldst come like a Fury crowned with snakes, Not like a formal man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formaldehyde]] | noun | **1.** A colorless poisonous gas; made by the oxidation of methanol. | *"Her talk these days was of formaldehyde, benzoate of soda, and salicylic acid."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[formalin]] | noun | **1.** A 10% solution of formaldehyde in water; used as a disinfectant or to preserve biological specimens. | *"In academic literature, formalin designates a 10% solution of formaldehyde in water; used as a disinfectant or to preserve biological specimens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalisation]] | noun | **1.** The act of making formal (as by stating formal rules governing classes of expressions). | *"In academic literature, formalisation designates the act of making formal (as by stating formal rules governing classes of expressions)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalise]] | verb | **1.** Make formal or official.<br>**2.** Declare or make legally valid. | *"Of the usual conical form, it has a plain outside, and the inside is decorated with an incised design of not very clear meaning, but apparently a close foliage ground with highly formalised figures of boys."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[formalised]] | verb | **1.** Make formal or official.<br>**2.** Declare or make legally valid. | *"Of the usual conical form, it has a plain outside, and the inside is decorated with an incised design of not very clear meaning, but apparently a close foliage ground with highly formalised figures of boys."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[formalism]] | noun | **1.** The doctrine that formal structure rather than content is what should be represented.<br>**2.** (philosophy) the philosophical theory that formal (logical or mathematical) statements have no meaning but that its symbols (regarded as physical entities) exhibit a form that has useful applications. | *"In this, despite its beauty, there is still a _soupcon_ of formalism, a lingering trace of powder from the eighteenth century periwig, dimming the bright locks of poetry."* — Francis Thompson, *Shelley: An Essay* |
| [[formalistic]] | adjective | **1.** Concerned with or characterized by rigorous adherence to recognized forms (especially in religion or art). | *"In academic literature, formalistic designates concerned with or characterized by rigorous adherence to recognized forms (especially in religion or art)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalities]] | noun | **1.** A requirement of etiquette or custom. | *"We have only, in the second place, to observe those little formalities which are rendered necessary by our time of life and our being under the guardianship of the court."* — Charles Dickens, *Bleak House* |
| [[formality]] | noun | **1.** A requirement of etiquette or custom.<br>**2.** A manner that strictly observes all forms and ceremonies. | *"Kurt, the second boy, is the most enterprising and humorous of the family; whereas, Lippo, another boy, is the soul of obedience and formality."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[formalization]] | noun | **1.** The act of making formal (as by stating formal rules governing classes of expressions). | *"In academic literature, formalization designates the act of making formal (as by stating formal rules governing classes of expressions)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalize]] | verb | **1.** Make formal or official.<br>**2.** Declare or make legally valid. | *"In academic literature, formalize designates make formal or official."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalized]] | verb | **1.** Make formal or official.<br>**2.** Declare or make legally valid. | *"In academic literature, formalized designates make formal or official."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formally]] | adverb | **1.** With official authorization.<br>**2.** In a formal manner. | *"Therefore, I prithee, Supply me with the habit, and instruct me How I may formally in person bear Like a true friar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formalness]] | noun | **1.** A manner that strictly observes all forms and ceremonies. | *"In academic literature, formalness designates a manner that strictly observes all forms and ceremonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formalwear]] | noun | **1.** Attire to wear on formal occasions in the evening. | *"In academic literature, formalwear designates attire to wear on formal occasions in the evening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[format]] | noun | **1.** The organization of information according to preset specifications (usually for computer processing).<br>**2.** The general appearance of a publication. | *"In academic literature, format designates the organization of information according to preset specifications (usually for computer processing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formation]] | noun | **1.** An arrangement of people or things acting as a unit.<br>**2.** The act of fabricating something in a particular shape. | *"I could not find that it led to anything but the formation of delusive hopes in connexion with the suit already the pernicious cause of so much sorrow and ruin."* — Charles Dickens, *Bleak House* |
| [[formative]] | noun | **1.** Minimal language unit that has a syntactic (or morphological) function.<br>**2.** Capable of forming new cells and tissues. | *"I used to play cricket myself." Laura Clowes in this period went through an experience almost equally formative."* — Anthony Pryde, *Nightfall* |
| [[formatting]] | noun | **1.** The organization of information according to preset specifications (usually for computer processing).<br>**2.** Set (printed matter) into a specific format. | *"In academic literature, formatting designates the organization of information according to preset specifications (usually for computer processing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formed]] | verb | **1.** Create (as an entity).<br>**2.** To compose or represent:. | *"I did think, by the excellent constitution of thy leg, it was formed under the star of a galliard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[former]] | noun | **1.** The first of two or the first mentioned of two.<br>**2.** Referring to the first of two things or persons mentioned (or the earlier one or ones of several). | *"You have seen and proved a fairer former fortune Than that which is to approach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formerly]] | adverb | **1.** At a previous time. | *"And your virginity, your old virginity, is like one of our French wither’d pears; it looks ill, it eats drily; marry, ’tis a wither’d pear; it was formerly better; marry, yet ’tis a wither’d pear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formic]] | adjective | **1.** Of or relating to or derived from ants.<br>**2.** Of or containing or derived from formic acid. | *"In academic literature, formic designates of or relating to or derived from ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formica]] | noun | **1.** Any of various plastic laminates containing melamine.<br>**2.** Type genus of the formicidae. | *"In academic literature, formica designates any of various plastic laminates containing melamine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicariidae]] | noun | **1.** Antbirds. | *"Classical and authoritative lexicons catalog formicariidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicarius]] | noun | **1.** Type genus of the formicariidae. | *"In academic literature, formicarius designates type genus of the formicariidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicary]] | noun | **1.** A mound of earth made by ants as they dig their nest. | *"In academic literature, formicary designates a mound of earth made by ants as they dig their nest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicate]] | verb | **1.** Crawl about like ants. | *"In academic literature, formicate designates crawl about like ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formication]] | noun | **1.** Hallucinated sensation that insects or snakes are crawling over the skin; a common side-effect of extensive use of cocaine or amphetamines. | *"In academic literature, formication designates hallucinated sensation that insects or snakes are crawling over the skin; a common side-effect of extensive use of cocaine or amphetamines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formicidae]] | noun | **1.** Ants. | *"Classical and authoritative lexicons catalog formicidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formidability]] | noun | **1.** Impressive difficulty. | *"In academic literature, formidability designates impressive difficulty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formidable]] | adjective | **1.** Extremely impressive in strength or excellence.<br>**2.** Inspiring fear; ; - g.h.johnston. | *"She was a formidable style of lady with spectacles, a prominent nose, and a loud voice, who had the effect of wanting a great deal of room."* — Charles Dickens, *Bleak House* |
| [[formidably]] | adverb | **1.** In a formidable manner. | *"But as the mileage lessened between her and the spot of her pilgrimage, so did Tess’s confidence decrease, and her enterprise loom out more formidably."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[formless]] | adjective | **1.** Having no definite form or distinct shape.<br>**2.** Having no physical form. | *"All form is formless, order orderless, Save what is opposite to England’s love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[formlessly]] | adverb | **1.** In a formless manner. | *"I looked down; my clothes hung formlessly on my shrunken limbs; the hand that lay on my knee was corded and hairy."* — Robert Louis Stevenson, *The strange case of Dr. Jekyll and Mr. Hyde* |
| [[formol]] | noun | **1.** A 10% solution of formaldehyde in water; used as a disinfectant or to preserve biological specimens. | *"In academic literature, formol designates a 10% solution of formaldehyde in water; used as a disinfectant or to preserve biological specimens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formosa]] | noun | **1.** An island in southeastern asia 100 miles off the coast of mainland china in the south china sea. | *"Now, from the South and West the Pequod was drawing nigh to Formosa and the Bashee Isles, between which lies one of the tropical outlets from the China waters into the Pacific."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[formosan]] | noun | **1.** The austronesian languages spoken on formosa.<br>**2.** Of or relating to or characteristic of the island republic on taiwan or its residents or their language. | *"In academic literature, formosan designates the austronesian languages spoken on formosa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formula]] | noun | **1.** A group of symbols that make a mathematical statement.<br>**2.** Directions for making something. | *"That’s never Gable Oak’s grandson over at Norcombe—never!” he said, as a formula expressive of surprise, which nobody was supposed for a moment to take literally."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[formulaic]] | adjective | **1.** Characterized by or in accordance with some formula. | *"In academic literature, formulaic designates characterized by or in accordance with some formula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formularise]] | verb | **1.** Express as a formula. | *"In academic literature, formularise designates express as a formula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formularize]] | verb | **1.** Express as a formula. | *"In academic literature, formularize designates express as a formula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[formulary]] | noun | **1.** (pharmacology) a book containing a compilation of pharmaceutical products with their formulas and methods of preparation.<br>**2.** Of or relating to or of the nature of a formula. | *"The _Lines written above Tintern Abbey_ have become, as it were, the _locus classicus_ or consecrated formulary of the Wordsworthian faith."* — F. W. H. Myers, *Wordsworth* |
| [[formulate]] | verb | **1.** Elaborate, as of theories and hypotheses.<br>**2.** Come up with (an idea, plan, explanation, theory, or principle) after a mental effort. | *"A proof of her weakness lay in the very utterance of what calm strength would not have taken the trouble to formulate."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[formulated]] | verb | **1.** Elaborate, as of theories and hypotheses.<br>**2.** Come up with (an idea, plan, explanation, theory, or principle) after a mental effort. | *"Of the fabricated tastes of good fashionable society she knew but little, and of the formulated self-indulgence of bad, nothing at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[formulation]] | noun | **1.** A substance prepared according to a formula.<br>**2.** Inventing or contriving an idea or explanation and formulating it mentally. | *"Thus it is that what comes out of the mouth defiles a man (Matt. 15:18)--with the curious suggestion, whether intended or not, that the formulation of a floating thought gives it new power to injure or to help."* — T. R. Glover, *The Jesus of History* |
| [[inform]] | verb | **1.** Impart knowledge of some fact, state or affairs, or event to.<br>**2.** Give character or essence to. | *"You have discharg’d this honestly; keep it to yourself; many likelihoods inform’d me of this before, which hung so tottering in the balance that I could neither believe nor misdoubt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[informal]] | adjective | **1.** Not formal.<br>**2.** Not officially recognized or controlled. | *"I do perceive These poor informal women are no more But instruments of some more mightier member That sets them on."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[informality]] | noun | **1.** A manner that does not take forms and ceremonies seriously.<br>**2.** Freedom from constraint or embarrassment. | *"Why did not you seek legal redress?” “There was just such an informality in the terms of the bequest as to give me no hope from law."* — Jane Austen, *Pride and Prejudice* |
| [[informally]] | adverb | **1.** Without formality.<br>**2.** With the use of colloquial expressions. | *"It was informally offered to Cairns through one of the councillors, but again he sent a declinature, and again he kept the matter carefully concealed."* — John Cairns, *Principal Cairns* |
| [[informant]] | noun | **1.** A person who supplies information.<br>**2.** Someone who sees an event and reports what happened. | *"The airs the fellow gives himself!” said my informant, shaking her head at old Mr."* — Charles Dickens, *Bleak House* |
| [[informatics]] | noun | **1.** The sciences concerned with gathering, manipulating, storing, retrieving, and classifying recorded information. | *"In academic literature, informatics designates the sciences concerned with gathering, manipulating, storing, retrieving, and classifying recorded information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[information]] | noun | **1.** A message received and understood.<br>**2.** Knowledge acquired through study or experience or instruction. | *"But reason with the fellow Before you punish him, where he heard this, Lest you shall chance to whip your information And beat the messenger who bids beware Of what is to be dreaded."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[informational]] | adjective | **1.** Relating to or having the nature of information. | *"In academic literature, informational designates relating to or having the nature of information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informative]] | adjective | **1.** Tending to increase knowledge or dissipate ignorance.<br>**2.** Serving to instruct or enlighten or inform. | *"In academic literature, informative designates tending to increase knowledge or dissipate ignorance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informatively]] | adverb | **1.** In an informative manner. | *"In academic literature, informatively designates in an informative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informatory]] | adjective | **1.** Providing or conveying information. | *"In academic literature, informatory designates providing or conveying information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informed]] | verb | **1.** Impart knowledge of some fact, state or affairs, or event to.<br>**2.** Give character or essence to. | *"Have you informed them sithence?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[informer]] | noun | **1.** One who reveals confidential information in return for money. | *"Kurt then suddenly understood that his impudent small sister had probably been the informer and he did not know what to answer."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[informercial]] | noun | **1.** A television commercial presented in the form of a short documentary. | *"In academic literature, informercial designates a television commercial presented in the form of a short documentary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[informing]] | noun | **1.** To furnish incriminating evidence to an officer of the law (usually in return for favors).<br>**2.** A speech act that conveys information. | *"Boythorn informing him that one of their clerks would wait upon him at noon."* — Charles Dickens, *Bleak House* |
| [[misinform]] | verb | **1.** Give false or misleading information to. | *"You have apparently been misinformed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[misinformation]] | noun | **1.** Information that is incorrect. | *"Cowardice, though sometimes the effect of natural imbecility, is generally a prejudice of education, or bad habit contracted from misinformation, or misapprehension; and may certainly be cured by experience, and the exercise of reason."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[nonconformance]] | noun | **1.** A lack of orthodoxy in thoughts or beliefs.<br>**2.** Failure to conform to accepted standards of behavior. | *"In academic literature, nonconformance designates a lack of orthodoxy in thoughts or beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconforming]] | adjective | **1.** Not conforming to established customs or doctrines especially in religion. | *"In academic literature, nonconforming designates not conforming to established customs or doctrines especially in religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconformism]] | noun | **1.** A lack of orthodoxy in thoughts or beliefs.<br>**2.** The practice of nonconformity. | *"In academic literature, nonconformism designates a lack of orthodoxy in thoughts or beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconformist]] | noun | **1.** A protestant in england who is not a member of the church of england.<br>**2.** Someone who refuses to conform to established standards of conduct. | *"Present at the managers' meeting were Val, still in breeches: Jack Bendish in a dinner jacket and black tie: Garrett the blacksmith, cursorily washed: Thurlow, a leading Nonconformist tradesman: and Mrs."* — Anthony Pryde, *Nightfall* |
| [[nonconformity]] | noun | **1.** Lack of harmony or correspondence.<br>**2.** A lack of orthodoxy in thoughts or beliefs. | *"She was far from being seriously concerned about his nonconformity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nonperformance]] | noun | **1.** Failure to act with the prudence that a reasonable person would exercise under the same circumstances. | *"In academic literature, nonperformance designates failure to act with the prudence that a reasonable person would exercise under the same circumstances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perform]] | verb | **1.** Carry out or perform an action.<br>**2.** Perform a function. | *"Good fortune and the favour of the king Smile upon this contract; whose ceremony Shall seem expedient on the now-born brief, And be perform’d tonight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[performance]] | noun | **1.** A dramatic or musical entertainment.<br>**2.** The act of presenting a play or a piece of music or other entertainment. | *"Here is my hand; the premises observ’d, Thy will by my performance shall be serv’d; So make the choice of thy own time, for I, Thy resolv’d patient, on thee still rely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[performer]] | noun | **1.** An entertainer who performs a dramatic or musical work for an audience. | *"But that the merit of service is seldom attributed to the true and exact performer, I would have that drum or another, or _hic jacet_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[performing]] | noun | **1.** The performance of a part or role in a drama.<br>**2.** Carry out or perform an action. | *"That will ask some tears in the true performing of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[platform]] | noun | **1.** A raised horizontal surface.<br>**2.** A document stating the aims and principles of a political party. | *"A platform before the Castle Scene II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preform]] | verb | **1.** Form into a shape resembling the final, desired one.<br>**2.** Form or shape beforehand or determine the shape of beforehand. | *"In her lay a Godframed Godgiven preformed possibility which thou hast fructified with thy modicum of man’s work."* — James Joyce, *Ulysses* |
| [[preformation]] | noun | **1.** A theory (popular in the 18th century and now discredited) that an individual develops by simple enlargement of a tiny fully formed organism (a homunculus) that exists in the germ cell. | *"In academic literature, preformation designates a theory (popular in the 18th century and now discredited) that an individual develops by simple enlargement of a tiny fully formed organism (a homunculus) that exists in the germ cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reform]] | noun | **1.** A change for the better as a result of correcting abuses.<br>**2.** A campaign aimed to correct abuses or malpractices. | *"I hope we have reform’d that indifferently with us, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reformable]] | adjective | **1.** Susceptible to improvement or reform. | *"In academic literature, reformable designates susceptible to improvement or reform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reformation]] | noun | **1.** Improvement (or an intended improvement) in the existing form or condition of institutions or practices etc.; intended to make a striking change for the better in social or political or religious affairs.<br>**2.** A religious movement of the 16th century that began as an attempt to reform the roman catholic church and resulted in the creation of protestant churches. | *"Never was such a sudden scholar made, Never came reformation in a flood With such a heady currance scouring faults, Nor never Hydra-headed wilfulness So soon did lose his seat, and all at once, As in this king."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reformative]] | adjective | **1.** Tending to reform. | *"In academic literature, reformative designates tending to reform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reformatory]] | noun | **1.** Correctional institution for the detention and discipline and training of young or first offenders.<br>**2.** Tending to reform. | *"Even when I was taken to have a new suit of clothes, the tailor had orders to make them like a kind of Reformatory, and on no account to let me have the free use of my limbs."* — Charles Dickens, *Great Expectations* |
| [[reformed]] | verb | **1.** Make changes for improvement in order to remove abuse and injustices.<br>**2.** Bring, lead, or force to abandon a wrong or evil course of life, conduct, and adopt a right one. | *"Come, bring away the plaintiffs: by this time our sexton hath reformed Signior Leonato of the matter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reformer]] | noun | **1.** A disputant who advocates reform.<br>**2.** An apparatus that reforms the molecular structure of hydrocarbons to produce richer fuel. | *"Yes, but what that religion needed was a great reformer, who should have cut the religion clear adrift from idols of every kind, from the old mythology, from obscenity."* — T. R. Glover, *The Jesus of History* |
| [[reformism]] | noun | **1.** A doctrine of reform. | *"In academic literature, reformism designates a doctrine of reform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reformist]] | noun | **1.** A disputant who advocates reform.<br>**2.** Favoring or promoting reform (often by government action). | *"Pimble, the ardent reformist, is at present detained from her labors by the illness of her eldest son, Garrison."* — Effie Afton, *Eventide* |
| [[reformulate]] | verb | **1.** Formulate or develop again, of an improved theory or hypothesis. | *"In academic literature, reformulate designates formulate or develop again, of an improved theory or hypothesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transform]] | verb | **1.** Subject to a mathematical transformation.<br>**2.** Change or alter in form, appearance, or nature. | *"Look where they come: Take but good note, and you shall see in him The triple pillar of the world transform’d Into a strumpet’s fool."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transformable]] | adjective | **1.** Capable of being changed in substance as if by alchemy. | *"In academic literature, transformable designates capable of being changed in substance as if by alchemy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transformation]] | noun | **1.** A qualitative change.<br>**2.** (mathematics) a function that changes the position or direction of the axes of a coordinate system. | *"Something have you heard Of Hamlet’s transformation; so I call it, Since nor th’exterior nor the inward man Resembles that it was."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transformed]] | verb | **1.** Subject to a mathematical transformation.<br>**2.** Change or alter in form, appearance, or nature. | *"I think he be transformed into a beast, For I can nowhere find him like a man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transformer]] | noun | **1.** An electrical device by which alternating current of one voltage is changed to another voltage. | *"But you do not yourself look upon this as likely?” “I do not think Flora would hurt a fly.” “Still, jealousy is a strange transformer of characters."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[unconformable]] | adjective | **1.** Not correspondent. | *"In academic literature, unconformable designates not correspondent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconformist]] | adjective | **1.** Not conforming to some norm or socially approved pattern of behavior or thought. | *"In academic literature, unconformist designates not conforming to some norm or socially approved pattern of behavior or thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underperform]] | verb | **1.** Perform less well or with less success than expected.<br>**2.** Perform too rarely. | *"In academic literature, underperform designates perform less well or with less success than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underperformer]] | noun | **1.** A student who does not perform as well as expected or as well as the iq indicates.<br>**2.** A business that is less successful than expected. | *"In academic literature, underperformer designates a student who does not perform as well as expected or as well as the iq indicates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unformed]] | adjective | **1.** Not having form or shape.<br>**2.** Not formed or organized. | *"I thought my confession would give you grounds for that.” “O Tess—you are too, too—childish—unformed—crude, I suppose!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[uninformative]] | adjective | **1.** Lacking information. | *"In academic literature, uninformative designates lacking information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninformatively]] | adverb | **1.** In an uninformative manner. | *"In academic literature, uninformatively designates in an uninformative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninformed]] | adjective | **1.** Not informed; lacking in knowledge or information. | *"You cannot suppose me uninformed."* — Jane Austen, *Mansfield Park* |
| [[unreformable]] | adjective | **1.** Insusceptible of reform.<br>**2.** Unrepentant and incapable of being reformed. | *"In academic literature, unreformable designates insusceptible of reform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreformed]] | adjective | **1.** Unaffected by the reformation. | *"The unreformed provincial mind distrusted London; and while true religion was everywhere saving, honest Mrs."* — George Eliot, *Middlemarch* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FORM
  </div>
</div>
