---
status: unread
type: root_dashboard
---
# Dashboard — clud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">clud-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to close or shut”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **clud** means to close or shut. It refers to shutting an opening, barring entry, or enclosing a space. In English, this root forms words such as *conclude*, *exclude*, *include*, and *preclude*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to close or shut
> The root **clud** means to close or shut. It refers to shutting an opening, barring entry, or enclosing a space. In English, this root forms words such as *conclude*, *exclude*, *include*, and *preclude*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To close or shut</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *conclude* and *exclude*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **clud** comes from a Latin word that means *"to close or shut"*.
  - At its core, it describes the action of close or shut.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **clud** in an English word, think of **to close or shut**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to close or shut).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Conclude**: To bring or come to an end.
  - **Exclude**: To deny access, entry, or membership to.
  - **Include**: To comprise or contain as part of a whole.
  - **Preclude**: To prevent from happening.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">clud</mark>, think of <mark class="hl-def">to close or shut</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **clud** appears in English under two major channels:
> - **1. The Classical Latinate Prefix Compounds (`-clude`):**
>   - `con-` + `-clude` $\to$ *conclude*, *concluding*.
>   - `in-` + `-clude` $\to$ *include*, *including*.
>   - `ex-` + `-clude` $\to$ *exclude*, *excluding*.
>   - `pre-` + `-clude` $\to$ *preclude*, *precluding*.
>   - `se-` + `-clude` $\to$ *seclude*, *secluded*, *secluding*.
>   - `oc-` (< *ob-*) + `-clude` $\to$ *occlude*, *occluding*, *occluder*.
> - **2. The French-Mediated Stems (`clos-` / `claus-`):**
>   - *close*, *closely*, *closeness*, *closing*, *closer*.
>   - *closet*, *closeted*.
>   - *enclose*, *enclosing*, *enclosure*.
>   - *disclose*, *disclosing*, *disclosure*, *undisclosed*.
>   - *foreclose*, *foreclosing*, *foreclosure*.
>   - *clause*, *clausular*.
>   - *cloister*, *cloistered*, *cloistral*.

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
> The barrier-action of **clud** divides into five clear conceptual domains:
> - **1. Physical & Spatial Enclosure:** In [[close]], [[enclose]], [[closet]], and [[cloister]], the root denotes physical containment—walling off gardens, shutting bedroom doors, or sheltering in a monastery.
> - **2. Mechanical & Pathological Obstruction:** In [[occlude]], [[occluding]], and [[occluder]], the root describes shutting off fluid flow—a thrombus blocking a coronary artery, or upper and lower dental arches meeting in a bite.
> - **3. Jurisdictional & Categorical Boundaries:** In [[include]], [[exclude]], and [[clause]], the root governs legal and analytical membership: what falls inside a statutory definition, who is barred from membership, or specific contract articles.
> - **4. Logical Inference & Dialectical Finality:** In [[conclude]] and [[concluding]], the root captures shutting an intellectual inquiry—deducing a verdict from premises or ending an address.
> - **5. Temporal Prevention & Financial Seizure:** In [[preclude]] and [[foreclose]], the barrier is placed ahead of time—barring a legal claim from being re-litigated, or terminating an owner's right to redeem a mortgaged estate.

---

## 🔀 4. Prefix & Combining Dynamics on clud

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` + `-clude` | together, completely (*con-*) + shut | [[conclude]] | To shut completely; to bring to an end; to settle a deduction. |
| `in-` + `-clude` | in, within (*in-*) + shut | [[include]] | To shut within; to contain as part of a whole group or set. |
| `ex-` + `-clude` | out (*ex-*) + shut | [[exclude]] | To shut out; to bar from entry, consideration, or membership. |
| `prae-` + `-clude` | before (*prae-*) + shut | [[preclude]] | To shut off beforehand; to make impossible in advance. |
| `se-` + `-clude` | apart (*se-*) + shut | [[seclude]] | To shut apart from company, society, or the public eye. |
| `ob-` + `-clude` | against (*ob-*) + shut | [[occlude]] | To shut against; to block, obstruct, or close off an aperture. |
| `dis-` + `close` | reversal (*dis-*) + shut | [[disclose]] | To un-shut; to uncover, reveal, or make known secrets. |
| `en-` + `close` | inside (*en-*) + shut | [[enclose]] | To surround on all sides with a fence, wall, or envelope. |
| `for-` + `close` | outside (*for-*) + shut | [[foreclose]] | To shut out of legal redemption; to take possession of mortgaged property. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ing` | Participle / Adjective | [[including]], [[excluding]], [[concluding]] | Prepositional or participial marker of inclusion, exclusion, or termination. |
| `-ed` | Adjective (Resultant) | [[secluded]], [[cloistered]], [[closeted]] | Characterized by privacy, monastic retreat, or secret confinement. |
| `-ure` | Noun (Action / Result) | [[enclosure]], [[disclosure]], [[foreclosure]] | The physical barrier, the act of revealing, or the legal mortgage termination. |
| `-al` | Adjective | [[cloistral]], [[clausular]] | Pertaining to monastic cloisters or specific grammatical/legal clauses. |
| `-er` | Noun (Device / Agent) | [[occluder]], [[closer]] | An instrument that blocks an opening, or someone who finishes a deal. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Contract Law** | [[clause]], [[disclose]], [[disclosure]], [[preclude]], [[foreclose]] | Mandatory corporate financial disclosures, *res judicata* precluding re-litigation, and real estate mortgage foreclosure. |
| 🏥 **Medicine, Cardiology & Dentistry** | [[occlude]], [[occluding]], [[occluder]], [[exclude]] | Acute myocardial infarction caused by an occluded coronary artery, atrial septal occluders, and orthodontic dental malocclusion. |
| 📜 **Agrarian & Socioeconomic History** | [[enclose]], [[enclosure]] | The British Parliamentary Enclosure Acts privatizing medieval common land for agricultural wool production. |
| 🧠 **Philosophy, Logic & Epistemology** | [[conclude]], [[concluding]], [[include]], [[exclude]] | Syllogistic deductive conclusions, Venn diagram set-theory inclusions, and categorical exclusion fallacies. |
| 🏛️ **Classical Architecture & Monasticism** | [[cloister]], [[cloistered]], [[close]] | Romanesque cathedral arcaded cloisters, medieval cathedral closes, and monastic contemplative seclusion. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conclude]] | verb | **1.** Decide by reasoning; draw or come to a conclusion.<br>**2.** Bring to a close. | *"Why, thou didst conclude hairy men plain dealers without wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concluded]] | verb | **1.** Decide by reasoning; draw or come to a conclusion.<br>**2.** Bring to a close. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concluding]] | verb | **1.** Decide by reasoning; draw or come to a conclusion.<br>**2.** Bring to a close. | *"You have often Begun to tell me what I am, but stopp’d, And left me to a bootless inquisition, Concluding “Stay; not yet.” PROSPERO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exclude]] | verb | **1.** Prevent from being included or considered or accepted.<br>**2.** Prevent from entering; shut out. | *"My Lady,” in naming whom he always made a courtly gesture as if particularly to exclude her from any part in the quarrel, “is expected, I believe, daily."* — Charles Dickens, *Bleak House* |
| [[include]] | verb | **1.** Have as a part, be made up out of.<br>**2.** Consider as part of something. | *"Come, let us go; we will include all jars With triumphs, mirth, and rare solemnity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[included]] | verb | **1.** Have as a part, be made up out of.<br>**2.** Consider as part of something. | *"With Henry’s death the English circle ends; Dispersed are the glories it included."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[occlude]] | verb | **1.** Block passage through. | *"On land, meridional, a bispherical moon, revealed in imperfect varying phases of lunation through the posterior interstice of the imperfectly occluded skirt of a carnose negligent perambulating female, a pillar of the cloud by day."* — James Joyce, *Ulysses* |
| [[occluded]] | verb | **1.** Block passage through.<br>**2.** Closed off. | *"On land, meridional, a bispherical moon, revealed in imperfect varying phases of lunation through the posterior interstice of the imperfectly occluded skirt of a carnose negligent perambulating female, a pillar of the cloud by day."* — James Joyce, *Ulysses* |
| [[preclude]] | verb | **1.** Keep from happening or arising; make impossible.<br>**2.** Make impossible, especially beforehand. | *"The fire was issuing from a long straw-stack, which was so far gone as to preclude a possibility of saving it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[seclude]] | verb | **1.** Keep away from others. | *"I told my guardian all about it, and why I felt it was necessary that I should seclude myself, and my reason for not seeing my darling above all."* — Charles Dickens, *Bleak House* |
| [[secluded]] | verb | **1.** Keep away from others.<br>**2.** Hidden from general view or use. | *"That secluded sister is my first remembrance.” “No, no!” he cried, starting."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CLUD
  </div>
</div>
