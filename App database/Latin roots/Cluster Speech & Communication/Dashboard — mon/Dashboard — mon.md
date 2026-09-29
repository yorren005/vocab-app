---
status: unread
type: root_dashboard
---
# Dashboard — mon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mon-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to warn or remind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **mon** means to warn or remind. It refers to the action of warning and carrying out this process. In English, this root forms words such as *monitor*, *monument*, *admonish*, and *premonition*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to warn or remind
> The root **mon** means to warn or remind. It refers to the action of warning and carrying out this process. In English, this root forms words such as *monitor*, *monument*, *admonish*, and *premonition*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To warn or remind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *monitor* and *monument*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mon** comes from a Latin word that means *"to warn or remind"*.
  - At its core, it describes the action of warn or remind.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **mon** in an English word, think of **to warn or remind**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to warn or remind).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Monitor**: A person who observes a process or activity to check that it is carried out correctly. 2. A device used for observing, checking, or keeping continuous record. 3. To observe and check progress over time.
  - **Monument**: A statue, building, or other structure erected to commemorate a famous or notable person or event. 2. An enduring example or reminder of something.
  - **Admonish**: To warn or reprimand someone firmly. 2. To advise or urge someone earnestly.
  - **Premonition**: A strong feeling that something is about to happen, especially something unpleasant.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mon</mark>, think of <mark class="hl-def">to warn or remind</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **mon** appears in three major morphological configurations:
- **Primary Verb Stem (`mon-` / `monit-`)**:
  - *monēre* $\to$ **monition**, **monitor**, **monitory**, **monitorial**.
  - *ad-* + *monēre* $\to$ *admonēre* $\to$ **admonish**, **admonition**, **admonitory**.
  - *prae-* + *monēre* $\to$ *praemonēre* $\to$ **premonition**, **premonitory**.
  - *sub-* + *monēre* $\to$ Anglo-French *somondre* $\to$ **summon**, **summons**.
- **Causative & Deictic Stem (`monstr-` < *monstrāre* "to show")**:
  - *monstrum* $\to$ **monster**, **monstrous**, **monstrosity**.
  - *de-* + *monstrāre* $\to$ **demonstrate**, **demonstration**, **demonstrative**, **demonstrator**.
  - *re-* + *monstrāre* $\to$ *remonstrāre* $\to$ **remonstrate**, **remonstrance**.
- **Memorial Instrument Stem (`monument-` < *monumentum*)**:
  - *monumentum* $\to$ **monument**, **monumental**, **monumentality**.

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

The semantic network of **mon** branches into five crucial domains:
- **Moral Correction & Warning**: *admonish* (warn or reprimand firmly), *admonition* (authoritative counsel or warning), *admonitory*, *premonition* (forewarning, intuitive feeling of future trouble).
- **Supervision, Observation & Technology**: *monitor* (an overseer, detector, screen displaying data), *monitorship*, *monitorial*.
- **Portents, Anomalies & Grotesques**: *monster* (imaginary creature, abnormal threat, cruel person), *monstrous* (shockingly brutal, enormous), *monstrosity*.
- **Civic Memory & Architecture**: *monument* (statue, building, or historical site honoring a person or event), *monumental* (massive, enduring, heroic).
- **Logical Demonstration & Protest**: *demonstrate* (clearly show the existence or truth of something by evidence), *remonstrate* (make a forcefully reproachful protest).

---

## 🔀 4. Prefix & Combining Dynamics on mon

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to, toward") | `ad-` + `monēre` | Warn directly to someone's face $\to$ reprimand, urge duty | *admonish, admonition, admonitory* |
| **`de-`** ("fully, from") | `de-` + `monstrāre` | Show fully by evidence $\to$ prove, display, exhibit | *demonstrate, demonstration, demonstrative, demonstrator* |
| **`prae-`** ("before") | `prae-` + `monēre` | Warn in advance $\to$ foreboding, intuitive warning of danger | *premonition, premonitory* |
| **`re-`** ("back, against") | `re-` + `monstrāre` | Point out back against an action $\to$ voice protest, object | *remonstrate, remonstrance* |
| **`sub-`** ("under, secretly") | `sub-` + `monēre` | Remind privately $\to$ judicial command to appear in court | *summon, summons* |
| **`-mentum`** (instrument) | `monēre` + `-mentum` | Concrete instrument of memory $\to$ memorial stone, statue | *monument, monumental* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Ethics, Law & Judicial Administration**: Formal reprimands, judicial writs, and legal orders to appear (*admonish*, *admonition*, *summon*, *summons*).
- **Scientific Methodology & Logic**: The empirical demonstration of hypotheses and physical proof (*demonstrate*, *demonstration*).
- **Medicine & Critical Care Technology**: Continuous surveillance of vital signs (*cardiac monitor*, *patient monitoring*).
- **Mythology, Literature & Horror**: The cultural and aesthetic study of the grotesque, the uncanny, and teratology (*monster*, *monstrous*).
- **Public History & Urban Architecture**: The preservation of collective heritage through civic sculpture and historic sites (*monument*, *monumental*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admonish]] | verb | **1.** Admonish or counsel in terms of someone's behavior.<br>**2.** Warn strongly; put on guard. | *"The swats sae ream’d in Tammie’s noddle, Fair play, he car’d na deils a boddle, But Maggie stood, right sair astonish’d, Till, by the heel and hand admonish’d, She ventur’d forward on the light; And, wow!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[admonisher]] | noun | **1.** Someone who gives a warning so that a mistake can be avoided. | *"In academic literature, admonisher designates someone who gives a warning so that a mistake can be avoided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admonishing]] | verb | **1.** Admonish or counsel in terms of someone's behavior.<br>**2.** Warn strongly; put on guard. | *"Besides, they are our outward consciences, And preachers to us all, admonishing That we should dress us fairly for our end."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admonishment]] | noun | **1.** A firm rebuke. | *"When was my lord so much ungently temper’d To stop his ears against admonishment?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admonition]] | noun | **1.** Cautionary advice about something imminent (especially imminent danger or other unpleasantness).<br>**2.** A firm rebuke. | *"Double and treble admonition, and still forfeit in the same kind?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admonitory]] | adjective | **1.** Serving to warn.<br>**2.** Expressing reproof or reproach especially as a corrective. | *"Chadband stalks to the table, and before taking a chair, lifts up his admonitory hand."* — Charles Dickens, *Bleak House* |
| [[almoner]] | noun | **1.** An official in a british hospital who looks after the social and material needs of the patients. | *"Working in various organizations, he was made an almoner of the city funds bestowed upon the families of soldiers, and upon hospitals, and afterwards appointed in conjunction with George R."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[antimonopoly]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antimonopoly designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[common]] | noun | **1.** A piece of open land for recreational use in an urban area.<br>**2.** Belonging to or participated in by a community as a whole; public. | *"Why should my heart think that a several plot, Which my heart knows the wide world’s common place?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commonage]] | noun | **1.** Property held in common. | *"His politeness for the fair sex has already been hinted at by Miss Rebecca Sharp--in a word, the whole baronetage, peerage, commonage of England, did not contain a more cunning, mean, selfish, foolish, disreputable old man."* — William Makepeace Thackeray, *Vanity Fair* |
| [[commonality]] | noun | **1.** A class composed of persons lacking clerical or noble rank.<br>**2.** Sharing of common attributes. | *"In academic literature, commonality designates a class composed of persons lacking clerical or noble rank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commonalty]] | noun | **1.** A class composed of persons lacking clerical or noble rank. | *"He’s a very dog to the commonalty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commoner]] | noun | **1.** A person who holds no title.<br>**2.** Belonging to or participated in by a community as a whole; public. | *"O, behold this ring, Whose high respect and rich validity Did lack a parallel; yet for all that He gave it to a commoner o’ the camp, If I be one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commonly]] | adverb | **1.** Under normal conditions. | *"This hand of yours requires A sequester from liberty, fasting and prayer, Much castigation, exercise devout; For here’s a young and sweating devil here That commonly rebels. ’Tis a good hand, A frank one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commonness]] | noun | **1.** The state of being that is commonly observed.<br>**2.** The quality of lacking taste and refinement. | *"Where then lay the spots of commonness? says a young lady enamoured of that careless grace."* — George Eliot, *Middlemarch* |
| [[commons]] | noun | **1.** A piece of open land for recreational use in an urban area.<br>**2.** A pasture subject to common use. | *"Deliver them this paper. [_He gives them a paper_.] Having read it, Bid them repair to th’ marketplace, where I, Even in theirs and in the commons’ ears, Will vouch the truth of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commonsense]] | adjective | **1.** Exhibiting native good judgment. | *"The rules of legal interpretation are rules of COMMONSENSE, adopted by the courts in the construction of the laws."* — Alexander Hamilton, *The Federalist Papers* |
| [[commonsensible]] | adjective | **1.** Exhibiting native good judgment. | *"In academic literature, commonsensible designates exhibiting native good judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commonsensical]] | adjective | **1.** Exhibiting native good judgment. | *"In academic literature, commonsensical designates exhibiting native good judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterdemonstration]] | noun | **1.** A demonstration held in opposition to another demonstration. | *"In academic literature, counterdemonstration designates a demonstration held in opposition to another demonstration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterdemonstrator]] | noun | **1.** Someone who demonstrates in opposition to another demonstration. | *"In academic literature, counterdemonstrator designates someone who demonstrates in opposition to another demonstration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demon]] | noun | **1.** An evil supernatural being.<br>**2.** A cruel wicked and inhuman person. | *"Sir Leicester receives the gout as a troublesome demon, but still a demon of the patrician order."* — Charles Dickens, *Bleak House* |
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
| [[mon]] | noun | **1.** The second day of the week; the first working day.<br>**2.** A member of a buddhist people living in myanmar and adjacent parts of thailand. | *"Thy dæmon—that thy spirit which keeps thee—is Noble, courageous, high, unmatchable, Where Caesar’s is not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mona]] | noun | **1.** An island to the northwest of wales. | *"Then someone said something about the case of the s. s. _Lady Cairns_ of Swansea run into by the _Mona_ which was on an opposite tack in rather muggyish weather and lost with all hands on deck."* — James Joyce, *Ulysses* |
| [[monacan]] | noun | **1.** A native or inhabitant of monaco.<br>**2.** Of or relating to or characteristic of monaco or its people. | *"In academic literature, monacan designates a native or inhabitant of monaco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monaco]] | noun | **1.** A constitutional monarchy in a tiny enclave on the french riviera. | *"Not a churlish saint, Lorenzo Monaco? -- St. 26."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[monaco-ville]] | noun | **1.** The capital of monaco. | *"In academic literature, monaco-ville designates the capital of monaco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monad]] | noun | **1.** (chemistry) an atom having a valence of one.<br>**2.** A singular metaphysical entity from which material properties are said to derive. | *"How 90:3 were the loaves and fishes multiplied on the shores of Galilee, - and that, too, without meal or monad from which loaf or fish could come?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monal]] | noun | **1.** Brilliantly colored pheasant of southern asia. | *"In academic literature, monal designates brilliantly colored pheasant of southern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monandrous]] | adjective | **1.** Having only one husband at a time. | *"In academic literature, monandrous designates having only one husband at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monandry]] | noun | **1.** The state of having only one husband at a time. | *"In academic literature, monandry designates the state of having only one husband at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarch]] | noun | **1.** A nation's ruler or head of state usually by hereditary right.<br>**2.** Large migratory american butterfly having deep orange wings with black and white markings; the larvae feed on milkweed. | *"Incapable of more, replete with you, My most true mind thus maketh mine untrue. 114 Or whether doth my mind being crowned with you Drink up the monarch’s plague this flattery?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monarchal]] | adjective | **1.** Having the characteristics of or befitting or worthy of a monarch.<br>**2.** Ruled by or having the supreme power resting with a monarch. | *"In academic literature, monarchal designates having the characteristics of or befitting or worthy of a monarch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarchic]] | adjective | **1.** Ruled by or having the supreme power resting with a monarch. | *"It was true; Euergetes is a well-known kingly title, but the explanation that it was the reward for strenuous use of monarchic authority was new."* — T. R. Glover, *The Jesus of History* |
| [[monarchical]] | adjective | **1.** Having the characteristics of or befitting or worthy of a monarch.<br>**2.** Ruled by or having the supreme power resting with a monarch. | *"In the latter case, no doubt, the disproportionate force, as well as the monarchical form, of the new confederate, had its share of influence on the events."* — Alexander Hamilton, *The Federalist Papers* |
| [[monarchism]] | noun | **1.** A belief in and advocacy of monarchy as a political system. | *"In academic literature, monarchism designates a belief in and advocacy of monarchy as a political system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monarchist]] | noun | **1.** An advocate of the principles of monarchy. | *"Each party had its taunts in use, the Federalists being denounced as monarchists, the Anti-Federalists as Democrats; the one presumed to be looking forward to monarchy, the other to the rule of the mob."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[monarchy]] | noun | **1.** An autocracy governed by a monarch who usually inherits the authority. | *"Good my sovereign, Take up the English short, and let them know Of what a monarchy you are the head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monarda]] | noun | **1.** Any of various aromatic herbs of the genus monarda. | *"In academic literature, monarda designates any of various aromatic herbs of the genus monarda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monardella]] | noun | **1.** A genus of fragrant herbs of the family labiatae in the western united states. | *"In academic literature, monardella designates a genus of fragrant herbs of the family labiatae in the western united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monario]] | noun | **1.** An artificial language. | *"In academic literature, monario designates an artificial language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monas]] | noun | **1.** A singular metaphysical entity from which material properties are said to derive.<br>**2.** An island to the northwest of wales. | *"Alleg._ ii, Sec. 1, 67 M. _tattetai oun ho theos kata to en kai ten monada, mallon de kai he monas kata ton hena theon_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monastery]] | noun | **1.** The residence of a religious community. | *"This is a thing that Angelo knows not; for he this very day receives letters of strange tenour, perchance of the Duke’s death, perchance entering into some monastery; but, by chance, nothing of what is writ."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monastic]] | noun | **1.** A male religious living in a cloister and devoting himself to contemplation and prayer and work.<br>**2.** Of communal life sequestered from the world under religious vows. | *"They had rambled round by a road which led to the well-known ruins of the Cistercian abbey behind the mill, the latter having, in centuries past, been attached to the monastic establishment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monastical]] | adjective | **1.** Of communal life sequestered from the world under religious vows. | *"In academic literature, monastical designates of communal life sequestered from the world under religious vows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monasticism]] | noun | **1.** Asceticism as a form of religious life; usually conducted in a community under a common rule and characterized by celibacy and poverty and obedience. | *"It is significant that Christian monasticism and the coenobite life began in Egypt, where, as we learn from papyri found in recent years, great monasteries of Serapis existed long before our era."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monatomic]] | adjective | **1.** Of or relating to an element consisting of a single atom. | *"In academic literature, monatomic designates of or relating to an element consisting of a single atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monaul]] | noun | **1.** Brilliantly colored pheasant of southern asia. | *"In academic literature, monaul designates brilliantly colored pheasant of southern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monaural]] | adjective | **1.** Relating to or having or hearing with only one ear. | *"In academic literature, monaural designates relating to or having or hearing with only one ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monaurally]] | adverb | **1.** In a monaural manner. | *"In academic literature, monaurally designates in a monaural manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monazite]] | noun | **1.** A reddish-brown mineral containing rare earth metals; an important source of thorium and cerium. | *"In academic literature, monazite designates a reddish-brown mineral containing rare earth metals; an important source of thorium and cerium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monecious]] | adjective | **1.** Having male and female reproductive organs in the same plant or animal. | *"In academic literature, monecious designates having male and female reproductive organs in the same plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monegasque]] | noun | **1.** A native or inhabitant of monaco.<br>**2.** Of or relating to or characteristic of monaco or its people. | *"In academic literature, monegasque designates a native or inhabitant of monaco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monera]] | noun | **1.** Prokaryotic bacteria and blue-green algae and various primitive pathogens; because of lack of consensus on how to divide the organisms into phyla informal names are used for the major divisions. | *"In academic literature, monera designates prokaryotic bacteria and blue-green algae and various primitive pathogens; because of lack of consensus on how to divide the organisms into phyla informal names are used for the major divisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneran]] | noun | **1.** Organisms that typically reproduce by asexual budding or fission and whose nutritional mode is absorption or photosynthesis or chemosynthesis.<br>**2.** Of or relating to the monera. | *"In academic literature, moneran designates organisms that typically reproduce by asexual budding or fission and whose nutritional mode is absorption or photosynthesis or chemosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneron]] | noun | **1.** Organisms that typically reproduce by asexual budding or fission and whose nutritional mode is absorption or photosynthesis or chemosynthesis. | *"In academic literature, moneron designates organisms that typically reproduce by asexual budding or fission and whose nutritional mode is absorption or photosynthesis or chemosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneses]] | noun | **1.** One species: one-flowered wintergreen; sometimes included in genus pyrola. | *"In academic literature, moneses designates one species: one-flowered wintergreen; sometimes included in genus pyrola."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monestrous]] | adjective | **1.** Having one estrous cycle per year. | *"In academic literature, monestrous designates having one estrous cycle per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monet]] | noun | **1.** French impressionist painter (1840-1926). | *"I own it, this is all wrong, and the rest, Frustra sed anima monet, caro quod fortius est."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[monetarism]] | noun | **1.** An economic theory holding that variations in unemployment and the rate of inflation are usually caused by changes in the supply of money. | *"In academic literature, monetarism designates an economic theory holding that variations in unemployment and the rate of inflation are usually caused by changes in the supply of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monetarist]] | noun | **1.** An advocate of the theory that economic fluctuations are caused by increases or decreases in the supply of money. | *"In academic literature, monetarist designates an advocate of the theory that economic fluctuations are caused by increases or decreases in the supply of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monetary]] | adjective | **1.** Relating to or involving money. | *"So closely connected with this that they are hardly more than different phases of the same thing, are the use of money (the monetary economy), the wage system, and competition as a mode of distribution."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monetisation]] | noun | **1.** Establishing something (e.g. gold or silver) as the legal tender of a country. | *"In academic literature, monetisation designates establishing something (e.g. gold or silver) as the legal tender of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monetise]] | verb | **1.** Give legal value to or establish as the legal tender of a country. | *"In academic literature, monetise designates give legal value to or establish as the legal tender of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monetization]] | noun | **1.** Establishing something (e.g. gold or silver) as the legal tender of a country. | *"In academic literature, monetization designates establishing something (e.g. gold or silver) as the legal tender of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monetize]] | verb | **1.** Give legal value to or establish as the legal tender of a country. | *"In academic literature, monetize designates give legal value to or establish as the legal tender of a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[money]] | noun | **1.** The most common medium of exchange; functions as legal tender.<br>**2.** Wealth reckoned in terms of money. | *"So that you had her wrinkles and I her money, I would she did as you say."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[money-spinner]] | noun | **1.** A project that generates a continuous flow of money. | *"In academic literature, money-spinner designates a project that generates a continuous flow of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneybag]] | noun | **1.** A drawstring bag for holding money. | *"Judge Moneybag will settle this case, I think! * * * * * _16 October._--Mina’s report still the same: lapping waves and rushing water, darkness and favouring winds."* — Bram Stoker, *Dracula* |
| [[moneyed]] | adjective | **1.** Based on or arising from the possession of money or wealth.<br>**2.** Having an abundant supply of money or possessions of value. | *"The Doctor is well moneyed, and his friends Potent at court."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[moneyer]] | noun | **1.** A skilled worker who coins or stamps money. | *"In academic literature, moneyer designates a skilled worker who coins or stamps money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneygrubber]] | noun | **1.** Someone whose main interest in life is moneymaking. | *"In academic literature, moneygrubber designates someone whose main interest in life is moneymaking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneylender]] | noun | **1.** Someone who lends money at excessive rates of interest. | *"The son of a maltjobber and moneylender he was himself a cornjobber and moneylender, with ten tods of corn hoarded in the famine riots."* — James Joyce, *Ulysses* |
| [[moneyless]] | adjective | **1.** Not based on the possession of money.<br>**2.** Having no money. | *"In academic literature, moneyless designates not based on the possession of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneymaker]] | noun | **1.** Someone who is successful in accumulating wealth.<br>**2.** A project that generates a continuous flow of money. | *"In academic literature, moneymaker designates someone who is successful in accumulating wealth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneymaking]] | noun | **1.** The act of making money (and accumulating wealth).<br>**2.** Producing a sizeable profit. | *"In academic literature, moneymaking designates the act of making money (and accumulating wealth)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneyman]] | noun | **1.** A person skilled in large scale financial transactions. | *"In academic literature, moneyman designates a person skilled in large scale financial transactions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moneywort]] | noun | **1.** A loosestrife vine. | *"In academic literature, moneywort designates a loosestrife vine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monied]] | adjective | **1.** Based on or arising from the possession of money or wealth. | *"The urbane activity with which a man receives money is really marvellous, considering that we so earnestly believe money to be the root of all earthly ills, and that on no account can a monied man enter heaven."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[moniker]] | noun | **1.** A familiar name for a person (often a shortened version of a person's given name). | *"In academic literature, moniker designates a familiar name for a person (often a shortened version of a person's given name)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monilia]] | noun | **1.** Any of the yeastlike imperfect fungi of the genus monilia. | *"In academic literature, monilia designates any of the yeastlike imperfect fungi of the genus monilia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moniliaceae]] | noun | **1.** Family of imperfect fungi having white or brightly colored hyphae and spores that are produced directly on the mycelium and not aggregated in fruiting bodies. | *"In academic literature, moniliaceae designates family of imperfect fungi having white or brightly colored hyphae and spores that are produced directly on the mycelium and not aggregated in fruiting bodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moniliales]] | noun | **1.** Order of imperfect fungi lacking conidiophores of having conidiophores that are superficial and not enclosed in a pycnidium. | *"In academic literature, moniliales designates order of imperfect fungi lacking conidiophores of having conidiophores that are superficial and not enclosed in a pycnidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[moniliasis]] | noun | **1.** An infection caused by fungi of the genus monilia or candida (especially candida albicans). | *"In academic literature, moniliasis designates an infection caused by fungi of the genus monilia or candida (especially candida albicans)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monish]] | verb | **1.** Warn strongly; put on guard.<br>**2.** Admonish or counsel in terms of someone's behavior. | *"In academic literature, monish designates warn strongly; put on guard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monism]] | noun | **1.** The doctrine that reality consists of a single basic substance or element. | *"In academic literature, monism designates the doctrine that reality consists of a single basic substance or element."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monistat]] | noun | **1.** An antifungal agent usually administered in the form of a nitrate (trade name monistat). | *"In academic literature, monistat designates an antifungal agent usually administered in the form of a nitrate (trade name monistat)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monistic]] | adjective | **1.** Of or relating to the philosophical doctrine of monism; - j.s.roucek. | *"In academic literature, monistic designates of or relating to the philosophical doctrine of monism; - j.s.roucek."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monition]] | noun | **1.** A firm rebuke.<br>**2.** Cautionary advice about something imminent (especially imminent danger or other unpleasantness). | *"Bagnet growls, “Old girl!” and winks monitions to her to find out what’s the matter."* — Charles Dickens, *Bleak House* |
| [[monitor]] | noun | **1.** Someone who supervises (an examination).<br>**2.** Someone who gives a warning so that a mistake can be avoided. | *"Brocklehurst, pointing to a very high one from which a monitor had just risen: it was brought."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[monitoring]] | noun | **1.** The act of observing something (and sometimes keeping a record of it).<br>**2.** Keep tabs on; keep an eye on; keep under surveillance. | *"Lewis, 1997, Helix Books, Addison-Wesley, Reading, MA. (Foreseeable technologies may reveal huge quantities of raw materials from space.) MONITORING AND CONTROLLING DEBRIS IN SPACE."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[monitory]] | adjective | **1.** Serving to warn. | *"Rich are his walks with supernatural chear; The region of his inner spirit teems With vital sounds, and monitory gleams Of high astonishment and pleasing fear."* — William Wordsworth, *Poems in Two Volumes, Volume 2* |
| [[monitrice]] | noun | **1.** An assistant (often the father of the soon-to-be-born child) who provides support for a woman in labor by encouraging her to use techniques learned in childbirth-preparation classes. | *"In academic literature, monitrice designates an assistant (often the father of the soon-to-be-born child) who provides support for a woman in labor by encouraging her to use techniques learned in childbirth-preparation classes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monnet]] | noun | **1.** French economist who advocated a common market in europe (1888-1979). | *"In academic literature, monnet designates french economist who advocated a common market in europe (1888-1979)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mono]] | noun | **1.** An acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing.<br>**2.** Designating sound transmission or recording or reproduction over a single channel. | *"In forming a slag of similar oxygen ratio, thus— Mono-silicate of lime, 2CaO ."* — Donald M. Levy, *Modern Copper Smelting* |
| [[mono-iodotyrosine]] | noun | **1.** Tyrosine with one iodine atom added. | *"In academic literature, mono-iodotyrosine designates tyrosine with one iodine atom added."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoamine]] | noun | **1.** A molecule containing one amine group (especially one that is a neurotransmitter). | *"In academic literature, monoamine designates a molecule containing one amine group (especially one that is a neurotransmitter)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoatomic]] | adjective | **1.** Of or relating to an element consisting of a single atom. | *"In academic literature, monoatomic designates of or relating to an element consisting of a single atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoblast]] | noun | **1.** A large immature monocyte normally found in bone marrow. | *"In academic literature, monoblast designates a large immature monocyte normally found in bone marrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocanthidae]] | noun | **1.** Filefishes. | *"In academic literature, monocanthidae designates filefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocanthus]] | noun | **1.** Type genus of the monocanthidae. | *"In academic literature, monocanthus designates type genus of the monocanthidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarboxylic]] | adjective | **1.** Containing one carboxyl group. | *"In academic literature, monocarboxylic designates containing one carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarp]] | noun | **1.** A plant that bears fruit once and dies. | *"In academic literature, monocarp designates a plant that bears fruit once and dies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarpic]] | adjective | **1.** Dying after bearing fruit only once. | *"In academic literature, monocarpic designates dying after bearing fruit only once."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochamus]] | noun | **1.** Sawyer beetles. | *"In academic literature, monochamus designates sawyer beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromacy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromacy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromasy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromasy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromat]] | noun | **1.** A person who is completely color-blind. | *"In academic literature, monochromat designates a person who is completely color-blind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromatic]] | adjective | **1.** Of or relating to monochromatism.<br>**2.** (of light or other electromagnetic radiation) having only one wavelength. | *"The oat-harvest began, and all the men were a-field under a monochromatic Lammas sky, amid the trembling air and short shadows of noon."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromatism]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromatism designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochrome]] | noun | **1.** Painting done in a range of tones of a single color.<br>**2.** A black-and-white photograph or slide. | *"The fields were sallow with the impure light, and all were tinged in monochrome, as if beheld through stained glass."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromia]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromia designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromic]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromic designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromous]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromous designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocle]] | noun | **1.** Lens for correcting defective vision in one eye; held in place by facial muscles. | *"In his left eye flashes the monocle of Cashel Boyle O’Connor Fitzmaurice Tisdall Farrell."* — James Joyce, *Ulysses* |
| [[monocled]] | adjective | **1.** Wearing, or having the face adorned with, eyeglasses or an eyeglass. | *"In academic literature, monocled designates wearing, or having the face adorned with, eyeglasses or an eyeglass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinal]] | adjective | **1.** Of a geological structure in which all strata are inclined in the same direction. | *"In academic literature, monoclinal designates of a geological structure in which all strata are inclined in the same direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocline]] | noun | **1.** A geological formation in which all strata are inclined in the same direction. | *"In academic literature, monocline designates a geological formation in which all strata are inclined in the same direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinic]] | adjective | **1.** Having three unequal crystal axes with one oblique intersection. | *"In academic literature, monoclinic designates having three unequal crystal axes with one oblique intersection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinous]] | adjective | **1.** Having pistils and stamens in the same flower. | *"In academic literature, monoclinous designates having pistils and stamens in the same flower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclonal]] | noun | **1.** Any of a class of antibodies produced in the laboratory by a single clone of cells or a cell line and consisting of identical antibody molecules.<br>**2.** Forming or derived from a single clone. | *"In academic literature, monoclonal designates any of a class of antibodies produced in the laboratory by a single clone of cells or a cell line and consisting of identical antibody molecules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocot]] | noun | **1.** A monocotyledonous flowering plant; the stem grows by deposits on its inside. | *"In academic literature, monocot designates a monocotyledonous flowering plant; the stem grows by deposits on its inside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledon]] | noun | **1.** A monocotyledonous flowering plant; the stem grows by deposits on its inside. | *"In academic literature, monocotyledon designates a monocotyledonous flowering plant; the stem grows by deposits on its inside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledonae]] | noun | **1.** Comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae. | *"In academic literature, monocotyledonae designates comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledones]] | noun | **1.** Comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae. | *"In academic literature, monocotyledones designates comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledonous]] | adjective | **1.** (of a flowering plant) having a single cotyledon in the seed as in grasses and lilies. | *"In academic literature, monocotyledonous designates (of a flowering plant) having a single cotyledon in the seed as in grasses and lilies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocracy]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"In academic literature, monocracy designates a form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoculture]] | noun | **1.** The cultivation of a single crop (on a farm or area or country). | *"In academic literature, monoculture designates the cultivation of a single crop (on a farm or area or country)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocycle]] | noun | **1.** A vehicle with a single wheel that is driven by pedals. | *"In academic literature, monocycle designates a vehicle with a single wheel that is driven by pedals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocyte]] | noun | **1.** A type of granular leukocyte that functions in the ingestion of bacteria. | *"In academic literature, monocyte designates a type of granular leukocyte that functions in the ingestion of bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocytosis]] | noun | **1.** Increase in the number of monocytes in the blood; symptom of monocytic leukemia. | *"In academic literature, monocytosis designates increase in the number of monocytes in the blood; symptom of monocytic leukemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monod]] | noun | **1.** French biochemist who (with francois jacob) explained how genes are activated and suggested the existence of messenger rna (1910-1976). | *"In academic literature, monod designates french biochemist who (with francois jacob) explained how genes are activated and suggested the existence of messenger rna (1910-1976)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monodic]] | adjective | **1.** Having a single vocal part. | *"In academic literature, monodic designates having a single vocal part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monodical]] | adjective | **1.** Having a single vocal part. | *"In academic literature, monodical designates having a single vocal part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monodon]] | noun | **1.** Type genus of the monodontidae. | *"In academic literature, monodon designates type genus of the monodontidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monodontidae]] | noun | **1.** Narwhals. | *"Classical and authoritative lexicons catalog monodontidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monody]] | noun | **1.** Music consisting of a single vocal part (usually with accompaniment). | *"Song—A Fiddler In The North The Minstrel At Lincluden A Vision Song—A Red, Red Rose Song—Young Jamie, Pride Of A’ The Plain Song—The Flowery Banks Of Cree Monody On a lady famed for her Caprice."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[monoecious]] | adjective | **1.** Having male and female reproductive organs in the same plant or animal. | *"In academic literature, monoecious designates having male and female reproductive organs in the same plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoestrous]] | adjective | **1.** Having one estrous cycle per year. | *"In academic literature, monoestrous designates having one estrous cycle per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamist]] | noun | **1.** Someone who practices monogamy (one spouse at a time). | *"In academic literature, monogamist designates someone who practices monogamy (one spouse at a time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamous]] | adjective | **1.** (used of relationships and of individuals) having one mate. | *"In academic literature, monogamous designates (used of relationships and of individuals) having one mate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamousness]] | noun | **1.** Having only one spouse at a time. | *"In academic literature, monogamousness designates having only one spouse at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamy]] | noun | **1.** Having only one spouse at a time. | *"Some of his works, such as that _On Monogamy_, bear the stamp of Montanism, for re-marriage was condemned by the Montanists."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monogenesis]] | noun | **1.** Asexual reproduction by the production and release of spores. | *"In academic literature, monogenesis designates asexual reproduction by the production and release of spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogenic]] | adjective | **1.** Of or relating to an inheritable character that is controlled by a single pair of genes. | *"In academic literature, monogenic designates of or relating to an inheritable character that is controlled by a single pair of genes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogram]] | noun | **1.** A graphic symbol consisting of 2 or more letters combined (usually your initials); printed on stationery or embroidered on clothing. | *"It was of gold, and bore his monogram in diamonds."* — Anthony Pryde, *Nightfall* |
| [[monograph]] | noun | **1.** A detailed and documented treatise on a particular subject. | *"Knuffmann in a learned monograph, _Balder, Mythus und Sage_ (Strasburg, 1902). [257] Gudbrand Vigfusson and F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[monogynic]] | adjective | **1.** Having one head or chief wife at a time (along with concubines). | *"In academic literature, monogynic designates having one head or chief wife at a time (along with concubines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogynist]] | noun | **1.** Someone who practices monogamy (one spouse at a time). | *"In academic literature, monogynist designates someone who practices monogamy (one spouse at a time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogynous]] | adjective | **1.** Having one head or chief wife at a time (along with concubines). | *"In academic literature, monogynous designates having one head or chief wife at a time (along with concubines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogyny]] | noun | **1.** Having only one wife at a time. | *"In academic literature, monogyny designates having only one wife at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monohybrid]] | noun | **1.** A hybrid produced by crossing parents that are homozygous except for a single gene locus that has two alleles (as in mendel's experiments with garden peas). | *"In academic literature, monohybrid designates a hybrid produced by crossing parents that are homozygous except for a single gene locus that has two alleles (as in mendel's experiments with garden peas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monohydrate]] | noun | **1.** A hydrate that contains one molecule of water per molecule of the compound. | *"In academic literature, monohydrate designates a hydrate that contains one molecule of water per molecule of the compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoicous]] | adjective | **1.** Having male and female reproductive organs in the same plant or animal. | *"In academic literature, monoicous designates having male and female reproductive organs in the same plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolatry]] | noun | **1.** The worship of a single god but without claiming that it is the only god. | *"In academic literature, monolatry designates the worship of a single god but without claiming that it is the only god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolingual]] | noun | **1.** A person who knows only one language.<br>**2.** Using or knowing only one language. | *"In academic literature, monolingual designates a person who knows only one language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolingually]] | adverb | **1.** In a monolingual manner. | *"In academic literature, monolingually designates in a monolingual manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolith]] | noun | **1.** A single great stone (often in the form of a column or obelisk). | *"The place took its name from a stone pillar which stood there, a strange rude monolith, from a stratum unknown in any local quarry, on which was roughly carved a human hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monolithic]] | adjective | **1.** Imposing in size or bulk or solidity.<br>**2.** Characterized by massiveness and rigidity and total uniformity. | *"In academic literature, monolithic designates imposing in size or bulk or solidity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologist]] | noun | **1.** An entertainer who performs alone. | *"In academic literature, monologist designates an entertainer who performs alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologue]] | noun | **1.** Speech you make to yourself.<br>**2.** A long utterance by one person (especially one that prevents others from participating in the conversation). | *"I didn't expect this to be a monologue, by far."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[monologuise]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuise designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologuize]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuize designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomania]] | noun | **1.** A mania restricted to one thing or idea. | *"It’s a monomania with him to think he is possessed of documents."* — Charles Dickens, *Bleak House* |
| [[monomaniac]] | noun | **1.** A person suffering from monomania. | *"The White Whale swam before him as the monomaniac incarnation of all those malicious agencies which some deep men feel eating in them, till they are left living on with half a heart and half a lung."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[monomaniacal]] | adjective | **1.** Obsessed with a single subject or idea. | *"Well suppressed, indeed, and kept firmly in check for his daughter's sake, and by his brave wife's aid; but insanity, none the less, of the profoundest monomaniacal pattern, for all that."* — Grant Allen, *Michael's Crag* |
| [[monomer]] | noun | **1.** A simple compound whose molecules can join together to form polymers. | *"In academic literature, monomer designates a simple compound whose molecules can join together to form polymers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monometallic]] | adjective | **1.** Containing one atom of metal in the molecule. | *"In academic literature, monometallic designates containing one atom of metal in the molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorium]] | noun | **1.** A genus of formicidae. | *"In academic literature, monomorium designates a genus of formicidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorphemic]] | adjective | **1.** Consisting of only one morpheme. | *"In academic literature, monomorphemic designates consisting of only one morpheme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononeuropathy]] | noun | **1.** Any neuropathy of a single nerve trunk. | *"In academic literature, mononeuropathy designates any neuropathy of a single nerve trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monongahela]] | noun | **1.** A river that rises in northern west virginia and flows north into pennsylvania where it joins the allegheny river at pittsburgh to form the ohio river. | *"Would now, it were old Orleans whiskey, or old Ohio, or unspeakable old Monongahela!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mononuclear]] | adjective | **1.** Having only one nucleus. | *"In academic literature, mononuclear designates having only one nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononucleate]] | adjective | **1.** Having only one nucleus. | *"In academic literature, mononucleate designates having only one nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononucleosis]] | noun | **1.** An acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing. | *"In academic literature, mononucleosis designates an acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophonic]] | adjective | **1.** Designating sound transmission or recording or reproduction over a single channel.<br>**2.** Consisting of a single melodic line. | *"In academic literature, monophonic designates designating sound transmission or recording or reproduction over a single channel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophony]] | noun | **1.** Music consisting of a single vocal part (usually with accompaniment). | *"In academic literature, monophony designates music consisting of a single vocal part (usually with accompaniment)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophthalmos]] | noun | **1.** A general of alexander the great and king of macedonia; lost one eye; killed in a battle at ipsus (382-301 bc). | *"In academic literature, monophthalmos designates a general of alexander the great and king of macedonia; lost one eye; killed in a battle at ipsus (382-301 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophysite]] | noun | **1.** An adherent of monophysitism.<br>**2.** Of or relating to monophysitism. | *"In academic literature, monophysite designates an adherent of monophysitism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophysitic]] | adjective | **1.** Of or relating to monophysitism. | *"In academic literature, monophysitic designates of or relating to monophysitism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophysitism]] | noun | **1.** A christian heresy of the 5th and 6th centuries that challenged the orthodox definition of the two natures (human and divine) in jesus and instead believed there was a single divine nature. | *"In academic literature, monophysitism designates a christian heresy of the 5th and 6th centuries that challenged the orthodox definition of the two natures (human and divine) in jesus and instead believed there was a single divine nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoplane]] | noun | **1.** An airplane with a single wing. | *"Thus, as a sample of my rovings: in a single interval of fifteen minutes of subconsciousness I have crawled and bellowed in the slime of the primeval world and sat beside Haas—further and cleaved the twentieth century air in a gas-driven monoplane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[monoplegia]] | noun | **1.** Paralysis of a single limb. | *"In academic literature, monoplegia designates paralysis of a single limb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoploid]] | adjective | **1.** Of a cell or organism having a single set of chromosomes. | *"In academic literature, monoploid designates of a cell or organism having a single set of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolisation]] | noun | **1.** Domination (of a market or commodity) to the exclusion of others. | *"In academic literature, monopolisation designates domination (of a market or commodity) to the exclusion of others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolise]] | verb | **1.** Have and control fully and exclusively.<br>**2.** Have or exploit a monopoly of. | *"Indeed more than foremost, for in the minds of many he monopolises the credit for this invention."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[monopoliser]] | noun | **1.** Someone who monopolizes the means of producing or selling something. | *"In academic literature, monopoliser designates someone who monopolizes the means of producing or selling something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolist]] | noun | **1.** Someone who monopolizes the means of producing or selling something. | *"In this case the privilege is socially earned by the monopolist; it is not gotten for nothing."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolistic]] | adjective | **1.** Having exclusive control over a commercial activity by possession or legal grant. | *"Monopolistic aspect of organization and particular wages. § 14."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolization]] | noun | **1.** Domination (of a market or commodity) to the exclusion of others. | *"Coal mines, especially those of some peculiar and limited kind, such as anthracite, appear to become easily an object of monopolization."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolize]] | verb | **1.** Have and control fully and exclusively.<br>**2.** Have or exploit a monopoly of. | *"Nor did she monopolize the conversation."* — L. M. Montgomery, *Anne of Avonlea* |
| [[monopolizer]] | noun | **1.** Someone who monopolizes the means of producing or selling something. | *"In academic literature, monopolizer designates someone who monopolizes the means of producing or selling something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopoly]] | noun | **1.** (economics) a market in which there are many buyers but only one seller.<br>**2.** Exclusive control or possession of something. | *"No, faith; lords and great men will not let me; if I had a monopoly out, they would have part on’t and ladies too, they will not let me have all the fool to myself; they’ll be snatching."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monopsony]] | noun | **1.** (economics) a market in which goods or services are offered by several sellers but there is only one buyer. | *"In academic literature, monopsony designates (economics) a market in which goods or services are offered by several sellers but there is only one buyer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopteral]] | adjective | **1.** Having circular columniation. | *"In academic literature, monopteral designates having circular columniation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monorail]] | noun | **1.** A railway having a single track. | *"In academic literature, monorail designates a railway having a single track."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monorchidism]] | noun | **1.** Failure of one testes to descend into the scrotum. | *"In academic literature, monorchidism designates failure of one testes to descend into the scrotum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monorchism]] | noun | **1.** Failure of one testes to descend into the scrotum. | *"In academic literature, monorchism designates failure of one testes to descend into the scrotum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosaccharide]] | noun | **1.** A sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates. | *"In academic literature, monosaccharide designates a sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosaccharose]] | noun | **1.** A sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates. | *"In academic literature, monosaccharose designates a sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosemous]] | adjective | **1.** Having only one meaning. | *"In academic literature, monosemous designates having only one meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosemy]] | noun | **1.** Having a single meaning (absence of ambiguity) usually of individual words or phrases. | *"In academic literature, monosemy designates having a single meaning (absence of ambiguity) usually of individual words or phrases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosomy]] | noun | **1.** Chromosomal abnormality consisting of the absence of one chromosome from the normal diploid number. | *"In academic literature, monosomy designates chromosomal abnormality consisting of the absence of one chromosome from the normal diploid number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosyllabic]] | adjective | **1.** Having or characterized by or consisting of one syllable. | *"I made some attempts to draw her into conversation, but she seemed a person of few words: a monosyllabic reply usually cut short every effort of that sort."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[monosyllabically]] | adverb | **1.** In a monosyllabic manner. | *"In academic literature, monosyllabically designates in a monosyllabic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosyllable]] | noun | **1.** A word or utterance of one syllable. | *"Smallweed’s favourite adjective of disparagement is so close to his tongue that he begins the words “my dear friend” with the monosyllable “brim,” thus converting the possessive pronoun into brimmy and appearing to have an impediment in his speech."* — Charles Dickens, *Bleak House* |
| [[monotheism]] | noun | **1.** Belief in a single god. | *"Israel had stood for monotheism and that not the monotheism of Greek philosophy, a dogma of the schools consistent with the cults of Egypt and Phrygia, with hierodules and a deified Antinous."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monotheist]] | noun | **1.** A believer in one god. | *"Christ, as the true spiritual idea, is the ideal of God now and forever, here and everywhere. 361:6 The Jew who believes in the First Commandment is a monotheist; he has one omnipresent God."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monotheistic]] | adjective | **1.** Believing that there is only one god. | *"Its business now was to reconcile its own monotheistic dogma with popular polytheistic practice."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monothelitism]] | noun | **1.** The theological doctrine that christ had only one will even though he had two natures (human and divine); condemned as heretical in the third council of constantinople. | *"In academic literature, monothelitism designates the theological doctrine that christ had only one will even though he had two natures (human and divine); condemned as heretical in the third council of constantinople."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotone]] | noun | **1.** An unchanging intonation.<br>**2.** A single tone repeated with different words or different rhythms (especially in rendering liturgical texts). | *"His reading of Scripture had no elocutionary pretensions about it; it was quiet, and to a large extent gone through in a monotone; but two things about it made it very impressive."* — John Cairns, *Principal Cairns* |
| [[monotonic]] | adjective | **1.** Of a sequence or function; consistently increasing and never decreasing or consistently decreasing and never increasing in value.<br>**2.** Sounded or spoken in a tone unvarying in pitch. | *"In academic literature, monotonic designates of a sequence or function; consistently increasing and never decreasing or consistently decreasing and never increasing in value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotonous]] | adjective | **1.** Tediously repetitious or lacking in variety.<br>**2.** Sounded or spoken in a tone unvarying in pitch. | *"Rouncewell that the rain makes such a monotonous pattering on the terrace that he can’t read the paper even by the fireside in his own snug dressing-room."* — Charles Dickens, *Bleak House* |
| [[monotonously]] | adverb | **1.** In a monotonous manner. | *"They tossed and turned on their little beds, and the cheese-wring dripped monotonously downstairs."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monotony]] | noun | **1.** The quality of wearisome constancy, routine, and lack of variety.<br>**2.** Constancy of tone or pitch or inflection. | *"Why do you ask?” “Anything to vary this detestable monotony."* — Charles Dickens, *Bleak House* |
| [[monotremata]] | noun | **1.** Coextensive with the subclass prototheria. | *"In academic literature, monotremata designates coextensive with the subclass prototheria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotreme]] | noun | **1.** The most primitive mammals comprising the only extant members of the subclass prototheria. | *"In academic literature, monotreme designates the most primitive mammals comprising the only extant members of the subclass prototheria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotropa]] | noun | **1.** Leafless fleshy saprophytic plants; in some classifications placed in the family pyrolaceae. | *"In academic literature, monotropa designates leafless fleshy saprophytic plants; in some classifications placed in the family pyrolaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotropaceae]] | noun | **1.** Used in some classification for saprophytic herbs sometimes included in the family pyrolaceae: genera monotropa and sarcodes. | *"In academic literature, monotropaceae designates used in some classification for saprophytic herbs sometimes included in the family pyrolaceae: genera monotropa and sarcodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotype]] | noun | **1.** (biology) a taxonomic group with a single member (a single species or genus).<br>**2.** A typesetting machine operated from a keyboard that sets separate characters. | *"The linotype and monotype machines, uncanny in their operations, have also come into common practice."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[monotypic]] | adjective | **1.** Consisting of only one type. | *"In academic literature, monotypic designates consisting of only one type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monounsaturated]] | adjective | **1.** (of long-chain carbon compounds especially fats) saturated except for one multiple bond. | *"In academic literature, monounsaturated designates (of long-chain carbon compounds especially fats) saturated except for one multiple bond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monovalent]] | adjective | **1.** Containing only one kind of antibody.<br>**2.** Having a valence of 1. | *"In academic literature, monovalent designates containing only one kind of antibody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monovular]] | adjective | **1.** (of twins) derived from a single egg or ovum. | *"In academic literature, monovular designates (of twins) derived from a single egg or ovum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoxide]] | noun | **1.** An oxide containing just one atom of oxygen in the molecule. | *"The ordinary iron furnaces belch forth flames which are really good useful gas (carbon monoxide) burning to waste."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[monozygotic]] | adjective | **1.** Derived from a single fertilized egg. | *"In academic literature, monozygotic designates derived from a single fertilized egg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monroe]] | noun | **1.** United states film actress noted for sex appeal (1926-1962).<br>**2.** 5th president of the united states; author of the monroe doctrine (1758-1831). | *"But one of them, the captain of the _Monroe_, knowing that Ned Land had shipped on board the _Abraham Lincoln_, begged for his help in chasing a whale they had in sight."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[monrovia]] | noun | **1.** The capital and chief port and largest city of liberia. | *"In academic literature, monrovia designates the capital and chief port and largest city of liberia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mons]] | noun | **1.** A mound of fatty tissue covering the pubic area in women.<br>**2.** The second day of the week; the first working day. | *"Monseur, _Le Folklore Wallon_ (Brussels, N.D.), pp. 124 _sq._ [268] Émile Hublard, _Fêtes du Temps Jadis, les Feux du Carême_ (Mons, 1899), pp. 25."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[monsieur]] | noun | **1.** Used as a french courtesy title; equivalent to english `mr'. | *"Monsieur Parolles, my lord calls for you. [_Exit Page._] PAROLLES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monsignor]] | noun | **1.** (roman catholic church) an ecclesiastical title of honor bestowed on some priests. | *"In academic literature, monsignor designates (roman catholic church) an ecclesiastical title of honor bestowed on some priests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monsoon]] | noun | **1.** A seasonal wind in southern asia; blows from the southwest (bringing rain) in summer and from the northeast in winter.<br>**2.** Rainy season in southern asia when the southwestern monsoon blows, bringing heavy rains. | *"They were obliged to remain prisoners here until the change of the monsoon to the north-west, as without a favourable wind in their then disabled state, it would have been impossible for them to have reached a port."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[monster]] | noun | **1.** An imaginary creature usually having various human and animal parts.<br>**2.** Someone or something that is abnormally large and powerful. | *"And when I break that oath, let me turn monster."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monstera]] | noun | **1.** Any plant of the genus monstera; often grown as houseplants.<br>**2.** Tropical cylindrical fruit resembling a pinecone with pineapple-banana flavor. | *"In academic literature, monstera designates any plant of the genus monstera; often grown as houseplants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monstrance]] | noun | **1.** Proof by a process of argument or a series of proposition proving an asserted conclusion.<br>**2.** (roman catholic church) a vessel (usually of gold or silver) in which the consecrated host is exposed for adoration. | *"Ablethorpe said that in that case he would go home and place the monstrance--I think he called it, but it doesn't seem the right word, does it?--in a place of safety."* — S. R. Crockett, *Deep Moat Grange* |
| [[monstrosity]] | noun | **1.** A person or animal that is markedly unusual or deformed.<br>**2.** Something hideous or frightful. | *"He who thought it not good for man to be alone preserve me from the more prodigious monstrosity of being never by myself!"* — Anne Gilchrist, *Mary Lamb* |
| [[monstrous]] | adjective | **1.** Abnormally large.<br>**2.** Shockingly brutal or cruel. | *"Thou this to hazard needs must intimate Skill infinite, or monstrous desperate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monstrously]] | adverb | **1.** In a hideous manner.<br>**2.** In a terribly evil manner. | *"ANGELO. ’Tis so; and that self chain about his neck Which he forswore most monstrously to have."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[montage]] | noun | **1.** A paste-up made by sticking together pieces of paper or photographs to form an artistic image. | *"In academic literature, montage designates a paste-up made by sticking together pieces of paper or photographs to form an artistic image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montagu]] | noun | **1.** United states anthropologist (born in england) who popularized anthropology (1905-). | *"Basil Montagu; and here he composed many of his smaller pieces."* — F. W. H. Myers, *Wordsworth* |
| [[montaigne]] | noun | **1.** French writer regarded as the originator of the modern essay (1533-1592). | *"It is to their custom of annually extinguishing and relighting the fire that Montaigne refers in his essay (i. 22, vol. i. p. 140 of Charpentier's edition), though he mentions no names. [338] Sir H.H."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[montana]] | noun | **1.** A state in northwestern united states on the canadian border. | *"The next I heard of Frank was that he was in Montana, and then he went prospecting in Arizona, and then I heard of him from New Mexico."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[montanan]] | noun | **1.** A native or resident of montana. | *"In academic literature, montanan designates a native or resident of montana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montane]] | adjective | **1.** Of or inhabiting mountainous regions. | *"In academic literature, montane designates of or inhabiting mountainous regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monte]] | noun | **1.** A gambling card game of spanish origin; 3 or 4 cards are dealt face up and players bet that one of them will be matched before the others as the cards are dealt from the pack one at a time. | *"DAUPHIN. _Monte à cheval!_ My horse, _varlet! laquais_, ha!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[montenegro]] | noun | **1.** A former country bordering on the adriatic sea; now part of the union of serbia and montenegro. | *"In Montenegro they meet the log with a loaf of bread and a jug of wine, drink to it, and pour wine on it, whereupon the whole family drinks out of the same beaker."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[monterey]] | noun | **1.** A town in western california to the south of san francisco on a peninsula at the southern end of monterey bay. | *"And young Raynor—you knew Raynor at Monterey—tells me that the men all like him, and that he is treated with something like deference everywhere."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[monterrey]] | noun | **1.** An industrial city in northeastern mexico. | *"In academic literature, monterrey designates an industrial city in northeastern mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montespan]] | noun | **1.** French noblewoman who was mistress to louis xiv until he became attracted to madame de maintenon (1641-1707). | *"In academic literature, montespan designates french noblewoman who was mistress to louis xiv until he became attracted to madame de maintenon (1641-1707)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montesquieu]] | noun | **1.** French political philosopher who advocated the separation of executive and legislative and judicial powers (1689-1755). | *"The opponents of the plan proposed have, with great assiduity, cited and circulated the observations of Montesquieu on the necessity of a contracted territory for a republican government."* — Alexander Hamilton, *The Federalist Papers* |
| [[montessori]] | noun | **1.** Italian educator who developed a method of teaching mentally handicapped children and advocated a child-centered approach (1870-1952). | *"In academic literature, montessori designates italian educator who developed a method of teaching mentally handicapped children and advocated a child-centered approach (1870-1952)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monteverdi]] | noun | **1.** Italian composer (1567-1643). | *"In academic literature, monteverdi designates italian composer (1567-1643)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montevideo]] | noun | **1.** The capital and largest city of uruguay; a cosmopolitan city and one of the busiest ports in south america. | *"In academic literature, montevideo designates the capital and largest city of uruguay; a cosmopolitan city and one of the busiest ports in south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montez]] | noun | **1.** Irish dancer (1818-1861). | *"In academic literature, montez designates irish dancer (1818-1861)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montezuma]] | noun | **1.** Evergreen tree with large leathery leaves and large pink to orange flowers; considered a link plant between families bombacaceae and sterculiaceae. | *"We are told that Montezuma, the last king of Mexico, was worshipped by his people as a god."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[montfort]] | noun | **1.** An english nobleman who led the baronial rebellion against henry iii (1208-1265). | *"In academic literature, montfort designates an english nobleman who led the baronial rebellion against henry iii (1208-1265)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montgolfier]] | noun | **1.** French inventor who (with his brother josef michel montgolfier) pioneered hot-air ballooning (1745-1799).<br>**2.** French inventor who (with his brother jacques etienne montgolfier) pioneered hot-air ballooning (1740-1810). | *"In academic literature, montgolfier designates french inventor who (with his brother josef michel montgolfier) pioneered hot-air ballooning (1745-1799)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montgomery]] | noun | **1.** Canadian novelist (1874-1942).<br>**2.** English general during world war ii; won victories over rommel in north africa and led british ground forces in the invasion of normandy (1887-1976). | *"Enter Montgomery with drum and Soldiers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[month]] | noun | **1.** One of the twelve divisions of the calendar year.<br>**2.** A time unit of approximately 30 days. | *"Why, she would hang on him As if increase of appetite had grown By what it fed on; and yet, within a month— Let me not think on’t—Frailty, thy name is woman!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monthlong]] | adjective | **1.** Last through a month. | *"In academic literature, monthlong designates last through a month."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monthly]] | noun | **1.** A periodical that is published every month (or 12 issues per year).<br>**2.** Of or occurring or payable every month. | *"Ourself, by monthly course, With reservation of an hundred knights, By you to be sustain’d, shall our abode Make with you by due turn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[montia]] | noun | **1.** Small genus of densely tufted annual herbs; north temperate regions and south america and tropical africa and asia. | *"In academic literature, montia designates small genus of densely tufted annual herbs; north temperate regions and south america and tropical africa and asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montmartre]] | noun | **1.** The highest point in paris; famous for its associations with many artists. | *"Making his day’s stations, the dingy printingcase, his three taverns, the Montmartre lair he sleeps short night in, rue de la Goutte-d’Or, damascened with flyblown faces of the gone."* — James Joyce, *Ulysses* |
| [[montpelier]] | noun | **1.** Capital of the state of vermont; located in north central vermont. | *"Some skeletons of poulps are preserved in the museums of Trieste and Montpelier, that measure two yards in length."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[montrachet]] | noun | **1.** A white burgundy wine. | *"In academic literature, montrachet designates a white burgundy wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montreal]] | noun | **1.** A city in southern quebec province on the saint lawrence river; the largest city in quebec and 2nd largest in canada; the 2nd largest french-speaking city in the world. | *"But he arranged his tour so as to enable him also to be present at the General Assembly of the American Presbyterian Church at Madison, and at that of the Presbyterian Church of Canada at Montreal."* — John Cairns, *Principal Cairns* |
| [[montserrat]] | noun | **1.** A volcanic island in the caribbean; in the west indies. | *"In academic literature, montserrat designates a volcanic island in the caribbean; in the west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montserratian]] | noun | **1.** A native or inhabitant of montserrat.<br>**2.** Of or relating to montserrat or the inhabitants of montserrat. | *"In academic literature, montserratian designates a native or inhabitant of montserrat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monument]] | noun | **1.** A structure erected to commemorate persons or events.<br>**2.** An important site that is marked and preserved as public property. | *"If the quick fire of youth light not your mind, You are no maiden but a monument; When you are dead, you should be such a one As you are now; for you are cold and stern, And now you should be as your mother was When your sweet self was got."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monumental]] | adjective | **1.** Relating or belonging to or serving as a monument.<br>**2.** Of outstanding significance. | *"He hath perverted a young gentlewoman here in Florence, of a most chaste renown, and this night he fleshes his will in the spoil of her honour; he hath given her his monumental ring, and thinks himself made in the unchaste composition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monumentalise]] | verb | **1.** Record or memorialize lastingly with a monument. | *"In academic literature, monumentalise designates record or memorialize lastingly with a monument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monumentalize]] | verb | **1.** Record or memorialize lastingly with a monument. | *"In academic literature, monumentalize designates record or memorialize lastingly with a monument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonmonotonic]] | adjective | **1.** Not monotonic. | *"In academic literature, nonmonotonic designates not monotonic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[premonition]] | noun | **1.** A feeling of evil to come.<br>**2.** An early warning about a future event. | *"But I have a sort of premonition that I shall go right on rapping."* — Jack London, *The Jacket (The Star-Rover)* |
| [[premonitory]] | adjective | **1.** Warning of future misfortune. | *"He found him presenting the usual premonitory symptoms of death."* — Classic Author, *The wonders of prayer* |
| [[promontory]] | noun | **1.** A natural elevation (especially a rocky one that juts out into the sea). | *"Antony’s Camp near the Promontory of Actium."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remonstrance]] | noun | **1.** The act of expressing earnest opposition or protest. | *"Your brother’s death, I know, sits at your heart, And you may marvel why I obscured myself, Labouring to save his life, and would not rather Make rash remonstrance of my hidden power Than let him so be lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remonstrate]] | verb | **1.** Argue in protest or opposition.<br>**2.** Present and urge reasons in opposition. | *"So that it is even more mischievous,” said my guardian once to me, “to remonstrate with the poor dear fellow than to leave him alone.” I took one of these opportunities of mentioning my doubts of Mr."* — Charles Dickens, *Bleak House* |
| [[remonstration]] | noun | **1.** The act of expressing earnest opposition or protest. | *"In academic literature, remonstration designates the act of expressing earnest opposition or protest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summon]] | verb | **1.** Call in an official matter, such as to attend court.<br>**2.** Ask to come. | *"Lend you him I will For half a hundred years.—Summon the town."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[summoning]] | noun | **1.** Calling up supposed supernatural forces by spells and incantations.<br>**2.** Call in an official matter, such as to attend court. | *"Again, summoning all my courage, I attempted it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[surmontil]] | noun | **1.** Tricyclic antidepressant drug (trade name surmontil) used to treat depression and anxiety and (sometimes) insomnia. | *"In academic literature, surmontil designates tricyclic antidepressant drug (trade name surmontil) used to treat depression and anxiety and (sometimes) insomnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tramontana]] | noun | **1.** A cold dry wind that blows south out of the mountains into italy and the western mediterranean. | *"In academic literature, tramontana designates a cold dry wind that blows south out of the mountains into italy and the western mediterranean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tramontane]] | noun | **1.** A cold dry wind that blows south out of the mountains into italy and the western mediterranean.<br>**2.** On or coming from the other side of the mountains (from the speaker). | *"In academic literature, tramontane designates a cold dry wind that blows south out of the mountains into italy and the western mediterranean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmontane]] | adjective | **1.** On or coming from the other side of the mountains (from the speaker). | *"In academic literature, transmontane designates on or coming from the other side of the mountains (from the speaker)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontane]] | noun | **1.** A roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline).<br>**2.** Of or relating to ultramontanism. | *"In academic literature, ultramontane designates a roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontanism]] | noun | **1.** (roman catholic church) the policy that the absolute authority of the church should be vested in the pope. | *"In academic literature, ultramontanism designates (roman catholic church) the policy that the absolute authority of the church should be vested in the pope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommon]] | adjective | **1.** Not common or ordinarily encountered; unusually great in amount or remarkable in character or kind.<br>**2.** Marked by an uncommon quality; especially superlative or extreme of its kind; -j.r.lowell. | *"He stares at it with uncommon interest; he seems to be fixed and fascinated by it."* — Charles Dickens, *Bleak House* |
| [[uncommonly]] | adverb | **1.** Exceptionally. | *"I scarcely knew him again, he was so uncommonly smart."* — Charles Dickens, *Bleak House* |
| [[uncommonness]] | noun | **1.** Extraordinariness as a consequence of being marked by an uncommon or superlative quality.<br>**2.** Extraordinariness as a consequence of being rare and seldom encountered. | *"In academic literature, uncommonness designates extraordinariness as a consequence of being marked by an uncommon or superlative quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemonstrative]] | adjective | **1.** Not given to open expression of emotion. | *"You _shall_,” repeated Mary, in the tone of undemonstrative sincerity which seemed natural to her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MON
  </div>
</div>
