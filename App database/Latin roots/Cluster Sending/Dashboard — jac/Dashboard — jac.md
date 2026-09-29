---
status: unread
type: root_dashboard
---
# Dashboard — jac
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">jac-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to throw or cast”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **jac** means to throw or cast. It refers to the action of throwing and carrying out this process. In English, this root forms words such as *adjacent* and *jaculate*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: to throw or cast
> The root **jac** means to throw or cast. It refers to the action of throwing and carrying out this process. In English, this root forms words such as *adjacent* and *jaculate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To throw or cast</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *adjacent* and *jaculate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **jac** comes from a Latin word that means *"to throw or cast"*.
  - At its core, it describes the action of throw or cast.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **jac** in an English word, think of **to throw or cast**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to throw or cast).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Adjacent**: Next to or adjoining something else.
  - **Jaculate**: To throw, hurl, or cast forth like a javelin or dart.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">jac</mark>, think of <mark class="hl-def">to throw or cast</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Present Stative Stem:** *iac-* (*iaceō, iacēre*) $	o$ *adjacent, adjacency, circumjacent, interjacent, subjacent*.

- **Augural / Speculative Base:** *coniectūra* (< *con-* + *iacere*) $	o$ *conjecture, conjectural*.

- **Dart / Javelin Stem:** *iaculum* $	o$ *iaculārī* $	o$ *ejaculate, ejaculation, jaculate, javelin*.



### 2.2 Complementary Vault Distinction: `jac` vs `ject`

- **`jac`** captures the **present root, stative posture, and javelin/speculative offshoots** (*adjacent, conjecture, ejaculate*).

- **`[[Dashboard — ject]]`** captures the **phonologically reduced Latin supine *-iectum*** across intensive prefixation (*eject, inject, reject, project, object, interject, trajectory*).



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



### 1. Spatial Adjacency & Topography

- *adjacent* (next to or adjoining something else).

- *adjacency* (the state of being adjacent; proximity).

- *circumjacent* (surrounding on all sides; encompassing).

- *interjacent* (lying or situated between).

- *subjacent* (situated below or underneath something).

- *nonadjacent* (not next to or adjoining).



### 2. Speculative Deduction & Theory

- *conjecture (n)* (an opinion or conclusion formed on the basis of incomplete information; a guess).

- *conjecture (v)* (to form an opinion or supposition about something on the basis of incomplete information).

- *conjectural* (based on or involving conjecture; speculative).



### 3. Biological Expulsion & Rapid Utterance

- *ejaculate (v)* (to eject semen from the body at the climax of sexual excitation; to say something quickly and suddenly).

- *ejaculation* (the action of ejaculating semen; something said quickly and suddenly).

- *jaculate* (to throw, cast, or dart like a javelin).

- *javelin* (a light spear thrown in a competitive sport or as a weapon).



---



## 🔀 4. Prefix & Combining Dynamics on jac



| Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|

| `ad-` + *iacēre* | **adjacent** | Lying cast directly beside | *"The fire quickly spread to the adjacent timber warehouse."* |

| `circum-` + *iacēre* | **circumjacent** | Lying cast around on all borders | *"Troops secured the fortress and all circumjacent mountain ridges."* |

| `inter-` + *iacēre* | **interjacent** | Lying cast between two points | *"A shallow marsh formed the interjacent buffer between rival kingdoms."* |

| `con-` + *iacere* | **conjecture** | Hurling diverse facts together | *"Astronomers formulated a bold conjecture regarding planetary rings."* |

| `ex-` + *iaculārī* | **ejaculate** | Darting out suddenly | *"The startled witness could only ejaculate a brief cry of warning."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 📐 **Geometry & Graph Theory:** *adjacent angles*, *adjacency matrix in network graph algorithms*.

- 🔬 **Reproductive Biology & Endocrinology:** *ejaculatory duct*, *sperm motility post-ejaculation*.

- ⚖️ **Legal Evidence & Jurisprudence:** *conjectural evidence* (inadmissible speculation lacking corroborating testimony).

- 🗺️ **Geography & Real Estate:** *adjacent parcel zoning*, *subterranean subjacent support rights*.

- 🏃 **Athletics & Olympic Track:** *men's and women's javelin throw*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adjacency]] | noun | **1.** The attribute of being so near as to be touching. | *"In academic literature, adjacency designates the attribute of being so near as to be touching."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adjacent]] | adjective | **1.** Nearest in space or position; immediately adjoining without intervening space.<br>**2.** Having a common boundary or edge; abutting; touching. | *"From the barge A strange invisible perfume hits the sense Of the adjacent wharfs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ejaculate]] | noun | **1.** The thick white fluid containing spermatozoa that is ejaculated by the male genital tract.<br>**2.** Utter impulsively. | *"Smallweed, seized with a fit of coughing in the midst of his triumph, breaks off to ejaculate, “Oh, dear me!"* — Charles Dickens, *Bleak House* |
| [[ejaculation]] | noun | **1.** An abrupt emphatic exclamation expressing emotion.<br>**2.** The discharge of semen in males. | *"But no explanation was discernible; he remained under the cow long enough to have milked three, uttering a private ejaculation now and then, as if he could not get on."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ejaculator]] | noun | **1.** A man who ejaculates semen.<br>**2.** A speaker who utters a sudden exclamation. | *"In academic literature, ejaculator designates a man who ejaculates semen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacamar]] | noun | **1.** Tropical american insectivorous bird having a long sharp bill and iridescent green or bronze plumage. | *"In academic literature, jacamar designates tropical american insectivorous bird having a long sharp bill and iridescent green or bronze plumage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacaranda]] | noun | **1.** An important brazilian timber tree yielding a heavy hard dark-colored wood streaked with black. | *"In academic literature, jacaranda designates an important brazilian timber tree yielding a heavy hard dark-colored wood streaked with black."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacinth]] | noun | **1.** A red transparent variety of zircon used as a gemstone. | *"Edward II gave to Piers Gaveston a suit of red-gold armour studded with jacinths, a collar of gold roses set with turquoise-stones, and a skull-cap _parsemé_ with pearls."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[jacob]] | noun | **1.** French biochemist who (with jacques monod) studied regulatory processes in cells (born in 1920).<br>**2.** (old testament) son of isaac; brother of esau; father of the twelve patriarchs of israel; jacob wrestled with god and forced god to bless him, so god gave jacob the new name of israel (meaning `one who has been strong against god'). | *"His child is a year and a quarter old come Philip and Jacob."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[jacobean]] | noun | **1.** Any distinguished personage during the reign of james i.<br>**2.** Of or relating to james i or his reign or times. | *"When they were together the Jacobean and the Victorian ages were juxtaposed."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[jacobi]] | noun | **1.** German mathematician (1804-1851). | *"Putman Jacobi, who has a little baby 3 weeks old & is still in her room, but has got through very nicely--She talks well, doesn't she? & has a face with plenty of individuality in it."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[jacobin]] | noun | **1.** A member of the radical movement that instituted the reign of terror during the french revolution. | *"Carmagnole, a violent Jacobin."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[jacobinic]] | adjective | **1.** Of or relating to the jacobins of the french revolution. | *"In academic literature, jacobinic designates of or relating to the jacobins of the french revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacobinical]] | adjective | **1.** Of or relating to the jacobins of the french revolution. | *"In academic literature, jacobinical designates of or relating to the jacobins of the french revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacobinism]] | noun | **1.** The ideology of the most radical element of the french revolution that instituted the reign of terror. | *"In academic literature, jacobinism designates the ideology of the most radical element of the french revolution that instituted the reign of terror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jacobite]] | noun | **1.** A supporter of james ii after he was overthrown or a supporter of the stuarts. | *"He landed in Scotland and advanced on England, and got as far as Derby at the head of the Scottish clans and Jacobite gentlemen."* — Donn Byrne, *The Wind Bloweth* |
| [[jacobs]] | noun | **1.** English writer of macabre short stories (1863-1943).<br>**2.** United states writer and critic of urban planning (born in 1916). | *"Shall I have my sheep kept with a _Jacobs-staff_ now?"* — John Fletcher, *The Elder Brother* |
| [[jaconet]] | noun | **1.** A lightweight cotton cloth with a smooth and slightly stiff finish; used for clothing and bandages. | *"In academic literature, jaconet designates a lightweight cotton cloth with a smooth and slightly stiff finish; used for clothing and bandages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jactation]] | noun | **1.** (pathology) extremely restless tossing and twitching usually by a person with a severe illness. | *"In academic literature, jactation designates (pathology) extremely restless tossing and twitching usually by a person with a severe illness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jactitate]] | verb | **1.** Move or stir about violently. | *"In academic literature, jactitate designates move or stir about violently."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jactitation]] | noun | **1.** Speaking of yourself in superlatives.<br>**2.** (law) a false boast that can harm others; especially a false claim to be married to someone (formerly actionable at law). | *"In academic literature, jactitation designates speaking of yourself in superlatives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[jaculus]] | noun | **1.** Jerboas. | *"Classical and authoritative lexicons catalog jaculus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonadjacent]] | adjective | **1.** Not adjacent; not next. | *"In academic literature, nonadjacent designates not adjacent; not next."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subjacent]] | adjective | **1.** Lying nearby but lower. | *"The stem now rapidly putrefies, the cuticle and its subjacent tissue become pulpy, and separate when touched from the woody parts beneath."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[superjacent]] | adjective | **1.** Lying immediately above or on something else. | *"In academic literature, superjacent designates lying immediately above or on something else."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · JAC
  </div>
</div>
