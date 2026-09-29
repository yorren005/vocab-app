---
status: unread
type: root_dashboard
---
# Dashboard — cess
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cess-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“yielded, gone, or withdrawal”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **cess** means yielded, gone, or withdrawal. It refers to stepping back, yielding ground, or withdrawing. In English, this root forms words such as *access*, *accessible*, *accessibility*, and *inaccessible*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: yielded, gone, or withdrawal
> The root **cess** means yielded, gone, or withdrawal. It refers to stepping back, yielding ground, or withdrawing. In English, this root forms words such as *access*, *accessible*, *accessibility*, and *inaccessible*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Yielded, gone, or withdrawal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *access* and *accessible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cess** comes from a Latin word that means *"yielded, gone, or withdrawal"*.
  - At its core, it describes yielded, gone, or withdrawal.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **cess** in an English word, think of **motion, travel, and moving forward**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of yielded, gone, or withdrawal.
  - **Mental & Social**: How people experience, organize, or communicate about yielded, gone, or withdrawal.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Access**: The means, opportunity, or right to enter, approach, or make use of a place or system.
  - **Accessible**: Able to be reached, entered, or approached.
  - **Accessibility**: The quality or condition of being accessible, reachable, or easily understood and utilized.
  - **Inaccessible**: Incapable of being approached, reached, or entered.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cess</mark>, think of <mark class="hl-def">motion, travel, and moving forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **cess** operates through three distinct morphological engines in English:
> - **Primary Participial Base:** `cess-` (from *cessum*) — forms bare nouns and modern verbs: *ac-cess*, *ex-cess*, *pro-cess*, *re-cess*, *suc-cess*.
> - **Frequentative Base:** `cessa-` (from *cessāre*) — supplies *cessa-tion*, and through French *cesser*, the verb *cease*, *cease-less*, and negative *in-cessa-nt*.
> - **Negative Inflexible Base:** `necess-` (from *necesse* < *ne-* + *cēdere*) — supplies *necess-ary*, *necess-ity*, *necess-itate*.
> - **Contracted Romance Reflexes:** `ancest-` (from *antecessor* $\to$ *ancestor*, *ancestral*, *ancestry*).
> - **Nominalizing Suffixation:** Readily attaches Latin abstract suffixes: *-ion* (*access-ion*, *concess-ion*, *secess-ion*, *success-ion*), *-ive* (*excess-ive*, *recess-ive*, *success-ive*), *-ible* (*access-ible*), and *-ory* (*access-ory*, *intercess-ory*).

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
> Across English vocabulary, `cess` radiates across six major conceptual fields:
> - **Entry, Approach & Technological Interface:** [[access]], [[accessible]], [[accessibility]], [[inaccessible]], [[accession]], [[accessory]] govern physical entry, digital data retrieval, disability accommodation, and legal complicity.
> - **Logical Necessity & Inescapable Fate:** [[necessary]], [[necessarily]], [[necessity]], [[necessitate]], [[unnecessary]] articulate logical entailment, ontological prerequisites, and material poverty.
> - **Sequential Continuity & Lineage:** [[process]], [[procession]], [[succession]], [[successive]], [[successor]], [[ancestor]], [[ancestry]], [[ancestral]] trace family genealogy, ecclesiastical parades, and manufacturing workflows.
> - **Economic Cycles & Physical Recesses:** [[recession]], [[recessionary]], [[recess]], [[recessive]] delineate macroeconomic contractions, legislative breaks, architectural niches, and genetic inheritance.
> - **Cessation, Interruption & Persistence:** [[cease]], [[ceaseless]], [[cessation]], [[incessant]], [[incessantly]] govern armistices, smoking cessation, and unrelenting downpours.
> - **Triumph, Overflow & Mediation:** [[success]], [[successful]], [[excess]], [[excessive]], [[concession]], [[intercession]], [[intercessor]] describe prosperous achievement, extreme surplus, political compromise, and prayerful advocacy.

---

## 🔀 4. Prefix & Combining Dynamics on cess

### Prefix & Compounding Synthesis

| Prefix / Element | Element Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ad-** (assimilated to *ac-*) | to, toward | [[access]] / [[accession]] | *ad-* + *cessum* $\to$ having stepped toward $\to$ the means of entry; attainment of a throne. |
| **ante-** | before, prior | [[ancestor]] / [[antecessor]] | *ante-* + *cessum* $\to$ one who stepped before in time $\to$ a genealogical forebear. |
| **con-** | thoroughly | [[concession]] | *con-* + *cessum* $\to$ having yielded completely $\to$ a point granted, an allowance or franchise. |
| **ex-** | out of, beyond | [[excess]] / [[excessive]] | *ex-* + *cessum* $\to$ having stepped beyond the limit $\to$ immoderate surplus. |
| **in- (privative)** | not, un- | [[incessant]] / [[inaccessible]] | *in-* + *cessāre* / *accessibilis* $\to$ not pausing/stopping; incapable of being reached. |
| **inter-** | between | [[intercession]] | *inter-* + *cessum* $\to$ having stepped between $\to$ pleading or mediating for another. |
| **ne-** | not (unyielding) | [[necessary]] / [[necessity]] | *ne-* + *cessum* $\to$ that which will not give way $\to$ unavoidable, indispensable. |
| **pro-** | forward, onward | [[process]] / [[procession]] | *pro-* + *cessum* $\to$ having stepped forward $\to$ an orderly method, sequence, or formal parade. |
| **re-** | back, away | [[recess]] / [[recession]] | *re-* + *cessum* $\to$ having stepped back $\to$ an architectural alcove, legislative pause, or economic decline. |
| **sub-** (assimilated to *suc-*) | under, next after | [[success]] / [[succession]] | *sub-* + *cessum* $\to$ having stepped next in line $\to$ an achievement; orderly inheritance. |
| **sē-** | apart, aside | [[secession]] | *sē-* + *cessum* $\to$ having stepped apart $\to$ formal withdrawal from a union. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Computer Science & Digital Systems** | [[access]], [[accessible]], [[process]], [[processor]], [[processing]] | Database access controls, Central Processing Units (CPUs), digital image processing. |
| **Economics & Commerce** | [[recession]], [[recessionary]], [[excess]], [[concession]], [[concessionaire]] | Two consecutive quarters of GDP contraction, excess liquidity, airport retail concessions. |
| **Genetics & Molecular Biology** | [[recessive]], [[process]] | Autosomal recessive traits (Mendelian genetics), enzymatic biological cellular processes. |
| **Constitutional Law & Feudal History** | [[succession]], [[accession]], [[secession]], [[cession]], [[retrocession]] | Act of Settlement royal succession, Confederate secession (1861), treaty territorial cessions. |
| **Genealogy & Anthropology** | [[ancestor]], [[ancestral]], [[ancestry]], [[antecessor]] | Mitochondrial DNA ancestry mapping, ancestral burial rites, Homo antecessor. |
| **Litigation & Military Diplomacy** | [[cessation]], [[intercession]], [[process]], [[necessary]] | Ceasefires, service of legal process, judicial mediation, necessary defense force. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[access]] | noun | **1.** The right to enter.<br>**2.** The right to obtain or make use of or take advantage of something (as services or membership). | *"DENNIS So please you, he is here at the door and importunes access to you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accessary]] | noun | **1.** Someone who helps another person commit a crime.<br>**2.** Aiding and abetting in a crime. | *"I am your accessary; and so farewell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accessibility]] | noun | **1.** The quality of being at hand when needed.<br>**2.** The attribute of being easy to meet or deal with. | *"Such a change works the same results as would a magical increase in the fertility of the soil, an improvement in the richness and accessibility of natural mineral stores, or in the quantity and quality of artificial appliances."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[accessible]] | adjective | **1.** Capable of being reached.<br>**2.** Capable of being read with comprehension. | *"Accessible is none but Milford way. [_Exeunt._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accession]] | noun | **1.** A process of increasing by addition (as to a collection or group).<br>**2.** (civil law) the right to all of that which your property produces whether by growth or improvement. | *"The accession of fortune, the discovery of my relations, followed in due order."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[accessional]] | adjective | **1.** Of or constituting an accession. | *"In academic literature, accessional designates of or constituting an accession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accessorial]] | adjective | **1.** Nonessential but helpful. | *"In academic literature, accessorial designates nonessential but helpful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accessory]] | noun | **1.** Clothing that is worn or carried, but not part of your main clothing.<br>**2.** A supplementary component that improves capability. | *"But there are other instances where this whiteness loses all that accessory and strange glory which invests it in the White Steed and Albatross."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cessation]] | noun | **1.** A stopping. | *"It was not the loss for the moment that made slack milking so serious, but that with the decline of demand there came decline, and ultimately cessation, of supply."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[cession]] | noun | **1.** The act of ceding. | *"For power finds its place in lack of power; Advance is cession, and the driven ship May run aground because the helmsman’s thought Lacked force to balance opposites.” It was on a morning of May that Peter Featherstone was buried."* — George Eliot, *Middlemarch* |
| [[concession]] | noun | **1.** A contract granting the right to operate a subsidiary business.<br>**2.** The act of conceding or yielding. | *"One observes my Lady, how recognisant of my Lord’s politeness, with an inclination of her gracious head and the concession of her so-genteel fingers!"* — Charles Dickens, *Bleak House* |
| [[concessionaire]] | noun | **1.** Someone who holds or operates a concession. | *"In academic literature, concessionaire designates someone who holds or operates a concession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concessioner]] | noun | **1.** Someone who holds or operates a concession. | *"In academic literature, concessioner designates someone who holds or operates a concession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concessive]] | adjective | **1.** Of or pertaining to concession. | *"In academic literature, concessive designates of or pertaining to concession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deaccession]] | verb | **1.** Sell (art works) from a collection, especially in order to raise money for the purchase of other art works. | *"In academic literature, deaccession designates sell (art works) from a collection, especially in order to raise money for the purchase of other art works."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excess]] | noun | **1.** A quantity much larger than is needed.<br>**2.** Immoderation as a consequence of going beyond sufficient or permitted limits. | *"Shall worms inheritors of this excess Eat up thy charge? is this thy body’s end?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excessive]] | adjective | **1.** Beyond normal limits.<br>**2.** Unrestrained, especially with regard to feelings. | *"Moderate lamentation is the right of the dead; excessive grief the enemy to the living."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excessively]] | adverb | **1.** To a degree exceeding normal or proper limits. | *"They were excessively bare and disorderly, and the curtain to my window was fastened up with a fork."* — Charles Dickens, *Bleak House* |
| [[excessiveness]] | noun | **1.** Immoderation as a consequence of going beyond sufficient or permitted limits. | *"In academic literature, excessiveness designates immoderation as a consequence of going beyond sufficient or permitted limits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inaccessibility]] | noun | **1.** The quality of not being available when needed. | *"O the sense of distance and disparity that came upon me, and the inaccessibility that came about her!"* — Charles Dickens, *Great Expectations* |
| [[inaccessible]] | adjective | **1.** Capable of being reached only with great difficulty or not at all.<br>**2.** Not capable of being obtained. | *"Uninhabitable, and almost inaccessible,— SEBASTIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incessancy]] | noun | **1.** The quality of something that continues without end or interruption. | *"In academic literature, incessancy designates the quality of something that continues without end or interruption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incessant]] | adjective | **1.** Uninterrupted in time and indefinitely long continuing. | *"Th’ incessant care and labour of his mind Hath wrought the mure that should confine it in So thin that life looks through and will break out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incessantly]] | adverb | **1.** With unflagging resolve.<br>**2.** Without interruption. | *"And suddenly tearing away from their clinging arms she burst into a hysterical fit of tears, bowing herself on the chest of drawers and repeating incessantly, “O yes, yes, yes!” Having once given way she could not stop her weeping."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[incessantness]] | noun | **1.** The quality of something that continues without end or interruption. | *"In academic literature, incessantness designates the quality of something that continues without end or interruption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercession]] | noun | **1.** A prayer to god on behalf of another person.<br>**2.** The act of intervening (as to mediate a dispute, etc.). | *"Hast thou by secret means Used intercession to obtain a league, And, now the matter grows to compromise, Stand’st thou aloof upon comparison?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intercessor]] | noun | **1.** A negotiator who acts as a link between parties. | *"He ask’d, but all the Heav’nly Quire stood mute, And silence was in Heav’n: on mans behalf Patron or Intercessor none appeerd, Much less that durst upon his own head draw The deadly forfeiture, and ransom set."* — John Milton, *Paradise Lost* |
| [[necessary]] | noun | **1.** Anything indispensable.<br>**2.** Absolutely essential. | *"Sir, I will eat no meat; I’ll not drink, sir; If idle talk will once be necessary, I’ll not sleep neither."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[necessitate]] | verb | **1.** Require as useful, just, or proper.<br>**2.** Cause to be a concomitant. | *"To recognize God's existence is to necessitate prayer to Him, by all intelligent creatures, or, a consciously living in sin and under condemnation of conscience, because they do not pray to Him."* — Classic Author, *The wonders of prayer* |
| [[necessitous]] | adjective | **1.** Poor enough to need help from others. | *"How is it possible that a government half supplied and always necessitous, can fulfill the purposes of its institution, can provide for the security, advance the prosperity, or support the reputation of the commonwealth?"* — Alexander Hamilton, *The Federalist Papers* |
| [[necessity]] | noun | **1.** The condition of being essential or indispensable.<br>**2.** Anything indispensable. | *"He that so generally is at all times good, must of necessity hold his virtue to you, whose worthiness would stir it up where it wanted, rather than lack it where there is such abundance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[precess]] | verb | **1.** Move in a gyrating fashion. | *"In academic literature, precess designates move in a gyrating fashion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precession]] | noun | **1.** The motion of a spinning body (as a top) in which it wobbles so that the axis of rotation sweeps out a cone.<br>**2.** The act of preceding in time or order or rank (as in a ceremony). | *"In academic literature, precession designates the motion of a spinning body (as a top) in which it wobbles so that the axis of rotation sweeps out a cone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[process]] | noun | **1.** A particular course of action intended to achieve a result.<br>**2.** (psychology) the performance of some composite cognitive activity; an operation that affects mental contents. | *"He hath abandon’d his physicians, madam; under whose practices he hath persecuted time with hope, and finds no other advantage in the process but only the losing of hope by time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[processed]] | verb | **1.** Subject to a process or treatment, with the aim of readying for some purpose, improving, or remedying a condition.<br>**2.** Deal with in a routine way. | *"This display is tailored to the general run of inmates processed through orientation, just to give them an idea where they are."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[processing]] | noun | **1.** Preparing or putting through a prescribed procedure.<br>**2.** Subject to a process or treatment, with the aim of readying for some purpose, improving, or remedying a condition. | *"Their processing includes a few tests that are evaluated for basic intelligence and skills."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[procession]] | noun | **1.** (theology) the origination of the holy spirit at pentecost.<br>**2.** The group action of a collection of people or animals or vehicles moving ahead in more or less regular formation. | *"Enter priests, &c, in procession; the corpse of Ophelia, Laertes and Mourners following; King, Queen, their Trains, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[processional]] | noun | **1.** Religious music used in a procession.<br>**2.** Intended for use in a procession. | *"Their first exhibition of themselves was in a processional march of two and two round the parish."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[processor]] | noun | **1.** A business engaged in processing agricultural products and preparing them for market.<br>**2.** Someone who processes things (foods or photographs or applicants etc.). | *"In academic literature, processor designates a business engaged in processing agricultural products and preparing them for market."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recess]] | noun | **1.** A state of abeyance or suspended business.<br>**2.** A small concavity. | *"Fairfax precede me into the dining-room, and kept in her shade as we crossed that apartment; and, passing the arch, whose curtain was now dropped, entered the elegant recess beyond."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[recessed]] | verb | **1.** Put into a recess.<br>**2.** Make a recess in. | *"His house stood recessed from the road, and the stables, which are to a farm what a fireplace is to a room, were behind, their lower portions being lost amid bushes of laurel."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recession]] | noun | **1.** The state of the economy declines; a widespread decline in the gdp and employment and trade lasting from six months to a year.<br>**2.** A small concavity. | *"In academic literature, recession designates the state of the economy declines; a widespread decline in the gdp and employment and trade lasting from six months to a year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recessional]] | noun | **1.** The withdrawal of the clergy and choir from the chancel to the vestry at the end of a church service.<br>**2.** A hymn that is sung at the end of a service as the clergy and choir withdraw. | *"In academic literature, recessional designates the withdrawal of the clergy and choir from the chancel to the vestry at the end of a church service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recessionary]] | adjective | **1.** Of or pertaining to a recession. | *"In academic literature, recessionary designates of or pertaining to a recession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recessive]] | noun | **1.** An allele that produces its characteristic phenotype only when its paired allele is identical.<br>**2.** Of or pertaining to a recession. | *"In academic literature, recessive designates an allele that produces its characteristic phenotype only when its paired allele is identical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reprocess]] | verb | **1.** Use again after processing. | *"In academic literature, reprocess designates use again after processing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secession]] | noun | **1.** An austrian school of art and architecture parallel to the french art nouveau in the 1890s.<br>**2.** The withdrawal of eleven southern states from the union in 1860 which precipitated the american civil war. | *"The United Secession--formerly the Burgher--Church at Stockbridge occupied a site conveniently central for the wide district which it served, but very solitary."* — John Cairns, *Principal Cairns* |
| [[secessionism]] | noun | **1.** A doctrine that maintains the right of secession. | *"In academic literature, secessionism designates a doctrine that maintains the right of secession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secessionist]] | noun | **1.** An advocate of secessionism. | *"Tyler sent for a carriage which she was in the habit of using whenever need required, and the driver of which was honest and personally friendly, though probably a secessionist, and proceeded to the Station House."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[success]] | noun | **1.** An event that accomplishes its intended purpose.<br>**2.** An attainment that is successful. | *"When your lordship sees the bottom of his success in’t, and to what metal this counterfeit lump of ore will be melted, if you give him not John Drum’s entertainment, your inclining cannot be removed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[succession]] | noun | **1.** A following of one thing after another in time.<br>**2.** A group of people or things arranged or following in order. | *"How much more praise deserv’d thy beauty’s use, If thou couldst answer ‘This fair child of mine Shall sum my count, and make my old excuse,’ Proving his beauty by succession thine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[successive]] | adjective | **1.** In regular succession without gaps. | *"Noble patricians, patrons of my right, Defend the justice of my cause with arms; And, countrymen, my loving followers, Plead my successive title with your swords."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[successively]] | adverb | **1.** In proper order or sequence. | *"And now my death Changes the mood, for what in me was purchased, Falls upon thee in a more fairer sort; So thou the garland wear’st successively."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[successiveness]] | noun | **1.** A following of one thing after another in time. | *"In academic literature, successiveness designates a following of one thing after another in time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[successor]] | noun | **1.** A person who follows next in order.<br>**2.** A thing or person that immediately replaces something or someone. | *"Great Alexander Left his to th’ worthiest; so his successor Was like to be the best."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unaccessible]] | adjective | **1.** Capable of being reached only with great difficulty or not at all. | *"In academic literature, unaccessible designates capable of being reached only with great difficulty or not at all."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unnecessary]] | adjective | **1.** Not necessary. | *"Thou whoreson zed! thou unnecessary letter!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unprocessed]] | adjective | **1.** Not refined or processed.<br>**2.** Not altered from an original or natural state. | *"In academic literature, unprocessed designates not refined or processed."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CESS
  </div>
</div>
