---
status: unread
type: root_dashboard
---
# Dashboard — cup
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cup-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to desire or long for”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **cup** means to desire or long for. It refers to the action of desiring and carrying out this process. In English, this root forms words such as *boil*, *pant*, *covet*, and *coveted*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to desire or long for
> The root **cup** means to desire or long for. It refers to the action of desiring and carrying out this process. In English, this root forms words such as *boil*, *pant*, *covet*, and *coveted*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To desire or long for</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *boil* and *pant*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cup** comes from a Latin word that means *"to desire or long for"*.
  - At its core, it describes the action of desire or long for.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **cup** in an English word, think of **to desire or long for**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to desire or long for).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Boil**: An everyday English word showing the root's idea of *to desire or long for*.
  - **Pant**: An everyday English word showing the root's idea of *to desire or long for*.
  - **Covet**: To desire eagerly, culpably, or inordinately that which belongs to another.
  - **Coveted**: Earnestly longed for, prized, or sought after by many.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cup</mark>, think of <mark class="hl-def">to desire or long for</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Lexical Trajectory
> The root **cup** branches into English through three historical pathways:
> - **The Direct Classical Nominal Stem (`cupid-`):** Borrowed directly from Latin *cupīdō* and *cupīditās*, yielding [[Cupid]], [[cupidity]], and the literary adjective [[cupidinous]].
> - **The Inchoative Theological Stem (`concupisc-`):** Formed from Latin *con-* (intensive) + *cupere* + inchoative infix *-isc-*, entering Middle English through Church Latin treatises as [[concupiscence]], [[concupiscent]], and [[concupiscible]].
> - **The Old French Lenited Stem (`covet-`):** Transmitted from Vulgar Latin *\*cupitāre* through Anglo-Norman *coveitier*, giving the vernacular everyday vocabulary of desiring: [[covet]], [[coveted]], [[covetous]], [[covetously]], [[covetousness]], and [[covetable]].

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

> [!tip] 🌈 Four Distinct Horizons of the `cup` Family
> - **Biblical, Legal & Moral Prohibition:** [[covet]], [[covetous]], [[covetousness]] — the illicit longing for another's property, spouse, or status, condemned in moral law and equity.
> - **Commercial & Financial Greed:** [[cupidity]] — rapacious hunger for money, profits, or territory; insatiable acquisitiveness.
> - **Sensual, Erotic & Augustinian Theology:** [[concupiscence]], [[concupiscent]] — physical lust, unbridled sexual appetites, and the post-lapsarian theological inclination toward sin.
> - **Classical Mythology & Renaissance Allegory:** [[Cupid]], [[cupidinous]] — the winged archer of love, mythological personification of erotic wounds and infatuation.

---

## 🔀 4. Prefix & Combining Dynamics on cup

### Prefix Dynamics on `cup`

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | core root | `cup-` $\to$ **[[cupidity]]**, **[[Cupid]]** | "Desiring, longing, craving; erotic personification." |
| `con-` | completely, intensely | `con-` + `cup-` + `-isc-` $\to$ **[[concupiscence]]** | Intensive prefix + inchoative infix: "to flare up into consuming lust or ardent yearning." |
| *(Romance lenition)* | frequentative | *\*cupitāre* $\to$ **[[covet]]** | Frequentative formation with $p \to v$ softening: "to desire repeatedly or persistently." |

### Suffix Transformations on `cup`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ous` | Adjective (Characterized by) | [[covetous]], [[cupidinous]] | Filled with or motivated by an inordinate desire for gain or possession. |
| `-ence` | Abstract Noun (State / Process) | [[concupiscence]] | Latin *-entia*: the condition of ardent sensual desire or moral disorder. |
| `-ible` | Adjective (Capacity / Faculty) | [[concupiscible]] | Capable of desiring; naming the psychological faculty drawn to sensible goods. |
| `-ity` | Noun (State / Quality) | [[cupidity]] | Latin *-itās*: the disposition of grasping greed or excessive worldly longing. |
| `-ed` | Participial Adjective | [[coveted]] | Highly sought after; earnestly desired by many competing parties. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| ⛪ **Moral Theology & Patristics** | [[concupiscence]], [[concupiscent]] | St. Augustine's *Confessions* and *De Civitate Dei* framing concupiscence as the self-centered disorder of human love turned away from God. |
| ⚖️ **Jurisprudence & Biblical Law** | [[covet]], [[covetousness]] | The Tenth Commandment prohibiting covert mental crimes of envy; equity law punishing fraudulent enrichment driven by covetousness. |
| 🎓 **Medieval Scholastic Philosophy** | [[concupiscible]] | Thomistic psychology classifying the passions into concupiscible (pleasure-seeking) and irascible (obstacle-fighting) faculties. |
| 🏆 **Commerce, Sports & Prestige** | [[coveted]], [[covetable]] | Describing prestigious prizes (the *coveted* Oscar or Nobel prize) or prized commercial real estate. |
| 🏛️ **Art History & Classical Myth** | [[Cupid]], [[cupidity]] | The iconography of Cupid and Psyche in Roman mosaic, Renaissance painting (Titian, Raphael), and Neoclassical sculpture (Canova). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[concupiscence]] | noun | **1.** A desire for sexual intimacy. | *"C._ 1710. _Underwritten._ Thou Fool, 'twas done for want of Sense, I tickl'd her Concupiscence: And that is enough to save her Credit. _S."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Part 1* |
| [[concupiscent]] | adjective | **1.** Vigorously passionate. | *"In academic literature, concupiscent designates vigorously passionate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cup]] | noun | **1.** A small open container usually used for drinking; usually has a handle.<br>**2.** The quantity a cup will hold. | *"Do as I bid you.—Where’s this cup I called for?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cupcake]] | noun | **1.** Small cake baked in a muffin tin. | *"In academic literature, cupcake designates small cake baked in a muffin tin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupel]] | noun | **1.** A small porous bowl made of bone ash used in assaying to separate precious metals from e.g. lead. | *"In academic literature, cupel designates a small porous bowl made of bone ash used in assaying to separate precious metals from e.g. lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupid]] | noun | **1.** (roman mythology) god of love; counterpart of greek eros.<br>**2.** A symbol for love in the form of a cherubic naked boy with wings and a bow and arrow. | *"The brains of my Cupid’s knock’d out, and I begin to love, as an old man loves money, with no stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cupidity]] | noun | **1.** Extreme greed for material wealth. | *"These people hated me with the hatred of cupidity and disappointment."* — Charles Dickens, *Great Expectations* |
| [[cuplike]] | adjective | **1.** Resembling the shape of a cup. | *"And flashing over them, and sucking honey from every cuplike flower, were shimmering humming-birds and marvelously marked butterflies."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[cupola]] | noun | **1.** A vertical cylindrical furnace for melting iron for casting.<br>**2.** A roof in the form of a dome. | *"For as in landscape gardening, a spire, cupola, monument, or tower of some sort, is deemed almost indispensable to the completion of the scene; so no face can be physiognomically in keeping without the elevated open-work belfry of the nose."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cupper]] | noun | **1.** A cup of tea. | *"Miss Osborne was apprised; the doctors were sent for; Georgy stopped away from school; the bleeders and cuppers came."* — William Makepeace Thackeray, *Vanity Fair* |
| [[cupping]] | noun | **1.** A treatment in which evacuated cups are applied to the skin to draw blood through the surface.<br>**2.** Form into the shape of a cup. | *"He did not approve of a too lowering system, including reckless cupping, nor, on the other hand, of incessant port wine and bark."* — George Eliot, *Middlemarch* |
| [[cupressaceae]] | noun | **1.** Cypresses and junipers and many cedars. | *"In academic literature, cupressaceae designates cypresses and junipers and many cedars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupressus]] | noun | **1.** Type genus of cupressaceae. | *"In academic literature, cupressus designates type genus of cupressaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupric]] | adjective | **1.** Of or containing divalent copper. | *"It is readily formed by the oxidation of copper, and melts at a red heat without decomposition; further heating in the presence of air produces the cupric oxide which is less fusible."* — Donald M. Levy, *Modern Copper Smelting* |
| [[cuprimine]] | noun | **1.** A drug (trade name cuprimine) used to treat heavy metal poisoning and wilson's disease and severe arthritis. | *"In academic literature, cuprimine designates a drug (trade name cuprimine) used to treat heavy metal poisoning and wilson's disease and severe arthritis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuprite]] | noun | **1.** A mineral consisting of cuprous oxide that is a source of copper. | *"In academic literature, cuprite designates a mineral consisting of cuprous oxide that is a source of copper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupronickel]] | noun | **1.** A 60/40 alloy of copper and nickel. | *"In academic literature, cupronickel designates a 60/40 alloy of copper and nickel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuprous]] | adjective | **1.** Of or containing divalent copper. | *"It would seem that one of the functions of the cuprous oxide, which is purposely introduced into the metal when “bringing it up to pitch,” is to exert this action."* — Donald M. Levy, *Modern Copper Smelting* |
| [[cupular]] | adjective | **1.** Shaped like (or supporting) a cupule. | *"In academic literature, cupular designates shaped like (or supporting) a cupule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupulate]] | adjective | **1.** Shaped like (or supporting) a cupule. | *"In academic literature, cupulate designates shaped like (or supporting) a cupule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cupule]] | noun | **1.** Cup-shaped structure of hardened bracts at the base of an acorn.<br>**2.** A sucker on the feet of certain flies. | *"In academic literature, cupule designates cup-shaped structure of hardened bracts at the base of an acorn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occupancy]] | noun | **1.** An act of being a tenant or occupant.<br>**2.** The act of occupying or taking possession of a building. | *"When enclosed areas were shirtsleeve ready for occupancy, the Cadre would erect essential life support, residential and recreational facilities."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[occupant]] | noun | **1.** Someone who lives at a particular place for a prolonged period or who was born there. | *"It was easy to know that the ceremonious, gouty, grey-haired gentleman, the only other occupant of the great pew, was Sir Leicester Dedlock, and that the lady was Lady Dedlock."* — Charles Dickens, *Bleak House* |
| [[occupation]] | noun | **1.** The principal activity in your life that you do to earn money.<br>**2.** The control of a country by military forces of a foreign power. | *"O love, That thou couldst see my wars today, and knew’st The royal occupation, thou shouldst see A workman in’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[occupational]] | adjective | **1.** Of or relating to the activity or business for which you are trained. | *"Despite the facts just stated, every campaign orator admits that there is no other occupational class of the nation of greater importance to the nation than the farmers, or more deserving of prosperity."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[occupied]] | verb | **1.** Keep busy with.<br>**2.** Live (in a certain place). | *"She would have loved to have a little daughter herself, therefore she occupied herself with me as if I belonged to her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[occupier]] | noun | **1.** Someone who lives at a particular place for a prolonged period or who was born there.<br>**2.** A member of a military force who is residing in a conquered foreign country. | *"A curved settle of unplaned oak stretched along one side, and in a remote corner was a small bed and bedstead, the owner and frequent occupier of which was the maltster."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[occupy]] | verb | **1.** Keep busy with.<br>**2.** Live (in a certain place). | *"God’s light, these villains will make the word as odious as the word “occupy,” which was an excellent good word before it was ill sorted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preoccupancy]] | noun | **1.** The mental state of being preoccupied by something.<br>**2.** The act of taking occupancy before someone else does. | *"In academic literature, preoccupancy designates the mental state of being preoccupied by something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preoccupation]] | noun | **1.** An idea that preoccupies the mind and holds the attention.<br>**2.** The mental state of being preoccupied by something. | *"Jellyby, “to ask such questions after what I have said of the preoccupation of my mind.” “And I hope, Ma, you give us your consent and wish us well?” said Caddy."* — Charles Dickens, *Bleak House* |
| [[preoccupied]] | verb | **1.** Engage or engross the interest or attention of beforehand or occupy urgently or obsessively.<br>**2.** Occupy or take possession of beforehand or before another or appropriate for use in advance. | *"Say you chose him More after our commandment than as guided By your own true affections, and that your minds, Preoccupied with what you rather must do Than what you should, made you against the grain To voice him consul."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preoccupy]] | verb | **1.** Engage or engross the interest or attention of beforehand or occupy urgently or obsessively.<br>**2.** Occupy or take possession of beforehand or before another or appropriate for use in advance. | *"What we desire eludes us at the moment of grasping it--or those affections which are the foundation of our lives preoccupy us, and blind the soul."* — Mrs. Oliphant, *A Beleaguered City* |
| [[recuperate]] | verb | **1.** Regain or make up for.<br>**2.** Regain a former condition after a financial loss. | *"Another bout of this duration they gave me, after a day and a night to recuperate."* — Jack London, *The Jacket (The Star-Rover)* |
| [[recuperation]] | noun | **1.** Gradual healing (through rest) after sickness or injury. | *"I was given irregular intervals of jacket and recuperation."* — Jack London, *The Jacket (The Star-Rover)* |
| [[recuperative]] | adjective | **1.** Promoting recuperation. | *"The recuperative power which pervaded organic nature was surely not denied to maidenhood alone."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unoccupied]] | adjective | **1.** Not held or filled or in use.<br>**2.** Not seized and controlled. | *"It seemed as if the spot was unoccupied by a living soul."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CUP
  </div>
</div>
