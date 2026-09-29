---
status: unread
type: root_dashboard
---
# Dashboard — dei
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dei-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“god”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</span>
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

The root **dei** means god. It refers to a divine being, deity, or god. In English, this root forms words such as *deity*, *deify*, *deification*, and *deifier*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: god
> The root **dei** means god. It refers to a divine being, deity, or god. In English, this root forms words such as *deity*, *deify*, *deification*, and *deifier*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">God</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</mark>
> - **Everyday Connection**: Think of familiar words like *deity* and *deify*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dei** comes from a Latin word that means *"god"*.
  - At its core, it describes god.

- **The Big Picture Idea**:
  - Picture standing quietly inside a peaceful sanctuary dedicated to solemn devotion.
  - Whenever you see **dei** in an English word, think of **sacred things, holiness, and reverence**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of god.
  - **Mental & Social**: How people experience, organize, or communicate about god.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Deity**: A god or goddess in a polytheistic religion.
  - **Deify**: To make a god of.
  - **Deification**: The act of deifying.
  - **Deifier**: One who deifies or idolizes another person or thing.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dei</mark>, think of <mark class="hl-def">sacred things, holiness, and reverence</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Nominal Base:** *de-* / *dei-* (nominative *deus*, genitive *deī*, vocative *deus*) $	o$ *deity, deism, deist, deistic*.

- **Factitive Verbal Stem:** *dei-* + *facere* ("to make into a god") $	o$ *deify, deification, deifier*.

- **Apotheosis & Form Compounds:**

  - *dei-* + *forma* ("shape, form") $	o$ *deiform* (resembling God in form).

  - *dei-* + *caedere* ("to kill") $	o$ *deicide* (the killing of a god).

- **Latin Phrasal Idioms:**

  - *deus ex māchinā* (literally "god from the machine").

  - *Tē Deum laudāmus* ("Thee, O God, we praise").



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



### 1. Theology & Divine Essence

- *deity* (a god or goddess; divine status, quality, or nature).

- *deism* (belief in the existence of a supreme being, specifically of a creator who does not intervene in the universe).

- *deist* (a person who believes in deism).

- *deistic* (relating to or characteristic of deism).



### 2. Reverence, Worship & Exaltation

- *deify* (to make a god of; to treat or worship as a deity).

- *deification* (the act of deifying someone; the condition of being glorified as a god).

- *deiform* (conformed to the divine likeness; godlike in nature).



### 3. Literature, Drama & Arts

- *deus ex machina* (an unexpected power or event saving a seemingly hopeless situation, especially as a contrived plot device in a play or novel).



### 4. Cultural Salutations & Liturgy

- *adieu* (goodbye; farewell; literally "to God").

- *Te Deum* (an ancient Latin hymn of praise sung in Thanksgiving church services).

- *deicide* (the killing of a god).



---



## 🔀 4. Prefix & Combining Dynamics on dei



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Factitive `-fy`** | *deus* + *facere* | **deify** | Making a mortal into a god | *"Ancient subjects were required to deify the living pharaoh."* |

| **Abstract `-ity`** | *deus* + *-itās* | **deity** | Divine status or divine being | *"The shrine was consecrated to a localized river deity."* |

| **Ideological `-ism`** | *deus* + *-ism* | **deism** | Rationalistic belief in a Creator | *"Voltaire championed deism as an alternative to dogmatic superstition."* |

| **Homicide `-cide`** | *deus* + *caedere* | **deicide** | Act of killing a divinity | *"The historical tragedy dramatized the cosmic hubris of deicide."* |

| **Adverbial `a-`** | Latin *ad* + *Deum* | **adieu** | Commending someone to God upon farewell | *"The traveler bid a sorrowful adieu to his native shores."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Philosophy & Intellectual History:** *Age of Enlightenment deism*, *Thomas Jefferson's deistic Bible*.

- 🎭 **Dramatic Criticism & Screenwriting:** *deus ex machina* (criticism of artificial or abrupt narrative resolutions).

- ⛪ **Comparative Religion & Theology:** *apotheosis / deification of rulers*, *nature deities in animism*.

- 🎵 **Classical Music & Liturgy:** *Te Deum settings* (grand choral compositions by Charpentier, Handel, Berlioz, and Bruckner).

- 📚 **Mythology & Folklore:** *solar deities*, *chthonic deities*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[codeine]] | noun | **1.** Derivative of opium; used as an antitussive (to relieve coughing) and an analgesic (to relieve pain). | *"In academic literature, codeine designates derivative of opium; used as an antitussive (to relieve coughing) and an analgesic (to relieve pain)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deice]] | verb | **1.** Make or become free of frost or ice. | *"In academic literature, deice designates make or become free of frost or ice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deicer]] | noun | **1.** Heater that removes ice or frost (as from a windshield or a refrigerator or the wings of an airplane). | *"In academic literature, deicer designates heater that removes ice or frost (as from a windshield or a refrigerator or the wings of an airplane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deictic]] | noun | **1.** A word specifying identity or spatial or temporal location from the perspective of a speaker or hearer in the context in which the communication occurs; - r.rommetveit.<br>**2.** Relating to or characteristic of a word whose reference depends on the circumstances of its use. | *"In academic literature, deictic designates a word specifying identity or spatial or temporal location from the perspective of a speaker or hearer in the context in which the communication occurs; - r.rommetveit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deification]] | noun | **1.** The condition of being treated like a god.<br>**2.** An embodiment of the qualities of a god. | *"I shall therefore not draw my examples exclusively from royal personages, as I wish to illustrate the general principle of the deification of living men, in other words, the incarnation of a deity in human form."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[deify]] | verb | **1.** Consider as a god or godlike.<br>**2.** Exalt to the position of a god. | *"There is a man haunts the forest that abuses our young plants with carving “Rosalind” on their barks; hangs odes upon hawthorns and elegies on brambles; all, forsooth, deifying the name of Rosalind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deimos]] | noun | **1.** The outer of two small satellites of mars. | *"In academic literature, deimos designates the outer of two small satellites of mars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deinocheirus]] | noun | **1.** Lightly built medium-sized theropod with long limbs and neck. | *"In academic literature, deinocheirus designates lightly built medium-sized theropod with long limbs and neck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deinonychus]] | noun | **1.** Swift agile wolf-sized bipedal dinosaur having a large curved claw on each hind foot; of the cretaceous. | *"In academic literature, deinonychus designates swift agile wolf-sized bipedal dinosaur having a large curved claw on each hind foot; of the cretaceous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deionize]] | verb | **1.** Remove ions from. | *"In academic literature, deionize designates remove ions from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deism]] | noun | **1.** The form of theological rationalism that believes in god on the basis of reason without reference to revelation. | *"When Skelton published his ‘Deism Revealed,’ the Bishop of London asked the Bishop of Clogher if he knew the author?"* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[deist]] | noun | **1.** A person who believes that god created the universe and then abandoned it.<br>**2.** Of or relating to deism. | *"I hate a man that wishes to be a deist; but I fear, every fair, unprejudiced inquirer must in some degree be a sceptic."* — Robert Burns, *The Letters of Robert Burns* |
| [[deistic]] | adjective | **1.** Of or relating to deism. | *"There is this difference between me and deistic philosophers: I believe; and I believe the Gospel."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[deity]] | noun | **1.** Any supernatural being worshipped as controlling some part of the world or some aspect of life or who is the personification of a force. | *"He is their god; he leads them like a thing Made by some other deity than Nature, That shapes man better; and they follow him Against us brats with no less confidence Than boys pursuing summer butterflies Or butchers killing flies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deixis]] | noun | **1.** The function of pointing or specifying from the perspective of a participant in an act of speech or writing; aspects of a communication whose interpretation depends on knowledge of the context in which the communication occurs. | *"In academic literature, deixis designates the function of pointing or specifying from the perspective of a participant in an act of speech or writing; aspects of a communication whose interpretation depends on knowledge of the context in which the communication occurs."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sacred]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DEI
  </div>
</div>
