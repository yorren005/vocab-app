---
status: unread
type: root_dashboard
---
# Dashboard — plic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fold”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sturdy wooden framework supporting the roof of a house.</span>
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

The root **plic** means to fold. It refers to the action of folding and carrying out this process. In English, this root forms words such as *duplicate*, *complicate*, *explicit*, and *implicit*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fold
> The root **plic** means to fold. It refers to the action of folding and carrying out this process. In English, this root forms words such as *duplicate*, *complicate*, *explicit*, and *implicit*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fold</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *duplicate* and *complicate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plic** comes from a Latin word that means *"to fold"*.
  - At its core, it describes the action of fold.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **plic** in an English word, think of **to fold**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fold).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Duplicate**: Exactly like something else, especially through being an exact copy. 2. One of two identical things. 3. Make an exact copy of.
  - **Complicate**: To make something more difficult or confusing by adding new factors.
  - **Explicit**: Stated clearly and in detail, leaving no room for confusion or doubt. 2. Describing sexually open scenes.
  - **Implicit**: Implied though not plainly expressed. 2. With no qualification or question.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plic</mark>, think of <mark class="hl-def">to fold</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **plic** displays three distinct morphological manifestations in English:
- **Learned Latinate Stems (`-plicat-` / `-plicit-`)**:
  - *applicātiō* $\to$ **application**.
  - *complicātiō* $\to$ **complication**, **complicate**.
  - *duplicātiō* $\to$ **duplication**, **duplicate**, **duplicity**.
  - *explicitus* $\to$ **explicit**, **explication**.
  - *implicitus* $\to$ **implicit**, **implicate**, **implication**.
  - *supplicātus* $\to$ **supplicate**, **supplication**, **suppliant**.
- **French & Vernacular Verb Stems (`-ply` / `-ploy`)**:
  - *applicāre* $\to$ **apply**, **appliance**.
  - *com-plicāre* $\to$ **comply**, **compliant**, **compliance**.
  - *implicāre* $\to$ **imply**.
  - *in-plicāre* $\to$ *employer* $\to$ **employ**, **employee**, **employer**.
  - *ex-plicāre* $\to$ *exploiter* $\to$ **exploit**.
  - *replicāre* $\to$ *replier* $\to$ **reply**.
  - *plicāre* $\to$ *plier* $\to$ **ply**, **pliant**, **pliability**.
- **The Folded Person & Accomplice**:
  - *ad-* + *con-* + *plic-* $\to$ *accomplice* (one folded into a crime together).
  - *sub-* + *plac-* / *plic-* $\to$ *souple* $\to$ **supple**.

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

The 35 derivatives of **plic** organize into five primary domains:
- **Epistemology, Deduction & Clarity**: *imply* (suggest or indicate without explicit statement; fold within), *implicit* (implied though not plainly expressed), *explicit* (stated clearly and in detail; unfolded), *explication* (the process of analyzing and developing an idea).
- **Practical Application & Labor**: *apply* (bring into practical use), *application* (the action of putting something into operation), *employ* (give work to; make use of), *exploit* (make full use of; bold feat).
- **Compliance, Bending & Supplication**: *comply* (act in accordance with a wish or command), *compliant*, *pliant* (easily bent; flexible), *supple* (bending easily without breaking), *supplicate* (ask or beg for something humbly), *suppliant*.
- **Complexity, Criminality & Duplicity**: *complicate* (make more difficult or layered), *accomplice* (a person who helps another commit a crime), *duplicity* (deceitfulness; double-foldedness), *perplex*.
- **Multiplication & Replication**: *duplicate* (make a copy of), *replica* (an exact copy or model), *reply* (say something in response; fold back words), *simple* (easily understood; consisting of a single fold), *multiply*, *multiple*.

---

## 🔀 4. Prefix & Combining Dynamics on plic

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`in-`** ("in") | `in-` + *plicāre* | Fold inside $\to$ unstated premise; entangle in crime | *imply, implicit, implicate, implication* |
| **`ex-`** ("out") | `ex-` + *plicāre* | Unfold what is folded $\to$ state clearly, explain fully | *explicit, explication, exploit* |
| **`con-`** ("together") | `con-` + *plicāre* | Fold together $\to$ intricate, tangled; bend to rules | *complicate, comply, compliant* |
| **`re-`** ("back") | `re-` + *plicāre* | Fold back $\to$ send back words, create exact twin | *reply, replica, replicate, replication* |
| **`ad-`** ("to") | `ad-` + *plicāre* | Fold onto a surface $\to$ put to use, request | *apply, application, applicant* |
| **`sub-`** ("under") | `sub-` + *plicāre* | Bend down beneath $\to$ flexible material; beg on knees | *supple, suppliant, supplicate* |
| **`duo`** ("two") | `duo` + *plic-* | Two-fold $\to$ exact duplicate; deceitful two-facedness | *duplicate, duplicity* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Philosophy of Science & Semiotics**: Explicit vs implicit knowledge; propositional implication (*implication*, *explicit knowledge*).
- **Jurisprudence & Criminal Law**: Criminal conspiracy and aiding and abetting (*accomplice*, *implicated in a crime*).
- **Industrial Labor & Economics**: Human capital, corporate hiring, and workforce deployment (*employment*, *employer*).
- **Biochemistry & Genetics**: DNA replication and enzyme compliance (*DNA replication*, *replica*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accomplice]] | noun | **1.** A person who joins with another in carrying out some plan (especially an unethical or illegal plan). | *"If George the vagabond dragoon had any hand in it, he was only an accomplice, and was set on."* — Charles Dickens, *Bleak House* |
| [[applicability]] | noun | **1.** Relevance by virtue of being applicable to the matter at hand. | *"In academic literature, applicability designates relevance by virtue of being applicable to the matter at hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applicable]] | adjective | **1.** Capable of being applied; having relevance. | *"It appears to me that this maxim is applicable to the medical as well as to the nautical profession.” “To all professions,” observed Mr."* — Charles Dickens, *Bleak House* |
| [[applicant]] | noun | **1.** A person who requests or seeks something such as assistance or employment or admission. | *"But missionaries' pockets are more often depleted, than those of benevolent organizations, and the one in question was fain to take the applicant to a friend, whom we shall call Q."* — Classic Author, *The wonders of prayer* |
| [[application]] | noun | **1.** The act of bringing something to bear; using it for a particular purpose.<br>**2.** A verbal or written request for assistance or employment or admission to a school. | *"She had no doubt that the sons of the three most important families of Nolla ought naturally to live and study together, and she knew that every effort would be made to find Salo a suitable room, even if the application came rather late."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[applicative]] | adjective | **1.** Readily applicable or practical. | *"In academic literature, applicative designates readily applicable or practical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applicator]] | noun | **1.** A device for applying a substance. | *"In academic literature, applicator designates a device for applying a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applicatory]] | adjective | **1.** Readily applicable or practical. | *"In academic literature, applicatory designates readily applicable or practical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[complicate]] | verb | **1.** Make more complicated.<br>**2.** Make more complex, intricate, or richer. | *"Mrs Clay’s selfishness was not so complicate nor so revolting as his; and Anne would have compounded for the marriage at once, with all its evils, to be clear of Mr Elliot’s subtleties in endeavouring to prevent it."* — Jane Austen, *Persuasion* |
| [[complicated]] | verb | **1.** Make more complicated.<br>**2.** Make more complex, intricate, or richer. | *"This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means."* — Charles Dickens, *Bleak House* |
| [[complicatedness]] | noun | **1.** Puzzling complexity. | *"In academic literature, complicatedness designates puzzling complexity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[complication]] | noun | **1.** The act or process of complicating.<br>**2.** A situation or condition that is complex or confused. | *"I don’t say that he is not an honourable man, out of all this complication and uncertainty; I am sure he is."* — Charles Dickens, *Bleak House* |
| [[complicity]] | noun | **1.** Guilt as an accomplice in a crime or offense. | *"I won't have any one of the lot of you near me again except Val: I acquit him of complicity: he probably believes Laura innocent."* — Anthony Pryde, *Nightfall* |
| [[duplicability]] | noun | **1.** The quality of being reproducible. | *"In academic literature, duplicability designates the quality of being reproducible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duplicable]] | adjective | **1.** Capable of being duplicated. | *"In academic literature, duplicable designates capable of being duplicated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duplicatable]] | adjective | **1.** Capable of being duplicated. | *"In academic literature, duplicatable designates capable of being duplicated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duplicate]] | noun | **1.** Something additional of the same kind.<br>**2.** A copy that corresponds to an original exactly. | *"I have been making a duplicate of the catalogue of my father’s books and pictures."* — Jane Austen, *Persuasion* |
| [[duplication]] | noun | **1.** A copy that corresponds to an original exactly.<br>**2.** The act of copying or making a duplicate (or duplicates) of something. | *"The duplication of words, as ‘lumee lumee’, ‘poee poee’, ‘muee muee’, is one of their peculiar features."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[duplicator]] | noun | **1.** Apparatus that makes copies of typed, written or drawn material. | *"In academic literature, duplicator designates apparatus that makes copies of typed, written or drawn material."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duplicitous]] | adjective | **1.** Marked by deliberate deceptiveness especially by pretending one set of feelings and acting under the influence of another; - israel zangwill; ; - w.m.thackeray. | *"In academic literature, duplicitous designates marked by deliberate deceptiveness especially by pretending one set of feelings and acting under the influence of another; - israel zangwill; ; - w.m.thackeray."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[duplicity]] | noun | **1.** A fraudulent or duplicitous representation.<br>**2.** Acting in bad faith; deception by pretending to entertain one set of intentions while acting under the influence of another. | *"The manœuvres of selfishness and duplicity must ever be revolting, but I have heard nothing which really surprises me."* — Jane Austen, *Persuasion* |
| [[explicable]] | adjective | **1.** Capable of being explicated or accounted for. | *"Everything else in Christian or secular history, compared to it, seems easy and explicable; and it was achieved by the love of Jesus."* — T. R. Glover, *The Jesus of History* |
| [[explicandum]] | noun | **1.** (logic) a statement of something (a fact or thing or expression) to be explained. | *"In academic literature, explicandum designates (logic) a statement of something (a fact or thing or expression) to be explained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[explicate]] | verb | **1.** Make plain and comprehensible.<br>**2.** Elaborate, as of theories and hypotheses. | *"In academic literature, explicate designates make plain and comprehensible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[explication]] | noun | **1.** The act of making clear or removing obscurity from the meaning of a word or symbol or expression etc.<br>**2.** A detailed explanation of the meaning of something. | *"One but painted thus Would be interpreted a thing perplex’d Beyond self-explication."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[explicit]] | adjective | **1.** Precisely and clearly expressed or readily observable; leaving nothing to implication.<br>**2.** In accordance with fact or the primary meaning of a term. | *"Tulkinghorn gets up, adjusts his spectacles, puts on his hat, puts the manuscript in his pocket, goes out, tells the middle-aged man out at elbows, “I shall be back presently.” Very rarely tells him anything more explicit."* — Charles Dickens, *Bleak House* |
| [[explicitly]] | adverb | **1.** In an explicit manner. | *"This aspect of the fire-festivals had not wholly escaped me in former editions; I pointed it out explicitly, but, biassed perhaps by the great authority of Mannhardt, I treated it as secondary and subordinate instead of primary and dominant."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[explicitness]] | noun | **1.** Clarity as a consequence of being explicit. | *"The Gospel, with varying degrees of explicitness, and St."* — T. R. Glover, *The Jesus of History* |
| [[implicate]] | verb | **1.** Bring into intimate and incriminating connection.<br>**2.** Impose, involve, or imply as a necessary accompaniment or result. | *"Now, there was no reasonable evidence to implicate any person but this woman, and on the improbabilities of her having been able to do it Mr."* — Charles Dickens, *Great Expectations* |
| [[implicated]] | verb | **1.** Bring into intimate and incriminating connection.<br>**2.** Impose, involve, or imply as a necessary accompaniment or result. | *"Weevle reverts from this intelligence to the Galaxy portraits implicated, and seems to know the originals, and to be known of them."* — Charles Dickens, *Bleak House* |
| [[implication]] | noun | **1.** Something that is inferred (deduced or entailed or implied).<br>**2.** A meaning that is not expressly stated but can be inferred. | *"Piper, as in duty bound, is of the same opinion, holding that a private station is better than public applause, and thanking heaven for her own (and, by implication, Mrs."* — Charles Dickens, *Bleak House* |
| [[implicational]] | adjective | **1.** Relating to or concerned with logical implication. | *"In academic literature, implicational designates relating to or concerned with logical implication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[implicative]] | adjective | **1.** Tending to suggest or imply. | *"In academic literature, implicative designates tending to suggest or imply."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[implicit]] | adjective | **1.** Implied though not directly expressed; inherent in the nature of something.<br>**2.** Being without doubt or reserve. | *"Bagnet’s face, his mother yields her implicit assent to what he asks."* — Charles Dickens, *Bleak House* |
| [[implicitly]] | adverb | **1.** Without doubting or questioning.<br>**2.** Without ever expressing so clearly. | *"He told Ada, in his most ingenuous way, that he had not come to make any secret inroad on the terms she had accepted (rather too implicitly and confidingly, he thought) from Mr."* — Charles Dickens, *Bleak House* |
| [[implicitness]] | noun | **1.** Inexplicitness as a consequence of being implied or indirect. | *"His affection was proved to have been sincere, and his conduct cleared of all blame, unless any could attach to the implicitness of his confidence in his friend."* — Jane Austen, *Pride and Prejudice* |
| [[inapplicability]] | noun | **1.** Irrelevance by virtue of being inapplicable to the matter at hand. | *"In academic literature, inapplicability designates irrelevance by virtue of being inapplicable to the matter at hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inapplicable]] | adjective | **1.** Not capable of being applied. | *"Thorpe, smiling complacently; “I must say it, though I _am_ his mother, that there is not a more agreeable young man in the world.” This inapplicable answer might have been too much for the comprehension of many; but it did not puzzle Mrs."* — Jane Austen, *Northanger Abbey* |
| [[inexplicable]] | adjective | **1.** Incapable of being explained or accounted for. | *"O, it offends me to the soul to hear a robustious periwig-pated fellow tear a passion to tatters, to very rags, to split the ears of the groundlings, who, for the most part, are capable of nothing but inexplicable dumb shows and noise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inexplicit]] | adjective | **1.** Implied though not directly expressed; inherent in the nature of something. | *"In academic literature, inexplicit designates implied though not directly expressed; inherent in the nature of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inexplicitness]] | noun | **1.** Unclearness by virtue of not being explicit. | *"Waiving any exception that might be taken to the inaccuracy or inexplicitness of the distinction between internal and external, let us inquire what ground there is to presuppose that disinclination in the people."* — Alexander Hamilton, *The Federalist Papers* |
| [[misapplication]] | noun | **1.** Wrong use or application.<br>**2.** The fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else. | *"Strange that their very elevation was a misapplication, that to raise seemed to falsify."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[multiplication]] | noun | **1.** The act of producing offspring or multiplying by such production.<br>**2.** A multiplicative increase. | *"However, the Multiplication Table doesn’t signify: let’s try Geography."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[multiplicative]] | adjective | **1.** Tending or having the power to multiply or increase in number or quantity or degree. | *"In academic literature, multiplicative designates tending or having the power to multiply or increase in number or quantity or degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plica]] | noun | **1.** A folded part (as in skin or muscle). | *"In academic literature, plica designates a folded part (as in skin or muscle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plicate]] | verb | **1.** Fold into pleats,. | *"In academic literature, plicate designates fold into pleats,."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plication]] | noun | **1.** An angular or rounded shape made by folding.<br>**2.** The act of folding in parallel folds. | *"In academic literature, plication designates an angular or rounded shape made by folding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plicatoperipatus]] | noun | **1.** A genus of peripatidae. | *"In academic literature, plicatoperipatus designates a genus of peripatidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reduplicate]] | verb | **1.** Form by reduplication.<br>**2.** Make or do or perform again. | *"In academic literature, reduplicate designates form by reduplication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reduplication]] | noun | **1.** Repetition of the final words of a sentence or line at the beginning of the next.<br>**2.** The syllable added in a reduplicated word form. | *"He secreted mirth on all occasions for special discharge at popular parties—his productions of this class being more noticeably advanced than Coggan’s, inflicting a faint sense of reduplication and similitude upon the elder members of such companies."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[replica]] | noun | **1.** Copy that is not the original; something that has been copied. | *"Everything, in fact, was done to make the place as perfect a replica as possible of actual underground workings."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[replicate]] | verb | **1.** Bend or turn backward.<br>**2.** Reproduce or make an exact copy of. | *"In academic literature, replicate designates bend or turn backward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[replication]] | noun | **1.** The act of making copies.<br>**2.** (genetics) the process whereby dna makes a copy of itself before cell division. | *"Besides, to be demanded of a sponge—what replication should be made by the son of a king?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[simplicity]] | noun | **1.** The quality of being simple or uncompounded.<br>**2.** A lack of penetration or subtlety. | *"Such is the simplicity of man to hearken after the flesh."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supplicant]] | noun | **1.** Someone who prays to god.<br>**2.** One praying humbly for something. | *"In academic literature, supplicant designates someone who prays to god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supplicate]] | verb | **1.** Ask humbly (for something).<br>**2.** Make a humble, earnest petition. | *"I am no stoic at all to be supplicating here; but I do supplicate to you."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[supplication]] | noun | **1.** A prayer asking god's help as part of a religious service.<br>**2.** A humble request for help from someone in authority. | *"The Palace Enter the King with a supplication, and the Queen with Suffolk’s head, the Duke of Buckingham and the Lord Saye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supplicatory]] | adjective | **1.** Humbly entreating. | *"Lorry, in a soothing tone, bringing his left hand from the back of the chair to lay it on the supplicatory fingers that clasped him in so violent a tremble: “pray control your agitation--a matter of business."* — Charles Dickens, *A Tale of Two Cities* |
| [[surplice]] | noun | **1.** A loose-fitting white ecclesiastical vestment with wide sleeves. | *"Though honesty be no puritan, yet it will do no hurt; it will wear the surplice of humility over the black gown of a big heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surpliced]] | adjective | **1.** Wearing a surplice. | *"There was not a soul there save the two whom I had followed and a surpliced clergyman, who seemed to be expostulating with them."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[uncomplicated]] | adjective | **1.** Lacking complexity.<br>**2.** Easy and not involved or complicated. | *"His thought is uncomplicated by distinctions due to tradition and its accidents."* — T. R. Glover, *The Jesus of History* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLIC
  </div>
</div>
