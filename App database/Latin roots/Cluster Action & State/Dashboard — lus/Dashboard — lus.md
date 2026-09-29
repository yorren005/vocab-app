---
status: unread
type: root_dashboard
---
# Dashboard — lus
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lus-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to play”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **lus** means to play. It refers to play, deception, illusion, indirect reference, conspiracy. In English, this root forms words such as *illusion*, *illusory*, *illusive*, and *illusionist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to play
> The root **lus** means to play. It refers to play, deception, illusion, indirect reference, conspiracy. In English, this root forms words such as *illusion*, *illusory*, *illusive*, and *illusionist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To play</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *illusion* and *illusory*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lus** comes from a Latin word that means *"to play"*.
  - At its core, it describes the action of play.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **lus** in an English word, think of **to play**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to play).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Illusion**: A thing that is or is likely to be wrongly perceived or interpreted by the senses.
  - **Illusory**: Based on illusion.
  - **Illusive**: Deceptive.
  - **Illusionist**: A person who performs magic tricks that deceive the eye.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lus</mark>, think of <mark class="hl-def">to play</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The participial stem **lus-** attaches to Latin prefixes to create substantive and adjectival derivatives:
> - **`in-` + `lus-` → `illus-`:**
>   - *illūsiō* → *illusion*, *illusionist*, *illusory*, *illusive*.
>   - *dis-* + *illusion* → *disillusion*, *disillusionment*.
> - **`ad-` + `lus-` → `allus-`:**
>   - *allūsiō* → *allusion*, *allusive*, *allusively*.
> - **`con-` + `lus-` → `collus-`:**
>   - *collūsiō* → *collusion*, *collusive*.
> - **`de-` + `lus-` → `delus-`:**
>   - *delūsiō* → *delusion*, *delusional*, *delusive*.
> - **`ex-` + `lus-` → `elus-`:**
>   - *elūsiō* → *elusion*, *elusive*, *elusiveness*.
> - **`pro-` + `lus-` → `prolus-`:**
>   - *prōlūsiō* → *prolusion* (preliminary exercise).

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
> The prefix directs the nature of the cognitive distortion:
> - **Optical & Theatrical Sense:** In [[illusion]] and [[illusory]], it denotes sensory misdirection, stage magic, or shimmering mirages.
> - **Psychiatric & Pathological Sense:** In [[delusion]] and [[delusional]], it designates entrenched, irrational beliefs held despite empirical refutation.
> - **Literary & Intertextual Sense:** In [[allusion]] and [[allusive]], it denotes subtle, indirect cultural and poetic references.
> - **Legal & Fraudulent Sense:** In [[collusion]] and [[collusive]], it denotes secret, illicit cooperation to fix prices or evade regulations.
> - **Fugitive & Intangible Sense:** In [[elusive]], it describes fleeting memories, shy wildlife, or concepts difficult to define.
> - **Shattered Idealism Sense:** In [[disillusion]] and [[disillusionment]], it marks the sobering return to harsh reality.

---

## 🔀 4. Prefix & Combining Dynamics on lus

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | upon, against | [[illusion]] | Playing *upon* the senses; creating a deceptive visual appearance. |
| `de-` | down, away | [[delusion]] | Playing the mind *away* from sanity; an entrenched false belief. |
| `ad-` | to, toward | [[allusion]] | Playing *toward* an outside text; an indirect reference. |
| `con-` | together | [[collusion]] | Playing *together* in an undercover conspiracy to cheat. |
| `ex-` | out of | [[elusive]] | Slipping *out* of grasp; hard to catch or remember. |
| `dis-` | reverse, away | [[disillusion]] | Stripping *away* an illusion; confronting disappointing reality. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Concept / State) | [[illusion]] | A deceptive perception or false notion. |
| `-ive` | Adjective (Tendency) | [[elusive]] | Tending to escape capture or mental grasp. |
| `-ory` | Adjective (Deceptive Nature) | [[illusory]] | Not real; producing an illusion. |
| `-ist` | Noun (Performer) | [[illusionist]] | A stage magician who creates visual illusions. |
| `-al` | Adjective (Psychiatric) | [[delusional]] | Suffering from entrenched false psychological beliefs. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧠 **Psychiatry & Clinical Psychology** | [[delusion]], [[delusional]], [[disillusionment]] | Schizophrenia symptoms, persecutory delusions, cognitive behavioral therapy. |
| 🎩 **Stage Magic & Entertainment** | [[illusion]], [[illusionist]], [[illusory]] | Optical misdirection, sleight of hand, stage apparatus engineering. |
| ⚖️ **Antitrust Law & Criminal Justice** | [[collusion]], [[collusive]] | Bidding rings, price-fixing conspiracies, forensic financial audits. |
| 📖 **Literary Theory & Hermeneutics** | [[allusion]], [[allusive]] | Intertextuality in modernist poetry (T.S. Eliot), biblical resonances in fiction. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allusion]] | noun | **1.** Passing reference or indirect mention. | *"Th’ allusion holds in the exchange."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[allusive]] | adjective | **1.** Characterized by indirect references. | *"In academic literature, allusive designates characterized by indirect references."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allusiveness]] | noun | **1.** A quality characterized by indirect reference. | *"Clement is the only man who writes in this way, with an allusiveness beyond Plutarch's, and a fancy as comprehensive as his charity and his experience of literature and religion."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[collusion]] | noun | **1.** Secret agreement.<br>**2.** Agreement on a secret plot. | *"The collusion holds in the exchange."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collusive]] | adjective | **1.** Acting together in secret toward a fraudulent or illegal end. | *"In academic literature, collusive designates acting together in secret toward a fraudulent or illegal end."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delusion]] | noun | **1.** (psychology) an erroneous belief that is held in the face of evidence to the contrary.<br>**2.** A mistaken or unfounded opinion or idea. | *"He had said to the doctor, “Now, my dear doctor, it is quite a delusion on your part to suppose that you attend me for nothing."* — Charles Dickens, *Bleak House* |
| [[delusional]] | adjective | **1.** Suffering from or characterized by delusions. | *"In academic literature, delusional designates suffering from or characterized by delusions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delusive]] | adjective | **1.** Inappropriate to reality or facts. | *"I could not find that it led to anything but the formation of delusive hopes in connexion with the suit already the pernicious cause of so much sorrow and ruin."* — Charles Dickens, *Bleak House* |
| [[delusively]] | adverb | **1.** In a deceptive and unrealistic manner. | *"In academic literature, delusively designates in a deceptive and unrealistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delusory]] | adjective | **1.** Causing one to believe what is not true or fail to believe what is true. | *"In academic literature, delusory designates causing one to believe what is not true or fail to believe what is true."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disillusion]] | noun | **1.** Freeing from false belief or illusions.<br>**2.** Free from enchantment. | *"To be lectured because the lecturer saw her in the cold morning light of open-shuttered disillusion was exasperating."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disillusioned]] | verb | **1.** Free from enchantment.<br>**2.** Freed from illusion. | *"This always disillusioned her finally, for it was hard to deny his proofs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[disillusioning]] | verb | **1.** Free from enchantment.<br>**2.** Freeing from illusion or false belief. | *"There was no sign of life about, and it might have served as the refuge of the Sleeping Princess, but a nearer inspection would probably have been disillusioning."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[disillusionment]] | noun | **1.** Freeing from false belief or illusions. | *"Wonder, disillusionment, passion, tragedy, despair."* — Donn Byrne, *The Wind Bloweth* |
| [[elusion]] | noun | **1.** The act of avoiding capture (especially by cunning). | *"The planting of flowers on Fanny’s grave had been perhaps but a species of elusion of the primary grief, and now it was as if his intention had been known and circumvented."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[elusive]] | adjective | **1.** Difficult to describe.<br>**2.** Skillful at eluding capture; - david kline. | *"Personal incomes, when sought by local assessors, proved to be most elusive."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[elusiveness]] | noun | **1.** The quality of being difficult to grasp or pin down. | *"In its partizan phase socialism exhibits all of the baffling variability and elusiveness that it does in its other aspects."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[illusion]] | noun | **1.** An erroneous mental representation.<br>**2.** Something many people believe that is false. | *"By some illusion see thou bring her here; I’ll charm his eyes against she do appear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illusional]] | adjective | **1.** Marked by or producing illusion. | *"In academic literature, illusional designates marked by or producing illusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illusionary]] | adjective | **1.** Marked by or producing illusion. | *"In academic literature, illusionary designates marked by or producing illusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illusionist]] | noun | **1.** A person with unusual powers of foresight.<br>**2.** Someone who performs magic tricks to amuse an audience. | *"In academic literature, illusionist designates a person with unusual powers of foresight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illusive]] | adjective | **1.** Based on or having the nature of an illusion. | *"For me I am weary of battle-fields, and feel no desire to grasp after illusive flowers and fading grass."* — C. A. Frazer, *Atmâ* |
| [[illusory]] | adjective | **1.** Based on or having the nature of an illusion. | *"Moreover, their interest is stimulated by the fact that they are the first to gain by any temporary economies, and the more so because of the illusory belief sure to persist, that they are the ultimate as well as the immediate bearers of the costs."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[illustrate]] | verb | **1.** Clarify by giving an example of.<br>**2.** Depict with an illustration. | *"But his body And fiery mind illustrate a brave father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illustration]] | noun | **1.** Artwork that helps make something clear or attractive.<br>**2.** Showing by example. | *"In academic literature, illustration designates artwork that helps make something clear or attractive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illustrative]] | adjective | **1.** Clarifying by use of examples.<br>**2.** Serving to demonstrate. | *"Cases illustrative of the influence of piety on the intellectual powers.--13."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[illustrator]] | noun | **1.** An artist who makes illustrations (for books or magazines or advertisements etc.). | *"In the Sung period the current ideas with regard to these patterns were expressed by the illustrator of the Sung edition of the _Li Chi_ by ornamenting jade discs, in the one case with ears of wheat and in the other with a clump of rushes."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[illustrious]] | adjective | **1.** Widely known and esteemed.<br>**2.** Having or conferring glory. | *"Armado is a most illustrious wight, A man of fire-new words, fashion’s own knight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illustriously]] | adverb | **1.** In an illustrious manner. | *"In academic literature, illustriously designates in an illustrious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illustriousness]] | noun | **1.** The property possessed by something or someone of outstanding importance or eminence. | *"In academic literature, illustriousness designates the property possessed by something or someone of outstanding importance or eminence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusaka]] | noun | **1.** The capital and largest city of zambia. | *"In academic literature, lusaka designates the capital and largest city of zambia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusatian]] | noun | **1.** A slavonic language spoken in rural area of southeastern germany. | *"In academic literature, lusatian designates a slavonic language spoken in rural area of southeastern germany."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[luscinia]] | noun | **1.** Nightingales. | *"In academic literature, luscinia designates nightingales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[luscious]] | adjective | **1.** Having strong sexual appeal.<br>**2.** Extremely pleasing to the sense of taste. | *"I know a bank where the wild thyme blows, Where oxlips and the nodding violet grows, Quite over-canopied with luscious woodbine, With sweet musk-roses, and with eglantine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lusciously]] | adverb | **1.** So as to produce a delightful taste. | *"In academic literature, lusciously designates so as to produce a delightful taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusciousness]] | noun | **1.** Extreme appetizingness. | *"In academic literature, lusciousness designates extreme appetizingness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusitania]] | noun | **1.** Ancient region and roman province on the iberian peninsula; corresponds roughly to modern portugal and parts of spain. | *"Woe to the conquering, not the conquered host, Since baffled Triumph droops on Lusitania's coast."* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[lusitanian]] | adjective | **1.** Of or relating to or characteristic of portugal or the people of portugal or their language.<br>**2.** Of or relating to or characteristic of the region of lusitania or its people or language. | *"In academic literature, lusitanian designates of or relating to or characteristic of portugal or the people of portugal or their language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lust]] | noun | **1.** A strong sexual desire.<br>**2.** Self-indulgent sexual desire (personified as one of the deadly sins). | *"That can such sweet use make of what they hate, When saucy trusting of the cozen’d thoughts Defiles the pitchy night; so lust doth play With what it loathes, for that which is away."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[luster]] | noun | **1.** A quality that outshines the usual.<br>**2.** The visual property of something that shines with reflected light. | *"They seemed to have become brighter than before, shining with a greenish luster which he had not at first observed."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[lusterless]] | adjective | **1.** Lacking brilliance or vitality.<br>**2.** Lacking luster or shine. | *"In academic literature, lusterless designates lacking brilliance or vitality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusterlessness]] | noun | **1.** The property of having little or no contrast; lacking highlights or gloss. | *"In academic literature, lusterlessness designates the property of having little or no contrast; lacking highlights or gloss."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lusterware]] | noun | **1.** Pottery with a metallic sheen produced by adding metallic oxides to the glaze. | *"In academic literature, lusterware designates pottery with a metallic sheen produced by adding metallic oxides to the glaze."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustful]] | adjective | **1.** Characterized by lust.<br>**2.** Driven by lust; preoccupied with or exhibiting lustful desires. | *"Foul fiend of France and hag of all despite, Encompass’d with thy lustful paramours, Becomes it thee to taunt his valiant age And twit with cowardice a man half dead?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustfully]] | adverb | **1.** In a lustful manner. | *"In academic literature, lustfully designates in a lustful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustfulness]] | noun | **1.** A strong sexual desire. | *"In academic literature, lustfulness designates a strong sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustily]] | adverb | **1.** In a healthy manner. | *"I do not desire he should answer for me; and yet I determine to fight lustily for him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustiness]] | noun | **1.** The property of being strong and healthy in constitution. | *"In academic literature, lustiness designates the property of being strong and healthy in constitution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustrate]] | verb | **1.** Purify by means of a ritual; also used in post-communist countries to refer to the political cleansing of former officials. | *"Moses advanced a nation to the worship of God in Spirit instead of matter, and il- 200:6 lustrated the grand human capacities of being bestowed by immortal Mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[lustre]] | noun | **1.** A surface coating for ceramics or porcelain.<br>**2.** A quality that outshines the usual. | *"Thy lustre thickens When he shines by."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustreless]] | adjective | **1.** Lacking brilliance or vitality.<br>**2.** Lacking luster or shine. | *"The quick-silvery glaze on the rivers and pools vanished; from broad mirrors of light they changed to lustreless sheets of lead, with a surface like a rasp."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[lustrelessness]] | noun | **1.** The property of having little or no contrast; lacking highlights or gloss. | *"In academic literature, lustrelessness designates the property of having little or no contrast; lacking highlights or gloss."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustrous]] | adjective | **1.** Made smooth and bright by or as if by rubbing; reflecting a sheen or glow.<br>**2.** Brilliant. | *"Good sparks and lustrous, a word, good metals."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustrum]] | noun | **1.** A period of five years.<br>**2.** A ceremonial purification of the roman population every five years following the census. | *"In the settlement of the questions the Republican party has completed its twenty-five years of glorious existence, and it has sent us here to prepare it for another lustrum of duty and of victory."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[lusty]] | adjective | **1.** Vigorously passionate.<br>**2.** Endowed with or exhibiting great bodily or mental health. | *"Though I look old, yet I am strong and lusty, For in my youth I never did apply Hot and rebellious liquors in my blood, Nor did not with unbashful forehead woo The means of weakness and debility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prolusion]] | noun | **1.** A short introductory essay preceding the text of a book.<br>**2.** Exercising in preparation for strenuous activity. | *"But why such long prolusion and display, Such turning and adjustment of the harp, And taking it upon your breast, at length, Only to speak dry words across its strings?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[prolusory]] | adjective | **1.** Of or relating to or having the character of a prolusion. | *"In academic literature, prolusory designates of or relating to or having the character of a prolusion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LUS
  </div>
</div>
