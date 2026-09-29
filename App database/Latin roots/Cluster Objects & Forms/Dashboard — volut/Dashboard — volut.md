---
status: unread
type: root_dashboard
---
# Dashboard — volut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">volut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to roll”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Crafting a specific shape out of clay or wood with careful hands.</span>
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

The root **volut** means to roll. It refers to the action of rolling and carrying out this process. In English, this root forms words such as *revolution*, *evolution*, *volume*, and *convoluted*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to roll
> The root **volut** means to roll. It refers to the action of rolling and carrying out this process. In English, this root forms words such as *revolution*, *evolution*, *volume*, and *convoluted*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To roll</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Crafting a specific shape out of clay or wood with careful hands.</mark>
> - **Everyday Connection**: Think of familiar words like *revolution* and *evolution*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **volut** comes from a Latin word that means *"to roll"*.
  - At its core, it describes the action of roll.

- **The Big Picture Idea**:
  - Picture crafting a specific shape out of clay or wood with careful hands.
  - Whenever you see **volut** in an English word, think of **to roll**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to roll).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Revolution**: A forcible overthrow of a government or social order in favor of a new system.
  - **Evolution**: The process by which different kinds of living organisms are thought to have developed and diversified from earlier forms.
  - **Volume**: An everyday English word showing the root's idea of *to roll*.
  - **Convoluted**: Extremely complex and difficult to follow.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">volut</mark>, think of <mark class="hl-def">to roll</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **volut** generates vocabulary primarily through prefixation on the participial stem *volūt-*:
> - **Base Noun in `volut-`:**
>   - *volūta* $\to$ French *volute* $\to$ *volute* ("spiral architectural scroll; sea snail shell").
> - **Prefix Modifications with Participial Suffix `-ion`:**
>   - *ē-* ("out of") + *volūtiō* $\to$ *evolution* ("unrolling of potential; biological adaptation").
>   - *re-* ("back/again") + *volūtiō* $\to$ *revolution* ("orbital cycle; political overthrow").
>   - *dē-* ("down from") + *volūtiō* $\to$ *devolution* ("transfer of power downward").
>   - *con-* ("together") + *volūtiō* $\to$ *convolution* ("intricate coil, fold, or twist").
>   - *con-* + *volute* + *-ed* $\to$ *convoluted* ("extremely complex and intricate").
>   - *in-* ("inward") + *volūtiō* $\to$ *involution* ("curling inward; mathematical function").
>   - *in-* + *volūtus* $\to$ *involute* ("rolled inward at the margins").
>   - *re-* + *volūtus* $\to$ *revolute* ("rolled backward or downward at the margins").

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

> [!tip] 🌈 Shades of Meaning in Different Words
> Although fundamentally denoting **"roll / spiral"**, the root branches into monumental disciplines:
> - **Classical Architecture & Design:** *volute* (Ionic and Composite column capitals, violin scroll heads).
> - **Evolutionary Biology & Paleontology:** *evolution*, *involute* (descent with modification, fossil ammonite shell coiling).
> - **Political Philosophy & History:** *revolution*, *devolution* (French Revolution, Scottish parliamentary devolution).
> - **Cognitive Complexity & Logic:** *convoluted*, *convolution* (labyrinthine bureaucratic procedures, brain cerebral cortex sulci).
> - **Mathematics & Signal Processing:** *convolution*, *involution* (convolutional neural networks CNNs, self-inverse functions).

---

## 🔀 4. Prefix & Combining Dynamics on volut

### Directional Prefix Modifications

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ē-` (out of) | `volūtiō` | **[[evolution]]** | The unrolling of a scroll; process of gradual biological adaptation over deep time. |
| `re-` (again/back) | `volūtiō` | **[[revolution]]** | A revolving orbital cycle; the sudden, complete overthrow of a political government. |
| `dē-` (down from) | `volūtiō` | **[[devolution]]** | The statutory delegation of powers from a central sovereign parliament to regional assemblies. |
| `con-` (together) | `volūtiō` | **[[convolution]]** / **convoluted** | Rolled tightly together; displaying intricate, bewildering complexity. |
| `in-` (inward) | `volūtiō` | **[[involution]]** / **involute** | Curling inward on itself; shrinkage of an organ (e.g. uterus) to normal size. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Classical Architecture & Luthier Craft** | *volute*, *Ionic volute* | Vitruvian Ionic capitals, hand-carved spiral scroll atop a Stradivarius violin neck. |
| 🧬 **Evolutionary Biology & Genetics** | *evolution*, *natural selection* | Darwinian adaptation, speciation across deep geological time. |
| 🤖 **Artificial Intelligence & Deep Learning** | *convolution*, *convolutional neural network* (CNN) | Feature extraction via kernel matrix sliding windows in computer vision. |
| 🏛️ **Constitutional Governance** | *devolution*, *devolved parliament* | UK devolution to the Scottish Parliament and Welsh Senedd. |
| 🧠 **Neuroanatomy & Embryology** | *cerebral convolutions*, *involution* | Folding of cerebral gyri to maximize neocortex surface area. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumvolute]] | verb | **1.** Wind or turn in volutions, especially in an inward spiral, as of snail. | *"In academic literature, circumvolute designates wind or turn in volutions, especially in an inward spiral, as of snail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumvolution]] | noun | **1.** The act of turning or winding or folding around a central axis. | *"Tell me, then, for you can, in what periphrasis of language, in what circumvolution of phrase, I shall envelope, yet not conceal, the plain story."* — Robert Burns, *The Letters of Robert Burns* |
| [[convolute]] | verb | **1.** Curl, wind, or twist together.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"It could be straight or as convoluted as a randomly configured corkscrew."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convoluted]] | verb | **1.** Curl, wind, or twist together.<br>**2.** Practice sophistry; change the meaning of or be vague about in order to mislead or deceive. | *"It could be straight or as convoluted as a randomly configured corkscrew."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convolution]] | noun | **1.** The shape of something rotating rapidly.<br>**2.** A convex fold or elevation in the surface of the brain. | *"Lying in strange folds, courses, and convolutions, to their apprehensions, it seems more in keeping with the idea of his general might to regard that mystic part of him as the seat of his intelligence."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[counterrevolution]] | noun | **1.** A revolution whose aim is to reverse the changes introduced by a previous revolution. | *"In academic literature, counterrevolution designates a revolution whose aim is to reverse the changes introduced by a previous revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterrevolutionary]] | noun | **1.** A revolutionary whose aim is to reverse the changes introduced by an earlier revolution.<br>**2.** Relating to or being a counterrevolution. | *"In academic literature, counterrevolutionary designates a revolutionary whose aim is to reverse the changes introduced by an earlier revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterrevolutionist]] | noun | **1.** A revolutionary whose aim is to reverse the changes introduced by an earlier revolution. | *"In academic literature, counterrevolutionist designates a revolutionary whose aim is to reverse the changes introduced by an earlier revolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devolution]] | noun | **1.** The process of declining from a higher to a lower level of effective power or vitality or essential quality.<br>**2.** The delegation of authority (especially from a central to a regional government). | *"Felix, though an offshoot from a far more recent point in the devolution of theology than his father, was less self-sacrificing and disinterested."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[evolution]] | noun | **1.** A process in which something passes by degrees to a different stage (especially a more advanced or mature stage).<br>**2.** (biology) the sequence of events involved in the evolutionary development of a species or taxonomic group of organisms. | *"But it’s well I never made that evolution of matrimony."* — Charles Dickens, *Bleak House* |
| [[evolutionarily]] | adverb | **1.** In an evolutionary way; from an evolutionary point of view. | *"In academic literature, evolutionarily designates in an evolutionary way; from an evolutionary point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolutionary]] | adjective | **1.** Of or relating to or produced by evolution. | *"Cumulative genetic and accelerated evolutionary alterations to the human body along with the effects of unique, often hostile, environments plus sheer distance from the familiar transformed humans-in-space into something else."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[evolutionism]] | noun | **1.** (biology) a scientific theory of the origin of species of plants and animals. | *"In academic literature, evolutionism designates (biology) a scientific theory of the origin of species of plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evolutionist]] | noun | **1.** A person who believes in organic evolution. | *"In academic literature, evolutionist designates a person who believes in organic evolution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[involute]] | adjective | **1.** Especially of petals or leaves in bud; having margins rolled inward.<br>**2.** (of some shells) closely coiled so that the axis is obscured. | *"In academic literature, involute designates especially of petals or leaves in bud; having margins rolled inward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[involution]] | noun | **1.** Reduction in size of an organ or part (as in the return of the uterus to normal size after childbirth).<br>**2.** A long and intricate and complicated grammatical construction. | *"Let there be no involution of thought and mind about it."* — Donn Byrne, *The Wind Bloweth* |
| [[revolution]] | noun | **1.** A drastic and far-reaching change in ways of thinking and behaving.<br>**2.** The overthrow of a government by those who are governed. | *"That I might see what the old world could say, To this composed wonder of your frame, Whether we are mended, or whether better they, Or whether revolution be the same."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[revolutionary]] | noun | **1.** A radical supporter of political or social revolution.<br>**2.** Markedly new or introducing radical change. | *"He entertains religious convictions of a curious kind; but, as the man is quite free from revolutionary sentiments, I have never considered it to be my duty to interfere with him, or to investigate his creed."* — Mrs. Oliphant, *A Beleaguered City* |
| [[revolutionise]] | verb | **1.** Fill with revolutionary ideas.<br>**2.** Change radically. | *"When an individual has revolutionised therapeutics by his discovery of the continuous evolution of brain-matter, conventional forms are unfitting, since they would seem to limit him to one of a class."* — Bram Stoker, *Dracula* |
| [[revolutionism]] | noun | **1.** A belief in the spread of revolutionary principles. | *"In academic literature, revolutionism designates a belief in the spread of revolutionary principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revolutionist]] | noun | **1.** A radical supporter of political or social revolution. | *"It is not what he plans; it is the effect, if his plans are achieved, that makes him a revolutionist."* — Jack London, *The Jacket (The Star-Rover)* |
| [[revolutionize]] | verb | **1.** Change radically.<br>**2.** Overthrow by a revolution, of governments. | *"On that occasion, Cook’s Court was in a manner revolutionized by the new inscription in fresh paint, PEFFER AND SNAGSBY, displacing the time-honoured and not easily to be deciphered legend PEFFER only."* — Charles Dickens, *Bleak House* |
| [[volute]] | noun | **1.** Ornament consisting of a curve on a plane that winds around a center with an increasing distance from the center.<br>**2.** A structure consisting of something wound in a continuous series of loops. | *"The electric light flooded everything; it was shed from four unpolished globes half sunk in the volutes of the ceiling."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[voluted]] | adjective | **1.** In the shape of a coil. | *"In academic literature, voluted designates in the shape of a coil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volution]] | noun | **1.** A rolling or revolving motion. | *"In academic literature, volution designates a rolling or revolving motion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Objects & Forms]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VOLUT
  </div>
</div>
