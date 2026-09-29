---
status: unread
type: root_dashboard
---
# Dashboard — magn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">magn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“great”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking at a large overflowing basket filled to the brim with goods.</span>
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

The root **magn** means great. It describes the quality, appearance, or condition of being great. In English, this root forms words such as *magnify*, *magnitude*, *magnificent*, and *magnate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: great
> The root **magn** means great. It describes the quality, appearance, or condition of being great. In English, this root forms words such as *magnify*, *magnitude*, *magnificent*, and *magnate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Great</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *magnify* and *magnitude*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **magn** comes from a Latin word that means *"great"*.
  - At its core, it describes the quality or state of being great.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **magn** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are great.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Magnify**: To make something appear larger than it is, especially with a lens or microscope.
  - **Magnitude**: The great size or extent of something.
  - **Magnificent**: Impressively beautiful, elaborate, or extravagant.
  - **Magnate**: A wealthy and influential person, especially in business.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">magn</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **magn** generates vocabulary through nominalization, factitives with *-ficāre*, and philosophical compounding:
> - **Base Adjectives, Nouns & Factitives:**
>   - *magnus* $	o$ *magnum* ("a large wine bottle holding 1.5 liters").
>   - *magnus* + *opus* ("work") $	o$ *magnum opus* ("a great work; the chief masterpiece of an artist").
>   - *magnus* + *facere* $	o$ *magnificāre* $	o$ *magnify*, *magnification*, *magnifier*.
>   - *magnitūdō* $	o$ *magnitude* ("great size or extent; numerical brightness of a star or seismic energy").
>   - *magnificus* $	o$ *magnificent*, *magnificence*, *magnificently*.
> - **Philosophical Compounding with *animus* ("soul, mind"):**
>   - *magnus* + *animus* $	o$ *magnanimus* $	o$ *magnanimous*, *magnanimity*, *magnanimously*.
> - **Industrial & Social Titles:**
>   - *magnās, magnātis* (from *magnus*) $	o$ *magnate* ("a wealthy and influential person, especially in business").
> - **Derivatives from Master Root *magister* (< *magis*):**
>   - *magister* $	o$ *magistrate*, *magistracy*, *magisterial*, *magisterially*.

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
> - **Optics, Microscopy & Cell Biology:** *magnify*, *magnification*, *magnifier* (electron microscope magnification, magnifying lenses).
> - **Seismology & Observational Astronomy:** *magnitude* (Richter earthquake magnitude, apparent stellar magnitude).
> - **Moral Character & Stoic Ethics:** *magnanimous*, *magnanimity* (magnanimous in victory, forgiving political foes).
> - **Corporate Industry & High Finance:** *magnate* (railroad magnates, shipping and media magnates).
> - **Constitutional Jurisprudence & Courts:** *magistrate*, *magisterial*, *magistracy* (presiding magistrates, magisterial tone).
> - **Fine Arts & Masterpieces:** *magnificent*, *magnificence*, *magnum opus* (magnificent cathedral frescoes, author's magnum opus).

---

## 🔀 4. Prefix & Combining Dynamics on magn

### Compound Structure Table

| Compound Element | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `facere` (to make) | `magnus` | **[[magnify]]** / **magnification** | To make something appear larger through optical glass or exaggeration. |
| `animus` (soul, spirit) | `magnus` | **[[magnanimous]]** / **magnanimity** | Possessing a generous, great, and noble spirit that rises above petty revenge. |
| `-tude` (abstract state) | `magnus` | **[[magnitude]]** | The quantitative measure of size, brightness of a star, or seismic force. |
| `opus` (work) | `magnum` | **magnum opus** | The single greatest artistic, literary, or musical masterpiece of a creator. |
| `magister` (master) | `magis` | **[[magistrate]]** / **magisterial** | A civil officer or judge administering public law with authoritative dignity. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Microscopy & Optical Physics** | *magnify*, *magnification*, *magnifier* | Resolving subcellular organelles under 100,000x transmission electron magnification. |
| 🌍 **Geophysics & Seismology** | *magnitude* | Calculating moment magnitude scale ($M_w$) based on seismic rupture energy. |
| ⚖️ **Judicial Courts & Common Law** | *magistrate*, *magistracy*, *magisterial* | Magistrates issuing search warrants and presiding over preliminary bail hearings. |
| 💼 **Corporate History & Political Economy** | *magnate* | Antitrust regulation breaking up Gilded Age standard oil and steel magnates. |
| 🧠 **Moral Philosophy & Leadership** | *magnanimous*, *magnanimity* | Lincoln's Second Inaugural ("With malice toward none, with charity for all") as magnanimity. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antimagnetic]] | adjective | **1.** Impervious to the effects of a magnetic field; resistant to magnetization. | *"In academic literature, antimagnetic designates impervious to the effects of a magnetic field; resistant to magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armagnac]] | noun | **1.** Dry brandy distilled in the armagnac district of france. | *"Have you perused the letters from the Pope, The Emperor, and the Earl of Armagnac?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demagnetisation]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetisation designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetise]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetise designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetization]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetization designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetize]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetize designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnanimity]] | noun | **1.** Liberality in bestowing gifts; extremely liberal and generous of spirit. | *"Methinks a woman of this valiant spirit Should, if a coward heard her speak these words, Infuse his breast with magnanimity And make him, naked, foil a man at arms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnanimous]] | adjective | **1.** Noble and generous in spirit.<br>**2.** Generous and understanding and tolerant. | *"Thou wilt be as valiant as the wrathful dove or most magnanimous mouse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnanimously]] | adverb | **1.** In a magnanimous manner. | *"Drink, Henry Fray—drink,” magnanimously said Jan Coggan, a person who held Saint-Simonian notions of share and share alike where liquor was concerned, as the vessel showed signs of approaching him in its gradual revolution among them."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[magnanimousness]] | noun | **1.** The quality of elevation of mind and exaltation of character or ideals or conduct. | *"In academic literature, magnanimousness designates the quality of elevation of mind and exaltation of character or ideals or conduct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnate]] | noun | **1.** A very wealthy or powerful businessman. | *"So there were changes at Chilmark, for the parish went to a hot-tempered Welshman with a wife and six children, and Wanhope was let to an American steel magnate, and Mrs."* — Anthony Pryde, *Nightfall* |
| [[magnesia]] | noun | **1.** A white solid mineral that occurs naturally as periclase; a source of magnesium. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[magnesite]] | noun | **1.** A white mineral consisting of magnesium carbonate; a source of magnesium. | *"The magnesite bricks are laid in dry magnesite powder, except near the tuyeres, where a mixture of magnesia and linseed oil is used."* — Donald M. Levy, *Modern Copper Smelting* |
| [[magnesium]] | noun | **1.** A light silver-white ductile bivalent metallic element; in pure form it burns with brilliant white flame; occurs naturally only in combination (as in magnesite and dolomite and carnallite and spinel and olivine). | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[magnet]] | noun | **1.** (physics) a device that attracts iron and produces a magnetic field.<br>**2.** A characteristic that provides pleasure and attracts. | *"Neither of these returnings was very pleasant or desirable: no magnet drew me to a given point, increasing in its strength of attraction the nearer I came."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[magnetic]] | adjective | **1.** Of or relating to or caused by magnetism.<br>**2.** Having the properties of a magnet; i.e. of attracting iron or steel. | *"M. de Clairon, who was by my side, murmured something about a magnetic current; but when I asked him sternly by what set in motion, his voice died away in his moustache."* — Mrs. Oliphant, *A Beleaguered City* |
| [[magnetically]] | adverb | **1.** By the use of magnetism.<br>**2.** As if by magnetism. | *"Good!” cried Ahab, with a wild approval in his tones; observing the hearty animation into which his unexpected question had so magnetically thrown them."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnetics]] | noun | **1.** The branch of science that studies magnetism. | *"In academic literature, magnetics designates the branch of science that studies magnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetisation]] | noun | **1.** The extent or degree to which something is magnetized.<br>**2.** The process that makes a substance magnetic (temporarily or permanently). | *"In academic literature, magnetisation designates the extent or degree to which something is magnetized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetise]] | verb | **1.** Attract strongly, as if with a magnet.<br>**2.** Make magnetic. | *"The effect of the discharge half-a-mile away was to _de_magnetise the core slightly."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[magnetised]] | verb | **1.** Attract strongly, as if with a magnet.<br>**2.** Make magnetic. | *"Indeed, it is not too much to say that the maritime commerce of the world was based upon the behaviour of that little piece of magnetised steel."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[magnetism]] | noun | **1.** Attraction for iron; associated with electric currents as well as magnets; characterized by fields of force.<br>**2.** The branch of science that studies magnetism. | *"But as ever before, the pagan harpooneers remained almost wholly unimpressed; or if impressed, it was only with a certain magnetism shot into their congenial hearts from inflexible Ahab’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnetite]] | noun | **1.** An oxide of iron that is strongly attracted by magnets. | *"In academic literature, magnetite designates an oxide of iron that is strongly attracted by magnets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetization]] | noun | **1.** The extent or degree to which something is magnetized.<br>**2.** The process that makes a substance magnetic (temporarily or permanently). | *"In academic literature, magnetization designates the extent or degree to which something is magnetized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetize]] | verb | **1.** Make magnetic.<br>**2.** Attract strongly, as if with a magnet. | *"Might and wrong combined, like iron magnetized, are endowed with irresistible attraction."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[magnetized]] | verb | **1.** Make magnetic.<br>**2.** Attract strongly, as if with a magnet. | *"Might and wrong combined, like iron magnetized, are endowed with irresistible attraction."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[magneto]] | noun | **1.** A small dynamo with a secondary winding that produces a high voltage enabling a spark to jump between the poles of a spark plug in a gasoline engine. | *"In academic literature, magneto designates a small dynamo with a secondary winding that produces a high voltage enabling a spark to jump between the poles of a spark plug in a gasoline engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetograph]] | noun | **1.** A scientific instrument that registers magnetic variations (especially variations of the earth's magnetic field). | *"In academic literature, magnetograph designates a scientific instrument that registers magnetic variations (especially variations of the earth's magnetic field)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetohydrodynamics]] | noun | **1.** The study of the interaction of magnetic fields and electrically conducting fluids (as plasma or molten metal). | *"In academic literature, magnetohydrodynamics designates the study of the interaction of magnetic fields and electrically conducting fluids (as plasma or molten metal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetometer]] | noun | **1.** A meter to compare strengths of magnetic fields. | *"In academic literature, magnetometer designates a meter to compare strengths of magnetic fields."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magneton]] | noun | **1.** A unit of magnetic moment of a molecular or atomic or subatomic particle. | *"In academic literature, magneton designates a unit of magnetic moment of a molecular or atomic or subatomic particle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetosphere]] | noun | **1.** The magnetic field of a planet; the volume around the planet in which charged particles are subject more to the planet's magnetic field than to the solar magnetic field. | *"In academic literature, magnetosphere designates the magnetic field of a planet; the volume around the planet in which charged particles are subject more to the planet's magnetic field than to the solar magnetic field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetron]] | noun | **1.** A diode vacuum tube in which the flow of electrons from a central cathode to a cylindrical anode is controlled by crossed magnetic and electric fields; used mainly in microwave oscillators. | *"In academic literature, magnetron designates a diode vacuum tube in which the flow of electrons from a central cathode to a cylindrical anode is controlled by crossed magnetic and electric fields; used mainly in microwave oscillators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnificat]] | noun | **1.** (luke) the canticle of the virgin mary (from luke 1:46 beginning `magnificat anima mea dominum'). | *"Well, this curate was only nineteen." And then, coming out into the fading light, she locked the north door behind her and went off whistling like a blackbird, if a blackbird could whistle the alto of Calkin's Magnificat in B flat. . . ."* — Anthony Pryde, *Nightfall* |
| [[magnification]] | noun | **1.** The act of expanding something in apparent size.<br>**2.** The ratio of the size of an image to the size of the object. | *"For by a Portuguese Catholic priest, this very idea of Jonah’s going to Nineveh via the Cape of Good Hope was advanced as a signal magnification of the general miracle."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnificence]] | noun | **1.** Splendid or imposing in size or appearance.<br>**2.** The quality of being magnificent or splendid or grand. | *"We cannot with such magnificence—in so rare—I know not what to say."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnificent]] | adjective | **1.** Characterized by grandeur. | *"A letter from the magnificent Armado."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnificently]] | adverb | **1.** Extremely well.<br>**2.** In an impressively beautiful manner. | *"Go away!” Sir Leicester has magnificently disengaged himself from the subject and retired into the sanctuary of his blue coat."* — Charles Dickens, *Bleak House* |
| [[magnifico]] | noun | **1.** A person of distinguished rank or appearance. | *"Omne ignotum pro magnifico" is the old epigram of Tacitus."* — T. R. Glover, *The Jesus of History* |
| [[magnified]] | verb | **1.** Increase in size, volume or significance.<br>**2.** To enlarge beyond bounds or the truth. | *"When my guardian left me, I turned my face away upon my couch and prayed to be forgiven if I, surrounded by such blessings, had magnified to myself the little trial that I had to undergo."* — Charles Dickens, *Bleak House* |
| [[magnifier]] | noun | **1.** A scientific instrument that magnifies an image. | *"In academic literature, magnifier designates a scientific instrument that magnifies an image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnify]] | verb | **1.** Increase in size, volume or significance.<br>**2.** To enlarge beyond bounds or the truth. | *"Men too often confound them: they should not be confounded: appearance should not be mistaken for truth; narrow human doctrines, that only tend to elate and magnify a few, should not be substituted for the world-redeeming creed of Christ."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[magniloquence]] | noun | **1.** High-flown style; excessive use of verbal ornamentation. | *"In academic literature, magniloquence designates high-flown style; excessive use of verbal ornamentation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magniloquent]] | adjective | **1.** Lofty in style. | *"In academic literature, magniloquent designates lofty in style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magniloquently]] | adverb | **1.** In a rhetorically grandiloquent manner. | *"In academic literature, magniloquently designates in a rhetorically grandiloquent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnitude]] | noun | **1.** The property of relative size or extent (whether large or small).<br>**2.** A number assigned to the ratio of two quantities; two quantities are of the same order of magnitude if one is less than 10 times as large as the other; the number of magnitudes that the quantities differ is specified to within a power of 10. | *"Any time you was pleased to appoint to-morrow morning, I was to show you the presses and things they belong to.” I said I would be ready at half-past six, and after she was gone, stood looking at the basket, quite lost in the magnitude of my trust."* — Charles Dickens, *Bleak House* |
| [[magnolia]] | noun | **1.** Dried bark of various magnolias; used in folk medicine.<br>**2.** Any shrub or tree of the genus magnolia; valued for their longevity and exquisite fragrant blooms. | *"No, I think not," he said reflectively; "nothing but that she, May, and Evelyn Leland were staying, by invitation, at Magnolia Hall."* — Martha Finley, *Elsie's Kith and Kin* |
| [[magnoliaceae]] | noun | **1.** Subclass magnoliidae: genera liriodendron, magnolia, and manglietia. | *"In academic literature, magnoliaceae designates subclass magnoliidae: genera liriodendron, magnolia, and manglietia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnoliidae]] | noun | **1.** A group of families of trees and shrubs and herbs having well-developed perianths and apocarpous ovaries and generally regarded as the most primitive extant flowering plants; contains 36 families including magnoliaceae and ranunculaceae; sometimes classified as a superorder. | *"In academic literature, magnoliidae designates a group of families of trees and shrubs and herbs having well-developed perianths and apocarpous ovaries and generally regarded as the most primitive extant flowering plants; contains 36 families including magnoliaceae and ranunculaceae; sometimes classified as a superorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnoliophyta]] | noun | **1.** Comprising flowering plants that produce seeds enclosed in an ovary; in some systems considered a class (angiospermae) and in others a division (magnoliophyta or anthophyta). | *"In academic literature, magnoliophyta designates comprising flowering plants that produce seeds enclosed in an ovary; in some systems considered a class (angiospermae) and in others a division (magnoliophyta or anthophyta)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnoliopsid]] | noun | **1.** Flowering plant with two cotyledons; the stem grows by deposit on its outside. | *"In academic literature, magnoliopsid designates flowering plant with two cotyledons; the stem grows by deposit on its outside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnoliopsida]] | noun | **1.** Comprising seed plants that produce an embryo with paired cotyledons and net-veined leaves; divided into six (not always well distinguished) subclasses (or superorders): magnoliidae and hamamelidae (considered primitive); caryophyllidae (an early and distinctive offshoot); and three more or less advanced groups: dilleniidae; rosidae; asteridae. | *"In academic literature, magnoliopsida designates comprising seed plants that produce an embryo with paired cotyledons and net-veined leaves; divided into six (not always well distinguished) subclasses (or superorders): magnoliidae and hamamelidae (considered primitive); caryophyllidae (an early and distinctive offshoot); and three more or less advanced groups: dilleniidae; rosidae; asteridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnum]] | noun | **1.** A large wine bottle for liquor or wine. | *"In either wing two champions fought; Redoubted Staig, who set at nought The wildest savage Tory; And Welsh who ne’er yet flinch’d his ground, High-wav’d his magnum-bonum round With Cyclopeian fury."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[nonmagnetic]] | adjective | **1.** Not capable of being magnetized. | *"In academic literature, nonmagnetic designates not capable of being magnetized."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Quantity]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MAGN
  </div>
</div>
