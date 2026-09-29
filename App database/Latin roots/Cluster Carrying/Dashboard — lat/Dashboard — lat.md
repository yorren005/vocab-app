---
status: unread
type: root_dashboard
---
# Dashboard — lat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“carried or borne”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a heavy load and carrying it forward with steady strength.</span>
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

The root **lat** means carried or borne. It refers to bearing a burden, conveying goods, or carrying weight. In English, this root forms words such as *translate*, *relative*, *elated*, and *collate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: carried or borne
> The root **lat** means carried or borne. It refers to bearing a burden, conveying goods, or carrying weight. In English, this root forms words such as *translate*, *relative*, *elated*, and *collate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Carried or borne</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a heavy load and carrying it forward with steady strength.</mark>
> - **Everyday Connection**: Think of familiar words like *translate* and *relative*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lat** comes from a Latin word that means *"carried or borne"*.
  - At its core, it describes carried or borne.

- **The Big Picture Idea**:
  - Picture lifting a heavy load and carrying it forward with steady strength.
  - Whenever you see **lat** in an English word, think of **carrying weight and transporting goods**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of carried or borne.
  - **Mental & Social**: How people experience, organize, or communicate about carried or borne.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Translate**: To render or turn written or spoken words from one language into another while preserving semantic fidelity.
  - **Relative**: Considered in relation, comparison, or proportion to something else.
  - **Elated**: An everyday English word showing the root's idea of *carried or borne*.
  - **Collate**: To compare manuscripts, texts, or data sets critically in order to identify variants, errors, and discrepancies.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lat</mark>, think of <mark class="hl-def">carrying weight and transporting goods</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Participial Dynamics
> The root **lat** functions in Modern English primarily as a verbal and nominal combining stem derived from Latin 4th principal parts:
> - **Frequentative / Participial Verb Base:** `lat-` + `-ate` / `-ation`:
>   - *com- + lat- + -e* → [[collate]] (compare critically).
>   - *trans- + lat- + -e* → [[translate]] (render across languages).
>   - *re- + lat- + -e* → [[relate]] (narrate, connect).
>   - *ex- + lat- + -e* → [[elate]] (lift with joy).
>   - *legis + lat- + -or* → [[legislator]] (lawgiver).
> - **Action / Result Nouns in `-tion`:**
>   - *ab- + lat- + -ion* → [[ablation]] (surgical removal, glacial melting).
>   - *trans- + lat- + -ion* → [[translation]] (linguistic conversion).
>   - *con- + lat- + -ion* → [[collation]] (textual comparison, light meal).
>   - *ob- + lat- + -ion* → [[oblation]] (sacrificial offering).
>   - *il- + lat- + -ion* → [[illation]] (deductive inference).
> - **Grammatical & Relational Adjectives in `-ive`:**
>   - *super- + lat- + -ive* → [[superlative]] (highest grammatical degree).
>   - *ab- + lat- + -ive* → [[ablative]] (case of separation/taking away).
>   - *il- + lat- + -ive* → [[illative]] (inferential conjunction).
>   - *re- + lat- + -ive* → [[relative]] (connected, comparative).
> - **Romance Phonetic Evolution (Norman French *delaier*):**
>   - Latin *differre* (supine *dīlātum* "to postpone") → Old French *delaier* → English [[delay]].

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

> [!tip] 🌈 Spectrum of Meaning Across Four Concentric Spheres
> 1. **Communication, Translation & Hermeneutics:** Carrying thoughts between languages, critically comparing texts, and establishing narrative or scientific connections ([[translate]], [[translation]], [[translator]], [[collate]], [[collation]], [[relate]], [[relation]], [[relative]], [[correlate]], [[correlation]]).
> 2. **Governance, Law & Social Hierarchy:** Carrying laws before the electorate, establishing statutes, and ecclesiastical ranks carried before the faithful ([[legislate]], [[legislation]], [[legislator]], [[legislative]], [[legislature]], [[prelate]], [[prelacy]]).
> 3. **Physical Removal, Sacrifice & Celestial Geometry:** Excising bodily tissue, melting glacial surfaces, presenting holy offerings, and geometric spheres flattened by rotational forces ([[ablation]], [[ablative]], [[oblation]], [[oblate]]).
> 4. **Psychological Elevation, Logic & Deferral:** Lifting the human spirit with euphoric joy, logical deduction, grammatical extremes, and postponing temporal events ([[elate]], [[elation]], [[illation]], [[illative]], [[superlative]], [[delay]], [[dilate]], [[dilation]]).

---

## 🔀 4. Prefix & Combining Dynamics on lat

| Prefix | Classical Form | Combined Derivative | Perfective Semantic Synthesis |
| :--- | :--- | :--- | :--- |
| `ab-` | away, from | [[ablation]], [[ablative]] | Carried *away* → surgical excision; grammatical case of origin. |
| `con-` (col-) | together | [[collate]], [[collation]] | Carried *together* → assembled for comparison. |
| `con-` + `re-` | together + back | [[correlate]], [[correlation]] | Carried *back together* → mutual reciprocal relationship. |
| `dis-` (di-) | apart, away | [[delay]], [[dilate]], [[dilation]] | Carried *apart* → postponed in time; expanded wide in space. |
| `ex-` (e-) | out, up | [[elate]], [[elation]] | Carried *up and out* → elevated with triumphant joy. |
| `in-` (il-) | into, toward | [[illation]], [[illative]] | Carried *inward* → a conclusion carried in from evidence. |
| `lēg-` (lēx) | law | [[legislate]], [[legislator]] | *Law-carrier* → one who proposes or enacts legal statutes. |
| `ob-` | toward, before | [[oblate]], [[oblation]] | Carried *before* the altar → a consecrated offering. |
| `prae-` | before, in front | [[prelate]], [[prelacy]] | One *carried in front* → a high-ranking church dignitary. |
| `re-` | back, again | [[relate]], [[relation]], [[relative]] | Carried *back* → recounted in speech; a family connection. |
| `super-` | above, beyond | [[superlative]] | Carried *above all others* → supreme, highest degree. |
| `trans-` | across, beyond | [[translate]], [[translation]] | Carried *across* → words moved into another language. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| ⚖️ **Law & Constitutional Governance** | [[legislate]], [[legislation]], [[legislator]], [[legislative]], [[legislature]] | The bicameral legislative branch of government, drafting statutory legislation, constitutional delegation of powers, and regulatory compliance. |
| 🩺 **Surgery, Aerospace & Glaciology** | [[ablation]], [[dilate]], [[dilation]] | Radiofrequency catheter ablation for cardiac atrial arrhythmias; laser ablation of corneal tissue (LASIK); thermal ablation heat shields protecting re-entering spacecraft; glacial ablation through surface melting; pupil dilation in ophthalmology. |
| 📚 **Linguistics & Textual Criticism** | [[translate]], [[translation]], [[translator]], [[collate]], [[collation]], [[ablative]], [[superlative]], [[illative]] | Textual collation of ancient scriptural codices; Machine Translation (MT) and Natural Language Processing; Latin ablative absolute syntax; grammatical degrees of comparison. |
| 🔬 **Physics, Statistics & Logic** | [[relation]], [[relative]], [[relativity]], [[correlate]], [[correlation]], [[illation]] | Albert Einstein's Special and General Theories of Relativity; Pearson correlation coefficients in biostatistics; formal illative logic deriving theorems from axioms. |
| ⛪ **Theology & Ecclesiastical History** | [[prelate]], [[prelacy]], [[oblation]], [[oblate]] | The Roman Curia and episcopal prelates; monastic oblates dedicated to Saint Benedict's rule; Eucharistic oblations during the liturgy of the Mass. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ablate]] | verb | **1.** Wear away through erosion or vaporization.<br>**2.** Remove an organ or bodily structure. | *"In academic literature, ablate designates wear away through erosion or vaporization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ablated]] | verb | **1.** Wear away through erosion or vaporization.<br>**2.** Remove an organ or bodily structure. | *"In academic literature, ablated designates wear away through erosion or vaporization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ablation]] | noun | **1.** Surgical removal of a body part or tissue.<br>**2.** The erosive process that reduces the size of glaciers. | *"In academic literature, ablation designates surgical removal of a body part or tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ablative]] | noun | **1.** The case indicating the agent in passive sentences or the instrument or manner or place of the action described by the verb.<br>**2.** Relating to the ablative case. | *"In academic literature, ablative designates the case indicating the agent in passive sentences or the instrument or manner or place of the action described by the verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aflatoxin]] | noun | **1.** A potent carcinogen from the fungus aspergillus; can be produced and stored for use as a bioweapon. | *"In academic literature, aflatoxin designates a potent carcinogen from the fungus aspergillus; can be produced and stored for use as a bioweapon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collate]] | verb | **1.** Compare critically; of texts.<br>**2.** To assemble in proper sequence. | *"But by the time youth slips a stage or two While reading prose in that tough book he wrote, {30} (Collating and emendating the same And settling on the sense most to our mind) We shut the clasps and find life’s summer past."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[collateral]] | noun | **1.** A security pledged for the repayment of a loan.<br>**2.** Descended from a common ancestor but through different lines. | *"In his bright radiance and collateral light Must I be comforted, not in his sphere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collateralize]] | verb | **1.** Pledge as a collateral. | *"In academic literature, collateralize designates pledge as a collateral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collation]] | noun | **1.** A light informal meal.<br>**2.** Assembling in proper numerical or logical sequence. | *"He appeared to have dressed at his leisure in the intervals of a light collation, and his dressing-case, brushes, and so forth, all of quite an elegant kind, lay about."* — Charles Dickens, *Bleak House* |
| [[contralateral]] | adjective | **1.** On or relating to the opposite side (of the body). | *"In academic literature, contralateral designates on or relating to the opposite side (of the body)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[correlate]] | noun | **1.** Either of two or more related or complementary variables.<br>**2.** To bear a reciprocal or mutual relation. | *"And queer as it is I have to positively control the desire to answer him with the correlated title--Adam!"* — Maria Thompson Daviess, *The Tinder-Box* |
| [[correlated]] | verb | **1.** To bear a reciprocal or mutual relation.<br>**2.** Bring into a mutual, complementary, or reciprocal relation. | *"And queer as it is I have to positively control the desire to answer him with the correlated title--Adam!"* — Maria Thompson Daviess, *The Tinder-Box* |
| [[correlation]] | noun | **1.** A reciprocal relation between two or more things.<br>**2.** A statistic representing how closely two variables co-vary; it can vary from -1 (perfect negative correlation) through 0 (no correlation) to +1 (perfect positive correlation). | *"He scanned through his memorized star catalogues, trying to find the correlation."* — Algis Budrys, *Citadel* |
| [[correlational]] | adjective | **1.** Relating to or employing correlation. | *"In academic literature, correlational designates relating to or employing correlation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[correlative]] | noun | **1.** Either of two or more related or complementary variables.<br>**2.** Mutually related. | *"In academic literature, correlative designates either of two or more related or complementary variables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[correlativity]] | noun | **1.** A reciprocal relation between two or more things. | *"In academic literature, correlativity designates a reciprocal relation between two or more things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decollate]] | verb | **1.** Cut the head of. | *"In academic literature, decollate designates cut the head of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilatation]] | noun | **1.** The state of being stretched beyond normal dimensions.<br>**2.** The act of expanding an aperture. | *"In academic literature, dilatation designates the state of being stretched beyond normal dimensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilate]] | verb | **1.** Become wider.<br>**2.** Add details, as to an account or idea; clarify the meaning of and discourse in a learned way, usually in writing. | *"And for the sake of them thou sorrowest for, Do me the favour to dilate at full What have befall’n of them and thee till now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dilater]] | noun | **1.** A surgical instrument that is used to dilate or distend an opening or an organ. | *"In academic literature, dilater designates a surgical instrument that is used to dilate or distend an opening or an organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilation]] | noun | **1.** A lengthy discussion (spoken or written) on a particular topic.<br>**2.** The act of expanding an aperture. | *"The resisting power, those natural dilations of the youthful spirit, which circumstances cannot straiten--with us are long since passed away."* — Anne Gilchrist, *Mary Lamb* |
| [[dilator]] | noun | **1.** A muscle or nerve that dilates or widens a body part.<br>**2.** A drug that causes dilation. | *"In academic literature, dilator designates a muscle or nerve that dilates or widens a body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilatoriness]] | noun | **1.** Slowness as a consequence of not getting around to it. | *"If no such cabal should exist, the mere diversity of views and opinions would alone be sufficient to tincture the exercise of the executive authority with a spirit of habitual feebleness and dilatoriness."* — Alexander Hamilton, *The Federalist Papers* |
| [[dilatory]] | adjective | **1.** Wasting time. | *"I abhor This dilatory sloth and tricks of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[elate]] | verb | **1.** Fill with high spirits; fill with optimism. | *"Men too often confound them: they should not be confounded: appearance should not be mistaken for truth; narrow human doctrines, that only tend to elate and magnify a few, should not be substituted for the world-redeeming creed of Christ."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[elated]] | verb | **1.** Fill with high spirits; fill with optimism.<br>**2.** Exultantly proud and joyful; in high spirits. | *"Troy was not greatly elated by the appreciative spirit in which he was undoubtedly treated, but he thought the engagement might afford him a few weeks for consideration."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[elater]] | noun | **1.** Any of various widely distributed beetles. | *"In academic literature, elater designates any of various widely distributed beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elaterid]] | noun | **1.** Any of various widely distributed beetles. | *"In academic literature, elaterid designates any of various widely distributed beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elateridae]] | noun | **1.** Click beetles and certain fireflies. | *"In academic literature, elateridae designates click beetles and certain fireflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elating]] | verb | **1.** Fill with high spirits; fill with optimism.<br>**2.** Making lively and joyful. | *"In academic literature, elating designates fill with high spirits; fill with optimism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elation]] | noun | **1.** An exhilarating psychological state of pride and optimism; an absence of depression.<br>**2.** A feeling of joy and pride. | *"As to my feelings I shall say nothing, because I do not look upon the honour as one of a kind that ought to excite the least elation ..."* — John Cairns, *Principal Cairns* |
| [[illation]] | noun | **1.** The reasoning involved in drawing a conclusion or making a logical judgment on the basis of circumstantial evidence and prior conclusions rather than on the basis of direct observation. | *"In academic literature, illation designates the reasoning involved in drawing a conclusion or making a logical judgment on the basis of circumstantial evidence and prior conclusions rather than on the basis of direct observation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illative]] | adjective | **1.** Relating to or having the nature of illation or inference.<br>**2.** Resembling or dependent on or arrived at by inference. | *"In academic literature, illative designates relating to or having the nature of illation or inference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrelate]] | verb | **1.** Be in a relationship with.<br>**2.** Place into a mutual relationship. | *"Both the prices of all the particular objects of international trade and the general levels of prices in any two trading countries come to be pretty definitely interrelated."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[interrelated]] | verb | **1.** Be in a relationship with.<br>**2.** Place into a mutual relationship. | *"Both the prices of all the particular objects of international trade and the general levels of prices in any two trading countries come to be pretty definitely interrelated."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[interrelatedness]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"In academic literature, interrelatedness designates mutual or reciprocal relation or relatedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrelation]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"When the interrelation of the factors is recognized there is little likelihood of concluding that some one of them will absorb all the benefits of progress."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[interrelationship]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"In academic literature, interrelationship designates mutual or reciprocal relation or relatedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lat]] | noun | **1.** A broad flat muscle on either side of the back. | *"On the 5th of March, 1867, the _Moravian_, of the Montreal Ocean Company, finding herself during the night in 27° 30′ lat. and 72° 15′ long., struck on her starboard quarter a rock, marked in no chart for that part of the sea."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[latakia]] | noun | **1.** Aromatic turkish tobacco.<br>**2.** A seaport on the western coast of syria. | *"In academic literature, latakia designates aromatic turkish tobacco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latanier]] | noun | **1.** Fan palms of the southern united states and the caribbean region. | *"In academic literature, latanier designates fan palms of the southern united states and the caribbean region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latch]] | noun | **1.** Spring-loaded doorlock that can only be opened from the outside with a key.<br>**2.** Catch for fastening a door or gate; a bar that can be lowered or slid into a groove. | *"But I have words That would be howl’d out in the desert air, Where hearing should not latch them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latchet]] | noun | **1.** A leather strap or thong used to attach a sandal or shoe to the foot. | *"Because I am subduing myself to permanent consciousness of my unworthiness to unloose the latchet of Dr."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[latchkey]] | noun | **1.** Key for raising or drawing back a latch or opening an outside door. | *"Walcott took out his latchkey, opened the door, and led the way into the library."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[latchstring]] | noun | **1.** Opener consisting of a string that can be passed through a hole in a door for raising the latch from outside. | *"In academic literature, latchstring designates opener consisting of a string that can be passed through a hole in a door for raising the latch from outside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[late]] | adjective | **1.** Being or occurring at an advanced period of time or after a usual or expected time.<br>**2.** After the expected or usual time; delayed. | *"Madam, I was very late more near her than I think she wish’d me; alone she was, and did communicate to herself her own words to her own ears; she thought, I dare vow for her, they touch’d not any stranger sense."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[late-blooming]] | adjective | **1.** Of plants that bloom during the autumn. | *"In academic literature, late-blooming designates of plants that bloom during the autumn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[late-flowering]] | adjective | **1.** Of plants that bloom during the autumn. | *"In academic literature, late-flowering designates of plants that bloom during the autumn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[late-ripening]] | adjective | **1.** Of plants that ripen in the fall. | *"In academic literature, late-ripening designates of plants that ripen in the fall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[late-spring-blooming]] | adjective | **1.** Of plants that bloom during the spring. | *"In academic literature, late-spring-blooming designates of plants that bloom during the spring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latecomer]] | noun | **1.** Someone who arrives late. | *"Some latecomers took their seats in the stalls, and the curtain rose."* — graf Leo Tolstoy, *War and Peace* |
| [[lateen]] | noun | **1.** A triangular fore-and-aft sail used especially in the mediterranean.<br>**2.** Rigged with a triangular (lateen) sail. | *"The village was on an in-lying island, and its headmen must have sent word across to the mainland; for one morning three big two-masted junks with lateens of rice-matting dropped anchor off the beach."* — Jack London, *The Jacket (The Star-Rover)* |
| [[lateen-rig]] | noun | **1.** The rig on a lateen-rigged sailing vessel. | *"In academic literature, lateen-rig designates the rig on a lateen-rigged sailing vessel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lateen-rigged]] | adjective | **1.** Rigged with a triangular (lateen) sail. | *"In academic literature, lateen-rigged designates rigged with a triangular (lateen) sail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lately]] | adverb | **1.** In the recent past. | *"He was excellent indeed, madam; the king very lately spoke of him admiringly, and mourningly; he was skilful enough to have liv’d still, if knowledge could be set up against mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latency]] | noun | **1.** (computer science) the time it takes for a specific block of data on a data track to rotate around to the read/write head.<br>**2.** The time that elapses between a stimulus and the response to it. | *"In other words it is the negative quality of passiveness either in recoverable latency or insipient latescence."* — Mark Twain, *What Is Man? and Other Essays* |
| [[lateness]] | noun | **1.** Quality of coming late or later in time. | *"He apologized for his lateness: his arrival was evidently by arrangement."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[latent]] | adjective | **1.** Potentially existing but not presently evident or realized.<br>**2.** (pathology) not presently active. | *"It was food for great regret with him; it was also a _contretemps_ which touched into life a latent heat he had experienced in that direction."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[later]] | adjective | **1.** Coming at a subsequent time or stage.<br>**2.** At or toward an end or late period or stage of development. | *"The talk first started from a misfortune which happened years ago, and later on the matter came up and people thought a similar misfortune had taken place again."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[lateral]] | noun | **1.** A pass to a receiver upfield from the passer.<br>**2.** Situated at or extending to the side; ; - tennyson. | *"This dugong, which also bears the name of the halicore, closely resembles the manatee; its oblong body terminated in a lengthened tail, and its lateral fins in perfect fingers."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[lateralisation]] | noun | **1.** Localization of function on either the right or left sides of the brain. | *"In academic literature, lateralisation designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterality]] | noun | **1.** Localization of function on either the right or left sides of the brain.<br>**2.** The property of using one hand more than the other. | *"In academic literature, laterality designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lateralization]] | noun | **1.** Localization of function on either the right or left sides of the brain. | *"In academic literature, lateralization designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lateralize]] | verb | **1.** Move or displace to one side so as to make lateral. | *"In academic literature, lateralize designates move or displace to one side so as to make lateral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterally]] | adverb | **1.** To or by or from the side.<br>**2.** In a lateral direction or location. | *"But to think she can carr’ on alone!” He allowed his head to swing laterally three or four times in silence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lateran]] | noun | **1.** The site in rome containing the church of rome and the lateran palace. | *"In academic literature, lateran designates the site in rome containing the church of rome and the lateran palace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterite]] | noun | **1.** A red soil produced by rock decay; contains insoluble deposits of ferric and aluminum oxides. | *"In academic literature, laterite designates a red soil produced by rock decay; contains insoluble deposits of ferric and aluminum oxides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lates]] | noun | **1.** A genus of large percoid fishes of fresh and brackish water. | *"Knowledge that we can accomplish the good we hope for, stimu- 394:9 lates the system to act in the direction which Mind points out."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[latest]] | noun | **1.** The most recent news or development.<br>**2.** Up to the immediate present; most recent or most up-to-date. | *"Their latest refuge Was to send him, for whose old love I have— Though I showed sourly to him—once more offered The first conditions, which they did refuse And cannot now accept, to grace him only That thought he could do more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latex]] | noun | **1.** A milky exudate from certain plants that coagulates on exposure to air.<br>**2.** A water-base paint that has a latex binder. | *"In academic literature, latex designates a milky exudate from certain plants that coagulates on exposure to air."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laticifer]] | noun | **1.** A plant duct containing latex. | *"In academic literature, laticifer designates a plant duct containing latex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latimeria]] | noun | **1.** Type genus of the latimeridae: coelacanth. | *"In academic literature, latimeria designates type genus of the latimeridae: coelacanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latimeridae]] | noun | **1.** Extinct except for the coelacanth. | *"In academic literature, latimeridae designates extinct except for the coelacanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latin]] | noun | **1.** Any dialect of the language of ancient rome.<br>**2.** An inhabitant of ancient latium. | *"O, that’s the Latin word for three farthings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latin-american]] | adjective | **1.** Of or relating to the countries of latin america or their people. | *"In academic literature, latin-american designates of or relating to the countries of latin america or their people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latinae]] | noun | **1.** A subfamily of the family centropomidae. | *"Dessau, _Inscriptiones Latinae Selectae_, vol. ii."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[latinate]] | adjective | **1.** Derived from or imitative of latin. | *"In academic literature, latinate designates derived from or imitative of latin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latinesce]] | noun | **1.** An artificial language based on latin. | *"In academic literature, latinesce designates an artificial language based on latin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latinise]] | verb | **1.** Write in the latin alphabet.<br>**2.** Cause to adopt catholicism. | *"In academic literature, latinise designates write in the latin alphabet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latinism]] | noun | **1.** A word or phrase borrowed from latin. | *"In academic literature, latinism designates a word or phrase borrowed from latin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latinist]] | noun | **1.** A specialist in the latin language. | *"I am a husband of older standing than you, and shall give you my ideas of the conjugal state, (_en passant_--you know I am no Latinist-is not _conjugal_ derived from _jugum_, a yoke?) Well, then, the scale of good wifeship I divide into ten parts."* — Robert Burns, *The Letters of Robert Burns* |
| [[latinize]] | verb | **1.** Write in the latin alphabet.<br>**2.** Translate into latin. | *"In academic literature, latinize designates write in the latin alphabet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latino]] | noun | **1.** A native of latin america.<br>**2.** An artificial language based on words common to the romance languages. | *"In academic literature, latino designates a native of latin america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latish]] | adjective | **1.** Somewhat late. | *"In academic literature, latish designates somewhat late."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latitude]] | noun | **1.** The angular distance between an imaginary line around a heavenly body parallel to its equator and the equator itself.<br>**2.** Freedom from normal restraints in conduct. | *"Not until January fourteenth, seven weeks since the wreck, did we come up with a warmer latitude."* — Jack London, *The Jacket (The Star-Rover)* |
| [[latitudinal]] | adjective | **1.** Of or relating to latitudes north or south. | *"In academic literature, latitudinal designates of or relating to latitudes north or south."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latitudinarian]] | noun | **1.** A person who is broad-minded and tolerant (especially in standards of religious belief and conduct).<br>**2.** Unwilling to accept authority or dogma (especially in religion). | *"In academic literature, latitudinarian designates a person who is broad-minded and tolerant (especially in standards of religious belief and conduct)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latium]] | noun | **1.** An ancient region of west central italy (southeast of rome) on the tyrrhenian sea. | *"Why should it not have obtained in ancient Latium?"* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[latona]] | noun | **1.** Wife or mistress of zeus and mother of apollo and artemis in ancient mythology; called latona in roman mythology. | *"In academic literature, latona designates wife or mistress of zeus and mother of apollo and artemis in ancient mythology; called latona in roman mythology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latria]] | noun | **1.** The worship given to god alone. | *"In academic literature, latria designates the worship given to god alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latrine]] | noun | **1.** A public toilet in a military area. | *"Inside the corral, south of the graves, we constructed a latrine, and, north of the rifle pit in the centre, a couple of men were told off by father to dig a well for water."* — Jack London, *The Jacket (The Star-Rover)* |
| [[latrobe]] | noun | **1.** United states architect (born in england) whose works include the chambers of the united states congress and the supreme court; considered the first professional architect in the united states (1764-1820). | *"In academic literature, latrobe designates united states architect (born in england) whose works include the chambers of the united states congress and the supreme court; considered the first professional architect in the united states (1764-1820)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latrodectus]] | noun | **1.** Venomous spiders. | *"In academic literature, latrodectus designates venomous spiders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lats]] | noun | **1.** The basic unit of money in latvia.<br>**2.** A broad flat muscle on either side of the back. | *"In academic literature, lats designates the basic unit of money in latvia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latte]] | noun | **1.** Strong espresso coffee with a topping of frothed steamed milk. | *"In academic literature, latte designates strong espresso coffee with a topping of frothed steamed milk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latten]] | noun | **1.** Brass (or a yellow alloy resembling brass) that was hammered into thin sheets; formerly used for church utensils. | *"Ha, thou mountain-foreigner!—Sir John and master mine, I combat challenge of this latten bilbo.— Word of denial in thy _labras_ here!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latter]] | noun | **1.** The second of two or the second mentioned of two.<br>**2.** Referring to the second of two things or persons mentioned (or the last one or ones of several). | *"Why, ’tis the rarest argument of wonder that hath shot out in our latter times."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latter-day]] | adjective | **1.** Belonging to the present or recent times. | *"In academic literature, latter-day designates belonging to the present or recent times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latterly]] | adverb | **1.** In the recent past. | *"Tangle,” says the Lord High Chancellor, latterly something restless under the eloquence of that learned gentleman."* — Charles Dickens, *Bleak House* |
| [[lattice]] | noun | **1.** An arrangement of points or particles or objects in a regular periodic pattern in 2 or 3 dimensions.<br>**2.** Small opening (like a window in a door) through which business can be transacted. | *"So, my good window of lattice, fare thee well; thy casement I need not open, for I look through thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[latticed]] | adjective | **1.** Having a pattern of fretwork or latticework. | *"The new part, containing the schoolroom and dormitory, was lit by mullioned and latticed windows, which gave it a church-like aspect; a stone tablet over the door bore this inscription:— LOWOOD INSTITUTION."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[latticelike]] | adjective | **1.** Having a pattern of fretwork or latticework. | *"In academic literature, latticelike designates having a pattern of fretwork or latticework."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[latticework]] | noun | **1.** Framework consisting of an ornamental design made of strips of wood or metal. | *"In academic literature, latticework designates framework consisting of an ornamental design made of strips of wood or metal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misrelated]] | adjective | **1.** Mistakenly related. | *"In academic literature, misrelated designates mistakenly related."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistranslate]] | verb | **1.** Translate incorrectly. | *"In academic literature, mistranslate designates translate incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistranslation]] | noun | **1.** An incorrect translation. | *"Strange to say, a similar mistranslation occurs in Dr."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[nontranslational]] | adjective | **1.** Of or relating to movement that is not uniform or not without rotation. | *"In academic literature, nontranslational designates of or relating to movement that is not uniform or not without rotation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oblate]] | noun | **1.** A lay person dedicated to religious work or the religious life.<br>**2.** Having the equatorial diameter greater than the polar diameter; being flattened at the poles. | *"STEPHEN: _(Turns.)_ Eh? _(He disengages himself.)_ Why should I not speak to him or to any human being who walks upright upon this oblate orange? _(He points his finger.)_ I’m not afraid of what I can talk to if I see his eye."* — James Joyce, *Ulysses* |
| [[oblateness]] | noun | **1.** The property possessed by a round shape that is flattened at the poles. | *"In academic literature, oblateness designates the property possessed by a round shape that is flattened at the poles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oblation]] | noun | **1.** The act of contributing to the funds of a church or charity.<br>**2.** The act of offering the bread and wine of the eucharist. | *"No, let me be obsequious in thy heart, And take thou my oblation, poor but free, Which is not mixed with seconds, knows no art, But mutual render, only me for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prelate]] | noun | **1.** A senior clergyman and dignitary. | *"You, son John, and my cousin Westmoreland, Towards York shall bend you with your dearest speed To meet Northumberland and the prelate Scroop, Who, as we hear, are busily in arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prelature]] | noun | **1.** Prelates collectively.<br>**2.** The office or station of a prelate. | *"In academic literature, prelature designates prelates collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolate]] | adjective | **1.** Having the polar diameter greater than the equatorial diameter.<br>**2.** Rounded like an egg. | *"In academic literature, prolate designates having the polar diameter greater than the equatorial diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relate]] | verb | **1.** Make a logical or causal connection.<br>**2.** Be relevant to. | *"My sovereign liege, no letters, and few words, But such as I, without your special pardon, Dare not relate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[related]] | verb | **1.** Make a logical or causal connection.<br>**2.** Be relevant to. | *"Maxa related the incident of the evening before as it occurred."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[relatedness]] | noun | **1.** A particular manner of connectedness. | *"In academic literature, relatedness designates a particular manner of connectedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relatiative]] | adjective | **1.** Of or relating to or having the nature of retribution. | *"In academic literature, relatiative designates of or relating to or having the nature of retribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relation]] | noun | **1.** An abstraction belonging to or characteristic of two entities or parts together.<br>**2.** The act of sexual procreation between a man and a woman; the man's penis is inserted into the woman's vagina and excited until orgasm and ejaculation occur. | *"This is a thing Which you might from relation likewise reap, Being, as it is, much spoke of."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relational]] | adjective | **1.** Having a relation or being related. | *"In academic literature, relational designates having a relation or being related."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relations]] | noun | **1.** Mutual dealings or connections or communications among persons or groups.<br>**2.** An abstraction belonging to or characteristic of two entities or parts together. | *"Stones have been known to move, and trees to speak; Augurs, and understood relations, have By magot-pies, and choughs, and rooks, brought forth The secret’st man of blood.—What is the night?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relationship]] | noun | **1.** A relation between people; (`relationship' is often used where `relation' would serve, as in `the relationship between inflation and unemployment', but the preferred usage of `relationship' is for human relations or states of relatedness).<br>**2.** A state of connectedness between people (especially an emotional connection). | *"From my Lord Boodle, through the Duke of Foodle, down to Noodle, Sir Leicester, like a glorious spider, stretches his threads of relationship."* — Charles Dickens, *Bleak House* |
| [[relative]] | noun | **1.** A person related by blood or marriage.<br>**2.** An animal or plant that bears a relationship to another (as related by common descent or by membership in the same genus). | *"I’ll have grounds More relative than this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relative-in-law]] | noun | **1.** A relative by marriage. | *"In academic literature, relative-in-law designates a relative by marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relatively]] | adverb | **1.** In a relative manner; by comparison to something else. | *"Relatively even to this world of ours, which has its limits too (as your Highness shall find when you have made the tour of it and are come to the brink of the void beyond), it is a very little speck."* — Charles Dickens, *Bleak House* |
| [[relativise]] | verb | **1.** Consider or treat as relative. | *"In academic literature, relativise designates consider or treat as relative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relativism]] | noun | **1.** (philosophy) the philosophical doctrine that all criteria of judgment are relative to the individuals and situations involved. | *"In academic literature, relativism designates (philosophy) the philosophical doctrine that all criteria of judgment are relative to the individuals and situations involved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relativistic]] | adjective | **1.** Relating or subject to the special or the general theory of relativity.<br>**2.** Of or relating to the philosophical doctrine of relativism. | *"In academic literature, relativistic designates relating or subject to the special or the general theory of relativity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relativistically]] | adverb | **1.** By the theory of relativity. | *"In academic literature, relativistically designates by the theory of relativity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relativity]] | noun | **1.** (physics) the theory that space and time are relative concepts rather than absolute concepts.<br>**2.** The quality of being relative and having significance only in relation to something else. | *"Grief is a matter of relativity; the sorrow should be estimated by its proportion to the sorrower; a gash is as painful to one as an amputation to another."* — Francis Thompson, *Shelley: An Essay* |
| [[relativize]] | verb | **1.** Consider or treat as relative. | *"In academic literature, relativize designates consider or treat as relative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relatum]] | noun | **1.** A term in a proposition that is related to the referent of the proposition. | *"In academic literature, relatum designates a term in a proposition that is related to the referent of the proposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retranslate]] | verb | **1.** Translate again. | *"In academic literature, retranslate designates translate again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superlative]] | noun | **1.** An exaggerated expression (usually of praise).<br>**2.** The highest level or degree attainable; the highest stage of development. | *"He is always in extremes, perpetually in the superlative degree."* — Charles Dickens, *Bleak House* |
| [[superlatively]] | adverb | **1.** To a superlative degree. | *"Being a man not without a frequent consciousness that there was some charm in this life he led, he stood still after looking at the sky as a useful instrument, and regarded it in an appreciative spirit, as a work of art superlatively beautiful."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tralatitious]] | adjective | **1.** Having been passed along from generation to generation. | *"In academic literature, tralatitious designates having been passed along from generation to generation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translatable]] | adjective | **1.** Capable of being put into another form or style or language.<br>**2.** Capable of being changed in substance as if by alchemy. | *"The Professor was developing a remarkable talent for finding not only the stones of the past written all over with a wonderful and translatable history, but also the moral connected with each incident of our journey."* — W. E. Webb, *Buffalo Land* |
| [[translate]] | verb | **1.** Restate (words) from one language into another language.<br>**2.** Change from one form or medium into another. | *"How many lambs might the stern wolf betray, If like a lamb he could his looks translate!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[translation]] | noun | **1.** A written communication in a second language having the same meaning as the written communication in a first language.<br>**2.** A uniform movement without rotation. | *"A huge translation of hypocrisy, Vilely compiled, profound simplicity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[translational]] | adjective | **1.** Of or relating to uniform movement without rotation. | *"In academic literature, translational designates of or relating to uniform movement without rotation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[translator]] | noun | **1.** A person who translates written messages from one language to another.<br>**2.** Someone who mediates between speakers of different languages. | *"The most that a translator can do is to express in another tongue the main thought embodied, and enshrine it in a new poem."* — C. A. Frazer, *Atmâ* |
| [[uncorrelated]] | adjective | **1.** Not varying together. | *"In academic literature, uncorrelated designates not varying together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlatched]] | adjective | **1.** Not firmly fastened or secured. | *"Clare unlatched the door of a large chamber, felt his way across it, and parted the shutters to the width of two or three inches."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unrelated]] | adjective | **1.** Lacking a logical or causal relation.<br>**2.** Not connected by kinship. | *"He was now concerned only with the nearest practical matters unrelated to his past interests, and he seized on these the more eagerly the more those past interests were closed to him."* — graf Leo Tolstoy, *War and Peace* |
| [[unrelatedness]] | noun | **1.** The lack of any particular manner of connectedness. | *"In academic literature, unrelatedness designates the lack of any particular manner of connectedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untranslatable]] | adjective | **1.** Not capable of being put into another form or style or language. | *"On the sculptured stones in the Copan valley there are characters which seem to resemble very ancient writing, but this pictographic writing is largely untranslatable."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Carrying]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LAT
  </div>
</div>
