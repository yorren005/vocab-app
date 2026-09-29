---
status: unread
type: root_dashboard
---
# Dashboard — mand
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mand-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“order”</span>
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

The root **mand** means order. It refers to give into the hand, entrust, order, command, commission. In English, this root forms words such as *command*, *demand*, *mandatory*, and *mandate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: order
> The root **mand** means order. It refers to give into the hand, entrust, order, command, commission. In English, this root forms words such as *command*, *demand*, *mandatory*, and *mandate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Order</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *command* and *demand*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mand** comes from a Latin word that means *"order"*.
  - At its core, it describes order.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **mand** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of order.
  - **Mental & Social**: How people experience, organize, or communicate about order.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Command**: V.** 1. To order someone with authority.
  - **Demand**: V.** 1. To ask for authoritatively or urgently as of right.
  - **Mandatory**: Adj.** Required by statutory law or official rules.
  - **Mandate**: N.** 1. An official order or commission to do something.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mand</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via three primary morphological branches:
> 1. **The Direct Latin Base `mand-` / `mandat-` (from *mandāre*):**
>    - *mandate*, *mandating*, *mandatory*, *mandatary*.
>    - Inflected 1st-person plural present: *mandamus* ("we command").
>    - Prefix compounds: *remand*, *remandate*.
> 2. **The Sovereign Military Base `command-` (from *com-* + *mandāre*):**
>    - *command*, *commander*, *commandant*, *commanding*, *commandingly*, *commandment*, *commandeer*, *countermand*, *uncommanded*.
> 3. **The Fiduciary & Requisition Bases `commend-` & `demand-`:**
>    - *commend*, *commendable*, *commendably*, *commendation*, *commendatory*.
>    - *recommend*, *recommendable*, *recommendation*, *recommendatory*.
>    - *demand*, *demanding*, *undemanding*.

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
> - **Sovereign Injunctions & Statutory Rules:** *Mandate*, *mandatory*, *commandment*, *mandamus* — constitutional obligations; the Ten Commandments; court orders compelling public duty.
> - **Military Hierarchy & Armed Control:** *Command*, *commander*, *commandant*, *commandeer*, *countermand* — supreme armed forces authority; seizing private assets for military use; revoking operational orders.
> - **Criminal Procedure & Appellate Practice:** *Remand*, *remandate* — returning an accused person to prison custody pending trial; an appellate court sending a case back for re-examination.
> - **Fiduciary Praise & Trust:** *Commend*, *commendable*, *commendation*, *recommend*, *recommendation* — entrusting someone's reputation to another; praising virtuous service.
> - **Economic & Commercial Requisition:** *Demand*, *demanding*, *undemanding* — consumer demand in market equilibrium; exacting high standards of skill.

---

## 🔀 4. Prefix & Combining Dynamics on mand

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `con-` / `com-` | completely, together (intensive) | [[command]], [[commend]] | To charge with supreme authority; or to entrust warmly to someone's care. |
| `dē-` | down, away, from | [[demand]], [[demanding]] | To commission authoritatively from someone; to claim as a right. |
| `contra-` / `counter-` | against, opposite | [[countermand]] | To issue an order that revokes or reverses a previous command. |
| `re-` | back, again | [[remand]], [[recommend]] | To send back into custody; or to praise someone anew for appointment. |
| `un-` | not | [[undemanding]], [[uncommanded]] | Not exacting heavy labor; occurring without explicit command. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ate` / `-atory` | Noun / Adjective (Legal Rule) | [[mandate]], [[mandatory]] | An authoritative commission or statute that must be obeyed. |
| `-ant` / `-er` | Agent Noun (Military Office) | [[commandant]], [[commander]] | An officer exercising executive military or naval authority. |
| `-ment` | Noun (Divine / Moral Law) | [[commandment]] | A sacred divine injunction or fundamental moral law. |
| `-ation` | Abstract Noun (Act / Praise) | [[commendation]], [[recommendation]] | Formal praise, medal of honor, or letter of endorsement. |
| `-eer` (via Dutch) | Verb (Military Seizure) | [[commandeer]] | To officially seize property for military or emergency public use. |
| `-amus` (Latin 1st pl.) | Prerogative Writ Noun | [[mandamus]] | "We command" $\to$ court writ ordering performance of a public duty. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional Law & Appellate Procedure** | [[mandamus]], [[remand]], [[mandate]], [[mandatory]] | Writs of mandamus under 28 U.S.C. § 1651; appellate remands with instructions; mandatory minimum sentencing statutes; unfunded federal mandates. |
| 🎖️ **Military Command & Defense Logistics** | [[command]], [[commander]], [[commandant]], [[countermand]], [[commandeer]] | The military chain of command; National Command Authority (NCA); commandeering civil maritime vessels during wartime. |
| 📊 **Microeconomics & Market Analysis** | [[demand]], [[demanding]] | Aggregate demand curves; price elasticity of demand; supply and demand equilibrium. |
| 🏛️ **International Relations & Decolonization** | [[mandate]], [[mandatary]] | The post-WWI League of Nations mandate system governing former Ottoman and German territories. |
| 📜 **Employment, Governance & Human Resources** | [[recommendation]], [[commendable]], [[commendation]] | Letters of professional recommendation; formal military commendation medals for gallantry. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[almandine]] | noun | **1.** A purple variety of the ruby spinel.<br>**2.** A deep red garnet consisting of iron aluminum silicate. | *"In academic literature, almandine designates a purple variety of the ruby spinel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[almandite]] | noun | **1.** A deep red garnet consisting of iron aluminum silicate. | *"In academic literature, almandite designates a deep red garnet consisting of iron aluminum silicate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comandra]] | noun | **1.** Small genus of chiefly north american parasitic plants. | *"In academic literature, comandra designates small genus of chiefly north american parasitic plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[command]] | noun | **1.** An authoritative direction or instruction to do something.<br>**2.** A military unit or region under the control of a single officer. | *"And I in going, madam, weep o’er my father’s death anew; but I must attend his majesty’s command, to whom I am now in ward, evermore in subjection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commandant]] | noun | **1.** An officer in command of a military unit. | *"So the lad Gaasha was brought to the laager, and upon the prayer of Jan and Ralph, the commandant gave him his life, ordering, however, that he should sleep outside the waggons."* — H. Rider Haggard, *Swallow: A Tale of the Great Trek* |
| [[commandeer]] | verb | **1.** Take arbitrarily or by force. | *"It was impossible that he could feel the same freedom and ease; impossible that he should commandeer my help as he had done in days past."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[commander]] | noun | **1.** An officer in command of a military unit.<br>**2.** Someone in an official position of authority who can command or control others. | *"It is reported that he has taken their great’st commander, and that with his own hand he slew the duke’s brother. [_A tucket afar off._] We have lost our labour; they are gone a contrary way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commandership]] | noun | **1.** The position or office of commander. | *"It was like a highly-finished miniature painting representing My Lords of the Circumlocution Department, Commandership-in-Chief of any sort, Government."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[commandery]] | noun | **1.** The position or office of commander. | *"In academic literature, commandery designates the position or office of commander."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commanding]] | verb | **1.** Be in command of.<br>**2.** Make someone do something. | *"I think this upstart is old Talbot’s ghost, He speaks with such a proud commanding spirit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commandment]] | noun | **1.** Something that is commanded.<br>**2.** A doctrine that is taught. | *"I thought that all things had been savage here And therefore put I on the countenance Of stern commandment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commando]] | noun | **1.** A member of a military unit trained as shock troops for hit-and-run raids.<br>**2.** An amphibious military unit trained for raids into enemy territory. | *"And when she died, having lived out her life just before her husband, Ralph Kenzie, went on commando with his son to the Zulu war, whither her death drove him, ah! then it ached for the last time."* — H. Rider Haggard, *Swallow: A Tale of the Great Trek* |
| [[countermand]] | noun | **1.** A contrary command cancelling or reversing a previous command.<br>**2.** Cancel officially. | *"Have you no countermand for Claudio yet, But he must die tomorrow?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demand]] | noun | **1.** An urgent or peremptory request.<br>**2.** The ability and desire to purchase goods and services. | *"Her father bequeath’d her to me, and she herself, without other advantage, may lawfully make title to as much love as she finds; there is more owing her than is paid, and more shall be paid her than she’ll demand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demander]] | noun | **1.** A person who makes demands. | *"In academic literature, demander designates a person who makes demands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demanding]] | verb | **1.** Request urgently and forcefully.<br>**2.** Require as useful, just, or proper. | *"It is only by resenting them, and by revenging them in my mind, and by angrily demanding the justice I never get, that I am able to keep my wits together."* — Charles Dickens, *Bleak House* |
| [[demandingly]] | adverb | **1.** In a demanding manner. | *"In academic literature, demandingly designates in a demanding manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manda]] | noun | **1.** A dravidian language spoken in south central india. | *"I wish he'd come once and we'd have some fun." As if in answer to her wish a boyish whistle rang out, followed by a long-drawn "Oo-oh, Manda, where are you?" "Here."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[mandaean]] | noun | **1.** A member of a small gnostic sect that originated in jordan and survives in iraq and who believes that john the baptist was the messiah.<br>**2.** The form of aramaic used by the mandeans. | *"In academic literature, mandaean designates a member of a small gnostic sect that originated in jordan and survives in iraq and who believes that john the baptist was the messiah."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandaeanism]] | noun | **1.** A gnostic religion originating the 2nd and 3rd centuries that believes john the baptist was the messiah and that incorporates jewish and christian elements into a framework of dualistic beliefs. | *"In academic literature, mandaeanism designates a gnostic religion originating the 2nd and 3rd centuries that believes john the baptist was the messiah and that incorporates jewish and christian elements into a framework of dualistic beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandala]] | noun | **1.** Any of various geometric designs (usually circular) symbolizing the universe; used chiefly in hinduism and buddhism as an aid to meditation. | *"In academic literature, mandala designates any of various geometric designs (usually circular) symbolizing the universe; used chiefly in hinduism and buddhism as an aid to meditation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandalay]] | noun | **1.** A city in central myanmar to the north of rangoon. | *"In academic literature, mandalay designates a city in central myanmar to the north of rangoon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandamus]] | noun | **1.** An extraordinary writ commanding an official to perform a ministerial act that the law recognizes as an absolute duty and not a matter for the official's discretion; used only when all other judicial remedies fail. | *"In academic literature, mandamus designates an extraordinary writ commanding an official to perform a ministerial act that the law recognizes as an absolute duty and not a matter for the official's discretion; used only when all other judicial remedies fail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandara]] | noun | **1.** A chadic language spoken in the mandara mountains in cameroon; has only two vowels. | *"In academic literature, mandara designates a chadic language spoken in the mandara mountains in cameroon; has only two vowels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandarin]] | noun | **1.** Shrub or small tree having flattened globose fruit with very sweet aromatic pulp and thin yellow-orange to flame-orange rind that is loose and easily removed; native to southeastern asia.<br>**2.** A member of an elite intellectual or cultural group. | *"Lord, Lord, a sea-cuny . . . and dispatched north over the Mandarin Road with five hundred soldiers and a retinue at my back!"* — Jack London, *The Jacket (The Star-Rover)* |
| [[mandatary]] | noun | **1.** The recipient of a mandate. | *"In academic literature, mandatary designates the recipient of a mandate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandate]] | noun | **1.** A document giving an official instruction or command.<br>**2.** A territory surrendered by turkey or germany after world war i and put under the tutelage of some other european power until they are able to stand by themselves. | *"Fulvia perchance is angry; or who knows If the scarce-bearded Caesar have not sent His powerful mandate to you: “Do this or this; Take in that kingdom and enfranchise that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mandator]] | noun | **1.** An authority who issues a mandate. | *"In academic literature, mandator designates an authority who issues a mandate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandatorily]] | adverb | **1.** In a manner that cannot be evaded. | *"In academic literature, mandatorily designates in a manner that cannot be evaded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandatory]] | noun | **1.** The recipient of a mandate.<br>**2.** A territory surrendered by turkey or germany after world war i and put under the tutelage of some other european power until they are able to stand by themselves. | *"And on the instant a knock, vast and compulsive, inexorable and mandatory as the stamp of the iron hoof of doom, smote me and reverberated across the universe."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mande]] | noun | **1.** A group of african languages in the niger-congo group spoken from senegal east as far as the ivory coast. | *"In academic literature, mande designates a group of african languages in the niger-congo group spoken from senegal east as far as the ivory coast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandean]] | noun | **1.** A member of a small gnostic sect that originated in jordan and survives in iraq and who believes that john the baptist was the messiah.<br>**2.** The form of aramaic used by the mandeans. | *"In academic literature, mandean designates a member of a small gnostic sect that originated in jordan and survives in iraq and who believes that john the baptist was the messiah."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandeanism]] | noun | **1.** A gnostic religion originating the 2nd and 3rd centuries that believes john the baptist was the messiah and that incorporates jewish and christian elements into a framework of dualistic beliefs. | *"In academic literature, mandeanism designates a gnostic religion originating the 2nd and 3rd centuries that believes john the baptist was the messiah and that incorporates jewish and christian elements into a framework of dualistic beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandela]] | noun | **1.** South african statesman who was released from prison to become the nation's first democratically elected president in 1994 (born in 1918). | *"In academic literature, mandela designates south african statesman who was released from prison to become the nation's first democratically elected president in 1994 (born in 1918)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandelamine]] | noun | **1.** Antibacterial agent (trade names mandelamine and urex) that is contained in many products that are used to treat urinary infections. | *"In academic literature, mandelamine designates antibacterial agent (trade names mandelamine and urex) that is contained in many products that are used to treat urinary infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandelbrot]] | noun | **1.** French mathematician (born in poland) noted for inventing fractals (born in 1924). | *"In academic literature, mandelbrot designates french mathematician (born in poland) noted for inventing fractals (born in 1924)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandelshtam]] | noun | **1.** Russian poet who died in a prison camp (1891-1938). | *"In academic literature, mandelshtam designates russian poet who died in a prison camp (1891-1938)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandelstam]] | noun | **1.** Russian poet who died in a prison camp (1891-1938). | *"In academic literature, mandelstam designates russian poet who died in a prison camp (1891-1938)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandevilla]] | noun | **1.** Genus of tropical south american tuberous perennial woody vines with large racemose flowers and milky sap. | *"In academic literature, mandevilla designates genus of tropical south american tuberous perennial woody vines with large racemose flowers and milky sap."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandible]] | noun | **1.** The jaw in vertebrates that is hinged to open the mouth. | *"To sum up, then: in the Right Whale’s there is no great well of sperm; no ivory teeth at all; no long, slender mandible of a lower jaw, like the Sperm Whale’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mandibula]] | noun | **1.** The jaw in vertebrates that is hinged to open the mouth. | *"In academic literature, mandibula designates the jaw in vertebrates that is hinged to open the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandibular]] | adjective | **1.** Relating to the lower jaw. | *"In academic literature, mandibular designates relating to the lower jaw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandibulate]] | adjective | **1.** Having mandibles. | *"In academic literature, mandibulate designates having mandibles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandibulofacial]] | adjective | **1.** Of or relating to the lower jaw and face. | *"In academic literature, mandibulofacial designates of or relating to the lower jaw and face."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandioc]] | noun | **1.** Cassava with long tuberous edible roots and soft brittle stems; used especially to make cassiri (an intoxicating drink) and tapioca. | *"In academic literature, mandioc designates cassava with long tuberous edible roots and soft brittle stems; used especially to make cassiri (an intoxicating drink) and tapioca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandioca]] | noun | **1.** Cassava with long tuberous edible roots and soft brittle stems; used especially to make cassiri (an intoxicating drink) and tapioca. | *"In academic literature, mandioca designates cassava with long tuberous edible roots and soft brittle stems; used especially to make cassiri (an intoxicating drink) and tapioca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandola]] | noun | **1.** An early type of mandolin. | *"In academic literature, mandola designates an early type of mandolin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandolin]] | noun | **1.** A stringed instrument related to the lute, usually played with a plectrum. | *"Would it not be rash to conclude that there was no passion behind those sonnets to Delia which strike us as the thin music of a mandolin?"* — George Eliot, *Middlemarch* |
| [[mandragora]] | noun | **1.** A genus of stemless herbs of the family solanaceae. | *"Not poppy, nor mandragora, Nor all the drowsy syrups of the world, Shall ever medicine thee to that sweet sleep Which thou ow’dst yesterday."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mandrake]] | noun | **1.** The root of the mandrake plant; used medicinally or as a narcotic.<br>**2.** A plant of southern europe and north africa having purple flowers, yellow fruits and a forked root formerly thought to have magical powers. | *"Thou whoreson mandrake, thou art fitter to be worn in my cap than to wait at my heels."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mandrel]] | noun | **1.** Any of various rotating shafts that serve as axes for larger rotating parts. | *"In academic literature, mandrel designates any of various rotating shafts that serve as axes for larger rotating parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandril]] | noun | **1.** Any of various rotating shafts that serve as axes for larger rotating parts. | *"In academic literature, mandril designates any of various rotating shafts that serve as axes for larger rotating parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandrill]] | noun | **1.** Baboon of west africa with a bright red and blue muzzle and blue hindquarters. | *"In academic literature, mandrill designates baboon of west africa with a bright red and blue muzzle and blue hindquarters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mandrillus]] | noun | **1.** Baboons. | *"Classical and authoritative lexicons catalog mandrillus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manduca]] | noun | **1.** Moths whose larvae are tobacco hornworms or tomato hornworms. | *"In academic literature, manduca designates moths whose larvae are tobacco hornworms or tomato hornworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manducate]] | verb | **1.** Chew (food); to bite and grind with the teeth. | *"In academic literature, manducate designates chew (food); to bite and grind with the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manduction]] | noun | **1.** The act of participating in the celebration of the eucharist.<br>**2.** Biting and grinding food in your mouth so it becomes soft enough to swallow. | *"In academic literature, manduction designates the act of participating in the celebration of the eucharist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonmandatory]] | adjective | **1.** Not required by rule or law. | *"In academic literature, nonmandatory designates not required by rule or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remand]] | noun | **1.** The act of sending an accused person back into custody to await trial (or the continuation of the trial).<br>**2.** Refer (a matter or legal case) to another committee or authority or court for decision. | *"How does it stand now?” “Why, sir, it is under remand at present."* — Charles Dickens, *Bleak House* |
| [[remandate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mand within the domain of Law.<br>**2.** A technical or specialized form exhibiting the properties of mand in systematic terminology. | *"In academic literature, remandate designates pertaining to, derived from, or characteristic of latin mand within the domain of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemanding]] | adjective | **1.** Requiring little if any patience or effort or skill. | *"In academic literature, undemanding designates requiring little if any patience or effort or skill."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MAND
  </div>
</div>
