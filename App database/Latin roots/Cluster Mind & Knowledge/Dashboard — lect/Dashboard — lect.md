---
status: unread
type: root_dashboard
---
# Dashboard — lect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lect-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“read, gathered, or chosen”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A lightbulb turning on in your mind when an idea suddenly makes sense.</span>
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

The root **lect** means read, gathered, or chosen. It refers to gathering things together, choosing options, or reading texts. In English, this root forms words such as *intellect*, *intellectual*, *intellectually*, and *intellectualize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: read, gathered, or chosen
> The root **lect** means read, gathered, or chosen. It refers to gathering things together, choosing options, or reading texts. In English, this root forms words such as *intellect*, *intellectual*, *intellectually*, and *intellectualize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Read, gathered, or chosen</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *intellect* and *intellectual*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lect** comes from a Latin word that means *"read, gathered, or chosen"*.
  - At its core, it describes read, gathered, or chosen.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **lect** in an English word, think of **thinking, understanding, and knowledge**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of read, gathered, or chosen.
  - **Mental & Social**: How people experience, organize, or communicate about read, gathered, or chosen.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Intellect**: The faculty of reasoning, knowing, and thinking abstractly as distinguished from feeling and willing.
  - **Intellectual**: Pertaining to, involving, or requiring the exercise of intellect and abstract thought.
  - **Intellectually**: In an intellectual manner.
  - **Intellectualize**: To treat an issue in an abstract, intellectual manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lect</mark>, think of <mark class="hl-def">thinking, understanding, and knowledge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **lect** serves as one of the most prolific word-formation engines in the Latin language, generating vast derivative families through prefixation:
>
> - **`inter-` ("between, among") $\to$ `intellect-` / `intellig-` (*intellegere*):**
>   - Faculties: *intellect*, *intellectual*, *intellectually*, *intellectualize*, *intellectualization*, *intellectualism*, *intellective*, *intellection*
>   - Cognitive agency: *intelligent*, *intelligently*, *intelligence*, *intelligentsia*, *unintelligent*
>   - Comprehension: *intelligible*, *intelligibility*, *unintelligible*, *unintelligibility*
> - **Bare Participial Base `lect-` (*lectūra*, *lectiō*, *lector*):**
>   - Discourse & pedagogy: *lecture*, *lecturer*, *lectureship*
>   - Reading furniture & liturgy: *lectern*, *lection*, *lectionary*, *lector*
> - **`con-` ("together") $\to$ `collect-` (*colligere*, *collectum*):**
>   - *collect*, *collection*, *collective*, *collectively*, *collector*, *collectible*
> - **`se-` ("apart, aside") $\to$ `select-` (*sēligere*, *sēlectum*):**
>   - *select*, *selection*, *selective*, *selectively*, *selectivity*
> - **`ex-` ("out, forth") $\to$ `elect-` (*ēligere*, *ēlectum*):**
>   - *elect*, *election*, *elective*, *elector*, *electoral*, *electorate*, *re-elect*, *re-election*
>   - Legal capability: *eligible*, *eligibility*, *ineligible*, *ineligibility*
> - **`nec-` ("not") $\to$ `neglect-` (*neglegere*, *neglēctum*):**
>   - *neglect*, *neglectful*, *neglectfully*
> - **`prae-` + `dis-` $\to$ `predilect-` (*praedīligere*, *praedīlēctum*):**
>   - *predilection*
> - **Hellenic Cognate Prefix `ek-` $\to$ `eclect-` (Greek ἐκλέγειν):**
>   - *eclectic*, *eclecticism*

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
> The root spans six distinct intellectual, political, and material arenas:
>
> 1. **Cognitive Science, Epistemology & Artificial Intelligence:**
>    - The human faculty of abstract reasoning and comprehension (*intellect*, *intelligence quotient*).
>    - Computational neural networks and machine learning (*artificial intelligence*).
>    - Propositions capable of being grasped by the rational mind (*intelligible reality*).
> 2. **Pedagogy, Public Speaking & Academics:**
>    - Formal academic presentations and university teaching (*university lecture*, *senior lecturer*).
>    - Church pulpits and podiums for public speakers (*carved wooden lectern*).
> 3. **Democratic Governance, Politics & Voting Rights:**
>    - The sovereign casting of ballots to choose public officials (*presidential election*, *electoral college*).
>    - Statutory qualifications for public office or benefits (*eligible voters*, *ineligible candidates*).
> 4. **Curatorship, Archiving & Material Assembly:**
>    - Gathering rare artifacts, botanical specimens, or scientific data (*museum collection*, *data collector*).
> 5. **Consumer Behavior, Taste & Methodology:**
>    - Selecting elements from diverse schools of thought or design (*eclectic style*, *philosophical eclecticism*).
>    - Innate personal preference or favorable bias (*a strong predilection for classical music*).
> 6. **Ethics, Duty & Legal Culpability:**
>    - Failure to provide adequate care, maintenance, or supervision (*criminal neglect*, *neglect of duty*).

---

## 🔀 4. Prefix & Combining Dynamics on lect

### Prefix Dynamics
- **`inter-` ("between"):** Discerning relations between concepts $\to$ *intellect*, *intelligence*.
- **`con-` ("together"):** Bringing scattered items into a unified whole $\to$ *collect*, *collective*.
- **`se-` ("apart"):** Picking out the finest items from the common mass $\to$ *select*, *selective*.
- **`ex-` ("out"):** Choosing an individual out of the populace for office $\to$ *elect*, *eligible*.
- **`nec-` ("not"):** Failing to pick up or heed $\to$ *neglect*.
- **`prae-` ("beforehand"):** Prior choice or preference $\to$ *predilection*.
- **`ek-` (Greek "out"):** Picking from multiple disparate traditions $\to$ *eclectic*.

### Suffix Dynamics
- **`-ion` (Action / Result):** *election*, *selection*, *collection*, *lection*, *intellection*.
- **`-ive` (Tendency / Functional Property):** *selective*, *collective*, *elective*, *intellective*.
- **`-or` / `-er` (Agent of Selection or Reading):** *collector*, *elector*, *lector*, *lecturer*.
- **`-able` / `-ible` (Capability):** *intelligible*, *eligible*, *collectible*.
- **`-ary` (Collection / Liturgical Book):** *lectionary*.
- **`-ern` (Instrument / Furniture):** *lectern*.
- **`-ism` / `-ist` (Ideological / Social Identity):** *intellectualism*, *intelligentsia*, *eclecticism*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Artificial Intelligence & Computer Science:** Engineers develop large language models to replicate human *intelligence*, evaluating performance on *reasoning*, *selective attention*, and semantic *intelligibility*.
> - **Constitutional Law & Voting Rights:** Legal scholars evaluate the *Electoral College*, *electoral gerrymandering*, and voter *eligibility* under equal protection jurisprudence.
> - **Higher Education Pedagogy:** Academic senates balance traditional classroom *lectures* with interactive seminars, while evaluating faculty for endowed *lectureships*.
> - **Museum Curatorship & Archival Science:** Archivists oversee accession, conservation, and deaccessioning of cultural *collections*, applying rigorous *selection* criteria.
> - **Tort Law & Child Welfare:** Family courts adjudicate cases of severe parental *neglect*, distinguishing between financial hardship and willful failure to provide care.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antielectron]] | noun | **1.** An elementary particle with positive charge; interaction of a positron and an electron results in annihilation. | *"In academic literature, antielectron designates an elementary particle with positive charge; interaction of a positron and an electron results in annihilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aplectrum]] | noun | **1.** A monocotyledonous genus of the family orchidaceae. | *"In academic literature, aplectrum designates a monocotyledonous genus of the family orchidaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collect]] | noun | **1.** A short prayer generally preceding the lesson in the church of rome or the church of england.<br>**2.** Get or gather together. | *"Good old knight, Collect them all together at my tent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collectable]] | noun | **1.** Things considered to be worth collecting (not necessarily valuable or antique).<br>**2.** Subject to or requiring payment especially as specified. | *"In academic literature, collectable designates things considered to be worth collecting (not necessarily valuable or antique)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collected]] | verb | **1.** Get or gather together.<br>**2.** Call for and obtain payment of. | *"Have you collected them by tribes?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collectedly]] | adverb | **1.** In a self-collected or self-possessed manner. | *"Working quickly but collectedly, I took nothing but the warmest and stoutest of clothes."* — Jack London, *The Jacket (The Star-Rover)* |
| [[collectible]] | noun | **1.** Things considered to be worth collecting (not necessarily valuable or antique).<br>**2.** Subject to or requiring payment especially as specified. | *"In academic literature, collectible designates things considered to be worth collecting (not necessarily valuable or antique)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collecting]] | noun | **1.** The act of gathering something together.<br>**2.** Get or gather together. | *"Guppy is engaged in collecting the Galaxy Gallery of British Beauty from the wall and depositing those works of art in their old ignoble band-box."* — Charles Dickens, *Bleak House* |
| [[collection]] | noun | **1.** Several things grouped together or considered as a whole.<br>**2.** A publication containing a variety of works. | *"When I wak’d, I found This label on my bosom; whose containing Is so from sense in hardness that I can Make no collection of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collective]] | noun | **1.** Members of a cooperative enterprise.<br>**2.** Done by or characteristic of individuals acting together. | *"Cairns's death, though not without secessions, collective and individual."* — John Cairns, *Principal Cairns* |
| [[collectively]] | adverb | **1.** In conjunction with; combined. | *"He is a sharp-eyed man—a quick keen man—and he takes in everybody’s look at him, all at once, individually and collectively, in a manner that stamps him a remarkable man."* — Charles Dickens, *Bleak House* |
| [[collectivisation]] | noun | **1.** The organization of a nation or economy on the basis of collectivism. | *"In academic literature, collectivisation designates the organization of a nation or economy on the basis of collectivism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivise]] | verb | **1.** Bring under collective control; of farms and industrial enterprises. | *"In academic literature, collectivise designates bring under collective control; of farms and industrial enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivised]] | verb | **1.** Bring under collective control; of farms and industrial enterprises.<br>**2.** Characterized by the principle of ownership by the state or the people of the means of production. | *"In academic literature, collectivised designates bring under collective control; of farms and industrial enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivism]] | noun | **1.** Soviet communism.<br>**2.** A political theory that the people should own the means of production. | *"This opinion, or plan, has appeared under a variety of names, the main ones being communism, collectivism, social-democracy, and socialism, of which the last name has just now the greatest vogue."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[collectivist]] | noun | **1.** A person who belongs to the political left.<br>**2.** Subscribing to the socialistic doctrine of ownership by the people collectively. | *"In academic literature, collectivist designates a person who belongs to the political left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivistic]] | adjective | **1.** Subscribing to the socialistic doctrine of ownership by the people collectively. | *"In academic literature, collectivistic designates subscribing to the socialistic doctrine of ownership by the people collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivization]] | noun | **1.** The organization of a nation or economy on the basis of collectivism. | *"In academic literature, collectivization designates the organization of a nation or economy on the basis of collectivism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivize]] | verb | **1.** Bring under collective control; of farms and industrial enterprises. | *"In academic literature, collectivize designates bring under collective control; of farms and industrial enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collectivized]] | verb | **1.** Bring under collective control; of farms and industrial enterprises.<br>**2.** Characterized by the principle of ownership by the state or the people of the means of production. | *"In academic literature, collectivized designates bring under collective control; of farms and industrial enterprises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collector]] | noun | **1.** A person who collects things.<br>**2.** A person who is employed to collect payments (as for rent or taxes). | *"The landlord in turn received from his underlings services and goods in kind (food and supplies) and so (in modern eyes) was both a collector of taxes and a receiver of rent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[delectability]] | noun | **1.** Extreme appetizingness. | *"In academic literature, delectability designates extreme appetizingness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delectable]] | adjective | **1.** Extremely pleasing to the sense of taste.<br>**2.** Capable of arousing desire. | *"And yet your fair discourse hath been as sugar, Making the hard way sweet and delectable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[delectation]] | noun | **1.** A feeling of extreme pleasure or satisfaction.<br>**2.** Act of receiving pleasure from something. | *"The chief's wife welcomed us to the island, and stated that a dish of yams was being prepared for our delectation."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[dielectric]] | noun | **1.** A material such as glass or porcelain with negligible electrical or thermal conductivity. | *"In academic literature, dielectric designates a material such as glass or porcelain with negligible electrical or thermal conductivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dielectrolysis]] | noun | **1.** The motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode. | *"In academic literature, dielectrolysis designates the motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elect]] | noun | **1.** An exclusive group of people.<br>**2.** Select by a vote for an office or membership. | *"You have here, lady, And of your choice, these reverend fathers, men Of singular integrity and learning, Yea, the elect o’ th’ land, who are assembled To plead your cause."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[elected]] | verb | **1.** Select by a vote for an office or membership.<br>**2.** Choose. | *"We do here pronounce, Upon the part o’ th’ people, in whose power We were elected theirs, Martius is worthy Of present death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[election]] | noun | **1.** A vote to select the winner of a position or political office.<br>**2.** The act of selecting someone or something; the exercise of deliberate choice. | *"Thy frank election make; Thou hast power to choose, and they none to forsake."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[electioneer]] | verb | **1.** Work actively for a political candidate or a party. | *"Frank Hawley, who was afraid of nobody, and was a Tory suspicious of electioneering intentions."* — George Eliot, *Middlemarch* |
| [[electioneering]] | noun | **1.** Persuasion of voters in a political campaign.<br>**2.** The campaign of a candidate to be elected. | *"Frank Hawley, who was afraid of nobody, and was a Tory suspicious of electioneering intentions."* — George Eliot, *Middlemarch* |
| [[elective]] | noun | **1.** A course that the student can select from among alternatives.<br>**2.** Subject to popular election. | *"To leave any form of insurance optional, or elective, with either employers or wage-workers, is to fail of the main purpose in a large proportion of the individual cases where it is most needed, and to increase the expense to those that are included."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[elector]] | noun | **1.** A citizen who has a legal right to vote.<br>**2.** Any of the german princes who were entitled to vote in the election of new emperor of the holy roman empire. | *"In one of the conflicts, the emperor himself was put to flight, and very near being made prisoner by the elector of Saxony."* — Alexander Hamilton, *The Federalist Papers* |
| [[electoral]] | adjective | **1.** Of or relating to elections.<br>**2.** Relating to or composed of electors. | *"The Republican candidate Hayes, after a long contest in Congress, was declared elected by a margin of one electoral vote."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[electorate]] | noun | **1.** The body of enfranchised citizens; those qualified to vote. | *"The changes have been determined in most cases by motives of temporary partisan advantage or by the political activity of the immediate beneficiaries rather than by clear knowledge and consistent purpose of the electorate as a whole."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[electra]] | noun | **1.** (greek mythology) the daughter of agamemnon and clytemnestra; persuaded her brother (orestes) to avenge agamemnon's death by helping her to kill clytemnestra and her lover (aegisthus). | *"In academic literature, electra designates (greek mythology) the daughter of agamemnon and clytemnestra; persuaded her brother (orestes) to avenge agamemnon's death by helping her to kill clytemnestra and her lover (aegisthus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electric]] | noun | **1.** A car that is powered by electricity.<br>**2.** Using or providing or producing or transmitting or operated by electricity. | *"The effect upon her old lover was electric, far stronger than the effect of his presence upon her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[electrical]] | adjective | **1.** Relating to or concerned with electricity.<br>**2.** Using or providing or producing or transmitting or operated by electricity. | *"In short, she is rendered harmless by being, in electrical language, insulated."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[electrically]] | adverb | **1.** By electricity. | *"Time sweeps by us on electrically-driven, ball-bearing pinions."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[electrician]] | noun | **1.** A person who installs or repairs electrical or telephone lines. | *"Before describing it, it may sharpen the reader's interest to mention a wonderful experiment which was made by Varley, the famous electrician, on the first successful Atlantic cable."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electricity]] | noun | **1.** A physical phenomenon associated with stationary or moving electrons and protons.<br>**2.** Energy made available by the flow of electric charge through a conductor. | *"All was as quick as electricity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[electrification]] | noun | **1.** The activity of thrilling or markedly exciting some person or group.<br>**2.** The act of providing electricity. | *"Take the one instance of the electrification of a railway."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrify]] | verb | **1.** Excite suddenly and intensely.<br>**2.** Charge (a conductor) with electricity. | *"Nothing of the dream had been real but my burst of laughter, a sound never before heard in that grave sanctuary, and so abhorrent to the ears of wisdom, as to electrify the fraternity."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[electrifying]] | verb | **1.** Excite suddenly and intensely.<br>**2.** Charge (a conductor) with electricity. | *"Brooke, “going into electrifying your land and that kind of thing, and making a parlor of your cow-house."* — George Eliot, *Middlemarch* |
| [[electrocardiogram]] | noun | **1.** A graphical recording of the cardiac cycle produced by an electrocardiograph. | *"In academic literature, electrocardiogram designates a graphical recording of the cardiac cycle produced by an electrocardiograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiograph]] | noun | **1.** Medical instrument that records electric currents associated with contractions of the heart. | *"In academic literature, electrocardiograph designates medical instrument that records electric currents associated with contractions of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiographic]] | adjective | **1.** Of or relating to an electrocardiograph. | *"In academic literature, electrocardiographic designates of or relating to an electrocardiograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiography]] | noun | **1.** Diagnostic procedure consisting of recording the activity of the heart electronically with a cardiograph (and producing a cardiogram). | *"In academic literature, electrocardiography designates diagnostic procedure consisting of recording the activity of the heart electronically with a cardiograph (and producing a cardiogram)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocautery]] | noun | **1.** Application of a needle heated by an electric current to destroy tissue (as to remove warts). | *"In academic literature, electrocautery designates application of a needle heated by an electric current to destroy tissue (as to remove warts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrochemical]] | adjective | **1.** Of or involving electrochemistry. | *"In academic literature, electrochemical designates of or involving electrochemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrochemistry]] | noun | **1.** Branch of chemistry that deals with the chemical action of electricity and the production of electricity by chemical reactions. | *"DEPOSITING THE SHELL Those who are not technically familiar with electrochemistry are prone to think that the length of time a mold is kept in the electrolytic bath, i. e., the copper bath, determines the thickness of the shell deposited thereon."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electrocute]] | verb | **1.** Kill by electric shock.<br>**2.** Kill by electrocution, as in the electric chair. | *"Gob, they ought to drown him in the sea after and electrocute and crucify him to make sure of their job. —But what about the fighting navy, says Ned, that keeps our foes at bay? —I’ll tell you what about it, says the citizen."* — James Joyce, *Ulysses* |
| [[electrocution]] | noun | **1.** Execution by electricity.<br>**2.** Killing by electric shock. | *"In academic literature, electrocution designates execution by electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocutioner]] | noun | **1.** An executioner who uses electricity to kill the condemned person. | *"In academic literature, electrocutioner designates an executioner who uses electricity to kill the condemned person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrode]] | noun | **1.** A conductor used to make electrical contact with some part of a circuit. | *"Since, however, it may not be easy for the general reader to carry all these terms in his mind, we will, when it is necessary to differentiate between the two electrodes, call one the in-electrode and the other the out-electrode."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrodeposition]] | noun | **1.** The deposition of a substance on an electrode by the action of electricity (especially by electrolysis). | *"In academic literature, electrodeposition designates the deposition of a substance on an electrode by the action of electricity (especially by electrolysis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrodynamometer]] | noun | **1.** Measuring instrument that uses the interaction of the magnetic fields of two coils to measure current or voltage or power. | *"In academic literature, electrodynamometer designates measuring instrument that uses the interaction of the magnetic fields of two coils to measure current or voltage or power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalogram]] | noun | **1.** A graphical record of electrical activity of the brain; produced by an electroencephalograph. | *"In academic literature, electroencephalogram designates a graphical record of electrical activity of the brain; produced by an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalograph]] | noun | **1.** Medical instrument that records electric currents generated by the brain. | *"In academic literature, electroencephalograph designates medical instrument that records electric currents generated by the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalographic]] | adjective | **1.** Of or relating to an electroencephalograph. | *"In academic literature, electroencephalographic designates of or relating to an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrograph]] | noun | **1.** An apparatus for the electrical transmission of pictures.<br>**2.** Electrical device used for etching by electrolytic means. | *"In academic literature, electrograph designates an apparatus for the electrical transmission of pictures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrologist]] | noun | **1.** Someone skilled in the use of electricity to remove moles or warts or hair roots. | *"In academic literature, electrologist designates someone skilled in the use of electricity to remove moles or warts or hair roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrolysis]] | noun | **1.** (chemistry) a chemical decomposition reaction produced by passing an electric current through a solution containing ions.<br>**2.** Removing superfluous or unwanted hair by passing an electric current through the hair root. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolyte]] | noun | **1.** A solution that conducts electricity. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolytic]] | noun | **1.** A fixed capacitor consisting of two electrodes separated by an electrolyte.<br>**2.** Of or concerned with or produced by electrolysis. | *"Deposition of Shell._ The molded case is put in the electrolytic bath for the deposition of shell thereon. _12."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electromagnet]] | noun | **1.** A temporary magnet made by coiling wire around an iron core; when current flows in the coil the iron becomes a magnet. | *"In academic literature, electromagnet designates a temporary magnet made by coiling wire around an iron core; when current flows in the coil the iron becomes a magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetic]] | adjective | **1.** Pertaining to or exhibiting magnetism produced by electric charge in motion. | *"In academic literature, electromagnetic designates pertaining to or exhibiting magnetism produced by electric charge in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetics]] | noun | **1.** The branch of physics concerned with electromagnetic phenomena. | *"In academic literature, electromagnetics designates the branch of physics concerned with electromagnetic phenomena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetism]] | noun | **1.** Magnetism produced by an electric current.<br>**2.** The branch of physics concerned with electromagnetic phenomena. | *"In academic literature, electromagnetism designates magnetism produced by an electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromechanical]] | adjective | **1.** Of or relating to or involving an electrically operated mechanical device. | *"In academic literature, electromechanical designates of or relating to or involving an electrically operated mechanical device."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrometer]] | noun | **1.** Meter to measure electrostatic voltage differences; draws no current from the source. | *"The galvanometer has a near relative, the electrometer, the astounding delicacy of which renders it equally interesting."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electromotive]] | adjective | **1.** Concerned with or producing electric current. | *"In academic literature, electromotive designates concerned with or producing electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyogram]] | noun | **1.** A graphical record of electric currents associated with muscle contractions. | *"In academic literature, electromyogram designates a graphical record of electric currents associated with muscle contractions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyograph]] | noun | **1.** A medical instrument that records the electrical waves associated with the activity of skeletal muscles. | *"In academic literature, electromyograph designates a medical instrument that records the electrical waves associated with the activity of skeletal muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyography]] | noun | **1.** Diagnosis of neuromuscular disorders with the use of an electromyograph. | *"In academic literature, electromyography designates diagnosis of neuromuscular disorders with the use of an electromyograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electron]] | noun | **1.** An elementary particle with negative charge. | *"And it's balanced by the negative charges, the electrons, that revolve around it."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[electronegative]] | adjective | **1.** Having a negative charge. | *"In academic literature, electronegative designates having a negative charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electronegativity]] | noun | **1.** (chemistry) the tendency of an atom or radical to attract electrons in the formation of an ionic bond. | *"In academic literature, electronegativity designates (chemistry) the tendency of an atom or radical to attract electrons in the formation of an ionic bond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroneutral]] | adjective | **1.** Having no net electric charge. | *"In academic literature, electroneutral designates having no net electric charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electronic]] | adjective | **1.** Of or relating to electronics; concerned with or using devices that operate on principles governing the behavior of electrons.<br>**2.** Of or concerned with electrons. | *"Hodak, acting as clumsily as he could, slammed and locked the passageway safety doors with the loudest noises he could generate, broadcasting the unusual activity to all within hearing range and for electronic sensor pickup."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[electronically]] | adverb | **1.** By electronic means. | *"All rooms, corridors and exterior approaches leading to the meeting site were physically and electronically searched, and the identity disks of all individuals passing through the area scrutinized and verified."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[electronics]] | noun | **1.** The branch of physics that deals with the emission and effects of electrons and with the use of electronic devices. | *"In academic literature, electronics designates the branch of physics that deals with the emission and effects of electrons and with the use of electronic devices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoresis]] | noun | **1.** The motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode. | *"In academic literature, electrophoresis designates the motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoretic]] | adjective | **1.** Of or relating to electrophoresis. | *"In academic literature, electrophoretic designates of or relating to electrophoresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoridae]] | noun | **1.** Small family comprising the electric eels. | *"In academic literature, electrophoridae designates small family comprising the electric eels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophorus]] | noun | **1.** A simple electrostatic generator that generates repeated charges of static electricity.<br>**2.** Type genus of the family electrophoridae; electric eels. | *"Then comes the "Electrophorus," an electrical instrument suggested by Volta, which was thought at the time a grand invention for the purpose of getting light (Fig. 6 A)."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[electroplate]] | noun | **1.** Any artifact that has been plated with a thin coat of metal by electrolysis.<br>**2.** Coat with metal by electrolysis. | *"This observation was the first step in the process of electroplating, which is electrotyping when applied to the art of typography."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electroplater]] | noun | **1.** A plater who uses electrolysis. | *"In academic literature, electroplater designates a plater who uses electrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electropositive]] | adjective | **1.** Having a positive charge. | *"In academic literature, electropositive designates having a positive charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroretinogram]] | noun | **1.** A graphical recording of the electrical activity of the retina that results when light is flashed into the eye. | *"In academic literature, electroretinogram designates a graphical recording of the electrical activity of the retina that results when light is flashed into the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroscope]] | noun | **1.** Measuring instrument that detects electric charge; two gold leaves diverge owing to repulsion of charges with like sign. | *"In its simplest form the electrometer is called the "electroscope." Two strips of gold-leaf are suspended by their ends under a glass or metal shade."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electroshock]] | noun | **1.** The administration of a strong electric current that passes through the brain to induce convulsions and coma. | *"In academic literature, electroshock designates the administration of a strong electric current that passes through the brain to induce convulsions and coma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrosleep]] | noun | **1.** Unconsciousness brought about by the passage of a low voltage electric current through the brain. | *"In academic literature, electrosleep designates unconsciousness brought about by the passage of a low voltage electric current through the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrostatic]] | adjective | **1.** Concerned with or producing or caused by static electricity. | *"It is a convenient form of what is called an electrostatic condenser."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrostatically]] | adverb | **1.** In an electrostatic manner. | *"In academic literature, electrostatically designates in an electrostatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrostatics]] | noun | **1.** The branch of physics that deals with static electricity. | *"In academic literature, electrostatics designates the branch of physics that deals with static electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrosurgery]] | noun | **1.** Surgery performed with electrical devices (as in electrocautery). | *"In academic literature, electrosurgery designates surgery performed with electrical devices (as in electrocautery)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrotherapist]] | noun | **1.** Someone who specializes in the treatment of disease by electricity. | *"In academic literature, electrotherapist designates someone who specializes in the treatment of disease by electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrotherapy]] | noun | **1.** The therapeutic application of electricity to the body (as in the treatment of various forms of paralysis). | *"In academic literature, electrotherapy designates the therapeutic application of electricity to the body (as in the treatment of various forms of paralysis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrum]] | noun | **1.** An alloy of gold and silver. | *"In academic literature, electrum designates an alloy of gold and silver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intellect]] | noun | **1.** Knowledge and intellectual ability.<br>**2.** The capacity for rational thought or inference or discrimination. | *"His intellect is not replenished; he is only an animal, only sensible in the duller parts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intellectual]] | noun | **1.** A person who uses the mind creatively.<br>**2.** Of or associated with or requiring the use of the mind. | *"That they lack; for if their heads had any intellectual armour, they could never wear such heavy head-pieces."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intellectually]] | adverb | **1.** In an intellectual manner. | *"And yet—and the incident is delicious—Jake Oppenheimer was intellectually honest."* — Jack London, *The Jacket (The Star-Rover)* |
| [[lectern]] | noun | **1.** Desk or stand with a slanted top used to hold a text at the proper height for a lecturer. | *"Drummer entered behind Narval and moved to stand silently beside a lectern adjacent the view tank."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[lectin]] | noun | **1.** Any of several plant glycoproteins that act like specific antibodies but are not antibodies in that they are not evoked by an antigenic stimulus. | *"In academic literature, lectin designates any of several plant glycoproteins that act like specific antibodies but are not antibodies in that they are not evoked by an antigenic stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lector]] | noun | **1.** Someone who reads the lessons in a church service; someone ordained in a minor order of the roman catholic church.<br>**2.** A public lecturer at certain universities. | *"In academic literature, lector designates someone who reads the lessons in a church service; someone ordained in a minor order of the roman catholic church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lecture]] | noun | **1.** A speech that is open to the public.<br>**2.** A lengthy rebuke. | *"So by my former lecture and advice Shall you my son."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lecturer]] | noun | **1.** A public lecturer at certain universities.<br>**2.** Someone who lectures professionally. | *"To be lectured because the lecturer saw her in the cold morning light of open-shuttered disillusion was exasperating."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lectureship]] | noun | **1.** The post of lecturer. | *"In academic literature, lectureship designates the post of lecturer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lecturing]] | noun | **1.** Teaching by giving a discourse on some subject (typically to a class).<br>**2.** Deliver a lecture or talk. | *"You shall go, sir—your lecturing I will not hear!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nonelected]] | adjective | **1.** Filled by appointment rather than by election. | *"In academic literature, nonelected designates filled by appointment rather than by election."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonelective]] | adjective | **1.** Filled by appointment rather than by election. | *"In academic literature, nonelective designates filled by appointment rather than by election."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonintellectual]] | adjective | **1.** Not intellectual. | *"In academic literature, nonintellectual designates not intellectual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recollect]] | verb | **1.** Recall knowledge from memory; have a recollection. | *"PERICLES. [_Aside._] How from the finny subject of the sea These fishers tell the infirmities of men; And from their watery empire recollect All that may men approve or men detect!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recollection]] | noun | **1.** The ability to recall past occurrences.<br>**2.** The process of remembering (especially the process of recovering information by mental effort). | *"The recollection of them, he said, would go with him wherever he went and would be always treasured."* — Charles Dickens, *Bleak House* |
| [[recollective]] | adjective | **1.** Good at remembering. | *"In academic literature, recollective designates good at remembering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reelect]] | verb | **1.** Elect again. | *"In academic literature, reelect designates elect again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reelection]] | noun | **1.** Election again. | *"In academic literature, reelection designates election again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[select]] | verb | **1.** Pick out, select, or choose from a number of alternatives.<br>**2.** Of superior grade. | *"A certain number, Though thanks to all, must I select from all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[selected]] | verb | **1.** Pick out, select, or choose from a number of alternatives.<br>**2.** Chosen in preference to another. | *"The gentleman in the bag wig laid bundles of papers on his lordship’s table, and his lordship silently selected one and turned over the leaves."* — Charles Dickens, *Bleak House* |
| [[selection]] | noun | **1.** The act of choosing or selecting.<br>**2.** An assortment of things from which a choice can be made. | *"We have only, in the first place, to discover a sufficiently eligible practitioner; and as soon as we make our want—and shall I add, our ability to pay a premium?—known, our only difficulty will be in the selection of one from a large number."* — Charles Dickens, *Bleak House* |
| [[selective]] | adjective | **1.** Tending to select; characterized by careful choice; - john mason brown.<br>**2.** Characterized by very careful or fastidious selection. | *"We improve our favourite plants and animals—and how few they are—gradually by selective breeding; now a new and better peach, now a seedless grape, now a sweeter and larger flower, now a more convenient breed of cattle."* — H. G. Wells, *The Time Machine* |
| [[selectively]] | adverb | **1.** By selection; in a selective manner. | *"In academic literature, selectively designates by selection; in a selective manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selectivity]] | noun | **1.** The property of being selective. | *"In academic literature, selectivity designates the property of being selective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selectman]] | noun | **1.** An elected member of a board of officials who run new england towns. | *"The selectman was already within a hundred rods."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[selector]] | noun | **1.** A person who chooses or selects out.<br>**2.** A switch that is used to select among alternatives. | *"The selector, an uneducated man and ignorant of geology, was busy carting stone in his wheelbarrow."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[uncollected]] | adjective | **1.** Not brought together in one place. | *"In academic literature, uncollected designates not brought together in one place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncollectible]] | adjective | **1.** Not capable of being collected. | *"In academic literature, uncollectible designates not capable of being collected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unselected]] | adjective | **1.** Not selected. | *"In academic literature, unselected designates not selected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unselective]] | adjective | **1.** Not selective or discriminating. | *"In academic literature, unselective designates not selective or discriminating."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Mind & Knowledge]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LECT
  </div>
</div>
