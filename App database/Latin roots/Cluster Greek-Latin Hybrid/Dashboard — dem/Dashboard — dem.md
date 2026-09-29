---
status: unread
type: root_dashboard
---
# Dashboard — dem
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dem-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“people”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **dem** means people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *demagogue*, *demagogic*, *demagogical*, and *demagogically*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: people
> The root **dem** means people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *demagogue*, *demagogic*, *demagogical*, and *demagogically*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">People</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *demagogue* and *demagogic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dem** comes from a Latin word that means *"people"*.
  - At its core, it describes people.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **dem** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of people.
  - **Mental & Social**: How people experience, organize, or communicate about people.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Demagogue**: A political leader who seeks support by appealing to popular desires, prejudices, and fears rather than rational argument.
  - **Demagogic**: Pertaining to, characteristic of, or resembling a demagogue.
  - **Demagogical**: Demagogic.
  - **Demagogically**: In a demagogic manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dem</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **dem-** functions across three primary structural tracks:
> - **Political & Civic Combining Form:** `demo-` (attaching to governance, leadership, and statistics: *democracy*, *democrat*, *demagogue*, *demography*, *demonym*, *democide*)
> - **Epidemiological Prefixed Combining Form:** `-dem-ic` (governed by spatial prefixes: *epi-demic*, *pan-demic*, *en-demic*, *syn-demic*)
> - **Direct Nominal & Linguistic Adjectives:** `demotic` (popular script/speech), `demos` (the electorate), `deme` (Attic township or genetic population)
> - **Factitive Compounds:** `dēmiourgós` (*dēmios* "public" + *érgon* "work", yielding *demiurge*, *demiurgic*)

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
> The semantic power of `dem` radiates across five primary operational zones:
> - **Governance, Sovereignty & Suffrage:** *democracy*, *democratic*, *democratize*, *democratization* denote governance by majority vote, universal human rights, and citizen rule.
> - **Political Manipulation & Populism:** *demagogue*, *demagogy*, *demagoguery*, *demagogic* describe leaders who pander to tribal prejudice, fear, and anti-intellectual grievance.
> - **Infectious Disease & Public Health:** *epidemic*, *pandemic*, *endemic*, *epidemiology*, *syndemic* track disease transmission across human populations.
> - **Statistical Population Science:** *demography*, *demographic*, *demographics*, *demographer* analyze population birth rates, aging, migration, and income strata.
> - **Language, Script & Philosophy:** *demotic* designates everyday colloquial language and the popular Egyptian cursive script; *demiurge* names the cosmic artisan.

---

## 🔀 4. Prefix & Combining Dynamics on dem

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `epi-` (Greek) | upon, on, over | [[epidemic]], [[epidemiology]] | Falling *upon* the populace; a sudden widespread outbreak of disease. |
| `pan-` (Greek) | all, universal | [[pandemic]], [[pandemically]] | Striking *all* the people; a global disease outbreak. |
| `en-` (Greek) | in, within | [[endemic]], [[endemism]] | Dwelling permanently *within* a localized population or region. |
| `syn-` (Greek) | together, synergistic | [[syndemic]] | Two or more epidemics interacting *together* to exacerbate social pathology. |
| `un-` (English) | not (privative) | [[undemocratic]] | Violating the principles of popular sovereignty and fair elections. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix / Second Element | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-cracy` (< *krátos*, power) | Noun (System of Rule) | [[democracy]] | Government by the sovereign people. |
| `-agogue` (< *agōgós*, leader)| Noun (Leader / Instigator) | [[demagogue]] | A politician who leads the people through passion and prejudice. |
| `-graphy` (< *graphein*) | Noun (Measurement / Study) | [[demography]] | The statistical study and mapping of human populations. |
| `-onym` (< *onyma*, name) | Noun (Naming Form) | [[demonym]] | A term identifying people from a specific geographic location. |
| `-cide` (< Latin *caedere*) | Noun (Act of Killing) | [[democide]] | The mass murder of citizens by their own government. |
| `-ic` | Adjective (Pertaining to) | [[democratic]], [[demotic]], [[endemic]] | Pertaining to the common people, democratic institutions, or localized diseases. |
| `-ize` | Verb (Causative / Transition) | [[democratize]] | To bring an institution or society into conformity with democratic principles. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Political Science & Constitutional Law** | [[democracy]], [[democratization]], [[demagogue]] | Parliamentary elections; electoral college debates; constitutional checks against demagoguery; totalitarian backsliding. |
| 🩺 **Public Health & Global Epidemiology**| [[epidemic]], [[pandemic]], [[endemic]], [[epidemiology]] | WHO disease surveillance; COVID-19 pandemic response; malaria endemicity in sub-Saharan Africa; contact tracing. |
| 📊 **Economics, Marketing & Demography** | [[demography]], [[demographics]], [[demographic]] | Census population pyramids; aging demographic trends; consumer marketing target demographics; social security planning. |
| 📜 **Egyptology & Historical Linguistics** | [[demotic]], [[demonym]] | Deciphering the Rosetta Stone (inscribed in Hieroglyphic, Demotic, and Greek); regional demonyms (*New Yorker, Parisian*). |
| 🌌 **Metaphysics & Ancient Philosophy** | [[demiurge]], [[demiurgic]] | Plato's *Timaeus* (the Demiurge shaping the material universe); Gnostic religious cosmology. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[condemn]] | verb | **1.** Express strong disapproval of.<br>**2.** Declare or judge unfit for use or habitation. | *"Well, we cannot greatly condemn our success: some dishonour we had in the loss of that drum, but it is not to be recovered."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[condemnable]] | adjective | **1.** Bringing or deserving severe rebuke or censure. | *"In academic literature, condemnable designates bringing or deserving severe rebuke or censure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[condemnation]] | noun | **1.** An expression of strong disapproval; pronouncing as wrong or morally culpable.<br>**2.** (law) the act of condemning (as land forfeited for public use) or judging to be unfit for use (as a food product or an unsafe building). | *"Speak, or thy silence on the instant is Thy condemnation and thy death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[condemnatory]] | adjective | **1.** Containing or imposing condemnation or censure. | *"I do not think she will manage it; and yet it might be managed; and his wife might, I verily believe, be the very happiest woman the sun shines on.” I have not yet said anything condemnatory of Mr."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[condemning]] | verb | **1.** Express strong disapproval of.<br>**2.** Declare or judge unfit for use or habitation. | *"Nature wants stuff To vie strange forms with fancy; yet t’ imagine An Antony were nature’s piece ’gainst fancy, Condemning shadows quite."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[counterdemonstration]] | noun | **1.** A demonstration held in opposition to another demonstration. | *"In academic literature, counterdemonstration designates a demonstration held in opposition to another demonstration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterdemonstrator]] | noun | **1.** Someone who demonstrates in opposition to another demonstration. | *"In academic literature, counterdemonstrator designates someone who demonstrates in opposition to another demonstration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetisation]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetisation designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetise]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetise designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetization]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetization designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetize]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetize designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagog]] | noun | **1.** A political leader who seeks support by appealing to popular passions and prejudices. | *"In academic literature, demagog designates a political leader who seeks support by appealing to popular passions and prejudices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagogic]] | adjective | **1.** Characteristic of or resembling a demagogue. | *"In academic literature, demagogic designates characteristic of or resembling a demagogue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagogical]] | adjective | **1.** Characteristic of or resembling a demagogue. | *"In academic literature, demagogical designates characteristic of or resembling a demagogue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagogue]] | noun | **1.** A political leader who seeks support by appealing to popular passions and prejudices. | *"Do you know that the orange lodges agitated for repeal of the union twenty years before O’Connell did or before the prelates of your communion denounced him as a demagogue?"* — James Joyce, *Ulysses* |
| [[demagoguery]] | noun | **1.** Impassioned appeals to the prejudices and emotions of the populace. | *"The respectable support which the measure has latterly received has cast out of the struggle the Kearneys and Kallochs, and if there be demagoguery on either side, it comes in better dress than ever before."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[demagogy]] | noun | **1.** Impassioned appeals to the prejudices and emotions of the populace. | *"In academic literature, demagogy designates impassioned appeals to the prejudices and emotions of the populace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demand]] | noun | **1.** An urgent or peremptory request.<br>**2.** The ability and desire to purchase goods and services. | *"Her father bequeath’d her to me, and she herself, without other advantage, may lawfully make title to as much love as she finds; there is more owing her than is paid, and more shall be paid her than she’ll demand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demander]] | noun | **1.** A person who makes demands. | *"In academic literature, demander designates a person who makes demands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demanding]] | verb | **1.** Request urgently and forcefully.<br>**2.** Require as useful, just, or proper. | *"It is only by resenting them, and by revenging them in my mind, and by angrily demanding the justice I never get, that I am able to keep my wits together."* — Charles Dickens, *Bleak House* |
| [[demandingly]] | adverb | **1.** In a demanding manner. | *"In academic literature, demandingly designates in a demanding manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demantoid]] | noun | **1.** A green andradite used as a gemstone. | *"In academic literature, demantoid designates a green andradite used as a gemstone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demarcate]] | verb | **1.** Separate clearly, as if by boundaries.<br>**2.** Set, mark, or draw the boundaries of something. | *"In academic literature, demarcate designates separate clearly, as if by boundaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demarcation]] | noun | **1.** The boundary of a specific area.<br>**2.** A conceptual separation or distinction. | *"The line of demarcation between savings banks and savings departments of commercial banks cannot be sharply drawn."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[demarche]] | noun | **1.** A move or step or maneuver in political or diplomatic affairs. | *"In academic literature, demarche designates a move or step or maneuver in political or diplomatic affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demasculinise]] | verb | **1.** Remove the testicles of a male animal. | *"In academic literature, demasculinise designates remove the testicles of a male animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demasculinize]] | verb | **1.** Remove the testicles of a male animal. | *"In academic literature, demasculinize designates remove the testicles of a male animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dematerialise]] | verb | **1.** Become immaterial; disappear. | *"In academic literature, dematerialise designates become immaterial; disappear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dematerialize]] | verb | **1.** Become immaterial; disappear. | *"In academic literature, dematerialize designates become immaterial; disappear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dematiaceae]] | noun | **1.** Family of imperfect mushrooms having dark-colored hyphae or conidia. | *"In academic literature, dematiaceae designates family of imperfect mushrooms having dark-colored hyphae or conidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demavend]] | noun | **1.** An active volcano in northern iran. | *"In academic literature, demavend designates an active volcano in northern iran."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demean]] | verb | **1.** Reduce in worth or character, usually verbally. | *"Now, out of doubt Antipholus is mad, Else would he never so demean himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demeaning]] | verb | **1.** Reduce in worth or character, usually verbally.<br>**2.** Causing awareness of your shortcomings. | *"No person, demeaning himself in a peaceable and orderly manner, shall ever be molested on account of his mode of worship or religious sentiments, in the said Territory."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[demeaningly]] | adverb | **1.** In a humiliating manner. | *"In academic literature, demeaningly designates in a humiliating manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demeanor]] | noun | **1.** (behavioral attributes) the way a person behaves toward other people. | *"Ride, ride, Messala, ride, and give these bills Unto the legions on the other side. [_Loud alarum._] Let them set on at once; for I perceive But cold demeanor in Octavius’ wing, And sudden push gives them the overthrow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demeanour]] | noun | **1.** (behavioral attributes) the way a person behaves toward other people. | *"If you will jest with me, know my aspect, And fashion your demeanour to my looks, Or I will beat this method in your sconce."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demented]] | adjective | **1.** Affected with madness or insanity. | *"I dug eagerly, and now and then caught myself actually looking, with something that very much resembled expectation, for the fancied treasure, the vision of which had demented my unfortunate companion."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[dementedly]] | adverb | **1.** In an insane manner. | *"In academic literature, dementedly designates in an insane manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dementedness]] | noun | **1.** Mental deterioration of organic or functional origin. | *"In academic literature, dementedness designates mental deterioration of organic or functional origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dementia]] | noun | **1.** Mental deterioration of organic or functional origin. | *"Evils cast out It is recorded that once Jesus asked the name of a dis- ease, - a disease which moderns would call /dementia/. 411:15 The demon, or evil, replied that his name was Legion."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[demerara]] | noun | **1.** A light brown raw cane sugar from guyana.<br>**2.** A river in northern guyana that flows northward into the atlantic. | *"Want to make good pastry, butter, best flour, Demerara sugar, or they’d taste it with the hot tea."* — James Joyce, *Ulysses* |
| [[demerit]] | noun | **1.** A mark against a person for misconduct or failure; usually given in school or armed forces.<br>**2.** The quality of being inadequate or falling short of perfection. | *"These irregularities of judgment, I imagine, are found even in riper minds than Mary Garth’s: our impartiality is kept for abstract merit and demerit, which none of us ever saw."* — George Eliot, *Middlemarch* |
| [[demerol]] | noun | **1.** A synthetic narcotic drug (trade name demerol) used to treat pain. | *"In academic literature, demerol designates a synthetic narcotic drug (trade name demerol) used to treat pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demesne]] | noun | **1.** Extensive landed property (especially in the country) retained by the owner for his own use.<br>**2.** Territory over which rule or control is exercised. | *"As for you, Chettam, you are spending a fortune on those oak fences round your demesne.” Dorothea, submitting uneasily to this discouragement, went with Celia into the library, which was her usual drawing-room."* — George Eliot, *Middlemarch* |
| [[demeter]] | noun | **1.** (greek mythology) goddess of fertility and protector of marriage in ancient mythology; counterpart of roman ceres. | *"He called her Artemis, Demeter, and other fanciful names half teasingly, which she did not like because she did not understand them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[demetrius]] | noun | **1.** Son of antigonus cyclops and king of macedonia; he and his father were defeated at the battle of ipsus (337-283 bc). | *"Speak not to us. [_Exeunt Antony and Cleopatra with the Train._] DEMETRIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demi-glaze]] | noun | **1.** Sauce espagnole with extra beef stock simmered down and seasoned with dry wine or sherry. | *"In academic literature, demi-glaze designates sauce espagnole with extra beef stock simmered down and seasoned with dry wine or sherry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demiglace]] | noun | **1.** Sauce espagnole with extra beef stock simmered down and seasoned with dry wine or sherry. | *"In academic literature, demiglace designates sauce espagnole with extra beef stock simmered down and seasoned with dry wine or sherry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demigod]] | noun | **1.** A person with great powers and abilities.<br>**2.** A person who is part mortal and part god. | *"Like a demigod here sit I in the sky, And wretched fools’ secrets heedfully o’er-eye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demijohn]] | noun | **1.** Large bottle with a short narrow neck; often has small handles at neck and is enclosed in wickerwork. | *"Every now and then he lugged off to the mountain a great round demijohn of a calabash, and, panting with his exertions, brought it back filled with his darling fluid."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[demilitarise]] | verb | **1.** Do away with the military organization and potential of.<br>**2.** Remove offensive capability from. | *"In academic literature, demilitarise designates do away with the military organization and potential of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demilitarize]] | verb | **1.** Do away with the military organization and potential of.<br>**2.** Remove offensive capability from. | *"In academic literature, demilitarize designates do away with the military organization and potential of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demille]] | noun | **1.** United states film maker remembered for his extravagant and spectacular epic productions (1881-1959). | *"In academic literature, demille designates united states film maker remembered for his extravagant and spectacular epic productions (1881-1959)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demimondaine]] | noun | **1.** A woman whose sexual promiscuity places her outside respectable society. | *"Angels much prostitutes like and holy apostles big damn ruffians. _Demimondaines_ nicely handsome sparkling of diamonds very amiable costumed."* — James Joyce, *Ulysses* |
| [[demimonde]] | noun | **1.** A class of woman not considered respectable because of indiscreet or promiscuous behavior. | *"In academic literature, demimonde designates a class of woman not considered respectable because of indiscreet or promiscuous behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralisation]] | noun | **1.** Abnormal loss of mineral salts (especially from bone).<br>**2.** The removal of minerals and mineral salts from a liquid (especially from water). | *"In academic literature, demineralisation designates abnormal loss of mineral salts (especially from bone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralise]] | verb | **1.** Remove the minerals or salts from. | *"In academic literature, demineralise designates remove the minerals or salts from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralization]] | noun | **1.** Abnormal loss of mineral salts (especially from bone).<br>**2.** The removal of minerals and mineral salts from a liquid (especially from water). | *"In academic literature, demineralization designates abnormal loss of mineral salts (especially from bone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demineralize]] | verb | **1.** Remove the minerals or salts from. | *"In academic literature, demineralize designates remove the minerals or salts from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demise]] | noun | **1.** The time when something ends.<br>**2.** Transfer by a lease or by a will. | *"Tell me what state, what dignity, what honour, Canst thou demise to any child of mine?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demisemiquaver]] | noun | **1.** A musical note having the time value of a thirty-second of a whole note. | *"In academic literature, demisemiquaver designates a musical note having the time value of a thirty-second of a whole note."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demist]] | verb | **1.** Free from mist. | *"In academic literature, demist designates free from mist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demister]] | noun | **1.** Heater that removes mist from the windshield of a car. | *"In academic literature, demister designates heater that removes mist from the windshield of a car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demitasse]] | noun | **1.** Small cup of strong black coffee without milk or cream.<br>**2.** Small coffee cup; for serving black coffee. | *"In academic literature, demitasse designates small cup of strong black coffee without milk or cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demiurge]] | noun | **1.** A subordinate deity, in some philosophies the creator of the universe. | *"The Logos, that was before the Day-Star was, has appeared among men as a teacher,--he by whom all things were made. {284} As Demiurge he gave life; as teacher he taught to live well; that, as God, he may lavish upon us life forever."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[demo]] | noun | **1.** A visual presentation showing how something works.<br>**2.** Give an exhibition of to an interested audience. | *"Adams was perfectly constitutional, and as such fully submitted to by the people; but it was a violation of the _demos krateo_ principle; and that violation was equally rebuked."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[demob]] | verb | **1.** Retire from military service. | *"In academic literature, demob designates retire from military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilisation]] | noun | **1.** Act of changing from a war basis to a peace basis including disbanding or discharging troops. | *"In academic literature, demobilisation designates act of changing from a war basis to a peace basis including disbanding or discharging troops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilise]] | verb | **1.** Release from military service or remove from the active list of military service.<br>**2.** Retire from military service. | *"In academic literature, demobilise designates release from military service or remove from the active list of military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilization]] | noun | **1.** Act of changing from a war basis to a peace basis including disbanding or discharging troops. | *"In academic literature, demobilization designates act of changing from a war basis to a peace basis including disbanding or discharging troops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demobilize]] | verb | **1.** Release from military service or remove from the active list of military service.<br>**2.** Retire from military service. | *"In academic literature, demobilize designates release from military service or remove from the active list of military service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democracy]] | noun | **1.** The political orientation of those who favor government by the people or by their elected representatives.<br>**2.** A political system in which the supreme power lies in a body of citizens who can elect people to represent them. | *"This theory is, in a way, based on an appeal to experience, as to the effect of property on human character, and it has the virtue of expressing one of the ideals of modern democracy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[democrat]] | noun | **1.** A member of the democratic party.<br>**2.** An advocate of democratic principles. | *"Who’s over him, he cries;—aye, he would be a democrat to all above; look, how he lords it over all below!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[democratic]] | adjective | **1.** Characterized by or advocating or based upon the principles of democracy or social equality; ; ; - george du maurier.<br>**2.** Belong to or relating to the democratic party. | *"The Christian religion has acted both directly and indirectly on the Scottish peasantry, and it has done so the more powerfully because of the democratic character of the Presbyterian form which that religion took in Scotland."* — John Cairns, *Principal Cairns* |
| [[democratically]] | adverb | **1.** In a democratic manner; based on democratic principles. | *"In academic literature, democratically designates in a democratic manner; based on democratic principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratisation]] | noun | **1.** The action of making something democratic. | *"In academic literature, democratisation designates the action of making something democratic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratise]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratise designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratization]] | noun | **1.** The action of making something democratic. | *"In academic literature, democratization designates the action of making something democratic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratize]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratize designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democritus]] | noun | **1.** Greek philosopher who developed an atomistic theory of matter (460-370 bc). | *"In the nests of Arabian birds was the aspilates, that, according to Democritus, kept the wearer from any danger by fire."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[demode]] | adjective | **1.** Out of fashion. | *"In academic literature, demode designates out of fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulate]] | verb | **1.** Extract information from a modulated carrier wave. | *"In academic literature, demodulate designates extract information from a modulated carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulation]] | noun | **1.** (electronics) the reception of a signal by extracting it from the carrier wave. | *"In academic literature, demodulation designates (electronics) the reception of a signal by extracting it from the carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demodulator]] | noun | **1.** Rectifier that extracts modulation from a radio carrier wave. | *"In academic literature, demodulator designates rectifier that extracts modulation from a radio carrier wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demogorgon]] | noun | **1.** (greek mythology) a mysterious and terrifying deity of the underworld. | *"With Panthea, one of the ocean nymphs that watch over Prometheus, she makes her way to the cave of Demogorgon, "that terrific gloom," who seems meant to typify the Primal Power of the World."* — Sydney Waterlow, *Shelley* |
| [[demographer]] | noun | **1.** A scientist who studies the growth and density of populations and their vital statistics. | *"In academic literature, demographer designates a scientist who studies the growth and density of populations and their vital statistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographic]] | noun | **1.** A statistic characterizing human populations (or segments of human populations broken down by age or sex or income etc.).<br>**2.** Of or relating to demography. | *"In academic literature, demographic designates a statistic characterizing human populations (or segments of human populations broken down by age or sex or income etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographics]] | noun | **1.** A statistic characterizing human populations (or segments of human populations broken down by age or sex or income etc.). | *"In academic literature, demographics designates a statistic characterizing human populations (or segments of human populations broken down by age or sex or income etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographist]] | noun | **1.** A scientist who studies the growth and density of populations and their vital statistics. | *"In academic literature, demographist designates a scientist who studies the growth and density of populations and their vital statistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demography]] | noun | **1.** The branch of sociology that studies the characteristics of human populations. | *"In academic literature, demography designates the branch of sociology that studies the characteristics of human populations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demoiselle]] | noun | **1.** A young unmarried woman.<br>**2.** Small brilliantly colored tropical marine fishes of coral reefs. | *"Your Majestee ’ave _fausse_ French enough to deceive de most _sage demoiselle_ dat is _en France_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demolish]] | verb | **1.** Destroy completely.<br>**2.** Humiliate or depress completely. | *"It was proposed to continue the meetings in the Congregational church, but the workmen were coming the next morning to demolish and rebuild it."* — Classic Author, *The wonders of prayer* |
| [[demolished]] | verb | **1.** Destroy completely.<br>**2.** Humiliate or depress completely. | *"Another chair was brought, and in time that chair was demolished."* — Jack London, *The Jacket (The Star-Rover)* |
| [[demolishing]] | noun | **1.** Complete destruction of a building.<br>**2.** Destroy completely. | *"Both his "System of Logic" and his "Examination of Sir William Hamilton's Philosophy" are for the most part devoted to fortifying this position, and demolishing beliefs inconsistent with it."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[demolition]] | noun | **1.** An event (or the result of an event) that completely destroys something.<br>**2.** The act of demolishing. | *"My dear sir, I understand your present feelings against the existing state of things, which I grant to be a little hard in your case; but I can never raise my voice for the demolition of a class of men like Mr."* — Charles Dickens, *Bleak House* |
| [[demon]] | noun | **1.** An evil supernatural being.<br>**2.** A cruel wicked and inhuman person. | *"Sir Leicester receives the gout as a troublesome demon, but still a demon of the patrician order."* — Charles Dickens, *Bleak House* |
| [[demon-ridden]] | adjective | **1.** As if possessed by demons. | *"In academic literature, demon-ridden designates as if possessed by demons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonetisation]] | noun | **1.** Ending something (e.g. gold or silver) as no longer the legal tender of a country. | *"In academic literature, demonetisation designates ending something (e.g. gold or silver) as no longer the legal tender of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonetise]] | verb | **1.** Deprive of value for payment. | *"In academic literature, demonetise designates deprive of value for payment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonetization]] | noun | **1.** Ending something (e.g. gold or silver) as no longer the legal tender of a country. | *"Note carefully, and indicate the different meanings of bimetallism; of demonetization. 8."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[demonetize]] | verb | **1.** Deprive of value for payment. | *"The Republican party is in favor of the use of both gold and silver as money, and condemns the policy of the Democratic Administration in its efforts to demonetize silver."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[demoniac]] | noun | **1.** Someone who acts as if possessed by a demon.<br>**2.** Frenzied as if possessed by a demon. | *"This was a demoniac laugh—low, suppressed, and deep—uttered, as it seemed, at the very keyhole of my chamber door."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[demoniacal]] | adjective | **1.** Frenzied as if possessed by a demon. | *"Then Clare, thrown by sheer misery into one of the demoniacal moods in which a man does despite to his true principles, called her close to him, and fiendishly whispered in her ear the most heterodox ideas he could think of."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[demoniacally]] | adverb | **1.** In a very agitated manner; as if possessed by an evil spirit. | *"The fire in the grate looked impish—demoniacally funny, as if it did not care in the least about her strait."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[demonic]] | adjective | **1.** Extremely evil or cruel; expressive of cruelty or befitting hell. | *"In academic literature, demonic designates extremely evil or cruel; expressive of cruelty or befitting hell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonisation]] | noun | **1.** To represent as diabolically evil. | *"In academic literature, demonisation designates to represent as diabolically evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonise]] | verb | **1.** Make into a demon. | *"In academic literature, demonise designates make into a demon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonism]] | noun | **1.** A belief in and reverence for devils (especially satan). | *"No: but here thou beholdest even in a dumb brute, the instinct of the knowledge of the demonism in the world."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[demonization]] | noun | **1.** To represent as diabolically evil. | *"In academic literature, demonization designates to represent as diabolically evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonize]] | verb | **1.** Make into a demon. | *"In academic literature, demonize designates make into a demon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonolatry]] | noun | **1.** The acts or rites of worshiping devils. | *"In academic literature, demonolatry designates the acts or rites of worshiping devils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonstrability]] | noun | **1.** Capability of being demonstrated or logically proved. | *"In academic literature, demonstrability designates capability of being demonstrated or logically proved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonstrable]] | adjective | **1.** Necessarily or demonstrably true.<br>**2.** Capable of being demonstrated or proved; ; ; - walter bagehot. | *"In the solar spectrum, beyond the extreme red and extreme violet rays, are whole series of colours, demonstrable, but imperceptible to gross human vision."* — Francis Thompson, *Shelley: An Essay* |
| [[demonstrably]] | adverb | **1.** In an obvious and provable manner. | *"And precisely in the measure that Ovid was right in finding the age and his character in agreement, the age and national character were demonstrably degenerate."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[demonstrate]] | verb | **1.** Give an exhibition of to an interested audience.<br>**2.** Establish the validity of something, as by an example, explanation or experiment. | *"Such a man Might be a copy to these younger times; Which, followed well, would demonstrate them now But goers backward."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demonstrated]] | verb | **1.** Give an exhibition of to an interested audience.<br>**2.** Establish the validity of something, as by an example, explanation or experiment. | *"And even the like precurse of fierce events, As harbingers preceding still the fates And prologue to the omen coming on, Have heaven and earth together demonstrated Unto our climatures and countrymen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demonstration]] | noun | **1.** A show or display; the act of presenting something to sight or view.<br>**2.** A show of military force or preparedness. | *"Did your letters pierce the queen to any demonstration of grief?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demonstrative]] | noun | **1.** A pronoun that points out an intended referent.<br>**2.** Given to or marked by the open expression of emotion. | *"I felt that if we had been at all demonstrative, he would have run away in a moment."* — Charles Dickens, *Bleak House* |
| [[demonstratively]] | adverb | **1.** In a demonstrative manner. | *"Scientific and Biblical facts 358:9 Christian Science, understood, coincides with the Scriptures, and sustains logically and demonstratively every point it presents."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[demonstrativeness]] | noun | **1.** Tending to express your feelings freely. | *"In academic literature, demonstrativeness designates tending to express your feelings freely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonstrator]] | noun | **1.** A teacher or teacher's assistant who demonstrates the principles that are being taught.<br>**2.** Someone who demonstrates an article to a prospective buyer. | *"Death outdone 42:15 The resurrection of the great demonstrator of God's power was the proof of his final triumph over body and matter, and gave full evidence of divine 42:18 Science, - evidence so important to mortals."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[demoralisation]] | noun | **1.** A state of disorder and confusion.<br>**2.** Depression resulting from an undermining of your morale. | *"In the reaction after that excitement I found myself in face of a great difficulty--what to do with my men, to keep them from demoralisation."* — Mrs. Oliphant, *A Beleaguered City* |
| [[demoralise]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"First mate angry; said it was folly, and to yield to such foolish ideas would demoralise the men; said he would engage to keep them out of trouble with a handspike."* — Bram Stoker, *Dracula* |
| [[demoralised]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"When not in the right mood he could fall as low as any one, saved only by his looking at such hours rather like a demoralised prince in exile."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[demoralising]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"In academic literature, demoralising designates corrupt morally or by intemperance or sensuality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demoralization]] | noun | **1.** Destroying the moral basis for a doctrine or policy.<br>**2.** A state of disorder and confusion. | *"Their condition at Harrison's Landing was pitiable; the medical bureau seemed to have shared in the general demoralization."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[demoralize]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"She became what would have been called a fine creature; her aspect was fair and arresting; her soul that of a woman whom the turbulent experiences of the last year or two had quite failed to demoralize."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[demoralized]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"Jane appointed Henrietta to sit and hold the slow old horses in case they should have got demoralized by the militant atmosphere pervading Glendale and try to bolt."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[demoralizing]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower someone's spirits; make downhearted. | *"To be just, the men were not greatly to blame for this painful and demoralizing termination to the evening’s entertainment."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[demosthenes]] | noun | **1.** Athenian statesman and orator (circa 385-322 bc). | *"Athens, as we learn from Demosthenes, was the arbiter of Greece seventy-three years."* — Alexander Hamilton, *The Federalist Papers* |
| [[demosthenic]] | adjective | **1.** Of or relating to demosthenes or his oratory. | *"In academic literature, demosthenic designates of or relating to demosthenes or his oratory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demote]] | verb | **1.** Assign to a lower position; reduce in rank. | *"In academic literature, demote designates assign to a lower position; reduce in rank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demotic]] | noun | **1.** A simplified cursive form of the ancient hieratic script.<br>**2.** The modern greek vernacular. | *"Here is another difficult text: (Figure 2) It is demotic—a style of Egyptian writing and a phase of the language which had perished from the knowledge of all men twenty-five hundred years before the Christian era."* — Mark Twain, *What Is Man? and Other Essays* |
| [[demotion]] | noun | **1.** Act of lowering in rank or position. | *"In academic literature, demotion designates act of lowering in rank or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demulcent]] | noun | **1.** A medication (in the form of an oil or salve etc.) that soothes inflamed or injured skin.<br>**2.** Having a softening or soothing effect especially to the skin. | *"In academic literature, demulcent designates a medication (in the form of an oil or salve etc.) that soothes inflamed or injured skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demulen]] | noun | **1.** Trade name for an oral contraceptive. | *"In academic literature, demulen designates trade name for an oral contraceptive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demulsify]] | verb | **1.** Cause to demulsify.<br>**2.** Break down into components. | *"In academic literature, demulsify designates cause to demulsify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demur]] | noun | **1.** (law) a formal objection to an opponent's pleadings.<br>**2.** Take exception to. | *"Clowes' parlour." Barry had executed too many equally singular orders to raise any demur."* — Anthony Pryde, *Nightfall* |
| [[demure]] | adjective | **1.** Affectedly modest or shy especially in a playful or provocative way. | *"There’s never none of these demure boys come to any proof; for thin drink doth so over-cool their blood, and making many fish meals, that they fall into a kind of male green-sickness; and then, when they marry, they get wenches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demurely]] | adverb | **1.** In a demure manner. | *"The drums Demurely wake the sleepers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demureness]] | noun | **1.** The trait of behaving with reserve and decorum.<br>**2.** The affectation of being demure in a provocative way. | *"But the likeness of quality consists in a great number of common subdivisions of quality--demureness, extreme minuteness of touch, avoidance of loud tones and glaring effects."* — Jane Austen, *Pride and Prejudice* |
| [[demurrage]] | noun | **1.** A charge required as compensation for the delay of a ship or freight car or other cargo beyond its scheduled time of departure.<br>**2.** Detention of a ship or freight car or other cargo beyond its scheduled time of departure. | *"In academic literature, demurrage designates a charge required as compensation for the delay of a ship or freight car or other cargo beyond its scheduled time of departure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demurral]] | noun | **1.** (law) a formal objection to an opponent's pleadings. | *"In academic literature, demurral designates (law) a formal objection to an opponent's pleadings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demurrer]] | noun | **1.** (law) a formal objection to an opponent's pleadings.<br>**2.** (law) any pleading that attacks the legal sufficiency of the opponent's pleadings. | *"Mr Bloom thoroughly acquiesced in the general gist of this though the mystical finesse involved was a bit out of his sublunary depth still he felt bound to enter a demurrer on the head of simple, promptly rejoining: —Simple?"* — James Joyce, *Ulysses* |
| [[demyelinate]] | verb | **1.** Destroy the myelin sheath of. | *"In academic literature, demyelinate designates destroy the myelin sheath of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demyelination]] | noun | **1.** Loss of the myelin covering of some nerve fibers resulting in their impaired function. | *"In academic literature, demyelination designates loss of the myelin covering of some nerve fibers resulting in their impaired function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demystify]] | verb | **1.** Make less mysterious or remove the mystery from. | *"In academic literature, demystify designates make less mysterious or remove the mystery from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologisation]] | noun | **1.** The restatement of a message (as a religious one) in rational terms. | *"In academic literature, demythologisation designates the restatement of a message (as a religious one) in rational terms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologise]] | verb | **1.** Remove the mythical element from (writings). | *"In academic literature, demythologise designates remove the mythical element from (writings)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologised]] | verb | **1.** Remove the mythical element from (writings).<br>**2.** Having mythical elements removed. | *"In academic literature, demythologised designates remove the mythical element from (writings)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologization]] | noun | **1.** The restatement of a message (as a religious one) in rational terms. | *"In academic literature, demythologization designates the restatement of a message (as a religious one) in rational terms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologize]] | verb | **1.** Remove the mythical element from (writings). | *"In academic literature, demythologize designates remove the mythical element from (writings)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demythologized]] | verb | **1.** Remove the mythical element from (writings).<br>**2.** Having mythical elements removed. | *"In academic literature, demythologized designates remove the mythical element from (writings)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edema]] | noun | **1.** Swelling from excessive accumulation of watery fluid in cells, tissues, or serous cavities. | *"In academic literature, edema designates swelling from excessive accumulation of watery fluid in cells, tissues, or serous cavities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edematous]] | adjective | **1.** Swollen with an excessive accumulation of fluid. | *"In academic literature, edematous designates swollen with an excessive accumulation of fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endemic]] | noun | **1.** A disease that is constantly present to a greater or lesser degree in people of a certain class or in people living in a particular location.<br>**2.** A plant that is native to a certain limited area. | *"What endemic characteristics were present?"* — James Joyce, *Ulysses* |
| [[endemical]] | adjective | **1.** Of or relating to a disease (or anything resembling a disease) constantly present to greater or lesser extent in a particular locality. | *"In academic literature, endemical designates of or relating to a disease (or anything resembling a disease) constantly present to greater or lesser extent in a particular locality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endemism]] | noun | **1.** Nativeness by virtue of originating or occurring naturally (as in a particular place). | *"In academic literature, endemism designates nativeness by virtue of originating or occurring naturally (as in a particular place)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epidemic]] | noun | **1.** A widespread outbreak of an infectious disease; many people are infected at the same time.<br>**2.** (especially of medicine) of disease or anything resembling a disease; attacking or affecting many individuals in a community or a population simultaneously. | *"Whilst many were dying around him, _his health_ continued to improve; so that with the disappearance of the epidemic he found himself sufficiently restored to venture, if Providence should open the door, to resume his ministerial work."* — Classic Author, *The wonders of prayer* |
| [[indemnification]] | noun | **1.** A sum of money paid in compensation for loss or injury.<br>**2.** An act of compensation for actual loss or damage or for trouble and annoyance. | *"Our Order soon adopted bolder and wider views, and found out a better indemnification for our sacrifices."* — Walter Scott, *Ivanhoe: A Romance* |
| [[indemnify]] | verb | **1.** Secure against future loss, damage, or liability; give security for.<br>**2.** Make amends for; pay compensation for. | *"But about the ‘Pioneer,’ I have been consulting a little with some of the men on our side, and they are inclined to take it into their hands—indemnify me to a certain extent—carry it on, in fact."* — George Eliot, *Middlemarch* |
| [[indemnity]] | noun | **1.** Protection against future loss.<br>**2.** Legal exemption from liability for damages. | *"This desirable condition has in many respects been accomplished by means of insurance. _Insurance_ is the act of providing a guarantee of indemnity against a financial loss that will result if an event of a specified kind occurs."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[misdemean]] | verb | **1.** Behave badly. | *"In academic literature, misdemean designates behave badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misdemeanor]] | noun | **1.** A crime less serious than a felony. | *"Did I tell you as I was tried, alone, for misdemeanor, while with Compeyson?” I answered, No."* — Charles Dickens, *Great Expectations* |
| [[misdemeanour]] | noun | **1.** A crime less serious than a felony. | *"From time to time d’Urberville exhibited a sort of fierce distress at the sight of the tramping he had driven her to undertake by his misdemeanour."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[trademark]] | noun | **1.** A distinctive characteristic or attribute.<br>**2.** A formally registered symbol identifying the manufacturer or distributor of a product. | *"Wants to stamp his trademark on everything."* — James Joyce, *Ulysses* |
| [[trademarked]] | verb | **1.** Mark with a brand or trademark.<br>**2.** Register the trademark of. | *"In academic literature, trademarked designates mark with a brand or trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemanding]] | adjective | **1.** Requiring little if any patience or effort or skill. | *"In academic literature, undemanding designates requiring little if any patience or effort or skill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemocratic]] | adjective | **1.** Not in agreement with or according to democratic doctrine or practice or ideals. | *"I commend the virtuous democracy of this Chamber to read that bill, and then tell this Senate whether there ever was a more undemocratic measure than the bill propounded in Virginia by the party whose cause they espouse."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[undemocratically]] | adverb | **1.** In an undemocratic manner. | *"In academic literature, undemocratically designates in an undemocratic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemonstrative]] | adjective | **1.** Not given to open expression of emotion. | *"You _shall_,” repeated Mary, in the tone of undemonstrative sincerity which seemed natural to her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DEM
  </div>
</div>
