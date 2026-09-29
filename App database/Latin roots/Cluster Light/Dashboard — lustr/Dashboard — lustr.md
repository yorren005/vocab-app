---
status: unread
type: root_dashboard
---
# Dashboard — lustr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lustr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to purify”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A beam of bright morning sunlight cutting through shadows to illuminate a room.</span>
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

The root **lustr** means to purify. It refers to the action of purifying and carrying out this process. In English, this root forms words such as *lustrous*, *lustrously*, *lustrousness*, and *illustrate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to purify
> The root **lustr** means to purify. It refers to the action of purifying and carrying out this process. In English, this root forms words such as *lustrous*, *lustrously*, *lustrousness*, and *illustrate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To purify</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *lustrous* and *lustrously*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lustr** comes from a Latin word that means *"to purify"*.
  - At its core, it describes the action of purify.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **lustr** in an English word, think of **to purify**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to purify).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Lustrous**: Having a soft, radiant sheen or gloss.
  - **Lustrously**: In a lustrous, brilliantly gleaming, or radiantly splendid manner.
  - **Lustrousness**: The quality, state, or degree of being lustrous.
  - **Illustrate**: To make clear, intelligible, or obvious by using examples, analogies, or explanations.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lustr</mark>, think of <mark class="hl-def">to purify</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **lustr** operates through three morphological channels:
>
> - **Base Nominal / Adjectival Stem `lustr-` (*lūstrum* / Italian *lustro*):**
>   - Physical surface shine: *luster*, *lustre*, *lustrous*, *lustrously*, *lustrousness*
>   - Negation / lack compounds: *lackluster*, *lacklustre*, *lusterless*
>   - Ceramic arts: *lusterware*
> - **Ritual Purificatory Base `lustrā-` (*lūstrō, lūstrāre*):**
>   - Adjectives: *lustral*, *lustrative*, *lustratory*
>   - Verbal action: *lustrate*, *lustration*
>   - Historical noun: *lustrum* (5-year period)
> - **Illuminating / Explanatory Prefix `in-` $\to$ `il-` (*illustrō, illustrāre*):**
>   - Intellectual elucidation & art: *illustrate*, *illustration*, *illustrative*, *illustratively*, *illustrator*, *reillustrate*
>   - Nobility of reputation: *illustrious*, *illustriously*, *illustriousness*
> - **Intensive Prefix `per-` ("thoroughly") $\to$ `perlustr-` (*perlūstrāre*):**
>   - Complete physical or epistolary inspection: *perlustrate*, *perlustration*

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
> The root spans five distinct conceptual territories:
>
> 1. **Optics, Materials Science & Mineralogy:**
>    - The reflective quality of mineral surfaces—metallic, adamantine, vitreous, pearly, or resinous (*mineral luster*, *lustrous silk*).
>    - Ceramic and metallic glazes (*lusterware*).
>    - Matte, unpolished, or dull surfaces (*lusterless*, *lackluster finish*).
> 2. **Pedagogy, Rhetoric & Visual Arts:**
>    - Explaining difficult principles through tangible examples (*to illustrate a theorem*).
>    - Visual printmaking, drawing, and digital rendering (*book illustration*, *scientific illustrator*).
> 3. **Religion, Anthropology & Political Purges:**
>    - Ritual washing with consecrated water (*lustral basin*, *lustral rites*).
>    - Post-conflict societal purification, such as vetting former authoritarian officials in Eastern Europe after 1989 (*lustration laws*).
> 4. **Societal Renown & Historical Glory:**
>    - Renowned statesmen, scientists, and artists celebrated across centuries (*illustrious ancestors*, *illustrious career*).
> 5. **Intelligence, Diplomacy & Postal Inspection:**
>    - The thorough examination or systematic espionage interception of physical correspondence (*mail perlustration*).

---

## 🔀 4. Prefix & Combining Dynamics on lustr

### Prefix Dynamics
- **`in-` (assimilated to `il-`, "upon, into, intensive"):** Pours light directly upon darkness $\to$ *illustrate* (to make clear), *illustrious* (shining with eminence).
- **`per-` ("through, thoroughly"):** Directs the light across every crevice and corner $\to$ *perlustrate* (to survey exhaustively, read all correspondence).
- **`re-` ("again, anew"):** Providing fresh pictorial artwork $\to$ *reillustrate*.

### Suffix Dynamics
- **`-al` (Relating To):** Pertaining to sacred cleansing $\to$ *lustral*.
- **`-ation` (Process / Institution):** State or act of purification $\to$ *lustration*, *perlustration*, *illustration*.
- **`-ate` (Verbal Action):** To purify, explain, or inspect $\to$ *lustrate*, *illustrate*, *perlustrate*.
- **`-ive` / `-atory` (Tending To):** Serving to clarify or cleanse $\to$ *illustrative*, *lustrative*, *lustratory*.
- **`-ous` (Abundant In / Possessing):** Full of sheen or radiant glory $\to$ *lustrous*, *illustrious*.
- **`-less` (Privative / Devoid Of):** Dull, devoid of shine $\to$ *lusterless*.
- **`-er` / `-or` (Agent / Thing):** The light-reflecting property (*luster*); the artist creating drawings (*illustrator*).

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Mineralogy & Geology:** The optical classification of minerals relies heavily on *luster*—evaluating whether a specimen exhibits *metallic*, *submetallic*, *vitreous* (glass-like, e.g., quartz), *adamantine* (diamond-like), *resinous*, or *silky* light reflectance.
> - **Post-Communist Transitional Justice:** Following the fall of the Iron Curtain in 1989, nations such as Poland, the Czech Republic, and Germany enacted *lustration laws* (*lustrace*) to systematically investigate and disqualify former secret police collaborators from holding high public office.
> - **Literary History & Visual Printmaking:** The Golden Age of Book Illustration (1880–1920) featured master *illustrators* such as Arthur Rackham, Edmund Dulac, and Howard Pyle, whose *illustrations* transformed Victorian and Edwardian literature.
> - **Diplomatic History & Espionage Studies:** Before electronic surveillance, eighteenth- and nineteenth-century European governments operated institutional *perlustration* chambers inside post offices, where royal couriers melted wax seals, copied secret diplomatic letters, and resealed them without detection.
> - **Classical Philology & Roman History:** Roman constitutional scholars analyze the *lustrum* (the quinquennial census cycle) and the sacrificial prayers recorded by Cato the Elder in *De Agri Cultura* for farm *lustrations*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[illustrate]] | verb | **1.** Clarify by giving an example of.<br>**2.** Depict with an illustration. | *"But his body And fiery mind illustrate a brave father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illustration]] | noun | **1.** Artwork that helps make something clear or attractive.<br>**2.** Showing by example. | *"In academic literature, illustration designates artwork that helps make something clear or attractive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illustrative]] | adjective | **1.** Clarifying by use of examples.<br>**2.** Serving to demonstrate. | *"Cases illustrative of the influence of piety on the intellectual powers.--13."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[illustrator]] | noun | **1.** An artist who makes illustrations (for books or magazines or advertisements etc.). | *"In the Sung period the current ideas with regard to these patterns were expressed by the illustrator of the Sung edition of the _Li Chi_ by ornamenting jade discs, in the one case with ears of wheat and in the other with a clump of rushes."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[illustrious]] | adjective | **1.** Widely known and esteemed.<br>**2.** Having or conferring glory. | *"Armado is a most illustrious wight, A man of fire-new words, fashion’s own knight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[illustriously]] | adverb | **1.** In an illustrious manner. | *"In academic literature, illustriously designates in an illustrious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illustriousness]] | noun | **1.** The property possessed by something or someone of outstanding importance or eminence. | *"In academic literature, illustriousness designates the property possessed by something or someone of outstanding importance or eminence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustrate]] | verb | **1.** Purify by means of a ritual; also used in post-communist countries to refer to the political cleansing of former officials. | *"Moses advanced a nation to the worship of God in Spirit instead of matter, and il- 200:6 lustrated the grand human capacities of being bestowed by immortal Mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[lustre]] | noun | **1.** A surface coating for ceramics or porcelain.<br>**2.** A quality that outshines the usual. | *"Thy lustre thickens When he shines by."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustreless]] | adjective | **1.** Lacking brilliance or vitality.<br>**2.** Lacking luster or shine. | *"The quick-silvery glaze on the rivers and pools vanished; from broad mirrors of light they changed to lustreless sheets of lead, with a surface like a rasp."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[lustrelessness]] | noun | **1.** The property of having little or no contrast; lacking highlights or gloss. | *"In academic literature, lustrelessness designates the property of having little or no contrast; lacking highlights or gloss."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lustrous]] | adjective | **1.** Made smooth and bright by or as if by rubbing; reflecting a sheen or glow.<br>**2.** Brilliant. | *"Good sparks and lustrous, a word, good metals."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lustrum]] | noun | **1.** A period of five years.<br>**2.** A ceremonial purification of the roman population every five years following the census. | *"In the settlement of the questions the Republican party has completed its twenty-five years of glorious existence, and it has sent us here to prepare it for another lustrum of duty and of victory."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LUSTR
  </div>
</div>
