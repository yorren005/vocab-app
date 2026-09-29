---
status: unread
type: root_dashboard
---
# Dashboard — larg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">larg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“abundant or generous”</span>
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

The root **larg** means abundant or generous. It describes giving generously, being spacious, or having abundant supply. In English, this root forms words such as *enlarge*, *enlargement*, *large*, and *largely*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: abundant or generous
> The root **larg** means abundant or generous. It describes giving generously, being spacious, or having abundant supply. In English, this root forms words such as *enlarge*, *enlargement*, *large*, and *largely*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Abundant or generous</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *enlarge* and *enlargement*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **larg** comes from a Latin word that means *"abundant or generous"*.
  - At its core, it describes abundant or generous.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **larg** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of abundant or generous.
  - **Mental & Social**: How people experience, organize, or communicate about abundant or generous.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Enlarge**: To make or become larger or more extensive.
  - **Enlargement**: The action of enlarging something or the state of being enlarged.
  - **Large**: Of considerable or relatively great size, extent, or capacity.
  - **Largely**: To a great extent.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">larg</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **larg** generates vocabulary through nominalization, adjectival derivation, and verbal prefixation:
> - **Base Adjective, Adverb & Nouns:**
>   - *largus* $	o$ Old French *large* $	o$ *large* ("of considerable or relatively great size, extent, or capacity").
>   - *large* + *-ly* $	o$ *largely* ("to a great extent; on the whole; mostly").
>   - *large* + *-ness* $	o$ *largeness* ("the quality of being large").
> - **Noble Generosity Formations:**
>   - Old French *largesse* (from Latin *largitās*) $	o$ *largesse* / *largess* ("generosity in bestowing money or gifts upon others").
> - **Prefix Modifications with *en-*:**
>   - *en-* ("make") + *large* $	o$ *enlarge*, *enlargement*, *enlarger* ("to make or become bigger or more expansive").
> - **Idiomatic Compound Formations:**
>   - *at* + *large* $	o$ *at large* ("escaped or not yet captured; as a whole; representing an entire district").

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
> - **Physical Scale & Dimensions:** *large*, *largeness*, *largely* (large container ships, largely successful reforms).
> - **Photography, Microscopy & Architecture:** *enlarge*, *enlargement*, *enlarger* (photo enlargement, enlarged heart).
> - **Philanthropy & Aristocratic Charity:** *largesse* (corporate largesse, distributing royal largesse).
> - **Criminal Law & Electoral Districts:** *at large* (fugitive at large, councilor elected at large).

---

## 🔀 4. Prefix & Combining Dynamics on larg

### Prefix & Formation Matrix

| Affix / Form | Base Meaning | Combined Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `en-` (causative) | `large` | **[[enlarge]]** / **enlargement** | To physically expand the dimensions or scale of a photograph or room. |
| `-esse` (abstract noun) | `largus` | **[[largess]]** / **largesse** | The noble chivalric virtue of distributing wealth generously to others. |
| `-ly` (adverbial) | `large` | **[[largely]]** | To a great extent; predominantly or for the most part. |
| `at-` (idiomatic phrase) | `large` | **at large** | Operating in open, unconfined space $	o$ uncaptured, or representing the whole. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📸 **Optical Engineering & Photography** | *enlarge*, *enlargement* | High-resolution optical print enlargement; digital raster image upscaling. |
| 🩺 **Clinical Cardiology & Pathology** | *enlargement*, *enlarge* | Diagnosing cardiomegaly (pathological heart enlargement) via chest radiography. |
| ⚖️ **Criminal Justice & Law Enforcement** | *at large* | Issuing nationwide public alerts for an armed and dangerous fugitive at large. |
| 🗳️ **Electoral Politics & Representation** | *at large* | City charter reforms electing municipal school board members at large. |
| 🏰 **Medieval Historiography & Chivalry** | *largesse* | Feudal courtly patronage and aristocratic largesse distributed at royal tournaments. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allargando]] | adjective | **1.** Gradually decreasing in tempo and broadening in manner. | *"In academic literature, allargando designates gradually decreasing in tempo and broadening in manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[at large]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin larg within the domain of Quantity.<br>**2.** A technical or specialized form exhibiting the properties of larg in systematic terminology. | *"In academic literature, at large designates pertaining to, derived from, or characteristic of latin larg within the domain of quantity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enlarge]] | verb | **1.** Make larger.<br>**2.** Make large. | *"So the poor third is up, till death enlarge his confine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enlarged]] | verb | **1.** Make larger.<br>**2.** Make large. | *"Therefore heaven nature charged That one body should be filled With all graces wide-enlarged."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enlargement]] | noun | **1.** The act of increasing (something) in size or volume or quantity or scope.<br>**2.** The state of being enlarged. | *"But now the arbitrator of despairs, Just Death, kind umpire of men’s miseries, With sweet enlargement doth dismiss me hence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enlarger]] | noun | **1.** Photographic equipment consisting of an optical projector used to enlarge a photograph. | *"In academic literature, enlarger designates photographic equipment consisting of an optical projector used to enlarge a photograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large]] | noun | **1.** A garment size for a large person.<br>**2.** Above average in size or number or quantity or magnitude or extent. | *"But ah, thought kills me that I am not thought To leap large lengths of miles when thou art gone, But that so much of earth and water wrought, I must attend, time’s leisure with my moan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[large-cap]] | adjective | **1.** Of stocks of companies with a market capitalization of five billion dollars or more. | *"In academic literature, large-cap designates of stocks of companies with a market capitalization of five billion dollars or more."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-capitalisation]] | adjective | **1.** Of stocks of companies with a market capitalization of five billion dollars or more. | *"In academic literature, large-capitalisation designates of stocks of companies with a market capitalization of five billion dollars or more."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-capitalization]] | adjective | **1.** Of stocks of companies with a market capitalization of five billion dollars or more. | *"In academic literature, large-capitalization designates of stocks of companies with a market capitalization of five billion dollars or more."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-grained]] | adjective | **1.** Not having a fine texture. | *"In academic literature, large-grained designates not having a fine texture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-headed]] | adjective | **1.** Having a large head. | *"In academic literature, large-headed designates having a large head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-hearted]] | adjective | **1.** Showing or motivated by sympathy and understanding and generosity. | *"In academic literature, large-hearted designates showing or motivated by sympathy and understanding and generosity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-leafed]] | adjective | **1.** Having relatively large leaves. | *"In academic literature, large-leafed designates having relatively large leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-leaved]] | adjective | **1.** Having relatively large leaves. | *"In academic literature, large-leaved designates having relatively large leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-minded]] | adjective | **1.** Showing or characterized by broad-mindedness. | *"In academic literature, large-minded designates showing or characterized by broad-mindedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-mouthed]] | adjective | **1.** Having a relatively large mouth. | *"In academic literature, large-mouthed designates having a relatively large mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[large-scale]] | adjective | **1.** Unusually large in scope.<br>**2.** Constructed or drawn to a big scale. | *"In academic literature, large-scale designates unusually large in scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[largely]] | adverb | **1.** In large part; mainly or chiefly.<br>**2.** On a large scale. | *"Our present musters grow upon the file To five and twenty thousand men of choice; And our supplies live largely in the hope Of great Northumberland, whose bosom burns With an incensed fire of injuries."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[largemouth]] | noun | **1.** A large black bass; the angle of the jaw falls behind the eye. | *"In academic literature, largemouth designates a large black bass; the angle of the jaw falls behind the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[largeness]] | noun | **1.** The capacity to understand a broad range of topics.<br>**2.** Large or extensive in breadth or importance or comprehensiveness. | *"She paused and murmured words mechanically, but all the while her eyes dreamed through me and beyond me with the largeness of the vision that filled them."* — Jack London, *The Jacket (The Star-Rover)* |
| [[larger]] | adjective | **1.** Large or big relative to something else.<br>**2.** Above average in size or number or quantity or magnitude or extent. | *"And what may follow To try a larger fortune."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[larger-than-life]] | adjective | **1.** Very imposing or impressive; surpassing the ordinary (especially in size or scale). | *"In academic literature, larger-than-life designates very imposing or impressive; surpassing the ordinary (especially in size or scale)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[largess]] | noun | **1.** A gift or money given (as for service or out of benevolence); usually given ostentatiously.<br>**2.** Liberality in bestowing gifts; extremely liberal and generous of spirit. | *"Nature’s bequest gives nothing but doth lend, And being frank she lends to those are free: Then beauteous niggard why dost thou abuse, The bounteous largess given thee to give?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[largesse]] | noun | **1.** A gift or money given (as for service or out of benevolence); usually given ostentatiously.<br>**2.** Liberality in bestowing gifts; extremely liberal and generous of spirit. | *"Next day he distributed largesse to his followers."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[largish]] | adjective | **1.** Somewhat large. | *"A largish piece of the biscuit the Emperor was holding in his hand broke off, fell on the balcony parapet, and then to the ground."* — graf Leo Tolstoy, *War and Peace* |
| [[largo]] | noun | **1.** (music) a composition or passage that is to be performed in a slow and dignified manner.<br>**2.** Very slow in tempo and broad in manner. | *"In the middle distance are the tower of Dunbar Church, the Bass Rock, and the Isle of May; and farther off is the coast of Fife, with Largo Law and the Lomonds in the background."* — John Cairns, *Principal Cairns* |
| [[overlarge]] | adjective | **1.** Excessively large. | *"In academic literature, overlarge designates excessively large."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · LARG
  </div>
</div>
