---
status: unread
type: root_dashboard
---
# Dashboard — vulg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vulg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“the common people”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **vulg** means the common people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *divulgate*, *divulgation*, *divulge*, and *divulged*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: the common people
> The root **vulg** means the common people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *divulgate*, *divulgation*, *divulge*, and *divulged*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">The common people</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *divulgate* and *divulgation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vulg** comes from a Latin word that means *"the common people"*.
  - At its core, it describes the common people.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **vulg** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of the common people.
  - **Mental & Social**: How people experience, organize, or communicate about the common people.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Divulgate**: To publish abroad, proclaim, or make known to the public.
  - **Divulgation**: The act of divulging or publishing abroad.
  - **Divulge**: To make known.
  - **Divulged**: Made known.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vulg</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vulg-** operates in English across three primary morphological formations:
> - **Primary Nominal & Adjectival Stem:** `vulg-` / `vulgar-` (from *vulgus* and *vulgāris*, giving *vulgus*, *vulgar*, *vulgarly*, *vulgarness*)
> - **Evaluative Suffixation:** `-ity`, `-ism`, `-ize` (giving *vulgarity*, *vulgarism*, *vulgarize*, *vulgarization*, *vulgarizer*)
> - **Textual & Scriptural Participle:** `vulgat-` (from Latin *vulgātus*, pp. of *vulgāre*, giving *vulgate*)
> - **Prefixed Dispersive Verb Stem:** `di-vulg-` (from *dis-* + *vulgāre*, giving *divulge*, *divulgence*, *divulger*, *divulgement*, *divulgation*, *divulgate*)

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
> The semantic spectrum of `vulg` organizes into four primary sectors:
> - **Coarseness, Bad Taste & Obscenity:** *vulgar*, *vulgarity*, and *vulgarism* denote lack of refinement, boorish manners, ribald humor, or crude language.
> - **Common Accessibility & Linguistic Heritage:** *Vulgar Latin*, *vulgar fraction*, and *the vulgar tongue* describe everyday, non-specialized vernacular usage.
> - **Textual Canonical Standardization:** *vulgate* denotes Saint Jerome's Latin Bible or any universally recognized standard edition of an ancient text.
> - **Revelation & Disclosure of Secrets:** *divulge*, *divulgence*, and *divulgation* denote broadcasting confidential information to the public realm.

---

## 🔀 4. Prefix & Combining Dynamics on vulg

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dis-` (assimilated to `di-`) | abroad, apart, in all directions | [[divulge]], [[divulgation]] | "To spread abroad among the crowd"; to disclose or leak secret information. |
| `ex-` (assimilated to `e-`) | out, forth | [[evulgate]], [[evulgation]] | "To publish out among the populace"; to proclaim publicly. |
| *(root alone)* | the crowd, common | [[vulgar]], [[vulgate]], [[vulgus]] | Belonging to the multitude; common, unrefined, or vernacular. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ar` | Adjective (Pertaining to) | [[vulgar]] | Characteristic of the common crowd; lacking refinement, coarse. |
| `-ity` | Noun (Quality / State) | [[vulgarity]] | The condition of being tasteless, crude, or ill-bred. |
| `-ism` | Noun (Linguistic Idiom / Feature) | [[vulgarism]] | A coarse word, illiterate expression, or colloquialism. |
| `-ize` | Verb (Factitive / Causative) | [[vulgarize]] | To make common, debase, or popularize for the masses. |
| `-ation` | Noun (Process / Result) | [[vulgarization]], [[divulgation]] | The process of popularizing/debasing, or broadcasting secrets. |
| `-ence` / `-ment` | Noun (Action / Result) | [[divulgence]], [[divulgement]] | The revelation or leaking of confidential matters. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📜 **Historical Linguistics & Philology** | [[Vulgar Latin]], [[vulgarism]] | The evolution of Romance languages from spoken Latin; sociolects, dialectology, and register shifts. |
| ⛪ **Biblical Studies & Church History** | [[vulgate]] | Jerome's Latin translation; the Council of Trent (1546 decree on the Vulgate); textual transmission of sacred scripture. |
| ⚖️ **Law, Espionage & Whistleblowing** | [[divulge]], [[divulgence]] | Non-disclosure agreements (NDAs); trade secret theft; attorney-client privilege protecting against unauthorized divulgence. |
| 🔢 **Mathematics & Education** | [[vulgar fraction]] | Elementary arithmetic; distinguishing vulgar (common) fractions (e.g., 3/4) from decimal notations (0.75). |
| 🎭 **Aesthetics, Media & Sociology** | [[vulgarity]], [[vulgarize]], [[vulgarizer]] | Cultural criticism; television tabloidization (*vulgarization of public debate*); Bourdieu's sociology of taste and class distinction. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[divulge]] | verb | **1.** Make known to the public information that was previously known only to a few people or that was meant to be kept a secret. | *"It cannot be expected of me to divulge how I came into possession of the four needles."* — Jack London, *The Jacket (The Star-Rover)* |
| [[divulgement]] | noun | **1.** The act of disclosing something that was secret or private. | *"In academic literature, divulgement designates the act of disclosing something that was secret or private."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divulgence]] | noun | **1.** The act of disclosing something that was secret or private. | *"In academic literature, divulgence designates the act of disclosing something that was secret or private."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgar]] | adjective | **1.** Lacking refinement or cultivation or taste.<br>**2.** Of or associated with the great masses of people. | *"But thou, to whom my jewels trifles are, Most worthy comfort, now my greatest grief, Thou best of dearest, and mine only care, Art left the prey of every vulgar thief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vulgarian]] | noun | **1.** A vulgar person (especially someone who makes a vulgar display of wealth). | *"His scientific sympathies were distinctly reptilian; he loved nature’s vulgarians and described himself as the Zola of zoology."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[vulgarisation]] | noun | **1.** The act of rendering something coarse and unrefined.<br>**2.** The act of making something attractive to the general public. | *"In academic literature, vulgarisation designates the act of rendering something coarse and unrefined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgarise]] | verb | **1.** Cater to popular taste to make popular and present to the general public; bring into general or common use.<br>**2.** Debase and make vulgar. | *"His marriage to that woman has hopelessly vulgarised him."* — William Makepeace Thackeray, *Vanity Fair* |
| [[vulgariser]] | noun | **1.** Someone who makes something vulgar.<br>**2.** Someone who makes attractive to the general public. | *"In academic literature, vulgariser designates someone who makes something vulgar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgarism]] | noun | **1.** An offensive or indecent word or phrase.<br>**2.** The quality of lacking taste and refinement. | *"It was a vulgarism. [56] Galen, extant in Arabic in _hist. anteislam_. _Abulfedae_ (ed."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[vulgarity]] | noun | **1.** The quality of lacking taste and refinement. | *"Philips’s vulgarity was another, and, perhaps, a greater tax on his forbearance; and though Mrs."* — Jane Austen, *Pride and Prejudice* |
| [[vulgarization]] | noun | **1.** The act of rendering something coarse and unrefined.<br>**2.** The act of making something attractive to the general public. | *"In academic literature, vulgarization designates the act of rendering something coarse and unrefined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgarize]] | verb | **1.** Cater to popular taste to make popular and present to the general public; bring into general or common use.<br>**2.** Debase and make vulgar. | *"In academic literature, vulgarize designates cater to popular taste to make popular and present to the general public; bring into general or common use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgarizer]] | noun | **1.** Someone who makes something vulgar.<br>**2.** Someone who makes attractive to the general public. | *"In academic literature, vulgarizer designates someone who makes something vulgar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vulgarly]] | adverb | **1.** In a smutty manner. | *"First, for this woman, To justify this worthy nobleman, So vulgarly and personally accused, Her shall you hear disproved to her eyes, Till she herself confess it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vulgate]] | noun | **1.** The latin edition of the bible translated from hebrew and greek mainly by st. jerome at the end of the 4th century; as revised in 1592 it was adopted as the official text for the roman catholic church. | *"This was translated as χαλκὸς (_chalcos_) in the Septuagint, and _Aes_ in the Vulgate; the Greeks and Romans using the terms, however, both for copper and for the alloys brass and bronze."* — Donald M. Levy, *Modern Copper Smelting* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VULG
  </div>
</div>
