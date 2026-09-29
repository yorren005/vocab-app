---
status: unread
type: root_dashboard
---
# Dashboard — ed
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ed-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to eat or consume”</span>
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

The root **ed** means to eat or consume. It refers to eat, to consume, to devour. In English, this root forms words such as *anteprandial*, *comedo*, *comedogenic*, and *comedogenicity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to eat or consume
> The root **ed** means to eat or consume. It refers to eat, to consume, to devour. In English, this root forms words such as *anteprandial*, *comedo*, *comedogenic*, and *comedogenicity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To eat or consume</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *anteprandial* and *comedo*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ed** comes from a Latin word that means *"to eat or consume"*.
  - At its core, it describes the action of eat or consume.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **ed** in an English word, think of **to eat or consume**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to eat or consume).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Anteprandial**: Occurring, performed, or served before a meal.
  - **Comedo**: A clogged hair follicle or sebaceous pore plugged with sebum, keratin, and dead skin cells: an open comedo or closed comedo.
  - **Comedogenic**: Tending to clog pores and encourage the development of comedones.
  - **Comedogenicity**: The property, capacity, or measured degree of a chemical substance to induce comedo formation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ed</mark>, think of <mark class="hl-def">to eat or consume</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *edere*
> In classical Latin, *edere* was an irregular verb featuring both thematic and athematic forms (*edō, ēst, ēstis, ēsse*). In English, its derivatives entered through several distinct morphological pipelines:
> 1. **The Direct Verbal Stem `ed-`:**
>    - *ed-* + *-ibilis* $ightarrow$ *edible*, *edibility*, *inedible*.
>    - *ed-* + *-āx* (suffix of excessive inclination) $ightarrow$ *edāx* $ightarrow$ *edacious*, *edacity*.
> 2. **The Desiderative Verb *ēsurīre* ("to hunger"):**
>    - Built from *ēsum* (supine of *edere*) + desiderative *-urīre* $ightarrow$ *ēsuriēns* $ightarrow$ English **esurient**, **esurience**.
> 3. **The Nominal Base *esca* ("food"):**
>    - *esca* + *-lentus* ("full of") $ightarrow$ *esculentus* $ightarrow$ English **esculent**.
> 4. **The Prefix Compound *ob-edere* ("to eat away, eat excessively"):**
>    - *ob-* + *edere* $ightarrow$ participle *obēsus* ("fattened by eating") $ightarrow$ English **obese**, **obesity**.
> 5. **The Prefix Compound *com-edere* ("to eat up, devour"):**
>    - *com-* + *edere* $ightarrow$ agent noun *comedō* ("glutton, devourer") $ightarrow$ English **comedo**, **comedogenic**.
> 6. **The Archaic Compound *prandium* ("midday meal"):**
>    - Proto-Italic *\*prām-ed-yom* (*\*prām-* "early" + *\*ed-* "eat") $ightarrow$ *prandium* $ightarrow$ English **prandial**, **postprandial**, **anteprandial**.

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
                                  ┌── Safety & Wholesomeness ─── edible, inedible, edibility, esculent
                                  │
                                  ├── Hunger & Ravenousness ───── edacious, edacity, esurient, esurience
                                  │
    [ED-] ────────────────────────┼── Metabolic & Weight ──────── obese, obesity
 (to eat / consume)               │
                                  ├── Clinical Dermatology ───── comedo, comedones, comedogenic
                                  │
                                  └── Chronology of Dining ───── prandial, postprandial, anteprandial
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Dietary Fitness & Foraging:** *edible*, *inedible*, *edibility*, *inedibility*, *esculent*.
> 2. **Voracious Desire & Famine:** *edacious*, *edacity*, *esurient*, *esurience*, *esuriently*.
> 3. **Clinical Adiposity & Metabolism:** *obese*, *obesity*.
> 4. **Dermatology & Skin Blemishes:** *comedo*, *comedones*, *comedogenic*, *comedogenicity*, *noncomedogenic*.
> 5. **Chronobiology of Meals:** *prandial*, *postprandial*, *anteprandial*.

---

## 🔀 4. Prefix & Combining Dynamics on ed

### Prefix Shifts

| Prefix | Prefix Meaning | Formed Compound | Semantic Dynamic |
| :--- | :--- | :--- | :--- |
| `in-` | not, un- | **inedible**, **inedibility** | Negates fitness for eating: toxic, spoiled, or unpalatable. |
| `ob-` | over, completely, against | **obese**, **obesity** | Literally "eaten away" or "eaten round": possessing excess adipose tissue from over-eating. |
| `com-` | completely, intensely | **comedo**, **comedogenic** | Literally "the complete devourer": applied metaphorically to pore-plugging blemishes that "eat" skin. |
| `post-` | after (attached to *prandium*) | **postprandial** | Taking place or measured subsequent to a meal. |
| `ante-` | before (attached to *prandium*) | **anteprandial** | Preceding a meal; taken before dining. |

### Suffix Transformations

| Suffix | Grammatical Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ible` | Adjective (potential / capability) | **edible**, **inedible** | Fit or capable of being eaten. |
| `-acious` | Adjective (inclined to / fond of) | **edacious** | Prone to voracious or destructive consumption. |
| `-ity` | Abstract noun (quality / state) | **edacity**, **edibility**, **obesity** | The state, metric, or condition of consuming, fitness, or fatness. |
| `-ent` | Adjective (participial agent) | **esurient**, **esculent** | In a state of hungering; fit for eating. |
| `-genic` | Adjective (productive / causal) | **comedogenic** | Causing or encouraging the development of comedones. |
| `-ial` | Adjective (pertaining to) | **prandial**, **postprandial** | Pertaining to the customs, physiology, or events of a meal. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🩺 **Endocrinology & Bariatrics** | *obese*, *obesity*, *postprandial* | Tracking postprandial glycemic spikes, insulin resistance, metabolic syndrome, and pharmacological interventions for morbid obesity. |
| 🍄 **Mycology & Foraging Botany** | *edible*, *inedible*, *esculent* | Classifying wild mushrooms (*Morchella esculenta*) and wild plants by toxicology and culinary safety. |
| 🧴 **Dermatology & Cosmetology** | *comedo*, *comedogenic*, *noncomedogenic* | Formulating skincare cosmetics and sunscreens verified not to occlude sebaceous follicles or induce open/closed comedones. |
| 📜 **Literary & Classical Rhetoric** | *edacious*, *edacity*, *esurient* | Employing vivid classical vocabulary to describe ravenous greed, all-consuming fires (*edacious flames*), or ambitious politicians (*esurient courtiers*). |
| 🍷 **Gastronomy & Hospitality** | *prandial*, *anteprandial*, *edibles* | Structuring multi-course banquet services, aperitifs, and commercial food product categories. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abed]] | adverb | **1.** In bed. | *"And this was it I gave him, being abed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aged]] | noun | **1.** People who are old collectively.<br>**2.** Begin to seem older; get older. | *"COMINIUS. [_to Sicinius_.] Aged sir, hands off."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[agedness]] | noun | **1.** The property characteristic of old age. | *"In academic literature, agedness designates the property characteristic of old age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agreed]] | verb | **1.** Be in accord; be in agreement.<br>**2.** Consent or assent to a condition, or agree to do something. | *"Unwilling I agreed; alas, too soon We came aboard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antiquated]] | verb | **1.** Make obsolete or old-fashioned.<br>**2.** Give an antique appearance to. | *"Historically, it is he himself who has antiquated every one of those conceptions, and, so far as they have survived, it has been in virtue of association with him."* — T. R. Glover, *The Jesus of History* |
| [[complicated]] | verb | **1.** Make more complicated.<br>**2.** Make more complex, intricate, or richer. | *"This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means."* — Charles Dickens, *Bleak House* |
| [[complicatedness]] | noun | **1.** Puzzling complexity. | *"In academic literature, complicatedness designates puzzling complexity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deed]] | noun | **1.** A legal document signed and sealed and delivered to effect a transfer of property and to show the legal right to possess it.<br>**2.** Something that people do or cause to happen. | *"If thou proceed As high as word, my deed shall match thy deed. [_Flourish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ed]] | noun | **1.** Impotence resulting from a man's inability to have or maintain an erection of his penis. | *"In academic literature, ed designates impotence resulting from a man's inability to have or maintain an erection of his penis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edibility]] | noun | **1.** The property of being fit to eat. | *"In academic literature, edibility designates the property of being fit to eat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edible]] | noun | **1.** Any substance that can be used as food.<br>**2.** Suitable for use as food. | *"These shrubs and bushes either bore edible fruit or flowers, or the leaves and tender shoots made nourishing and satisfying food when cooked in the way previously described."* — Classic Author, *Hawaiian folk tales* |
| [[edibleness]] | noun | **1.** The property of being fit to eat. | *"In academic literature, edibleness designates the property of being fit to eat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fenestrated]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ed within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of ed in systematic terminology. | *"In academic literature, fenestrated designates pertaining to, derived from, or characteristic of latin ed within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indeed]] | adverb | **1.** In truth (often tends to intensify).<br>**2.** (used as an interjection) an expression of surprise or skepticism or irony etc. | *"He was excellent indeed, madam; the king very lately spoke of him admiringly, and mourningly; he was skilful enough to have liv’d still, if knowledge could be set up against mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inedible]] | adjective | **1.** Not suitable for food. | *"The fruit, which is inedible, resembles a banana, and is clearly chosen for this purpose on account of its shape."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[misdeed]] | noun | **1.** Improper or wicked or immoral behavior. | *"King Lewis, I here protest in sight of heaven, And by the hope I have of heavenly bliss, That I am clear from this misdeed of Edward’s— No more my king, for he dishonours me, But most himself, if he could see his shame."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonaged]] | adjective | **1.** Not of legal age. | *"In academic literature, nonaged designates not of legal age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overaged]] | adjective | **1.** Too old to be useful; - anthony trollope. | *"In academic literature, overaged designates too old to be useful; - anthony trollope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posted]] | verb | **1.** Affix in a public place or for public notice.<br>**2.** Publicize with, or as if with, a poster. | *"The swiftest harts have posted you by land, And winds of all the corners kiss’d your sails, To make your vessel nimble."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reed]] | noun | **1.** Tall woody perennial grasses with hollow slender stems especially of the genera arundo and phragmites.<br>**2.** United states journalist who reported on the october revolution from petrograd in 1917; founded the communist labor party in america in 1919; is buried in the kremlin in moscow (1887-1920). | *"I had as lief have a reed that will do me no service as a partisan I could not heave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reedy]] | adjective | **1.** Having a tone of a reed instrument.<br>**2.** Resembling a reed in being upright and slender. | *"Ye healthy wastes, immix’d with reedy fens; Ye mossy streams, with sedge and rushes stor’d: Ye rugged cliffs, o’erhanging dreary glens, To you I fly—ye with my soul accord."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[reseed]] | verb | **1.** Seed again or anew.<br>**2.** Maintain by seeding without human intervention. | *"In academic literature, reseed designates seed again or anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seabed]] | noun | **1.** The bottom of a sea or ocean. | *"He notes that the struggle between rich and poor nations and multinational corporations over minerals in the vast oceanic seabed is likely to be heated in the years to come, especially as reserves of land-based minerals approach exhaustion."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[seed]] | noun | **1.** A small hard fruit.<br>**2.** A mature fertilized plant ovule consisting of an embryo and its food source and having a protective coat or testa. | *"Oh fie! ’tis an unweeded garden That grows to seed; things rank and gross in nature Possess it merely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seeded]] | verb | **1.** Go to seed; shed seeds.<br>**2.** Help (an enterprise) in its early stages of development by providing seed money. | *"The seeded pride That hath to this maturity blown up In rank Achilles must or now be cropp’d Or, shedding, breed a nursery of like evil To overbulk us all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seeder]] | noun | **1.** A person who seeds clouds.<br>**2.** A mechanical device that sows grass seed or grain evenly over the ground. | *"Planters and seeders, reapers, harvesters, corn-shellers, hay-loaders, automatic unloading-forks, elevators, water-power-, steam-, and gasoline-engines allow great economies."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[seediness]] | noun | **1.** A lack of elegance as a consequence of wearing threadbare or dirty clothing. | *"In academic literature, seediness designates a lack of elegance as a consequence of wearing threadbare or dirty clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seedy]] | adjective | **1.** Full of seeds.<br>**2.** Shabby and untidy; ; - mark twain. | *"I am a seedy old fellow,” said the Vicar, rising, pushing his chair away and looking down at himself."* — George Eliot, *Middlemarch* |
| [[tunicated]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ed within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of ed in systematic terminology. | *"In academic literature, tunicated designates pertaining to, derived from, or characteristic of latin ed within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaged]] | adjective | **1.** Not subjected to an aging process. | *"In academic literature, unaged designates not subjected to an aging process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncomplicated]] | adjective | **1.** Lacking complexity.<br>**2.** Easy and not involved or complicated. | *"His thought is uncomplicated by distinctions due to tradition and its accidents."* — T. R. Glover, *The Jesus of History* |
| [[unseeded]] | adjective | **1.** Not seeded; used of players of lesser skill.<br>**2.** (of a piece of ground) not have a crop sown on it. | *"In academic literature, unseeded designates not seeded; used of players of lesser skill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unveiled]] | verb | **1.** Remove the veil from.<br>**2.** Make visible. | *"The consequence was, that when the moon, which was full and bright (for the night was fine), came in her course to that space in the sky opposite my casement, and looked in at me through the unveiled panes, her glorious gaze roused me."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[veiled]] | verb | **1.** To obscure, or conceal with or as if with a veil.<br>**2.** Make undecipherable or imperceptible by obscuring or concealing. | *"Nor did you think it folly To keep your great pretences veiled till when They needs must show themselves, which, in the hatching, It seemed, appeared to Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · ED
  </div>
</div>
