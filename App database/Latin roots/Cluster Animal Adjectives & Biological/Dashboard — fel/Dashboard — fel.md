---
status: unread
type: root_dashboard
---
# Dashboard — fel
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fel-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“cat”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sleek cat stepping quietly across a sunlit room.</span>
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

The root **fel** means cat. It refers to cat / feline stealth / obligate carnivoran agility. In English, this root forms words such as *feline*, *felinity*, *felinely*, and *subfeline*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: cat
> The root **fel** means cat. It refers to cat / feline stealth / obligate carnivoran agility. In English, this root forms words such as *feline*, *felinity*, *felinely*, and *subfeline*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Cat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sleek cat stepping quietly across a sunlit room.</mark>
> - **Everyday Connection**: Think of familiar words like *feline* and *felinity*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fel** comes from a Latin word that means *"cat"*.
  - At its core, it describes cat.

- **The Big Picture Idea**:
  - Picture a sleek cat stepping quietly across a sunlit room.
  - Whenever you see **fel** in an English word, think of **a cat or feline agility**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of cat.
  - **Mental & Social**: How people experience, organize, or communicate about cat.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Feline**: Of, relating to, or affecting cats or the mammalian family Felidae.
  - **Felinity**: The quality, nature, or characteristics of a cat.
  - **Felinely**: In a manner characteristic of a cat.
  - **Subfeline**: Partially or imperfectly resembling a cat.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fel</mark>, think of <mark class="hl-def">a cat or feline agility</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Pathways
> Because *fēlēs* is an elemental noun rather than a verb, it does not combine with Latin directional prefixes (*ad-, con-, dis-*). Derivation occurs strictly through:
> 1. **Adjectival Suffixation (`-īnus` / `-form`):**
>    - `fel-` + `-īnus` $\to$ [[feline]] ("of or resembling a cat; sleekly graceful; stealthy").
>    - `fel-` + `-form` (Latin *forma*) $\to$ [[feliform]] ("cat-like in shape or anatomical structure").
>    - `sub-` + `feline` $\to$ [[subfeline]] ("partially cat-like; sub-family grade").
> 2. **Abstract Nominal Suffixation (`-itās`):**
>    - `feline` + `-ity` (Latin *-itās*) $\to$ [[felinity]] ("the quality or state of being cat-like").
> 3. **Linnaean Systematic Biology (`-idae`, `-inae`, `-ia`):**
>    - Nom. *Felis* $\to$ [[Felis]] (the core genus of small cats).
>    - `fel-` + `-idae` $\to$ [[Felidae]] (the global cat family).
>    - `fel-` + `-id` $\to$ [[felid]] / [[felids]] (anglicized family member).
>    - `fel-` + `-inae` $\to$ [[Felinae]] (subfamily of purring small cats).
>    - `fel-` + `forma` + `-ia` $\to$ [[Feliformia]] (suborder of cat-like carnivorans).
> 4. **Compound Formations:**
>    - `fel-` + `-cide` (Latin *caedere*) $\to$ [[felicide]] ("the killing of a cat").
>    - `fel-` + `cultūra` $\to$ [[feliculture]] ("the breeding and rearing of cats").

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Systematic Zoology & Phylogenetics:** [[Felidae]], [[felid]], [[Felis]], [[Felinae]], [[Feliformia]] — hypercarnivorous felids with protractile claws, shortened muzzles, and specialized shearing carnassial teeth.
> - **Behavioral Description & Literature:** [[feline]], [[felinity]], [[felinely]] — stealthy, soundless motion, voluptuous grace, predatory cunning, or treacherous amiability.
> - **Veterinary Science & Pathology:** [[feline]] — feline leukemia virus (FeLV), feline immunodeficiency virus (FIV), feline infectious peritonitis (FIP), and feline lower urinary tract disease (FLUTD).
> - **Comparative Anatomy & Evolutionary Morphology:** [[feliform]], [[Feliformia]] — distinguishing auditory bullae septum anatomy between cat-like (*Feliformia*) and dog-like (*Caniformia*) carnivorans.
> - **Animal Husbandry & Cattery Management:** [[feliculture]], [[felicide]] — pedigreed cat breeding standards and legal statutes protecting domestic companions.

---

## 🔀 4. Prefix & Combining Dynamics on fel

### Morphological Elements & Compounds

| Element / Compound | Linguistic Mechanism | Derived Form | Resulting Meaning & Context |
| :--- | :--- | :--- | :--- |
| `fel-` + `-ine` | Adjectival suffix (*-īnus*) | [[feline]] | Belonging to cats; sleekly graceful, quiet, or treacherous. |
| `feline` + `-ity` | Abstract nominal suffix | [[felinity]] | The essential demeanor, stealth, or anatomical quality of a cat. |
| `feline` + `-ly` | Adverbial suffix | [[felinely]] | Moving or acting with silent, cat-like poise and agility. |
| `fel-` + `-idae` | Zoological family suffix | [[Felidae]] | The global mammalian family of obligate feline carnivores. |
| `fel-` + `-id` | Anglicized member noun | [[felid]] | Any wild or domestic species belonging to Felidae. |
| `fel-` + `-inae` | Subfamily suffix | [[Felinae]] | The subfamily of cats that can purr continuously but cannot roar. |
| `fel-` + `forma` | Descriptive compound (*forma*) | [[feliform]] | Having the physical contours, dentition, or anatomy of a cat. |
| `fel-` + `forma` + `-ia` | Subordinal clade suffix | [[Feliformia]] | Carnivoran suborder including cats, hyenas, civets, and mongooses. |
| `sub-` + `feline` | Qualifying prefix (*sub-*) | [[subfeline]] | Partially cat-like; of intermediate or subordinate feline grade. |
| `fel-` + `-cide` | Nominal compound (*caedere*) | [[felicide]] | The deliberate slaughter or destruction of a cat. |
| `fel-` + `cultūra` | Agrarian compound (*cultūra*) | [[feliculture]] | The domestic science of breeding and rearing pedigree cats. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🐅 **Evolutionary Mammalogy & Ecology** | [[Felidae]], [[felid]], [[Feliformia]] | Apex predator trophic cascades (e.g., cougars, tigers); conserving fragmented snow leopard habitats. |
| 🩺 **Veterinary Medicine & Pharmacology** | [[feline]] | Formulating species-specific anesthetics and investigating renal failure in aging domestic felines. |
| 🐾 **Comparative Carnivoran Anatomy** | [[feliform]], [[Felinae]], [[Felis]] | Dissecting double-chambered auditory bullae and protractile claw sheath mechanisms. |
| 🎭 **Literary Characterization & Film** | [[feline]], [[felinity]] | Describing femme fatales, silent thieves, and martial artists moving with predatory balance. |
| 🐱 **Pedigree Breeding & Companion Welfare** | [[feliculture]], [[felicide]] | Governing show breed standards (Maine Coon, Siamese) and prosecuting companion animal cruelty. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[felafel]] | noun | **1.** Small croquette of mashed chick peas or fava beans seasoned with sesame seeds. | *"In academic literature, felafel designates small croquette of mashed chick peas or fava beans seasoned with sesame seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felicia]] | noun | **1.** Genus of tropical african herbs or subshrubs with usually blue flowers. | *"Once he approached Miss Felicia Dorothea Browne (afterwards Mrs."* — Sydney Waterlow, *Shelley* |
| [[felicitate]] | verb | **1.** Express congratulations. | *"In my true heart I find she names my very deed of love; Only she comes too short, that I profess Myself an enemy to all other joys Which the most precious square of sense possesses, And find I am alone felicitate In your dear highness’ love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felicitation]] | noun | **1.** (usually plural) an expression of pleasure at the success or good fortune of another.<br>**2.** The act of acknowledging that someone has an occasion for celebration. | *"George, in his domestic character of Bluffy, to take leave of Quebec and Malta and insinuate a sponsorial shilling into the pocket of his godson with felicitations on his success in life, it is dark when Mr."* — Charles Dickens, *Bleak House* |
| [[felicitous]] | adjective | **1.** Exhibiting an agreeably appropriate manner or style.<br>**2.** Marked by good fortune. | *"He had remained in Shropshire, lamenting the blindness of his own pride, and the blunders of his own calculations, till at once released from Louisa by the astonishing and felicitous intelligence of her engagement with Benwick."* — Jane Austen, *Persuasion* |
| [[felicitously]] | adverb | **1.** In a felicitous manner. | *"Brooke read them, seemed felicitously worded—surprisingly the right thing, and determined a sequel which he had never before thought of."* — George Eliot, *Middlemarch* |
| [[felicitousness]] | noun | **1.** Pleasing and appropriate manner or style (especially manner or style of expression). | *"In academic literature, felicitousness designates pleasing and appropriate manner or style (especially manner or style of expression)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felicity]] | noun | **1.** Pleasing and appropriate manner or style (especially manner or style of expression).<br>**2.** State of well-being characterized by emotions ranging from contentment to intense joy. | *"If thou didst ever hold me in thy heart, Absent thee from felicity awhile, And in this harsh world draw thy breath in pain, To tell my story. [_March afar off, and shot within._] What warlike noise is this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felid]] | noun | **1.** Any of various lithe-bodied roundheaded fissiped mammals, many with retractile claws. | *"In academic literature, felid designates any of various lithe-bodied roundheaded fissiped mammals, many with retractile claws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felidae]] | noun | **1.** Cats; wildcats; lions; leopards; cheetahs; saber-toothed tigers. | *"In academic literature, felidae designates cats; wildcats; lions; leopards; cheetahs; saber-toothed tigers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[feliform]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fel within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of fel in systematic terminology. | *"In academic literature, feliform designates pertaining to, derived from, or characteristic of latin fel within the domain of animal adjectives & biological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[feline]] | noun | **1.** Any of various lithe-bodied roundheaded fissiped mammals, many with retractile claws.<br>**2.** Of or relating to cats. | *"That feline personage, with her lips tightly shut and her eyes looking out at him sideways, softly closes the door before replying."* — Charles Dickens, *Bleak House* |
| [[felinity]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fel within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of fel in systematic terminology. | *"In academic literature, felinity designates pertaining to, derived from, or characteristic of latin fel within the domain of animal adjectives & biological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felis]] | noun | **1.** Type genus of the felidae: true cats and most wildcats. | *"In academic literature, felis designates type genus of the felidae: true cats and most wildcats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fell]] | noun | **1.** The dressed skin of an animal (especially a large animal).<br>**2.** Seam made by turning under or folding together and stitching the seamed materials to avoid rough edges. | *"And for a woman wert thou first created, Till nature as she wrought thee fell a-doting, And by addition me of thee defeated, By adding one thing to my purpose nothing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fella]] | noun | **1.** A boy or man. | *"In academic literature, fella designates a boy or man."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fellah]] | noun | **1.** An agricultural laborer in arab countries. | *"After three days the mock king is condemned to death; the envelope or shell in which he was encased is committed to the flames, and from its ashes the Fellah creeps forth."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[fellata]] | noun | **1.** A member of a pastoral and nomadic people of western africa; they are traditionally cattle herders of muslim faith. | *"In academic literature, fellata designates a member of a pastoral and nomadic people of western africa; they are traditionally cattle herders of muslim faith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fellate]] | verb | **1.** Provide sexual gratification through oral stimulation. | *"In academic literature, fellate designates provide sexual gratification through oral stimulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fellatio]] | noun | **1.** Oral stimulation of the penis. | *"In academic literature, fellatio designates oral stimulation of the penis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fellation]] | noun | **1.** Oral stimulation of the penis. | *"In academic literature, fellation designates oral stimulation of the penis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[feller]] | noun | **1.** A person who fells trees.<br>**2.** A boy or man. | *"And when I seed her, ’twas nothing but blushes with me!” “Poor feller,” said Mr."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fellini]] | noun | **1.** Italian filmmaker (1920-1993). | *"In academic literature, fellini designates italian filmmaker (1920-1993)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felloe]] | noun | **1.** Rim (or part of the rim) into which spokes are inserted. | *"It was a smoking furnace down there, and soon the felloe and spokes would be injured by the flames and heat."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[fellow]] | noun | **1.** A boy or man.<br>**2.** A friend who is frequently in the company of another. | *"CLOWN. ’Tis not unknown to you, madam, I am a poor fellow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fellowship]] | noun | **1.** An association of people who share common beliefs or activities.<br>**2.** The state of being with someone. | *"Why, this it is to have a name in great men’s fellowship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felly]] | noun | **1.** Rim (or part of the rim) into which spokes are inserted. | *"The felly harshed against the curbstone: stopped."* — James Joyce, *Ulysses* |
| [[felo-de-se]] | noun | **1.** A person who kills himself intentionally.<br>**2.** An act of deliberate self destruction. | *"In academic literature, felo-de-se designates a person who kills himself intentionally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[felon]] | noun | **1.** Someone who has committed a crime or has been legally convicted of a crime.<br>**2.** A purulent infection at the end of a finger or toe in the area surrounding the nail. | *"Murder indeed, that bloody sin, I tortured Above the felon or what trespass else."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felonious]] | adjective | **1.** Involving or being or having the nature of a crime. | *"Unless it were a bloody murderer, Or foul felonious thief that fleeced poor passengers, I never gave them condign punishment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felony]] | noun | **1.** A serious crime (such as murder or arson). | *"There shall be in England seven halfpenny loaves sold for a penny; the three-hooped pot shall have ten hoops, and I will make it felony to drink small beer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felspar]] | noun | **1.** Any of a group of hard crystalline minerals that consist of aluminum silicates of potassium or sodium or calcium or barium. | *"It was composed of black and vitreous lava, mixed with fragments of felspar."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[felt]] | noun | **1.** A fabric made of compressed matted animal fibers.<br>**2.** Mat together and make felt-like. | *"What freezings have I felt, what dark days seen!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[felted]] | verb | **1.** Mat together and make felt-like.<br>**2.** Cover with felt. | *"Thanks to the delay caused by this crossing of the wolf’s path, the old dog with its felted hair hanging from its thigh was within five paces of it."* — graf Leo Tolstoy, *War and Peace* |
| [[felucca]] | noun | **1.** A fast narrow sailing ship of the mediterranean. | *"It is doubtful whether the unseaworthy craft was merely swamped, or whether, as there is some reason to suppose, an Italian felucca ran her down with intent to rob the Englishmen."* — Sydney Waterlow, *Shelley* |
| [[infelicitous]] | adjective | **1.** Not appropriate in application; defective.<br>**2.** Marked by or producing unhappiness; ; - american guide series. | *"This amazed and enraptured Tess, whose slight experiences had been so infelicitous till now; and in her reaction from indignation against the male sex she swerved to excess of honour for Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[infelicitously]] | adverb | **1.** In an infelicitous manner. | *"In academic literature, infelicitously designates in an infelicitous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infelicity]] | noun | **1.** Inappropriate and unpleasing manner or style (especially manner or style of expression). | *"Casaubon’s words seemed to leave unsaid: what believer sees a disturbing omission or infelicity?"* — George Eliot, *Middlemarch* |
| [[subfeline]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fel within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of fel in systematic terminology. | *"In academic literature, subfeline designates pertaining to, derived from, or characteristic of latin fel within the domain of animal adjectives & biological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underfelt]] | noun | **1.** A carpet pad of thick felt. | *"In academic literature, underfelt designates a carpet pad of thick felt."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal Adjectives & Biological]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FEL
  </div>
</div>
