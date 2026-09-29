---
status: unread
type: root_dashboard
---
# Dashboard — judic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">judic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“judge”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **judic** means judge. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *law*, *judicial*, *judicially*, and *judiciary*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: judge
> The root **judic** means judge. It refers to evaluating evidence, forming an opinion, or making an official decision. In English, this root forms words such as *law*, *judicial*, *judicially*, and *judiciary*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Judge</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *law* and *judicial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **judic** comes from a Latin word that means *"judge"*.
  - At its core, it describes judge.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **judic** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of judge.
  - **Mental & Social**: How people experience, organize, or communicate about judge.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Law**: An everyday English word showing the root's idea of *judge*.
  - **Judicial**: Pertaining to, characteristic of, or appropriate to a judge, court of law, or the administration of justice.
  - **Judicially**: In a judicial manner.
  - **Judiciary**: Pertaining to courts of justice, judicial proceedings, or judges.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">judic</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through three primary morphological stems:
> - **Primary Latin Nominal Stem (`judic-`):** Derived from the oblique stem *iūdic-*: *judicial*, *judiciary*, *judicious*, *prejudice*, *sub judice*.
> - **Participial / Frequentative Stem (`judicat-`):** Derived from Latin *iūdicātus* (past participle of *iūdicāre*): *adjudicate*, *adjudication*, *adjudicator*, *adjudicative*, *judicature*, *judicable*.
> - **Prefixed Compound Formations:**
>   - `ad-` ("to, upon") + *iūdicāre* $\to$ *adjudicate*, *adjudication*.
>   - `prae-` ("before") + *iūdicium* $\to$ *prejudice*, *prejudicial*, *prejudge*.
>   - `extrā-` ("outside") + *iūdiciālis* $\to$ *extrajudicial*.
>   - `in-` (neg.) + *judicious* $\to$ *injudicious*.
>   - `sub-` ("under") + Latin ablative *iūdice* $\to$ *sub judice*.

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
> The derivations of *judic* organize into five distinct conceptual domains:
> - **Constitutional & Court Administration:** In [[judicial]], [[judiciary]], [[judicature]], and [[quasi-judicial]], the root designates the institutional branch of government, appellate court systems, and administrative tribunals.
> - **Formal Dispute Resolution & Decree:** In [[adjudicate]], [[adjudication]], [[adjudicator]], [[adjudicative]], and [[adjudicatory]], the root represents the formal, evidence-based hearing and binding resolution of claims.
> - **Intellectual Wisdom & Practical Prudence:** In [[judicious]], [[judiciously]], [[judiciousness]], [[injudicious]], and [[injudiciously]], the root leaves the courtroom to describe wise, balanced, and prudent personal decision-making.
> - **Procedural Bias & Legal Injury:** In [[prejudice]], [[prejudicial]], [[prejudicially]], and [[prejudge]], the root denotes premature judgment, procedural disadvantage (*dismissal with prejudice*), or racial and religious discrimination.
> - **Extra-Court & Sovereign Actions:** In [[extrajudicial]] and [[sub judice]], the root captures proceedings beyond normal legal bounds (e.g., extrajudicial measures) or matters pending before a bench.

---

## 🔀 4. Prefix & Combining Dynamics on judic

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward | [[adjudicate]] | To bring to a judicial determination; to award or settle formally by court order. |
| `prae-` (`pre-`) | before, beforehand | [[prejudice]], [[prejudge]] | Lit. "judgment beforehand"; a preconceived opinion or bias formed without evidence. |
| `extrā-` | outside, beyond | [[extrajudicial]] | Performed, delivered, or occurring outside the regular course of judicial proceedings. |
| `in-` (neg.) | not, un- | [[injudicious]] | Lacking sound judgment; unwise, imprudent, or rash. |
| `sub-` | under | [[sub judice]] | Under the consideration of a judge or court; actively pending judicial determination. |
| `non-` | not | [[nonjudicial]] | Not involving or performed by a judge or court of law (*nonjudicial foreclosure*). |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Pertaining to) | [[judicial]] | Of or pertaining to courts, judges, or the administration of justice. |
| `-ary` | Noun / Adjective | [[judiciary]] | The branch of government comprising judges; pertaining to the courts. |
| `-ious` | Adjective (Character / Quality)| [[judicious]] | Having, showing, or characterized by sound judgment; prudent. |
| `-ate` | Verb (Action / Resolution) | [[adjudicate]] | To act as a judge; to settle a dispute authoritatively. |
| `-ation` | Noun (Process / Award) | [[adjudication]] | The formal act or process of resolving a legal issue by judicial decree. |
| `-ator` | Noun (Agent / Presider) | [[adjudicator]] | An impartial third party or magistrate appointed to hear and decide claims. |
| `-atory` / `-ive`| Adjective (Function) | [[adjudicatory]], [[adjudicative]] | Pertaining to or having the legal power of formal adjudication. |
| `-ure` | Noun (Office / System) | [[judicature]] | The power of dispensing justice; the collective judiciary or court system. |
| `-able` | Adjective (Capability) | [[judicable]] | Liable or eligible to be tried before a court of law. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional Law & Jurisprudence** | [[judicial]], [[judiciary]], [[judicial review]], [[extrajudicial]] | Article III judicial power, *Marbury v. Madison* judicial review, judicial independence, separation of powers. |
| 🏛️ **Civil & Criminal Court Procedure** | [[adjudicate]], [[adjudication]], [[prejudicial]], [[sub judice]] | Federal Rules of Civil Procedure, motions to dismiss "with prejudice," exclusion of unfairly prejudicial evidence. |
| 🏢 **Administrative Law & Regulatory Agencies** | [[quasi-judicial]], [[adjudicator]], [[adjudicatory]] | National Labor Relations Board (NLRB) hearings, administrative law judges (ALJs), environmental permit appeals. |
| 🧠 **Social Psychology & Civil Rights** | [[prejudice]], [[unprejudiced]], [[prejudicial]] | Implicit bias studies, racial and gender discrimination, Equal Protection Clause challenges. |
| 📜 **British Imperial & Commonwealth History** | [[judicature]], [[Judicature Acts]] | The Judicature Acts of 1873–1875, reorganization of the High Court of Chancery and Common Pleas. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjudicate]] | verb | **1.** Put on trial or hear a case and sit as the judge at the trial of.<br>**2.** Bring to an end; settle conclusively. | *"Later, we took in a third—another of Adversity’s brood, who, like Garrick between Tragedy and Comedy, had a chronic inability to adjudicate the rival claims (to himself) of Frost and Famine."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[adjudication]] | noun | **1.** The final judgment in a legal proceeding; the act of pronouncing judgment based on the evidence presented. | *"This might as well happen in the case of two contradictory statutes; or it might as well happen in every adjudication upon any single statute."* — Alexander Hamilton, *The Federalist Papers* |
| [[adjudicative]] | adjective | **1.** Concerned with adjudicating. | *"In academic literature, adjudicative designates concerned with adjudicating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjudicator]] | noun | **1.** A person who studies and settles conflicts and disputes. | *"In academic literature, adjudicator designates a person who studies and settles conflicts and disputes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjudicatory]] | adjective | **1.** Concerned with adjudicating. | *"In academic literature, adjudicatory designates concerned with adjudicating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extrajudicial]] | adjective | **1.** Beyond the usual course of legal proceedings; legally unwarranted. | *"In academic literature, extrajudicial designates beyond the usual course of legal proceedings; legally unwarranted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injudicious]] | adjective | **1.** Lacking or showing lack of judgment or discretion; unwise. | *"I felt it would be injudicious to confine her too much at first; so, when I had talked to her a great deal, and got her to learn a little, and when the morning had advanced to noon, I allowed her to return to her nurse."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[injudiciously]] | adverb | **1.** In an injudicious manner. | *"You will find she is some young lady who has had a misunderstanding with her friends, and has probably injudiciously left them."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[injudiciousness]] | noun | **1.** Lacking good judgment.<br>**2.** The trait of being injudicious. | *"In academic literature, injudiciousness designates lacking good judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judicable]] | adjective | **1.** Capable of being judged or decided. | *"In academic literature, judicable designates capable of being judged or decided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[judicatory]] | noun | **1.** The system of law courts that administer justice and constitute the judicial branch of government. | *"They have no common treasury; no common troops even in war; no common coin; no common judicatory; nor any other common mark of sovereignty."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicature]] | noun | **1.** An assembly (including one or more judges) to conduct judicial business.<br>**2.** The system of law courts that administer justice and constitute the judicial branch of government. | *"In unfolding the defects of the existing Confederation, the utility and necessity of a federal judicature have been clearly pointed out."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicial]] | adjective | **1.** Decreed by or proceeding from a court of justice.<br>**2.** Belonging or appropriate to the office of a judge. | *"Tulkinghorn is received with distinction and seated near the coroner between that high judicial officer, a bagatelle-board, and the coal-box."* — Charles Dickens, *Bleak House* |
| [[judicially]] | adverb | **1.** As ordered by a court.<br>**2.** In a judicial manner. | *"But Wakley is right sometimes,” the Doctor added, judicially."* — George Eliot, *Middlemarch* |
| [[judiciary]] | noun | **1.** Persons who administer justice.<br>**2.** The system of law courts that administer justice and constitute the judicial branch of government. | *"The Judiciary Department FEDERALIST No."* — Alexander Hamilton, *The Federalist Papers* |
| [[judicious]] | adjective | **1.** Marked by the exercise of good judgment or common sense in practical matters. | *"His last offences to us Shall have judicious hearing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[judiciously]] | adverb | **1.** In a judicious manner. | *"Your aunt Norris has always been an advocate, and very judiciously, for young people’s being brought up without unnecessary indulgences; but there should be moderation in everything."* — Jane Austen, *Mansfield Park* |
| [[judiciousness]] | noun | **1.** Good judgment.<br>**2.** The trait of forming opinions by distinguishing and evaluating. | *"Still Ned provides everything in the world he can think of to help Mamie," said Caroline, who had come up the walk just in time to fan the flame in me by her sweet wistfulness, with a soft judiciousness in her voice and eyes."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[prejudice]] | noun | **1.** A partiality that prevents objective consideration of an issue or situation.<br>**2.** Disadvantage by prejudice. | *"Now let us on, my lords, and join our powers, And seek how we may prejudice the foe. [_Exeunt._] SCENE IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prejudiced]] | verb | **1.** Disadvantage by prejudice.<br>**2.** Influence (somebody's) opinion in advance. | *"He is an honourable, obstinate, truthful, high-spirited, intensely prejudiced, perfectly unreasonable man."* — Charles Dickens, *Bleak House* |
| [[prejudicial]] | adjective | **1.** (sometimes followed by `to') causing harm or injury.<br>**2.** Tending to favor preconceived ideas. | *"Suppose, my lords, he did it unconstrained, Think you ’twere prejudicial to his crown?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prejudicious]] | adjective | **1.** Tending to favor preconceived ideas.<br>**2.** (sometimes followed by `to') causing harm or injury. | *"In academic literature, prejudicious designates tending to favor preconceived ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprejudiced]] | adjective | **1.** Free from undue bias or preconceived opinions. | *"Hear the truth, therefore, now, while you are unprejudiced."* — Jane Austen, *Persuasion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · JUDIC
  </div>
</div>
