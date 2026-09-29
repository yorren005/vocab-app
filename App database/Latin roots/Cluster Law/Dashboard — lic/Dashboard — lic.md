---
status: unread
type: root_dashboard
---
# Dashboard — lic
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lic-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“permit”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community establishing fair rules to ensure order and peaceful living.</span>
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

The root **lic** means permit. It refers to permitted, lawful, authorized, freedom of action. In English, this root forms words such as *licet*, *illicit*, *illicitly*, and *illicitness*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: permit
> The root **lic** means permit. It refers to permitted, lawful, authorized, freedom of action. In English, this root forms words such as *licet*, *illicit*, *illicitly*, and *illicitness*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Permit</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community establishing fair rules to ensure order and peaceful living.</mark>
> - **Everyday Connection**: Think of familiar words like *licet* and *illicit*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lic** comes from a Latin word that means *"permit"*.
  - At its core, it describes permit.

- **The Big Picture Idea**:
  - Picture a community establishing fair rules to ensure order and peaceful living.
  - Whenever you see **lic** in an English word, think of **rules, rights, and the law**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of permit.
  - **Mental & Social**: How people experience, organize, or communicate about permit.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Licet**: It is lawful or permitted.
  - **Illicit**: Forbidden by law, rules, or custom.
  - **Illicitly**: In a manner contrary to statutory law or established moral codes.
  - **Illicitness**: The quality, state, or property of being illicit or unlawful.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lic</mark>, think of <mark class="hl-def">rules, rights, and the law</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via three primary stems:
> 1. **The Adjectival Stem `licit-` (from *licitum*):**
>    - *licit*, *illicit*, *illicitly*, *illicitness*.
> 2. **The Warrant & Conduct Stem `licens-` / `licent-` (from *licentia*):**
>    - Noun/Verb: *license* (US) / *licence* (UK), *licensed*, *unlicensed*, *licensee*, *licensor*, *licensing*.
>    - Academic title: *licentiate* (licensed university teacher or medical practitioner).
>    - Pejorative moral adjective: *licentious*, *licentiously*, *licentiousness*.
> 3. **The Anglo-French Leisure Stem `leisur-` (from *loisir* < *licēre*):**
>    - *leisure*, *leisurely*, *leisureliness*.
> 4. **Scholastic Latin Verb Compounds:**
>    - *videlicet* (*vidēre licet*), *scilicet* (*scīre licet*), *licet*.

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
> - **Administrative Law & Regulatory Compliance:** *Licit*, *illicit*, *license*, *licensing*, *licensor*, *licensee* — state regulatory permits; patents and software licenses; illicit black-market trade.
> - **Moral Philosophy & Sexual Ethics:** *Licentious*, *licentiously*, *licentiousness* — disregarding moral bounds; unrestrained hedonism and wantonness.
> - **Sociology, Time & Human Culture:** *Leisure*, *leisurely*, *leisureliness* — freedom from labor; unhurried recreational repose.
> - **Higher Education & Professional Guilds:** *Licentiate* — intermediate academic degree between bachelor and doctor in European universities.
> - **Textual Exegesis & Rhetoric:** *Videlicet* (*viz.*), *scilicet* (*sc.*) — scholastic glossing indicating specific clarifying particulars.

---

## 🔀 4. Prefix & Combining Dynamics on lic

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `in-` ($\to$ `il-`) | not, un- (privative) | [[illicit]], [[illicitly]], [[illicitness]] | Not permitted by law or moral code; unlawful, illegal, forbidden. |
| `un-` (Germanic) | not | [[unlicensed]] | Lacking an official administrative permit or statutory license. |
| `vidēre` (Latin verb) | to see | [[videlicet]] | "It is permitted to see" $\to$ namely, to wit (abbreviated *viz.*). |
| `scīre` (Latin verb) | to know | [[scilicet]] | "It is permitted to know" $\to$ namely, that is to say (abbreviated *sc.*). |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-it` | Adjective (State / Quality) | [[licit]], [[illicit]] | Characterizing an activity as permitted or banned by law. |
| `-ee` | Recipient Noun | [[licensee]] | The party or corporation to whom a license is officially granted. |
| `-or` | Grantor Agent Noun | [[licensor]] | The sovereign authority or patent holder granting a license. |
| `-iate` | Noun (Title / Status) | [[licentiate]] | A person holding a formal license from a university or bishop to practice. |
| `-ious` | Adjective (Quality / Tendency) | [[licentious]] | Displaying excessive, unrestrained freedom; morally wanton. |
| `-ure` (via French) | Noun (Condition of Freedom) | [[leisure]] | Time free from compulsory toil; unhurried ease. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Criminal Law & Criminology** | [[illicit]], [[licit]], [[unlicensed]] | Illicit drug trafficking; money laundering; trafficking in illicit wildlife; unlicensed firearm possession. |
| 💼 **Intellectual Property & Corporate Law** | [[license]], [[licensor]], [[licensee]], [[licensing]] | Exclusive patent licensing agreements; open-source software licenses (MIT, Apache); commercial trademark franchising. |
| 🎓 **Higher Education & Ecclesiastical History** | [[licentiate]] | Licentiate in Sacred Theology (STL); Licentiate in Canon Law (JCL); historic guild teaching licenses (*licentia docendi*). |
| 🏖️ **Sociology & Labor Economics** | [[leisure]], [[leisurely]] | Thorstein Veblen's *Theory of the Leisure Class*; the four-day workweek; economics of leisure time. |
| 📖 **Scholarly Citation & Philology** | [[videlicet]], [[scilicet]] | Formal textual annotations (*viz.*, *sc.*) introducing definitive explanations or missing textual names. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allice]] | noun | **1.** European shad. | *"In academic literature, allice designates european shad."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colic]] | noun | **1.** Acute abdominal pain (especially in infants). | *"Now crack thy lungs and split thy brazen pipe; Blow, villain, till thy sphered bias cheek Out-swell the colic of puff’d Aquilon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[colicky]] | adjective | **1.** Suffering from excessive gas in the alimentary canal. | *"Every few minutes the minister passed him the bottle and it acted like paregoric on a colicky baby."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[colicroot]] | noun | **1.** Any of several perennials of the genus aletris having grasslike leaves and bitter roots reputed to cure colic. | *"In academic literature, colicroot designates any of several perennials of the genus aletris having grasslike leaves and bitter roots reputed to cure colic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delicacy]] | noun | **1.** The quality of being beautiful and delicate in appearance.<br>**2.** Something considered choice to eat. | *"Skimpole,” said Richard to me, “has a delicacy in applying to my cousin Jarndyce because he has lately—I think, sir, I understood you that you had lately—” “Oh, yes!” returned Mr."* — Charles Dickens, *Bleak House* |
| [[delicate]] | adjective | **1.** Exquisitely fine and subtle and pleasing; susceptible to injury.<br>**2.** Marked by great skill especially in meticulous technique. | *"Faith, there’s a dozen of ’em, with delicate fine hats, and most courteous feathers, which bow the head and nod at every man. [_Exeunt._] ACT V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[delicately]] | adverb | **1.** In a delicate manner. | *"Maxa had to agree with her brother who had said that she had her mother's large, speaking eyes, the same soft brown curls, and the same serious expression on her delicately shaped little face."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[delicatessen]] | noun | **1.** Ready-to-eat food products.<br>**2.** A shop selling ready-to-eat food products. | *"In academic literature, delicatessen designates ready-to-eat food products."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delicious]] | noun | **1.** Variety of sweet eating apples.<br>**2.** Greatly pleasing or entertaining. | *"Now I feed myself With most delicious poison."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deliciously]] | adverb | **1.** In a very pleasurable manner.<br>**2.** So as to produce a delightful taste. | *"The sun was warm and jolly and hospitable from the arrival of its first rays, but the wind was deliciously cool and bracing and full of the wine of October."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[deliciousness]] | noun | **1.** Extreme appetizingness. | *"The sweetest honey Is loathsome in his own deliciousness, And in the taste confounds the appetite."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[derelict]] | noun | **1.** A person without a home, job, or property.<br>**2.** A ship abandoned on the high seas. | *"Close-hauled, the closest she could come was to six points of the wind; and then she bobbed up and down, without way, like a derelict turnip."* — Jack London, *The Jacket (The Star-Rover)* |
| [[elicit]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Deduce (a principle) or construe (a meaning). | *"And as our utmost endeavours could only elicit from Richard himself sweeping assurances that everything was going on capitally and that it really was all right at last, our anxiety was not much relieved by him."* — Charles Dickens, *Bleak House* |
| [[elicitation]] | noun | **1.** Stimulation that calls up (draws forth) a particular class of behaviors. | *"In academic literature, elicitation designates stimulation that calls up (draws forth) a particular class of behaviors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elicited]] | verb | **1.** Call forth (emotions, feelings, and responses).<br>**2.** Deduce (a principle) or construe (a meaning). | *"By half-past five, post meridian, Horse Guards’ time, it has even elicited a new remark from the Honourable Mr."* — Charles Dickens, *Bleak House* |
| [[illicit]] | adjective | **1.** Contrary to accepted morality (especially sexual morality) or convention.<br>**2.** Contrary to or forbidden by law. | *"The sacred lowe o’ weel-plac’d love, Luxuriantly indulge it; But never tempt th’ illicit rove, Tho’ naething should divulge it: I waive the quantum o’ the sin, The hazard of concealing; But, Och! it hardens a’ within, And petrifies the feeling!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[illicitly]] | adverb | **1.** In a manner disapproved or not allowed by custom.<br>**2.** In an illegal manner. | *"In academic literature, illicitly designates in a manner disapproved or not allowed by custom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illicitness]] | noun | **1.** The quality of not conforming strictly to law. | *"In academic literature, illicitness designates the quality of not conforming strictly to law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illicium]] | noun | **1.** Anise trees: evergreen trees with aromatic leaves. | *"In academic literature, illicium designates anise trees: evergreen trees with aromatic leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indelicacy]] | noun | **1.** The trait of being indelicate and offensive.<br>**2.** An impolite act or expression. | *"She saw the indelicacy of putting himself forward as he had done, and the inconsistency of his professions with his conduct."* — Jane Austen, *Pride and Prejudice* |
| [[indelicate]] | adjective | **1.** In violation of good taste even verging on the indecent.<br>**2.** Lacking propriety and good taste in manners and conduct. | *"I said to my landlord, ‘My good man, you are not aware that my excellent friend Jarndyce will have to pay for those things that you are sweeping off in that indelicate manner."* — Charles Dickens, *Bleak House* |
| [[licence]] | noun | **1.** Excessive freedom; lack of due restraint; - will durant; - edmund burke.<br>**2.** Freedom to deviate deliberately from normally applicable rules or practices (especially in behavior or speech). | *"Name Cleopatra as she is called in Rome; Rail thou in Fulvia’s phrase, and taunt my faults With such full licence as both truth and malice Have power to utter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[licenced]] | verb | **1.** Authorize officially.<br>**2.** Given official approval to act. | *"In academic literature, licenced designates authorize officially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[license]] | noun | **1.** A legal document giving official permission to do something.<br>**2.** Freedom to deviate deliberately from normally applicable rules or practices (especially in behavior or speech). | *"Tell him that by his license, Fortinbras Craves the conveyance of a promis’d march Over his kingdom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[licensed]] | verb | **1.** Authorize officially.<br>**2.** Given official approval to act. | *"Blue-gown, the livery of the licensed beggar."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[licensee]] | noun | **1.** Someone to whom a license is granted. | *"In academic literature, licensee designates someone to whom a license is granted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licenser]] | noun | **1.** An official who can issue a license or give authoritative permission (especially one who licenses publications). | *"In academic literature, licenser designates an official who can issue a license or give authoritative permission (especially one who licenses publications)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licentiate]] | noun | **1.** Holds a license (degree) from a (european) university. | *"In academic literature, licentiate designates holds a license (degree) from a (european) university."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licentious]] | adjective | **1.** Lacking moral discipline; especially sexually unrestrained. | *"How dearly would it touch thee to the quick, Should’st thou but hear I were licentious?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[licentiously]] | adverb | **1.** In a licentious and promiscuous manner. | *"In academic literature, licentiously designates in a licentious and promiscuous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licentiousness]] | noun | **1.** The quality of being lewd and lascivious.<br>**2.** Dissolute indulgence in sensual pleasure. | *"WILL THE LORD DELIVER FROM BAD HABITS OF TOBACCO, RUM, LIQUOR, LICENTIOUSNESS, ETC., IN ANSWER TO PRAYER."* — Classic Author, *The wonders of prayer* |
| [[licit]] | adjective | **1.** Sanctioned by custom or morality especially sexual morality.<br>**2.** Authorized, sanctioned by, or in accordance with law. | *"In academic literature, licit designates sanctioned by custom or morality especially sexual morality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licitly]] | adverb | **1.** In a manner acceptable to common custom. | *"In academic literature, licitly designates in a manner acceptable to common custom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licitness]] | noun | **1.** The quality of strictly conforming to law. | *"In academic literature, licitness designates the quality of strictly conforming to law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[licorice]] | noun | **1.** Deep-rooted coarse-textured plant native to the mediterranean region having blue flowers and pinnately compound leaves; widely cultivated in europe for its long thick sweet roots.<br>**2.** A black candy flavored with the dried root of the licorice plant. | *"In academic literature, licorice designates deep-rooted coarse-textured plant native to the mediterranean region having blue flowers and pinnately compound leaves; widely cultivated in europe for its long thick sweet roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overdelicate]] | adjective | **1.** Extremely delicate. | *"In academic literature, overdelicate designates extremely delicate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relic]] | noun | **1.** An antiquity that has survived from the distant past.<br>**2.** Something of sentimental value. | *"Anyhow, whatever the origin of the relic, there was and is something sinister, or solemn, according to mood, in the scene amid which it stands; something tending to impress the most phlegmatic passer-by."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[relict]] | noun | **1.** An organism or species surviving as a remnant of an otherwise extinct flora or fauna in an environment much changed from that in which it originated.<br>**2.** Geological feature that is a remnant of a pre-existing formation after other parts have disappeared. | *"She is the relict of my beloved uncle, the sixteenth or seventeenth Baron Bluebell—I forget exactly how many of them there have been."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[silica]] | noun | **1.** A white or colorless vitreous insoluble solid (sio2); various forms occur widely in the earth's crust as quartz or cristobalite or tridymite or lechatelierite. | *"Aluminium and oxygen form alumina, of which are constituted the sapphire, the ruby and other precious stones, but alumina is most commonly found in combination with silica, or silicon and oxygen."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[silicate]] | noun | **1.** A salt or ester derived from silicic acid. | *"This compound is called silicate of aluminium, and of it are formed clay and many rocks."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[siliceous]] | adjective | **1.** Relating to or containing or resembling silica. | *"This ore contains 5 to 5½ per cent. copper, with a large quantity of highly siliceous gangue."* — Donald M. Levy, *Modern Copper Smelting* |
| [[silicic]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lic within the domain of Law.<br>**2.** A technical or specialized form exhibiting the properties of lic in systematic terminology. | *"In academic literature, silicic designates pertaining to, derived from, or characteristic of latin lic within the domain of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[silicious]] | adjective | **1.** Relating to or containing or resembling silica. | *"Soon the nature of the soil changed; to the sandy plain succeeded an extent of slimy mud, which the Americans call “ooze,” composed of equal parts of silicious and calcareous shells."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[silicone]] | noun | **1.** Any of a large class of siloxanes that are unusually stable over a wide range of temperatures; used in lubricants and adhesives and coatings and synthetic rubber and electrical insulation. | *"In academic literature, silicone designates any of a large class of siloxanes that are unusually stable over a wide range of temperatures; used in lubricants and adhesives and coatings and synthetic rubber and electrical insulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[silicosis]] | noun | **1.** A lung disease caused by inhaling particles of silica or quartz or slate. | *"In academic literature, silicosis designates a lung disease caused by inhaling particles of silica or quartz or slate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlicenced]] | adjective | **1.** Lacking official approval. | *"In academic literature, unlicenced designates lacking official approval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unlicensed]] | adjective | **1.** Lacking official approval. | *"If further yet you will be satisfied, Why, as it were unlicensed of your loves, He would depart, I’ll give some light unto you."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LIC
  </div>
</div>
