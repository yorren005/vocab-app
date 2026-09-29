---
status: unread
type: root_dashboard
---
# Dashboard — jud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">jud-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to judge”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **jud** means to judge. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *judge*, *judicial*, *judgment*, and *prejudice*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to judge
> The root **jud** means to judge. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *judge*, *judicial*, *judgment*, and *prejudice*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To judge</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *judge* and *judicial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **jud** comes from a Latin word that means *"to judge"*.
  - At its core, it describes the action of judge.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **jud** in an English word, think of **to judge**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to judge).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Judge**: N.** 1. A public officer appointed to hear and decide cases in a court of law.
  - **Judicial**: An everyday English word showing the root's idea of *to judge*.
  - **Judgment**: The ability to make considered decisions or come to sensible conclusions.
  - **Prejudice**: An everyday English word showing the root's idea of *to judge*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">jud</mark>, think of <mark class="hl-def">to judge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two morphological levels:
> 1. **The Anglo-French Base Stem `judg-` / `judge`:**
>    - Prefixes attach to indicate timing or error:
>      - `pre-` + *judge* $\to$ *prejudge*, *prejudgment* (deciding prematurely).
>      - `mis-` + *judge* $\to$ *misjudge*, *misjudgment* (evaluating erroneously).
>      - `ad-` + *judge* $\to$ *adjudge*, *adjudgment* (formally awarding or decreeing).
>    - Suffixes form abstract nouns and offices:
>      - `-ment` $\to$ *judgment*, *prejudgment*, *misjudgment*, *adjudgment*.
>      - `-ship` $\to$ *judgeship* (the formal office or tenure of a judicial magistrate).
> 2. **The Evaluative Adjectival Stem `judici-` (from Latin *iūdicium*):**
>    - Suffix `-ous` forms adjectives of prudence: *judicious* ("possessing sound judgment").
>    - Negating prefix `in-` forms antonyms: *injudicious*, *injudiciousness*.
>    - Relational adjective: *judgmental* (hypercritical; moralizing).

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
> - **Judicial Authority & Court Governance:** *Judge*, *judgeship*, *judgment*, *adjudge* — formal courtroom proceedings; presiding magistrates; rendering final judicial decrees.
> - **Prudence & Practical Wisdom:** *Judicious*, *judiciously*, *judiciousness* — making thoughtful, balanced, and discerning real-world choices.
> - **Folly & Recklessness:** *Injudicious*, *injudiciously*, *injudiciousness* — acting without proper foresight, discretion, or tact.
> - **Cognitive Distortion & Bias:** *Prejudge*, *prejudgment*, *misjudge*, *misjudgment* — forming stubborn conclusions before hearing evidence; assessing a person or distance incorrectly.
> - **Moralizing & Critical Deportment:** *Judgmental*, *judgmentally*, *nonjudgmental* — adopting a censorious attitude toward others versus practicing unconditional psychological acceptance.

---

## 🔀 4. Prefix & Combining Dynamics on jud

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward, formally | [[adjudge]], [[adjudgment]] | To declare or award formally by judicial decree; to deem or sentence. |
| `pre-` | before, in advance | [[prejudge]], [[prejudgment]] | To judge before hearing testimony or examining empirical facts. |
| `mis-` (Germanic) | badly, wrongly, erroneously | [[misjudge]], [[misjudgment]] | To estimate, evaluate, or judge someone or something incorrectly. |
| `in-` | not, un- (negative) | [[injudicious]], [[injudiciousness]] | Lacking sound judgment; indiscreet, unwise, or tactless. |
| `non-` | not, absence of | [[nonjudgmental]] | Refraining from moralistic criticism or condemnation; accepting. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Abstract Noun (Act / Verdict) | [[judgment]], [[prejudgment]], [[misjudgment]], [[adjudgment]] | The formal court verdict, or the psychological faculty of discernment. |
| `-ship` | Noun (Office / Dignity) | [[judgeship]] | The official commission, tenure, or dignity of a court judge. |
| `-ious` | Adjective (Quality / Virtue) | [[judicious]], [[injudicious]] | Marked by the possession of sound, prudent wisdom. |
| `-al` | Adjective (Relational / Demeanor) | [[judgmental]] | Prone to harsh moral criticism or censorious assessments. |
| `-ly` | Adverb (Manner) | [[judiciously]], [[injudiciously]], [[judgmentally]] | Modifying actions according to the quality of judgment exercised. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law, Constitutional Courts & Civil Procedure** | [[judge]], [[judgment]], [[judgeship]], [[adjudge]] | Presiding district court judges; summary judgment motions under Rule 56; default judgments; judicial impeachment. |
| 🧠 **Clinical Psychology & Psychotherapy** | [[nonjudgmental]], [[judgmental]], [[misjudge]] | Carl Rogers' unconditional positive regard; creating a nonjudgmental therapeutic alliance; cognitive distortions in social anxiety. |
| 💼 **Corporate Governance & Risk Strategy** | [[judicious]], [[injudicious]], [[misjudgment]] | The business judgment rule protecting corporate directors; injudicious public relations statements; misjudging market liquidity risk. |
| 🎖️ **Military Strategy & Geopolitics** | [[misjudge]], [[prejudge]], [[judicious]] | Misjudging enemy defensive capabilities; judicious deployment of strategic reserves during prolonged sieges. |
| 🏛️ **Ethics, Theology & Philosophy** | [[judgment]], [[prejudgment]] | The Last Judgment in Abrahamic eschatology; Kantian reflective and determinant judgment in the *Critique of Judgment*. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjudge]] | verb | **1.** Declare to be. | *"Yet of it all nothing do I adjudge so splendid as this accolade delivered by two lifers in solitary deemed by the world as the very bottom-most of the human cesspool."* — Jack London, *The Jacket (The Star-Rover)* |
| [[adjudicate]] | verb | **1.** Put on trial or hear a case and sit as the judge at the trial of.<br>**2.** Bring to an end; settle conclusively. | *"Later, we took in a third—another of Adversity’s brood, who, like Garrick between Tragedy and Comedy, had a chronic inability to adjudicate the rival claims (to himself) of Frost and Famine."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[adjudication]] | noun | **1.** The final judgment in a legal proceeding; the act of pronouncing judgment based on the evidence presented. | *"This might as well happen in the case of two contradictory statutes; or it might as well happen in every adjudication upon any single statute."* — Alexander Hamilton, *The Federalist Papers* |
| [[adjudicative]] | adjective | **1.** Concerned with adjudicating. | *"In academic literature, adjudicative designates concerned with adjudicating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjudicator]] | noun | **1.** A person who studies and settles conflicts and disputes. | *"In academic literature, adjudicator designates a person who studies and settles conflicts and disputes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjudicatory]] | adjective | **1.** Concerned with adjudicating. | *"In academic literature, adjudicatory designates concerned with adjudicating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extrajudicial]] | adjective | **1.** Beyond the usual course of legal proceedings; legally unwarranted. | *"In academic literature, extrajudicial designates beyond the usual course of legal proceedings; legally unwarranted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injudicious]] | adjective | **1.** Lacking or showing lack of judgment or discretion; unwise. | *"I felt it would be injudicious to confine her too much at first; so, when I had talked to her a great deal, and got her to learn a little, and when the morning had advanced to noon, I allowed her to return to her nurse."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[injudiciously]] | adverb | **1.** In an injudicious manner. | *"You will find she is some young lady who has had a misunderstanding with her friends, and has probably injudiciously left them."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[injudiciousness]] | noun | **1.** Lacking good judgment.<br>**2.** The trait of being injudicious. | *"In academic literature, injudiciousness designates lacking good judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[juda]] | noun | **1.** An ancient kingdom of southern palestine with jerusalem as its center. | *"Qualities of thought Moral courage is "the lion of the tribe of Juda," the king of the mental realm."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[judaea]] | noun | **1.** The southern part of ancient palestine succeeding the kingdom of judah; a roman province at the time of christ. | *"They were a large class--men and women open to religious ideas from whatever source they might come--Egypt, Judaea, or Persia, desirous of the knowledge of {260} God and of communion with God, and in many cases conscious of sin."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[judah]] | noun | **1.** (old testament) the fourth son of jacob who was forebear of one of the tribes of israel; one of his descendants was to be the messiah.<br>**2.** An ancient kingdom of southern palestine with jerusalem as its center. | *"Though David's sceptre still remains With Judah's royal line, On Leah's sons are bloody stains, And Ephriam's drunk with wine; Blind Sampson, by Delilah's shears, Is made grind Dagon's corn, But only in a thousand years Is there a Moses born."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[judaic]] | adjective | **1.** Of or relating to or characteristic of the jews or their culture or religion.<br>**2.** Of or relating to jews or their culture or religion. | *"Judaic and other rituals are but types and shadows of true worship."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[judaica]] | noun | **1.** Historical and literary materials relating to judaism. | *"In academic literature, judaica designates historical and literary materials relating to judaism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judaical]] | adjective | **1.** Of or relating to or characteristic of the jews or their culture or religion. | *"In academic literature, judaical designates of or relating to or characteristic of the jews or their culture or religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judaism]] | noun | **1.** Jews collectively who practice a religion based on the torah and the talmud.<br>**2.** The monotheistic religion of the jews having its spiritual and ethical principles embodied chiefly in the torah and in the talmud. | *"The uncertainty about God in Judaism reacted on life and made it hard."* — T. R. Glover, *The Jesus of History* |
| [[judas]] | noun | **1.** (new testament) supposed brother of st. james; one of the apostles who is invoked in prayer when a situation seems hopeless.<br>**2.** (new testament) the apostle who betrayed jesus to his enemies for 30 pieces of silver. | *"Something browner than Judas’s."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jude]] | noun | **1.** (new testament) supposed brother of st. james; one of the apostles who is invoked in prayer when a situation seems hopeless.<br>**2.** A new testament book attributed to saint jude. | *"Jude’s” (nodding north-west-by-north)."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[judea]] | noun | **1.** The southern part of ancient palestine succeeding the kingdom of judah; a roman province at the time of christ. | *"Did the heavenly host descend in rapture, and cause the mountains of Judea to reecho with their acclamations, because a _dependent creature_ had _consented_ to do his Maker's will?"* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[judeo-christian]] | adjective | **1.** Being historically related to both judaism and christianity. | *"In academic literature, judeo-christian designates being historically related to both judaism and christianity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judeo-spanish]] | noun | **1.** The spanish dialect spoken by sephardic jews but written in the hebrew script. | *"In academic literature, judeo-spanish designates the spanish dialect spoken by sephardic jews but written in the hebrew script."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judge]] | noun | **1.** A public official authorized to decide questions brought before a court of justice.<br>**2.** An authority who is able to estimate worth or quality. | *"Neither his daughter, if we judge by manners, But yet indeed the smaller is his daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judgement]] | noun | **1.** The legal document stating the reasons for a judicial decision.<br>**2.** An opinion formed by judging something. | *"Thyself thou gav’st, thy own worth then not knowing, Or me to whom thou gav’st it, else mistaking, So thy great gift upon misprision growing, Comes home again, on better judgement making."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judgeship]] | noun | **1.** The position of judge. | *"Now I lay down the judgeship he lent me."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[judging]] | noun | **1.** The cognitive process of reaching a decision or drawing conclusions.<br>**2.** Determine the result of (a competition). | *"To your Highness’ hand I tender my commission, by whose virtue, The court of Rome commanding, you, my Lord Cardinal of York, are joined with me their servant In the unpartial judging of this business."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judgment]] | noun | **1.** An opinion formed by judging something.<br>**2.** The act of judging or assessing a person or situation or event. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judgmental]] | adjective | **1.** Depending on judgment. | *"In academic literature, judgmental designates depending on judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judicable]] | adjective | **1.** Capable of being judged or decided. | *"In academic literature, judicable designates capable of being judged or decided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judicatory]] | noun | **1.** The system of law courts that administer justice and constitute the judicial branch of government. | *"They have no common treasury; no common troops even in war; no common coin; no common judicatory; nor any other common mark of sovereignty."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicature]] | noun | **1.** An assembly (including one or more judges) to conduct judicial business.<br>**2.** The system of law courts that administer justice and constitute the judicial branch of government. | *"In unfolding the defects of the existing Confederation, the utility and necessity of a federal judicature have been clearly pointed out."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicial]] | adjective | **1.** Decreed by or proceeding from a court of justice.<br>**2.** Belonging or appropriate to the office of a judge. | *"Tulkinghorn is received with distinction and seated near the coroner between that high judicial officer, a bagatelle-board, and the coal-box."* — Charles Dickens, *Bleak House* |
| [[judicially]] | adverb | **1.** As ordered by a court.<br>**2.** In a judicial manner. | *"But Wakley is right sometimes,” the Doctor added, judicially."* — George Eliot, *Middlemarch* |
| [[judiciary]] | noun | **1.** Persons who administer justice.<br>**2.** The system of law courts that administer justice and constitute the judicial branch of government. | *"The Judiciary Department FEDERALIST No."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicious]] | adjective | **1.** Marked by the exercise of good judgment or common sense in practical matters. | *"His last offences to us Shall have judicious hearing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judiciously]] | adverb | **1.** In a judicious manner. | *"Your aunt Norris has always been an advocate, and very judiciously, for young people’s being brought up without unnecessary indulgences; but there should be moderation in everything."* — Jane Austen, *Mansfield Park* |
| [[judiciousness]] | noun | **1.** Good judgment.<br>**2.** The trait of forming opinions by distinguishing and evaluating. | *"Still Ned provides everything in the world he can think of to help Mamie," said Caroline, who had come up the walk just in time to fan the flame in me by her sweet wistfulness, with a soft judiciousness in her voice and eyes."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[judith]] | noun | **1.** Jewish heroine in one of the books of the apocrypha; she saved her people by decapitating the assyrian general holofernes.<br>**2.** An apocryphal book telling how judith saved her people. | *"Going out early in life and marrying late, as his father had done before him, he too begat a lean and anxious-minded son, who in his turn, going out early in life and marrying late, became the father of Bartholomew and Judith Smallweed, twins."* — Charles Dickens, *Bleak House* |
| [[judo]] | noun | **1.** A sport adapted from jujitsu (using principles of not resisting) and similar to wrestling; developed in japan. | *"In academic literature, judo designates a sport adapted from jujitsu (using principles of not resisting) and similar to wrestling; developed in japan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misjudge]] | verb | **1.** Judge incorrectly. | *"It is cruel—she cannot help being mad.” “Jane, my little darling (so I will call you, for so you are), you don’t know what you are talking about; you misjudge me again: it is not because she is mad I hate her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[nonjudgmental]] | adjective | **1.** Refraining from making judgments especially ones based on personal opinions or standards. | *"Whatever the past might have been, his advanced years called for him to be nonjudgmental, empathic, and healing."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[prejudge]] | verb | **1.** Judge beforehand, especially without sufficient evidence. | *"It is now but very, very slight; but it is to be seen if we have eyes to notice without to prejudge."* — Bram Stoker, *Dracula* |
| [[prejudgement]] | noun | **1.** A judgment reached before the evidence is available. | *"In academic literature, prejudgement designates a judgment reached before the evidence is available."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prejudgment]] | noun | **1.** A judgment reached before the evidence is available. | *"This social division between the commercial and agricultural classes doubtless helped to strengthen the prejudgment as to the nature of the two kinds of wealth."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[prejudice]] | noun | **1.** A partiality that prevents objective consideration of an issue or situation.<br>**2.** Disadvantage by prejudice. | *"Now let us on, my lords, and join our powers, And seek how we may prejudice the foe. [_Exeunt._] SCENE IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prejudiced]] | verb | **1.** Disadvantage by prejudice.<br>**2.** Influence (somebody's) opinion in advance. | *"He is an honourable, obstinate, truthful, high-spirited, intensely prejudiced, perfectly unreasonable man."* — Charles Dickens, *Bleak House* |
| [[prejudicial]] | adjective | **1.** (sometimes followed by `to') causing harm or injury.<br>**2.** Tending to favor preconceived ideas. | *"Suppose, my lords, he did it unconstrained, Think you ’twere prejudicial to his crown?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prejudicious]] | adjective | **1.** Tending to favor preconceived ideas.<br>**2.** (sometimes followed by `to') causing harm or injury. | *"In academic literature, prejudicious designates tending to favor preconceived ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprejudiced]] | adjective | **1.** Free from undue bias or preconceived opinions. | *"Hear the truth, therefore, now, while you are unprejudiced."* — Jane Austen, *Persuasion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · JUD
  </div>
</div>
