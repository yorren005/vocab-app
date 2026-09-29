---
status: unread
type: root_dashboard
---
# Dashboard — quer
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">quer-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to complain or seek”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Asking a sincere question or searching along a path for a lost item.</span>
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

The root **quer** means to complain or seek. It refers to searching for something, trying to find it, or striving toward a goal. In English, this root forms words such as *apophony*, *query*, *quest*, and *question*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to complain or seek
> The root **quer** means to complain or seek. It refers to searching for something, trying to find it, or striving toward a goal. In English, this root forms words such as *apophony*, *query*, *quest*, and *question*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To complain or seek</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark>
> - **Everyday Connection**: Think of familiar words like *apophony* and *query*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **quer** comes from a Latin word that means *"to complain or seek"*.
  - At its core, it describes the action of complain or seek.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **quer** in an English word, think of **to complain or seek**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to complain or seek).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Apophony**: An everyday English word showing the root's idea of *to complain or seek*.
  - **Query**: A question, especially one addressed to an official or database.
  - **Quest**: A long or arduous search for something valuable, elusive, or noble.
  - **Question**: A sentence phrased to elicit information.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">quer</mark>, think of <mark class="hl-def">to complain or seek</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root surfaces in English across four complementary morphological tiers:
> - **Tier 1: Present Base (`quer-` / `quir-`):** Verbs of asking or seeking (*query*, *inquire*, *acquire*, *require*, *conquer*).
> - **Tier 2: Participial / Nominal Base (`quisit-`):** Formal substantives and qualitative adjectives (*inquisition*, *acquisition*, *requisition*, *exquisite*, *perquisite*, *disquisition*).
> - **Tier 3: Romance Deverbal Base (`quest-`):** Medieval chivalric and common-law borrowings (*quest*, *request*, *inquest*, *conquest*).
> - **Tier 4: Grammatical Substantives (`question-`):** Dialectical inquiries and legal cross-examinations (*question*, *questionnaire*, *inquisitive*).

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
> - **Epistemic & Scholarly Investigation:** [[query]], [[inquire]], *inquiry*, [[disquisition]], [[question]] — the relentless pursuit of facts, evidence, or intellectual clarity.
> - **Judicial & Forensic Scrutiny:** [[inquisition]], *inquest*, *inquisitor*, *inquisitorial* — institutional investigations by coroners, tribunals, or magistrate courts.
> - **Material & Territorial Procurement:** [[acquire]], [[acquisition]], *acquisitive*, [[conquer]], *conquest*, *conqueror* — gaining possession by financial purchase, tactical effort, or military subjugation.
> - **Imperative Demand & Necessity:** [[require]], [[requisite]], [[prerequisite]], [[requisition]], [[request]] — demanding what is essential, mandated by law, or formally solicited.
> - **Aesthetic & Sensory Refinement:** [[exquisite]], *exquisiteness* — that which has been so meticulously "sought out" that it embodies flawless perfection or acute sensitivity.
> - **Incidental Entitlements:** *perquisite* (*perk*) — benefits obtained or sought beyond baseline compensation.

---

## 🔀 4. Prefix & Combining Dynamics on quer

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (*ad*) | to, toward, addition | [[acquire]], [[acquisition]] | To seek toward oneself; to gain possession or mastery of. |
| **com-** (*cum*) | completely, thoroughly | [[conquer]], *conquest* | To seek out thoroughly with force; to subjugate or overcome. |
| **in-** (*in*) | into, upon | [[inquire]], [[inquisition]], *inquest* | To search deeply into; to examine judicially or interrogate. |
| **re-** (*re-*) | back, again, intensively | [[require]], [[requisite]], [[request]] | To ask back as a right; to demand or formally solicit. |
| **ex-** (*ex*) | out, thoroughly | [[exquisite]] | Searched out from among the best; delicately perfected. |
| **dis-** (*dis-*) | apart, separately | [[disquisition]] | To search through all branches of a topic; a formal treatise. |
| **per-** (*per*) | through, thoroughly | *perquisite* | Searched out as an extra gain; an incidental privilege or tip. |
| **prae-** (*prae*) | before, in advance | [[prerequisite]] | Required beforehand as an indispensable condition. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-y** (*-e*) | Latin imperative / noun | [[query]] | A direct question or inquiry addressed to an authority. |
| **-tion** (*-tiōnem*) | noun of action / tribunal | [[acquisition]], [[inquisition]] | The process of gaining, or a formal ecclesiastical/legal court. |
| **-ite** (*-ītus*) | participial adjective / noun | [[requisite]], [[exquisite]] | Necessary for an end, or exquisitely crafted. |
| **-ive** (*-īvus*) | tending toward, disposed to | [[inquisitive]], *acquisitive* | Habitually inclined to ask questions or accumulate goods. |
| **-or** (*-tor*) | personal agent noun | *inquisitor*, *conqueror*, *quaestor* | An official who investigates, subjugates, or audits. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Philosophy & Epistemology** | [[query]], [[question]], [[disquisition]] | Methodical dialectic, Socratic inquiry, academic treatises. |
| **Criminal & Forensic Law** | *inquest*, [[inquisition]], *inquisitorial* | Coroner's death inquiries, judicial tribunals, evidentiary rules. |
| **Corporate Finance & M&A** | [[acquire]], [[acquisition]], *perquisite* | Mergers and corporate takeovers, executive compensation perks. |
| **Military & World History** | [[conquer]], *conquest*, [[requisition]] | Territorial subjugation, military commandeering of civilian supplies. |
| **Aesthetics & Medicine** | [[exquisite]] | Fine art connoisseurship; excruciatingly sharp neurological pain. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conquer]] | verb | **1.** To put down by force or authority.<br>**2.** Take possession of by force, as after an invasion. | *"Now will I charge you in the band of truth, When you have conquer’d my yet maiden-bed, Remain there but an hour, nor speak to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conquerable]] | adjective | **1.** Subject to being conquered or overcome.<br>**2.** Capable of being surmounted or excelled. | *"In academic literature, conquerable designates subject to being conquered or overcome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conquering]] | noun | **1.** The act of conquering.<br>**2.** To put down by force or authority. | *"Labienus— This is stiff news—hath with his Parthian force Extended Asia from Euphrates His conquering banner shook from Syria To Lydia and to Ionia, Whilst— ANTONY."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conqueror]] | noun | **1.** Someone who is victorious by force of arms. | *"You did know How much you were my conqueror, and that My sword, made weak by my affection, would Obey it on all cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equerry]] | noun | **1.** An official charged with the care of the horses of princes or nobles.<br>**2.** A personal attendant of the british royal family. | *"There are festivals and entertainments going continually on, and the Duke has his chamberlains and equerries, and the Duchess her mistress of the wardrobe and ladies of honour, just like any other and more potent potentates."* — William Makepeace Thackeray, *Vanity Fair* |
| [[quercitron]] | noun | **1.** A yellow dye made from the bark of the quercitron oak tree.<br>**2.** Medium to large deciduous timber tree of the eastern united states and southeastern canada having dark outer bark and yellow inner bark used for tanning; broad five-lobed leaves are bristle-tipped. | *"In academic literature, quercitron designates a yellow dye made from the bark of the quercitron oak tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quercus]] | noun | **1.** Oaks. | *"A rare species in Britain is the oak-leaf rust (_Uredo Quercus_), in which the sori or pustules are minute, and at first yellow, but afterwards orange."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[querier]] | noun | **1.** Someone who asks a question. | *"In academic literature, querier designates someone who asks a question."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quern]] | noun | **1.** A primitive stone mill for grinding corn by hand. | *"Are not you he That frights the maidens of the villagery, Skim milk, and sometimes labour in the quern, And bootless make the breathless housewife churn, And sometime make the drink to bear no barm, Mislead night-wanderers, laughing at their harm?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[querulous]] | adjective | **1.** Habitually complaining. | *"But no—O no!” “A strange old piece, ye say!” interposed the maltster, in a querulous voice."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[querulously]] | adverb | **1.** In a peevish manner. | *"I don’t know how we could manage without him,” answered the elder woman querulously."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[querulousness]] | noun | **1.** The quality of being given to complaining. | *"And then we'll be saying a prayer for her who's gone--" "Dead she is, the poor heart, dead she is, and better off nor I am--" Her high querulousness died away as she went into the house, and again was the silence of the riding moon."* — Donn Byrne, *The Wind Bloweth* |
| [[query]] | noun | **1.** An instance of questioning.<br>**2.** Pose a question. | *"I inquire that query boldly?” “We can’t say that you have, Hero Poorgrass,” admitted Jan."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reconquer]] | verb | **1.** Conquer anew. | *"I would not so soon relinquish the attempt to reconquer it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unconquerable]] | adjective | **1.** Not capable of being conquered or vanquished or overcome; - r.e.danielson.<br>**2.** Incapable of being surmounted or excelled. | *"And I, the unconquerable and indestructible I, survive."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unconquered]] | adjective | **1.** Not conquered. | *"Wither, garden; and be henceforth a burying place to all that do dwell in this house, because the unconquered soul of Cade is fled."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Asking & Seeking]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · QUER
  </div>
</div>
