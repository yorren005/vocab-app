---
status: unread
type: root_dashboard
---
# Dashboard — class
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">class-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“class or division”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **class** means class or division. It refers to an orderly group, category, or division of people or things. In English, this root forms words such as *classic*, *classicism*, *classicist*, and *classification*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: class or division
> The root **class** means class or division. It refers to an orderly group, category, or division of people or things. In English, this root forms words such as *classic*, *classicism*, *classicist*, and *classification*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Class or division</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *classic* and *classicism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **class** comes from a Latin word that means *"class or division"*.
  - At its core, it describes class or division.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **class** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of class or division.
  - **Mental & Social**: How people experience, organize, or communicate about class or division.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Classic**: Judged over a period of time to be of the highest quality and outstanding of its kind.
  - **Classicism**: The following of ancient Greek or Roman principles and style in art and literature, generally associated with harmony, restraint, and proportion.
  - **Classicist**: A person who studies or is an expert in ancient Greek and Latin language, literature, history, or archaeology.
  - **Classification**: The action or process of classifying something according to shared qualities or characteristics.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">class</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **class** generates vocabulary through verbal affixation, nominalization, and compounding:
> - **Nominal Base & Adjectives:**
>   - *classis* $	o$ Old French *classe* $	o$ *class* ("group sharing attributes; school group; social rank").
>   - *classicus* $	o$ *classic* ("of the first rank; authoritative exemplar") and *classical* ("relating to ancient Greek and Roman antiquity or traditional art").
> - **Verbal Factitives with *-fy* (*-ficāre*):**
>   - *classis* + *-ficāre* $	o$ French *classifier* $	o$ *classify* ("to arrange systematically in categories").
>   - *classify* + *-ation* $	o$ *classification* ("the action or process of classifying").
>   - *class* + *-ify* + *-ed* $	o$ *classified* ("arranged in classes; restricted for state security").
> - **Prefix Modifications:**
>   - *de-* ("reversal") + *classify* $	o$ *declassify*, *declassification* ("to remove from security restrictions").
>   - *re-* ("again") + *classify* $	o$ *reclassify*, *reclassification* ("to categorize under a new heading").
>   - *out-* ("surpassing") + *class* $	o$ *outclass* ("to surpass overwhelmingly in skill or quality").
> - **Social & Cultural Derivatives:**
>   - *class* + *-ism* $	o$ *classicism* ("imitation of classical Greek and Roman style").
>   - *class* + *-ist* $	o$ *classicist* ("a scholar of classical antiquity").
>   - *class* + *-less* $	o$ *classless* ("free of socioeconomic stratifications").

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
> - **Pedagogy & Education:** *class*, *classmate*, *classroom* (a cohort of learners progressing through structured curriculum).
> - **Aesthetics & Humanities:** *classic*, *classical*, *classicism*, *classicist* (Greco-Roman antiquity, timeless artistic perfection, orchestral music).
> - **Information Science & Security:** *classified*, *classify*, *declassify* (categorizing intelligence data according to state sensitivity).
> - **Biological Taxonomy & Logic:** *classification*, *class* (the taxonomic rank below phylum and above order, e.g., Mammalia).
> - **Social Stratification & Economics:** *classless*, *underclass*, *upperclass* (socioeconomic hierarchies, property distribution).
> - **Athletics & Competition:** *outclass* (demonstrating incontestable superiority).

---

## 🔀 4. Prefix & Combining Dynamics on class

### Prefix & Suffix Matrix

| Affix | Form | Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `de-` (reversal) | Prefix | **[[declassify]]** | To officially remove government secrets from restricted classification tiers. |
| `re-` (again) | Prefix | **reclassify** | To re-assign a person, object, or file to an entirely new category. |
| `out-` (surpass) | Prefix | **[[outclass]]** | To defeat decisively by virtue of vastly superior quality or skill. |
| `-ic` (pertaining to) | Suffix | **[[classic]]** | Representing an exemplary, definitive standard of supreme quality. |
| `-ical` (extended adj.) | Suffix | **[[classical]]** | Pertaining to ancient Greek and Latin culture or formal Western art music. |
| `-ify` (factitive verb) | Suffix | **[[classify]]** | To systematically assign into classes or groups according to shared attributes. |
| `-less` (privative) | Suffix | **classless** | Characterized by the absence of socioeconomic divisions or caste systems. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Classical Philology & Art History** | *classic*, *classical*, *classicism* | Studying Homeric epics, Roman jurisprudence, Doric architecture, and neoclassical painting. |
| 🧬 **Biological Taxonomy & Systematics** | *class*, *classification* | Linnaean hierarchy grouping orders into classes (e.g., Class Mammalia, Class Aves). |
| 🛡️ **Intelligence & Defense Governance** | *classified*, *declassify*, *declassification* | Guarding confidential military intelligence under Top Secret classifications. |
| 📊 **Data Science & Machine Learning** | *classification*, *classifier* | Supervised learning algorithms sorting datasets into discrete discrete target classes. |
| 🏫 **Sociology & Political Economy** | *classless*, *underclass*, *outclass* | Marxist analysis of the proletariat vs. bourgeoisie, studying social mobility across demographic strata. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[class]] | noun | **1.** A collection of things sharing a common attribute.<br>**2.** A body of students who are taught together. | *"Then the teacher said that all the pupils of the class--" "Shall I too, shall I, too?" Mäzli urged."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[classic]] | noun | **1.** A creation of the highest excellence.<br>**2.** An artist who has created classic works. | *"For many years the author was known almost entirely for her Alpine classic, "Heidi"."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[classical]] | noun | **1.** Traditional genre of music conforming to an established form and appealing to critical interest and developed musical taste.<br>**2.** Of or relating to the most highly developed stage of an earlier civilisation and its culture. | *"She was a sort of celestial person, who owed her being to poetry—one of those classical divinities Clare was accustomed to talk to her about when they took their walks together."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[classicalism]] | noun | **1.** A movement in literature and art during the 17th and 18th centuries in europe that favored rationality and restraint and strict forms. | *"In academic literature, classicalism designates a movement in literature and art during the 17th and 18th centuries in europe that favored rationality and restraint and strict forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classically]] | adverb | **1.** In the manner of greek and roman culture. | *"Now, as you are to have them anyway, I want to have the whole town entertain the whole Commission and Bolivar with what is classically called among us a barbecue-rally, the countryside to be invited."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[classicise]] | verb | **1.** Make classic or classical. | *"In academic literature, classicise designates make classic or classical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classicism]] | noun | **1.** A movement in literature and art during the 17th and 18th centuries in europe that favored rationality and restraint and strict forms. | *"In academic literature, classicism designates a movement in literature and art during the 17th and 18th centuries in europe that favored rationality and restraint and strict forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classicist]] | noun | **1.** An artistic person who adheres to classicism.<br>**2.** A student of ancient greek and latin. | *"In academic literature, classicist designates an artistic person who adheres to classicism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classicistic]] | adjective | **1.** Of or relating to classicism. | *"In academic literature, classicistic designates of or relating to classicism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classicize]] | verb | **1.** Make classic or classical. | *"In academic literature, classicize designates make classic or classical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classics]] | noun | **1.** Study of the literary works of ancient greece and rome.<br>**2.** A creation of the highest excellence. | *"And the Gryphon never learnt it.” “Hadn’t time,” said the Gryphon: “I went to the Classics master, though."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[classifiable]] | adjective | **1.** Capable of being classified. | *"In academic literature, classifiable designates capable of being classified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classification]] | noun | **1.** The act of distributing things into classes or categories of the same type.<br>**2.** A group of people or things arranged by class or category. | *"The working out of the many minor problems of classification, assessment, and administration, of unemployment insurance, will require many more years of experimentation. § 13. #Need of ideals in social insurance#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[classificatory]] | adjective | **1.** Relating to or involving classification:. | *"In academic literature, classificatory designates relating to or involving classification:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classified]] | noun | **1.** A short ad in a newspaper or magazine (usually in small print) and appearing along with other ads of the same type.<br>**2.** Arrange or order by classes or categories. | *"And, discarding the traditional division of the Evidences into Internal and External, he classified them according to their relation to the different Attributes of God, as manifesting His Power, Knowledge, Wisdom, Holiness, and Benignity."* — John Cairns, *Principal Cairns* |
| [[classifier]] | noun | **1.** A person who creates classifications.<br>**2.** A word or morpheme used in some languages in certain contexts (such as counting) to indicate the semantic class to which the counted item belongs. | *"In academic literature, classifier designates a person who creates classifications."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classify]] | verb | **1.** Arrange or order by classes or categories.<br>**2.** Declare unavailable, as for security reasons. | *"We may classify the records of the Christian exploration roughly in three groups."* — T. R. Glover, *The Jesus of History* |
| [[classless]] | adjective | **1.** Favoring social equality. | *"In academic literature, classless designates favoring social equality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[classmate]] | noun | **1.** An acquaintance that you go to school with. | *"A classmate preceding me at the office had brought it."* — Classic Author, *The wonders of prayer* |
| [[classroom]] | noun | **1.** A room in a school where lessons take place. | *"His manner," says one who heard these lectures, "was quite different in the Church History classroom from what it was in that of Systematic Theology."* — John Cairns, *Principal Cairns* |
| [[classy]] | adjective | **1.** Elegant and fashionable; ; ; ; - julia child. | *"In academic literature, classy designates elegant and fashionable; ; ; ; - julia child."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassification]] | noun | **1.** Reduction or removal by the government of restrictions on a classified document or weapon. | *"In academic literature, declassification designates reduction or removal by the government of restrictions on a classified document or weapon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassified]] | verb | **1.** Lift the restriction on and make available again.<br>**2.** Having had security classification removed. | *"In academic literature, declassified designates lift the restriction on and make available again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassify]] | verb | **1.** Lift the restriction on and make available again. | *"In academic literature, declassify designates lift the restriction on and make available again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonclassical]] | adjective | **1.** Not classical. | *"In academic literature, nonclassical designates not classical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[outclass]] | verb | **1.** Cause to appear in a lower class. | *"We hoped the pirates all were dead, Those horrid buccaneers, Who dyed the ocean's waves with red, In wicked bygone years: But now we mourn, as happy days, That sanguinary past, Since Kaiser Bill a hundred ways, Has Captain Kidd outclassed."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[outclassed]] | verb | **1.** Cause to appear in a lower class.<br>**2.** Decisively surpassed by something else so as to appear to be of a lower class. | *"We hoped the pirates all were dead, Those horrid buccaneers, Who dyed the ocean's waves with red, In wicked bygone years: But now we mourn, as happy days, That sanguinary past, Since Kaiser Bill a hundred ways, Has Captain Kidd outclassed."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[reclassification]] | noun | **1.** Classifying something again (usually in a new category). | *"In academic literature, reclassification designates classifying something again (usually in a new category)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reclassify]] | verb | **1.** Classify anew, change the previous classification. | *"In academic literature, reclassify designates classify anew, change the previous classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subclass]] | noun | **1.** (biology) a taxonomic category below a class and above an order. | *"In academic literature, subclass designates (biology) a taxonomic category below a class and above an order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superclass]] | noun | **1.** (biology) a taxonomic class below a phylum and above a class. | *"In academic literature, superclass designates (biology) a taxonomic class below a phylum and above a class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unclassifiable]] | adjective | **1.** Not possible to classify. | *"In academic literature, unclassifiable designates not possible to classify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unclassified]] | adjective | **1.** Not subject to a security classification.<br>**2.** Not arranged in any specific grouping. | *"In academic literature, unclassified designates not subject to a security classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclass]] | noun | **1.** The social class lowest in the social hierarchy.<br>**2.** Belonging to the lowest and least privileged social stratum. | *"In academic literature, underclass designates the social class lowest in the social hierarchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclassman]] | noun | **1.** An undergraduate who is not yet a senior. | *"In academic literature, underclassman designates an undergraduate who is not yet a senior."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CLASS
  </div>
</div>
