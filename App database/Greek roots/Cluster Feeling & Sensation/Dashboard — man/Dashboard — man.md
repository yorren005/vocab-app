---
status: unread
type: root_dashboard
---
# Dashboard — man
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μαίνεσθαι μανία μανικός μάντις (maínesthai)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“crazy”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'crazy'.</span>
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

The Greek root **man** (μαίνεσθαι μανία μανικός μάντις (maínesthai)) signifies crazy. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *hypermania*, *hypomania*, *kleptomania*, *man*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: crazy
> The Greek root **man** fundamentally denotes **crazy**. The physical sensory observation and cognitive anchor underlying 'crazy'. In classical Greek antiquity, the root denoted 'crazy', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">crazy</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'crazy'.</mark>
> - **Everyday Connection**: Think of familiar words like *hypermania*, *hypomania*, *kleptomania*, *man*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **man** derives from Ancient Greek <mark class="hl-stem">μαίνεσθαι μανία μανικός μάντις (maínesthai)</mark>, meaning "crazy".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with man**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'crazy'.
  - Whenever you see **man** in an English word, think immediately of **crazy**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">man</mark>, think of <mark class="hl-def">crazy</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `man-` (from *μαίνεσθαι μανία μανικός μάντις (maínesthai)*).
> - **Combining Stem with -o- Connective:** `mano-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

> [!tip] 🌈 The Conceptual Facets of Man
> - **1. Direct & Concrete Anchor:** Literal instantiation of crazy in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on man

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `man-` | [[hypermania]] | Primary root semantic foundation denoting crazy. |
| **Connecting -o-** | `mano-` | [[hypomania]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `man` | [[kleptomania]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[hypermania]] | noun | **1.** A heightened level of psychological mania. | *"In academic literature, hypermania designates a heightened level of psychological mania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypomania]] | noun | **1.** A mild mania especially when part of bipolar disorder. | *"In academic literature, hypomania designates a mild mania especially when part of bipolar disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[kleptomania]] | noun | **1.** A persistent neurotic impulse to steal especially without economic motive. | *"In academic literature, kleptomania designates a persistent neurotic impulse to steal especially without economic motive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[man]] | noun | **1.** An individual human; especially : an adult male human.<br>**2.** A man belonging to a particular category (as by birth, residence, membership, or occupation) —usually used in combination. | *"How called you the man you speak of, madam?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manage]] | verb | **1.** Be successful; achieve a goal.<br>**2.** Be in charge of, act on, or dispose of. | *"He is already Traduced for levity, and ’tis said in Rome That Photinus, an eunuch, and your maids Manage this war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manageable]] | adjective | **1.** Capable of being managed or controlled.<br>**2.** Capable of existing or taking place or proving true; possible to do. | *"With regard to a large number of matters about which other men are decided or obstinate, he was the most easily manageable man in the world."* — George Eliot, *Middlemarch* |
| [[management]] | noun | **1.** The act of managing something.<br>**2.** Those in charge of running a business. | *"Would you like to live here again and undertake the management of the castle?" Apollonie stared at her master at first as if she could not comprehend his words."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[manager]] | noun | **1.** Someone who controls resources and expenditures.<br>**2.** (sports) someone in charge of training an athlete or a team. | *"Adieu, valour; rust, rapier; be still, drum, for your manager is in love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mania]] | noun | **1.** Excitement manifested by mental and physical hyperactivity, disorganization of behavior, and elevation of mood; specifically : the manic phase of bipolar disorder.<br>**2.** Excessive or unreasonable enthusiasm —often used in combination. | *"My religious mania, or whatever it was, is over."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[maniac]] | noun | **1.** Someone who is or acts mentally unsound; especially : a person who behaves in a wildly foolish, reckless, or dangerous manner.<br>**2.** A person who is extremely enthusiastic about something. | *"You may take the maniac with you to England; confine her with due attendance and precautions at Thornfield: then travel yourself to what clime you will, and form what new tie you like."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[maniacal]] | adjective | **1.** Wildly disordered. | *"But, if the influence was preternatural or maniacal in my brother’s case, they must be equally so in my own."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[maniacally]] | adverb | **1.** In a maniacal manner or to a maniacal degree. | *"In academic literature, maniacally designates in a maniacal manner or to a maniacal degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manic]] | noun | **1.** Affected with, relating to, characterized by, or resulting from mania.<br>**2.** Bipolar disorder. | *"In academic literature, manic designates affected with, relating to, characterized by, or resulting from mania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manliness]] | noun | **1.** The trait of being manly; having the characteristics of an adult male. | *"But the downward steps had destroyed his will, his self-control, his manliness, his virtue."* — Classic Author, *The wonders of prayer* |
| [[manly]] | adjective | **1.** Possessing qualities befitting a man.<br>**2.** Characteristic of a man. | *"He wears his honour in a box unseen That hugs his kicky-wicky here at home, Spending his manly marrow in her arms, Which should sustain the bound and high curvet Of Mars’s fiery steed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manor]] | noun | **1.** The mansion of a lord or wealthy person.<br>**2.** The landed estate of a lord (including the house on it). | *"I know a man that had this trick of melancholy sold a goodly manor for a song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manorial]] | adjective | **1.** Of or relating to or based on the manor. | *"It was not a manorial home in the ordinary sense, with fields, and pastures, and a grumbling farmer, out of whom the owner had to squeeze an income for himself and his family by hook or by crook."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mansion]] | noun | **1.** (astrology) one of 12 equal areas into which the zodiac is divided.<br>**2.** A large and imposing house. | *"O what a mansion have those vices got, Which for their habitation chose out thee, Where beauty’s veil doth cover every blot, And all things turns to fair, that eyes can see!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manure]] | noun | **1.** Any animal or plant material used to fertilize land especially animal excreta usually with litter material.<br>**2.** Spread manure, as for fertilization. | *"And if you crown him, let me prophesy The blood of English shall manure the ground And future ages groan for this foul act."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[megalomania]] | noun | **1.** A mania for great or grandiose performance.<br>**2.** A delusional mental illness that is marked by feelings of personal omnipotence and grandeur. | *"In academic literature, megalomania designates a mania for great or grandiose performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalomaniac]] | noun | **1.** A pathological egotist. | *"In academic literature, megalomaniac designates a pathological egotist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalomaniacal]] | adjective | **1.** Suffering from megalomania. | *"In academic literature, megalomaniacal designates suffering from megalomania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalomanic]] | adjective | **1.** Suffering from megalomania. | *"In academic literature, megalomanic designates suffering from megalomania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomania]] | noun | **1.** Mental illness especially when limited in expression to one idea or area of thought.<br>**2.** Excessive concentration on a single object or idea. | *"It’s a monomania with him to think he is possessed of documents."* — Charles Dickens, *Bleak House* |
| [[monomaniac]] | noun | **1.** A person suffering from monomania. | *"The White Whale swam before him as the monomaniac incarnation of all those malicious agencies which some deep men feel eating in them, till they are left living on with half a heart and half a lung."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[monomaniacal]] | adjective | **1.** Obsessed with a single subject or idea. | *"Well suppressed, indeed, and kept firmly in check for his daughter's sake, and by his brave wife's aid; but insanity, none the less, of the profoundest monomaniacal pattern, for all that."* — Grant Allen, *Michael's Crag* |
| [[unman]] | verb | **1.** Cause to lose one's nerve. | *"In academic literature, unman designates cause to lose one's nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmanageable]] | adjective | **1.** Difficult to use or handle or manage because of size or weight or shape.<br>**2.** Hard to control; ,. | *"Tulkinghorn observes, following her out upon the staircase, “as the most implacable and unmanageable of women."* — Charles Dickens, *Bleak House* |
| [[unmanliness]] | noun | **1.** The trait of being effeminate (derogatory of a man). | *"In academic literature, unmanliness designates the trait of being effeminate (derogatory of a man)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmanly]] | adjective | **1.** Not possessing qualities befitting a man.<br>**2.** Lacking in courage and manly strength and resolution; contemptibly fearful. | *"Be thou a prey unto the house of York, And die in bands for this unmanly deed!"* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Feeling & Sensation]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MAN
  </div>
</div>
