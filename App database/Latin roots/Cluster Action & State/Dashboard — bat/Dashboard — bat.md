---
status: unread
type: root_dashboard
---
# Dashboard — bat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to beat”</span>
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

The root **bat** means to beat. It refers to repeated forceful blows. In English, this root forms words such as *abate*, *battalion*, *batter*, and *battery*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to beat
> The root **bat** means to beat. It refers to repeated forceful blows. In English, this root forms words such as *abate*, *battalion*, *batter*, and *battery*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To beat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *abate* and *battalion*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bat** comes from a Latin word that means *"to beat"*.
  - At its core, it describes the action of beat.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **bat** in an English word, think of **to beat**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to beat).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Abate**: To become less intense, severe, or widespread.
  - **Battalion**: A body of troops ready for battle.
  - **Batter**: To strike repeatedly with heavy blows.
  - **Battery**: One or more electrochemical cells connected together as a source of current.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bat</mark>, think of <mark class="hl-def">to beat</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Because transmission was through French rather than the schoolroom, the stems are French shapes of the Latin verb:
> - **Single-*t* Stem:** `-bate` (from Old French *batre* with a prefix) — the verbs of beating down or beating against: [[abate]], [[rebate]], [[debate]], and, with vowel change, [[combat]].
> - **Double-*t* Stem:** `batt-` (from *battere* / *battuālia*) — the nouns and frequentatives of fighting and striking: [[batter]], [[battery]], [[battle]], [[battalion]].
>
> Prefixes are directional and attach in front of the French stem (`ad-` → *a-*, `com-`, `de-`, `re-`); suffixes turn the act into an agent, a collective, or an institution (`-er`, `-ery`, `-aille` → *-le*, Italian `-one` → *-alion*). No `-tion` abstract noun of the classical type ever formed from this root in English, a clear sign that it arrived by speech and not by scholarship.

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
> - **Physical / Mechanical Sense:** In [[batter]] the root is literal repeated impact — waves against a hull, a ram against a gate, a whisk through flour and egg.
> - **Cognitive / Intellectual Sense:** In [[debate]] the blows are verbal: a question is beaten back and forth between opposed speakers until one position gives way.
> - **Institutional / Governance Sense:** [[battalion]] names a formal unit of army organisation, [[battery]] a criminal offence and a tort, and [[abate]] and [[rebate]] the official reduction of a nuisance, a tax, or a bill.
> - **Specialized / Scientific Sense:** [[battery]] is the standard term for an electrochemical power source and, in psychology and medicine, for a fixed set of tests administered together; [[abate]] carries the technical sense used in environmental engineering — noise and pollution abatement.

---

## 🔀 4. Prefix & Combining Dynamics on bat

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (→ a-) | to, at, down upon | [[abate]] | To beat *down* — to reduce, lessen, or suppress. |
| `com-` | together, with | [[combat]] | To beat *together with* another — to fight at close quarters. |
| `de-` | down, thoroughly | [[debate]] | To beat *down* an opponent's case — originally to fight, now to argue. |
| `re-` | back, again | [[rebate]] | To beat *back* — to knock an amount off what is owed. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-er` | Verb (frequentative) / Agent noun | [[batter]] | Marks repeated action — to strike again and again; also the one who bats. |
| `-ery` (Old French `-erie`) | Noun (act → collective) | [[battery]] | The act of beating, then any set of units working as one. |
| `-aille` → `-le` | Noun (collective action) | [[battle]] | Names the fighting itself, from *battuālia*, "fencing exercises". |
| `-one` (Italian augmentative) | Noun (large unit) | [[battalion]] | Scales the collective up to a formal body of troops. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Science & Medicine** | [[battery]], [[abate]] | Electrochemical cells and storage; a battery of diagnostic or psychometric tests; symptoms and epidemics abating |
| 🏛️ **Law & Governance** | [[battery]], [[abate]], [[rebate]] | Assault and battery; abatement of nuisances and of legacies; tax and rate rebates |
| 🎓 **Academic & Rhetoric** | [[debate]], [[combat]] | Formal and parliamentary debate, adversarial argument, combating misinformation |
| 🗣️ **Everyday & Professional** | [[batter]], [[battle]], [[battalion]], [[rebate]] | Storm-battered coastlines and frying batter; an uphill battle; a battalion of volunteers; mail-in rebates |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abatable]] | adjective | **1.** Capable of being abated. | *"In academic literature, abatable designates capable of being abated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abate]] | verb | **1.** Make less active or intense.<br>**2.** Become less in amount or intensity. | *"Being so far provok’d as I was in France, I would abate her nothing, though I profess myself her adorer, not her friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abatement]] | noun | **1.** An interruption in the intensity or amount of something.<br>**2.** The act of abating. | *"I know you are more clement than vile men, Who of their broken debtors take a third, A sixth, a tenth, letting them thrive again On their abatement; that’s not my desire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abatic]] | adjective | **1.** Of or relating to abasia (inability to walk). | *"In academic literature, abatic designates of or relating to abasia (inability to walk)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abator]] | noun | **1.** A person who abates a nuisance. | *"In academic literature, abator designates a person who abates a nuisance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abbatial]] | adjective | **1.** Of or having to do with or belonging to an abbey or abbot, or abbess. | *"In the _Abbatial_ libraries, according to the catalogues given by Leland, there were only the following classics--Cicero and Aristotle, which were common; Terence, Euclid, Quintus Curtius, Sidonius Apollinaris, Julius Frontinus, Apuleius, and Seneca."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[albatrellus]] | noun | **1.** A genus of fungi belonging to the family polyporaceae. | *"In academic literature, albatrellus designates a genus of fungi belonging to the family polyporaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albatross]] | noun | **1.** (figurative) something that hinders or handicaps.<br>**2.** Large web-footed birds of the southern hemisphere having long narrow wings; noted for powerful gliding flight. | *"Bethink thee of the albatross, whence come those clouds of spiritual wonderment and pale dread, in which that white phantom sails in all imaginations?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[anabatic]] | adjective | **1.** Of an air current or wind; rising especially up a slope. | *"In academic literature, anabatic designates of an air current or wind; rising especially up a slope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[approbate]] | verb | **1.** Approve or sanction officially.<br>**2.** Accept (documents) as valid. | *"In academic literature, approbate designates approve or sanction officially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[approbation]] | noun | **1.** Official approval.<br>**2.** Official recognition or approval. | *"Ay, worthy Menenius, and with most prosperous approbation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[approbative]] | adjective | **1.** Expressing or manifesting praise or approval. | *"In academic literature, approbative designates expressing or manifesting praise or approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[approbatory]] | adjective | **1.** Expressing or manifesting praise or approval. | *"In academic literature, approbatory designates expressing or manifesting praise or approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bat]] | noun | **1.** Nocturnal mouselike mammal with forelimbs modified to form membranous wings and anatomical adaptations for echolocation by which they navigate.<br>**2.** (baseball) a turn trying to get a hit. | *"Ere the bat hath flown His cloister’d flight, ere to black Hecate’s summons The shard-born beetle, with his drowsy hums, Hath rung night’s yawning peal, there shall be done A deed of dreadful note."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bata]] | noun | **1.** A chadic language spoken south of lake chad. | *"Fellowcountrymen, _sgenl inn ban bata coisde gan capall._ I call on my old friend, Dr Malachi Mulligan, sex specialist, to give medical testimony on my behalf."* — James Joyce, *Ulysses* |
| [[bataan]] | noun | **1.** The peninsula and island in the philippines where japanese forces besieged american forces in world war ii; united states forces surrendered in 1942 and recaptured the area in 1945. | *"In academic literature, bataan designates the peninsula and island in the philippines where japanese forces besieged american forces in world war ii; united states forces surrendered in 1942 and recaptured the area in 1945."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batch]] | noun | **1.** All the loaves of bread baked at the same time.<br>**2.** (often followed by `of') a large number or amount or extent. | *"Thou crusty batch of nature, what’s the news?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bate]] | verb | **1.** Moderate or restrain; lessen the force of.<br>**2.** Flap the wings wildly or frantically; used of falcons. | *"Yes, good faith, every dram of it; and I will not bate thee a scruple."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bated]] | verb | **1.** Moderate or restrain; lessen the force of.<br>**2.** Flap the wings wildly or frantically; used of falcons. | *"So are the horses of the enemy In general, journey-bated and brought low."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[batidaceae]] | noun | **1.** Family coextensive with genus batis: saltworts. | *"In academic literature, batidaceae designates family coextensive with genus batis: saltworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batik]] | noun | **1.** A dyed fabric; a removable wax is used where the dye is not wanted.<br>**2.** Dye with wax. | *"In academic literature, batik designates a dyed fabric; a removable wax is used where the dye is not wanted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batis]] | noun | **1.** Small genus of plants constituting the family batidaceae: low straggling dioecious shrubs. | *"In academic literature, batis designates small genus of plants constituting the family batidaceae: low straggling dioecious shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batiste]] | noun | **1.** A thin plain-weave cotton or linen fabric; used for shirts or dresses. | *"In academic literature, batiste designates a thin plain-weave cotton or linen fabric; used for shirts or dresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batman]] | noun | **1.** An orderly assigned to serve a british military officer. | *"Having left that soldier who was evidently drunk, Rostóv stopped the horse of a batman or groom of some important personage and began to question him."* — graf Leo Tolstoy, *War and Peace* |
| [[batna]] | noun | **1.** A town in north central algeria. | *"In academic literature, batna designates a town in north central algeria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batoidei]] | noun | **1.** Fish with dorsoventrally flattened bodies; includes: rays; skates; guitarfishes; sawfishes. | *"In academic literature, batoidei designates fish with dorsoventrally flattened bodies; includes: rays; skates; guitarfishes; sawfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baton]] | noun | **1.** A thin tapered rod used by a conductor to lead an orchestra or choir.<br>**2.** A short stout club used primarily by policemen. | *"The rest of his toilet was soon achieved, and he proudly marched out of the room, wrapped up in his great pilot monkey jacket, and sporting his harpoon like a marshal’s baton."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[batrachia]] | noun | **1.** Frogs, toads, tree toads. | *"In academic literature, batrachia designates frogs, toads, tree toads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batrachian]] | noun | **1.** Any of various tailless stout-bodied amphibians with long hind limbs for leaping; semiaquatic and terrestrial species.<br>**2.** Relating to frogs and toads. | *"In academic literature, batrachian designates any of various tailless stout-bodied amphibians with long hind limbs for leaping; semiaquatic and terrestrial species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batrachoididae]] | noun | **1.** Toadfishes; related to anglers and batfishes. | *"In academic literature, batrachoididae designates toadfishes; related to anglers and batfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batrachomyomachia]] | noun | **1.** A silly altercation. | *"In academic literature, batrachomyomachia designates a silly altercation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batrachoseps]] | noun | **1.** Slender salamanders. | *"In academic literature, batrachoseps designates slender salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bats]] | noun | **1.** Nocturnal mouselike mammal with forelimbs modified to form membranous wings and anatomical adaptations for echolocation by which they navigate.<br>**2.** (baseball) a turn trying to get a hit. | *"Where go you With bats and clubs?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[batsman]] | noun | **1.** (baseball) a ballplayer who is batting. | *"When it broke out he was a second lieutenant in the Winchester Regiment, a keen polo player and first class batsman who rarely opened a book."* — Anthony Pryde, *Nightfall* |
| [[batswana]] | noun | **1.** A member of a bantu people living chiefly in botswana and western south africa. | *"In academic literature, batswana designates a member of a bantu people living chiefly in botswana and western south africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battalion]] | noun | **1.** An army unit usually consisting of a headquarters and three or more companies.<br>**2.** A large indefinite number. | *"She does it.” “Then she is as honest and genuine as she looks,” rejoined my guardian, “and it is impossible to say more for her.” “She’s Colour-Sergeant of the Nonpareil battalion,” said Mr."* — Charles Dickens, *Bleak House* |
| [[batten]] | noun | **1.** Stuffing made of rolls or sheets of cotton wool or synthetic fiber.<br>**2.** A strip fixed to something to hold it firm. | *"Follow your function, go, and batten on cold bits. [_Pushes him away from him_.] THIRD SERVINGMAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[batter]] | noun | **1.** (baseball) a ballplayer who is batting.<br>**2.** A liquid or semiliquid mixture, as of flour, eggs, and milk, used in cooking. | *"Most noble Antony, Let not the piece of virtue which is set Betwixt us, as the cement of our love To keep it builded, be the ram to batter The fortress of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[batter-fried]] | adjective | **1.** Fried in batter. | *"In academic literature, batter-fried designates fried in batter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battercake]] | noun | **1.** A flat cake of thin batter fried on both sides on a griddle. | *"I reckon it was nearly midnight when we left, wasn't it, Bess?" "Yes, Lucille cooked us so much ham and battercakes and stuff it took a long time to eat it all up." "Did y'all ride Ollie on a rail?" "No."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[battered]] | verb | **1.** Strike against forcefully.<br>**2.** Strike violently and repeatedly. | *"Marcus, attend him in his ecstasy, That hath more scars of sorrow in his heart Than foemen’s marks upon his battered shield, But yet so just that he will not revenge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[battering]] | noun | **1.** The act of subjecting to strong attack.<br>**2.** Strike against forcefully. | *"Sconce, call you it? so you would leave battering, I had rather have it a head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[battery]] | noun | **1.** Group of guns or missile launchers operated together at one place.<br>**2.** A device that produces electricity; may have several primary or secondary cells arranged in parallel or series. | *"Make battery to our ears with the loud music, The while I’ll place you; then the boy shall sing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[battery-acid]] | noun | **1.** Street name for lysergic acid diethylamide. | *"In academic literature, battery-acid designates street name for lysergic acid diethylamide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battery-powered]] | adjective | **1.** Powered by one or more electric batteries. | *"In academic literature, battery-powered designates powered by one or more electric batteries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[batting]] | noun | **1.** (baseball) the batter's attempt to get on base.<br>**2.** Stuffing made of rolls or sheets of cotton wool or synthetic fiber. | *"If you are batting, attack the ball."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[battle]] | noun | **1.** A hostile meeting of opposing military forces in the course of a war.<br>**2.** An energetic attempt to achieve something. | *"Perchance he’s hurt i’ the battle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[battle-ax]] | noun | **1.** A broadax used as a weapon.<br>**2.** A sharp-tongued domineering wife. | *"In academic literature, battle-ax designates a broadax used as a weapon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battle-axe]] | noun | **1.** A sharp-tongued domineering wife.<br>**2.** A broadax used as a weapon. | *"In academic literature, battle-axe designates a sharp-tongued domineering wife."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battle-scarred]] | adjective | **1.** Scarred by battle. | *"In academic literature, battle-scarred designates scarred by battle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battledore]] | noun | **1.** A light long-handled racket used by badminton players.<br>**2.** An ancient racket game. | *"Well, I must go in now; and you too: it darkens.” But I stayed out a few minutes longer with Adèle and Pilot—ran a race with her, and played a game of battledore and shuttlecock."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[battlefield]] | noun | **1.** A region where a battle is being (or has been) fought. | *"Those who sat with him had lately braved death on battlefield, but death had forborne to touch them, and they rejoiced in existence."* — C. A. Frazer, *Atmâ* |
| [[battlefront]] | noun | **1.** The line along which opposing armies face each other. | *"In academic literature, battlefront designates the line along which opposing armies face each other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battleful]] | adjective | **1.** Having or showing a ready disposition to fight. | *"In academic literature, battleful designates having or showing a ready disposition to fight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battleground]] | noun | **1.** A region where a battle is being (or has been) fought. | *"This general, hating Barclay, rode to visit a friend of his own, a corps commander, and, having spent the day with him, returned to Barclay and condemned, as unsuitable from every point of view, the battleground he had not seen."* — graf Leo Tolstoy, *War and Peace* |
| [[battlement]] | noun | **1.** A rampart built around the top of a castle with regular gaps for firing arrows or guns. | *"It was rather difficult to quiet everybody down in bed that night and even when Kurt had gone to sleep he uttered strange triumphant exclamations, for in his dreams the boy had climbed to the top of the highest battlement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[battlemented]] | adjective | **1.** Protected with battlements or parapets with indentations or embrasures for shooting through.<br>**2.** Having or resembling repeated square indentations like those in a battlement. | *"On its summit stood clumps and stretches of fir-trees, whose notched tips appeared like battlemented towers crowning black-fronted castles of enchantment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[battler]] | noun | **1.** Someone who fights (or is fighting). | *"In academic literature, battler designates someone who fights (or is fighting)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battleship]] | noun | **1.** Large and heavily armoured warship. | *"While we're about it, can't we get a warship--a battleship or something?"* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[battlesight]] | noun | **1.** An arrangement of sights that makes possible the rapid aiming of a firearm at short ranges. | *"In academic literature, battlesight designates an arrangement of sights that makes possible the rapid aiming of a firearm at short ranges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battlewagon]] | noun | **1.** Large and heavily armoured warship. | *"In academic literature, battlewagon designates large and heavily armoured warship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[battue]] | noun | **1.** A hunt in which beaters force the game to flee in the direction of the hunter.<br>**2.** Indiscriminate slaughter. | *"The people wage more or less unsuccessful war upon them and at times they organize a sort of battue."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[batty]] | adjective | **1.** Informal or slang terms for mentally irregular. | *"And from each other look thou lead them thus, Till o’er their brows death-counterfeiting sleep With leaden legs and batty wings doth creep."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[combat]] | noun | **1.** An engagement fought between two military forces.<br>**2.** The act of fighting; any contest or struggle. | *"My messenger He hath whipped with rods; dares me to personal combat, Caesar to Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[combatant]] | noun | **1.** Someone who fights (or is fighting).<br>**2.** Engaging in or ready for combat. | *"Give with thy trumpet a loud note to Troy, Thou dreadful Ajax, that the appalled air May pierce the head of the great combatant, And hale him hither."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[combative]] | adjective | **1.** Inclined or showing an inclination to dispute or disagree, even to engage in law suits.<br>**2.** Striving to overcome in argument. | *"He had a combative look and a chafing, irritable manner which, associated with his figure—still large and powerful, though evidently in its decline—rather alarmed me."* — Charles Dickens, *Bleak House* |
| [[combatively]] | adverb | **1.** In a bellicose contentious manner. | *"In academic literature, combatively designates in a bellicose contentious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[combativeness]] | noun | **1.** A militant aggressiveness. | *"Seeing that he could not arouse their patriotism, the captain next tried to arouse their combativeness."* — Harry Castlemon, *Rodney, the Partisan* |
| [[debatable]] | adjective | **1.** Open to doubt or debate.<br>**2.** Open to argument or debate. | *"Moreover she, and Clare also, stood as yet on the debatable land between predilection and love; where no profundities have been reached; no reflections have set in, awkwardly inquiring, “Whither does this new current tend to carry me?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[debate]] | noun | **1.** A discussion in which reasons are advanced for and against some proposition or proposal.<br>**2.** The formal presentation of a stated proposition and the opposition to it (usually followed by a vote). | *"If he were living, I would try him yet;— Lend me an arm;—the rest have worn me out With several applications; nature and sickness Debate it at their leisure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debater]] | noun | **1.** Someone who engages in debate. | *"The same spirit and temper appeared in the speech on the Habeas Corpus Suspension (Ireland) Bill, which he delivered on the 17th of February; but his full strength as a debater was first manifested during the discussion on Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[diabatic]] | adjective | **1.** Involving a transfer of heat. | *"In academic literature, diabatic designates involving a transfer of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disapprobation]] | noun | **1.** An expression of strong disapproval; pronouncing as wrong or morally culpable. | *"In case I should be taking a liberty in putting your ladyship on your guard when there’s no necessity for it, you will endeavour, I should hope, to outlive my presumption, and I shall endeavour to outlive your disapprobation."* — Charles Dickens, *Bleak House* |
| [[embattle]] | verb | **1.** Fortify by furnishing with battlements for defense.<br>**2.** Prepare for battle or conflict. | *"The night Is shiny, and they say we shall embattle By th’ second hour i’ th’ morn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incubate]] | verb | **1.** Grow under conditions that promote development.<br>**2.** Sit on (eggs). | *"It appeared to me that the eggs from which young Insurers were hatched were incubated in dust and heat, like the eggs of ostriches, judging from the places to which those incipient giants repaired on a Monday morning."* — Charles Dickens, *Great Expectations* |
| [[incubation]] | noun | **1.** Maintaining something at the most favorable temperature for its development.<br>**2.** (pathology) the phase in the development of an infection between the time a pathogen enters the body and the time the first symptoms appear. | *"For _egkolmesis_ or _incubatio_ see Mary Hamilton, _Incubation_ (1906) [84] Clem."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[incubator]] | noun | **1.** Apparatus consisting of a box designed to maintain a constant temperature by the use of a thermostat; used for chicks or premature infants. | *"Garnet," said Phyllis, "do you use an incubator?" "Oh, yes, we have an incubator." "I suppose you find it very useful?" "I'm afraid we use it chiefly for drying our boots when they get wet," I said."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[noncombatant]] | noun | **1.** A member of the armed forces who does not participate in combat (e.g. a chaplain or surgeon).<br>**2.** Used of civilians in time of war. | *"In academic literature, noncombatant designates a member of the armed forces who does not participate in combat (e.g. a chaplain or surgeon)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probate]] | noun | **1.** A judicial certificate saying that a will is genuine and conferring on the executors the power to administer the estate.<br>**2.** The act of proving that an instrument purporting to be a will was signed and executed in accord with legal requirements. | *"That evening a letter from the probate office at Exeter, N."* — Classic Author, *The wonders of prayer* |
| [[probation]] | noun | **1.** A trial period during which your character and abilities are tested to see whether you are suitable for work or for membership.<br>**2.** A trial period during which an offender has time to redeem himself or herself. | *"And of the truth herein This present object made probation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[probationary]] | adjective | **1.** Under terms not final or fully worked out or agreed upon. | *"A practical inference from the whole is,--that the present life must be regarded as probationary."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[probationer]] | noun | **1.** A nurse in training who is undergoing a trial period.<br>**2.** Someone released on probation or on parole. | *"The Hall session of 1844 was Cairns's last, and the next step for him to take in ordinary course was to apply to a Presbytery for license as a probationer."* — John Cairns, *Principal Cairns* |
| [[probative]] | adjective | **1.** Tending to prove a particular proposition or to persuade you of the truth of an allegation. | *"In academic literature, probative designates tending to prove a particular proposition or to persuade you of the truth of an allegation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probatory]] | adjective | **1.** Tending to prove a particular proposition or to persuade you of the truth of an allegation. | *"In academic literature, probatory designates tending to prove a particular proposition or to persuade you of the truth of an allegation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rebate]] | noun | **1.** A refund of some fraction of the amount paid.<br>**2.** A rectangular groove made to hold two pieces together. | *"The result was first the Elkins' Act of 1903, aimed at discrimination and rebates, and then the Hepburn Act Of 1906, which marked a new era in railroad regulation in this country."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[rebato]] | noun | **1.** A wired or starched collar of intricate lace; worn in 17th century. | *"Troth, I think your other rebato were better."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reprobate]] | noun | **1.** A person without moral scruples.<br>**2.** Reject (documents) as invalid. | *"If drawing my sword against the humour of affection would deliver me from the reprobate thought of it, I would take desire prisoner, and ransom him to any French courtier for a new-devised curtsy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reprobation]] | noun | **1.** Rejection by god; the state of being condemned to eternal misery in hell.<br>**2.** Severe disapproval. | *"On a dark, misty, raw morning in January, I had left a hostile roof with a desperate and embittered heart—a sense of outlawry and almost of reprobation—to seek the chilly harbourage of Lowood: that bourne so far away and unexplored."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

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
    ROOT DASHBOARD · BAT
  </div>
</div>
