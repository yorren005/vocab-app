---
status: unread
type: root_dashboard
---
# Dashboard — dict
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dict-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to say or tell”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Speaking words clearly so that an audience understands every sentence.</span>
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

The root **dict** means to say or tell. It refers to expressing words or thoughts aloud to share meaning. In English, this root forms words such as *dictionary*, *dictation*, *contradict*, and *indicate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to say or tell
> The root **dict** means to say or tell. It refers to expressing words or thoughts aloud to share meaning. In English, this root forms words such as *dictionary*, *dictation*, *contradict*, and *indicate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To say or tell</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Speaking words clearly so that an audience understands every sentence.</mark>
> - **Everyday Connection**: Think of familiar words like *dictionary* and *dictation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dict** comes from a Latin word that means *"to say or tell"*.
  - At its core, it describes the action of say or tell.

- **The Big Picture Idea**:
  - Picture speaking words clearly so that an audience understands every sentence.
  - Whenever you see **dict** in an English word, think of **to say or tell**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to say or tell).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Dictionary**: A book or electronic resource that lists the words of a language in alphabetical order and gives their meaning, equivalent words, and etymology.
  - **Dictation**: The action of saying words aloud to be typed or written down.
  - **Contradict**: To deny the truth of a statement by asserting the opposite.
  - **Indicate**: An everyday English word showing the root's idea of *to say or tell*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dict</mark>, think of <mark class="hl-def">to say or tell</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *deyḱ- (point out) ──> Latin dīcere (to speak) ──> dictāre (to dictate)
  │
  ├── Sovereign Authority & Law
  │     ├── dictate (command authoritatively)
  │     ├── dictation (transcription of spoken words)
  │     ├── dictator (absolute ruler)
  │     └── addict (ad- + dīcere: legally assigned ──> slave to habit)
  │
  ├── Language & Lexicography
  │     ├── diction (word choice; vocal enunciation)
  │     └── dictionary (codified lexicon of words)
  │
  ├── Foretelling & Pointing
  │     ├── prae- + dīcere ─────────> predict, prediction
  │     └── in- + dīcāre ───────────> indication (sign, pointer)
  │
  └── Solemn & Oppositional Pronouncements
        ├── bene + dīcere ──────────> benediction (sacred blessing)
        ├── contrā + dīcere ────────> contradict (speak against, deny)
        └── de- + dīcāre ───────────> dedication (formal consecration)
```

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

### Distinct Spheres of Manifestation
1. **Political Authoritarianism & Command**: *dictator*, *dictate*, *dictation* (autocratic power, imposing rules, verbal transcription).
2. **Language & Lexical Reference**: *dictionary*, *diction* (lexical corpora, articulation, poetic register).
3. **Forecasting & Prognosis**: *predict*, *prediction* (meteorology, statistical modeling, prophecy).
4. **Theology, Liturgy & Devotion**: *benediction*, *dedication* (priestly blessings, memorial inscriptions).
5. **Logic & Discourse**: *contradict* (logical refutation, stating the opposite).
6. **Psychiatry & Substance Abuse**: *addict* (compulsive dependency).
7. **Diagnostics & Evidence**: *indication* (symptom, medical pointer).

---

## 🔀 4. Prefix & Combining Dynamics on dict

### Classical Compounds
- **prae- ("before") + dict-**: *predict*, *prediction* (saying before it happens).
- **bene- ("well, good") + dict-**: *benediction* (speaking well; blessing).
- **contra- ("against") + dict-**: *contradict* (speaking against).
- **ad- ("to, bound to") + dict-**: *addict* (adjudged as a bondman).
- **de- ("completely") + dīcāre**: *dedication* (formal consecration).
- **in- ("toward, upon") + dīcāre**: *indication* (pointing out a fact).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Lexicography & Linguistics** | Corpus linguistics, phonetic pronunciation, style manuals | *dictionary*, *diction* |
| **Political Science & Governance** | Autocracy, totalitarian regimes, decrees, military juntas | *dictator*, *dictate*, *dictatorship* |
| **Statistical Modeling & Forecasting** | Predictive analytics, machine learning regression, weather forecasting | *predict*, *prediction*, *predictive* |
| **Addiction Medicine & Psychiatry** | Chemical dependency, behavioral compulsion, recovery protocols | *addict*, *addiction*, *addictive* |
| **Logic & Philosophy** | Law of non-contradiction, formal refutation | *contradict*, *contradiction* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[addict]] | noun | **1.** Someone who is so ardently devoted to something that it resembles an addiction.<br>**2.** Someone who is physiologically dependent on a substance; abrupt deprivation of the substance produces withdrawal symptoms. | *"If I had a thousand sons, the first humane principle I would teach them should be to forswear thin potations and to addict themselves to sack."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[addicted]] | verb | **1.** To cause (someone or oneself) to become dependent (on something, especially a narcotic drug).<br>**2.** Compulsively or physiologically dependent on something habit-forming. | *"He was employed as book-keeper in a large mercantile house; but soon became addicted to drink, and the story is ever the same; loss of position, poverty, disgrace, suffering and recklessness."* — Classic Author, *The wonders of prayer* |
| [[addiction]] | noun | **1.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs).<br>**2.** An abnormally strong craving. | *"He has begun to talk about Goodwood already.” “He will grow out of his excessive addiction to sport,” said Lucian."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[addictive]] | adjective | **1.** Causing or characterized by addiction. | *"In academic literature, addictive designates causing or characterized by addiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[benediction]] | noun | **1.** The act of praying for divine protection.<br>**2.** A ceremonial prayer invoking divine protection. | *"The benediction of these covering heavens Fall on their heads like dew! for they are worthy To inlay heaven with stars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[benedictive]] | adjective | **1.** Expressing benediction. | *"In academic literature, benedictive designates expressing benediction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contradict]] | verb | **1.** Be in contradiction with.<br>**2.** Deny the truth of. | *"Stand in his face to contradict his claim."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contradiction]] | noun | **1.** Opposition between two conflicting forces or ideas.<br>**2.** (logic) a statement that is necessarily false. | *"Without contradiction I have heard that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contradictorily]] | adverb | **1.** In a contradictory manner. | *"In academic literature, contradictorily designates in a contradictory manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contradictoriness]] | noun | **1.** The relation that exists when opposites cannot coexist. | *"He worked in a reverie now, musing upon her story, and upon the contradictoriness of that feminine heart which had caused her to speak more warmly to him to-night than she ever had done whilst unmarried and free to speak as warmly as she chose."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[contradictory]] | noun | **1.** Two propositions are contradictories if both cannot be true (or both cannot be false) at the same time.<br>**2.** Of words or propositions so related that both cannot be true and both cannot be false. | *"Among his other contradictory decorations he had the hat of a bishop and the little gloves of a baby."* — Charles Dickens, *Bleak House* |
| [[dictamnus]] | noun | **1.** A dicotyledonous genus of the family rutaceae. | *"In academic literature, dictamnus designates a dicotyledonous genus of the family rutaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dictaphone]] | noun | **1.** A tape recorder that records and reproduces dictation. | *"They haven't put me next to you for the fun of it, and they may have a dictaphone stuck around somewhere." Obediently Sherman approached the bars of the cage."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[dictate]] | noun | **1.** An authoritative rule.<br>**2.** A guiding principle. | *"Now, Esther, I don’t mean to amend that very objectionable course: I will not hold John Jarndyce’s favour on those unfair terms of compromise, which he has no right to dictate."* — Charles Dickens, *Bleak House* |
| [[dictated]] | verb | **1.** Issue commands or orders for.<br>**2.** Say out loud for the purpose of recording. | *"Jellyby, sitting in quite a nest of waste paper, drank coffee all the evening and dictated at intervals to her eldest daughter."* — Charles Dickens, *Bleak House* |
| [[dictation]] | noun | **1.** An authoritative direction or instruction to do something.<br>**2.** Speech intended for reproduction in writing. | *"However, as she at once proceeded with her dictation, and as I interrupted nothing by doing it, I ventured quietly to stop poor Peepy as he was going out and to take him up to nurse."* — Charles Dickens, *Bleak House* |
| [[dictator]] | noun | **1.** A speaker who dictates to a secretary or a recording machine.<br>**2.** A ruler who is unconstrained by law. | *"Our then dictator, Whom with all praise I point at, saw him fight When with his Amazonian chin he drove The bristled lips before him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dictatorial]] | adjective | **1.** Of or characteristic of a dictator.<br>**2.** Expecting unquestioning obedience. | *"Jaggers being highly dictatorial, and Wemmick obstinately justifying himself whenever there was the smallest point in abeyance for a moment."* — Charles Dickens, *Great Expectations* |
| [[dictatorially]] | adverb | **1.** In an overbearingly domineering manner; as a dictator. | *"Why will great people not only deafen us with the din of their equipage, and dazzle us with their fastidious pomp, but they must also be so very dictatorially wise?"* — Robert Burns, *The Letters of Robert Burns* |
| [[dictatorship]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"That certain sultanism of his brain, which had otherwise in a good degree remained unmanifested; through those forms that same sultanism became incarnate in an irresistible dictatorship."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[diction]] | noun | **1.** The articulation of speech regarded from the point of view of its intelligibility to the audience.<br>**2.** The manner in which something is expressed in words; - g.s.patton. | *"But, in the verity of extolment, I take him to be a soul of great article and his infusion of such dearth and rareness as, to make true diction of him, his semblable is his mirror and who else would trace him his umbrage, nothing more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dictionary]] | noun | **1.** A reference book containing an alphabetical list of words with information about them. | *"It is stated in the _Dictionary of National Biography_ (Vol."* — John Fletcher, *The Elder Brother* |
| [[dictostylium]] | noun | **1.** Any slime mold of the genus dictostylium. | *"In academic literature, dictostylium designates any slime mold of the genus dictostylium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dictum]] | noun | **1.** An authoritative declaration.<br>**2.** An opinion voiced by a judge on a point of law not directly bearing on the case in question and therefore not binding. | *"In a federal case[10] the judge, in a brief and acute dictum, recognized the evil of a rate war that would result from threats of definite cuts."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[dictyophera]] | noun | **1.** Closely related to genus phallus distinguished by an indusium hanging like a skirt from below the pileus. | *"In academic literature, dictyophera designates closely related to genus phallus distinguished by an indusium hanging like a skirt from below the pileus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dictyoptera]] | noun | **1.** In some classifications replaced by the orders (here suborders) blattodea (cockroaches) and manteodea (mantids); in former classifications often subsumed under a much broader order orthoptera. | *"In academic literature, dictyoptera designates in some classifications replaced by the orders (here suborders) blattodea (cockroaches) and manteodea (mantids); in former classifications often subsumed under a much broader order orthoptera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dictyopteran]] | adjective | **1.** Of or relating to or belonging to the order dictyoptera. | *"In academic literature, dictyopteran designates of or relating to or belonging to the order dictyoptera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dictyosome]] | noun | **1.** A netlike structure in the cytoplasm of animal cells (especially in those cells that produce secretions). | *"In academic literature, dictyosome designates a netlike structure in the cytoplasm of animal cells (especially in those cells that produce secretions)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edict]] | noun | **1.** A formal or authoritative proclamation.<br>**2.** A legally binding command or decision entered on the court record (as if issued by a court or judge). | *"Try thy cunning, Thidias; Make thine own edict for thy pains, which we Will answer as a law."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indict]] | verb | **1.** Accuse formally of a crime. | *"Deputy’s the nighest name to indict me by: but yer wouldn’t catch me pleading to that, neither.” “Deputy be it always, then."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[indictability]] | noun | **1.** The state of being liable to impeachment. | *"In academic literature, indictability designates the state of being liable to impeachment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indictable]] | adjective | **1.** Liable to be accused, or cause for such liability. | *"In academic literature, indictable designates liable to be accused, or cause for such liability."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indiction]] | noun | **1.** A 15-year cycle used as a chronological unit in ancient rome and adopted in some medieval kingdoms. | *"In academic literature, indiction designates a 15-year cycle used as a chronological unit in ancient rome and adopted in some medieval kingdoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indictment]] | noun | **1.** A formal document written for a prosecuting attorney charging a person with some offense.<br>**2.** An accusation of wrongdoing. | *"Marry, there is another indictment upon thee, for suffering flesh to be eaten in thy house, contrary to the law, for the which I think thou wilt howl."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interdict]] | noun | **1.** An ecclesiastical censure by the roman catholic church withdrawing certain sacraments and christian burial from a person or all persons in a particular district.<br>**2.** A court order prohibiting a party from doing a certain activity. | *"From this session interdict Every fowl of tyrant wing, Save the eagle, feather’d king; Keep the obsequy so strict."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interdiction]] | noun | **1.** Authoritative prohibition.<br>**2.** A court order prohibiting a party from doing a certain activity. | *"No, not to live.—O nation miserable, With an untitled tyrant bloody-scepter’d, When shalt thou see thy wholesome days again, Since that the truest issue of thy throne By his own interdiction stands accus’d, And does blaspheme his breed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonaddictive]] | adjective | **1.** Not causing or characterized by addiction. | *"In academic literature, nonaddictive designates not causing or characterized by addiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[predict]] | verb | **1.** Make a prediction about; tell in advance.<br>**2.** Indicate by signs. | *"To-day she is at Chesney Wold; yesterday she was at her house in town; to-morrow she may be abroad, for anything the fashionable intelligence can with confidence predict."* — Charles Dickens, *Bleak House* |
| [[predictability]] | noun | **1.** The quality of being predictable. | *"In academic literature, predictability designates the quality of being predictable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[predictable]] | adjective | **1.** Capable of being foretold. | *"Net yields from nonrenewable reserves, residues and substitutes had dwindled until exhaustion was certain and a timeline predictable."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[predictably]] | adverb | **1.** In a predictable manner or to a predictable degree. | *"In academic literature, predictably designates in a predictable manner or to a predictable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prediction]] | noun | **1.** The act of predicting (as by reasoning about the future).<br>**2.** A statement made about the future. | *"This villain of mine comes under the prediction; there’s son against father: the King falls from bias of nature; there’s father against child."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predictive]] | adjective | **1.** Of or relating to prediction; having value for making predictions. | *"But on this particular day it seemed as if December had remembered that it was time for winter and had turned suddenly dull and brooding, with a windless hush predictive of coming snow."* — L. M. Montgomery, *Anne of Avonlea* |
| [[predictor]] | noun | **1.** Someone who makes predictions of the future (usually on the basis of special knowledge).<br>**2.** Information that supports a probabilistic estimate of future events. | *"But, whether he has not been the cause of this poor man's death, as well as the predictor, may be very reasonably disputed."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[unaddicted]] | adjective | **1.** Not addicted. | *"In academic literature, unaddicted designates not addicted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpredictability]] | noun | **1.** The quality of being guided by sudden unpredictable impulses.<br>**2.** The trait of being unpredictably irresolute. | *"In academic literature, unpredictability designates the quality of being guided by sudden unpredictable impulses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpredictable]] | adjective | **1.** Not capable of being foretold.<br>**2.** Unknown in advance. | *"The rapid and unpredictable changes in prices gives opportunity for speculative profits, but injure legitimate business."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unpredictably]] | adverb | **1.** In an erratic unpredictable manner. | *"In academic literature, unpredictably designates in an erratic unpredictable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpredicted]] | adjective | **1.** Without warning or announcement; ; - m.a.d.howe. | *"In academic literature, unpredicted designates without warning or announcement; ; - m.a.d.howe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpredictive]] | adjective | **1.** Having no predictive value. | *"In academic literature, unpredictive designates having no predictive value."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DICT
  </div>
</div>
