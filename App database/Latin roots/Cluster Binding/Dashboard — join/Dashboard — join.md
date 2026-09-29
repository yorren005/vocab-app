---
status: unread
type: root_dashboard
---
# Dashboard — join
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">join-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to join”</span>
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

The root **join** means to join. It refers to bring together into contact, unite, yoke, couple. In English, this root forms words such as *harness*, *joint*, *joiner*, and *joinery*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to join
> The root **join** means to join. It refers to bring together into contact, unite, yoke, couple. In English, this root forms words such as *harness*, *joint*, *joiner*, and *joinery*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To join</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong cord wrapping around a bundle and tying it securely together.</mark>
> - **Everyday Connection**: Think of familiar words like *harness* and *joint*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **join** comes from a Latin word that means *"to join"*.
  - At its core, it describes the action of join.

- **The Big Picture Idea**:
  - Picture a strong cord wrapping around a bundle and tying it securely together.
  - Whenever you see **join** in an English word, think of **to join**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to join).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Harness**: An everyday English word showing the root's idea of *to join*.
  - **Joint**: The point of contact or articulation between two bones in an animal body.
  - **Joiner**: A skilled craftsman who constructs the wooden components of a building, such as stairs, window sashes, doors, and interior fittings.
  - **Joinery**: The art, craft, or business of a joiner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">join</mark>, think of <mark class="hl-def">to join</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two Anglo-French bases:
> - **Infinitive / Present Stem (`join-`):** Underlies operative verbs and agent nouns (*join*, *joiner*, *adjoin*, *conjoin*, *disjoin*, *enjoin*, *rejoin*, *subjoin*).
> - **Past Participle Stem (`joint-`):** Underlies anatomical nouns, legal adjectives, and state descriptions (*joint*, *jointly*, *jointure*, *disjoint*, *disjointed*).
>
> Prefixes modify the physical or legal vector:
> - **ad-** ("to"): *adjoin* (lie adjacent to).
> - **com- $\to$ con-** ("together"): *conjoin* (unite for a purpose).
> - **dis-** ("apart"): *disjoin*, *disjoint* (sever at the joints).
> - **in- $\to$ en-** ("in, upon"): *enjoin* (impose a legal duty upon).
> - **re-** ("back, again"): *rejoin*, *rejoinder* (reply to an assertion).
> - **sub-** ("under, beneath"): *subjoin* (append at the bottom).

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
> - **Carpentry & Structural Craft:** [[joiner]], *joinery* — woodworking craft of framing doors, cabinetry, stairs, and dovetailed furniture.
> - **Skeletal Anatomy & Rheumatology:** [[joint]] — synovial articulations (hip, knee, shoulder) connecting the skeleton.
> - **Property Boundaries & Topography:** [[adjoin]], *adjoining* — real estate plots or rooms sharing a common contiguous boundary.
> - **Judicial Equity & Command:** [[enjoin]] — imposing an authoritative court order commanding or prohibiting an action.
> - **Forensic Dialectic & Wit:** [[rejoinder]], *rejoin* — a rapid, witty, or legally structured rebuttal answering an opponent.
> - **Fragmentation & Disconnection:** [[disjoint]], *disjointed* — knocked out of socket; disorganized or rambling narrative structure.
> - **Feudal Property Law:** *jointure*, *joint tenancy* — co-ownership of real estate with right of survivorship.

---

## 🔀 4. Prefix & Combining Dynamics on join

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (*ad*) | to, toward, near | [[adjoin]] | To lie contiguous to; to touch a common border. |
| **con-** (*cum*) | together, mutually | [[conjoin]] | To unite or combine into a single entity. |
| **dis-** (*dis-*) | apart, away | [[disjoin]], [[disjoint]] | To separate from union; to dislocate at a joint. |
| **en- / in-** (*in*) | into, upon | [[enjoin]] | To lay an authoritative injunction or command upon. |
| **re-** (*re-*) | back, again | [[rejoinder]], *rejoin* | An answer that joins back to the prior statement. |
| **sub-** (*sub*) | under, after | *subjoin* | To add or append at the end of a writing. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-er** | personal agent noun | [[joiner]] | A craftsman who builds wooden joints and fittings. |
| **-ry** | art or trade noun | *joinery* | The craft or trade of a joiner. |
| **-ure** (*-ūra*) | legal / concrete noun | *jointure* | An estate settled on a wife upon marriage. |
| **-ed** | participial adjective | *disjointed* | Dislocated; lacking coherence or connection. |
| **-der** (*-dre*) | French infinitive noun | [[rejoinder]] | A formal reply or sharp retort. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Civil Procedure & Equity Law** | [[enjoin]], [[rejoinder]], *jointure* | Injunctions, equity pleadings, marital property settlements. |
| **Human Anatomy & Orthopedics** | [[joint]], *disjointed* | Synovial joints, osteoarthritis, joint replacement surgery. |
| **Architecture & Woodworking** | [[joiner]], *joinery*, [[adjoin]] | Mortise and tenon joinery, adjoining architectural wings. |
| **Mathematics & Set Theory** | [[disjoint]] (*disjoint sets*) | Sets whose intersection is the empty set. |
| **Debate & Public Rhetoric** | [[rejoinder]] | Sharp parliamentary retorts and debater rebuttals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjoin]] | verb | **1.** Lie adjacent to another or share a boundary.<br>**2.** Be in direct physical contact with; make contact. | *"It is a massy wheel Fix’d on the summit of the highest mount, To whose huge spokes ten thousand lesser things Are mortis’d and adjoin’d; which when it falls, Each small annexment, petty consequence, Attends the boist’rous ruin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjoin]] | verb | **1.** Make contact or come together.<br>**2.** Take in marriage. | *"Look you how pale he glares, His form and cause conjoin’d, preaching to stones, Would make them capable.—Do not look upon me, Lest with this piteous action you convert My stern effects."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjoined]] | verb | **1.** Make contact or come together.<br>**2.** Take in marriage. | *"If either of you know any inward impediment, why you should not be conjoined, I charge you, on your souls, to utter it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjoint]] | adjective | **1.** Consisting of two or more associated entities; ; - j.k.fairbank. | *"In academic literature, conjoint designates consisting of two or more associated entities; ; - j.k.fairbank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjointly]] | adverb | **1.** In conjunction with; combined. | *"When these prodigies Do so conjointly meet, let not men say, “These are their reasons; they are natural”; For I believe, they are portentous things Unto the climate that they point upon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disjoin]] | verb | **1.** Make disjoint, separated, or disconnected; undo the joining of.<br>**2.** Become separated, disconnected or disjoint. | *"I may disjoin my hand, but not my faith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disjoined]] | verb | **1.** Make disjoint, separated, or disconnected; undo the joining of.<br>**2.** Become separated, disconnected or disjoint. | *"The last link between the midsummer customs of gathering the mistletoe and lighting the bonfires is supplied by Balder's myth, which can hardly be disjoined from the customs in question."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[disjoint]] | verb | **1.** Part; cease or break association with.<br>**2.** Separate at the joints. | *"But let the frame of things disjoint, Both the worlds suffer, Ere we will eat our meal in fear, and sleep In the affliction of these terrible dreams That shake us nightly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disjointed]] | verb | **1.** Part; cease or break association with.<br>**2.** Separate at the joints. | *"She hastily slipped on her clothes, stumped down the disjointed staircase with its hundred creaks, ran to Coggan’s, the nearest house, and raised an alarm."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disjointedly]] | adverb | **1.** In a disjointed manner. | *"In academic literature, disjointedly designates in a disjointed manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disjointedness]] | noun | **1.** Lacking order or coherence. | *"In academic literature, disjointedness designates lacking order or coherence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enjoin]] | verb | **1.** Issue an injunction.<br>**2.** Give instructions to or direct somebody to do something with authority. | *"Come, pilgrim, I will bring you Where you shall host; of enjoin’d penitents There’s four or five, to great Saint Jaques bound, Already at my house."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enjoining]] | noun | **1.** (law) a judicial remedy issued in order to prohibit a party from doing or continuing to do a certain activity.<br>**2.** Issue an injunction. | *"They therefore thrust him and his pig into the rubbish heap and covered them over with the taro peelings, enjoining him to keep perfectly still, and watch till he should see eight heavy breakers roll in successively from the sea."* — Classic Author, *Hawaiian folk tales* |
| [[enjoinment]] | noun | **1.** (law) a judicial remedy issued in order to prohibit a party from doing or continuing to do a certain activity. | *"In academic literature, enjoinment designates (law) a judicial remedy issued in order to prohibit a party from doing or continuing to do a certain activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[join]] | noun | **1.** The shape or manner in which things come together and a connection is made.<br>**2.** A set containing all and only the members of two or more given sets. | *"The mightiest space in fortune nature brings To join like likes, and kiss like native things."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[joined]] | verb | **1.** Become part of; become a member of a group or organization.<br>**2.** Cause to become joined or linked. | *"It is spoke freely out of many mouths— How probable I do not know—that Martius, Joined with Aufidius, leads a power ’gainst Rome And vows revenge as spacious as between The young’st and oldest thing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[joiner]] | noun | **1.** A person who likes to join groups.<br>**2.** A woodworker whose work involves making things by joining pieces of wood. | *"You, Pyramus’ father; myself, Thisbe’s father; Snug, the joiner, you, the lion’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[joinery]] | noun | **1.** Fine woodwork done by a joiner.<br>**2.** The craft of a joiner. | *"In academic literature, joinery designates fine woodwork done by a joiner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[joining]] | noun | **1.** The act of bringing two things into contact (especially for communication).<br>**2.** Become part of; become a member of a group or organization. | *"Both parties will only gain in respect by joining." "I do not believe that people in the city will be interested in what the three boys are doing," said Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[joint]] | noun | **1.** (anatomy) the point of connection between two bones or elements of a skeleton (especially if it allows motion).<br>**2.** A disreputable place of entertainment. | *"What might be toward, that this sweaty haste Doth make the night joint-labourer with the day: Who is’t that can inform me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jointed]] | verb | **1.** Fit as if by joints.<br>**2.** Provide with a joint. | *"O well-knit Samson, strong-jointed Samson!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jointer]] | noun | **1.** A long carpenter's plane used to shape the edges of boards so they will fit together. | *"In academic literature, jointer designates a long carpenter's plane used to shape the edges of boards so they will fit together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jointly]] | adverb | **1.** In collaboration or cooperation.<br>**2.** In conjunction with; combined. | *"The rascal people, thirsting after prey, Join with the traitor, and they jointly swear To spoil the city and your royal court."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jointure]] | noun | **1.** (law) an estate secured to a prospective wife as a marriage settlement in lieu of a dower.<br>**2.** The act of making or becoming a single unit. | *"Ay, of a snail, for though he comes slowly, he carries his house on his head—a better jointure, I think, than you make a woman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jointworm]] | noun | **1.** Larva of chalcid flies injurious to the straw of wheat and other grains. | *"In academic literature, jointworm designates larva of chalcid flies injurious to the straw of wheat and other grains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rejoin]] | verb | **1.** Join again.<br>**2.** Answer back. | *"Carstone is about to rejoin his regiment, perhaps Mr."* — Charles Dickens, *Bleak House* |
| [[rejoinder]] | noun | **1.** A quick reply to a question or remark (especially a witty or critical one).<br>**2.** (law) a pleading made by a defendant in response to the plaintiff's replication. | *"I have come with that sole purpose in view—nothing more.” There was the smallest vein of scorn in her words of rejoinder: “Have you saved yourself?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[subjoin]] | verb | **1.** Add to the end. | *"And will you give yourself the trouble of carrying similar assurances to his creditors in Meryton, of whom I shall subjoin a list, according to his information?"* — Jane Austen, *Pride and Prejudice* |
| [[subjoining]] | noun | **1.** The act of supplementing.<br>**2.** Add to the end. | *"In academic literature, subjoining designates the act of supplementing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surrejoinder]] | noun | **1.** (law) a pleading by the plaintiff in reply to the defendant's rejoinder. | *"In academic literature, surrejoinder designates (law) a pleading by the plaintiff in reply to the defendant's rejoinder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unjointed]] | adjective | **1.** Without joints or jointed segments. | *"This bald unjointed chat of his, my lord, I answered indirectly, as I said, And I beseech you, let not his report Come current for an accusation Betwixt my love and your high Majesty."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · JOIN
  </div>
</div>
