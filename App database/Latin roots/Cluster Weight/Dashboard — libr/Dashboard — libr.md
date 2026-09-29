---
status: unread
type: root_dashboard
---
# Dashboard — libr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">libr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“book or balance”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a dense iron dumbbell and feeling its heavy downward pull.</span>
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

The root **libr** means book or balance. It refers to a written book, manuscript, or a balancing scale. In English, this root forms words such as *libra*, *deliberate*, *deliberation*, and *deliberative*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: book or balance
> The root **libr** means book or balance. It refers to a written book, manuscript, or a balancing scale. In English, this root forms words such as *libra*, *deliberate*, *deliberation*, and *deliberative*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Book or balance</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a dense iron dumbbell and feeling its heavy downward pull.</mark>
> - **Everyday Connection**: Think of familiar words like *libra* and *deliberate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **libr** comes from a Latin word that means *"book or balance"*.
  - At its core, it describes book or balance.

- **The Big Picture Idea**:
  - Picture lifting a dense iron dumbbell and feeling its heavy downward pull.
  - Whenever you see **libr** in an English word, think of **weight, heaviness, and pressure**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of book or balance.
  - **Mental & Social**: How people experience, organize, or communicate about book or balance.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Libra**: The seventh sign of the zodiac, symbolized by the scales.
  - **Deliberate**: Done consciously and intentionally.
  - **Deliberation**: Long and careful consideration or discussion.
  - **Deliberative**: Relating to or intended for consideration or discussion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">libr</mark>, think of <mark class="hl-def">weight, heaviness, and pressure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `libr-` (< Latin *lībra* "scales"): Base weight and balance root.
  - `libr-` (< Latin *liber* "book"): Archival/literary root.
- **Prefix Machinery**:
  - `de-` ("thoroughly"): *deliberate, deliberation, deliberative*.
  - `equi-` ("equal"): *equilibrium, equilibrate*.
- **Suffixal Formations**:
  - `-ate`: *deliberate, equilibrate*.
  - `-ation`: *deliberation, libration*.
  - `-ary`: *library*.
  - `-ian`: *librarian*.

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
                      ┌── Scales, Currency & Astronomy: libra, libration
                      │
   [libr] ────────────┼── Cognitive & Institutional Balance: deliberate, deliberation, deliberative
 (Scales / Book)      │
                      ├── Physical Horizontality & Equal Weight: equilibrium, equilibrate, level
                      │
                      └── The Sanctuary of the Book: library, librarian
```

---

## 🔀 4. Prefix & Combining Dynamics on libr
- **`de-` + `libr-` + `-ate`**: *deliberate* — to weigh options carefully before acting.
- **`equi-` + `libr-` + `-ium`**: *equilibrium* — a state of balance between opposing forces.
- **`libr-` + `-ary`**: *library* — a collection or repository of books and manuscripts.
- **`libr-` + `-ation`**: *libration* — an apparent oscillation or balancing motion of the moon.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Constitutional Law**: Legislative *deliberation*; jury *deliberations*.
- **Astrology & Astrophysics**: Constellation *Libra*; lunar *libration* (allowing 59% of the moon's surface to be viewed from Earth).
- **Civil Engineering & Surveying**: Spirit *levels*; laser leveling; hydraulic *equilibrium*.
- **Information Science & Humanities**: Public and university *libraries*; archival *librarianship*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[disequilibrium]] | noun | **1.** Loss of equilibrium attributable to an unstable situation in which some forces outweigh others. | *"In academic literature, disequilibrium designates loss of equilibrium attributable to an unstable situation in which some forces outweigh others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibrate]] | verb | **1.** Bring to a chemical stasis or equilibrium.<br>**2.** Bring into balance or equilibrium. | *"In academic literature, equilibrate designates bring to a chemical stasis or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibration]] | noun | **1.** Stabilization by bringing into equilibrium. | *"In academic literature, equilibration designates stabilization by bringing into equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibrise]] | verb | **1.** Bring into balance or equilibrium. | *"In academic literature, equilibrise designates bring into balance or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibrium]] | noun | **1.** A stable situation in which forces cancel one another.<br>**2.** A chemical reaction and its reverse proceed at equal rates. | *"His equilibrium disturbed, he was in extremity at once."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[equilibrize]] | verb | **1.** Bring into balance or equilibrium. | *"In academic literature, equilibrize designates bring into balance or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libra]] | noun | **1.** (astrology) a person who is born while the sun is in libra.<br>**2.** A small faint zodiacal constellation in the southern hemisphere; between virgo and scorpius. | *"Auld cantie Coil may count the day, As annual it returns, The third of Libra’s equal sway, That gave another Burns, With future rhymes, an’ other times, To emulate his sire: To sing auld Coil in nobler style With more poetic fire."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[librarian]] | noun | **1.** A professional person trained in library science and engaged in library services. | *"Sladdery the librarian, and indeed the great farmer of gorgeous sheep, admits this very day, “Why yes, sir, there certainly ARE reports concerning Lady Dedlock, very current indeed among my high connexion, sir."* — Charles Dickens, *Bleak House* |
| [[librarianship]] | noun | **1.** The position of librarian. | *"In academic literature, librarianship designates the position of librarian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[library]] | noun | **1.** A room where books are kept.<br>**2.** A collection of literary documents or records kept for reference or borrowing. | *"Come and take choice of all my library, And so beguile thy sorrow, till the heavens Reveal the damned contriver of this deed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[librate]] | verb | **1.** Determine the weight of.<br>**2.** Vibrate before coming to a total rest. | *"In academic literature, librate designates determine the weight of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libration]] | noun | **1.** (astronomy) a real or apparent slow oscillation of a moon or satellite. | *"In academic literature, libration designates (astronomy) a real or apparent slow oscillation of a moon or satellite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[librettist]] | noun | **1.** Author of words to be set to music in an opera or operetta. | *"In academic literature, librettist designates author of words to be set to music in an opera or operetta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libretto]] | noun | **1.** The words of an opera or musical play. | *"In academic literature, libretto designates the words of an opera or musical play."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libreville]] | noun | **1.** The capital of gabon. | *"In academic literature, libreville designates the capital of gabon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[libritabs]] | noun | **1.** A tranquilizer (trade names librium and libritabs) used in the treatment of alcoholism. | *"In academic literature, libritabs designates a tranquilizer (trade names librium and libritabs) used in the treatment of alcoholism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[librium]] | noun | **1.** A tranquilizer (trade names librium and libritabs) used in the treatment of alcoholism. | *"In academic literature, librium designates a tranquilizer (trade names librium and libritabs) used in the treatment of alcoholism."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Weight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LIBR
  </div>
</div>
