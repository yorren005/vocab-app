---
status: unread
type: root_dashboard
---
# Dashboard — ject
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ject-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to throw or cast”</span>
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

The root **ject** means to throw or cast. It refers to the action of throwing and carrying out this process. In English, this root forms words such as *eject*, *inject*, *reject*, and *project*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to throw or cast
> The root **ject** means to throw or cast. It refers to the action of throwing and carrying out this process. In English, this root forms words such as *eject*, *inject*, *reject*, and *project*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To throw or cast</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *eject* and *inject*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ject** comes from a Latin word that means *"to throw or cast"*.
  - At its core, it describes the action of throw or cast.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **ject** in an English word, think of **to throw or cast**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to throw or cast).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Eject**: To force or throw something out, typically in a violent or abrupt manner.
  - **Inject**: To drive or force a liquid, medicine, or vaccine into the body with a syringe.
  - **Reject**: An everyday English word showing the root's idea of *to throw or cast*.
  - **Project**: An everyday English word showing the root's idea of *to throw or cast*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ject</mark>, think of <mark class="hl-def">to throw or cast</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Participial Base:** *-iect-* (*-iectus, -iecta, -iectum*) $	o$ *eject, inject, reject, project, object, interject, deject, abject, subject*.

- **Frequentative / Romance Offshoots:** Old French *jeter* (< *iactāre*) $	o$ *jettison, jetty*.

- **Nominalizations:**

  - Action / Result: *-iectiō* $	o$ *ejection, injection, rejection, projection, objection, interjection, dejection, subjection*.

  - Instrument / Ballistic: *-iectīle* $	o$ *projectile*.

  - Complex Trajectory: Medieval Latin *trāiectōria* (< *trans-* + *iacere*) $	o$ *trajectory*.



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



### 1. Physics, Aerospace & Ballistics

- *eject* (force or throw something out, typically in an abrupt or violent manner; pilot ejection).

- *projectile* (a missile designed to be fired from a rocket or gun).

- *trajectory* (the path followed by a projectile flying or an object moving under the action of given forces).

- *jettison* (throw or drop something from an aircraft or ship).

- *jetty* (a landing stage or pier extending out into water).



### 2. Medicine & Therapeutics

- *inject* (drive or force a liquid, especially a drug or vaccine, into a person or animal's body with a syringe).

- *injection* (an instance of injecting or being injected).

- *injector* (a device for injecting liquid or fuel).



### 3. Epistemology, Logic & Grammar

- *object (n)* (a material thing that can be seen and touched; a goal or purpose).

- *objective* (not influenced by personal feelings or opinions; impartial; a goal).

- *objectivity* (the quality of being objective and free from bias).

- *adjective* (a word naming an attribute of a noun, added next to it).

- *interjection* (an exclamation, especially as a part of speech thrown in between clauses).



### 4. Psychological & Emotional States

- *deject* (make sad or dispirited; depress).

- *dejected* (sad and depressed; dispirited).

- *dejection* (a sad and depressed state; low spirits).

- *abject* (experienced or present to the maximum degree; completely without pride or dignity).



### 5. Architectural Projection & Futurology

- *project (v)* (estimate or forecast something on the basis of present trends; cause light to fall on a surface).

- *projection* (an estimate of future situations; the presentation of an image on a surface).

- *projector* (a device that projects images onto a screen).



---



## 🔀 4. Prefix & Combining Dynamics on ject



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `e-`** | `ex-` + *-iectum* | **eject** | Hurling outward from inside | *"The fighter pilot was forced to eject over friendly territory."* |

| **Prefix `in-`** | `in-` + *-iectum* | **inject** | Driving fluid inward with pressure | *"Nurses prepare to inject the subcutaneous insulin dose."* |

| **Prefix `pro-`** | `pro-` + *-iectum* | **project** | Casting forward into space/future | *"Economists project steady GDP growth over the next fiscal year."* |

| **Prefix `re-`** | `re-` + *-iectum* | **reject** | Casting back / refusing | *"The editor chose to reject the poorly researched manuscript."* |

| **Prefix `ob-`** | `ob-` + *-iectum* | **object** | Throwing an obstacle before someone | *"Defense counsel stood to object to the prosecutor's leading question."* |

| **Prefix `inter-`** | `inter-` + *-iectum* | **interject** | Throwing a remark between speakers | *"She paused to interject a crucial point of clarification."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🚀 **Ballistics & Orbital Mechanics:** *parabolic trajectory*, *orbital projection*, *suborbital projectile*.

- 🏥 **Pharmacology & Nursing:** *intramuscular injection*, *automated insulin injector*.

- ⚖️ **Civil Litigation & Trial Procedure:** *sustaining an objection*, *objectionable testimony*.

- 🧠 **Psychiatry & Psychoanalysis:** *psychological projection* (defense mechanism attributing one's own faults to others).

- 🎬 **Cinema & Audiovisual Tech:** *laser cinema projector*, *3D projection mapping*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abject]] | adjective | **1.** Of the most contemptible kind.<br>**2.** Most unfortunate or miserable. | *"Dissembling harlot, thou art false in all, And art confederate with a damned pack To make a loathsome abject scorn of me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abjection]] | noun | **1.** A low or downcast state; - h.l.menchken. | *"In academic literature, abjection designates a low or downcast state; - h.l.menchken."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abjectly]] | adverb | **1.** In a hopeless resigned manner. | *"Let him that thinks of me so abjectly Know that this gold must coin a stratagem, Which, cunningly effected, will beget A very excellent piece of villainy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adjectival]] | adjective | **1.** Of or relating to or functioning as an adjective. | *"It must contain, as far as the mind is concerned, no substantives which could be put into an adjectival form; in other words, the object defined must not be explained through abstractions."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[adjectivally]] | adverb | **1.** As an adjective; in an adjectival manner. | *"In academic literature, adjectivally designates as an adjective; in an adjectival manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjective]] | noun | **1.** A word that expresses an attribute of something.<br>**2.** The word class that qualifies nouns. | *"George, laying a great and not altogether complimentary stress on his last adjective."* — Charles Dickens, *Bleak House* |
| [[adjectively]] | adverb | **1.** As an adjective. | *"In academic literature, adjectively designates as an adjective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjectural]] | adjective | **1.** Based primarily on surmise rather than adequate evidence. | *"Thou speak’st it falsely, as I love mine honour, And mak’st conjectural fears to come into me Which I would fain shut out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conjecturally]] | adverb | **1.** In a manner involving or inclined to conjecture and supposition. | *"In academic literature, conjecturally designates in a manner involving or inclined to conjecture and supposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conjecture]] | noun | **1.** A hypothesis that has been formed by speculating or conjecturing (usually with little hard evidence).<br>**2.** A message expressing an opinion based on incomplete evidence. | *"Now entertain conjecture of a time When creeping murmur and the poring dark Fills the wide vessel of the universe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deject]] | verb | **1.** Lower someone's spirits; make downhearted. | *"And I, of ladies most deject and wretched, That suck’d the honey of his music vows, Now see that noble and most sovereign reason, Like sweet bells jangled out of tune and harsh, That unmatch’d form and feature of blown youth Blasted with ecstasy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dejected]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Affected or marked by low spirits. | *"Antony Is valiant and dejected, and by starts His fretted fortunes give him hope and fear Of what he has and has not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dejectedly]] | adverb | **1.** In a dejected manner. | *"Joe offered no answer, poor fellow, but stood feeling his whisker and looking dejectedly at me, as if he thought it really might have been a better speculation."* — Charles Dickens, *Great Expectations* |
| [[dejectedness]] | noun | **1.** A feeling of low spirits. | *"In academic literature, dejectedness designates a feeling of low spirits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dejection]] | noun | **1.** A state of melancholy depression.<br>**2.** Solid excretory product evacuated from the bowels. | *"I felt all through the performance that he never looked at the actors but constantly looked at me, and always with a carefully prepared expression of the deepest misery and the profoundest dejection."* — Charles Dickens, *Bleak House* |
| [[eject]] | verb | **1.** Put out or expel from a place.<br>**2.** Eliminate (a substance). | *"To eject him hence Were but one danger, and to keep him here Our certain death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ejection]] | noun | **1.** The act of expelling or projecting or ejecting.<br>**2.** The act of forcing out someone or something. | *"I remember how we spread out along an aircraft's line of flight as it neared the drop zone, observed the chute ejection and canopy opening, and the dummy swinging in an arc underneath."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[ejector]] | noun | **1.** A person who ousts or supplants someone else.<br>**2.** A mechanism in a firearm that ejects the empty shell case after firing. | *"In academic literature, ejector designates a person who ousts or supplants someone else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inject]] | verb | **1.** Give an injection to.<br>**2.** To introduce (a new aspect or element). | *"I inject into her chest about a doz. of different preparations."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[injectable]] | adjective | **1.** (used of drugs) capable of being injected. | *"In academic literature, injectable designates (used of drugs) capable of being injected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injectant]] | noun | **1.** Any solution that is injected (as into the skin). | *"In academic literature, injectant designates any solution that is injected (as into the skin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[injection]] | noun | **1.** The forceful insertion of a substance under pressure.<br>**2.** Any solution that is injected (as into the skin). | *"The injection was begun, and three hours after the thermometer marked 6° below zero outside."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[injector]] | noun | **1.** A contrivance for injecting (e.g., water into the boiler of a steam engine or particles into an accelerator etc.). | *"It is then necessary to restore the normal quantity of oxygen, and so, as the air passes on, it meets, in a little apparatus known as an injector, a spray of pure oxygen from the cylinders."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[interject]] | verb | **1.** To insert between other elements. | *"Heart weak, but steady as a chronometer.” “It’s only twenty-four hours,” Captain Jamie said, “and he was never in like condition before.” “Putting it on, that’s what he’s doing, and you can stack on that,” Al Hutchins, the head trusty, interjected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[interjection]] | noun | **1.** An abrupt emphatic exclamation expressing emotion.<br>**2.** The action of interjecting or interposing an action or remark that interrupts. | *"Powderell, a retired iron-monger of some standing—his interjection being something between a laugh and a Parliamentary disapproval; “we must let you have your say."* — George Eliot, *Middlemarch* |
| [[introject]] | noun | **1.** (psychoanalysis) parental figures (and their values) that you introjected as a child; the voice of conscience is usually a parent's voice internalized.<br>**2.** Incorporate (attitudes or ideas) into one's personality unconsciously. | *"In academic literature, introject designates (psychoanalysis) parental figures (and their values) that you introjected as a child; the voice of conscience is usually a parent's voice internalized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introjected]] | verb | **1.** Incorporate (attitudes or ideas) into one's personality unconsciously.<br>**2.** Incorporated unconsciously into your own psyche. | *"In academic literature, introjected designates incorporate (attitudes or ideas) into one's personality unconsciously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introjection]] | noun | **1.** (psychoanalysis) the internalization of the parent figures and their values; leads to the formation of the superego.<br>**2.** (psychology) unconscious internalization of aspects of the world (especially aspects of persons) within the self in such a way that the internalized representation takes over the psychological functions of the external objects. | *"In academic literature, introjection designates (psychoanalysis) the internalization of the parent figures and their values; leads to the formation of the superego."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonobjective]] | adjective | **1.** Not representing or imitating external reality or the objects of nature. | *"In academic literature, nonobjective designates not representing or imitating external reality or the objects of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsubjective]] | adjective | **1.** Undistorted by emotion or personal bias; based on observable phenomena. | *"In academic literature, nonsubjective designates undistorted by emotion or personal bias; based on observable phenomena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[object]] | noun | **1.** A tangible and visible entity; an entity that can cast a shadow.<br>**2.** The goal intended to be attained (and which is believed to be attainable). | *"He threw his eye aside, And mark what object did present itself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[objectification]] | noun | **1.** The act of representing an abstraction as a physical thing.<br>**2.** A concrete representation of an abstract idea or principle. | *"In academic literature, objectification designates the act of representing an abstraction as a physical thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[objectify]] | verb | **1.** Make external or objective, or give reality to.<br>**2.** Make impersonal or present as an object. | *"The picture is the artist's thought objectified."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[objection]] | noun | **1.** The act of expressing earnest opposition or protest.<br>**2.** The speech act of objecting. | *"Maxa spoke of her intention of taking the child to her house and her sincere hope that there would be no objection and the ladies could feel their visitor's great eagerness manifested in her words."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[objectionable]] | adjective | **1.** Causing disapproval or protest.<br>**2.** Liable to objection or debate; used of something one might take exception to. | *"Then John Jarndyce discovers that Ada and I must break off and that if I don’t amend that very objectionable course, I am not fit for her."* — Charles Dickens, *Bleak House* |
| [[objectionableness]] | noun | **1.** The quality of being hateful. | *"In academic literature, objectionableness designates the quality of being hateful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[objectionably]] | adverb | **1.** In an obnoxious manner. | *"In academic literature, objectionably designates in an obnoxious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[objective]] | noun | **1.** The goal intended to be attained (and which is believed to be attainable).<br>**2.** The lens or system of lenses in a telescope or microscope that is nearest the object being viewed. | *"Boldwood mistook his confusion: sensitive persons are always ready with their “Is it I?” in preference to objective reasoning."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[objectively]] | adverb | **1.** With objectivity. | *"In one sense it is in the minds of men--it is their wants; again, looked at objectively it is in the nature of the good--it is the quality that fits it to gratify the want."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[objectiveness]] | noun | **1.** Judgment based on observable phenomena and uninfluenced by emotions or personal prejudices. | *"In academic literature, objectiveness designates judgment based on observable phenomena and uninfluenced by emotions or personal prejudices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[objectivity]] | noun | **1.** Judgment based on observable phenomena and uninfluenced by emotions or personal prejudices. | *"In academic literature, objectivity designates judgment based on observable phenomena and uninfluenced by emotions or personal prejudices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[objector]] | noun | **1.** A person who dissents from some established policy. | *"An objector in a large State exclaims loudly against the unreasonable equality of representation in the Senate."* — Alexander Hamilton, *The Federalist Papers* |
| [[project]] | noun | **1.** Any piece of work that is undertaken or attempted.<br>**2.** A planned undertaking. | *"The king’s disease,—my project may deceive me, But my intents are fix’d, and will not leave me. [_Exit._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[projected]] | verb | **1.** Communicate vividly.<br>**2.** Extend out or project in space. | *"The series of novels I projected being mainly of the kind called local, they seemed to require a territorial definition of some sort to lend unity to their scene."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[projectile]] | noun | **1.** A weapon that is forcibly thrown or projected at a targets but is not self-propelled.<br>**2.** Any vehicle self-propelled by a rocket engine. | *"This precious weapon of American origin could throw with ease a conical projectile of nine pounds to a mean distance of ten miles."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[projecting]] | verb | **1.** Communicate vividly.<br>**2.** Extend out or project in space. | *"Often a deep circular hole was dug in the hut and the girl squatted in the hole, with her head projecting above the surface of the ground."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[projection]] | noun | **1.** A prediction made by extrapolating from past observations.<br>**2.** The projection of an image from a film onto a screen. | *"In cases of defence ’tis best to weigh The enemy more mighty than he seems, So the proportions of defence are fill’d; Which, of a weak and niggardly projection, Doth, like a miser, spoil his coat with scanting A little cloth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[projectionist]] | noun | **1.** The person who operates the projector in a movie house. | *"In academic literature, projectionist designates the person who operates the projector in a movie house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[projector]] | noun | **1.** An optical device for projecting a beam of light.<br>**2.** An optical instrument that projects an enlarged image onto a screen. | *"Who will undertake to unite the discordant opinions of a whole community, in the same judgment of it; and to prevail upon one conceited projector to renounce his INFALLIBLE criterion for the FALLIBLE criterion of his more CONCEITED NEIGHBOR?"* — Alexander Hamilton, *The Federalist Papers* |
| [[reject]] | noun | **1.** The person or thing that is rejected or set aside as inferior in quality.<br>**2.** Refuse to accept or acknowledge. | *"When she shall challenge this, you will reject her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rejected]] | verb | **1.** Refuse to accept or acknowledge.<br>**2.** Refuse to accept. | *"Then woo thyself, be of thyself rejected, Steal thine own freedom, and complain on theft. 160 Narcissus so himself himself forsook, And died to kiss his shadow in the brook."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rejection]] | noun | **1.** The act of rejecting something.<br>**2.** The state of being rejected. | *"Is that tantamount, sir, to acceptance, or rejection, or consideration?” “To decided rejection, if you please,” returned my guardian."* — Charles Dickens, *Bleak House* |
| [[rejective]] | adjective | **1.** Rejecting or tending to reject. | *"In academic literature, rejective designates rejecting or tending to reject."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subject]] | noun | **1.** The subject matter of a conversation or discussion.<br>**2.** Something (a person or object or scene) selected by an artist or photographer for graphic representation. | *"Lean penury within that pen doth dwell, That to his subject lends not some small glory, But he that writes of you, if he can tell, That you are you, so dignifies his story."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subjection]] | noun | **1.** Forced submission to control by others.<br>**2.** The act of conquering. | *"And I in going, madam, weep o’er my father’s death anew; but I must attend his majesty’s command, to whom I am now in ward, evermore in subjection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subjective]] | adjective | **1.** Taking place within the mind and modified by individual bias.<br>**2.** Of a mental act performed entirely within the mind. | *"It has been observed more than once that the causes of love are chiefly subjective, and Boldwood was a living testimony to the truth of the proposition."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[subjectively]] | adverb | **1.** In a subjective way. | *"Of love as a spectacle Bathsheba had a fair knowledge; but of love subjectively she knew nothing."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[subjectiveness]] | noun | **1.** Judgment based on individual personal impressions and feelings and opinions rather than external facts. | *"In academic literature, subjectiveness designates judgment based on individual personal impressions and feelings and opinions rather than external facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjectivism]] | noun | **1.** (philosophy) the doctrine that knowledge and value are dependent on and limited by your subjective experience.<br>**2.** The quality of being subjective. | *"In academic literature, subjectivism designates (philosophy) the doctrine that knowledge and value are dependent on and limited by your subjective experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjectivist]] | noun | **1.** A person who subscribes to subjectivism. | *"In academic literature, subjectivist designates a person who subscribes to subjectivism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjectivity]] | noun | **1.** Judgment based on individual personal impressions and feelings and opinions rather than external facts. | *"In academic literature, subjectivity designates judgment based on individual personal impressions and feelings and opinions rather than external facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trajectory]] | noun | **1.** The path followed by an object moving through space. | *"The bomb has to have a place to insert fuse and trajectory data and fine tune the initial settings."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[uninjectable]] | adjective | **1.** (used of drugs) not capable of being injected. | *"In academic literature, uninjectable designates (used of drugs) not capable of being injected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unobjectionable]] | adjective | **1.** (of behavior or especially language) free from objectionable elements; fit for all observers.<br>**2.** Not causing disapproval. | *"Once past this difficulty, however, he exhorts his dear friend in the tenderest manner not to be rash, but to do what so eminent a gentleman requires, and to do it with a good grace, confident that it must be unobjectionable as well as profitable."* — Charles Dickens, *Bleak House* |
| [[unobjective]] | adjective | **1.** (of e.g. evidence) not objective or easily verified. | *"In academic literature, unobjective designates (of e.g. evidence) not objective or easily verified."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · JECT
  </div>
</div>
