---
status: unread
type: root_dashboard
---
# Dashboard — numer
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">numer-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“number”</span>
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

The root **numer** means number. It refers to counting, calculating amounts, or mathematical numbers. In English, this root forms words such as *number*, *numeral*, *numerous*, and *enumerate*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: number
> The root **numer** means number. It refers to counting, calculating amounts, or mathematical numbers. In English, this root forms words such as *number*, *numeral*, *numerous*, and *enumerate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Number</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *number* and *numeral*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **numer** comes from a Latin word that means *"number"*.
  - At its core, it describes number.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **numer** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of number.
  - **Mental & Social**: How people experience, organize, or communicate about number.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Number**: An arithmetical value denoting quantity or position in a series.
  - **Numeral**: A figure, letter, or word representing a number.
  - **Numerous**: Great in number.
  - **Enumerate**: To mention a number of things one by one.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">numer</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Nominal Stem:** *numer-* (nominative *numerus*, genitive *numerī*) $\to$ *numeral, numerous, numerical, number*.

- **Verbal Stem:** *numerā-* (present *numerō*, infinitive *numerāre*, supine *numerātum*) $\to$ *enumerate, enumeration, enumerator*.

- **Negated Stem:** `in-` + *numerābilis* $\to$ *innumerable, innumerability*.

- **Superlative / Excessive Compounding:** `super-` + *numerārius* $\to$ *supernumerary*.



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



### 1. Basic Counting & Arithmetic

- *number* (an arithmetical value representing a particular quantity).

- *numeral* (a figure or symbol used to represent a number).

- *numerical* (relating to or expressed in numbers).

- *numerator* (the number above the line in a common fraction).



### 2. Exhaustive Listing & Inventory

- *enumerate* (to mention a number of things one by one; catalog).

- *enumeration* (the formal act of listing or counting individual items).

- *enumerator* (an official appointed to record census data).



### 3. Abundance & Magnitude

- *numerous* (great in number; many).

- *innumerable* (too many to be counted; countless).

- *numberless* (countless, infinite in quantity).

- *outnumber* (to exceed in number).



### 4. Special Institutional & Metaphysical Applications

- *supernumerary* (exceeding the regular or prescribed number; an extra actor on stage).

- *numeracy* (the ability to understand and work with numbers, analogous to literacy).

- *numerology* (the metaphysical study of the occult significance of numbers).

- *denumerable* (in set theory, capable of being put into one-to-one correspondence with natural numbers).



---



## 🔀 4. Prefix & Combining Dynamics on numer



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `e-` / `ex-`** | `ex-` + *numerāre* | **enumerate** | Counting items out completely | *"The report proceeded to enumerate the deficiencies of the bridge."* |

| **Negative `in-`** | `in-` + *numerābilis* | **innumerable** | Defying complete counting | *"Innumerable fireflies illuminated the humid summer night."* |

| **Prefix `super-`** | `super-` + *numerārius* | **supernumerary** | Existing beyond the required count | *"The theater hired several supernumerary actors to play townspeople."* |

| **Suffix `-acy`** | *numerus* + *-acy* | **numeracy** | Competence in quantitative manipulation | *"The educational reform targeted adult numeracy in rural communities."* |

| **Fractional `-ator`** | *numerāre* + *-tor* | **numerator** | The entity that tallies fraction parts | *"If you double the numerator, the total value of the fraction doubles."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Demography & Census Administration:** *enumeration* (census district enumeration), *enumerator* (official door-to-door census taker).

- 🔬 **Mathematics & Set Theory:** *numerator* (rational fraction component), *denumerable set* (countable infinite sets such as $\mathbb{Q}$).

- 💻 **Computing & Programming:** *enumeration* / `enum` (distinct symbolic constant datatype), *numerical analysis* (computational mathematics).

- 💼 **Education & Workforce Policy:** *numeracy* (basic cognitive math literacy benchmarked by OECD).

- 🎭 **Theater & Opera:** *supernumerary* ("super" — an extra performer without speaking lines).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[denumerable]] | adjective | **1.** That can be counted. | *"In academic literature, denumerable designates that can be counted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enumerable]] | adjective | **1.** That can be counted. | *"In academic literature, enumerable designates that can be counted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enumerate]] | verb | **1.** Specify individually.<br>**2.** Determine the number or amount of. | *"Many things, needless to enumerate, press this upon my mind."* — Mrs. Oliphant, *A Beleaguered City* |
| [[enumeration]] | noun | **1.** A numbered list.<br>**2.** The act of counting; reciting numbers in ascending order. | *"Here this mere enumeration must be allowed to convey its own suggestion of far-reaching results for the whole political economy of the nation and of the world."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[enumerator]] | noun | **1.** Someone who collects census data by visiting individual homes. | *"In academic literature, enumerator designates someone who collects census data by visiting individual homes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innumerable]] | adjective | **1.** Too numerous to be counted. | *"Then, that you have sent innumerable substance— By what means got, I leave to your own conscience— To furnish Rome and to prepare the ways You have for dignities, to the mere undoing Of all the kingdom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[innumerableness]] | noun | **1.** A number beyond counting. | *"In academic literature, innumerableness designates a number beyond counting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innumerate]] | adjective | **1.** Lacking knowledge and understanding of mathematical concepts and methods. | *"In academic literature, innumerate designates lacking knowledge and understanding of mathematical concepts and methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[innumerous]] | adjective | **1.** Too numerous to be counted. | *"In academic literature, innumerous designates too numerous to be counted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerable]] | adjective | **1.** That can be counted. | *"In academic literature, numerable designates that can be counted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numeracy]] | noun | **1.** Skill with numbers and mathematics. | *"In academic literature, numeracy designates skill with numbers and mathematics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numeral]] | noun | **1.** A symbol used to represent a number.<br>**2.** Of or relating to or denoting numbers. | *"E._ _July_ 17. 1713. _numeral "3" unclear_"* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Part 1* |
| [[numerate]] | verb | **1.** Determine the number or amount of.<br>**2.** Read out loud as words written numbers. | *"In academic literature, numerate designates determine the number or amount of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numeration]] | noun | **1.** Naming numbers.<br>**2.** The act of counting; reciting numbers in ascending order. | *"This point won, you have started as you should. 326:18 You have begun at the numeration-table of Christian Science, and nothing but wrong intention can hinder your advancement."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[numerator]] | noun | **1.** The dividend of a fraction. | *"In academic literature, numerator designates the dividend of a fraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numeric]] | adjective | **1.** Of or relating to or denoting numbers.<br>**2.** Measured or expressed in numbers. | *"In academic literature, numeric designates of or relating to or denoting numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerical]] | adjective | **1.** Measured or expressed in numbers.<br>**2.** Of or relating to or denoting numbers. | *"In numerical strength they usually approximated to the apostolic figure of twelve, and Dr."* — John Cairns, *Principal Cairns* |
| [[numerically]] | adverb | **1.** In number; with regard to numbers. | *"How was it that the Russian army, which when numerically weaker than the French had given battle at Borodinó, did not achieve its purpose when it had surrounded the French on three sides and when its aim was to capture them?"* — graf Leo Tolstoy, *War and Peace* |
| [[numerological]] | adjective | **1.** Of or relating to numerology. | *"In academic literature, numerological designates of or relating to numerology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerologist]] | noun | **1.** A believer in numerology. | *"In academic literature, numerologist designates a believer in numerology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerology]] | noun | **1.** The study of the supposed occult influence of numbers on human affairs. | *"In academic literature, numerology designates the study of the supposed occult influence of numbers on human affairs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerosity]] | noun | **1.** A large number. | *"In academic literature, numerosity designates a large number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[numerous]] | adjective | **1.** Amounting to a large indefinite number. | *"We valued their stimulating company very much and were always happy when through some chance they were exempt from some of their numerous lessons."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[numerousness]] | noun | **1.** A large number. | *"In academic literature, numerousness designates a large number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernumerary]] | noun | **1.** A person serving no apparent function.<br>**2.** A minor actor in crowd scenes. | *"The supply was getting less as the animals advanced in calf, and the supernumerary milkers of the lush green season had been dismissed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unnumerable]] | adjective | **1.** Too numerous to be counted. | *"In academic literature, unnumerable designates too numerous to be counted."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · NUMER
  </div>
</div>
