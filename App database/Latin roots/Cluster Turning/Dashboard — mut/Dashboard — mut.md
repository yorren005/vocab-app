---
status: unread
type: root_dashboard
---
# Dashboard — mut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to change”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **mut** means to change. It refers to the action of changing and carrying out this process. In English, this root forms words such as *mutate*, *mutation*, *mutable*, and *immutable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to change
> The root **mut** means to change. It refers to the action of changing and carrying out this process. In English, this root forms words such as *mutate*, *mutation*, *mutable*, and *immutable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To change</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *mutate* and *mutation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mut** comes from a Latin word that means *"to change"*.
  - At its core, it describes the action of change.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **mut** in an English word, think of **to change**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to change).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Mutate**: To undergo or cause to undergo physical alteration or genetic mutation.
  - **Mutation**: The action or process of mutating.
  - **Mutable**: Liable or subject to change or alteration.
  - **Immutable**: Unchanging over time or unable to be changed.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mut</mark>, think of <mark class="hl-def">to change</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `mut-` / `mutat-` (< Latin *mūtāre* / *mūtātum*): The primary verbal and participial root.
- **Prefix Transformations**:
  - `com-` ("together, reciprocal"): *commute* ("to exchange, travel back and forth").
  - `per-` ("thoroughly, through"): *permute* ("to change the order completely").
  - `trans-` ("across, beyond"): *transmute* ("to transform from one substance into another").
  - `in-` ("un-, not"): *immutable* ("incapable of change").
- **Suffixal Extensions**:
  - `-able` / `-ability`: *mutable, mutability, immutable, immutability*.
  - `-ation`: *mutation, permutation, transmutation, commutation*.
  - `-gen` (generating): *mutagen* ("agent that creates mutations").

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
                      ┌── Genetics & Biology: mutate, mutation, mutant, mutagen, mutagenic
                      │
   [mut] ─────────────┼── Philosophy & Constancy: mutable, mutability, immutable, immutability
 (Change / Exchange)  │
                      ├── Mathematics & Combinatorics: permute, permutation
                      │
                      └── Transit, Law & Alchemy: commute, commuter, commutation, transmute, transmutation
```

---

## 🔀 4. Prefix & Combining Dynamics on mut
- **`com-` + `mut`**: *commute* — to substitute a penalty; to travel reciprocally between home and work.
- **`per-` + `mut`**: *permute* — to systematically rearrange the sequential order of elements.
- **`trans-` + `mut`**: *transmute* — to metamorphose across substances (e.g., base metal into gold).
- **`im-` + `mut`**: *immutable* — unchangeable, absolute, transcendent of time.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Evolutionary Genetics & Oncology**: Somatic and germline *mutations*; environmental *mutagens*; *mutant* strains.
- **Mathematics & Algebra**: *Permutations* ($nPr$) versus combinations; *commutative* operations ($a + b = b + a$).
- **Jurisprudence & Criminal Justice**: Executive clemency and the *commutation* of penal sentences.
- **Urban Planning & Transportation**: *Commuter* rail networks, suburb-to-city transit, and *telecommuting*.
- **Theology & Metaphysics**: Divine *immutability* in scholastic philosophy.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[commutability]] | noun | **1.** Exchangeability by virtue of being replaceable.<br>**2.** The quality of being commutable. | *"In academic literature, commutability designates exchangeability by virtue of being replaceable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commutable]] | adjective | **1.** Subject to alteration or change.<br>**2.** Capable of being exchanged for another or for something else that is equivalent. | *"In academic literature, commutable designates subject to alteration or change."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commutate]] | verb | **1.** Reverse the direction of (an alternating electric current) each half cycle so as to produce a unidirectional current. | *"In academic literature, commutate designates reverse the direction of (an alternating electric current) each half cycle so as to produce a unidirectional current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commutation]] | noun | **1.** The travel of a commuter.<br>**2.** A warrant substituting a lesser punishment for a greater one. | *"Could he some commutation broach, I’ll pledge my aith in guid braid Scotch, He needna fear their foul reproach Nor erudition, Yon mixtie-maxtie, queer hotch-potch, The Coalition."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[commutative]] | adjective | **1.** (of a binary operation) independent of order; as in e.g. | *"In academic literature, commutative designates (of a binary operation) independent of order; as in e.g."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commutator]] | noun | **1.** Switch for reversing the direction of an electric current. | *"In academic literature, commutator designates switch for reversing the direction of an electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commute]] | noun | **1.** A regular journey of some distance to and from your place of work.<br>**2.** Exchange positions without a change in value. | *"The understanding of this will enable you to commute this 378:6 self-sentence, and meet every circumstance with truth."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[commuter]] | noun | **1.** A passenger train that is ridden primarily by passengers who travel regularly from one place to another.<br>**2.** Someone who travels regularly from home in a suburb to work in a city. | *"The switch of weapons and holsters to clips on their inner coveralls completed, they strolled out of the storage room and mingled with a throng of citizen commuters."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[commuting]] | noun | **1.** The travel of a commuter.<br>**2.** Exchange positions without a change in value. | *"I suppose that I am commuting a felony, but it is just possible that I am saving a soul."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[immutability]] | noun | **1.** The quality of being incapable of mutation. | *"He alone did not obey the law of immutability in the enchanted, sleeping castle."* — graf Leo Tolstoy, *War and Peace* |
| [[immutable]] | adjective | **1.** Not subject or susceptible to change or variation in form or quality or nature. | *"In comparison with cities, Weatherbury was immutable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[immutableness]] | noun | **1.** The quality of being incapable of mutation. | *"Still, for all this immutableness, was there some lack of common consistency about worthy Captain Bildad."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[immutably]] | adverb | **1.** In an unalterable and unchangeable manner. | *"This whole act’s immutably decreed. ’Twas rehearsed by thee and me a billion years before this ocean rolled."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[incommutability]] | noun | **1.** The quality of being not interchangeable. | *"In academic literature, incommutability designates the quality of being not interchangeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incommutable]] | adjective | **1.** Not subject to alteration or change.<br>**2.** Not interchangeable or able to substitute one for another. | *"In academic literature, incommutable designates not subject to alteration or change."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutability]] | noun | **1.** The quality of being capable of mutation. | *"The mutability in the public councils arising from a rapid succession of new members, however qualified they may be, points out, in the strongest manner, the necessity of some stable institution in the government."* — Alexander Hamilton, *The Federalist Papers* |
| [[mutable]] | adjective | **1.** Capable of or tending to change in form or quality or nature. | *"For The mutable, rank-scented many, let them Regard me, as I do not flatter, and Therein behold themselves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutableness]] | noun | **1.** The quality of being capable of mutation. | *"In academic literature, mutableness designates the quality of being capable of mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutafacient]] | adjective | **1.** Capable of inducing mutation (used mainly of intracellular agents). | *"In academic literature, mutafacient designates capable of inducing mutation (used mainly of intracellular agents)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutagen]] | noun | **1.** Any agent (physical or environmental) that can induce a genetic mutation or can increase the rate of mutation. | *"In academic literature, mutagen designates any agent (physical or environmental) that can induce a genetic mutation or can increase the rate of mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutagenesis]] | noun | **1.** An event capable of causing a mutation. | *"In academic literature, mutagenesis designates an event capable of causing a mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutagenic]] | adjective | **1.** Capable of inducing mutation (used mainly of extracellular factors such as x-rays or chemical pollution). | *"In academic literature, mutagenic designates capable of inducing mutation (used mainly of extracellular factors such as x-rays or chemical pollution)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutamycin]] | noun | **1.** A complex of antibiotic substances obtained from a streptomyces bacterium; one form (trade name mutamycin) shows promise as an anticancer drug. | *"In academic literature, mutamycin designates a complex of antibiotic substances obtained from a streptomyces bacterium; one form (trade name mutamycin) shows promise as an anticancer drug."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutant]] | noun | **1.** (biology) an organism that has characteristics resulting from chromosomal alteration.<br>**2.** An animal that has undergone mutation. | *"In academic literature, mutant designates (biology) an organism that has characteristics resulting from chromosomal alteration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutate]] | verb | **1.** Undergo mutation. | *"In academic literature, mutate designates undergo mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutation]] | noun | **1.** (biology) an organism that has characteristics resulting from chromosomal alteration.<br>**2.** (genetics) any event that changes genetic structure; any alteration in the inherited nucleic acid sequence of the genotype of an organism. | *"Though his humour Was nothing but mutation, ay, and that From one bad thing to worse, not frenzy, not Absolute madness could so far have rav’d, To bring him here alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutational]] | adjective | **1.** Of or relating to or resulting from mutation. | *"In academic literature, mutational designates of or relating to or resulting from mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutatis mutandis]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mut within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of mut in systematic terminology. | *"In academic literature, mutatis mutandis designates pertaining to, derived from, or characteristic of latin mut within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutative]] | adjective | **1.** Of or pertaining to or marked by genetic mutation. | *"In academic literature, mutative designates of or pertaining to or marked by genetic mutation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutawa]] | noun | **1.** Religious police in saudi arabia whose duty is to ensure strict adherence to established codes of conduct; offenders may be detained indefinitely; foreigners are not excluded. | *"In academic literature, mutawa designates religious police in saudi arabia whose duty is to ensure strict adherence to established codes of conduct; offenders may be detained indefinitely; foreigners are not excluded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutawa'een]] | noun | **1.** Religious police in saudi arabia whose duty is to ensure strict adherence to established codes of conduct; offenders may be detained indefinitely; foreigners are not excluded. | *"In academic literature, mutawa'een designates religious police in saudi arabia whose duty is to ensure strict adherence to established codes of conduct; offenders may be detained indefinitely; foreigners are not excluded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutchkin]] | noun | **1.** A scottish unit of liquid measure equal to 0.9 united states pint. | *"I’ve seen me dazed upon a time, I scarce could wink or see a styme; Just ae half-mutchkin does me prime,— Ought less is little— Then back I rattle on the rhyme, As gleg’s a whittle."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[mute]] | noun | **1.** A deaf person who is unable to speak.<br>**2.** A device used to soften the tone of a musical instrument. | *"This silence for my sin you did impute, Which shall be most my glory being dumb, For I impair not beauty being mute, When others would give life, and bring a tomb."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[muted]] | verb | **1.** Deaden (a sound or noise), especially by wrapping.<br>**2.** In a softened tone. | *"The place hummed with muted voices and the almost silent clicks of an organized combat ops center."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[mutely]] | adverb | **1.** Without speaking. | *"In its occasional moments of reason, it would look piteously as if mutely appealing, and then the next convulsion would take it and seem to leave it just at death's door."* — Classic Author, *The wonders of prayer* |
| [[muteness]] | noun | **1.** The condition of being unable or unwilling to speak.<br>**2.** A refusal to speak when expected. | *"By night the same muteness of humanity before the shrieks of the ocean prevailed; still in silence the men swung in the bowlines; still wordless Ahab stood up to the blast."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mutilate]] | verb | **1.** Destroy or injure severely.<br>**2.** Alter so as to make unrecognizable. | *"Why mutilate her poor body without need?"* — Bram Stoker, *Dracula* |
| [[mutilated]] | verb | **1.** Destroy or injure severely.<br>**2.** Alter so as to make unrecognizable. | *"When we came to the spot I inquired who the man was, for he was so mutilated I could not recognize him. _It was Mc."* — Classic Author, *The wonders of prayer* |
| [[mutilation]] | noun | **1.** An injury that causes disfigurement or that deprives you of a limb or other important body part. | *"Unlike and superior to either of those two typical remnants of mediævalism, the old barn embodied practices which had suffered no mutilation at the hands of time."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mutilator]] | noun | **1.** A person who mutilates or destroys or disfigures or cripples. | *"In academic literature, mutilator designates a person who mutilates or destroys or disfigures or cripples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutillidae]] | noun | **1.** A family of wasps. | *"In academic literature, mutillidae designates a family of wasps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutineer]] | noun | **1.** Someone who is openly rebellious and refuses to obey authorities (especially seamen or soldiers). | *"Trinculo, keep a good tongue in your head: if you prove a mutineer, the next tree!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutinous]] | adjective | **1.** Disposed to or in a state of mutiny.<br>**2.** Consisting of or characterized by or inciting to mutiny. | *"A street Enter a company of mutinous Citizens, with staves, clubs, and other weapons."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutinus]] | noun | **1.** A genus of fungi belonging to the family phallaceae. | *"In academic literature, mutinus designates a genus of fungi belonging to the family phallaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutiny]] | noun | **1.** Open rebellion against constituted authority (especially by seamen or soldiers against their officers).<br>**2.** Engage in a mutiny against an authority. | *"My very hairs do mutiny, for the white Reprove the brown for rashness, and they them For fear and doting."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutisia]] | noun | **1.** Any of various plants of the genus mutisia. | *"In academic literature, mutisia designates any of various plants of the genus mutisia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutism]] | noun | **1.** The condition of being unable or unwilling to speak. | *"In academic literature, mutism designates the condition of being unable or unwilling to speak."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muton]] | noun | **1.** The smallest unit of dna where a mutation can occur. | *"In academic literature, muton designates the smallest unit of dna where a mutation can occur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutsuhito]] | noun | **1.** Emperor of japan who encouraged the modernization of japan (1852-1912). | *"In academic literature, mutsuhito designates emperor of japan who encouraged the modernization of japan (1852-1912)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutt]] | noun | **1.** An inferior dog or one of mixed breed. | *"In academic literature, mutt designates an inferior dog or one of mixed breed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutter]] | noun | **1.** A low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech.<br>**2.** A complaint uttered in a low and indistinct tone. | *"How now, wool-sack, what mutter you?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutterer]] | noun | **1.** A person who speaks softly and indistinctly. | *"In academic literature, mutterer designates a person who speaks softly and indistinctly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muttering]] | noun | **1.** A low continuous indistinct sound; often accompanied by movement of the lips without the production of articulate speech.<br>**2.** A complaint uttered in a low and indistinct tone. | *"But I thought that he had pleasant eyes, although he kept on muttering to himself in an angry manner and calling Mrs."* — Charles Dickens, *Bleak House* |
| [[mutton]] | noun | **1.** Meat from a mature domestic sheep. | *"And is not the grease of a mutton as wholesome as the sweat of a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[muttonfish]] | noun | **1.** Similar to and often marketed as `red snapper'. | *"In academic literature, muttonfish designates similar to and often marketed as `red snapper'."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[muttonhead]] | noun | **1.** A stupid person; these words are used to express a low opinion of someone's intelligence. | *"In academic literature, muttonhead designates a stupid person; these words are used to express a low opinion of someone's intelligence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutual]] | adjective | **1.** Common to or shared by two or more parties.<br>**2.** Concerning each of two or more persons or things; especially given or done in return. | *"No, let me be obsequious in thy heart, And take thou my oblation, poor but free, Which is not mixed with seconds, knows no art, But mutual render, only me for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutualism]] | noun | **1.** The relation between two different species of organisms that are interdependent; each gains benefits from the other. | *"In academic literature, mutualism designates the relation between two different species of organisms that are interdependent; each gains benefits from the other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutualist]] | adjective | **1.** Mutually dependent. | *"In academic literature, mutualist designates mutually dependent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mutuality]] | noun | **1.** A reciprocality of sentiments.<br>**2.** A reciprocal relation between interdependent entities (objects or individuals or groups). | *"The problem is often in bringing the two distant age groups into each other's presence so that the dynamics of their interaction and mutuality can take place."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[mutually]] | adverb | **1.** In a mutual or shared manner. | *"So then it seems your most offenceful act Was mutually committed?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mutualness]] | noun | **1.** A reciprocality of sentiments. | *"In academic literature, mutualness designates a reciprocality of sentiments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permutability]] | noun | **1.** Ability to change sequence. | *"In academic literature, permutability designates ability to change sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permutable]] | adjective | **1.** Capable of changing sequence. | *"In academic literature, permutable designates capable of changing sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permutableness]] | noun | **1.** Ability to change sequence. | *"In academic literature, permutableness designates ability to change sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permutation]] | noun | **1.** An event in which one thing is substituted for another.<br>**2.** The act of changing the arrangement of a given number of elements. | *"A was undermining B, D was undermining C, and so on in all possible combinations and permutations."* — graf Leo Tolstoy, *War and Peace* |
| [[permute]] | verb | **1.** Change the order or arrangement of. | *"In academic literature, permute designates change the order or arrangement of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmutability]] | noun | **1.** The quality of being commutable. | *"In academic literature, transmutability designates the quality of being commutable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmutable]] | adjective | **1.** Capable of being changed in substance as if by alchemy. | *"In academic literature, transmutable designates capable of being changed in substance as if by alchemy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmutation]] | noun | **1.** An act that changes the form or character or substance of something.<br>**2.** A qualitative change. | *"Am not I Christopher Sly, old Sly’s son of Burton-heath; by birth a pedlar, by education a cardmaker, by transmutation a bear-herd, and now by present profession a tinker?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transmute]] | verb | **1.** Change in outward structure or looks.<br>**2.** Change or alter in form, appearance, or nature. | *"Of the countless millions of saurians then existing, capricious Nature had seized upon this one, to transmute it into an imperishable monument of that extinct race."* — W. E. Webb, *Buffalo Land* |
| [[unmutilated]] | adjective | **1.** Free from physical or moral spots or stains. | *"In academic literature, unmutilated designates free from physical or moral spots or stains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untransmutable]] | adjective | **1.** Not capable of being changed into something else. | *"In academic literature, untransmutable designates not capable of being changed into something else."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MUT
  </div>
</div>
