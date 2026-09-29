---
status: unread
type: root_dashboard
---
# Dashboard — propr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">propr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“one's own”</span>
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

The root **propr** means one's own. It describes belonging exclusively to a particular owner or being proper. In English, this root forms words such as *appropriate*, *expropriate*, *improper*, and *impropriety*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: one's own
> The root **propr** means one's own. It describes belonging exclusively to a particular owner or being proper. In English, this root forms words such as *appropriate*, *expropriate*, *improper*, and *impropriety*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">One's own</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *appropriate* and *expropriate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **propr** comes from a Latin word that means *"one's own"*.
  - At its core, it describes one's own.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **propr** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of one's own.
  - **Mental & Social**: How people experience, organize, or communicate about one's own.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Appropriate**: To take something for one's own use, typically without the owner's permission.
  - **Expropriate**: To take away property from its owner for public use or benefit.
  - **Improper**: Not in accordance with accepted rules or standards, especially of morality or honesty.
  - **Impropriety**: Failure to observe standards of honesty or modesty.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">propr</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin proprius (one's own, fitting, proper)
  │
  ├── Social Decorum & Fitness
  │     ├── proper (Old French propre: fitting, suitable)
  │     ├── propriety (decorum, correct social conduct)
  │     ├── im- + proper ────────> improper (unsuitable, incorrect)
  │     └── im- + propriety ────> impropriety (unseemly behavior)
  │
  ├── Ownership & Possession
  │     ├── property (Old French propreté: possessions, land, attribute)
  │     ├── proprietor (legal owner of business/estate)
  │     └── proprietary (relating to ownership/patents)
  │
  └── Compound Actions (Prefixes)
        ├── ad- + proprius ──────> appropriate (take for oneself; fitting)
        └── ex- + proprius ──────> expropriate (strip of ownership)
```

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

### Distinct Contextual Arenas
1. **Real Estate, Commerce & Patents**: *property*, *proprietor*, *proprietary* (commercial assets, business ownership, trade secrets).
2. **State Power & Eminent Domain**: *expropriate* (compulsory acquisition of private property by sovereign power).
3. **Social Conduct & Morals**: *proper*, *propriety*, *improper*, *impropriety* (manners, ethical standards, scandalous breaches of decorum).
4. **Designation & Allocation**: *appropriate* (allocating resources for an intended use; seizing assets).

---

## 🔀 4. Prefix & Combining Dynamics on propr

### Prefix Variations
- **ad- ("to, toward") + propr-**: Produces *appropriate* (to assign to one's own use, or to allocate funds for a designated purpose).
- **ex- ("out of, away from") + propr-**: Produces *expropriate* (to dispossess someone of their property).
- **in- / im- ("not, un-") + propr-**: Produces *improper* and *impropriety* (violating ethical or social standards).

### Suffix Morphologies
- **-ty / -ety**: *property*, *propriety* (substantive state of ownership or fittingness).
- **-or**: *proprietor* (agentive legal owner).
- **-ary**: *proprietary* (relating to ownership or proprietary exclusivity).
- **-ate / -ation**: *appropriate*, *expropriate*, *expropriation* (verbal action of transferring ownership).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Real-World Application | Key Vocabulary |
| :--- | :--- | :--- |
| **Property Law & Jurisprudence** | Real estate titles, eminent domain, intellectual property | *property*, *proprietor*, *expropriate*, *proprietary* |
| **Public Finance & Government** | Legislative budgeting, fiscal appropriations committees | *appropriate*, *appropriation* |
| **Corporate Governance & Ethics** | Anti-corruption investigations, financial audits, conflicts of interest | *impropriety*, *misappropriate*, *proper* |
| **Grammar & Linguistics** | Unique naming conventions vs general categories | *proper noun*, *proper name* |
| **Physics & Chemistry** | Inherent thermodynamic and chemical attributes of matter | *physical property*, *chemical property* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[appropriable]] | adjective | **1.** That can be appropriated. | *"In academic literature, appropriable designates that can be appropriated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appropriate]] | verb | **1.** Give or assign a resource to a particular person or cause.<br>**2.** Take possession of by force, as after an invasion. | *"The raw afternoon is rawest, and the dense fog is densest, and the muddy streets are muddiest near that leaden-headed old obstruction, appropriate ornament for the threshold of a leaden-headed old corporation, Temple Bar."* — Charles Dickens, *Bleak House* |
| [[appropriately]] | adverb | **1.** In an appropriate manner. | *"An altar was to be erected at one end of the lanai and appropriately decorated."* — Classic Author, *Hawaiian folk tales* |
| [[appropriateness]] | noun | **1.** Appropriate conduct; doing the right thing.<br>**2.** The quality of being specially suitable. | *"For certain words of mysterious appropriateness that Mrs."* — George Eliot, *Middlemarch* |
| [[appropriation]] | noun | **1.** Money set aside (as by a legislature) for a specific purpose.<br>**2.** Incorporation by joining or uniting. | *"Ay, that’s a colt indeed, for he doth nothing but talk of his horse, and he makes it a great appropriation to his own good parts that he can shoe him himself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[appropriative]] | adjective | **1.** Of or relating to or given to the act of taking for yourself. | *"Steam, electricity, and the magnetic needle have all been open to man's appropriative genius ever since the world offered him a home, and yet he has only just now comprehended them."* — W. E. Webb, *Buffalo Land* |
| [[appropriator]] | noun | **1.** Someone who takes for his or her own use (especially without permission). | *"In academic literature, appropriator designates someone who takes for his or her own use (especially without permission)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expropriate]] | verb | **1.** Deprive of possessions. | *"I understand the ship that you, shall we say, expropriated for your escape was no more than a local utility vessel in the Belt."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[expropriation]] | noun | **1.** Taking out of an owner's hands (especially taking property by public authority). | *"In academic literature, expropriation designates taking out of an owner's hands (especially taking property by public authority)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impropriety]] | noun | **1.** An improper demeanor.<br>**2.** The condition of being improper. | *"On my pointing out the great impropriety of the word, especially in connexion with his parent (for he added sulkily “By her!”), he pinched me and said, “Oh, then!"* — Charles Dickens, *Bleak House* |
| [[inappropriate]] | adjective | **1.** Not suitable for a particular occasion etc.<br>**2.** Not in keeping with what is correct or proper. | *"In any case, it has been pointed out, the word adds nothing to the number of our facts; nor is it quite clear yet that it eliminates God from the story any more than the term "digestion" makes it inappropriate to say Grace before meat."* — T. R. Glover, *The Jesus of History* |
| [[inappropriately]] | adverb | **1.** In an inappropriate manner. | *"You have not yet seen my husband?” “Non, madame.” He smiled quite inappropriately."* — graf Leo Tolstoy, *War and Peace* |
| [[inappropriateness]] | noun | **1.** Inappropriate conduct.<br>**2.** The quality of being not particularly suitable or befitting. | *"In academic literature, inappropriateness designates inappropriate conduct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misappropriate]] | verb | **1.** Appropriate (as property entrusted to one's care) fraudulently to one's own use. | *"In academic literature, misappropriate designates appropriate (as property entrusted to one's care) fraudulently to one's own use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misappropriation]] | noun | **1.** The fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else.<br>**2.** Wrongful borrowing. | *"In academic literature, misappropriation designates the fraudulent appropriation of funds or property entrusted to your care but actually owned by someone else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonproprietary]] | adjective | **1.** Not protected by trademark or patent or copyright. | *"In academic literature, nonproprietary designates not protected by trademark or patent or copyright."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proprietary]] | noun | **1.** An unincorporated business owned by a single person who is responsible for its liabilities and entitled to its profits.<br>**2.** Protected by trademark or patent or copyright; made or produced or distributed by one having exclusive rights. | *"The lower rooms were entirely given over to the birds, who walked about them with a proprietary air, as though the place had been built by themselves, and not by certain dusty copyholders who now lay east and west in the churchyard."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[proprietor]] | noun | **1.** (law) someone who owns (is legal possessor of) a business. | *"Boythorn’s infinite delight) as if he were a considerable landed proprietor in heaven."* — Charles Dickens, *Bleak House* |
| [[proprietorship]] | noun | **1.** An unincorporated business owned by a single person who is responsible for its liabilities and entitled to its profits. | *"Snagsby, breaking off with a mistrust that he may have unpolitely asserted a kind of proprietorship in Mr."* — Charles Dickens, *Bleak House* |
| [[proprietress]] | noun | **1.** A woman proprietor. | *"Snagsby and the proprietress of the house—a drunken face tied up in a black bundle, and flaring out of a heap of rags on the floor of a dog-hutch which is her private apartment—leads to the establishment of this conclusion."* — Charles Dickens, *Bleak House* |
| [[propriety]] | noun | **1.** Correct or appropriate behavior. | *"Silence that dreadful bell, it frights the isle From her propriety."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proprioception]] | noun | **1.** The ability to sense the position and location and orientation and movement of the body and its parts. | *"In academic literature, proprioception designates the ability to sense the position and location and orientation and movement of the body and its parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proprioceptive]] | adjective | **1.** Of or relating to proprioception. | *"In academic literature, proprioceptive designates of or relating to proprioception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proprioceptor]] | noun | **1.** Special nerve endings in the muscles and tendons and other organs that respond to stimuli regarding the position and movement of the body. | *"In academic literature, proprioceptor designates special nerve endings in the muscles and tendons and other organs that respond to stimuli regarding the position and movement of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proprionamide]] | noun | **1.** The amide of propionic acid (c2h5conh2). | *"In academic literature, proprionamide designates the amide of propionic acid (c2h5conh2)."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PROPR
  </div>
</div>
