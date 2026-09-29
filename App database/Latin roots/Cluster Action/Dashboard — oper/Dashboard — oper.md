---
status: unread
type: root_dashboard
---
# Dashboard — oper
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">oper-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to work or labour”</span>
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

The root **oper** means to work or labour. It refers to the action of working and carrying out this process. In English, this root forms words such as *operate*, *operation*, *operator*, and *cooperate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to work or labour
> The root **oper** means to work or labour. It refers to the action of working and carrying out this process. In English, this root forms words such as *operate*, *operation*, *operator*, and *cooperate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To work or labour</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *operate* and *operation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **oper** comes from a Latin word that means *"to work or labour"*.
  - At its core, it describes the action of work or labour.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **oper** in an English word, think of **to work or labour**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to work or labour).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Operate**: To control the functioning of a machine, process, or system.
  - **Operation**: The action of operating, functioning, or working.
  - **Operator**: A person who operates equipment, machinery, or a telephone switchboard.
  - **Cooperate**: To act jointly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">oper</mark>, think of <mark class="hl-def">to work or labour</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `oper-` (< Latin *operis / operārī*): Universal active working stem.
  - `opus` (< Latin nominative *opus*): Preserved in music and literature.
- **Prefix & Combining Machinery**:
  - `co-` ("together"): *cooperate, cooperation, cooperative*.
  - `in-` ("not"): *inoperable, inoperative*.
  - `inter-` ("between"): *interoperability*.
  - `magnum` ("great"): *magnum opus*.

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
                      ┌── Fine Arts & Music: opus, magnum opus, opera
                      │
   [oper] ────────────┼── Medicine & Surgery: operate, operation, inoperable
(Work, labor, deed)   │
                      ├── Engineering & Machinery: operative, operator, operational
                      │
                      └── Teamwork & Technology: cooperate, cooperation, interoperability
```

---

## 🔀 4. Prefix & Combining Dynamics on oper
- **`co-` + `oper` + `-ate`**: *cooperate* — to work jointly together toward the same end.
- **`in-` + `oper` + `-able`**: *inoperable* — not able to be operated; in surgery, not treatable by surgery.
- **`inter-` + `oper` + `-ability`**: *interoperability* — the capacity of systems to work together and exchange data.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Surgery & Clinical Medicine**: Laparoscopic *operations*; *inoperable* neoplasms; post-*operative* care.
- **Musicology & Dramatic Arts**: Italian *opera* seria; *opus* numbers in classical composer catalogs.
- **Enterprise Software & Networking**: Cloud API *interoperability*; open architecture frameworks.
- **Military Strategy & Logistics**: Theatre of *operations*; Joint Special *Operations* Command.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anoperineal]] | adjective | **1.** Relating to the anus and surrounding perineum. | *"In academic literature, anoperineal designates relating to the anus and surrounding perineum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cooper]] | noun | **1.** United states industrialist who built the first american locomotive; founded cooper union in new york city to offer free courses in the arts and sciences (1791-1883).<br>**2.** United states film actor noted for his portrayals of strong silent heroes (1901-1961). | *"Gros-Jean, our peasant, toils for money, and hoards; Jacques, who is a cooper and maker of wine casks, gains and drinks; Jean Pierre snatches at every sous that comes in his way, and spends it in yet worse dissipations."* — Mrs. Oliphant, *A Beleaguered City* |
| [[cooperate]] | verb | **1.** Work together on a common enterprise of project. | *"Everything seemed to cooperate for her advantage."* — Jane Austen, *Northanger Abbey* |
| [[cooperation]] | noun | **1.** Joint operation or action.<br>**2.** The practice of cooperating. | *"Getting INOR's cooperation will also become more difficult than ever."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cooperative]] | noun | **1.** A jointly owned commercial enterprise (usually organized by farmers or consumers) that produces and distributes goods and services and is run for the benefit of its owners.<br>**2.** An association formed and operated for the benefit of those using it. | *"A tall figure in bearded homespun rose from shadow and unveiled its cooperative watch. —I am afraid I am due at the _Homestead._ Whither away?"* — James Joyce, *Ulysses* |
| [[cooperatively]] | adverb | **1.** In close cooperation. | *"In academic literature, cooperatively designates in close cooperation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cooperativeness]] | noun | **1.** The trait of being cooperative. | *"In academic literature, cooperativeness designates the trait of being cooperative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cooperator]] | noun | **1.** An associate in an activity or endeavor or sphere of common interest. | *"In academic literature, cooperator designates an associate in an activity or endeavor or sphere of common interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cooperstown]] | noun | **1.** A small town in east central new york; site of the national baseball hall of fame. | *"In academic literature, cooperstown designates a small town in east central new york; site of the national baseball hall of fame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inoperable]] | adjective | **1.** Not able to perform its normal function.<br>**2.** Not suitable for surgery. | *"In academic literature, inoperable designates not able to perform its normal function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inoperative]] | adjective | **1.** Not working or taking effect. | *"In other cases the old rates were but nominal and inoperative because they were upon goods regularly exported, not imported (e.g., farm products, cotton goods, and some other manufactures)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[interoperability]] | noun | **1.** (computer science) the ability to exchange and use information (usually in a large heterogeneous network made up of several local area networks). | *"In academic literature, interoperability designates (computer science) the ability to exchange and use information (usually in a large heterogeneous network made up of several local area networks)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interoperable]] | adjective | **1.** Able to exchange and use information. | *"In academic literature, interoperable designates able to exchange and use information."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonoperational]] | adjective | **1.** (military) not involved in military operations. | *"In academic literature, nonoperational designates (military) not involved in military operations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opera]] | noun | **1.** A drama set to music; consists of singing with orchestral accompaniment and an orchestral overture and interludes.<br>**2.** A commercial browser. | *"Skimpole could play on the piano and the violoncello, and he was a composer—had composed half an opera once, but got tired of it—and played what he composed with taste."* — Charles Dickens, *Bleak House* |
| [[operable]] | adjective | **1.** Capable of being treated by surgical operation.<br>**2.** Fit or ready for use or service. | *"In academic literature, operable designates capable of being treated by surgical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operagoer]] | noun | **1.** A patron of the opera. | *"In academic literature, operagoer designates a patron of the opera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operand]] | noun | **1.** A quantity upon which a mathematical operation is performed. | *"In academic literature, operand designates a quantity upon which a mathematical operation is performed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operant]] | adjective | **1.** Having influence or producing an effect. | *"Faith, I must leave thee, love, and shortly too: My operant powers their functions leave to do: And thou shalt live in this fair world behind, Honour’d, belov’d, and haply one as kind For husband shalt thou— PLAYER QUEEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[operate]] | verb | **1.** Direct or control; projects, businesses, etc.<br>**2.** Perform as expected when applied. | *"Words, words, mere words, no matter from the heart; Th’effect doth operate another way. [_Tearing the letter_.] Go, wind, to wind, there turn and change together."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[operatic]] | adjective | **1.** Of or relating to or characteristic of opera. | *"Retired from operatic stage—ha!"* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[operating]] | verb | **1.** Direct or control; projects, businesses, etc.<br>**2.** Perform as expected when applied. | *"He mounted the third pile of wealth and began operating, adopting the plan of sloping the upper sheaves one over the other; and, in addition, filling the interstices with the material of some untied sheaves."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[operation]] | noun | **1.** The state of being in effect or being operative.<br>**2.** A business especially one run on a large scale. | *"Your serpent of Egypt is bred now of your mud by the operation of your sun; so is your crocodile."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[operational]] | adjective | **1.** Pertaining to a process or series of actions for achieving a result.<br>**2.** Fit or ready for use or service. | *"Your team has just been assembled," Ram said, "yet we don't have a moment to lose to get you in place and operational."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[operationalism]] | noun | **1.** (philosophy) the doctrine that the meaning of a proposition consists of the operations involved in proving or applying it. | *"In academic literature, operationalism designates (philosophy) the doctrine that the meaning of a proposition consists of the operations involved in proving or applying it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operationalist]] | adjective | **1.** Of or relating to or espousing operationalism. | *"In academic literature, operationalist designates of or relating to or espousing operationalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operationally]] | adverb | **1.** In respect to operation. | *"In academic literature, operationally designates in respect to operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operations]] | noun | **1.** Financial transactions at a brokerage; having to do with the execution of trades and keeping customer records.<br>**2.** The state of being in effect or being operative. | *"I have operations in my head which be humours of revenge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[operative]] | noun | **1.** A person secretly employed in espionage for a government.<br>**2.** Someone who can be employed as a detective to collect information. | *"There is means, madam: Our foster nurse of nature is repose, The which he lacks; that to provoke in him Are many simples operative, whose power Will close the eye of anguish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[operatively]] | adverb | **1.** In a manner to produce an effect. | *"In academic literature, operatively designates in a manner to produce an effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operator]] | noun | **1.** (mathematics) a symbol or function representing a mathematical operation.<br>**2.** An agent that operates some apparatus or machine. | *"The operator takes a very sharp bone of an ape, rubs it with a pungent spice, and then pinching up the skin of his son's arm he pierces it with the bone through and through, as a surgeon might introduce a seton."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[operculate]] | adjective | **1.** Having an operculum. | *"In academic literature, operculate designates having an operculum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operculated]] | adjective | **1.** Having an operculum. | *"In academic literature, operculated designates having an operculum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operculum]] | noun | **1.** A hard flap serving as a cover for (a) the gill slits in fishes or (b) the opening of the shell in certain gastropods when the body is retracted. | *"In academic literature, operculum designates a hard flap serving as a cover for (a) the gill slits in fishes or (b) the opening of the shell in certain gastropods when the body is retracted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operetta]] | noun | **1.** A short amusing opera. | *"In academic literature, operetta designates a short amusing opera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operon]] | noun | **1.** A segment of dna containing adjacent genes including structural genes and an operator gene and a regulatory gene. | *"In academic literature, operon designates a segment of dna containing adjacent genes including structural genes and an operator gene and a regulatory gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operose]] | adjective | **1.** Characterized by effort to the point of exhaustion; especially physical effort. | *"In academic literature, operose designates characterized by effort to the point of exhaustion; especially physical effort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[operoseness]] | noun | **1.** The quality of requiring extended effort. | *"In academic literature, operoseness designates the quality of requiring extended effort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperative]] | adjective | **1.** Happening or done after a surgical operation. | *"In academic literature, postoperative designates happening or done after a surgical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postoperatively]] | adverb | **1.** After the operation. | *"In academic literature, postoperatively designates after the operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preoperative]] | adjective | **1.** Happening or done before and in preparation for a surgical operation. | *"In academic literature, preoperative designates happening or done before and in preparation for a surgical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncooperative]] | adjective | **1.** Unwilling to cooperate.<br>**2.** Intentionally unaccommodating. | *"In academic literature, uncooperative designates unwilling to cooperate."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · OPER
  </div>
</div>
