---
status: unread
type: root_dashboard
---
# Dashboard — legat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">legat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to send or bequeath”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **legat** means to send or bequeath. It refers to dispatching a person or message, releasing something, or letting it go. In English, this root forms words such as *legate*, *legation*, *legatorial*, and *legatee*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to send or bequeath
> The root **legat** means to send or bequeath. It refers to dispatching a person or message, releasing something, or letting it go. In English, this root forms words such as *legate*, *legation*, *legatorial*, and *legatee*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To send or bequeath</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *legate* and *legation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **legat** comes from a Latin word that means *"to send or bequeath"*.
  - At its core, it describes the action of send or bequeath.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **legat** in an English word, think of **to send or bequeath**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to send or bequeath).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Legate**: To bequeath.
  - **Legation**: A diplomatic mission or embassy headed by a minister rather than an ambassador.
  - **Legatorial**: Of, pertaining to, or characteristic of a legate or diplomatic legation.
  - **Legatee**: A person or institution to whom a legacy or specific bequest of personal property is left in a will.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">legat</mark>, think of <mark class="hl-def">to send or bequeath</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through four primary morphological branches in English:
> - **Primary Envoy & Bequest Stem (`legat-`):** Derived from Latin *lēgātum* and *lēgātus*: *legate*, *legation*, *legacy*, *legatee*, *legator*.
> - **Downward Transfer Stem (`delegat-`):** Derived from Latin *dēlēgāre* (< *dē-* "down, away" + *lēgāre*): *delegate*, *delegation*, *delegator*, *delegatee*, *delegable*, *undelegated*.
> - **Exclusionary / Demotional Stem (`relegat-`):** Derived from Latin *relēgāre* (< *re-* "away, back" + *lēgāre*): *relegate*, *relegation*, *relegable*.
> - **Collective Fellowship Stem (`colleg-`):** Derived from Latin *collēga* (< *con-* "together" + *lēgāre*): *colleague*, *colleagueship*, *collegial*, *collegiality*, *college*, *collegiate*, *collegium*.

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
> The derivations of *legat* span five distinct conceptual domains:
> - **Diplomatic Embassies & Sovereign Representation:** In [[legate]], [[legation]], and [[legatorial]], the root denotes high-level ambassadors, papal envoys, and foreign legation headquarters.
> - **Managerial Authority & Representation:** In [[delegate]], [[delegation]], [[delegator]], [[delegable]], and [[undelegated]], the root represents the empowering of deputies to act on behalf of a principal in business and democratic legislatures.
> - **Probate Bequests & Enduring Heritage:** In [[legacy]], [[legatee]], and [[legator]], the root governs testamentary inheritance and the long-term historical impact of leaders or cultural movements.
> - **Demotion, Sidelining & League Hierarchy:** In [[relegate]], [[relegation]], and [[relegable]], the root expresses consigning an individual or idea to an inferior rank, and the European sports system of demoting bottom-tier clubs.
> - **Professional Partnership & Academic Fellowship:** In [[colleague]], [[collegial]], [[collegiality]], [[college]], and [[collegiate]], the root denotes shared responsibility, mutual professional respect, and institutions of higher education.

---

## 🔀 4. Prefix & Combining Dynamics on legat

### Prefix Shifts (Directional & Structural Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dē-` | down, away | [[delegate]], [[delegation]] | Lit. "to send down"; to entrust authority, tasks, or legal power to a subordinate agent. |
| `re-` | away, back | [[relegate]], [[relegation]] | Lit. "to send back/away"; to consign to an inferior position, banish, or demote. |
| `con-` | together, jointly | [[colleague]], [[college]] | Lit. "chosen/commissioned together"; a partner in office; an incorporated fellowship. |
| `sub-` + `dē-` | under + down | [[subdelegate]] | To delegate authority further down to an assistant or secondary deputy. |
| `un-` | not | [[undelegated]] | Retained by the original sovereign; not entrusted to a subordinate agent. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ate` | Noun / Verb | [[legate]], [[delegate]] | An appointed envoy; to entrust authority to a deputy. |
| `-ation` | Noun (Action / Body) | [[delegation]], [[relegation]] | A diplomatic committee; the act of delegating or demoting. |
| `-y` (< Medieval Latin *-ia*) | Noun (Inheritance) | [[legacy]] | A bequest left in a will; an enduring historical impact. |
| `-ee` | Noun (Recipient) | [[legatee]], [[delegatee]] | A beneficiary named in a will; one to whom a task is assigned. |
| `-or` | Noun (Granting Agent) | [[legator]], [[delegator]] | The testator bequeathing property; the manager assigning duties. |
| `-ial` | Adjective (Fellowship) | [[collegial]] | Characterized by shared authority and cooperative professionalism. |
| `-ity` | Noun (State / Spirit) | [[collegiality]] | Mutual respect and shared decision-making among professional peers. |
| `-able` | Adjective (Capability) | [[delegable]], [[relegable]] | Capable of being delegated; liable to be demoted. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional & Administrative Law** | [[delegate]], [[delegation]], [[nondelegation doctrine]], [[delegatus non potest delegare]] | Separation of powers, legislative delegation to federal agencies (*Chevron*, major questions doctrine). |
| 🌍 **Diplomacy & Church History** | [[legate]], [[legation]], [[papal legate]] | Diplomatic missions, Vatican diplomatic service (*nuncio* and *legate*), Vienna Convention on Diplomatic Relations. |
| 📜 **Trusts, Estates & Probate Law** | [[legacy]], [[legatee]], [[legator]] | Specific vs. general legacies, ademption of bequests, estate tax deductions for charitable legacies. |
| 🏢 **Organizational Management & Leadership** | [[delegate]], [[delegation]], [[collegial]], [[collegiality]] | Effective managerial empowerment, flat organizational structures, faculty senates and tenure committees. |
| ⚽ **Professional Sports & League Design** | [[relegate]], [[relegation]] | English Premier League promotion and relegation systems, financial parachute payments for relegated clubs. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allegation]] | noun | **1.** (law) a formal accusation against somebody (often in a court of law).<br>**2.** Statements affirming or denying certain matters of fact that you are prepared to prove. | *"My Lord of Suffolk, Buckingham, and York, Reprove my allegation if you can, Or else conclude my words effectual."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[delegate]] | noun | **1.** A person appointed or elected to represent others.<br>**2.** Transfer power to someone. | *"Then, there are wifely duties which you would not wish to delegate to any one else." "No, never!" she cried."* — Martha Finley, *Elsie's Kith and Kin* |
| [[delegating]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** Transfer power to someone. | *"In academic literature, delegating designates authorizing subordinates to make certain decisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delegation]] | noun | **1.** A group of representatives or delegates.<br>**2.** Authorizing subordinates to make certain decisions. | *"I was just breaking a last muffin and beginning to smile when I saw a delegation coming down the street and turning into my front gate; I rose to meet it with distinction."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[legate]] | noun | **1.** A member of a legation. | *"Enter Winchester in Cardinal’s habit, a Legate and two Ambassadors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[legatee]] | noun | **1.** Someone to whom a legacy is bequeathed. | *"Reed: his intention to adopt me and make me his legatee."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[legateship]] | noun | **1.** The post or office of legate. | *"In academic literature, legateship designates the post or office of legate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[legation]] | noun | **1.** The post or office of legate.<br>**2.** A permanent diplomatic mission headed by a minister. | *"Shortly after this his older brother, Gansevoort Melville, sailed for England as secretary of legation to Ambassador McLane, and the manuscript was intrusted to Gansevoort for submission to John Murray."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[legato]] | adjective | **1.** (music) without breaks between notes; smooth and connected.<br>**2.** Connecting the notes; in music. | *"In academic literature, legato designates (music) without breaks between notes; smooth and connected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relegate]] | verb | **1.** Refer to another person for decision or judgment.<br>**2.** Assign to a lower position; reduce in rank. | *"Whatever promises the nation makes, the nation must perform; and the nation can not with safety relegate this duty to the states."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[relegating]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** Refer to another person for decision or judgment. | *"In academic literature, relegating designates authorizing subordinates to make certain decisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relegation]] | noun | **1.** Authorizing subordinates to make certain decisions.<br>**2.** The act of assigning (someone or something) to a particular class or category. | *"He objected to the dissociation of school and home life--to that relegation of domestic interests and duties to the background, which large and highly-organized schools, and teachers much above the home level, must necessarily involve."* — F. W. H. Myers, *Wordsworth* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LEGAT
  </div>
</div>
