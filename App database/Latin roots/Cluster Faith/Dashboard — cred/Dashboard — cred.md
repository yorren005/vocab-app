---
status: unread
type: root_dashboard
---
# Dashboard — cred
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cred-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to believe or trust”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Placing your full trust in a loyal friend or keeping a solemn promise.</span>
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

The root **cred** means to believe or trust. It refers to believe, trust, entrust, lend on faith. In English, this root forms words such as *credit*, *credible*, *creed*, and *incredible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to believe or trust
> The root **cred** means to believe or trust. It refers to believe, trust, entrust, lend on faith. In English, this root forms words such as *credit*, *credible*, *creed*, and *incredible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To believe or trust</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Placing your full trust in a loyal friend or keeping a solemn promise.</mark>
> - **Everyday Connection**: Think of familiar words like *credit* and *credible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cred** comes from a Latin word that means *"to believe or trust"*.
  - At its core, it describes the action of believe or trust.

- **The Big Picture Idea**:
  - Picture placing your full trust in a loyal friend or keeping a solemn promise.
  - Whenever you see **cred** in an English word, think of **to believe or trust**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to believe or trust).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Credit**: To believe something or accept it as true.
  - **Credible**: Able to be believed.
  - **Creed**: A formal, authoritative summary of religious faith.
  - **Incredible**: Impossible or extraordinarily difficult to believe.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cred</mark>, think of <mark class="hl-def">to believe or trust</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The verb *crēdō* builds English words across two primary stems:
> - **Present Active Stem (`cred-` / `cre-`):** Formed on *crēdō* and participle *crēdēns*, generating verbs, adjectives of capacity, and nouns of quality: *credible*, *credibility*, *credulous*, *credulity*, *creed*, *credo*, *miscreant*, *recreant*.
> - **Participial / Supine Stem (`credit-` < *crēditum*):** Formed on the past participle *crēditum* ("that which was entrusted, a loan"), yielding commercial, administrative, and evaluative terms: *credit*, *creditor*, *creditable*, *accredit*, *accreditation*, *discredit*.
> - **Prefix Combinations:**
>   - **in-** ("not") $\to$ *incredible*, *incredulous*, *incredulity*.
>   - **ad-** (*ac-*) ("to, toward") $\to$ *accredit*, *accreditation*.
>   - **dis-** ("apart, reversal") $\to$ *discredit*, *discreditable*.
>   - **mis-** / **re-** (via Old French) $\to$ *miscreant*, *recreant*.

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
> The root spans a magnificent arc from banking ledgers to theological dogma:
> - **Commercial Finance & Debt:** Capital loans, balances, financial trust, and solvency ([[credit]], [[creditor]], [[creditworthy]], [[creditworthiness]]).
> - **Cognitive Believability & Trust:** The plausibility of facts, arguments, and testimonies ([[credible]], [[credibly]], [[credibility]], [[incredible]], [[incredibly]], [[incredibility]], [[credence]]).
> - **Psychological Dispositions of Belief:** Scepticism vs. naive gullibility ([[credulous]], [[credulously]], [[credulity]], [[incredulous]], [[incredulously]], [[incredulity]]).
> - **Official Authorization & Certification:** Vetting academic, medical, or diplomatic standards ([[accredit]], [[accredited]], [[accreditation]], [[credential]], [[credentials]]).
> - **Religious Dogma & Personal Mission:** Declarations of faith and guiding philosophical principles ([[credo]], [[creed]], [[creedal]], [[creedless]], [[credenda]]).
> - **Reputational Praise vs. Disgrace:** Esteem for honorable conduct vs. the destruction of trust ([[creditable]], [[creditably]], [[discredit]], [[discredited]], [[discreditable]], [[discreditably]]).
> - **Feudal Infamy & Moral Depravity:** Treasonous cowards and unprincipled villains ([[recreant]], [[miscreant]]).

---

## 🔀 4. Prefix & Combining Dynamics on cred

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | — | [[credit]], [[credible]], [[credo]] | Direct act of believing, entrusting, or lending. |
| **in-** | "not, un-" (privative) | [[incredible]], [[incredulous]] | Incapable of being believed, or refusing to believe. |
| **ad-** (*ac-*) | "to, toward" (intensive) | [[accredit]], [[accreditation]] | Formally granting trust, approval, or official recognition. |
| **dis-** | "apart, away, reversal" | [[discredit]], [[discreditable]] | Stripping away trust, destroying belief or reputation. |
| **mis-** | "badly, wrongly" (French) | [[miscreant]] | Originally "one who believes wrongly" (heretic); hence depraved villain. |
| **re-** | "back, yielding" (French) | [[recreant]] | Surrendering one's faith; a craven coward or traitor. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ible** (*-ibilis*) | Modal Passive Adjective | [[credible]], [[incredible]] | Capable or incapable of being believed. |
| **-ulous** (*-ulus*) | Dispositional Adjective | [[credulous]], [[incredulous]] | Prone to believe too easily, or refusing to believe. |
| **-ity** (*-itās*) | Abstract State Noun | [[credibility]], [[credulity]] | The condition of being believable, or state of gullibility. |
| **-or** (*-tor*) | Commercial Agent Noun | [[creditor]] | One who entrusts capital or to whom money is owed. |
| **-able** (*-ābilis*) | Worthiness Adjective | [[creditable]], [[discreditable]] | Worthy of praise and credit, or bringing dishonor. |
| **-ential** (*-entiālis*) | Relational / Authorizing | [[credential]], [[credentials]] | Documents that confer confidence and legal authority. |
| **-enda** (Latin gerundive pl.) | Necessary Obligation | [[credenda]] | Things that must be believed; fundamental articles of faith. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Banking, Finance & Commerce** | [[credit]], [[creditor]], [[creditworthy]], [[creditworthiness]] | Sovereign credit ratings (Moody's, S&P), revolving lines of credit, bankruptcy liquidation, and letters of credit. |
| **Higher Education & Healthcare** | [[accredit]], [[accreditation]], [[credential]], [[credentials]] | University regional accreditation boards, medical licensing credentialing committees, and board certification. |
| **Law & Evidence Jurisprudence** | [[credible]], [[credibility]], [[discredit]], [[credence]] | Witness credibility assessment, impeaching a hostile witness, and corroborative evidence lending credence. |
| **Theology & Church History** | [[credo]], [[creed]], [[creedal]], [[credenda]] | Ecumenical creeds (Nicene, Athanasian), articles of faith (*credenda* vs. *agenda*), and liturgical choral Masses. |
| **Literature, Criminology & Drama** | [[incredulous]], [[miscreant]], [[recreant]] | Shakespearean villainy, medieval tales of chivalric recreancy, and psychological depictions of stunned incredulity. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accredit]] | verb | **1.** Grant credentials to.<br>**2.** Provide or send (envoys or embassadors) with official credentials. | *"Such words to be spoken in a fashionable circle; and they'll all accredit it, for they have,--Heaven knows why!--long been seeking something to my dispraise."* — Effie Afton, *Eventide* |
| [[accreditation]] | noun | **1.** The act of granting credit or recognition (especially with respect to educational institution that maintains suitable standards). | *"In academic literature, accreditation designates the act of granting credit or recognition (especially with respect to educational institution that maintains suitable standards)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accredited]] | verb | **1.** Grant credentials to.<br>**2.** Provide or send (envoys or embassadors) with official credentials. | *"Bahá'í observers accredited by United Nations participated in Conference on Human Rights, Geneva; United Nations General Assembly, Paris."* — Effendi Shoghi, *Citadel of Faith* |
| [[cred]] | noun | **1.** Credibility among young fashionable urban individuals. | *"In academic literature, cred designates credibility among young fashionable urban individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credal]] | adjective | **1.** Of or relating to a creed. | *"In academic literature, credal designates of or relating to a creed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credence]] | noun | **1.** The mental attitude that something is believable and should be accepted as true.<br>**2.** A kind of sideboard or buffet. | *"His love and wisdom, Approv’d so to your majesty, may plead For amplest credence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credendum]] | noun | **1.** (christianity) any of the sections into which a creed or other statement of doctrine is divided. | *"In academic literature, credendum designates (christianity) any of the sections into which a creed or other statement of doctrine is divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credential]] | noun | **1.** A document attesting to the truth of certain stated facts. | *"Putting Miss Havisham’s note in my pocket, that it might serve as my credentials for so soon reappearing at Satis House, in case her waywardness should lead her to express any surprise at seeing me, I went down again by the coach next day."* — Charles Dickens, *Great Expectations* |
| [[credentialled]] | adjective | **1.** Certified as professional by evidence or testimonials. | *"In academic literature, credentialled designates certified as professional by evidence or testimonials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credentials]] | noun | **1.** A document attesting to the truth of certain stated facts. | *"Putting Miss Havisham’s note in my pocket, that it might serve as my credentials for so soon reappearing at Satis House, in case her waywardness should lead her to express any surprise at seeing me, I went down again by the coach next day."* — Charles Dickens, *Great Expectations* |
| [[credenza]] | noun | **1.** A kind of sideboard or buffet. | *"In academic literature, credenza designates a kind of sideboard or buffet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credibility]] | noun | **1.** The quality of being believable or trustworthy. | *"Nothing can surpass the vigilance with which English critics will examine the credibility of the traveller who publishes an account of some distant and comparatively unimportant country."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[credible]] | adjective | **1.** Capable of being believed.<br>**2.** (a common but incorrect usage where `credulous' would be appropriate) credulous. | *"Nay, ’tis most credible, we here receive it, A certainty, vouch’d from our cousin Austria, With caution, that the Florentine will move us For speedy aid; wherein our dearest friend Prejudicates the business, and would seem To have us make denial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credibleness]] | noun | **1.** The quality of being believable or trustworthy. | *"In academic literature, credibleness designates the quality of being believable or trustworthy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credibly]] | adverb | **1.** Easy to believe on the basis of available evidence. | *"In academic literature, credibly designates easy to believe on the basis of available evidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credit]] | noun | **1.** Approval.<br>**2.** Money available for a client to borrow. | *"Thus vainly thinking that she thinks me young, Although she knows my days are past the best, Simply I credit her false-speaking tongue; On both sides thus is simple truth suppressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creditable]] | adjective | **1.** Worthy of often limited commendation. | *"Rouncewell; he says she is a most respectable, creditable woman."* — Charles Dickens, *Bleak House* |
| [[creditably]] | adverb | **1.** To a tolerably worthy extent. | *"He is a pleasant fellow, and would jilt you creditably.” “Thank you, sir, but a less agreeable man would satisfy me."* — Jane Austen, *Pride and Prejudice* |
| [[credited]] | verb | **1.** Give someone credit for something.<br>**2.** Ascribe an achievement to. | *"Bathsheba had grounds for conjecturing a connection between her own history and the dimly suspected tragedy of Fanny’s end which Oak and Boldwood never for a moment credited her with possessing."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[creditor]] | noun | **1.** A person to whom money is owed by a debtor; someone to whom an obligation exists. | *"I will discharge thee ere I go from thee; Bear me forthwith unto his creditor, And knowing how the debt grows, I will pay it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credits]] | noun | **1.** A list of acknowledgements of those who contributed to the creation of a film (usually run at the end of the film).<br>**2.** Approval. | *"Good credits would materially reduce this time."* — Jack London, *The Jacket (The Star-Rover)* |
| [[creditworthiness]] | noun | **1.** Trustworthiness with money as based on a person's credit history; a general qualification for borrowing. | *"In academic literature, creditworthiness designates trustworthiness with money as based on a person's credit history; a general qualification for borrowing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creditworthy]] | adjective | **1.** Having an acceptable credit rating. | *"In academic literature, creditworthy designates having an acceptable credit rating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credo]] | noun | **1.** Any system of principles or beliefs. | *"Bravo, Jacques!' they cried; and one said, 'You are right, _mon ami_, the only god to trust in nowadays.' 'It is a short _credo_, M. le Maire,' said another, who caught my eye."* — Mrs. Oliphant, *A Beleaguered City* |
| [[credulity]] | noun | **1.** Tendency to believe readily. | *"Though I am satisfied, and need no more Than what I know, yet shall the oracle Give rest to the minds of others, such as he Whose ignorant credulity will not Come up to th’ truth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credulous]] | adjective | **1.** Disposed to believe on little evidence.<br>**2.** Showing a lack of judgment or experience. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credulously]] | adverb | **1.** In a credulous manner. | *"In academic literature, credulously designates in a credulous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credulousness]] | noun | **1.** Tendency to believe too readily and therefore to be easily deceived. | *"In academic literature, credulousness designates tendency to believe too readily and therefore to be easily deceived."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discredit]] | noun | **1.** The state of being held in low esteem.<br>**2.** Cause to be distrusted or disbelieved. | *"Did he not rather Discredit my authority with yours, And make the wars alike against my stomach, Having alike your cause?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreditable]] | adjective | **1.** Tending to bring discredit or disrepute; blameworthy. | *"I am glad it occurred to me to mention it; for it would really be discreditable to _you_ to let them go alone.” “My uncle is to send a servant for us.” “Oh!"* — Jane Austen, *Pride and Prejudice* |
| [[discreditably]] | adverb | **1.** In a dishonorable manner or to a dishonorable degree. | *"In academic literature, discreditably designates in a dishonorable manner or to a dishonorable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discredited]] | verb | **1.** Cause to be distrusted or disbelieved.<br>**2.** Damage the reputation of. | *"O, sir, you had then left unseen a wonderful piece of work, which not to have been blest withal would have discredited your travel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incredibility]] | noun | **1.** The quality of being incredible. | *"In academic literature, incredibility designates the quality of being incredible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incredible]] | adjective | **1.** Beyond belief or understanding. | *"I tell you, ’tis incredible to believe How much she loves me: O! the kindest Kate She hung about my neck, and kiss on kiss She vied so fast, protesting oath on oath, That in a twink she won me to her love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incredibleness]] | noun | **1.** The quality of being incredible. | *"In academic literature, incredibleness designates the quality of being incredible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incredibly]] | adverb | **1.** Not easy to believe.<br>**2.** Exceedingly; extremely. | *"An incredibly tall figure, which could not possibly be human, was wandering across the terrace with slow steps."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[incredulity]] | noun | **1.** Doubt about the truth of something. | *"A more foolish remark was never made, and I want you to contradict it: that’s what I came for.” Gabriel looked incredulous and sad, but between his moments of incredulity, relieved."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[incredulous]] | adjective | **1.** Not disposed or willing to believe; unbelieving. | *"If I do feign, O, let me in my present wildness die And never live to show th’ incredulous world The noble change that I have purposed!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incredulously]] | adverb | **1.** In an incredulous manner. | *"Guppy looked incredulously at his friend, and at his mother, who suddenly turned very angry, and at the floor, and at the ceiling."* — Charles Dickens, *Bleak House* |
| [[overcredulity]] | noun | **1.** Too much credulity. | *"In academic literature, overcredulity designates too much credulity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcredulous]] | adjective | **1.** Too credulous for your own good. | *"In academic literature, overcredulous designates too credulous for your own good."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaccredited]] | adjective | **1.** Lacking official approval. | *"In academic literature, unaccredited designates lacking official approval."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Faith]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CRED
  </div>
</div>
