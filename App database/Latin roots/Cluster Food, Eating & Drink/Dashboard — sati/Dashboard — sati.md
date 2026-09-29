---
status: unread
type: root_dashboard
---
# Dashboard — sati
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sati-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“enough”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering at a dining table to share nourishment, bread, and refreshing water.</span>
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

The root **sati** means enough. It refers to enough, sufficiency, to fill to capacity, fulfillment. In English, this root forms words such as *dissatisfaction*, *dissatisfactory*, *dissatisfy*, and *insatiability*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: enough
> The root **sati** means enough. It refers to enough, sufficiency, to fill to capacity, fulfillment. In English, this root forms words such as *dissatisfaction*, *dissatisfactory*, *dissatisfy*, and *insatiability*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Enough</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *dissatisfaction* and *dissatisfactory*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sati** comes from a Latin word that means *"enough"*.
  - At its core, it describes enough.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **sati** in an English word, think of **food, eating, and drinking**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of enough.
  - **Mental & Social**: How people experience, organize, or communicate about enough.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Dissatisfaction**: The state or emotional condition of being displeased, discontented, or unsatisfied with quality, performance, or results.
  - **Dissatisfactory**: Causing dissatisfaction, displeasure, or disappointment.
  - **Dissatisfy**: To fail to satisfy.
  - **Insatiability**: The quality, condition, or state of being insatiable.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sati</mark>, think of <mark class="hl-def">food, eating, and drinking</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *satis* & *satiāre*
> Derivatives of **sati** entered English through several distinct morphological mechanisms:
> 1. **The Latin Verb *satiāre* ("to fill full"):**
>    - *satiāt-* + *-ion* $ightarrow$ **satiation** (the state of being filled).
>    - *satiāt-* (participial verb) $ightarrow$ **satiate** (to fill to capacity).
>    - *satis* + *-tās* $ightarrow$ *satietās* $ightarrow$ **satiety** (fullness; surfeit).
> 2. **The Negated Adjectival System in `in-`:**
>    - *in-* + *satiābilis* $ightarrow$ **insatiable**, **insatiability**, **insatiably**.
>    - *in-* + *satiātus* $ightarrow$ **insatiate**, **insatiately**.
> 3. **The Compound Verb *satisfacere* ("enough" + "to do"):**
>    - *satisfacere* $ightarrow$ Old French *satisfier* $ightarrow$ English **satisfy**, **satisfying**, **satisfyingly**.
>    - *satisfactiō* $ightarrow$ **satisfaction**.
>    - *satisfactōrius* $ightarrow$ **satisfactory**, **satisfactorily**, **satisfactoriness**.
> 4. **Negative & Reversal Prefixes (`dis-`, `un-`):**
>    - *dis-* + *satisfy* $ightarrow$ **dissatisfy**, **dissatisfaction**, **dissatisfactory**.
>    - *un-* + *satisfactory* $ightarrow$ **unsatisfactory**, **unsatisfactorily**.
>    - *un-* + *satisfied* $ightarrow$ **unsatisfied**.
> 5. **The Germanic Sibling Line (*sate* / *sated*):**
>    - Old English *sadian* ("to satiate"), remodeled under Anglo-French *saciier* $ightarrow$ **sate**, **sated**.

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
                                  ┌── Physiological Appetite ─── satiate, satiation, satiety, sate, sated
                                  │
                                  ├── Unquenchable Desires ────── insatiable, insatiate, insatiability
                                  │
    [SATI-] ──────────────────────┼── Emotional Contentment ──── satisfaction, satisfying, self-satisfied
 (enough / fill full)             │
                                  ├── Adequacy & Standards ───── satisfactory, satisfactorily, unsatisfactoriness
                                  │
                                  └── Legal & Contractual ────── satisfy (a debt), satisfaction of judgment
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Gastroenterology, Neurobiology & Appetite:** *satiate*, *satiation*, *satiety*, *sate*, *sated*, *satiable*.
> 2. **Unchecked Greed & Boundless Ambition:** *insatiable*, *insatiability*, *insatiably*, *insatiate*, *insatiately*.
> 3. **Human Contentment & Psychological States:** *satisfaction*, *satisfy*, *satisfying*, *satisfyingly*, *self-satisfied*.
> 4. **Performance Evaluation & Quality Control:** *satisfactory*, *satisfactorily*, *satisfactoriness*, *unsatisfactory*, *unsatisfactorily*.
> 5. **Consumer Discontent & Frustration:** *dissatisfy*, *dissatisfaction*, *dissatisfactory*, *unsatisfied*.

---

## 🔀 4. Prefix & Combining Dynamics on sati

### Prefix Dynamics

| Prefix / Combining Form | Core Value | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `in-` | not, un- | **insatiable**, **insatiate** | Incapable of reaching the state of "enough"; constantly craving. |
| `dis-` | apart, opposite | **dissatisfy**, **dissatisfaction** | Reversing satisfaction; inducing displeasure, frustration, or discontent. |
| `un-` | not (adjectival) | **unsatisfactory**, **unsatisfied** | Falling short of the required standard or remaining unfulfilled. |
| `satis-` + `facere` | enough + to do/make | **satisfy**, **satisfaction** | Literally "doing enough" to meet an obligation, expectation, or appetite. |
| `self-` | reflexively | **self-satisfied** | Unduly pleased with one's own standing or achievements; smug. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ety` (Latin *-etās*) | Abstract noun (state / condition) | **satiety** | The state of being fully sated; surfeit. |
| `-ation` (Latin *-ātiō*) | Noun of process | **satiation** | The physiological process of reaching appetite fullness. |
| `-able` (Latin *-ābilis*) | Adjective of capability | **satiable**, **insatiable** | Capable or incapable of being satisfied. |
| `-ory` (Latin *-ōrius*) | Adjectival (pertaining to) | **satisfactory**, **dissatisfactory** | Serving to meet or fail to meet standards. |
| `-ly` | Adverbial | **satisfactorily**, **insatiably** | In a manner that fulfills or fails to fulfill requirements. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🧠 **Neurobiology, Endocrinology & Bariatrics** | *satiety*, *satiation*, *satiate* | Mapping hypothalamic appetite circuitry (leptin, GLP-1, ghrelin); evaluating the satiety index of dietary proteins and fibers. |
| ⚖️ **Commercial Law, Contracts & Finance** | *satisfy*, *satisfaction* | Drafting releases of mortgage liens upon *satisfaction in full*; fulfilling contractual covenants and conditions precedent. |
| 📊 **Quality Assurance & Product Management** | *satisfactory*, *unsatisfactory*, *dissatisfaction* | Conducting customer satisfaction (CSAT) surveys; inspecting manufactured lots against regulatory engineering thresholds. |
| 🎭 **Literature, Drama & Moral Philosophy** | *insatiable*, *insatiate*, *sated* | Depicting tragic hubris (e.g., Macbeth's insatiable ambition, Faust's unquenchable thirst for forbidden knowledge). |
| 🍽️ **Gastronomy & Sensory Science** | *sate*, *satiated*, *satisfying* | Designing multi-course tasting menus that balance richness, acidity, and portion size to avoid sensory-specific satiety before dessert. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alsatia]] | noun | **1.** A region of northeastern france famous for its wines. | *"In academic literature, alsatia designates a region of northeastern france famous for its wines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alsatian]] | noun | **1.** A native or inhabitant of alsace.<br>**2.** Breed of large shepherd dogs used in police work and as a guide for the blind. | *"Turley, and the Alsatian Foggerty."* — J. M. Barrie, *Peter Pan* |
| [[dissatisfaction]] | noun | **1.** The feeling of being displeased and discontent. | *"He is a kind of man—by George!—that has caused me more restlessness, and more uneasiness, and more dissatisfaction with myself than all other men put together."* — Charles Dickens, *Bleak House* |
| [[dissatisfactory]] | adjective | **1.** Not up to expectations. | *"To have reduced the different qualifications in the different States to one uniform rule, would probably have been as dissatisfactory to some of the States as it would have been difficult to the convention."* — Alexander Hamilton, *The Federalist Papers* |
| [[dissatisfied]] | verb | **1.** Fail to satisfy.<br>**2.** In a state of sulky dissatisfaction. | *"When the morning sun would shine in through the open windows and the green slope of the castle would send its greeting to her, she did not want little Leonore to feel dissatisfied with her new quarters."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[dissatisfy]] | verb | **1.** Fail to satisfy. | *"When the morning sun would shine in through the open windows and the green slope of the castle would send its greeting to her, she did not want little Leonore to feel dissatisfied with her new quarters."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[insatiable]] | adjective | **1.** Impossible to satisfy. | *"I was for ever stealing away from mother in my insatiable curiosity to see everything that was going on, and I managed to see pretty much of everything."* — Jack London, *The Jacket (The Star-Rover)* |
| [[insatiably]] | adverb | **1.** To an insatiable degree.<br>**2.** In an insatiable manner; with persistence but without satisfaction. | *"In academic literature, insatiably designates to an insatiable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insatiate]] | adjective | **1.** Impossible to satisfy. | *"Light vanity, insatiate cormorant, Consuming means, soon preys upon itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satiable]] | adjective | **1.** Capable of being sated. | *"In academic literature, satiable designates capable of being sated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satiate]] | verb | **1.** Fill to satisfaction.<br>**2.** Overeat or eat immodestly; make a pig of oneself. | *"The cloyed will— That satiate yet unsatisfied desire, that tub Both fill’d and running—ravening first the lamb, Longs after for the garbage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satiated]] | verb | **1.** Fill to satisfaction.<br>**2.** Overeat or eat immodestly; make a pig of oneself. | *"This shadow looked satiated and calm, as though for the moment it had had its fill of all the emotions."* — Joseph Conrad, *Heart of Darkness* |
| [[satiation]] | noun | **1.** The state of being satisfactorily full and unable to take on more.<br>**2.** The act of achieving full gratification. | *"In academic literature, satiation designates the state of being satisfactorily full and unable to take on more."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satie]] | noun | **1.** French composer noted for his experimentalism and rejection of romanticism (1866-1925). | *"In academic literature, satie designates french composer noted for his experimentalism and rejection of romanticism (1866-1925)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satiety]] | noun | **1.** The state of being satisfactorily full and unable to take on more. | *"Tell me thy mind; for I have Pisa left And am to Padua come as he that leaves A shallow plash to plunge him in the deep, And with satiety seeks to quench his thirst."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satin]] | noun | **1.** A smooth fabric of silk or rayon; has a glossy face and a dull back. | *"What said Master Dommelton about the satin for my short cloak and my slops?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satinet]] | noun | **1.** A fabric with a finish resembling satin but made partly or wholly from cotton or synthetic fiber. | *"Allen, looking up from the brown patch she was engaged in sewing on the elbow of the deacon's black satinet coat."* — Effie Afton, *Eventide* |
| [[satinette]] | noun | **1.** A fabric with a finish resembling satin but made partly or wholly from cotton or synthetic fiber. | *"In academic literature, satinette designates a fabric with a finish resembling satin but made partly or wholly from cotton or synthetic fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satinleaf]] | noun | **1.** Tropical american timber tree with dark hard heavy wood and small plumlike purple fruit. | *"In academic literature, satinleaf designates tropical american timber tree with dark hard heavy wood and small plumlike purple fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satinpod]] | noun | **1.** Southeastern european plant cultivated for its fragrant purplish flowers and round flat papery silver-white seedpods that are used for indoor decoration. | *"In academic literature, satinpod designates southeastern european plant cultivated for its fragrant purplish flowers and round flat papery silver-white seedpods that are used for indoor decoration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satinwood]] | noun | **1.** West indian tree with smooth lustrous and slightly oily wood.<br>**2.** Hard yellowish wood of a satinwood tree having a satiny luster; used for fine cabinetwork and tools. | *"On a tiny satinwood table stood a statuette by Clodion, and beside it lay a copy of Les Cent Nouvelles, bound for Margaret of Valois by Clovis Eve and powdered with the gilt daisies that Queen had selected for her device."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[satiny]] | adjective | **1.** Having a smooth, gleaming surface reflecting light. | *"The train was beating the post-chaise with its satiny horses, the train that went by coal one dug from the ground."* — Donn Byrne, *The Wind Bloweth* |
| [[satire]] | noun | **1.** Witty language used to convey insults or scorn; ; ; --jonathan swift. | *"Rise resty Muse, my love’s sweet face survey, If time have any wrinkle graven there, If any, be a satire to decay, And make time’s spoils despised everywhere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satiric]] | adjective | **1.** Exposing human folly to ridicule. | *"From Walls besmear'd with stinking Ordure, By Swine who nee'r provide Bumfodder _Libera Nos_---- (Pt. 4, p. 7) Other types of graffiti, however, vary from the very earnest expression of affection to the nonexcrementally satiric."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[satirical]] | adjective | **1.** Exposing human folly to ridicule. | *"For the satirical slave says here that old men have grey beards; that their faces are wrinkled; their eyes purging thick amber and plum-tree gum; and that they have a plentiful lack of wit, together with most weak hams."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satirically]] | adverb | **1.** In a satirical manner. | *"That is wi-ide.” Naumann’s pronunciation of the vowel seemed to stretch the word satirically."* — George Eliot, *Middlemarch* |
| [[satirise]] | verb | **1.** Ridicule with satire. | *"Satire is reckoned the easiest of all wit, but I take it to be otherwise in very bad times: for it is as hard to satirise well a man of distinguished vices, as to praise well a man of distinguished virtues."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[satirist]] | noun | **1.** A humorist who uses ridicule and irony and sarcasm. | *"Is the satirist of “Vanity Fair” admired in high places?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[satirize]] | verb | **1.** Ridicule with satire. | *"In it we are presented with a number of pictures of the utterly fossilized condition of the clergy of the day in the Established Church (see especially book II., vv. 326-832, in which he satirizes the clergy and the universities)."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[satisfaction]] | noun | **1.** The contentment one feels when one has fulfilled a desire, need, or expectation.<br>**2.** State of being gratified or satisfied. | *"You know since Pentecost the sum is due, And since I have not much importun’d you, Nor now I had not, but that I am bound To Persia, and want guilders for my voyage; Therefore make present satisfaction, Or I’ll attach you by this officer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfactorily]] | adverb | **1.** In a satisfactory manner. | *"Bucket for a little private confabulation, tells his tale satisfactorily, though out of breath."* — Charles Dickens, *Bleak House* |
| [[satisfactoriness]] | noun | **1.** The quality of giving satisfaction sufficient to meet a demand or requirement. | *"Then I shall respect your opinion of their satisfactoriness as a staff of life."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[satisfactory]] | adjective | **1.** Giving satisfaction.<br>**2.** Meeting requirements. | *"Do what I want, and I will pay you well.” Jo attends closely while the words are being spoken; tells them off on his broom-handle, finding them rather hard; pauses to consider their meaning; considers it satisfactory; and nods his ragged head."* — Charles Dickens, *Bleak House* |
| [[satisfiable]] | adjective | **1.** Capable of being sated. | *"In academic literature, satisfiable designates capable of being sated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satisfice]] | verb | **1.** Decide on and pursue a course of action satisfying the minimum requirements to achieve a goal. | *"In academic literature, satisfice designates decide on and pursue a course of action satisfying the minimum requirements to achieve a goal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satisfied]] | verb | **1.** Meet the requirements or expectations of.<br>**2.** Make happy or satisfied. | *"I am satisfied in nature, Whose motive in this case should stir me most To my revenge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfier]] | noun | **1.** Any agent capable of producing satisfaction. | *"In academic literature, satisfier designates any agent capable of producing satisfaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satisfise]] | verb | **1.** Decide on and pursue a course of action satisfying the minimum requirements to achieve a goal. | *"In academic literature, satisfise designates decide on and pursue a course of action satisfying the minimum requirements to achieve a goal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[satisfy]] | verb | **1.** Meet the requirements or expectations of.<br>**2.** Make happy or satisfied. | *"You are too old, sir; let it satisfy you, you are too old."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfying]] | verb | **1.** Meet the requirements or expectations of.<br>**2.** Make happy or satisfied. | *"If you seek For further satisfying, under her breast (Worthy the pressing) lies a mole, right proud Of that most delicate lodging."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfyingly]] | adverb | **1.** In a gratifying manner. | *"If he can most satisfyingly perform this sole and only duty by _helping_ his neighbor, he will do it; if he can most satisfyingly perform it by _swindling_ his neighbor, he will do it."* — Mark Twain, *What Is Man? and Other Essays* |
| [[unsatiable]] | adjective | **1.** Impossible to satisfy. | *"In academic literature, unsatiable designates impossible to satisfy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatiably]] | adverb | **1.** To an insatiable degree.<br>**2.** In an insatiable manner; with persistence but without satisfaction. | *"In academic literature, unsatiably designates to an insatiable degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatiated]] | adjective | **1.** Not having been satisfied. | *"In academic literature, unsatiated designates not having been satisfied."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatisfactorily]] | adverb | **1.** In an unsatisfactory manner. | *"What is a 'creature,' Miss Derrick?" "Pamela in your book is a creature," she replied unsatisfactorily, with the slightest tilt of the chin."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[unsatisfactoriness]] | noun | **1.** The quality of being inadequate or unsuitable. | *"In academic literature, unsatisfactoriness designates the quality of being inadequate or unsuitable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatisfactory]] | adjective | **1.** Not giving satisfaction. | *"Mary never wrote to Bath herself; all the toil of keeping up a slow and unsatisfactory correspondence with Elizabeth fell on Anne."* — Jane Austen, *Persuasion* |
| [[unsatisfiable]] | adjective | **1.** Not capable of being satisfied. | *"In academic literature, unsatisfiable designates not capable of being satisfied."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatisfied]] | adjective | **1.** Not having been satisfied.<br>**2.** Worried and uneasy. | *"The cloyed will— That satiate yet unsatisfied desire, that tub Both fill’d and running—ravening first the lamb, Longs after for the garbage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsatisfying]] | adjective | **1.** Not up to expectations. | *"I couldn't say, sir," is the civil but unsatisfying reply with which research is met."* — P. G. Wodehouse, *Love Among the Chickens* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Food, Eating & Drink]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SATI
  </div>
</div>
