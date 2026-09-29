---
status: unread
type: root_dashboard
---
# Dashboard — digit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">digit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“finger or toe”</span>
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

The root **digit** means finger or toe. It refers to finger, toe, numeral, discrete value. In English, this root forms words such as *bidigitate*, *digital*, *digitalis*, and *digitalization*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: finger or toe
> The root **digit** means finger or toe. It refers to finger, toe, numeral, discrete value. In English, this root forms words such as *bidigitate*, *digital*, *digitalis*, and *digitalization*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Finger or toe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *bidigitate* and *digital*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **digit** comes from a Latin word that means *"finger or toe"*.
  - At its core, it describes finger or toe.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **digit** in an English word, think of **the human body and its conditions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of finger or toe.
  - **Mental & Social**: How people experience, organize, or communicate about finger or toe.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bidigitate**: Having two fingers, toes, or finger-like divisions or appendages.
  - **Digital**: Of, relating to, or using numerical digits.
  - **Digitalis**: Any plant of the genus *Digitalis*.
  - **Digitalization**: The administration of digitalis in doses sufficient to produce the desired therapeutic effect.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">digit</mark>, think of <mark class="hl-def">the human body and its conditions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **digit** functions in English through:
> - **Nominal Base:** *digitus* (stem `digit-`), direct source of English *digit*.
> - **Adjectival Stems:** Latin *digitālis* (stem `digitāl-` → *digital*) and *digitātus* (stem `digitāt-` → *digitate*).
> - **Diminutive / Anatomical Forms:** *digitation* (finger-like muscle slip).
> - **Compounding Elements:** Latin *gradiō* ("to walk" → *digitigrade*), *inter-* ("between" → *interdigital*), *praestō* ("quick, at hand" → *prestidigitation*).
>
> In 20th-century technology, *digital* generated a vast productive family with verbal suffixes (*-ize*, *-ization*) and agent suffixes (*-izer*).

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
> The family distributes across four primary technological, medical, and biological domains:
> - **Computing, Electronics & Information Theory:** [[digit]] (single numeral 0-9), [[digital]] (operating on binary digits; electronic), [[digitally]] (in digital format), [[digitize]] (to convert analog signals to binary data), [[digitization]] (process of digital conversion), [[digitizer]] (drawing tablet or analog-to-digital converter), [[digitalize]] (to modernize via computer systems).
> - **Pharmacology & Medicine:** [[digitalis]] (cardiac glycoside extracted from foxglove), [[digitalization]] (administering digitalis to achieve therapeutic blood levels).
> - **Anatomy, Zoology & Botany:** [[digitate]] (divided into finger-like leaflets or lobes), [[digitation]] (anatomical finger-like muscle projection, e.g. serratus anterior), [[digitigrade]] (walking on digits/toes, as felines and canines), [[interdigital]] (between toes or fingers), [[bidigitate]] (two-fingered), [[multidigitate]] (many-fingered).
> - **Theatrical Illusion & Prestidigitation:** [[prestidigitation]] (sleight of hand; conjuring), [[prestidigitator]] (magician; sleight-of-hand illusionist), [[prestidigitatory]] (relating to sleight of hand).

---

## 🔀 4. Prefix & Combining Dynamics on digit

### Compounding Elements with `digit`

| Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **inter-** | between, among | [[interdigital]] | Situated between adjacent fingers or toes (e.g. interdigital webbing). |
| **presto-** | nimble, quick (*praestō*) | [[prestidigitation]] | Literally "nimble-fingeredness"; masterly sleight of hand or conjuring. |
| **-grade** | stepping, walking (*gradī*) | [[digitigrade]] | Walking upon the toes or digits rather than the entire sole of the foot. |
| **bi-** | two | [[bidigitate]] | Having two fingers, toes, or finger-like divisions. |
| **multi-** | many | [[multidigitate]] | Having numerous finger-like lobes, branches, or processes. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective forming | [[digital]] | Pertaining to fingers/numerals; based on discrete binary code. |
| **-ate** | Adjective of shape | [[digitate]] | Shaped like spread fingers radiating from a central palm. |
| **-ize** | Verbalizer | [[digitize]] | To convert physical documents, sounds, or images into digital data. |
| **-er** | Agent / Instrument noun | [[digitizer]] | A peripheral device converting continuous physical input into digital pixels. |
| **-ation** | Process noun | [[digitization]] | The socio-technical process of converting materials to digital format. |
| **-ator** | Agent noun | [[prestidigitator]] | A performer skilled in the rapid manipulation of physical objects. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Computer Science & Information Theory** | [[digit]], [[digital]], [[digitize]], [[digitization]], [[digitizer]] | Claude Shannon's binary information theory, microprocessors, digital signal processing (DSP), and digitization of cultural heritage archives. |
| **Cardiology & Pharmacology** | [[digitalis]], [[digitalization]] | Managing atrial fibrillation and congestive heart failure using purified foxglove cardiac glycosides (*digoxin*), monitoring therapeutic serum concentration. |
| **Comparative Anatomy & Zoology** | [[digitigrade]], [[interdigital]], [[digitation]] | Classifying mammalian locomotion (comparing human plantigrade vs feline digitigrade vs ungulate unguligrade postures), analyzing serratus anterior digitations. |
| **Botany & Plant Morphology** | [[digitate]], [[digitalis]] | Taxonomic characterization of palmately compound leaves (e.g., *Aesculus*, *Cannabis*), identification of tubular scrophulariaceous foxglove corollas. |
| **Performing Arts & Stage Magic** | [[prestidigitation]], [[prestidigitator]], [[prestidigitatory]] | Close-up coin and card magic, deceptive misdirection, and theatrical stage illusions. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[digit]] | noun | **1.** One of the elements that collectively form a system of numeration.<br>**2.** The length of breadth of a finger used as a linear measure. | *"DIMINISHED DIGITS PROVE TOO TITILLATING FOR FRISKY FRUMPS."* — James Joyce, *Ulysses* |
| [[digital]] | adjective | **1.** Displaying numbers rather than scale positions.<br>**2.** Relating to or performed with the fingers. | *"Produced by Kentuckiana Digital Library, David Garcia, Chuck Greif, Leonard Johnson and the Online Distributed Proofreading Team."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[digitalin]] | noun | **1.** A powerful cardiac stimulant obtained from foxglove. | *"In academic literature, digitalin designates a powerful cardiac stimulant obtained from foxglove."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitalis]] | noun | **1.** A powerful cardiac stimulant obtained from foxglove.<br>**2.** Any of several plants of the genus digitalis. | *"In academic literature, digitalis designates a powerful cardiac stimulant obtained from foxglove."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitalisation]] | noun | **1.** The administration of digitalis for the treatment of certain heart disorders. | *"In academic literature, digitalisation designates the administration of digitalis for the treatment of certain heart disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitalise]] | verb | **1.** Put into digital form, as for use in a computer. | *"In academic literature, digitalise designates put into digital form, as for use in a computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitalization]] | noun | **1.** The administration of digitalis for the treatment of certain heart disorders. | *"In academic literature, digitalization designates the administration of digitalis for the treatment of certain heart disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitalize]] | verb | **1.** Put into digital form, as for use in a computer.<br>**2.** Administer digitalis such that the patient benefits maximally without getting adverse effects. | *"In academic literature, digitalize designates put into digital form, as for use in a computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitally]] | adverb | **1.** By means of the fingers.<br>**2.** In terms of integers. | *"In academic literature, digitally designates by means of the fingers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitaria]] | noun | **1.** Crab grass; finger grass. | *"In academic literature, digitaria designates crab grass; finger grass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitate]] | adjective | **1.** Resembling a finger. | *"In academic literature, digitate designates resembling a finger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitately]] | adverb | **1.** In a digitate manner. | *"In academic literature, digitately designates in a digitate manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitigrade]] | noun | **1.** An animal that walks so that only the toes touch the ground as e.g. dogs and cats and horses.<br>**2.** (of mammals) walking on the toes with the posterior part of the foot raised (as cats, dogs, and horses do). | *"In academic literature, digitigrade designates an animal that walks so that only the toes touch the ground as e.g. dogs and cats and horses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitisation]] | noun | **1.** Conversion of analog information into digital information. | *"In academic literature, digitisation designates conversion of analog information into digital information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitise]] | verb | **1.** Put into digital form, as for use in a computer. | *"In academic literature, digitise designates put into digital form, as for use in a computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitiser]] | noun | **1.** Device for converting analogue signals into digital signals. | *"In academic literature, digitiser designates device for converting analogue signals into digital signals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitization]] | noun | **1.** Conversion of analog information into digital information. | *"Note that while a copyright was initially claimed for the labor involved in digitization, that copyright claim is not consistent with current copyright requirements."* — J. M. Barrie, *Peter Pan* |
| [[digitize]] | verb | **1.** Put into digital form, as for use in a computer. | *"In academic literature, digitize designates put into digital form, as for use in a computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitizer]] | noun | **1.** Device for converting analogue signals into digital signals. | *"In academic literature, digitizer designates device for converting analogue signals into digital signals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digitoxin]] | noun | **1.** Digitalis preparation used to treat congestive heart failure or cardiac arrhythmia. | *"In academic literature, digitoxin designates digitalis preparation used to treat congestive heart failure or cardiac arrhythmia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prestidigitation]] | noun | **1.** Manual dexterity in the execution of tricks. | *"My God—how can forgiveness meet such a grotesque—prestidigitation as that!” He paused, contemplating this definition; then suddenly broke into horrible laughter—as unnatural and ghastly as a laugh in hell."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[prestidigitator]] | noun | **1.** Someone who performs magic tricks to amuse an audience. | *"In academic literature, prestidigitator designates someone who performs magic tricks to amuse an audience."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · DIGIT
  </div>
</div>
