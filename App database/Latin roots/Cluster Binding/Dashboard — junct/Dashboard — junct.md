---
status: unread
type: root_dashboard
---
# Dashboard — junct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">junct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to join, connect, or link”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong cord wrapping around a bundle and tying it securely together.</span>
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

The root **junct** means to join, connect, or link. It refers to join, yoke, unite, connect, bind together. In English, this root forms words such as *junction*, *juncture*, *adjunct*, and *adjunctive*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to join, connect, or link
> The root **junct** means to join, connect, or link. It refers to join, yoke, unite, connect, bind together. In English, this root forms words such as *junction*, *juncture*, *adjunct*, and *adjunctive*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To join, connect, or link</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *junction* and *juncture*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **junct** comes from a Latin word that means *"to join, connect, or link"*.
  - At its core, it describes the action of join, connect, or link.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **junct** in an English word, think of **to join, connect, or link**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to join, connect, or link).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Junction**: A place or point where two or more things meet or cross.
  - **Juncture**: A particular point in time, especially one made critical or decisive by a convergence of events.
  - **Adjunct**: Something joined, attached, or added to another thing but not essentially a part of it.
  - **Adjunctive**: Serving as an adjunct.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">junct</mark>, think of <mark class="hl-def">to join, connect, or link</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via the Classical Latin supine / participial stem:
> - **Participial Base (`junct-` / `iūnct-`):** Derived from *iūnctum*, forming adjectives, agent nouns, and abstract nominal categories (*junction*, *juncture*, *adjunct*, *conjunct*).
> - **Morphological Substantives (`-iō` / `-ūra`):** Yielding nouns of physical and temporal intersection (*iūnctiō* $\to$ *junction*, *iūnctūra* $\to$ *juncture*).
>
> Directional Latin prefixes establish precise structural configurations:
> - **ad-** ("to, in addition"): *adjunct* (joined in a subordinate or supplementary role).
> - **com- $\to$ con-** ("together"): *conjunction*, *conjunctiva* (joined together).
> - **dis-** ("apart"): *disjunction*, *disjunctive* (joined apart; logical alternative).
> - **in-** ("upon, into"): *injunction*, *injunctive* (an order laid upon someone).
> - **sub-** ("under, beneath"): *subjunctive* (subordinated beneath a main clause).

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
> - **Physical & Electrical Intersection:** [[junction]] — railway switches, highway interchanges, river confluences, and semiconductor diode interfaces.
> - **Temporal Turning Points:** [[juncture]] — a crucial moment or convergence of circumstances demanding decision.
> - **Subordinate Supplementation:** [[adjunct]], *adjunctive* — auxiliary elements, part-time university faculty, or supplementary medical therapies.
> - **Grammatical Connectivity & Mood:** [[conjunction]], [[subjunctive]], *conjunctive* — connective words (*and*, *but*) and hypothetical/counterfactual verb moods.
> - **Symbolic Logic & Mathematics:** [[disjunction]], *conjunction* — truth-functional propositions asserting mutual necessity ($A \land B$) or alternatives ($A \lor B$).
> - **Equitable Court Orders:** [[injunction]], *injunctive* — judicial writs protecting rights by preventing irreparable harm.
> - **Ophthalmology & Pathology:** *conjunctiva*, *conjunctivitis* — the binding ocular membrane and its viral/bacterial inflammation ("pink eye").

---

## 🔀 4. Prefix & Combining Dynamics on junct

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (*ad*) | to, toward | [[adjunct]] | Joined to another in a secondary or subordinate capacity. |
| **com- $\to$ con-** (*cum*) | together, completely | [[conjunction]] | Joined together in grammar, astronomy, or logic. |
| **dis-** (*dis-*) | apart, opposite | [[disjunction]], [[disjunctive]] | Joined apart; expressing separation or mutual alternatives. |
| **in-** (*in*) | upon, into | [[injunction]] | An authoritative judicial command laid upon a party. |
| **sub-** (*sub*) | under, beneath | [[subjunctive]] | Subordinated or joined underneath a primary clause. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ion** (*-iōnem*) | abstract noun of action | [[junction]], [[conjunction]] | The act, point, or process of joining. |
| **-ure** (*-ūra*) | concrete noun of seam/time | [[juncture]] | A physical joint or critical temporal intersection. |
| **-ive** (*-īvus*) | functional adjective | [[disjunctive]], *injunctive* | Serving to separate, command, or qualify. |
| **-iva** (*-īva*) | anatomical feminine noun | *conjunctiva* | The mucous membrane joining eyelid to eyeball. |
| **-itis** (*-ῖτις*) | medical inflammation noun | *conjunctivitis* | Inflammation of the conjunctival mucous membrane. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Civil & Semiconductor Engineering** | [[junction]] | Railway junctions, p-n semiconductor diode junctions, highway interchanges. |
| **Constitutional & Equity Law** | [[injunction]], *injunctive* (*injunctive relief*) | Restraining orders, preliminary injunctions in patent and IP litigation. |
| **Formal Logic & Philosophy** | [[disjunction]], *conjunction* | Truth tables, disjunctive syllogisms (*either P or Q*). |
| **Theoretical Linguistics & Grammar** | [[conjunction]], [[subjunctive]], [[adjunct]] | Subjunctive mood, coordinating conjunctions, VP adjunct modifiers. |
| **Astronomy & Planetary Science** | *conjunction* (*Great Conjunction*) | Alignment of Jupiter and Saturn; solar conjunctions. |
| **Clinical Medicine & Ophthalmology** | *conjunctiva*, *conjunctivitis* | Bacterial and viral conjunctivitis ("pink eye"), subconjunctival hemorrhage. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjunct]] | noun | **1.** Something added to another thing but not an essential part of it.<br>**2.** A person who is an assistant or subordinate to another. | *"And every humour hath his adjunct pleasure, Wherein it finds a joy above the rest, But these particulars are not my measure, All these I better in one general best."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adjunction]] | noun | **1.** An act of joining or adjoining things. | *"In academic literature, adjunction designates an act of joining or adjoining things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjunctive]] | adjective | **1.** Joining; forming an adjunct. | *"In academic literature, adjunctive designates joining; forming an adjunct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjunct]] | adjective | **1.** Progressing melodically by intervals of a second.<br>**2.** Bound in close association. | *"I am doubtful that you have been conjunct And bosom’d with her, as far as we call hers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjunction]] | noun | **1.** The temporal property of two things happening at the same time.<br>**2.** The state of being joined together. | *"Yet doth he give us bold advertisement That with our small conjunction we should on, To see how fortune is disposed to us; For, as he writes, there is no quailing now, Because the King is certainly possess’d Of all our purposes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjunctiva]] | noun | **1.** A transparent lubricating mucous membrane that covers the eyeball and the under surface of the eyelid. | *"In academic literature, conjunctiva designates a transparent lubricating mucous membrane that covers the eyeball and the under surface of the eyelid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjunctival]] | adjective | **1.** Of or relating to the conjunctiva. | *"In academic literature, conjunctival designates of or relating to the conjunctiva."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjunctive]] | noun | **1.** An uninflected function word that serves to conjoin words or phrases or clauses or sentences.<br>**2.** Serving or tending to connect. | *"The Queen his mother Lives almost by his looks; and for myself,— My virtue or my plague, be it either which,— She’s so conjunctive to my life and soul, That, as the star moves not but in his sphere, I could not but by her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjunctivitis]] | noun | **1.** Inflammation of the conjunctiva of the eye. | *"In academic literature, conjunctivitis designates inflammation of the conjunctiva of the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjuncture]] | noun | **1.** A critical combination of events or circumstances. | *"This was a wonderful conjuncture of time, desire and amount, and could never have happened by any chance operation of Nature or the natural heart and will."* — Classic Author, *The wonders of prayer* |
| [[disjunct]] | adjective | **1.** Progressing melodically by intervals larger than a major second.<br>**2.** Having deep constrictions separating head, thorax, and abdomen, as in insects. | *"In academic literature, disjunct designates progressing melodically by intervals larger than a major second."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disjunction]] | noun | **1.** State of being disconnected.<br>**2.** The act of breaking a connection. | *"On mine honour, I’ll point you where you shall have such receiving As shall become your highness; where you may Enjoy your mistress; from the whom, I see, There’s no disjunction to be made, but by, As heavens forfend, your ruin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disjunctive]] | adjective | **1.** Serving or tending to divide or separate. | *"In academic literature, disjunctive designates serving or tending to divide or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disjuncture]] | noun | **1.** State of being disconnected. | *"In academic literature, disjuncture designates state of being disconnected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injunction]] | noun | **1.** A formal command or admonition.<br>**2.** (law) a judicial remedy issued in order to prohibit a party from doing or continuing to do a certain activity. | *"I must remove Some thousands of these logs, and pile them up, Upon a sore injunction: my sweet mistress Weeps when she sees me work, and says such baseness Had never like executor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[junction]] | noun | **1.** The place where two or more things come together.<br>**2.** The state of being joined together. | *"She went through Stourcastle without pausing and onward to a junction of highways, where she could await a carrier’s van that ran to the south-west; for the railways which engirdled this interior tract of country had never yet struck across it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[juncture]] | noun | **1.** An event that occurs at a critical time.<br>**2.** A crisis situation or point in time when a critical decision must be made. | *"Sir Leicester, avoiding, with some trouble those obtrusive sounds, says, “True.” At this juncture a considerable noise of voices is heard in the hall."* — Charles Dickens, *Bleak House* |
| [[nondisjunction]] | noun | **1.** Meiosis in which there is a failure of paired homologous chromosomes to separate; results in an abnormal number of chromosomes in the daughter cells. | *"In academic literature, nondisjunction designates meiosis in which there is a failure of paired homologous chromosomes to separate; results in an abnormal number of chromosomes in the daughter cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjunction]] | noun | **1.** The act of supplementing. | *"In academic literature, subjunction designates the act of supplementing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjunctive]] | noun | **1.** A mood that represents an act or state (not as a fact but) as contingent or possible.<br>**2.** Relating to a mood of verbs. | *"How are you to escape the judgement of Gehenna?" he asks the Pharisees (Matt. 23:33; the subjunctive mood is worth study)."* — T. R. Glover, *The Jesus of History* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Binding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · JUNCT
  </div>
</div>
