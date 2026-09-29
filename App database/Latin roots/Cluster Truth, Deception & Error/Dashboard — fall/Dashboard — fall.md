---
status: unread
type: root_dashboard
---
# Dashboard — fall
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fall-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to deceive, trick, or err”</span>
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

The root **fall** means to deceive, trick, or err. It refers to the action of deceive,ing and carrying out this process. In English, this root forms words such as *fallacy*, *fallible*, *false*, and *falsify*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to deceive, trick, or err
> The root **fall** means to deceive, trick, or err. It refers to the action of deceive,ing and carrying out this process. In English, this root forms words such as *fallacy*, *fallible*, *false*, and *falsify*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To deceive, trick, or err</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Uncovering honest facts and separating what is genuine from what is false.</mark>
> - **Everyday Connection**: Think of familiar words like *fallacy* and *fallible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fall** comes from a Latin word that means *"to deceive, trick, or err"*.
  - At its core, it describes the action of deceive, trick, or err.

- **The Big Picture Idea**:
  - Picture uncovering honest facts and separating what is genuine from what is false.
  - Whenever you see **fall** in an English word, think of **to deceive, trick, or err**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to deceive, trick, or err).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Fallacy**: A mistaken belief, especially one based on unsound argument.
  - **Fallible**: Capable of making mistakes or being wrong.
  - **False**: An everyday English word showing the root's idea of *to deceive, trick, or err*.
  - **Falsify**: An everyday English word showing the root's idea of *to deceive, trick, or err*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fall</mark>, think of <mark class="hl-def">to deceive, trick, or err</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms active verbs, adjectives, and nouns:
1. **The Active Present Stem `fall-`**:
   - *fallacy* (< Latin *fallācia*).
   - *fallacious* (< Latin *fallāciōsus*).
   - *fallible*, *infallible* (< Medieval Latin *fallibilis*).
2. **The Romance Phonological Softening `fail-` / `fault-`**:
   - *fail* (< Old French *faillir* < Vulgar Latin *fallīre*).
   - *fault* (< Old French *faute* < Late Latin *fallita*).
   - *default* (< Old French *defaute*).

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

The cognitive scope of *fall* covers three main fields:
- **Logical Invalidity & Sophistry**: [[fallacy]], [[fallacious]], `fallaciously`
- **Epistemic Capability & Dogma**: [[fallible]], [[infallible]], `infallibility`
- **Failure, Flaw & Breach of Duty**: [[fail]], [[fault]], [[default]]

---

## 🔀 4. Prefix & Combining Dynamics on fall

1. **`in-` + `fall`** (*in-* "not" + *fallibilis*):
   - *infallible* $\to$ incapable of making mistakes or being wrong; completely trustworthy.
   - *infallibility* $\to$ the quality of being infallible.
2. **`de-` + `fall`** (*dē-* "away, thoroughly" + *fallere*):
   - *default* $\to$ failure to fulfill an obligation, especially to repay a financial loan.
3. **`fall` + `-acy`** (nominal suffix):
   - *fallacy* $\to$ a mistaken belief; a flaw in reasoning that renders an argument invalid.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Formal Logic & Philosophy**: formal vs. informal *fallacies*, modal logic.
- **Finance & Debt Restructuring**: sovereign loan *defaults*, default risk premiums.
- **Geology & Seismology**: strike-slip and normal *fault* lines.
- **Theology & Ecclesiastical History**: the dogma of papal *infallibility*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[fall]] | noun | **1.** The season when the leaves fall from the trees.<br>**2.** A sudden drop from an upright position. | *"Who lets so fair a house fall to decay, Which husbandry in honour might uphold, Against the stormy gusts of winter’s day And barren rage of death’s eternal cold?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[falla]] | noun | **1.** Spanish composer and pianist (1876-1946). | *"In academic literature, falla designates spanish composer and pianist (1876-1946)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallacious]] | adjective | **1.** Containing or based on a fallacy.<br>**2.** Intended to deceive; ; ;  - s.t.coleridge. | *"These do not constitute a sum of social wealth in any proper sense of the term.[3] Arithmetically it is a fallacious kind of a total, for the sum of the individual capitals contains some items that should be canceled to find the sum of wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[fallaciousness]] | noun | **1.** Result of a fallacy or error in reasoning. | *"In academic literature, fallaciousness designates result of a fallacy or error in reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fallacy]] | noun | **1.** A misconception resulting from incorrect reasoning. | *"Until I know this sure uncertainty I’ll entertain the offer’d fallacy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fallal]] | noun | **1.** Cheap showy jewelry or ornament on clothing. | *"In academic literature, fallal designates cheap showy jewelry or ornament on clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
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
| [[infallibility]] | noun | **1.** The quality of never making an error. | *"They seem to think themselves bound in honor, and by all the motives of personal infallibility, to defeat the success of what has been resolved upon contrary to their sentiments."* — Alexander Hamilton, *The Federalist Papers* |
| [[infallible]] | adjective | **1.** Incapable of failure or error. | *"To speak on the part of virginity is to accuse your mothers; which is most infallible disobedience."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · FALL
  </div>
</div>
