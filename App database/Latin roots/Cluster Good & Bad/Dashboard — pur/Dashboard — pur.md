---
status: unread
type: root_dashboard
---
# Dashboard — pur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“pure or clean”</span>
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

The root **pur** means pure or clean. It refers to pure, clean, unmixed; to cleanse, clear, purge. In English, this root forms words such as *purify*, *depurate*, *depuration*, and *depurative*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: pure or clean
> The root **pur** means pure or clean. It refers to pure, clean, unmixed; to cleanse, clear, purge. In English, this root forms words such as *purify*, *depurate*, *depuration*, and *depurative*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Pure or clean</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *purify* and *depurate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pur** comes from a Latin word that means *"pure or clean"*.
  - At its core, it describes the quality or state of being pure or clean.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **pur** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are pure or clean.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Purify**: To make pure.
  - **Depurate**: To free from impurities, clarify, or cleanse.
  - **Depuration**: The act, process, or operation of purifying, clarifying, or cleansing.
  - **Depurative**: Having the quality of purifying or cleansing, especially the blood.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pur</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pur-** branches through two distinct morphological tracks:
> - **Direct Adjectival Track:** `pur-` (from *pūrus*, yielding *pure*, *purity*, *impure*, *impurity*, *purism*, *purist*)
> - **Factitive Verbal Track:** `pur-i-fic-` (from *pūrus* + *faciō*, yielding *purify*, *purifier*, *purification*, *purificatory*)
> - **Archaic Compound Track:** `purg-` (from *pūrgāre* < *pūrus* + *agere*, yielding *purge*, *purgation*, *purgative*, *purgatory*)
> - **Intensive & Prefixed Stems:** `expurg-` (*ex-* "out" + *pūrgāre*, yielding *expurgate*, *expurgation*, *expurgator*) and `depur-` (*dē-* "down, thoroughly" + *pūrus*, yielding *depurate*, *depuration*, *depurative*)
>
> English systematically builds opposites using the negative prefix `in-` (assimilated to `im-` before *p-*), generating *impure*, *impurity*, and *impurely*.

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
> The semantic power of `pur` radiates through five major operational zones:
> - **Material & Chemical Cleanliness:** *pure*, *purity*, *purify*, *depuration* define substances free of alloys, contaminants, toxins, or sediments.
> - **Moral, Ethical & Religious Integrity:** *purity*, *impure*, *puritan*, and *puritanical* describe sexual chastity, righteous motives, or strict ascetic codes.
> - **Theological Expiation & Eschatology:** *purgatory* and *purgatorial* designate the spiritual cleansing of sins through intermediate trial.
> - **Censorship & Textual Pruning:** *expurgate*, *expurgation*, and *expurgator* describe the scrubbing of obscene or politically sensitive passages from literature.
> - **Drastic Cleansing & Elimination (Medical & Political):** *purge* and *purgative* range from gastrointestinal evacuation to political purges of state institutions.

---

## 🔀 4. Prefix & Combining Dynamics on pur

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (assimilated to `im-`) | not, un- (privative) | [[impure]], [[impurity]] | "Not pure"; contaminated, unchaste, mixed with foreign or debasing elements. |
| `ex-` | out, thoroughly | [[expurgate]], [[expurgation]] | "To purge completely out"; to scour out and delete offensive or erroneous material. |
| `de-` | thoroughly, away | [[depurate]], [[depuration]] | "To thoroughly cleanse"; to clarify liquids, ores, or bodily humors. |
| *(root alone)* | pure, clean, purge | [[pure]], [[purity]], [[purge]] | Inherent state of clarity or immediate act of cleansing. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ity` | Noun (State / Property) | [[purity]], [[impurity]] | The abstract condition of being unmixed or polluted. |
| `-ify` | Verb (Cause to be) | [[purify]] | To make pure; to remove foreign or defiling matter. |
| `-ation` | Noun (Process / Result) | [[purification]], [[purgation]], [[expurgation]], [[depuration]] | The complete act or procedure of refining, cleansing, or cleansing out. |
| `-ive` | Adjective / Noun (Tendency / Agent) | [[purgative]], [[depurative]] | Tending to purge or cleanse; a medicinal agent that evacuates the bowels. |
| `-ory` | Adjective / Noun (Place / Function) | [[purgatory]], [[expurgatory]], [[purificatory]] | Serving to cleanse; a place of expiatory cleansing. |
| `-ist` / `-ism` | Noun (Doctrinaire / Ideology) | [[purist]], [[purism]] | An adherent of strict, uncompromising purity in language, art, or doctrine. |
| `-an` / `-ical` | Noun / Adjective (Faction / Temperament) | [[puritan]], [[puritanical]] | A member of the historical reform faction, or someone exhibiting rigid moral severity. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚗️ **Chemistry & Materials Science** | [[purity]], [[purify]], [[depuration]] | Spectroscopic purity of chemical reagents (e.g., *99.9% purity*); water desalination and purification plants; refining ores. |
| 📚 **Publishing, Law & Censorship** | [[expurgate]], [[expurgation]], [[expurgator]] | Bowdlerization of classical literature; redacting classified state documents; court orders expunging records. |
| 🏛️ **History & Political Science** | [[purge]], [[puritan]] | Historical political purges (e.g., *Pride's Purge* 1648, the Great Purge of the 1930s); the English Civil War and the Puritan migration to New England. |
| ⛪ **Theology & Eschatology** | [[purgatory]], [[purgatorial]], [[purgation]] | Catholic dogma of Purgatory (*Council of Trent*); Dante's *Purgatorio*; sacramental rites of penance and purification. |
| 🩺 **Pharmacology & Medicine** | [[purge]], [[purgative]], [[depurative]] | Cathartics and laxatives; clinical colonoscopy preparations; biological depuration of shellfish toxins in clean water. |
| 🎨 **Linguistics & Art Theory** | [[purist]], [[purism]] | Linguistic purism resisting foreign loanwords (e.g., *Académie Française*); artistic purism in architectural minimalism. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[appurtenance]] | noun | **1.** Equipment consisting of miscellaneous articles needed for a particular operation or sport etc.<br>**2.** A supplementary component that improves capability. | *"The appurtenance of welcome is fashion and ceremony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[appurtenant]] | adjective | **1.** Furnishing added support. | *"In academic literature, appurtenant designates furnishing added support."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depurate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pur within the domain of Good & Bad.<br>**2.** A technical or specialized form exhibiting the properties of pur in systematic terminology. | *"In academic literature, depurate designates pertaining to, derived from, or characteristic of latin pur within the domain of good & bad."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expurgate]] | verb | **1.** Edit by omitting or modifying parts considered indelicate. | *"Whitman's attitude toward the plan at the time is given in a letter which he wrote to Rossetti on December 3, 1867: "I cannot and will not consent of my own volition to countenance an expurgated edition of my pieces."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[expurgated]] | verb | **1.** Edit by omitting or modifying parts considered indelicate.<br>**2.** Having material deleted. | *"Whitman's attitude toward the plan at the time is given in a letter which he wrote to Rossetti on December 3, 1867: "I cannot and will not consent of my own volition to countenance an expurgated edition of my pieces."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[expurgation]] | noun | **1.** The deletion of objectionable parts from a literary work. | *"I like to take life as it comes without expurgation."* — Anthony Pryde, *Nightfall* |
| [[expurgator]] | noun | **1.** A person who edits a text by removing obscene or offensive words or passages. | *"In academic literature, expurgator designates a person who edits a text by removing obscene or offensive words or passages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impure]] | adjective | **1.** Combined with extraneous elements.<br>**2.** (used of persons or behaviors) immoral or obscene. | *"Swills) found his voice seriously affected by the impure state of the atmosphere, his jocose expression at the time being that he was like an empty post-office, for he hadn’t a single note in him."* — Charles Dickens, *Bleak House* |
| [[impureness]] | noun | **1.** The condition of being impure. | *"In academic literature, impureness designates the condition of being impure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impurity]] | noun | **1.** Worthless or dangerous material that should be removed.<br>**2.** The condition of being impure. | *"But no perfection is so absolute That some impurity doth not pollute."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonpurulent]] | adjective | **1.** Not containing pus. | *"In academic literature, nonpurulent designates not containing pus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsuppurative]] | adjective | **1.** Not suppurative. | *"In academic literature, nonsuppurative designates not suppurative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purace]] | noun | **1.** An inactive volcano in the andes in southern colombia; last erupted in 1950. | *"In academic literature, purace designates an inactive volcano in the andes in southern colombia; last erupted in 1950."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purana]] | noun | **1.** A body of 18 works written between the first and 11th centuries and incorporating legends and speculative histories of the universe and myths and customary observances. | *"In academic literature, purana designates a body of 18 works written between the first and 11th centuries and incorporating legends and speculative histories of the universe and myths and customary observances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[puranic]] | adjective | **1.** Of or relating to the purana. | *"In academic literature, puranic designates of or relating to the purana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purau]] | noun | **1.** Shrubby tree widely distributed along tropical shores; yields a light tough wood used for canoe outriggers and a fiber used for cordage and caulk; often cultivated for ornament. | *"In academic literature, purau designates shrubby tree widely distributed along tropical shores; yields a light tough wood used for canoe outriggers and a fiber used for cordage and caulk; often cultivated for ornament."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purcell]] | noun | **1.** English organist at westminster abbey and composer of many theatrical pieces (1659-1695). | *"But Villiers Stanford is, I think, the best composer England has produced since the days of Purcell & Blow, and your words will be sent home to hundreds & thousands who had not before seen them."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[purchasable]] | adjective | **1.** Capable of being corrupted.<br>**2.** Available for purchase. | *"In academic literature, purchasable designates capable of being corrupted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purchase]] | noun | **1.** The acquisition of something for payment.<br>**2.** Something acquired by purchase. | *"Enough to purchase what you have made known."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purchaser]] | noun | **1.** A person who buys. | *"Allston, and was anxious to know who was the fortunate purchaser of the painting of the 'Angel Uriel,' which had won the prize at the exhibition of the Royal Academy."* — Classic Author, *The wonders of prayer* |
| [[purchasing]] | noun | **1.** The act of buying.<br>**2.** Obtain by purchase; acquire by means of a financial transaction. | *"Ay, I warrant you, and not without his true purchasing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pure]] | adjective | **1.** Free of extraneous elements of any kind.<br>**2.** Without qualification; used informally as (often pejorative) intensifiers. | *"So thou be good, slander doth but approve, Thy worth the greater being wooed of time, For canker vice the sweetest buds doth love, And thou present’st a pure unstained prime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pureblood]] | noun | **1.** A pedigreed animal of unmixed lineage; used especially of horses.<br>**2.** Having a list of ancestors as proof of being a purebred animal. | *"In academic literature, pureblood designates a pedigreed animal of unmixed lineage; used especially of horses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pureblooded]] | adjective | **1.** Having a list of ancestors as proof of being a purebred animal. | *"In academic literature, pureblooded designates having a list of ancestors as proof of being a purebred animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purebred]] | noun | **1.** A pedigreed animal of unmixed lineage; used especially of horses.<br>**2.** Bred for many generations from member of a recognized breed or strain. | *"In academic literature, purebred designates a pedigreed animal of unmixed lineage; used especially of horses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[puree]] | noun | **1.** Food prepared by cooking and straining or processed in a blender.<br>**2.** Rub through a strainer or process in an electric blender. | *"In academic literature, puree designates food prepared by cooking and straining or processed in a blender."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purely]] | adverb | **1.** Restricted to something. | *"Whether from a purely mechanical, or from any other cause, when Bathsheba arose it was with a quieted spirit, and a regret for the antagonistic instincts which had seized upon her just before."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pureness]] | noun | **1.** Being undiluted or unmixed with extraneous material.<br>**2.** The state of being unsullied by sin or moral wrong; lacking a knowledge of evil. | *"Were you ten Lords, 'tis false; the pureness of her chaste thoughts entertains not such spotted instruments. _Ang_."* — John Fletcher, *The Elder Brother* |
| [[purgation]] | noun | **1.** Purging the body by the use of a cathartic to stimulate evacuation of the bowels.<br>**2.** A ceremonial cleansing from defilement or uncleanness by the performance of appropriate rites. | *"If their purgation did consist in words, They are as innocent as grace itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purgative]] | noun | **1.** A purging medicine; stimulates evacuation of the bowels.<br>**2.** Strongly laxative. | *"Certainly the fires are often interpreted in the latter way by the persons who light them; and this purgative use of the element comes out very prominently, as we have seen, in the general expulsion of demons from towns and villages."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[purgatorial]] | adjective | **1.** Serving to purge or rid of sin.<br>**2.** Of or resembling purgatory. | *"In academic literature, purgatorial designates serving to purge or rid of sin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purgatory]] | noun | **1.** A temporary condition of torment or suffering.<br>**2.** (theology) in roman catholic theology the place where those who have died in a state of grace undergo limited torment to expiate their sins. | *"I should venture purgatory for ’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purge]] | noun | **1.** The act of clearing yourself (or another) from some stigma or charge.<br>**2.** An act of removing by cleansing; ridding of sediment or other undesired elements. | *"Him I accuse The city ports by this hath entered and Intends t’ appear before the people, hoping To purge himself with words."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purging]] | noun | **1.** An act of removing by cleansing; ridding of sediment or other undesired elements.<br>**2.** The act of clearing yourself (or another) from some stigma or charge. | *"For the satirical slave says here that old men have grey beards; that their faces are wrinkled; their eyes purging thick amber and plum-tree gum; and that they have a plentiful lack of wit, together with most weak hams."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purification]] | noun | **1.** The act of cleaning by getting rid of impurities.<br>**2.** The process of removing impurities (as from oil or metals or sugar etc.). | *"It was almost enough to spread purification and perfume all the way."* — Jane Austen, *Persuasion* |
| [[purifier]] | noun | **1.** An apparatus for removing impurities. | *"Chummy, the chimney-purifier, who had swept the last three families, tried to coax the butler and the boy under him, whose duty it was to go out covered with buttons and with stripes down his trousers, for the protection of Mrs."* — William Makepeace Thackeray, *Vanity Fair* |
| [[purify]] | verb | **1.** Remove impurities from, increase the concentration of, and separate through the process of distillation.<br>**2.** Make pure or free from sin or guilt. | *"The spots whereof could weeping purify, Her tears should drop on them perpetually."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purifying]] | verb | **1.** Remove impurities from, increase the concentration of, and separate through the process of distillation.<br>**2.** Make pure or free from sin or guilt. | *"One good woman in ten, madam, which is a purifying o’ the song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purim]] | noun | **1.** (judaism) a jewish holy day commemorating their deliverance from massacre by haman. | *"In academic literature, purim designates (judaism) a jewish holy day commemorating their deliverance from massacre by haman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purine]] | noun | **1.** Any of several bases that are derivatives of purine.<br>**2.** A colorless crystalline organic base containing nitrogen; the parent compound of various biologically important substances. | *"In academic literature, purine designates any of several bases that are derivatives of purine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purinethol]] | noun | **1.** A drug (trade name purinethol) that interferes with the metabolism of purine and is used to treat acute lymphocytic leukemia. | *"In academic literature, purinethol designates a drug (trade name purinethol) that interferes with the metabolism of purine and is used to treat acute lymphocytic leukemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purism]] | noun | **1.** Scrupulous or exaggerated insistence on purity or correctness (especially in language). | *"In academic literature, purism designates scrupulous or exaggerated insistence on purity or correctness (especially in language)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purist]] | noun | **1.** Someone who insists on great precision and correctness (especially in the use of words). | *"Stafford: and perhaps a purist might have objected that Mrs."* — Anthony Pryde, *Nightfall* |
| [[puritan]] | noun | **1.** A member of a group of english protestants who in the 16th and 17th centuries thought that the protestant reformation under elizabeth was incomplete and advocated the simplification and regulation of forms of worship.<br>**2.** Someone who adheres to strict religious principles; someone opposed to sensual pleasures. | *"Though honesty be no puritan, yet it will do no hurt; it will wear the surplice of humility over the black gown of a big heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[puritanic]] | adjective | **1.** Morally rigorous and strict. | *"There was a strong assumption of superiority in this Puritanic toleration, hardly less trying to the blond flesh of an unenthusiastic sister than a Puritanic persecution."* — George Eliot, *Middlemarch* |
| [[puritanical]] | adjective | **1.** Of or relating to puritans or puritanism.<br>**2.** Exaggeratedly proper. | *"Tess, ever since you told me of that child of ours, it is just as if my feelings, which have been flowing in a strong puritanical stream, had suddenly found a way open in the direction of you, and had all at once gushed through."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[puritanically]] | adverb | **1.** In a prudish manner. | *"In academic literature, puritanically designates in a prudish manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[puritanism]] | noun | **1.** The beliefs and practices characteristic of puritans (most of whom were calvinists who wished to purify the church of england of its catholic aspects).<br>**2.** Strictness and austerity in conduct and religion. | *"Yes: there was to be, as Lord Henry had prophesied, a new Hedonism that was to recreate life and to save it from that harsh uncomely puritanism that is having, in our own day, its curious revival."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[purity]] | noun | **1.** Being undiluted or unmixed with extraneous material.<br>**2.** The state of being unsullied by sin or moral wrong; lacking a knowledge of evil. | *"To win me soon to hell my female evil Tempteth my better angel from my side, And would corrupt my saint to be a devil, Wooing his purity with her foul pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purl]] | noun | **1.** Gold or silver wire thread.<br>**2.** A basic knitting stitch. | *"From the trees came the sound of steady dripping upon the drifted leaves under them, and from the direction of the church she could hear another noise—peculiar, and not intermittent like the rest, the purl of water falling into a pool."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[purlieu]] | noun | **1.** An outer adjacent area of any place. | *"Puck Mulligan footed featly, trilling: I hardly hear the purlieu cry Or a Tommy talk as I pass one by Before my thoughts begin to run On F."* — James Joyce, *Ulysses* |
| [[purloin]] | verb | **1.** Make off with belongings of others. | *"The sage contrived to purloin the talisman while the khan and his guards slept; but not content with this he gave a further proof of his dexterity by bonneting the slumbering potentate with a bladder."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[purloo]] | noun | **1.** Thick stew made of rice and chicken and small game; southern u.s. | *"In academic literature, purloo designates thick stew made of rice and chicken and small game; southern u.s."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purr]] | noun | **1.** A low vibrating sound typical of a contented cat.<br>**2.** Make a soft swishing sound. | *"Back--some time,” replied Chester's voice, rising above the low purr of the engine with a note of satisfaction in it."* — Grace S. Richmond, *Red Pepper Burns* |
| [[purse]] | noun | **1.** A container used for carrying money and small personal items or accessories (especially by women).<br>**2.** A sum of money spoken of as the contents of a money purse. | *"Take this purse of gold, And let me buy your friendly help thus far, Which I will over-pay, and pay again When I have found it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purse-proud]] | adjective | **1.** Proud or arrogant because of your wealth (especially in the absence of other distinction). | *"In academic literature, purse-proud designates proud or arrogant because of your wealth (especially in the absence of other distinction)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purser]] | noun | **1.** An officer aboard a ship who keeps accounts and attends to the passengers' welfare. | *"Captain Swosser used to say of me that I was always better than land a-head and a breeze a-starn to the midshipmen’s mess when the purser’s junk had become as tough as the fore-topsel weather earrings."* — Charles Dickens, *Bleak House* |
| [[purslane]] | noun | **1.** A plant of the family portulacaceae having fleshy succulent obovate leaves often grown as a potherb or salad herb; a weed in some areas. | *"The Purslane white rust (_Cystopus Portulacæ_, D."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[pursual]] | noun | **1.** The act of pursuing in an effort to overtake or capture. | *"In academic literature, pursual designates the act of pursuing in an effort to overtake or capture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pursuance]] | noun | **1.** A search for an alternative that meets cognitive criteria.<br>**2.** The continuance of something begun with a view to its completion. | *"Lord bless you, my dears, an infant, an infant!” In pursuance of this plan, we went into London on an early day and presented ourselves at Mr."* — Charles Dickens, *Bleak House* |
| [[pursuant]] | adjective | **1.** (followed by `to') in conformance to or agreement with. | *"Bogsby’s direction pursuant to the Act of George the Second, that he (Mr."* — Charles Dickens, *Bleak House* |
| [[pursue]] | verb | **1.** Carry out or participate in an activity; be involved in.<br>**2.** Follow in or as if in pursuit. | *"Here he comes; I pray you make us friends; I will pursue the amity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pursued]] | noun | **1.** A person who is being chased.<br>**2.** Carry out or participate in an activity; be involved in. | *"Would I might never O’ertake pursued success, but I do feel, By the rebound of yours, a grief that smites My very heart at root."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pursuer]] | noun | **1.** A person who is pursuing and trying to overtake or capture.<br>**2.** A person who pursues some plan or goal. | *"To strike at him on any of these occasions would be to fell and disable him, but the pursuer cannot resolve to do that, and so the grimly ridiculous pursuit continues."* — Charles Dickens, *Bleak House* |
| [[pursuing]] | verb | **1.** Carry out or participate in an activity; be involved in.<br>**2.** Follow in or as if in pursuit. | *"He is their god; he leads them like a thing Made by some other deity than Nature, That shapes man better; and they follow him Against us brats with no less confidence Than boys pursuing summer butterflies Or butchers killing flies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pursuit]] | noun | **1.** The act of pursuing in an effort to overtake or capture.<br>**2.** A search for an alternative that meets cognitive criteria. | *"Mad in pursuit and in possession so, Had, having, and in quest, to have extreme, A bliss in proof, and proved, a very woe; Before a joy proposed behind a dream."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pursy]] | adjective | **1.** Breathing laboriously or convulsively. | *"Forgive me this my virtue; For in the fatness of these pursy times Virtue itself of vice must pardon beg, Yea, curb and woo for leave to do him good."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[purulence]] | noun | **1.** Symptom of being purulent (containing or forming pus).<br>**2.** A fluid product of inflammation. | *"In academic literature, purulence designates symptom of being purulent (containing or forming pus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purulency]] | noun | **1.** Symptom of being purulent (containing or forming pus). | *"In academic literature, purulency designates symptom of being purulent (containing or forming pus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[purulent]] | adjective | **1.** Containing pus. | *"It was attended with purulent expectoration, and became so troublesome as to entitle it to be regarded as the leading feature of the case."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[purus]] | noun | **1.** A brazilian river; tributary of the amazon river. | *"Let’s see: [_Reads_.] _Integer vitae, scelerisque purus, Non eget Mauri iaculis, nec arcu._ CHIRON."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repurchase]] | noun | **1.** The act of purchasing back something previously sold.<br>**2.** Buy what had previously been sold, lost, or given away. | *"The man of the Fancy Repository and Brompton Emporium of Fine Arts (of whom she bought the screens, vainly hoping that he would repurchase them when ornamented by her hand) can hardly hide the sneer with which he examines these feeble works of art."* — William Makepeace Thackeray, *Vanity Fair* |
| [[suppurate]] | verb | **1.** Cause to ripen and discharge pus.<br>**2.** Ripen and generate pus. | *"In academic literature, suppurate designates cause to ripen and discharge pus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppuration]] | noun | **1.** (medicine) the formation of morbific matter in an abscess or a vesicle and the discharge of pus.<br>**2.** A fluid product of inflammation. | *"This was described as “inflammation of the right parotid gland.” On August 24th it was decided to make an incision below and forward of the right ear, in order to prevent suppuration."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[suppurative]] | adjective | **1.** Relating to or characterized by suppuration. | *"In academic literature, suppurative designates relating to or characterized by suppuration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexpurgated]] | adjective | **1.** Not having material deleted; - havelock ellis. | *"In academic literature, unexpurgated designates not having material deleted; - havelock ellis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpurified]] | adjective | **1.** Not made pure. | *"In academic literature, unpurified designates not made pure."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PUR
  </div>
</div>
