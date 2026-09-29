---
status: unread
type: root_dashboard
---
# Dashboard — mit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to send, let go, or cast”</span>
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

The root **mit** means to send, let go, or cast. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *remove*, *transmit*, *transmittal*, and *transmitter*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to send, let go, or cast
> The root **mit** means to send, let go, or cast. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *remove*, *transmit*, *transmittal*, and *transmitter*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To send, let go, or cast</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *remove* and *transmit*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mit** comes from a Latin word that means *"to send, let go, or cast"*.
  - At its core, it describes the action of send, let go, or cast.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **mit** in an English word, think of **to send, let go, or cast**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to send, let go, or cast).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Remove**: An everyday English word showing the root's idea of *to send, let go, or cast*.
  - **Transmit**: To cause something to pass on from one place or person to another.
  - **Transmittal**: The act of sending or passing on something from one place or person to another.
  - **Transmitter**: An electronic device that generates and amplifies radio frequency signals for broadcast.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mit</mark>, think of <mark class="hl-def">to send, let go, or cast</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Present Verbal Base:** *mitt-* (*mittō, mittere*) $	o$ *transmit, admit, commit, emit, omit, permit, remit, submit, demit*.

- **Frequentative / Durational Shifts:** *intermit, intermittent, intermittently*.

- **Agentive & Institutional Suffixes:**

  - *transmitter, transmittal*.

  - *commitment, committal, committee*.

  - *admittance, remittance*.



### 2.2 Complementary Vault Taxonomy: `mit` vs `miss` vs `mis`

- **`mit`:** The **active Latin verbal present stem** (*transmit, admit, commit, emit, permit, remit, submit*).

- **`[[Dashboard — miss]]`:** The **classical Latin supine and noun branch in *-iō*** (*mission, missile, commission, transmission, admission*).

- **`[[Dashboard — mis]]`:** The **Romance-adapted contractual/deductive branch** (*promise, compromise, premise, surmise, demise*).



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



### 1. Telecommunications, Physics & Energy

- *transmit* (cause something to pass on from one place or person to another; broadcast an electronic signal).

- *transmittal* (the act of sending something across).

- *transmitter* (a set of equipment used to generate and transmit electromagnetic waves).

- *emit* (produce and discharge something, especially gas, radiation, or sound).



### 2. Governance, Responsibility & Law

- *commit* (perpetrate a mistake or crime; pledge or bind to a course of action; entrust).

- *commitment* (the state or quality of being dedicated to a cause, activity, etc.).

- *committee* (a group of people appointed for a specific function by a larger group).

- *permit (v/n)* (give authorization or consent to; an official document giving authorization).

- *remit (v/n)* (cancel or refrain from exacting a debt or punishment; send money; the task or area of activity officially assigned to someone).

- *remittance* (a sum of money sent in payment or as a gift).



### 3. Yielding, Access & Exclusion

- *admit* (confess to be true; allow someone to enter).

- *admittance* (the process or fact of entering; permission to enter).

- *submit* (accept or yield to a superior force; present a proposal for consideration).

- *omit* (leave out or exclude someone or something, either intentionally or forgetfully).

- *manumit* (release from slavery).

- *demit* (resign from an office or position).



---



## 🔀 4. Prefix & Combining Dynamics on mit



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `trans-`** | `trans-` + *mittere* | **transmit** | Sending across a medium or space | *"Fiber optic cables transmit data pulses across oceans."* |

| **Prefix `ad-`** | `ad-` + *mittere* | **admit** | Sending into an enclosure / acknowledging | *"The suspect decided to admit his presence at the scene."* |

| **Prefix `con-`** | `con-` + *mittere* | **commit** | Entrusting fully to a person/duty | *"The council voted to commit funds to municipal housing."* |

| **Prefix `sub-`** | `sub-` + *mittere* | **submit** | Yielding underneath authority | *"Students must submit their dissertations before Friday."* |

| **Prefix `inter-`** | `inter-` + *mittere* | **intermittent** | Sending pauses between bursts | *"Weather forecasters predicted intermittent rain showers."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 💻 **Computer Science & Networking:** *TCP transmission protocols*, *packet retransmission*, *bitrate*.

- 💼 **International Finance & Banking:** *cross-border remittance flows*, *SWIFT fund transmittal*.

- 🏥 **Clinical Medicine & Physiology:** *intermittent fasting*, *neurotransmitter emission*.

- ⚖️ **Criminal Law & Jurisprudence:** *committal hearings*, *remand vs bail*, *admissibility of evidence*.

- 🏛️ **Institutional Governance:** *executive steering committee*, *constitutional commitment*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[admit]] | verb | **1.** Declare to be true or admit the existence or reality or truth of.<br>**2.** Allow to enter; grant entry to. | *"Love is a babe, then might I not say so To give full growth to that which still doth grow. 116 Let me not to the marriage of true minds Admit impediments, love is not love Which alters when it alteration finds, Or bends with the remover to remove."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admittable]] | adjective | **1.** Deserving to be allowed to enter. | *"In academic literature, admittable designates deserving to be allowed to enter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[admittance]] | noun | **1.** The right to enter.<br>**2.** The act of admitting someone to enter. | *"With five times so much conversation I should get ground of your fair mistress; make her go back even to the yielding, had I admittance and opportunity to friend."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[admittedly]] | adverb | **1.** As acknowledged. | *"Jesus is admittedly her eldest son, and is bred to be a carpenter; and a carpenter he undoubtedly was up to, we are told, about thirty years of age (Luke 3:23)."* — T. R. Glover, *The Jesus of History* |
| [[admittible]] | adjective | **1.** Deserving to be allowed to enter. | *"In academic literature, admittible designates deserving to be allowed to enter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisemitic]] | adjective | **1.** Relating to or characterized by anti-semitism; hating jews. | *"In academic literature, antisemitic designates relating to or characterized by anti-semitism; hating jews."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comity]] | noun | **1.** A state or atmosphere of harmony or mutual civility and respect. | *"To this end there should be interstate comity and coöperation, so that the insured could at any time transfer his actuarial equity from one state to another. § 17. #The contributory principle#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commit]] | verb | **1.** Perform an act, usually with a negative connotation.<br>**2.** Give entirely to a specific person, activity, or cause. | *"Look what thy memory cannot contain, Commit to these waste blanks, and thou shalt find Those children nursed, delivered from thy brain, To take a new acquaintance of thy mind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commitment]] | noun | **1.** The trait of sincere and steadfast fixity of purpose.<br>**2.** The act of binding yourself (intellectually or emotionally) to a course of action. | *"One loving spirit sets another on fire." Jesus brings men to the new exploration of God, to the new commitment of themselves to God, simply by the ordinary mechanism of friendship and love."* — T. R. Glover, *The Jesus of History* |
| [[committal]] | noun | **1.** The official act of consigning a person to confinement (as in a prison or mental hospital).<br>**2.** The act of committing a crime. | *"‘Yes, master, and I’ve never been in it much.’ (I had come out of Kingston Jail last on a vagrancy committal."* — Charles Dickens, *Great Expectations* |
| [[committed]] | verb | **1.** Perform an act, usually with a negative connotation.<br>**2.** Give entirely to a specific person, activity, or cause. | *"What wretched errors hath my heart committed, Whilst it hath thought it self so blessed never!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[committedness]] | noun | **1.** The trait of sincere and steadfast fixity of purpose. | *"In academic literature, committedness designates the trait of sincere and steadfast fixity of purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[committee]] | noun | **1.** A special group delegated to consider some matter;  - milton berle.<br>**2.** A self-constituted organization to promote something. | *"Good things have been said about it by blue-nosed, bulbous-shoed old benchers in select port-wine committee after dinner in hall."* — Charles Dickens, *Bleak House* |
| [[committeeman]] | noun | **1.** A man who is a member of committee. | *"Count Ilyá, again thrusting his way through the crowd, went out of the drawing room and reappeared a minute later with another committeeman, carrying a large silver salver which he presented to Prince Bagratión."* — graf Leo Tolstoy, *War and Peace* |
| [[committeewoman]] | noun | **1.** A woman who is a member of a committee. | *"In academic literature, committeewoman designates a woman who is a member of a committee."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demit]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mit within the domain of Sending.<br>**2.** A technical or specialized form exhibiting the properties of mit in systematic terminology. | *"In academic literature, demit designates pertaining to, derived from, or characteristic of latin mit within the domain of sending."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demitasse]] | noun | **1.** Small cup of strong black coffee without milk or cream.<br>**2.** Small coffee cup; for serving black coffee. | *"In academic literature, demitasse designates small cup of strong black coffee without milk or cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimity]] | noun | **1.** A strong cotton fabric with a raised pattern; used for bedcovers and curtains. | *"In removing the light towards the bedstead its rays fell upon the tester of white dimity; something was hanging beneath it, and she lifted the candle to see what it was."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[emit]] | verb | **1.** Expel (gases or odors).<br>**2.** Give off, send forth, or discharge; as of light, heat, or radiation, vapor, etc. | *"No one of these mischiefs is less incident to a power in the States to emit paper money, than to coin gold or silver."* — Alexander Hamilton, *The Federalist Papers* |
| [[emitter]] | noun | **1.** The electrode in a transistor where electrons originate. | *"In academic literature, emitter designates the electrode in a transistor where electrons originate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermit]] | verb | **1.** Cease an action temporarily. | *"Run to your houses, fall upon your knees, Pray to the gods to intermit the plague That needs must light on this ingratitude."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intermittence]] | noun | **1.** The quality of being intermittent; subject to interruption or periodic stopping. | *"In academic literature, intermittence designates the quality of being intermittent; subject to interruption or periodic stopping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermittency]] | noun | **1.** The quality of being intermittent; subject to interruption or periodic stopping. | *"In academic literature, intermittency designates the quality of being intermittent; subject to interruption or periodic stopping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermittent]] | adjective | **1.** Stopping and starting at irregular intervals. | *"From the trees came the sound of steady dripping upon the drifted leaves under them, and from the direction of the church she could hear another noise—peculiar, and not intermittent like the rest, the purl of water falling into a pool."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[intermittently]] | adverb | **1.** In an intermittent manner. | *"He was often remorseful, and he strove painfully, if intermittently, after better things."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[intermittingly]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mit within the domain of Sending.<br>**2.** A technical or specialized form exhibiting the properties of mit in systematic terminology. | *"In academic literature, intermittingly designates pertaining to, derived from, or characteristic of latin mit within the domain of sending."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intromit]] | verb | **1.** Allow to enter; grant entry to. | *"In academic literature, intromit designates allow to enter; grant entry to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manumit]] | verb | **1.** Free from slavery or servitude. | *"In academic literature, manumit designates free from slavery or servitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manumitter]] | noun | **1.** Someone who frees others from bondage. | *"In academic literature, manumitter designates someone who frees others from bondage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mit]] | noun | **1.** An engineering university in cambridge. | *"Stuhlmann, _Mit Emin Pascha ins Herz von Afrika_ (Berlin, 1894), p. 506. [155] As a confirmation of this view it may be pointed out that beating or scourging is inflicted on inanimate objects expressly for the purpose indicated in the text."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[mitchell]] | noun | **1.** English aeronautical engineer (1895-1937).<br>**2.** United states aviator and general who was an early advocate of military air power (1879-1936). | *"Mitchell, in Bulletin 173 of the U.S."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mitchella]] | noun | **1.** Creeping evergreen herbs of north america. | *"In academic literature, mitchella designates creeping evergreen herbs of north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitchum]] | noun | **1.** United states film actor (1917-1997). | *"In academic literature, mitchum designates united states film actor (1917-1997)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mite]] | noun | **1.** A slight but appreciable amount.<br>**2.** Any of numerous very small to minute arachnids often infesting animals or plants or stored foods. | *"I’ll show you those in troubles reign, Losing a mite, a mountain gain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mitella]] | noun | **1.** Genus of low slender herbs of north america and northeastern asia having flowers with trifid or pinnatifid petals. | *"In academic literature, mitella designates genus of low slender herbs of north america and northeastern asia having flowers with trifid or pinnatifid petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miter]] | noun | **1.** Joint that forms a corner; usually both sides are bevelled at a 45-degree angle to form a 90-degree corner.<br>**2.** The surface of a beveled end of a piece where a miter joint is made. | *"In academic literature, miter designates joint that forms a corner; usually both sides are bevelled at a 45-degree angle to form a 90-degree corner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miterwort]] | noun | **1.** Any of various rhizomatous perennial herbs of the genus mitella having a capsule resembling a bishop's miter. | *"In academic literature, miterwort designates any of various rhizomatous perennial herbs of the genus mitella having a capsule resembling a bishop's miter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitigable]] | adjective | **1.** Capable of being alleviated. | *"In academic literature, mitigable designates capable of being alleviated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitigate]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of.<br>**2.** Make less severe or harsh. | *"Pray, uncle Gloucester, mitigate this strife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mitigated]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of.<br>**2.** Make less severe or harsh. | *"Such a lady gave a neighborliness to both rank and religion, and mitigated the bitterness of uncommuted tithe."* — George Eliot, *Middlemarch* |
| [[mitigation]] | noun | **1.** To act in such a way as to cause an offense to seem less serious.<br>**2.** A partial excuse to mitigate censure; an attempt to represent an offense as less serious than it appears by showing mitigating circumstances. | *"But, my good lord, How now for mitigation of this bill Urged by the Commons?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mitigative]] | adjective | **1.** Moderating pain or sorrow by making it easier to bear. | *"In academic literature, mitigative designates moderating pain or sorrow by making it easier to bear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitigatory]] | adjective | **1.** Moderating pain or sorrow by making it easier to bear. | *"In academic literature, mitigatory designates moderating pain or sorrow by making it easier to bear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitochondrion]] | noun | **1.** An organelle containing enzymes responsible for producing energy. | *"In academic literature, mitochondrion designates an organelle containing enzymes responsible for producing energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitogen]] | noun | **1.** An agent that triggers mitosis. | *"In academic literature, mitogen designates an agent that triggers mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitomycin]] | noun | **1.** A complex of antibiotic substances obtained from a streptomyces bacterium; one form (trade name mutamycin) shows promise as an anticancer drug. | *"In academic literature, mitomycin designates a complex of antibiotic substances obtained from a streptomyces bacterium; one form (trade name mutamycin) shows promise as an anticancer drug."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitosis]] | noun | **1.** Cell division in which the nucleus divides into nuclei containing the same number of chromosomes. | *"In academic literature, mitosis designates cell division in which the nucleus divides into nuclei containing the same number of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitotic]] | adjective | **1.** Of or relating to or undergoing mitosis. | *"In academic literature, mitotic designates of or relating to or undergoing mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitra]] | noun | **1.** Hindu god of friendship and alliances; usually invoked together with varuna as a supporter of heaven and earth. | *"Mitra, likewise, was a good old Aryan god, ere he was filched from us or we discarded him."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mitral]] | adjective | **1.** Of or relating to or located in or near the mitral valve.<br>**2.** Relating to or resembling the miter worn by some clerics. | *"In academic literature, mitral designates of or relating to or located in or near the mitral valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitre]] | noun | **1.** Joint that forms a corner; usually both sides are bevelled at a 45-degree angle to form a 90-degree corner.<br>**2.** The surface of a beveled end of a piece where a miter joint is made. | *"Pocket: who was also in the first bloom of youth, and not quite decided whether to mount to the Woolsack, or to roof himself in with a mitre."* — Charles Dickens, *Great Expectations* |
| [[mitrewort]] | noun | **1.** Any of various rhizomatous perennial herbs of the genus mitella having a capsule resembling a bishop's miter. | *"In academic literature, mitrewort designates any of various rhizomatous perennial herbs of the genus mitella having a capsule resembling a bishop's miter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitsvah]] | noun | **1.** (judaism) a precept or commandment of the jewish law.<br>**2.** (judaism) a good deed performed out of religious duty. | *"In academic literature, mitsvah designates (judaism) a precept or commandment of the jewish law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitt]] | noun | **1.** The (prehensile) extremity of the superior limb.<br>**2.** The handwear used by fielders in playing baseball. | *"By the dear ruffles round her feet, By her small hands that hung In their lace mitts, austere and sweet, Her gown's white folds among."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[mittelschmerz]] | noun | **1.** Pain in the area of the ovary that is felt at the time of ovulation (usually midway through the menstrual cycle). | *"In academic literature, mittelschmerz designates pain in the area of the ovary that is felt at the time of ovulation (usually midway through the menstrual cycle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mitten]] | noun | **1.** Glove that encases the thumb separately and the other four fingers together. | *"And continually, now with one mitten, now with the other, I rubbed my nose that it might not freeze."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mitterrand]] | noun | **1.** French statesman and president of france from 1981 to 1985 (1916-1996). | *"In academic literature, mitterrand designates french statesman and president of france from 1981 to 1985 (1916-1996)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncommittal]] | adjective | **1.** Refusing to bind oneself to a particular course of action or view or the like. | *"Bussard stood beside him, trying nervously to appear noncommittal, while Mead went up to the shaking old man, grasped his hand, and brought him over to the desk."* — Algis Budrys, *Citadel* |
| [[nonremittal]] | noun | **1.** Act of failing to meet a financial obligation.<br>**2.** Loss resulting from failure of a debt to be paid. | *"In academic literature, nonremittal designates act of failing to meet a financial obligation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[omit]] | verb | **1.** Prevent from being included or considered or accepted.<br>**2.** Leave undone or leave out. | *"My lords, you are appointed for that office; The due of honour in no point omit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[permit]] | noun | **1.** A legal document giving official permission to do something.<br>**2.** The act of giving a formal (usually written) authorization. | *"He purposeth to Athens, whither, with what haste The weight we must convey with ’s will permit, We shall appear before him.—On there, pass along! [_Exeunt._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pretermit]] | verb | **1.** Disregard intentionally or let pass.<br>**2.** Leave undone or leave out. | *"I have been led farther than I had foreseen, and various subjects for annotation have presented themselves which, though I have no direct need of them, I could not pretermit."* — George Eliot, *Middlemarch* |
| [[readmit]] | verb | **1.** Admit anew.<br>**2.** Admit again or anew. | *"In academic literature, readmit designates admit anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recommit]] | verb | **1.** Commit once again, as of a crime.<br>**2.** Commit again. | *"In academic literature, recommit designates commit once again, as of a crime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remit]] | noun | **1.** The topic that a person, committee, or piece of research is expected to deal with or has authority to deal with.<br>**2.** (law) the act of remitting (especially the referral of a law case to another court). | *"Neither of either; I remit both twain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remitment]] | noun | **1.** A payment of money sent to a person in another place.<br>**2.** (law) the act of remitting (especially the referral of a law case to another court). | *"In academic literature, remitment designates a payment of money sent to a person in another place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remittal]] | noun | **1.** A payment of money sent to a person in another place.<br>**2.** An abatement in intensity or degree (as in the manifestations of a disease). | *"In academic literature, remittal designates a payment of money sent to a person in another place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remittance]] | noun | **1.** A payment of money sent to a person in another place. | *"There are given all the various letters that arise in the course of business: Asking for money, requesting time, enclosing remittance, asking assistance, reasons for refusal, from tenants to landlords on different subjects, with landlords’ replies."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[remittent]] | adjective | **1.** (of a disease) characterized by periods of diminished severity. | *"I bethought myself to go upstairs and see how the dying woman sped, who lay there almost unheeded: the very servants paid her but a remittent attention: the hired nurse, being little looked after, would slip out of the room whenever she could."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[resubmit]] | verb | **1.** Submit (information) again to a program or automatic system. | *"In academic literature, resubmit designates submit (information) again to a program or automatic system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retransmit]] | verb | **1.** Transmit again. | *"In academic literature, retransmit designates transmit again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semite]] | noun | **1.** A member of a group of semitic-speaking peoples of the middle east and northern africa.<br>**2.** Of or relating to or characteristic of semites. | *"He visited the historic localities of New England and crossed the continent to San Francisco, stopping on the way at Salt Lake City, and extending his journey to the Yo-Semite Valley."* — John Cairns, *Principal Cairns* |
| [[semiterrestrial]] | adjective | **1.** Chiefly but not exclusively terrestrial. | *"In academic literature, semiterrestrial designates chiefly but not exclusively terrestrial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitic]] | noun | **1.** A major branch of the afro-asiatic language family.<br>**2.** Of or relating to the group of semitic languages. | *"As well had Pilate and I been known to each other before ever he journeyed out to be procurator over the Semitic volcano of Jerusalem."* — Jack London, *The Jacket (The Star-Rover)* |
| [[semitic-speaking]] | adjective | **1.** Able to communicate in a semitic language. | *"In academic literature, semitic-speaking designates able to communicate in a semitic language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitone]] | noun | **1.** The musical interval between adjacent keys on a keyboard instrument. | *"In academic literature, semitone designates the musical interval between adjacent keys on a keyboard instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitrailer]] | noun | **1.** A trailer having wheels only in the rear; the front is supported by the towing vehicle. | *"In academic literature, semitrailer designates a trailer having wheels only in the rear; the front is supported by the towing vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitrance]] | noun | **1.** A trancelike state in which the person can follow instructions but voluntary action is weak or absent. | *"In academic literature, semitrance designates a trancelike state in which the person can follow instructions but voluntary action is weak or absent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitransparency]] | noun | **1.** The quality of allowing light to pass diffusely. | *"In academic literature, semitransparency designates the quality of allowing light to pass diffusely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitransparent]] | adjective | **1.** Allowing light to pass through diffusely. | *"After a lapse of four minutes the glimmer of his candle was discernible through the semitransparent semicircular glass fanlight over the halldoor."* — James Joyce, *Ulysses* |
| [[semitropic]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, semitropic designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitropical]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, semitropical designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitropics]] | noun | **1.** Regions adjacent to the tropics. | *"In academic literature, semitropics designates regions adjacent to the tropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subcommittee]] | noun | **1.** A subset of committee members organized for a specific purpose. | *"In academic literature, subcommittee designates a subset of committee members organized for a specific purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submit]] | verb | **1.** Refer for judgment or consideration.<br>**2.** Put before. | *"Hence is it that we make trifles of terrors, ensconcing ourselves into seeming knowledge when we should submit ourselves to an unknown fear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submitter]] | noun | **1.** Someone who yields to the will of another person or force.<br>**2.** Someone who submits something (as an application for a job or a manuscript for publication etc.) for the judgment of others. | *"In academic literature, submitter designates someone who yields to the will of another person or force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmit]] | verb | **1.** Transfer to another.<br>**2.** Transmit or serve as the medium for transmission. | *"Social effects of the right to transmit property. § 4."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[transmittable]] | adjective | **1.** (of disease) capable of being transmitted by infection. | *"In academic literature, transmittable designates (of disease) capable of being transmitted by infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmittal]] | noun | **1.** The act of sending a message; causing a message to be transmitted. | *"In academic literature, transmittal designates the act of sending a message; causing a message to be transmitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmittance]] | noun | **1.** The fraction of radiant energy that passes through a substance. | *"In academic literature, transmittance designates the fraction of radiant energy that passes through a substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmitted]] | verb | **1.** Transfer to another.<br>**2.** Transmit or serve as the medium for transmission. | *"The Kellynch estate should be transmitted whole and entire, as he had received it."* — Jane Austen, *Persuasion* |
| [[transmitter]] | noun | **1.** Someone who transmits a message.<br>**2.** Any agent (person or animal or microorganism) that carries and transmits a disease. | *"Request permission to come aboard and have unattended access to the spunnel transmitter for about five minutes."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[transmitting]] | noun | **1.** The act of sending a message; causing a message to be transmitted.<br>**2.** Transfer to another. | *"It is remarkable, however, that she neither insisted on Catherine’s writing by every post, nor exacted her promise of transmitting the character of every new acquaintance, nor a detail of every interesting conversation that Bath might produce."* — Jane Austen, *Northanger Abbey* |
| [[uncommitted]] | adjective | **1.** Not bound or pledged.<br>**2.** Not associated in an exclusive sexual relationship. | *"There was the great four-post bed with amber hangings as of old; there the toilet-table, the armchair, and the footstool, at which I had a hundred times been sentenced to kneel, to ask pardon for offences by me uncommitted."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unmitigable]] | adjective | **1.** Incapable of being mitigated. | *"In academic literature, unmitigable designates incapable of being mitigated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmitigated]] | adjective | **1.** Not diminished or moderated in intensity or severity; sometimes used as an intensifier. | *"What! bear her in hand until they come to take hands, and then, with public accusation, uncovered slander, unmitigated rancour,—O God, that I were a man!"* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · MIT
  </div>
</div>
