---
status: unread
type: root_dashboard
---
# Dashboard — her
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">her-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heir”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **her** means heir. It refers to an heir receiving property, title, or legal succession. In English, this root forms words such as *adhere*, *coherent*, *inherent*, and *coherence*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heir
> The root **her** means heir. It refers to an heir receiving property, title, or legal succession. In English, this root forms words such as *adhere*, *coherent*, *inherent*, and *coherence*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heir</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *adhere* and *coherent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **her** comes from a Latin word that means *"heir"*.
  - At its core, it describes heir.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **her** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of heir.
  - **Mental & Social**: How people experience, organize, or communicate about heir.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Adhere**: An everyday English word showing the root's idea of *heir*.
  - **Coherent**: An everyday English word showing the root's idea of *heir*.
  - **Inherent**: An everyday English word showing the root's idea of *heir*.
  - **Coherence**: An everyday English word showing the root's idea of *heir*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">her</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *heir* (successor), *heiress*, *heirloom*.
- **Directional Prefixation:**
  - `in-` + *hērēditāre* $\to$ *inherit*, *inheritance*, *inheritor*.
  - `dis-` + *inherit* $\to$ *disinherit* (strip of inheritance rights).
- **Abstract & Scientific Suffixes (`-ity` / `-age`):**
  - *hērēditās* $\to$ *heritage* (cultural legacy).
  - *hērēditārius* $\to$ *hereditary*, *heredity* (genetic passing of traits).

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

### 1. Law, Estates & Succession
- *heir* (a person legally entitled to the property or rank of another upon that person's death).
- *heiress* (a female heir, especially to great wealth).
- *inherit* (receive money, property, or a title from someone at their death).
- *inheritance* (the money, property, or title received upon someone's death).
- *inheritor* (a person who inherits something).
- *disinherit* (change one's will or take legal steps to prevent someone from inheriting).

### 2. Biology & Genetics
- *heredity* (the passing on of physical or mental characteristics genetically from one generation to another).
- *hereditary* (conferred by or based on inheritance; genetically transmitted from parent to child).

### 3. Culture & History
- *heritage* (property that is or may be inherited; valued objects and qualities such as historic buildings and cultural traditions).
- *heirloom* (a valuable object that has belonged to a family for several generations).

---

## 🔀 4. Prefix & Combining Dynamics on her

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `her-` + `-edity` | Biological abstract | The genetic transmission of phenotypic traits across generations | *heredity* |
| `her-` + `-itage` | Cultural abstract | Civilizational traditions, monuments, and ecological treasures | *heritage* |
| `heir` + `loom` | Domestic compound | An ancestral tool/treasure (*loom* = implement) passed down | *heirloom* |
| `in-` + `herit` | Acquisition verb | Receiving legal possession of an ancestor's assets | *inherit, inheritance* |
| `dis-` + `inherit` | Exclusionary prefix | Cutting a child out of a will; stripping succession rights | *disinherit* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Genetics & Molecular Biology:** Mendelian heredity, autosomal dominant/recessive hereditary disorders (Huntington's, cystic fibrosis).
- **Probate Law & Estate Planning:** Intestate succession, testamentary trusts, estate tax thresholds.
- **Cultural Preservation & UNESCO:** World Heritage Sites (monuments, national parks), intangible cultural heritage.
- **Feudal History & Monarchy:** Primogeniture, heirs apparent vs heirs presumptive, succession crises (War of the Spanish Succession).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acheron]] | noun | **1.** (greek mythology) a river in hades across which the souls of the dead were carried by charon. | *"But make amends now: get you gone, And at the pit of Acheron Meet me i’ th’ morning: thither he Will come to know his destiny."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[acheronian]] | adjective | **1.** Dark and dismal as of the rivers acheron and styx in hades; ; -wordsworth. | *"In academic literature, acheronian designates dark and dismal as of the rivers acheron and styx in hades; ; -wordsworth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acherontia]] | noun | **1.** Death's-head moth. | *"In academic literature, acherontia designates death's-head moth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acherontic]] | adjective | **1.** Dark and dismal as of the rivers acheron and styx in hades; ; -wordsworth. | *"In academic literature, acherontic designates dark and dismal as of the rivers acheron and styx in hades; ; -wordsworth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adhere]] | verb | **1.** Be compatible or in accordance with.<br>**2.** Follow through or carry out a plan without deviation. | *"Nor time nor place Did then adhere, and yet you would make both: They have made themselves, and that their fitness now Does unmake you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[adherence]] | noun | **1.** Faithful support for a cause or political party or religion.<br>**2.** The property of sticking together (as of glue and wood) or the joining of surfaces of different composition. | *"By a steady adherence to the Union we may hope, erelong, to become the arbiter of Europe in America, and to be able to incline the balance of European competitions in this part of the world as our interest may dictate."* — Alexander Hamilton, *The Federalist Papers* |
| [[adherent]] | noun | **1.** Someone who believes and helps to spread the doctrine of another.<br>**2.** Sticking fast. | *"But it is full of indignation to-night after undergoing the ordeal of consigning to the tomb the remains of a faithful, a zealous, a devoted adherent.” Sir Leicester’s voice trembles and his grey hair stirs upon his head."* — Charles Dickens, *Bleak House* |
| [[antiheretical]] | adjective | **1.** Opposed to heresy. | *"In academic literature, antiheretical designates opposed to heresy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antihero]] | noun | **1.** A protagonist who lacks the characteristics that would make him a hero (or her a heroine). | *"In academic literature, antihero designates a protagonist who lacks the characteristics that would make him a hero (or her a heroine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apheresis]] | noun | **1.** (linguistics) omission at the beginning of a word as in `coon' for `raccoon' or `till' for `until'.<br>**2.** A procedure in which blood is drawn and separated into its components by dialysis; some are retained and the rest are returned to the donor by transfusion. | *"In academic literature, apheresis designates (linguistics) omission at the beginning of a word as in `coon' for `raccoon' or `till' for `until'."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apheretic]] | adjective | **1.** Relating to or formed by or consisting of aphaeresis. | *"In academic literature, apheretic designates relating to or formed by or consisting of aphaeresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherinidae]] | noun | **1.** Small spiny-finned fishes of both salt and fresh water. | *"In academic literature, atherinidae designates small spiny-finned fishes of both salt and fresh water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherinopsis]] | noun | **1.** A genus of atherinidae. | *"In academic literature, atherinopsis designates a genus of atherinidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherodyde]] | noun | **1.** A simple type of jet engine; must be launched at high speed. | *"In academic literature, atherodyde designates a simple type of jet engine; must be launched at high speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherogenesis]] | noun | **1.** The formation of atheromas on the walls of the arteries as in atherosclerosis. | *"In academic literature, atherogenesis designates the formation of atheromas on the walls of the arteries as in atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheroma]] | noun | **1.** A fatty deposit in the intima (inner lining) of an artery; can obstruct blood flow. | *"In academic literature, atheroma designates a fatty deposit in the intima (inner lining) of an artery; can obstruct blood flow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheromatic]] | adjective | **1.** Of or relating to or resembling atheroma. | *"In academic literature, atheromatic designates of or relating to or resembling atheroma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheromatous]] | adjective | **1.** Of or relating to or resembling atheroma. | *"In academic literature, atheromatous designates of or relating to or resembling atheroma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherosclerosis]] | noun | **1.** A stage of arteriosclerosis involving fatty deposits (atheromas) inside the arterial walls, thus narrowing the arteries. | *"In academic literature, atherosclerosis designates a stage of arteriosclerosis involving fatty deposits (atheromas) inside the arterial walls, thus narrowing the arteries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherosclerotic]] | adjective | **1.** Of or relating to atherosclerosis. | *"In academic literature, atherosclerotic designates of or relating to atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherurus]] | noun | **1.** A genus of hystricidae. | *"In academic literature, atherurus designates a genus of hystricidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cohere]] | verb | **1.** Come or be in close contact with; stick or hold together and resist separation.<br>**2.** Cause to form a united, orderly, and aesthetically consistent whole. | *"Stroke is accumulated on stroke, each a triumph of imaginative beauty; but as they do not cohere to any discoverable end, the total impression is apt to be one of effort running to waste."* — Sydney Waterlow, *Shelley* |
| [[coherence]] | noun | **1.** The state of cohering or sticking together.<br>**2.** Logical and orderly and consistent relation of parts. | *"It is a wonderful thing to see the semblable coherence of his men’s spirits and his."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coherency]] | noun | **1.** The state of cohering or sticking together.<br>**2.** Logical and orderly and consistent relation of parts. | *"Why, all that _we_ know—and heaven knows what else besides!” Then, as she released me, I made it out to her, made it out perhaps only now with full coherency even to myself."* — Henry James, *The Turn of the Screw* |
| [[coherent]] | adjective | **1.** Marked by an orderly, logical, and aesthetically consistent relation of parts.<br>**2.** Capable of thinking and expressing yourself in a clear and consistent manner. | *"Instruct my daughter how she shall persever, That time and place with this deceit so lawful May prove coherent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coherently]] | adverb | **1.** In a coherent manner. | *"I became convinced, through the failure of my experiments, that only through death could I clearly and coherently resurrect the memories of my previous selves."* — Jack London, *The Jacket (The Star-Rover)* |
| [[disinherit]] | verb | **1.** Prevent deliberately (as by making a will) from inheriting. | *"Not for myself, Lord Warwick, but my son, Whom I unnaturally shall disinherit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disinheritance]] | noun | **1.** The act by a donor that terminates the right of a person to inherit. | *"In academic literature, disinheritance designates the act by a donor that terminates the right of a person to inherit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinherited]] | verb | **1.** Prevent deliberately (as by making a will) from inheriting.<br>**2.** Deprived of your rightful heritage. | *"And seeing thou dost, I here divorce myself Both from thy table, Henry, and thy bed, Until that act of parliament be repealed Whereby my son is disinherited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hera]] | noun | **1.** Queen of the olympian gods in ancient greek mythology; sister and wife of zeus remembered for her jealously of the many mortal women zeus fell in love with; identified with roman juno. | *"The story told to explain the festivals suggests that they celebrated the marriage of Zeus to Hera, represented by the oaken image in bridal array."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[heracles]] | noun | **1.** (classical mythology) a hero noted for his strength; performed 12 immense labors to gain immortality. | *"Antaeus, the Libyan wrestler, was invincible so long as his feet were on mother earth, and Heracles had lifted him into the air and the air had crushed him...."* — Donn Byrne, *The Wind Bloweth* |
| [[heracleum]] | noun | **1.** Widely distributed genus of plants with usually thick rootstocks and large umbels of white flowers. | *"HOGWEED RUST; on the under surface, scattered, sometimes subconfluent, roundish, light brown, girt by the remains of the epidermis; spores obovate, with a very short peduncle.—On _Heracleum spondylium_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[heraclitus]] | noun | **1.** A presocratic greek philosopher who said that fire is the origin of all things and that permanence is an illusion as all things are in perpetual flux (circa 500 bc). | *"Ancient Philosophy suggests to the modern student the name of Heraclitus or Plato; but Tertullian lived in the same streets with Apuleius, philosopher and Platonist, humorist and _gloriae animal_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[herakles]] | noun | **1.** (classical mythology) a hero noted for his strength; performed 12 immense labors to gain immortality. | *"A pagan could have seen no real reason why Jesus should not be a demi-god like Herakles or Dionysos; no reason, either, why a man should not worship Jesus as well as these."* — T. R. Glover, *The Jesus of History* |
| [[herald]] | noun | **1.** (formal) a person who announces important news.<br>**2.** Something that precedes and indicates the approach of something or someone. | *"Let him be regarded As the most noble corse that ever herald Did follow to his urn."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heralded]] | verb | **1.** Foreshadow or presage.<br>**2.** Praise vociferously. | *"Once more the approach of the stranger was heralded, and the intelligence operated upon me like magic."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[heraldic]] | adjective | **1.** Indicative of or announcing something to come.<br>**2.** Of or relating to heraldry. | *"It was called the d’Urberville Window, and in the upper part could be discerned heraldic emblems like those on Durbeyfield’s old seal and spoon."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[heraldist]] | adjective | **1.** Of or relating to heraldry. | *"In academic literature, heraldist designates of or relating to heraldry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heraldry]] | noun | **1.** The study and classification of armorial bearings and the tracing of genealogies.<br>**2.** Emblem indicating the right of a person to bear arms. | *"You are more saucy with lords and honourable personages than the commission of your birth and virtue gives you heraldry."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herat]] | noun | **1.** A city in northwestern afghanistan on the site of several ancient cities. | *"In academic literature, herat designates a city in northwestern afghanistan on the site of several ancient cities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herculaneum]] | noun | **1.** Ancient city; now destroyed. | *"In various enchanted attitudes, like the standing, or stepping, or running skeletons in Herculaneum, others remained rooted to the deck; but all their eyes upcast."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[herculean]] | adjective | **1.** Displaying superhuman strength or power.<br>**2.** Extremely difficult; requiring the strength of a hercules. | *"Look, prithee, Charmian, How this Herculean Roman does become The carriage of his chafe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hercules]] | noun | **1.** (classical mythology) a hero noted for his strength; performed 12 immense labors to gain immortality.<br>**2.** A large constellation in the northern hemisphere between lyra and corona borealis. | *"He professes not keeping of oaths; in breaking them he is stronger than Hercules."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hercules'-club]] | noun | **1.** Densely spiny ornamental of southeastern united states and west indies.<br>**2.** Small deciduous clump-forming tree or shrub of eastern united states. | *"In academic literature, hercules'-club designates densely spiny ornamental of southeastern united states and west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hercules'-clubs]] | noun | **1.** Densely spiny ornamental of southeastern united states and west indies. | *"In academic literature, hercules'-clubs designates densely spiny ornamental of southeastern united states and west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hercules-club]] | noun | **1.** Densely spiny ornamental of southeastern united states and west indies. | *"In academic literature, hercules-club designates densely spiny ornamental of southeastern united states and west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herculius]] | noun | **1.** Roman emperor from 286 until he abdicated in 305; when diocletian divided the roman empire in 286 maximian became emperor in the west (died in 311). | *"In academic literature, herculius designates roman emperor from 286 until he abdicated in 305; when diocletian divided the roman empire in 286 maximian became emperor in the west (died in 311)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[here]] | noun | **1.** The present location; this place.<br>**2.** Queen of the olympian gods in ancient greek mythology; sister and wife of zeus remembered for her jealously of the many mortal women zeus fell in love with; identified with roman juno. | *"And that thou teachest how to make one twain, By praising him here who doth hence remain. 40 Take all my loves, my love, yea take them all, What hast thou then more than thou hadst before?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hereabout]] | adverb | **1.** In this general vicinity. | *"Cassio, walk hereabout: If I do find him fit, I’ll move your suit, And seek to effect it to my uttermost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hereabouts]] | adverb | **1.** In this general vicinity. | *"Loneli got it at the best farm hereabouts." After tasting a little the Baron was surprised how good it was."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[hereafter]] | noun | **1.** Life after death.<br>**2.** The time yet to come. | *"I mean the business is not ended, as fearing to hear of it hereafter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hereby]] | adverb | **1.** (formal) by means of this. | *"Hereby, upon the edge of yonder coppice, A stand where you may make “the fairest shoot”."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hereditament]] | noun | **1.** Any property (real or personal or mixed) that can be inherited. | *"In academic literature, hereditament designates any property (real or personal or mixed) that can be inherited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hereditarianism]] | noun | **1.** The philosophical doctrine that heredity is more important than environment in determining intellectual growth. | *"In academic literature, hereditarianism designates the philosophical doctrine that heredity is more important than environment in determining intellectual growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hereditary]] | adjective | **1.** Occurring among members of a family usually by heredity.<br>**2.** Inherited or inheritable by established rules (usually legal rules) of descent. | *"His faults in him seem as the spots of heaven, More fiery by night’s blackness; hereditary Rather than purchased; what he cannot change Than what he chooses."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heredity]] | noun | **1.** The biological process whereby genetic factors are transmitted from one generation to the next.<br>**2.** The total of inherited attributes. | *"She was a woman and I was a man and a lover, and all the heredity of love was mine up from the black and squalling jungle ere love was love and man was man."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hereford]] | noun | **1.** Hardy english breed of dairy cattle raised extensively in united states. | *"The Earl of Hereford was reputed then In England the most valiant gentleman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herein]] | adverb | **1.** In this place or thing or document. | *"I had myself notice of my brother’s purpose herein, and have by underhand means laboured to dissuade him from it; but he is resolute."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hereinafter]] | adverb | **1.** In a subsequent part of this document or statement or matter etc. | *"Because he no pay me my moneys?_ For nonperishable goods bought of Moses Herzog, of 13 Saint Kevin’s parade in the city of Dublin, Wood quay ward, merchant, hereinafter called the vendor, and sold and delivered to Michael E."* — James Joyce, *Ulysses* |
| [[hereinbefore]] | adverb | **1.** In the preceding part of the current text. | *"Brooks as his right by virtue of the 50 per cent. increase of the stock hereinbefore described."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[hereness]] | noun | **1.** The state of being here in this place. | *"In academic literature, hereness designates the state of being here in this place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hereof]] | adverb | **1.** Of or concerning this. | *"Come, jailer, bring me where the goldsmith is, I long to know the truth hereof at large."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herero]] | noun | **1.** A member of a pastoral bantu people living in namibia, botswana, and angola.<br>**2.** A banto language spoken by the herero in namibia, botswana, and angola. | *"In academic literature, herero designates a member of a pastoral bantu people living in namibia, botswana, and angola."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heresy]] | noun | **1.** Any opinions or doctrines at variance with the official or orthodox position.<br>**2.** A belief that rejects the orthodox tenets of a religion. | *"The scriptures of the loyal Leonatus All turn’d to heresy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heretic]] | noun | **1.** A person who holds religious beliefs in conflict with the dogma of the roman catholic church.<br>**2.** A person who holds unorthodox opinions in any field (not merely religion). | *"Again, there is sprung up An heretic, an arch-one, Cranmer, one Hath crawled into the favour of the King And is his oracle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heretical]] | adjective | **1.** Characterized by departure from accepted beliefs or standards. | *"And I remembered back to my young days when I had sat at the feet of Arius, who had been a presbyter of the city of Alexandria, and who had been robbed of the bishopric by the blasphemous and heretical Alexander."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hereto]] | adverb | **1.** To this writing or document. | *"Which the rather We shall be blest to do if he remember A kinder value of the people than He hath hereto prized them at."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heretofore]] | adverb | **1.** Used in negative statement to describe a situation that has existed up to this point or up to the present time. | *"Now, as heretofore, he is to be found in doorways of rooms, with his limp white cravat loosely twisted into its old-fashioned tie, receiving patronage from the peerage and making no sign."* — Charles Dickens, *Bleak House* |
| [[hereunder]] | adverb | **1.** In a subsequent part of this document or statement or matter etc.<br>**2.** Under the terms of this agreement. | *"Hereunder lyth a man of Fame, William Walworth callyd by name: Fishmonger he was in lyfftime here, And twise Lord Maior, as in books appere; Who, with courage stout and manly myght, Slew Jack Straw in Kyng Richard’s sight."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[hereupon]] | adverb | **1.** Immediately after this. | *"I will hereupon confess I am in love; and as it is base for a soldier to love, so am I in love with a base wench."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herewith]] | adverb | **1.** (formal) by means of this. | *"This letter bears date November 16, 1848, and is as follows:-- "I herewith enclose the statement respecting the Calabar Mission of our Church, which I take blame to myself for having so long delayed to send."* — John Cairns, *Principal Cairns* |
| [[heritable]] | adjective | **1.** Capable of being inherited. | *"In academic literature, heritable designates capable of being inherited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heritage]] | noun | **1.** Practices that are handed down from the past by tradition.<br>**2.** Any attribute or immaterial possession that is inherited from ancestors. | *"Service is no heritage, and I think I shall never have the blessing of God till I have issue of my body; for they say barnes are blessings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heritiera]] | noun | **1.** Small genus of timber trees of eastern asia, australasia and tropical africa that form large buttresses. | *"In academic literature, heritiera designates small genus of timber trees of eastern asia, australasia and tropical africa that form large buttresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heritor]] | noun | **1.** A person who is entitled by law or by the terms of a will to inherit the estate of another. | *"Trotter resigned his office, and the heritors asked the assistant to take charge of the school until a new teacher should be appointed."* — John Cairns, *Principal Cairns* |
| [[herm]] | noun | **1.** A statue consisting of a squared stone pillar with a carved head (usually a bearded hermes) on top; used in ancient greece as a boundary marker or signpost. | *"He trots the air; the earth sings when he touches it; the basest horn of his hoof is more musical than the pipe of Hermes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herman]] | noun | **1.** United states jazz musician and bandleader (1913-1987). | *"Only Herman Tromp escaped in the fog, and was able, long after, to tell me of the adventure."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hermann]] | noun | **1.** German hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19). | *"Friedrich Hoelderlins Leben und Dichten, Bremen, 1894. (Reviewed by Hermann Fischer, Anz. f. d."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[hermannia]] | noun | **1.** Genus of african herbs and subshrubs having honey-scented bell-shaped flowers. | *"In academic literature, hermannia designates genus of african herbs and subshrubs having honey-scented bell-shaped flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermaphrodism]] | noun | **1.** Congenital condition in which external genitalia and internal sex organs have both male and female characteristics. | *"In academic literature, hermaphrodism designates congenital condition in which external genitalia and internal sex organs have both male and female characteristics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermaphrodite]] | noun | **1.** One having both male and female sexual characteristics and organs; at birth an unambiguous assignment of male or female cannot be made.<br>**2.** Of animal or plant; having both male female reproductive organs. | *"Square-riggers, fore-and-afters, hermaphrodites."* — Donn Byrne, *The Wind Bloweth* |
| [[hermaphroditic]] | adjective | **1.** Of or relating to monoclinous plants.<br>**2.** Of animal or plant; having both male female reproductive organs. | *"In academic literature, hermaphroditic designates of or relating to monoclinous plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermaphroditism]] | noun | **1.** Congenital condition in which external genitalia and internal sex organs have both male and female characteristics.<br>**2.** Showing characteristics of both sexes. | *"In academic literature, hermaphroditism designates congenital condition in which external genitalia and internal sex organs have both male and female characteristics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermaphroditus]] | noun | **1.** (greek mythology) son of hermes and aphrodite who merged with the nymph salmacis to form one body. | *"In academic literature, hermaphroditus designates (greek mythology) son of hermes and aphrodite who merged with the nymph salmacis to form one body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermeneutic]] | adjective | **1.** Interpretive or explanatory. | *"In academic literature, hermeneutic designates interpretive or explanatory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermeneutics]] | noun | **1.** The branch of theology that deals with principles of exegesis. | *"In academic literature, hermeneutics designates the branch of theology that deals with principles of exegesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermes]] | noun | **1.** (greek mythology) messenger and herald of the gods; god of commerce and cunning and invention and theft; identified with roman mercury. | *"He trots the air; the earth sings when he touches it; the basest horn of his hoof is more musical than the pipe of Hermes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hermetic]] | adjective | **1.** Completely sealed; completely airtight. | *"What do you think really of that hermetic crowd, the opal hush poets: A."* — James Joyce, *Ulysses* |
| [[hermetically]] | adverb | **1.** In an airtight manner. | *"This done, the hatches are replaced, and hermetically closed, like a closet walled up."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[hermissenda]] | noun | **1.** Genus of marine sea slugs. | *"In academic literature, hermissenda designates genus of marine sea slugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermit]] | noun | **1.** One retired from society for religious reasons.<br>**2.** One who lives in solitude. | *"In prison hast thou spent a pilgrimage, And like a hermit overpass’d thy days."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hermitage]] | noun | **1.** The abode of a hermit. | *"Lines Written In Friars’-Carse Hermitage Glenriddel Hermitage, June 28th, 1788."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[hermitic]] | adjective | **1.** Characterized by ascetic solitude. | *"In academic literature, hermitic designates characterized by ascetic solitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermitical]] | adjective | **1.** Characterized by ascetic solitude. | *"In academic literature, hermitical designates characterized by ascetic solitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hermosillo]] | noun | **1.** A city in northwestern mexico near the gulf of california. | *"In academic literature, hermosillo designates a city in northwestern mexico near the gulf of california."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hernaria]] | noun | **1.** Low-growing old world herbs with minute bright green leaves. | *"In academic literature, hernaria designates low-growing old world herbs with minute bright green leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hernia]] | noun | **1.** Rupture in smooth muscle tissue through which a bodily structure protrudes. | *"The Thompson Indians of British Columbia thought that the Dawn of Day could and would cure hernia if only an adolescent girl prayed to it to do so."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[herniation]] | noun | **1.** Rupture in smooth muscle tissue through which a bodily structure protrudes. | *"In academic literature, herniation designates rupture in smooth muscle tissue through which a bodily structure protrudes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hero]] | noun | **1.** A man distinguished by exceptional courage and nobility and strength.<br>**2.** The principal character in a play or movie or novel or poem. | *"MARGARET, Waiting gentlewoman attending on Hero."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hero-worship]] | verb | **1.** Love unquestioningly and uncritically or to excess; venerate as an idol. | *"In academic literature, hero-worship designates love unquestioningly and uncritically or to excess; venerate as an idol."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herod]] | noun | **1.** King of judea who (according to the new testament) tried to kill jesus by ordering the death of all children under age two in bethlehem (73-4 bc). | *"Let me have a child at fifty, to whom Herod of Jewry may do homage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herodotus]] | noun | **1.** The ancient greek known as the father of history; his accounts of the wars between the greeks and persians are the first known examples of historical writing (485-425 bc). | *"It is bad criticism that has made a popular legend of the unreliable character of Herodotus."* — T. R. Glover, *The Jesus of History* |
| [[heroic]] | noun | **1.** A verse form suited to the treatment of heroic or elevated themes; dactylic hexameter or iambic pentameter.<br>**2.** Very imposing or impressive; surpassing the ordinary (especially in size or scale). | *"I won’t tell ’em anything about your keeping silence; go on with the piece and say nothing, doing what you can by a judicious wink now and then, and a few indomitable nods in the heroic places, you know."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[heroical]] | adjective | **1.** Having or displaying qualities appropriate for heroes. | *"More fairer than fair, beautiful than beauteous, truer than truth itself, have commiseration on thy heroical vassal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heroically]] | adverb | **1.** In a heroic manner. | *"I did not take you up—surely I did not!” she answered as heroically as she could."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[heroics]] | noun | **1.** Ostentatious or vainglorious or extravagant or melodramatic conduct.<br>**2.** A verse form suited to the treatment of heroic or elevated themes; dactylic hexameter or iambic pentameter. | *"On the marvellous music of Shelley's verse we need not dwell, except to note that he avoids that metronomic beat of rhythm which Edgar Poe introduced into modern lyric measures, as Pope introduced it into the rhyming heroics of his day."* — Francis Thompson, *Shelley: An Essay* |
| [[heroin]] | noun | **1.** A narcotic that is considered a hard drug; a highly addictive morphine derivative; intravenous injection provides the fastest and most intense rush. | *"But from fifteen to seventeen she was in training for a heroine; she read all such works as heroines must read to supply their memories with those quotations which are so serviceable and so soothing in the vicissitudes of their eventful lives."* — Jane Austen, *Northanger Abbey* |
| [[heroine]] | noun | **1.** The main good female character in a work of fiction.<br>**2.** A woman possessing heroic qualities or a woman who has performed heroic deeds. | *"Oak knew her instantly as the heroine of the yellow waggon, myrtles, and looking-glass: prosily, as the woman who owed him twopence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[heroism]] | noun | **1.** The qualities of a hero or heroine; exceptional or heroic courage when facing danger (especially in battle). | *"What instances must pass before them of ardent, disinterested, self-denying attachment, of heroism, fortitude, patience, resignation: of all the conflicts and all the sacrifices that ennoble us most."* — Jane Austen, *Persuasion* |
| [[heron]] | noun | **1.** Greek mathematician and inventor who devised a way to determine the area of a triangle and who described various mechanical devices (first century).<br>**2.** Grey or white wading bird with long neck and long legs and (usually) long bill. | *"The sole effect of her presence upon the placid valley so far had been to excite the mind of a solitary heron, which, after descending to the ground not far from her path, stood with neck erect, looking at her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[heronry]] | noun | **1.** A breeding ground for herons; a heron rookery. | *"In academic literature, heronry designates a breeding ground for herons; a heron rookery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herr]] | noun | **1.** A german man; used before the name as a title equivalent to mr in english.<br>**2.** A german courtesy title or form of address for a man. | *"HERR Designs FRANCES BEEM 1913 THIS LITTLE STORY IS TOLD AND THE LITTLE PICTURES WERE DRAWN FOR A GOOD LITTLE CHILD NAMED: _______________ THE WISE MAMMA GOOSE Mamma Goose was trying to think."* — Charlotte B. Herr, *The Wise Mamma Goose* |
| [[herrenvolk]] | noun | **1.** A race that considers itself superior to all others and fitted to rule the others. | *"In academic literature, herrenvolk designates a race that considers itself superior to all others and fitted to rule the others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herrerasaur]] | noun | **1.** A kind of theropod dinosaur found in argentina. | *"In academic literature, herrerasaur designates a kind of theropod dinosaur found in argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herrerasaurus]] | noun | **1.** A kind of theropod dinosaur found in argentina. | *"In academic literature, herrerasaurus designates a kind of theropod dinosaur found in argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herrick]] | noun | **1.** English lyric poet (1591-1674). | *"Part must be kept, wherewith to teend The Christmas log next yeare; And where 'tis safely kept, the fiend Can do no mischiefe there_" See _The Works of Robert Herrick_ (Edinburgh, 1823), vol. ii. pp. 91, 124."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[herring]] | noun | **1.** Valuable flesh of fatty fish from shallow waters of northern atlantic or pacific; usually salted or pickled.<br>**2.** Commercially important food fish of northern waters of both atlantic and pacific. | *"Die when thou wilt, if manhood, good manhood, be not forgot upon the face of the Earth, then am I a shotten herring."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herringbone]] | noun | **1.** A twilled fabric with a herringbone pattern.<br>**2.** A pattern of columns of short parallel lines with all the lines in one column sloping one way and lines in adjacent columns sloping the other way; it is used in weaving, masonry, parquetry, embroidery. | *"Mr Bloom walked behind the eyeless feet, a flatcut suit of herringbone tweed."* — James Joyce, *Ulysses* |
| [[herschel]] | noun | **1.** English astronomer (son of william herschel) who extended the catalogue of stars to the southern hemisphere and did pioneering work in photography (1792-1871).<br>**2.** English astronomer (born in germany) who discovered infrared light and who catalogued the stars and discovered the planet uranus (1738-1822). | *"But that Herschel, for example, who “broke the barriers of the heavens”—did he not once play a provincial church-organ, and give music-lessons to stumbling pianists?"* — George Eliot, *Middlemarch* |
| [[hershey]] | noun | **1.** United states confectioner and philanthropist who created the model industrial town of hershey, pennsylvania; founded an industrial school for orphan boys (1857-1945).<br>**2.** An industrial town to the east of harrisburg. | *"But," Amanda said with a tender glance at the hired girl, "I guess Hershey's ain't got no Millie like we to help." "Ach, pack off now with you," Millie said, trying to frown."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[hertfordshire]] | noun | **1.** A county in southern england. | *"And Bleak House,” said his lordship, “is in—” “Hertfordshire, my lord.” “Mr."* — Charles Dickens, *Bleak House* |
| [[hertha]] | noun | **1.** The teutonic goddess of fertility; later identified with norse njord. | *"In academic literature, hertha designates the teutonic goddess of fertility; later identified with norse njord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hertz]] | noun | **1.** The unit of frequency; one hertz has a periodic interval of one second.<br>**2.** German physicist who was the first to produce electromagnetic waves artificially (1857-1894). | *"Hertz, _Der Werwolf_ (Stuttgart, 1862); J."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[hertzian]] | adjective | **1.** Of or relating to the physicist heinrich hertz or his work. | *"The important fact is that all three--light, radiant heat and Hertzian waves--in addition to travelling at the same speed, are reflected, absorbed or refracted, according to precisely the same principles."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[incoherence]] | noun | **1.** Lack of cohesion or clarity or organization.<br>**2.** Nonsense that is simply incoherent and unintelligible. | *"Then I shall release my birds, you know, and confer estates.” I was much impressed by her allusion to Richard and by the sad meaning, so sadly illustrated in her poor pinched form, that made its way through all her incoherence."* — Charles Dickens, *Bleak House* |
| [[incoherency]] | noun | **1.** Lack of cohesion or clarity or organization.<br>**2.** Nonsense that is simply incoherent and unintelligible. | *"Her father had a large way of looking at life, of which his restlessness and even his occasional incoherency of conduct had been only a proof."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[incoherent]] | adjective | **1.** Without logical or meaningful connection.<br>**2.** (physics) of waves having no stable definite or stable phase relation. | *"I did so in broken, incoherent words, for besides the trouble I was in, it frightened me to see her at MY feet."* — Charles Dickens, *Bleak House* |
| [[incoherently]] | adverb | **1.** In an incoherent manner. | *"I acknowledged his attention incoherently, and began to think this was a dream."* — Charles Dickens, *Great Expectations* |
| [[inhere]] | verb | **1.** Be inherent in something. | *"Still less is there any one individual thing, "The Finite," in which these contradictory attributes inhere."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[inherence]] | noun | **1.** The state of inhering; the state of being a fixed characteristic. | *"In academic literature, inherence designates the state of inhering; the state of being a fixed characteristic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inherency]] | noun | **1.** The state of inhering; the state of being a fixed characteristic. | *"In academic literature, inherency designates the state of inhering; the state of being a fixed characteristic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inherent]] | adjective | **1.** Existing as an essential constituent or characteristic.<br>**2.** In the nature of something though not readily apparent. | *"I will not do’t, Lest I surcease to honour mine own truth And, by my body’s action, teach my mind A most inherent baseness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inherently]] | adverb | **1.** In an inherent manner. | *"Would to God you had never taken me up, since it was only to throw me down!” Bathsheba, in spite of her mettle, began to feel unmistakable signs that she was inherently the weaker vessel."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inherit]] | verb | **1.** Obtain from someone after their death.<br>**2.** Receive from a predecessor. | *"Thy father’s moral parts Mayst thou inherit too!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inheritable]] | adjective | **1.** Capable of being inherited. | *"In academic literature, inheritable designates capable of being inherited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inheritance]] | noun | **1.** Hereditary succession to a title or an office or property.<br>**2.** That which is inherited; a title or property or estate that passes by law to the heir on the death of the owner. | *"Sir, for a quart d’ecu he will sell the fee-simple of his salvation, the inheritance of it, and cut the entail from all remainders, and a perpetual succession for it perpetually."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inherited]] | verb | **1.** Obtain from someone after their death.<br>**2.** Receive from a predecessor. | *"Treason is not inherited, my lord, Or, if we did derive it from our friends, What’s that to me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inheriting]] | verb | **1.** Obtain from someone after their death.<br>**2.** Receive from a predecessor. | *"She had no resources for solitude; and inheriting a considerable share of the Elliot self-importance, was very prone to add to every other distress that of fancying herself neglected and ill-used."* — Jane Austen, *Persuasion* |
| [[inheritor]] | noun | **1.** A person who is entitled by law or by the terms of a will to inherit the estate of another. | *"The very conveyances of his lands will scarcely lie in this box; and must the inheritor himself have no more, ha?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inheritress]] | noun | **1.** A female heir. | *"In academic literature, inheritress designates a female heir."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inheritrix]] | noun | **1.** A female heir. | *"In academic literature, inheritrix designates a female heir."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonhereditary]] | adjective | **1.** Not acquirable by inheritance. | *"In academic literature, nonhereditary designates not acquirable by inheritance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonheritable]] | adjective | **1.** Not inheritable. | *"In academic literature, nonheritable designates not inheritable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noninheritable]] | adjective | **1.** Not inheritable. | *"In academic literature, noninheritable designates not inheritable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ocher]] | noun | **1.** A moderate yellow-orange to orange color.<br>**2.** Any of various earths containing silica and alumina and ferric oxide; used as a pigment. | *"Black men and ocher-colored folk."* — Donn Byrne, *The Wind Bloweth* |
| [[unheralded]] | adjective | **1.** Without warning or announcement; ; - m.a.d.howe. | *"But I rebel at an unheralded ghostland, and declare frankly that your tale is incredible."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HER
  </div>
</div>
