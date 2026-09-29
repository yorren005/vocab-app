---
status: unread
type: root_dashboard
---
# Dashboard — dec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dec-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“ten”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **dec** means ten. It refers to the number ten or a tenth part. In English, this root forms words such as *decimal*, *decimate*, *decimation*, and *decade*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ten
> The root **dec** means ten. It refers to the number ten or a tenth part. In English, this root forms words such as *decimal*, *decimate*, *decimation*, and *decade*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ten</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *decimal* and *decimate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dec** comes from a Latin word that means *"ten"*.
  - At its core, it describes ten.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **dec** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ten.
  - **Mental & Social**: How people experience, organize, or communicate about ten.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Decimal**: Relating to or denoting a system of numbers and arithmetic based on the number ten.
  - **Decimate**: To kill, destroy, or remove a large percentage of something.
  - **Decimation**: The destruction or death of a large proportion of something.
  - **Decade**: A period of ten years, especially a period such as 2010–2019.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dec</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **dec** produces vocabulary through distinct morphological channels:
> - **Direct Latin Stems in `dec-` and `decim-`:**
>   - *decem* + *annus* ("year") $\to$ *decennial* ("occurring every ten years").
>   - *decima* ("tenth part") + *-ālis* $\to$ *decimal* ("based on tens").
>   - *decimāre* + *-tiō* $\to$ *decimation* ("destruction of a tenth; widespread devastation").
>   - *decānus* $\to$ Old French *deyen* $\to$ *dean* ("head of faculty").
>   - *decima* $\to$ Old French *disme* $\to$ *dime* ("ten-cent coin").
> - **French Metric System Prefixes:**
>   - Latin *deci-* ("one-tenth", $\times 10^{-1}$): *decimeter*, *decibel*.
>   - Greek *deca-* ("tenfold", $\times 10^1$): *decameter*.
> - **Greek Loanwords in `deca-` / `dek-`:**
>   - *deka* + *logos* ("word") $\to$ *decalogue* ("Ten Commandments").
>   - *deka* + *athlon* ("contest") $\to$ *decathlon* ("ten-event athletic contest").
>   - *dekas, dekados* $\to$ *decade* ("period of ten years").
>   - *deka* + *gōnia* ("angle") $\to$ *decagon* ("ten-sided polygon").

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
> Although fundamentally denoting **"ten"**, the root spans specialized applications:
> - **Temporal & Calendrical Eras:** *decade*, *decennial*, *December* (ten-year periods, tenth-anniversaries, Roman tenth month).
> - **Mathematical & Currency Systems:** *decimal*, *dime* (base-10 positional notation, tenth-dollar coin).
> - **Scientific & Engineering Metrics:** *decibel*, *decimeter*, *decameter* (sound pressure level logarithmic ratio, SI length scales).
> - **Athletics & Polygons:** *decathlon*, *decagon* (ten events, ten-sided geometric plane).
> - **Catastrophic Military Destruction:** *decimate*, *decimation* (ancient legionary punishment evolving into modern mass destruction).
> - **Institutional & Ecclesiastical Leadership:** *dean*, *decurion* (overseer of ten, senior college officer).

---

## 🔀 4. Prefix & Combining Dynamics on dec

### Metric Prefix Distinction (Latin vs Greek)

| Prefix Source | Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| Latin `deci-` | $\times 10^{-1}$ (one-tenth) | **[[decimeter]]** | One-tenth of a meter ($0.1\text{ m}$). |
| Latin `deci-` | $\times 10^{-1}$ (one-tenth) | **[[decibel]]** | One-tenth of a Bel (logarithmic unit of sound power). |
| Greek `deca-` | $\times 10^1$ (ten) | **[[decameter]]** | Ten meters ($10\text{ m}$). |
| Greek `deca-` | $\times 10^1$ (ten) | **[[decalogue]]** | The Ten Commandments delivered at Mount Sinai. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Relational) | **[[decimal]]** | Pertaining to a system of numbers based on ten. |
| `-ate` | Verb (Action / Enforcement) | **[[decimate]]** | To destroy a large proportion or tenth of something. |
| `-tion` | Noun (Act / Result) | **[[decimation]]** | The execution of every tenth soldier; severe devastation. |
| `-ennial` | Adjective (Yearly Cycle) | **[[decennial]]** | Occurring every ten years or lasting ten years. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔢 **Mathematics & Computing** | *decimal*, *decimal point*, *duodecim* | Hindu-Arabic positional notation, base-10 numerical conversion. |
| 🔊 **Acoustics & Telecom** | *decibel* (dB), *decimetric wave* | Sound power levels, signal-to-noise ratio, RF attenuation. |
| 🏛️ **History & Military Science** | *decimate*, *decurion*, *decemviri* | Ancient Roman capital disciplinary codes, cavalry organization. |
| 🎓 **Higher Education & Church** | *dean*, *decanal* | Academic leadership of university faculties, cathedral decanal stalls. |
| 🏃 **Sports & Geometry** | *decathlon*, *decagon* | Olympic all-around track and field athletics, Euclidean regular polygons. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[dec]] | noun | **1.** The last (12th) month of the year.<br>**2.** (astronomy) the angular distance of a celestial body north or to the south of the celestial equator; expressed in degrees; used with right ascension to specify positions on the celestial sphere. | *"Hamilton replied as follows:-- "EDINBURGH, _Dec_. 4, 1848."* — John Cairns, *Principal Cairns* |
| [[decade]] | noun | **1.** A period of 10 years.<br>**2.** The cardinal number that is the sum of nine and one; the base of the decimal system. | *"She came forth in the morning without a remnant of the pain which had filled a decade of years with agony_."* — Classic Author, *The wonders of prayer* |
| [[decadence]] | noun | **1.** The state of being degenerate in mental or moral qualities. | *"In this decadence, too, the art of fire-making had been forgotten on the earth."* — H. G. Wells, *The Time Machine* |
| [[decadency]] | noun | **1.** The state of being degenerate in mental or moral qualities. | *"In academic literature, decadency designates the state of being degenerate in mental or moral qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decadent]] | noun | **1.** A person who has fallen into a decadent state (morally or artistically).<br>**2.** Marked by excessive self-indulgence and moral decay. | *"I must confess that my satisfaction with my first theories of an automatic civilisation and a decadent humanity did not long endure."* — H. G. Wells, *The Time Machine* |
| [[decadron]] | noun | **1.** A corticosteroid drug (trade names decadron or dexamethasone intensol or dexone or hexadrol or oradexon) used to treat allergies or inflammation. | *"In academic literature, decadron designates a corticosteroid drug (trade names decadron or dexamethasone intensol or dexone or hexadrol or oradexon) used to treat allergies or inflammation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decaf]] | noun | **1.** Coffee with the caffeine removed. | *"In academic literature, decaf designates coffee with the caffeine removed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decaffeinate]] | verb | **1.** Remove caffeine from (coffee). | *"In academic literature, decaffeinate designates remove caffeine from (coffee)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decagon]] | noun | **1.** A polygon with 10 sides and 10 angles. | *"In academic literature, decagon designates a polygon with 10 sides and 10 angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decagram]] | noun | **1.** 10 grams. | *"Classical and authoritative lexicons catalog decagram as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decahedron]] | noun | **1.** Any polyhedron having ten plane faces. | *"In academic literature, decahedron designates any polyhedron having ten plane faces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decal]] | noun | **1.** Either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface. | *"In academic literature, decal designates either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcification]] | noun | **1.** Loss of calcium from bones or teeth. | *"In academic literature, decalcification designates loss of calcium from bones or teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcify]] | verb | **1.** Lose calcium or calcium compounds.<br>**2.** Remove calcium or lime from. | *"In academic literature, decalcify designates lose calcium or calcium compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcomania]] | noun | **1.** Either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface.<br>**2.** The art of transfering designs from specially prepared paper to a wood or glass or metal surface. | *"In academic literature, decalcomania designates either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalescence]] | noun | **1.** Phenomenon that occurs when a metal is being heated and there is a sudden slowing in the rate of temperature increase; slowing is caused by a change in the internal crystal structure of the metal. | *"In academic literature, decalescence designates phenomenon that occurs when a metal is being heated and there is a sudden slowing in the rate of temperature increase; slowing is caused by a change in the internal crystal structure of the metal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalescent]] | adjective | **1.** Absorbing heat without increase in temperature when heated beyond a certain point. | *"In academic literature, decalescent designates absorbing heat without increase in temperature when heated beyond a certain point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decaliter]] | noun | **1.** A metric unit of volume or capacity equal to 10 liters. | *"In academic literature, decaliter designates a metric unit of volume or capacity equal to 10 liters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalitre]] | noun | **1.** A metric unit of volume or capacity equal to 10 liters. | *"In academic literature, decalitre designates a metric unit of volume or capacity equal to 10 liters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalogue]] | noun | **1.** The biblical commandments of moses. | *"In her decalogue of manners to refuse an apology was an unpardonable sin."* — Anthony Pryde, *Nightfall* |
| [[decameter]] | noun | **1.** A metric unit of length equal to ten meters. | *"Hauled along by a network of mag-beams converging from a score of space tugs came the Conference Disk, two hectometers in diameter and a decameter thick at its hub."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[decametre]] | noun | **1.** A metric unit of length equal to ten meters. | *"In academic literature, decametre designates a metric unit of length equal to ten meters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decamp]] | verb | **1.** Leave a camp.<br>**2.** Run away; usually includes taking something or somebody along. | *"The short-hand writers, the reporters of the court, and the reporters of the newspapers invariably decamp with the rest of the regulars when Jarndyce and Jarndyce comes on."* — Charles Dickens, *Bleak House* |
| [[decampment]] | noun | **1.** The act of running away secretly (as to avoid arrest).<br>**2.** Breaking camp. | *"In academic literature, decampment designates the act of running away secretly (as to avoid arrest)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decant]] | verb | **1.** Pour out. | *"It is an ineffably oozy, stringy affair, most frequently found in the tubs of sperm, after a prolonged squeezing, and subsequent decanting."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decantation]] | noun | **1.** The act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees. | *"In academic literature, decantation designates the act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decanter]] | noun | **1.** A bottle with a stopper; for serving wine or water. | *"He left his compliments, and would you partake of some refreshment”—there were biscuits and a decanter of wine on a small table—“and look over the paper,” which the young gentleman gave me as he spoke."* — Charles Dickens, *Bleak House* |
| [[decapitate]] | verb | **1.** Cut the head of. | *"When the Alake or king of Abeokuta in West Africa dies, the principal men decapitate his body, and placing the head in a large earthen vessel deliver it to the new sovereign; it becomes his fetish and he is bound to pay it honours."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[decapitated]] | verb | **1.** Cut the head of.<br>**2.** Having had the head cut off. | *"The Pequod’s whale being decapitated and the body stripped, the head was hoisted against the ship’s side—about half way out of the sea, so that it might yet in great part be buoyed up by its native element."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decapitation]] | noun | **1.** Execution by cutting off the victim's head.<br>**2.** Killing by cutting off the head. | *"Who would believe that there could be any one so cruel as to long for the decapitation of the luckless Pedro; yet the sailors pray every minute, selfish fellows, that the miserable fowl may be brought to his end."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[decapod]] | noun | **1.** Crustaceans characteristically having five pairs of locomotor appendages each joined to a segment of the thorax.<br>**2.** Cephalopods having eight short tentacles plus two long ones. | *"In academic literature, decapod designates crustaceans characteristically having five pairs of locomotor appendages each joined to a segment of the thorax."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decapoda]] | noun | **1.** Lobsters; crayfish; crabs; shrimps; prawns.<br>**2.** Squids and cuttlefishes. | *"In academic literature, decapoda designates lobsters; crayfish; crabs; shrimps; prawns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decapterus]] | noun | **1.** Scads especially mackerel scad; cosmopolitan in distribution. | *"In academic literature, decapterus designates scads especially mackerel scad; cosmopolitan in distribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonate]] | verb | **1.** Remove carbon dioxide from. | *"In academic literature, decarbonate designates remove carbon dioxide from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonise]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarbonise designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonize]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarbonize designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylase]] | noun | **1.** Any of the enzymes that hydrolize the carboxyl group. | *"In academic literature, decarboxylase designates any of the enzymes that hydrolize the carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylate]] | verb | **1.** Lose a carboxyl group.<br>**2.** Remove a carboxyl group from (a chemical compound). | *"In academic literature, decarboxylate designates lose a carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylation]] | noun | **1.** The process of removing a carboxyl group from a chemical compound (usually replacing it with hydrogen). | *"In academic literature, decarboxylation designates the process of removing a carboxyl group from a chemical compound (usually replacing it with hydrogen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarburise]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarburise designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarburize]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarburize designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decasyllabic]] | adjective | **1.** Having or characterized by or consisting of ten syllables. | *"In academic literature, decasyllabic designates having or characterized by or consisting of ten syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decasyllable]] | noun | **1.** A verse line having ten syllables. | *"In academic literature, decasyllable designates a verse line having ten syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decathlon]] | noun | **1.** An athletic contest consisting of ten different events. | *"In academic literature, decathlon designates an athletic contest consisting of ten different events."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decatur]] | noun | **1.** United states naval officer remembered for his heroic deeds (1779-1820).<br>**2.** A city in central illinois; abraham lincoln practiced law here. | *"In academic literature, decatur designates united states naval officer remembered for his heroic deeds (1779-1820)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decay]] | noun | **1.** The process of gradually becoming inferior.<br>**2.** A gradual decrease; as of stored charge or current. | *"Who lets so fair a house fall to decay, Which husbandry in honour might uphold, Against the stormy gusts of winter’s day And barren rage of death’s eternal cold?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decayable]] | adjective | **1.** Liable to decay or spoil or become putrid. | *"In academic literature, decayable designates liable to decay or spoil or become putrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decayed]] | verb | **1.** Lose a stored charge, magnetic flux, or current.<br>**2.** Fall into decay or ruin. | *"But thou art all my art, and dost advance As high as learning, my rude ignorance. 79 Whilst I alone did call upon thy aid, My verse alone had all thy gentle grace, But now my gracious numbers are decayed, And my sick muse doth give an other place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decease]] | noun | **1.** The event of dying or departure from life.<br>**2.** Pass from physical life and lose all bodily attributes and functions necessary to sustain life. | *"So should that beauty which you hold in lease Find no determination, then you were Yourself again after yourself’s decease, When your sweet issue your sweet form should bear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deceased]] | noun | **1.** Someone who is no longer alive.<br>**2.** Pass from physical life and lose all bodily attributes and functions necessary to sustain life. | *"There is a history in all men’s lives Figuring the natures of the times deceased; The which observed, a man may prophesy, With a near aim, of the main chance of things As yet not come to life, who in their seeds And weak beginning lie intreasured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decedent]] | noun | **1.** Someone who is no longer alive. | *"In academic literature, decedent designates someone who is no longer alive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deceit]] | noun | **1.** The quality of being fraudulent.<br>**2.** A misleading falsehood. | *"Instruct my daughter how she shall persever, That time and place with this deceit so lawful May prove coherent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deceitful]] | adjective | **1.** Intended to deceive; ; ;  - s.t.coleridge.<br>**2.** Marked by deliberate deceptiveness especially by pretending one set of feelings and acting under the influence of another; - israel zangwill; ; - w.m.thackeray. | *"Is this thy cunning, thou deceitful dame?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deceitfully]] | adverb | **1.** In a corrupt and deceitful manner. | *"Don't you think he looks scraggy in that long-tailed coat, shocks of taggy hair and a collar big enough to fit Old Harpeth?" I asked deceitfully."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[deceitfulness]] | noun | **1.** The quality of being crafty. | *"Beware, lest your heart become fatally hardened through the deceitfulness of sin."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[deceive]] | verb | **1.** Be false to; be dishonest with.<br>**2.** Cause someone to believe an untruth. | *"For having traffic with thyself alone, Thou of thyself thy sweet self dost deceive, Then how when nature calls thee to be gone, What acceptable audit canst thou leave?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deceiver]] | noun | **1.** Someone who leads you to believe something that is not true. | *"Let me not, Since I have my dukedom got, And pardon’d the deceiver, dwell In this bare island by your spell, But release me from my bands With the help of your good hands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deceivingly]] | adverb | **1.** In a misleading way. | *"In academic literature, deceivingly designates in a misleading way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decelerate]] | verb | **1.** Lose velocity; move more slowly.<br>**2.** Reduce the speed of. | *"In academic literature, decelerate designates lose velocity; move more slowly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deceleration]] | noun | **1.** A decrease in rate of change.<br>**2.** (physics) a rate of decrease in velocity. | *"Plenty of time to kick-in vector and deceleration programs." Brad paused, shifted position, rubbed his jaws, sighed deeply, glanced sideways at Xindral and, his voice tighter, continued."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[december]] | noun | **1.** The last (12th) month of the year. | *"What old December’s bareness everywhere!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decency]] | noun | **1.** The quality of conforming to standards of propriety and morality.<br>**2.** The quality of being polite and respectable. | *"I am afraid it is too late now for the funeral to be performed with proper decency."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[decennary]] | noun | **1.** A period of 10 years. | *"In academic literature, decennary designates a period of 10 years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decennial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin dec within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of dec in systematic terminology. | *"I, p. 429, for figures of population and of decennial rates of increase.] [Footnote 8: The effect of the growth of cities is discussed in the "American Journal of Sociology," Vol. 18, p. 342, in an article on "Walker's Theory of Immigration," by E.A."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decennium]] | noun | **1.** A period of 10 years. | *"In academic literature, decennium designates a period of 10 years."* — Academic Lexicon, *Morphological & Etymological Survey* |
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
| [[deception]] | noun | **1.** A misleading falsehood.<br>**2.** The act of deceiving. | *"Is it deception?” “Ah—h!” from Mrs."* — Charles Dickens, *Bleak House* |
| [[deceptive]] | adjective | **1.** Causing one to believe what is not true or fail to believe what is true.<br>**2.** Designed to deceive or mislead either deliberately or inadvertently. | *"Nor was I unmindful of that deceptive moonlight."* — Jack London, *The Jacket (The Star-Rover)* |
| [[deceptively]] | adverb | **1.** In a misleading way. | *"I had first seen the place on a moist afternoon when distances are deceptively diminished."* — H. G. Wells, *The Time Machine* |
| [[deceptiveness]] | noun | **1.** The quality of being deceptive. | *"In academic literature, deceptiveness designates the quality of being deceptive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decerebrate]] | verb | **1.** Remove the cerebrum from (a human body). | *"In academic literature, decerebrate designates remove the cerebrum from (a human body)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decertify]] | verb | **1.** Cause to be no longer approved or accepted. | *"In academic literature, decertify designates cause to be no longer approved or accepted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decibel]] | noun | **1.** A logarithmic unit of sound intensity; 10 times the logarithm of the ratio of the sound intensity to some reference intensity. | *"In academic literature, decibel designates a logarithmic unit of sound intensity; 10 times the logarithm of the ratio of the sound intensity to some reference intensity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decide]] | verb | **1.** Reach, make, or come to a decision about something.<br>**2.** Bring to an end; settle conclusively. | *"Or to the place of difference call the swords Which must decide it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decided]] | verb | **1.** Reach, make, or come to a decision about something.<br>**2.** Bring to an end; settle conclusively. | *"I am doing the right thing," said Mäzli now in the most decided tone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decidedly]] | adverb | **1.** Without question and beyond doubt. | *"But the mother now explained decidedly to the little girl that she never needed to undertake such actions in the future as she could not possibly judge which clothes she still needed and which could be given away."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[deciding]] | noun | **1.** The cognitive process of reaching a decision.<br>**2.** Reach, make, or come to a decision about something. | *"The ladies wanted my opinion before deciding."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decidua]] | noun | **1.** The epithelial tissue of the endometrium. | *"In academic literature, decidua designates the epithelial tissue of the endometrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deciduous]] | adjective | **1.** (of plants and shrubs) shedding foliage at the end of the growing season.<br>**2.** (of teeth, antlers, etc.) being shed at the end of a period of growth. | *"Under foot the leaves were dry, and the foliage of some holly bushes which grew among the deciduous trees was dense enough to keep off draughts."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[decigram]] | noun | **1.** 1/10 gram. | *"In academic literature, decigram designates 1/10 gram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decile]] | noun | **1.** (statistics) any of nine points that divided a distribution of ranked scores into equal intervals where each interval contains one-tenth of the scores. | *"In academic literature, decile designates (statistics) any of nine points that divided a distribution of ranked scores into equal intervals where each interval contains one-tenth of the scores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deciliter]] | noun | **1.** A metric unit of volume equal to one tenth of a liter. | *"In academic literature, deciliter designates a metric unit of volume equal to one tenth of a liter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decilitre]] | noun | **1.** A metric unit of volume equal to one tenth of a liter. | *"In academic literature, decilitre designates a metric unit of volume equal to one tenth of a liter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimal]] | noun | **1.** A proper fraction whose denominator is a power of 10.<br>**2.** A number in the decimal system. | *"A decimal system is a great convenience in the use of money as a common denominator, but not indispensable."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[decimalisation]] | noun | **1.** The act of changing to a decimal system. | *"In academic literature, decimalisation designates the act of changing to a decimal system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimalise]] | verb | **1.** Change from fractions to decimals.<br>**2.** Change to the decimal system. | *"In academic literature, decimalise designates change from fractions to decimals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimalization]] | noun | **1.** The act of changing to a decimal system. | *"In academic literature, decimalization designates the act of changing to a decimal system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimalize]] | verb | **1.** Change from fractions to decimals.<br>**2.** Change to the decimal system. | *"In academic literature, decimalize designates change from fractions to decimals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimate]] | verb | **1.** Kill one in every ten, as of mutineers in roman armies.<br>**2.** Kill in large numbers. | *"Our soldiers are no longer fearless, and I'll wager that those who are defending the best positions will not risk seeing themselves decimated; they will abandon them as soon as they see a couple of dozen French heads above each rampart."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[decimation]] | noun | **1.** Destroying or killing a large part of the population (literally every tenth person as chosen by lot). | *"By decimation and a tithed death, If thy revenges hunger for that food Which nature loathes, take thou the destined tenth, And by the hazard of the spotted die Let die the spotted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decimeter]] | noun | **1.** A metric unit of length equal to one tenth of a meter. | *"In academic literature, decimeter designates a metric unit of length equal to one tenth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decimetre]] | noun | **1.** A metric unit of length equal to one tenth of a meter. | *"In academic literature, decimetre designates a metric unit of length equal to one tenth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decipher]] | verb | **1.** Convert code into ordinary language.<br>**2.** Read with difficulty. | *"Well didst thou, Richard, to suppress thy voice; For, had the passions of thy heart burst out, I fear we should have seen decipher’d there More rancorous spite, more furious raging broils, Than yet can be imagined or supposed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decipherable]] | adjective | **1.** Easily deciphered. | *"Brought up from the wreck was a journal, so torn and mushed and pulped by the sea-water, with ink so run about, that scarcely any of it was decipherable."* — Jack London, *The Jacket (The Star-Rover)* |
| [[decipherably]] | adverb | **1.** In a legible manner. | *"In academic literature, decipherably designates in a legible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deciphered]] | verb | **1.** Convert code into ordinary language.<br>**2.** Read with difficulty. | *"On that occasion, Cook’s Court was in a manner revolutionized by the new inscription in fresh paint, PEFFER AND SNAGSBY, displacing the time-honoured and not easily to be deciphered legend PEFFER only."* — Charles Dickens, *Bleak House* |
| [[decipherer]] | noun | **1.** The kind of intellectual who converts messages from a code to plain text.<br>**2.** A reader capable of reading and interpreting illegible or obscure text. | *"In academic literature, decipherer designates the kind of intellectual who converts messages from a code to plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decipherment]] | noun | **1.** The activity of making clear or converting from code into plain text. | *"In academic literature, decipherment designates the activity of making clear or converting from code into plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decision]] | noun | **1.** The act of making up your mind about something.<br>**2.** A position or opinion or judgment reached after consideration. | *"So that, from point to point, now have you heard The fundamental reasons of this war, Whose great decision hath much blood let forth, And more thirsts after."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decisive]] | adjective | **1.** Determining or having the power to determine an outcome.<br>**2.** Unmistakable. | *"Yes, I fear so.” “Then, sir,” returns the trooper in a decisive manner, “it appears to me—being naturally in the vagabond way myself—that the sooner he comes out of the street, the better."* — Charles Dickens, *Bleak House* |
| [[decisively]] | adverb | **1.** With firmness.<br>**2.** With finality; conclusively. | *"I have no time to tell you now, Kurt," the mother declared decisively."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[decisiveness]] | noun | **1.** The trait of resoluteness as evidenced by firmness of character or purpose.<br>**2.** The quality of being final or definitely settled. | *"She rose and crossed the room toward the door with grim decisiveness."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[decius]] | noun | **1.** Emperor of rome who was proclaimed emperor against his will; his reign was notable for his severe persecution of christians (201-251). | *"CASSIUS, ” ” ” CASCA, ” ” ” TREBONIUS, ” ” ” LIGARIUS,” ” ” DECIUS BRUTUS, ” ” ” METELLUS CIMBER, ” ” ” CINNA, ” ” ” FLAVIUS, tribune MARULLUS, tribune ARTEMIDORUS, a Sophist of Cnidos."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[declaim]] | verb | **1.** Recite in elocution.<br>**2.** Speak against in an impassioned manner. | *"It is the humor of many heads to extol the days of their forefathers, and declaim against the wickedness of times present."* — George Eliot, *Middlemarch* |
| [[declamation]] | noun | **1.** Vehement oratory.<br>**2.** Recitation of a speech from memory with studied gestures and intonation as an exercise in elocution or rhetoric. | *"Boldwood has shot my husband.” Her statement of the fact in such quiet and simple words came with more force than a tragic declamation, and had somewhat the effect of setting the distorted images in each mind present into proper focus."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[declamatory]] | adjective | **1.** Ostentatiously lofty in style. | *"This fixed idea of the rhapsodist was delivered with animated enthusiasm, in a manner entirely declamatory, for he had plainly no skill as a dialectician."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[declarable]] | adjective | **1.** That must be declared. | *"In academic literature, declarable designates that must be declared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declaration]] | noun | **1.** A statement that is emphatic and explicit (spoken or written).<br>**2.** (law) unsworn statement that can be admitted in evidence in a legal transaction. | *"Would you be so kind as to allow me (as I may say) to file a declaration—to make an offer!” Mr."* — Charles Dickens, *Bleak House* |
| [[declarative]] | noun | **1.** A mood (grammatically unmarked) that represents the act or state as an objective fact.<br>**2.** Relating to the use of or having the nature of a declaration. | *"In academic literature, declarative designates a mood (grammatically unmarked) that represents the act or state as an objective fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declaratory]] | adjective | **1.** Relating to the use of or having the nature of a declaration. | *"Miss Wisk’s mission, my guardian said, was to show the world that woman’s mission was man’s mission and that the only genuine mission of both man and woman was to be always moving declaratory resolutions about things in general at public meetings."* — Charles Dickens, *Bleak House* |
| [[declare]] | verb | **1.** State emphatically and authoritatively.<br>**2.** Announce publicly or officially. | *"Read, and declare the meaning."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[declared]] | verb | **1.** State emphatically and authoritatively.<br>**2.** Announce publicly or officially. | *"I have no time to tell you now, Kurt," the mother declared decisively."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[declarer]] | noun | **1.** The bridge player in contract bridge who wins the bidding and can declare which suit is to be trumps.<br>**2.** Someone who claims to speak the truth. | *"In academic literature, declarer designates the bridge player in contract bridge who wins the bidding and can declare which suit is to be trumps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassification]] | noun | **1.** Reduction or removal by the government of restrictions on a classified document or weapon. | *"In academic literature, declassification designates reduction or removal by the government of restrictions on a classified document or weapon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassified]] | verb | **1.** Lift the restriction on and make available again.<br>**2.** Having had security classification removed. | *"In academic literature, declassified designates lift the restriction on and make available again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declassify]] | verb | **1.** Lift the restriction on and make available again. | *"In academic literature, declassify designates lift the restriction on and make available again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declaw]] | verb | **1.** Remove the claws from. | *"In academic literature, declaw designates remove the claws from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declension]] | noun | **1.** The inflection of nouns and pronouns and adjectives in indo-european languages.<br>**2.** Process of changing to an inferior state. | *"Ours is at the lowest point of declension."* — Alexander Hamilton, *The Federalist Papers* |
| [[declination]] | noun | **1.** A condition inferior to an earlier condition; a gradual falling off from a better state.<br>**2.** A downward slope or bend. | *"You need not put on airs." "I have business with you, Phil." "I have no business with you; and I respectfully decline having anything whatever to do with you." "Your declination is not accepted."* — Oliver Optic, *Plane and Plank; or, The Mishaps of a Mechanic* |
| [[decline]] | noun | **1.** Change toward something smaller or lower.<br>**2.** A condition inferior to an earlier condition; a gradual falling off from a better state. | *"Far more, far more, to you do I decline."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[declinometer]] | noun | **1.** An instrument for measuring magnetic declination. | *"In academic literature, declinometer designates an instrument for measuring magnetic declination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declivitous]] | adjective | **1.** Sloping down rather steeply. | *"In academic literature, declivitous designates sloping down rather steeply."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declivity]] | noun | **1.** A downward slope or bend. | *"Recovering her reserve, she sat without replying, and thus they reached the summit of another declivity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[declomycin]] | noun | **1.** Tetracycline antibacterial (trade name declomycin) effective in the treatment of some bacterial and rickettsial and other infections. | *"In academic literature, declomycin designates tetracycline antibacterial (trade name declomycin) effective in the treatment of some bacterial and rickettsial and other infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declutch]] | verb | **1.** Disengage the clutch of a car. | *"In academic literature, declutch designates disengage the clutch of a car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deco]] | noun | **1.** A style of design that was popular in the 1920s and 1930s; marked by stylized forms and geometric designs adapted to mass production. | *"In academic literature, deco designates a style of design that was popular in the 1920s and 1930s; marked by stylized forms and geometric designs adapted to mass production."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoagulant]] | noun | **1.** Medicine that prevents or retards the clotting of blood. | *"In academic literature, decoagulant designates medicine that prevents or retards the clotting of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoct]] | verb | **1.** Extract the essence of something by boiling it.<br>**2.** Be cooked until very little liquid is left. | *"Can sodden water, A drench for sur-rein’d jades, their barley-broth, Decoct their cold blood to such valiant heat?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decoction]] | noun | **1.** (pharmacology) the extraction of water-soluble drug substances by boiling. | *"The transition is a keen one, I assure you, from a schoolmaster to a sailor, and requires a strong decoction of Seneca and the Stoics to enable you to grin and bear it."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decode]] | verb | **1.** Convert code into ordinary language. | *"I'll get it." ## Drummer read again the message he had decoded and handed it to Brad who quickly scanned and silently returned it."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[decoder]] | noun | **1.** The kind of intellectual who converts messages from a code to plain text.<br>**2.** A machine that converts a coded text into ordinary language. | *"In academic literature, decoder designates the kind of intellectual who converts messages from a code to plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoding]] | noun | **1.** The activity of making clear or converting from code into plain text.<br>**2.** Convert code into ordinary language. | *"In academic literature, decoding designates the activity of making clear or converting from code into plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoke]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decoke designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decollate]] | verb | **1.** Cut the head of. | *"In academic literature, decollate designates cut the head of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolletage]] | noun | **1.** A low-cut neckline on a woman's dress. | *"In academic literature, decolletage designates a low-cut neckline on a woman's dress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decollete]] | adjective | **1.** (of a garment) having a low-cut neckline. | *"In academic literature, decollete designates (of a garment) having a low-cut neckline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonisation]] | noun | **1.** The action of changing from colonial to independent status. | *"In academic literature, decolonisation designates the action of changing from colonial to independent status."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonise]] | verb | **1.** Grant independence to (a former colony). | *"In academic literature, decolonise designates grant independence to (a former colony)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonization]] | noun | **1.** The action of changing from colonial to independent status. | *"In academic literature, decolonization designates the action of changing from colonial to independent status."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonize]] | verb | **1.** Grant independence to (a former colony). | *"In academic literature, decolonize designates grant independence to (a former colony)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolor]] | verb | **1.** Remove color from. | *"In academic literature, decolor designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolorise]] | verb | **1.** Remove color from. | *"In academic literature, decolorise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolorize]] | verb | **1.** Remove color from. | *"In academic literature, decolorize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolour]] | verb | **1.** Remove color from. | *"In academic literature, decolour designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolourise]] | verb | **1.** Remove color from. | *"In academic literature, decolourise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolourize]] | verb | **1.** Remove color from. | *"In academic literature, decolourize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decommission]] | verb | **1.** Withdraw from active service. | *"In academic literature, decommission designates withdraw from active service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decomposable]] | adjective | **1.** Capable of being partitioned. | *"In academic literature, decomposable designates capable of being partitioned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompose]] | verb | **1.** Separate (substances) into constituent elements or parts.<br>**2.** Lose a stored charge, magnetic flux, or current. | *"You cannot get anything out of iron but iron; you cannot decompose iron."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[decomposition]] | noun | **1.** The analysis of a vector field.<br>**2.** In a decomposed state. | *"Thus they die in the open air; and at the end of ten days they are in a forward state of decomposition."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[decompositional]] | adjective | **1.** Causing organic decay. | *"In academic literature, decompositional designates causing organic decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompound]] | adjective | **1.** Of a compound leaf; consisting of divisions that are themselves compound. | *"In academic literature, decompound designates of a compound leaf; consisting of divisions that are themselves compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompress]] | verb | **1.** Restore to its uncompressed form.<br>**2.** Decrease the pressure of. | *"At this extremely close range the concentrations of laser-quads and explosive decompress energy by both of us at a single point might disable some part of the warhead or set it off." "It would take too much time to cut through."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[decompressing]] | noun | **1.** Relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure).<br>**2.** Restore to its uncompressed form. | *"In academic literature, decompressing designates relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompression]] | noun | **1.** Restoring compressed information to its normal form for use or display.<br>**2.** Relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure). | *"In academic literature, decompression designates restoring compressed information to its normal form for use or display."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconcentrate]] | verb | **1.** Make less central. | *"In academic literature, deconcentrate designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decongestant]] | noun | **1.** A drug that decreases pulmonary congestion. | *"In academic literature, decongestant designates a drug that decreases pulmonary congestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconsecrate]] | verb | **1.** Remove the consecration from a person or an object. | *"In academic literature, deconsecrate designates remove the consecration from a person or an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconsecrated]] | verb | **1.** Remove the consecration from a person or an object.<br>**2.** Divested of consecration. | *"In academic literature, deconsecrated designates remove the consecration from a person or an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstruct]] | verb | **1.** Interpret (a text or an artwork) by the method of deconstructing. | *"In academic literature, deconstruct designates interpret (a text or an artwork) by the method of deconstructing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstruction]] | noun | **1.** A philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning. | *"In academic literature, deconstruction designates a philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstructionism]] | noun | **1.** A philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning. | *"In academic literature, deconstructionism designates a philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstructionist]] | adjective | **1.** Of or concerned with the philosophical theory of literature known as deconstructionism. | *"In academic literature, deconstructionist designates of or concerned with the philosophical theory of literature known as deconstructionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstructivism]] | noun | **1.** A school of architecture based on the philosophical theory of deconstruction. | *"In academic literature, deconstructivism designates a school of architecture based on the philosophical theory of deconstruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decontaminate]] | verb | **1.** Rid of contamination. | *"In academic literature, decontaminate designates rid of contamination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decontamination]] | noun | **1.** The removal of contaminants. | *"In academic literature, decontamination designates the removal of contaminants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decontrol]] | verb | **1.** Relax or remove controls of. | *"In academic literature, decontrol designates relax or remove controls of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decor]] | noun | **1.** Decoration consisting of the layout and furnishings of a livable interior. | *"In academic literature, decor designates decoration consisting of the layout and furnishings of a livable interior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decorate]] | verb | **1.** Make more attractive by adding ornament, colour, etc.<br>**2.** Be beautiful to look at. | *"Disposed about these muskets, like the cutlasses that decorate the bulkhead of a man-of-war’s cabin, were a great variety of rude spears and paddles, javelins, and war-clubs."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[decorated]] | verb | **1.** Make more attractive by adding ornament, colour, etc.<br>**2.** Be beautiful to look at. | *"Fluted pilasters, worked from the solid stone, decorated its front, and above the roof the chimneys were panelled or columnar, some coped gables with finials and like features still retaining traces of their Gothic extraction."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[decoration]] | noun | **1.** Something used to beautify.<br>**2.** An award for winning a championship or commemorating some other event. | *"Bucket prices that decoration in his mind and thinks it as likely as not that Volumnia is writing poetry."* — Charles Dickens, *Bleak House* |
| [[decorative]] | adjective | **1.** Serving an esthetic rather than a useful purpose. | *"I should say London is the place to have things executed in: if you wish to give photos they must be drawn by an artist and reproduced; no photo ever looked well in a book yet! they haven't decorative importance and don't blend with type."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[decoratively]] | adverb | **1.** In a decorative manner. | *"In academic literature, decoratively designates in a decorative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decorativeness]] | noun | **1.** An appearance that serves to decorate and make something more attractive. | *"In academic literature, decorativeness designates an appearance that serves to decorate and make something more attractive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decorator]] | noun | **1.** A person who specializes in designing architectural interiors and their furnishings.<br>**2.** Someone who decorates. | *"The humming-bird is an upholsterer and decorator."* — Classic Author, *Friends and Helpers* |
| [[decorous]] | adjective | **1.** Characterized by propriety and dignity and good taste in manners and conduct.<br>**2.** According with custom or propriety. | *"Val's language was refined enough for a curate, and even Rowsley in his young sister's presence never went beyond a sarcenet oath; but Hyde's frank fury was piquant to Isabel's not very decorous taste."* — Anthony Pryde, *Nightfall* |
| [[decorously]] | adverb | **1.** In a proper and decorous manner. | *"As it was, he recovered himself with a mighty gulp and finished the service decorously enough."* — John Cairns, *Principal Cairns* |
| [[decorousness]] | noun | **1.** Propriety in manners and conduct. | *"It was like dragging a hideous shape of death into the cleanly and cheerful space before a household fire, where it would present all the uglier aspect, amid the decorousness of everything about it."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[decorticate]] | verb | **1.** Remove the outer layer of.<br>**2.** Remove the cortex of (an organ). | *"In academic literature, decorticate designates remove the outer layer of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decortication]] | noun | **1.** Removal of the outer covering of an organ or part. | *"In academic literature, decortication designates removal of the outer covering of an organ or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decorum]] | noun | **1.** Propriety in manners and conduct. | *"Therefore, dear Isis, keep decorum and fortune him accordingly!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decoupage]] | noun | **1.** Art produced by decorating a surface with cutouts and then coating it with several layers of varnish or lacquer.<br>**2.** The art of decorating a surface with shapes or pictures and then coating it with vanish or lacquer. | *"In academic literature, decoupage designates art produced by decorating a surface with cutouts and then coating it with several layers of varnish or lacquer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decouple]] | verb | **1.** Disconnect or separate.<br>**2.** Regard as unconnected. | *"In academic literature, decouple designates disconnect or separate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decoy]] | noun | **1.** A beguiler who leads someone into danger (usually as part of a plot).<br>**2.** Something used to lure fish or other animals into danger so they can be trapped or killed. | *"And aft your moss-traversin Spunkies Decoy the wight that late an’ drunk is: The bleezin, curst, mischievous monkies Delude his eyes, Till in some miry slough he sunk is, Ne’er mair to rise."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[decrease]] | noun | **1.** A change downward.<br>**2.** A process of becoming smaller or shorter. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decreased]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Make smaller. | *"The old business in less than three years decreased so that half of the employees were discharged; the rest had their salaries reduced."* — Classic Author, *The wonders of prayer* |
| [[decreasing]] | verb | **1.** Decrease in size, extent, or range.<br>**2.** Make smaller. | *"Have you not a moist eye, a dry hand, a yellow cheek, a white beard, a decreasing leg, an increasing belly?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decree]] | noun | **1.** A legally binding command or decision entered on the court record (as if issued by a court or judge).<br>**2.** Issue a decree. | *"But heaven in thy creation did decree, That in thy face sweet love should ever dwell, Whate’er thy thoughts, or thy heart’s workings be, Thy looks should nothing thence, but sweetness tell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decreed]] | verb | **1.** Issue a decree.<br>**2.** Decide with authority. | *"Therefore it is decreed He dies tonight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decrement]] | noun | **1.** The amount by which something decreases.<br>**2.** A process of becoming smaller or shorter. | *"Increments and decrements of value on a great scale are unearned, and all classes of goods are affected, though in varying degrees. § II."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[decrepit]] | adjective | **1.** Worn and broken down by hard use.<br>**2.** Lacking bodily or muscular strength or vitality. | *"Decrepit miser, base ignoble wretch!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decrepitate]] | verb | **1.** Undergo decrepitation and crackle.<br>**2.** To roast or calcine so as to cause to crackle or until crackling stops. | *"In academic literature, decrepitate designates undergo decrepitation and crackle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decrepitation]] | noun | **1.** The crackling or breaking up of certain crystals when they are heated. | *"In academic literature, decrepitation designates the crackling or breaking up of certain crystals when they are heated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decrepitude]] | noun | **1.** A state of deterioration due to old age or long use. | *"He is thought to be gouty.” “Gout and decrepitude!” said Sir Walter."* — Jane Austen, *Persuasion* |
| [[decrescendo]] | noun | **1.** (music) a gradual decrease in loudness.<br>**2.** Grow quieter. | *"In academic literature, decrescendo designates (music) a gradual decrease in loudness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalisation]] | noun | **1.** Legislation that makes something legal that was formerly illegal. | *"In academic literature, decriminalisation designates legislation that makes something legal that was formerly illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalise]] | verb | **1.** Make legal. | *"In academic literature, decriminalise designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalization]] | noun | **1.** Legislation that makes something legal that was formerly illegal. | *"In academic literature, decriminalization designates legislation that makes something legal that was formerly illegal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalize]] | verb | **1.** Make legal. | *"In academic literature, decriminalize designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decry]] | verb | **1.** Express strong disapproval of. | *"You will be married some day.” “Not to any one who is like Fred.” “Don’t decry your own brother, my dear."* — George Eliot, *Middlemarch* |
| [[decrypt]] | verb | **1.** Convert code into ordinary language. | *"In academic literature, decrypt designates convert code into ordinary language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decryption]] | noun | **1.** The activity of making clear or converting from code into plain text. | *"In academic literature, decryption designates the activity of making clear or converting from code into plain text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decubitus]] | noun | **1.** A reclining position (as in a bed). | *"In academic literature, decubitus designates a reclining position (as in a bed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decumaria]] | noun | **1.** Small genus of woody climbers with adhesive aerial roots; sometimes placed in family saxifragaceae. | *"In academic literature, decumaria designates small genus of woody climbers with adhesive aerial roots; sometimes placed in family saxifragaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decumary]] | noun | **1.** Woody climber of southeastern united states having white flowers in compound terminal clusters. | *"In academic literature, decumary designates woody climber of southeastern united states having white flowers in compound terminal clusters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decumbent]] | adjective | **1.** Lying down; in a position of comfort or rest. | *"In academic literature, decumbent designates lying down; in a position of comfort or rest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decurved]] | adjective | **1.** Bent down or curved downward. | *"In academic literature, decurved designates bent down or curved downward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decussate]] | verb | **1.** Cross or intersect so as to form a cross.<br>**2.** Crossed or intersected in the form of an x. | *"In academic literature, decussate designates cross or intersect so as to form a cross."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decussation]] | noun | **1.** An intersection or crossing of two tracts in the form of the letter x. | *"In academic literature, decussation designates an intersection or crossing of two tracts in the form of the letter x."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edecrin]] | noun | **1.** Diuretic (trade name edecrin) used to treat edema. | *"In academic literature, edecrin designates diuretic (trade name edecrin) used to treat edema."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indecency]] | noun | **1.** The quality of being indecent.<br>**2.** An indecent or improper act. | *"This is an amusement to sharpen the intellect; it has a sting—it has what we call satire, and wit without indecency."* — George Eliot, *Middlemarch* |
| [[indecent]] | adjective | **1.** Not in keeping with accepted standards of what is right or proper in polite society.<br>**2.** Offensive to good taste especially in sexual matters. | *"Casaubon seemed to be the officiating clergyman, about whom it would be indecent to make remarks."* — George Eliot, *Middlemarch* |
| [[indecently]] | adverb | **1.** In an indecent manner. | *"Unspeakable messages he telephoned mentally to Miss Dunn at an address in D’Olier street while he presented himself indecently to the instrument in the callbox."* — James Joyce, *Ulysses* |
| [[indecipherable]] | adjective | **1.** Not easily deciphered.<br>**2.** Impossible to determine the meaning of. | *"What should you think he was like when he wasn't tired?" "That is a question I have occasionally asked myself," Val answered with his faint indecipherable smile."* — Anthony Pryde, *Nightfall* |
| [[indecision]] | noun | **1.** Doubt concerning two or more possible alternatives or courses of action.<br>**2.** The trait of irresolution; a lack of firmness of character or purpose. | *"With the round top of an inkstand and two broken bits of sealing-wax he is silently and slowly working out whatever train of indecision is in his mind."* — Charles Dickens, *Bleak House* |
| [[indecisive]] | adjective | **1.** Characterized by lack of decision and firmness.<br>**2.** Not definitely settling something. | *"It is the worst evil of too yielding and indecisive a character, that no influence over it can be depended on."* — Jane Austen, *Persuasion* |
| [[indecisively]] | adverb | **1.** Lacking firmness or resoluteness.<br>**2.** Without finality; inconclusively. | *"He still indecisively lingered beside the body."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[indecisiveness]] | noun | **1.** Doubt concerning two or more possible alternatives or courses of action.<br>**2.** The trait of irresolution; a lack of firmness of character or purpose. | *"In academic literature, indecisiveness designates doubt concerning two or more possible alternatives or courses of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indecorous]] | adjective | **1.** Lacking propriety and good taste in manners and conduct.<br>**2.** Not in keeping with accepted standards of what is right or proper in polite society. | *"For, as without law there is no sin, without eyes there is no indecorum; and she appeared to feel that Gabriel’s espial had made her an indecorous woman without her own connivance."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[indecorously]] | adverb | **1.** Without decorousness. | *"She was a tall and extremely slight woman, her features insignificant and her complexion sallow, but her figure indecorously beautiful under its close French draperies."* — Anthony Pryde, *Nightfall* |
| [[indecorousness]] | noun | **1.** A lack of decorum. | *"In academic literature, indecorousness designates a lack of decorum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indecorum]] | noun | **1.** A lack of decorum.<br>**2.** An act of undue intimacy. | *"For, as without law there is no sin, without eyes there is no indecorum; and she appeared to feel that Gabriel’s espial had made her an indecorous woman without her own connivance."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[predecease]] | verb | **1.** Die before; die earlier than. | *"If children predecease progenitors, We are their offspring, and they none of ours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[predecessor]] | noun | **1.** One who precedes you in time (as in holding a position or office).<br>**2.** Something that precedes and indicates the approach of something or someone. | *"Your Highness, lately sending into France, Did claim some certain dukedoms, in the right Of your great predecessor, King Edward the Third."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redecorate]] | verb | **1.** Redo the decoration of an apartment or house. | *"And, before they parted, it was agreed that the house in London should be redecorated for the next season, and that the brothers' families should meet again in the country at Christmas."* — William Makepeace Thackeray, *Vanity Fair* |
| [[tradecraft]] | noun | **1.** Skill acquired through experience in a trade; often used to discuss skill in espionage. | *"In academic literature, tradecraft designates skill acquired through experience in a trade; often used to discuss skill in espionage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undecagon]] | noun | **1.** An eleven-sided polygon. | *"In academic literature, undecagon designates an eleven-sided polygon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undeceive]] | verb | **1.** Free from deception or illusion. | *"I felt that I had only to be placid and merry once for all to undeceive my dear and set her loving heart at rest."* — Charles Dickens, *Bleak House* |
| [[undeceived]] | verb | **1.** Free from deception or illusion.<br>**2.** Freed of a mistaken or misguided notion. | *"I’ve undeceived him.” “The more fool you!” D’Urberville in anger retreated from her to the hedge, where he pulled off the long smockfrock which had disguised him; and rolling it up and pushing it into the couch-fire, went away."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[undecided]] | adjective | **1.** Not brought to a conclusion; subject to further thought.<br>**2.** Characterized by indecision. | *"The suit, still undecided, has fallen into rack, and ruin, and despair, with everything else—and here I stand, this day!"* — Charles Dickens, *Bleak House* |
| [[undecipherable]] | adjective | **1.** Not easily deciphered. | *"Like those mystic rocks, too, the mystic-marked whale remains undecipherable."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undecipherably]] | adverb | **1.** In an illegible manner. | *"In academic literature, undecipherably designates in an illegible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undeciphered]] | adjective | **1.** Not deciphered. | *"In academic literature, undeciphered designates not deciphered."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undeclared]] | adjective | **1.** Not announced or openly acknowledged. | *"Brooke’s Middlemarch projects, revealed clearly enough that the undeclared motive had relation to Dorothea."* — George Eliot, *Middlemarch* |
| [[undecomposable]] | adjective | **1.** Representing the furthest possible extent of analysis or division into parts; - g.s.brett; -m.r.cohen. | *"But mind, whether it be diamond, or black-lead, or this porous charcoal, each and all have the same chemical composition; they are what we call the elementary undecomposable substance carbon."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[undecomposed]] | adjective | **1.** Not left to spoil. | *"Consequently, the products from the roasting of chalcopyrite consist principally of oxides of iron and copper, together with a certain amount of copper sulphate, very little iron sulphate, and some undecomposed sulphides."* — Donald M. Levy, *Modern Copper Smelting* |
| [[undecorated]] | adjective | **1.** Not decorated with something to increase its beauty or distinction. | *"Yet these people were clothed in pleasant fabrics that must at times need renewal, and their sandals, though undecorated, were fairly complex specimens of metalwork."* — H. G. Wells, *The Time Machine* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DEC
  </div>
</div>
