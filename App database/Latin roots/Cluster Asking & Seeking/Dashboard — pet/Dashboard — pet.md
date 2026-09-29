---
status: unread
type: root_dashboard
---
# Dashboard — pet

<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">petere, petītum (petō, petere)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to seek or ask”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Asking a sincere question or searching along a path for a lost item.</span>
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

The root **pet** means to seek or ask. It refers to searching for something, trying to find it, or striving toward a goal. In English, this root forms words such as *petition*, *compete*, *appetite*, and *repeat*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to seek or ask
> The root **pet** means to seek or ask. It refers to searching for something, trying to find it, or striving toward a goal. In English, this root forms words such as *petition*, *compete*, *appetite*, and *repeat*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**:<mark class="hl-def"><mark class="hl-def">to seek or ask</mark></mark>.
> - **Mental Picture**:<mark class="hl-mnemonic"><mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark></mark>
> - **Everyday Connection**: Think of familiar words like *petition* and *compete*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pet** comes from a Latin word that means <mark class="hl-def">“to seek or ask”</mark>.
  - At its core, it describes the action of seek or ask.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **pet** in an English word, think of <mark class="hl-def">to seek or ask</mark>.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to seek or ask).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Petition**: A formal written request addressed to an authority, court, monarch, or legislative assembly, appealing for the exercise of power to grant a right or redress a grievance.
  - **Compete**: To strive consciously or unconsciously for an objective in rivalry with others.
  - **Appetite**: The natural instinctive physiological desire or craving to satisfy bodily needs, especially the desire for food.
  - **Repeat**: To say, state, or utter again.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pet</mark>, think of <mark class="hl-def">to seek or ask</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Stems
> The root exhibits two primary stems governed by regular Latin verbal conjugation:
> 1. **Present / Imperfective Stem (`pet-`):** From *petō, petere*:
>    - Prefixed verbs: `com-` + `petere` $\to$ [[compete]]; `re-` + `petere` $\to$ [[repeat]].
>    - Physics combining form: *centrum* + `petere` $\to$ [[centripetal]] ("seeking the center").
>    - Aggressive adjective stem: *petulāns* $\to$ [[petulant]], [[petulance]].
> 2. **Participial / Supine Stem (`petit-`):** From *petītum*:
>    - Substantive nominals: `petit-` + `-ion` $\to$ [[petition]]; `re-` + `petit-` + `-ion` $\to$ [[repetition]].
>    - Resultant rivalry: `com-` + `petit-` + `-ion` $\to$ [[competition]]; [[competitor]].
>    - Legal capacity: `com-` + `petēns` $\to$ [[competent]], [[competence]].
>    - Craving: `ad-` + `petit-` $\to$ [[appetite]], [[appetizing]], [[appetitive]].
> 3. **The Unbroken Continuous Compound (`perpetu-`):** From `per-` + `petere` $\to$ Latin *perpetuus*:
>    - `perpetu-` + `-al` $\to$ [[perpetual]]; `perpetu-` + `-ate` $\to$ [[perpetuate]]; `perpetu-` + `-ity` $\to$ [[perpetuity]].
> 4. **The Kinetic Thrust Form (`impetu-`):** From `in-` + `petere` $\to$ Latin *impetus*:
>    - `impetus` (bare noun); `impetu-` + `-ous` $\to$ [[impetuous]]; [[impetuosity]].

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Law, Governance & Constitutional Rights:** [[petition]], [[petitioner]], [[competent]], [[competence]], [[incompetent]], [[perpetuity]] — the First Amendment right to petition, courtroom jurisdiction, mental competency to stand trial, and the Rule Against Perpetuities.
> - **Economics, Commerce & Sports:** [[compete]], [[competition]], [[competitive]], [[competitor]] — free-market antitrust regulation, athletic tournaments, and global trade parity.
> - **Classical Mechanics & Physics:** [[centripetal]], [[impetus]] — Newton's centripetal acceleration ($a = v^2/r$) drawing orbiting bodies inward; kinetic driving momentum.
> - **Physiology, Nutrition & Gastronomy:** [[appetite]], [[appetizer]], [[appetizing]], [[appetitive]] — hypothalamic ghrelin signaling, culinary starters, and hedonic food intake.
> - **Linguistics, Education & Performance:** [[repeat]], [[repetition]], [[repetitive]], [[repetiteur]] — memory consolidation through rehearsal, rhetorical anaphora, and opera rehearsal coaching.
> - **Psychological Temperament:** [[impetuous]], [[impetuosity]], [[petulant]], [[petulance]] — reckless hotheaded rashness and peevish, childish ill-temper.
> - **Metaphysics & Eternity:** [[perpetual]], [[perpetuate]], [[perpetuation]] — continuous motion machines, cultural heritage preservation, and eternal flame monuments.

---

## 🔀 4. Prefix & Combining Dynamics on pet

### Directional Prefix Engine on `pet`

| Prefix | Base Verb | Combined Form | English Derivatives | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- | :--- |
| `ad-` (to, toward) | *petere* | *appetere* | [[appetite]], [[appetizer]], [[appetitive]] | To crave or reach eagerly toward bodily nourishment. |
| `con-` (together) | *petere* | *competere* | [[compete]], [[competition]], [[competitor]] | To strive together against rivals for a shared goal. |
| `con-` (together) | *petēns* | *competēns* | [[competent]], [[competence]], [[incompetent]] | To be suitable, fit, or possessing requisite capacity. |
| `in-` (into, upon) | *petere* | *impetere* $\to$ *impetus* | [[impetus]], [[impetuous]], [[impetuosity]] | To rush violently into/upon; explosive kinetic driving force. |
| `per-` (throughout) | *petere* | *perpetuus* | [[perpetual]], [[perpetuate]], [[perpetuity]] | Striving continuously throughout all time; eternal, unbroken. |
| `re-` (again, back) | *petere* | *repetere* | [[repeat]], [[repetition]], [[repetitive]] | To seek again, demand back; to say or do another time. |
| *(none / bare)* | *petere* | *petītiō* | [[petition]], [[petitioner]], [[petitory]] | A formal solemn prayer or legal request to higher authority. |
| *(root derivative)* | *petere* | *petulāns* | [[petulant]], [[petulance]] | Thrusting forward impudently; childishly irritable. |
| `centrum` + | *petere* | *centripetus* | [[centripetal]] | Seeking or drawing inward toward a rotational center. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Constitutional Law** | [[petition]], [[competent]], [[perpetuity]] | Filing habeas corpus petitions; ruling on testamentary capacity; the Rule Against Perpetuities. |
| 🏎️ **Classical Mechanics & Astrophysics** | [[centripetal]], [[impetus]] | Calculating centripetal force holding planetary orbits; analyzing vehicular collision momentum. |
| 📈 **Microeconomics & Business Strategy** | [[compete]], [[competition]], [[competitive]] | Antitrust investigations into monopolistic practices; Porter's Five Forces competitive analysis. |
| 🩺 **Neurobiology & Endocrinology** | [[appetite]], [[appetitive]] | Studying leptin-ghrelin satiety feedback loops and dopamine-driven appetitive reward seeking. |
| 🎭 **Opera, Theater & Music** | [[repetiteur]], [[repetition]] | Vocal repetiteurs drilling singers on complex operatic phrasing prior to orchestral rehearsals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[appetence]] | noun | **1.** A feeling of craving something; ; - granville hicks. | *"In academic literature, appetence designates a feeling of craving something; ; - granville hicks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetency]] | noun | **1.** A feeling of craving something; ; - granville hicks. | *"In academic literature, appetency designates a feeling of craving something; ; - granville hicks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetent]] | adjective | **1.** Marked by eager desire. | *"In academic literature, appetent designates marked by eager desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetiser]] | noun | **1.** Food or drink to stimulate the appetite (usually served before a meal or as the first course). | *"In academic literature, appetiser designates food or drink to stimulate the appetite (usually served before a meal or as the first course)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetising]] | adjective | **1.** Appealing to or stimulating the appetite especially in appearance or aroma. | *"The odour which now filled the refectory was scarcely more appetising than that which had regaled our nostrils at breakfast: the dinner was served in two huge tin-plated vessels, whence rose a strong steam redolent of rancid fat."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[appetisingness]] | noun | **1.** The property of stimulating the appetite. | *"In academic literature, appetisingness designates the property of stimulating the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetite]] | noun | **1.** A feeling of craving something; ; - granville hicks. | *"Now all is done, have what shall have no end, Mine appetite I never more will grind On newer proof, to try an older friend, A god in love, to whom I am confined."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[appetitive]] | adjective | **1.** Of or relating to appetite. | *"In academic literature, appetitive designates of or relating to appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetizer]] | noun | **1.** Food or drink to stimulate the appetite (usually served before a meal or as the first course). | *"In academic literature, appetizer designates food or drink to stimulate the appetite (usually served before a meal or as the first course)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetizing]] | adjective | **1.** Appealing to or stimulating the appetite especially in appearance or aroma. | *"The steaming coffee and hot milk and the fresh white bread Apollonie had prepared looked very appetizing to him."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appetizingness]] | noun | **1.** The property of stimulating the appetite. | *"In academic literature, appetizingness designates the property of stimulating the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centripetal]] | adjective | **1.** Tending to move toward a center.<br>**2.** Tending to unify. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[compete]] | verb | **1.** Compete for something; engage in a contest; measure oneself against others. | *"Five are selected to compete for it by the votes of their fellow-students."* — John Cairns, *Principal Cairns* |
| [[competence]] | noun | **1.** The quality of being adequately or well qualified physically and intellectually. | *"For competence of life I will allow you, That lack of means enforce you not to evils."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[competency]] | noun | **1.** The quality of being adequately or well qualified physically and intellectually. | *"Superfluity come sooner by white hairs, but competency lives longer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[competent]] | adjective | **1.** Properly or sufficiently qualified or capable or efficient.<br>**2.** Adequate for the purpose. | *"His indignation derives itself out of a very competent injury; therefore, get you on and give him his desire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[competently]] | adverb | **1.** With competence; in a competent capable manner. | *"In academic literature, competently designates with competence; in a competent capable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[competition]] | noun | **1.** A business relation in which two parties compete to gain customers.<br>**2.** An occasion on which a winner is selected from among two or more contestants. | *"Limitation of competition by custom. § 12."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[competitive]] | adjective | **1.** Involving competition or competitiveness.<br>**2.** Subscribing to capitalistic competition. | *"We may note here merely that the use of money is an outstanding feature of the present economic system and gives rise to many of the problems of political economy. § 10. #The competitive system#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[competitively]] | adverb | **1.** In competition. | *"In academic literature, competitively designates in competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[competitiveness]] | noun | **1.** An aggressive willingness to compete. | *"In academic literature, competitiveness designates an aggressive willingness to compete."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[competitor]] | noun | **1.** The contestant you hope to defeat. | *"You may see, Lepidus, and henceforth know, It is not Caesar’s natural vice to hate Our great competitor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[competitory]] | adjective | **1.** Involving competition or competitiveness. | *"In academic literature, competitory designates involving competition or competitiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impetiginous]] | adjective | **1.** Of or relating to or having impetigo. | *"In academic literature, impetiginous designates of or relating to or having impetigo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impetigo]] | noun | **1.** A very contagious infection of the skin; common in children; localized redness develops into small blisters that gradually crust and erode. | *"In academic literature, impetigo designates a very contagious infection of the skin; common in children; localized redness develops into small blisters that gradually crust and erode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impetuosity]] | noun | **1.** Rash impulsiveness. | *"But, sir, I will deliver his challenge by word of mouth, set upon Aguecheek notable report of valour, and drive the gentleman (as I know his youth will aptly receive it) into a most hideous opinion of his rage, skill, fury, and impetuosity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impetuous]] | adjective | **1.** Characterized by undue haste and lack of thought or deliberation; ; ; ; ; (`brainish' is archaic).<br>**2.** Marked by violent force. | *"The ocean, overpeering of his list, Eats not the flats with more impetuous haste Than young Laertes, in a riotous head, O’erbears your offices."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impetuously]] | adverb | **1.** In an impulsive or impetuous way; without taking cautions. | *"Where is mother, where is mother?" Kurt impetuously asked Lippo, whom he met in the hall carrying a large water-pitcher entrusted to him by Kathy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impetuousness]] | noun | **1.** Rash impulsiveness. | *"In academic literature, impetuousness designates rash impulsiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impetus]] | noun | **1.** A force that moves something along.<br>**2.** The act of applying force suddenly. | *"Cairns threw himself into this movement with ardour, and although he did not intend it, and probably was not aware of it, he was its real leader, giving it at once the impetus and the guidance which it needed."* — John Cairns, *Principal Cairns* |
| [[incompetence]] | noun | **1.** Lack of physical or intellectual ability or qualifications.<br>**2.** Inability of a part or organ to function properly. | *"I recalled the hopeless circumstances by which she had been surrounded in the miserable little shop and the miserable little noisy evening school, with that miserable old bundle of incompetence always to be dragged and shouldered."* — Charles Dickens, *Great Expectations* |
| [[incompetency]] | noun | **1.** Lack of physical or intellectual ability or qualifications. | *"I have suffered a martyrdom from their incompetency and caprice."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[incompetent]] | noun | **1.** Someone who is not competent to take effective action.<br>**2.** Legally not qualified or sufficient. | *"This consideration, however, has less weight as the corporate form of organization becomes well nigh universal in "big business." Every profligate son, every incompetent heir, is an argument against the inheritance of property."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[incompetently]] | adverb | **1.** In an incompetent manner. | *"In academic literature, incompetently designates in an incompetent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncompetitive]] | adjective | **1.** Not involving competition or competitiveness. | *"In academic literature, noncompetitive designates not involving competition or competitiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncompetitively]] | adverb | **1.** In a noncompetitive manner. | *"In academic literature, noncompetitively designates in a noncompetitive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrepetitive]] | adjective | **1.** Marked by the absence of repetition. | *"In academic literature, nonrepetitive designates marked by the absence of repetition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perpetrate]] | verb | **1.** Perform an act, usually with a negative connotation. | *"Do they, your hang-dogs, O smug citizen, do these your hang-dogs fear to gaze upon the facial horror of the horror they perpetrate for you and ours and at your behest?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[perpetration]] | noun | **1.** The act of committing a crime. | *"I could rescue myself from this abhorred fate; I could dissipate this tremendous illusion; I could save my brother from the perpetration of new horrors, by pointing out the devil who seduced him."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[perpetrator]] | noun | **1.** Someone who perpetrates wrongdoing. | *"It was the time attack, a common but perilous trick that every novice knows, that has laid on his back many a good man who attempted it, and that is so fraught with danger to the perpetrator that swordsmen are not enamoured of it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[perpetual]] | adjective | **1.** Continuing forever or indefinitely.<br>**2.** Uninterrupted in time and indefinitely long continuing. | *"Sir, for a quart d’ecu he will sell the fee-simple of his salvation, the inheritance of it, and cut the entail from all remainders, and a perpetual succession for it perpetually."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perpetually]] | adverb | **1.** Everlastingly; for all time; - stuart chase.<br>**2.** Without interruption. | *"Sir, for a quart d’ecu he will sell the fee-simple of his salvation, the inheritance of it, and cut the entail from all remainders, and a perpetual succession for it perpetually."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perpetuate]] | verb | **1.** Cause to continue or prevail. | *"A busybody despotism may protect the fool, but it thereby helps to perpetuate and multiply his folly; yet if the fool is left alone, he too often is a plague to the wise and the virtuous. § 7. #City growth and the housing problem#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[perpetuation]] | noun | **1.** The act of prolonging something. | *"It is more than possible that this uniformity may be found by experience to be of great importance to the public welfare, both as a security against the perpetuation of the same spirit in the body, and as a cure for the diseases of faction."* — Alexander Hamilton, *The Federalist Papers* |
| [[perpetuity]] | noun | **1.** The property of being perpetual (seemingly ceaseless). | *"Yet am I better Than one that’s sick o’ th’ gout, since he had rather Groan so in perpetuity than be cur’d By th’ sure physician death, who is the key T’ unbar these locks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pet]] | noun | **1.** A domesticated animal kept for companionship or amusement.<br>**2.** A special loved one. | *"Why, my pet of pets, I could have told you that weeks and weeks ago!” To see Ada lift up her flushed face in joyful surprise, and hold me round the neck, and laugh, and cry, and blush, was so pleasant!"* — Charles Dickens, *Bleak House* |
| [[petabit]] | noun | **1.** A unit of information equal to 1000 terabits or 10^15 bits. | *"In academic literature, petabit designates a unit of information equal to 1000 terabits or 10^15 bits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petabyte]] | noun | **1.** A unit of information equal to 1000 terabytes or 10^15 bytes.<br>**2.** A unit of information equal to 1024 tebibytes or 2^50 bytes. | *"In academic literature, petabyte designates a unit of information equal to 1000 terabytes or 10^15 bytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petal]] | noun | **1.** Part of the perianth that is usually brightly colored. | *"Yes—I know that,” she said panting like a robin, her face red and moist from her exertions, like a peony petal before the sun dries off the dew."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[petal-like]] | adjective | **1.** Resembling a petal. | *"In academic literature, petal-like designates resembling a petal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petaled]] | adjective | **1.** (of flowers) having petals. | *"In academic literature, petaled designates (of flowers) having petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petalled]] | adjective | **1.** (of flowers) having petals. | *"Perhaps you will hardly believe it.” Lord Henry smiled, and leaning down, plucked a pink-petalled daisy from the grass and examined it."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[petalless]] | adjective | **1.** (of flowers) having no petals. | *"In academic literature, petalless designates (of flowers) having no petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petallike]] | adjective | **1.** Resembling a petal. | *"In academic literature, petallike designates resembling a petal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petaloid]] | adjective | **1.** Resembling a flower petal. | *"In academic literature, petaloid designates resembling a flower petal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petalous]] | adjective | **1.** (of flowers) having petals. | *"In academic literature, petalous designates (of flowers) having petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petard]] | noun | **1.** An explosive device used to break down a gate or wall. | *"Let it work; For ’tis the sport to have the enginer Hoist with his own petard, and ’t shall go hard But I will delve one yard below their mines And blow them at the moon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petasites]] | noun | **1.** Genus of rhizomatous herbs of north temperate regions: butterbur; sweet coltsfoot. | *"The butter-bur rust (_Coleosporium petasites_, Lev.) and the Campanula rust (_Coleosporium Campanulæ_, Lev.) are found, the former on the leaves of the butter-bur, and the latter on those of the harebell and other _Campanulæ_, less frequently."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[petaurista]] | noun | **1.** Very large asiatic flying squirrels. | *"In academic literature, petaurista designates very large asiatic flying squirrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petauristidae]] | noun | **1.** Old world flying squirrels. | *"In academic literature, petauristidae designates old world flying squirrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petaurus]] | noun | **1.** A genus of phalangeridae. | *"In academic literature, petaurus designates a genus of phalangeridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petchary]] | noun | **1.** A kingbird that breeds in the southeastern united states and winters in tropical america; similar to but larger than the eastern kingbird. | *"In academic literature, petchary designates a kingbird that breeds in the southeastern united states and winters in tropical america; similar to but larger than the eastern kingbird."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petcock]] | noun | **1.** Regulator consisting of a small cock or faucet or valve for letting out air or releasing compression or draining. | *"In academic literature, petcock designates regulator consisting of a small cock or faucet or valve for letting out air or releasing compression or draining."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petechia]] | noun | **1.** A minute red or purple spot on the surface of the skin as the result of tiny hemorrhages of blood vessels in the skin (as in typhoid fever). | *"In academic literature, petechia designates a minute red or purple spot on the surface of the skin as the result of tiny hemorrhages of blood vessels in the skin (as in typhoid fever)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peter]] | noun | **1.** Disciple of jesus and leader of the apostles; regarded by catholics as the vicar of christ on earth and first pope.<br>**2.** Obscene terms for penis. | *"The palace Enter Peter and Petitioners. 1 PETITIONER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[peterburg]] | noun | **1.** A city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia. | *"In academic literature, peterburg designates a city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petersburg]] | noun | **1.** A town in southeastern virginia (south of richmond); scene of heavy fighting during the american civil war.<br>**2.** The final campaign of the american civil war (1864-65); union forces under grant besieged and finally defeated confederate forces under lee. | *"Petersburg, at his own cost, supported several native missionaries in India, and gave liberally to the cause of Christ at home."* — Classic Author, *The wonders of prayer* |
| [[petiole]] | noun | **1.** The slender stem that supports the blade of a leaf. | *"The _Æcidiacei_ are always developed on living plants, sometimes on the flowers, fruit, petioles, or stems, but most commonly on the leaves: occasionally on the upper surface, but generally on the inferior."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[petiolule]] | noun | **1.** The stalk of a leaflet. | *"In academic literature, petiolule designates the stalk of a leaflet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petite]] | noun | **1.** A garment size for short or slender women.<br>**2.** Very small. | *"They say he sold his soul to the devil, and that he walks at times.” She felt the _petite mort_ at this unexpectedly gruesome information, and left the solitary man behind her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[petiteness]] | noun | **1.** The property of being very small in size. | *"In academic literature, petiteness designates the property of being very small in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petitio]] | noun | **1.** The logical fallacy of assuming the conclusion in the premises; begging the question. | *"In academic literature, petitio designates the logical fallacy of assuming the conclusion in the premises; begging the question."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petition]] | noun | **1.** A formal message requesting something that is submitted to an authority.<br>**2.** Reverent petition to a deity. | *"That it will please you To give this poor petition to the king, And aid me with that store of power you have To come into his presence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petitionary]] | adjective | **1.** Of the nature of or expressing a petition. | *"Nay, I prithee now, with most petitionary vehemence, tell me who it is."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petitioner]] | noun | **1.** One praying humbly for something.<br>**2.** Someone who petitions a court for redress of a grievance or recovery of a right. | *"The palace Enter Peter and Petitioners. 1 PETITIONER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petrarca]] | noun | **1.** An italian poet famous for love lyrics (1304-1374). | *"In academic literature, petrarca designates an italian poet famous for love lyrics (1304-1374)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrarch]] | noun | **1.** An italian poet famous for love lyrics (1304-1374). | *"Now is he for the numbers that Petrarch flowed in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petrel]] | noun | **1.** Relatively small long-winged tube-nosed bird that flies far from land. | *"This was as a protection to the hut in the periods of the great gales when all the island was as a tiny petrel in the maw of the hurricane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[petrifaction]] | noun | **1.** The process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape.<br>**2.** A rock created by petrifaction; an organic object infiltrated with mineral matter and preserved in its original form. | *"Shall Man, such step within his endeavor, Man’s face, have no more play and action Than joy which is crystallized forever, Or grief, an eternal petrifaction? -- St. 18. life’s minute: life’s short span. 19."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[petrification]] | noun | **1.** The process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape. | *"In academic literature, petrification designates the process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrify]] | verb | **1.** Cause to become stonelike or stiff or dazed and stunned.<br>**2.** Change into stone. | *"And one thing you can depend on, and that is that this crowd’ll stick to you, and work for you, and f-f-fight for you till they p-p-petrify.” Motu smiled a proud, grateful sort of smile and took Mark’s hand."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[petrifying]] | verb | **1.** Cause to become stonelike or stiff or dazed and stunned.<br>**2.** Change into stone. | *"It was a petrifying thing to see Charmion break down."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[petrissage]] | noun | **1.** Massage of the skin which is gently lifted and squeezed. | *"In academic literature, petrissage designates massage of the skin which is gently lifted and squeezed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrochemical]] | noun | **1.** Any compound obtained from petroleum or natural gas. | *"In academic literature, petrochemical designates any compound obtained from petroleum or natural gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrocoptis]] | noun | **1.** Perennial tussock-forming rock plants; of pyrenees and mountains of northern spain; similar to and sometimes placed in genus lychnis. | *"In academic literature, petrocoptis designates perennial tussock-forming rock plants; of pyrenees and mountains of northern spain; similar to and sometimes placed in genus lychnis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrogale]] | noun | **1.** Rock wallabies. | *"In academic literature, petrogale designates rock wallabies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petroglyph]] | noun | **1.** A carving or line drawing on rock (especially one made by prehistoric people). | *"In academic literature, petroglyph designates a carving or line drawing on rock (especially one made by prehistoric people)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrograd]] | noun | **1.** A city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia. | *"In academic literature, petrograd designates a city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrol]] | noun | **1.** A volatile flammable mixture of hydrocarbons (hexane and heptane and octane etc.) derived from petroleum; used mainly as a fuel in internal-combustion engines. | *"Between 70 deg. and 120 deg. petroleum ether and petroleum naphtha are produced, and they together constitute what is commonly called petrol."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[petrolatum]] | noun | **1.** A semisolid mixture of hydrocarbons obtained from petroleum; used in medicinal ointments and for lubrication. | *"In academic literature, petrolatum designates a semisolid mixture of hydrocarbons obtained from petroleum; used in medicinal ointments and for lubrication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petroleum]] | noun | **1.** A dark oil consisting mainly of hydrocarbons. | *"Petroleum and natural gas, of which our original reservoirs were perhaps the richest in the world, are being rapidly exhausted."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[petrology]] | noun | **1.** The branch of geology that studies rocks: their origin and formation and mineral composition and classification. | *"In academic literature, petrology designates the branch of geology that studies rocks: their origin and formation and mineral composition and classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzon]] | noun | **1.** Typical lampreys. | *"In academic literature, petromyzon designates typical lampreys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzoniformes]] | noun | **1.** Lampreys as distinguished from hagfishes. | *"In academic literature, petromyzoniformes designates lampreys as distinguished from hagfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzontidae]] | noun | **1.** Lampreys. | *"Classical and authoritative lexicons catalog petromyzontidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petronius]] | noun | **1.** Roman satirist (died in 66). | *"Oldenberg, Part ii. (Oxford, 1892) p. 218 (_Sacred Books of the East_, vol. xxx.). [251] Petronius, _Sat._ 48; Pausanias, x. 12: 8; Justin Martyr, _Cohort ad Graecos_, 37, p. 34 c (ed. 1742)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[petroselinum]] | noun | **1.** Parsley. | *"Classical and authoritative lexicons catalog petroselinum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrous]] | adjective | **1.** (of bone especially the temporal bone) resembling stone in hardness. | *"In academic literature, petrous designates (of bone especially the temporal bone) resembling stone in hardness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petter]] | noun | **1.** A lover who gently fondles and caresses the loved one. | *"It is petter that friends is the sword, and end it; and there is also another device in my prain, which peradventure prings goot discretions with it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petteria]] | noun | **1.** One species: dalmatian laburnum. | *"In academic literature, petteria designates one species: dalmatian laburnum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petticoat]] | noun | **1.** Undergarment worn under a skirt. | *"This grief is crowned with consolation; your old smock brings forth a new petticoat: and indeed the tears live in an onion that should water this sorrow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petticoated]] | adjective | **1.** Wearing or furnished with a petticoat. | *"There was a great deal of talk among the neighbors, particularly the petticoated ones, about what they called the witchcraft of Maule’s eye."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[pettifog]] | verb | **1.** Argue over petty things. | *"In academic literature, pettifog designates argue over petty things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pettifogger]] | noun | **1.** A person (especially a lawyer or politician) who uses unscrupulous or unethical methods.<br>**2.** A disputant who quibbles; someone who raises annoying petty objections. | *"The justice had been a pettifogger, and was a sycophant to a nobleman in the neighbourhood, who had a post at court."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[pettifoggery]] | noun | **1.** A quarrel about petty points. | *"In academic literature, pettifoggery designates a quarrel about petty points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pettily]] | adverb | **1.** In a petty way. | *"In academic literature, pettily designates in a petty way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pettiness]] | noun | **1.** Narrowness of mind or ideas or views.<br>**2.** The quality of being unimportant and petty or frivolous. | *"But there was a branch house at the west end, and no pettiness or dinginess to give suggestions of shame."* — George Eliot, *Middlemarch* |
| [[petting]] | noun | **1.** Affectionate play (or foreplay without contact with the genital organs).<br>**2.** Stroke or caress gently. | *"Kenge, looking over his glasses at me and softly turning the case about and about as if he were petting something."* — Charles Dickens, *Bleak House* |
| [[pettish]] | adjective | **1.** Easily irritated or annoyed. | *"French, shortly, and turned from him with a pettish movement to open the oven door."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[pettishly]] | adverb | **1.** In a petulant manner. | *"Joe,” I interrupted, pettishly, “how can you call me, sir?” Joe looked at me for a single instant with something faintly like reproach."* — Charles Dickens, *Great Expectations* |
| [[pettishness]] | noun | **1.** A disposition to exhibit uncontrolled anger. | *"Bid him therefore consider of his ransom; which must proportion the losses we have borne, the subjects we have lost, the disgrace we have digested; which in weight to re-answer, his pettishness would bow under."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petty]] | noun | **1.** Larceny of property having a value less than some amount (the amount varies by locale).<br>**2.** Inferior in rank or status. | *"If thou wilt leave me, do not leave me last, When other petty griefs have done their spite, But in the onset come, so shall I taste At first the very worst of fortune’s might."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petulance]] | noun | **1.** An irritable petulant feeling. | *"It was gratitude;--gratitude, not merely for having once loved her, but for loving her still well enough to forgive all the petulance and acrimony of her manner in rejecting him, and all the unjust accusations accompanying her rejection."* — Jane Austen, *Pride and Prejudice* |
| [[petulant]] | adjective | **1.** Easily irritated or annoyed. | *"The petulant threat of some, that in the event of Disestablishment they would abandon Presbyterianism, he absolutely declined to notice."* — John Cairns, *Principal Cairns* |
| [[petulantly]] | adverb | **1.** In a petulant manner. | *"The Poet’s Reply To The Threat Of A Censorious Critic My imprudent lines were answered, very petulantly, by somebody, I believe, a Rev."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[petunia]] | noun | **1.** Any of numerous tropical herbs having fluted funnel-shaped flowers.<br>**2.** Annual or perennial herbs or shrubs of tropical south america. | *"Make your 'beesence to Miss Evelina, Lucy Petunia," he commanded."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[repetition]] | noun | **1.** An event that repeats.<br>**2.** The act of doing or performing again. | *"Well, call him hither; We are reconcil’d, and the first view shall kill All repetition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repetitious]] | adjective | **1.** Characterized by repetition. | *"In academic literature, repetitious designates characterized by repetition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repetitiousness]] | noun | **1.** Verboseness resulting from excessive repetitions. | *"In academic literature, repetitiousness designates verboseness resulting from excessive repetitions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repetitive]] | adjective | **1.** Repetitive and persistent.<br>**2.** Characterized by repetition. | *"Is that what's been sending out a repetitive message that's well over two hundred years old?"* — H. B. Fyfe, *Calling World-4 of Kithgol* |
| [[repetitively]] | adverb | **1.** In a repetitive manner. | *"In academic literature, repetitively designates in a repetitive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repetitiveness]] | noun | **1.** Verboseness resulting from excessive repetitions. | *"In academic literature, repetitiveness designates verboseness resulting from excessive repetitions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetising]] | adjective | **1.** Not appetizing in appearance, aroma, or taste. | *"In academic literature, unappetising designates not appetizing in appearance, aroma, or taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetisingness]] | noun | **1.** The property of spoiling the appetite. | *"In academic literature, unappetisingness designates the property of spoiling the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetizing]] | adjective | **1.** Not appetizing in appearance, aroma, or taste. | *"In academic literature, unappetizing designates not appetizing in appearance, aroma, or taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetizingness]] | noun | **1.** The property of spoiling the appetite. | *"In academic literature, unappetizingness designates the property of spoiling the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncompetitive]] | adjective | **1.** Not inclined to compete. | *"In academic literature, uncompetitive designates not inclined to compete."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Asking & Seeking]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PET
  </div>
</div>
