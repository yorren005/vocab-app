---
status: unread
type: root_dashboard
---
# Dashboard — log
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">log-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“word, reason, or study”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sitting quietly while turning ideas over in your mind to solve a problem.</span>
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

The root **log** means word, reason, or study. It refers to a unit of language carrying meaning in speech or writing. In English, this root forms words such as *gather*, *analogy*, *anthology*, and *apology*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: word, reason, or study
> The root **log** means word, reason, or study. It refers to a unit of language carrying meaning in speech or writing. In English, this root forms words such as *gather*, *analogy*, *anthology*, and *apology*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Word, reason, or study</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sitting quietly while turning ideas over in your mind to solve a problem.</mark>
> - **Everyday Connection**: Think of familiar words like *gather* and *analogy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **log** comes from a Latin word that means *"word, reason, or study"*.
  - At its core, it describes word, reason, or study.

- **The Big Picture Idea**:
  - Picture sitting quietly while turning ideas over in your mind to solve a problem.
  - Whenever you see **log** in an English word, think of **thinking, reasoning, and reflection**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of word, reason, or study.
  - **Mental & Social**: How people experience, organize, or communicate about word, reason, or study.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gather**: An everyday English word showing the root's idea of *word, reason, or study*.
  - **Analogy**: A comparison between two things, typically for the purpose of explanation or clarification. 2. A correspondence or partial similarity.
  - **Anthology**: A published collection of poems or other pieces of writing.
  - **Apology**: A regretful acknowledgment of an offense or failure. 2. A formal defense of a belief or way of life.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">log</mark>, think of <mark class="hl-def">thinking, reasoning, and reflection</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **log** operates primarily as an overarching combining form:
- **Base Mathematical & Dialectical Stems (`log-`)**:
  - *lógos* $\to$ **logic**, **logical**, **logician**.
  - *lógos* + *arithmós* $\to$ **logarithm**, **logarithmic**.
- **Dramatic & Textual Compounds (`-logue` / `-log`)**:
  - *dia-* ("between") + *lógos* $\to$ **dialogue**.
  - *mono-* ("single") + *lógos* $\to$ **monologue**.
  - *pro-* ("before") + *lógos* $\to$ **prologue**.
  - *epi-* ("after") + *lógos* $\to$ **epilogue**.
  - *cata-* ("down, complete") + *lógos* $\to$ **catalog**.
  - *ana-* ("according to") + *lógos* $\to$ **analogy**, **analogous**.
  - *apo-* ("away") + *lógos* $\to$ **apology**, **apologetic**.
  - *eu-* ("good") + *lógos* $\to$ **eulogy**.
  - *neo-* ("new") + *lógos* $\to$ **neologism**.
  - *tri-* ("three") + *lógos* $\to$ **trilogy**.
  - *anthos* ("flower") + *lógos* $\to$ **anthology** ("a gathering of poetic flowers").
- **Universal Scientific Suffix (`-logy` < *-logía*)**:
  - *bios* + *-logía* $\to$ **biology**.
  - *oikos* + *-logía* $\to$ **ecology**.
  - *archaios* + *-logía* $\to$ **archaeology**.
  - *étymon* + *-logía* $\to$ **etymology**.
  - *idéa* + *-logía* $\to$ **ideology**.

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

The derivatives of **log** organize into five primary domains:
- **Philosophy, Reasoning & Mathematics**: *logic* (reasoning conducted or assessed according to strict principles of validity), *logical*, *logarithm* (quantity representing the power to which a fixed number must be raised to produce a given number), *analogy* (comparison between two things).
- **Scientific Disciplines & Academic Inquiry**: *biology* (study of living organisms), *ecology* (study of organisms and their environment), *archaeology* (study of human history through excavation), *etymology* (study of word origins).
- **Theatrical & Literary Structure**: *prologue* (separate introductory section of a literary work), *epilogue* (section at the end of a book or play), *dialogue* (conversation between two or more people), *monologue* (long speech by one actor), *trilogy* (group of three related literary works).
- **Public Discourse & Social Utterance**: *apology* (regretful acknowledgment of an offense or failure; formal defense of a belief), *eulogy* (speech praising someone, typically one who has just died).
- **Collections & Inventories**: *catalog* (complete list of items, typically in alphabetical order), *anthology* (published collection of poems or other pieces of writing).

---

## 🔀 4. Prefix & Combining Dynamics on log

| Greek Combining Form | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`dia-`** ("through, across")| `dia-` + *lógos* | Discourse between two or more minds $\to$ conversation | *dialogue* |
| **`pro-`** ("before") | `pro-` + *lógos* | Words spoken before the main drama $\to$ introductory speech | *prologue* |
| **`epi-`** ("upon, after")| `epi-` + *lógos* | Words added after the conclusion $\to$ final retrospective speech | *epilogue* |
| **`ana-`** ("according to")| `ana-` + *lógos* | Proportionate relation $\to$ parallel comparison | *analogy, analogous* |
| **`eu-`** ("good, well") | `eu-` + *lógos* | Words spoken well of someone $\to$ funeral panegyric | *eulogy, eulogize* |
| **`kata-`** ("down, complete")| `kata-` + *lógos* | A gathering down of items into a register $\to$ inventory | *catalog* |
| **`anthos`** ("flower") | `anthos` + *lógos* | A gathering of literary flowers $\to$ poetic collection | *anthology* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Philosophical Logic & Epistemology**: Syllogistic logic, propositional calculus, and fallacies (*formal logic*, *symbolic logic*).
- **Natural & Social Sciences**: Scientific taxonomies and empirical inquiry (*biology*, *ecology*, *sociology*, *psychology*).
- **Mathematics & Computation**: Computational complexity, exponential algorithms, and logarithmic scaling (*logarithmic scale*, *logarithm*).
- **Dramatic Arts & Screenwriting**: Script architecture and character monologues (*dramatic dialogue*, *soliloquy vs monologue*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allogamous]] | adjective | **1.** Relating to cross-fertilization in plants. | *"In academic literature, allogamous designates relating to cross-fertilization in plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allogamy]] | noun | **1.** Cross-fertilization in plants. | *"In academic literature, allogamy designates cross-fertilization in plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allogeneic]] | adjective | **1.** Denoting or relating to cells or tissues from individuals belonging to the same species but genetically dissimilar (and hence immunologically incompatible). | *"In academic literature, allogeneic designates denoting or relating to cells or tissues from individuals belonging to the same species but genetically dissimilar (and hence immunologically incompatible)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allograft]] | noun | **1.** Tissue or organ transplanted from a donor of the same species but different genetic makeup; recipient's immune system must be suppressed to prevent rejection of the graft. | *"In academic literature, allograft designates tissue or organ transplanted from a donor of the same species but different genetic makeup; recipient's immune system must be suppressed to prevent rejection of the graft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allograph]] | noun | **1.** A variant form of a grapheme, as `m' or `m' or a handwritten version of that grapheme.<br>**2.** A signature written by one person for another. | *"In academic literature, allograph designates a variant form of a grapheme, as `m' or `m' or a handwritten version of that grapheme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allographic]] | adjective | **1.** Of or relating to an allograph. | *"In academic literature, allographic designates of or relating to an allograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogical]] | adjective | **1.** Expressing, composed of, or based on an analogy. | *"Though the certainty of this criterion is far from demonstrable, yet it has the savor of analogical probability."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[analogise]] | verb | **1.** Make an analogy. | *"In academic literature, analogise designates make an analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogist]] | noun | **1.** Someone who looks for analogies or who reasons by analogy. | *"In academic literature, analogist designates someone who looks for analogies or who reasons by analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogize]] | verb | **1.** Make an analogy. | *"In academic literature, analogize designates make an analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogous]] | adjective | **1.** Similar or equivalent in some respects though otherwise dissimilar.<br>**2.** Corresponding in function but not in evolutionary origin. | *"A process somewhat analogous to that of alleged formations of the universe, time and times ago, was observable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[analogously]] | adverb | **1.** In an analogous manner. | *"In academic literature, analogously designates in an analogous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogy]] | noun | **1.** An inference that if things agree in some respects they probably agree in others.<br>**2.** Drawing a comparison in order to show a similarity in some respect. | *"The sweet scenes of autumn were for a while put by, unless some tender sonnet, fraught with the apt analogy of the declining year, with declining happiness, and the images of youth and hope, and spring, all gone together, blessed her memory."* — Jane Austen, *Persuasion* |
| [[anthologise]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologise designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologist]] | noun | **1.** An editor who makes selections for an anthology. | *"In academic literature, anthologist designates an editor who makes selections for an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologize]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologize designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthology]] | noun | **1.** A collection of selected literary passages. | *"The present writer lived for some time within a short distance of his house, but found no opportunity to meet him until it became necessary to obtain his portrait for an anthology in course of publication."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[antilog]] | noun | **1.** The number of which a given number is the logarithm. | *"In academic literature, antilog designates the number of which a given number is the logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilogarithm]] | noun | **1.** The number of which a given number is the logarithm. | *"In academic literature, antilogarithm designates the number of which a given number is the logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apologetic]] | adjective | **1.** Offering or expressing apology. | *"The old woman was terribly apologetic about having gone into the room."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[apologise]] | verb | **1.** Defend, explain, clear away, or make excuses for by reasoning.<br>**2.** Acknowledge faults or shortcomings or failing. | *"Rochester; “and in the interim, I shall myself look out for employment and an asylum for you.” “Thank you, sir; I am sorry to give—” “Oh, no need to apologise!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[apologist]] | noun | **1.** A person who argues to defend or justify some policy or institution. | *"He speaks of "the friendly Apollo." But the weakness of Plutarch as an apologist is his weakness as biographer--he never really gets at the bottom of anything."* — T. R. Glover, *The Jesus of History* |
| [[apologize]] | verb | **1.** Acknowledge faults or shortcomings or failing.<br>**2.** Defend, explain, clear away, or make excuses for by reasoning. | *"The relations between us are of an unfortunate description, Lady Dedlock; but as they are not of my making, I will not apologize for them."* — Charles Dickens, *Bleak House* |
| [[apology]] | noun | **1.** An expression of regret at having caused trouble for someone.<br>**2.** A formal written defense of something you believe in strongly. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[archaeologic]] | adjective | **1.** Related to or dealing with or devoted to archaeology. | *"Absolute archaeologic accuracy was promised."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[archaeological]] | adjective | **1.** Related to or dealing with or devoted to archaeology. | *"Morice, "Notes, Archaeological, Industrial, and Sociological, on the Western Dénés," _Transactions of the Canadian Institute_, iv. (1892-93) pp. 106 _sq._ Compare Rev."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[archaeologist]] | noun | **1.** An anthropologist who studies prehistoric people and their culture. | *"But there is a rival archaeologist who would ask nothing better than to get ahead of me in this matter."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[archaeology]] | noun | **1.** The branch of anthropology that studies prehistoric people and their cultures. | *"Dalyell, _Darker Superstitions of Scotland_ (Edinburgh, 1834), pp. 140 _sq._; Daniel Wilson, _The Archaeology and Prehistoric Annals of Scotland_ (Edinburgh, 1851), pp. 303 _sqq._; Lieut.-Col."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[biologic]] | adjective | **1.** Pertaining to biology or to life and living things. | *"This is the problem of eugenics, the choice and biologic breeding of capable men to be the citizens of the nation, and broadly understood, it includes both the negro and the immigrant problems.] [Footnote 2: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[biological]] | adjective | **1.** Pertaining to biology or to life and living things.<br>**2.** Of parents and children; related by blood. | *"We have to "think like God," he says (Mark 8:33); and perhaps God is in his thoughts neither so legal nor so biological as we are; perhaps he does not think first of edicts or of biological and psychological laws."* — T. R. Glover, *The Jesus of History* |
| [[biologically]] | adverb | **1.** With respect to biology. | *"In academic literature, biologically designates with respect to biology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologism]] | noun | **1.** Use of biological principles in explaining human especially social behavior. | *"In academic literature, biologism designates use of biological principles in explaining human especially social behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologist]] | noun | **1.** (biology) a scientist who studies living organisms. | *"If this question is open to dispute among biologists, it is only as regards a minute increment of improvement."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[biologistic]] | adjective | **1.** Of or relating to biologism. | *"In academic literature, biologistic designates of or relating to biologism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biology]] | noun | **1.** The science that studies living organisms.<br>**2.** Characteristic life processes and phenomena of living organisms. | *"Every day he seemed to become more interested in biology, and his name appeared once or twice in some of the scientific reviews in connection with certain curious experiments."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[catalog]] | noun | **1.** A book or pamphlet containing an enumeration of things.<br>**2.** A complete list of things; usually arranged systematically. | *"I p. 364.] [Footnote 7: In the first annual report of the United States Commissioner of Labor is given a long catalog of theories that have been suggested, many of them quite fantastic.] [Footnote 8: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cataloger]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloger designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalogue]] | noun | **1.** A complete list of things; usually arranged systematically.<br>**2.** A book or pamphlet containing an enumeration of things. | *"I say I am your mother, And put you in the catalogue of those That were enwombed mine. ’Tis often seen Adoption strives with nature, and choice breeds A native slip to us from foreign seeds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cataloguer]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloguer designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collogue]] | verb | **1.** Confer secretly. | *"I don't collogue [associate] with any such." "Then you'll have to do one of two things," said Tom."* — Harry Castlemon, *Rodney, the Partisan* |
| [[cologne]] | noun | **1.** A commercial center and river port in western germany on the rhine river; flourished during the 15th century as a member of the hanseatic league.<br>**2.** A perfumed liquid made of essential oils and alcohol. | *"She laughed at the gold brushes and gold manicure set, the polished array of boots, the fine silk and linen laid out on his bed, the perfume of sandalwood and Russian leather and eau de cologne."* — Anthony Pryde, *Nightfall* |
| [[dialogue]] | noun | **1.** A conversation between two persons.<br>**2.** The lines spoken by characters in drama or fiction. | *"But shall we have this dialogue between the Fool and the Soldier?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dislogistic]] | adjective | **1.** Expressing disapproval. | *"In academic literature, dislogistic designates expressing disapproval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecologic]] | adjective | **1.** Characterized by the interdependence of living organisms in an environment.<br>**2.** Of or relating to the science of ecology. | *"In academic literature, ecologic designates characterized by the interdependence of living organisms in an environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecological]] | adjective | **1.** Characterized by the interdependence of living organisms in an environment.<br>**2.** Of or relating to the science of ecology. | *"In support of the Charon agricultural mission, Planet Pluto, the Slingshot Logistics Depot, the Terminals' construction site, and ships moored or in transit within the Special Zone constitute an integrated ecological entity."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[ecologically]] | adverb | **1.** With respect to ecology. | *"In academic literature, ecologically designates with respect to ecology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecologist]] | noun | **1.** A biologist who studies the relation between organisms and their environment. | *"In academic literature, ecologist designates a biologist who studies the relation between organisms and their environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecology]] | noun | **1.** The environment as it relates to living organisms.<br>**2.** The branch of biology concerned with the relations between organisms and their environment. | *"In academic literature, ecology designates the environment as it relates to living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epilogue]] | noun | **1.** A short speech (often in verse) addressed directly to the audience by an actor at the end of a play.<br>**2.** A short passage added at the end of a literary work. | *"Exeunt all but Rosalind._] EPILOGUE ROSALIND."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[etymological]] | adjective | **1.** Based on or belonging to etymology. | *"See, for example, John Graham Dalyell, _The Darker Superstitions of Scotland_ (Edinburgh, 1834), pp. 176 _sq._: "The recognition of the pagan divinity Baal, or Bel, the Sun, is discovered through innumerable etymological sources."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[etymologise]] | verb | **1.** Give the etymology or derivation or suggest an etymology (for a word).<br>**2.** Construct the history of words. | *"In academic literature, etymologise designates give the etymology or derivation or suggest an etymology (for a word)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etymologist]] | noun | **1.** A lexicographer who specializes in etymology. | *"The name _Hogan_--which has occasioned some discussion among antiquaries and etymologists--is probably derived from _ogof_ or _ogov_, the British name for a cavern."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[etymologize]] | verb | **1.** Give the etymology or derivation or suggest an etymology (for a word).<br>**2.** Construct the history of words. | *"In academic literature, etymologize designates give the etymology or derivation or suggest an etymology (for a word)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etymologizing]] | noun | **1.** (historical linguistics) an explanation of the historical origins of a word or phrase.<br>**2.** Give the etymology or derivation or suggest an etymology (for a word). | *"In academic literature, etymologizing designates (historical linguistics) an explanation of the historical origins of a word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etymology]] | noun | **1.** A history of a word.<br>**2.** The study of the sources and development of words. | *"The terms selling or buying monopoly explain themselves, tho the latter conflicts with the etymology.[1] Under conditions of barter the selling and the buying monopoly would be the same thing in two aspects."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[eulogise]] | verb | **1.** Praise formally and eloquently. | *"On a fine still autumn evening the 'crying of the neck' has a wonderful effect at a distance, far finer than that of the Turkish muezzin, which Lord Byron eulogises so much, and which he says is preferable to all the bells of Christendom."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[eulogist]] | noun | **1.** An orator who delivers eulogies or panegyrics. | *"When the time does come, it will suffice if a kind eulogist will say for me, as one said for Grant, "Let his faults … be writ in water." Lige, my condition came about slowly."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[eulogistic]] | adjective | **1.** Formally expressing praise. | *"Though I never knew what they were (being in Welsh), further than that they were highly eulogistic of the lineage of Morgan ap-Kerrig."* — Charles Dickens, *Bleak House* |
| [[eulogize]] | verb | **1.** Praise formally and eloquently. | *"You will live, but perhaps I shall die, since he is weary of carrying me." The lame marshal went on praising and eulogizing Kalelealuaka as he drew near."* — Classic Author, *Hawaiian folk tales* |
| [[eulogy]] | noun | **1.** A formal expression of praise for someone who has died recently.<br>**2.** A formal expression of praise. | *"It is remarkable how little of the adjective there is--no compliment, no eulogy, no heroic touches, no sympathetic turn of phrase, no great passages of encomium or commendation."* — T. R. Glover, *The Jesus of History* |
| [[ideologic]] | adjective | **1.** Concerned with or suggestive of ideas. | *"In academic literature, ideologic designates concerned with or suggestive of ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideological]] | adjective | **1.** Of or pertaining to or characteristic of an orientation that characterizes the thinking of a group or nation.<br>**2.** Concerned with or suggestive of ideas. | *"In academic literature, ideological designates of or pertaining to or characteristic of an orientation that characterizes the thinking of a group or nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideologically]] | adverb | **1.** With respect to ideology. | *"In academic literature, ideologically designates with respect to ideology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideologist]] | noun | **1.** An advocate of some ideology. | *"In academic literature, ideologist designates an advocate of some ideology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideology]] | noun | **1.** An orientation that characterizes the thinking of a group or nation.<br>**2.** Imaginary or visionary theorization. | *"In academic literature, ideology designates an orientation that characterizes the thinking of a group or nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illogic]] | noun | **1.** Invalid or incorrect reasoning. | *"I trust you will believe me when I tell you that your illogic is far more painful for me to endure than all your tortures.” “Are you going to stop your knuckle-talking?” he demanded."* — Jack London, *The Jacket (The Star-Rover)* |
| [[illogical]] | adjective | **1.** Lacking in correct logical relation.<br>**2.** Lacking orderly continuity. | *"The inelasticity was necessitated by illogical federal and state laws restricting absolutely the further extension of credit when the reserves fell below the percentage of deposits (15 or 25 per cent) fixed by law."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[illogicality]] | noun | **1.** Invalid or incorrect reasoning. | *"In academic literature, illogicality designates invalid or incorrect reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illogically]] | adverb | **1.** In an illogical manner. | *"I don't know any," he replied bluntly, and the answer was so surprisingly, illogically different from what I expected, that involuntarily I laughed, and went on laughing while he stammered and tried to explain."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[illogicalness]] | noun | **1.** Invalid or incorrect reasoning. | *"In academic literature, illogicalness designates invalid or incorrect reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologic]] | adjective | **1.** Of or relating to immunology. | *"In academic literature, immunologic designates of or relating to immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunological]] | adjective | **1.** Of or relating to immunology. | *"In academic literature, immunological designates of or relating to immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologically]] | adverb | **1.** From the point of view of immunology. | *"In academic literature, immunologically designates from the point of view of immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunologist]] | noun | **1.** A medical scientist who specializes in immunology. | *"In academic literature, immunologist designates a medical scientist who specializes in immunology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immunology]] | noun | **1.** The branch of medical science that studies the body's immune system. | *"In academic literature, immunology designates the branch of medical science that studies the body's immune system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[log]] | noun | **1.** A segment of the trunk of a tree when stripped of branches.<br>**2.** The exponent required to produce a given number. | *"Enter Ferdinand bearing a log."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logagraphia]] | noun | **1.** A loss of the ability to write or to express thoughts in writing because of a brain lesion. | *"In academic literature, logagraphia designates a loss of the ability to write or to express thoughts in writing because of a brain lesion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logan]] | noun | **1.** A mountain peak in the st. elias range in the southwestern yukon territory in canada (19,850 feet high). | *"Arrived in Berlin, he joined his friends--Nelson, Graham, Wallace, and Logan Aikman."* — John Cairns, *Principal Cairns* |
| [[loganberry]] | noun | **1.** Red-fruited bramble native from oregon to baja california.<br>**2.** Large red variety of the dewberry. | *"In academic literature, loganberry designates red-fruited bramble native from oregon to baja california."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logania]] | noun | **1.** Type genus of the loganiaceae; australian and new zealand shrubs sometimes cultivated for their flowers. | *"In academic literature, logania designates type genus of the loganiaceae; australian and new zealand shrubs sometimes cultivated for their flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loganiaceae]] | noun | **1.** A dicotyledonous family of plants of order gentianales. | *"In academic literature, loganiaceae designates a dicotyledonous family of plants of order gentianales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logarithm]] | noun | **1.** The exponent required to produce a given number. | *"But it is best not to be intimate with gentlemen of this profession and to take the calculations at second hand, as you do logarithms, for to work them yourself, depend upon it, will cost you something considerable."* — William Makepeace Thackeray, *Vanity Fair* |
| [[logarithmic]] | adjective | **1.** Of or relating to or using logarithms. | *"In academic literature, logarithmic designates of or relating to or using logarithms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logarithmically]] | adverb | **1.** In a logarithmic manner. | *"In academic literature, logarithmically designates in a logarithmic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loge]] | noun | **1.** Balcony consisting of the forward section of a theater mezzanine.<br>**2.** Private area in a theater or grandstand where a small group can watch the performance. | *"At the end of the act, George was out of the box in a moment, and he was even going to pay his respects to Rebecca in her loge."* — William Makepeace Thackeray, *Vanity Fair* |
| [[logger]] | noun | **1.** A person who fells trees. | *"You logger-headed and unpolish’d grooms!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logging]] | noun | **1.** The work of cutting down trees for timber.<br>**2.** Enter into a log, as on ships and planes. | *"In the Heart of the Logging District. 51 IV."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[logic]] | noun | **1.** The branch of philosophy that analyzes inference.<br>**2.** Reasoned and reasonable judgment. | *"How now, how now, chopp’d logic?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logical]] | adjective | **1.** Capable of or reflecting the capability for correct and valid reasoning.<br>**2.** Based on known statements or events or conditions. | *"Within the remote depths of his constitution, so gentle and affectionate as he was in general, there lay hidden a hard logical deposit, like a vein of metal in a soft loam, which turned the edge of everything that attempted to traverse it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[logicality]] | noun | **1.** Correct and valid reasoning. | *"In academic literature, logicality designates correct and valid reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logically]] | adverb | **1.** According to logical reasoning.<br>**2.** In a logical manner. | *"But money and private property are not essentially and logically bound up together, for a certain measure of private property always has been found where money was little or not at all used."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[logicalness]] | noun | **1.** Correct and valid reasoning. | *"In academic literature, logicalness designates correct and valid reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logician]] | noun | **1.** A person skilled at symbolic logic. | *"Mill's achievements as an economist, logician, psychologist, and politician are known more or less vaguely to all educated men; but his capacity and his actual work as a critic are comparatively little regarded."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[logicism]] | noun | **1.** (philosophy) the philosophical theory that all of mathematics can be derived from formal logic. | *"In academic literature, logicism designates (philosophy) the philosophical theory that all of mathematics can be derived from formal logic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loginess]] | noun | **1.** A dull and listless state resulting from weariness. | *"In academic literature, loginess designates a dull and listless state resulting from weariness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logion]] | noun | **1.** A saying of jesus that is regarded as authentic although it is not recorded in the gospels. | *"In academic literature, logion designates a saying of jesus that is regarded as authentic although it is not recorded in the gospels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logistic]] | adjective | **1.** Of or relating to logistics. | *"Moving from one tunnel and gallery hangar to another, the inspection team had checked the readiness of command and control, function systems, weapons readiness, logistic support and all that bore on their mission."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logistical]] | adjective | **1.** Of or relating to logistics. | *"A conical view tank, recessed in the wall to his left, glowed with symbols of ships and their military characteristics, along with tactical and logistical links."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logistician]] | noun | **1.** A person skilled at symbolic logic. | *"I can give you a quick rundown on each now, if you wish." "I do." "Myra is a logistician and a Medic certified to Level 4 in space-related trauma, physical and psychological."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logistics]] | noun | **1.** Handling an operation that involves providing labor and materials be supplied as needed. | *"During the U.S. post-Sputnik initiatives to create a national space program, he critiqued aerospace industries' logistics concepts on future space systems organization, infrastructure and support."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logo]] | noun | **1.** A company emblem or device. | *"To explain Jesus, his friends and contemporaries spoke of him as the Logos, the Sacrifice, "Christ our Passover," the Messiah, and so forth."* — T. R. Glover, *The Jesus of History* |
| [[logogram]] | noun | **1.** A single written symbol that represents an entire word or phrase without indicating its pronunciation. | *"In academic literature, logogram designates a single written symbol that represents an entire word or phrase without indicating its pronunciation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logogrammatic]] | adjective | **1.** Of or relating to logograms or logographs. | *"In academic literature, logogrammatic designates of or relating to logograms or logographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logogrammatically]] | adverb | **1.** By means of logograms. | *"In academic literature, logogrammatically designates by means of logograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logograph]] | noun | **1.** A single written symbol that represents an entire word or phrase without indicating its pronunciation. | *"In academic literature, logograph designates a single written symbol that represents an entire word or phrase without indicating its pronunciation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logographic]] | adjective | **1.** Of or relating to logograms or logographs. | *"In academic literature, logographic designates of or relating to logograms or logographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logomach]] | noun | **1.** Someone given to disputes over words. | *"In academic literature, logomach designates someone given to disputes over words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logomachist]] | noun | **1.** Someone given to disputes over words. | *"In academic literature, logomachist designates someone given to disputes over words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logomachy]] | noun | **1.** Argument about words or the meaning of words. | *"Intricate and entangled as is the history, for instance, of the Arian controversy--that controversy which "turned on a diphthong," as Carlyle said in his younger days--it represented far more than mere logomachy, as Carlyle saw later on."* — T. R. Glover, *The Jesus of History* |
| [[logomania]] | noun | **1.** Pathologically excessive (and often incoherent) talking. | *"In academic literature, logomania designates pathologically excessive (and often incoherent) talking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logorrhea]] | noun | **1.** Pathologically excessive (and often incoherent) talking. | *"In academic literature, logorrhea designates pathologically excessive (and often incoherent) talking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logos]] | noun | **1.** The divine word of god; the second person in the trinity (incarnate in jesus).<br>**2.** A company emblem or device. | *"To explain Jesus, his friends and contemporaries spoke of him as the Logos, the Sacrifice, "Christ our Passover," the Messiah, and so forth."* — T. R. Glover, *The Jesus of History* |
| [[logotype]] | noun | **1.** A company emblem or device. | *"In academic literature, logotype designates a company emblem or device."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logroll]] | verb | **1.** Work toward the passage of some legislation by exchanging political favors such as trading votes. | *"The little grove in which the tents were pitched was thronged with visitors, the Rangers were out in full force and there was a good deal of "logrolling" going on."* — Harry Castlemon, *Rodney, the Partisan* |
| [[logrolling]] | noun | **1.** Act of exchanging favors for mutual gain; especially trading of influence or votes among legislators to gain passage of certain projects.<br>**2.** Rotating a log rapidly in the water (as a competitive sport). | *"The little grove in which the tents were pitched was thronged with visitors, the Rangers were out in full force and there was a good deal of "logrolling" going on."* — Harry Castlemon, *Rodney, the Partisan* |
| [[logrono]] | noun | **1.** A city in northern spain on the ebro river. | *"In academic literature, logrono designates a city in northern spain on the ebro river."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logy]] | adjective | **1.** Stunned or confused and slow to react (as from blows or drunkenness or exhaustion). | *"Ann usually set in to give me the family particulars when I was logy with sleep a Sunday night."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[monologist]] | noun | **1.** An entertainer who performs alone. | *"In academic literature, monologist designates an entertainer who performs alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologue]] | noun | **1.** Speech you make to yourself.<br>**2.** A long utterance by one person (especially one that prevents others from participating in the conversation). | *"I didn't expect this to be a monologue, by far."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[monologuise]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuise designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologuize]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuize designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neologism]] | noun | **1.** A newly invented word or phrase.<br>**2.** The act of inventing a word or phrase. | *"In academic literature, neologism designates a newly invented word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neologist]] | noun | **1.** A lexicographer of new words and expressions. | *"In academic literature, neologist designates a lexicographer of new words and expressions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolog]] | noun | **1.** A computer language designed in europe to support natural language processing. | *"In academic literature, prolog designates a computer language designed in europe to support natural language processing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prologise]] | verb | **1.** Write or speak a prologue. | *"In academic literature, prologise designates write or speak a prologue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prologize]] | verb | **1.** Write or speak a prologue. | *"In academic literature, prologize designates write or speak a prologue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prologue]] | noun | **1.** An introduction to a play. | *"It is not the fashion to see the lady the epilogue, but it is no more unhandsome than to see the lord the prologue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prologuize]] | verb | **1.** Write or speak a prologue. | *"In academic literature, prologuize designates write or speak a prologue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trilogy]] | noun | **1.** A set of three literary or dramatic works related in subject or theme. | *"In academic literature, trilogy designates a set of three literary or dramatic works related in subject or theme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unapologetic]] | adjective | **1.** Unwilling to make or express an apology. | *"In academic literature, unapologetic designates unwilling to make or express an apology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlogical]] | adjective | **1.** Lacking in correct logical relation. | *"In academic literature, unlogical designates lacking in correct logical relation."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Thought]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LOG
  </div>
</div>
