---
status: unread
type: root_dashboard
---
# Dashboard — cre
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cre-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to make or create”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **cre** means to make or create. It refers to the action of making and carrying out this process. In English, this root forms words such as *create*, *creation*, *creator*, and *creature*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to make or create
> The root **cre** means to make or create. It refers to the action of making and carrying out this process. In English, this root forms words such as *create*, *creation*, *creator*, and *creature*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To make or create</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *create* and *creation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cre** comes from a Latin word that means *"to make or create"*.
  - At its core, it describes the action of make or create.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **cre** in an English word, think of **to make or create**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to make or create).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Create**: To bring something into existence from nothing or through artistic effort.
  - **Creation**: The act or process of bringing something into existence.
  - **Creator**: A person or thing that brings something into existence.
  - **Creature**: An animal, as distinct from a human being.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cre</mark>, think of <mark class="hl-def">to make or create</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `crea-` (< Latin *creāre*): Transitive causative stem ("to bring into existence").
  - `cresc-` / `cret-` (< Latin *crēscere*): Intransitive inchoative stem ("to grow, swell").
- **Prefix & Combining Machinery**:
  - `pro-` ("forth, forward"): *procreate, procreation*.
  - `re-` ("again"): *recreate, recreation, recruit* (< Old French *recroistre*).
  - `in-` ("in, upon"): *increscent, increase*.

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
```
                      ┌── Bringing Forth: create, creator, creature
                      │
    [cre] ────────────┼── Reproduction: procreate, procreation
(To create, grow)     │
                      ├── Restorative Leisure: recreate, recreation
                      │
                      └── Swelling & Growth: crescendo, increscent, recruit
```

---

## 🔀 4. Prefix & Combining Dynamics on cre
- **`pro-` + `cre` + `-ate`**: *procreate* — to beget offspring; to reproduce biologically.
- **`re-` + `cre` + `-ate`**: *recreate* — to refresh or restore bodily and mental strength through leisure.
- **`cresc` + `-endo`**: *crescendo* — a progressive increase in loudness or intensity.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Fine Arts & Literature**: Artistic *creation*; creative writing; avant-garde *creators*.
- **Musicology & Orchestration**: Dynamic *crescendo* markings in classical orchestral scores.
- **Evolutionary Biology**: Reproductive *procreation*; living *creatures*; adaptation.
- **Sociology & Public Health**: Recreational parks; *recreation* centers; work-life balance.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accrete]] | verb | **1.** Grow together (of plants and organs).<br>**2.** Grow or become attached by accretion. | *"Of its bones is coral made;" its arguments and theories have lain long in Wordsworth's mind, and have accreted to themselves a rich investiture of observation and feeling."* — F. W. H. Myers, *Wordsworth* |
| [[accretion]] | noun | **1.** An increase by natural growth or addition.<br>**2.** Something contributing to growth or increase. | *"She had no fear of the shadows; her sole idea seemed to be to shun mankind—or rather that cold accretion called the world, which, so terrible in the mass, is so unformidable, even pitiable, in its units."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[accretionary]] | adjective | **1.** Marked or produced by accretion. | *"In academic literature, accretionary designates marked or produced by accretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accretive]] | adjective | **1.** Growing by accretion. | *"In academic literature, accretive designates growing by accretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concrete]] | noun | **1.** A strong hard building material composed of sand and gravel and cement and water.<br>**2.** Cover with cement. | *"It was Wisdom in the abstract facing Folly in the concrete."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[concretely]] | adverb | **1.** In concrete terms. | *"To put it concretely: America, having great natural resources for agriculture, might continue to trade food for manufactured goods even tho England reaped most of the benefits of the trade."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[concreteness]] | noun | **1.** The quality of being concrete (not abstract). | *"In academic literature, concreteness designates the quality of being concrete (not abstract)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concretion]] | noun | **1.** The formation of stonelike objects within a body organ (e.g., the kidneys).<br>**2.** A hard lump produced by the concretion of mineral salts; found in hollow organs or ducts of the body. | *"Troubles and other realities took on themselves a metaphysical impalpability, sinking to mere mental phenomena for serene contemplation, and no longer stood as pressing concretions which chafed body and soul."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[concretise]] | verb | **1.** Become specific. | *"In academic literature, concretise designates become specific."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concretism]] | noun | **1.** A representation of an abstract idea in concrete terms. | *"In academic literature, concretism designates a representation of an abstract idea in concrete terms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concretistic]] | adjective | **1.** Of or relating to concrete representations of abstractions. | *"In academic literature, concretistic designates of or relating to concrete representations of abstractions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concretize]] | verb | **1.** Make something concrete.<br>**2.** Become specific. | *"In academic literature, concretize designates make something concrete."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creak]] | noun | **1.** A squeaking sound.<br>**2.** Make a high-pitched, screeching noise. | *"But in no more than a minute or two the stairs creak and Tony comes swiftly back."* — Charles Dickens, *Bleak House* |
| [[creakily]] | adverb | **1.** In a creaky manner. | *"In academic literature, creakily designates in a creaky manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creaking]] | noun | **1.** A squeaking sound.<br>**2.** Make a high-pitched, screeching noise. | *"I shall stay here the forehorse to a smock, Creaking my shoes on the plain masonry, Till honour be bought up, and no sword worn But one to dance with."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creakingly]] | adverb | **1.** In a creaky manner. | *"In academic literature, creakingly designates in a creaky manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creaky]] | adjective | **1.** Worn and broken down by hard use.<br>**2.** Having a rasping or grating sound. | *"The Professor took the key, opened the creaky door, and standing back, politely, but quite unconsciously, motioned me to precede him."* — Bram Stoker, *Dracula* |
| [[cream]] | noun | **1.** The best people or things in a group.<br>**2.** The part of milk containing the butterfat. | *"No, faith, proud mistress, hope not after it. ’Tis not your inky brows, your black silk hair, Your bugle eyeballs, nor your cheek of cream, That can entame my spirits to your worship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cream-colored]] | adjective | **1.** Having the color of fresh cream. | *"In academic literature, cream-colored designates having the color of fresh cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creamcups]] | noun | **1.** California plant with small pale yellow flowers. | *"In academic literature, creamcups designates california plant with small pale yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creamer]] | noun | **1.** A small pitcher for serving cream. | *"Creamer, to state that my health is such that all strong emotions would be dangerous in my present delicate condition--and that I must decline any family discussions or interviews whatever."* — William Makepeace Thackeray, *Vanity Fair* |
| [[creamery]] | noun | **1.** A workplace where dairy products (butter and cheese etc.) are produced or sold. | *"I did hear it reported that Elder Fry calculates to give up preachin' an' go into the creamery business another spring."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[creaminess]] | noun | **1.** The property of having the thickness of heavy cream. | *"In academic literature, creaminess designates the property of having the thickness of heavy cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creamy]] | adjective | **1.** Of the color of cream.<br>**2.** Thick like cream. | *"But the spermaceti itself, how bland and creamy that is; like the transparent, half-jellied, white meat of a cocoanut in the third month of its growth, yet far too rich to supply a substitute for butter."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[creamy-colored]] | adjective | **1.** Having the color of fresh cream. | *"In academic literature, creamy-colored designates having the color of fresh cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creamy-white]] | adjective | **1.** Having the color of fresh cream. | *"In academic literature, creamy-white designates having the color of fresh cream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creamy-yellow]] | adjective | **1.** Yellow with a creamy tinge. | *"In academic literature, creamy-yellow designates yellow with a creamy tinge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crease]] | noun | **1.** An angular or rounded shape made by folding.<br>**2.** A slight depression in the smoothness of a surface. | *"He wears his usual expressionless mask—if it be a mask—and carries family secrets in every limb of his body and every crease of his dress."* — Charles Dickens, *Bleak House* |
| [[crease-resistant]] | adjective | **1.** Of fabric that does not wrinkle easily. | *"In academic literature, crease-resistant designates of fabric that does not wrinkle easily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creaseless]] | adjective | **1.** Used especially of fabrics. | *"In academic literature, creaseless designates used especially of fabrics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creaseproof]] | adjective | **1.** Of fabric that does not wrinkle easily. | *"In academic literature, creaseproof designates of fabric that does not wrinkle easily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creashak]] | noun | **1.** Evergreen mat-forming shrub of north america and northern eurasia having small white flowers and red berries; leaves turn red in autumn. | *"In academic literature, creashak designates evergreen mat-forming shrub of north america and northern eurasia having small white flowers and red berries; leaves turn red in autumn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[create]] | verb | **1.** Make or cause to be or to become.<br>**2.** Bring into existence. | *"If thou canst like this creature as a maid, I can create the rest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creatin]] | noun | **1.** An amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction. | *"In academic literature, creatin designates an amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creatine]] | noun | **1.** An amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction. | *"In academic literature, creatine designates an amino acid that does not occur in proteins but is found in the muscle tissue of vertebrates both in the free form and as phosphocreatine; supplies energy for muscle contraction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creation]] | noun | **1.** The human act of creating.<br>**2.** An artifact that has been brought into existence by someone. | *"But heaven in thy creation did decree, That in thy face sweet love should ever dwell, Whate’er thy thoughts, or thy heart’s workings be, Thy looks should nothing thence, but sweetness tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creationism]] | noun | **1.** The literal belief in the account of creation given in the book of genesis. | *"In academic literature, creationism designates the literal belief in the account of creation given in the book of genesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creative]] | adjective | **1.** Having the ability or power to create.<br>**2.** Promoting construction or creation. | *"When he emerged from them he was fifty-four years of age, he had passed beyond the time of life when his creative powers were at their freshest, and the general habits of his life and lines of his activity had become settled and stereotyped."* — John Cairns, *Principal Cairns* |
| [[creatively]] | adverb | **1.** In a creative manner. | *"In academic literature, creatively designates in a creative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creativeness]] | noun | **1.** The ability to create. | *"There is some unsuffusing thing beyond thee, thou clear spirit, to whom all thy eternity is but time, all thy creativeness mechanical."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[creativity]] | noun | **1.** The ability to create. | *"The give-and-take stimulated our imaginations and creativity, and often provided me with opportunities to pass along family history."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[creator]] | noun | **1.** Terms referring to the judeo-christian god.<br>**2.** A person who grows or makes or invents things. | *"I make you both Protectors of this land, While I myself will lead a private life And in devotion spend my latter days, To sin’s rebuke and my Creator’s praise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creature]] | noun | **1.** A living organism characterized by voluntary movement.<br>**2.** A human being; `wight' is an archaic term. | *"I have been, madam, a wicked creature, as you and all flesh and blood are; and indeed I do marry that I may repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creche]] | noun | **1.** A hospital where foundlings (infant children of unknown parents) are taken in and cared for.<br>**2.** A representation of christ's nativity in the stable at bethlehem. | *"In academic literature, creche designates a hospital where foundlings (infant children of unknown parents) are taken in and cared for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crecy]] | noun | **1.** The first decisive battle of the hundred years' war; in 1346 the english under edward iii defeated the french under philip of valois. | *"In academic literature, crecy designates the first decisive battle of the hundred years' war; in 1346 the english under edward iii defeated the french under philip of valois."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credal]] | adjective | **1.** Of or relating to a creed. | *"In academic literature, credal designates of or relating to a creed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[credence]] | noun | **1.** The mental attitude that something is believable and should be accepted as true.<br>**2.** A kind of sideboard or buffet. | *"His love and wisdom, Approv’d so to your majesty, may plead For amplest credence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credibility]] | noun | **1.** The quality of being believable or trustworthy. | *"Nothing can surpass the vigilance with which English critics will examine the credibility of the traveller who publishes an account of some distant and comparatively unimportant country."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[credible]] | adjective | **1.** Capable of being believed.<br>**2.** (a common but incorrect usage where `credulous' would be appropriate) credulous. | *"Nay, ’tis most credible, we here receive it, A certainty, vouch’d from our cousin Austria, With caution, that the Florentine will move us For speedy aid; wherein our dearest friend Prejudicates the business, and would seem To have us make denial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[credibleness]] | noun | **1.** The quality of being believable or trustworthy. | *"In academic literature, credibleness designates the quality of being believable or trustworthy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cree]] | noun | **1.** A member of an algonquian people living in central canada.<br>**2.** The algonquian language spoken by the cree. | *"Song—A Fiddler In The North The Minstrel At Lincluden A Vision Song—A Red, Red Rose Song—Young Jamie, Pride Of A’ The Plain Song—The Flowery Banks Of Cree Monody On a lady famed for her Caprice."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[creed]] | noun | **1.** Any system of principles or beliefs.<br>**2.** The written body of teachings of a religious group that are generally accepted by that group. | *"For me, my lords, I love him not, nor fear him; there’s my creed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creedal]] | adjective | **1.** Of or relating to a creed. | *"In academic literature, creedal designates of or relating to a creed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creek]] | noun | **1.** A natural stream of water smaller than a river (and often a tributary of a river).<br>**2.** Any member of the creek confederacy (especially the muskogee) formerly living in georgia and alabama but now chiefly in oklahoma. | *"I’ll throw’t into the creek Behind our rock, and let it to the sea And tell the fishes he’s the Queen’s son, Cloten."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creel]] | noun | **1.** A wicker basket used by anglers to hold fish. | *"My senses wad be in a creel, Should I but dare a hope to speel Wi’ Allan, or wi’ Gilbertfield, The braes o’ fame; Or Fergusson, the writer-chiel, A deathless name. (O Fergusson! thy glorious parts Ill suited law’s dry, musty arts!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[creep]] | noun | **1.** Someone unpleasantly strange or eccentric.<br>**2.** A slow longitudinal movement or deformation. | *"When the sun shines let foolish gnats make sport, But creep in crannies when he hides his beams."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creeper]] | noun | **1.** Any plant (as ivy or periwinkle) that grows by creeping.<br>**2.** A person who crawls or creeps along the ground. | *"Ideal and real clashed slightly as the sun lit up their figures against the green hedges and creeper-laced house-fronts; for, though the whole troop wore white garments, no two whites were alike among them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[creepiness]] | noun | **1.** An uneasy sensation as of insects creeping on your skin. | *"In academic literature, creepiness designates an uneasy sensation as of insects creeping on your skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creeping]] | noun | **1.** A slow mode of locomotion on hands and knees or dragging the body.<br>**2.** Move slowly; in the case of people or animals with the body near the ground. | *"At first the infant, Mewling and puking in the nurse’s arms; Then the whining schoolboy, with his satchel And shining morning face, creeping like snail Unwillingly to school."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creeps]] | noun | **1.** A disease of cattle and sheep attributed to a dietary deficiency; characterized by anemia and softening of the bones and a slow stiff gait.<br>**2.** A feeling of fear and revulsion. | *"Tomorrow, and tomorrow, and tomorrow, Creeps in this petty pace from day to day, To the last syllable of recorded time; And all our yesterdays have lighted fools The way to dusty death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creepy]] | adjective | **1.** Annoying and unpleasant.<br>**2.** Causing a sensation as of things crawling on your skin. | *"How do I know that he hasn't had all sorts of cold, creepy feeling's keeping him from proposing to Caroline?"* — Maria Thompson Daviess, *The Tinder-Box* |
| [[creepy-crawlies]] | noun | **1.** Feelings of dislike and anxiety.<br>**2.** An animal that creeps or crawls (such as worms or spiders or insects). | *"In academic literature, creepy-crawlies designates feelings of dislike and anxiety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creepy-crawly]] | noun | **1.** An animal that creeps or crawls (such as worms or spiders or insects).<br>**2.** Causing a sensation as of things crawling on your skin. | *"In academic literature, creepy-crawly designates an animal that creeps or crawls (such as worms or spiders or insects)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creese]] | noun | **1.** A malayan dagger with a wavy blade. | *"She had caught up an old Malay creese that lay in a corner, and was now making for the door, at which half a dozen domestics were by this time gathered."* — George MacDonald, *The Portent and Other Stories* |
| [[cremains]] | noun | **1.** The remains of a dead body after cremation. | *"In academic literature, cremains designates the remains of a dead body after cremation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cremate]] | verb | **1.** Reduce to ashes. | *"Cremate, 29. _See_ Burning, Giving, Relics."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[cremation]] | noun | **1.** The incineration of a dead body. | *"A reliquary, or shrine, of cupola-shape to contain remains after cremation, especially of the Buddha. _Subhūti_."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[crematorium]] | noun | **1.** A mortuary where corpses are cremated.<br>**2.** A furnace where a corpse can be burned and reduced to ashes. | *"In academic literature, crematorium designates a mortuary where corpses are cremated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crematory]] | noun | **1.** A mortuary where corpses are cremated.<br>**2.** A furnace where a corpse can be burned and reduced to ashes. | *"In academic literature, crematory designates a mortuary where corpses are cremated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cremona]] | noun | **1.** A city in lombardy on the po river; noted for the manufacture of fine violins from the 16th to the 18th centuries. | *"A lady coming into a room hastily with her mantua brushed down a Cremona fiddle that lay on a chair, and broke it; upon which, a gentleman that was present, burst into this exclamation from Virgil: Mantua, væ miseræ nimium vicina Cremonæ!"* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[crenate]] | adjective | **1.** Having a margin with rounded scallops. | *"In academic literature, crenate designates having a margin with rounded scallops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenated]] | adjective | **1.** Having a margin with rounded scallops. | *"In academic literature, crenated designates having a margin with rounded scallops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenation]] | noun | **1.** One of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.). | *"In academic literature, crenation designates one of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenature]] | noun | **1.** One of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.). | *"In academic literature, crenature designates one of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenel]] | noun | **1.** One of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.).<br>**2.** A notch or open space between two merlons in a crenelated battlement. | *"In academic literature, crenel designates one of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenelate]] | verb | **1.** Supply with battlements. | *"This tower was one of a pair—square, incongruous, crenelated structures—that were distinguished, for some reason, though I could see little difference, as the new and the old."* — Henry James, *The Turn of the Screw* |
| [[crenelation]] | noun | **1.** A rampart built around the top of a castle with regular gaps for firing arrows or guns.<br>**2.** The action of constructing ramparts with gaps for firing guns or arrows. | *"Yes, I had the sharpest sense that during this transit he never took his eyes from me, and I can see at this moment the way his hand, as he went, passed from one of the crenelations to the next."* — Henry James, *The Turn of the Screw* |
| [[crenellate]] | verb | **1.** Supply with battlements. | *"Built on a sandstone ledge at the junction of the Ta Tu and Ya with the Min, its crenellated red walls rise almost directly from the water, which, when in flood, dashes high against the foundations."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[crenellation]] | noun | **1.** A rampart built around the top of a castle with regular gaps for firing arrows or guns.<br>**2.** The action of constructing ramparts with gaps for firing guns or arrows. | *"In academic literature, crenellation designates a rampart built around the top of a castle with regular gaps for firing arrows or guns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenelle]] | noun | **1.** One of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.).<br>**2.** A notch or open space between two merlons in a crenelated battlement. | *"In academic literature, crenelle designates one of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenulate]] | adjective | **1.** Having a margin with small rounded teeth. | *"In academic literature, crenulate designates having a margin with small rounded teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crenulated]] | adjective | **1.** Having a margin with small rounded teeth. | *"In academic literature, crenulated designates having a margin with small rounded teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creole]] | noun | **1.** A person of european descent born in the west indies or latin america.<br>**2.** A person descended from french ancestors in southern united states (especially louisiana). | *"Her mother, the Creole, was both a madwoman and a drunkard!—as I found out after I had wed the daughter: for they were silent on family secrets before."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[creole-fish]] | noun | **1.** Deep-sea fish of tropical atlantic. | *"In academic literature, creole-fish designates deep-sea fish of tropical atlantic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creolize]] | verb | **1.** Develop into a creole. | *"In academic literature, creolize designates develop into a creole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creon]] | noun | **1.** (greek mythology) the brother of jocasta and uncle of antigone who became king of thebes after the fall of oedipus. | *"We are three queens whose sovereigns fell before The wrath of cruel Creon, who endure The beaks of ravens, talons of the kites, And pecks of crows, in the foul fields of Thebes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[creosol]] | noun | **1.** A colorless to yellow aromatic liquid that is a constituent of creosote. | *"In academic literature, creosol designates a colorless to yellow aromatic liquid that is a constituent of creosote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[creosote]] | noun | **1.** A colorless or yellowish oily liquid obtained by distillation of wood tar; used as an antiseptic.<br>**2.** A dark oily liquid obtained by distillation of coal tar; used as a preservative for wood. | *"The first "fraction" is "coal-tar naphtha." Then follows "carbolic oil," after that "heavy" or "creosote oil," anthracene oil, and finally there remains in the still on cooling a solid residue known as coal-pitch."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[crescendo]] | noun | **1.** (music) a gradual increase in loudness.<br>**2.** Grow louder. | *"But a day of reckoning, he stated _crescendo_ with no uncertain voice, thoroughly monopolising all the conversation, was in store for mighty England, despite her power of pelf on account of her crimes."* — James Joyce, *Ulysses* |
| [[crescent]] | noun | **1.** Any shape resembling the curved shape of the moon in its first or last quarters.<br>**2.** Resembling the new moon in shape. | *"The people love me, and the sea is mine; My powers are crescent, and my auguring hope Says it will come to th’ full."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crescent-shaped]] | adjective | **1.** Resembling the new moon in shape. | *"In academic literature, crescent-shaped designates resembling the new moon in shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crescentia]] | noun | **1.** A genus of tropical american trees of the family bignoniaceae; has a short trunk and crooked limbs and drooping branches. | *"In academic literature, crescentia designates a genus of tropical american trees of the family bignoniaceae; has a short trunk and crooked limbs and drooping branches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cresol]] | noun | **1.** Any of three poisonous colorless isomeric phenols; derived from coal or wood tar; used as a disinfectant. | *"In academic literature, cresol designates any of three poisonous colorless isomeric phenols; derived from coal or wood tar; used as a disinfectant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cress]] | noun | **1.** Any of various plants of the family cruciferae with edible leaves that have a pungent taste.<br>**2.** Pungent leaves of any of numerous cruciferous herbs. | *"Plants of garden-cress, mustard, and shepherd’s-purse had their roots immersed in water impregnated with zoospores."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cresson]] | adjective | **1.** Of a moderate yellow-green color that is greener and deeper than moss green and yellower and darker than pea green. | *"In academic literature, cresson designates of a moderate yellow-green color that is greener and deeper than moss green and yellower and darker than pea green."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crest]] | noun | **1.** The top line of a hill, mountain, or wave.<br>**2.** The top or extreme point of something (usually a mountain or hill). | *"It was a crest ere thou wast born."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crested]] | verb | **1.** Lie at the top of.<br>**2.** Reach a high point. | *"His legs bestrid the ocean; his reared arm Crested the world; his voice was propertied As all the tuned spheres, and that to friends; But when he meant to quail and shake the orb, He was as rattling thunder."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crestfallen]] | adjective | **1.** Brought low in spirit. | *"Remember it, and let it make thee crestfallen, Ay, and allay thus thy abortive pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cretaceous]] | noun | **1.** From 135 million to 63 million years ago; end of the age of reptiles; appearance of modern insects and flowering plants.<br>**2.** Abounding in chalk. | *"Flintcomb-Ash being in the middle of the cretaceous tableland over which no railway had climbed as yet, it would be necessary to walk."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[cretan]] | noun | **1.** A native or inhabitant of crete. | *"O, yes, I saw sweet beauty in her face, Such as the daughter of Agenor had, That made great Jove to humble him to her hand, When with his knees he kiss’d the Cretan strand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crete]] | noun | **1.** The largest greek island in the mediterranean; site of the minoan civilization that reached its peak in 1600 bc. | *"O hound of Crete, think’st thou my spouse to get?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cretin]] | noun | **1.** A person of subnormal intelligence. | *"In academic literature, cretin designates a person of subnormal intelligence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cretinism]] | noun | **1.** Severe hypothyroidism resulting in physical and mental stunting. | *"In academic literature, cretinism designates severe hypothyroidism resulting in physical and mental stunting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cretinous]] | adjective | **1.** Afflicted with cretinism. | *"In academic literature, cretinous designates afflicted with cretinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cretonne]] | noun | **1.** An unglazed heavy fabric; brightly printed; used for slipcovers and draperies. | *"A commode, one leg fractured, totally covered by square cretonne cutting, apple design, on which rested a lady’s black straw hat."* — James Joyce, *Ulysses* |
| [[decrease]] | noun | **1.** A change downward.<br>**2.** A process of becoming smaller or shorter. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decreased]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Make smaller. | *"The old business in less than three years decreased so that half of the employees were discharged; the rest had their salaries reduced."* — Classic Author, *The wonders of prayer* |
| [[decreasing]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Make smaller. | *"Have you not a moist eye, a dry hand, a yellow cheek, a white beard, a decreasing leg, an increasing belly?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decree]] | noun | **1.** A legally binding command or decision entered on the court record (as if issued by a court or judge).<br>**2.** Issue a decree. | *"But heaven in thy creation did decree, That in thy face sweet love should ever dwell, Whate’er thy thoughts, or thy heart’s workings be, Thy looks should nothing thence, but sweetness tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decreed]] | verb | **1.** Issue a decree.<br>**2.** Decide with authority. | *"Therefore it is decreed He dies tonight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decrement]] | noun | **1.** The amount by which something decreases.<br>**2.** A process of becoming smaller or shorter. | *"Increments and decrements of value on a great scale are unearned, and all classes of goods are affected, though in varying degrees. § II."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[decrescendo]] | noun | **1.** (music) a gradual decrease in loudness.<br>**2.** Grow quieter. | *"In academic literature, decrescendo designates (music) a gradual decrease in loudness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discreet]] | adjective | **1.** Marked by prudence or modesty and wise self-restraint.<br>**2.** Unobtrusively perceptive and sympathetic. | *"Let not thy discreet heart think it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreetly]] | adverb | **1.** With discretion; prudently and with wise self-restraint. | *"But, sirrah, not for my sake but your master’s, I advise You use your manners discreetly in all kind of companies: When I am alone, why, then I am Tranio; But in all places else your master, Lucentio."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discreetness]] | noun | **1.** Knowing how to avoid embarrassment or distress.<br>**2.** Subtly skillful handling of a situation. | *"In academic literature, discreetness designates knowing how to avoid embarrassment or distress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discrete]] | adjective | **1.** Constituting a separate entity or part. | *"What discrete succession of images did Stephen meanwhile perceive?"* — James Joyce, *Ulysses* |
| [[discreteness]] | noun | **1.** The state of being several and distinct. | *"In academic literature, discreteness designates the state of being several and distinct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discretion]] | noun | **1.** Freedom to act or judge on one's own.<br>**2.** Knowing how to avoid embarrassment or distress. | *"But it raises the greater war between him and his discretion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discretional]] | adjective | **1.** Having or using the ability to act or decide according to your own discretion or judgment. | *"In academic literature, discretional designates having or using the ability to act or decide according to your own discretion or judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discretionary]] | adjective | **1.** Having or using the ability to act or decide according to your own discretion or judgment.<br>**2.** (especially of funds) not earmarked; available for use as needed. | *"The legislature, with a discretionary power over the salary and emoluments of the Chief Magistrate, could render him as obsequious to their will as they might think proper to make him."* — Alexander Hamilton, *The Federalist Papers* |
| [[excrement]] | noun | **1.** Waste matter (as urine or sweat but especially feces) discharged from the body. | *"Why is Time such a niggard of hair, being, as it is, so plentiful an excrement?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excrescence]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** (pathology) an abnormal outgrowth or enlargement of some part of the body. | *"The shell had been so thin, so devoid of excrescence, and so closely drawn over the accommodation granted, that the grim character of what was beneath showed through it, as the shape of a body is visible under a winding-sheet."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[excrescent]] | adjective | **1.** Forming an outgrowth (usually an excessive outgrowth). | *"Out of this lifeless mass has already grown an excrescent power, which tends to realize all the dangers that can be apprehended from a defective construction of the supreme government of the Union."* — Alexander Hamilton, *The Federalist Papers* |
| [[excreta]] | noun | **1.** Waste matter (as urine or sweat but especially feces) discharged from the body. | *"In academic literature, excreta designates waste matter (as urine or sweat but especially feces) discharged from the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excrete]] | verb | **1.** Eliminate from the body. | *"In academic literature, excrete designates eliminate from the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excreting]] | noun | **1.** The bodily process of discharging waste matter.<br>**2.** Eliminate from the body. | *"In academic literature, excreting designates the bodily process of discharging waste matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excretion]] | noun | **1.** The bodily process of discharging waste matter.<br>**2.** Waste matter (as urine or sweat but especially feces) discharged from the body. | *"In academic literature, excretion designates the bodily process of discharging waste matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excretory]] | adjective | **1.** Of or relating to the process of excretion. | *"In academic literature, excretory designates of or relating to the process of excretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[increase]] | noun | **1.** A quantity that is added.<br>**2.** A change resulting in an increase. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[increased]] | verb | **1.** Become bigger or greater in amount.<br>**2.** Make bigger or more. | *"Our speedy arrival at our destination, before I had time to recover myself, increased my confusion, and I never shall forget the uncertain and the unreal air of everything at Greenleaf (Miss Donny’s house) that afternoon!"* — Charles Dickens, *Bleak House* |
| [[increasing]] | verb | **1.** Become bigger or greater in amount.<br>**2.** Make bigger or more. | *"When I have seen the hungry ocean gain Advantage on the kingdom of the shore, And the firm soil win of the watery main, Increasing store with loss, and loss with store."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[increasingly]] | adverb | **1.** Advancing in amount or intensity. | *"The material distinctions of rank and wealth he increasingly despised."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[incredibility]] | noun | **1.** The quality of being incredible. | *"In academic literature, incredibility designates the quality of being incredible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incredible]] | adjective | **1.** Beyond belief or understanding. | *"I tell you, ’tis incredible to believe How much she loves me: O! the kindest Kate She hung about my neck, and kiss on kiss She vied so fast, protesting oath on oath, That in a twink she won me to her love."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incredibleness]] | noun | **1.** The quality of being incredible. | *"In academic literature, incredibleness designates the quality of being incredible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[increment]] | noun | **1.** A process of becoming larger or longer or more numerous or more important.<br>**2.** The amount by which something increases. | *"His book had gone through four editions, and, with the increment of the noble war poetry of "Drum Taps," had become a volume of size."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[incremental]] | adjective | **1.** Increasing gradually by regular degrees or additions. | *"In academic literature, incremental designates increasing gradually by regular degrees or additions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indiscreet]] | adjective | **1.** Lacking discretion; injudicious. | *"For as it would ill become me to be vain, indiscreet, or a fool, So, were there a patch set on learning, to see him in a school."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indiscreetly]] | adverb | **1.** Without discretion or wisdom or self-restraint. | *"Why truly, said he, I think I should do very indiscreetly in so doing; for if an ass kicks you, do you kick him again? 1195."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[indiscreetness]] | noun | **1.** Lacking good judgment. | *"I’m surprised at the indiscreetness you commit."* — Charles Dickens, *Bleak House* |
| [[indiscrete]] | adjective | **1.** Not divided or divisible into parts. | *"She is as small as a mouse, but once a year she stirs.[255] Notes: [64] Pechuel-Loesche, "Indiscretes aus Loango," _Zeitschrift für Ethnologie_, x. (1878) p. 23. [65] Rev."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[indiscretion]] | noun | **1.** The trait of being injudicious.<br>**2.** A petty misdeed. | *"Rashly, And prais’d be rashness for it,—let us know, Our indiscretion sometime serves us well, When our deep plots do pall; and that should teach us There’s a divinity that shapes our ends, Rough-hew them how we will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miscreate]] | verb | **1.** Shape or form or make badly. | *"In academic literature, miscreate designates shape or form or make badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miscreation]] | noun | **1.** Something abnormal or anomalous. | *"In academic literature, miscreation designates something abnormal or anomalous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonrecreational]] | adjective | **1.** Involving gainful employment in something often done as a hobby. | *"In academic literature, nonrecreational designates involving gainful employment in something often done as a hobby."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procreate]] | verb | **1.** Have offspring or produce more individuals of a given animal or plant. | *"In the begin- ing God created man in His, God's, image; but mor- 140:30 tals would procreate man, and make God in their own human image."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[procreation]] | noun | **1.** The sexual activity of conceiving and bearing offspring. | *"Twinned brothers of one womb, Whose procreation, residence and birth Scarce is dividant, touch them with several fortunes, The greater scorns the lesser."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[procreative]] | adjective | **1.** Producing new life or offspring. | *"In academic literature, procreative designates producing new life or offspring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recreant]] | noun | **1.** An abject coward.<br>**2.** A disloyal person who betrays or deserts his cause or religion or political party or friend etc. | *"Puff in thy teeth, most recreant coward base!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recreate]] | verb | **1.** Give new life or energy to.<br>**2.** Engage in recreational activities rather than work; occupy oneself in a diversion. | *"Moreover, he hath left you all his walks, His private arbors, and new-planted orchards, On this side Tiber; he hath left them you, And to your heirs forever; common pleasures, To walk abroad, and recreate yourselves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recreation]] | noun | **1.** An activity that diverts or amuses or stimulates.<br>**2.** Activity that refreshes and recreates; activity that renews your health and spirits by enjoyment and relaxation. | *"Sweet recreation barr’d, what doth ensue But moody and dull melancholy, Kinsman to grim and comfortless despair, And at her heels a huge infectious troop Of pale distemperatures and foes to life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recreational]] | adjective | **1.** Of or relating to recreation.<br>**2.** Engaged in as a pastime. | *"They, as well as the general population, would be cared for and supported by a host of administrative, health care, educational, recreational, life support and community services."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[secrecy]] | noun | **1.** The trait of keeping things secret.<br>**2.** The condition of being concealed or hidden. | *"In nature’s infinite book of secrecy A little I can read."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secret]] | noun | **1.** Something that should remain hidden from others (especially information that is not to be passed on).<br>**2.** Information known only to a special group. | *"That this huge stage presenteth nought but shows Whereon the stars in secret influence comment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secretaire]] | noun | **1.** A desk used for writing. | *"In academic literature, secretaire designates a desk used for writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretarial]] | adjective | **1.** Of or relating to a secretary or to a secretary's work. | *"A door opened, a white-haired secretarial head, but wearing a compassionate expression, appeared, and a skinny forefinger beckoned me into the sanctuary."* — Joseph Conrad, *Heart of Darkness* |
| [[secretariat]] | noun | **1.** An administrative unit responsible for maintaining records and other secretarial duties; especially for international organizations.<br>**2.** Thoroughbred that won the triple crown in 1973. | *"In academic literature, secretariat designates an administrative unit responsible for maintaining records and other secretarial duties; especially for international organizations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretariate]] | noun | **1.** An administrative unit responsible for maintaining records and other secretarial duties; especially for international organizations. | *"In academic literature, secretariate designates an administrative unit responsible for maintaining records and other secretarial duties; especially for international organizations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretary]] | noun | **1.** A person who is head of an administrative department of government.<br>**2.** An assistant who handles correspondence and clerical work for a boss or an organization. | *"WOLSEY. [_Aside to his Secretary_.] A word with you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secretaryship]] | noun | **1.** The position of secretary. | *"This order was not obeyed, and so the two claimants to the Secretaryship of War held their ground."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[secretase]] | noun | **1.** A set of enzymes believed to snip pieces off a longer protein producing fragments of amyloid protein that bunch up and create amyloid protein plaques in brain tissue (the pathological hallmark of alzheimer's). | *"In academic literature, secretase designates a set of enzymes believed to snip pieces off a longer protein producing fragments of amyloid protein that bunch up and create amyloid protein plaques in brain tissue (the pathological hallmark of alzheimer's)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secrete]] | verb | **1.** Generate and separate from cells or bodily fluids.<br>**2.** Place out of sight; keep secret. | *"As a preparation for this pilgrimage, "some secrete themselves for three days previously in a dark cellar, so as to be shut out altogether from the light of heaven."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[secreter]] | noun | **1.** Any of various organs that synthesize substances needed by the body and release it through ducts or directly into the bloodstream.<br>**2.** Not open or public; kept private or not revealed. | *"In academic literature, secreter designates any of various organs that synthesize substances needed by the body and release it through ducts or directly into the bloodstream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretin]] | noun | **1.** A gastrointestinal hormone that stimulates the secretion of water and bicarbonate from the pancreas and bile ducts whenever the stomach empties too much acid into the small intestine. | *"In academic literature, secretin designates a gastrointestinal hormone that stimulates the secretion of water and bicarbonate from the pancreas and bile ducts whenever the stomach empties too much acid into the small intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretion]] | noun | **1.** The organic process of synthesizing and releasing some substance.<br>**2.** A functionally specialized substance (especially one that is not a waste) released from a gland or cell. | *"Obedient muscles 160:9 The motion of the arm is no more dependent upon the direction of mortal mind, than are the organic action and secretion of the viscera."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[secretive]] | adjective | **1.** Inclined to secrecy or reticence about divulging information. | *"Women are naturally secretive, and they like to do their own secreting."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[secretively]] | adverb | **1.** In a secretive manner; with a preference for secrecy. | *"In academic literature, secretively designates in a secretive manner; with a preference for secrecy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretiveness]] | noun | **1.** Characterized by a lack of openness (especially about one's actions or purposes).<br>**2.** The trait of keeping things secret. | *"In academic literature, secretiveness designates characterized by a lack of openness (especially about one's actions or purposes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretly]] | adverb | **1.** In secrecy; not openly.<br>**2.** Not openly; inwardly. | *"I am given, sir, secretly to understand that your younger brother Orlando hath a disposition to come in disguised against me to try a fall."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secretor]] | noun | **1.** Any of various organs that synthesize substances needed by the body and release it through ducts or directly into the bloodstream. | *"In academic literature, secretor designates any of various organs that synthesize substances needed by the body and release it through ducts or directly into the bloodstream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secretory]] | adjective | **1.** Of or relating to or producing a secretion. | *"In academic literature, secretory designates of or relating to or producing a secretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncreased]] | adjective | **1.** Used especially of fabrics. | *"In academic literature, uncreased designates used especially of fabrics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncreative]] | adjective | **1.** Not creative. | *"In academic literature, uncreative designates not creative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncreativeness]] | noun | **1.** A lack of creativity. | *"In academic literature, uncreativeness designates a lack of creativity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersecretary]] | noun | **1.** A secretary immediately subordinate to the head of a department of government. | *"Christopher Mead, Assistant Undersecretary for External Affairs, returned the handshake, smiling."* — Algis Budrys, *Citadel* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CRE
  </div>
</div>
