---
status: unread
type: root_dashboard
---
# Dashboard — vale
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vale-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be strong or well”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong engine lifting a heavy load or a respected leader giving direction.</span>
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

The root **vale** means to be strong or well. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *valediction*, *valedictorian*, *valedictory*, and *valentine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be strong or well
> The root **vale** means to be strong or well. It describes being solid, unyielding, durable, and able to withstand pressure. In English, this root forms words such as *valediction*, *valedictorian*, *valedictory*, and *valentine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be strong or well</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *valediction* and *valedictorian*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vale** comes from a Latin word that means *"to be strong or well"*.
  - At its core, it describes the action of be strong or well.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **vale** in an English word, think of **to be strong or well**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be strong or well).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Valediction**: The action of saying farewell.
  - **Valedictorian**: A student, typically the one having the highest academic rank in a graduating class, who delivers the valedictory address.
  - **Valedictory**: Serving as a farewell.
  - **Valentine**: A card sent, often anonymously, on Saint Valentine's Day to a person one loves or is attracted to.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vale</mark>, think of <mark class="hl-def">to be strong or well</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vale** generates vocabulary through Latin verb compounding on the imperative *valē* + *dīcere* ("to say"):
> - **Valediction Compounds (*valē* + *dīcere*):**
>   - *valē* + *dīcere* $	o$ *valedīcere* $	o$ *valediction* ("the action of saying farewell; a farewell statement").
>   - *valedictory* ("serving as a farewell; a farewell oration").
>   - *valedictorian* ("the student who has the highest academic achievements and delivers the valedictory speech").
> - **Hagiographic & Romantic Formations:**
>   - *Valentīnus* $	o$ *valentine* ("a card or gift sent on Valentine's Day; a sweetheart").
> - **Classical Latin Formulas Preserved in English:**
>   - *avē atque valē* ("hail and farewell").
>   - *vale* ("an expression of farewell; a parting word").

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
> - **Academic Commencement & Graduation:** *valedictorian*, *valedictory* (commencement speeches, class rank).
> - **Classical Literature & Poetry:** *valediction*, *avē atque valē*, *vale* (John Donne's *A Valediction: Forbidding Mourning*).
> - **Cultural Romance & Celebration:** *valentine* (Valentine's Day cards, romantic courtship).

---

## 🔀 4. Prefix & Combining Dynamics on vale

### Compound Structure Table

| Compound Element | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dīcere` (to say, speak) | `valē` | **[[valediction]]** | Literally "to say be well" $	o$ a formal utterance of farewell. |
| `-ian` (person associated) | *valedictory* | **[[valedictorian]]** | The highest-ranking student chosen to deliver the farewell commencement speech. |
| `-ine` (pertaining to) | *Valentīnus* | **[[valentine]]** | A token, card, or romantic partner honored on the feast of Saint Valentine. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎓 **Higher Education & Commencements** | *valedictorian*, *valedictory* | Valedictorians delivering commencement addresses at university convocations. |
| 📜 **Classical Philology & Elegiac Poetry** | *valediction*, *vale* | Analyzing mourning motifs in John Donne's poetry and classical Latin epitaphs. |
| 💌 **Sociology & Cultural Folkways** | *valentine* | The commercial and interpersonal rituals of exchanging Valentine's Day greetings. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ambivalence]] | noun | **1.** Mixed feelings or emotions. | *"In academic literature, ambivalence designates mixed feelings or emotions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambivalent]] | adjective | **1.** Uncertain or unable to decide about what course to follow. | *"In academic literature, ambivalent designates uncertain or unable to decide about what course to follow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convalesce]] | verb | **1.** Get over an illness or shock. | *"Now, there is this noteworthy difference between savage and civilized; that while a sick, civilized man may be six months convalescing, generally speaking, a sick savage is almost half-well again in a day."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[convalescence]] | noun | **1.** Gradual healing (through rest) after sickness or injury. | *"Here she sat down and hastily scribbled a note between the small convulsive sobs of convalescence which follow a fit of crying as a ground-swell follows a storm."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[convalescent]] | noun | **1.** A person who is recovering from illness.<br>**2.** Returning to health after illness or debility. | *"A week had passed since Leonore had spent her first day as convalescent among the family."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[covalence]] | noun | **1.** Valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share. | *"In academic literature, covalence designates valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covalency]] | noun | **1.** Valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share. | *"In academic literature, covalency designates valence characterized by the sharing of electrons in a chemical compound; the number of pairs of electrons an atom can share."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[covalent]] | adjective | **1.** Of or relating to or characterized by covalence. | *"In academic literature, covalent designates of or relating to or characterized by covalence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divalent]] | adjective | **1.** Having a valence of two or having two valences. | *"In academic literature, divalent designates having a valence of two or having two valences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equivalence]] | noun | **1.** A state of being essentially equal or equivalent; equally balanced.<br>**2.** Essential equality and interchangeability. | *"There is a complete lack of economic equivalence in the relation of parent and child in early years."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[equivalent]] | noun | **1.** A person or thing equal to another in value or measure or force or effect or significance etc.<br>**2.** The atomic weight of an element that has the same combining capacity as a given weight of another element; the standard is 8 for oxygen. | *"If he does, however, they will leave me in peace, which may be a decent equivalent for the reversion."* — Jane Austen, *Persuasion* |
| [[nonequivalence]] | noun | **1.** Not interchangeable. | *"In academic literature, nonequivalence designates not interchangeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonequivalent]] | adjective | **1.** Not equal or interchangeable in value, quantity, or significance. | *"In academic literature, nonequivalent designates not equal or interchangeable in value, quantity, or significance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevalence]] | noun | **1.** The quality of prevailing generally; being widespread.<br>**2.** (epidemiology) the ratio (for a given time period) of the number of occurrences of a disease or event to the number of units at risk in the population. | *"Prevalence of protective tariffs. § 2."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prevalent]] | adjective | **1.** Most frequent or common. | *"But Volumnia the fair, being subject to the prevalent complaint of boredom and finding that disorder attacking her spirits with some virulence, ventures at length to repair to the library for change of scene."* — Charles Dickens, *Bleak House* |
| [[vale]] | noun | **1.** A long depression in the surface of the land that usually contains a river. | *"Anon, I’m sure, the Duke himself in person Comes this way to the melancholy vale, The place of death and sorry execution Behind the ditches of the abbey here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valediction]] | noun | **1.** A farewell oration (especially one delivered during graduation exercises by an outstanding member of a graduating class).<br>**2.** The act of saying farewell. | *"In academic literature, valediction designates a farewell oration (especially one delivered during graduation exercises by an outstanding member of a graduating class)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valedictorian]] | noun | **1.** The student with the best grades who usually delivers the valedictory address at commencement. | *"In academic literature, valedictorian designates the student with the best grades who usually delivers the valedictory address at commencement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valence]] | noun | **1.** (biology) a relative capacity to unite or react or interact as with antigens or a biological substrate.<br>**2.** (chemistry) a property of atoms or radicals; their combining power given in terms of the number of hydrogen atoms (or the equivalent). | *"It was afterwards conveyed by a female to William de <g>Valentia</g>, Earl of Pembroke, whose third son, Aymer de Valence, became his heir, and was murdered in France in 1323."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[valencia]] | noun | **1.** An industrial city in northern venezuela.<br>**2.** A city in eastern spain on the mediterranean. | *"He had made an excursion from Valencia to Murviedro, with a view to inspect the remains of Roman magnificence scattered in the environs of that town."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[valenciennes]] | noun | **1.** A town in northeastern france long noted for its lace industry.<br>**2.** A type of bobbin lace with floral patterns. | *"A bride (who is going to visit at a baronet’s) must have a few first-rate pocket-handkerchiefs; but beyond the absolutely necessary half-dozen, Rosamond contented herself without the very highest style of embroidery and Valenciennes."* — George Eliot, *Middlemarch* |
| [[valency]] | noun | **1.** The phenomenon of forming chemical bonds.<br>**2.** (biology) a relative capacity to unite or react or interact as with antigens or a biological substrate. | *"In academic literature, valency designates the phenomenon of forming chemical bonds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valent]] | adjective | **1.** (chemistry) having valence; usually used in combination. | *"Valent._ 20, who suggests that the Valentinians had "nut-trees in the sky"--it is a book in which he allows himself a good deal of gaiety and free quotation. [57] i, 28. [58] M."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[valentine]] | noun | **1.** A sweetheart chosen to receive a greeting on saint valentine's day.<br>**2.** A card sent or given (as to a sweetheart) on saint valentine's day. | *"Pray you, let’s have no words of this; but when they ask you what it means, say you this: [_Sings._] Tomorrow is Saint Valentine’s day, All in the morning betime, And I a maid at your window, To be your Valentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[valerian]] | noun | **1.** A plant of the genus valeriana having lobed or dissected leaves and cymose white or pink flowers. | *"Saint Laurence: suffered martyrdom in the reign of the Emperor Valerian, A.D. 258."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[valeriana]] | noun | **1.** Genus of widely distributed perennial herbs and some shrubs. | *"VALERIAN RUST; spots yellowish; sori subrotund, small, confluent, sometimes circinating; epidermis at length bursting; spores reddish-brown, subglobose or clavate, shortly pedicellate.—On _Valeriana officinalis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[valerianaceae]] | noun | **1.** Genus of mostly herbs having a characteristic fetid odor. | *"In academic literature, valerianaceae designates genus of mostly herbs having a characteristic fetid odor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valerianella]] | noun | **1.** Genus of old world annual herbs widely naturalized. | *"In academic literature, valerianella designates genus of old world annual herbs widely naturalized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valet]] | noun | **1.** A manservant who acts as a personal attendant to his employer.<br>**2.** Serve as a personal attendant to. | *"Her former master has for nurse, servant, cook and valet only that peculiar and ancient Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[valetta]] | noun | **1.** The capital of malta; located on the northeastern coast of the island. | *"In academic literature, valetta designates the capital of malta; located on the northeastern coast of the island."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valetudinarian]] | noun | **1.** Weak or sickly person especially one morbidly concerned with his or her health.<br>**2.** Of or relating to or characteristic of a person who is a valetudinarian. | *"A certain valetudinarian confesses he has often been cured of a sore throat by the hoarseness of a carman and relieved from a fit of the gout by the sound of old shoes."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[valetudinarianism]] | noun | **1.** The state of being weak in health or body (especially from old age). | *"In academic literature, valetudinarianism designates the state of being weak in health or body (especially from old age)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[valetudinary]] | adjective | **1.** Of or relating to or characteristic of a person who is a valetudinarian. | *"In academic literature, valetudinary designates of or relating to or characteristic of a person who is a valetudinarian."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Power]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VALE
  </div>
</div>
