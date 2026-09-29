---
status: unread
type: root_dashboard
---
# Dashboard — rog
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rog-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to ask or propose”</span>
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

The root **rog** means to ask or propose. It refers to requesting information, making an inquiry, or seeking help. In English, this root forms words such as *arrogant*, *interrogate*, *derogatory*, and *prerogative*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to ask or propose
> The root **rog** means to ask or propose. It refers to requesting information, making an inquiry, or seeking help. In English, this root forms words such as *arrogant*, *interrogate*, *derogatory*, and *prerogative*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To ask or propose</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark>
> - **Everyday Connection**: Think of familiar words like *arrogant* and *interrogate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rog** comes from a Latin word that means *"to ask or propose"*.
  - At its core, it describes the action of ask or propose.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **rog** in an English word, think of **to ask or propose**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to ask or propose).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Arrogant**: Having or showing an exaggerated sense of one's own importance or abilities.
  - **Interrogate**: To question formally, systematically, or aggressively.
  - **Derogatory**: Expressing a low opinion.
  - **Prerogative**: An exclusive right, privilege, or immunity vested in a specific rank, monarch, or official body.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rog</mark>, think of <mark class="hl-def">to ask or propose</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two classical Latin stems:
> - **Present Active Stem:** `rog-` (from *rogō, rogāre*) — verbs and nouns of claiming, questioning, or postponing: *prorogue*, *derogate*, *arrogate*, *surrogate*.
> - **Participial / Perfect Passive Stem:** `rogāt-` (from *rogātum*) — abstract nouns of formal legislative acts, ecclesiastical rites, and judicial proceedings: *interrogation*, *abrogation*, *derogation*, *subrogation*, *supererogation*, *rogation*, *rogatory*.
>
> Suffixes attach cleanly:
> - **Verbal Suffix `-ate`:** Forms causative and operative verbs (*abrogate*, *arrogate*, *interrogate*, *derogate*).
> - **Adjectival Suffixes `-ant` / `-ory` / `-ive`:** Forms psychological, descriptive, and judicial qualifiers (*arrogant*, *derogatory*, *interrogative*, *supererogatory*).
> - **Nominal Suffix `-tion`:** Establishes constitutional and procedural substantives (*interrogation*, *prorogation*).

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
> - **Constitutional & Statutory Annulment:** [[abrogate]], *abrogation*, *obrogate* — the formal nullification of treaties, statutes, or contracts.
> - **Judicial & Forensic Questioning:** [[interrogate]], [[interrogation]], *interrogator*, *interrogative*, *interrogatory*, *rogatory* — exhaustive, structured cross-examination of suspects, witnesses, or data systems.
> - **Ego & Presumptuous Seizure:** [[arrogate]], [[arrogant]], *arrogance* — claiming unearned dignity, power, or authority for oneself.
> - **Disparagement & Value Detraction:** [[derogate]], [[derogatory]], *derogation* — diminishing the standing, reputation, or merit of another.
> - **Institutional Privilege & Procedure:** [[prerogative]], [[prorogue]], *prorogation* — sovereign royal immunities and parliamentary suspensions.
> - **Vicarious Substitution:** [[surrogate]], *surrogacy*, *subrogate*, *subrogation* — standing in the legal or biological place of another.
> - **Theological & Superfluous Action:** [[supererogatory]], *supererogation* — doing far more than moral duty requires.

---

## 🔀 4. Prefix & Combining Dynamics on rog

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ab-** (*ab*) | away, from | [[abrogate]] | To ask away; to repeal or annul a statute. |
| **ad- $\to$ ar-** (*ad*) | to, toward | [[arrogate]], [[arrogant]] | To claim to oneself without right; overbearingly proud. |
| **dē-** (*dē*) | down, away | [[derogate]], [[derogatory]] | To ask down; to detract from dignity or diminish value. |
| **inter-** (*inter*) | between, mutually | [[interrogate]] | To question back and forth formally and systematically. |
| **prae-** (*prae*) | before, in front | [[prerogative]] | Asked to vote first; an exclusive right or sovereign privilege. |
| **prō-** (*prō*) | forward, forth | [[prorogue]] | To ask forward; to prolong or discontinue a legislative session. |
| **sub- $\to$ sur-** (*sub*) | under, in place of | [[surrogate]], *subrogate* | One asked to act in another's place; a deputy or substitute. |
| **super- + ex-** | above + out | [[supererogatory]] | Disbursed beyond the requirement; superfluous moral duty. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ate** (*-āre*) | verb formative | [[abrogate]], [[arrogate]] | To execute a formal legislative or personal act. |
| **-tion** (*-tiōnem*) | action / process noun | [[interrogation]], [[rogation]] | The formal act of questioning or public supplication. |
| **-ant** (*-antem*) | present participle | [[arrogant]] | Disposed toward excessive, presumptuous claims. |
| **-ory** (*-ōrius*) | descriptive adjective | [[derogatory]], *rogatory* | Expressive of disparagement, or pertaining to judicial requests. |
| **-ive** (*-īvus*) | functional adjective | *interrogative* | Expressing or posing a grammatical question. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Constitutional & Public Law** | [[abrogate]], [[prorogue]], *prorogation* | Treaty cancellation, dissolution or suspension of parliamentary bodies. |
| **Civil Procedure & International Law** | *rogatory* (*letters rogatory*), *subrogation* | Cross-border judicial evidence collection, insurer debt recovery. |
| **Criminal Justice & Intelligence** | [[interrogate]], [[interrogation]], *interrogator* | Police interviews, military debriefings, suspect cross-examinations. |
| **Bioethics & Family Law** | [[surrogate]], *surrogacy* | Gestational surrogacy contracts, surrogate decision-makers in medicine. |
| **Moral Theology & Ethics** | [[supererogatory]], *supererogation* | Supererogatory virtues exceeding binding moral duties. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abrogate]] | verb | **1.** Revoke formally. | *"NATHANIEL. _Perge_, good Master Holofernes, _perge_, so it shall please you to abrogate scurrility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abrogation]] | noun | **1.** The act of abrogating; an official or legal cancellation. | *"Thus was virtually accomplished the abrogation of the Missouri compromise line; and the extension or non-extension of slavery was then made to form a foundation for future political parties."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[abrogator]] | noun | **1.** An authority or official empowered to abolish or annul or repeal. | *"In academic literature, abrogator designates an authority or official empowered to abolish or annul or repeal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrogen]] | noun | **1.** Any flowerless plant such as a fern (pteridophyte) or moss (bryophyte) in which growth occurs only at the tip of the main stem. | *"In academic literature, acrogen designates any flowerless plant such as a fern (pteridophyte) or moss (bryophyte) in which growth occurs only at the tip of the main stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrogenic]] | adjective | **1.** Pertaining to flowerless plants (ferns or mosses) in which growth occurs only at the tip of the main stem. | *"In academic literature, acrogenic designates pertaining to flowerless plants (ferns or mosses) in which growth occurs only at the tip of the main stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrogenous]] | adjective | **1.** Pertaining to flowerless plants (ferns or mosses) in which growth occurs only at the tip of the main stem. | *"In academic literature, acrogenous designates pertaining to flowerless plants (ferns or mosses) in which growth occurs only at the tip of the main stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anterograde]] | adjective | **1.** Of amnesia; affecting time immediately following trauma. | *"In academic literature, anterograde designates of amnesia; affecting time immediately following trauma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arrogance]] | noun | **1.** Overbearing pride evidenced by a superior manner toward inferiors. | *"My lords, Can ye endure to hear this arrogance?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arrogant]] | adjective | **1.** Having or showing feelings of unwarranted importance out of overbearing pride. | *"The law Protects not us; then why should we be tender To let an arrogant piece of flesh threat us, Play judge and executioner all himself, For we do fear the law?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arrogantly]] | adverb | **1.** In an arrogant manner. | *"He had seemed so confident, so arrogantly sure, of her ultimate surrender to his desire to marry her."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[arrogate]] | verb | **1.** Demand as being one's due or property; assert one's right or title to.<br>**2.** Make undue claims to having. | *"Far be it from me to arrogate to myself the attributes of the Deity."* — Bram Stoker, *Dracula* |
| [[arrogation]] | noun | **1.** Seizure by the government. | *"In academic literature, arrogation designates seizure by the government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arrogator]] | noun | **1.** A person who through conceit makes pretentious claims to rights or advantages that he or she is not entitled to or to qualities that he or she does not possess. | *"In academic literature, arrogator designates a person who through conceit makes pretentious claims to rights or advantages that he or she is not entitled to or to qualities that he or she does not possess."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derogate]] | verb | **1.** Cause to seem less serious; play down. | *"SECOND LORD. [_Aside._] You are a fool granted; therefore your issues, being foolish, do not derogate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[derogation]] | noun | **1.** A communication that belittles somebody or something.<br>**2.** (law) the partial taking away of the effectiveness of a law; a partial repeal or abolition of a law. | *"It is no derogation from the credit, whatever that may be, of drawing the ordinance, that its principles had before been prepared and discussed, in the form of resolutions."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[derogative]] | adjective | **1.** Expressive of low opinion. | *"In academic literature, derogative designates expressive of low opinion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derogatory]] | adjective | **1.** Expressive of low opinion. | *"Which there is nothing derogatory, but far from it in the appellation,” says Mr."* — Charles Dickens, *Bleak House* |
| [[erogenous]] | adjective | **1.** Sensitive to sexual stimulation. | *"In academic literature, erogenous designates sensitive to sexual stimulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrogate]] | verb | **1.** Transmit (a signal) for setting off an appropriate response, as in telecommunication.<br>**2.** Pose a series of questions to. | *"When I reached Coombe Tracey I told Perkins to put up the horses, and I made inquiries for the lady whom I had come to interrogate."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[interrogation]] | noun | **1.** A sentence of inquiry that asks for a reply.<br>**2.** A transmission that will trigger an answering transmission from a transponder. | *"On interrogation, he said "he had frequently heard that minister."* — Classic Author, *The wonders of prayer* |
| [[interrogative]] | noun | **1.** A sentence of inquiry that asks for a reply.<br>**2.** Some linguists consider interrogative sentences to constitute a mood. | *"Which is it to be?” He stood with his head on one side and himself on one side, in a bullying, interrogative manner, and he threw his forefinger at Mr."* — Charles Dickens, *Great Expectations* |
| [[interrogatively]] | adverb | **1.** In a questioning format.<br>**2.** With curiosity. | *"Who are they, Sir James, do you know?” “I see Vincy, the Mayor of Middlemarch; they are probably his wife and son,” said Sir James, looking interrogatively at Mr."* — George Eliot, *Middlemarch* |
| [[interrogator]] | noun | **1.** A questioner who is excessively harsh. | *"Reed my benefactress; if so, a benefactress is a disagreeable thing.” “Do you say your prayers night and morning?” continued my interrogator."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[interrogatory]] | noun | **1.** Formal systematic questioning.<br>**2.** Relating to the use of or having the nature of an interrogation. | *"No one seemed to understand to whom the stately mistress addressed her brief interrogatory."* — Effie Afton, *Eventide* |
| [[prerogative]] | noun | **1.** A right reserved exclusively by a particular person or group (especially a hereditary or official right). | *"Shall I, for lucre of the rest unvanquish’d, Detract so much from that prerogative As to be call’d but viceroy of the whole?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prorogation]] | noun | **1.** Discontinuation of the meeting (of a legislative body) without dissolving it. | *"Parliament have three modes of separation, to wit: by adjournment, by prorogation or dissolution by the King, or by the efflux of the term for which they were elected."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[prorogue]] | verb | **1.** Hold back to a later time.<br>**2.** Adjourn by royal prerogative; without dissolving the legislative body. | *"Epicurean cooks Sharpen with cloyless sauce his appetite, That sleep and feeding may prorogue his honour Even till a Lethe’d dullness— Enter Varrius."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rogaine]] | noun | **1.** A vasodilator (trade name loniten) used to treat severe hypertension; one side effect is hirsutism so it is also sold (trade name rogaine) as a treatment for male-patterned baldness. | *"In academic literature, rogaine designates a vasodilator (trade name loniten) used to treat severe hypertension; one side effect is hirsutism so it is also sold (trade name rogaine) as a treatment for male-patterned baldness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rogation]] | noun | **1.** A solemn supplication ceremony prescribed by the church. | *"In academic literature, rogation designates a solemn supplication ceremony prescribed by the church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rogers]] | noun | **1.** United states humorist remembered for his homespun commentary on politics and american society (1879-1935).<br>**2.** United states dancer and film actress who partnered with fred astaire (1911-1995). | *"Rogers, _Social Life in Scotland_ (Edinburgh, 1884-1886), iii. 258-260. [582] Douglas Hyde, _Beside the Fire, a Collection of Irish Gaelic Folk Stories_ (London, 1890), pp. 104, 105, 121-128. [583] P.W."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[roget]] | noun | **1.** English physician who in retirement compiled a well-known thesaurus (1779-1869). | *"In academic literature, roget designates english physician who in retirement compiled a well-known thesaurus (1779-1869)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rogue]] | noun | **1.** A deceitful and unreliable scoundrel. | *"Rogue, thou hast lived too long. [_Draws a knife._] MESSENGER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[roguery]] | noun | **1.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"You rogue, here’s lime in this sack too: there is nothing but roguery to be found in villainous man, yet a coward is worse than a cup of sack with lime in it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[roguish]] | adjective | **1.** Playful in an appealingly bold way.<br>**2.** Lacking principles or scruples; ;  - w.m. thackaray. | *"Let’s follow the old Earl, and get the bedlam To lead him where he would: his roguish madness Allows itself to anything."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[roguishly]] | adverb | **1.** Like a dishonest rogue.<br>**2.** In a playfully roguish manner. | *"But he was refused; the youth roguishly telling him that the weapon was very good for him (the Typee), but that a white man could fight much better with his fists."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[roguishness]] | noun | **1.** The trait of indulging in disreputable pranks.<br>**2.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"This particular sea-cuny, I admit, blushed through his sea tan till the Lady Om’s eyes were twin pools of roguishness in their teasing deliciousness and my arms were all but about her."* — Jack London, *The Jacket (The Star-Rover)* |
| [[subrogate]] | verb | **1.** Substitute one creditor for another, as in the case where an insurance company sues the person who caused an accident for the insured. | *"In academic literature, subrogate designates substitute one creditor for another, as in the case where an insurance company sues the person who caused an accident for the insured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subrogation]] | noun | **1.** (law) the act of substituting of one creditor for another. | *"In academic literature, subrogation designates (law) the act of substituting of one creditor for another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supererogatory]] | adjective | **1.** More than is needed, desired, or required. | *"He was close to her doors: his standing was sufficient: his qualities were even supererogatory."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[surrogate]] | noun | **1.** Someone who takes the place of another person.<br>**2.** A person appointed to represent or act on behalf of others. | *"Come with me to-night, and go with me to-morrow to the surrogate’s.” “But she must be consulted; at any rate informed.” “Very well; go on.” They went up the hill to Bathsheba’s house."* — Thomas Hardy, *Far from the Madding Crowd* |

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
    ROOT DASHBOARD · ROG
  </div>
</div>
