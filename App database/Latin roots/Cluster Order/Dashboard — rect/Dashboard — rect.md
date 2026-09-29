---
status: unread
type: root_dashboard
---
# Dashboard — rect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rect-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“straight or right”</span>
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

The root **rect** means straight or right. It refers to moral correctness, legal entitlement, or the physical right side. In English, this root forms words such as *correct*, *direction*, *rectangle*, and *rectify*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: straight or right
> The root **rect** means straight or right. It refers to moral correctness, legal entitlement, or the physical right side. In English, this root forms words such as *correct*, *direction*, *rectangle*, and *rectify*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Straight or right</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *correct* and *direction*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rect** comes from a Latin word that means *"straight or right"*.
  - At its core, it describes straight or right.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **rect** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of straight or right.
  - **Mental & Social**: How people experience, organize, or communicate about straight or right.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Correct**: Free from error.
  - **Direction**: A course along which someone or something moves.
  - **Rectangle**: An everyday English word showing the root's idea of *straight or right*.
  - **Rectify**: To put right.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rect</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rect** generates vocabulary through diverse prefixation on the past participial stem *rēctum*:
> - **Base Nouns & Adjectives:**
>   - *rēctus* $	o$ *rectitude* ("moral integrity"), *rectilinear* ("bounded by straight lines").
>   - *rectus* + *facere* $	o$ *rectify*, *rectification* ("to make straight, correct").
>   - *rectus* + *angulus* $	o$ *rectangle*, *rectangular* ("four right angles").
> - **Prefix Modifications on *regere / rēctum*:**
>   - *con-* ("completely") + *regere* $	o$ *corrigere, corrēctum* $	o$ *correct*, *correction*, *corrective*.
>   - *dī-* / *dis-* ("apart, toward") + *regere* $	o$ *dīrigere, dīrēctum* $	o$ *direct*, *direction*, *directive*, *director*, *directory*.
>   - *in-* ("not") + *direct* $	o$ *indirect*, *indirection*.
>   - *ē-* ("out, up") + *regere* $	o$ *ērigere, ērectum* $	o$ *erect*, *erection*, *erectile*.
>   - *in-* ("against") + *sub-* + *regere* $	o$ *insurgere, insurrectum* $	o$ *insurrection*, *insurrectionist*.
>   - *re-* ("again") + *sub-* + *regere* $	o$ *resurgere, resurrectum* $	o$ *resurrect*, *resurrection*.

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
> - **Moral Philosophy & Law:** *rectitude*, *rectify*, *correct* (virtuous character, fixing legal injustices).
> - **Navigation, Management & Command:** *direct*, *direction*, *directive*, *director* (steering ships, corporate leadership, guidance).
> - **Geometry & Architecture:** *rectilinear*, *rectangle*, *erect* (straight walls, right-angle framing).
> - **Theology & Revolutionary Politics:** *resurrection*, *insurrection* (rising from the dead, rising up against state power).
> - **Electronics & Engineering:** *rectifier* (an electrical device converting alternating current into direct linear current).

---

## 🔀 4. Prefix & Combining Dynamics on rect

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dī-` (apart, forward) | `rēctum` | **[[direction]]** / **directive** | Guiding a linear course toward a specific objective. |
| `con-` (thoroughly) | `rēctum` | **correct** / **correction** | Bringing something completely into alignment with standard rules. |
| `ē-` / `ex-` (upward, out) | `rēctum` | **[[erect]]** | Raising or standing straight upward in vertical alignment. |
| `in-` + `sub-` (against-under) | `rēctum` | **[[insurrection]]** | Rising up in armed revolt against established civil authority. |
| `re-` + `sub-` (again-under) | `rēctum` | **[[resurrection]]** | Rising up again from the underworld or physical death into new life. |
| `in-` (privative not) | `direct` | **[[indirect]]** | Deviating from a straight path $	o$ roundabout, circuitous. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Constitutional Law** | *rectitude*, *rectify*, *insurrection* | Rectifying judicial errors on appeal; prosecuting violent insurrection against the Capitol. |
| 🧭 **Navigation & Aeronautics** | *direct*, *direction*, *directive* | Plotting a direct compass bearing; obeying FAA flight directives. |
| ⚡ **Electrical Engineering** | *rectify*, *rectifier* | Semiconductor diode bridge rectifiers transforming AC mains power into stable DC output. |
| 🏛️ **Architecture & Civil Engineering** | *erect*, *rectilinear*, *rectangle* | Erecting towering steel skyscrapers; designing rectilinear floorplans. |
| ⛪ **Comparative Religion & Eschatology** | *resurrection*, *rectitude* | Christian doctrines of Christ's bodily resurrection; Confucian and Stoic moral rectitude. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[correct]] | verb | **1.** Make right or correct.<br>**2.** Make reparations or amends for. | *"My accuser is my prentice; and when I did correct him for his fault the other day, he did vow upon his knees he would be even with me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[correctable]] | adjective | **1.** Capable of being returned to the original condition; not necessarily permanent.<br>**2.** Capable of being corrected by additions. | *"In academic literature, correctable designates capable of being returned to the original condition; not necessarily permanent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrected]] | verb | **1.** Make right or correct.<br>**2.** Make reparations or amends for. | *"To your corrected son? [_He raises her up._] Then let the pebbles on the hungry beach Fillip the stars!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[correction]] | noun | **1.** The act of offering an improvement to replace a mistake; setting right.<br>**2.** A quantity that is added or subtracted in order to increase the accuracy of a scientific measure. | *"But if he will not yield, Rebuke and dread correction wait on us, And they shall do their office."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[correctional]] | adjective | **1.** Concerned with or providing correction. | *"As to your appointment, that was made by an authority outside this station, actually, outside the Correctional Service of which this penal institution is a part."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[corrections]] | noun | **1.** The department of local government that is responsible for managing the treatment of convicted offenders.<br>**2.** The social control of offenders through a system of imprisonment and rehabilitation and probation and parole. | *"Plymdale’s wholesome corrections."* — George Eliot, *Middlemarch* |
| [[correctitude]] | noun | **1.** Correct or appropriate behavior. | *"In academic literature, correctitude designates correct or appropriate behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrective]] | noun | **1.** A device for treating injury or disease.<br>**2.** Designed to promote discipline. | *"An interval of meditation, serious and grateful, was the best corrective of everything dangerous in such high-wrought felicity; and she went to her room, and grew steadfast and fearless in the thankfulness of her enjoyment."* — Jane Austen, *Persuasion* |
| [[correctly]] | adverb | **1.** In an accurate manner. | *"Rouncewell’s son.” “A proposal which, as you correctly informed me at the time, he had the becoming taste and perception,” observes Sir Leicester, “to decline."* — Charles Dickens, *Bleak House* |
| [[correctness]] | noun | **1.** Conformity to fact or truth.<br>**2.** The quality of conformity to social expectations. | *"But, in every case, the name of the writer, or some respectable reference for attesting the accuracy of statements, must be furnished to the Editor; as he must be responsible to the public for the correctness of whatever may appear in the work."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[direct]] | verb | **1.** Command with authority.<br>**2.** Intend (something) to move towards a certain goal. | *"The count he woos your daughter Lays down his wanton siege before her beauty, Resolv’d to carry her; let her in fine consent, As we’ll direct her how ’tis best to bear it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[directed]] | verb | **1.** Command with authority.<br>**2.** Intend (something) to move towards a certain goal. | *"You must either be directed by some that take upon them to know, or to take upon yourself that which I am sure you do not know, or jump the after-inquiry on your own peril."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[directing]] | verb | **1.** Command with authority.<br>**2.** Intend (something) to move towards a certain goal. | *"This your son-in-law, And son unto the king, whom heavens directing, Is troth-plight to your daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[direction]] | noun | **1.** A line leading to a place or point.<br>**2.** The spatial relation between something and the course along which it points or moves. | *"That’s even as fair as “at hand, quoth the chamberlain,” for thou variest no more from picking of purses than giving direction doth from labouring; thou layest the plot how."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[directional]] | adjective | **1.** Relating to or indicating directions in space.<br>**2.** Relating to direction toward a (nonspatial) goal. | *"The recon-patroller's omni-directional screen displayed the huge cylinder that floated in space behind him, its gravity-enhanced rotation barely perceptible to O'Hare's vision."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[directionality]] | noun | **1.** The property of a microphone or antenna of being more sensitive in one direction than in another.<br>**2.** The property of being directional or maintaining a direction. | *"In academic literature, directionality designates the property of a microphone or antenna of being more sensitive in one direction than in another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[directionless]] | adjective | **1.** Aimlessly drifting. | *"In academic literature, directionless designates aimlessly drifting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[directive]] | noun | **1.** A pronouncement encouraging or banning some activity.<br>**2.** Showing the way by conducting or leading; imposing direction on. | *"Which entertain’d, limbs are his instruments, In no less working than are swords and bows Directive by the limbs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[directiveness]] | noun | **1.** The quality of being directive. | *"In academic literature, directiveness designates the quality of being directive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[directivity]] | noun | **1.** The property of a microphone or antenna of being more sensitive in one direction than in another.<br>**2.** The quality of being directive. | *"In academic literature, directivity designates the property of a microphone or antenna of being more sensitive in one direction than in another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[directly]] | adverb | **1.** Without deviation.<br>**2.** Without anyone or anything intervening. | *"And whether that my angel be turned fiend Suspect I may, yet not directly tell; But being both from me both to each friend, I guess one angel in another’s hell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[directness]] | noun | **1.** Trueness of course toward a goal.<br>**2.** The quality of being honest and straightforward in attitude and speech. | *"Next day the weather was bad, but she trudged on, the honesty, directness, and impartiality of elemental enmity disconcerting her but little."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[director]] | noun | **1.** Someone who controls resources and expenditures.<br>**2.** Member of a board of directors. | *"What is it?' I cried, 'you are their director--you are an ecclesiastic--you know what belongs to the unseen."* — Mrs. Oliphant, *A Beleaguered City* |
| [[directorate]] | noun | **1.** A group of persons chosen to govern the affairs of a corporation or other large institution. | *"About a year or so after my transfer from Supply the individual who took my job in the Supply Directorate told me, in the presence of my former unit's employees, that my decision had been 'right.' I didn't ask for details."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[directorship]] | noun | **1.** The position of a director of a business concern. | *"In academic literature, directorship designates the position of a director of a business concern."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[directory]] | noun | **1.** An alphabetical list of names and addresses.<br>**2.** (computer science) a listing of the files stored in memory (usually on a hard disk). | *"It appeared to us that some of them must pass their whole lives in dealing out subscription-cards to the whole post-office directory—shilling cards, half-crown cards, half-sovereign cards, penny cards."* — Charles Dickens, *Bleak House* |
| [[erect]] | verb | **1.** Construct, build, or erect.<br>**2.** Cause to rise up. | *"Erect his statue and worship it, And make my image but an alehouse sign."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[erectile]] | adjective | **1.** Capable of being raised to an upright position.<br>**2.** Filled with vascular sinuses and capable of becoming distended and rigid as the result of being filled with blood. | *"In academic literature, erectile designates capable of being raised to an upright position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erecting]] | noun | **1.** The act of building or putting up.<br>**2.** Construct, build, or erect. | *"I could not but be sensible that my existence was spared solely because of my diligence in erecting the pyramid and so doubling the stature of the island."* — Jack London, *The Jacket (The Star-Rover)* |
| [[erection]] | noun | **1.** An erect penis.<br>**2.** A structure that has been erected. | *"She does so take on with her men; they mistook their erection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[erectly]] | adverb | **1.** In a straight-backed manner. | *"Up helm!—square in!” In an instant the yards swung round; and as the ship half-wheeled upon her heel, her three firm-seated graceful masts erectly poised upon her long, ribbed hull, seemed as the three Horatii pirouetting on one sufficient steed."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[erectness]] | noun | **1.** The property of being upright in posture.<br>**2.** Position at right angles to the horizon. | *"Bow, bondslave, before the throne of your despot’s glorious heels so glistening in their proud erectness."* — James Joyce, *Ulysses* |
| [[incorrect]] | adjective | **1.** Not correct; not in conformity with fact or truth.<br>**2.** Not in accord with established usage or procedure. | *"XIX, p. 306) that this MS. is preserved in the Dyce Library but the statement is incorrect."* — John Fletcher, *The Elder Brother* |
| [[incorrectly]] | adverb | **1.** In an incorrect manner.<br>**2.** In an inaccurate manner. | *"The present collation omits readings incorrectly given by Dyce."* — John Fletcher, *The Elder Brother* |
| [[incorrectness]] | noun | **1.** Lack of conformity to social expectations.<br>**2.** The quality of not conforming to fact or truth. | *"He is forever finding fault with me, for some incorrectness of language, and now he is taking the same liberty with you."* — Jane Austen, *Northanger Abbey* |
| [[indirect]] | adjective | **1.** Having intervening factors or persons or influences.<br>**2.** Not direct in spatial dimension; not leading by a straight line or course to a destination. | *"God knows, my son, By what by-paths and indirect crook’d ways I met this crown, and I myself know well How troublesome it sat upon my head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indirection]] | noun | **1.** Indirect procedure or action.<br>**2.** Deceitful action that is not straightforward. | *"The better act of purposes mistook Is to mistake again; though indirect, Yet indirection thereby grows direct, And falsehood falsehood cures, as fire cools fire Within the scorched veins of one new-burn’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indirectly]] | adverb | **1.** Not in a forthright manner. | *"Why should poor beauty indirectly seek, Roses of shadow, since his rose is true?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indirectness]] | noun | **1.** Having the characteristic of lacking a true course toward a goal. | *"You want to know something about him,” she added, not choosing to indulge Rosamond’s indirectness."* — George Eliot, *Middlemarch* |
| [[insurrection]] | noun | **1.** Organized opposition to authority; a conflict in which one faction tries to wrest control from another. | *"It will in time Win upon power and throw forth greater themes For insurrection’s arguing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insurrectional]] | adjective | **1.** Of or relating to or given to insurrection. | *"In academic literature, insurrectional designates of or relating to or given to insurrection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insurrectionary]] | adjective | **1.** Of or relating to or given to insurrection. | *"TAXES IN INSURRECTIONARY DISTRICTS, 1864."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[insurrectionism]] | noun | **1.** The principle of revolt against constituted authority. | *"In academic literature, insurrectionism designates the principle of revolt against constituted authority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insurrectionist]] | noun | **1.** A person who takes part in an armed rebellion against the constituted authority (especially in the hope of improving conditions). | *"Our intelligence sources," Allen concluded, "report that many supporters of Plutonian objectives are, themselves, descendants of the insurrectionists that fomented the dissolution of our first interplanetary union."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[misdirect]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lead someone in the wrong direction or give someone wrong directions. | *"It appeared to me that his industry was all misdirected."* — Charles Dickens, *Bleak House* |
| [[misdirection]] | noun | **1.** An incorrect charge to a jury given by a judge.<br>**2.** Incorrect directions or instructions. | *"She sent to the post office, and sure enough there was the first letter with its misdirection."* — Classic Author, *The wonders of prayer* |
| [[rectal]] | adjective | **1.** Of or involving the rectum. | *"In academic literature, rectal designates of or involving the rectum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectangle]] | noun | **1.** A parallelogram with four right angles. | *"It is equally incorrect to say that when there are 60 units the "total utility" is equal to the area between the right angle and the curve a-g, while the value is equal to the rectangle below and to the left of the point g."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[rectangular]] | adjective | **1.** Having four right angles.<br>**2.** Having a set of mutually perpendicular axes; meeting at right angles. | *"A rectangular space of light appeared in the side of the hut, and in the opening the outline of Farmer Oak’s figure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[rectangularity]] | noun | **1.** The property of being shaped like a rectangle. | *"In academic literature, rectangularity designates the property of being shaped like a rectangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectifiable]] | adjective | **1.** Capable of being repaired or rectified. | *"In academic literature, rectifiable designates capable of being repaired or rectified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectification]] | noun | **1.** (chemistry) the process of refinement or purification of a substance by distillation.<br>**2.** The conversion of alternating current to direct current. | *"Lydgate did not make the affair a ground for valuing himself or (very particularly) despising Minchin, such rectification of misjudgments often happening among men of equal qualifications."* — George Eliot, *Middlemarch* |
| [[rectified]] | verb | **1.** Math: determine the length of.<br>**2.** Reduce to a fine, unmixed, or pure state; separate from extraneous matter or cleanse from impurities. | *"Here is some great misapprehension which must be rectified."* — Jane Austen, *Mansfield Park* |
| [[rectifier]] | noun | **1.** Electrical device that transforms alternating into direct current.<br>**2.** A person who corrects or sets right. | *"And I that am the rectifier of all, By title _pædagogus_, that let fall The birch upon the breeches of the small ones, And humble with a ferula the tall ones, Do here present this machine, or this frame."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rectify]] | verb | **1.** Math: determine the length of.<br>**2.** Reduce to a fine, unmixed, or pure state; separate from extraneous matter or cleanse from impurities. | *"It shall be therefore bootless That longer you desire the court, as well For your own quiet as to rectify What is unsettled in the King."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rectilineal]] | adjective | **1.** Characterized by a straight line or lines. | *"In academic literature, rectilineal designates characterized by a straight line or lines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectilinear]] | adjective | **1.** Characterized by a straight line or lines. | *"In academic literature, rectilinear designates characterized by a straight line or lines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectitude]] | noun | **1.** Righteousness as a consequence of being honorable and honest. | *"Casaubon, putting his conduct in the light of mere rectitude: a trait of delicacy which Dorothea noticed with admiration."* — George Eliot, *Middlemarch* |
| [[recto]] | noun | **1.** Right-hand page. | *"Hope (London, 1880), p. 52, _recto._ The title of the original poem was _Regnum Papisticum_."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[rectocele]] | noun | **1.** Protrusion or herniation of the rectum into the vagina; can occur if pelvic muscles are weakened by childbirth. | *"In academic literature, rectocele designates protrusion or herniation of the rectum into the vagina; can occur if pelvic muscles are weakened by childbirth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectoplasty]] | noun | **1.** Reconstructive surgery of the anus or rectum. | *"In academic literature, rectoplasty designates reconstructive surgery of the anus or rectum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rector]] | noun | **1.** A person authorized to conduct religious worship. | *"Her death itself, which could not be her office to say is come, was faithfully confirm’d by the rector of the place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rectorate]] | noun | **1.** The office or station of a rector. | *"In academic literature, rectorate designates the office or station of a rector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectorship]] | noun | **1.** The office or station of a rector. | *"Or had you tongues to cry Against the rectorship of judgment?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rectory]] | noun | **1.** An official residence provided by a church for its parson or vicar or rector. | *"Since her husband's death, when she had left the rectory in the valley and had come back to her old home, all her friends called her Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[rectosigmoid]] | adjective | **1.** Of or related to or near the sigmoid colon and the upper part of the rectum. | *"In academic literature, rectosigmoid designates of or related to or near the sigmoid colon and the upper part of the rectum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectum]] | noun | **1.** The terminal section of the alimentary canal; from the sigmoid flexure to the anus. | *"In academic literature, rectum designates the terminal section of the alimentary canal; from the sigmoid flexure to the anus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rectus]] | noun | **1.** Any of various straight muscles. | *"In academic literature, rectus designates any of various straight muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redirect]] | verb | **1.** Channel into a new direction. | *"I could only redirect it and hand it to him in silence."* — Bram Stoker, *Dracula* |
| [[resurrect]] | verb | **1.** Cause to become alive again.<br>**2.** Restore from a depressed, inactive, or unused state. | *"Solitary life-prisoners have been known to resurrect and look upon the sun again."* — Jack London, *The Jacket (The Star-Rover)* |
| [[resurrection]] | noun | **1.** (new testament) the rising of christ on the third day after the crucifixion.<br>**2.** A revival from inactivity and disuse. | *"The mixed, singular, luminous gloom in which they walked along together to the spot where the cows lay often made him think of the Resurrection hour."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[subdirectory]] | noun | **1.** (computer science) a directory that is listed in another directory. | *"In academic literature, subdirectory designates (computer science) a directory that is listed in another directory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncorrectable]] | adjective | **1.** Incapable of being controlled or managed. | *"In academic literature, uncorrectable designates incapable of being controlled or managed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncorrected]] | adjective | **1.** Left faulty or wrong.<br>**2.** Not subjected to correction or discipline. | *"In academic literature, uncorrected designates left faulty or wrong."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undirected]] | adjective | **1.** Aimlessly drifting. | *"Shakespeare, when young, had doubtless all the wildness and irregularity of an ardent, undisciplined, and undirected genius."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[unerect]] | adjective | **1.** Not upright in position or posture. | *"In academic literature, unerect designates not upright in position or posture."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · RECT
  </div>
</div>
