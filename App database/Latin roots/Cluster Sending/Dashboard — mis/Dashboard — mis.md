---
status: unread
type: root_dashboard
---
# Dashboard — mis
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mis-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to send, let go, or release”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **mis** means to send, let go, or release. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *send*, *promising*, *promissory*, and *compromising*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to send, let go, or release
> The root **mis** means to send, let go, or release. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *send*, *promising*, *promissory*, and *compromising*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To send, let go, or release</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *send* and *promising*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mis** comes from a Latin word that means *"to send, let go, or release"*.
  - At its core, it describes the action of send, let go, or release.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **mis** in an English word, think of **to send, let go, or release**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to send, let go, or release).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Send**: An everyday English word showing the root's idea of *to send, let go, or release*.
  - **Promising**: Showing signs of future success, excellence, or positive development.
  - **Promissory**: Conveying or implying a promise.
  - **Compromising**: Revealing an embarrassing or incriminating situation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mis</mark>, think of <mark class="hl-def">to send, let go, or release</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Contractual / Propositional Base:** *-mis-* / *-mise* $	o$ *promise, promising, promissory, compromise, compromising, premise*.

- **Conjectural / Legal Discharges:** *surmise, demise, dismiss, dismissal, dismissive*.

- **Weapon & Message Extensions:** *missile, missive*.



### 2.2 Complementary Vault Taxonomy

- **`Dashboard — mit`:** Focuses on the **active Latin verbal present stem** (*transmit, admit, commit, emit, submit*).

- **`[[Dashboard — miss]]`:** Focuses on the **classical Latin supine/participial base** (*mission, admission, commission, transmission, submission*).

- **`mis`:** Focuses on the **Romance-shaped contractual and deductive offshoots** (*promise, compromise, premise, surmise, demise, dismiss*).



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



### 1. Covenants, Pledges & Compromises

- *promise (n/v)* (a declaration or assurance that one will do something or that a particular thing will happen; pledge).

- *promising* (showing signs of future success or excellence).

- *promissory* (conveying or implying a promise; a promissory note).

- *compromise (n/v)* (an agreement or settlement of a dispute that is reached by each side making concessions).

- *compromising* (revealing an embarrassing or incriminating situation; flexible in negotiation).



### 2. Logic & Philosophical Syllogisms

- *premise* (a previous statement or proposition from which another is inferred or follows as a conclusion).



### 3. Intuitive Deductions & Guesses

- *surmise (n/v)* (suppose that something is true without having evidence to confirm it; a conjecture).



### 4. Legal Transfers, Termination & Discharges

- *demise (n/v)* (a person's death; the end or failure of an enterprise; conveyance of an estate by lease or will).

- *dismiss* (order or allow to leave; send away; discharge from employment).

- *dismissal* (the act of ordering or allowing someone to leave; termination of employment).

- *dismissive* (feeling or showing that something is unworthy of consideration).



### 5. Propelled Missives & Weapons

- *missive* (a letter, especially a long, formal, or official one).

- *missile* (an object which is forcibly propelled at a target, either by hand or from a mechanical weapon).



---



## 🔀 4. Prefix & Combining Dynamics on mis



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `pro-`** | `pro-` + *mittere, missum* | **promise** | Sending one's word forward | *"The diplomat gave his solemn promise to uphold the trade accord."* |

| **Prefix `con-`** | `con-` + `pro-` + *mittere* | **compromise** | Mutually promising concessions | *"Legislators crafted a bipartisan compromise on infrastructure spending."* |

| **Prefix `prae-`** | `prae-` + *mittere, missum* | **premise** | Sending an assumption ahead | *"The entire logical argument collapses if the initial premise is false."* |

| **Prefix `dis-`** | `dis-` + *mittere, missum* | **dismiss** | Sending away in different directions | *"The judge moved to dismiss the frivolous lawsuit with prejudice."* |

| **Prefix `sur-`** | `super-` + Old French *mise* | **surmise** | Casting a thought over circumstances | *"Without concrete forensic data, detectives could only surmise the motive."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Diplomacy & Political Negotiation:** *diplomatic compromise*, *peace accords*, *promissory treaties*.

- ⚖️ **Contract Law & Estate Planning:** *promissory estoppel*, *motion to dismiss*, *demise of the Crown* (automatic constitutional succession).

- 🧠 **Formal Logic & Philosophy:** *major and minor premises in categorical syllogisms*.

- 💼 **Banking & Commercial Instruments:** *promissory notes*, *unconditional financial promises*.

- 🎖️ **Defense & Aerospace:** *ballistic missile defense*, *intercontinental cruise missiles*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admissibility]] | noun | **1.** Acceptability by virtue of being admissible. | *"In academic literature, admissibility designates acceptability by virtue of being admissible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admissible]] | adjective | **1.** Deserving to be admitted. | *"It will be shown in the next paper that this CONCURRENT JURISDICTION in the article of taxation was the only admissible substitute for an entire subordination, in respect to this branch of power, of the State authority to that of the Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[admission]] | noun | **1.** The act of admitting someone to enter.<br>**2.** An acknowledgment of the truth of something. | *"He doth rely on none; But carries on the stream of his dispose, Without observance or respect of any, In will peculiar and in self-admission."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admissive]] | adjective | **1.** Characterized by or allowing admission. | *"In academic literature, admissive designates characterized by or allowing admission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armistice]] | noun | **1.** A state of peace agreed to between opponents so they can discuss peace terms. | *"Five months later on the eve of the Armistice he was flung out of the service, a broken man, paralysed below the waist, cursing every one who came near him and chiefly the surgeons for not letting him die."* — Anthony Pryde, *Nightfall* |
| [[commiserate]] | verb | **1.** To feel or express sympathy or compassion. | *"What good mother is there that would not commiserate a penniless spinster, who might have been my lady, and have shared four thousand a year?"* — William Makepeace Thackeray, *Vanity Fair* |
| [[commiseration]] | noun | **1.** A feeling of sympathy and sorrow for the misfortunes of others.<br>**2.** An expression of sympathy with another's grief. | *"More fairer than fair, beautiful than beauteous, truer than truth itself, have commiseration on thy heroical vassal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commiserative]] | adjective | **1.** Feeling or expressing sympathy; - kenneth roberts. | *"In academic literature, commiserative designates feeling or expressing sympathy; - kenneth roberts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commissar]] | noun | **1.** An official of the communist party who was assigned to teach party principles to a military unit. | *"In academic literature, commissar designates an official of the communist party who was assigned to teach party principles to a military unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commissariat]] | noun | **1.** A stock or supply of foods. | *"I never want to see a chicken again except alive." For the last week monotony had been the keynote of our commissariat."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[commissary]] | noun | **1.** A retail store that sells equipment and provisions (usually to military personnel).<br>**2.** A snack bar in a film studio. | *"On Commissary Goldie’s Brains Lord, to account who dares thee call, Or e’er dispute thy pleasure?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[commission]] | noun | **1.** A special group delegated to consider some matter;  - milton berle.<br>**2.** A fee for services rendered based on a percentage of an amount received or collected or agreed to be paid (as distinguished from a salary). | *"You are more saucy with lords and honourable personages than the commission of your birth and virtue gives you heraldry."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commissionaire]] | noun | **1.** A uniformed doorman. | *"You know Peterson, the commissionaire?” “Yes.” “It is to him that this trophy belongs.” “It is his hat.” “No, no, he found it."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[commissioned]] | verb | **1.** Put into commission; equip for service; of ships.<br>**2.** Place an order for. | *"And truly when the stars go out and the wan day peeps into the turret-chamber, finding him at his oldest, he looks as if the digger and the spade were both commissioned and would soon be digging."* — Charles Dickens, *Bleak House* |
| [[commissioner]] | noun | **1.** A government administrator.<br>**2.** A member of a commission. | *"I p. 364.] [Footnote 7: In the first annual report of the United States Commissioner of Labor is given a long catalog of theories that have been suggested, many of them quite fantastic.] [Footnote 8: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commissioning]] | noun | **1.** The act of granting authority to undertake certain functions.<br>**2.** Put into commission; equip for service; of ships. | *"Collins; and as they walked down the garden, he was commissioning her with his best respects to all her family, not forgetting his thanks for the kindness he had received at Longbourn in the winter, and his compliments to Mr. and Mrs."* — Jane Austen, *Pride and Prejudice* |
| [[commissure]] | noun | **1.** A bundle of nerve fibers passing from one side to the other of the brain or spinal cord. | *"In academic literature, commissure designates a bundle of nerve fibers passing from one side to the other of the brain or spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compromise]] | noun | **1.** A middle way between two extremes.<br>**2.** An accommodation in which both sides make concessions. | *"Hast thou by secret means Used intercession to obtain a league, And, now the matter grows to compromise, Stand’st thou aloof upon comparison?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compromiser]] | noun | **1.** A negotiator willing to compromise. | *"In academic literature, compromiser designates a negotiator willing to compromise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compromising]] | verb | **1.** Make a compromise; arrive at a compromise.<br>**2.** Settle by concession. | *"She felt herself ill-used and unfortunate, as did her father; and they were neither of them able to devise any means of lessening their expenses without compromising their dignity, or relinquishing their comforts in a way not to be borne."* — Jane Austen, *Persuasion* |
| [[decommission]] | verb | **1.** Withdraw from active service. | *"In academic literature, decommission designates withdraw from active service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demise]] | noun | **1.** The time when something ends.<br>**2.** Transfer by a lease or by a will. | *"Tell me what state, what dignity, what honour, Canst thou demise to any child of mine?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demisemiquaver]] | noun | **1.** A musical note having the time value of a thirty-second of a whole note. | *"In academic literature, demisemiquaver designates a musical note having the time value of a thirty-second of a whole note."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demist]] | verb | **1.** Free from mist. | *"In academic literature, demist designates free from mist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demister]] | noun | **1.** Heater that removes mist from the windshield of a car. | *"In academic literature, demister designates heater that removes mist from the windshield of a car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dismiss]] | verb | **1.** Bar from attention or consideration.<br>**2.** Cease to consider; put out of judicial consideration. | *"Dismiss them home. [_Exit Aedile._] Here comes his mother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissal]] | noun | **1.** A judgment disposing of the matter without a trial.<br>**2.** Official notice that you have been fired from your job. | *"George takes his dismissal in great dudgeon, the greater because a clerk coming up the stairs has heard the last words of all and evidently applies them to him."* — Charles Dickens, *Bleak House* |
| [[dismissed]] | verb | **1.** Bar from attention or consideration.<br>**2.** Cease to consider; put out of judicial consideration. | *"I kneeled before him; ’Twas very faintly he said “Rise”; dismissed me Thus with his speechless hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissible]] | adjective | **1.** Subject to dismissal. | *"In academic literature, dismissible designates subject to dismissal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dismission]] | noun | **1.** Official notice that you have been fired from your job.<br>**2.** The termination of someone's employment (leaving them free to depart). | *"You must not stay here longer; your dismission Is come from Caesar; therefore hear it, Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismissive]] | adjective | **1.** Showing indifference or disregard.<br>**2.** Stopping to associate with. | *"In academic literature, dismissive designates showing indifference or disregard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emissary]] | noun | **1.** Someone sent on a mission to represent the interests of someone else. | *"And now I find he’s in everybody’s mouth in Middlemarch as the editor of the ‘Pioneer.’ There are stories going about him as a quill-driving alien, a foreign emissary, and what not.” “Casaubon won’t like that,” said the Rector."* — George Eliot, *Middlemarch* |
| [[emission]] | noun | **1.** The act of emitting; causing to flow forth.<br>**2.** A substance that is emitted or released. | *"The imposition of duties on imported articles, and the emission of paper money, are specimens of each kind."* — Alexander Hamilton, *The Federalist Papers* |
| [[immiscible]] | adjective | **1.** (chemistry, physics) incapable of mixing. | *"In academic literature, immiscible designates (chemistry, physics) incapable of mixing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissibility]] | noun | **1.** Inadmissibility as a consequence of not being permitted. | *"In academic literature, impermissibility designates inadmissibility as a consequence of not being permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissible]] | adjective | **1.** Not permitted.<br>**2.** Not allowable. | *"In academic literature, impermissible designates not permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impermissibly]] | adverb | **1.** Not permissibly. | *"In academic literature, impermissibly designates not permissibly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadmissibility]] | noun | **1.** Unacceptability as a consequence of not being admissible. | *"In academic literature, inadmissibility designates unacceptability as a consequence of not being admissible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadmissible]] | adjective | **1.** Not deserving to be admitted. | *"Without this, there would be no responsibility whatever in the executive department an idea inadmissible in a free government."* — Alexander Hamilton, *The Federalist Papers* |
| [[intermission]] | noun | **1.** The act of suspending activity temporarily.<br>**2.** A time interval during which there is a temporary cessation of something. | *"You lov’d, I lov’d; for intermission No more pertains to me, my lord, than you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intromission]] | noun | **1.** The act of putting one thing into another. | *"In academic literature, intromission designates the act of putting one thing into another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misaddress]] | verb | **1.** Put a wrong address on. | *"In academic literature, misaddress designates put a wrong address on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misadventure]] | noun | **1.** An instance of misfortune. | *"Your looks are pale and wild, and do import Some misadventure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misadvise]] | verb | **1.** Give bad advice to. | *"In academic literature, misadvise designates give bad advice to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misalign]] | verb | **1.** Align imperfectly or badly. | *"In academic literature, misalign designates align imperfectly or badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misalignment]] | noun | **1.** The spatial property of things that are not properly aligned. | *"In academic literature, misalignment designates the spatial property of things that are not properly aligned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misalliance]] | noun | **1.** An unsuitable alliance (especially with regard to marriage). | *"Sir Giles Wapshot's family were insulted that one of the Wapshot girls had not the preference in the marriage, and the remaining baronets of the county were indignant at their comrade's misalliance."* — William Makepeace Thackeray, *Vanity Fair* |
| [[misally]] | verb | **1.** Make a bad alliance; ally inappropriately. | *"In academic literature, misally designates make a bad alliance; ally inappropriately."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misanthrope]] | noun | **1.** Someone who dislikes people in general. | *"Like a plethoric burning martyr, or a self-consuming misanthrope, once ignited, the whale supplies his own fuel and burns by his own body."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[misanthropic]] | adjective | **1.** Believing the worst of human nature and motives; having a sneering disbelief in e.g. selflessness of others.<br>**2.** Hating mankind in general. | *"Such ruminations naturally produced a streak of misanthropic bitterness."* — George Eliot, *Middlemarch* |
| [[misanthropical]] | adjective | **1.** Believing the worst of human nature and motives; having a sneering disbelief in e.g. selflessness of others.<br>**2.** Hating mankind in general. | *"He walked up and down, with his hands in his pockets, apparently quite forgetting my presence; and his abstraction was evidently so deep, and his whole aspect so misanthropical, that I shrank from disturbing him again."* — Emily Brontë, *Wuthering Heights* |
| [[misanthropist]] | noun | **1.** Someone who dislikes people in general. | *"All the world used her ill, said this young misanthropist, and we may be pretty certain that persons whom all the world treats ill, deserve entirely the treatment they get."* — William Makepeace Thackeray, *Vanity Fair* |
| [[misanthropy]] | noun | **1.** Hatred of mankind.<br>**2.** A disposition to dislike and mistrust other people. | *"It was no common misanthropy which had shut Captain Nemo and his companions within the _Nautilus_, but a hatred, either monstrous or sublime, which time could never weaken."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[misapplication]] | noun | **1.** Wrong use or application.<br>**2.** The fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else. | *"Strange that their very elevation was a misapplication, that to raise seemed to falsify."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[misapply]] | verb | **1.** Apply to a wrong thing or person; apply badly or incorrectly. | *"Virtue itself turns vice being misapplied, And vice sometime’s by action dignified."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misapprehend]] | verb | **1.** Interpret in the wrong way. | *"I wish not to misapprehend you.” “Not exactly the notice you were to receive, Lady Dedlock, because the contemplated notice supposed the agreement to have been observed."* — Charles Dickens, *Bleak House* |
| [[misapprehension]] | noun | **1.** An understanding of something that is not correct. | *"It had originated in misapprehension entirely."* — Jane Austen, *Persuasion* |
| [[misappropriate]] | verb | **1.** Appropriate (as property entrusted to one's care) fraudulently to one's own use. | *"In academic literature, misappropriate designates appropriate (as property entrusted to one's care) fraudulently to one's own use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misappropriated]] | verb | **1.** Appropriate (as property entrusted to one's care) fraudulently to one's own use.<br>**2.** Taken for your own use in violation of a trust. | *"In academic literature, misappropriated designates appropriate (as property entrusted to one's care) fraudulently to one's own use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misappropriation]] | noun | **1.** The fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else.<br>**2.** Wrongful borrowing. | *"In academic literature, misappropriation designates the fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscalculate]] | verb | **1.** Judge incorrectly.<br>**2.** Calculate incorrectly. | *"You miscalculate matters widely, when you forbid my waiting on you, lest it should hurt my worldly concerns."* — Robert Burns, *The Letters of Robert Burns* |
| [[miscalculation]] | noun | **1.** A mistake in calculating. | *"Through miscalculation there may be, at a given moment, too many consumption goods of a particular kind, but the durable applications can find no limit until the inconceivable day when the material world is no longer capable of improvement."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[miscall]] | verb | **1.** Assign in incorrect name to. | *"My heart will sigh when I miscall it so, Which finds it an enforced pilgrimage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miscarriage]] | noun | **1.** Failure of a plan.<br>**2.** A natural loss of the products of conception. | *"Say, Lassie, why, thy train amang, While loud the trump’s heroic clang, And sock or buskin skelp alang To death or marriage; Scarce ane has tried the shepherd—sang But wi’ miscarriage?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[miscarry]] | verb | **1.** Be unsuccessful.<br>**2.** Suffer a miscarriage. | *"And though we here fall down, We have supplies to second our attempt: If they miscarry, theirs shall second them; And so success of mischief shall be born, And heir from heir shall hold this quarrel up Whiles England shall have generation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miscast]] | verb | **1.** Cast an actor, singer, or dancer in an unsuitable role. | *"In academic literature, miscast designates cast an actor, singer, or dancer in an unsuitable role."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscegenate]] | verb | **1.** Marry or cohabit with a person of another race. | *"In academic literature, miscegenate designates marry or cohabit with a person of another race."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscegenation]] | noun | **1.** Reproduction by parents of different races (especially by white and non-white persons). | *"In academic literature, miscegenation designates reproduction by parents of different races (especially by white and non-white persons)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscellanea]] | noun | **1.** A collection containing a variety of sorts of things. | *"In academic literature, miscellanea designates a collection containing a variety of sorts of things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscellaneous]] | adjective | **1.** Consisting of a haphazard assortment of different kinds; ; ; ; ; ; - i.a.richards.<br>**2.** Having many aspects. | *"The scene your son Kurt enacted to-day in front of Apollonie's cottage with his crowd of miscellaneous friends can only be called a vulgar noise." But Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[miscellany]] | noun | **1.** A collection containing a variety of sorts of things.<br>**2.** An anthology of short literary pieces and poems and ballads etc. | *"Groups of vertical braces } represent a single brace encompassing three-- in one case, four-- rhymed lines.] * * * * * * * * * * * * * * The Augustan Reprint Society THE MERRY-THOUGHT: or, the Glass-Window and Bog-House MISCELLANY."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[mischance]] | noun | **1.** An unpredictable outcome that is unfortunate.<br>**2.** An instance of misfortune. | *"He never can meet more mischance than come To be but nam’d of thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mischief]] | noun | **1.** Reckless or malicious behavior that causes discomfort or annoyance in others.<br>**2.** The quality or nature of being harmful or evil. | *"My name is Caius Martius, who hath done To thee particularly and to all the Volsces Great hurt and mischief; thereto witness may My surname Coriolanus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mischief-maker]] | noun | **1.** Someone who deliberately stirs up trouble. | *"In academic literature, mischief-maker designates someone who deliberately stirs up trouble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mischief-making]] | noun | **1.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"In academic literature, mischief-making designates reckless or malicious behavior that causes discomfort or annoyance in others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mischievous]] | adjective | **1.** Naughtily or annoyingly playful.<br>**2.** Deliberately causing harm or damage. | *"So that it is even more mischievous,” said my guardian once to me, “to remonstrate with the poor dear fellow than to leave him alone.” I took one of these opportunities of mentioning my doubts of Mr."* — Charles Dickens, *Bleak House* |
| [[mischievously]] | adverb | **1.** In a disobedient or naughty way. | *"I am afraid I was ashamed of the dear good fellow,—I _know_ I was ashamed of him,—when I saw that Estella stood at the back of Miss Havisham’s chair, and that her eyes laughed mischievously."* — Charles Dickens, *Great Expectations* |
| [[mischievousness]] | noun | **1.** An attribute of mischievous children.<br>**2.** The trait of behaving like an imp. | *"Morland knew so little of lords and baronets, that she entertained no notion of their general mischievousness, and was wholly unsuspicious of danger to her daughter from their machinations."* — Jane Austen, *Northanger Abbey* |
| [[miscible]] | adjective | **1.** (chemistry, physics) capable of being mixed. | *"In academic literature, miscible designates (chemistry, physics) capable of being mixed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misconceive]] | verb | **1.** Interpret in the wrong way. | *"I can hardly misconceive you; it would prove me deaf and blind; But, although I take your meaning, ‘tis with such a heavy mind! -- St. 1."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[misconception]] | noun | **1.** An incorrect conception. | *"It comes to a fundamental unbelief in God, resting, as Jesus saw, on an essential misconception of God's nature; and this resulted in the spoiling of life."* — T. R. Glover, *The Jesus of History* |
| [[misconduct]] | noun | **1.** Bad or dishonest management by persons supposed to act on another's behalf.<br>**2.** Activity that transgresses moral or civil law. | *"Your father and mother seem so totally free from all those ambitious feelings which have led to so much misconduct and misery, both in young and old."* — Jane Austen, *Persuasion* |
| [[misconstrual]] | noun | **1.** A kind of misinterpretation resulting from putting a wrong construction on words or actions (often deliberately). | *"In academic literature, misconstrual designates a kind of misinterpretation resulting from putting a wrong construction on words or actions (often deliberately)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misconstruction]] | noun | **1.** A kind of misinterpretation resulting from putting a wrong construction on words or actions (often deliberately).<br>**2.** An ungrammatical constituent. | *"You did not use to like cards; but time makes many changes.” “I am not yet so much changed,” cried Anne, and stopped, fearing she hardly knew what misconstruction."* — Jane Austen, *Persuasion* |
| [[misconstrue]] | verb | **1.** Interpret in the wrong way. | *"Still, when I reached my chamber, I felt a pang at the idea she should even temporarily misconstrue what she had seen."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[miscount]] | noun | **1.** An inaccurate count.<br>**2.** Count wrongly. | *"In academic literature, miscount designates an inaccurate count."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscreant]] | noun | **1.** A person without moral scruples. | *"Well, miscreant, I’ll be there as soon as you; And, after, meet you sooner than you would. [_Exeunt._] ACT IV SCENE I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miscreate]] | verb | **1.** Shape or form or make badly. | *"In academic literature, miscreate designates shape or form or make badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscreation]] | noun | **1.** Something abnormal or anomalous. | *"In academic literature, miscreation designates something abnormal or anomalous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscue]] | noun | **1.** A faulty shot in billiards; the cue tip slips off the cue ball.<br>**2.** A minor inadvertent mistake usually observed in speech or writing or in small accidents or memory lapses etc. | *"In academic literature, miscue designates a faulty shot in billiards; the cue tip slips off the cue ball."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miser]] | noun | **1.** A stingy hoarder of money and possessions (often living miserably). | *"Rich honesty dwells like a miser, sir, in a poor house, as your pearl in your foul oyster."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miserable]] | adjective | **1.** Very unhappy; full of misery.<br>**2.** Deserving or inciting pity; ; ; - galsworthy. | *"Twice did he turn his back and purposed so; But kindness, nobler ever than revenge, And nature, stronger than his just occasion, Made him give battle to the lioness, Who quickly fell before him; in which hurtling From miserable slumber I awaked."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miserableness]] | noun | **1.** A state of ill-being due to affliction or misfortune. | *"This miserableness went on as much as six or seven minutes; but it seemed a sight longer than that."* — Mark Twain, *Adventures of Huckleberry Finn* |
| [[miserably]] | adverb | **1.** In a miserable manner. | *"Thou hast one son; for his sake pity me, Lest in revenge thereof, sith God is just, He be as miserably slain as I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miserliness]] | noun | **1.** Total lack of generosity with money. | *"He is vulnerable to reason there—always a few grains of common-sense in an ounce of miserliness."* — George Eliot, *Middlemarch* |
| [[miserly]] | adjective | **1.** (used of persons or behavior) characterized by or indicative of lack of generosity. | *"When Allan Woodcourt spoke to you, my dear, he spoke with my knowledge and consent—but I gave him no encouragement, not I, for these surprises were my great reward, and I was too miserly to part with a scrap of it."* — Charles Dickens, *Bleak House* |
| [[misery]] | noun | **1.** A state of ill-being due to affliction or misfortune.<br>**2.** A feeling of intense unhappiness. | *"But when we in our viciousness grow hard— O misery on’t!—the wise gods seal our eyes, In our own filth drop our clear judgments, make us Adore our errors, laugh at’s while we strut To our confusion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misestimate]] | verb | **1.** Judge incorrectly.<br>**2.** Calculate incorrectly. | *"In academic literature, misestimate designates judge incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misestimation]] | noun | **1.** A mistake in calculating. | *"In academic literature, misestimation designates a mistake in calculating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misidentify]] | verb | **1.** Identify incorrectly. | *"In academic literature, misidentify designates identify incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misinform]] | verb | **1.** Give false or misleading information to. | *"You have apparently been misinformed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[misinformation]] | noun | **1.** Information that is incorrect. | *"Cowardice, though sometimes the effect of natural imbecility, is generally a prejudice of education, or bad habit contracted from misinformation, or misapprehension; and may certainly be cured by experience, and the exercise of reason."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[misinterpret]] | verb | **1.** Interpret falsely.<br>**2.** Interpret wrongly. | *"There is something brave in your spirit, as well as penetrating in your eye; but allow me to assure you that you partially misinterpret my emotions."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[misinterpretation]] | noun | **1.** Putting the wrong interpretation on. | *"It would be quite unjust to him to suppose that he could have entered into any coarse misinterpretation of Dorothea: his own habits of mind and conduct, quite as much as the open elevation of her nature, saved him from any such mistake."* — George Eliot, *Middlemarch* |
| [[mislabeled]] | adjective | **1.** Branded or labeled falsely and in violation of statutory requirements. | *"In academic literature, mislabeled designates branded or labeled falsely and in violation of statutory requirements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mislaid]] | verb | **1.** Place (something) where one cannot find it again.<br>**2.** Lost temporarily; as especially put in an unaccustomed or forgotten place. | *"All through dinner—which was long, in consequence of such accidents as the dish of potatoes being mislaid in the coal skuttle and the handle of the corkscrew coming off and striking the young woman in the chin—Mrs."* — Charles Dickens, *Bleak House* |
| [[mislay]] | verb | **1.** Place (something) where one cannot find it again. | *"I know how easy it is to mislay anything in a camp of this sort."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[mislead]] | verb | **1.** Lead someone in the wrong direction or give someone wrong directions.<br>**2.** Give false or misleading information to. | *"SONG _ Take, O take those lips away, That so sweetly were forsworn, And those eyes, the break of day, Lights that do mislead the morn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misleader]] | noun | **1.** Someone who leads astray (often deliberately). | *"That villainous abominable misleader of youth, Falstaff, that old white-bearded Satan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misleading]] | verb | **1.** Lead someone in the wrong direction or give someone wrong directions.<br>**2.** Give false or misleading information to. | *"I am so sorry for my trespass made That, to deserve well at my brother’s hands, I here proclaim myself thy mortal foe, With resolution, whereso’er I meet thee— As I will meet thee if thou stir abroad— To plague thee for thy foul misleading me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misleadingly]] | adverb | **1.** In a misleading way. | *"In academic literature, misleadingly designates in a misleading way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mismanage]] | verb | **1.** Manage badly or incompetently. | *"He knew he had mismanaged his wife’s property and was to blame toward his children, but he did not know how to remedy it)."* — graf Leo Tolstoy, *War and Peace* |
| [[mismanagement]] | noun | **1.** Management that is careless or inefficient. | *"Here had been grievous mismanagement; but, bad as it was, he gradually grew to feel that it had not been the most direful mistake in his plan of education."* — Jane Austen, *Mansfield Park* |
| [[mismarry]] | verb | **1.** Marry an unsuitable partner. | *"In academic literature, mismarry designates marry an unsuitable partner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mismatch]] | noun | **1.** A bad or unsuitable match.<br>**2.** Match badly; match two objects or people that do not go together. | *"Mismatched quotes are not fixed if it’s not sufficiently clear where the missing quote should be placed."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[mismatched]] | verb | **1.** Match badly; match two objects or people that do not go together.<br>**2.** Either not matched or unsuitably matched. | *"Mismatched quotes are not fixed if it’s not sufficiently clear where the missing quote should be placed."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[mismate]] | verb | **1.** Provide with an unsuitable mate. | *"In academic literature, mismate designates provide with an unsuitable mate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mismated]] | verb | **1.** Provide with an unsuitable mate.<br>**2.** Not easy to combine harmoniously. | *"In academic literature, mismated designates provide with an unsuitable mate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misname]] | verb | **1.** Assign in incorrect name to. | *"Nevertheless, he loved his misnamed Angel, and in secret mourned over this treatment of him as Abraham might have mourned over the doomed Isaac while they went up the hill together."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[misnomer]] | noun | **1.** An incorrect or unsuitable name. | *"But this fluctuation of general prices surely can be so greatly moderated in magnitude and in evil results as to make the word "crisis" almost a misnomer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[miso]] | noun | **1.** A thick paste made from fermented soybeans and barley or rice malt; used in japanese cooking to make soups or sauces. | *"In academic literature, miso designates a thick paste made from fermented soybeans and barley or rice malt; used in japanese cooking to make soups or sauces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misocainea]] | noun | **1.** Hatred of new ideas. | *"In academic literature, misocainea designates hatred of new ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogamist]] | noun | **1.** A person who hates marriage. | *"In academic literature, misogamist designates a person who hates marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogamy]] | noun | **1.** Hatred of marriage. | *"In academic literature, misogamy designates hatred of marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynic]] | adjective | **1.** (used of men) having deep-seated distrust of women. | *"In academic literature, misogynic designates (used of men) having deep-seated distrust of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynism]] | noun | **1.** Hatred of women. | *"In academic literature, misogynism designates hatred of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynist]] | noun | **1.** A misanthrope who dislikes women in particular. | *"In academic literature, misogynist designates a misanthrope who dislikes women in particular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynistic]] | adjective | **1.** Hating women in particular. | *"In academic literature, misogynistic designates hating women in particular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynous]] | adjective | **1.** Hating women in particular. | *"In academic literature, misogynous designates hating women in particular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogyny]] | noun | **1.** Hatred of women. | *"In academic literature, misogyny designates hatred of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misology]] | noun | **1.** Hatred of reasoning. | *"In academic literature, misology designates hatred of reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misoneism]] | noun | **1.** Hatred of change or innovation. | *"In academic literature, misoneism designates hatred of change or innovation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misopedia]] | noun | **1.** Hatred of children. | *"In academic literature, misopedia designates hatred of children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misread]] | verb | **1.** Read or interpret wrongly.<br>**2.** Interpret wrongly. | *"He could utter no word, but in his moist and frosty blue eyes was a wealth of acknowledgment I could not misread."* — Jack London, *The Jacket (The Star-Rover)* |
| [[misreading]] | noun | **1.** Misinterpretation caused by inaccurate reading.<br>**2.** Read or interpret wrongly. | *"In academic literature, misreading designates misinterpretation caused by inaccurate reading."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misreckoning]] | noun | **1.** A mistake in calculating. | *"In academic literature, misreckoning designates a mistake in calculating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misrelated]] | adjective | **1.** Mistakenly related. | *"In academic literature, misrelated designates mistakenly related."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misremember]] | verb | **1.** Remember incorrectly. | *"The death close before me was terrible, but far more terrible than death was the dread of being misremembered after death."* — Charles Dickens, *Great Expectations* |
| [[misrepresent]] | verb | **1.** Represent falsely.<br>**2.** Tamper, with the purpose of deception. | *"They watch you, misrepresent you, write letters about you (anonymous sometimes), and you are the torment and the occupation of their lives."* — Charles Dickens, *Great Expectations* |
| [[misrepresentation]] | noun | **1.** A misleading falsehood.<br>**2.** A willful perversion of facts. | *"There may be an element of error, even of misrepresentation, in such estimates."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[misrepresented]] | verb | **1.** Represent falsely.<br>**2.** Tamper, with the purpose of deception. | *"Interested people have perhaps misrepresented each to the other."* — Jane Austen, *Pride and Prejudice* |
| [[misrule]] | noun | **1.** Government that is inefficient or dishonest. | *"Master Simon, who was the leader of their revels, and seemed on all occasions to fulfill the office of that ancient potentate, the Lord of Misrule,* was blinded in the midst of the hall."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[miss]] | noun | **1.** A young woman.<br>**2.** A failure to hit (or meet or find etc). | *"Who ever strove To show her merit that did miss her love?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missal]] | noun | **1.** (roman catholic church) a book containing all the prayers and responses needed to celebrate mass throughout the year. | *"Van Helsing opened his missal and began to read, and Quincey and I followed as well as we could."* — Bram Stoker, *Dracula* |
| [[missed]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"Your Coriolanus is not much missed But with his friends."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misshapen]] | adjective | **1.** So badly formed or out of shape as to be ugly. | *"But thou art neither like thy sire nor dam, But like a foul misshapen stigmatic, Marked by the Destinies to be avoided, As venom toads or lizards’ dreadful stings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misshapenness]] | noun | **1.** An affliction in which some part of the body is misshapen or malformed. | *"In academic literature, misshapenness designates an affliction in which some part of the body is misshapen or malformed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missile]] | noun | **1.** A rocket carrying a warhead of conventional or nuclear explosives; may be ballistic or directed by remote control.<br>**2.** A weapon that is forcibly thrown or projected at a targets but is not self-propelled. | *"Seventy-six hundred thousand million of parcels of bank-notes!” “Will somebody give me a quart pot?” exclaims her exasperated husband, looking helplessly about him and finding no missile within his reach."* — Charles Dickens, *Bleak House* |
| [[missing]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"My lord, the roynish clown, at whom so oft Your grace was wont to laugh, is also missing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mission]] | noun | **1.** An organization of missionaries in a foreign land sent to carry on religious work.<br>**2.** An operation that is assigned by a higher headquarters. | *"Quale’s mission to be in ecstasies with everybody else’s mission and that it was the most popular mission of all."* — Charles Dickens, *Bleak House* |
| [[missional]] | adjective | **1.** Relating to or connected to a religious mission. | *"In academic literature, missional designates relating to or connected to a religious mission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missionary]] | noun | **1.** Someone who attempts to convert others to a particular doctrine or program.<br>**2.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"Over their heads hung the picture of Angel’s sister, the eldest of the family, sixteen years his senior, who had married a missionary and gone out to Africa."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[missioner]] | noun | **1.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"It was the men’s temperance retreat conducted by the missioner, the reverend John Hughes S."* — James Joyce, *Ulysses* |
| [[missis]] | noun | **1.** Informal term of address for someone's wife. | *"In the morning, I said, 'Laura, did you sleep well last night?' She replied, 'O, missis, my heart too full of joy to sleep."* — Classic Author, *The wonders of prayer* |
| [[mississippi]] | noun | **1.** A major north american river and the chief river of the united states; rises in northern minnesota and flows southward into the gulf of mexico.<br>**2.** A state in the deep south on the gulf of mexico; one of the confederate states during the american civil war. | *"In the Mississippi Valley since 1880 natural gas, abundant coal, ore, and timber have made possible a great growth of industries without protection against the Eastern states."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mississippian]] | noun | **1.** From 345 million to 310 million years ago; increase of land areas; primitive ammonites; winged insects.<br>**2.** A native or resident of mississippi. | *"In academic literature, mississippian designates from 345 million to 310 million years ago; increase of land areas; primitive ammonites; winged insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missive]] | noun | **1.** A written message addressed to a person or organization. | *"I wrote to you When rioting in Alexandria; you Did pocket up my letters, and with taunts Did gibe my missive out of audience."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missoula]] | noun | **1.** A university town in western montana. | *"In academic literature, missoula designates a university town in western montana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missouri]] | noun | **1.** A midwestern state in central united states; a border state during the american civil war, missouri was admitted to the confederacy without actually seceding from the union.<br>**2.** The longest river in the united states; arises in montana and flows southeastward to become a tributary of the mississippi at saint louis. | *"They denied us harshly, and wanted to know who of us had sold them food when we drove them from Missouri."* — Jack London, *The Jacket (The Star-Rover)* |
| [[missourian]] | noun | **1.** A native or resident of missouri. | *"Jeff Thompson has just been round behind the Cape pulling up the railroad, but some of the Yankee critter-fellers went out there and run him off," replied the long-haired Missourian."* — Harry Castlemon, *Rodney, the Partisan* |
| [[misspeak]] | verb | **1.** Pronounce a word incorrectly. | *"In academic literature, misspeak designates pronounce a word incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misspell]] | verb | **1.** Spell incorrectly. | *"Misspelled words have been corrected."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[misspelling]] | noun | **1.** A spelling that is incorrect.<br>**2.** Spell incorrectly. | *"In academic literature, misspelling designates a spelling that is incorrect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misspend]] | verb | **1.** Spend time badly or unwisely.<br>**2.** Spend (money or other resources) unwisely. | *"In academic literature, misspend designates spend time badly or unwisely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misstate]] | verb | **1.** State something incorrectly. | *"Is the divine Principle of creation misstated?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[misstatement]] | noun | **1.** A statement that contains a mistake. | *"Passing over what appears in my colleague’s speech as extracts from newspapers, to whose misstatements he has contributed a full share, I come now to notice his animadversions on the Riddleberger bill."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[misstep]] | noun | **1.** An unintentional but embarrassing blunder. | *"Down Mount Franklin and over the narrow path cut in the cragged side of Monroe, where a single misstep would hurl the horse and rider down a fathomless abyss, into whose depths the eye dares hardly for a moment gaze."* — Effie Afton, *Eventide* |
| [[missus]] | noun | **1.** Informal term of address for someone's wife. | *"I warn you if you bark again I shall go straight for master and missus and bring them home from the party, and then, oh, won’t master whip you, just.” She tied the unhappy dog up again, but do you think Nana ceased to bark?"* — J. M. Barrie, *Peter Pan* |
| [[missy]] | noun | **1.** A young woman. | *"Will ye wait, missy?” “No,” said she; and taking her basket Tess trudged on."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mist]] | noun | **1.** A thin fog with condensation near the ground.<br>**2.** Become covered with mist. | *"I’ll say as they say, and persever so, And in this mist at all adventures go."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mist-flower]] | noun | **1.** Rhizomatous plant of central and southeastern united states and west indies having large showy heads of clear blue flowers; sometimes placed in genus eupatorium. | *"In academic literature, mist-flower designates rhizomatous plant of central and southeastern united states and west indies having large showy heads of clear blue flowers; sometimes placed in genus eupatorium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistakable]] | adjective | **1.** So similar as to be easily identified for another thing. | *"In academic literature, mistakable designates so similar as to be easily identified for another thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistake]] | noun | **1.** A wrong action attributable to bad judgment or ignorance or inattention.<br>**2.** An understanding of something that is not correct. | *"No marvel then though I mistake my view, The sun it self sees not, till heaven clears."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistaken]] | verb | **1.** Identify incorrectly.<br>**2.** To make a mistake or be incorrect. | *"It may be you have mistaken him, my lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistakenly]] | adverb | **1.** In a mistaken manner. | *"For if I were to die—and I may die soon—it would be dreadful that you should always think mistakenly of me."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mistaking]] | noun | **1.** Putting the wrong interpretation on.<br>**2.** Identify incorrectly. | *"Thyself thou gav’st, thy own worth then not knowing, Or me to whom thou gav’st it, else mistaking, So thy great gift upon misprision growing, Comes home again, on better judgement making."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mister]] | noun | **1.** A form of address for a man. | *"Grubble, Charley?” “Mister Grubble, miss,” returned Charley."* — Charles Dickens, *Bleak House* |
| [[mistflower]] | noun | **1.** Rhizomatous plant of central and southeastern united states and west indies having large showy heads of clear blue flowers; sometimes placed in genus eupatorium. | *"In academic literature, mistflower designates rhizomatous plant of central and southeastern united states and west indies having large showy heads of clear blue flowers; sometimes placed in genus eupatorium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistily]] | adverb | **1.** In a misty manner.<br>**2.** In a vague way. | *"No, they did not bury me, though there is a period of time which I remember mistily, with a shuddering wonder, like a passage through some inconceivable world that had no hope in it and no desire."* — Joseph Conrad, *Heart of Darkness* |
| [[mistime]] | verb | **1.** Time incorrectly. | *"In academic literature, mistime designates time incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistiming]] | noun | **1.** Something located at a time when it could not have existed or occurred.<br>**2.** Time incorrectly. | *"In academic literature, mistiming designates something located at a time when it could not have existed or occurred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistiness]] | noun | **1.** Cloudiness resulting from haze or mist or vapor. | *"But her eyes had a softness—invariably a softness—which, had they not been dark, would have seemed mistiness; as they were, it lowered an expression that might have been piercing to simple clearness."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mistletoe]] | noun | **1.** American plants closely resembling old world mistletoe.<br>**2.** Old world parasitic shrub having branching greenish stems with leathery leaves and waxy white glutinous berries; the traditional mistletoe of christmas. | *"These two have ticed me hither to this place, A barren detested vale you see it is; The trees, though summer, yet forlorn and lean, Overcome with moss and baleful mistletoe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistral]] | noun | **1.** A strong north wind that blows in france during the winter. | *"A touch of mistral was out, and the wind blew seaward."* — Donn Byrne, *The Wind Bloweth* |
| [[mistranslate]] | verb | **1.** Translate incorrectly. | *"In academic literature, mistranslate designates translate incorrectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistranslation]] | noun | **1.** An incorrect translation. | *"Strange to say, a similar mistranslation occurs in Dr."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[mistreat]] | verb | **1.** Treat badly. | *"In academic literature, mistreat designates treat badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistreated]] | verb | **1.** Treat badly.<br>**2.** Subjected to cruel treatment. | *"In academic literature, mistreated designates treat badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistreatment]] | noun | **1.** The practice of treating (someone or something) badly. | *"In academic literature, mistreatment designates the practice of treating (someone or something) badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistress]] | noun | **1.** An adulterous woman; a woman who has an ongoing extramarital sexual relationship with a man.<br>**2.** A woman schoolteacher (especially one regarded as strict). | *"If Nature (sovereign mistress over wrack) As thou goest onwards still will pluck thee back, She keeps thee to this purpose, that her skill May time disgrace, and wretched minutes kill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistrial]] | noun | **1.** A trial that is invalid or inconclusive. | *"In academic literature, mistrial designates a trial that is invalid or inconclusive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mistrust]] | noun | **1.** Doubt about someone's honesty.<br>**2.** The trait of not trusting others. | *"Yet your mistrust cannot make me a traitor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistrustful]] | adjective | **1.** Openly distrustful and unwilling to confide. | *"I hold it cowardice To rest mistrustful where a noble heart Hath pawned an open hand in sign of love; Else might I think that Clarence, Edward’s brother, Were but a feigned friend to our proceedings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mistrustfully]] | adverb | **1.** With distrust. | *"They looked at him and at his shoes mistrustfully, as at an alien."* — graf Leo Tolstoy, *War and Peace* |
| [[misty]] | adjective | **1.** Filled or abounding with fog or mist.<br>**2.** Wet with mist. | *"Night’s candles are burnt out, and jocund day Stands tiptoe on the misty mountain tops."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misty-eyed]] | adjective | **1.** Having eyes blurred as with tears. | *"In academic literature, misty-eyed designates having eyes blurred as with tears."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misunderstand]] | verb | **1.** Interpret in the wrong way. | *"Perhaps I can make use of him—I might do it then!” She pointed in the direction of Casterbridge, and the dog seemed to misunderstand: he trotted on."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[misunderstanding]] | noun | **1.** Putting the wrong interpretation on.<br>**2.** An understanding of something that is not correct. | *"I have occupied your house for a considerable period, I believe to our mutual satisfaction until this unpleasant misunderstanding arose; let us be at once friendly and business-like."* — Charles Dickens, *Bleak House* |
| [[misunderstood]] | verb | **1.** Interpret in the wrong way.<br>**2.** Wrongly understood. | *"Whenever you speak about him, your voice takes on a tone as if you were speaking about a misunderstood angel."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[misuse]] | noun | **1.** Improper or excessive use.<br>**2.** Apply to a wrong thing or person; apply badly or incorrectly. | *"I am perjured most, For all my vows are oaths but to misuse thee: And all my honest faith in thee is lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misused]] | verb | **1.** Apply to a wrong thing or person; apply badly or incorrectly.<br>**2.** Change the inherent purpose or function of something. | *"You have simply misused our sex in your love-prate!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noncommissioned]] | adjective | **1.** (of military officers) appointed from enlisted personnel. | *"A French noncommissioned officer of hussars, in crimson uniform and a shaggy cap, shouted to the approaching Balashëv to halt."* — graf Leo Tolstoy, *War and Peace* |
| [[nontransmissible]] | adjective | **1.** Not acquirable by inheritance.<br>**2.** (of disease) not capable of being passed on. | *"In academic literature, nontransmissible designates not acquirable by inheritance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissibility]] | noun | **1.** Admissibility as a consequence of being permitted. | *"In academic literature, permissibility designates admissibility as a consequence of being permitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissible]] | adjective | **1.** That may be permitted especially as according to rule.<br>**2.** That may be accepted or conceded. | *"Casaubon again and left off receiving favors from him, it would clearly be permissible to hate him the more."* — George Eliot, *Middlemarch* |
| [[permissibly]] | adverb | **1.** In a permissible manner. | *"In academic literature, permissibly designates in a permissible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permission]] | noun | **1.** Approval to do something.<br>**2.** The act of giving a formal (usually written) authorization. | *"What Antony shall speak, I will protest He speaks by leave and by permission; And that we are contented Caesar shall Have all true rights and lawful ceremonies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[permissive]] | adjective | **1.** Not preventive.<br>**2.** Granting or inclined or able to grant permission; not strict in discipline. | *"Sith ’twas my fault to give the people scope, ’Twould be my tyranny to strike and gall them For what I bid them do; for we bid this be done When evil deeds have their permissive pass And not the punishment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[permissively]] | adverb | **1.** In a permissive manner. | *"In academic literature, permissively designates in a permissive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permissiveness]] | noun | **1.** A disposition to allow freedom of choice and behavior. | *"In academic literature, permissiveness designates a disposition to allow freedom of choice and behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmistress]] | noun | **1.** A woman postmaster. | *"While the postmistress searched a pigeonhole he gazed at the recruiting poster with soldiers of all arms on parade: and held the tip of his baton against his nostrils, smelling freshprinted rag paper."* — James Joyce, *Ulysses* |
| [[premise]] | noun | **1.** A statement that is assumed to be true and from which a conclusion can be drawn.<br>**2.** Set forth beforehand, often as an explanation. | *"While he is so occupied, I will tell you, reader, what they are: and first, I must premise that they are nothing wonderful."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[premises]] | noun | **1.** Land and the buildings on it.<br>**2.** A statement that is assumed to be true and from which a conclusion can be drawn. | *"Here is my hand; the premises observ’d, Thy will by my performance shall be serv’d; So make the choice of thy own time, for I, Thy resolv’d patient, on thee still rely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[premiss]] | noun | **1.** A statement that is assumed to be true and from which a conclusion can be drawn.<br>**2.** Take something as preexisting and given. | *"That standpoint was unquestioned by Celsus. [Sidenote: The failure of Celsus] Confident in the truth of his premisses and the conclusions that follow from them, Celsus charged the Christians with folly and dogmatism."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[pretermission]] | noun | **1.** Letting pass without notice. | *"Should his child sicken unto death,--why, look For scarce abatement of his cheerfulness, {160} Or pretermission of the daily craft!"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[promiscuity]] | noun | **1.** Indulging in promiscuous (casual and indiscriminate) sexual relations. | *"In academic literature, promiscuity designates indulging in promiscuous (casual and indiscriminate) sexual relations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promiscuous]] | adjective | **1.** Not selective of a single class or person.<br>**2.** Casual and unrestrained in sexual behavior. | *"A baneful promiscuous intercourse of the sexes is hereby avoided, and virtue, without being clamorously invoked, is, as it were, unconsciously practised."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[promiscuously]] | adverb | **1.** In an indiscriminate manner.<br>**2.** In a licentious and promiscuous manner. | *"Now I’ll be more interesting, and let you see some loose play—giving all the cuts and points, infantry and cavalry, quicker than lightning, and as promiscuously—with just enough rule to regulate instinct and yet not to fetter it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[promiscuousness]] | noun | **1.** Indulging in promiscuous (casual and indiscriminate) sexual relations. | *"In academic literature, promiscuousness designates indulging in promiscuous (casual and indiscriminate) sexual relations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promise]] | noun | **1.** A verbal commitment by one person to another agreeing to do (or not to do) something in the future.<br>**2.** Grounds for feeling hopeful about the future. | *"Not helping, death’s my fee; But if I help, what do you promise me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[promisee]] | noun | **1.** A person to whom a promise is made. | *"In academic literature, promisee designates a person to whom a promise is made."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promiser]] | noun | **1.** A person who makes a promise. | *"In academic literature, promiser designates a person who makes a promise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promising]] | verb | **1.** Make a promise or commitment.<br>**2.** Promise to undertake or give. | *"The general of our horse thou art, and we, Great in our hope, lay our best love and credence Upon thy promising fortune."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[promisingly]] | adverb | **1.** In an auspicious manner. | *"It was based on her exceptional physical nature; and she might have used it promisingly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[promisor]] | noun | **1.** A person who makes a promise. | *"In academic literature, promisor designates a person who makes a promise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promissory]] | adjective | **1.** Relating to or having the character of a promise. | *"It differs from promissory notes and bonds in that its value is not based on the interest it yields, but mainly on its monetary uses."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[readmission]] | noun | **1.** The act of admitting someone again. | *"Wilson, and expressing regret that no proposal having for its object the readmission of Master Byron to the academy could be entertained."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[remise]] | noun | **1.** An expensive or high-class hackney.<br>**2.** A small building for housing coaches and carriages and other vehicles. | *"In academic literature, remise designates an expensive or high-class hackney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remiss]] | adjective | **1.** Failing in what duty requires. | *"He, being remiss, Most generous, and free from all contriving, Will not peruse the foils; so that with ease, Or with a little shuffling, you may choose A sword unbated, and in a pass of practice, Requite him for your father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remission]] | noun | **1.** An abatement in intensity or degree (as in the manifestations of a disease).<br>**2.** A payment of money sent to a person in another place. | *"Though I owe My revenge properly, my remission lies In Volscian breasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remissness]] | noun | **1.** The quality of being lax and neglectful. | *"The General, meanwhile, though offended every morning by Frederick’s remissness in writing, was free from any real anxiety about him, and had no more pressing solicitude than that of making Miss Morland’s time at Northanger pass pleasantly."* — Jane Austen, *Northanger Abbey* |
| [[semisoft]] | adjective | **1.** Somewhat soft. | *"In academic literature, semisoft designates somewhat soft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisolid]] | adjective | **1.** Partly solid; having a rigidity and viscosity intermediate between a solid and a liquid. | *"In academic literature, semisolid designates partly solid; having a rigidity and viscosity intermediate between a solid and a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisynthetic]] | adjective | **1.** Not of natural origin; prepared or made artificially. | *"In academic literature, semisynthetic designates not of natural origin; prepared or made artificially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submission]] | noun | **1.** Something (manuscripts or architectural plans and models or estimates or works of art of all genres etc.) submitted for the judgment of others (as in a competition).<br>**2.** The act of submitting; usually surrendering power to another. | *"And therefore tell her I return great thanks, And in submission will attend on her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submissive]] | adjective | **1.** Inclined or willing to submit to orders or wishes of others or showing such inclination.<br>**2.** Abjectly submissive; characteristic of a slave or servant; ; - s.h.adams. | *"On what submissive message art thou sent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submissively]] | adverb | **1.** In a servile manner. | *"Turveydrop’s deportment so submissively that they had become excellent friends."* — Charles Dickens, *Bleak House* |
| [[submissiveness]] | noun | **1.** The trait of being willing to yield to the will of another person or a superior force etc. | *"Lydgate relied much on the psychological difference between what for the sake of variety I will call goose and gander: especially on the innate submissiveness of the goose as beautifully corresponding to the strength of the gander."* — George Eliot, *Middlemarch* |
| [[surmisable]] | adjective | **1.** Capable of being inferred on slight grounds. | *"In academic literature, surmisable designates capable of being inferred on slight grounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surmisal]] | noun | **1.** A message expressing an opinion based on incomplete evidence. | *"In academic literature, surmisal designates a message expressing an opinion based on incomplete evidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surmise]] | noun | **1.** A message expressing an opinion based on incomplete evidence.<br>**2.** Infer from incomplete evidence. | *"My thought, whose murder yet is but fantastical, Shakes so my single state of man That function is smother’d in surmise, And nothing is but what is not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transmissible]] | adjective | **1.** (of disease) capable of being transmitted by infection.<br>**2.** Occurring among members of a family usually by heredity. | *"It was a curse transmissible to children, but if he desired to keep the influence his genius gave him, he could not tell the world why he refused to marry."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[transmission]] | noun | **1.** The act of sending a message; causing a message to be transmitted.<br>**2.** Communication by means of transmitted signals. | *"It lay quietly sheltered from the motions of the sea, and under a favourable pressure for the transmission of the electric spark which passes from Europe to America in .32 of a second."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[uncompromising]] | adjective | **1.** Not making concessions. | *"Stand forth, Jo, in uncompromising colours!"* — Charles Dickens, *Bleak House* |
| [[unmistakable]] | adjective | **1.** Clearly evident to the mind.<br>**2.** Clearly revealed to the mind or the senses or judgment. | *"Do you know that, Kurt," he said confidentially, "I only wonder how she could get hold of such a basket full, you know, without being--you know--" With this he made the unmistakable motion of Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unmistakably]] | adverb | **1.** Without possibility of mistake.<br>**2.** In a signal manner. | *"But I have the sad satisfaction of knowing that my words, whether pleasing or offensive, are unmistakably true."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unpermissive]] | adjective | **1.** Not inclined to grant permission; severe in discipline. | *"In academic literature, unpermissive designates not inclined to grant permission; severe in discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpermissiveness]] | noun | **1.** A lack of permissiveness or indulgence and a tendency to confine behavior within certain specified limits. | *"In academic literature, unpermissiveness designates a lack of permissiveness or indulgence and a tendency to confine behavior within certain specified limits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpromised]] | adjective | **1.** Not promised in marriage. | *"In academic literature, unpromised designates not promised in marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpromising]] | adjective | **1.** Unlikely to bring about favorable results or enjoyment. | *"Thurveydrop, in virtue of his deportment, considering himself vastly superior to all the company—it was a very unpromising case."* — Charles Dickens, *Bleak House* |
| [[unsubmissive]] | adjective | **1.** Not servile or submissive. | *"In academic literature, unsubmissive designates not servile or submissive."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MIS
  </div>
</div>
