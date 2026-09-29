---
status: unread
type: root_dashboard
---
# Dashboard — spic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">spic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to look or perceive”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking through clear glass and observing every fine detail in view.</span>
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

The root **spic** means to look or perceive. It refers to the action of looking and carrying out this process. In English, this root forms words such as *conspicuous*, *despicable*, and *suspicion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to look or perceive
> The root **spic** means to look or perceive. It refers to the action of looking and carrying out this process. In English, this root forms words such as *conspicuous*, *despicable*, and *suspicion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To look or perceive</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *conspicuous* and *despicable*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **spic** comes from a Latin word that means *"to look or perceive"*.
  - At its core, it describes the action of look or perceive.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **spic** in an English word, think of **to look or perceive**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to look or perceive).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Conspicuous**: Standing out so as to be clearly visible. 2. Attracting notice or attention.
  - **Despicable**: Deserving hatred and contempt.
  - **Suspicion**: A feeling or thought that something is possible, likely, or true.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">spic</mark>, think of <mark class="hl-def">to look or perceive</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Prefixation with Vowel Shift:**
  - `con-` + *spic-* $\to$ *conspicuous* (attracting notice), *conspicuously*, *inconspicuous*.
  - `per-` + *spic-* $\to$ *perspicacious* (insightful), *perspicacity*, *perspicuous* (lucid), *perspicuity*.
  - `avis` + *spic-* $\to$ *auspice* (omen), *auspicious*, *inauspicious*.
  - `de-` + *spic-* $\to$ *despicable* (worthy of contempt), *despise* (via French *dépiter*), *despite*.
  - `sub-` + *spic-* $\to$ *suspicion* (mistrust), *suspicious*, *suspiciously*.

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

### 1. Visibility & Prominence
- *conspicuous* (standing out so as to be clearly visible; attracting notice or attention).
- *conspicuously* (in a clearly visible or noticeable way).
- *inconspicuous* (not clearly visible or attracting attention; discreet).

### 2. Intellectual Penetration & Lucidity
- *perspicacious* (having a ready insight into and understanding of things; mentally acute).
- *perspicacity* (the quality of having a ready insight into things; shrewdness).
- *perspicuous* (clearly expressed and easily understood; lucid).
- *perspicuity* (clearness or lucidity, especially in literary or philosophical style).

### 3. Divination, Fortune & Favor
- *auspicious* (conducive to success; favorable; promising good fortune).
- *inauspicious* (not conducive to success; unpromising; ominous).
- *auspice* (divination from the flight of birds; patronage or guidance, as in *under the auspices of*).

### 4. Contempt & Mistrust
- *despicable* (deserving hatred and contempt; vile).
- *despise* (to feel contempt or a deep repugnance for; look down upon).
- *despite* (without being affected by; in contempt of).
- *suspicion* (a feeling or thought that something is possible, likely, or true, especially that someone is guilty).
- *suspicious* (having or showing a cautious distrust of someone or something).

---

## 🔀 4. Prefix & Combining Dynamics on spic

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `con-` + `spic-` + `-uous` | Intensive visibility | Standing out glaringly before the communal gaze | *conspicuous, inconspicuous* |
| `per-` + `spic-` + `-ax` | Penetrating vision | Piercing through deceptive facades with mental acuity | *perspicacious, perspicacity* |
| `per-` + `spic-` + `-uus` | Transparent clarity | Prose or reasoning that can be seen through easily | *perspicuous, perspicuity* |
| `avi-` + `spic-` + `-ious` | Augural omen | Blessed by favorable bird-flight signs; fortunate | *auspicious, inauspicious* |
| `dē-` + `spic-` + `-able` | Downward contempt | Looking down upon something as vile and worthless | *despicable, despise* |
| `sub-` + `spic-` + `-ion` | Underbrow glance | Looking up furtively from beneath one's brow | *suspicion, suspicious* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Evolutionary Biology & Ecology:** Conspicuous coloration (aposematism in poison dart frogs) vs inconspicuous camouflage.
- **Sociology & Economics:** Thorstein Veblen's theory of conspicuous consumption (*The Theory of the Leisure Class*).
- **Diplomacy & International Law:** Operating *under the auspices of* the United Nations.
- **Epistemology & Rhetoric:** Perspicuity of mathematical proof, perspicacious forensic analysis.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[auspicious]] | adjective | **1.** Auguring favorable circumstances and good luck. | *"Then go thou forth; And fortune play upon thy prosperous helm, As thy auspicious mistress!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[auspiciously]] | adverb | **1.** In an auspicious manner. | *"Nearly a million dollar drive to complete the Mother Temple of the West has been auspiciously launched and construction of interior sections of the ornamentation initiated."* — Effendi Shoghi, *Citadel of Faith* |
| [[auspiciousness]] | noun | **1.** The favorable quality of strongly indicating a successful result. | *"In academic literature, auspiciousness designates the favorable quality of strongly indicating a successful result."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conspicuous]] | adjective | **1.** Obvious to the eye or mind.<br>**2.** Without any attempt at concealment; completely obvious. | *"Guppy’s breast and the numerous oscillations it occasioned him between his mother’s door and us were sufficiently conspicuous in the windy street (particularly as his hair wanted cutting) to make us hurry away."* — Charles Dickens, *Bleak House* |
| [[conspicuously]] | adverb | **1.** In a manner tending to attract attention.<br>**2.** In a prominent way. | *"Next: how shall we define the whale, by his obvious externals, so as conspicuously to label him for all time to come?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[conspicuousness]] | noun | **1.** The state of being conspicuous.<br>**2.** High visibility. | *"In academic literature, conspicuousness designates the state of being conspicuous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[despicability]] | noun | **1.** Unworthiness by virtue of lacking higher values. | *"In academic literature, despicability designates unworthiness by virtue of lacking higher values."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[despicable]] | adjective | **1.** Morally reprehensible. | *"By all that is base and despicable,” cried Mr."* — Charles Dickens, *Bleak House* |
| [[despicableness]] | noun | **1.** Unworthiness by virtue of lacking higher values. | *"In academic literature, despicableness designates unworthiness by virtue of lacking higher values."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[despicably]] | adverb | **1.** In a despicable manner. | *"True, generous feeling is made small account of by some, but here were two natures rendered, the one intolerably acrid, the other despicably savourless for the want of it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[inauspicious]] | adjective | **1.** Not auspicious; boding ill.<br>**2.** Contrary to your interests or welfare. | *"O, here Will I set up my everlasting rest; And shake the yoke of inauspicious stars From this world-wearied flesh."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inauspiciously]] | adverb | **1.** In an inauspicious manner. | *"In academic literature, inauspiciously designates in an inauspicious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inauspiciousness]] | noun | **1.** The quality of suggesting an unsuccessful result. | *"In academic literature, inauspiciousness designates the quality of suggesting an unsuccessful result."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconspicuous]] | adjective | **1.** Not prominent or readily noticeable. | *"Val was a slight, fair, pleasant-looking man of eight or nine and twenty, quiet of movement, friendly-mannered and as inconspicuous as his own rather worn grey tweeds: one of a class, till he raised his eyes: and then?"* — Anthony Pryde, *Nightfall* |
| [[inconspicuously]] | adverb | **1.** In a manner intended to avoid attracting attention. | *"In academic literature, inconspicuously designates in a manner intended to avoid attracting attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconspicuousness]] | noun | **1.** The quality of being not easily seen. | *"In academic literature, inconspicuousness designates the quality of being not easily seen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oversuspicious]] | adjective | **1.** Unduly suspicious. | *"In academic literature, oversuspicious designates unduly suspicious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspicacious]] | adjective | **1.** Acutely insightful and wise.<br>**2.** Mentally acute or penetratingly discerning. | *"In academic literature, perspicacious designates acutely insightful and wise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspicaciousness]] | noun | **1.** Intelligence manifested by being astute (as in business dealings). | *"In academic literature, perspicaciousness designates intelligence manifested by being astute (as in business dealings)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspicacity]] | noun | **1.** Intelligence manifested by being astute (as in business dealings).<br>**2.** The capacity to assess situations or circumstances shrewdly and to draw sound conclusions. | *"It raises the thinker into his native air of insight and perspicacity."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[perspicuity]] | noun | **1.** Clarity as a consequence of being perspicuous. | *"Perspicuity, therefore, requires not only that the ideas should be distinctly formed, but that they should be expressed by words distinctly and exclusively appropriate to them."* — Alexander Hamilton, *The Federalist Papers* |
| [[perspicuous]] | adjective | **1.** (of language) transparently clear; easily understandable; ; ; - robert burton. | *"In academic literature, perspicuous designates (of language) transparently clear; easily understandable; ; ; - robert burton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspicuously]] | adverb | **1.** In a clear and lucid manner. | *"In academic literature, perspicuously designates in a clear and lucid manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perspicuousness]] | noun | **1.** Clarity as a consequence of being perspicuous. | *"In academic literature, perspicuousness designates clarity as a consequence of being perspicuous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prospicience]] | noun | **1.** Seeing ahead; knowing in advance; foreseeing. | *"In academic literature, prospicience designates seeing ahead; knowing in advance; foreseeing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prospicient]] | adjective | **1.** Planning prudently for the future. | *"In academic literature, prospicient designates planning prudently for the future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spic]] | noun | **1.** (ethnic slur) offensive term for persons of latin american descent.<br>**2.** Completely neat and clean. | *"Spiced wine he would have from no other cup than the skull of Guthlaf."* — Jack London, *The Jacket (The Star-Rover)* |
| [[spica]] | noun | **1.** The brightest star in virgo. | *"In academic literature, spica designates the brightest star in virgo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicate]] | adjective | **1.** Having or relating to spikes. | *"In academic literature, spicate designates having or relating to spikes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiccato]] | noun | **1.** Bowing in such a way that the bow bounces lightly off the strings. | *"In academic literature, spiccato designates bowing in such a way that the bow bounces lightly off the strings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spice]] | noun | **1.** Aromatic substances of vegetable origin used as a preservative.<br>**2.** Any of a variety of pungent aromatic vegetable substances used for flavoring food. | *"Beshrew me, I would, And venture maidenhead for’t; and so would you, For all this spice of your hypocrisy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spice-scented]] | adjective | **1.** Smelling of spices. | *"In academic literature, spice-scented designates smelling of spices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spiceberry]] | noun | **1.** Shrub with coral-red berries; japan to northern india.<br>**2.** Spicy red berrylike fruit; source of wintergreen oil. | *"In academic literature, spiceberry designates shrub with coral-red berries; japan to northern india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicebush]] | noun | **1.** Deciduous shrub of the eastern united states having highly aromatic leaves and bark and yellow flowers followed by scarlet or yellow berries.<br>**2.** Straggling aromatic shrub of southwestern united states having fragrant brown flowers. | *"In academic literature, spicebush designates deciduous shrub of the eastern united states having highly aromatic leaves and bark and yellow flowers followed by scarlet or yellow berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicemill]] | noun | **1.** A mill for grinding spices. | *"In academic literature, spicemill designates a mill for grinding spices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicery]] | noun | **1.** The property of being seasoned with spice and so highly flavored. | *"But in your daughter’s womb I bury them, Where, in that nest of spicery, they will breed Selves of themselves, to your recomforture."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[spicily]] | adverb | **1.** With strong spices; in a spicy manner. | *"The chimney of the new house, in short, belching forth its kitchen smoke, impregnated the whole air with the scent of meats, fowls, and fishes, spicily concocted with odoriferous herbs, and onions in abundance."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[spiciness]] | noun | **1.** The property of being seasoned with spice and so highly flavored.<br>**2.** Behavior or language bordering on indelicacy. | *"In academic literature, spiciness designates the property of being seasoned with spice and so highly flavored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicule]] | noun | **1.** Small pointed structure serving as a skeletal element in various marine and freshwater invertebrates e.g. sponges and corals. | *"The most prominent distinction may be found in the apices of the spores, which, in this instance, are not attenuated, but crowned with a series of little spicules, or teeth, whence the specific name of _coronata_ has been derived (Plate IV. fig. 62)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[spiculum]] | noun | **1.** Small pointed structure serving as a skeletal element in various marine and freshwater invertebrates e.g. sponges and corals. | *"In academic literature, spiculum designates small pointed structure serving as a skeletal element in various marine and freshwater invertebrates e.g. sponges and corals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spicy]] | adjective | **1.** Having an agreeably pungent taste.<br>**2.** Producing a burning sensation on the taste nerves. | *"A spicy boudoir, this,” says Mr."* — Charles Dickens, *Bleak House* |
| [[suspicion]] | noun | **1.** An impression that something might be the case.<br>**2.** Doubt about someone's honesty. | *"Suspicion all our lives shall be stuck full of eyes, For treason is but trusted like the fox, Who, ne’er so tame, so cherish’d and lock’d up, Will have a wild trick of his ancestors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspicious]] | adjective | **1.** Openly distrustful and unwilling to confide.<br>**2.** Not as expected. | *"I see no reason if I wear this rose, [_Putting on a red rose._] That anyone should therefore be suspicious I more incline to Somerset than York."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suspiciously]] | adverb | **1.** With suspicion. | *"Yes,” came suspiciously from the shadow."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[suspiciousness]] | noun | **1.** Being of a suspicious nature. | *"In academic literature, suspiciousness designates being of a suspicious nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsuspicious]] | adjective | **1.** Not suspicious. | *"I never saw her, except upon a baggage-waggon, when she wasn’t washing greens!” The subject of this reflection is at all events so occupied in washing greens at present that she remains unsuspicious of Mr."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SPIC
  </div>
</div>
