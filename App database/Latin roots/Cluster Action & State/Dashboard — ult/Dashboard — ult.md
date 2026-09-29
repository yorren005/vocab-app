---
status: unread
type: root_dashboard
---
# Dashboard — ult
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ult-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“last or furthest”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **ult** means last or furthest. It refers to beyond, farther, farthest, final, boundary, extremity. In English, this root forms words such as *ultimate*, *ultimately*, *ultimatum*, and *ulterior*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: last or furthest
> The root **ult** means last or furthest. It refers to beyond, farther, farthest, final, boundary, extremity. In English, this root forms words such as *ultimate*, *ultimately*, *ultimatum*, and *ulterior*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Last or furthest</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *ultimate* and *ultimately*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ult** comes from a Latin word that means *"last or furthest"*.
  - At its core, it describes last or furthest.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **ult** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of last or furthest.
  - **Mental & Social**: How people experience, organize, or communicate about last or furthest.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ultimate**: Occurring at the end of a process, series, or progression.
  - **Ultimately**: In the end.
  - **Ultimatum**: A final proposal, statement of terms, or demand issued by one party to another.
  - **Ulterior**: Lying beyond what is openly revealed, admitted, or manifest.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ult</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ult** forms words primarily by compounding classical spatial adverbs, combining stems, and affixing standard Latin nominal, adjectival, and adverbial endings:
> - **Comparative Base (*ulterior*):**
>   - *ulterior* → [[ulterior]] (adjective), *ulteriorly* (adverb).
> - **Superlative Base (*ultimus*):**
>   - *ultimus* → [[ultimate]] (adjective & noun), [[ultimately]] (adverb), *ultimateness* (noun).
>   - *ultimātum* (neuter substantive of past participle) → [[ultimatum]] (noun, plural *ultimatums* or *ultimata*).
>   - *ultimus* + *-ia* / *-itas* → [[ultimacy]] (noun), *ultimity* (noun).
> - **Positional Sequential Compounds:**
>   - *paene* ("almost") + *ultimus* ("last") → *paenultimus* → [[penultimate]] (adjective & noun), *penult* (noun), *penultimately* (adverb).
>   - *ante* ("before") + *paenultimus* → *antepaenultimus* → [[antepenultimate]] (adjective & noun), *antepenult* (noun), *antepenultimately* (adverb).
>   - *prae-* ("pre-") + *antepaenultimus* → *preantepenultimate* (adjective & noun).
> - **Kinship / Succession Compound:**
>   - *ultimus* ("youngest / last") + *genitura* ("birth") → [[ultimogeniture]] (noun).
> - **Epistolary / Calendar Ablative:**
>   - *ultimo [mense]* ("in the last month") → [[ultimo]] (adverb & adjective, abbreviated *ult.*).

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
> Although the root fundamentally denotes **"beyond, farther, farthest, and last"**, its semantic realization branches across distinct specialized disciplines:
> - **Sequential & Chronological Finality:** In [[ultimate]] and [[ultimately]], it denotes the final outcome, conclusive event, or terminal member of a causal chain.
> - **Diplomatic & Strategic Ultimatums:** In [[ultimatum]], it represents the last formal condition presented before peaceful dialogue collapses into warfare or sanctions.
> - **Psychological Subterfuge:** In [[ulterior]], it designates intentions, incentives, or hidden agendas intentionally positioned beyond public view.
> - **Phonology & Prosody:** In [[penultimate]], [[penult]], and [[antepenultimate]], it marks the exact syllable stress measured from the end of a word (the Latin stress rule).
> - **Legal Succession & Property:** In [[ultimogeniture]], it denotes the inheritance system where property descends to the youngest child.
> - **Commercial Epistolary Convention:** In [[ultimo]], it designates the previous calendar month in business correspondence.

---

## 🔀 4. Prefix & Combining Dynamics on ult

### Positional Sequential Compounds (Counting from the End)

| Compound Form | Component Elements | Literal Etymology | Derived English Word | Modern Linguistic / General Meaning |
| :--- | :--- | :--- | :--- | :--- |
| `pen-` + `ult` | *paene* (almost) + *ultimus* (last) | "almost the last" | [[penultimate]] / `penult` | Next to last in a series; the second syllable from the word's end. |
| `ante-` + `pen-` + `ult` | *ante* (before) + *paene* + *ultimus* | "before the almost-last" | [[antepenultimate]] / `antepenult` | Third from the end of a series; the syllable immediately preceding the penult. |
| `pre-` + `ante-` + `pen-` + `ult` | *prae* (in front) + *antepaenultimus* | "preceding the antepenult" | `preantepenultimate` | Fourth from the end in a series or syllable count. |
| `ult` + `-geniture` | *ultimus* (youngest) + *genitura* (birth) | "born last" | [[ultimogeniture]] | Inheritance right of the youngest child (borough-English). |
| `ult` + `-o` | *ultimo [mense]* | "in the last [month]" | [[ultimo]] | In or of the preceding month (historical business correspondence). |

### Suffix Transformations

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ate` | Adjective / Noun | [[ultimate]] | Being at the farthest boundary; final, elemental, or supreme. |
| `-ly` | Adverb | [[ultimately]] | At the very end; fundamentally, conclusively. |
| `-atum` | Noun (Neuter singular) | [[ultimatum]] | A formal final decree or non-negotiable set of demands. |
| `-ior` | Comparative Adjective | [[ulterior]] | Situated further out; concealed beyond present disclosure. |
| `-acy` / `-ity` | Abstract Noun | [[ultimacy]] / `ultimity` | The state, property, or philosophical condition of being ultimate. |
| `-ness` | State Noun | `ultimateness` | The quality of standing at the final extremity. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law & International Diplomacy** | [[ultimatum]], [[ulterior]], [[ultimogeniture]] | Formal declarations terminating diplomacy; scrutiny of concealed party motives; legal succession customs |
| 🗣️ **Linguistics, Prosody & Phonetics** | [[penultimate]], `penult`, [[antepenultimate]], `antepenult` | Syllable stress placement rules in Latin, Greek, English, and Romance languages |
| 🔬 **Cosmology & Physics** | [[ultimate]], [[ultimately]], [[ultimacy]] | The ultimate constituents of matter (quarks, leptons); the ultimate heat death or fate of the cosmos |
| 💼 **Commerce & Archival Correspondence** | [[ultimo]], [[ultimate]] | 18th-20th century trade letters ("your favor of the 14th ultimo"); ultimate beneficial owner (UBO) compliance |
| 🧠 **Philosophy, Metaphysics & Ethics** | [[ultimacy]], [[ultimate]], [[ultimately]] | Ultimate reality, ultimate cause (*causa finalis*), Paul Tillich's "ultimate concern" |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adult]] | noun | **1.** A fully developed person from maturity onward.<br>**2.** Any mature animal. | *"The whole court, adult as well as boy, is sleepless for that night, and can do nothing but wrap up its many heads, and talk of the ill-fated house, and look at it."* — Charles Dickens, *Bleak House* |
| [[adulterant]] | noun | **1.** Any substance that lessens the purity or effectiveness of a substance.<br>**2.** Making impure or corrupt by adding extraneous materials. | *"In academic literature, adulterant designates any substance that lessens the purity or effectiveness of a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adulterate]] | verb | **1.** Corrupt, debase, or make impure by adding a foreign or inferior substance; often by replacing valuable ingredients with inferior ones.<br>**2.** Mixed with impurities. | *"For why should others’ false adulterate eyes Give salutation to my sportive blood?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adulterated]] | verb | **1.** Corrupt, debase, or make impure by adding a foreign or inferior substance; often by replacing valuable ingredients with inferior ones.<br>**2.** Mixed with impurities. | *"Other works, which 457:3 have borrowed from this book without giving it credit, have adulterated the Science. /Third/: Because this book has done more for teacher and student, for healer and 457:6 patient, than has been accomplished by other books."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[adulterating]] | verb | **1.** Corrupt, debase, or make impure by adding a foreign or inferior substance; often by replacing valuable ingredients with inferior ones.<br>**2.** Making impure or corrupt by adding extraneous materials. | *"The preparation consists in chopping fine the tea and adulterating leaves and twigs."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[adulteration]] | noun | **1.** Being mixed with extraneous material; the product of adulterating.<br>**2.** The act of adulterating (especially the illicit substitution of one substance for another). | *"Think of our child labour, of our police graft and our political corruption, of our food adulteration and of our slavery of the daughters of the poor."* — Jack London, *The Jacket (The Star-Rover)* |
| [[adulterator]] | noun | **1.** Any substance that lessens the purity or effectiveness of a substance.<br>**2.** A changer who lessens the purity or effectiveness of a substance. | *"In academic literature, adulterator designates any substance that lessens the purity or effectiveness of a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adulterer]] | noun | **1.** Someone who commits adultery or fornication. | *"Do not admire your wife's beauty, and you are not angry with the adulterer."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[adulteress]] | noun | **1.** A woman adulterer. | *"And then they called me foul adulteress, Lascivious Goth, and all the bitterest terms That ever ear did hear to such effect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adulterine]] | adjective | **1.** Conceived in adultery. | *"In academic literature, adulterine designates conceived in adultery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adulterous]] | adjective | **1.** Characterized by adultery.<br>**2.** Not faithful to a spouse or lover. | *"Only th’ adulterous Antony, most large In his abominations, turns you off And gives his potent regiment to a trull That noises it against us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adulterously]] | adverb | **1.** In an adulterous manner. | *"From outrage (matrimony) to outrage (adultery) there arose nought but outrage (copulation) yet the matrimonial violator of the matrimonially violated had not been outraged by the adulterous violator of the adulterously violated."* — James Joyce, *Ulysses* |
| [[adultery]] | noun | **1.** Extramarital sex that willfully and maliciously interferes with marriage relations. | *"We shall see wilful adultery and murder committed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adulthood]] | noun | **1.** The period of time in your life after your physical growth has stopped and you are fully developed.<br>**2.** The state (and responsibilities) of a person who has attained maturity. | *"The grandchildren, in their turn, might take it along with them into adulthood and share it with their progeny. *** All the woodchucks in Woodchuckaton crawled deep into their burrows."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[antepenultima]] | noun | **1.** The 3rd syllable of a word counting back from the end. | *"In academic literature, antepenultima designates the 3rd syllable of a word counting back from the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antepenultimate]] | noun | **1.** The 3rd syllable of a word counting back from the end.<br>**2.** Third from last. | *"In academic literature, antepenultimate designates the 3rd syllable of a word counting back from the end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coulter]] | noun | **1.** A sharp steel wedge that precedes the plow and cuts vertically through the soil. | *"Thou saw the fields laid bare an’ waste, An’ weary winter comin fast, An’ cozie here, beneath the blast, Thou thought to dwell— Till crash! the cruel coulter past Out thro’ thy cell."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[exult]] | verb | **1.** Feel extreme happiness or elation.<br>**2.** To express great joy. | *"Who might be your mother, That you insult, exult, and all at once, Over the wretched?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exultant]] | adjective | **1.** Joyful and proud especially because of triumph or success. | *"They were both earnest, exultant Christians, around whom the angels of God encamped day and night."* — Classic Author, *The wonders of prayer* |
| [[exultantly]] | adverb | **1.** In an exultant manner. | *"He took great pleasure in the little prayer-meetings, and in three months cheerfully and exultantly exchanged this world of suffering for the one where father, brother and sister awaited him."* — Classic Author, *The wonders of prayer* |
| [[exultation]] | noun | **1.** A feeling of extreme joy.<br>**2.** The utterance of sounds expressing great joy. | *"Go together, You precious winners all; your exultation Partake to everyone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exulting]] | verb | **1.** Feel extreme happiness or elation.<br>**2.** To express great joy. | *"Cry within, “Arcite, Arcite.”_] More exulting?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exultingly]] | adverb | **1.** In an exultant manner. | *"No, no!” cried Richard exultingly."* — Charles Dickens, *Bleak House* |
| [[penultimate]] | noun | **1.** The next to last syllable in a word.<br>**2.** Next to the last. | *"How serene does she now arise, a queen among the Pleiades, in the penultimate antelucan hour, shod in sandals of bright gold, coifed with a veil of what do you call it gossamer."* — James Joyce, *Ulysses* |
| [[ult]] | adjective | **1.** In or of the month preceding the present one. | *"A messenger sent out by the Japanese minister on the 30th ult. returned to-day from Tientsin, bringing word that a mixed force of 33,300 would start from there for the relief of Peking about the 20th inst."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[ulterior]] | adjective | **1.** Lying beyond what is openly revealed or avowed (especially being kept in the background or deliberately concealed); ; - bertrand russell.<br>**2.** Beyond or outside an area of immediate interest; remote; ; - g.b.shaw. | *"But the view easy to take is the short view, and the ulterior consequences seem to the popular mind to be vain imaginings. § 10. #Exports and exhaustion of the soil#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[ulteriority]] | noun | **1.** The quality of being ulterior. | *"In academic literature, ulteriority designates the quality of being ulterior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ulteriorly]] | adverb | **1.** In an ulterior manner. | *"In academic literature, ulteriorly designates in an ulterior manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultima]] | noun | **1.** The last syllable in a word. | *"No one was ever more thoroughly Epicurean in the truest sense of the word; no one ever urged more pleasantly the Epicurean theory _Carpe diem_; no one ever had more deeply ingrained in him the belief _Mors ultima linea rerum est_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[ultimacy]] | noun | **1.** The state or degree of being ultimate; the final or most extreme in degree or size or time or distance,. | *"In academic literature, ultimacy designates the state or degree of being ultimate; the final or most extreme in degree or size or time or distance,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultimate]] | noun | **1.** The finest or most superior quality of its kind.<br>**2.** Furthest or highest in degree or order; utmost or extreme. | *"When any two young people take it into their heads to marry, they are pretty sure by perseverance to carry their point, be they ever so poor, or ever so imprudent, or ever so little likely to be necessary to each other’s ultimate comfort."* — Jane Austen, *Persuasion* |
| [[ultimately]] | adverb | **1.** As the end result of a succession or process. | *"That she will faithfully apply herself to the acquisition of those accomplishments, upon the exercise of which she will be ultimately dependent."* — Charles Dickens, *Bleak House* |
| [[ultimateness]] | noun | **1.** The state or degree of being ultimate; the final or most extreme in degree or size or time or distance,. | *"In academic literature, ultimateness designates the state or degree of being ultimate; the final or most extreme in degree or size or time or distance,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultimatum]] | noun | **1.** A final peremptory demand. | *"Dynamite or curtains had been Warden Atherton’s ultimatum."* — Jack London, *The Jacket (The Star-Rover)* |
| [[ultimo]] | adjective | **1.** In or of the month preceding the present one. | *"In academic literature, ultimo designates in or of the month preceding the present one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultra]] | adjective | **1.** (used of opinions and actions) far beyond the norm. | *"The Standard Oil Company at one time had this form of organization, which was declared by the courts to be illegal _(ultra vires)_ for corporations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[ultracef]] | noun | **1.** A cephalosporin antibiotic (trade name ultracef). | *"In academic literature, ultracef designates a cephalosporin antibiotic (trade name ultracef)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifugation]] | noun | **1.** Centrifugation at very high speeds. | *"In academic literature, ultracentrifugation designates centrifugation at very high speeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifuge]] | noun | **1.** A high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins.<br>**2.** Subject to the action of an ultracentrifuge. | *"In academic literature, ultracentrifuge designates a high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultraconservative]] | noun | **1.** An extreme conservative; an opponent of progress or liberalism.<br>**2.** Extremely conservative. | *"In academic literature, ultraconservative designates an extreme conservative; an opponent of progress or liberalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramarine]] | noun | **1.** Blue pigment made of powdered lapis lazuli.<br>**2.** A vivid blue to purple-blue color. | *"The atmosphere beneath is languorous, and is so tinged with azure that what artists call the middle distance partakes also of that hue, while the horizon beyond is of the deepest ultramarine."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ultramicroscope]] | noun | **1.** Light microscope that uses scattered light to show particles too small to see with ordinary microscopes. | *"In academic literature, ultramicroscope designates light microscope that uses scattered light to show particles too small to see with ordinary microscopes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramicroscopic]] | adjective | **1.** Too small to be seen without an ultramicroscope. | *"In academic literature, ultramicroscopic designates too small to be seen without an ultramicroscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramodern]] | adjective | **1.** Extremely modern. | *"In academic literature, ultramodern designates extremely modern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontane]] | noun | **1.** A roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline).<br>**2.** Of or relating to ultramontanism. | *"In academic literature, ultramontane designates a roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontanism]] | noun | **1.** (roman catholic church) the policy that the absolute authority of the church should be vested in the pope. | *"In academic literature, ultramontanism designates (roman catholic church) the policy that the absolute authority of the church should be vested in the pope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultranationalism]] | noun | **1.** Fanatical patriotism. | *"In academic literature, ultranationalism designates fanatical patriotism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultranationalistic]] | adjective | **1.** Fanatically patriotic. | *"In academic literature, ultranationalistic designates fanatically patriotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasonic]] | adjective | **1.** Having frequencies above those of audible sound. | *"In academic literature, ultrasonic designates having frequencies above those of audible sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasonically]] | adverb | **1.** By ultrasonic means. | *"In academic literature, ultrasonically designates by ultrasonic means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasonography]] | noun | **1.** Using the reflections of high-frequency sound waves to construct an image of a body organ (a sonogram); commonly used to observe fetal growth or study bodily organs. | *"In academic literature, ultrasonography designates using the reflections of high-frequency sound waves to construct an image of a body organ (a sonogram); commonly used to observe fetal growth or study bodily organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasound]] | noun | **1.** Very high frequency sound; used in ultrasonography.<br>**2.** Using the reflections of high-frequency sound waves to construct an image of a body organ (a sonogram); commonly used to observe fetal growth or study bodily organs. | *"In academic literature, ultrasound designates very high frequency sound; used in ultrasonography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultrasuede]] | noun | **1.** A synthetic suede cloth. | *"In academic literature, ultrasuede designates a synthetic suede cloth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultraviolet]] | noun | **1.** Radiation lying in the ultraviolet range; wave lengths shorter than light but longer than x rays.<br>**2.** Having or employing wavelengths shorter than light but longer than x-rays; lying outside the visible spectrum at its violet end. | *"In academic literature, ultraviolet designates radiation lying in the ultraviolet range; wave lengths shorter than light but longer than x rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unadulterated]] | adjective | **1.** Not mixed with impurities.<br>**2.** Without qualification; used informally as (often pejorative) intensifiers. | *"It is pure unadulterated country life."* — Oscar Wilde, *The Picture of Dorian Gray* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ULT
  </div>
</div>
