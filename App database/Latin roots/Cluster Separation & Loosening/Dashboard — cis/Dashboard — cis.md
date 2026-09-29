---
status: unread
type: root_dashboard
---
# Dashboard — cis
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cis-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“cut or severed”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Untying a tight knot and separating two parts from each other.</span>
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

The root **cis** means cut or severed. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *wordy*, *rambling*, *circumcise*, and *circumcision*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: cut or severed
> The root **cis** means cut or severed. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *wordy*, *rambling*, *circumcise*, and *circumcision*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Cut or severed</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *wordy* and *rambling*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cis** comes from a Latin word that means *"cut or severed"*.
  - At its core, it describes cut or severed.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **cis** in an English word, think of **separating, loosening, and dividing**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of cut or severed.
  - **Mental & Social**: How people experience, organize, or communicate about cut or severed.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Wordy**: An everyday English word showing the root's idea of *cut or severed*.
  - **Rambling**: An everyday English word showing the root's idea of *cut or severed*.
  - **Circumcise**: To cut off the foreskin of a male as a religious rite or surgical procedure.
  - **Circumcision**: The surgical removal of the foreskin of the penis.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cis</mark>, think of <mark class="hl-def">separating, loosening, and dividing</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Participial Base:** *cis-* $\to$ *concise*, *precise*, *excise*.
- **Prefixation of Directional Cutting:**
  - `prae-` + *cis* $\to$ *precise* (cut off sharply in advance; exact).
  - `con-` + *cis* $\to$ *concise* (cut completely down; brief).
  - `in-` + *cis* $\to$ *incise*, *incision*, *incisive*, *incisor*.
  - `ex-` + *cis* $\to$ *excise* (to cut out tissue/passages), *excision*.
  - `circum-` + *cis* $\to$ *circumcise*, *circumcision*.
  - `dē-` + *cis* $\to$ *decision*, *decisive*, *decisiveness*.

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

### 1. Linguistic & Cognitive Economy
- *concise* (expressing much in few words; brief and to the point).
- *concision* (the quality of being concise; pithiness).
- *precise* (marked by exactness and accuracy of expression or detail).
- *precision* (the quality, condition, or fact of being exact).

### 2. Surgery & Physical Cutting
- *incision* (a surgical cut made in skin or flesh).
- *incisive* (intelligently analytical and clear-thinking; cutting).
- *incisor* (a narrow-edged front tooth adapted for cutting food).
- *excise* (to cut out surgically or censorially).
- *excision* (the act of cutting out or removing).
- *circumcise* (to cut off the foreskin of a male or clitoral hood).
- *scissors* (an instrument used for cutting paper, cloth, or hair).

### 3. Judgment & Resolution
- *decision* (a conclusion or resolution reached after cutting off alternatives).
- *decisive* (settling an issue; producing a definite result; resolute).

---

## 🔀 4. Prefix & Combining Dynamics on cis

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `prae-` + `cis` | Advance boundary | Cut off cleanly at the perimeter; minutely exact | *precise, precision* |
| `con-` + `cis` | Intensive pruning | Sheared of all excess ornamentation; pithy | *concise, concision* |
| `in-` + `cis` + `-ive` | Piercing penetrating | Sharp, penetrating, razor-sharp analytical power | *incisive, incisiveness* |
| `ex-` + `cis` + `-ion` | Surgical removal | Cutting completely out from surrounding tissue | *excise, excision* |
| `circum-` + `cis` | Circular cutting | Trimming completely around the circumference | *circumcise, circumcision* |
| `dē-` + `cis` + `-ive` | Conclusive resolving | Ending doubt with an absolute, sharp resolution | *decisive, decisiveness* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Surgery & Medical Instrumentation:** Incisions (Pfannenstiel, midline), surgical excision of tumors, incisor dental taxonomy.
- **Metrology & Engineering:** Precision measurement (micrometers, tolerance thresholds, accuracy vs precision).
- **Rhetoric, Law & Typography:** Concise drafting of statutory clauses, precise contract definitions, concise abstracts.
- **Craftsmanship & Metallurgy:** Chiseling stone, incising copperplate etchings.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ancistrodon]] | noun | **1.** Copperheads. | *"In academic literature, ancistrodon designates copperheads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumcise]] | verb | **1.** Cut the skin over the clitoris.<br>**2.** Cut the foreskin off male babies or teenage boys. | *"To this day a Hottentot priest never uses an iron knife, but always a sharp splint of quartz, in sacrificing an animal or circumcising a lad."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[circumcision]] | noun | **1.** (roman catholic church and anglican church) feast day celebrating the circumcision of jesus; celebrated on january 1st.<br>**2.** The act of circumcising performed on males eight days after birth as a jewish and muslim religious rite. | *"The legend adds that by command of his god he was the first to introduce circumcision to be practised among his descendants."* — Classic Author, *Hawaiian folk tales* |
| [[cis]] | noun | **1.** An alliance made up of states that had been soviet socialist republics in the soviet union prior to its dissolution in dec 1991.<br>**2.** A unit of radioactivity equal to the amount of a radioactive isotope that decays at the rate of 37,000,000,000 disintegrations per second. | *"I know she goes in for giving a rapid _précis_ of all her guests."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[cisalpine]] | adjective | **1.** On the italian or roman side of the alps. | *"In academic literature, cisalpine designates on the italian or roman side of the alps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cisc]] | noun | **1.** An agency of the canadian government that unifies the intelligence units of canadian law enforcement agencies.<br>**2.** (computer science) a kind of computer architecture that has a large number of instructions hard coded into the cpu chip. | *"In academic literature, cisc designates an agency of the canadian government that unifies the intelligence units of canadian law enforcement agencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cisco]] | noun | **1.** Cold-water fish caught in lake superior and northward.<br>**2.** Important food fish of cold deep lakes of north america. | *"In academic literature, cisco designates cold-water fish caught in lake superior and northward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cislunar]] | adjective | **1.** Situated between the earth and the moon. | *"In academic literature, cislunar designates situated between the earth and the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cismontane]] | adjective | **1.** On this (the speaker's) side of the mountains. | *"In academic literature, cismontane designates on this (the speaker's) side of the mountains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cissy]] | adjective | **1.** Having unsuitable feminine qualities. | *"Cissy Caffrey bent over to him to tease his fat little plucks and the dainty dimple in his chin. —Now, baby, Cissy Caffrey said."* — James Joyce, *Ulysses* |
| [[cistaceae]] | noun | **1.** Shrubs or woody herbs of temperate regions especially mediterranean. | *"In academic literature, cistaceae designates shrubs or woody herbs of temperate regions especially mediterranean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cistercian]] | noun | **1.** Member of an order of monks noted for austerity and a vow of silence. | *"They had rambled round by a road which led to the well-known ruins of the Cistercian abbey behind the mill, the latter having, in centuries past, been attached to the monastic establishment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[cistern]] | noun | **1.** A sac or cavity containing fluid especially lymph or cerebrospinal fluid.<br>**2.** A tank that holds the water used to flush a toilet. | *"O, I would thou didst, So half my Egypt were submerged and made A cistern for scaled snakes!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cisterna]] | noun | **1.** A sac or cavity containing fluid especially lymph or cerebrospinal fluid. | *"In academic literature, cisterna designates a sac or cavity containing fluid especially lymph or cerebrospinal fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cistothorus]] | noun | **1.** Marsh wrens. | *"In academic literature, cistothorus designates marsh wrens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cistron]] | noun | **1.** (genetics) a segment of dna that is involved in producing a polypeptide chain; it can include regions preceding and following the coding dna as well as introns between the exons; it is considered a unit of heredity. | *"In academic literature, cistron designates (genetics) a segment of dna that is involved in producing a polypeptide chain; it can include regions preceding and following the coding dna as well as introns between the exons; it is considered a unit of heredity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cistus]] | noun | **1.** Small to medium-sized evergreen shrubs of southern europe and north africa. | *"In academic literature, cistus designates small to medium-sized evergreen shrubs of southern europe and north africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concise]] | adjective | **1.** Expressing much in few words. | *"Smallweed bears the concise testimony, “A few!” “I have seen something of the profession and something of life, Tony,” says Mr."* — Charles Dickens, *Bleak House* |
| [[concisely]] | adverb | **1.** In a concise manner; in a few words. | *"The name of the place where, and of the person with whom I lived, is my secret,” I replied concisely."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[conciseness]] | noun | **1.** Terseness and economy in writing and speaking achieved by expressing a great deal in just a few words. | *"In academic literature, conciseness designates terseness and economy in writing and speaking achieved by expressing a great deal in just a few words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concision]] | noun | **1.** Terseness and economy in writing and speaking achieved by expressing a great deal in just a few words. | *"In academic literature, concision designates terseness and economy in writing and speaking achieved by expressing a great deal in just a few words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decision]] | noun | **1.** The act of making up your mind about something.<br>**2.** A position or opinion or judgment reached after consideration. | *"So that, from point to point, now have you heard The fundamental reasons of this war, Whose great decision hath much blood let forth, And more thirsts after."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decisive]] | adjective | **1.** Determining or having the power to determine an outcome.<br>**2.** Unmistakable. | *"Yes, I fear so.” “Then, sir,” returns the trooper in a decisive manner, “it appears to me—being naturally in the vagabond way myself—that the sooner he comes out of the street, the better."* — Charles Dickens, *Bleak House* |
| [[decisively]] | adverb | **1.** With firmness.<br>**2.** With finality; conclusively. | *"I have no time to tell you now, Kurt," the mother declared decisively."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decisiveness]] | noun | **1.** The trait of resoluteness as evidenced by firmness of character or purpose.<br>**2.** The quality of being final or definitely settled. | *"She rose and crossed the room toward the door with grim decisiveness."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[excise]] | noun | **1.** A tax that is measured by the amount of business done (not on property or income from real estate).<br>**2.** Remove by erasing or crossing out or as if by drawing a line. | *"Continued ill-success, however, led him, in 1791, to abandon Ellisland, and he moved to Dumfries, where he had obtained a position in the Excise."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[exciseman]] | noun | **1.** Someone who collects taxes for the government. | *"We’ll mak our maut, and we’ll brew our drink, We’ll laugh, sing, and rejoice, man, And mony braw thanks to the meikle black deil, That danc’d awa wi’ th’ Exciseman."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[excision]] | noun | **1.** The omission that is made when an editorial change shortens a written passage.<br>**2.** Surgical removal of a body part or tissue. | *"This branch of study is indispen- sable to the excision of error."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[imprecise]] | adjective | **1.** Not precise. | *"In academic literature, imprecise designates not precise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprecisely]] | adverb | **1.** In an imprecise manner. | *"He scratched imprecisely with his right hand, though insensible of prurition, various points and surfaces of his partly exposed, wholly abluted skin."* — James Joyce, *Ulysses* |
| [[impreciseness]] | noun | **1.** The quality of lacking precision. | *"In academic literature, impreciseness designates the quality of lacking precision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imprecision]] | noun | **1.** The quality of lacking precision. | *"In academic literature, imprecision designates the quality of lacking precision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incise]] | verb | **1.** Make an incision into by carving or cutting. | *"I like introducing lint into wounds (such simple ones as an incised abscess of the breast) with the probe, because if I take trouble enough I can do it without hurting the patient, much to the patient's surprise."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[incised]] | verb | **1.** Make an incision into by carving or cutting.<br>**2.** Sharply and deeply indented. | *"I like introducing lint into wounds (such simple ones as an incised abscess of the breast) with the probe, because if I take trouble enough I can do it without hurting the patient, much to the patient's surprise."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[incision]] | noun | **1.** A depression scratched or carved into a surface.<br>**2.** The cutting of or into body tissues or organs (especially by a surgeon as part of an operation). | *"God make incision in thee, thou art raw."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incisive]] | adjective | **1.** Having or demonstrating ability to recognize or draw fine distinctions.<br>**2.** Suitable for cutting or piercing. | *"The Old Testament was emptied of meaning to fortify the Christian faith with "proof texts." When Jesus quotes the Old Testament, it is for other ends and with a clear, incisive sense of the prophet's meaning."* — T. R. Glover, *The Jesus of History* |
| [[incisively]] | adverb | **1.** In an incisive manner.<br>**2.** In a precise manner. | *"But,” he added, incisively, “I have to consider what I shall do without it, not with it.” Rosamond said no more."* — George Eliot, *Middlemarch* |
| [[incisiveness]] | noun | **1.** Keenness and forcefulness of thought or expression or intellect. | *"In academic literature, incisiveness designates keenness and forcefulness of thought or expression or intellect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incisor]] | noun | **1.** A tooth for cutting or gnawing; located in the front of the mouth in both jaws. | *"Another woman at 247:6 ninety had new teeth, incisors, cuspids, bi- cuspids, and one molar."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[incisura]] | noun | **1.** (anatomy) a notch or small hollow. | *"In academic literature, incisura designates (anatomy) a notch or small hollow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incisure]] | noun | **1.** (anatomy) a notch or small hollow. | *"Which said line, when it is long enough, and without incisures, argues a due strength in the principal members of man, and also constancy; the contrary if it be short, crooked, cut or parted."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[indecision]] | noun | **1.** Doubt concerning two or more possible alternatives or courses of action.<br>**2.** The trait of irresolution; a lack of firmness of character or purpose. | *"With the round top of an inkstand and two broken bits of sealing-wax he is silently and slowly working out whatever train of indecision is in his mind."* — Charles Dickens, *Bleak House* |
| [[indecisive]] | adjective | **1.** Characterized by lack of decision and firmness.<br>**2.** Not definitely settling something. | *"It is the worst evil of too yielding and indecisive a character, that no influence over it can be depended on."* — Jane Austen, *Persuasion* |
| [[indecisively]] | adverb | **1.** Lacking firmness or resoluteness.<br>**2.** Without finality; inconclusively. | *"He still indecisively lingered beside the body."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[indecisiveness]] | noun | **1.** Doubt concerning two or more possible alternatives or courses of action.<br>**2.** The trait of irresolution; a lack of firmness of character or purpose. | *"In academic literature, indecisiveness designates doubt concerning two or more possible alternatives or courses of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precis]] | noun | **1.** A sketchy summary of the main points of an argument or theory.<br>**2.** Make a summary (of). | *"In academic literature, precis designates a sketchy summary of the main points of an argument or theory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precise]] | adjective | **1.** Sharply exact or accurate or delimited.<br>**2.** (of ideas, images, representations, expressions) characterized by perfect conformity to fact or truth ; strictly correct. | *"Never, O never, do his ghost the wrong To hold your honour more precise and nice With others than with him!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precisely]] | adverb | **1.** Indicating exactness or preciseness.<br>**2.** In a precise manner. | *"For full well he knows He cannot so precisely weed this land As his misdoubts present occasion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preciseness]] | noun | **1.** Clarity as a consequence of precision.<br>**2.** The quality of being reproducible in amount or performance. | *"Is all your strict preciseness come to this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precision]] | noun | **1.** The quality of being reproducible in amount or performance. | *"The smaller of its hands, too, occasionally slipped round on the pivot, and thus, though the minutes were told with precision, nobody could be quite certain of the hour they belonged to."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recission]] | noun | **1.** (law) the act of rescinding; the cancellation of a contract and the return of the parties to the positions they would have had if the contract had not been made. | *"In academic literature, recission designates (law) the act of rescinding; the cancellation of a contract and the return of the parties to the positions they would have had if the contract had not been made."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scissors]] | noun | **1.** An edge tool having two crossed pivoting blades.<br>**2.** A wrestling hold in which you wrap your legs around the opponents body or head and put your feet together and squeeze. | *"My master preaches patience to him, and the while His man with scissors nicks him like a fool; And sure (unless you send some present help) Between them they will kill the conjurer."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Separation & Loosening]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CIS
  </div>
</div>
