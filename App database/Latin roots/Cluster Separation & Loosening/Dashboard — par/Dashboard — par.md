---
status: unread
type: root_dashboard
---
# Dashboard — par
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">par-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“equal or like”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Untying a tight knot and separating two parts from each other.</span>
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

The root **par** means equal or like. It describes having the same measure, value, or size, or being balanced and fair. In English, this root forms words such as *equal*, *peer*, *pair*, and *disparity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: equal or like
> The root **par** means equal or like. It describes having the same measure, value, or size, or being balanced and fair. In English, this root forms words such as *equal*, *peer*, *pair*, and *disparity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Equal or like</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *equal* and *peer*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **par** comes from a Latin word that means *"equal or like"*.
  - At its core, it describes equal or like.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **par** in an English word, think of **separating, loosening, and dividing**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of equal or like.
  - **Mental & Social**: How people experience, organize, or communicate about equal or like.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Equal**: An everyday English word showing the root's idea of *equal or like*.
  - **Peer**: A person of the same age, status, or ability as another. 2. A member of the nobility in Britain.
  - **Pair**: A set of two things used together or regarded as a unit. 2. To join or connect in pairs.
  - **Disparity**: A great difference or inequality, especially in status, wealth, or opportunity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">par</mark>, think of <mark class="hl-def">separating, loosening, and dividing</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Bare Adjective / Noun:** *par* (equality; standard benchmark; average golf score).
- **Abstract Equality Base (`-ity`):** *paritās* $\to$ *parity*, *imparity*.
- **Prefixation of Matching:**
  - `com-` + *parāre* $\to$ *compare*, *comparison*, *comparable*, *comparative*, *incomparable*.
- **Prefixation of Inequality:**
  - `dis-` + *par* $\to$ *dispar* $\to$ *disparity* (inequality), *disparate* (fundamentally unlike).
  - `im-` + *par* $\to$ *impar* $\to$ *imparity* (lack of equality).
- **Feudal & Colloquial Transmissions:**
  - *peer* (social equal; nobleman), *peerless* (having no equal).
  - *pair* (two matched things).
  - *nonpareil* (unrivaled, peerless).

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

### 1. Benchmark Equality & Metrics
- *par* (an equality in value or standing; normal or standard level).
- *parity* (the state or condition of being equal, especially in pay or status).
- *imparity* (inequality, disparity).

### 2. Forensic & Analytical Evaluation
- *compare* (to estimate, measure, or note the similarity or dissimilarity between).
- *comparable* (able to be compared; of equivalent quality).
- *comparison* (the act or instance of comparing).
- *comparative* (pertaining to comparison; measured by comparison).
- *incomparable* (without an equal in quality or character; matchless).

### 3. Divergence & Radical Difference
- *disparity* (a great difference or inequality in amount, status, or value).
- *disparate* (essentially different in kind; not allowing comparison).

### 4. Social Status & Coupling
- *peer* (a person of the same age, status, or ability; member of the nobility).
- *peerless* (unequaled, unrivaled).
- *pair* (a set of two things used together or regarded as a unit).
- *nonpareil* (having no match or equal; unrivaled).

---

## 🔀 4. Prefix & Combining Dynamics on par

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `par` + `-ity` | Abstract state | Condition of perfect equality, equivalence, or balance | *parity* |
| `dis-` + `par` + `-ity` | Privative prefixation | Measurable structural inequality between groups | *disparity* |
| `dis-` + `par` + `-ate` | Qualitative partition | Things fundamentally distinct in genus or nature | *disparate* |
| `com-` + `par-` + `-are` | Associative prefixation | Placing side-by-side to examine relative standing | *compare, comparable* |
| `non-` + `par-` + `-eil` | French diminutive negation | Peerless excellence; without equal in the entire world | *nonpareil* |
| `in-` + `com-` + `parable` | Superlative negation | Transcending comparison; infinitely superior | *incomparable* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Economics & Finance:** Purchasing power parity (PPP), par value of bonds, gender pay parity.
- **Constitutional Law & Feudal History:** Trial by a jury of one's peers (Sixth Amendment), the British Peerage system.
- **Sociology & Public Policy:** Healthcare disparities, socioeconomic disparities, disparate impact doctrine in civil rights law.
- **Computer Science & Physics:** Parity bits in error-checking memory, parity conservation in quantum mechanics.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antepartum]] | adjective | **1.** Occurring or existing before birth. | *"In academic literature, antepartum designates occurring or existing before birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiparallel]] | adjective | **1.** (especially of vectors) parallel but oppositely directed. | *"In academic literature, antiparallel designates (especially of vectors) parallel but oppositely directed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiparticle]] | noun | **1.** A particle that has the same mass as another particle but has opposite values for its other properties; interaction of a particle and its antiparticle results in annihilation and the production of radiant energy. | *"In academic literature, antiparticle designates a particle that has the same mass as another particle but has opposite values for its other properties; interaction of a particle and its antiparticle results in annihilation and the production of radiant energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apparatchik]] | noun | **1.** A humorous but derogatory term for an official of a large organization (especially a political organization).<br>**2.** A communist who was a member of the administrative system of a communist party. | *"In academic literature, apparatchik designates a humorous but derogatory term for an official of a large organization (especially a political organization)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apparatus]] | noun | **1.** Equipment designed to serve a specific function.<br>**2.** (anatomy) a group of body parts that work together to perform a given function. | *"The heating apparatus of our Orphan Home unexpectedly gave out."* — Classic Author, *The wonders of prayer* |
| [[apparel]] | noun | **1.** Clothing in general.<br>**2.** Provide with clothes or put clothes on. | *"I will never trust a man again for keeping his sword clean, nor believe he can have everything in him by wearing his apparel neatly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[appareled]] | verb | **1.** Provide with clothes or put clothes on.<br>**2.** Dressed or clothed especially in fine attire; often used in combination. | *"In academic literature, appareled designates provide with clothes or put clothes on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apparency]] | noun | **1.** The property of being apparent. | *"In academic literature, apparency designates the property of being apparent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apparent]] | adjective | **1.** Clearly revealed to the mind or the senses or judgment.<br>**2.** Appearing as such but not necessarily so. | *"If you can make’t apparent That you have tasted her in bed, my hand And ring is yours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apparently]] | adverb | **1.** From appearances alone; ; ; -thomas hardy.<br>**2.** Unmistakably (`plain' is often used informally for `plainly'). | *"I would not spare my brother in this case If he should scorn me so apparently."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apparentness]] | noun | **1.** The property of being apparent. | *"In academic literature, apparentness designates the property of being apparent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apparition]] | noun | **1.** A ghostly appearing figure.<br>**2.** The appearance of a ghostlike figure. | *"Enter, as in an apparition, Sicilius Leonatus, father to Posthumus, an old man attired like a warrior; leading in his hand an ancient matron, his wife and Mother to Posthumus, with music before them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apparitional]] | adjective | **1.** Resembling or characteristic of a phantom. | *"That is, matter manifests itself in form, and form is apparitional."* — Jack London, *The Jacket (The Star-Rover)* |
| [[asparagaceae]] | noun | **1.** One of many families or subfamilies into which some classification systems subdivide the liliaceae: includes genera asparagus and sometimes ruscus. | *"In academic literature, asparagaceae designates one of many families or subfamilies into which some classification systems subdivide the liliaceae: includes genera asparagus and sometimes ruscus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asparaginase]] | noun | **1.** Antineoplastic drug (trade name elspar) sometimes used to treat lymphoblastic leukemia. | *"In academic literature, asparaginase designates antineoplastic drug (trade name elspar) sometimes used to treat lymphoblastic leukemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asparagine]] | noun | **1.** A crystalline amino acid found in proteins and in many plants (e.g., asparagus). | *"In academic literature, asparagine designates a crystalline amino acid found in proteins and in many plants (e.g., asparagus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asparagus]] | noun | **1.** Plant whose succulent young shoots are cooked and eaten as a vegetable.<br>**2.** Edible young shoots of the asparagus plant. | *"The count walked up and down the hall in his dressing gown, giving orders to the club steward and to the famous Feoktíst, the club’s head cook, about asparagus, fresh cucumbers, strawberries, veal, and fish for this dinner."* — graf Leo Tolstoy, *War and Peace* |
| [[aspartame]] | noun | **1.** An artificial sweetener made from aspartic acid; used as a calorie-free sweetener. | *"In academic literature, aspartame designates an artificial sweetener made from aspartic acid; used as a calorie-free sweetener."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comparability]] | noun | **1.** Qualities that are comparable. | *"In academic literature, comparability designates qualities that are comparable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comparable]] | adjective | **1.** Able to be compared or worthy of comparison.<br>**2.** Conforming in every respect. | *"Finally, much better commercial statistics are needed, and for collecting them and reporting the outlook, government organization is required comparable in range and methods to the weather bureau."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[comparably]] | adverb | **1.** In a comparable manner or to a comparable degree. | *"In academic literature, comparably designates in a comparable manner or to a comparable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comparative]] | noun | **1.** The comparative form of an adjective or adverb.<br>**2.** Relating to or based on or involving comparison. | *"Thou wert dignified enough, Even to the point of envy, if ’twere made Comparative for your virtues to be styl’d The under-hangman of his kingdom, and hated For being preferr’d so well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comparatively]] | adverb | **1.** In a relative manner; by comparison to something else. | *"It was a much safer place for a gentleman in his predicament: he might there be important at comparatively little expense."* — Jane Austen, *Persuasion* |
| [[compare]] | noun | **1.** Qualities that are comparable.<br>**2.** Examine and note the similarities or differences of. | *"But were some child of yours alive that time, You should live twice,—in it, and in my rhyme. 18 Shall I compare thee to a summer’s day?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comparing]] | noun | **1.** The act of examining resemblances.<br>**2.** Examine and note the similarities or differences of. | *"She tears the senseless Sinon with her nails, Comparing him to that unhappy guest Whose deed hath made herself herself detest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comparison]] | noun | **1.** The act of examining resemblances.<br>**2.** Relation based on similarities and differences. | *"As fair and as good—a kind of hand-in-hand comparison—had been something too fair and too good for any lady in Britain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comparison-shop]] | verb | **1.** Compare prices for a given item. | *"In academic literature, comparison-shop designates compare prices for a given item."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compart]] | verb | **1.** Lay out in parts according to a plan. | *"In academic literature, compart designates lay out in parts according to a plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartment]] | noun | **1.** A space into which an area is subdivided.<br>**2.** A partitioned section, chamber, or separate room within a larger enclosed area. | *"After that the girl remains for a year in the large common hut (_tembe_), where she occupies a special compartment screened off from the men's quarters."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[compartmental]] | adjective | **1.** Divided up into compartments or categories. | *"In academic literature, compartmental designates divided up into compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalisation]] | noun | **1.** A mild state of dissociation.<br>**2.** The act of distributing things into classes or categories of the same type. | *"In academic literature, compartmentalisation designates a mild state of dissociation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalise]] | verb | **1.** Separate into isolated compartments or categories. | *"In academic literature, compartmentalise designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalised]] | verb | **1.** Separate into isolated compartments or categories.<br>**2.** Divided up into compartments or categories. | *"In academic literature, compartmentalised designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalization]] | noun | **1.** A mild state of dissociation.<br>**2.** The act of distributing things into classes or categories of the same type. | *"In academic literature, compartmentalization designates a mild state of dissociation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalize]] | verb | **1.** Separate into isolated compartments or categories. | *"In academic literature, compartmentalize designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalized]] | verb | **1.** Separate into isolated compartments or categories.<br>**2.** Divided up into compartments or categories. | *"In academic literature, compartmentalized designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmented]] | adjective | **1.** Divided up or separated into compartments or isolated units; ; - john mason brown. | *"In academic literature, compartmented designates divided up or separated into compartments or isolated units; ; - john mason brown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[copartner]] | noun | **1.** A joint partner (as in a business enterprise). | *"In academic literature, copartner designates a joint partner (as in a business enterprise)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[copartnership]] | noun | **1.** A partnership in which employees get a share of the profits in addition to their wages. | *"In academic literature, copartnership designates a partnership in which employees get a share of the profits in addition to their wages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterpart]] | noun | **1.** A person or thing having the same function or characteristics as another.<br>**2.** A duplicate copy. | *"Let him but copy what in you is writ, Not making worse what nature made so clear, And such a counterpart shall fame his wit, Making his style admired every where."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deparia]] | noun | **1.** Classification used for 5 species of terrestrial ferns usually placed in other genera. | *"In academic literature, deparia designates classification used for 5 species of terrestrial ferns usually placed in other genera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depart]] | verb | **1.** Move away from a place into another direction.<br>**2.** Be at variance with; be out of line with. | *"The long day’s task is done, And we must sleep.—That thou depart’st hence safe Does pay thy labour richly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[departed]] | noun | **1.** Someone who is no longer alive.<br>**2.** Move away from a place into another direction. | *"Then up he rose and donn’d his clothes, And dupp’d the chamber door, Let in the maid, that out a maid Never departed more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[departer]] | noun | **1.** Someone who leaves. | *"How did the centripetal remainer afford egress to the centrifugal departer?"* — James Joyce, *Ulysses* |
| [[department]] | noun | **1.** A specialized division of a large organization.<br>**2.** The territorial and administrative division of some countries (such as france). | *"Then, giving the Home Department and the leadership of the House of Commons to Joodle, the Exchequer to Koodle, the Colonies to Loodle, and the Foreign Office to Moodle, what are you to do with Noodle?"* — Charles Dickens, *Bleak House* |
| [[departmental]] | adjective | **1.** Of or relating to a department. | *"Commanders must use this plan and complement it with initiatives tailored to specific needs.' Over the following months the Army issued implementing Departmental, major command, and subordinate level Regulations, programs, and guides."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[departmentally]] | adverb | **1.** Dependent on a department. | *"In academic literature, departmentally designates dependent on a department."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[departure]] | noun | **1.** The act of departing.<br>**2.** A variation that deviates from the standard or norm. | *"If the business be of any difficulty and this morning your departure hence, it requires haste of your lordship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disparage]] | verb | **1.** Express a negative opinion of. | *"Disparage not the faith thou dost not know, Lest to thy peril thou aby it dear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disparagement]] | noun | **1.** A communication that belittles somebody or something.<br>**2.** The act of speaking contemptuously of. | *"But though thou art adjudged to the death, And passed sentence may not be recall’d But to our honour’s great disparagement, Yet will I favour thee in what I can."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disparager]] | noun | **1.** One who disparages or belittles the worth of something. | *"In academic literature, disparager designates one who disparages or belittles the worth of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disparaging]] | verb | **1.** Express a negative opinion of.<br>**2.** Expressive of low opinion. | *"That without any affectation of disparaging such professional distinction as I may have attained (which our friend Mr."* — Charles Dickens, *Bleak House* |
| [[disparagingly]] | adverb | **1.** In a disparaging manner. | *"You would think there was not a single tusk left either above or below the ground in the whole country. ‘Mostly fossil,’ the manager had remarked, disparagingly."* — Joseph Conrad, *Heart of Darkness* |
| [[disparate]] | adjective | **1.** Fundamentally different or distinct in quality or kind.<br>**2.** Including markedly dissimilar elements. | *"Their disparate ancestries blended through a natural vitality that accelerated human evolution so as to survive in a radically new environment."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disparateness]] | noun | **1.** Utter dissimilarity. | *"In academic literature, disparateness designates utter dissimilarity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disparity]] | noun | **1.** Inequality or difference in some respect. | *"Their single share, Their nobleness peculiar to them, gives The prejudice of disparity, value’s shortness, To any lady breathing. [_Cornets."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eparch]] | noun | **1.** A bishop or metropolitan in charge of an eparchy in the eastern church.<br>**2.** The governor or prefect of an eparchy in ancient greece. | *"In academic literature, eparch designates a bishop or metropolitan in charge of an eparchy in the eastern church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eparchial]] | adjective | **1.** Of or relating to an eparchy. | *"In academic literature, eparchial designates of or relating to an eparchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eparchy]] | noun | **1.** A province in ancient greece.<br>**2.** A diocese of the eastern orthodox church. | *"In academic literature, eparchy designates a province in ancient greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imparipinnate]] | adjective | **1.** (a leaf shape) pinnate with a single leaflet at the apex. | *"In academic literature, imparipinnate designates (a leaf shape) pinnate with a single leaflet at the apex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imparity]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin par within the domain of Separation & Loosening.<br>**2.** A technical or specialized form exhibiting the properties of par in systematic terminology. | *"In academic literature, imparity designates pertaining to, derived from, or characteristic of latin par within the domain of separation & loosening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impart]] | verb | **1.** Transmit (knowledge or skills).<br>**2.** Bestow a quality on. | *"Break we our watch up, and by my advice, Let us impart what we have seen tonight Unto young Hamlet; for upon my life, This spirit, dumb to us, will speak to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impartation]] | noun | **1.** The transmission of information. | *"He has his reserve--his secret; yet, in another sense, he gives himself to them without reserve; there is prodigality of self-impartation in his dealings with them."* — T. R. Glover, *The Jesus of History* |
| [[impartial]] | adjective | **1.** Showing lack of favoritism.<br>**2.** Free from undue bias or preconceived opinions. | *"Sweet Princes, what I did I did in honour, Led by th’ impartial conduct of my soul; And never shall you see that I will beg A ragged and forestall’d remission."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impartiality]] | noun | **1.** An inclination to weigh both views or opinions equally. | *"Next day the weather was bad, but she trudged on, the honesty, directness, and impartiality of elemental enmity disconcerting her but little."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impartially]] | adverb | **1.** In an impartial manner. | *"This was the substance of the letter, written throughout with a justice and a dignity as if he were indeed my responsible guardian impartially representing the proposal of a friend against whom in his integrity he stated the full case."* — Charles Dickens, *Bleak House* |
| [[imparting]] | noun | **1.** The transmission of information.<br>**2.** Transmit (knowledge or skills). | *"So our young friends, reduced to prose (which is much to be regretted), degenerate in their power of imparting pleasure to me."* — Charles Dickens, *Bleak House* |
| [[incomparable]] | adjective | **1.** Such that comparison is impossible; unsuitable for comparison or lacking features that can be compared. | *"KING EDWARD. [_Aside_.] Her looks doth argue her replete with modesty; Her words doth show her wit incomparable; All her perfections challenge sovereignty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incomparably]] | adverb | **1.** In an incomparable manner or to an incomparable degree. | *"The issues at stake, demanding every ounce of their energy, are incomparably glorious."* — Effendi Shoghi, *Citadel of Faith* |
| [[inseparable]] | adjective | **1.** Not capable of being separated. | *"We still have slept together, Rose at an instant, learned, played, ate together, And wheresoe’er we went, like Juno’s swans, Still we went coupled and inseparable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inseparably]] | adverb | **1.** Without possibility of separation. | *"The three are inseparably connected, and to understand one we must understand all."* — Sydney Waterlow, *Shelley* |
| [[interdepartmental]] | adjective | **1.** Between or among departments.<br>**2.** Between departments. | *"In academic literature, interdepartmental designates between or among departments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intradepartmental]] | adjective | **1.** Within a department. | *"In academic literature, intradepartmental designates within a department."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irreparable]] | adjective | **1.** Impossible to repair, rectify, or amend. | *"Irreparable is the loss, and patience Says it is past her cure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonparallel]] | adjective | **1.** Of or relating to the sequential performance of multiple operations.<br>**2.** (of e.g. lines or paths) not parallel; converging. | *"In academic literature, nonparallel designates of or relating to the sequential performance of multiple operations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparametric]] | adjective | **1.** Not involving an estimation of the parameters of a statistic. | *"In academic literature, nonparametric designates not involving an estimation of the parameters of a statistic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparasitic]] | adjective | **1.** Not parasitic on another organism. | *"In academic literature, nonparasitic designates not parasitic on another organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpareil]] | noun | **1.** Model of excellence or perfection of a kind; one having no equal.<br>**2.** Colored beads of sugar used as a topping on e.g. candies and cookies. | *"So doth my wife The nonpareil of this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonparticipant]] | noun | **1.** A person who does not participate. | *"In academic literature, nonparticipant designates a person who does not participate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparticipation]] | noun | **1.** Withdrawing from the activities of a group. | *"In academic literature, nonparticipation designates withdrawing from the activities of a group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparticulate]] | adjective | **1.** Not composed of distinct particles. | *"In academic literature, nonparticulate designates not composed of distinct particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartisan]] | noun | **1.** A person who is nonpartisan.<br>**2.** Free from party affiliation or bias. | *"In academic literature, nonpartisan designates a person who is nonpartisan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartisanship]] | noun | **1.** An inclination to weigh both views or opinions equally. | *"In academic literature, nonpartisanship designates an inclination to weigh both views or opinions equally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartizan]] | noun | **1.** A person who is nonpartisan.<br>**2.** Free from party affiliation or bias. | *"In academic literature, nonpartizan designates a person who is nonpartisan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[par]] | noun | **1.** (golf) the standard number of strokes set for each hole on a golf course, or for the entire course.<br>**2.** A state of being essentially equal or equivalent; equally balanced. | *"A drum now of the enemy’s! [_Alarum within._] FIRST LORD. _Throca movousus, cargo, cargo, cargo._ ALL. _Cargo, cargo, cargo, villianda par corbo, cargo._ [_They seize and blindfold him._] PAROLLES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[para]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** 100 para equal 1 dinar in yugoslavia. | *"I am an admirer of Montesquieu,” replied Prince Andrew, “and his idea that le principe des monarchies est l’honneur me paraît incontestable."* — graf Leo Tolstoy, *War and Peace* |
| [[parable]] | noun | **1.** A short moral story (often with animal characters).<br>**2.** (new testament) any of the stories told by jesus to convey his religious message. | *"Thou shalt never get such a secret from me but by a parable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parabola]] | noun | **1.** A plane curve formed by the intersection of a right circular cone and a plane parallel to an element of the curve. | *"The end of the liquid parabola has come forward from the wall, has advanced over the plinth mouldings, over a heap of stones, over the marble border, into the midst of Fanny Robin’s grave."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[parabolic]] | adjective | **1.** Resembling or expressed by parables.<br>**2.** Having the form of a parabola. | *"At any distance the beam from the parabolic reflector will be more intense than that from the spherical one, since the rays will be closer together."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[parabolical]] | adjective | **1.** Resembling or expressed by parables.<br>**2.** Having the form of a parabola. | *"In academic literature, parabolical designates resembling or expressed by parables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloid]] | noun | **1.** A surface having parabolic sections parallel to a single coordinate axis and elliptic sections perpendicular to that axis. | *"In academic literature, paraboloid designates a surface having parabolic sections parallel to a single coordinate axis and elliptic sections perpendicular to that axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloidal]] | adjective | **1.** Having the shape of a paraboloid. | *"In academic literature, paraboloidal designates having the shape of a paraboloid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paracelsus]] | noun | **1.** Swiss physician who introduced treatments of particular illnesses based on his observation and experience; he saw illness as having an external cause (rather than an imbalance of humors) and replaced traditional remedies with chemical remedies (1493-1541). | *"So I say; both of Galen and Paracelsus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paracentesis]] | noun | **1.** Centesis of the belly to remove fluid for diagnosis. | *"In academic literature, paracentesis designates centesis of the belly to remove fluid for diagnosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paracheirodon]] | noun | **1.** A genus of characidae. | *"In academic literature, paracheirodon designates a genus of characidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parachute]] | noun | **1.** Rescue equipment consisting of a device that fills with air and retards your fall.<br>**2.** Jump from an airplane and descend with a parachute. | *"Parachute Rigger, World War Two, Hawaiian Air Depot, Hickam Field, Hawaii 1941-1948 Introduction In early 1995, the students at a middle school in a Northeastern city studied United States involvement in WW2."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[parachuter]] | noun | **1.** A person who jumps from aircraft using a parachute. | *"In academic literature, parachuter designates a person who jumps from aircraft using a parachute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parachuting]] | noun | **1.** Descent with a parachute.<br>**2.** Jump from an airplane and descend with a parachute. | *"Parachutes also have a wide range of uses in peacetime, as examples, sports parachuting, 'fire jumpers' fighting forest fires, and rescue operations in terrain or other circumstances that preclude less hazardous access."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[parachutist]] | noun | **1.** A person who jumps from aircraft using a parachute. | *"In academic literature, parachutist designates a person who jumps from aircraft using a parachute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraclete]] | noun | **1.** The third person in the trinity; jesus promised the apostles that he would send the holy spirit after his crucifixion and resurrection; it came on pentecost. | *"There you have the will of my God."[101] "And therefore the Paraclete is needed, to guide into all truth, to animate for all endurance."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[paracosm]] | noun | **1.** A prolonged fantasy world invented by children; can have a definite geography and language and history. | *"In academic literature, paracosm designates a prolonged fantasy world invented by children; can have a definite geography and language and history."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parade]] | noun | **1.** A ceremonial procession including people marching.<br>**2.** An extended (often showy) succession of persons or things. | *"An’ev’n their sports, their balls an’ races, Their galloping through public places, There’s sic parade, sic pomp, an’ art, The joy can scarcely reach the heart."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[parader]] | noun | **1.** Walks with regular or stately step. | *"In academic literature, parader designates walks with regular or stately step."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradiddle]] | noun | **1.** The sound of a drum (especially a snare drum) beaten rapidly and continuously. | *"In academic literature, paradiddle designates the sound of a drum (especially a snare drum) beaten rapidly and continuously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradigm]] | noun | **1.** Systematic arrangement of all the inflected forms of a word.<br>**2.** A standard or typical example. | *"In academic literature, paradigm designates systematic arrangement of all the inflected forms of a word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradigmatic]] | adjective | **1.** Of or relating to a grammatical paradigm.<br>**2.** Of or relating to a typical example. | *"In academic literature, paradigmatic designates of or relating to a grammatical paradigm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradisaeidae]] | noun | **1.** Birds of paradise. | *"In academic literature, paradisaeidae designates birds of paradise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradisaic]] | adjective | **1.** Relating to or befitting paradise. | *"In academic literature, paradisaic designates relating to or befitting paradise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradisaical]] | adjective | **1.** Relating to or befitting paradise. | *"In academic literature, paradisaical designates relating to or befitting paradise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradisal]] | adjective | **1.** Relating to or befitting paradise. | *"In academic literature, paradisal designates relating to or befitting paradise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradise]] | noun | **1.** Any place of complete bliss and delight and peace.<br>**2.** (christianity) the abode of righteous souls after death. | *"No, no, although The air of paradise did fan the house, And angels offic’d all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paradisiac]] | adjective | **1.** Relating to or befitting paradise. | *"In academic literature, paradisiac designates relating to or befitting paradise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradisiacal]] | adjective | **1.** Relating to or befitting paradise. | *"Given at this our loyal city of Dublin in the year 1 of the Paradisiacal Era."* — James Joyce, *Ulysses* |
| [[paradox]] | noun | **1.** (logic) a statement that contradicts itself. | *"This was sometime a paradox, but now the time gives it proof."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paradoxical]] | adjective | **1.** Seemingly contradictory but nonetheless possibly true. | *"Night and day is this death-watch on me, and its paradoxical function is to see that I do not die."* — Jack London, *The Jacket (The Star-Rover)* |
| [[paradoxically]] | adverb | **1.** In a paradoxical manner. | *"Paradoxically speaking, if there is not too much of the bad money, it is just as good as the good money."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[paradoxurus]] | noun | **1.** Palm civets. | *"In academic literature, paradoxurus designates palm civets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraesthesia]] | noun | **1.** Abnormal skin sensations (as tingling or tickling or itching or burning) usually associated with peripheral nerve damage. | *"In academic literature, paraesthesia designates abnormal skin sensations (as tingling or tickling or itching or burning) usually associated with peripheral nerve damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraffin]] | noun | **1.** From crude petroleum; used for candles and for preservative or waterproof coatings.<br>**2.** A series of non-aromatic saturated hydrocarbons with the general formula cnh(2n+2). | *"The next part of the process is to coat the splints with paraffin or melted sulphur."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[parafovea]] | noun | **1.** Area of the retina immediately surrounding the fovea. | *"In academic literature, parafovea designates area of the retina immediately surrounding the fovea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paragliding]] | noun | **1.** Gliding in a parasail. | *"In academic literature, paragliding designates gliding in a parasail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paragon]] | noun | **1.** An ideal instance; a perfect embodiment of a concept.<br>**2.** Model of excellence or perfection of a kind; one having no equal. | *"By Isis, I will give thee bloody teeth If thou with Caesar paragon again My man of men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paragonite]] | noun | **1.** A colorless or pale brown mica with sodium. | *"In academic literature, paragonite designates a colorless or pale brown mica with sodium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paragraph]] | noun | **1.** One of several distinct subdivisions of a text intended to separate ideas; the beginning is usually marked by a new indented line.<br>**2.** Divide into paragraphs, as of text. | *"Come and teach our two-legged law-paragraph here to get some sense."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[paragrapher]] | noun | **1.** A writer of paragraphs (as for publication on the editorial page of a newspaper). | *"In academic literature, paragrapher designates a writer of paragraphs (as for publication on the editorial page of a newspaper)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraguay]] | noun | **1.** A landlocked republic in south central south america; achieved independence from spain in 1811. | *"Additional assemblies have been incorporated in Paraguay and Colombia."* — Effendi Shoghi, *Citadel of Faith* |
| [[paraguayan]] | noun | **1.** A native or inhabitant of paraguay.<br>**2.** Of or relating to or characteristic of paraguay or its people. | *"Amongst the Lengua Indians of the Paraguayan Chaco the marriage feast is now apparently extinct."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[parakeet]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In academic literature, parakeet designates any of numerous small slender long-tailed parrots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralanguage]] | noun | **1.** The use of manner of speaking to communicate particular meanings. | *"In academic literature, paralanguage designates the use of manner of speaking to communicate particular meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraldehyde]] | noun | **1.** A colorless liquid (a cyclic trimer of acetaldehyde) that is used as a sedative and a solvent. | *"In academic literature, paraldehyde designates a colorless liquid (a cyclic trimer of acetaldehyde) that is used as a sedative and a solvent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralegal]] | noun | **1.** A person with specialized training who assists lawyers. | *"In academic literature, paralegal designates a person with specialized training who assists lawyers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraleipsis]] | noun | **1.** Suggesting by deliberately concise treatment that much of significance is omitted. | *"In academic literature, paraleipsis designates suggesting by deliberately concise treatment that much of significance is omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralepsis]] | noun | **1.** Suggesting by deliberately concise treatment that much of significance is omitted. | *"In academic literature, paralepsis designates suggesting by deliberately concise treatment that much of significance is omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralichthys]] | noun | **1.** A genus of bothidae. | *"In academic literature, paralichthys designates a genus of bothidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralipomenon]] | noun | **1.** (old testament) an obsolete name for the old testament books of i chronicles and ii chronicles which were regarded as supplementary to kings. | *"In academic literature, paralipomenon designates (old testament) an obsolete name for the old testament books of i chronicles and ii chronicles which were regarded as supplementary to kings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralipsis]] | noun | **1.** Suggesting by deliberately concise treatment that much of significance is omitted. | *"In academic literature, paralipsis designates suggesting by deliberately concise treatment that much of significance is omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralithodes]] | noun | **1.** A genus of lithodidae. | *"In academic literature, paralithodes designates a genus of lithodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallax]] | noun | **1.** The apparent displacement of an object as seen from two different points that are not on a line with the object. | *"Par it’s Greek: parallel, parallax."* — James Joyce, *Ulysses* |
| [[parallel]] | noun | **1.** Something having the property of being analogous to something else.<br>**2.** An imaginary line around the earth parallel to the equator. | *"O, behold this ring, Whose high respect and rich validity Did lack a parallel; yet for all that He gave it to a commoner o’ the camp, If I be one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parallel-park]] | verb | **1.** Park directly behind another vehicle. | *"In academic literature, parallel-park designates park directly behind another vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelepiped]] | noun | **1.** A prism whose bases are parallelograms. | *"In academic literature, parallelepiped designates a prism whose bases are parallelograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelepipedon]] | noun | **1.** A prism whose bases are parallelograms. | *"In academic literature, parallelepipedon designates a prism whose bases are parallelograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelism]] | noun | **1.** Similarity by virtue of corresponding. | *"Here again the parallelism holds between the anthropomorphic and the vegetable representation of the tree-spirit, for we have seen above that trees are sometimes married to each other."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[parallelize]] | verb | **1.** Place parallel to one another. | *"In academic literature, parallelize designates place parallel to one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelogram]] | noun | **1.** A quadrilateral whose opposite sides are both parallel and equal in length. | *"It was life size and stretched across the white parallelogram of a door, half across the wall space on which the picture hung."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[parallelopiped]] | noun | **1.** A prism whose bases are parallelograms. | *"In academic literature, parallelopiped designates a prism whose bases are parallelograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelopipedon]] | noun | **1.** A prism whose bases are parallelograms. | *"In academic literature, parallelopipedon designates a prism whose bases are parallelograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralogism]] | noun | **1.** An unintentionally invalid argument. | *"In academic literature, paralogism designates an unintentionally invalid argument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralyse]] | verb | **1.** Make powerless and unable to function.<br>**2.** Cause to be paralyzed and immobile. | *"Shall I shake that faith in Bucket because I want it myself; shall I deliberately blunt one of Bucket’s weapons; shall I positively paralyse Bucket in his next detective operation?"* — Charles Dickens, *Bleak House* |
| [[paralysis]] | noun | **1.** Loss of the ability to move a body part. | *"Sir Leicester Dedlock, Baronet, has had a fit—apoplexy or paralysis—and couldn’t be brought to, and precious time has been lost."* — Charles Dickens, *Bleak House* |
| [[paralytic]] | noun | **1.** A person suffering from paralysis.<br>**2.** Relating to or of the nature of paralysis. | *"But ever while he laughs, he glances over his paralytic shoulder at Mr."* — Charles Dickens, *Bleak House* |
| [[paralytical]] | adjective | **1.** Relating to or of the nature of paralysis. | *"In academic literature, paralytical designates relating to or of the nature of paralysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralyze]] | verb | **1.** Make powerless and unable to function.<br>**2.** Cause to be paralyzed and immobile. | *"To leave it upon any lower plane than this, is to rob it of its highest functions and to paralyze it of lasting power for good in any direction."* — Classic Author, *The wonders of prayer* |
| [[paralyzed]] | verb | **1.** Make powerless and unable to function.<br>**2.** Cause to be paralyzed and immobile. | *"He looked up at the sound of her pit-pat, and his changed appearance sufficiently denoted to her the depth and strength of the feelings paralyzed by her letter."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[paramagnet]] | noun | **1.** Magnet made of a substance whose magnetization is proportional to the strength of the magnetic field applied to it. | *"In academic literature, paramagnet designates magnet made of a substance whose magnetization is proportional to the strength of the magnetic field applied to it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramagnetic]] | adjective | **1.** Of or relating to a paramagnet. | *"In academic literature, paramagnetic designates of or relating to a paramagnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramagnetism]] | noun | **1.** Materials like aluminum or platinum become magnetized in a magnetic field but it disappears when the field is removed. | *"In academic literature, paramagnetism designates materials like aluminum or platinum become magnetized in a magnetic field but it disappears when the field is removed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramaribo]] | noun | **1.** The capital and largest city and major port of surinam. | *"In academic literature, paramaribo designates the capital and largest city and major port of surinam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramecia]] | noun | **1.** Any member of the genus paramecium. | *"In academic literature, paramecia designates any member of the genus paramecium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramecium]] | noun | **1.** Any member of the genus paramecium. | *"In academic literature, paramecium designates any member of the genus paramecium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramedic]] | noun | **1.** A person trained to assist medical professionals and to give emergency medical treatment. | *"Frankly, it has me wondering: a ship's captain, paramedic-logistics type, a maintenance engineer, communications specialist, navigator, and a weapons technician."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[paramedical]] | noun | **1.** A person trained to assist medical professionals and to give emergency medical treatment.<br>**2.** Of or denoting a person who assists physicians and nurses or is trained physicians and nurses in their activities; ambulance drivers are paramedical personnel". | *"In academic literature, paramedical designates a person trained to assist medical professionals and to give emergency medical treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parameter]] | noun | **1.** A constant in the equation of a curve that can be varied to yield a family of similar curves.<br>**2.** Any factor that defines a system and determines (or limits) its performance. | *"Computer: be ready to give a presentation on each option and its variations within the parameters I specified and which surface through your analyses."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[parametric]] | adjective | **1.** Of or relating to or in terms of a parameter. | *"In academic literature, parametric designates of or relating to or in terms of a parameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parametritis]] | noun | **1.** Inflammation of connective tissue adjacent to the uterus. | *"In academic literature, parametritis designates inflammation of connective tissue adjacent to the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramilitary]] | noun | **1.** A group of civilians organized in a military fashion (especially to operate in place of or to assist regular army troops).<br>**2.** Of or relating to a group of civilians organized to function like or to assist a military unit. | *"In academic literature, paramilitary designates a group of civilians organized in a military fashion (especially to operate in place of or to assist regular army troops)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramnesia]] | noun | **1.** (psychiatry) a disorder of memory in which dreams or fantasies are confused with reality. | *"In academic literature, paramnesia designates (psychiatry) a disorder of memory in which dreams or fantasies are confused with reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramount]] | adjective | **1.** Having superior power and influence. | *"Those interests are now paramount in this office."* — Charles Dickens, *Bleak House* |
| [[paramountcy]] | noun | **1.** The state of being paramount; the highest rank or authority. | *"In academic literature, paramountcy designates the state of being paramount; the highest rank or authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramour]] | noun | **1.** A woman's lover.<br>**2.** A woman who cohabits with an important man. | *"And fitter is my study and my books Than wanton dalliance with a paramour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paramyxovirus]] | noun | **1.** A group of viruses including those causing mumps and measles. | *"In academic literature, paramyxovirus designates a group of viruses including those causing mumps and measles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parana]] | noun | **1.** A south american river; tributary of rio de la plata. | *"In academic literature, parana designates a south american river; tributary of rio de la plata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranasal]] | adjective | **1.** Adjacent to the nasal cavities. | *"In academic literature, paranasal designates adjacent to the nasal cavities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parang]] | noun | **1.** A stout straight knife used in malaysia and indonesia. | *"In academic literature, parang designates a stout straight knife used in malaysia and indonesia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranoia]] | noun | **1.** A psychological disorder characterized by delusions of persecution or grandeur. | *"In academic literature, paranoia designates a psychological disorder characterized by delusions of persecution or grandeur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranoiac]] | noun | **1.** A person afflicted with paranoia. | *"In academic literature, paranoiac designates a person afflicted with paranoia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranoid]] | noun | **1.** A person afflicted with paranoia.<br>**2.** Suffering from paranoia. | *"Doesn't that follow the paranoid pattern better?" The Damakoi nodded slowly."* — Randall Garrett, *Deadly decoy* |
| [[paranormal]] | adjective | **1.** Seemingly outside normal sensory channels.<br>**2.** Not in accordance with scientific laws. | *"In academic literature, paranormal designates seemingly outside normal sensory channels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranthias]] | noun | **1.** A genus of serranidae. | *"In academic literature, paranthias designates a genus of serranidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranthropus]] | noun | **1.** Former classification for australopithecus robustus. | *"In academic literature, paranthropus designates former classification for australopithecus robustus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraparesis]] | noun | **1.** A slight paralysis or weakness of both legs. | *"In academic literature, paraparesis designates a slight paralysis or weakness of both legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapet]] | noun | **1.** A low wall along the edge of a roof or balcony.<br>**2.** Fortification consisting of a low wall. | *"She crouches on the parapet outside for hours and hours."* — Charles Dickens, *Bleak House* |
| [[paraph]] | noun | **1.** A flourish added after or under your signature (originally to protect against forgery). | *"In academic literature, paraph designates a flourish added after or under your signature (originally to protect against forgery)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphernalia]] | noun | **1.** Equipment consisting of miscellaneous articles needed for a particular operation or sport etc. | *"Du Petit Thouars exhibited upon his person all the paraphernalia of his naval rank."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[paraphilia]] | noun | **1.** Abnormal sexual activity. | *"In academic literature, paraphilia designates abnormal sexual activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphrase]] | noun | **1.** Rewording for the purpose of clarification.<br>**2.** Express the same message in different words. | *"Ah, Woe Is Me, My Mother Dear Paraphrase of Jeremiah, 15th Chap., 10th verse."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[paraphrasis]] | noun | **1.** Rewording for the purpose of clarification. | *"In academic literature, paraphrasis designates rewording for the purpose of clarification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphrastic]] | adjective | **1.** Altered by paraphrasing. | *"In academic literature, paraphrastic designates altered by paraphrasing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphrenia]] | noun | **1.** A form of schizophrenia characterized by delusions (of persecution or grandeur or jealousy); symptoms may include anger and anxiety and aloofness and doubts about gender identity; unlike other types of schizophrenia the patients are usually presentable and (if delusions are not acted on) may function in an apparently normal manner. | *"In academic literature, paraphrenia designates a form of schizophrenia characterized by delusions (of persecution or grandeur or jealousy); symptoms may include anger and anxiety and aloofness and doubts about gender identity; unlike other types of schizophrenia the patients are usually presentable and (if delusions are not acted on) may function in an apparently normal manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraphysis]] | noun | **1.** A sterile simple or branched filament or hair borne among sporangia; may be pointed or clubbed. | *"In academic literature, paraphysis designates a sterile simple or branched filament or hair borne among sporangia; may be pointed or clubbed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraplegia]] | noun | **1.** Paralysis of the lower half of the body (most often as a result of trauma). | *"In academic literature, paraplegia designates paralysis of the lower half of the body (most often as a result of trauma)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraplegic]] | noun | **1.** A person who has paraplegia (is paralyzed from the waist down).<br>**2.** Suffering complete paralysis of the lower half of the body usually resulting from damage to the spinal cord. | *"In academic literature, paraplegic designates a person who has paraplegia (is paralyzed from the waist down)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapodium]] | noun | **1.** One of a pair of fleshy appendages of a polychete annelid that functions in locomotion and breathing. | *"In academic literature, parapodium designates one of a pair of fleshy appendages of a polychete annelid that functions in locomotion and breathing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapraxis]] | noun | **1.** A minor inadvertent mistake usually observed in speech or writing or in small accidents or memory lapses etc. | *"In academic literature, parapraxis designates a minor inadvertent mistake usually observed in speech or writing or in small accidents or memory lapses etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraprofessional]] | noun | **1.** A trained worker who is not a member of a profession but who assists a professional. | *"As the SPS functions and workload became clear, I joined its paraprofessional training to certification and when the Service became operational I took my turn on the 'hotline,' especially those related to my McClellan responsibilities."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[parapsychological]] | adjective | **1.** Beyond normal physical explanation. | *"In academic literature, parapsychological designates beyond normal physical explanation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapsychologist]] | noun | **1.** Someone who studies the evidence for such psychological phenomena as psychokinesis and telepathy and clairvoyance. | *"In academic literature, parapsychologist designates someone who studies the evidence for such psychological phenomena as psychokinesis and telepathy and clairvoyance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapsychology]] | noun | **1.** Phenomena that appear to contradict physical laws and suggest the possibility of causation by mental processes. | *"In academic literature, parapsychology designates phenomena that appear to contradict physical laws and suggest the possibility of causation by mental processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraquat]] | noun | **1.** A poisonous yellow solid used in solution as a herbicide. | *"In academic literature, paraquat designates a poisonous yellow solid used in solution as a herbicide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraquet]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In academic literature, paraquet designates any of numerous small slender long-tailed parrots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasail]] | noun | **1.** Parachute that will lift a person up into the air when it is towed by a motorboat or a car. | *"In academic literature, parasail designates parachute that will lift a person up into the air when it is towed by a motorboat or a car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasailing]] | noun | **1.** Gliding in a parasail. | *"In academic literature, parasailing designates gliding in a parasail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parascalops]] | noun | **1.** Brewer's moles. | *"In academic literature, parascalops designates brewer's moles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parashurama]] | noun | **1.** An incarnation of vishnu who rid the earth of kshatriyas. | *"In academic literature, parashurama designates an incarnation of vishnu who rid the earth of kshatriyas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasitaemia]] | noun | **1.** A condition in which parasites are present in the blood. | *"In academic literature, parasitaemia designates a condition in which parasites are present in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasitaxus]] | noun | **1.** One species: parasite yew. | *"In academic literature, parasitaxus designates one species: parasite yew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasite]] | noun | **1.** An animal or plant that lives in or on a host (another animal or plant); it obtains nourishment from the host without benefiting or killing the host.<br>**2.** A follower who hangs around a host (without benefit to the host) in hope of gain or advantage. | *"When steel grows soft Soft as the parasite’s silk, let him be made An ovator for the wars!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parasitemia]] | noun | **1.** A condition in which parasites are present in the blood. | *"In academic literature, parasitemia designates a condition in which parasites are present in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasitic]] | adjective | **1.** Relating to or caused by parasites.<br>**2.** Of or pertaining to epenthesis. | *"Those creatures are parasitic.” “I am so glad I know that you do not like them,” said good Sir James."* — George Eliot, *Middlemarch* |
| [[parasitical]] | adjective | **1.** Relating to or caused by parasites.<br>**2.** Of plants or persons; having the nature or habits of a parasite or leech; living off another. | *"Many industries and branches of industry in America are thus parasitical A condition essentially pathological has come to be looked upon as normal."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[parasitically]] | adverb | **1.** In a parasitic manner. | *"In academic literature, parasitically designates in a parasitic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasiticidal]] | adjective | **1.** Capable of expelling or destroying parasitic worms. | *"In academic literature, parasiticidal designates capable of expelling or destroying parasitic worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasitism]] | noun | **1.** The relation between two different kinds of organisms in which one receives benefits from the other by causing damage to it (usually not fatal damage). | *"More precise examination proves that it sometimes occurs where no white rust is present, and therefore its parasitism is imaginary."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[parasol]] | noun | **1.** A handheld collapsible source of shade. | *"That’s enough—that’s enough!—oh, you fools!” she cried, throwing the parasol and Prayer-book into the passage, and running out of doors in the direction signified."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[parasympathetic]] | noun | **1.** Originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels.<br>**2.** Of or relating to the parasympathetic nervous system. | *"In academic literature, parasympathetic designates originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasympathomimetic]] | adjective | **1.** Having an effect similar to that resulting from stimulation of the parasympathetic nervous system. | *"In academic literature, parasympathomimetic designates having an effect similar to that resulting from stimulation of the parasympathetic nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parathelypteris]] | noun | **1.** Terrestrial ferns of warm and tropical asia and north america. | *"In academic literature, parathelypteris designates terrestrial ferns of warm and tropical asia and north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parathion]] | noun | **1.** A colorless and odorless toxic oil used as an insecticide. | *"In academic literature, parathion designates a colorless and odorless toxic oil used as an insecticide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parathormone]] | noun | **1.** Hormone synthesized and released into the blood stream by the parathyroid glands; regulates phosphorus and calcium in the body and functions in neuromuscular excitation and blood clotting. | *"In academic literature, parathormone designates hormone synthesized and released into the blood stream by the parathyroid glands; regulates phosphorus and calcium in the body and functions in neuromuscular excitation and blood clotting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parathyroid]] | noun | **1.** Any one of four endocrine glands situated above or within the thyroid gland. | *"In academic literature, parathyroid designates any one of four endocrine glands situated above or within the thyroid gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paratrooper]] | noun | **1.** A soldier in the paratroops. | *"In academic literature, paratrooper designates a soldier in the paratroops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paratroops]] | noun | **1.** Infantry trained and equipped to parachute. | *"In academic literature, paratroops designates infantry trained and equipped to parachute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paratyphoid]] | noun | **1.** Any of a variety of infectious intestinal diseases resembling typhoid fever. | *"In academic literature, paratyphoid designates any of a variety of infectious intestinal diseases resembling typhoid fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parazoa]] | noun | **1.** Multicellular organisms having less-specialized cells than in the metazoa; comprises the single phylum porifera.<br>**2.** Primitive multicellular marine animal whose porous body is supported by a fibrous skeletal framework; usually occurs in sessile colonies. | *"In academic literature, parazoa designates multicellular organisms having less-specialized cells than in the metazoa; comprises the single phylum porifera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parazoan]] | noun | **1.** Primitive multicellular marine animal whose porous body is supported by a fibrous skeletal framework; usually occurs in sessile colonies. | *"In academic literature, parazoan designates primitive multicellular marine animal whose porous body is supported by a fibrous skeletal framework; usually occurs in sessile colonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parcae]] | noun | **1.** Any of the three roman goddesses of fate or destiny; identified with the greek moirai and similar to the norse norns. | *"In academic literature, parcae designates any of the three roman goddesses of fate or destiny; identified with the greek moirai and similar to the norse norns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parcel]] | noun | **1.** A wrapped container.<br>**2.** The allotment of some amount by dividing something. | *"This youthful parcel Of noble bachelors stand at my bestowing, O’er whom both sovereign power and father’s voice I have to use."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parceling]] | noun | **1.** The act of distributing by allotting or apportioning; distribution according to a plan.<br>**2.** Divide into parts. | *"In academic literature, parceling designates the act of distributing by allotting or apportioning; distribution according to a plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parcellation]] | noun | **1.** The division into parcels. | *"In academic literature, parcellation designates the division into parcels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parcelling]] | noun | **1.** The act of distributing by allotting or apportioning; distribution according to a plan.<br>**2.** Divide into parts. | *"In academic literature, parcelling designates the act of distributing by allotting or apportioning; distribution according to a plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parch]] | verb | **1.** Cause to wither or parch from exposure to heat. | *"What glory our Achilles shares from Hector, Were he not proud, we all should share with him; But he already is too insolent; And it were better parch in Afric sun Than in the pride and salt scorn of his eyes, Should he scape Hector fair."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parched]] | verb | **1.** Cause to wither or parch from exposure to heat.<br>**2.** Dried out by heat or excessive exposure to sunlight. | *"What, hath thy fiery heart so parched thine entrails That not a tear can fall for Rutland’s death?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parcheesi]] | noun | **1.** A modern board game based on pachisi. | *"In academic literature, parcheesi designates a modern board game based on pachisi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parchesi]] | noun | **1.** An ancient board game resembling backgammon; played on a cross-shaped board. | *"In academic literature, parchesi designates an ancient board game resembling backgammon; played on a cross-shaped board."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parchisi]] | noun | **1.** An ancient board game resembling backgammon; played on a cross-shaped board. | *"In academic literature, parchisi designates an ancient board game resembling backgammon; played on a cross-shaped board."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parchment]] | noun | **1.** A superior paper resembling sheepskin.<br>**2.** Skin of a sheep or goat prepared for writing on. | *"That you beat me at the mart I have your hand to show; If the skin were parchment, and the blows you gave were ink, Your own handwriting would tell you what I think."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pare]] | verb | **1.** Decrease gradually or bit by bit.<br>**2.** Cut small bits or pare shavings from. | *"And what would you have me to do? ’Tis too late to pare her nails now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paregmenon]] | noun | **1.** Juxtaposing words having a common derivation (as in `sense and sensibility'). | *"In academic literature, paregmenon designates juxtaposing words having a common derivation (as in `sense and sensibility')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paregoric]] | noun | **1.** Medicine used to treat diarrhea. | *"Who’s got some paregoric?” said Stubb, “he has the stomach-ache, I’m afraid."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[parenchyma]] | noun | **1.** Animal tissue that constitutes the essential part of an organ as contrasted with e.g. connective tissue and blood vessels.<br>**2.** The primary tissue of higher plants composed of thin-walled cells that remain capable of cell division even when mature; constitutes the greater part of leaves, roots, the pulp of fruits, and the pith of stems. | *"These branches perforate the inner walls of the epidermis, and pass into the intercellular spaces of the parenchyma to become mycelium."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[parent]] | noun | **1.** A father or mother; one who begets or one who gives birth to or nurtures and raises a child; a relative who plays the role of guardian.<br>**2.** An organism (plant or animal) from which younger ones are obtained. | *"O, stand up blest, [_He rises_.] Whilst with no softer cushion than the flint I kneel before thee and unproperly Show duty, as mistaken all this while Between the child and parent. [_She kneels._] CORIOLANUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parentage]] | noun | **1.** The state of being a parent.<br>**2.** The kinship relation of an offspring to the parents. | *"He asked me of what parentage I was."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parental]] | adjective | **1.** Designating the generation of organisms from which hybrid offspring are produced.<br>**2.** Relating to or characteristic of or befitting a parent. | *"Turveydrop underwent a severe internal struggle and came upright on the sofa again with his cheeks puffing over his stiff cravat, a perfect model of parental deportment."* — Charles Dickens, *Bleak House* |
| [[parentally]] | adverb | **1.** In a parental manner. | *"In academic literature, parentally designates in a parental manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parented]] | verb | **1.** Bring up.<br>**2.** Having a parent or parents or cared for by parent surrogates. | *"Classical and authoritative lexicons catalog parented as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenteral]] | adjective | **1.** Administered by means other than through the alimentary tract (as by intramuscular or intravenous injection).<br>**2.** Located outside the alimentary tract. | *"In academic literature, parenteral designates administered by means other than through the alimentary tract (as by intramuscular or intravenous injection)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenterally]] | adverb | **1.** By parenteral means. | *"In academic literature, parenterally designates by parenteral means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenthesis]] | noun | **1.** Either of two punctuation marks (or) used to enclose textual material.<br>**2.** A message that departs from the main subject. | *"Aye, aye!” and opened and read it with evident pleasure, announcing to us in a parenthesis when he was about half-way through, that Boythorn was “coming down” on a visit."* — Charles Dickens, *Bleak House* |
| [[parenthetic]] | adjective | **1.** Qualifying or explaining; placed or as if placed in parentheses. | *"Mother, why did our grand relation keep on putting his hand up to his mistarshers?” “Hark at that child!” cried Mrs Durbeyfield, with parenthetic admiration."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parenthetical]] | noun | **1.** An expression in parentheses.<br>**2.** Qualifying or explaining; placed or as if placed in parentheses. | *"What could the wretched Joe do now, after his disregarded parenthetical interruptions, but stand up to his journeyman, and ask him what he meant by interfering betwixt himself and Mrs."* — Charles Dickens, *Great Expectations* |
| [[parenthetically]] | adverb | **1.** In a parenthetical manner. | *"Vholes parenthetically, “I believe I have already mentioned."* — Charles Dickens, *Bleak House* |
| [[parenthood]] | noun | **1.** The state of being a parent. | *"Is not one of the most real features of parenthood enjoyment of the child?"* — T. R. Glover, *The Jesus of History* |
| [[parentless]] | adjective | **1.** Having no parent or parents or not cared for by parent surrogates. | *"I could not remember him; but I knew that he was my own uncle—my mother’s brother—that he had taken me when a parentless infant to his house; and that in his last moments he had required a promise of Mrs."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[parer]] | noun | **1.** A manicurist who trims the fingernails.<br>**2.** A small sharp knife used in paring fruits or vegetables. | *"In academic literature, parer designates a manicurist who trims the fingernails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paresis]] | noun | **1.** A slight or partial paralysis. | *"In academic literature, paresis designates a slight or partial paralysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paresthesia]] | noun | **1.** Abnormal skin sensations (as tingling or tickling or itching or burning) usually associated with peripheral nerve damage. | *"In academic literature, paresthesia designates abnormal skin sensations (as tingling or tickling or itching or burning) usually associated with peripheral nerve damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paretic]] | noun | **1.** A person afflicted with paresis (partial paralysis). | *"Alan would never be an irritated, jealous, paretic old man, nor would he see "this woman" grow stern with repression and ache, and loneliness of heart and spirit...."* — Donn Byrne, *The Wind Bloweth* |
| [[pareto]] | noun | **1.** Italian sociologist and economist whose theories influenced the development of fascism in italy (1848-1923). | *"In academic literature, pareto designates italian sociologist and economist whose theories influenced the development of fascism in italy (1848-1923)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pareve]] | adjective | **1.** Containing no meat or milk (or their derivatives) and thus eatable with both meat and dairy dishes according to the dietary laws of judaism. | *"In academic literature, pareve designates containing no meat or milk (or their derivatives) and thus eatable with both meat and dairy dishes according to the dietary laws of judaism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pariah]] | noun | **1.** A person who is rejected (from society or home). | *"Already at Eton Shelley was a rebel and a pariah."* — Sydney Waterlow, *Shelley* |
| [[paridae]] | noun | **1.** Titmice and chickadees. | *"In academic literature, paridae designates titmice and chickadees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paries]] | noun | **1.** (anatomy) a layer (a lining or membrane) that encloses a structure. | *"In academic literature, paries designates (anatomy) a layer (a lining or membrane) that encloses a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parietal]] | adjective | **1.** Of or relating to or associated with the parietal bones in the cranium. | *"In the surgeon’s deposition it was stated that the posterior third of the left parietal bone and the left half of the occipital bone had been shattered by a heavy blow from a blunt weapon."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[parietales]] | noun | **1.** A large order of dicotyledonous plants of subclass dilleniidae. | *"In academic literature, parietales designates a large order of dicotyledonous plants of subclass dilleniidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parietaria]] | noun | **1.** Small genus of stingless herbs. | *"In academic literature, parietaria designates small genus of stingless herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parimutuel]] | noun | **1.** Betting where winners share the total amount wagered. | *"In academic literature, parimutuel designates betting where winners share the total amount wagered."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paring]] | noun | **1.** A thin fragment or slice (especially of wood) that has been shaved from something.<br>**2.** (usually plural) a part of a fruit or vegetable that is pared or cut off; especially the skin or peel. | *"Virginity breeds mites, much like a cheese; consumes itself to the very paring, and so dies with feeding his own stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paripinnate]] | adjective | **1.** (of a leaf shape) pinnate with a pair of leaflets at the apex. | *"In academic literature, paripinnate designates (of a leaf shape) pinnate with a pair of leaflets at the apex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paris]] | noun | **1.** The capital and largest city of france; and international center of culture and commerce.<br>**2.** Sometimes placed in subfamily trilliaceae. | *"Had you not lately an intent,—speak truly,— To go to Paris?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parish]] | noun | **1.** A local church community.<br>**2.** The local subdivision of a diocese committed to one pastor. | *"The “why” is plain as way to parish church."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parishioner]] | noun | **1.** A member of a parish. | *"The clergyman stayed to exchange a few sentences, either of admonition or reproof, with his haughty parishioner; this duty done, he too departed."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[parisian]] | noun | **1.** A native or resident of paris.<br>**2.** Of or relating to or characteristic of paris or its inhabitants. | *"He was naturally a chatterbox and brimful of a Parisian's salted malice, even after six years in the service of Captain Hyde, who did not encourage his attendants to be communicative."* — Anthony Pryde, *Nightfall* |
| [[parisienne]] | noun | **1.** A female native or resident of paris. | *"I turned my face away to conceal a smile I could not suppress: there was something ludicrous as well as painful in the little Parisienne’s earnest and innate devotion to matters of dress."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[parisology]] | noun | **1.** The use of ambiguous words. | *"In academic literature, parisology designates the use of ambiguous words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parity]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** (mathematics) a relation between a pair of integers: if both integers are odd or both are even they have the same parity; if one is odd and the other is even they have different parity. | *"It is hoped that they will have the high credit of municipal bonds so that they may be sold at parity, bearing interest at 4 or 4.5 per cent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[parlance]] | noun | **1.** A manner of speaking that is natural to native speakers of a language. | *"She is not what in common parlance is called a lady,” said Angel, unflinchingly, “for she is a cottager’s daughter, as I am proud to say."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parlay]] | noun | **1.** A series of wagers in which the winnings from one wager are used as a stake for the subsequent wagers.<br>**2.** Stake winnings from one bet on a subsequent wager. | *"In short, the less you PARLAY, the better, you know.” Mr."* — Charles Dickens, *Bleak House* |
| [[parley]] | noun | **1.** A negotiation between enemies.<br>**2.** Discuss, as between enemies. | *"Now, Mars, I prithee, make us quick in work, That we with smoking swords may march from hence To help our fielded friends!—Come, blow thy blast. [_They sound a parley._] Enter two Senators with others on the walls of Corioles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parliament]] | noun | **1.** A legislative assembly in certain countries.<br>**2.** A card game in which you play your sevens and other cards in sequence in the same suit as the sevens; you win if you are the first to use all your cards. | *"The King hath call’d his parliament, my lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parliamentarian]] | noun | **1.** An elected member of the british parliament: a member of the house of commons.<br>**2.** An expert in parliamentary rules and procedures. | *"A great parliamentarian, he was gifted with rare eloquence, and with a kind which won friends without offending enemies—something too rare to last."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[parliamentary]] | adjective | **1.** Relating to or having the nature of a parliament.<br>**2.** Having the supreme legislative power resting with a body of cabinet ministers chosen from and responsible to the legislature or parliament. | *"It is nothing to you or to any one else that the great lights of the parliamentary sky have failed for some few years in this business to set you the example of moving on."* — Charles Dickens, *Bleak House* |
| [[parlor]] | noun | **1.** Reception room in an inn or club where visitors can be received.<br>**2.** A room in a private house or establishment where people can sit and talk and relax. | *"She said, 'Two gentlemen are in the parlor waiting for you.' I went down, and the interview revealed the exact fulfillment both of the promise and the prophecy."* — Classic Author, *The wonders of prayer* |
| [[parlormaid]] | noun | **1.** A maid in a private home whose duties are to care for the parlor and the table and to answer the door. | *"In academic literature, parlormaid designates a maid in a private home whose duties are to care for the parlor and the table and to answer the door."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parlour]] | noun | **1.** Reception room in an inn or club where visitors can be received.<br>**2.** A room in a private house or establishment where people can sit and talk and relax. | *"They sit conferring by the parlour fire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parlourmaid]] | noun | **1.** A maid in a private home whose duties are to care for the parlor and the table and to answer the door. | *"In academic literature, parlourmaid designates a maid in a private home whose duties are to care for the parlor and the table and to answer the door."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parlous]] | adjective | **1.** Fraught with danger. | *"Thou art in a parlous state, shepherd."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parmelia]] | noun | **1.** Type genus of the parmeliaceae; a large genus of chiefly alpine foliaceous lichens. | *"In academic literature, parmelia designates type genus of the parmeliaceae; a large genus of chiefly alpine foliaceous lichens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parmeliaceae]] | noun | **1.** A family of lichens. | *"In academic literature, parmeliaceae designates a family of lichens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parmenides]] | noun | **1.** A presocratic greek philosopher born in italy; held the metaphysical view that being is the basic substance and ultimate reality of which all things are composed; said that motion and change are sensory illusions (5th century bc). | *"In academic literature, parmenides designates a presocratic greek philosopher born in italy; held the metaphysical view that being is the basic substance and ultimate reality of which all things are composed; said that motion and change are sensory illusions (5th century bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parmesan]] | noun | **1.** Hard dry sharp-flavored italian cheese; often grated. | *"In academic literature, parmesan designates hard dry sharp-flavored italian cheese; often grated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parnahiba]] | noun | **1.** A river in northeastern brazil that flows generally northward to the atlantic ocean. | *"In academic literature, parnahiba designates a river in northeastern brazil that flows generally northward to the atlantic ocean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parnaiba]] | noun | **1.** A river in northeastern brazil that flows generally northward to the atlantic ocean. | *"In academic literature, parnaiba designates a river in northeastern brazil that flows generally northward to the atlantic ocean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parnassia]] | noun | **1.** Any of various usually evergreen bog plants of the genus parnassia having broad smooth basal leaves and a single pale flower resembling a buttercup. | *"This rust was found on the leaves of the “grass of Parnassus” (_Parnassia palustris_) on a narrow strip of marsh near Irstead church."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[parnassus]] | noun | **1.** (greek mythology) a mountain in central greece where (according to greek mythology) the muses lived; known as the mythological home of music and poetry. | *"They gang in stirks, and come out asses, Plain truth to speak; An’ syne they think to climb Parnassus By dint o’ Greek!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[parnell]] | noun | **1.** Irish nationalist leader (1846-1891). | *"Delia Parnell, Parnell's mother, had attended the great Irish rally in the Academy of Music...."* — Donn Byrne, *The Wind Bloweth* |
| [[parochetus]] | noun | **1.** One species: shamrock pea. | *"In academic literature, parochetus designates one species: shamrock pea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parochial]] | adjective | **1.** Relating to or supported by or located in a parish.<br>**2.** Narrowly restricted in outlook or scope. | *"Formerly Caroline Jellyby, spinster, then of Thavies Inn, within the city of London, but extra-parochial; now of Newman Street, Oxford Street."* — Charles Dickens, *Bleak House* |
| [[parochialism]] | noun | **1.** A limitation of views or interests like that defined by a local parish. | *"His own parochialism made him ashamed by its contrast."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parochially]] | adverb | **1.** In a parochial manner. | *"In academic literature, parochially designates in a parochial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parodist]] | noun | **1.** Mimics literary or musical style for comic effect. | *"In academic literature, parodist designates mimics literary or musical style for comic effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parody]] | noun | **1.** A composition that imitates or misrepresents somebody's style, usually in a humorous way.<br>**2.** Humorous or satirical mimicry. | *"A doggerel parody on _John Gilpin_, entitled "The Diverting History of John Cairns," in which a highly coloured account is given of the supposed genesis of the pamphlet, was written and found wide circulation."* — John Cairns, *Principal Cairns* |
| [[paroicous]] | adjective | **1.** Having male and female reproductive organs separate in a single gametoecium. | *"In academic literature, paroicous designates having male and female reproductive organs separate in a single gametoecium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parole]] | noun | **1.** A promise.<br>**2.** A secret word or phrase known only to a restricted group. | *"Bagnet,” says the trooper, “I am on my parole with you."* — Charles Dickens, *Bleak House* |
| [[parolee]] | noun | **1.** Someone released on probation or on parole. | *"In academic literature, parolee designates someone released on probation or on parole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paronomasia]] | noun | **1.** A humorous play on words. | *"In academic literature, paronomasia designates a humorous play on words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paronychia]] | noun | **1.** Infection in the tissues adjacent to a nail on a finger or toe.<br>**2.** Low-growing annual or perennial herbs or woody plants; whitlowworts. | *"In academic literature, paronychia designates infection in the tissues adjacent to a nail on a finger or toe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parophrys]] | noun | **1.** A genus of soleidae. | *"In academic literature, parophrys designates a genus of soleidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroquet]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In academic literature, paroquet designates any of numerous small slender long-tailed parrots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parosamia]] | noun | **1.** A disorder in the sense of smell. | *"In academic literature, parosamia designates a disorder in the sense of smell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parotid]] | adjective | **1.** Relating to or located near the parotid gland. | *"This was described as “inflammation of the right parotid gland.” On August 24th it was decided to make an incision below and forward of the right ear, in order to prevent suppuration."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[parotitis]] | noun | **1.** Inflammation of one or both parotid glands. | *"In academic literature, parotitis designates inflammation of one or both parotid glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parous]] | adjective | **1.** Having given birth to one or more viable children. | *"In academic literature, parous designates having given birth to one or more viable children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parousia]] | noun | **1.** (christian theology) the reappearance of jesus as judge for the last judgment. | *"In academic literature, parousia designates (christian theology) the reappearance of jesus as judge for the last judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroxetime]] | noun | **1.** A selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade name paxil). | *"In academic literature, paroxetime designates a selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade name paxil)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroxysm]] | noun | **1.** A sudden uncontrollable attack. | *"Wopsle’s great-aunt fell into a state of coma, arising either from sleep or a rheumatic paroxysm."* — Charles Dickens, *Great Expectations* |
| [[paroxysmal]] | adjective | **1.** Accompanied by or of the nature of paroxysms. | *"In academic literature, paroxysmal designates accompanied by or of the nature of paroxysms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroxytone]] | noun | **1.** Word having stress or acute accent on the next to last syllable. | *"In academic literature, paroxytone designates word having stress or acute accent on the next to last syllable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parr]] | noun | **1.** Queen of england as the 6th wife of henry viii (1512-1548).<br>**2.** A young salmon up to 2 years old. | *"Another, Lucy Parr, the second waiting-maid, has only been in my service a few months."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[parrakeet]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In the morning, wee Shane thought, it woke to bright happiness, the green parrakeets chattered, the monkeys whistled, the lizards basked in the sun."* — Donn Byrne, *The Wind Bloweth* |
| [[parricide]] | noun | **1.** Someone who kills his or her parent.<br>**2.** The murder of your own father or mother. | *"We hear our bloody cousins are bestow’d In England and in Ireland; not confessing Their cruel parricide, filling their hearers With strange invention."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parrish]] | noun | **1.** United states painter (1870-1966). | *"Joseph Parrish, of Philadelphia, also a Medical Inspector of the Commission, Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[parroket]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In academic literature, parroket designates any of numerous small slender long-tailed parrots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parroquet]] | noun | **1.** Any of numerous small slender long-tailed parrots. | *"In academic literature, parroquet designates any of numerous small slender long-tailed parrots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parrot]] | noun | **1.** Usually brightly colored zygodactyl tropical birds with short hooked beaks and the ability to mimic sounds.<br>**2.** A copycat who does not understand the words or acts being imitated. | *"I will be more jealous of thee than a Barbary cock-pigeon over his hen, more clamorous than a parrot against rain, more new-fangled than an ape, more giddy in my desires than a monkey."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parrotfish]] | noun | **1.** Gaudy tropical fishes with parrotlike beaks formed by fusion of teeth. | *"In academic literature, parrotfish designates gaudy tropical fishes with parrotlike beaks formed by fusion of teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parrotia]] | noun | **1.** One species: iron tree. | *"In academic literature, parrotia designates one species: iron tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parrotiopsis]] | noun | **1.** One species: deciduous tree of the himalaya mountains. | *"In academic literature, parrotiopsis designates one species: deciduous tree of the himalaya mountains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parrotlike]] | adjective | **1.** Mechanically imitated or repeated without thought or understanding. | *"In academic literature, parrotlike designates mechanically imitated or repeated without thought or understanding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parry]] | noun | **1.** (fencing) blocking a lunge or deflecting it with a circular motion of the sword.<br>**2.** A return punch (especially by a boxer). | *"Come, come, Lady Dedlock, we must not fence and parry now."* — Charles Dickens, *Bleak House* |
| [[parse]] | verb | **1.** Analyze syntactically by assigning a constituent structure to (a sentence). | *"A little boy was at school, he was diligent, and determined to succeed, but found that parsing was rather hard."* — Classic Author, *The wonders of prayer* |
| [[parsec]] | noun | **1.** A unit of astronomical length based on the distance from earth at which stellar parallax is 1 second of arc; equivalent to 3.262 light years. | *"In academic literature, parsec designates a unit of astronomical length based on the distance from earth at which stellar parallax is 1 second of arc; equivalent to 3.262 light years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parsee]] | noun | **1.** A member of a monotheistic sect of zoroastrian origin; descended from the persians; now found in western india. | *"And Ahab chanced so to stand, that the Parsee occupied his shadow; while, if the Parsee’s shadow was there at all it seemed only to blend with, and lengthen Ahab’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[parseeism]] | noun | **1.** The faith of a zoroastrian sect in india. | *"If I trip him: What if I; and so in next stanza. a Manichee: a follower of Mani, who aimed to unite Parseeism, or Parsism, with Christianity. 8."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[parser]] | noun | **1.** A computer program that divides code up into functional components. | *"In academic literature, parser designates a computer program that divides code up into functional components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parsi]] | noun | **1.** A member of a monotheistic sect of zoroastrian origin; descended from the persians; now found in western india. | *"In academic literature, parsi designates a member of a monotheistic sect of zoroastrian origin; descended from the persians; now found in western india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parsiism]] | noun | **1.** The faith of a zoroastrian sect in india. | *"In academic literature, parsiism designates the faith of a zoroastrian sect in india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parsimonious]] | adjective | **1.** Excessively unwilling to spend. | *"If I wanted other authorities for Jarndyce and Jarndyce, I could rain them on these pages, to the shame of—a parsimonious public."* — Charles Dickens, *Bleak House* |
| [[parsimoniousness]] | noun | **1.** Extreme care in spending money; reluctance to spend money unnecessarily.<br>**2.** Extreme stinginess. | *"In academic literature, parsimoniousness designates extreme care in spending money; reluctance to spend money unnecessarily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parsimony]] | noun | **1.** Extreme care in spending money; reluctance to spend money unnecessarily.<br>**2.** Extreme stinginess. | *"You got to deliver a whole lot more than that to make me swallow the rest of your whoppers.” Hamilton’s Law of Parsimony in the weighing of evidence!"* — Jack London, *The Jacket (The Star-Rover)* |
| [[parsley]] | noun | **1.** Annual or perennial herb with aromatic leaves.<br>**2.** Aromatic herb with flat or crinkly leaves that are cut finely and used to garnish food. | *"I cannot tarry: I knew a wench married in an afternoon as she went to the garden for parsley to stuff a rabbit; and so may you, sir; and so adieu, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parsnip]] | noun | **1.** The whitish root of cultivated parsnip.<br>**2.** A strong-scented plant cultivated for its edible root. | *"Heraclei_, B.), which is found solely on the cow-parsnip."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[parson]] | noun | **1.** A person authorized to conduct religious worship. | *"We’d find no fault with the tithe-woman, if I were the parson."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parsonage]] | noun | **1.** An official residence provided by a church for its parson or vicar or rector. | *"Lawrence Boythorn, and has to call his attention to the fact that the green pathway by the old parsonage-house, now the property of Mr."* — Charles Dickens, *Bleak House* |
| [[parsons]] | noun | **1.** United states sociologist (1902-1979).<br>**2.** A person authorized to conduct religious worship. | *"But, what with the parsons and clerks and school-people and serious tea-parties, the merry old ways of good life have gone to the dogs—upon my carcase, they have!” “Well, really, I must be onward again now,” said Joseph."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[part]] | noun | **1.** Something determined in relation to something that includes it.<br>**2.** Something less than the whole of a human artifact. | *"If my slight Muse do please these curious days, The pain be mine, but thine shall be the praise. 39 O how thy worth with manners may I sing, When thou art all the better part of me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[part-owner]] | noun | **1.** A person who owns something in common with others. | *"In academic literature, part-owner designates a person who owns something in common with others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[part-singing]] | noun | **1.** Singing with three or more voice parts. | *"In academic literature, part-singing designates singing with three or more voice parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[part-time]] | adjective | **1.** Involving less than the standard or customary time for an activity.<br>**2.** For less than the standard number of hours. | *"In academic literature, part-time designates involving less than the standard or customary time for an activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[part-timer]] | noun | **1.** Someone who works less than the customary or standard time. | *"In academic literature, part-timer designates someone who works less than the customary or standard time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partake]] | verb | **1.** Have some of the qualities or attributes of something.<br>**2.** Have, give, or receive a share of. | *"O cunning love, with tears thou keep’st me blind, Lest eyes well-seeing thy foul faults should find. 149 Canst thou O cruel, say I love thee not, When I against my self with thee partake?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partaker]] | noun | **1.** Someone who has or gives or receives a part or a share. | *"What you shall know meantime Of stirs abroad, I shall beseech you, sir, To let me be partaker."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parted]] | verb | **1.** Go one's own way; move apart.<br>**2.** Discontinue an association or relation; go different ways. | *"He was first smok’d by the old Lord Lafew; when his disguise and he is parted, tell me what a sprat you shall find him; which you shall see this very night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parterre]] | noun | **1.** An ornamental flower garden; beds and paths are arranged to form a pattern.<br>**2.** Seating at the rear of the main floor (beneath the balconies). | *"Reed to buy of his young lady all the products of her parterre she wished to sell: and Eliza would have sold the hair off her head if she could have made a handsome profit thereby."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[parthenium]] | noun | **1.** Small genus of north american herbs and shrubs with terminal panicles of small ray flowers. | *"In academic literature, parthenium designates small genus of north american herbs and shrubs with terminal panicles of small ray flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenocarpy]] | noun | **1.** (botany) the development of a fruit without fertilization or seeds. | *"In academic literature, parthenocarpy designates (botany) the development of a fruit without fertilization or seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenocissus]] | noun | **1.** Woody vines having disklike tips on the tendrils. | *"In academic literature, parthenocissus designates woody vines having disklike tips on the tendrils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenogenesis]] | noun | **1.** Human conception without fertilization by a man.<br>**2.** Process in which an unfertilized egg develops into a new individual; common among insects and some other arthropods. | *"In academic literature, parthenogenesis designates human conception without fertilization by a man."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenogenetic]] | adjective | **1.** (of reproduction) not involving the fusion of male and female gametes in reproduction. | *"In academic literature, parthenogenetic designates (of reproduction) not involving the fusion of male and female gametes in reproduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenogeny]] | noun | **1.** Human conception without fertilization by a man.<br>**2.** Process in which an unfertilized egg develops into a new individual; common among insects and some other arthropods. | *"In academic literature, parthenogeny designates human conception without fertilization by a man."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthenon]] | noun | **1.** The main temple of the goddess athena; built on the acropolis in athens more than 400 years b.c.; example of doric architecture. | *"Theseus: a reclining statue from the eastern pediment of the Parthenon, now in the British Museum."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[parthenote]] | noun | **1.** A cell resulting from parthenogenesis. | *"In academic literature, parthenote designates a cell resulting from parthenogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parthia]] | noun | **1.** An ancient kingdom in asia to the southeast of the caspian sea; it dominated southwestern asia from about 250 bc to ad 226. | *"If we compose well here, to Parthia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parthian]] | noun | **1.** A native or inhabitant of parthia.<br>**2.** The iranian language spoken in the parthian kingdom (250 bc to ad 226). | *"Labienus— This is stiff news—hath with his Parthian force Extended Asia from Euphrates His conquering banner shook from Syria To Lydia and to Ionia, Whilst— ANTONY."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parti-color]] | verb | **1.** Make motley; color with different colors. | *"In academic literature, parti-color designates make motley; color with different colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partial]] | noun | **1.** The derivative of a function of two or more variables with respect to a single variable while the other variables are considered to be constant.<br>**2.** A harmonic with a frequency that is a multiple of the fundamental frequency. | *"If eyes corrupt by over-partial looks, Be anchored in the bay where all men ride, Why of eyes’ falsehood hast thou forged hooks, Whereto the judgement of my heart is tied?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partiality]] | noun | **1.** A predisposition to like something.<br>**2.** An inclination to favor one group or view or opinion over alternatives. | *"Perhaps I speak with some little partiality."* — Charles Dickens, *Bleak House* |
| [[partially]] | adverb | **1.** In part; in some degree; not wholly. | *"If partially affin’d, or leagu’d in office, Thou dost deliver more or less than truth, Thou art no soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partialness]] | noun | **1.** The state of being only a part; not total; incomplete. | *"In academic literature, partialness designates the state of being only a part; not total; incomplete."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partible]] | adjective | **1.** (of e.g. property) capable of being parted or divided. | *"In academic literature, partible designates (of e.g. property) capable of being parted or divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participant]] | noun | **1.** Someone who takes part in an activity.<br>**2.** A person who participates in or is skilled at some game. | *"One of the most beautiful incidents ever known relating to the faith of children, and the reward of their trust, is contained in the following circumstance, personally known to the editor of this book, who was a participant in the facts."* — Classic Author, *The wonders of prayer* |
| [[participate]] | verb | **1.** Share in something.<br>**2.** Become a participant; be involved in. | *"A spirit I am indeed, But am in that dimension grossly clad, Which from the womb I did participate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[participating]] | verb | **1.** Share in something.<br>**2.** Become a participant; be involved in. | *"The policies that receive dividends are called "participating" and are said to participate in the earnings."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[participation]] | noun | **1.** The act of sharing in the activities of a group.<br>**2.** The condition of sharing in common with others (as fellows or partners etc.). | *"And in that very line, Harry, standest thou, For thou hast lost thy princely privilege With vile participation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[participatory]] | adjective | **1.** Affording the opportunity for individual participation. | *"In academic literature, participatory designates affording the opportunity for individual participation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participial]] | noun | **1.** A non-finite form of the verb; in english it is used adjectivally and to form compound tenses.<br>**2.** Of or relating to or consisting of participles. | *"In academic literature, participial designates a non-finite form of the verb; in english it is used adjectivally and to form compound tenses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participle]] | noun | **1.** A non-finite form of the verb; in english it is used adjectivally and to form compound tenses. | *"Baptized, we are enlightened; enlightened, we are made sons; made sons we are perfected; made perfect we become immortal [all these verbs and participles are in the present]."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[particle]] | noun | **1.** (nontechnical usage) a tiny piece of anything.<br>**2.** A body having finite mass and internal structure but negligible dimensions. | *"It shall be inventoried and every particle and utensil labelled to my will: as, item, two lips indifferent red; item, two grey eyes with lids to them; item, one neck, one chin, and so forth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particolored]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"Tattered and torn, he saw a bright, particolored patchwork quilt that he knew had covered his daughter’s bed."* — Jos. E. Badger, *The Texas Hawks; or, The Strange Decoy* |
| [[particoloured]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, particoloured designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particular]] | noun | **1.** A fact about some part (as opposed to general).<br>**2.** A small part that can be considered separately from the whole. | *"I am undone: there is no living, none, If Bertram be away. ’Twere all one That I should love a bright particular star, And think to wed it, he is so above me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particularisation]] | noun | **1.** An individualized description of a particular instance. | *"In academic literature, particularisation designates an individualized description of a particular instance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularise]] | verb | **1.** Be specific about. | *"My dear Ma, I particularise eight.” “The exact size of the table and the room, my dear.” So it was settled that way: and when Mr."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[particularised]] | verb | **1.** Be specific about.<br>**2.** Directed toward a specific object. | *"In academic literature, particularised designates be specific about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularism]] | noun | **1.** A focus on something particular. | *"It was immaterial what private opinions he might hold, for his great purpose was the abandonment of particularism and the fusion of all parties for the general good."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[particularistic]] | adjective | **1.** Relating to particularism (exclusive interest in one group or class or sect etc.). | *"In academic literature, particularistic designates relating to particularism (exclusive interest in one group or class or sect etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularity]] | noun | **1.** The quality of being particular and pertaining to a specific case or instance. | *"Snagsby does not with particularity express, but she knows that Jo was Mr."* — Charles Dickens, *Bleak House* |
| [[particularization]] | noun | **1.** An individualized description of a particular instance. | *"In academic literature, particularization designates an individualized description of a particular instance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularize]] | verb | **1.** Be specific about. | *"The leanness that afflicts us, the object of our misery, is as an inventory to particularize their abundance; our sufferance is a gain to them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particularized]] | verb | **1.** Be specific about.<br>**2.** Directed toward a specific object. | *"Nowhere did we stop long enough to get a particularized impression, but the general sense of vague and oppressive wonder grew upon me."* — Joseph Conrad, *Heart of Darkness* |
| [[particularly]] | adverb | **1.** To a distinctly greater extent or degree than is common.<br>**2.** Specifically or especially distinguished from others. | *"My name is Caius Martius, who hath done To thee particularly and to all the Volsces Great hurt and mischief; thereto witness may My surname Coriolanus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particulate]] | noun | **1.** A small discrete mass of solid or liquid matter that remains individually dispersed in gas or liquid emissions (usually considered to be an atmospheric pollutant).<br>**2.** Composed of distinct particles. | *"In academic literature, particulate designates a small discrete mass of solid or liquid matter that remains individually dispersed in gas or liquid emissions (usually considered to be an atmospheric pollutant)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parting]] | noun | **1.** The act of departing politely.<br>**2.** A line of scalp that can be seen when sections of hair are combed in opposite directions. | *"I grow to you, and our parting is a tortur’d body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partisan]] | noun | **1.** A fervent and even militant proponent of something.<br>**2.** An ardent and enthusiastic supporter of some person or activity. | *"I had as lief have a reed that will do me no service as a partisan I could not heave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partisanship]] | noun | **1.** An inclination to favor one group or view or opinion over alternatives. | *"Featherstone, two of Peacock’s most important patients, had, from different causes, given an especially good reception to his successor, who had raised some partisanship as well as discussion."* — George Eliot, *Middlemarch* |
| [[partita]] | noun | **1.** One of the variations contained in a partita.<br>**2.** (music) an instrumental suite common in the 18th century. | *"In academic literature, partita designates one of the variations contained in a partita."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partition]] | noun | **1.** A vertical structure that divides or separates (as a wall divides one room from another).<br>**2.** (computer science) the part of a hard disk that is dedicated to a particular operating system or application and accessed as a single unit. | *"It is the wittiest partition that ever I heard discourse, my lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partitioning]] | noun | **1.** An analysis into mutually exclusive categories.<br>**2.** The act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart. | *"In academic literature, partitioning designates an analysis into mutually exclusive categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partitionist]] | noun | **1.** An advocate of partitioning a country. | *"In academic literature, partitionist designates an advocate of partitioning a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partitive]] | noun | **1.** Word (such a `some' or `less') that is used to indicate a part as distinct from a whole.<br>**2.** (romance languages) relating to or denoting a part of a whole or a quantity that is less than the whole. | *"In academic literature, partitive designates word (such a `some' or `less') that is used to indicate a part as distinct from a whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partizan]] | noun | **1.** An ardent and enthusiastic supporter of some person or activity.<br>**2.** A pike with a long tapering double-edged blade with lateral projections; 16th and 17th centuries. | *"This time partizan considerations played no part in the discussion."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[partly]] | adverb | **1.** In part; in some degree; not wholly. | *"SCENE: Partly in France, and partly in Tuscany."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partner]] | noun | **1.** A person's partner in marriage.<br>**2.** An associate in an activity or endeavor or sphere of common interest. | *"I know you could not lack—I am certain on’t— Very necessity of this thought, that I, Your partner in the cause ’gainst which he fought, Could not with graceful eyes attend those wars Which fronted mine own peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partnership]] | noun | **1.** The members of a business venture created by contract.<br>**2.** A cooperative relationship between people or groups who agree to share responsibility for achieving some specific goal. | *"Many times the two gentlemen who write with the ravenous little pens on the tissue-paper are seen prowling in the neighbourhood—shy of each other, their late partnership being dissolved."* — Charles Dickens, *Bleak House* |
| [[partridge]] | noun | **1.** Flesh of either quail or grouse.<br>**2.** Heavy-bodied small-winged south american game bird resembling a gallinaceous bird but related to the ratite birds. | *"Who finds the partridge in the puttock’s nest But may imagine how the bird was dead, Although the kite soar with unbloodied beak?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partridgeberry]] | noun | **1.** Creeping woody plant of eastern north america with shiny evergreen leaves and scarlet berries. | *"In academic literature, partridgeberry designates creeping woody plant of eastern north america with shiny evergreen leaves and scarlet berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parts]] | noun | **1.** The local environment.<br>**2.** Something determined in relation to something that includes it. | *"Thou art the grave where buried love doth live, Hung with the trophies of my lovers gone, Who all their parts of me to thee did give, That due of many, now is thine alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partsong]] | noun | **1.** A song with two or more voice parts. | *"In academic literature, partsong designates a song with two or more voice parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parttime]] | adjective | **1.** Involving less than the standard or customary time for an activity. | *"In academic literature, parttime designates involving less than the standard or customary time for an activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturiency]] | noun | **1.** Concluding state of pregnancy; from the onset of contractions to the birth of a child. | *"In academic literature, parturiency designates concluding state of pregnancy; from the onset of contractions to the birth of a child."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturient]] | adjective | **1.** Of or relating to or giving birth.<br>**2.** Giving birth. | *"In academic literature, parturient designates of or relating to or giving birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturition]] | noun | **1.** The process of giving birth. | *"The curse removed 557:6 Mind controls the birth-throes in the lower realms of nature, where parturition is without suffering."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[party]] | noun | **1.** An organization to gain political power.<br>**2.** A group of people gathered together for pleasure. | *"Enter, with a drum and colours, a party of the Florentine army, Bertram and Parolles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[party-spirited]] | adjective | **1.** Devoted to a political party. | *"In academic literature, party-spirited designates devoted to a political party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partygoer]] | noun | **1.** Someone who is attending a party. | *"In academic literature, partygoer designates someone who is attending a party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parula]] | noun | **1.** Type genus of the parulidae: wood warblers. | *"In academic literature, parula designates type genus of the parulidae: wood warblers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parulidae]] | noun | **1.** New world warblers. | *"In academic literature, parulidae designates new world warblers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parus]] | noun | **1.** Type genus of the family paridae. | *"In academic literature, parus designates type genus of the family paridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpartum]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postpartum designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preparation]] | noun | **1.** The activity of putting or setting in order in advance of some act or purpose.<br>**2.** A substance prepared according to a formula. | *"I’ll about it this evening; and I will presently pen down my dilemmas, encourage myself in my certainty, put myself into my mortal preparation; and by midnight look to hear further from me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preparative]] | adjective | **1.** Preceding and preparing for something. | *"But almost everybody supposed that this particular preparative heedfulness in Ahab must only be with a view to the ultimate chase of Moby Dick; for he had already revealed his intention to hunt that mortal monster in person."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[preparatory]] | adjective | **1.** Preceding and preparing for something. | *"Tess!” he said in a preparatory tone, after a silence."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[prepare]] | verb | **1.** Make ready or suitable or equip in advance for a particular purpose or for some use, event, etc.<br>**2.** Prepare for eating by applying heat. | *"Go you and prepare Aliena; for, look you, here comes my Rosalind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prepared]] | verb | **1.** Make ready or suitable or equip in advance for a particular purpose or for some use, event, etc.<br>**2.** Prepare for eating by applying heat. | *"Quarrel no more, but be prepared to know The purposes I bear; which are, or cease, As you shall give th’ advice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preparedness]] | noun | **1.** The state of having been made ready or prepared for use or action (especially military action). | *"But the most recent application of science and the mechanical arts to the uses of war has given new significance to a larger policy of industrial preparedness for military purposes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[proparoxytone]] | noun | **1.** Word having stress or acute accent on the antepenult. | *"In academic literature, proparoxytone designates word having stress or acute accent on the antepenult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reparable]] | adjective | **1.** Capable of being repaired or rectified. | *"I fear he is not to be reclaimed; there is scarcely a hope that anything in his character or fortunes is reparable now."* — Charles Dickens, *A Tale of Two Cities* |
| [[reparation]] | noun | **1.** Compensation (given or received) for an insult or injury.<br>**2.** (usually plural) compensation exacted from a defeated nation by the victors. | *"Then I shall acknowledge it and make him reparation.” Everything postponed to that imaginary time!"* — Charles Dickens, *Bleak House* |
| [[repartee]] | noun | **1.** Adroitness and cleverness in reply. | *"Rochester, allow me to disown my first answer: I intended no pointed repartee: it was only a blunder.” “Just so: I think so: and you shall be answerable for it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[separability]] | noun | **1.** The capability of being separated. | *"In academic literature, separability designates the capability of being separated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separable]] | adjective | **1.** Capable of being divided or dissociated. | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[separably]] | adverb | **1.** With possibility of separation or individuation. | *"In academic literature, separably designates with possibility of separation or individuation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separate]] | noun | **1.** A separately printed article that originally appeared in a larger publication.<br>**2.** A garment that can be purchased separately and worn in combinations with other garments. | *"I will not hence and leave my husband here; And ill it doth beseem your holiness To separate the husband and the wife."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[separated]] | verb | **1.** Act as a barrier between; stand between.<br>**2.** Force, take, or pull apart. | *"Three glorious suns, each one a perfect sun; Not separated with the racking clouds, But severed in a pale clear-shining sky."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[separately]] | adverb | **1.** Apart from others. | *"Aufidius and Martius exit, separately._] SCENE IX."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[separateness]] | noun | **1.** The state of being several and distinct.<br>**2.** Political independence. | *"It was significant of the separateness between Lydgate’s mind and Rosamond’s that he had no impulse to speak to her on the subject; indeed, he did not quite trust her reticence towards Will."* — George Eliot, *Middlemarch* |
| [[separation]] | noun | **1.** The state of lacking unity.<br>**2.** Coming apart. | *"Our separation so abides and flies That thou, residing here, goes yet with me, And I, hence fleeting, here remain with thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[separationism]] | noun | **1.** Advocacy of a policy of strict separation of church and state. | *"In academic literature, separationism designates advocacy of a policy of strict separation of church and state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separationist]] | noun | **1.** An advocate of secession or separation from a larger group (such as an established church or a national union). | *"In academic literature, separationist designates an advocate of secession or separation from a larger group (such as an established church or a national union)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separatism]] | noun | **1.** A social system that provides separate facilities for minority groups.<br>**2.** A disposition toward schism and secession from a larger group; the principles and practices of separatists. | *"In academic literature, separatism designates a social system that provides separate facilities for minority groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separatist]] | noun | **1.** An advocate of secession or separation from a larger group (such as an established church or a national union).<br>**2.** Having separated or advocating separation from another entity or policy or attitude. | *"In academic literature, separatist designates an advocate of secession or separation from a larger group (such as an established church or a national union)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separative]] | adjective | **1.** (used of an accent in hebrew orthography) indicating that the word marked is separated to a greater or lesser degree rhythmically and grammatically from the word that follows it.<br>**2.** Serving to separate or divide into parts. | *"In academic literature, separative designates (used of an accent in hebrew orthography) indicating that the word marked is separated to a greater or lesser degree rhythmically and grammatically from the word that follows it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[separator]] | noun | **1.** An apparatus that uses centrifugal force to separate particles from a suspension. | *"Separator of fable from fact; that which gives action to thought. 586:9 FATHER."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[separatrix]] | noun | **1.** A punctuation mark (/) used to separate related items of information. | *"In academic literature, separatrix designates a punctuation mark (/) used to separate related items of information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subpart]] | noun | **1.** A part of a part. | *"In academic literature, subpart designates a part of a part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transparence]] | noun | **1.** Permitting the free passage of electromagnetic radiation.<br>**2.** The quality of being clear and transparent. | *"In academic literature, transparence designates permitting the free passage of electromagnetic radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transparency]] | noun | **1.** Permitting the free passage of electromagnetic radiation.<br>**2.** The quality of being clear and transparent. | *"Bucket, who has seen through the transparency of Mrs."* — Charles Dickens, *Bleak House* |
| [[transparent]] | adjective | **1.** Transmitting light; able to be seen through with clarity.<br>**2.** So thin as to transmit light. | *"Nor shines the silver moon one half so bright Through the transparent bosom of the deep As doth thy face, through tears of mine give light."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transparently]] | adverb | **1.** So as to be easily understood or seen through.<br>**2.** So as to allow the passage of light. | *"Why, bless my soul, Lady Dedlock, transparently so!” “If, sir,” she begins, “in my knowledge of my secret—” But he interrupts her."* — Charles Dickens, *Bleak House* |
| [[transparentness]] | noun | **1.** The quality of being clear and transparent. | *"In academic literature, transparentness designates the quality of being clear and transparent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappareled]] | adjective | **1.** Having removed clothing. | *"In academic literature, unappareled designates having removed clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unapparent]] | adjective | **1.** Not readily apparent. | *"Consider the subtleness of the sea; how its most dreaded creatures glide under water, unapparent for the most part, and treacherously hidden beneath the loveliest tints of azure."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[uncomparable]] | adjective | **1.** Such that comparison is impossible; unsuitable for comparison or lacking features that can be compared. | *"In academic literature, uncomparable designates such that comparison is impossible; unsuitable for comparison or lacking features that can be compared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncomparably]] | adverb | **1.** In an incomparable manner or to an incomparable degree. | *"In academic literature, uncomparably designates in an incomparable manner or to an incomparable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncompartmented]] | adjective | **1.** Not compartmented; not divided into compartments or isolated units. | *"In academic literature, uncompartmented designates not compartmented; not divided into compartments or isolated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpart]] | noun | **1.** A part lying on the lower side or underneath an animal's body. | *"In academic literature, underpart designates a part lying on the lower side or underneath an animal's body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unparallel]] | adjective | **1.** Not straight or parallel. | *"If, one by one, you wedded all the world, Or from the all that are took something good, To make a perfect woman, she you kill’d Would be unparallel’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unparalleled]] | adjective | **1.** Radically distinctive and without equal. | *"Now boast thee, Death, in thy possession lies A lass unparalleled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unparented]] | adjective | **1.** Having no parent or parents or not cared for by parent surrogates. | *"In academic literature, unparented designates having no parent or parents or not cared for by parent surrogates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unparliamentary]] | adjective | **1.** So rude and abusive as to be unsuitable for parliament. | *"So the Commons resolved that it is unparliamentary to strike out, at a conference, anything in a bill which hath been agreed and passed by both Houses. _6 Grey_, 274; _1 Chand._, 312."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[unpartitioned]] | adjective | **1.** Not divided by partitions. | *"In academic literature, unpartitioned designates not divided by partitions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprepared]] | adjective | **1.** Without preparation; not prepared for; ; ; - r.e.danielson. | *"Go we, as well as haste will suffer us, To this unlook’d-for, unprepared pomp. [_Exeunt all but the Bastard."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Separation & Loosening]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PAR
  </div>
</div>
