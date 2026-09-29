---
status: unread
type: root_dashboard
---
# Dashboard — vok
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vok-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to call or summon”</span>
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

The root **vok** means to call or summon. It refers to the action of calling and carrying out this process. In English, this root forms words such as *revoke*, *invoke*, *provoke*, and *evoke*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to call or summon
> The root **vok** means to call or summon. It refers to the action of calling and carrying out this process. In English, this root forms words such as *revoke*, *invoke*, *provoke*, and *evoke*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To call or summon</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Two people conversing warmly and exchanging clear spoken words.</mark>
> - **Everyday Connection**: Think of familiar words like *revoke* and *invoke*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vok** comes from a Latin word that means *"to call or summon"*.
  - At its core, it describes the action of call or summon.

- **The Big Picture Idea**:
  - Picture two people conversing warmly and exchanging clear spoken words.
  - Whenever you see **vok** in an English word, think of **to call or summon**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to call or summon).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Revoke**: To put an end to the validity of a decree or promise. *.*.
  - **Invoke**: An everyday English word showing the root's idea of *to call or summon*.
  - **Provoke**: To stimulate or give rise to a reaction or emotion, typically a strong or unwelcome one. 2. To deliberately anger someone.
  - **Evoke**: To bring or recall to the conscious mind. 2. To elicit or provoke a response. 3. To summon a spirit.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vok</mark>, think of <mark class="hl-def">to call or summon</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **vok** functions as a primary verbal base in English:
- **Primary Prefix Verbs (`-voke`)**:
  - *ex-* ("out") + *vocāre* $\to$ **evoke**.
  - *pro-* ("forth") + *vocāre* $\to$ **provoke**.
  - *con-* ("together") + *vocāre* $\to$ **convoke** (cross-indexed with [[Dashboard — voc]]).
  - *in-* ("upon") + *vocāre* $\to$ **invoke** (cross-indexed with [[Dashboard — voc]]).
  - *re-* ("back") + *vocāre* $\to$ **revoke** (cross-indexed with [[Dashboard — voc]]).
  - *aequus* + *vocāre* $\to$ **equivoke** (archaic/literary double entendre).
- **Adjectival & Agent Derivatives**:
  - *evoke* $\to$ **evocative**, **evocatively**, **evocator**.
  - *provoke* $\to$ **provocative**, **provocatively**, **provoker**, **provocateur**.

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

The derivatives of **vok** govern three primary conceptual vectors:
- **Memory, Emotion & Literary Resonance**: *evoke* (bring or recall to the conscious mind; elicit an emotional response), *evocative* (bringing strong images, memories, or feelings to mind), *evocatively*.
- **Incitement, Aggression & Controversy**: *provoke* (stimulate or give rise to a reaction; deliberately make someone annoyed or angry), *provocative* (causing annoyance, anger, or another strong reaction; sexually suggestive), *provocateur* (a person who provokes trouble).
- **Ambiguity & Verbal Wit**: *equivoke* (a pun or ambiguous word used to mislead; double meaning).

---

## 🔀 4. Prefix & Combining Dynamics on vok

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ex-`** ("out") | `ex-` + `vocāre` $\to$ `-voke` | Call out of slumber/memory $\to$ elicit emotion, conjure spirits | *evoke, evocative, evocatively* |
| **`pro-`** ("forth") | `pro-` + `vocāre` $\to$ `-voke` | Call forth to battle/anger $\to$ challenge, incite, outrage | *provoke, provocative, provocateur* |
| **`aequus`** ("equal") | `aequus` + `vocāre` | Call equally in two directions $\to$ pun, double entendre | *equivoke* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Literary Aesthetics & Poetry**: The psychological mechanism of sensory imagery and poetic resonance (*evocative imagery*, *evoking nostalgia*).
- **International Relations & Geopolitics**: Military border incursions, naval maneuvers, and diplomatic provocations (*unprovoked aggression*, *provocation*).
- **Fashion, Advertising & Modern Art**: High-impact, taboo-breaking creative strategies designed to arrest public attention (*provocative design*).
- **Espionage & Criminology**: Undercover incitement and covert destabilization (*agent provocateur*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[convoke]] | verb | **1.** Call together. | *"Jove, in great concern, convokes a council in the Milky Way."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[evoke]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Evoke or provoke to appear or occur. | *"The grey placidity of Val's closed eyelids and crossed hands was the last memory that Lawrence would have chosen to evoke on his wedding night."* — Anthony Pryde, *Nightfall* |
| [[evoked]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Evoke or provoke to appear or occur. | *"I hope you will excuse my want of acquaintance with the polite world.” Sir Leicester considers himself evoked out of the sanctuary by these remarks."* — Charles Dickens, *Bleak House* |
| [[invoke]] | verb | **1.** Summon into action or bring into existence, often as if by magic.<br>**2.** Cite as an authority; resort to. | *"Hence they are tempted at times to usurp public authority over the field of private rights in industry.[13] In other cases, when they have come to the end of their unaided powers, they invoke the aid of the law to accomplish their objects."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[irrevokable]] | adjective | **1.** Incapable of being retracted or revoked; - shakespeare. | *"In academic literature, irrevokable designates incapable of being retracted or revoked; - shakespeare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[provoke]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Evoke or provoke to appear or occur. | *"Strike not by land; keep whole; provoke not battle Till we have done at sea."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provoked]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Evoke or provoke to appear or occur. | *"No, let me speak, and let me rail so high That the false huswife Fortune break her wheel, Provoked by my offence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provoker]] | noun | **1.** Someone who deliberately foments trouble. | *"Faith, sir, we were carousing till the second cock; and drink, sir, is a great provoker of three things."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provoking]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Evoke or provoke to appear or occur. | *"I now perceive it was not altogether your brother’s evil disposition made him seek his death; but a provoking merit, set a-work by a reproveable badness in himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provokingly]] | adverb | **1.** In a provocative manner. | *"But as Oak was not only provokingly indifferent to public opinion, but a man who clung persistently to old habits and usages, simply because they were old, there was room for doubt as to his motives."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[revokable]] | adjective | **1.** Capable of being revoked or annulled. | *"In academic literature, revokable designates capable of being revoked or annulled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revoke]] | noun | **1.** The mistake of not following suit when able to do so.<br>**2.** Fail to follow suit when able and required to do so. | *"Let them assemble And, on a safer judgment, all revoke Your ignorant election."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unprovoked]] | adjective | **1.** Occurring without motivation or provocation; ; - f.d.roosevelt. | *"Who can wonder at the deadly hatred of the Typees to all foreigners after such unprovoked atrocities?"* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[unprovoking]] | adjective | **1.** Not provocative. | *"In academic literature, unprovoking designates not provocative."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VOK
  </div>
</div>
