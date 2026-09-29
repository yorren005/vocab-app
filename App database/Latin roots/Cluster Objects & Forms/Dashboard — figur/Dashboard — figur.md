---
status: unread
type: root_dashboard
---
# Dashboard — figur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">figur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“form or shape”</span>
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

The root **figur** means form or shape. It refers to the visible outline, geometric shape, or bodily figure. In English, this root forms words such as *figure*, *figurine*, *figurative*, and *figuratively*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: form or shape
> The root **figur** means form or shape. It refers to the visible outline, geometric shape, or bodily figure. In English, this root forms words such as *figure*, *figurine*, *figurative*, and *figuratively*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Form or shape</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Crafting a specific shape out of clay or wood with careful hands.</mark>
> - **Everyday Connection**: Think of familiar words like *figure* and *figurine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **figur** comes from a Latin word that means *"form or shape"*.
  - At its core, it describes form or shape.

- **The Big Picture Idea**:
  - Picture crafting a specific shape out of clay or wood with careful hands.
  - Whenever you see **figur** in an English word, think of **shapes, forms, and physical objects**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of form or shape.
  - **Mental & Social**: How people experience, organize, or communicate about form or shape.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Figure**: A number or numerical symbol.
  - **Figurine**: A small carved or molded statue, especially one representing a human form.
  - **Figurative**: Departing from a literal use of words.
  - **Figuratively**: In a figurative or metaphorical manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">figur</mark>, think of <mark class="hl-def">shapes, forms, and physical objects</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **figur** builds vocabulary through rich Latin prefixation:
> - **Base Noun and Adjectives:**
>   - *figūra* $\to$ Old French *figure* $\to$ *figure* ("shape; number; personality; to calculate").
>   - *figūra* + Italian *-ina* $\to$ French *figurine* $\to$ *figurine* ("small carved statuette").
>   - *figūrāre* + *-tīvus* $\to$ *figurative*, *figuratively* ("metaphorical, non-literal").
> - **Prefix Compounds:**
>   - *con-* ("together") + *figūrāre* $\to$ *configure*, *configuration*, *configurable*.
>   - *dis-* ("apart, negative") + *figūrāre* $\to$ *disfigure*, *disfigurement* ("to ruin the appearance").
>   - *prae-* ("before") + *figūrāre* $\to$ *prefigure*, *prefiguration* ("to foreshadow").
>   - *trans-* ("across, beyond") + *figūrāre* $\to$ *transfigure*, *transfiguration* ("to elevate form").
> - **Participial Stems in `fict-` / `effig-` (< Latin *fingere*):**
>   - *ex-* + *fingere* $\to$ *effigiēs* $\to$ *effigy* ("a sculptured likeness; mock likeness").
>   - *fingere* + *-tiō* $\to$ *fictiō* $\to$ *fiction*, *fictitious* ("invented literary narrative").

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
> Although fundamentally denoting **"shape / form"**, the root adapts across multiple cultural registers:
> - **Computer Science & IT Infrastructure:** *configure*, *configuration*, *configurable* (server setup, network routing).
> - **Rhetoric, Poetics & Art:** *figurative*, *figuratively* (metaphorical meaning, representational painting).
> - **Theology & Biblical Exegesis:** *prefigure*, *transfigure*, *transfiguration* (typological fulfillment, divine glory).
> - **Plastic Arts & Sculpture:** *figure*, *figurine*, *effigy* (statuettes, sculpted human likenesses).
> - **Surgical Pathology & Trauma:** *disfigure*, *disfigurement* (facial scarring, reconstructive plastic surgery).
> - **Literature & Creative Writing:** *fiction*, *fictitious* (novels, creative imaginative narratives).

---

## 🔀 4. Prefix & Combining Dynamics on figur

### Directional & Semantic Prefix Shifts

| Prefix            | Base Stem  | Combined Derivative                           | Resulting Semantic Shift                                            |
| :---------------- | :--------- | :-------------------------------------------- | :------------------------------------------------------------------ |
| `con-` (together) | `figūrāre` | **[[configure]]** / **[[configuration]]**     | To assemble diverse parts into a unified operational shape.         |
| `dis-` (reversal) | `figūrāre` | **[[disfigure]]** / **[[disfigurement]]**     | To spoil or destroy the natural shape or beauty of something.       |
| `prae-` (before)  | `figūrāre` | **[[prefigure]]**                             | To imagine, represent, or suggest beforehand; to foreshadow.        |
| `trans-` (beyond) | `figūrāre` | **[[transfigure]]** / **[[transfiguration]]** | To transform into something more beautiful, spiritual, or elevated. |
| `ex-` (out)       | `fingere`  | **effigy**                                    | A sculptured model, statue, or likeness representing a person.      |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Software Engineering & Cloud Computing** | *configure*, *configuration file*, *configurable* | YAML configuration files, Kubernetes cluster topology orchestration. |
| 📚 **Literary Criticism & Rhetoric** | *figurative language*, *figure of speech*, *fiction* | Metaphorical tropes, character development, narrative fiction. |
| ⛪ **Christian Theology & Art** | *transfiguration*, *prefigure* | Raphael's Transfiguration altarpiece, typological Old-to-New Testament parallels. |
| 🏥 **Plastic & Reconstructive Surgery** | *disfigure*, *disfigurement* | Craniofacial microvascular surgery repairing severe burn contractures. |
| 🎨 **Fine Arts & Sculpture** | *figure drawing*, *figurine*, *effigy* | Academic life-drawing studies from human models, Meissen porcelain figurines. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[configuration]] | noun | **1.** An arrangement of parts or elements.<br>**2.** Any spatial attributes (especially as defined by outline). | *"Quale meant in intellectual beauty—and whether we were not struck by his massive configuration of brow."* — Charles Dickens, *Bleak House* |
| [[configurational]] | adjective | **1.** Of or relating to or characterized by configuration. | *"In academic literature, configurational designates of or relating to or characterized by configuration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[configurationism]] | noun | **1.** (psychology) a theory of psychology that emphasizes the importance of configurational properties. | *"In academic literature, configurationism designates (psychology) a theory of psychology that emphasizes the importance of configurational properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[configure]] | verb | **1.** Set up for a particular purpose. | *"Neutronic penetray analysis shows that in addition to thermonuclear power plants the aggregate includes machined parts configured to Catalog 11 long range lasers, explosive decompressors, particle beamers and gun mounts."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[configured]] | verb | **1.** Set up for a particular purpose.<br>**2.** Organized so as to give configuration to. | *"Neutronic penetray analysis shows that in addition to thermonuclear power plants the aggregate includes machined parts configured to Catalog 11 long range lasers, explosive decompressors, particle beamers and gun mounts."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[disfiguration]] | noun | **1.** An appearance that has been spoiled or is misshapen.<br>**2.** The act of damaging the appearance or surface of something. | *"It's the like of a disfiguration that all can see."* — Donn Byrne, *The Wind Bloweth* |
| [[disfigure]] | verb | **1.** Mar or spoil the appearance of. | *"He cries for you, and vows, if he can take you, To scorch your face and to disfigure you. [_Cry within._] Hark, hark, I hear him, mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disfigured]] | verb | **1.** Mar or spoil the appearance of.<br>**2.** Having the appearance spoiled. | *"Badger, “that he disfigured some of the houses and other buildings by chipping off fragments of those edifices with his little geological hammer."* — Charles Dickens, *Bleak House* |
| [[disfigurement]] | noun | **1.** An appearance that has been spoiled or is misshapen.<br>**2.** The act of damaging the appearance or surface of something. | *"That his generosity rose above my disfigurement and my inheritance of shame."* — Charles Dickens, *Bleak House* |
| [[figural]] | adjective | **1.** Consisting of or forming human or animal figures; ; - herbert read. | *"In academic literature, figural designates consisting of or forming human or animal figures; ; - herbert read."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[figuration]] | noun | **1.** Representing figuratively as by emblem or allegory.<br>**2.** Decorating with a design. | *"Divine sense of Deity The term Lord, as used in our version of the Old 576:27 Testament, is often synonymous with Jehovah, and ex- presses the Jewish concept, not yet elevated to deific apprehension through spiritual trans- 576:30 figuration."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[figurative]] | adjective | **1.** (used of the meanings of words or text) not literal; using figures of speech.<br>**2.** Consisting of or forming human or animal figures; ; - herbert read. | *"Badger, “speaking in his figurative naval manner, that when you make pitch hot, you cannot make it too hot; and that if you only have to swab a plank, you should swab it as if Davy Jones were after you."* — Charles Dickens, *Bleak House* |
| [[figuratively]] | adverb | **1.** In a figurative sense. | *"Figuratively, this is what money does."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[figure]] | noun | **1.** A diagram or picture illustrating textual material.<br>**2.** Alternative names for the body of a human being. | *"Ah yet doth beauty like a dial hand, Steal from his figure, and no pace perceived, So your sweet hue, which methinks still doth stand Hath motion, and mine eye may be deceived."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[figured]] | verb | **1.** Judge to be probable.<br>**2.** Be or play a part of or in. | *"RICHARD. ’Tis figured in my tongue."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[figurehead]] | noun | **1.** A person used as a cover for some questionable activity.<br>**2.** Figure on the bow of some sailing vessels. | *"The spectral figurehead, reversed in its position, glancing backwards, seemed to mock the impatient attitude of the warrior."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[figurer]] | noun | **1.** An expert at calculation (or at operating calculating machines). | *"In academic literature, figurer designates an expert at calculation (or at operating calculating machines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[figurine]] | noun | **1.** A small carved or molded figure. | *"She had all the delicate grace of that Tanagra figurine that you have in your studio, Basil."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[figuring]] | noun | **1.** Problem solving that involves numbers or quantities.<br>**2.** Judge to be probable. | *"There is a history in all men’s lives Figuring the natures of the times deceased; The which observed, a man may prophesy, With a near aim, of the main chance of things As yet not come to life, who in their seeds And weak beginning lie intreasured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonfigurative]] | adjective | **1.** Not representing or imitating external reality or the objects of nature. | *"In academic literature, nonfigurative designates not representing or imitating external reality or the objects of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefiguration]] | noun | **1.** An example that prefigures or foreshadows what is to come.<br>**2.** The act of providing vague advance indications; representing beforehand. | *"In academic literature, prefiguration designates an example that prefigures or foreshadows what is to come."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefigurative]] | adjective | **1.** Indistinctly prophetic. | *"Like all the cottagers in Blackmoor Vale, Tess was steeped in fancies and prefigurative superstitions; she thought this an ill omen—the first she had noticed that day."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[prefigure]] | verb | **1.** Imagine or consider beforehand.<br>**2.** Indicate by signs. | *"His career it would be difficult to prefigure."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[subfigure]] | noun | **1.** A figure that is a part of another figure. | *"In academic literature, subfigure designates a figure that is a part of another figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transfiguration]] | noun | **1.** (christianity) a church festival held in commemoration of the transfiguration of jesus.<br>**2.** (new testament) the sudden emanation of radiance from the person of jesus. | *"It was less a reform than a transfiguration."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[transfigure]] | verb | **1.** Elevate or idealize, in allusion to christ's transfiguration.<br>**2.** Change completely the nature or appearance of. | *"It was too slight to seize upon at the instant; yet, as recollected afterwards, seemed to transfigure the whole man."* — Nathaniel Hawthorne, *The House of the Seven Gables* |

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
    ROOT DASHBOARD · FIGUR
  </div>
</div>
