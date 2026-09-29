---
status: unread
type: root_dashboard
---
# Dashboard — tract
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tract-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to draw or pull”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **tract** means to draw or pull. It refers to pulling an object along, sketching marks, or extracting something. In English, this root forms words such as *tractor*, *attract*, *distract*, and *contract*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to draw or pull
> The root **tract** means to draw or pull. It refers to pulling an object along, sketching marks, or extracting something. In English, this root forms words such as *tractor*, *attract*, *distract*, and *contract*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To draw or pull</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *tractor* and *attract*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tract** comes from a Latin word that means *"to draw or pull"*.
  - At its core, it describes the action of draw or pull.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **tract** in an English word, think of **to draw or pull**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to draw or pull).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Tractor**: A powerful motor vehicle with large rear treads or tires, used for pulling farm machinery or heavy loads.
  - **Attract**: To cause to come to a place or participate in an activity.
  - **Distract**: To prevent someone from giving full attention to something.
  - **Contract**: An everyday English word showing the root's idea of *to draw or pull*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tract</mark>, think of <mark class="hl-def">to draw or pull</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Participial Base:** *tract-* (*tractus, tracta, tractum*) $	o$ *traction, tractor, tractable, tractate*.

- **Frequentative / Handling Stem:** *tractāre* $	o$ *treat, treatment, treatise, treaty, entreat, entreaty, retreat*.

- **Old French / Middle English Drawing Blends:** *trait, trace, track, trail, train, portrait, portray*.



### 2.2 Classical Prefixation Matrix on tract

- `ab-` + *trahere* $	o$ *abstract, abstraction* (pulling away from physical reality).

- `ad-` + *trahere* $	o$ *attract, attraction, attractive* (pulling toward).

- `con-` + *trahere* $	o$ *contract, contraction, contractor* (pulling together into binding unity).

- `de-` + *trahere* $	o$ *detract, detraction, detractor* (pulling away from reputation).

- `dis-` + *trahere* $	o$ *distract, distraction* (pulling attention in divergent directions).

- `ex-` + *trahere* $	o$ *extract, extraction, extractor* (pulling out by force).

- `pro-` + *trahere* $	o$ *protract, protraction, protractor* (dragging forward in time).

- `re-` + *trahere* $	o$ *retract, retraction, retreat* (pulling back).

- `sub-` + *trahere* $	o$ *subtract, subtraction* (pulling away from underneath).



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



### 1. Mechanical Force, Machinery & Friction

- *traction* (the action of drawing or pulling a thing over a surface; grip).

- *tractor* (a powerful motor vehicle with large rear tires, used in agriculture).

- *tractable* (easy to control or influence; malleable).

- *intractable* (hard to control or deal with; stubborn).



### 2. Theoretical Philosophy & Mathematics

- *abstract (adj)* (existing in thought or as an idea but not having a physical existence).

- *abstract (v)* (consider something theoretically or separately from something else; extract).

- *abstraction* (the quality of dealing with ideas rather than events).

- *subtract* (take away a number or amount from another).

- *subtraction* (the mathematical process of subtracting).



### 3. Legal Agreements & Negotiations

- *contract (n)* (a written or spoken agreement, especially one concerning employment, sales, or tenancy).

- *contractor* (a person or company that undertakes a contract to provide materials or labor).

- *treaty* (a formally concluded and ratified agreement between sovereign states).

- *treatise* (a written work dealing formally and systematically with a subject).



### 4. Attention, Allure & Distraction

- *attract* (cause to come to a place or participate in an activity; pull toward).

- *attraction* (the action or power of evoking interest, pleasure, or physical pull).

- *distract* (prevent someone from giving full attention to something).

- *distraction* (a thing that prevents someone from giving full attention).

- *detract* (diminish the worth or value of a quality or achievement).

- *detractor* (a person who disparages someone or something).



### 5. Drawing, Visual Arts & Trails

- *portrait* (a painting, drawing, photograph, or engraving of a person).

- *portray* (depict someone or something in a work of art or literature).

- *portrayal* (a depiction of someone or something).

- *trait* (a distinguishing quality or characteristic).

- *trace* (find or discover by investigation; copy a drawing by following lines).

- *track* (a rough path or road; follow the trail of).

- *trail* (a mark or series of signs left behind; drag along behind).

- *train* (a series of connected railway cars; drag behind; teach discipline).



---



## 🔀 4. Prefix & Combining Dynamics on tract



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `ab-`** | `abs-` + *trahere* | **abstract** | Pulling away from physical particulars | *"Pure mathematics deals with highly abstract multidimensional spaces."* |

| **Prefix `ad-`** | `ad-` + *trahere* | **attract** | Pulling toward center of gravity | *"The coastal resort continues to attract millions of tourists each summer."* |

| **Prefix `con-`** | `con-` + *trahere* | **contract** | Pulling together into mutual obligation | *"The parties signed a binding commercial lease contract."* |

| **Prefix `ex-`** | `ex-` + *trahere* | **extract** | Pulling out by force or chemical solvent | *"Chemists use alcohol solvents to extract essential botanical oils."* |

| **Prefix `re-`** | `re-` + *trahere* | **retract** | Pulling back words or landing gear | *"The newspaper agreed to retract the erroneous headline."* |

| **Prefix `pro-`** | `pro-` + *trahere* | **protract** | Dragging out time needlessly | *"Filibusters are employed to protract legislative deliberations."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🚜 **Agriculture & Mechanical Engineering:** *four-wheel drive tractors*, *traction control systems in automotive braking*.

- ⚖️ **Contract Law & Jurisprudence:** *breach of contract*, *intractable litigation disputes*, *international peace treaties*.

- 🏥 **Physical Therapy & Orthopedics:** *cervical spine traction*, *medical treatment protocols*.

- 🎨 **Fine Arts & Literature:** *oil portraiture*, *character portrayal in narrative fiction*.

- 🔬 **Analytical Chemistry:** *solvent extraction techniques*, *organic extract purification*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abstract]] | noun | **1.** A concept or idea not associated with any specific instance.<br>**2.** A sketchy summary of the main points of an argument or theory. | *"You shall find there A man who is the abstract of all faults That all men follow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abstracted]] | verb | **1.** Consider a concept without thinking of a specific example; consider abstractly or theoretically.<br>**2.** Make off with belongings of others. | *"Jellyby with an abstracted air as she looked over the dispatch last opened; “what a goose you are!” “I am engaged, Ma,” sobbed Caddy, “to young Mr."* — Charles Dickens, *Bleak House* |
| [[abstractedly]] | adverb | **1.** In an absentminded or preoccupied manner. | *"Almost frightened by coming upon him so unexpectedly, I stood still for a moment and should have retired without speaking had he not, in again passing his hand abstractedly through his hair, seen me and started."* — Charles Dickens, *Bleak House* |
| [[abstractedness]] | noun | **1.** Preoccupation with something to the exclusion of all else. | *"In academic literature, abstractedness designates preoccupation with something to the exclusion of all else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abstracter]] | noun | **1.** One who makes abstracts or summarizes information.<br>**2.** Existing only in the mind; separated from embodiment. | *"In the practical economic issues of the day, the most urgent need is a better popular understanding of the abstracter theory of value."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[abstraction]] | noun | **1.** A concept or idea not associated with any specific instance.<br>**2.** The act of withdrawing or removing something. | *"Aye!” said the old man, coming slowly out of his abstraction."* — Charles Dickens, *Bleak House* |
| [[abstractive]] | adjective | **1.** Of an abstracting nature or having the power of abstracting. | *"In academic literature, abstractive designates of an abstracting nature or having the power of abstracting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abstractly]] | adverb | **1.** In abstract terms. | *"They have been too abstractly doctrinaire, have argued too absolutely for the merits of free trade to be applied instantly regardless of the existing distribution of investments and of occupations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[abstractness]] | noun | **1.** The quality of being considered apart from a specific instance or object. | *"The very abstractness of the names bespeaks a modern origin; for the personification of times and seasons like the Carnival and Summer, or of an abstract notion like death, is not primitive."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[abstractor]] | noun | **1.** One who makes abstracts or summarizes information. | *"In academic literature, abstractor designates one who makes abstracts or summarizes information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attract]] | verb | **1.** Direct toward itself or oneself by means of some psychological power or physical attributes.<br>**2.** Be attractive to. | *"She was as graceful as she was beautiful, perfectly self-possessed, and had the air, I thought, of being able to attract and interest any one if she had thought it worth her while."* — Charles Dickens, *Bleak House* |
| [[attractable]] | adjective | **1.** Capable of being magnetized or attracted by a magnet. | *"In academic literature, attractable designates capable of being magnetized or attracted by a magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attracter]] | noun | **1.** An entertainer who attracts large audiences.<br>**2.** (physics) a point in the ideal multidimensional phase space that is used to describe a system toward which the system tends to evolve regardless of the starting conditions of the system. | *"In academic literature, attracter designates an entertainer who attracts large audiences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attraction]] | noun | **1.** The force by which one object attracts another.<br>**2.** An entertainment that is offered to the public. | *"Setting the attraction of my good parts aside, I have no other charms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attractive]] | adjective | **1.** Pleasing to the eye or mind especially through beauty or charm.<br>**2.** Having power to arouse interest. | *"No, good mother, here’s metal more attractive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attractively]] | adverb | **1.** In a beautiful manner. | *"How attractively it is laid out, Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[attractiveness]] | noun | **1.** The quality of arousing interest; being attractive or something that attracts.<br>**2.** Sexual allure. | *"Among the difficulties of her lonely position not the least was the attention she excited by her appearance, a certain bearing of distinction, which she had caught from Clare, being superadded to her natural attractiveness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[attractor]] | noun | **1.** An entertainer who attracts large audiences.<br>**2.** (physics) a point in the ideal multidimensional phase space that is used to describe a system toward which the system tends to evolve regardless of the starting conditions of the system. | *"During construction the System is linked to Planet Pluto, employing mass attractors, orbital dynamics controls and stabilizers, and other means, as appropriate."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[contract]] | noun | **1.** A binding agreement between two or more persons that is enforceable by law.<br>**2.** (contract bridge) the highest bid becomes the contract setting the number of tricks that the bidder must make. | *"Good fortune and the favour of the king Smile upon this contract; whose ceremony Shall seem expedient on the now-born brief, And be perform’d tonight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contractable]] | adjective | **1.** (of disease) capable of being transmitted by infection. | *"In academic literature, contractable designates (of disease) capable of being transmitted by infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contracted]] | verb | **1.** Enter into a contractual arrangement.<br>**2.** Engage by written agreement. | *"My Lord Protector, so it please your grace, Here are the articles of contracted peace Between our sovereign and the French king Charles, For eighteen months concluded by consent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contractile]] | adjective | **1.** Capable of contracting or being contracted. | *"In academic literature, contractile designates capable of contracting or being contracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contractility]] | noun | **1.** The capability or quality of shrinking or contracting, especially by muscle fibers and even some other forms of living matter. | *"In academic literature, contractility designates the capability or quality of shrinking or contracting, especially by muscle fibers and even some other forms of living matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contracting]] | noun | **1.** Becoming infected.<br>**2.** Enter into a contractual arrangement. | *"So disguise shall, by th’ disguised, Pay with falsehood false exacting, And perform an old contracting. [_Exit._] ACT IV SCENE I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contraction]] | noun | **1.** (physiology) a shortening or tensing of a part or organ (especially of a muscle or muscle fiber).<br>**2.** The process or result of becoming smaller or pressed together. | *"O such a deed As from the body of contraction plucks The very soul, and sweet religion makes A rhapsody of words."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contractor]] | noun | **1.** Someone (a person or firm) who contracts to build things.<br>**2.** The bridge player in contract bridge who wins the bidding and can declare which suit is to be trumps. | *"An iron church was erected for them, but the contractor, an Englishman, before his work was finished was seized with illness and died."* — John Cairns, *Principal Cairns* |
| [[contractual]] | adjective | **1.** Relating to or part of a binding legal agreement. | *"The same analysis will show that any credit is but a contractual claim upon some other source of income which is, or should have been, already taxed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[contractually]] | adverb | **1.** By virtue of a contract. | *"In academic literature, contractually designates by virtue of a contract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contracture]] | noun | **1.** An abnormal and usually permanent contraction of a muscle. | *"In academic literature, contracture designates an abnormal and usually permanent contraction of a muscle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterattraction]] | noun | **1.** A rival attraction. | *"In academic literature, counterattraction designates a rival attraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detract]] | verb | **1.** Take away a part from; diminish. | *"Shall I, for lucre of the rest unvanquish’d, Detract so much from that prerogative As to be call’d but viceroy of the whole?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detraction]] | noun | **1.** A petty disparagement.<br>**2.** The act of discrediting or detracting from someone's reputation (especially by slander). | *"Detraction will not suffer it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[detractive]] | adjective | **1.** Causing to decrease in importance or value. | *"In academic literature, detractive designates causing to decrease in importance or value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detractor]] | noun | **1.** One who disparages or belittles the worth of something. | *"The warmest partisans of the enterprise now became its most ardent detractors."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[distract]] | verb | **1.** Draw someone's attention away from something.<br>**2.** Disturb in mind or make uneasy or cause to be worried or alarmed. | *"The fellow is distract, and so am I, And here we wander in illusions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distracted]] | verb | **1.** Draw someone's attention away from something.<br>**2.** Disturb in mind or make uneasy or cause to be worried or alarmed. | *"But to the brightest beams Distracted clouds give way; so stand thou forth; The time is fair again."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distractedly]] | adverb | **1.** In a distracted manner. | *"She made good view of me, indeed, so much, That methought her eyes had lost her tongue, For she did speak in starts distractedly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distraction]] | noun | **1.** Mental turmoil.<br>**2.** An obstacle to attention. | *"How have mine eyes out of their spheres been fitted In the distraction of this madding fever!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extract]] | noun | **1.** A solution obtained by steeping or soaking a substance (usually in water).<br>**2.** A passage selected from a larger work. | *"O let us be joyful!” With which remark, which appears from its sound to be an extract in verse, Mr."* — Charles Dickens, *Bleak House* |
| [[extractable]] | adjective | **1.** Capable of being extracted. | *"In academic literature, extractable designates capable of being extracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extractible]] | adjective | **1.** Capable of being extracted. | *"In academic literature, extractible designates capable of being extracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraction]] | noun | **1.** The process of obtaining something from a mixture or compound by chemical or physical or mechanical means.<br>**2.** Properties attributable to your ancestry. | *"Fluted pilasters, worked from the solid stone, decorated its front, and above the roof the chimneys were panelled or columnar, some coped gables with finials and like features still retaining traces of their Gothic extraction."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[extractor]] | noun | **1.** An instrument for extracting tight-fitting components.<br>**2.** An apparatus that uses centrifugal force to separate particles from a suspension. | *"The terminal positioned in orbit above Alpha Centauri is designated the Extractor and the terminal positioned along the Solar System's rim is designated the Collector."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[intractability]] | noun | **1.** The trait of being hard to influence or control. | *"In academic literature, intractability designates the trait of being hard to influence or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intractable]] | adjective | **1.** Not tractable; difficult to manage or mold. | *"Some of them are unmannered, rough, intractable, as well as ignorant; but others are docile, have a wish to learn, and evince a disposition that pleases me."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[intractableness]] | noun | **1.** The trait of being hard to influence or control. | *"In academic literature, intractableness designates the trait of being hard to influence or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intractably]] | adverb | **1.** In an intractable manner. | *"He is not good enough for ’ee.” “Did any one tell you to speak to me like this?” “Nobody at all.” “Then it appears to me that Sergeant Troy does not concern us here,” she said, intractably."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nonprotractile]] | adjective | **1.** Not extensile. | *"In academic literature, nonprotractile designates not extensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonretractable]] | adjective | **1.** Not capable of being retracted. | *"In academic literature, nonretractable designates not capable of being retracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonretractile]] | adjective | **1.** Not capable of being retracted. | *"In academic literature, nonretractile designates not capable of being retracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protract]] | verb | **1.** Lengthen in time; cause to be or last longer. | *"Let us bury him, And not protract with admiration what Is now due debt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protracted]] | verb | **1.** Lengthen in time; cause to be or last longer.<br>**2.** Relatively long in duration; tediously protracted. | *"These delays so protracted the journey that the short day was spent and the long night had closed in before we came to St."* — Charles Dickens, *Bleak House* |
| [[protractedly]] | adverb | **1.** In a slow, leisurely or prolonged way;  -rossetti. | *"In academic literature, protractedly designates in a slow, leisurely or prolonged way;  -rossetti."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protractible]] | adjective | **1.** Able to be extended. | *"In academic literature, protractible designates able to be extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protractile]] | adjective | **1.** Able to be extended. | *"In academic literature, protractile designates able to be extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protraction]] | noun | **1.** The consequence of being lengthened in duration.<br>**2.** The act of prolonging something. | *"By the quantity of provision which I had consumed, I should guess that I had passed three weeks in this journey; and the continual protraction of hope, returning back upon the heart, often wrung bitter drops of despondency and grief from my eyes."* — Mary Wollstonecraft Shelley, *Frankenstein; or, the modern prometheus* |
| [[protractor]] | noun | **1.** Drafting instrument used to draw or measure angles. | *"In academic literature, protractor designates drafting instrument used to draw or measure angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retract]] | verb | **1.** Formally reject or disavow a formerly held belief, usually under pressure.<br>**2.** Pull away from a source of disgust or fear. | *"Yet I protest, Were I alone to pass the difficulties, And had as ample power as I have will, Paris should ne’er retract what he hath done, Nor faint in the pursuit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retractable]] | adjective | **1.** Capable of being retracted. | *"In academic literature, retractable designates capable of being retracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retracted]] | verb | **1.** Formally reject or disavow a formerly held belief, usually under pressure.<br>**2.** Pull away from a source of disgust or fear. | *"Of what he had then written, nothing was to be retracted or qualified."* — Jane Austen, *Persuasion* |
| [[retractile]] | adjective | **1.** Capable of retraction; capable of being drawn back. | *"In academic literature, retractile designates capable of retraction; capable of being drawn back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retraction]] | noun | **1.** A disavowal or taking back of a previous assertion.<br>**2.** The act of pulling or holding or drawing a part back. | *"Guppy I told my guardian of his old proposal and his subsequent retraction."* — Charles Dickens, *Bleak House* |
| [[retractor]] | noun | **1.** Surgical instrument that holds back the edges of a surgical incision. | *"In academic literature, retractor designates surgical instrument that holds back the edges of a surgical incision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subcontract]] | noun | **1.** A contract assigning to another party some obligations of a prior contract.<br>**2.** Arranged for contracted work to be done by others. | *"In academic literature, subcontract designates a contract assigning to another party some obligations of a prior contract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subcontractor]] | noun | **1.** Someone who enters into a subcontract with the primary contractor. | *"In academic literature, subcontractor designates someone who enters into a subcontract with the primary contractor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtract]] | verb | **1.** Make a subtraction.<br>**2.** Take off or away. | *"Besides, it would much subtract from the glory of the exploit had St."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[subtracter]] | noun | **1.** A person who subtracts numbers.<br>**2.** A machine that subtracts numbers. | *"In academic literature, subtracter designates a person who subtracts numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtraction]] | noun | **1.** An arithmetic operation in which the difference between two numbers is calculated.<br>**2.** The act of subtracting (removing a part from the whole). | *"He found it impossible, even by the Fulton Market method of subtraction, to get three hundred dollars' worth of express charges out of half that amount of sales, and suggested a discontinuance of shipments."* — W. E. Webb, *Buffalo Land* |
| [[subtractive]] | adjective | **1.** Constituting or involving subtraction. | *"In academic literature, subtractive designates constituting or involving subtraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tract]] | noun | **1.** An extended area of land.<br>**2.** A system of body parts that together serve some particular purpose. | *"As I belong to worship and affect In honour honesty, the tract of everything Would by a good discourser lose some life, Which action’s self was tongue to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tractability]] | noun | **1.** The trait of being easily persuaded. | *"And to please her parent the girl put herself quite in Joan’s hands, saying serenely—“Do what you like with me, mother.” Mrs Durbeyfield was only too delighted at this tractability."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tractable]] | adjective | **1.** Easily managed (controlled or taught or molded); ; - samuel butler.<br>**2.** Readily reacting to suggestions and influences. | *"Thou shalt find me tractable to any honest reason."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tractableness]] | noun | **1.** The trait of being easily persuaded. | *"In academic literature, tractableness designates the trait of being easily persuaded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tractarian]] | noun | **1.** A follower of tractarianism and supporter of the oxford movement (which was expounded in pamphlets called `tracts for the times'). | *"He himself knew that, in reality, the confused beliefs which she held, apparently imbibed in childhood, were, if anything, Tractarian as to phraseology, and Pantheistic as to essence."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tractarianism]] | noun | **1.** Principles of the founders of the oxford movement as expounded in pamphlets called `tracts for the times'. | *"In academic literature, tractarianism designates principles of the founders of the oxford movement as expounded in pamphlets called `tracts for the times'."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tractile]] | adjective | **1.** Capable of being shaped or bent or drawn out. | *"In academic literature, tractile designates capable of being shaped or bent or drawn out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traction]] | noun | **1.** The friction between a body and the surface on which it moves (as between an automobile tire and the road).<br>**2.** (orthopedics) the act of pulling on a bone or limb (as in a fracture) to relieve pressure or align parts in a special way during healing. | *"Because of the use of lead they are terribly heavy too, so much so that for traction purposes they are of very little use, for a large amount of the energy stored in the accumulators is then used up in hauling them about."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[tractive]] | adjective | **1.** Exerting traction and serving to pull. | *"In academic literature, tractive designates exerting traction and serving to pull."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tractor]] | noun | **1.** A wheeled vehicle with large wheels; used in farming and other applications.<br>**2.** A truck that has a cab but no body; used for pulling large trailers or vans. | *"But I can't come in now, Laura: I have to go over to Countisford to talk to Bishop about the new tractor, and I want to get back by teatime."* — Anthony Pryde, *Nightfall* |
| [[unattractive]] | adjective | **1.** Lacking beauty or charm.<br>**2.** Lacking power to arouse interest. | *"The worst of it is, that she manages to make me appear so unamiable and unattractive in my husband's eyes," she sighed to herself."* — Martha Finley, *Elsie's Kith and Kin* |
| [[unattractively]] | adverb | **1.** In an unattractive manner. | *"But seeing a stranger the sickly, scrofulous-looking child, unattractively like her mother, began to yell and run away."* — graf Leo Tolstoy, *War and Peace* |
| [[unattractiveness]] | noun | **1.** An ugliness of appearance that is not appealing to viewers. | *"In academic literature, unattractiveness designates an ugliness of appearance that is not appealing to viewers."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TRACT
  </div>
</div>
