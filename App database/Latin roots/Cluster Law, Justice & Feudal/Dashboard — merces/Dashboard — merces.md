---
status: unread
type: root_dashboard
---
# Dashboard — merces
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">merces-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wages, reward, or price”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A community gathering in a hall to establish fair rules and resolve disputes.</span>
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

The root **merces** means wages, reward, or price. It refers to wages, price, commercial wares, feudal amercement, judicial mercy / clemency. In English, this root forms words such as *wares*, *amerce*, *amercement*, and *amerciament*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wages, reward, or price
> The root **merces** means wages, reward, or price. It refers to wages, price, commercial wares, feudal amercement, judicial mercy / clemency. In English, this root forms words such as *wares*, *amerce*, *amercement*, and *amerciament*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Wages, reward, or price</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A community gathering in a hall to establish fair rules and resolve disputes.</mark>
> - **Everyday Connection**: Think of familiar words like *wares* and *amerce*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **merces** comes from a Latin word that means *"wages, reward, or price"*.
  - At its core, it describes wages, reward, or price.

- **The Big Picture Idea**:
  - Picture a community gathering in a hall to establish fair rules and resolve disputes.
  - Whenever you see **merces** in an English word, think of **justice, legal authority, and governance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of wages, reward, or price.
  - **Mental & Social**: How people experience, organize, or communicate about wages, reward, or price.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Wares**: An everyday English word showing the root's idea of *wages, reward, or price*.
  - **Amerce**: To punish by an arbitrary or discretionary financial penalty or fine assessed by a court or lord.
  - **Amercement**: A discretionary financial penalty or fine inflicted upon an offender at the mercy of the court or lord.
  - **Amerciament**: An amercement.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">merces</mark>, think of <mark class="hl-def">justice, legal authority, and governance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates through five primary morphological channels in English:
> - **Feudal Discretionary Stem (`amerc-`):** Derived from Anglo-Norman *amercier* (< *a merci* < *ad* + *mercēs*): *amerce*, *amercement*, *amerciament*, *amerceable*.
> - **Compassion & Clemency Stem (`mercy-`):** Derived via Old French *merci*: *mercy*, *merciful*, *merciless*, *unmerciful*.
> - **Soldier-for-Hire Stem (`mercen-`):** Derived from Latin *mercēnārius*: *mercenary*, *mercenariness*.
> - **Commercial Trading Stem (`merc-`):** Derived from Latin *merx* and *mercātor*: *merchant*, *merchandise*, *mercantile*, *mercantilism*, *mercer*, *mercery*, *mercerize*.
> - **Marketplace Sound Shift (`market-`):** Mediated through Old French *marchiet* (< Latin *mercātus*): *market*, *marketable*, *marketer*, *marketing*.

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
> The derivations of *merces* organize into five primary domains:
> - **Feudal Fines & Constitutional Due Process:** In [[amerce]], [[amercement]], and [[amerciament]], the root represents discretionary judicial fines assessed by feudal lords and constrained by Magna Carta.
> - **Judicial Clemency & Human Compassion:** In [[mercy]], [[merciful]], [[merciless]], and [[unmerciful]], the root denotes the prerogative of pardoning, softening harsh penalties, or showing pity to the vulnerable.
> - **Hired Arms & Material Greed:** In [[mercenary]] and [[mercenariness]], the root characterizes foreign contract soldiers fighting solely for pay, and individuals driven strictly by monetary self-interest.
> - **Global Commerce, Wholesale & Markets:** In [[market]], [[merchant]], [[merchandise]], [[mercantile]], and [[mercantilism]], the root governs trade, economic exchange, retail commodities, and early modern balance-of-trade economic theories.
> - **Textile Guilds & Industrial Chemistry:** In [[mercer]], [[mercery]], [[mercerize]], and [[mercerization]], the root denotes high-end fabric dealers and the caustic-alkali chemical treatment of cotton yarns.

---

## 🔀 4. Prefix & Combining Dynamics on merces

### Prefix Shifts (Directional & Evaluative Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (via OF *a-*) | to, at | [[amerce]], [[amercement]] | Lit. "at the mercy of"; to subject to a discretionary judicial fine. |
| `un-` | not | [[unmerciful]] | Showing no mercy, compassion, or leniency; pitiless and severe. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Noun (Feudal Penalty) | [[amercement]], [[amerciament]] | A discretionary monetary penalty imposed by a court or feudal manor. |
| `-ary` | Noun / Adjective | [[mercenary]] | Hired solely for money; a soldier fighting for a foreign power for wages. |
| `-ful` | Adjective (Abounding in) | [[merciful]] | Characterized by compassion, leniency, or forgiving grace. |
| `-less` | Adjective (Devoid of) | [[merciless]] | Devoid of pity, compassion, or quarter; relentless. |
| `-able` | Adjective (Commercial Quality)| [[marketable]], [[merchantable]] | Fit to be sold in open commerce; meeting commercial standards. |
| `-ile` | Adjective (Commercial Nature) | [[mercantile]] | Pertaining to merchants, trading, or commercial business. |
| `-ism` | Noun (Economic System) | [[mercantilism]] | The economic doctrine prioritizing trade surpluses and bullion reserves. |
| `-ize` | Verb (Chemical Process) | [[mercerize]] | To treat cotton with caustic soda to impart strength and silky luster. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional History & Common Law** | [[amerce]], [[amercement]], [[mercy]], [[prerogative of mercy]] | Magna Carta Chapter 20, Eighth Amendment prohibition on excessive fines, executive pardons. |
| 🛡️ **International Humanitarian Law & Warfare** | [[mercenary]], [[mercenariness]] | Geneva Conventions Protocol I (Article 47 definition of mercenaries), private military contractors. |
| 📈 **Economic History & Macroeconomics** | [[mercantilism]], [[mercantile]], [[market]], [[marketing]] | Colbertism, bullionism, Navigation Acts, free market capitalism vs. protectionist trade policy. |
| 🧵 **Textile Chemistry & Material Science** | [[mercer]], [[mercery]], [[mercerize]], [[mercerization]] | Chemical treatment of cellulosic fibers, tensile strength enhancement of sewing threads. |
| 📦 **Supply Chain, Retail & Commercial Law** | [[merchant]], [[merchandise]], [[merchantable]] | Uniform Commercial Code (UCC) implied warranty of merchantability, retail inventory management. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[commercial]] | noun | **1.** A commercially sponsored ad on radio or television.<br>**2.** Connected with or engaged in or sponsored by or used in commerce or commercial enterprises. | *"Boldwood, who was apparently determined by personal rather than commercial reasons, suggested that Oak should be furnished with a horse for his sole use, when the plan would present no difficulty, the two farms lying side by side."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[commercial-grade]] | adjective | **1.** Of the kind or quality used in commerce; average or inferior. | *"In academic literature, commercial-grade designates of the kind or quality used in commerce; average or inferior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialisation]] | noun | **1.** The act of commercializing something; involving something in commerce. | *"In academic literature, commercialisation designates the act of commercializing something; involving something in commerce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialise]] | verb | **1.** Make commercial. | *"In academic literature, commercialise designates make commercial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialised]] | verb | **1.** Make commercial.<br>**2.** Organized principally for financial gain. | *"In academic literature, commercialised designates make commercial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialism]] | noun | **1.** Transactions (sales and purchases) having the objective of supplying commodities (goods and services). | *"Literary commercialism is lowering the intellectual standard to accommodate the purse and to 195:30 meet a frivolous demand for amusement instead of for improvement."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[commercialization]] | noun | **1.** The act of commercializing something; involving something in commerce. | *"In academic literature, commercialization designates the act of commercializing something; involving something in commerce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[commercialize]] | verb | **1.** Exploit for maximal profit, usually by sacrificing quality.<br>**2.** Make commercial. | *"This view is now becoming more general as a result of the commercializing of farming enterprise."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commercialized]] | verb | **1.** Exploit for maximal profit, usually by sacrificing quality.<br>**2.** Make commercial. | *"As farming becomes more commercialized it necessarily becomes somewhat more specialized, and produces a smaller variety of products."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[commercially]] | adverb | **1.** In a commercial manner. | *"He grows more commercially-minded."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[mercenaria]] | noun | **1.** A genus of veneridae. | *"In academic literature, mercenaria designates a genus of veneridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mercenary]] | noun | **1.** A person hired to fight for another country than their own.<br>**2.** Marked by materialism. | *"He is well paid that is well satisfied, And I delivering you, am satisfied, And therein do account myself well paid, My mind was never yet more mercenary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[merciless]] | adjective | **1.** Having or showing no mercy. | *"O, had the gods done so, I had not now Worthily term’d them merciless to us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mercilessly]] | adverb | **1.** Without pity; in a merciless manner. | *"Then with her little scissors, by the aid of a pocket looking-glass, she mercilessly nipped her eyebrows off, and thus insured against aggressive admiration, she went on her uneven way."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[mercilessness]] | noun | **1.** Feelings of extreme heartlessness.<br>**2.** Inhumaneness evidenced by an unwillingness to be kind or forgiving. | *"In academic literature, mercilessness designates feelings of extreme heartlessness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncommercial]] | adjective | **1.** Not connected with or engaged in commercial enterprises. | *"You must attribute the work in the manner specified by the author or licensor. -- Noncommercial."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[uncommercial]] | adjective | **1.** Not conducive to commercial success; - h.e.clurman. | *"In academic literature, uncommercial designates not conducive to commercial success; - h.e.clurman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommercialised]] | adjective | **1.** Not having been commercialized. | *"In academic literature, uncommercialised designates not having been commercialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncommercialized]] | adjective | **1.** Not having been commercialized. | *"In academic literature, uncommercialized designates not having been commercialized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmercenary]] | adjective | **1.** Not mercenary; not influenced by financial gains. | *"I am also of opinion that it is greatly to my credit, and a proof of my pure and unmercenary nature, that I did not instantly put myself up to be raffled for, or rush out into the streets and propose marriage to the first lady I met."* — P. G. Wodehouse, *Love Among the Chickens* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Law, Justice & Feudal]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MERCES
  </div>
</div>
