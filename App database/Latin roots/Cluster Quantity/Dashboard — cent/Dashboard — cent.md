---
status: unread
type: root_dashboard
---
# Dashboard — cent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“hundred”</span>
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

The root **cent** means hundred. It refers to the number one hundred or a one-hundredth portion. In English, this root forms words such as *bicentennial*, *centenarian*, *centenary*, and *centennial*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: hundred
> The root **cent** means hundred. It refers to the number one hundred or a one-hundredth portion. In English, this root forms words such as *bicentennial*, *centenarian*, *centenary*, and *centennial*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Hundred</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking at a large overflowing basket filled to the brim with goods.</mark>
> - **Everyday Connection**: Think of familiar words like *bicentennial* and *centenarian*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cent** comes from a Latin word that means *"hundred"*.
  - At its core, it describes hundred.

- **The Big Picture Idea**:
  - Picture looking at a large overflowing basket filled to the brim with goods.
  - Whenever you see **cent** in an English word, think of **amounts, quantities, and sizes**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of hundred.
  - **Mental & Social**: How people experience, organize, or communicate about hundred.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bicentennial**: Occurring every two hundred years, or celebrating a two-hundredth anniversary.
  - **Centenarian**: A person who is a hundred or more years old.
  - **Centenary**: The hundredth anniversary of a significant event.
  - **Centennial**: Relating to a hundredth anniversary.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cent</mark>, think of <mark class="hl-def">amounts, quantities, and sizes</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cent** generates vocabulary through nominalization, metric prefixation, and chronological compounding:
> - **Base Nouns & Metric Units:**
>   - *centum* $	o$ *cent* ("hundredth of a dollar or euro").
>   - *centēsimus* + *metrum* $	o$ *centimeter* ("one-hundredth of a meter").
> - **Chronological & Anniversary Formations:**
>   - *centum* $	o$ *century* ("a period of one hundred years").
>   - *centum* + *annus* ("year") $	o$ *centennial* ("relating to a hundredth anniversary"), *centenary*, *bicentennial* ("two-hundredth anniversary").
>   - *centum* + *annus* $	o$ *centenarian* ("a person who has reached the age of 100").
> - **Proportional & Statistical Formations:**
>   - *per* ("by") + *centum* $	o$ *percent*, *percentage*, *percentile* ("by the hundred; rate per hundred").
> - **Military & Biological Formations:**
>   - *centuriō* $	o$ *centurion* ("commander of a century in the ancient Roman army").
>   - *centum* + *pēs, pedis* ("foot") $	o$ *centipede* ("predatory arthropod with many legs").

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
> - **Commerce, Banking & Currency:** *cent*, *percent*, *percentage* (interest rates, discounts, exchange rates).
> - **Historiography & Anniversaries:** *century*, *centennial*, *bicentennial*, *centenary* (twentieth century, constitutional bicentennials).
> - **Military History:** *centurion*, *century* (Roman legions, Roman assembly centuries).
> - **Metric System & Measurement:** *centimeter*, *centiliter* (metric SI spatial scales).
> - **Gerontology & Demographics:** *centenarian* (Blue Zone longevity, individuals aged 100+).
> - **Entomology & Zoology:** *centipede* (Chilopoda multi-legged predatory arthropods).

---

## 🔀 4. Prefix & Combining Dynamics on cent

### Prefix & Compound Matrix

| Affix / Compound | Form | Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `per-` (by, through) | Prefix | **[[percent]]** / **percentage** | Indexed directly per one hundred units of a whole ($X\%$). |
| `bi-` (two) | Prefix | **[[bicentennial]]** | Celebrating a milestone of two hundred years ($2 	imes 100$). |
| `annus` (year) | Compound | **[[centennial]]** / **centenarian** | Marked by the completion of one hundred solar orbits. |
| `pēs` (foot) | Compound | **centipede** | An arthropod traditionally stylized as possessing one hundred feet. |
| `metrum` (measure) | Compound | **[[centimeter]]** | A metric unit of length equal to one-hundredth of a meter ($10^{-2}	ext{ m}$). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📊 **Inferential Statistics & Finance** | *percent*, *percentage*, *percentile* | Expressing statistical percentiles and commercial loan percentage yields. |
| 🏛️ **Classical Roman & Military History** | *centurion*, *century* | Legionary tactical maneuvers led by primus pilus chief centurions. |
| 📏 **Metrology & Experimental Physics** | *centimeter* | SI metric spatial measurements, cgs (centimeter-gram-second) units. |
| 🧬 **Demography & Gerontology** | *centenarian*, *century* | Demographic studies of exceptional centenarian lifespan longevity. |
| 🌍 **National Commemorations** | *centennial*, *bicentennial* | Celebrating national independence centennials and sesquicentennials. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accent]] | noun | **1.** Distinctive manner of oral expression.<br>**2.** Special importance or significance. | *"Your accent is something finer than you could purchase in so removed a dwelling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accented]] | verb | **1.** To stress, single out as important.<br>**2.** Put stress on; utter with an accent. | *"The shadowy lines became accented by twin rows of flickering fire, the rear jets seen with a blurred halo of mist round each of them, the halo crawling feebly within itself, tormented by a feeble wind."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[accenting]] | noun | **1.** The act of giving special importance or significance to something.<br>**2.** To stress, single out as important. | *"Han-nah!” again called Squire Newcome, separating the two syllables by a pause of deliberation, and strongly accenting the last syllable,--a habit of his with all proper names."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[accentor]] | noun | **1.** Small sparrow-like songbird of mountainous regions of eurasia. | *"In academic literature, accentor designates small sparrow-like songbird of mountainous regions of eurasia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accentual]] | adjective | **1.** Of or pertaining to accent or stress.<br>**2.** (of verse) having a metric system based on stress rather than syllables or quantity. | *"In academic literature, accentual designates of or pertaining to accent or stress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accentuate]] | verb | **1.** To stress, single out as important.<br>**2.** Put stress on; utter with an accent. | *"What are American dry-goods?” asked the duchess, raising her large hands in wonder and accentuating the verb."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[accentuation]] | noun | **1.** The use or application of an accent; the relative prominence of syllables in a phrase or utterance.<br>**2.** The act of giving special importance or significance to something. | *"It was a sonorous, harmonious, and flexible dialect, the vowels seeming to admit of very varied accentuation."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[ascent]] | noun | **1.** An upward slope or grade (as in a road).<br>**2.** A movement upward. | *"At her third ascent the rick suddenly brightened with the brazen glare of shining majolica—every knot in every straw was visible."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[bicentennial]] | noun | **1.** The 200th anniversary (or the celebration of it).<br>**2.** Of or relating to or completing a period of 200 years. | *"In academic literature, bicentennial designates the 200th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cent]] | noun | **1.** A fractional monetary unit of several countries.<br>**2.** A coin worth one-hundredth of the value of the basic unit. | *"She was without a cent in the world."* — Classic Author, *The wonders of prayer* |
| [[cental]] | noun | **1.** A united states unit of weight equivalent to 100 pounds. | *"In academic literature, cental designates a united states unit of weight equivalent to 100 pounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centare]] | noun | **1.** A centare is 1/100th of an are. | *"In academic literature, centare designates a centare is 1/100th of an are."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centas]] | noun | **1.** 100 centas equal 1 litas in lithuania. | *"In academic literature, centas designates 100 centas equal 1 litas in lithuania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centaur]] | noun | **1.** (classical mythology) a mythical being that is half man and half horse.<br>**2.** A conspicuous constellation in the southern hemisphere near the southern cross. | *"Go bear it to the Centaur, where we host, And stay there, Dromio, till I come to thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centaurea]] | noun | **1.** Knapweed; star thistle. | *"Leaf of _Centaurea nigra_ with brand. 〃 68."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[centaurium]] | noun | **1.** Genus of low-growing herbs mostly of northern hemisphere having flowers with protruding spirally twisted anthers. | *"In academic literature, centaurium designates genus of low-growing herbs mostly of northern hemisphere having flowers with protruding spirally twisted anthers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centaurus]] | noun | **1.** A conspicuous constellation in the southern hemisphere near the southern cross. | *"In academic literature, centaurus designates a conspicuous constellation in the southern hemisphere near the southern cross."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centaury]] | noun | **1.** Any of various plants of the genus centaurium.<br>**2.** Any plant of the genus centaurea. | *"In academic literature, centaury designates any of various plants of the genus centaurium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centavo]] | noun | **1.** A fractional monetary unit of several countries: el salvador and sao tome and principe and brazil and argentina and bolivia and colombia and cuba and the dominican republic and ecuador and el salvador and guatemala and honduras and mexico and nicaragua and peru and the philippines and portugal. | *"Liberia │Dollar │Gold │ 1 00│ Mexico │do │Silver │ 89.4│Peso or dollar │ │ │ │ 5, 10, 25, and │ │ │ │ 50 centavo."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[centenarian]] | noun | **1.** Someone who is at least 100 years old.<br>**2.** Being at least 100 years old. | *"Experts estimate that there are thirty to fifty thousand living centenarians, up from the 1980 estimate of fifteen thousand."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[centenary]] | noun | **1.** The 100th anniversary (or the celebration of it).<br>**2.** Of or relating to or completing a period of 100 years. | *"In 1916, the centenary of the beginning of savings banks in this country, a nation-wide propaganda was undertaken by the American Bankers' Association for the encouragement of savings. § 4. #Investment banking#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centennial]] | noun | **1.** The 100th anniversary (or the celebration of it).<br>**2.** Of or relating to or completing a period of 100 years. | *"Hour is ripe to recall unnumbered tribulations, sacrifices heroically endured by the dawn-breakers, culminating in Bahá'u'lláh's afflictive imprisonment in Síyáh _Ch_ál, Centennial of which is now approaching."* — Effendi Shoghi, *Citadel of Faith* |
| [[centennially]] | adverb | **1.** Every hundred years; once in a century. | *"In academic literature, centennially designates every hundred years; once in a century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[center]] | noun | **1.** An area that is approximately central within some larger region.<br>**2.** The piece of ground in the outfield directly ahead of the catcher. | *"He that will all the treasure know o’ th’ earth Must know the center too; he that will fish For my least minnow, let him lead his line To catch one at my heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centerboard]] | noun | **1.** A retractable fin keel used on sailboats to prevent drifting to leeward. | *"In academic literature, centerboard designates a retractable fin keel used on sailboats to prevent drifting to leeward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centered]] | verb | **1.** Center upon.<br>**2.** Direct one's attention on something. | *"But this difference is readily discovered in the impressions made upon us by their writings, namely that Hoelderlin's Weltschmerz is absolutely naive and unconscious, while that of Lenau is at all times self-conscious and self-centered."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[centerfield]] | noun | **1.** The piece of ground in the outfield directly ahead of the catcher.<br>**2.** The fielding position of the player on a baseball team who is expected to field balls in the central third of the outfield. | *"In academic literature, centerfield designates the piece of ground in the outfield directly ahead of the catcher."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centerfielder]] | noun | **1.** The person who plays center field. | *"In academic literature, centerfielder designates the person who plays center field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centerfold]] | noun | **1.** A magazine center spread; especially a foldout of a large photograph or map or other feature. | *"In academic literature, centerfold designates a magazine center spread; especially a foldout of a large photograph or map or other feature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centering]] | noun | **1.** The concentration of attention or energy on something.<br>**2.** (american football) putting the ball in play by passing it (between the legs) to a back. | *"In academic literature, centering designates the concentration of attention or energy on something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centerline]] | noun | **1.** A line that bisects a plane figure. | *"In academic literature, centerline designates a line that bisects a plane figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centerpiece]] | noun | **1.** The central or most important feature.<br>**2.** Something placed at the center of something else (as on a table). | *"Major Spencer asked Clifton Sloane, an Improver who drove the milk to the Carmody cheese factory, if it was true that everybody would have to have his milk-stand hand-painted next summer and keep an embroidered centerpiece on it."* — L. M. Montgomery, *Anne of Avonlea* |
| [[centesimal]] | adjective | **1.** Relating to or divided into hundredths.<br>**2.** The ordinal number of one hundred in counting order. | *"In academic literature, centesimal designates relating to or divided into hundredths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centesimo]] | noun | **1.** A fractional monetary unit of several countries: panama and italy and uruguay and chile. | *"In academic literature, centesimo designates a fractional monetary unit of several countries: panama and italy and uruguay and chile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centesis]] | noun | **1.** (surgery) the act of puncturing a body cavity or organ with a hollow needle in order to draw out fluid. | *"In academic literature, centesis designates (surgery) the act of puncturing a body cavity or organ with a hollow needle in order to draw out fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centigrade]] | adjective | **1.** Of or relating to a temperature scale on which the freezing point of water is 0 degrees and the boiling point of water is 100 degrees. | *"The cold of interstellar space, thousands of degrees below freezing point or the absolute zero of Fahrenheit, Centigrade or Réaumur: the incipient intimations of proximate dawn."* — James Joyce, *Ulysses* |
| [[centile]] | noun | **1.** (statistics) any of the 99 numbered points that divide an ordered set of scores into 100 parts each of which contains one-hundredth of the total. | *"In academic literature, centile designates (statistics) any of the 99 numbered points that divide an ordered set of scores into 100 parts each of which contains one-hundredth of the total."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centiliter]] | noun | **1.** A metric unit of volume equal to one hundredth of a liter. | *"In academic literature, centiliter designates a metric unit of volume equal to one hundredth of a liter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centilitre]] | noun | **1.** A metric unit of volume equal to one hundredth of a liter. | *"In academic literature, centilitre designates a metric unit of volume equal to one hundredth of a liter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centime]] | noun | **1.** A fractional monetary unit of several countries: france and algeria and belgium and burkina faso and burundi and cameroon and chad and the congo and gabon and haiti and the ivory coast and luxembourg and mali and morocco and niger and rwanda and senegal and switzerland and togo.<br>**2.** A coin worth one-hundredth of the value of the basic unit. | *"For many centimes there has not been a more remarkable testimony of unfaltering trust in the faithfulness of God in supplying human wants, than is found in the life and labor of George Muller and his Orphan Home, in Bristol, England."* — Classic Author, *The wonders of prayer* |
| [[centimeter]] | noun | **1.** A metric unit of length equal to one hundredth of a meter. | *"As Brad drew his legs up through the hatchway a searing blast struck the frame, missing him by centimeters."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[centimetre]] | noun | **1.** A metric unit of length equal to one hundredth of a meter. | *"And if then we reckon how many minutes it takes to accumulate a cubic centimetre of helium we can easily reckon how many atoms go to the cubic centimetre."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[centimo]] | noun | **1.** A fractional monetary unit of venezuela and costa rica and equatorial guinea and paraguay and spain. | *"In academic literature, centimo designates a fractional monetary unit of venezuela and costa rica and equatorial guinea and paraguay and spain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centipede]] | noun | **1.** Chiefly nocturnal predacious arthropod having a flattened body of 15 to 173 segments each with a pair of legs, the foremost pair being modified as prehensors. | *"Ye see an old man cut down to the stump; leaning on a shivered lance; propped up on a lonely foot. ’Tis Ahab—his body’s part; but Ahab’s soul’s a centipede, that moves upon a hundred legs."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[centner]] | noun | **1.** A unit of weight equal to 100 kilograms.<br>**2.** In some european countries: a unit of weight equivalent to 50 kilograms. | *"In academic literature, centner designates a unit of weight equal to 100 kilograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[central]] | noun | **1.** A workplace that serves as a telecommunications facility where lines from telephones can be connected together to permit communication.<br>**2.** Serving as an essential component. | *"They were about to disperse, when a smart footstep, entering the porch and coming up the central passage, arrested their attention."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[centralisation]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"In academic literature, centralisation designates the act of consolidating power under a central control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralise]] | verb | **1.** Make central. | *"In academic literature, centralise designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralised]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"In academic literature, centralised designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralising]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"In academic literature, centralising designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralism]] | noun | **1.** The political policy of concentrating power in a central organization. | *"In academic literature, centralism designates the political policy of concentrating power in a central organization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralist]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralist designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralistic]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralistic designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrality]] | noun | **1.** The property of being central. | *"In academic literature, centrality designates the property of being central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralization]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"By this means the reserves of the several district banks may be "piped together" and thus be practically made into one central bank under governmental control, altho centralization was in outward form avoided by the bill."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralize]] | verb | **1.** Make central. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centralized]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralizing]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centrally]] | adverb | **1.** In or near or toward a center or according to a central role or function. | *"In academic literature, centrally designates in or near or toward a center or according to a central role or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centranthus]] | noun | **1.** Genus of southern european herbs and subshrubs. | *"In academic literature, centranthus designates genus of southern european herbs and subshrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchid]] | noun | **1.** Small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed. | *"In academic literature, centrarchid designates small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchidae]] | noun | **1.** Sunfish family. | *"In academic literature, centrarchidae designates sunfish family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centre]] | noun | **1.** A low-lying region in central france.<br>**2.** An area that is approximately central within some larger region. | *"Take this from this, if this be otherwise. [_Points to his head and shoulder._] If circumstances lead me, I will find Where truth is hid, though it were hid indeed Within the centre."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centreboard]] | noun | **1.** A retractable fin keel used on sailboats to prevent drifting to leeward. | *"In academic literature, centreboard designates a retractable fin keel used on sailboats to prevent drifting to leeward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrefold]] | noun | **1.** A magazine center spread; especially a foldout of a large photograph or map or other feature. | *"In academic literature, centrefold designates a magazine center spread; especially a foldout of a large photograph or map or other feature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrepiece]] | noun | **1.** The central or most important feature.<br>**2.** Something placed at the center of something else (as on a table). | *"Even the cabin table itself had been knocked into kindling-wood; and the cabin mess dined off the broad head of an oil-butt, lashed down to the floor for a centrepiece."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[centrex]] | noun | **1.** (central exchange) a kind of telephone exchange. | *"In academic literature, centrex designates (central exchange) a kind of telephone exchange."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centric]] | adjective | **1.** Having or situated at or near a center. | *"In academic literature, centric designates having or situated at or near a center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrical]] | adjective | **1.** Having or situated at or near a center. | *"It is time, then,” said Fitzurse, “to draw our party to a head, either at York, or some other centrical place."* — Walter Scott, *Ivanhoe: A Romance* |
| [[centrifugal]] | adjective | **1.** Tending to move away from a center.<br>**2.** Tending away from centralization, as of authority. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centrifugate]] | verb | **1.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifugate designates rotate at very high speed in order to separate the liquids from the solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifugation]] | noun | **1.** The process of separating substances of different densities by the use of a centrifuge. | *"In academic literature, centrifugation designates the process of separating substances of different densities by the use of a centrifuge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifuge]] | noun | **1.** An apparatus that uses centrifugal force to separate particles from a suspension.<br>**2.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifuge designates an apparatus that uses centrifugal force to separate particles from a suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centriole]] | noun | **1.** One of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis. | *"In academic literature, centriole designates one of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centripetal]] | adjective | **1.** Tending to move toward a center.<br>**2.** Tending to unify. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centriscidae]] | noun | **1.** Shrimpfishes. | *"In academic literature, centriscidae designates shrimpfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrism]] | noun | **1.** A political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action. | *"In academic literature, centrism designates a political philosophy of avoiding the extremes of left and right by taking a moderate position or course of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrist]] | noun | **1.** A person who takes a position in the political center.<br>**2.** Supporting or pursuing a course of action that is neither liberal nor conservative. | *"In academic literature, centrist designates a person who takes a position in the political center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrocercus]] | noun | **1.** Sage grouse. | *"In academic literature, centrocercus designates sage grouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroid]] | noun | **1.** The center of mass of an object of uniform density. | *"In academic literature, centroid designates the center of mass of an object of uniform density."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroidal]] | adjective | **1.** Of or relating to (especially passing through) a centroid. | *"In academic literature, centroidal designates of or relating to (especially passing through) a centroid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrolobium]] | noun | **1.** A genus of centrolobium. | *"In academic literature, centrolobium designates a genus of centrolobium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromere]] | noun | **1.** A specialized condensed region of each chromosome that appears during mitosis where the chromatids are held together to form an x shape. | *"In academic literature, centromere designates a specialized condensed region of each chromosome that appears during mitosis where the chromatids are held together to form an x shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromeric]] | adjective | **1.** Pertaining to the dense specialized portion of a chromosome to which the spindle attaches during mitosis. | *"In academic literature, centromeric designates pertaining to the dense specialized portion of a chromosome to which the spindle attaches during mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomidae]] | noun | **1.** A family of fish or the order perciformes including robalos. | *"In academic literature, centropomidae designates a family of fish or the order perciformes including robalos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomus]] | noun | **1.** Type genus of the centropomidae: snooks. | *"In academic literature, centropomus designates type genus of the centropomidae: snooks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropristis]] | noun | **1.** Sea basses. | *"In academic literature, centropristis designates sea basses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropus]] | noun | **1.** A genus of cuculidae. | *"In academic literature, centropus designates a genus of cuculidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosema]] | noun | **1.** A genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers. | *"In academic literature, centrosema designates a genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosome]] | noun | **1.** Small region of cytoplasm adjacent to the nucleus; contains the centrioles and serves to organize the microtubules. | *"In academic literature, centrosome designates small region of cytoplasm adjacent to the nucleus; contains the centrioles and serves to organize the microtubules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosomic]] | adjective | **1.** Of or relating to a centrosome. | *"In academic literature, centrosomic designates of or relating to a centrosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrospermae]] | noun | **1.** Used in former classification systems; approximately synonymous with order caryophyllales. | *"In academic literature, centrospermae designates used in former classification systems; approximately synonymous with order caryophyllales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosymmetric]] | adjective | **1.** Having a symmetrical arrangement of radiating parts about a central point. | *"In academic literature, centrosymmetric designates having a symmetrical arrangement of radiating parts about a central point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrum]] | noun | **1.** The main body of a vertebra. | *"In academic literature, centrum designates the main body of a vertebra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centunculus]] | noun | **1.** A dicotyledonous genus of the family primulaceae. | *"In academic literature, centunculus designates a dicotyledonous genus of the family primulaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centurion]] | noun | **1.** (ancient rome) the leader of 100 soldiers. | *"Only a centurion and a handful of soldiers are with Him."* — Jack London, *The Jacket (The Star-Rover)* |
| [[century]] | noun | **1.** A period of 100 years.<br>**2.** Ten 10s. | *"A century send forth; Search every acre in the high-grown field, And bring him to our eye. [_Exit an Officer._] What can man’s wisdom In the restoring his bereaved sense, He that helps him take all my outward worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[concenter]] | verb | **1.** Bring into focus or alignment; to converge or cause to converge; of ideas or emotions. | *"In academic literature, concenter designates bring into focus or alignment; to converge or cause to converge; of ideas or emotions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concentrate]] | noun | **1.** The desired mineral that is left after impurities have been removed from mined ore.<br>**2.** A concentrated form of a foodstuff; the bulk is reduced by removing water. | *"But I have so much to think of, in connexion with Borrioboola-Gha and it is so necessary I should concentrate myself that there is my remedy, you see.” As Caddy gave me a glance of entreaty, and as Mrs."* — Charles Dickens, *Bleak House* |
| [[concentrated]] | verb | **1.** Make denser, stronger, or purer.<br>**2.** Direct one's attention on something. | *"It is thoughtful, gloomy, concentrated."* — Charles Dickens, *Bleak House* |
| [[concentration]] | noun | **1.** The strength of a solution; number of molecules of a substance in a given volume.<br>**2.** The spatial property of being crowded together. | *"But though I liked him more and more the better I knew him, I still felt more and more how much it was to be regretted that he had been educated in no habits of application and concentration."* — Charles Dickens, *Bleak House* |
| [[concentre]] | verb | **1.** Bring into focus or alignment; to converge or cause to converge; of ideas or emotions. | *"In danger, the president may concentre to a point every effort of the continent."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[concentric]] | adjective | **1.** Having a common center. | *"It is demonstrable that the scratches are going everywhere impartially and it is only your candle which produces the flattering illusion of a concentric arrangement, its light falling with an exclusive optical selection."* — George Eliot, *Middlemarch* |
| [[concentrical]] | adjective | **1.** Having a common center. | *"In academic literature, concentrical designates having a common center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concentricity]] | noun | **1.** The quality of having the same center (as circles inside one another). | *"In academic literature, concentricity designates the quality of having the same center (as circles inside one another)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decent]] | adjective | **1.** Socially or conventionally correct; refined or virtuous.<br>**2.** According with custom or propriety. | *"It is a black, dilapidated street, avoided by all decent people, where the crazy houses were seized upon, when their decay was far advanced, by some bold vagrants who after establishing their own possession took to letting them out in lodgings."* — Charles Dickens, *Bleak House* |
| [[decentalisation]] | noun | **1.** The social process in which population and industry moves from urban centers to outlying districts. | *"In academic literature, decentalisation designates the social process in which population and industry moves from urban centers to outlying districts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decently]] | adverb | **1.** In a decent manner.<br>**2.** In the right manner. | *"Then do you As once did Meleager and the boar, Break comely out before him; like true lovers, Cast yourselves in a body decently, And sweetly, by a figure, trace and turn, boys."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decentralisation]] | noun | **1.** The spread of power away from the center to local branches or governments. | *"In academic literature, decentralisation designates the spread of power away from the center to local branches or governments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralise]] | verb | **1.** Make less central. | *"In academic literature, decentralise designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralised]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"In academic literature, decentralised designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralising]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralising designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralization]] | noun | **1.** The social process in which population and industry moves from urban centers to outlying districts.<br>**2.** The spread of power away from the center to local branches or governments. | *"In one important respect, however, it is different; it provides for more decentralization of control and of reserves than did the Aldrich plan."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralize]] | verb | **1.** Make less central. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralized]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralizing]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralizing designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconcentrate]] | verb | **1.** Make less central. | *"In academic literature, deconcentrate designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicentra]] | noun | **1.** North american and asian herbs with divided leaves and irregular flowers. | *"In academic literature, dicentra designates north american and asian herbs with divided leaves and irregular flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disincentive]] | noun | **1.** A negative motivational influence. | *"In academic literature, disincentive designates a negative motivational influence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incentive]] | noun | **1.** A positive motivational influence.<br>**2.** An additional payment (or other remuneration) to employees as a means of increasing output. | *"But the understood incentive on the woman’s part was wanting here."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[indecent]] | adjective | **1.** Not in keeping with accepted standards of what is right or proper in polite society.<br>**2.** Offensive to good taste especially in sexual matters. | *"Casaubon seemed to be the officiating clergyman, about whom it would be indecent to make remarks."* — George Eliot, *Middlemarch* |
| [[indecently]] | adverb | **1.** In an indecent manner. | *"Unspeakable messages he telephoned mentally to Miss Dunn at an address in D’Olier street while he presented himself indecently to the instrument in the callbox."* — James Joyce, *Ulysses* |
| [[nonconcentric]] | adjective | **1.** Not having a common center; not concentric. | *"In academic literature, nonconcentric designates not having a common center; not concentric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[percent]] | noun | **1.** A proportion in relation to a whole (which is usually the amount per hundred). | *"I'm setting the thruster to cut in at twenty percent as soon as we're back in and slam the hatch."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[percentage]] | noun | **1.** A proportion in relation to a whole (which is usually the amount per hundred).<br>**2.** Assets belonging to or due to or contributed by an individual person or group. | *"I don’t want to pay too large a price for my friend, but I want you to have your proper percentage and be remunerated for your loss of time."* — Charles Dickens, *Bleak House* |
| [[percentile]] | noun | **1.** (statistics) any of the 99 numbered points that divide an ordered set of scores into 100 parts each of which contains one-hundredth of the total. | *"In academic literature, percentile designates (statistics) any of the 99 numbered points that divide an ordered set of scores into 100 parts each of which contains one-hundredth of the total."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precentor]] | noun | **1.** The musical director of a choir. | *"It stood on the left as one entered from High Street, and it had the usual high pulpit at its farther end, with a precentor's desk beneath it, and the usual deep gallery supported on metal pillars running round three of its four sides."* — John Cairns, *Principal Cairns* |
| [[precentorship]] | noun | **1.** The position of precentor. | *"In academic literature, precentorship designates the position of precentor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recent]] | noun | **1.** Approximately the last 10,000 years.<br>**2.** New. | *"In the middle of this agitating scene Mäzli arrived, perfectly happy and filled with her recent experiences."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[recently]] | adverb | **1.** In the recent past. | *"Now it was Ada, now one of my old Reading friends from whom I could not believe I had so recently parted."* — Charles Dickens, *Bleak House* |
| [[recentness]] | noun | **1.** A time immediately before the present.<br>**2.** The property of having happened or appeared not long ago. | *"In academic literature, recentness designates a time immediately before the present."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifugation]] | noun | **1.** Centrifugation at very high speeds. | *"In academic literature, ultracentrifugation designates centrifugation at very high speeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifuge]] | noun | **1.** A high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins.<br>**2.** Subject to the action of an ultracentrifuge. | *"In academic literature, ultracentrifuge designates a high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaccented]] | adjective | **1.** Used of syllables.<br>**2.** (used of vowels or syllables) pronounced with little or no stress. | *"In academic literature, unaccented designates used of syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CENT
  </div>
</div>
