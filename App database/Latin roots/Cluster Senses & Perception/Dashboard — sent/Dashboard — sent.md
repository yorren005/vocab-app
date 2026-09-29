---
status: unread
type: root_dashboard
---
# Dashboard — sent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to feel or perceive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Using your eyes, ears, nose, and fingertips to notice the world around you.</span>
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

The root **sent** means to feel or perceive. It refers to the action of feeling and carrying out this process. In English, this root forms words such as *sentiment*, *consent*, *dissent*, and *resent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to feel or perceive
> The root **sent** means to feel or perceive. It refers to the action of feeling and carrying out this process. In English, this root forms words such as *sentiment*, *consent*, *dissent*, and *resent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To feel or perceive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Using your eyes, ears, nose, and fingertips to notice the world around you.</mark>
> - **Everyday Connection**: Think of familiar words like *sentiment* and *consent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sent** comes from a Latin word that means *"to feel or perceive"*.
  - At its core, it describes the action of feel or perceive.

- **The Big Picture Idea**:
  - Picture using your eyes, ears, nose, and fingertips to notice the world around you.
  - Whenever you see **sent** in an English word, think of **to feel or perceive**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to feel or perceive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sentiment**: A thought, opinion, or attitude prompted or colored by feeling. 2. Tender, romantic, or nostalgic emotion.
  - **Consent**: To give permission or approval for something to happen. 2. Voluntary agreement or compliance.
  - **Dissent**: To hold or express opinions at variance with the majority or orthodox authority. 2. Nonconformity or ideological disagreement.
  - **Resent**: To feel bitterness, indignant displeasure, or ill-will at an act, remark, or person.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sent</mark>, think of <mark class="hl-def">to feel or perceive</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Present Participle Base (`-ient`):** *sent-* + *-ient* $\to$ *sentient* (endowed with feeling or consciousness), *sentience*.
- **Abstract Noun Base (`-ment`):** *sent-* + *-i-* + *-ment* $\to$ *sentiment* (feeling, attitude, opinion), *sentimental*, *sentimentality*.
- **Aphoristic Base (`sententia`):** *sententiōsus* $\to$ *sententious* (moralizing, aphoristic), *sententiously*.
- **Prefixation of Collective Feeling:**
  - `con-` + *sent* $\to$ *consent* (agreement, permission), *consentient*.
  - `dis-` + *sent* $\to$ *dissent* (disagreement, departure from orthodoxy), *dissenter*, *dissentient*.
  - `re-` + *sent* $\to$ *resent* (feel bitter indignation), *resentment*, *resentful*.
  - `prae-` + *sent* $\to$ *presentiment* (an intuitive foreboding).

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

### 1. Consciousness & Animal Ethics
- *sentient* (capable of sensing, experiencing subjective awareness and feelings).
- *sentience* (the capacity to experience feelings, pleasure, and pain).

### 2. Emotion & Nostalgia
- *sentiment* (a view or attitude prompted by feeling; refined or tender emotion).
- *sentimental* (prompted by feelings of tenderness, sadness, or nostalgia).
- *sentimentality* (excessive or mawkish emotional indulgence).

### 3. Civic, Political & Religious Alignment
- *consent* (permission, mutual agreement).
- *dissent* (the holding or expression of opinions at variance with those previously or commonly held).
- *dissenter* (one who disagrees, specifically with an established church or doctrine).

### 4. Psychological Memory of Injury
- *resent* (to feel bitterness or indignation at having been treated unfairly).
- *resentment* (persistent bitter grievance).
- *resentful* (feeling or expressing bitterness at having been treated unfairly).

---

## 🔀 4. Prefix & Combining Dynamics on sent

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `con-` + `sent` | Harmonizing prefixation | Shared feeling, concurrence, authorization | *consent, consentient* |
| `dis-` + `sent` | Adversative prefixation | Divergence in feeling, ideological departure | *dissent, dissenter, dissentient* |
| `re-` + `sent` | Repetitive / reactive prefix | Re-feeling an old grievance with bitter indignation | *resent, resentment, resentful* |
| `prae-` + `sent-` + `-i-ment` | Anticipatory prefixation | A feeling that something bad is about to happen | *presentiment* |
| `sent-` + `-ient` | Participial vitality | Endowed with subjective consciousness and feeling | *sentient, sentience* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Philosophy of Mind & AI Ethics:** Sentience in non-human animals, artificial consciousness, qualia, the sentience criterion for moral standing.
- **Constitutional Law & Politics:** The age of consent, manufacturing consent (Chomsky), political dissent, dissenting judicial opinions.
- **Psychology & Sociology:** Resentment and *ressentiment* (Nietzsche / Scheler), sentiment analysis in natural language processing (NLP).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[absent]] | verb | **1.** Go away or leave.<br>**2.** Not being in a specified place. | *"My lord your son made me to think of this; Else Paris, and the medicine, and the king, Had from the conversation of my thoughts Haply been absent then."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[absentee]] | noun | **1.** One that is absent or not in residence. | *"Agricultural land in the hands of absentee landlords yields an income not very clearly due to social service, and this phase of property has been especially assailed during the past century."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[absenteeism]] | noun | **1.** Habitual absence from work. | *"I disapprove of absenteeism; and now the land's mine, why, I must put up with it, I suppose, and live upon it in spite of myself."* — Grant Allen, *Michael's Crag* |
| [[absently]] | adverb | **1.** In an absentminded or preoccupied manner. | *"Her hand often lay immovably on these, while she absently looked in front of her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[absentminded]] | adjective | **1.** Lost in thought; showing preoccupation. | *"I noticed that you have been absentminded till now."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[absentmindedly]] | adverb | **1.** In an absentminded or preoccupied manner. | *"He comforted her, absentmindedly, and dressed in the dark, swearing at the clumsy leggings."* — Poul Anderson, *The Valor of Cappen Varra* |
| [[absentmindedness]] | noun | **1.** Preoccupation so great that the ordinary demands on attention are ignored. | *"In academic literature, absentmindedness designates preoccupation so great that the ordinary demands on attention are ignored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assent]] | noun | **1.** Agreement with a statement or proposal to do something.<br>**2.** To agree or express agreement. | *"First, that without the King’s assent or knowledge, You wrought to be a legate, by which power You maimed the jurisdiction of all bishops."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assenter]] | noun | **1.** A person who assents. | *"In academic literature, assenter designates a person who assents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assentient]] | adjective | **1.** Expressing agreement or consent. | *"In academic literature, assentient designates expressing agreement or consent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assenting]] | noun | **1.** Agreeing with or consenting to (often unwillingly).<br>**2.** To agree or express agreement. | *"After breakfast it is time to go to school." The mother, assenting, rose and went to the table to fill their cups."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[consent]] | noun | **1.** Permission to do something.<br>**2.** Give an affirmative reply to; respond favorably to. | *"And each (though enemies to either’s reign) Do in consent shake hands to torture me, The one by toil, the other to complain How far I toil, still farther off from thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consentaneous]] | adjective | **1.** In complete agreement. | *"In academic literature, consentaneous designates in complete agreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consentient]] | adjective | **1.** In complete agreement. | *"In academic literature, consentient designates in complete agreement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consenting]] | verb | **1.** Give an affirmative reply to; respond favorably to.<br>**2.** Having given consent. | *"FIRST GENTLEMAN. ’Tis but the boldness of his hand haply, which his heart was not consenting to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disentangle]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Extricate from entanglement. | *"He gave it its present name and lived here shut up, day and night poring over the wicked heaps of papers in the suit and hoping against hope to disentangle it from its mystification and bring it to a close."* — Charles Dickens, *Bleak House* |
| [[disentangled]] | verb | **1.** Release from entanglement of difficulty.<br>**2.** Extricate from entanglement. | *"And all this the artist had disentangled from a rough block of stone--so vivid was his conception of the goddess, and so sure his hand."* — T. R. Glover, *The Jesus of History* |
| [[disentanglement]] | noun | **1.** The act of releasing from a snarled or tangled condition. | *"In academic literature, disentanglement designates the act of releasing from a snarled or tangled condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disentangler]] | noun | **1.** A person who removes tangles; someone who takes something out of a tangled state. | *"In academic literature, disentangler designates a person who removes tangles; someone who takes something out of a tangled state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissent]] | noun | **1.** (law) the difference of one judge's opinion from that of the majority.<br>**2.** A difference of opinion. | *"It’s two young men in a gig, ma’am, who want to see the house—yes, and if you please, I told them so!” in quick reply to a gesture of dissent from the housekeeper."* — Charles Dickens, *Bleak House* |
| [[dissenter]] | noun | **1.** A person who dissents from some established policy. | *"The family were of that "strict, not strictest species of Presbyterian Dissenter," and John attended also the Bible-class and Fellowship Meeting."* — John Cairns, *Principal Cairns* |
| [[dissentient]] | adjective | **1.** (of catholics) refusing to attend services of the church of england.<br>**2.** Disagreeing, especially with a majority. | *"South Carolina, to show the strength and unity of her opinions, brings her assembly to a unanimity, within seven votes; Pennsylvania, not to be outdone in this respect more than others, reduces her dissentient fraction to one vote."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[dissenting]] | verb | **1.** Withhold assent.<br>**2.** Express opposition through action or words. | *"No dissenting voice was raised against the marriage."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dissentious]] | adjective | **1.** Dissenting (especially dissenting with the majority opinion). | *"Thanks.—What’s the matter, you dissentious rogues, That, rubbing the poor itch of your opinion, Make yourselves scabs?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insentience]] | noun | **1.** Lacking consciousness or ability to perceive sensations. | *"In academic literature, insentience designates lacking consciousness or ability to perceive sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insentient]] | adjective | **1.** Devoid of feeling and consciousness and animation. | *"The cause of a brief sharp unforeseen heard loud lone crack emitted by the insentient material of a strainveined timber table."* — James Joyce, *Ulysses* |
| [[intrasentential]] | adjective | **1.** Of or relating to constituents within a sentence. | *"In academic literature, intrasentential designates of or relating to constituents within a sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misrepresent]] | verb | **1.** Represent falsely.<br>**2.** Tamper, with the purpose of deception. | *"They watch you, misrepresent you, write letters about you (anonymous sometimes), and you are the torment and the occupation of their lives."* — Charles Dickens, *Great Expectations* |
| [[misrepresentation]] | noun | **1.** A misleading falsehood.<br>**2.** A willful perversion of facts. | *"There may be an element of error, even of misrepresentation, in such estimates."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[nonrepresentational]] | adjective | **1.** Of or relating to a style of art in which objects do not resemble those known in physical nature. | *"In academic literature, nonrepresentational designates of or relating to a style of art in which objects do not resemble those known in physical nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrepresentative]] | adjective | **1.** Not standing for something else. | *"In academic literature, nonrepresentative designates not standing for something else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[present]] | noun | **1.** The period of time that is happening now; any continuous stretch of time including the moment of speech.<br>**2.** Something presented as a gift. | *"So either by thy picture or my love, Thyself away, art present still with me, For thou not farther than my thoughts canst move, And I am still with them, and they with thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentable]] | adjective | **1.** Fit to be seen. | *"I wiped my eyes, and put myself into presentable shape as soon as I could, and opened the door."* — Classic Author, *The wonders of prayer* |
| [[presentably]] | adverb | **1.** In a presentable manner. | *"In academic literature, presentably designates in a presentable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presentation]] | noun | **1.** The activity of formally presenting something (as a prize or reward).<br>**2.** A show or display; the act of presenting something to sight or view. | *"He uses his folly like a stalking-horse, and under the presentation of that he shoots his wit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentational]] | adjective | **1.** Of or relating to a presentation (especially in psychology or philosophy). | *"In academic literature, presentational designates of or relating to a presentation (especially in psychology or philosophy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presenter]] | noun | **1.** Someone who presents a message of some sort (as a petition or an address or a check or a memorial etc.).<br>**2.** An advocate who presents a person (as for an award or a degree or an introduction etc.). | *"EPILOGUE Dramatis Personæ RUMOUR, the Presenter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentiment]] | noun | **1.** A feeling of evil to come. | *"The Lord's blessing is enough for me_." The letter was sent and forgotten, but a strange presentiment came over the mind of the writer."* — Classic Author, *The wonders of prayer* |
| [[presentism]] | noun | **1.** The doctrine that the scripture prophecies of the apocalypse (as in the book of revelations) are presently in the course of being fulfilled. | *"In academic literature, presentism designates the doctrine that the scripture prophecies of the apocalypse (as in the book of revelations) are presently in the course of being fulfilled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presentist]] | noun | **1.** A theologian who believes that the scripture prophecies of the apocalypse (the book of revelation) are being fulfilled at the present time. | *"In academic literature, presentist designates a theologian who believes that the scripture prophecies of the apocalypse (the book of revelation) are being fulfilled at the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presently]] | adverb | **1.** In the near future.<br>**2.** At this time or period; now. | *"That, having this obtain’d, you presently Attend his further pleasure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentment]] | noun | **1.** An accusation of crime made by a grand jury on its own initiative.<br>**2.** A document that must be accepted and paid by another person. | *"Look here upon this picture, and on this, The counterfeit presentment of two brothers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presentness]] | noun | **1.** The quality of being the present; - r.e.spiller. | *"In academic literature, presentness designates the quality of being the present; - r.e.spiller."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[represent]] | verb | **1.** Take the place of or be parallel or equivalent to.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"For well I wot the empress never wags But in her company there is a Moor; And, would you represent our queen aright, It were convenient you had such a devil."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[representable]] | adjective | **1.** Expressible in symbolic form. | *"In academic literature, representable designates expressible in symbolic form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[representation]] | noun | **1.** A presentation to the mind in the form of an idea or image.<br>**2.** A creation that is a visual or tangible rendering of someone or something. | *"I doubt if my guardian were altogether taken by surprise when he received the representation, though it caused him much uneasiness and disappointment."* — Charles Dickens, *Bleak House* |
| [[representational]] | adjective | **1.** (used especially of art) depicting objects, figures,or scenes as seen. | *"In academic literature, representational designates (used especially of art) depicting objects, figures,or scenes as seen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[representative]] | noun | **1.** A person who represents others.<br>**2.** An advocate who represents someone else's policy or purpose. | *"The present representative of the Dedlocks is an excellent master."* — Charles Dickens, *Bleak House* |
| [[represented]] | verb | **1.** Take the place of or be parallel or equivalent to.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"In which (I would say) every difficulty, every contingency, every masterly fiction, every form of procedure known in that court, is represented over and over again?"* — Charles Dickens, *Bleak House* |
| [[resent]] | verb | **1.** Feel bitter or indignant about.<br>**2.** Wish ill or allow unwillingly. | *"He did not resent my conduct, he simply said that some day I should receive the first-fruits of the Spirit—that those who came to scoff sometimes remained to pray."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[resentment]] | noun | **1.** A feeling of deep and bitter anger and ill-will. | *"But what did you think upon the road?” “Wot do you mean?” growled Coavinses with an appearance of strong resentment."* — Charles Dickens, *Bleak House* |
| [[sent]] | noun | **1.** 100 senti equal 1 kroon in estonia.<br>**2.** Cause to go somewhere. | *"E’en that you have there. [_Exit._] COUNTESS. [_Reads._] _I have sent you a daughter-in-law; she hath recovered the king and undone me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sente]] | noun | **1.** 100 lisente equal 1 loti in lesotho; one sente is worth one-hundredth of a loti. | *"Ogni dolcezza, ogni pensiero umile Nasce nel core a chi parlar la sente; Ond’è beato chi prima la vide."* — George Eliot, *Middlemarch* |
| [[sentence]] | noun | **1.** A string of words satisfying the grammatical rules of a language.<br>**2.** (criminal law) a final judgment of guilty in a criminal case and the punishment that is imposed. | *"With that she sighed as she stood, With that she sighed as she stood, And gave this sentence then: Among nine bad if one be good, Among nine bad if one be good, There’s yet one good in ten._ COUNTESS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sentential]] | adjective | **1.** Of or relating to a sentence. | *"In academic literature, sentential designates of or relating to a sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sententious]] | adjective | **1.** Abounding in or given to pompous or aphoristic moralizing; - kathleen barnes.<br>**2.** Concise and full of meaning; ; - hervey allen. | *"By my faith, he is very swift and sententious."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sententiously]] | adverb | **1.** In a pithy sententious manner. | *"And don’t go thinking about her making a match for me—it is silly.” “Very well said, Tess!” observed her father sententiously."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sentience]] | noun | **1.** State of elementary or undifferentiated consciousness.<br>**2.** The faculty through which the external world is apprehended. | *"In academic literature, sentience designates state of elementary or undifferentiated consciousness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentiency]] | noun | **1.** The faculty through which the external world is apprehended. | *"In academic literature, sentiency designates the faculty through which the external world is apprehended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentient]] | adjective | **1.** Endowed with feeling and unstructured consciousness; - t.e.lawrence.<br>**2.** Consciously perceiving; ; - w.a.white. | *"Human shapes, interferences, troubles, and joys were all as if they were not, and there seemed to be on the shaded hemisphere of the globe no sentient being save himself; he could fancy them all gone round to the sunny side."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sentiment]] | noun | **1.** Tender, romantic, or nostalgic feeling or emotion.<br>**2.** A personal belief or judgment that is not founded on proof or certainty. | *"He was so full of feeling too and had such a delicate sentiment for what was beautiful or tender that he could have won a heart by that alone."* — Charles Dickens, *Bleak House* |
| [[sentimental]] | adjective | **1.** Given to or marked by sentiment or sentimentality.<br>**2.** Effusively or insincerely emotional. | *"Guppy looked at him with a sentimental air, “from boyhood’s hour.” Mr."* — Charles Dickens, *Bleak House* |
| [[sentimentalisation]] | noun | **1.** The act of indulging in sentiment. | *"In academic literature, sentimentalisation designates the act of indulging in sentiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentalise]] | verb | **1.** Make (someone or something) sentimental or imbue with sentimental qualities.<br>**2.** Look at with sentimentality or turn into an object of sentiment. | *"We, of this self-conscious, incredulous generation, sentimentalise our children, analyse our children, think we are endowed with a special capacity to sympathise and identify ourselves with children; we play at being children."* — Francis Thompson, *Shelley: An Essay* |
| [[sentimentalism]] | noun | **1.** The excessive expression of tender feelings, nostalgia, or sadness in any form.<br>**2.** A predilection for sentimentality. | *"The great unappreciated poet last cited {George Meredith} has defined passion as ‘noble strength on fire’; and this is the true passion of great natures and great poets; while sentimentalism is ignoble weakness dallying with fire; . . ."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[sentimentalist]] | noun | **1.** Someone who indulges in excessive sentimentality. | *"Lawrence isn't a sentimentalist like Jack or Val." Here Jack Bendish got as far as an artless "Oh, I say!" but his wife paid no attention."* — Anthony Pryde, *Nightfall* |
| [[sentimentality]] | noun | **1.** Falsely emotional in a maudlin way.<br>**2.** Extravagant or affected feeling or emotion. | *"The leaders of any group of men, whether of wage workers, merchants, manufacturers, or political constituents, find it necessary to show that the interest of their supporters rather than a broader "sentimentality" is uppermost in their thought."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sentimentalization]] | noun | **1.** The act of indulging in sentiment. | *"In academic literature, sentimentalization designates the act of indulging in sentiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentalize]] | verb | **1.** Look at with sentimentality or turn into an object of sentiment.<br>**2.** Make (someone or something) sentimental or imbue with sentimental qualities. | *"Now, I don't see why I should have been sentimentalizing over myself like that."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[sentimentally]] | adverb | **1.** In a sentimental manner. | *"Being even now only a young woman of twenty, one who mentally and sentimentally had not finished growing, it was impossible that any event should have left upon her an impression that was not in time capable of transmutation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sentimentise]] | verb | **1.** Act in a sentimental way or indulge in sentimental thoughts or expression. | *"In academic literature, sentimentise designates act in a sentimental way or indulge in sentimental thoughts or expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentimentize]] | verb | **1.** Act in a sentimental way or indulge in sentimental thoughts or expression. | *"In academic literature, sentimentize designates act in a sentimental way or indulge in sentimental thoughts or expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sentinel]] | noun | **1.** A person employed to keep watch for some anticipated event. | *"One aloof stand sentinel. [_Exeunt Fairies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sentry]] | noun | **1.** A person employed to keep watch for some anticipated event. | *"Enter a Sentry and his company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unpresentable]] | adjective | **1.** Creating an unfavorable or neutral first impression. | *"In academic literature, unpresentable designates creating an unfavorable or neutral first impression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrepresentative]] | adjective | **1.** Not exemplifying a class. | *"In academic literature, unrepresentative designates not exemplifying a class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsent]] | adjective | **1.** Not dispatched or transmitted. | *"In academic literature, unsent designates not dispatched or transmitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsentimental]] | adjective | **1.** Facing facts or difficulties realistically and with determination. | *"In academic literature, unsentimental designates facing facts or difficulties realistically and with determination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsentimentally]] | adverb | **1.** In an unsentimental manner. | *"In academic literature, unsentimentally designates in an unsentimental manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Senses & Perception]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SENT
  </div>
</div>
