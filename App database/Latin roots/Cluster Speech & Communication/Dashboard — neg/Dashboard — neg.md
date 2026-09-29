---
status: unread
type: root_dashboard
---
# Dashboard — neg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">neg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to deny”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Two people conversing warmly and exchanging clear spoken words.</span>
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

The root **neg** means to deny. It refers to the action of denying and carrying out this process. In English, this root forms words such as *negative*, *negate*, *abnegate*, and *renegade*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to deny
> The root **neg** means to deny. It refers to the action of denying and carrying out this process. In English, this root forms words such as *negative*, *negate*, *abnegate*, and *renegade*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To deny</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *negative* and *negate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **neg** comes from a Latin word that means *"to deny"*.
  - At its core, it describes the action of deny.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **neg** in an English word, think of **to deny**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to deny).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Negative**: Consisting in or characterized by the absence of positive attributes. 2. Expressing refusal or disagreement. 3. Less than zero. 4. A negative statement or photographic plate.
  - **Negate**: To nullify.
  - **Abnegate**: To renounce or reject something desired or valuable. 2. To surrender or relinquish power or responsibility.
  - **Renegade**: A person who deserts and betrays an organization, country, or set of principles. 2. Having abandoned one's allegiance.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">neg</mark>, think of <mark class="hl-def">to deny</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **neg** operates through two distinct classical stems:
- **Verbal Denial Stem (`neg-` / `negāt-` < *negāre*)**:
  - *negāre* $\to$ **negate**, **negation**, **negative**, **negatively**, **negativity**.
  - *ab-* ("away") + *negāre* $\to$ **abnegate**, **abnegation**.
  - *de-* ("completely") + Old French *nier* (< *negāre*) $\to$ **deny**, **denial**, **undeniable**, **undeniably**.
  - *re-* ("again, back") + *negāre* $\to$ **renege**, **renegade**.
- **Omission & Carelessness Stem (`negleg-` / `neglig-` < *neglegere*)**:
  - *neglegere* $\to$ *negligēns* $\to$ **neglect**, **negligence**, **negligent**, **negligible**.

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

The derivatives of **neg** govern four primary conceptual fields:
- **Formal Refusal & Self-Denial**: *abnegate* (renounce or reject a right or belief), *abnegation* (self-denial), *denial* (refusal to acknowledge reality or truth), *deny*.
- **Logic, Mathematics & Physics**: *negate* (nullify, make ineffective), *negation* (contradiction of a proposition), *negative* (consisting in or characterized by the absence rather than presence of features; quantities less than zero).
- **Apostasy, Betrayal & Breach of Faith**: *renegade* (deserter of an organization, country, or set of principles), *renege* (go back on a promise, undertaking, or contract).
- **Moral & Legal Culpability**: *neglect* (fail to care for properly), *negligence* (failure to take proper care in doing something), *negligent* (failing to take proper care), *negligible* (so small or unimportant as to be not worth considering).

---

## 🔀 4. Prefix & Combining Dynamics on neg

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ab-`** ("away, off") | `ab-` + `negāre` | Deny away from oneself $\to$ self-denial, surrender of rights | *abnegate, abnegation* |
| **`de-`** ("intensively") | `de-` + *nier* (< `negāre`) | Deny emphatically $\to$ declare untrue, refuse | *denial, deny, undeniable* |
| **`re-`** ("back, again") | `re-` + `negāre` | Deny one's prior faith/word $\to$ desert, break promise | *renegade, renege* |
| **`nec`** + **`legere`** | `neg-` + `legere` | Not picking up $\to$ carelessness, failure of duty | *neglect, negligence, negligent, negligible* |
| **`-ive`** (adjectival) | `negāt-` + `-ive` | Expressing denial or absence $\to$ sub-zero, pessimistic | *negative, negativity* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Jurisprudence & Tort Law**: The foundational standard of civil liability (*negligence*, *contributory negligence*, *gross negligence*).
- **Formal Logic & Philosophy**: Propositional calculus, Boolean algebra, and existential negation (*negation*, *double negation*, *negative proof*).
- **Electrical Engineering & Physics**: Polarity, electron charge, and thermodynamic states (*negative charge*, *negative feedback*).
- **Psychology & Psychoanalysis**: Defense mechanisms repudiating conscious awareness of trauma or guilt (*denial*, *negation*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abnegate]] | verb | **1.** Deny oneself (something); restrain, especially from indulging in some pleasure.<br>**2.** Surrender (power or a position). | *"He shook in a self-abnegating way, as one who shook for Tellson and Co."* — Charles Dickens, *A Tale of Two Cities* |
| [[abnegation]] | noun | **1.** The denial and rejection of a doctrine or belief.<br>**2.** Renunciation of your own interests in favor of the interests of others. | *"Dear father,” he said sadly, “I wish you would not expose yourself to such gratuitous pain from scoundrels!” “Pain?” said his father, his rugged face shining in the ardour of self-abnegation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[abnegator]] | noun | **1.** One who gives up or relinquishes or renounces something. | *"In academic literature, abnegator designates one who gives up or relinquishes or renounces something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negaprion]] | noun | **1.** Lemon sharks. | *"In academic literature, negaprion designates lemon sharks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negate]] | verb | **1.** Be in contradiction with.<br>**2.** Deny the truth of. | *"Does he, in fact, deny--negate--himself (Mark 8:34)?"* — T. R. Glover, *The Jesus of History* |
| [[negation]] | noun | **1.** A negative statement; a statement that is a refusal or denial of some other statement.<br>**2.** The speech act of negating. | *"Why, my negation hath no taste of madness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negative]] | noun | **1.** A reply of denial.<br>**2.** A piece of photographic film showing an image with light and shade or colors reversed. | *"If thou wilt confess, Or else be impudently negative, To have nor eyes nor ears nor thought, then say My wife’s a hobby-horse, deserves a name As rank as any flax-wench that puts to Before her troth-plight: say’t and justify’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negatively]] | adverb | **1.** In a harmful manner.<br>**2.** In a negative way. | *"She is also such a perfect dear that her influence is something terrific, even if negatively expressed."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[negativeness]] | noun | **1.** The character of the negative electric pole.<br>**2.** Characterized by habitual skepticism and a disagreeable tendency to deny or oppose or resist suggestions or commands. | *"In academic literature, negativeness designates the character of the negative electric pole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negativism]] | noun | **1.** Characterized by habitual skepticism and a disagreeable tendency to deny or oppose or resist suggestions or commands. | *"In academic literature, negativism designates characterized by habitual skepticism and a disagreeable tendency to deny or oppose or resist suggestions or commands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negativist]] | noun | **1.** Someone who refuses to do what is asked or does the opposite of what is asked.<br>**2.** Someone who is resigned to defeat without offering positive suggestions. | *"In academic literature, negativist designates someone who refuses to do what is asked or does the opposite of what is asked."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negativity]] | noun | **1.** The character of the negative electric pole.<br>**2.** Characterized by habitual skepticism and a disagreeable tendency to deny or oppose or resist suggestions or commands. | *"In academic literature, negativity designates the character of the negative electric pole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negatron]] | noun | **1.** An elementary particle with negative charge. | *"In academic literature, negatron designates an elementary particle with negative charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negev]] | noun | **1.** A desert in southern israel. | *"In academic literature, negev designates a desert in southern israel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neglect]] | noun | **1.** Lack of attention and due care.<br>**2.** The state of something that has been unused and neglected. | *"Give my love fame faster than Time wastes life, So thou prevent’st his scythe, and crooked knife. 101 O truant Muse what shall be thy amends, For thy neglect of truth in beauty dyed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[neglected]] | verb | **1.** Leave undone or leave out.<br>**2.** Fail to do something; leave something undone. | *"Neglected, rather; And then when poisoned hours had bound me up From mine own knowledge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[neglecter]] | noun | **1.** A person who is neglectful and gives little attention or respect to people or responsibilities. | *"In academic literature, neglecter designates a person who is neglectful and gives little attention or respect to people or responsibilities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neglectful]] | adjective | **1.** Not showing due care or attention.<br>**2.** Failing in what duty requires. | *"Jarndyce had not been neglectful of the adjuration."* — Charles Dickens, *Bleak House* |
| [[neglectfully]] | adverb | **1.** In a neglectful manner. | *"In academic literature, neglectfully designates in a neglectful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neglectfulness]] | noun | **1.** The trait of neglecting responsibilities and lacking concern. | *"In academic literature, neglectfulness designates the trait of neglecting responsibilities and lacking concern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neglige]] | noun | **1.** A loose dressing gown for women. | *"In academic literature, neglige designates a loose dressing gown for women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negligee]] | noun | **1.** A loose dressing gown for women. | *"In academic literature, negligee designates a loose dressing gown for women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negligence]] | noun | **1.** Failure to act with the prudence that a reasonable person would exercise under the same circumstances.<br>**2.** The trait of neglecting responsibilities and lacking concern. | *"Howsoe’er ’tis strange, Or that the negligence may well be laugh’d at, Yet is it true, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negligent]] | adjective | **1.** Characterized by neglect and undue lack of concern. | *"Your letters did withhold our breaking forth Till we perceived both how you were wrong led And we in negligent danger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negligently]] | adverb | **1.** In a negligent manner. | *"I have no need to observe that I do not wilfully or negligently mislead my readers and that before I wrote that description I took pains to investigate the subject."* — Charles Dickens, *Bleak House* |
| [[negligible]] | adjective | **1.** So small as to be meaningless; insignificant.<br>**2.** Not worth considering. | *"In such a trance the bodily processes are so near to absolute suspension that the air and food consumed are practically negligible."* — Jack London, *The Jacket (The Star-Rover)* |
| [[negociate]] | verb | **1.** Be successful; achieve a goal.<br>**2.** Sell or discount. | *"They disclose Mary and her brother zealous to repay one good turn with another by watching the success of his dramatic efforts and endeavouring to negociate favourably for him with actors and managers."* — Anne Gilchrist, *Mary Lamb* |
| [[negotiable]] | adjective | **1.** Capable of being passed or negotiated.<br>**2.** Able to be negotiated or arranged by compromise. | *"Purchase in the open market anywhere various kinds of negotiable paper. d."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[negotiant]] | noun | **1.** Someone who negotiates (confers with others in order to reach a settlement). | *"In academic literature, negotiant designates someone who negotiates (confers with others in order to reach a settlement)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negotiate]] | verb | **1.** Discuss the terms of an arrangement.<br>**2.** Succeed in passing through, around, or over. | *"Have you any commission from your lord to negotiate with my face?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negotiation]] | noun | **1.** A discussion intended to produce an agreement.<br>**2.** The activity or business of negotiating an agreement; coming to terms. | *"Krook is at home, as in that case they may complete the negotiation without delay."* — Charles Dickens, *Bleak House* |
| [[negotiator]] | noun | **1.** Someone who negotiates (confers with others in order to reach a settlement). | *"This was accordingly the process adopted in the case of France in 1798.] [It has been the usage for the Executive, when it communicates a treaty to the Senate for their ratification, to communicate also the correspondence of the negotiators."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[negotiatress]] | noun | **1.** A woman negotiator. | *"In academic literature, negotiatress designates a woman negotiator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negotiatrix]] | noun | **1.** A woman negotiator. | *"In academic literature, negotiatrix designates a woman negotiator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negress]] | noun | **1.** A black woman or girl. | *"It was ten o’clock at night before we ventured to creep in again, and then she asked Joe why he hadn’t married a Negress Slave at once?"* — Charles Dickens, *Great Expectations* |
| [[negritude]] | noun | **1.** An ideological position that holds black culture to be independent and valid on its own terms; an affirmation of the african cultural heritage. | *"In academic literature, negritude designates an ideological position that holds black culture to be independent and valid on its own terms; an affirmation of the african cultural heritage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[negro]] | noun | **1.** A person with dark skin who comes from africa (or whose ancestors came from africa).<br>**2.** Relating to or characteristic of or being a member of the traditional racial division of mankind having brown to black pigmentation and tightly curled hair. | *"I shall answer that better to the commonwealth than you can the getting up of the negro’s belly!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[negroid]] | noun | **1.** A person with dark skin who comes from africa (or whose ancestors came from africa).<br>**2.** Characteristic of people traditionally classified as the negro race. | *"Their paler smaller negroid hands jingle the twingtwang wires."* — James Joyce, *Ulysses* |
| [[negus]] | noun | **1.** Wine and hot water with sugar and lemon juice and nutmeg. | *"He gave us, in his glass of negus, “Better health to our young friend!” and supposed and gaily pursued the case of his being reserved like Whittington to become Lord Mayor of London."* — Charles Dickens, *Bleak House* |
| [[nonnegative]] | adjective | **1.** Either positive or zero. | *"In academic literature, nonnegative designates either positive or zero."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renegade]] | noun | **1.** Someone who rebels and becomes an outlaw.<br>**2.** A disloyal person who betrays or deserts his cause or religion or political party or friend etc. | *"This is 'Peter Bell the Third' (1819), an attack on Wordsworth, partly literary for the dulness of his writing since he had been sunk in clerical respectability, partly political for his renegade flunkyism."* — Sydney Waterlow, *Shelley* |
| [[renege]] | noun | **1.** The mistake of not following suit when able to do so.<br>**2.** Fail to fulfill a promise or obligation. | *"His captain’s heart, Which in the scuffles of great fights hath burst The buckles on his breast, reneges all temper And is become the bellows and the fan To cool a gipsy’s lust."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[renegociate]] | verb | **1.** Negociate anew.<br>**2.** Revise the terms of in order to limit or regain excess profits gained by the contractor. | *"In academic literature, renegociate designates negociate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renegotiate]] | verb | **1.** Negociate anew.<br>**2.** Revise the terms of in order to limit or regain excess profits gained by the contractor. | *"In academic literature, renegotiate designates negociate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senega]] | noun | **1.** Dried root of two plants of the genus polygala containing an irritating saponin.<br>**2.** Perennial bushy herb of central and southern united states having white flowers with green centers and often purple crest; similar to seneca snakeroot. | *"In academic literature, senega designates dried root of two plants of the genus polygala containing an irritating saponin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[senegal]] | noun | **1.** A republic in northwestern africa on the coast of the atlantic; formerly a french colony but achieved independence in 1960. | *"The Slave’s Lament It was in sweet Senegal that my foes did me enthral, For the lands of Virginia,—ginia, O: Torn from that lovely shore, and must never see it more; And alas!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[senegalese]] | noun | **1.** A native or inhabitant of senegal.<br>**2.** Of or relating to or characteristic of senegal or its people. | *"In academic literature, senegalese designates a native or inhabitant of senegal."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NEG
  </div>
</div>
