---
status: unread
type: root_dashboard
---
# Dashboard — spond
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spond-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to pledge or promise solemnly”</span>
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

The root **spond** means to pledge or promise solemnly. It refers to pledge solemnly, vow, bind oneself by verbal contract, answer for another, respond. In English, this root forms words such as *respond*, *response*, *respondent*, and *responsive*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to pledge or promise solemnly
> The root **spond** means to pledge or promise solemnly. It refers to pledge solemnly, vow, bind oneself by verbal contract, answer for another, respond. In English, this root forms words such as *respond*, *response*, *respondent*, and *responsive*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To pledge or promise solemnly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *respond* and *response*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spond** comes from a Latin word that means *"to pledge or promise solemnly"*.
  - At its core, it describes the action of pledge or promise solemnly.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **spond** in an English word, think of **to pledge or promise solemnly**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to pledge or promise solemnly).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Respond**: To make an answer or reply in words.
  - **Response**: An answer or reply given in words or writing.
  - **Respondent**: Answering.
  - **Responsive**: Readily reacting, answering, or sympathetic to influences, appeals, or suggestions.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spond</mark>, think of <mark class="hl-def">to pledge or promise solemnly</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through four distinct morphological stems in English:
> - **Primary Present Stem (`spond-`):** Derived from Latin *spondeō*: *respond*, *correspond*, *despond*.
> - **Participial / Supine Stem (`spons-`):** Derived from Latin *spōnsus* (past participle) and *spōnsor*: *sponsor*, *response*, *responsive*, *responsible*, *sponsion*.
> - **Old French Epenthetic Stem (`spous-` / `espous-`):** Mediated through Old French *espos / espouse*: *spouse*, *spousal*, *espouse*, *espousal*.
> - **Classical Prosodic Metric Stem (`spond-`):** Borrowed from Greek *spondeîos* (the slow, solemn two-long-syllable foot played during libations): *spondee*, *spondaic*.
>
> Morphological compounding attaches directional prefixes to modify the nature of the pledge:
> - `re-` ("back, in return") + *spondēre* $\to$ *respond* (to pledge back, answer).
> - `con-` + `re-` + *spondēre* $\to$ *correspond* (to answer mutually together).
> - `dē-` ("away, down") + *spondēre* $\to$ *despond* (to cast down hope, give up).
> - `ex-` $\to$ Old French *es-* + *spous-* $\to$ *espouse* (to take as a pledge/spouse).

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
> The semantic branches of *spond* encompass six distinct domains:
> - **Civic Suretyship & Patronage:** In [[sponsor]], [[sponsorship]], [[sponsorial]], and [[sponsion]], the root denotes guaranteeing financial backing, assuming legal liability, or underwriting public endeavors.
> - **Dialogic Reply & Reaction:** In [[respond]], [[response]], [[respondent]], [[co-respondent]], and [[responsive]], the focus is on answering an interrogatory, reacting to sensory stimuli, or serving as a defendant in legal proceedings.
> - **Reciprocal Concord & Epistolary Exchange:** In [[correspond]], [[correspondence]], [[correspondent]], [[corresponding]], and [[correspondingly]], the root denotes structural equivalence, written communication across distance, and mathematical matching.
> - **Moral & Political Accountability:** In [[responsible]], [[responsibility]], [[responsibly]], [[irresponsible]], and [[irresponsibility]], the root expresses the ethical obligation to answer for one's conduct and bear the consequences of authority.
> - **Matrimonial Vows & Dedication:** In [[spouse]], [[spousal]], [[espouse]], and [[espousal]], the root preserves the ancient marital pledge of mutual fidelity and the metaphorical adoption of causes or doctrines.
> - **Psychological Surrender & Hopelessness:** In [[despond]], [[despondent]], [[despondently]], [[despondence]], and [[despondency]], the classical metaphor of renouncing one's spirit yields profound emotional dejection.
> - **Sacred Prosody:** In [[spondee]] and [[spondaic]], the root preserves the grave, solemn tempo of ancient religious libations.

---

## 🔀 4. Prefix & Combining Dynamics on spond

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | back, in return | [[respond]], [[response]] | To make a counter-pledge; to reply to a question, summons, or physical stimulus. |
| `con-` + `re-` | together + back | [[correspond]], [[correspondence]] | To answer back and forth mutually; to harmonize, match, or exchange written thoughts. |
| `dē-` | down, away from | [[despond]], [[despondent]] | From Latin *dēspondēre animum*; lit. to give away one's spirit; to fall into despair. |
| `in-` (neg.) + `re-` | not + back | [[irresponsible]], [[unresponsive]] | Incapable of answering for obligations; failing to react or show sensitivity to stimuli. |
| `ex-` (via OF *es-*) | out, completely | [[espouse]], [[espousal]] | To bind formally to oneself; to marry or champion an intellectual doctrine. |
| `co-` | together, jointly | [[co-respondent]] | A joint respondent in an equity or divorce lawsuit. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-or` | Noun (Agent / Surety) | [[sponsor]] | One who binds themselves to guarantee another's obligation or enterprise. |
| `-ent` | Noun / Adjective (Active Agent) | [[respondent]], [[correspondent]], [[despondent]] | One who replies in court; an exchange partner; one experiencing despair. |
| `-ence` | Noun (State / Process) | [[correspondence]], [[despondence]] | The act of exchanging letters or matching; the state of dejection. |
| `-ency` | Noun (Condition / Quality) | [[despondency]] | The persistent condition of hopelessness or profound depression. |
| `-ible` | Adjective (Capacity / Obligation) | [[responsible]] | Liable to be called upon to answer; capable of moral deliberation. |
| `-ibility` | Noun (State of Obligation) | [[responsibility]], [[irresponsibility]] | The burden, duty, or legal state of being answerable. |
| `-ive` | Adjective (Tendency / Readiness) | [[responsive]], [[unresponsive]] | Readily reacting, answering, or displaying sensitivity to input. |
| `-al` | Adjective / Noun (Pertaining to) | [[spousal]], [[espousal]] | Relating to marriage; the formal act of betrothal or philosophical adoption. |
| `-ee` | Noun (Poetic Metric Unit) | [[spondee]] | A metrical foot of two long or stressed syllables (--). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Civil & Procedural Law** | [[respondent]], [[co-respondent]], [[sponsion]], [[response]] | Appellate answering briefs, defendants in equity proceedings, divorce petitions, and state treaties executed without full authority. |
| 🏛️ **Ethics, Governance & Politics** | [[responsible]], [[responsibility]], [[irresponsible]], [[sponsor]] | Ministerial accountability in parliamentary democracies, fiduciary oversight, and legislative bill sponsorship. |
| 📰 **Journalism & Communications** | [[correspondent]], [[correspondence]], [[correspond]] | Foreign war correspondents, diplomatic dispatches, investigative reporting, and archival epistolary analysis. |
| 🧠 **Psychiatry, Psychology & Medicine** | [[despondent]], [[despondency]], [[responsive]], [[unresponsive]] | Clinical depressive episodes, neurological assessment of comatose reflex responsiveness (Glasgow Coma Scale). |
| 💍 **Family Law & Domestic Relations** | [[spouse]], [[spousal]], [[espouse]], [[espousal]] | Spousal privilege in courtroom testimony, spousal support/alimony, and formal marital contracts. |
| 📜 **Classical Literature & Poetics** | [[spondee]], [[spondaic]] | Analysis of dactylic hexameter in Homer and Virgil, rhythmic substitution, and metric cadence. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[corespondent]] | noun | **1.** The codefendant charged with adultery with the estranged spouse in a divorce proceeding. | *"In academic literature, corespondent designates the codefendant charged with adultery with the estranged spouse in a divorce proceeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[correspond]] | verb | **1.** Be compatible, similar or consistent; coincide in their characteristics.<br>**2.** Be equivalent or parallel, in mathematics. | *"A maid of honour of the court of Charles the Second, with large round eyes (and other charms to correspond), seems to bathe in glowing water, and it ripples as it glows."* — Charles Dickens, *Bleak House* |
| [[correspondence]] | noun | **1.** Communication by the exchange of letters.<br>**2.** Compatibility of observations. | *"It involves me in correspondence with public bodies and with private individuals anxious for the welfare of their species all over the country."* — Charles Dickens, *Bleak House* |
| [[correspondent]] | noun | **1.** Someone who communicates by means of letters.<br>**2.** A journalist employed to provide news stories for newspapers or broadcast media. | *"Pardon, master: I will be correspondent to command, And do my spriting gently."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corresponding]] | verb | **1.** Be compatible, similar or consistent; coincide in their characteristics.<br>**2.** Be equivalent or parallel, in mathematics. | *"Haply this life is best, If quiet life be best; sweeter to you That have a sharper known; well corresponding With your stiff age."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[despond]] | verb | **1.** Lose confidence or hope; become dejected. | *"The name of the slough was Despond.”—BUNYAN."* — George Eliot, *Middlemarch* |
| [[despondence]] | noun | **1.** Feeling downcast and disheartened and hopeless. | *"For Fanny’s present comfort it was concluded, perhaps, at the happiest moment: had he been able to talk another five minutes, there is no saying that he might not have talked away all Miss Crawford’s faults and his own despondence."* — Jane Austen, *Mansfield Park* |
| [[despondency]] | noun | **1.** Feeling downcast and disheartened and hopeless. | *"The moment of her stepping forward in the Octagon Room to speak to him: the moment of Mr Elliot’s appearing and tearing her away, and one or two subsequent moments, marked by returning hope or increasing despondency, were dwelt on with energy."* — Jane Austen, *Persuasion* |
| [[despondent]] | adjective | **1.** Without or almost without hope. | *"It is all over here.” I mildly entreated him not to be despondent."* — Charles Dickens, *Bleak House* |
| [[despondently]] | adverb | **1.** With desperation. | *"Guppy to me forlornly and despondently, “but it couldn’t be."* — Charles Dickens, *Bleak House* |
| [[respond]] | verb | **1.** Show a response or a reaction to something.<br>**2.** React verbally. | *"He might be deemed eligible by you and might be disposed to respond to this proposal."* — Charles Dickens, *Bleak House* |
| [[respondent]] | noun | **1.** The codefendant (especially in a divorce proceeding) who is accused of adultery with the corespondent.<br>**2.** Someone who responds. | *"In academic literature, respondent designates the codefendant (especially in a divorce proceeding) who is accused of adultery with the corespondent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[responder]] | noun | **1.** Someone who responds. | *"In academic literature, responder designates someone who responds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondaic]] | adjective | **1.** Of or consisting of spondees. | *"In academic literature, spondaic designates of or consisting of spondees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondaise]] | verb | **1.** Make spondaic. | *"In academic literature, spondaise designates make spondaic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondaize]] | verb | **1.** Make spondaic. | *"In academic literature, spondaize designates make spondaic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondee]] | noun | **1.** A metrical unit with stressed-stressed syllables. | *"In academic literature, spondee designates a metrical unit with stressed-stressed syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondias]] | noun | **1.** Tropical trees having one-seeded fruit. | *"In academic literature, spondias designates tropical trees having one-seeded fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondylarthritis]] | noun | **1.** Arthritis that affects one or more of the intervertebral joints in the spine. | *"In academic literature, spondylarthritis designates arthritis that affects one or more of the intervertebral joints in the spine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondylitis]] | noun | **1.** Inflammation of a spinal joint; characterized by pain and stiffness. | *"In academic literature, spondylitis designates inflammation of a spinal joint; characterized by pain and stiffness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spondylolisthesis]] | noun | **1.** A forward dislocation of one vertebra over the one beneath it producing pressure on spinal nerves. | *"In academic literature, spondylolisthesis designates a forward dislocation of one vertebra over the one beneath it producing pressure on spinal nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SPOND
  </div>
</div>
