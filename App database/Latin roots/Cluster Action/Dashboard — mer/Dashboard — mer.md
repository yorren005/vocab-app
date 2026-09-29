---
status: unread
type: root_dashboard
---
# Dashboard — mer
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mer-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to earn or deserve”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **mer** means to earn or deserve. It refers to the action of earning and carrying out this process. In English, this root forms words such as *merit*, *meritorious*, *meritoriously*, and *meritoriousness*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to earn or deserve
> The root **mer** means to earn or deserve. It refers to the action of earning and carrying out this process. In English, this root forms words such as *merit*, *meritorious*, *meritoriously*, and *meritoriousness*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To earn or deserve</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *merit* and *meritorious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mer** comes from a Latin word that means *"to earn or deserve"*.
  - At its core, it describes the action of earn or deserve.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **mer** in an English word, think of **to earn or deserve**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to earn or deserve).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Merit**: The quality of being particularly good or worthy, especially so as to deserve praise or reward.
  - **Meritorious**: Deserving praise, reward, or esteem.
  - **Meritoriously**: In a manner that deserves praise, reward, or honor.
  - **Meritoriousness**: The quality or condition of being meritorious.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mer</mark>, think of <mark class="hl-def">to earn or deserve</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `mer-` / `merit-` (< Latin *mereō / meritum*): Primary base for desert and earned status.
- **Prefix & Combining Machinery**:
  - `de-` ("down, reversal"): *demerit*.
  - `ex-` $	o$ `e-` ("out, thoroughly"): *emeritus*.
  - `-ious` (characterizing adjective): *meritorious, meretricious*.

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
```
                      ┌── Moral Worth & Honor: merit, meritorious, meritoriously
                      │
    [mer] ────────────┼── Honorable Retirement: emeritus
(To earn, deserve)    │
                      ├── Disciplinary Penalties: demerit
                      │
                      └── Superficial Allure: meretricious, meretriciously
```

---

## 🔀 4. Prefix & Combining Dynamics on mer
- **`e-` + `mer` + `-itus`**: *emeritus* — retired from active professional duty while retaining honorary title.
- **`de-` + `mer` + `-it`**: *demerit* — a fault, offense, or mark given for misconduct.
- **`mer` + `-etricious`**: *meretricious* — outwardly attractive but possessing no real value; deceitfully gaudy.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Academia & University Governance**: Professors *emeriti*; tenure evaluations; research *merit* stipends.
- **Military Honors & Decorations**: Distinguished Service Medals awarded for *meritorious* conduct.
- **Ethics & Political Philosophy**: Theories of desert; distributive justice in a *meritocracy*.
- **Aesthetics & Literary Criticism**: Flamboyant, *meretricious* prose styles lacking philosophical substance.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antemeridian]] | adjective | **1.** Before noon. | *"In academic literature, antemeridian designates before noon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armeria]] | noun | **1.** Shrubby or herbaceous low-growing evergreen perennials. | *"In academic literature, armeria designates shrubby or herbaceous low-growing evergreen perennials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asmera]] | noun | **1.** The capital of eritrea. | *"In academic literature, asmera designates the capital of eritrea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comer]] | noun | **1.** Someone with a promising future.<br>**2.** Someone who arrives (or has arrived). | *"But if my father had not scanted me And hedg’d me by his wit to yield myself His wife who wins me by that means I told you, Yourself, renowned Prince, then stood as fair As any comer I have look’d on yet For my affection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commerce]] | noun | **1.** Transactions (sales and purchases) having the objective of supplying commodities (goods and services).<br>**2.** The united states federal department that promotes and administers domestic and foreign trade (including management of the census and the patent office); created in 1913. | *"Could beauty, my lord, have better commerce than with honesty?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[commercial]] | noun | **1.** A commercially sponsored ad on radio or television.<br>**2.** Connected with or engaged in or sponsored by or used in commerce or commercial enterprises. | *"Boldwood, who was apparently determined by personal rather than commercial reasons, suggested that Oak should be furnished with a horse for his sole use, when the plan would present no difficulty, the two farms lying side by side."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[commercial-grade]] | adjective | **1.** Of the kind or quality used in commerce; average or inferior. | *"In academic literature, commercial-grade designates of the kind or quality used in commerce; average or inferior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialisation]] | noun | **1.** The act of commercializing something; involving something in commerce. | *"In academic literature, commercialisation designates the act of commercializing something; involving something in commerce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialise]] | verb | **1.** Make commercial. | *"In academic literature, commercialise designates make commercial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialised]] | verb | **1.** Make commercial.<br>**2.** Organized principally for financial gain. | *"In academic literature, commercialised designates make commercial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialism]] | noun | **1.** Transactions (sales and purchases) having the objective of supplying commodities (goods and services). | *"Literary commercialism is lowering the intellectual standard to accommodate the purse and to 195:30 meet a frivolous demand for amusement instead of for improvement."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[commercialization]] | noun | **1.** The act of commercializing something; involving something in commerce. | *"In academic literature, commercialization designates the act of commercializing something; involving something in commerce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialize]] | verb | **1.** Exploit for maximal profit, usually by sacrificing quality.<br>**2.** Make commercial. | *"This view is now becoming more general as a result of the commercializing of farming enterprise."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commercialized]] | verb | **1.** Exploit for maximal profit, usually by sacrificing quality.<br>**2.** Make commercial. | *"As farming becomes more commercialized it necessarily becomes somewhat more specialized, and produces a smaller variety of products."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commercially]] | adverb | **1.** In a commercial manner. | *"He grows more commercially-minded."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[consumer]] | noun | **1.** A person who uses goods or services. | *"The use of money may be necessary several times before a commodity completes its journey from producer to consumer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[demerara]] | noun | **1.** A light brown raw cane sugar from guyana.<br>**2.** A river in northern guyana that flows northward into the atlantic. | *"Want to make good pastry, butter, best flour, Demerara sugar, or they’d taste it with the hot tea."* — James Joyce, *Ulysses* |
| [[demerit]] | noun | **1.** A mark against a person for misconduct or failure; usually given in school or armed forces.<br>**2.** The quality of being inadequate or falling short of perfection. | *"These irregularities of judgment, I imagine, are found even in riper minds than Mary Garth’s: our impartiality is kept for abstract merit and demerit, which none of us ever saw."* — George Eliot, *Middlemarch* |
| [[demerol]] | noun | **1.** A synthetic narcotic drug (trade name demerol) used to treat pain. | *"In academic literature, demerol designates a synthetic narcotic drug (trade name demerol) used to treat pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimer]] | noun | **1.** A compound whose molecules are composed of two identical monomers. | *"In academic literature, dimer designates a compound whose molecules are composed of two identical monomers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emerald]] | noun | **1.** A green transparent form of beryl; highly valued as a gemstone.<br>**2.** A transparent piece of emerald that has been cut and polished and is valued as a precious gem. | *"It was green as an emerald, and the reverberation was stunning."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[emerge]] | verb | **1.** Come out into view, as from concealment.<br>**2.** Come out of. | *"By the noisome ways through which they descended into that pit, they gradually emerge from it, the crowd flitting, and whistling, and skulking about them until they come to the verge, where restoration of the bull’s-eyes is made to Darby."* — Charles Dickens, *Bleak House* |
| [[emergence]] | noun | **1.** The gradual beginning or coming forth.<br>**2.** The becoming visible. | *"Emergence of the railroad problem. § 9."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[emergency]] | noun | **1.** A sudden unforeseen crisis (usually involving danger) that requires immediate action.<br>**2.** A state in which martial law applies. | *"Leonore really needed no more special care, and in case of an emergency Mea could easily run down to fetch her mother."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[emergent]] | adjective | **1.** Occurring unexpectedly and requiring urgent action.<br>**2.** Coming into existence. | *"In academic literature, emergent designates occurring unexpectedly and requiring urgent action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emerging]] | verb | **1.** Come out into view, as from concealment.<br>**2.** Come out of. | *"Guppy becomes conscious of a manly whisker emerging from the cloistered walk below and turning itself up in the direction of his face."* — Charles Dickens, *Bleak House* |
| [[emeritus]] | noun | **1.** A professor or minister who is retired from assigned duties.<br>**2.** Honorably retired from assigned duties and retaining your title along with the additional title `emeritus' as in `professor emeritus'. | *"In academic literature, emeritus designates a professor or minister who is retired from assigned duties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emersion]] | noun | **1.** (astronomy) the reappearance of a celestial body after an eclipse.<br>**2.** The act of emerging. | *"In academic literature, emersion designates (astronomy) the reappearance of a celestial body after an eclipse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emerson]] | noun | **1.** United states writer and leading exponent of transcendentalism (1803-1882). | *"A number of other variations have been worked out by the promoters of recent scientific management, and are known as Taylor's, Gantt's, and Emerson's plans."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[emery]] | noun | **1.** A hard grey-black mineral consisting of corundum and either hematite or magnetite; used as an abrasive (especially as a coating on paper). | *"Emery, _Speculation on the Stock and Produce Exchanges of the United States_, in Columbia University Studies in History, Economics, and Public Law, Vol."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[enumerate]] | verb | **1.** Specify individually.<br>**2.** Determine the number or amount of. | *"Many things, needless to enumerate, press this upon my mind."* — Mrs. Oliphant, *A Beleaguered City* |
| [[enumeration]] | noun | **1.** A numbered list.<br>**2.** The act of counting; reciting numbers in ascending order. | *"Here this mere enumeration must be allowed to convey its own suggestion of far-reaching results for the whole political economy of the nation and of the world."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[enumerator]] | noun | **1.** Someone who collects census data by visiting individual homes. | *"In academic literature, enumerator designates someone who collects census data by visiting individual homes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immerse]] | verb | **1.** Thrust or throw into.<br>**2.** Devote (oneself) fully to. | *"Arrived at the shore, she is stripped of her ornaments, and the bearers stagger with her into the creek, where they immerse her, and all the other women join in splashing water over both the girl and her bearers."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[immersion]] | noun | **1.** Sinking until covered completely with water.<br>**2.** (astronomy) the disappearance of a celestial body prior to an eclipse. | *"As in droughty regions baptism by immersion could only be performed symbolically, Mr."* — George Eliot, *Middlemarch* |
| [[meralgia]] | noun | **1.** Pain in the thigh. | *"In academic literature, meralgia designates pain in the thigh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercantile]] | adjective | **1.** Of or relating to the economic system of mercantilism.<br>**2.** Profit oriented; ; - john buchan. | *"He was employed as book-keeper in a large mercantile house; but soon became addicted to drink, and the story is ever the same; loss of position, poverty, disgrace, suffering and recklessness."* — Classic Author, *The wonders of prayer* |
| [[mercantilism]] | noun | **1.** An economic system (europe in 18th century) to increase a nation's wealth by government regulation of all of the nation's commercial interests.<br>**2.** Transactions (sales and purchases) having the objective of supplying commodities (goods and services). | *"This doctrine as presented in the seventeenth and eighteenth centuries in Europe, was known as _mercantilism_."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mercaptopurine]] | noun | **1.** A drug (trade name purinethol) that interferes with the metabolism of purine and is used to treat acute lymphocytic leukemia. | *"In academic literature, mercaptopurine designates a drug (trade name purinethol) that interferes with the metabolism of purine and is used to treat acute lymphocytic leukemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercator]] | noun | **1.** Flemish geographer who lived in germany; he invented the mercator projection of maps of the globe (1512-1594). | *"In academic literature, mercator designates flemish geographer who lived in germany; he invented the mercator projection of maps of the globe (1512-1594)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercedario]] | noun | **1.** A mountain in the andes in argentina (22,210 feet high). | *"In academic literature, mercedario designates a mountain in the andes in argentina (22,210 feet high)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercenaria]] | noun | **1.** A genus of veneridae. | *"In academic literature, mercenaria designates a genus of veneridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercenary]] | noun | **1.** A person hired to fight for another country than their own.<br>**2.** Marked by materialism. | *"He is well paid that is well satisfied, And I delivering you, am satisfied, And therein do account myself well paid, My mind was never yet more mercenary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercer]] | noun | **1.** A dealer in textiles (especially silks).<br>**2.** British maker of printed calico cloth who invented mercerizing (1791-1866). | *"Then is there here one Master Caper, at the suit of Master Three-pile the mercer, for some four suits of peach-coloured satin, which now peaches him a beggar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercerise]] | verb | **1.** Treat to strengthen and improve the luster. | *"In academic literature, mercerise designates treat to strengthen and improve the luster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercerised]] | verb | **1.** Treat to strengthen and improve the luster.<br>**2.** Of cotton thread that has been treated with sodium hydroxide to shrink it and increase its luster and affinity for dye. | *"In academic literature, mercerised designates treat to strengthen and improve the luster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercerize]] | verb | **1.** Treat to strengthen and improve the luster. | *"In academic literature, mercerize designates treat to strengthen and improve the luster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercerized]] | verb | **1.** Treat to strengthen and improve the luster.<br>**2.** Of cotton thread that has been treated with sodium hydroxide to shrink it and increase its luster and affinity for dye. | *"In academic literature, mercerized designates treat to strengthen and improve the luster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merchandise]] | noun | **1.** Commodities offered for sale.<br>**2.** Engage in the trade of. | *"The merchandise which thou hast brought from Rome Are all too dear for me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merchandiser]] | noun | **1.** A businessperson engaged in retail trade. | *"In academic literature, merchandiser designates a businessperson engaged in retail trade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merchandising]] | noun | **1.** The exchange of goods for an agreed sum of money.<br>**2.** Engage in the trade of. | *"In academic literature, merchandising designates the exchange of goods for an agreed sum of money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merchant]] | noun | **1.** A businessperson engaged in retail trade. | *"Still be’t yours; Bestow it at your pleasure, and believe Caesar’s no merchant to make prize with you Of things that merchants sold."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merchant-venturer]] | noun | **1.** A merchant who undertakes a trading venture (especially a venture that sends goods overseas). | *"In academic literature, merchant-venturer designates a merchant who undertakes a trading venture (especially a venture that sends goods overseas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merchantability]] | noun | **1.** The state of being fit for market; ready to be bought or sold. | *"In academic literature, merchantability designates the state of being fit for market; ready to be bought or sold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merchantable]] | adjective | **1.** Fit to be offered for sale. | *"Neither was the little old shop any longer empty of merchantable goods."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[merchantman]] | noun | **1.** A cargo ship. | *"The _Sparwehr_ was a Dutch merchantman daring the uncharted seas for Indies beyond the Indies."* — Jack London, *The Jacket (The Star-Rover)* |
| [[merciful]] | adjective | **1.** Showing or giving mercy.<br>**2.** (used conventionally of royalty and high nobility) gracious. | *"Be merciful, great Duke, to men of mould."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercifully]] | adverb | **1.** In a compassionate manner. | *"But, good Kate, mock me mercifully; the rather, gentle princess, because I love thee cruelly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercifulness]] | noun | **1.** The feeling that motivates compassion.<br>**2.** A disposition to be kind and forgiving. | *"In academic literature, mercifulness designates the feeling that motivates compassion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merciless]] | adjective | **1.** Having or showing no mercy. | *"O, had the gods done so, I had not now Worthily term’d them merciless to us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercilessly]] | adverb | **1.** Without pity; in a merciless manner. | *"Then with her little scissors, by the aid of a pocket looking-glass, she mercilessly nipped her eyebrows off, and thus insured against aggressive admiration, she went on her uneven way."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mercilessness]] | noun | **1.** Feelings of extreme heartlessness.<br>**2.** Inhumaneness evidenced by an unwillingness to be kind or forgiving. | *"In academic literature, mercilessness designates feelings of extreme heartlessness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merckx]] | noun | **1.** Belgian racing cyclist who won the tour de france five times (born in 1945). | *"In academic literature, merckx designates belgian racing cyclist who won the tour de france five times (born in 1945)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercouri]] | noun | **1.** Greek film actress (1925-1994). | *"In academic literature, mercouri designates greek film actress (1925-1994)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercurial]] | adjective | **1.** Liable to sudden unpredictable change.<br>**2.** Relating to or under the (astrological) influence of the planet mercury. | *"I know the shape of’s leg; this is his hand, His foot Mercurial, his Martial thigh, The brawns of Hercules; but his Jovial face— Murder in heaven!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercurialis]] | noun | **1.** A genus of slender herbs belonging to the family euphorbiaceae. | *"MERCURY UREDO; on the under surface, depressed, yellow, oblong, concentric, at length confluent; spores nearly oval.—On _Mercurialis perennis_ and _M. annua_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[mercuric]] | adjective | **1.** Of or containing mercury. | *"In academic literature, mercuric designates of or containing mercury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercurochrome]] | noun | **1.** A mercurial compound applied topically as an antiseptic; mercurochrome is the trademark. | *"In academic literature, mercurochrome designates a mercurial compound applied topically as an antiseptic; mercurochrome is the trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercurous]] | adjective | **1.** Of or containing mercury. | *"In academic literature, mercurous designates of or containing mercury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercury]] | noun | **1.** A heavy silvery toxic univalent and bivalent metallic element; the only metal that is liquid at ordinary temperatures.<br>**2.** (roman mythology) messenger of jupiter and god of commerce; counterpart of greek hermes. | *"Had I great Juno’s power, The strong-winged Mercury should fetch thee up And set thee by Jove’s side."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercury-contaminated]] | adjective | **1.** Contaminated by mercury. | *"In academic literature, mercury-contaminated designates contaminated by mercury."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercy]] | noun | **1.** Leniency and compassion shown toward offenders by a person or agency charged with administering justice.<br>**2.** A disposition to be kind and forgiving. | *"God’s mercy, maiden! does it curd thy blood To say I am thy mother?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mere]] | noun | **1.** A small pond of standing water.<br>**2.** Being nothing more than specified. | *"The mere word’s a slave, Debauch’d on every tomb, on every grave A lying trophy, and as oft is dumb Where dust and damn’d oblivion is the tomb Of honour’d bones indeed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meredith]] | noun | **1.** United states civil rights leader whose college registration caused riots in traditionally segregated mississippi (born in 1933).<br>**2.** English novelist and poet (1828-1909). | *"Meredith was a most kind and thoughtful woman."* — Anonymous, *Cinderella; Or, The Little Glass Slipper, and Other Stories* |
| [[merely]] | adverb | **1.** And nothing more. | *"Well, I could reply: If we should serve with horse and mares together, The horse were merely lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merestone]] | noun | **1.** An old term for a landmark that consisted of a pile of stones surmounted by an upright slab. | *"In academic literature, merestone designates an old term for a landmark that consisted of a pile of stones surmounted by an upright slab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meretricious]] | adjective | **1.** Like or relating to a prostitute.<br>**2.** Tastelessly showy. | *"She lay solidly in her bed amidst the meretricious gorgeousness she had affected in life, the weight of her body sagging the bed grotesquely toward its center."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[meretriciously]] | adverb | **1.** In a meretricious manner. | *"In academic literature, meretriciously designates in a meretricious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meretriciousness]] | noun | **1.** An appearance of truth that is false or deceptive; seeming plausibility.<br>**2.** Tasteless showiness. | *"In academic literature, meretriciousness designates an appearance of truth that is false or deceptive; seeming plausibility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mericarp]] | noun | **1.** A carpel with one seed; one of a pair split apart at maturity. | *"In academic literature, mericarp designates a carpel with one seed; one of a pair split apart at maturity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merida]] | noun | **1.** The capital of the mexican state of yucatan. | *"In academic literature, merida designates the capital of the mexican state of yucatan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meridian]] | noun | **1.** The highest level or degree attainable; the highest stage of development.<br>**2.** A town in eastern mississippi. | *"I have touched the highest point of all my greatness, And from that full meridian of my glory I haste now to my setting."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meridional]] | adjective | **1.** Of or relating to a meridian.<br>**2.** Located in the south or characteristic of southern people or places. | *"On land, meridional, a bispherical moon, revealed in imperfect varying phases of lunation through the posterior interstice of the imperfectly occluded skirt of a carnose negligent perambulating female, a pillar of the cloud by day."* — James Joyce, *Ulysses* |
| [[meringue]] | noun | **1.** Sweet topping especially for pies made of beaten egg whites and sugar. | *"As a rule I adore scrap suppers after everyone has gone, and the servants have gone to bed, and the guests make sorties into the pantry, and bring out plates of patties and fruit, and derelict meringues, and wobbling halves of jellies and creams."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[merino]] | noun | **1.** White sheep originating in spain and producing a heavy fleece of exceptional quality. | *"You are—” He stopped, ran his eye over my dress, which, as usual, was quite simple: a black merino cloak, a black beaver bonnet; neither of them half fine enough for a lady’s-maid."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[meriones]] | noun | **1.** A genus of cricetidae. | *"Ah! see you not where (fatal to your race) Laertes' son comes with the Pylean sage; Fearless alike, with Teucer joins the chase Stenelaus, skill'd the fistic strife to wage, Nor less expert the fiery steeds to quell; And Meriones, you must know."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[meristem]] | noun | **1.** Undifferentiated tissue from which new cells are formed, as at the tip of a stem or root. | *"In academic literature, meristem designates undifferentiated tissue from which new cells are formed, as at the tip of a stem or root."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merit]] | noun | **1.** Any admirable quality or attribute.<br>**2.** The quality of being deserving (e.g., deserving assistance). | *"What merit do I in my self respect, That is so proud thy service to despise, When all my best doth worship thy defect, Commanded by the motion of thine eyes?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meritable]] | adjective | **1.** Deserving reward or praise. | *"In academic literature, meritable designates deserving reward or praise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merited]] | verb | **1.** Be worthy or deserving.<br>**2.** Properly deserved. | *"This man is better than the man he slew, As well descended as thyself, and hath More of thee merited than a band of Clotens Had ever scar for. [_To the guard._] Let his arms alone; They were not born for bondage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meritless]] | adjective | **1.** Without merit. | *"In academic literature, meritless designates without merit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meritocracy]] | noun | **1.** A form of social system in which power goes to those with superior intellects.<br>**2.** The belief that rulers should be chosen for their superior abilities and not because of their wealth or birth. | *"In academic literature, meritocracy designates a form of social system in which power goes to those with superior intellects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meritocratic]] | adjective | **1.** Relating to or characteristic of a meritocracy. | *"In academic literature, meritocratic designates relating to or characteristic of a meritocracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meritorious]] | adjective | **1.** Deserving reward or praise. | *"Not resolute, except so much were done, For things are often spoke and seldom meant; But that my heart accordeth with my tongue, Seeing the deed is meritorious, And to preserve my sovereign from his foe, Say but the word, and I will be his priest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meritoriously]] | adverb | **1.** In a meritorious manner. | *"They were good qualities, without which no high place can be meritoriously won, but like fire and water, though excellent servants, they were very bad masters."* — Charles Dickens, *Bleak House* |
| [[meritoriousness]] | noun | **1.** The quality of being deserving (e.g., deserving assistance). | *"In academic literature, meritoriousness designates the quality of being deserving (e.g., deserving assistance)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merl]] | noun | **1.** Common black european thrush. | *"In academic literature, merl designates common black european thrush."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merlangus]] | noun | **1.** Whitings. | *"Classical and authoritative lexicons catalog merlangus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merle]] | noun | **1.** Common black european thrush. | *"Now laverocks wake the merry morn Aloft on dewy wing; The merle, in his noontide bow’r, Makes woodland echoes ring; The mavis wild wi’ mony a note, Sings drowsy day to rest: In love and freedom they rejoice, Wi’ care nor thrall opprest."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[merlin]] | noun | **1.** (arthurian legend) the magician who acted as king arthur's advisor.<br>**2.** Small falcon of europe and america having dark plumage with black-barred tail; used in falconry. | *"This prophecy Merlin shall make; for I live before his time. [_Exit._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merlon]] | noun | **1.** A solid section between two crenels in a crenelated battlement. | *"In academic literature, merlon designates a solid section between two crenels in a crenelated battlement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merlot]] | noun | **1.** Black wine grape originally from the region of bordeaux.<br>**2.** Dry red wine made from a grape grown widely in bordeaux and california. | *"In academic literature, merlot designates black wine grape originally from the region of bordeaux."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merluccius]] | noun | **1.** Hakes. | *"Classical and authoritative lexicons catalog merluccius as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mermaid]] | noun | **1.** Half woman and half fish; lives in the sea. | *"At the helm A seeming mermaid steers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merman]] | noun | **1.** United states singer who appeared in several musical comedies (1909-1984).<br>**2.** Half man and half fish; lives in the sea. | *"While I was battering away at the pyramid, a sort of badger-haired old merman, with a hump on his back, takes me by the shoulders, and slews me round. ‘What are you ’bout?’ says he."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[merodach]] | noun | **1.** The chief babylonian god; his consort was sarpanitu. | *"In academic literature, merodach designates the chief babylonian god; his consort was sarpanitu."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meromelia]] | noun | **1.** Congenital absence of part of an arm or leg. | *"In academic literature, meromelia designates congenital absence of part of an arm or leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meronym]] | noun | **1.** A word that names a part of a larger whole. | *"In academic literature, meronym designates a word that names a part of a larger whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meronymy]] | noun | **1.** The semantic relation that holds between a part and the whole. | *"In academic literature, meronymy designates the semantic relation that holds between a part and the whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meropidae]] | noun | **1.** Bee-eaters. | *"In academic literature, meropidae designates bee-eaters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merops]] | noun | **1.** Type genus of the meropidae. | *"Why, Phaëthon—for thou art Merops’ son— Wilt thou aspire to guide the heavenly car, And with thy daring folly burn the world?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merostomata]] | noun | **1.** Used in some classifications; includes the orders xiphosura and eurypterida. | *"In academic literature, merostomata designates used in some classifications; includes the orders xiphosura and eurypterida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merovingian]] | noun | **1.** A member of the merovingian dynasty.<br>**2.** A frankish dynasty founded by clovis i that reigned in gaul and germany from about 500 to 750. | *"In academic literature, merovingian designates a member of the merovingian dynasty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merozoite]] | noun | **1.** A cell that arises from the asexual division of a parent sporozoan during its life cycle. | *"In academic literature, merozoite designates a cell that arises from the asexual division of a parent sporozoan during its life cycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merrily]] | adverb | **1.** In a joyous manner. | *"I play the noble housewife with the time, to entertain it so merrily with a fool."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merrimac]] | noun | **1.** An ironclad vessel built by the confederate forces in the hope of breaking the blockade imposed by the north. | *"In academic literature, merrimac designates an ironclad vessel built by the confederate forces in the hope of breaking the blockade imposed by the north."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merrimack]] | noun | **1.** A river that rises in south central new hampshire and flows through concord and manchester into massachusetts and empties into the atlantic ocean. | *"In academic literature, merrimack designates a river that rises in south central new hampshire and flows through concord and manchester into massachusetts and empties into the atlantic ocean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merriment]] | noun | **1.** A gay feeling.<br>**2.** Activities that are enjoyable or amusing. | *"Where be your gibes now? your gambols? your songs? your flashes of merriment, that were wont to set the table on a roar?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merriness]] | noun | **1.** The trait of merry joking. | *"Well, sir, be it as the style shall give us cause to climb in the merriness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merry]] | adjective | **1.** Full of or showing high-spirited merriment; ; - wordsworth.<br>**2.** Offering fun and gaiety. | *"She is not well, but yet she has her health; she’s very merry, but yet she is not well."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merry-go-round]] | noun | **1.** A never-ending cycle of activities and events (especially when they seem to have little purpose).<br>**2.** A large, rotating machine with seats for children to ride or amusement. | *"In academic literature, merry-go-round designates a never-ending cycle of activities and events (especially when they seem to have little purpose)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merrymaker]] | noun | **1.** A celebrant who shares in a noisy party. | *"From time to time, his quick ear had caught the sound of the distant _hula_ (drum) and the voices of the gay merrymakers."* — Classic Author, *Hawaiian folk tales* |
| [[merrymaking]] | noun | **1.** A boisterous celebration; a merry festivity. | *"Long before this time Weatherbury had been thoroughly aroused, and the wild deed which had terminated Boldwood’s merrymaking became known to all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mertensia]] | noun | **1.** A genus of herbs belonging to the family boraginaceae that grow in temperate regions and have blue or purple flowers shaped like funnels. | *"In academic literature, mertensia designates a genus of herbs belonging to the family boraginaceae that grow in temperate regions and have blue or purple flowers shaped like funnels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merthiolate]] | noun | **1.** A light-colored crystalline powder (trade name merthiolate) used as a surgical antiseptic. | *"In academic literature, merthiolate designates a light-colored crystalline powder (trade name merthiolate) used as a surgical antiseptic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merton]] | noun | **1.** United states religious and writer (1915-1968).<br>**2.** United states sociologist (1910-2003). | *"As he thought of Hetty Merton, he began to wonder if the portrait in the locked room had changed."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[meryta]] | noun | **1.** Small to medium evergreen dioecious trees of oceanic climates: puka. | *"In academic literature, meryta designates small to medium evergreen dioecious trees of oceanic climates: puka."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncommercial]] | adjective | **1.** Not connected with or engaged in commercial enterprises. | *"You must attribute the work in the manner specified by the author or licensor. -- Noncommercial."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[nonsubmergible]] | adjective | **1.** Not submersible or submergible. | *"In academic literature, nonsubmergible designates not submersible or submergible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsubmersible]] | adjective | **1.** Not submersible or submergible. | *"In academic literature, nonsubmersible designates not submersible or submergible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcomer]] | noun | **1.** Someone who overcomes and establishes ascendancy and control by force or persuasion. | *"In academic literature, overcomer designates someone who overcomes and establishes ascendancy and control by force or persuasion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomeranian]] | noun | **1.** Breed of very small compact long-haired dogs of the spitz type. | *"In academic literature, pomeranian designates breed of very small compact long-haired dogs of the spitz type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmeridian]] | adjective | **1.** After noon. | *"In academic literature, postmeridian designates after noon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submerge]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Cover completely or make imperceptible. | *"Master Benjamin, or Ben, as he was called everywhere except in his own family, had got possession of the black kitten, and appeared to be submerging her in the hogshead of rainwater."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[submerged]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Cover completely or make imperceptible. | *"O, I would thou didst, So half my Egypt were submerged and made A cistern for scaled snakes!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[submergence]] | noun | **1.** Sinking until covered completely with water. | *"Purification by Spirit; submergence in 581:24 Spirit."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[submergible]] | adjective | **1.** Capable of being immersed in water or functioning while submerged. | *"In academic literature, submergible designates capable of being immersed in water or functioning while submerged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submerging]] | noun | **1.** Sinking until covered completely with water.<br>**2.** Sink below the surface; go under or as if under water. | *"Master Benjamin, or Ben, as he was called everywhere except in his own family, had got possession of the black kitten, and appeared to be submerging her in the hogshead of rainwater."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[submerse]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Put under water. | *"In academic literature, submerse designates sink below the surface; go under or as if under water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submersed]] | verb | **1.** Sink below the surface; go under or as if under water.<br>**2.** Put under water. | *"In academic literature, submersed designates sink below the surface; go under or as if under water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submersible]] | noun | **1.** An apparatus intended for use under water.<br>**2.** A warship designed to operate under water. | *"In academic literature, submersible designates an apparatus intended for use under water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submersion]] | noun | **1.** Sinking until covered completely with water.<br>**2.** The act of wetting something by submerging it. | *"He had been down once, and submersion in the ice water had nearly deprived him of both consciousness and power to help save himself."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[uncommercial]] | adjective | **1.** Not conducive to commercial success; - h.e.clurman. | *"In academic literature, uncommercial designates not conducive to commercial success; - h.e.clurman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommercialised]] | adjective | **1.** Not having been commercialized. | *"In academic literature, uncommercialised designates not having been commercialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommercialized]] | adjective | **1.** Not having been commercialized. | *"In academic literature, uncommercialized designates not having been commercialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmercenary]] | adjective | **1.** Not mercenary; not influenced by financial gains. | *"I am also of opinion that it is greatly to my credit, and a proof of my pure and unmercenary nature, that I did not instantly put myself up to be raffled for, or rush out into the streets and propose marriage to the first lady I met."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[unmerchantable]] | adjective | **1.** Not fit for sale. | *"In academic literature, unmerchantable designates not fit for sale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmerciful]] | adjective | **1.** Having or showing no mercy. | *"Unmerciful lady as you are, I’m none."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unmercifully]] | adverb | **1.** Without pity; in a merciless manner. | *"It was no easy task, the full pails tugging most unmercifully at his arms."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[unmercifulness]] | noun | **1.** Inhumaneness evidenced by an unwillingness to be kind or forgiving. | *"In academic literature, unmercifulness designates inhumaneness evidenced by an unwillingness to be kind or forgiving."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmerited]] | adjective | **1.** Not merited or deserved.<br>**2.** Not merited. | *"And as long as we have so fluctuating a standard these difficulties must arise again and again, continually repeated, causing unmerited gains and losses to individuals."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unmeritorious]] | adjective | **1.** Without merit. | *"In academic literature, unmeritorious designates without merit."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MER
  </div>
</div>
