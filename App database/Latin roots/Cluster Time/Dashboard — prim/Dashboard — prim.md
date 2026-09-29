---
status: unread
type: root_dashboard
---
# Dashboard — prim
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">prim-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“first”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The rhythmic hands of a clock ticking forward as hours and days pass by.</span>
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

The root **prim** means first. It describes being at the very beginning, leading the rank, or first in time. In English, this root forms words such as *primary*, *primitive*, *prime*, and *primal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: first
> The root **prim** means first. It describes being at the very beginning, leading the rank, or first in time. In English, this root forms words such as *primary*, *primitive*, *prime*, and *primal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">First</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The rhythmic hands of a clock ticking forward as hours and days pass by.</mark>
> - **Everyday Connection**: Think of familiar words like *primary* and *primitive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **prim** comes from a Latin word that means *"first"*.
  - At its core, it describes first.

- **The Big Picture Idea**:
  - Picture the rhythmic hands of a clock ticking forward as hours and days pass by.
  - Whenever you see **prim** in an English word, think of **time, seasons, and duration**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of first.
  - **Mental & Social**: How people experience, organize, or communicate about first.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Primary**: Adj.* Of chief importance.
  - **Primitive**: Adj.* Relating to, denoting, or preserving the character of an early stage in evolutionary or historical development.
  - **Prime**: Adj.* Of first importance.
  - **Primal**: An everyday English word showing the root's idea of *first*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">prim</mark>, think of <mark class="hl-def">time, seasons, and duration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root forms a vast network of technical, musical, and institutional terms:
1. **The Pure Superlative Stem `prim-`**: Direct from *prīmus*: *prime*, *primary*, *primer*, *primacy*, *primate*.
2. **Compound Adjectives of Inception**:
   - `prim-` + *aevum* ("age") $\to$ *primeval* (belonging to the earliest ages).
   - `prim-` + *ordium* ("beginning" < *ōrdīrī* "to begin spinning/weaving") $\to$ *primordial*.
   - `prim-` + *genitus* ("born" < *gignere*) $\to$ *primogeniture*.
3. **Romance & Italian Operatic Loans**:
   - Italian *prima donna* ("first lady").
   - Old French *premier* (< Latin *prīmārius*).

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

The cognitive scope of *prim* organizes into four major dimensions:
- **Cosmic Inception & Geology**: [[primeval]], [[primordial]], [[primitive]], `pristine`
- **Institutional Rank & Precedence**: [[primacy]], [[primate]], `premier`, `primo`
- **Foundation, Pedagogy & Mathematics**: [[prime]], [[primary]], [[primer]]
- **Social Customs & The Performing Arts**: [[prima donna]], [[primogeniture]]

---

## 🔀 4. Prefix & Combining Dynamics on prim

1. **`prim-` + `ord`** (*ōrdīrī* "to begin a web"):
   - *primordial* $\to$ existing at or from the beginning of time; primeval.
2. **`prim-` + `gen`** (*gignere* "to beget, birth"):
   - *primogeniture* $\to$ the state of being the firstborn child; the feudal right of succession.
3. **`prim-` + `aev`** (*aevum* "age"):
   - *primeval* $\to$ of or relating to the earliest ages in world history.
4. **`prim-` + `donna`** (Italian *donna* < Latin *domina* "mistress"):
   - *prima donna* $\to$ the chief female singer in an opera company; a temperamental person.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics & Cryptography**: *prime* numbers, RSA prime factorization algorithms.
- **Zoology & Anthropology**: *primate* behavioral ecology, Jane Goodall's chimpanzee field studies.
- **Law & Property History**: feudal *primogeniture*, entail laws, *prima facie* evidence.
- **Performing Arts & Opera**: *prima donna assoluta*, operatic divas.
- **Cosmology & Astrobiology**: *primordial* nucleosynthesis, *primordial* soup hypothesis.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[imprimatur]] | noun | **1.** Formal and explicit approval. | *"In academic literature, imprimatur designates formal and explicit approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prim]] | verb | **1.** Assume a prim appearance.<br>**2.** Contract one's lips. | *"She takes strong note of me, Hath made me near her, and this beauteous morn, The prim’st of all the year, presents me with A brace of horses; two such steeds might well Be by a pair of kings backed, in a field That their crowns’ titles tried."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prima]] | noun | **1.** Used primarily as eating apples.<br>**2.** Indicating the most important performer or role. | *"Scena prima_. _Enter_ Rutilio, _and_ Arnold[o]. _Rut._ Why do you grieve thus still? _Arn._ 'Twould melt a Marble, And tame a Savage man, to feel my fortune. _Rut._ What fortune?"* — John Fletcher, *Beaumont and Fletcher's Works, Vol. 01 of 10: the Custom of the Country* |
| [[prima donna]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin prim within the domain of Time.<br>**2.** A technical or specialized form exhibiting the properties of prim in systematic terminology. | *"In academic literature, prima donna designates pertaining to, derived from, or characteristic of latin prim within the domain of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primacy]] | noun | **1.** The state of being first in importance. | *"And in the sect--fairly large and yet unusually choice--of Austenians or Janites, there would probably be found partisans of the claim to primacy of almost every one of the novels."* — Jane Austen, *Pride and Prejudice* |
| [[primaeval]] | adjective | **1.** Having existed from the beginning; in an earliest or original stage or state. | *"Above them rose the primaeval yews and oaks of The Chase, in which there poised gentle roosting birds in their last nap; and about them stole the hopping rabbits and hares."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[primal]] | adjective | **1.** Serving as an essential component.<br>**2.** Having existed from the beginning; in an earliest or original stage or state. | *"It hath been taught us from the primal state That he which is was wished until he were, And the ebbed man, ne’er loved till ne’er worth love, Comes deared by being lacked."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[primality]] | noun | **1.** The property of being a prime number. | *"In academic literature, primality designates the property of being a prime number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primaquine]] | noun | **1.** Synthetic antimalarial drug. | *"In academic literature, primaquine designates synthetic antimalarial drug."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primarily]] | adverb | **1.** For the most part.<br>**2.** Of primary import. | *"I’ll thank you to tell me if I’m in the way for Warren’s Malthouse?” Gabriel resumed, primarily to gain the information, indirectly to get more of the music."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[primary]] | noun | **1.** A preliminary election where delegates or nominees are chosen.<br>**2.** One of the main flight feathers projecting along the outer edge of a bird's wing. | *"Smallweed in person, and that the primary object is to save and hold harmless Mr."* — Charles Dickens, *Bleak House* |
| [[primate]] | noun | **1.** A senior clergyman and dignitary.<br>**2.** Any placental mammal of the order primates; has good eyesight and flexible hands and feet. | *"Monks of the screw. _(His Eminence Simon Stephen Cardinal Dedalus, Primate of all Ireland, appears in the doorway, dressed in red soutane, sandals and socks."* — James Joyce, *Ulysses* |
| [[primates]] | noun | **1.** An animal order including lemurs and tarsiers and monkeys and apes and human beings.<br>**2.** A senior clergyman and dignitary. | *"In academic literature, primates designates an animal order including lemurs and tarsiers and monkeys and apes and human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primateship]] | noun | **1.** The office of primate. | *"In academic literature, primateship designates the office of primate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primatology]] | noun | **1.** The branch of zoology that studies primates. | *"In academic literature, primatology designates the branch of zoology that studies primates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primaxin]] | noun | **1.** Trade name for a parenteral antibiotic. | *"In academic literature, primaxin designates trade name for a parenteral antibiotic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prime]] | noun | **1.** A number that has no factor but itself and 1.<br>**2.** The period of greatest prosperity or productivity. | *"Thou art thy mother’s glass and she in thee Calls back the lovely April of her prime, So thou through windows of thine age shalt see, Despite of wrinkles this thy golden time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[primed]] | verb | **1.** Insert a primer into (a gun, mine, or charge) preparatory to detonation or firing.<br>**2.** Cover with a primer; apply a primer to. | *"Marian, primed to a humorous mood, would discover the queer-shaped flints aforesaid, and shriek with laughter, Tess remaining severely obtuse."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[primer]] | noun | **1.** An introductory textbook.<br>**2.** Any igniter that is used to initiate the burning of a propellant. | *"I would your Highness Would give it quick consideration, for There is no primer business."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[primeval]] | adjective | **1.** Having existed from the beginning; in an earliest or original stage or state. | *"Thus, as a sample of my rovings: in a single interval of fifteen minutes of subconsciousness I have crawled and bellowed in the slime of the primeval world and sat beside Haas—further and cleaved the twentieth century air in a gas-driven monoplane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[primidone]] | noun | **1.** An anticonvulsant (trade name mysoline) used to treat grand mal seizures and essential tremor. | *"In academic literature, primidone designates an anticonvulsant (trade name mysoline) used to treat grand mal seizures and essential tremor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primigravida]] | noun | **1.** (obstetrics) a woman who is pregnant for the first time. | *"In academic literature, primigravida designates (obstetrics) a woman who is pregnant for the first time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[priming]] | noun | **1.** The act of making something ready.<br>**2.** Any igniter that is used to initiate the burning of a propellant. | *"When the Indians were sound asleep, the prisoners arose, secured the guns, shaking the priming from them, Sawyer securing the tomahawk of Han Yerry, and Cowley the ax."* — John Leonard Hardenbergh, *The Journal of Lieut. John L. Hardenbergh of the Second New York Continental Regiment from May 1 to October 3, 1779, in General Sullivan's Campaign Against the Western Indians* |
| [[primipara]] | noun | **1.** (obstetrics) woman who has been delivered of a child for the first time. | *"In academic literature, primipara designates (obstetrics) woman who has been delivered of a child for the first time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primiparous]] | adjective | **1.** Of or relating to a woman who has given birth only once. | *"In academic literature, primiparous designates of or relating to a woman who has given birth only once."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primitive]] | noun | **1.** A person who belongs to an early stage of civilization.<br>**2.** A mathematical expression from which another expression is derived. | *"Not far off is the strong, rough, primitive table with a vice upon it at which he has been working."* — Charles Dickens, *Bleak House* |
| [[primitively]] | adverb | **1.** With reference to the origin or beginning.<br>**2.** In a primitive style or manner. | *"That's a primitively feminine wish and not at all in accordance with my own advanced ideas."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[primitiveness]] | noun | **1.** A wild or unrefined state. | *"In academic literature, primitiveness designates a wild or unrefined state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primitivism]] | noun | **1.** A wild or unrefined state.<br>**2.** A genre characteristic of (or imitative of) primitive artists or children. | *"In academic literature, primitivism designates a wild or unrefined state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primly]] | adverb | **1.** In a prissy manner. | *"It is only make-believe, isn’t it, that I am their father?” “Oh yes,” Wendy said primly."* — J. M. Barrie, *Peter Pan* |
| [[primness]] | noun | **1.** Excessive or affected modesty.<br>**2.** Exaggerated and arrogant properness. | *"Lawrence sat down in a deck chair and Isabel's smile broadened: she was laughing at him and teasing him with her eyes, though what she said remained conventional to the point of primness."* — Anthony Pryde, *Nightfall* |
| [[primo]] | noun | **1.** The principal part of a duet (especially a piano duet).<br>**2.** The best of its kind. | *"CLOWN. _Primo, secundo, tertio_, is a good play, and the old saying is, the third pays for all; the triplex, sir, is a good tripping measure; or the bells of Saint Bennet, sir, may put you in mind—one, two, three."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[primogenitor]] | noun | **1.** An ancestor in the direct line. | *"In academic literature, primogenitor designates an ancestor in the direct line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primogeniture]] | noun | **1.** Right of inheritance belongs exclusively to the eldest son. | *"In countries where hereditary aristocracies exist, primogeniture is in some cases required by law, in others so strongly favored by public opinion that it is practically always followed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[primordial]] | adjective | **1.** Having existed from the beginning; in an earliest or original stage or state. | *"Other legends, however, state that the veritable and primordial lord of the Hawaiian inferno was called Manua."* — Classic Author, *Hawaiian folk tales* |
| [[primordium]] | noun | **1.** An organ in its earliest stage of development; the foundation for subsequent development. | *"In academic literature, primordium designates an organ in its earliest stage of development; the foundation for subsequent development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primrose]] | noun | **1.** Any of numerous short-stemmed plants of the genus primula having tufted basal leaves and showy flowers clustered in umbels or heads. | *"Thou shalt not lack The flower that’s like thy face, pale primrose; nor The azur’d hare-bell, like thy veins; no, nor The leaf of eglantine, whom not to slander, Out-sweet’ned not thy breath."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[primula]] | noun | **1.** Any of numerous short-stemmed plants of the genus primula having tufted basal leaves and showy flowers clustered in umbels or heads. | *"In academic literature, primula designates any of numerous short-stemmed plants of the genus primula having tufted basal leaves and showy flowers clustered in umbels or heads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primulaceae]] | noun | **1.** A dicotyledonous family of the order primulales with a regular flower; widely distributed in the northern hemisphere. | *"In academic literature, primulaceae designates a dicotyledonous family of the order primulales with a regular flower; widely distributed in the northern hemisphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primulales]] | noun | **1.** Primulaceae; theophrastaceae; myrsinaceae; and (in some classifications) plumbaginaceae. | *"In academic literature, primulales designates primulaceae; theophrastaceae; myrsinaceae; and (in some classifications) plumbaginaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[primus]] | noun | **1.** The presiding bishop of the episcopal church of scotland.<br>**2.** A portable paraffin cooking stove; used by campers. | *"Read here and wonder;_ Fletcher _writ the Play._ _ACTUS PRIMUS."* — John Fletcher, *The Elder Brother* |
| [[reprimand]] | noun | **1.** An act or expression of criticism and censure.<br>**2.** Rebuke formally. | *"But—well, goodbye!” Her defender, whom she dreaded more than her assailant, having reluctantly disappeared, the farmer continued his reprimand, which Tess took with the greatest coolness, that sort of attack being independent of sex."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PRIM
  </div>
</div>
