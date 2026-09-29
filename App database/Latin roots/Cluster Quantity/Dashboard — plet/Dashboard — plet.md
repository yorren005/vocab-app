---
status: unread
type: root_dashboard
---
# Dashboard — plet
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plet-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“filled”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking at a large overflowing basket filled to the brim with goods.</span>
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

The root **plet** means filled. It refers to filling up completely, packing full, or finishing a measure. In English, this root forms words such as *complete*, *completely*, *completeness*, and *completion*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: filled
> The root **plet** means filled. It refers to filling up completely, packing full, or finishing a measure. In English, this root forms words such as *complete*, *completely*, *completeness*, and *completion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Filled</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *complete* and *completely*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plet** comes from a Latin word that means *"filled"*.
  - At its core, it describes filled.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **plet** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of filled.
  - **Mental & Social**: How people experience, organize, or communicate about filled.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Complete**: Having all the necessary or appropriate parts.
  - **Completely**: An everyday English word showing the root's idea of *filled*.
  - **Completeness**: The state or condition of being whole, unbroken, or entire.
  - **Completion**: The action or process of completing or finishing something.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plet</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Supine / Participial Stem:** *-plēt-* (*complētus, dēplētus, replētus, explētus*) $\to$ *complete, deplete, replete, expletive*.

- **Instrumental Noun Formations:** *-ple-mentum* (*implementum, complementum, supplementum*) $\to$ *implement, complement, supplement*.

- **Romance Participial Shifts:** Old French *complir* $\to$ *compliant, compliance*.



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



### 1. Wholeness, Perfection & Finishing

- *complete* (having all necessary parts; finished).

- *completion* (the act or process of finishing something).

- *complement* (a thing that completes or brings to perfection; full crew).

- *complementary* (combining in such a way as to enhance or complete each other).



### 2. Draining, Exhaustion & Deficit

- *deplete* (use up the supply or resources of).

- *depletion* (reduction in the number or quantity of something).

- *depletive* (causing or tending to cause depletion).



### 3. Satiation & Total Fullness

- *replete* (filled or well-supplied with something; gorged).

- *repletion* (the condition of being fully gorged or satisfied).



### 4. Functional Execution & Tools

- *implement* (a tool, utensil, or other piece of equipment; to put a decision or plan into effect).

- *implementation* (the process of putting a plan or system into operation).

- *compliant* (disposed to agree with others or obey rules).

- *compliance* (the action or fact of complying with a wish, rule, or regulation).



### 5. Padding & Speech Acts

- *expletive* (an oath or swear word; a word inserted merely to fill out a grammatical construction).



---



## 🔀 4. Prefix & Combining Dynamics on plet



| Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|

| `com-` + *plēre* | **complete** | Filling up entirely / concluding | *"The excavation team assembled the complete dinosaur skeleton."* |

| `de-` + *plēre* | **deplete** | Draining away volume or resources | *"Overfishing will quickly deplete commercial cod stocks."* |

| `in-` + *plēre* + *-mentum* | **implement** | Functional instrument that executes | *"The cabinet moved to implement strict banking safeguards."* |

| `re-` + *plēre* | **replete** | Stuffed full / completely satiated | *"The archives were replete with rare 16th-century cartographic maps."* |

| `sub-` + *plēre* + *-mentum* | **supplement** | Adding from beneath to fill deficit | *"She took iron vitamins to supplement her vegetarian diet."* |

| `ex-` + *plēre* + *-īvus* | **expletive** | Word used merely to fill space | *"The audio broadcast was bleeped to censor an angry expletive."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Corporate Governance & Law:** *regulatory compliance* (adherence to statutory rules), *contractual completion*.

- 🔬 **Ecology & Natural Resources:** *resource depletion* (groundwater depletion, fossil fuel depletion).

- 💻 **Software Engineering:** *system implementation* (deploying codebase into production), *complementary logic*.

- 🏥 **Medicine & Biochemistry:** *complement system* (part of the immune system that enhances antibodies), *glycogen repletion*.

- 🎨 **Color Theory & Optics:** *complementary colors* (pairs of colors that cancel each other out when combined).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[applet]] | noun | **1.** A java application; an application program that uses the client's web browser to provide a user interface. | *"In academic literature, applet designates a java application; an application program that uses the client's web browser to provide a user interface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appleton]] | noun | **1.** English physicist remembered for his studies of the ionosphere (1892-1966).<br>**2.** A town in eastern wisconsin. | *"He took off his spectacles to polish them, and then as he put them on again, "If it's for that Appleton boy I really can't allow it."* — Anthony Pryde, *Nightfall* |
| [[complete]] | verb | **1.** Come or bring to a finish or an end.<br>**2.** Bring to a whole, with all the necessary parts or elements. | *"What may this mean, That thou, dead corse, again in complete steel, Revisit’st thus the glimpses of the moon, Making night hideous, and we fools of nature So horridly to shake our disposition With thoughts beyond the reaches of our souls?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[completed]] | verb | **1.** Come or bring to a finish or an end.<br>**2.** Bring to a whole, with all the necessary parts or elements. | *"The young barons had also completed their studies and were expected to come home and to consult with their mother about their plans for the future."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[completely]] | adverb | **1.** To a complete degree or to the full or entire extent (`whole' is often used informally for `wholly').<br>**2.** So as to be complete; with everything necessary. | *"Uncle Philip was less able to stand the quiet which was reigning after the presentation of his gifts than were the children, who were completely lost in the new marvels."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[completeness]] | noun | **1.** The state of being complete and entire; having everything that is needed.<br>**2.** (logic) an attribute of a logical system that is so constituted that a contradiction arises if any proposition is introduced that cannot be derived from the axioms of the system. | *"She had sighed for her self-completeness then, and now she cried aloud against the severance of the union she had deplored."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[completing]] | verb | **1.** Come or bring to a finish or an end.<br>**2.** Bring to a whole, with all the necessary parts or elements. | *"Now, if everybody has done,” says Judy, completing her preparations, “I’ll have that girl in to her tea."* — Charles Dickens, *Bleak House* |
| [[completion]] | noun | **1.** (american football) a successful forward pass in football.<br>**2.** A concluding action. | *"Now they both declared to her that their full intention had been for years to come home after the completion of their studies and to live in Wildenstein with her and Leonore."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[depletable]] | adjective | **1.** Capable of being depleted. | *"There is no smooth transition, no gradual slowing down of activity; rather, the economic system consumes successively larger amounts of the depletable resources until they are gone."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[deplete]] | verb | **1.** Use up (resources or materials). | *"I am not going to deplete my brigade, at this most critical time, by letting everybody go home who takes a fool's notion into his head that he wants to."* — Harry Castlemon, *Rodney, the Partisan* |
| [[depleted]] | verb | **1.** Use up (resources or materials).<br>**2.** No longer sufficient. | *"But missionaries' pockets are more often depleted, than those of benevolent organizations, and the one in question was fain to take the applicant to a friend, whom we shall call Q."* — Classic Author, *The wonders of prayer* |
| [[depletion]] | noun | **1.** The act of decreasing something markedly.<br>**2.** The state of being depleted. | *"No patient will like it—certainly not Peacock’s, who have been used to depletion."* — George Eliot, *Middlemarch* |
| [[expletive]] | noun | **1.** Profane or obscene expression usually of surprise or anger.<br>**2.** A word or phrase conveying no independent meaning but added to fill out a sentence or metrical line. | *"He hurled at the unfortunate creature the most energetic expletives in the English tongue."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[incomplete]] | adjective | **1.** Not complete or total; not completed.<br>**2.** Not yet finished. | *"Though unsophisticated in the usual sense, she was not incomplete; and it would have denoted deficiency of womanhood if she had not instinctively known what an argument lies in propinquity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[incompletely]] | adverb | **1.** Not to a full degree or extent. | *"Rosamond was not angry, but she moved backward a little in timid happiness, and Lydgate could now sit near her and speak less incompletely."* — George Eliot, *Middlemarch* |
| [[incompleteness]] | noun | **1.** The state of being crude and incomplete and imperfect. | *"Philosophy could remove this sense of incompleteness, but only at the cost of love; and love was to Virgil, as his poetry shows, the very essence of life."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[replete]] | verb | **1.** Fill to satisfaction.<br>**2.** Filled to satisfaction with food or drink. | *"Incapable of more, replete with you, My most true mind thus maketh mine untrue. 114 Or whether doth my mind being crowned with you Drink up the monarch’s plague this flattery?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repletion]] | noun | **1.** The state of being satisfactorily full and unable to take on more.<br>**2.** Eating until excessively full. | *"I do bleed When such I meet, and wish great Juno would Resume her ancient fit of jealousy To get the soldier work, that peace might purge For her repletion, and retain anew Her charitable heart, now hard and harsher Than strife or war could be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uncomplete]] | adjective | **1.** Not complete or total; not completed. | *"But I now leave my cetological System standing thus unfinished, even as the great Cathedral of Cologne was left, with the crane still standing upon the top of the uncompleted tower."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[uncompleted]] | adjective | **1.** Not yet finished.<br>**2.** Not caught or not caught within bounds. | *"But I now leave my cetological System standing thus unfinished, even as the great Cathedral of Cologne was left, with the crane still standing upon the top of the uncompleted tower."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Quantity]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLET
  </div>
</div>
