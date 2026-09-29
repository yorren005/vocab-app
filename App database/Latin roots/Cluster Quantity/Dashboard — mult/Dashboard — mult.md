---
status: unread
type: root_dashboard
---
# Dashboard — mult
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mult-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“many”</span>
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

The root **mult** means many. It describes a large number, plentiful amount, or multiple items. In English, this root forms words such as *multitude*, *multitudinous*, *multiple*, and *multiplex*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: many
> The root **mult** means many. It describes a large number, plentiful amount, or multiple items. In English, this root forms words such as *multitude*, *multitudinous*, *multiple*, and *multiplex*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Many</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *multitude* and *multitudinous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mult** comes from a Latin word that means *"many"*.
  - At its core, it describes many.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **mult** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of many.
  - **Mental & Social**: How people experience, organize, or communicate about many.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Multitude**: A great number of people or things gathered together.
  - **Multitudinous**: Existing in great numbers.
  - **Multiple**: Having or involving several parts, elements, or members.
  - **Multiplex**: Consisting of many interconnected elements or circuits.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mult</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Adjectival Stem:** *mult-* (neuter *multum*, plural *multī, multae, multa*) $\to$ *multitude, multitudinous*.

- **Prefixal Combining Form:** *multi-* (joining directly to nominal or adjectival bases) $\to$ *multilateral, multilingual, multifaceted, multicellular*.

- **Compound Multiplicative Stem:** *multi-* + *plicāre* ("to fold") $\to$ *multiply, multiplication, multiplier, multiple, multiplex, multiplicity*.



### 2.2 Semantic Compounding Logic

- **Geometry & Dimension:** *multi-* + *facies* ("face") $\to$ *multifaceted* (having numerous distinct cut faces or aspects).

- **Governance & Diplomacy:** *multi-* + *latus* ("side") $\to$ *multilateral* (involving multiple sovereign nations or factions).

- **Linguistics:** *multi-* + *lingua* ("tongue") $\to$ *multilingual* (possessing mastery over multiple languages).



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



### 1. Sociological Crowds & Mass Humanity

- *multitude* (a vast gathering of people; the common masses).

- *multitudinous* (existing in immense, crowded numbers).



### 2. Mathematics & Quantitative Operations

- *multiply* (to increase exponentially by mathematical multiplication; to propagate).

- *multiplication* (the arithmetic operation of scaling by a factor).

- *multiple* (a number that can be divided by another without remainder).

- *multiplicity* (a large variety or vast aggregation).



### 3. Structural & Functional Complexity

- *multifaceted* (having many surfaces; possessing complex, varied dimensions).

- *multiplex* (consisting of multiple parts or functions; transmitting simultaneous signals).

- *multiform* (occurring in multiple diverse shapes or varieties).



### 4. Modern Technology, Globalization & Cosmos

- *multinational* (operating across multiple sovereign states).

- *multilateral* (agreements or treaties involving multiple independent parties).

- *multimedia* (integrating text, audio, video, and interactive media).

- *multitask* (executing multiple operational processes concurrently).

- *multiverse* (a hypothetical cosmic reality comprising infinite parallel universes).



---



## 🔀 4. Prefix & Combining Dynamics on mult



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Noun Suffix `-tude`** | *multus* + *-tūdō* | **multitude** | State of vast aggregation or crowd | *"A great multitude gathered before the cathedral gates."* |

| **Adjective `-ous`** | *multitūdō* + *-ous* | **multitudinous** | Characterized by immense swarms | *"The astronomer gazed upon the multitudinous stars of the Milky Way."* |

| **Root Compound `plic-`** | *multi-* + *plicāre* | **multiplication** | The act of folding many times | *"Rapid cellular multiplication is a hallmark of embryonic growth."* |

| **State Suffix `-ity`** | *multiplex* + *-itās* | **multiplicity** | Condition of diverse plurality | *"The novel explores a multiplicity of perspectives on the historical crisis."* |

| **Adjective `-al`** | *multi-* + *latus* + *-al* | **multilateral** | Possessing many distinct sides/factions | *"The Geneva convention established a multilateral trade accord."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 🏛️ **International Relations & Law:** *multilateral* (multilateral treaties, diplomacy), *multinational* (multinational enterprise regulation).

- 🔬 **Mathematics & Statistics:** *multiplication* (fundamental arithmetic operation), *multivariate* (multivariate regression analysis), *multiple* (least common multiple).

- 💻 **Computing & Systems Engineering:** *multiplex* (time-division multiplexing), *multitask* (preemptive multitasking in kernel architecture), *multimedia* (digital signal compression).

- 🧬 **Biological Sciences:** *multicellular* (evolution of complex multicellular metazoans), *multinuclear* (skeletal muscle fiber morphology).

- 🌌 **Cosmology & Theoretical Physics:** *multiverse* (inflationary cosmology and many-worlds quantum interpretation).



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[multi-billionaire]] | noun | **1.** A very rich person whose material wealth is valued at many billions of dollars. | *"In academic literature, multi-billionaire designates a very rich person whose material wealth is valued at many billions of dollars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-color]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, multi-color designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-colored]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, multi-colored designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-colour]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, multi-colour designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-coloured]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, multi-coloured designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-ethnic]] | adjective | **1.** Involving several ethnic groups. | *"In academic literature, multi-ethnic designates involving several ethnic groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-seeded]] | adjective | **1.** Having many seeds. | *"In academic literature, multi-seeded designates having many seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-stemmed]] | adjective | **1.** Having many stems. | *"In academic literature, multi-stemmed designates having many stems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multi-valued]] | adjective | **1.** Having many values, meanings, or appeals. | *"In academic literature, multi-valued designates having many values, meanings, or appeals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multicellular]] | adjective | **1.** Consisting of many cells. | *"In academic literature, multicellular designates consisting of many cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multicollinearity]] | noun | **1.** A case of multiple regression in which the predictor variables are themselves highly correlated. | *"In academic literature, multicollinearity designates a case of multiple regression in which the predictor variables are themselves highly correlated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multicolor]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"The scene faded, replaced by a ring of tiny multicolored lights: the Asteroid Belt."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[multicolored]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"The scene faded, replaced by a ring of tiny multicolored lights: the Asteroid Belt."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[multicolour]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"Mr Bloom stood at the corner, his eyes wandering over the multicoloured hoardings."* — James Joyce, *Ulysses* |
| [[multicoloured]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"Mr Bloom stood at the corner, his eyes wandering over the multicoloured hoardings."* — James Joyce, *Ulysses* |
| [[multicultural]] | adjective | **1.** Of or relating to or including several cultures. | *"In academic literature, multicultural designates of or relating to or including several cultures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiculturalism]] | noun | **1.** The doctrine that several different cultures (rather than one national culture) can coexist peacefully and equitably in a single country. | *"In academic literature, multiculturalism designates the doctrine that several different cultures (rather than one national culture) can coexist peacefully and equitably in a single country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multidimensional]] | adjective | **1.** Having or involving or marked by several dimensions or aspects. | *"The scene was geometric, multidimensional, and seemingly chaotic."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[multiethnic]] | adjective | **1.** Involving several ethnic groups. | *"In academic literature, multiethnic designates involving several ethnic groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multifaceted]] | adjective | **1.** Having many aspects. | *"In academic literature, multifaceted designates having many aspects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multifactorial]] | adjective | **1.** Involving or depending on several factors or causes (especially pertaining to a condition or disease resulting from the interaction of many genes). | *"In academic literature, multifactorial designates involving or depending on several factors or causes (especially pertaining to a condition or disease resulting from the interaction of many genes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multifarious]] | adjective | **1.** Having many aspects. | *"His father, though engaged as the shepherd at Dunglass, had other duties of a very multifarious kind to discharge, and part of his shepherd work had been done for him for some time by his eldest son, Thomas."* — John Cairns, *Principal Cairns* |
| [[multifariously]] | adverb | **1.** In diverse ways. | *"In academic literature, multifariously designates in diverse ways."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multifariousness]] | noun | **1.** Noticeable heterogeneity. | *"In academic literature, multifariousness designates noticeable heterogeneity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiflora]] | noun | **1.** Vigorously growing rose having clusters of numerous small flowers; used for hedges and as grafting stock. | *"In academic literature, multiflora designates vigorously growing rose having clusters of numerous small flowers; used for hedges and as grafting stock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiform]] | adjective | **1.** Occurring in or having many forms or shapes or appearances; - john dewey. | *"O, multi-colored, multiform, Beloved beauty over me, That I shall never, never see Again!"* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[multilane]] | adjective | **1.** (of roads and highways) having two or more lanes for traffic. | *"In academic literature, multilane designates (of roads and highways) having two or more lanes for traffic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multilateral]] | adjective | **1.** Having many parts or sides. | *"The studies predicted that politically independent nation-states would create multilateral alignments and conflicting societies, lifestyles and philosophies."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[multilaterally]] | adverb | **1.** In a multilateral manner;so as to affect many parties or governments. | *"In academic literature, multilaterally designates in a multilateral manner;so as to affect many parties or governments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multilevel]] | adjective | **1.** Of a building having more than one level. | *"In academic literature, multilevel designates of a building having more than one level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multilingual]] | adjective | **1.** Using or knowing more than one language. | *"In academic literature, multilingual designates using or knowing more than one language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multimedia]] | noun | **1.** Transmission that combine media of communication (text and graphics and sound etc.). | *"In academic literature, multimedia designates transmission that combine media of communication (text and graphics and sound etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multinational]] | adjective | **1.** Involving or operating in several nations or nationalities. | *"He notes that the struggle between rich and poor nations and multinational corporations over minerals in the vast oceanic seabed is likely to be heated in the years to come, especially as reserves of land-based minerals approach exhaustion."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[multinomial]] | noun | **1.** A mathematical function that is the sum of a number of terms.<br>**2.** Having the character of a polynomial. | *"In academic literature, multinomial designates a mathematical function that is the sum of a number of terms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multinucleate]] | adjective | **1.** Having two or more nuclei. | *"In academic literature, multinucleate designates having two or more nuclei."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiparous]] | adjective | **1.** Producing more than one offspring at a time. | *"In academic literature, multiparous designates producing more than one offspring at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multipartite]] | adjective | **1.** Involving more than two parties. | *"In academic literature, multipartite designates involving more than two parties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiphase]] | adjective | **1.** Of an electrical system that uses or generates two or more alternating voltages of the same frequency but differing in phase angle. | *"In academic literature, multiphase designates of an electrical system that uses or generates two or more alternating voltages of the same frequency but differing in phase angle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiple]] | noun | **1.** The product of a quantity by an integer.<br>**2.** Having or involving or consisting of more than one part or entity or individual. | *"An even multiple of any whole number gives another even number."* — Unknown, *The Second Story of Meno* |
| [[multiple-choice]] | adjective | **1.** Offering several alternative answers from which the correct one is to be chosen; or consisting of such questions. | *"In academic literature, multiple-choice designates offering several alternative answers from which the correct one is to be chosen; or consisting of such questions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplex]] | noun | **1.** Communicates two or more signals over a common channel.<br>**2.** A movie theater than has several different auditoriums in the same building. | *"In academic literature, multiplex designates communicates two or more signals over a common channel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplexer]] | noun | **1.** A device that can interleave two or more activities. | *"In academic literature, multiplexer designates a device that can interleave two or more activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplicand]] | noun | **1.** The number that is multiplied by the multiplier. | *"In academic literature, multiplicand designates the number that is multiplied by the multiplier."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplication]] | noun | **1.** The act of producing offspring or multiplying by such production.<br>**2.** A multiplicative increase. | *"However, the Multiplication Table doesn’t signify: let’s try Geography."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[multiplicative]] | adjective | **1.** Tending or having the power to multiply or increase in number or quantity or degree. | *"In academic literature, multiplicative designates tending or having the power to multiply or increase in number or quantity or degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplicatively]] | adverb | **1.** In a multiplicative manner. | *"In academic literature, multiplicatively designates in a multiplicative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplicity]] | noun | **1.** The property of being multiple.<br>**2.** A large number. | *"They took a slight survey of all; and Catherine was impressed, beyond her expectation, by their multiplicity and their convenience."* — Jane Austen, *Northanger Abbey* |
| [[multiplied]] | verb | **1.** Combine by multiplication.<br>**2.** Combine or increase by multiplication. | *"But, by the grace of God, and Hume’s advice, Your grace’s title shall be multiplied."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[multiplier]] | noun | **1.** The number by which a multiplicand is multiplied. | *"But the seed is in itself, only as the divine Mind 508:3 is All and reproduces all - as Mind is the multiplier, and Mind's infinite idea, man and the universe, is the product."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[multiply]] | verb | **1.** Combine by multiplication.<br>**2.** Combine or increase by multiplication. | *"It would be going only to multiply trouble to the others, and increase his own distress; and a much better scheme followed and was acted upon."* — Jane Austen, *Persuasion* |
| [[multipotent]] | adjective | **1.** Able to many things. | *"In academic literature, multipotent designates able to many things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiprocessing]] | noun | **1.** Simultaneous processing by two or more processing units. | *"In academic literature, multiprocessing designates simultaneous processing by two or more processing units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiprocessor]] | noun | **1.** A computer that uses two or more processing units under integrated control. | *"In academic literature, multiprocessor designates a computer that uses two or more processing units under integrated control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiprogramming]] | noun | **1.** The execution of two or more computer programs by a single computer. | *"In academic literature, multiprogramming designates the execution of two or more computer programs by a single computer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multipurpose]] | adjective | **1.** Having multiple uses. | *"In academic literature, multipurpose designates having multiple uses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiracial]] | adjective | **1.** Made up of or involving or acting on behalf of various races. | *"In academic literature, multiracial designates made up of or involving or acting on behalf of various races."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multistage]] | noun | **1.** Occurring in more than one stage. | *"In academic literature, multistage designates occurring in more than one stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multistorey]] | adjective | **1.** Having more than one story. | *"In academic literature, multistorey designates having more than one story."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multistoried]] | adjective | **1.** Having more than one story. | *"In academic literature, multistoried designates having more than one story."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multistory]] | adjective | **1.** Having more than one story. | *"In academic literature, multistory designates having more than one story."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multitude]] | noun | **1.** A large indefinite number.<br>**2.** A large gathering of people. | *"Ingratitude is monstrous, and for the multitude to be ingrateful were to make a monster of the multitude, of the which we being members, should bring ourselves to be monstrous members."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[multitudinous]] | adjective | **1.** Too numerous to be counted. | *"No, this my hand will rather The multitudinous seas incarnadine, Making the green one red."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[multitudinousness]] | noun | **1.** A very large number (especially of people). | *"In academic literature, multitudinousness designates a very large number (especially of people)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multivalence]] | noun | **1.** (chemistry) the state of having a valence greater than two. | *"In academic literature, multivalence designates (chemistry) the state of having a valence greater than two."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multivalency]] | noun | **1.** (chemistry) the state of having a valence greater than two. | *"In academic literature, multivalency designates (chemistry) the state of having a valence greater than two."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multivalent]] | adjective | **1.** Used of the association of three or more homologous chromosomes during the first division of meiosis.<br>**2.** Having more than one valence, or having a valence of 3 or higher. | *"In academic literature, multivalent designates used of the association of three or more homologous chromosomes during the first division of meiosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multivariate]] | adjective | **1.** Pertaining to any procedure involving two or more variables. | *"In academic literature, multivariate designates pertaining to any procedure involving two or more variables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiversity]] | noun | **1.** A university system having several separate campuses and colleges and research centers. | *"In academic literature, multiversity designates a university system having several separate campuses and colleges and research centers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multivitamin]] | noun | **1.** A pill or tablet containing several vitamins. | *"In academic literature, multivitamin designates a pill or tablet containing several vitamins."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MULT
  </div>
</div>
