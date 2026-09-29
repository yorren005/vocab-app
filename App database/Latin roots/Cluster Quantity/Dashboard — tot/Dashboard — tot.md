---
status: unread
type: root_dashboard
---
# Dashboard — tot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tot-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“whole or entire”</span>
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

The root **tot** means whole or entire. It describes the entire whole, complete total, or undivided amount. In English, this root forms words such as *total*, *totally*, *totality*, and *totalitarian*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: whole or entire
> The root **tot** means whole or entire. It describes the entire whole, complete total, or undivided amount. In English, this root forms words such as *total*, *totally*, *totality*, and *totalitarian*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Whole or entire</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *total* and *totally*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tot** comes from a Latin word that means *"whole or entire"*.
  - At its core, it describes whole or entire.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **tot** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of whole or entire.
  - **Mental & Social**: How people experience, organize, or communicate about whole or entire.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Total**: Comprising the whole number or amount.
  - **Totally**: In a total manner.
  - **Totality**: The whole of something.
  - **Totalitarian**: Relating to a centralized, dictatorial regime that requires total subservience.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tot</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Adjectival Stem:** *tōt-* (nominative *tōtus*, genitive *tōtīus*, dative *tōtī*) $\to$ *total, totally, totality*.

- **Pronominal Formula:** *in tōtō* ("in the whole, completely, as an entirety").

- **Sociopolitical Extensions:** *totalitarian, totalitarianism*.

- **Scientific Compounding:**

  - *tōti-* + *potēns* ("powerful") $\to$ *totipotent, totipotency* (cellular biology).

  - *tōti-* + *palma* ("palm of hand / web") $\to$ *totipalmate* (ornithological foot structure).

  - *tōti-* + *praesēns* $\to$ *totipresent* (present in every single part).



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



### 1. Mathematics & Quantitative Sums

- *total* (comprising the whole number or amount; the complete sum).

- *totally* (completely; entirely; absolutely).

- *totality* (the whole of something; the aggregate sum).

- *totalize* (to combine into a total; to make total).

- *totalizer* (a device or register that calculates a running total).



### 2. Legal Jurisprudence & Formal Latin Phrases

- *in toto* (as a whole; entirely; completely).



### 3. Political Ideology & State Domination

- *totalitarian* (relating to a system of government that is centralized and dictatorial and requires complete subservience to the state).

- *totalitarianism* (a political system where the state recognizes no limits to its authority and strives to regulate all public and private life).



### 4. Developmental Biology & Zoology

- *totipotent* (capable of developing into any type of cell or a complete new organism, as a fertilized zygote).

- *totipotency* (the ability of a single cell to divide and produce all the differentiated cells in an organism).

- *totipalmate* (having all four toes fully connected by webbing, as in pelicans and cormorants).



---



## 🔀 4. Prefix & Combining Dynamics on tot



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Adjectival `-al`** | *tōtus* + *-ālis* | **total** | Pertaining to 100% wholeness | *"The total solar eclipse plunged the valley into eerie midday darkness."* |

| **Abstract `-ity`** | *tōtālis* + *-itās* | **totality** | The aggregate sum / complete whole | *"Astronomers observed the corona during the brief minutes of totality."* |

| **Ideological `-arian`** | *total* + *-arian* | **totalitarian** | Imposing total state control | *"George Orwell's 1984 provided an enduring critique of totalitarian regimes."* |

| **Verbalizer `-ize`** | *total* + *-ize* | **totalize** | Bringing disparate parts into a whole | *"Philosophers warned against systems that totalize complex human experiences."* |

| **Compound `pot-`** | *tōti-* + *potēns* | **totipotent** | Possessing all developmental power | *"Only the fertilized ovum and early blastomeres retain true totipotent capacity."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **Political Science & History:** *totalitarian dictatorship*, *total war* (mobilization of entire national resources and civilian population).

- 🔬 **Stem Cell Biology & Embryology:** *totipotent vs pluripotent vs multipotent* (hierarchical developmental potency).

- ⚖️ **Civil Litigation & Contract Law:** *in toto invalidation* (striking down an agreement in its entirety).

- 🌌 **Astronomy & Eclipse Science:** *path of totality* (geographic zone of total solar obscuration).

- 💻 **Financial Auditing:** *running total*, *total cost of ownership (TCO)*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[in toto]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tot within the domain of Quantity.<br>**2.** A technical or specialized form exhibiting the properties of tot in systematic terminology. | *"In academic literature, in toto designates pertaining to, derived from, or characteristic of latin tot within the domain of quantity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypal]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypal designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototype]] | noun | **1.** A standard or typical example. | *"In Diotima, the muse of his "Hyperion," whose prototype was Susette Gontard, he has found it--and now he feels that he is in a new world."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[prototypic]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypic designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypical]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypical designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtotal]] | noun | **1.** The sum of part of a group of numbers. | *"In academic literature, subtotal designates the sum of part of a group of numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tot]] | noun | **1.** A small amount (especially of a drink).<br>**2.** A young child. | *"M. de Groot, "De Weertijger in onze Koloniën en op het oostaziatische Vasteland," _Bijdragen tot de Taal- Land- en Volkenkunde van Nederlandsch-Indië_, xlix. (1898) pp. 549-585; G.P."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[total]] | noun | **1.** The whole amount.<br>**2.** A quantity obtained by the addition of a group of numbers. | *"Head to foot Now is he total gules, horridly trick’d With blood of fathers, mothers, daughters, sons, Bak’d and impasted with the parching streets, That lend a tyrannous and a damned light To their vile murders."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[totaled]] | verb | **1.** Add up in number or quantity.<br>**2.** Determine the sum of. | *"In academic literature, totaled designates add up in number or quantity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalisator]] | noun | **1.** Computer that registers bets and divides the total amount bet among those who won. | *"In academic literature, totalisator designates computer that registers bets and divides the total amount bet among those who won."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalise]] | verb | **1.** Make into a total. | *"In academic literature, totalise designates make into a total."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totaliser]] | noun | **1.** Computer that registers bets and divides the total amount bet among those who won.<br>**2.** A calculator that performs simple arithmetic functions. | *"In academic literature, totaliser designates computer that registers bets and divides the total amount bet among those who won."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalism]] | noun | **1.** The principle of complete and unrestricted power in government. | *"In academic literature, totalism designates the principle of complete and unrestricted power in government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalistic]] | adjective | **1.** Of or relating to the principles of totalitarianism according to which the state regulates every realm of life. | *"In academic literature, totalistic designates of or relating to the principles of totalitarianism according to which the state regulates every realm of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalitarian]] | noun | **1.** An adherent of totalitarian principles or totalitarian government.<br>**2.** Characterized by a government in which the political authority exercises absolute and centralized control; - arthur m.schlesinger, jr. | *"In academic literature, totalitarian designates an adherent of totalitarian principles or totalitarian government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalitarianism]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.).<br>**2.** The principle of complete and unrestricted power in government. | *"In academic literature, totalitarianism designates a form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totality]] | noun | **1.** The state of being total and complete.<br>**2.** The quality of being complete and indiscriminate. | *"I was spread-eagled, and thumbed-up, and privily beaten by the stupid guards whose totality of intelligence was only just sufficient to show them that I was different from them and not so stupid."* — Jack London, *The Jacket (The Star-Rover)* |
| [[totalizator]] | noun | **1.** Computer that registers bets and divides the total amount bet among those who won. | *"In academic literature, totalizator designates computer that registers bets and divides the total amount bet among those who won."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalize]] | verb | **1.** Make into a total. | *"In academic literature, totalize designates make into a total."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totalizer]] | noun | **1.** Computer that registers bets and divides the total amount bet among those who won.<br>**2.** A calculator that performs simple arithmetic functions. | *"In academic literature, totalizer designates computer that registers bets and divides the total amount bet among those who won."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totally]] | adverb | **1.** To a complete degree or to the full or entire extent (`whole' is often used informally for `wholly'). | *"No; he doth but mistake the truth totally."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[totara]] | noun | **1.** Valuable timber tree of new zealand yielding hard reddish wood used for furniture and bridges and wharves. | *"In academic literature, totara designates valuable timber tree of new zealand yielding hard reddish wood used for furniture and bridges and wharves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tote]] | noun | **1.** A capacious bag or basket.<br>**2.** Carry with difficulty. | *"When her mother died, she went to live with a colored woman who made her work very hard, 'tote' wood and water, hoe cotton and corn, do all manner of drudgery, rise at daybreak, and live on scanty food."* — Classic Author, *The wonders of prayer* |
| [[totem]] | noun | **1.** A clan or tribe identified by their kinship to a common totemic object.<br>**2.** Emblem consisting of an object such as an animal or plant; serves as the symbol of a family or clan (especially among american indians). | *"Good Lord, fifty thousand years ago, in our totem-families, our women were cleaner, our family and group relations more rigidly right."* — Jack London, *The Jacket (The Star-Rover)* |
| [[totemic]] | adjective | **1.** Relating to totemism. | *"The Chasas of Orissa believe that if they were to injure their totemic animal they would be attacked by leprosy and their line would die out."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[totemism]] | noun | **1.** Belief in the kinship of a group of people with a common totem. | *"Roscoe, _The Baganda_ (London, 1911), pp. 393 _sq._, compare pp. 396, 398. [78] See _Totemism and Exogamy_, iv. 224 _sqq._ [79] Sir Harry H."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[totemist]] | noun | **1.** A person who belongs to a clan or tribe having a totem. | *"In academic literature, totemist designates a person who belongs to a clan or tribe having a totem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toter]] | noun | **1.** Someone whose employment involves carrying something. | *"In academic literature, toter designates someone whose employment involves carrying something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totipotence]] | noun | **1.** The ability of a cell to give rise to unlike cells and so to develop a new organism or part. | *"In academic literature, totipotence designates the ability of a cell to give rise to unlike cells and so to develop a new organism or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totipotency]] | noun | **1.** The ability of a cell to give rise to unlike cells and so to develop a new organism or part. | *"In academic literature, totipotency designates the ability of a cell to give rise to unlike cells and so to develop a new organism or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totipotent]] | adjective | **1.** Having the ability to give rise to unlike cells. | *"In academic literature, totipotent designates having the ability to give rise to unlike cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[totter]] | verb | **1.** Move without being stable, as if threatening to fall.<br>**2.** Walk unsteadily. | *"At length her onward walk dwindled to the merest totter, and she opened a gate within which was a haystack."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[totterer]] | noun | **1.** Someone who walks unsteadily as if about to fall. | *"In academic literature, totterer designates someone who walks unsteadily as if about to fall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tottering]] | verb | **1.** Move without being stable, as if threatening to fall.<br>**2.** Walk unsteadily. | *"You have discharg’d this honestly; keep it to yourself; many likelihoods inform’d me of this before, which hung so tottering in the balance that I could neither believe nor misdoubt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tottery]] | adjective | **1.** Unsteady in gait as from infirmity or old age. | *"I was a bat-eyed, tottery skeleton at the time."* — Jack London, *The Jacket (The Star-Rover)* |

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
    ROOT DASHBOARD · TOT
  </div>
</div>
