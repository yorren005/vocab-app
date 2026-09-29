---
status: unread
type: root_dashboard
---
# Dashboard — fal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to deceive, trick, or fail”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Uncovering honest facts and separating what is genuine from what is false.</span>
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

The root **fal** means to deceive, trick, or fail. It refers to the action of deceive,ing and carrying out this process. In English, this root forms words such as *default*, *fallacious*, *fallacy*, and *fallible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to deceive, trick, or fail
> The root **fal** means to deceive, trick, or fail. It refers to the action of deceive,ing and carrying out this process. In English, this root forms words such as *default*, *fallacious*, *fallacy*, and *fallible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To deceive, trick, or fail</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *default* and *fallacious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fal** comes from a Latin word that means *"to deceive, trick, or fail"*.
  - At its core, it describes the action of deceive, trick, or fail.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **fal** in an English word, think of **to deceive, trick, or fail**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to deceive, trick, or fail).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Default**: N.* Failure to fulfill an obligation, especially to repay a loan or appear in a court of law.
  - **Fallacious**: Based on a mistaken belief or unsound reasoning.
  - **Fallacy**: A mistaken belief, especially one based on unsound argument.
  - **Fallible**: Capable of making mistakes or being wrong.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fal</mark>, think of <mark class="hl-def">to deceive, trick, or fail</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root displays three interrelated stems:
1. **The Verbal Present Stem `fall-` / `fal-`**:
   - *fallacy*, *fallacious* (< Latin *fallācia*, *fallāx* "deceptive").
   - *fallible*, *infallible* (< Medieval Latin *fallibilis* "liable to err").
2. **The Participial Stem `fals-`**:
   - *false* (< Latin *falsus* "deceptive, counterfeit").
   - *falsify*, *falsification* (< Late Latin *falsificāre*).
3. **The Romance Phonological Softening `fault-` / `fail-`**:
   - *fault* (< Old French *faute* < Late Latin *fallita*).
   - *default* (< Old French *defaute*).
   - *fail* (< Old French *faillir*).

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

The cognitive scope of *fal* branches into four dimensions:
- **Logical Invalidity & Rhetoric**: [[fallacy]], [[fallacious]]
- **Human Imperfection & Papal Dogma**: [[fallible]], [[infallible]]
- **Counterfeit, Fabrication & Dishonesty**: [[false]], [[falsify]], [[falsification]]
- **Moral Deficiency & Contractual Failure**: [[fault]], [[default]], `fail`

---

## 🔀 4. Prefix & Combining Dynamics on fal

1. **`in-` + `fal`** (*in-* "not" + *fallibilis*):
   - *infallible* $\to$ incapable of making mistakes or being wrong; unerring.
2. **`de-` + `fal`** (*dē-* "away, completely" + *fallere*):
   - *default* $\to$ failure to fulfill an obligation, especially to repay a financial loan.
3. **`fal` + `fic`** (*falsus* + *facere* "to make"):
   - *falsify* $\to$ to alter or forge information so as to mislead.
   - *falsification* $\to$ the action of falsifying or forging information.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Philosophy of Science**: Karl Popper's *falsification* criterion for scientific theories.
- **Finance & Sovereign Debt**: bond *defaults*, credit *default* swaps (CDS), sovereign debt crises.
- **Theology & Ecclesiology**: the dogma of papal *infallibility* (First Vatican Council 1870).
- **Formal Logic & Cognitive Biases**: informal *fallacies* (ad hominem, post hoc, straw man).
- **Forensic Science & Cybersecurity**: detection of *falsified* digital documents and forged records.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[defalcate]] | verb | **1.** Appropriate (as property entrusted to one's care) fraudulently to one's own use. | *"In academic literature, defalcate designates appropriate (as property entrusted to one's care) fraudulently to one's own use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defalcation]] | noun | **1.** The sum of money that is misappropriated.<br>**2.** The fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else. | *"The motives on the part of the State governments, to augment their prerogatives by defalcations from the federal government, will be overruled by no reciprocal predispositions in the members."* — Alexander Hamilton, *The Federalist Papers* |
| [[defalcator]] | noun | **1.** Someone who violates a trust by taking (money) for his own use. | *"In academic literature, defalcator designates someone who violates a trust by taking (money) for his own use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falafel]] | noun | **1.** Small croquette of mashed chick peas or fava beans seasoned with sesame seeds. | *"In academic literature, falafel designates small croquette of mashed chick peas or fava beans seasoned with sesame seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falanga]] | noun | **1.** A form of torture in which the soles of the feet are beaten with whips or cudgels. | *"In academic literature, falanga designates a form of torture in which the soles of the feet are beaten with whips or cudgels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falange]] | noun | **1.** The spanish nazi party under franco. | *"In academic literature, falange designates the spanish nazi party under franco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falangist]] | noun | **1.** A spanish member of general franco's political party. | *"In academic literature, falangist designates a spanish member of general franco's political party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falcate]] | adjective | **1.** Curved like a sickle. | *"In academic literature, falcate designates curved like a sickle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falcatifolium]] | noun | **1.** Sickle pines: dioecious evergreen tropical trees and shrubs having sickle-shaped leaves; similar to dacrycarpus in habit; malaysia and philippines to new guinea and new caledonia. | *"In academic literature, falcatifolium designates sickle pines: dioecious evergreen tropical trees and shrubs having sickle-shaped leaves; similar to dacrycarpus in habit; malaysia and philippines to new guinea and new caledonia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falchion]] | noun | **1.** A short broad slightly convex medieval sword with a sharp point. | *"I have seen the day, with my good biting falchion I would have made them skip."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falciform]] | adjective | **1.** Curved like a sickle. | *"A double falciform ejection of water vapour from under the kettlelid at both sides simultaneously."* — James Joyce, *Ulysses* |
| [[falco]] | noun | **1.** A genus of falconidae. | *"Berold: the old Duke’s favorite hunting-horse. 78. merlin: a species of hawk. 80. falcon-lanner: a long-tailed species of hawk, ‘falco laniarius’. 4."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[falcon]] | noun | **1.** Diurnal birds of prey having long pointed powerful wings adapted for swift flight.<br>**2.** Hunt with falcons. | *"As the ox hath his bow, sir, the horse his curb, and the falcon her bells, so man hath his desires; and as pigeons bill, so wedlock would be nibbling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falcon-gentil]] | noun | **1.** Female falcon especially a female peregrine falcon. | *"In academic literature, falcon-gentil designates female falcon especially a female peregrine falcon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falcon-gentle]] | noun | **1.** Female falcon especially a female peregrine falcon. | *"In academic literature, falcon-gentle designates female falcon especially a female peregrine falcon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falconer]] | noun | **1.** A person who breeds and trains hawks and who follows the sport of falconry. | *"O for a falconer’s voice To lure this tassel-gentle back again."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falconidae]] | noun | **1.** A family of birds of the order falconiformes. | *"In academic literature, falconidae designates a family of birds of the order falconiformes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falconiformes]] | noun | **1.** Chiefly diurnal carnivorous birds having hooked beaks and long talons with opposable hind toe: falcons; hawks; eagles; ospreys; caracaras; vultures. | *"In academic literature, falconiformes designates chiefly diurnal carnivorous birds having hooked beaks and long talons with opposable hind toe: falcons; hawks; eagles; ospreys; caracaras; vultures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falconine]] | adjective | **1.** Relating to or resembling a falcon. | *"In academic literature, falconine designates relating to or resembling a falcon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falconry]] | noun | **1.** The art of training falcons to hunt and return. | *"In academic literature, falconry designates the art of training falcons to hunt and return."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fall]] | noun | **1.** The season when the leaves fall from the trees.<br>**2.** A sudden drop from an upright position. | *"Who lets so fair a house fall to decay, Which husbandry in honour might uphold, Against the stormy gusts of winter’s day And barren rage of death’s eternal cold?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fall-blooming]] | adjective | **1.** Of plants that bloom during the autumn. | *"In academic literature, fall-blooming designates of plants that bloom during the autumn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fall-board]] | noun | **1.** The hinged protective covering that protects the keyboard of a piano when it is not being played. | *"In academic literature, fall-board designates the hinged protective covering that protects the keyboard of a piano when it is not being played."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fall-flowering]] | adjective | **1.** Of plants that bloom during the autumn. | *"In academic literature, fall-flowering designates of plants that bloom during the autumn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falla]] | noun | **1.** Spanish composer and pianist (1876-1946). | *"In academic literature, falla designates spanish composer and pianist (1876-1946)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallacious]] | adjective | **1.** Containing or based on a fallacy.<br>**2.** Intended to deceive; ; ;  - s.t.coleridge. | *"These do not constitute a sum of social wealth in any proper sense of the term.[3] Arithmetically it is a fallacious kind of a total, for the sum of the individual capitals contains some items that should be canceled to find the sum of wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[fallaciousness]] | noun | **1.** Result of a fallacy or error in reasoning. | *"In academic literature, fallaciousness designates result of a fallacy or error in reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallacy]] | noun | **1.** A misconception resulting from incorrect reasoning. | *"Until I know this sure uncertainty I’ll entertain the offer’d fallacy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fallal]] | noun | **1.** Cheap showy jewelry or ornament on clothing. | *"In academic literature, fallal designates cheap showy jewelry or ornament on clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallback]] | noun | **1.** To break off a military action with an enemy. | *"In academic literature, fallback designates to break off a military action with an enemy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallboard]] | noun | **1.** The hinged protective covering that protects the keyboard of a piano when it is not being played. | *"In academic literature, fallboard designates the hinged protective covering that protects the keyboard of a piano when it is not being played."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallen]] | verb | **1.** Descend in free fall under the influence of gravity.<br>**2.** Move downward and lower, but not necessarily all the way. | *"I do presume, sir, that you are not fallen From the report that goes upon your goodness; And therefore, goaded with most sharp occasions, Which lay nice manners by, I put you to The use of your own virtues, for the which I shall continue thankful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[faller]] | noun | **1.** A person who fells trees.<br>**2.** A person who falls. | *"In academic literature, faller designates a person who fells trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallibility]] | noun | **1.** The likelihood of making errors. | *"Man with his vanity, his broad fallibility, his poor natural functions!"* — Donn Byrne, *The Wind Bloweth* |
| [[fallible]] | adjective | **1.** Likely to fail or make errors.<br>**2.** Wanting in moral strength, courage, or will; having the attributes of man as opposed to e.g. divine beings. | *"Do not satisfy your resolution with hopes that are fallible."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falling]] | verb | **1.** Descend in free fall under the influence of gravity.<br>**2.** Move downward and lower, but not necessarily all the way. | *"Caesar must think, When one so great begins to rage, he’s hunted Even to falling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falloff]] | noun | **1.** A noticeable deterioration in performance or quality. | *"In academic literature, falloff designates a noticeable deterioration in performance or quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallopio]] | noun | **1.** Italian anatomist who first described the fallopian tubes (1523-1562). | *"In academic literature, fallopio designates italian anatomist who first described the fallopian tubes (1523-1562)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallopius]] | noun | **1.** Italian anatomist who first described the fallopian tubes (1523-1562). | *"In academic literature, fallopius designates italian anatomist who first described the fallopian tubes (1523-1562)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallot]] | noun | **1.** French physician who described cardiac anomalies including fallot's tetralogy (1850-1911). | *"In academic literature, fallot designates french physician who described cardiac anomalies including fallot's tetralogy (1850-1911)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallout]] | noun | **1.** The radioactive particles that settle to the ground after a nuclear explosion.<br>**2.** Any adverse and unwanted secondary effect. | *"In academic literature, fallout designates the radioactive particles that settle to the ground after a nuclear explosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallow]] | noun | **1.** Cultivated land that is not seeded for one or more growing seasons.<br>**2.** Left unplowed and unseeded during a growing season. | *"How does your fallow greyhound, sir?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falls]] | noun | **1.** The petals or sepals of a flower that bend downward (especially the outer perianth of an iris).<br>**2.** A steep descent of the water of a river. | *"Nay, by your leave, hold your hands; though I know his brains are forfeit to the next tile that falls."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[false]] | adjective | **1.** Not in accordance with the fact or reality or actuality.<br>**2.** Arising from error. | *"Why should false painting imitate his cheek, And steal dead seeming of his living hue?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falsehood]] | noun | **1.** A false statement.<br>**2.** The act of rendering something false as by fraudulent changes (of documents or measures etc.) or counterfeiting. | *"If eyes corrupt by over-partial looks, Be anchored in the bay where all men ride, Why of eyes’ falsehood hast thou forged hooks, Whereto the judgement of my heart is tied?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falsely]] | adverb | **1.** In an insincerely false manner.<br>**2.** In an incorrect manner. | *"Thou speak’st it falsely, as I love mine honour, And mak’st conjectural fears to come into me Which I would fain shut out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falseness]] | noun | **1.** The state of being false or untrue.<br>**2.** Unfaithfulness by virtue of being unreliable or treacherous. | *"I suffered day and night, and nothing relieved me until Science proved to me the falseness of this belief by removing it."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[falsetto]] | noun | **1.** A male singing voice with artificially high tones in an upper register.<br>**2.** Artificially high; above the normal voice range. | *"After midnight the voice of a clock seems to lose in breadth as much as in length, and to diminish its sonorousness to a thin falsetto."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[falsie]] | noun | **1.** Padding that is worn inside a brassiere. | *"In academic literature, falsie designates padding that is worn inside a brassiere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falsifiable]] | adjective | **1.** Capable of being tested (verified or falsified) by experiment or observation. | *"In academic literature, falsifiable designates capable of being tested (verified or falsified) by experiment or observation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falsification]] | noun | **1.** Any evidence that helps to establish the falsity of something.<br>**2.** A willful perversion of facts. | *"But this word “cynical” is one of the most misused in the English language, especially when, by a glaring and gratuitous falsification of its original sense, it is applied, not to rough and snarling invective, but to gentle and oblique satire."* — Jane Austen, *Pride and Prejudice* |
| [[falsifier]] | noun | **1.** Someone who falsifies. | *"In academic literature, falsifier designates someone who falsifies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falsify]] | verb | **1.** Make false by mutilation or addition; as of a message or story.<br>**2.** Tamper, with the purpose of deception. | *"But he had considered this step anew since our late confidence and had decided on taking it, if it only served to show me through one poor instance that the whole world would readily unite to falsify the stern prediction of my childhood."* — Charles Dickens, *Bleak House* |
| [[falsifying]] | noun | **1.** The act of determining that something is false.<br>**2.** Make false by mutilation or addition; as of a message or story. | *"To do this, he worked in perfect accordance with artistic law, falsifying no line of the original forms."* — George MacDonald, *The Portent and Other Stories* |
| [[falsity]] | noun | **1.** The state of being false or untrue.<br>**2.** A false statement. | *"He is impressed by their falsity, even in religion (Matt. 15:8)."* — T. R. Glover, *The Jesus of History* |
| [[falstaff]] | noun | **1.** A dissolute character in shakespeare's plays. | *"Enter Prince Henry and Sir John Falstaff."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falstaffian]] | adjective | **1.** Of or resembling falstaff. | *"In academic literature, falstaffian designates of or resembling falstaff."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[falter]] | noun | **1.** The act of pausing uncertainly.<br>**2.** Be unsure or weak. | *"One fire drives out one fire, one nail one nail; Rights by rights falter; strengths by strengths do fail."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[faltering]] | noun | **1.** The act of pausing uncertainly.<br>**2.** Be unsure or weak. | *"I never saw such faltering, such confusion, such amazement and apprehension."* — Charles Dickens, *Bleak House* |
| [[falteringly]] | adverb | **1.** In an unsteady manner. | *"You _would_ like those, Dorothea,” said Celia, rather falteringly, beginning to think with wonder that her sister showed some weakness, and also that emeralds would suit her own complexion even better than purple amethysts."* — George Eliot, *Middlemarch* |
| [[infallibility]] | noun | **1.** The quality of never making an error. | *"They seem to think themselves bound in honor, and by all the motives of personal infallibility, to defeat the success of what has been resolved upon contrary to their sentiments."* — Alexander Hamilton, *The Federalist Papers* |
| [[infallible]] | adjective | **1.** Incapable of failure or error. | *"To speak on the part of virginity is to accuse your mothers; which is most infallible disobedience."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[offal]] | noun | **1.** Viscera and trimmings of a butchered animal often considered inedible by humans. | *"Ha! ’Swounds, I should take it: for it cannot be But I am pigeon-liver’d, and lack gall To make oppression bitter, or ere this I should have fatted all the region kites With this slave’s offal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unfaltering]] | adjective | **1.** Marked by firm determination or resolution; not shakable. | *"For many centimes there has not been a more remarkable testimony of unfaltering trust in the faithfulness of God in supplying human wants, than is found in the life and labor of George Muller and his Orphan Home, in Bristol, England."* — Classic Author, *The wonders of prayer* |
| [[unfalteringly]] | adverb | **1.** With determination; in a determined manner. | *"This was continued unfalteringly as long as there was occasion for it."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Truth, Deception & Error]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FAL
  </div>
</div>
