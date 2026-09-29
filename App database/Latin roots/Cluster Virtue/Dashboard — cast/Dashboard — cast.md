---
status: unread
type: root_dashboard
---
# Dashboard — cast
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cast-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“pure or chaste”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing up courageously for what is fair, moral, and honorable.</span>
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

The root **cast** means pure or chaste. It describes being morally upright, modest, or uncorrupted. In English, this root forms words such as *chaste*, *chastity*, *unchaste*, and *castigate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: pure or chaste
> The root **cast** means pure or chaste. It describes being morally upright, modest, or uncorrupted. In English, this root forms words such as *chaste*, *chastity*, *unchaste*, and *castigate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Pure or chaste</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing up courageously for what is fair, moral, and honorable.</mark>
> - **Everyday Connection**: Think of familiar words like *chaste* and *chastity*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cast** comes from a Latin word that means *"pure or chaste"*.
  - At its core, it describes the quality or state of being pure or chaste.

- **The Big Picture Idea**:
  - Picture standing up courageously for what is fair, moral, and honorable.
  - Whenever you see **cast** in an English word, think of **virtue, integrity, and good character**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are pure or chaste.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Chaste**: Abstaining from extramarital, or from all, sexual intercourse.
  - **Chastity**: The state or practice of refraining from sexual intercourse.
  - **Unchaste**: Not chaste.
  - **Castigate**: To reprimand or censure someone severely in speech or writing.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cast</mark>, think of <mark class="hl-def">virtue, integrity, and good character</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `cast-` (< Latin *castus*): Base adjectival root.
  - `chast-` (Old French development): *chaste, chastity, chastise*.
  - `castig-` (< Latin *castīgāre*): *castigate, castigation*.
  - `incest-` (< Latin *incestus*, with vowel weakening $a 	o e$): *incest, incestuous*.
- **Prefix & Suffix Dynamics**:
  - `in-` ("not, un-"): *unchaste, incest* (< *in-* + *castus*).
  - `-ity`: *chastity*.
  - `-ate`: *castigate*.
  - `-ise` / `-ize`: *chastise*.

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
```
                      ┌── Bodily & Moral Purity: chaste, chastity, unchaste
                      │
   [cast] ────────────┼── Corrective Censure & Discipline: castigate, castigation, chastise, chastisement
 (Pure / Severed)     │
                      ├── Sociological Stratification: caste
                      │
                      └── Taboo Transgression: incest, incestuous
```

---

## 🔀 4. Prefix & Combining Dynamics on cast
- **`cast-` + `agere`**: *castigate* — to reprove severely in speech or writing.
- **`in-` + `cast`**: *incest* — forbidden sexual transgression violating sacred blood boundaries.
- **`un-` + `chaste`**: *unchaste* — lacking moral or sexual restraint.
- **`cast-` + `-e`**: *caste* — an inherited, rigid social division based on perceived lineage.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Theology & Monastic Ethics**: Vows of *chastity*, celibacy, and spiritual purity.
- **Sociology & Anthropology**: The Indian *caste* system; endogamous social hierarchies.
- **Literary & Political Criticism**: *Castigation* of governmental corruption in political satire.
- **Criminal Jurisprudence**: Statutory definitions and prosecution of *incestuous* offenses.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cast]] | noun | **1.** The actors in a play.<br>**2.** Container into which liquid is poured to create a given shape when it hardens. | *"Then if he thrive and I be cast away, The worst was this: my love was my decay. 81 Or I shall live your epitaph to make, Or you survive when I in earth am rotten, From hence your memory death cannot take, Although in me each part will be forgotten."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castanea]] | noun | **1.** Chestnuts; chinkapins. | *"In academic literature, castanea designates chestnuts; chinkapins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castanets]] | noun | **1.** A percussion instrument consisting of a pair of hollow pieces of wood or bone (usually held between the thumb and fingers) that are made to click together (as by spanish dancers) in rhythm with the dance. | *"The tall chimney clusters were black against the sky, and beneath them and about the overgrown porch the ivy leaves clattered bonely like fairy castanets."* — S. R. Crockett, *Deep Moat Grange* |
| [[castanopsis]] | noun | **1.** Evergreen trees and shrubs of warm regions valued for their foliage; southeastern united states and eastern australia and northern new zealand. | *"In academic literature, castanopsis designates evergreen trees and shrubs of warm regions valued for their foliage; southeastern united states and eastern australia and northern new zealand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castanospermum]] | noun | **1.** A rosid dicot genus of the subfamily papilionoideae having one species: moreton bay chestnut. | *"In academic literature, castanospermum designates a rosid dicot genus of the subfamily papilionoideae having one species: moreton bay chestnut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castaway]] | noun | **1.** A person who is rejected (from society or home).<br>**2.** A shipwrecked person. | *"That ever I should call thee castaway!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[caste]] | noun | **1.** Social status or position conferred by a system based on class.<br>**2.** (hinduism) a hereditary social class among hindus; stratified according to ritual purity. | *"None of these were clothed to any extent worth mentioning, each appearing to have hit in the matter of raiment the decent mean between a high and low caste Hindoo."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[casteless]] | adjective | **1.** Not belonging to or having been expelled from a caste and thus having no place or status in society. | *"In academic literature, casteless designates not belonging to or having been expelled from a caste and thus having no place or status in society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castellated]] | adjective | **1.** Having or resembling repeated square indentations like those in a battlement. | *"His family mansion is an old castellated manor-house, gray with age, and of a most venerable though weather-beaten appearance."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[caster]] | noun | **1.** A worker who casts molten metal into finished products.<br>**2.** A shaker with a perforated top for sprinkling powdered sugar. | *"There is a saltcellar of state, so called, and there may be a caster of state."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[castigate]] | verb | **1.** Censure severely.<br>**2.** Inflict severe punishment on. | *"If thou didst put this sour cold habit on To castigate thy pride, ’twere well; but thou Dost it enforcedly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castigation]] | noun | **1.** A severe scolding.<br>**2.** Verbal punishment. | *"This hand of yours requires A sequester from liberty, fasting and prayer, Much castigation, exercise devout; For here’s a young and sweating devil here That commonly rebels. ’Tis a good hand, A frank one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castile]] | noun | **1.** A region of central spain; a former kingdom that comprised most of modern spain and united with aragon to form spain in 1479. | *"BLANCHE OF SPAIN, Daughter to Alphonso, King of Castile, and Niece to King John."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castilian]] | noun | **1.** The spanish language as spoken in castile. | *"The Nauras Indians of New Granada ate the hearts of Spaniards when they had the opportunity, hoping thereby to make themselves as dauntless as the dreaded Castilian chivalry."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[castilla]] | noun | **1.** A region of central spain; a former kingdom that comprised most of modern spain and united with aragon to form spain in 1479. | *"In academic literature, castilla designates a region of central spain; a former kingdom that comprised most of modern spain and united with aragon to form spain in 1479."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castilleia]] | noun | **1.** Genus of western north and south american perennials often partially parasitic on roots of grasses. | *"In academic literature, castilleia designates genus of western north and south american perennials often partially parasitic on roots of grasses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castilleja]] | noun | **1.** Genus of western north and south american perennials often partially parasitic on roots of grasses. | *"In academic literature, castilleja designates genus of western north and south american perennials often partially parasitic on roots of grasses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castillian]] | noun | **1.** A native or inhabitant of castile. | *"In academic literature, castillian designates a native or inhabitant of castile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[casting]] | noun | **1.** Object formed by a mold.<br>**2.** The act of creating something by casting it in a mold. | *"Wolves and bears, they say, Casting their savageness aside, have done Like offices of pity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castle]] | noun | **1.** A large and stately mansion.<br>**2.** A large building formerly occupied by a ruler and fortified against attack. | *"A platform before the Castle Scene II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[castled]] | verb | **1.** Move the king two squares toward a rook and in the same move the rook to the square next past the king.<br>**2.** Having or resembling repeated square indentations like those in a battlement. | *"And ever, till my heart has ceased to beat, though I should roam in foreign lands, along the castled Rhine, or beneath the sunny skies of classic Italy, Mount Washington will be to me the glory of the earth!"* — Effie Afton, *Eventide* |
| [[castling]] | noun | **1.** Interchanging the positions of the king and a rook.<br>**2.** Move the king two squares toward a rook and in the same move the rook to the square next past the king. | *"In academic literature, castling designates interchanging the positions of the king and a rook."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castor]] | noun | **1.** A multiple star with 6 components; second brightest in gemini; close to pollux.<br>**2.** A shaker with a perforated top for sprinkling powdered sugar. | *"For, my young friends,” suddenly addressing the ’prentices and Guster, to their consternation, “if I am told by the doctor that calomel or castor-oil is good for me, I may naturally ask what is calomel, and what is castor-oil."* — Charles Dickens, *Bleak House* |
| [[castoridae]] | noun | **1.** Beavers. | *"Classical and authoritative lexicons catalog castoridae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castoroides]] | noun | **1.** Extinct beavers of the pleistocene; of eastern and southern united states. | *"In academic literature, castoroides designates extinct beavers of the pleistocene; of eastern and southern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castrate]] | noun | **1.** A man who has been castrated and is incapable of reproduction.<br>**2.** Deprive of strength or vigor. | *"The story of the self-mutilation of Attis is clearly an attempt to account for the self-mutilation of his priests, who regularly castrated themselves on entering the service of the goddess."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[castrated]] | verb | **1.** Deprive of strength or vigor.<br>**2.** Edit by omitting or modifying parts considered indelicate. | *"The story of the self-mutilation of Attis is clearly an attempt to account for the self-mutilation of his priests, who regularly castrated themselves on entering the service of the goddess."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[castration]] | noun | **1.** Neutering a male animal by removing the testicles.<br>**2.** Surgical removal of the testes or ovaries (usually to inhibit hormone secretion in cases of breast cancer in women or prostate cancer in men). | *"Several of his fife and drum boys were Mohammedanized, and placed in the seraglio for the purpose of castration; but this operation never took place: and many of his principal officers left him for Bombay, prior to his being captured."* — James Scurry, *The captivity, sufferings, and escape of James Scurry* |
| [[castrato]] | noun | **1.** A male singer who was castrated before puberty and retains a soprano or alto voice. | *"In academic literature, castrato designates a male singer who was castrated before puberty and retains a soprano or alto voice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castries]] | noun | **1.** A port on the island of saint lucia; capital and largest city of saint lucia. | *"In academic literature, castries designates a port on the island of saint lucia; capital and largest city of saint lucia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castro]] | noun | **1.** Cuban socialist leader who overthrew a dictator in 1959 and established a marxist socialist state in cuba (born in 1927). | *"In academic literature, castro designates cuban socialist leader who overthrew a dictator in 1959 and established a marxist socialist state in cuba (born in 1927)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[castroism]] | noun | **1.** A form of communism developed in cuba by fidel castro. | *"In academic literature, castroism designates a form of communism developed in cuba by fidel castro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscast]] | verb | **1.** Cast an actor, singer, or dancer in an unsuitable role. | *"In academic literature, miscast designates cast an actor, singer, or dancer in an unsuitable role."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcast]] | noun | **1.** The state of the sky when it is covered by clouds.<br>**2.** Gloomy semidarkness caused by cloud cover. | *"Hie therefore, Robin, overcast the night; The starry welkin cover thou anon With drooping fog, as black as Acheron, And lead these testy rivals so astray As one come not within another’s way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overcasting]] | noun | **1.** A long whipstitch or overhand stitch overlying an edge to prevent raveling.<br>**2.** Make overcast or cloudy. | *"It was bright and clear still, though the morning was overcasting a little, as we passed through the meadows."* — S. R. Crockett, *Deep Moat Grange* |
| [[precast]] | adjective | **1.** Of structural members especially of concrete; cast into form before being transported to the site of installation. | *"In academic literature, precast designates of structural members especially of concrete; cast into form before being transported to the site of installation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recast]] | verb | **1.** Cast again, in a different role.<br>**2.** Cast again. | *"Jesus entirely recast mankind's common ideas of holiness."* — T. R. Glover, *The Jesus of History* |
| [[recasting]] | noun | **1.** Changing a particular word or phrase.<br>**2.** Cast again, in a different role. | *"In academic literature, recasting designates changing a particular word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncastrated]] | adjective | **1.** Not castrated. | *"In academic literature, uncastrated designates not castrated."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Virtue]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAST
  </div>
</div>
