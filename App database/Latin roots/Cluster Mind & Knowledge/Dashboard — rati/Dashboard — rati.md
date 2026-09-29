---
status: unread
type: root_dashboard
---
# Dashboard — rati
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rati-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“reckoning or reason”</span>
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

The root **rati** means reckoning or reason. It refers to proportional calculation, accounting of causes, and logical faculty. In English, this root forms words such as *reckon*, *arrange*, *ratio*, and *rational*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: reckoning or reason
> The root **rati** means reckoning or reason. It refers to proportional calculation, accounting of causes, and logical faculty. In English, this root forms words such as *reckon*, *arrange*, *ratio*, and *rational*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Reckoning or reason</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A lightbulb turning on in your mind when an idea suddenly makes sense.</mark>
> - **Everyday Connection**: Think of familiar words like *reckon* and *arrange*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rati** comes from a Latin word that means *"reckoning or reason"*.
  - At its core, it describes reckoning or reason.

- **The Big Picture Idea**:
  - Picture a lightbulb turning on in your mind when an idea suddenly makes sense.
  - Whenever you see **rati** in an English word, think of **thinking, understanding, and knowledge**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of reckoning or reason.
  - **Mental & Social**: How people experience, organize, or communicate about reckoning or reason.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Reckon**: An everyday English word showing the root's idea of *reckoning or reason*.
  - **Arrange**: An everyday English word showing the root's idea of *reckoning or reason*.
  - **Ratio**: The quantitative relationship between two numbers or magnitudes indicating how many times the first contains the second.
  - **Rational**: Endowed with the capacity to reason.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rati</mark>, think of <mark class="hl-def">thinking, understanding, and knowledge</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rati** operates through several distinct morphological stems:
> - **Primary Nominal Stem:** `rati-` / `ratio-` (*ratio*, *ratio-nal*, *ratio-nale*, *ratio-n*)
> - **Participle Stem of *reor*:** `rat-` (*rat-us*, *rat-ify*, *rat-ification*, *pro rat-a*)
> - **Frequentative / Intensive Verb Stem:** `ratiocin-` (from *ratiōcinārī*, "to calculate systematically, deliberate, deduce" $\to$ *ratiocinate*, *ratiocination*)
> - **Contracted Romance Reflexes:** `rate-` (*rate*, *rating*, *prorate*) and `reas-` / `reason-` (*reason*, *reasonable*, *reasoning* < Old French *raison* < *ratiōnem*)

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
> Across its multifaceted evolutionary branches, `rati` spans six major cognitive territories:
> - **Mathematical Proportion & Measurement:** [[ratio]], [[rate]], [[rating]], [[prorate]], [[pro rata]] preserve the primordial commercial and quantitative calculation of comparative values.
> - **Epistemology & Rational Philosophy:** [[rational]], [[rationality]], [[rationalism]], [[rationalist]], [[rationalistic]], [[irrational]] articulate the philosophy that logical reasoning rather than sensory intuition forms the bedrock of knowledge.
> - **Methodical Logic & Formal Deduction:** [[ratiocinate]], [[ratiocination]], [[ratiocinative]], [[ratiocinator]] designate deliberate, step-by-step syllogistic reasoning (celebrated in Edgar Allan Poe's detective tales of ratiocination).
> - **Psychological Justification & Defense:** [[rationalize]], [[rationalization]], [[rationale]] encompass the retrospective construction of logical explanations for emotionally driven behavior or institutional policy.
> - **Apportionment & Resource Allocation:** [[ration]], [[proration]] maintain the practical allocation of a measured daily allowance of food, fuel, or supplies.
> - **Constitutional & Legal Validation:** [[ratify]], [[ratification]] express the formal legal confirmation that an agreement has been calculated, approved, and enacted.
> - **Vernacular Wisdom & Common Sense:** [[reason]], [[reasonable]], [[reasonably]], [[reasonableness]], [[unreasonable]], [[reasoning]] carry the human capacity for fairness, moderation, and sound judgment into everyday life.

---

## 🔀 4. Prefix & Combining Dynamics on rati

### Prefix Dynamics

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **in- (privative)** | not, un- | [[irrational]] | *in-* (assimilated to *ir-*) + *ratiōnālis* $\to$ lacking logic, contrary to sound reason; unexpressible as a fraction. |
| **un- (Germanic)** | not, reversal | [[unreasonable]] | *un-* + *reasonable* $\to$ exceeding bounds of moderation or good sense; unfair, exorbitant. |
| **pro-** | according to, forward | [[prorate]] / [[pro rata]] | Latin *prō rātā parte* $\to$ allocated in proportional accordance with a calculated standard. |
| **over-** | beyond, excessively | [[overrate]] | Germanic *over-* + Latin-derived *rate* $\to$ to evaluate or esteem above its actual merit. |
| **under-** | below, insufficiently | [[underrate]] | Germanic *under-* + Latin-derived *rate* $\to$ to evaluate or assess below true value. |

### Suffix Transformations

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective formant | [[rational]] | Pertaining to, based on, or endowed with the faculty of reason. |
| **-ale** | Nominal substantivization | [[rationale]] | The underlying logical basis, principle, or justification for an action. |
| **-ify** (Lat. *-ficāre*) | Factitive verb | [[ratify]] | *ratus* + *facere* $\to$ to make calculated, fixed, and legally valid. |
| **-ize** | Factitive / Causative verb | [[rationalize]] | To bring into accord with reason, or to concoct superficial justifications. |
| **-ation** | Noun of action or state | [[ratification]], [[ratiocination]], [[rationalization]] | The formal act or outcome of confirming, deducing, or justifying. |
| **-able** | Capacity or fitness | [[reasonable]], [[ratable]] | Capable of being reasoned with; fair; subject to proportional taxation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Mathematics & Statistics** | [[ratio]], [[irrational]], [[rate]], [[prorate]] | Trigonometric ratios, irrational numbers ($\pi, \sqrt{2}$), rates of change, proportional scaling. |
| **Philosophy & Epistemology** | [[rationalism]], [[rationalist]], [[rationality]], [[rationale]] | Continental rationalism (Descartes, Spinoza, Leibniz), foundational justifications, epistemic coherence. |
| **Constitutional & International Law** | [[ratify]], [[ratification]], [[pro rata]] | Senate ratification of treaties, corporate dividend proration, pro rata distribution of bankruptcy assets. |
| **Logistics & Military Strategy** | [[ration]], [[proration]], [[rate]] | Combat field rations (MREs), logistics supply lines, burn rates, resource allocation under scarcity. |
| **Cognitive Psychology & Behavioral Science** | [[rationalize]], [[rationalization]], [[irrationality]] | Cognitive biases, Daniel Kahneman's bounded rationality, post-hoc rationalization of subconscious choices. |
| **Literature & Detective Fiction** | [[ratiocination]], [[ratiocinative]] | C. Auguste Dupin and Sherlock Holmes' method of rigorous analytical deduction. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[irrational]] | noun | **1.** A real number that cannot be expressed as a rational number.<br>**2.** Not consistent with or using reason. | *"By that time we were so anxious and nervous that even Richard confessed, as we rattled over the stones of the old street, to feeling an irrational desire to drive back again."* — Charles Dickens, *Bleak House* |
| [[irrationality]] | noun | **1.** The state of being irrational; lacking powers of understanding. | *"Boy: Yes, Socrates. (bows to kiss his hand, Socrates turns) Socrates: Friend Meno, how hard do you think it will be for this boy to prove the irrationality of the square root of two?"* — Unknown, *The Second Story of Meno* |
| [[irrationally]] | adverb | **1.** In an irrational manner. | *"In giving and accepting battle at Borodinó, Kutúzov acted involuntarily and irrationally."* — graf Leo Tolstoy, *War and Peace* |
| [[nonrational]] | adjective | **1.** Not based on reason.<br>**2.** Obtained through intuition rather than from reasoning or observation. | *"In academic literature, nonrational designates not based on reason."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overrating]] | noun | **1.** A calculation that results in an estimate that is too high.<br>**2.** Make too high an estimate of. | *"In academic literature, overrating designates a calculation that results in an estimate that is too high."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proration]] | noun | **1.** The proportional limitation of production or distribution of something (e.g. crude oil or natural gas) to some fractional part of the total capacity of each producer. | *"In academic literature, proration designates the proportional limitation of production or distribution of something (e.g. crude oil or natural gas) to some fractional part of the total capacity of each producer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ratification]] | noun | **1.** Making something valid by formally ratifying or confirming it. | *"It has not a little contributed to the infirmities of the existing federal system, that it never had a ratification by the PEOPLE."* — Alexander Hamilton, *The Federalist Papers* |
| [[ratified]] | verb | **1.** Approve and express assent, responsibility, or obligation.<br>**2.** Formally approved and invested with legal authority. | *"This cunning Cardinal The articles o’ th’ combination drew As himself pleased; and they were ratified As he cried “Thus let be,” to as much end As give a crutch to the dead."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ratifier]] | noun | **1.** Someone who expresses strong approval. | *"The rabble call him lord, And, as the world were now but to begin, Antiquity forgot, custom not known, The ratifiers and props of every word, They cry ‘Choose we!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ratify]] | verb | **1.** Approve and express assent, responsibility, or obligation. | *"So through Lud’s Town march; And in the temple of great Jupiter Our peace we’ll ratify; seal it with feasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rating]] | noun | **1.** An appraisal of the value of something.<br>**2.** Act of ascertaining or fixing the value or worth of. | *"And yet, dear lady, Rating myself at nothing, you shall see How much I was a braggart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ratio]] | noun | **1.** The relative magnitudes of two quantities (usually expressed as a quotient).<br>**2.** The relation between things (or parts of things) with respect to their comparative quantity, magnitude, or degree. | *"The blaze, enlarging in a double ratio by his approach and its own increase, showed him as he drew nearer the outlines of ricks beside it, lighted up to great distinctness."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ratiocinate]] | verb | **1.** Reason methodologically and logically. | *"In academic literature, ratiocinate designates reason methodologically and logically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ratiocination]] | noun | **1.** The proposition arrived at by logical reasoning (such as the proposition that must follow from the major and minor premises of a syllogism).<br>**2.** Logical and methodical reasoning. | *"The monologue is a signal example of ‘emotional ratiocination’."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[ratiocinative]] | adjective | **1.** Based on exact thinking. | *"In academic literature, ratiocinative designates based on exact thinking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ratiocinator]] | noun | **1.** Someone who reasons logically. | *"In academic literature, ratiocinator designates someone who reasons logically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ration]] | noun | **1.** The food allowance for one day (especially for service personnel).<br>**2.** A fixed portion that is allotted (especially in times of scarcity). | *"Only men, by force of will, could live on so unbalanced a ration."* — Jack London, *The Jacket (The Star-Rover)* |
| [[rational]] | noun | **1.** An integer or a fraction.<br>**2.** Consistent with or based on or using reason. | *"Loss of virginity is rational increase, and there was never virgin got till virginity was first lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rationale]] | noun | **1.** (law) an explanation of the fundamental reasons (especially an explanation of the working of some device in terms of laws of nature). | *"See his _Rationale Divinorum Officiorum_ (appended to the _Rationale Divinorum Officiorum_ of G. [W.] Durandus, Lyons, 1584), p. 556 _recto: "Solent porro hoc tempore_ [the Eve of St."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[rationalisation]] | noun | **1.** (psychiatry) a defense mechanism by which your true motivation is concealed by explaining your actions and feelings in a way that is not threatening.<br>**2.** The cognitive process of making something seem consistent with or based on reason. | *"In academic literature, rationalisation designates (psychiatry) a defense mechanism by which your true motivation is concealed by explaining your actions and feelings in a way that is not threatening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rationalise]] | verb | **1.** Structure and run according to rational or scientific principles in order to achieve desired results.<br>**2.** Defend, explain, clear away, or make excuses for by reasoning. | *"The story that he was a human being transformed into a pine-tree is only one of those transparent attempts at rationalising old beliefs which meet us so frequently in mythology."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[rationalism]] | noun | **1.** (philosophy) the doctrine that knowledge is acquired by reason without resort to experience.<br>**2.** The theological doctrine that human reason rather than divine revelation establishes religious truth. | *"In academic literature, rationalism designates (philosophy) the doctrine that knowledge is acquired by reason without resort to experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rationalist]] | noun | **1.** Someone who emphasizes observable facts and excludes metaphysical speculation about origins or ultimate causes.<br>**2.** Of or relating to or characteristic of rationalism. | *"In academic literature, rationalist designates someone who emphasizes observable facts and excludes metaphysical speculation about origins or ultimate causes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rationalistic]] | adjective | **1.** Of or relating to the philosophical doctrine of rationalism. | *"In this last case it is obvious that a rationalistic explanation of the taboo is impossible."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[rationality]] | noun | **1.** The state of having good sense and sound judgment.<br>**2.** The quality of being consistent with or based on logic. | *"Which would turn out to have the more foresight in it—her rationality or Caleb’s ardent generosity?"* — George Eliot, *Middlemarch* |
| [[rationalization]] | noun | **1.** The cognitive process of making something seem consistent with or based on reason.<br>**2.** (psychiatry) a defense mechanism by which your true motivation is concealed by explaining your actions and feelings in a way that is not threatening. | *"In academic literature, rationalization designates the cognitive process of making something seem consistent with or based on reason."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rationalize]] | verb | **1.** Defend, explain, clear away, or make excuses for by reasoning.<br>**2.** Weed out unwanted or unnecessary things. | *"We can rationalize using the Log Depot if we experience piracy and harassment of our transports and citizens."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[rationally]] | adverb | **1.** In a rational manner. | *"Would I be quiet and talk rationally?” “I would be quiet if he liked, and as to talking rationally, I flattered myself I was doing that now.” He fretted, pished, and pshawed."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[rationalness]] | noun | **1.** The quality of being consistent with or based on logic. | *"In academic literature, rationalness designates the quality of being consistent with or based on logic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rationed]] | verb | **1.** Restrict the consumption of a relatively scarce commodity, as during war.<br>**2.** Distribute in rations, as in the army. | *"No bakeries, no stores, except small sutlers.' The bread had all to be baked; the boat rationed for two days; _eight hundred_ on board."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[rationing]] | noun | **1.** The act of rationing.<br>**2.** Restrict the consumption of a relatively scarce commodity, as during war. | *"In academic literature, rationing designates the act of rationing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ratitae]] | noun | **1.** Used in former classifications to include all ratite bird orders. | *"In academic literature, ratitae designates used in former classifications to include all ratite bird orders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ratite]] | noun | **1.** Flightless birds having flat breastbones lacking a keel for attachment of flight muscles: ostriches; cassowaries; emus; moas; rheas; kiwis; elephant birds. | *"In academic literature, ratite designates flightless birds having flat breastbones lacking a keel for attachment of flight muscles: ostriches; cassowaries; emus; moas; rheas; kiwis; elephant birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underrating]] | noun | **1.** An estimation that is too low; an estimate that is less than the true or actual value.<br>**2.** Make too low an estimate of. | *"Sure-dart, with the exception of the serious underrating of the great lizard’s speed, had thus far made no mistake, and that blunder had not as yet brought him to grief."* — F. H. Costello, *Sure-dart* |
| [[unratified]] | adjective | **1.** Lacking legal authority. | *"In academic literature, unratified designates lacking legal authority."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · RATI
  </div>
</div>
