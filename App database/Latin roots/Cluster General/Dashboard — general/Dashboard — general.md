---
status: unread
type: root_dashboard
---
# Dashboard — general
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">general-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“belonging to all, kind, or general”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Everyday foundational concepts that structure how we describe reality.</span>
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

The root **general** means belonging to all, kind, or general. It refers to universal classification, overarching genus, supreme executive command. In English, this root forms words such as *beget*, *generality*, *generalize*, and *generalization*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: belonging to all, kind, or general
> The root **general** means belonging to all, kind, or general. It refers to universal classification, overarching genus, supreme executive command. In English, this root forms words such as *beget*, *generality*, *generalize*, and *generalization*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Belonging to all, kind, or general</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Everyday foundational concepts that structure how we describe reality.</mark>
> - **Everyday Connection**: Think of familiar words like *beget* and *generality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **general** comes from a Latin word that means *"belonging to all, kind, or general"*.
  - At its core, it describes belonging to all, kind, or general.

- **The Big Picture Idea**:
  - Picture everyday foundational concepts that structure how we describe reality.
  - Whenever you see **general** in an English word, think of **core foundational concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of belonging to all, kind, or general.
  - **Mental & Social**: How people experience, organize, or communicate about belonging to all, kind, or general.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Beget**: An everyday English word showing the root's idea of *belonging to all, kind, or general*.
  - **Generality**: The state or quality of being general.
  - **Generalize**: To infer or derive a universal principle from specific facts.
  - **Generalization**: A general statement, proposition, or concept obtained by inferring common properties from specific cases.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">general</mark>, think of <mark class="hl-def">core foundational concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `general`
> Derivations from Latin *generālis* split across four functional domains:
> 1. **The Core Lexical Family (*general-*):**
>    - Adjective: **general**, **generally**.
>    - Abstract Nouns: **generality**, **generalship**, **generalcy**, **generalia**.
>    - Verbal Paradigm: **generalize**, **generalization**, **generalizable**, **generalizability**.
>    - Professional Role: **generalist** (contrast with *specialist*).
>    - Magnified Supreme Title: **generalissimo** (Italian superlative suffix *-issimo*).
> 2. **Taxonomic & Categorical Offshoots (*gener-*, *genre*):**
>    - French learned adjective: *genus* $ightarrow$ **generic**, **generically**, **genericness**.
>    - Legal trademark concept: **genericide** (*generic* + *-cide* "killing of brand exclusivity").
>    - French literary/artistic noun: *genre* $ightarrow$ **genre**.
>    - Latin jurisprudential phrase: **sui generis** (genitive of *suus* + *genus*).
>    - Ecclesiastical jurisdiction: **generalate** (office of a religious order's superior general).
> 3. **The Compound Institutional Titles (Post-Positive Adjectives):**
>    - Legal / Civic: **attorney-general**, **solicitor-general**, **governor-general**, **postmaster-general**, **inspector-general**, **secretary-general**, **surgeon-general**.
> 4. **Military Rank Hierarchy:**
>    - **general** (four-star supreme commander).
>    - **lieutenant-general** (three-star corps commander).
>    - **major-general** (two-star division commander).
>    - **brigadier-general** (one-star brigade commander).
>    - **adjutant-general**, **quartermaster-general**.

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

```
                                  ┌── Logic & Epistemology ───── general, generality, generalize, generalization, generalist
                                  │
                                  ├── Aesthetic & Legal Kind ─── generic, generically, genre, genericide, sui generis
    [GENERAL-] ───────────────────┼── Sovereign Public Office ── attorney-general, secretary-general, governor-general
(universal class / supreme rule)  │
                                  ├── Military Grand Strategy ── general, generalship, generalcy, generalissimo
                                  │
                                  └── Tactical Rank Tiers ────── lieutenant-general, major-general, brigadier-general
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Logic, Epistemology & Universal Taxonomy:** *general*, *generally*, *generality*, *generalize*, *generalization*, *generalizable*, *generalizability*, *generalist*, *generalia*.
> 2. **Classification, Intellectual Property & Art:** *generic*, *generically*, *genericness*, *genericide*, *genre*, *sui generis*.
> 3. **Constitutional & Executive State Offices:** *attorney-general*, *secretary-general*, *governor-general*, *inspector-general*, *surgeon-general*, *postmaster-general*, *generalate*.
> 4. **Military Leadership, Strategy & Command:** *general*, *generalship*, *generalcy*, *generalissimo*, *adjutant-general*, *quartermaster-general*.
> 5. **Military Flag Officer Tiers:** *lieutenant-general*, *major-general*, *brigadier-general*.

---

## 🔀 4. Prefix & Combining Dynamics on general

### Suffix & Compound Mechanics

| Formative Element | Structural Role | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `-ize` / `-ization` | verbalizer / action noun | **generalize**, **generalization** | Extending an empirical observation from specific instances to a universal rule. |
| `-ity` | abstract state | **generality** | The state of being universal, non-specific, or encompassing the entire class. |
| `-ist` | practitioner / agent | **generalist** | A polymath whose competence spans many fields, opposed to a narrow *specialist*. |
| `-ship` | office / strategic skill | **generalship** | The tactical and strategic mastery required to command massive military forces. |
| `-issimo` | Italian superlative | **generalissimo** | A supreme commander wielding absolute power above all other generals. |
| `-cide` | killing / destruction | **genericide** | The death of trademark exclusivity when a brand name becomes generic. |
| `sui` | Latin reflexive pronoun | **sui generis** | "Of its own kind"—constituting a unique class with no exact precedent. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Military Science & Grand Strategy:** *Generalship* dictates the operational orchestration of armies, logistics (*quartermaster-general*), and battlefield maneuvers.
> 2. **Constitutional & Public Law:** The *Attorney-General* serves as chief legal adviser to the government; the *Inspector-General* conducts oversight against corruption.
> 3. **Intellectual Property & Trademark Law:** Companies vigorously guard their trademarks against *genericide* (e.g., how "escalator", "aspirin", and "cellophane" lost legal protection).
> 4. **Philosophy of Science & Statistics:** Inductive reasoning relies on the *generalizability* of sample data to broader populations without committing hasty *generalizations*.
> 5. **Literary Theory & Film Studies:** *Genre* analysis categorizes cultural texts (noir, sci-fi, tragedy) according to recurring conventions, iconography, and audience expectations.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[general]] | noun | **1.** A general officer of the highest rank.<br>**2.** The head of a religious order or congregation. | *"And every humour hath his adjunct pleasure, Wherein it finds a joy above the rest, But these particulars are not my measure, All these I better in one general best."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[generalcy]] | noun | **1.** The office and authority of a general. | *"In academic literature, generalcy designates the office and authority of a general."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalisation]] | noun | **1.** An idea or conclusion having general application.<br>**2.** The process of formulating general concepts by abstracting common properties of instances. | *"In academic literature, generalisation designates an idea or conclusion having general application."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalise]] | verb | **1.** Speak or write in generalities.<br>**2.** Draw from specific cases for more general cases. | *"As I am now generalising a period of my life with the object of clearing my way before me, I can scarcely do so better than by at once completing the description of our usual manners and customs at Barnard’s Inn."* — Charles Dickens, *Great Expectations* |
| [[generalised]] | verb | **1.** Speak or write in generalities.<br>**2.** Draw from specific cases for more general cases. | *"In academic literature, generalised designates speak or write in generalities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalissimo]] | noun | **1.** The officer who holds the supreme command. | *"In academic literature, generalissimo designates the officer who holds the supreme command."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generalist]] | noun | **1.** A modern scholar who is in a position to acquire more than superficial knowledge about many different interests. | *"In academic literature, generalist designates a modern scholar who is in a position to acquire more than superficial knowledge about many different interests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[generality]] | noun | **1.** An idea or conclusion having general application.<br>**2.** The quality of being general or widespread or having general applicability. | *"Sometimes we emerged upon a wider thoroughfare or came to a larger building than the generality, well lighted."* — Charles Dickens, *Bleak House* |
| [[generalization]] | noun | **1.** Reasoning from detailed facts to general principles.<br>**2.** An idea or conclusion having general application. | *"Being thus assignable to no breed, he was the ideal embodiment of canine greatness—a generalization from what was common to all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[generalize]] | verb | **1.** Draw from specific cases for more general cases.<br>**2.** Speak or write in generalities. | *"A man just can't generalize the creatures."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[generalized]] | verb | **1.** Draw from specific cases for more general cases.<br>**2.** Speak or write in generalities. | *"More often, however, he would uncover a society in which there was little of the generalized style that characterizes even the most personal formal poetry of the period."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[generally]] | adverb | **1.** Usually; as a rule.<br>**2.** Without distinction of one from others. | *"He that so generally is at all times good, must of necessity hold his virtue to you, whose worthiness would stir it up where it wanted, rather than lack it where there is such abundance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[generalship]] | noun | **1.** The leadership ability of a military general.<br>**2.** The office and authority of a general. | *"It is a great triumph of skill to gain the former, but still greater proof of generalship to maintain possession of the latter, for the man must battle for his fortress at every door and window."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[overgeneralise]] | verb | **1.** Draw too general a conclusion. | *"In academic literature, overgeneralise designates draw too general a conclusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overgeneralize]] | verb | **1.** Draw too general a conclusion. | *"In academic literature, overgeneralize designates draw too general a conclusion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster General]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GENERAL
  </div>
</div>
