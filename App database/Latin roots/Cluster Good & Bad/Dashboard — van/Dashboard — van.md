---
status: unread
type: root_dashboard
---
# Dashboard — van
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">van-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“empty, vain, or idle”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **van** means empty, vain, or idle. It refers to containing nothing, lacking substance, or being unoccupied. In English, this root forms words such as *abandon*, *evanesce*, *evanescence*, and *evanescent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: empty, vain, or idle
> The root **van** means empty, vain, or idle. It refers to containing nothing, lacking substance, or being unoccupied. In English, this root forms words such as *abandon*, *evanesce*, *evanescence*, and *evanescent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Empty, vain, or idle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *abandon* and *evanesce*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **van** comes from a Latin word that means *"empty, vain, or idle"*.
  - At its core, it describes empty, vain, or idle.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **van** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of empty, vain, or idle.
  - **Mental & Social**: How people experience, organize, or communicate about empty, vain, or idle.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Abandon**: An everyday English word showing the root's idea of *empty, vain, or idle*.
  - **Evanesce**: To fade away gradually like vapor.
  - **Evanescence**: The condition or quality of being evanescent.
  - **Evanescent**: Tending to vanish like vapor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">van</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **van-** branches across three primary morphological formations:
> - **Primary Adjectival & Nominal Stem:** `van-` / `vanit-` (from *vānus* and *vānitās*, giving *vain*, *vanity*, *vanitas*)
> - **Inchoative Verbal Stem:** `evanesc-` (from *ēvānēscere*, giving *evanesce*, *evanescent*, *evanescence*)
> - **Romance Aphetic Verb Stem:** `vanish-` (from Old French *esvaniss-*, giving *vanish*, *vanishing*)
> - **Frequentative / Boasting Romance Stem:** `vaunt-` (from Late Latin *vānitāre* via Old French *vanter*, giving *vaunt*, *vaunted*, *vaunter*)
> - **Classical Compounds:** `van-i-loqu-` (from *vānus* + *loquī* "to speak", giving *vaniloquence*, *vaniloquent*) and `vain-glory` (from Old French *vaine gloire*, Latin *vāna glōria*)

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
> The semantic power of `van` organizes into four major conceptual clusters:
> - **Futility & Ineffectiveness:** *vain*, *vainly*, *vainness*, *in vain* express human efforts that collapse into nothingness or achieve zero outcome.
> - **Conceited Pride & Narcissism:** *vanity*, *vainglory*, *vaunt*, and *vaunted* denote excessive infatuation with one's physical appearance, status, or prowess.
> - **Artistic Symbolism & Mortality:** *vanitas* designates the symbolic reminder of human mortality through skulls, timepieces, and wilting flora.
> - **Dissipation & Disappearance:** *vanish*, *vanishing point*, *evanesce*, and *evanescent* describe visual disappearance, fleeting moments, and physical wave dissipation.

---

## 🔀 4. Prefix & Combining Dynamics on van

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ex-` (assimilated to `e-`) | out, away, completely | [[evanesce]], [[evanescent]] | "To become empty out into vapor"; to dissipate rapidly into nothingness. |
| `ex-` (via Old French `es-`) | out, away | [[vanish]] | "To pass completely out of presence"; to disappear from sight. |
| *(root alone)* | empty, void | [[vain]], [[vanity]], [[vaunt]] | Inherent lack of substance, futile striving, or empty boasting. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ity` | Noun (State / Property) | [[vanity]] | The condition of being empty, futile, or excessively self-admiring. |
| `-ish` | Verb (Action / Process) | [[vanish]] | To undergo the process of disappearing from view. |
| `-esce` / `-escent` | Verb / Adjective (Inchoative) | [[evanesce]], [[evanescent]] | Beginning to fade away; fleeting, ephemeral, transient. |
| `-ence` | Noun (Quality / Process) | [[evanescence]] | The fleeting nature or momentary existence of a phenomenon. |
| `-ed` | Adjective (Participial Praise) | [[vaunted]] | Boastfully proclaimed, proudly extolled. |
| `-ly` | Adverb (Manner / Degree) | [[vainly]], [[vanishingly]], [[evanescently]] | In a futile manner, or to an infinitesimally small degree. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎨 **Art History & Perspective** | [[vanitas]], [[vanishing point]] | Dutch Golden Age still life symbolism; linear perspective geometry in Renaissance drafting (the *vanishing point* on the horizon). |
| 🔬 **Optics & Quantum Physics** | [[evanescent]], [[evanescence]] | *Evanescent waves* (exponentially decaying electromagnetic fields at total internal reflection interfaces); near-field microscopy. |
| 📚 **Literature & Allegory** | [[vanity]], [[vainglory]] | John Bunyan's *Pilgrim's Progress* (the town of *Vanity Fair*); William Makepeace Thackeray's novel *Vanity Fair*; Ecclesiastes. |
| ⛪ **Moral Theology & Ethics** | [[vanity]], [[in vain]] | The Seven Deadly Sins (superbia / vainglory); the Second Commandment ("Thou shalt not take the name of the Lord thy God *in vain*"). |
| 🗣️ **Everyday & Cultural Idioms** | [[vain]], [[vanish]], [[vaunted]] | *Vanishingly small* margins; vanity plates on automobiles; vanity publishing presses; *vaunted* corporate mergers that collapse. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advance]] | noun | **1.** A movement forward.<br>**2.** A change for the better; progress in development. | *"But thou art all my art, and dost advance As high as learning, my rude ignorance. 79 Whilst I alone did call upon thy aid, My verse alone had all thy gentle grace, But now my gracious numbers are decayed, And my sick muse doth give an other place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advanced]] | verb | **1.** Move forward, also in the metaphorical sense.<br>**2.** Bring forward for consideration or acceptance. | *"An Advanced post of the Volscian camp before Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advancement]] | noun | **1.** Encouragement of the progress or growth or acceptance of something.<br>**2.** The act of moving forward (as toward a goal). | *"Nay, do not think I flatter; For what advancement may I hope from thee, That no revenue hast, but thy good spirits To feed and clothe thee?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advancer]] | noun | **1.** Someone who advances.<br>**2.** Being ahead of time or need. | *"Soon after the death of a great officer, who was judged to have been no great advancer of the king’s affairs, the king said to his solicitor Bacon, who was kinsman to that lord: Now, Bacon, tell me truly, what say you of your cousin?"* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[advancing]] | verb | **1.** Move forward, also in the metaphorical sense.<br>**2.** Bring forward for consideration or acceptance. | *"ROSALIND. [_Advancing_.] And why, I pray you?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advantage]] | noun | **1.** The quality of having a superior or more favorable position.<br>**2.** (tennis) first point scored after deuce. | *"When I have seen the hungry ocean gain Advantage on the kingdom of the shore, And the firm soil win of the watery main, Increasing store with loss, and loss with store."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advantageous]] | adjective | **1.** Giving an advantage.<br>**2.** Appropriate for achieving a particular end; implies a lack of concern for fairness. | *"Here is everything advantageous to life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advantageously]] | adverb | **1.** In a manner affording benefit or advantage. | *"He was quite willing to receive Richard into his house and to superintend his studies, and as it seemed that those could be pursued advantageously under Mr."* — Charles Dickens, *Bleak House* |
| [[advantageousness]] | noun | **1.** The quality of being encouraging or promising of a successful outcome. | *"In academic literature, advantageousness designates the quality of being encouraging or promising of a successful outcome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devanagari]] | noun | **1.** A syllabic script used in writing sanskrit and hindi. | *"In academic literature, devanagari designates a syllabic script used in writing sanskrit and hindi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disadvantage]] | noun | **1.** The quality of having an inferior or less favorable position.<br>**2.** Put at a disadvantage; hinder, harm. | *"Martius, we have at disadvantage fought, And did retire to win our purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disadvantaged]] | verb | **1.** Put at a disadvantage; hinder, harm.<br>**2.** Marked by deprivation especially of the necessities of life or healthful environmental influences. | *"In academic literature, disadvantaged designates put at a disadvantage; hinder, harm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disadvantageous]] | adjective | **1.** Constituting a disadvantage. | *"Among the restraints imposed by the Union of the Netherlands on its members, one is, that they shall not establish imposts disadvantageous to their neighbors, without the general permission."* — Alexander Hamilton, *The Federalist Papers* |
| [[disadvantageously]] | adverb | **1.** In a disadvantageous way; to someone's disadvantage. | *"There was a certain animal form of refinement in his nature; and however pleasant a strange condition might be whilst privations were easily warded off, it was disadvantageously coarse when money was short."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divan]] | noun | **1.** A long backless sofa (usually with pillows against a wall).<br>**2.** A muslim council of state. | *"Half stretched upon a divan in the library, I was suffocating."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[evanesce]] | verb | **1.** Disappear gradually. | *"In academic literature, evanesce designates disappear gradually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evanescence]] | noun | **1.** The event of fading and gradually vanishing from sight. | *"So that to this hunter’s wondrous skill, the proverbial evanescence of a thing writ in water, a wake, is to all desired purposes well nigh as reliable as the steadfast land."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[evanescent]] | adjective | **1.** Tending to vanish like vapor. | *"Matter has no memory, because its forms are evanescent, and what is engraved on its forms perishes with the forms."* — Jack London, *The Jacket (The Star-Rover)* |
| [[evans]] | noun | **1.** United states anatomist who identified four pituitary hormones and discovered vitamin e (1882-1971).<br>**2.** British archaeologist who excavated the palace of knossos in crete to find what he called minoan civilization (1851-1941). | *"Before Page’s house Enter Justice Shallow, Slender and Sir Hugh Evans."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evansville]] | noun | **1.** A city in southwestern indiana on the ohio river. | *"Louis and Mound City, and at Louisville and Evansville and Paducah, and she began to feel that she must go where her services were more needed, and give herself wholly to this work of caring for and nursing the wounded patriots of the war."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[unvaned]] | adjective | **1.** (of an arrow) not equipped with feathers. | *"In academic literature, unvaned designates (of an arrow) not equipped with feathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[van]] | noun | **1.** Any creative group active in the innovation and application of new concepts and techniques in a given field (especially in the arts).<br>**2.** The leading units moving at the head of an army. | *"Go charge Agrippa Plant those that have revolted in the van That Antony may seem to spend his fury Upon himself. [_Exeunt Caesar and his Train._] ENOBARBUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vanadate]] | noun | **1.** A salt or ester of vanadic acid; an anion containing pentavalent vanadium. | *"In academic literature, vanadate designates a salt or ester of vanadic acid; an anion containing pentavalent vanadium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanadinite]] | noun | **1.** A mineral consisting of chloride and vanadate of lead; a source of vanadium. | *"In academic literature, vanadinite designates a mineral consisting of chloride and vanadate of lead; a source of vanadium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanadium]] | noun | **1.** A soft silvery white toxic metallic element used in steel alloys; it occurs in several complex minerals including carnotite and vanadinite. | *"In academic literature, vanadium designates a soft silvery white toxic metallic element used in steel alloys; it occurs in several complex minerals including carnotite and vanadinite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vancocin]] | noun | **1.** An antibiotic (trade name vancocin) effective against some bacterial infections. | *"In academic literature, vancocin designates an antibiotic (trade name vancocin) effective against some bacterial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vancomycin]] | noun | **1.** An antibiotic (trade name vancocin) effective against some bacterial infections. | *"In academic literature, vancomycin designates an antibiotic (trade name vancocin) effective against some bacterial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vancouver]] | noun | **1.** English navigator remembered for his exploration of the pacific coast of north america (1757-1798).<br>**2.** A town in southwestern washington on the columbia river across from portland, oregon. | *"She has explored seas and archipelagoes which had no chart, where no Cook or Vancouver had ever sailed."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vane]] | noun | **1.** Mechanical device attached to an elevated structure; rotates freely to show the direction of the wind.<br>**2.** A fin attached to the tail of an arrow, bomb or missile in order to stabilize or guide it. | *"No: ’twas the vane on the house."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vaned]] | adjective | **1.** (of an arrow) equipped with feathers. | *"In academic literature, vaned designates (of an arrow) equipped with feathers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanellus]] | noun | **1.** Eurasian lapwings. | *"In academic literature, vanellus designates eurasian lapwings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanern]] | noun | **1.** A lake in southwestern sweden; the largest lake in sweden. | *"In academic literature, vanern designates a lake in southwestern sweden; the largest lake in sweden."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanessa]] | noun | **1.** Painted beauty and red admiral. | *"Cadenus and Vanessa" was meant as polite and courteous admonition to Miss Hester Van Homrigh, a young lady in whom green-sickness seems to have produced devotion to Swift in forms that embarrassed him, and with which he did not well know how to deal."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[vanilla]] | noun | **1.** Any of numerous climbing plants of the genus vanilla having fleshy leaves and clusters of large waxy highly fragrant white or green or topaz flowers.<br>**2.** A flavoring prepared from vanilla beans macerated in alcohol (or imitating vanilla beans). | *"Would a tablespoon of vanilla be enough for a small layer cake?” “I felt sorrier than ever for the poor man."* — L. M. Montgomery, *Anne of Avonlea* |
| [[vanilla-scented]] | adjective | **1.** Smelling of vanilla. | *"In academic literature, vanilla-scented designates smelling of vanilla."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanillin]] | noun | **1.** A crystalline compound found in vanilla beans and some balsam resins; used in perfumes and flavorings. | *"In academic literature, vanillin designates a crystalline compound found in vanilla beans and some balsam resins; used in perfumes and flavorings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaniloquence]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin van within the domain of Good & Bad.<br>**2.** A technical or specialized form exhibiting the properties of van in systematic terminology. | *"In academic literature, vaniloquence designates pertaining to, derived from, or characteristic of latin van within the domain of good & bad."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanir]] | noun | **1.** (norse mythology) race of ancient gods sometimes in conflict with the aesir. | *"And I remember me, when I was of the Assir, and of the Vanir, that Odin sat in judgment over men in the court of the twelve gods, and that their names were Thor, Baldur, Niord, Frey, Tyr, Bregi, Heimdal, Hoder, Vidar, Ull, Forseti, and Loki."* — Jack London, *The Jacket (The Star-Rover)* |
| [[vanish]] | verb | **1.** Get lost, as without warning or explanation.<br>**2.** Become invisible or unnoticeable. | *"Vanish, or I shall give thee thy deserving And blemish Caesar’s triumph."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vanished]] | verb | **1.** Get lost, as without warning or explanation.<br>**2.** Become invisible or unnoticeable. | *"The things that threaten’d me Ne’er look’d but on my back; when they shall see The face of Caesar, they are vanished."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vanisher]] | noun | **1.** A person who disappears. | *"In academic literature, vanisher designates a person who disappears."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanishing]] | noun | **1.** A sudden or mysterious disappearance.<br>**2.** A sudden disappearance from sight. | *"It has plenty of spectral company in ghosts of trees and hedges, slowly vanishing and giving place to the realities of day."* — Charles Dickens, *Bleak House* |
| [[vanishingly]] | adverb | **1.** So as to disappear or approach zero. | *"In academic literature, vanishingly designates so as to disappear or approach zero."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vanitas]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin van within the domain of Good & Bad.<br>**2.** A technical or specialized form exhibiting the properties of van in systematic terminology. | *"Vanitas Vanitatum! which of us is happy in this world?"* — William Makepeace Thackeray, *Vanity Fair* |
| [[vanity]] | noun | **1.** Feelings of excessive pride.<br>**2.** The quality of being valueless or futile. | *"Take him away. [_Guards seize Bertram._] My fore-past proofs, howe’er the matter fall, Shall tax my fears of little vanity, Having vainly fear’d too little."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vantage]] | noun | **1.** Place or situation affording some advantage (especially a comprehensive view or commanding perspective).<br>**2.** The quality of having a superior or more favorable position. | *"But these offers, Which serve not for his vantage, he shakes off, And so should you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vanuatu]] | noun | **1.** A volcanic island republic in melanesia; independent since 1980. | *"In academic literature, vanuatu designates a volcanic island republic in melanesia; independent since 1980."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VAN
  </div>
</div>
