---
status: unread
type: root_dashboard
---
# Dashboard — sort
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sort-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“lot, fate, or kind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **sort** means lot, fate, or kind. It refers to casting lots, one's assigned fate, or a shared category. In English, this root forms words such as *bind*, *assort*, *assorted*, and *assortment*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: lot, fate, or kind
> The root **sort** means lot, fate, or kind. It refers to casting lots, one's assigned fate, or a shared category. In English, this root forms words such as *bind*, *assort*, *assorted*, and *assortment*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Lot, fate, or kind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *bind* and *assort*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sort** comes from a Latin word that means *"lot, fate, or kind"*.
  - At its core, it describes lot, fate, or kind.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **sort** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of lot, fate, or kind.
  - **Mental & Social**: How people experience, organize, or communicate about lot, fate, or kind.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bind**: An everyday English word showing the root's idea of *lot, fate, or kind*.
  - **Assort**: To arrange systematically in groups according to kind or quality.
  - **Assorted**: Miscellaneous.
  - **Assortment**: A miscellaneous collection of a large variety of different things.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sort</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sort** generates vocabulary through prefixation, nominalization, and Romance evolution:
> - **Base Noun & Verbs:**
>   - *sors, sortis* $	o$ Old French *sorte* $	o$ *sort* ("a category, kind, variety; to arrange systematically").
>   - *sort* + *-er* $	o$ *sorter* ("a machine or person that sorts").
>   - *sort* + *-able* $	o$ *sortable* ("capable of being sorted").
> - **Prefix Modifications:**
>   - *ad-* ("to") + *sort* $	o$ *assort*, *assorted*, *assortment* ("to distribute into groups of like kind; a collection of varied items").
>   - *con-* ("together") + *sors* $	o$ Latin *consors* $	o$ *consort* ("a spouse, companion; to associate with").
>   - *consors* + *-ium* $	o$ Latin *consortium* $	o$ *consortium* ("an association of companies or institutions").
>   - *re-* ("again, back") + *sort* $	o$ Old French *resortir* $	o$ *resort* ("to turn to for aid; a vacation destination").
> - **Divination Compounds:**
>   - *sors* + *legere* ("to read, collect") $	o$ Late Latin *sortilegium* $	o$ *sortilege* ("divination by casting lots; sorcery").
> - **Romance Military Formations:**
>   - French *sortie* (past participle of *sortir*) $	o$ *sortie* ("an attack made by troops coming out from a position of defense").

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
> - **Information Science & Sorting Algorithms:** *sort*, *sorter*, *sortable* (quicksort, bubblesort, database indexing).
> - **Commercial Enterprise & Finance:** *consortium*, *assortment* (syndicates financing infrastructure, retail inventory varieties).
> - **Royalty, Marriage & Association:** *consort*, *consorting* (Prince Consort, consorting with known felons).
> - **Leisure, Law & Survival Strategy:** *resort* (seaside holiday resorts, resorting to legal arbitration, court of last resort).
> - **Military Aviation & Combat:** *sortie* (fighter jets flying reconnaissance or strike sorties).
> - **Occult Divination:** *sortilege* (casting runes, dice, or lots for prophecy).

---

## 🔀 4. Prefix & Combining Dynamics on sort

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (to, according to) | `sort` | **[[assort]]** / **assortment** | Arranging items together according to kind or quality. |
| `con-` (together) | `sors` | **[[consort]]** / **consortium** | Bound together by a common lot $	o$ royal spouse or business alliance. |
| `re-` (back, again) | `sort` | **[[resort]]** | Turning back to a resource as one's final recourse or refuge. |
| `legere` (to read, pick) | `sors` | **[[sortilege]]** | Reading or interpreting cast lots $	o$ divination, sorcery. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Computer Science & Algorithms** | *sort*, *sorter*, *sortable* | Asymptotic complexity of sorting algorithms ($O(n \log n)$ merge sort). |
| ✈️ **Military Aviation & Warfare** | *sortie* | Tactical air commands logging hundreds of combat sorties over contested airspace. |
| 👑 **Monarchical Law & Constitutional History** | *consort* | The constitutional role of the Queen Consort in parliamentary monarchies. |
| 💼 **Corporate Finance & Infrastructure** | *consortium* | A multinational banking consortium underwriting a multibillion-dollar energy project. |
| 🛍️ **Supply Chain & Retail Merchandising** | *assortment*, *assorted* | Optimizing seasonal product assortment on retail grocery shelves. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[assort]] | verb | **1.** Keep company with; hang out with.<br>**2.** Arrange or order by classes or categories. | *"Never can there come fog too thick, never can there come mud and mire too deep, to assort with the groping and floundering condition which this High Court of Chancery, most pestilent of hoary sinners, holds this day in the sight of heaven and earth."* — Charles Dickens, *Bleak House* |
| [[assorted]] | verb | **1.** Keep company with; hang out with.<br>**2.** Arrange or order by classes or categories. | *"Falcon, steering straight for some chairs he had discovered, brought them for the ladies despite all the assorted objects on the floor."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[assortment]] | noun | **1.** A collection containing a variety of sorts of things.<br>**2.** The act of distributing things into classes or categories of the same type. | *"For example, a Ross Board is manufactured with an assortment of patterned surfaces."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[consort]] | noun | **1.** The husband or wife of a reigning monarch.<br>**2.** A family of similar musical instrument playing together. | *"Soon, at five o’clock, Please you, I’ll meet with you upon the mart, And afterward consort you till bedtime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consortium]] | noun | **1.** An association of companies for some definite purpose. | *"In academic literature, consortium designates an association of companies for some definite purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resort]] | noun | **1.** A hotel located in a resort area.<br>**2.** A frequently visited place. | *"Fie on thee, wretch. ’Tis pity that thou liv’st To walk where any honest men resort."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sort]] | noun | **1.** A category of things distinguished by some common characteristic or quality.<br>**2.** An approximate definition or example. | *"But do not so, I love thee in such sort, As thou being mine, mine is thy good report. 97 How like a winter hath my absence been From thee, the pleasure of the fleeting year!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sorted]] | verb | **1.** Examine in order to test suitability.<br>**2.** Arrange or order by classes or categories. | *"God’s light, these villains will make the word as odious as the word “occupy,” which was an excellent good word before it was ill sorted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sorter]] | noun | **1.** A clerk who sorts things (as letters at the post office).<br>**2.** A machine for sorting things (such as punched cards or letters) into classes. | *"But it is a ponderous task; no ordinary letter-sorter in the Post-office is equal to it."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[sortie]] | noun | **1.** A military action in which besieged troops burst forth from their position.<br>**2.** (military) an operational flight by a single aircraft (as in a military operation). | *"It's been fouled up already by this little sortie."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sortilege]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sort within the domain of Order.<br>**2.** A technical or specialized form exhibiting the properties of sort in systematic terminology. | *"In academic literature, sortilege designates pertaining to, derived from, or characteristic of latin sort within the domain of order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sorting]] | noun | **1.** An operation that segregates items into groups according to a specified criterion.<br>**2.** The basic cognitive process of arranging into classes or categories. | *"Jellyby, still opening her letters, casting her bright eyes smilingly over them, and sorting them as she spoke, “that you have a business example before you in your mother."* — Charles Dickens, *Bleak House* |
| [[sortition]] | noun | **1.** Making a chance decision by using lots (straws or pebbles etc.) that are thrown or drawn. | *"In academic literature, sortition designates making a chance decision by using lots (straws or pebbles etc.) that are thrown or drawn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsorted]] | adjective | **1.** Not arranged according to size.<br>**2.** Not categorized or sorted. | *"The purpose you undertake is dangerous, the friends you have named uncertain, the time itself unsorted, and your whole plot too light for the counterpoise of so great an opposition.” Say you so, say you so?"* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SORT
  </div>
</div>
