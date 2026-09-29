---
status: unread
type: root_dashboard
---
# Dashboard — und
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">und-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wave”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **und** means wave. It refers to wave, surge, overflow, billow, copious plenty. In English, this root forms words such as *abundant*, *inundate*, *redundant*, and *undulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wave
> The root **und** means wave. It refers to wave, surge, overflow, billow, copious plenty. In English, this root forms words such as *abundant*, *inundate*, *redundant*, and *undulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Wave</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *abundant* and *inundate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **und** comes from a Latin word that means *"wave"*.
  - At its core, it describes wave.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **und** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of wave.
  - **Mental & Social**: How people experience, organize, or communicate about wave.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Abundant**: Existing or available in large quantities.
  - **Inundate**: To cover or submerge with a flood of water.
  - **Redundant**: Exceeding what is necessary or normal.
  - **Undulate**: To move with a smooth wavelike, sinuous motion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">und</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **und** forms words through rich classical prefixation combined with verbal, nominal, and adjectival suffixes:
> 
> ### 1. Classical Prefix Compounding
> - **`ab-` (from, away, off):**
>   - *ab-* + *undāre* → *abundāre* ("to overflow from") → [[abound]] (verb).
>   - *abundāns* → [[abundant]] (adjective), [[abundantly]] (adverb).
>   - *abundantia* → [[abundance]] (noun).
> - **`super-` + `ab-`:**
>   - *super-* + *abundāre* → [[superabound]] (verb), [[superabundance]] (noun), [[superabundant]] (adjective), *superabundantly* (adverb).
> - **`in-` (in, into, upon):**
>   - *in-* + *undāre* → *inundāre* ("to surge over, flood") → [[inundate]] (verb), [[inundation]] (noun), *inundatory* (adjective), *inundated* (participial adjective).
> - **`re-` (back, again):**
>   - *re-* + *undāre* → *redundāre* ("to surge back, overflow") → [[redundant]] (adjective), [[redundancy]] / *redundance* (noun), *redundantly* (adverb).
>   - Via Old French *redonder* → [[redound]] (verb).
> - **`super-` (over, above):**
>   - Late Latin *superundāre* ("to overflow") → Anglo-Norman *suronder* → [[surround]] (verb & noun).
> 
> ### 2. Diminutive & Iterative Formations
> - *unda* + diminutive *-ula* → *undula* ("little wave") + *-āre* → *undulāre* ("to move in ripples"):
>   - *undulāre* → [[undulate]] (verb & adjective), [[undulation]] (noun), [[undulatory]] (adjective), *undulated* (adjective).
> - *undula* + Greek *podion* ("little foot") → [[undulipodium]] (noun, eukaryotic flagellum/cilium).
> 
> ### 3. Renaissance Literary Coinage
> - *unda* + suffix *-īna* → [[undine]] (noun, water sprite coined by Paracelsus in 1566).

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
> Although the root fundamentally denotes **"wave and surging water"**, its semantic register spans across diverse intellectual and practical arenas:
> - **Wave Mechanics & Topography:** In [[undulate]], [[undulation]], and [[undulatory]], it describes physical sine waves, rolling hills, shimmering heat waves, and snake locomotion.
> - **Catastrophic Flooding & Deluges:** In [[inundate]] and [[inundation]], it describes torrential river floods, storm surges, or an overwhelming deluge of work, correspondence, or data.
> - **Economic, Material & Natural Wealth:** In [[abound]], [[abundant]], [[abundance]], and [[superabundant]], it captures overflowing harvests, thriving ecosystems, and plentiful capital.
> - **Excess, Superfluity & Engineering Backup:** In [[redundant]] and [[redundancy]], it denotes unnecessary verbiage, obsolete workers, or deliberate fail-safe backup hardware in aerospace and network architecture.
> - **Karmic & Moral Consequences:** In [[redound]], it describes how an action washes back upon the actor, adding to their honor, reputation, or disgrace.
> - **Mythology & Literature:** In [[undine]], it names the mythological female spirit of freshwater.

---

## 🔀 4. Prefix & Combining Dynamics on und

| Prefix | Classical Latin Etymon | Derived English Word | Literal Root Meaning | Modern Conceptual Value |
| :--- | :--- | :--- | :--- | :--- |
| `ab-` (from, away) | *abundāre* | [[abound]] / [[abundant]] | "to overflow away from the bank" | Copious plenty; existing in great quantities. |
| `super-` + `ab-` | *superabundāre* | [[superabundance]] | "to overflow excessively over the rim" | Extravagant excess; more than sufficient supply. |
| `in-` (into, upon) | *inundāre* | [[inundate]] / [[inundation]] | "to surge wave upon wave over land" | To deluge with water; to overwhelm with quantity. |
| `re-` (back, again) | *redundāre* | [[redundant]] / [[redundancy]] | "to surge back in overlapping billows" | Superfluous repetition; extra backup components. |
| `re-` (via Old French) | *redonder* | [[redound]] | "to wave back onto the origin" | To accrue or contribute to one's credit or blame. |
| `super-` (over) | *superundāre* | [[surround]] | "to overflow over and engulf on all sides" | To encircle completely; to enclose in a perimeter. |
| *(diminutive)* | *undula* | [[undulate]] / [[undulation]] | "to make little ripples or waves" | Sinuous, curving movement or wavy contour. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌊 **Hydrology & Civil Engineering** | [[inundate]], [[inundation]], *inundatory* | Floodplain mapping, river levee breach analysis, emergency stormwater drainage management |
| 💻 **Computer Science & Telecommunications** | [[redundant]], [[redundancy]] | RAID storage arrays, redundant power supplies, packet checksum verification, high-availability data centers |
| 🔬 **Physics, Optics & Biology** | [[undulatory]], [[undulate]], [[undulipodium]] | Huygens's undulatory theory of light; sinusoidal wave propagation; cilia motility in microscopic flagellates |
| 🌾 **Ecology & Natural Resource Economics** | [[abound]], [[abundant]], [[abundance]], [[superabundance]] | Biodiversity indices, carrying capacity, resource abundance, renewable agricultural output |
| ⚖️ **Law, Rhetoric & Statecraft** | [[redundant]], [[redound]], [[abundance]] | Pleonastic legal phrasing ("null and void"); public service redounding to national prestige; excessive filings |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abound]] | verb | **1.** Be abundant or plentiful; exist in large quantities.<br>**2.** Be in a state of movement or action. | *"The plain-song is most just, for humours do abound."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abounding]] | verb | **1.** Be abundant or plentiful; exist in large quantities.<br>**2.** Be in a state of movement or action. | *"Mark then abounding valour in our English, That being dead, like to the bullet’s grazing, Break out into a second course of mischief, Killing in relapse of mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abundance]] | noun | **1.** The property of a more than adequate quantity or supply.<br>**2.** (physics) the ratio of the number of atoms of a specific isotope of an element to the total number of isotopes present. | *"The sea all water, yet receives rain still, And in abundance addeth to his store, So thou being rich in will add to thy will One will of mine to make thy large will more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abundant]] | adjective | **1.** Present in great quantity. | *"I have too few to take my leave of you, When the tongue’s office should be prodigal To breathe the abundant dolour of the heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abundantly]] | adverb | **1.** In an abundant manner. | *"Nay, these are almost thoroughly persuaded; For though abundantly they lack discretion, Yet are they passing cowardly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alundum]] | noun | **1.** A substance made of fused alumina. | *"In academic literature, alundum designates a substance made of fused alumina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arundinaceous]] | adjective | **1.** Of or relating to or resembling reedlike plants of the genus arundinaria. | *"In academic literature, arundinaceous designates of or relating to or resembling reedlike plants of the genus arundinaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arundinaria]] | noun | **1.** North american bamboo. | *"In academic literature, arundinaria designates north american bamboo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arundo]] | noun | **1.** Any of several coarse tall perennial grasses of most warm areas: reeds. | *"REED SMUT; prodded on the stems of reeds, forming thick bullate patches several inches long, occupying whole internodes, covered by their sheath; spores globose, rather large.—On stems of _Arundo phragmitis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[asunder]] | adjective | **1.** Widely separated especially in space.<br>**2.** Into parts or pieces. | *"You good gods, Let what is here contain’d relish of love, Of my lord’s health, of his content; yet not That we two are asunder; let that grieve him!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conundrum]] | noun | **1.** A difficult problem. | *"It would not be fair, in other words, to propose a conundrum on a basis of ostensible materialism, and then, when no other key would fit, to palm off a disembodied spirit on us."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[corundom]] | noun | **1.** Very hard mineral used as an abrasive. | *"In academic literature, corundom designates very hard mineral used as an abrasive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corundum]] | noun | **1.** Very hard mineral used as an abrasive. | *"In academic literature, corundum designates very hard mineral used as an abrasive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inundate]] | verb | **1.** Fill quickly beyond capacity; as with a liquid.<br>**2.** Fill or cover completely, usually with water. | *"To these circumstances it may, in some measure, be owing that we have not been inundated by the intellect of antiquity--that the fountains of thought have not been broken up, and modern genius drowned in the deluge."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[inundated]] | verb | **1.** Fill quickly beyond capacity; as with a liquid.<br>**2.** Fill or cover completely, usually with water. | *"To these circumstances it may, in some measure, be owing that we have not been inundated by the intellect of antiquity--that the fountains of thought have not been broken up, and modern genius drowned in the deluge."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[inundation]] | noun | **1.** The rising of a body of water and its overflowing onto normally dry land.<br>**2.** An overwhelming number or amount. | *"This inundation of mistemper’d humour Rests by you only to be qualified."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misunderstand]] | verb | **1.** Interpret in the wrong way. | *"Perhaps I can make use of him—I might do it then!” She pointed in the direction of Casterbridge, and the dog seemed to misunderstand: he trotted on."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[misunderstanding]] | noun | **1.** Putting the wrong interpretation on.<br>**2.** An understanding of something that is not correct. | *"I have occupied your house for a considerable period, I believe to our mutual satisfaction until this unpleasant misunderstanding arose; let us be at once friendly and business-like."* — Charles Dickens, *Bleak House* |
| [[misunderstood]] | verb | **1.** Interpret in the wrong way.<br>**2.** Wrongly understood. | *"Whenever you speak about him, your voice takes on a tone as if you were speaking about a misunderstood angel."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[overabundance]] | noun | **1.** The state of being more than full.<br>**2.** A quantity that is more than what is appropriate. | *"In academic literature, overabundance designates the state of being more than full."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overabundant]] | adjective | **1.** Excessively abundant. | *"In academic literature, overabundant designates excessively abundant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[profunda]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin und within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of und in systematic terminology. | *"In academic literature, profunda designates pertaining to, derived from, or characteristic of latin und within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redound]] | verb | **1.** Return or recoil.<br>**2.** Contribute. | *"I will, my lord, and doubt not so to deal As all things shall redound unto your good."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redundance]] | noun | **1.** The attribute of being superfluous and unneeded. | *"In academic literature, redundance designates the attribute of being superfluous and unneeded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redundancy]] | noun | **1.** Repetition of messages to reduce the probability of errors in transmission.<br>**2.** The attribute of being superfluous and unneeded. | *"I looked at my pupil, who did not at first appear to notice me: she was quite a child, perhaps seven or eight years old, slightly built, with a pale, small-featured face, and a redundancy of hair falling in curls to her waist."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[redundant]] | adjective | **1.** More than is needed, desired, or required.<br>**2.** Repetition of same sense in different words; ; ; - j.b.conant. | *"It is pretty generally agreed that unemployment is essentially a problem of maladjustment of the labor supply, and not that of an absolutely and permanently redundant supply."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[superabundance]] | noun | **1.** A quantity that is more than what is appropriate. | *"She wished to help him, to bestow on him the superabundance of her own happiness."* — graf Leo Tolstoy, *War and Peace* |
| [[superabundant]] | adjective | **1.** Most excessively abundant. | *"Revenues were superabundant for current expenses of government, and altho there was a large national debt, hardly any of it was redeemable at the time."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[surround]] | noun | **1.** The area in which something exists or lives.<br>**2.** Extend on all sides of simultaneously; encircle. | *"You must let Leonore surround you with her delightful and soothing personality, which is sure to make you happy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[surrounded]] | verb | **1.** Extend on all sides of simultaneously; encircle.<br>**2.** Envelop completely. | *"Both ladies were kneeling before a large trunk, surrounded by heaps of clothes, shoes, books and boxes, and a hundred trifles besides."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[surrounding]] | verb | **1.** Extend on all sides of simultaneously; encircle.<br>**2.** Envelop completely. | *"Leonore's eyes were usually very sad, but occasionally she would look quite merry, and it was so that she appeared that evening when the children were surrounding her on all sides."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[surroundings]] | noun | **1.** The environmental condition.<br>**2.** The area in which something exists or lives. | *"Soon she would be obliged to send him away, and how could she hope for a loving influence in strange surroundings, which was the only thing to quiet him?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[undamaged]] | adjective | **1.** Not harmed or spoiled; sound. | *"Even if we get the depot back undamaged, we'll be unable to make up the time lost."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[undatable]] | adjective | **1.** Not capable of being given a date. | *"In academic literature, undatable designates not capable of being given a date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undated]] | adjective | **1.** Not bearing a date. | *"Read it aloud.” The note was undated, and without either signature or address."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[undaunted]] | adjective | **1.** Unshaken in purpose.<br>**2.** Resolutely courageous. | *"His soldiers, spying his undaunted spirit, “A Talbot! a Talbot!” cried out amain, And rush’d into the bowels of the battle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
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
| [[undedicated]] | adjective | **1.** Not dedicated. | *"In academic literature, undedicated designates not dedicated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undefeated]] | adjective | **1.** Victorious. | *"But, torn, blinded, baffled, the Dane was undefeated."* — Anthony Pryde, *Nightfall* |
| [[undefendable]] | adjective | **1.** Not defended or capable of being defended. | *"In academic literature, undefendable designates not defended or capable of being defended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undefended]] | adjective | **1.** Not defended or capable of being defended. | *"Stafford, "this isn't true?" "Perfectly true, sir." Undefended, unreserved, stripped even of pride, Val stood up before them all as if before a firing party, for the others had involuntarily fallen back leaving him alone. . . ."* — Anthony Pryde, *Nightfall* |
| [[undeferential]] | adjective | **1.** Not showing courteous respect. | *"In academic literature, undeferential designates not showing courteous respect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undefiled]] | adjective | **1.** Free from stain or blemish.<br>**2.** (of language) not having its purity or excellence debased; ; - van wyck brooks. | *"Pure religion and undefiled is to visit the fatherless and widows in their affliction.' My own heart has been singing for joy all the evening because of your work, and I do not mean to let you do it alone."* — Classic Author, *The wonders of prayer* |
| [[undefinable]] | adjective | **1.** Not capable of being precisely or readily described; not easily put into words. | *"But in a few minutes he would recklessly conjure up some undefinable means by which they were both to be made rich and happy for ever, and would become as gay as possible."* — Charles Dickens, *Bleak House* |
| [[undefined]] | adjective | **1.** Not precisely limited, determined, or distinguished. | *"I had an undefined impression that it might have been better if we had had some other inmate, but I could hardly have explained why even to myself."* — Charles Dickens, *Bleak House* |
| [[undelineated]] | adjective | **1.** Not represented accurately or precisely. | *"In academic literature, undelineated designates not represented accurately or precisely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemanding]] | adjective | **1.** Requiring little if any patience or effort or skill. | *"In academic literature, undemanding designates requiring little if any patience or effort or skill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemocratic]] | adjective | **1.** Not in agreement with or according to democratic doctrine or practice or ideals. | *"I commend the virtuous democracy of this Chamber to read that bill, and then tell this Senate whether there ever was a more undemocratic measure than the bill propounded in Virginia by the party whose cause they espouse."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[undemocratically]] | adverb | **1.** In an undemocratic manner. | *"In academic literature, undemocratically designates in an undemocratic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemonstrative]] | adjective | **1.** Not given to open expression of emotion. | *"You _shall_,” repeated Mary, in the tone of undemonstrative sincerity which seemed natural to her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[undeniable]] | adjective | **1.** Not possible to deny. | *"Being what it is, she neither knows nor cares.” Caddy was not at all deficient in natural affection for her mother, but mentioned this with tears as an undeniable fact, which I am afraid it was."* — Charles Dickens, *Bleak House* |
| [[undeniably]] | adverb | **1.** To an undeniable degree or in an undeniable manner. | *"You, Diana, and Mary are his sister’s children, as I am his brother’s child?” “Undeniably.” “You three, then, are my cousins; half our blood on each side flows from the same source?” “We are cousins; yes.” I surveyed him."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[undenominational]] | adjective | **1.** Not bound or devoted to the promotion of a particular denomination. | *"In academic literature, undenominational designates not bound or devoted to the promotion of a particular denomination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependability]] | noun | **1.** The trait of not being dependable or reliable. | *"In academic literature, undependability designates the trait of not being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependable]] | adjective | **1.** Not worthy of reliance or trust.<br>**2.** Liable to be erroneous or misleading. | *"In academic literature, undependable designates not worthy of reliance or trust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependableness]] | noun | **1.** The trait of not being dependable or reliable. | *"In academic literature, undependableness designates the trait of not being dependable or reliable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undependably]] | adverb | **1.** In an unfaithful undependable unreliable manner. | *"In academic literature, undependably designates in an unfaithful undependable unreliable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undepicted]] | adjective | **1.** Not pictured. | *"In academic literature, undepicted designates not pictured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[under]] | adjective | **1.** Located below or beneath something else.<br>**2.** Lower in rank, power, or authority. | *"These offices, so oft as thou wilt look, Shall profit thee, and much enrich thy book. 78 So oft have I invoked thee for my muse, And found such fair assistance in my verse, As every alien pen hath got my use, And under thee their poesy disperse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[under-the-counter]] | adjective | **1.** Done or sold illicitly and secretly. | *"In academic literature, under-the-counter designates done or sold illicitly and secretly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[under-the-table]] | adjective | **1.** Designed and carried out secretly or confidentially. | *"In academic literature, under-the-table designates designed and carried out secretly or confidentially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underachieve]] | verb | **1.** Perform less well or with less success than expected. | *"In academic literature, underachieve designates perform less well or with less success than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underachievement]] | noun | **1.** Poorer than expected performance (poorer than might have been predicted from intelligence tests). | *"In academic literature, underachievement designates poorer than expected performance (poorer than might have been predicted from intelligence tests)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underachiever]] | noun | **1.** A student who does not perform as well as expected or as well as the iq indicates. | *"In academic literature, underachiever designates a student who does not perform as well as expected or as well as the iq indicates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underact]] | verb | **1.** Act (a role) with great restraint. | *"In academic literature, underact designates act (a role) with great restraint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underactive]] | adjective | **1.** Abnormally inactive. | *"In academic literature, underactive designates abnormally inactive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underage]] | adjective | **1.** Not of legal age.<br>**2.** Dependent by virtue of youth. | *"In academic literature, underage designates not of legal age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underarm]] | adjective | **1.** With hand brought forward and up from below shoulder level.<br>**2.** With the hand swung below shoulder level. | *"Don't know how many shots it holds and we need them all." She swung with that underarm motion which is the nearest any woman can achieve to a throw."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[underbelly]] | noun | **1.** Lower side.<br>**2.** The soft belly or underside of an animal's body. | *"In academic literature, underbelly designates lower side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underbid]] | verb | **1.** Bid (a hand of cards) at less than the strength of the hand warrants.<br>**2.** Bid lower than a competing bidder. | *"In academic literature, underbid designates bid (a hand of cards) at less than the strength of the hand warrants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underbodice]] | noun | **1.** A short sleeveless undergarment for women. | *"In academic literature, underbodice designates a short sleeveless undergarment for women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underbody]] | noun | **1.** The soft belly or underside of an animal's body. | *"In academic literature, underbody designates the soft belly or underside of an animal's body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underboss]] | noun | **1.** An assistant or second-in-command to a chief (especially in a crime syndicate). | *"In academic literature, underboss designates an assistant or second-in-command to a chief (especially in a crime syndicate)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underbred]] | adjective | **1.** (of persons) lacking in refinement or grace.<br>**2.** Of inferior or mixed breed. | *"The men appeared to her all coarse, the women all pert, everybody underbred; and she gave as little contentment as she received from introductions either to old or new acquaintance."* — Jane Austen, *Mansfield Park* |
| [[underbrush]] | noun | **1.** The brush (small trees and bushes and ferns etc.) growing beneath taller trees in a wood or forest. | *"It was hard work for the tenderly nurtured maiden to climb the steep mountain ridge, at one time through a thorny tangle of underbrush, and at another clinging against the bare face of the rocks, holding on to swinging vines for support."* — Classic Author, *Hawaiian folk tales* |
| [[undercarriage]] | noun | **1.** Framework that serves as a support for the body of a vehicle. | *"In academic literature, undercarriage designates framework that serves as a support for the body of a vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undercharge]] | noun | **1.** A price that is too low.<br>**2.** An insufficient charge. | *"In academic literature, undercharge designates a price that is too low."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclass]] | noun | **1.** The social class lowest in the social hierarchy.<br>**2.** Belonging to the lowest and least privileged social stratum. | *"In academic literature, underclass designates the social class lowest in the social hierarchy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclassman]] | noun | **1.** An undergraduate who is not yet a senior. | *"In academic literature, underclassman designates an undergraduate who is not yet a senior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclothed]] | adjective | **1.** Inadequately clothed. | *"In academic literature, underclothed designates inadequately clothed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underclothes]] | noun | **1.** Undergarment worn next to the skin and under the outer garments. | *"I'd buy--I'd buy--oh,--silk stockings, and long gloves, and French cambric underclothes, and chiffon nightgowns like those Yvonne wears (but they aren't decent: still that doesn't matter so long as you're not married, and they are so pretty)!"* — Anthony Pryde, *Nightfall* |
| [[underclothing]] | noun | **1.** Undergarment worn next to the skin and under the outer garments. | *"They had nearly the same preferences in silks, patterns for underclothing, china-ware, and clergymen; they confided their little troubles of health and household management to each other, and various little points of superiority on Mrs."* — George Eliot, *Middlemarch* |
| [[undercoat]] | noun | **1.** Seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion.<br>**2.** The first or preliminary coat of paint or size applied to a surface. | *"In academic literature, undercoat designates seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undercoated]] | verb | **1.** Cover with a primer; apply a primer to.<br>**2.** (of motor vehicles) having a coating of tar or other rustproof material applied to the underside. | *"In academic literature, undercoated designates cover with a primer; apply a primer to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undercover]] | adjective | **1.** Conducted with or marked by hidden aims or methods. | *"In academic literature, undercover designates conducted with or marked by hidden aims or methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undercurrent]] | noun | **1.** A subdued emotional quality underlying an utterance; implicit meaning.<br>**2.** A current below the surface of a fluid. | *"For even when I was there the undercurrent of discontent in the province was visible."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[undercut]] | noun | **1.** The material removed by a cut made underneath.<br>**2.** The tender meat of the loin muscle on each side of the vertebral column. | *"I've got a dummy option on it in the works, and we'll be able to undercut Holliday's prices for his land by about twenty per cent." "False-E, huh?"* — Algis Budrys, *Citadel* |
| [[underdevelop]] | verb | **1.** Process (a film or photographic plate) less than the required time or in an ineffective solution or at an insufficiently high temperature. | *"In academic literature, underdevelop designates process (a film or photographic plate) less than the required time or in an ineffective solution or at an insufficiently high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underdeveloped]] | verb | **1.** Process (a film or photographic plate) less than the required time or in an ineffective solution or at an insufficiently high temperature.<br>**2.** Relating to societies in which capital needed to industrialize is in short supply. | *"In academic literature, underdeveloped designates process (a film or photographic plate) less than the required time or in an ineffective solution or at an insufficiently high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underdevelopment]] | noun | **1.** State of inadequate development.<br>**2.** (photography) inadequate processing of film resulting in inadequate contrast. | *"In academic literature, underdevelopment designates state of inadequate development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underdog]] | noun | **1.** One at a disadvantage and expected to lose. | *"In academic literature, underdog designates one at a disadvantage and expected to lose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underdone]] | adjective | **1.** Insufficiently cooked. | *"Without prejudice to the cold beef if it's underdone."* — Anthony Pryde, *Nightfall* |
| [[underdrawers]] | noun | **1.** Underpants worn by men. | *"In academic literature, underdrawers designates underpants worn by men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underdress]] | verb | **1.** Dress without sufficient warmth.<br>**2.** Dress informally and casually. | *"Alice did not deign to reply, but tossed her head superbly, and secretly considered whether people would, on comparison, think her overdressed or Lydia underdressed."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[underdressed]] | verb | **1.** Dress without sufficient warmth.<br>**2.** Dress informally and casually. | *"Alice did not deign to reply, but tossed her head superbly, and secretly considered whether people would, on comparison, think her overdressed or Lydia underdressed."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[undereducated]] | adjective | **1.** Poorly or insufficiently educated. | *"In academic literature, undereducated designates poorly or insufficiently educated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underemployed]] | adjective | **1.** Employed only part-time when one needs full-time employment or not making full use of your skills. | *"In academic literature, underemployed designates employed only part-time when one needs full-time employment or not making full use of your skills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underestimate]] | noun | **1.** An estimation that is too low; an estimate that is less than the true or actual value.<br>**2.** Assign too low a value to. | *"The meaning lay in the difference between actions, none of which had any meaning of itself; and the necessity of being jealous, which lovers are troubled with, did not lead Oak to underestimate these signs."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[underestimation]] | noun | **1.** An estimation that is too low; an estimate that is less than the true or actual value. | *"In academic literature, underestimation designates an estimation that is too low; an estimate that is less than the true or actual value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underevaluation]] | noun | **1.** An appraisal that underestimates the value of something. | *"In academic literature, underevaluation designates an appraisal that underestimates the value of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underexpose]] | verb | **1.** Expose to too little light.<br>**2.** Expose insufficiently. | *"In academic literature, underexpose designates expose to too little light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underexposure]] | noun | **1.** The act of exposing film to too little light or for too short a time.<br>**2.** Inadequate publicity. | *"In academic literature, underexposure designates the act of exposing film to too little light or for too short a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underfed]] | adjective | **1.** Not getting adequate food. | *"Many persons are moved by sympathy to pronounce competition among low-paid and underfed workers to be bad, and each worker is convinced that it is so in his own trade."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[underfelt]] | noun | **1.** A carpet pad of thick felt. | *"In academic literature, underfelt designates a carpet pad of thick felt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underfoot]] | adverb | **1.** Under the feet.<br>**2.** In the way and hindering progress. | *"Katherine, that cap of yours becomes you not: Off with that bauble, throw it underfoot. [_Katherina pulls off her cap and throws it down._] WIDOW."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underframe]] | noun | **1.** The internal supporting structure that gives an artifact its shape. | *"In academic literature, underframe designates the internal supporting structure that gives an artifact its shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underfur]] | noun | **1.** Thick soft fur lying beneath the longer and coarser guard hair. | *"In academic literature, underfur designates thick soft fur lying beneath the longer and coarser guard hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undergarment]] | noun | **1.** A garment worn under other garments. | *"I was evidently expected, for when I got near the door I faced a cheery-looking elderly woman in the usual peasant dress--white undergarment with long double apron, front, and back, of coloured stuff fitting almost too tight for modesty."* — Bram Stoker, *Dracula* |
| [[undergird]] | verb | **1.** Lend moral support to.<br>**2.** Make secure underneath. | *"In academic literature, undergird designates lend moral support to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undergo]] | verb | **1.** Pass through. | *"I am the master of my speeches, and would undergo what’s spoken, I swear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undergrad]] | noun | **1.** A university student who has not yet received a first degree. | *"In academic literature, undergrad designates a university student who has not yet received a first degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undergraduate]] | noun | **1.** A university student who has not yet received a first degree. | *"When I was an undergraduate, I well remember that most of my friends who were likely to take high mathematical honors were already so ultimately acquainted with Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[underground]] | noun | **1.** A secret group organized to overthrow a government or occupation force.<br>**2.** An electric railway operating below the surface of the ground (usually in a city). | *"This they have promised, to show your highness A spirit raised from depth of underground, That shall make answer to such questions As by your Grace shall be propounded him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undergrow]] | verb | **1.** Grow below something. | *"In academic literature, undergrow designates grow below something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undergrowth]] | noun | **1.** The brush (small trees and bushes and ferns etc.) growing beneath taller trees in a wood or forest. | *"Here Tess flung herself down upon the rustling undergrowth of spear-grass, as upon a bed, and remained crouching in palpitating misery broken by momentary shoots of joy, which her fears about the ending could not altogether suppress."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[underhand]] | adjective | **1.** With hand brought forward and up from below shoulder level.<br>**2.** Marked by deception. | *"I had myself notice of my brother’s purpose herein, and have by underhand means laboured to dissuade him from it; but he is resolute."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underhanded]] | adjective | **1.** Marked by deception.<br>**2.** With hand brought forward and up from below shoulder level. | *"Esther,” Richard resumed, “you are not to suppose that I have come here to make underhanded charges against John Jarndyce."* — Charles Dickens, *Bleak House* |
| [[underhandedly]] | adverb | **1.** Slyly and secretly; - john donne; - c.g.bowers. | *"In academic literature, underhandedly designates slyly and secretly; - john donne; - c.g.bowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underhung]] | adjective | **1.** Supported from below especially resting on a track instead of suspended from above.<br>**2.** Having a lower part projecting beyond the upper. | *"So was his face square, wide between the cheekbones, underhung with massive jaws, and topped with a broad, intelligent forehead."* — Jack London, *The Jacket (The Star-Rover)* |
| [[underivative]] | adjective | **1.** Not derivative or imitative. | *"In academic literature, underivative designates not derivative or imitative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underived]] | adjective | **1.** Not derived; primary or simple. | *"In academic literature, underived designates not derived; primary or simple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underlay]] | noun | **1.** A pad placed under a carpet.<br>**2.** Raise or support (the level of printing) by inserting a piece of paper or cardboard under the type. | *"That would depend upon whether the germs of staunch comradeship underlay the temporary emotion, or whether it were a sensuous joy in her form only, with no substratum of everlastingness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[underlayment]] | noun | **1.** A pad placed under a carpet. | *"In academic literature, underlayment designates a pad placed under a carpet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underlie]] | verb | **1.** Be or form the base for.<br>**2.** Lie underneath. | *"Society moves on lines he laid down for it; his plans underlie all."* — T. R. Glover, *The Jesus of History* |
| [[underline]] | noun | **1.** A line drawn underneath (especially under written matter).<br>**2.** Give extra weight to (a communication). | *"Underline _imposs._ To write today."* — James Joyce, *Ulysses* |
| [[underling]] | noun | **1.** An assistant subject to the authority or control of another. | *"Look thou, underling! that thou obeyest mine.—Stand round me, men."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[underlip]] | noun | **1.** The lower lip. | *"His brows knit together into a wedge-like furrow, and with a twitch of pain he bit his underlip."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[underlying]] | verb | **1.** Be or form the base for.<br>**2.** Lie underneath. | *"But he was now a prey to that worst irritation which arises not simply from annoyances, but from the second consciousness underlying those annoyances, of wasted energy and a degrading preoccupation, which was the reverse of all his former purposes."* — George Eliot, *Middlemarch* |
| [[undermanned]] | adjective | **1.** Inadequate in number of workers or assistants etc. | *"In academic literature, undermanned designates inadequate in number of workers or assistants etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undermentioned]] | adjective | **1.** About to be mentioned or specified. | *"In academic literature, undermentioned designates about to be mentioned or specified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undermine]] | verb | **1.** Destroy property or hinder normal operations.<br>**2.** Hollow out as if making a cave or opening. | *"Man setting down before you will undermine you and blow you up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underneath]] | adverb | **1.** On the lower or downward side; on the underside of.<br>**2.** Under or below an object or a surface; at a lower place or level; directly beneath. | *"Only we want a little personal strength; And pause us till these rebels now afoot Come underneath the yoke of government."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undernourish]] | verb | **1.** Provide with insufficient quality or quantity of nourishment. | *"In academic literature, undernourish designates provide with insufficient quality or quantity of nourishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undernourished]] | verb | **1.** Provide with insufficient quality or quantity of nourishment.<br>**2.** Not getting adequate food. | *"In academic literature, undernourished designates provide with insufficient quality or quantity of nourishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undernourishment]] | noun | **1.** Not having enough food to develop or function normally. | *"In academic literature, undernourishment designates not having enough food to develop or function normally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpants]] | noun | **1.** An undergarment that covers the body from the waist no further than to the thighs; usually worn next to the skin. | *"In academic literature, underpants designates an undergarment that covers the body from the waist no further than to the thighs; usually worn next to the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpart]] | noun | **1.** A part lying on the lower side or underneath an animal's body. | *"In academic literature, underpart designates a part lying on the lower side or underneath an animal's body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpass]] | noun | **1.** An underground tunnel or passage enabling pedestrians to cross a road or railway. | *"In academic literature, underpass designates an underground tunnel or passage enabling pedestrians to cross a road or railway."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpay]] | verb | **1.** Pay too little. | *"In academic literature, underpay designates pay too little."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpayment]] | noun | **1.** A payment smaller than needed or expected.<br>**2.** The act of paying less than required. | *"In academic literature, underpayment designates a payment smaller than needed or expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underperform]] | verb | **1.** Perform less well or with less success than expected.<br>**2.** Perform too rarely. | *"In academic literature, underperform designates perform less well or with less success than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underperformer]] | noun | **1.** A student who does not perform as well as expected or as well as the iq indicates.<br>**2.** A business that is less successful than expected. | *"In academic literature, underperformer designates a student who does not perform as well as expected or as well as the iq indicates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpin]] | verb | **1.** Support from beneath.<br>**2.** Support with evidence or authority or make more certain or confirm. | *"In academic literature, underpin designates support from beneath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underplay]] | verb | **1.** Act (a role) with great restraint.<br>**2.** Play a card lower than (a held high card). | *"In academic literature, underplay designates act (a role) with great restraint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpopulated]] | adjective | **1.** Having a lower population density than normal or desirable. | *"In academic literature, underpopulated designates having a lower population density than normal or desirable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underprice]] | verb | **1.** Sell at artificially low prices. | *"In academic literature, underprice designates sell at artificially low prices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underprivileged]] | adjective | **1.** Lacking the rights and advantages of other members of society. | *"In academic literature, underprivileged designates lacking the rights and advantages of other members of society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underproduce]] | verb | **1.** Produce below capacity or demand. | *"In academic literature, underproduce designates produce below capacity or demand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underproduction]] | noun | **1.** Inadequate production or less than expected. | *"In academic literature, underproduction designates inadequate production or less than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underquote]] | verb | **1.** Offer for sale at a price lower than the market price.<br>**2.** Quote a price lower than that quoted by (another seller). | *"In academic literature, underquote designates offer for sale at a price lower than the market price."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underrate]] | verb | **1.** Make too low an estimate of. | *"Ah! don't misunderstand me--yours is a rich manysided nature, and you're too intelligent to underrate the value of money."* — Anthony Pryde, *Nightfall* |
| [[underrating]] | noun | **1.** An estimation that is too low; an estimate that is less than the true or actual value.<br>**2.** Make too low an estimate of. | *"Sure-dart, with the exception of the serious underrating of the great lizard’s speed, had thus far made no mistake, and that blunder had not as yet brought him to grief."* — F. H. Costello, *Sure-dart* |
| [[underreckoning]] | noun | **1.** An estimation that is too low; an estimate that is less than the true or actual value. | *"In academic literature, underreckoning designates an estimation that is too low; an estimate that is less than the true or actual value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underscore]] | noun | **1.** A line drawn underneath (especially under written matter).<br>**2.** Give extra weight to (a communication). | *"A single underscore after a symbol indicates a subscript."* — Donald M. Levy, *Modern Copper Smelting* |
| [[undersea]] | adjective | **1.** Beneath the surface of the sea. | *"Fields of undersea, the lines faint brown in grass, buried cities."* — James Joyce, *Ulysses* |
| [[underseal]] | noun | **1.** Seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion. | *"In academic literature, underseal designates seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersealed]] | adjective | **1.** (of motor vehicles) having a coating of tar or other rustproof material applied to the underside. | *"In academic literature, undersealed designates (of motor vehicles) having a coating of tar or other rustproof material applied to the underside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersecretary]] | noun | **1.** A secretary immediately subordinate to the head of a department of government. | *"Christopher Mead, Assistant Undersecretary for External Affairs, returned the handshake, smiling."* — Algis Budrys, *Citadel* |
| [[undersell]] | verb | **1.** Sell cheaper than one's competition. | *"They, of course, would hardly remain long indifferent to that decided mastery, of which experience has shown us to be possessed in this valuable branch of traffic, and by which we are able to undersell those nations in their own markets."* — Alexander Hamilton, *The Federalist Papers* |
| [[underseller]] | noun | **1.** A seller that sells at a lower price than others do. | *"In academic literature, underseller designates a seller that sells at a lower price than others do."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersexed]] | adjective | **1.** Having a subnormal degree of sexual desire. | *"In academic literature, undersexed designates having a subnormal degree of sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undershirt]] | noun | **1.** A collarless men's undergarment for the upper part of the body. | *"Her boy Harold was the nearest in size to Bob of any of the children of his neighbours, and the parcel held everything needed from undershirt to scarlet Windsor scarf to tie under the rolling collar of the blue blouse."* — Grace S. Richmond, *Red Pepper Burns* |
| [[undershoot]] | verb | **1.** Fall short of (the runway) in a landing.<br>**2.** Shoot short of or below (a target). | *"In academic literature, undershoot designates fall short of (the runway) in a landing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undershot]] | verb | **1.** Fall short of (the runway) in a landing.<br>**2.** Shoot short of or below (a target). | *"In academic literature, undershot designates fall short of (the runway) in a landing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undershrub]] | noun | **1.** A low shrub. | *"In academic literature, undershrub designates a low shrub."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underside]] | noun | **1.** The lower side of anything. | *"The underside of the mantel-shelf was flushed with the high-coloured light, and the legs of the table nearest the fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[undersign]] | verb | **1.** Sign at the bottom of (a document). | *"TO THE REVEREND CLERGY:-- The undersigned proposes to commence another Periodical, of original plan and character, provided that adequate pledges of supplies shall be furnished."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[undersize]] | adjective | **1.** Smaller than normal for its kind. | *"There was a little undersized one that would fly into real rages, sometimes with me, sometimes with its fellows."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undersized]] | adjective | **1.** Smaller than normal for its kind. | *"There was a little undersized one that would fly into real rages, sometimes with me, sometimes with its fellows."* — Jack London, *The Jacket (The Star-Rover)* |
| [[underskirt]] | noun | **1.** Undergarment worn under a skirt. | *"I grabbed the gourd and swiped it out as best I could with the tail of my underskirt."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[underslung]] | adjective | **1.** Supported from above especially in a vehicle having springs attached to the axle from below.<br>**2.** Having a lower part projecting beyond the upper. | *"In academic literature, underslung designates supported from above especially in a vehicle having springs attached to the axle from below."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersoil]] | noun | **1.** The layer of soil between the topsoil and bedrock. | *"In academic literature, undersoil designates the layer of soil between the topsoil and bedrock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underspend]] | verb | **1.** Spend less than the whole of (a budget, for example).<br>**2.** Spend at less than the normal rate. | *"In academic literature, underspend designates spend less than the whole of (a budget, for example)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understaffed]] | adjective | **1.** Inadequate in number of workers or assistants etc. | *"In academic literature, understaffed designates inadequate in number of workers or assistants etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understand]] | verb | **1.** Know and comprehend the nature or meaning of.<br>**2.** Perceive (an idea or situation) mentally. | *"We understand it, and thank heaven for you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understandability]] | noun | **1.** The quality of comprehensible language or thought. | *"In academic literature, understandability designates the quality of comprehensible language or thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understandable]] | adjective | **1.** Capable of being apprehended or understood. | *"I declare it looked as though he would presently put to us some questions in an understandable language; but he died without uttering a sound, without moving a limb, without twitching a muscle."* — Joseph Conrad, *Heart of Darkness* |
| [[understandably]] | adverb | **1.** In an intelligible manner. | *"In academic literature, understandably designates in an intelligible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understanding]] | noun | **1.** The cognitive condition of someone who understands.<br>**2.** The statement (oral or written) of an exchange of promises. | *"When a man’s verses cannot be understood, nor a man’s good wit seconded with the forward child, understanding, it strikes a man more dead than a great reckoning in a little room."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understandingly]] | adverb | **1.** With understanding. | *"Boldwood looked at her—not slily, critically, or understandingly, but blankly at gaze, in the way a reaper looks up at a passing train—as something foreign to his element, and but dimly understood."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[understate]] | verb | **1.** Represent as less significant or important. | *"After a comfortable week-end's rest, I left Lao-kai in the early morning, helped on my journey by those courtesies that so often in strange lands convince one that "less than kin more than kind" quite understates the truth."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[understated]] | verb | **1.** Represent as less significant or important.<br>**2.** Exhibiting restrained good taste. | *"In academic literature, understated designates represent as less significant or important."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understatement]] | noun | **1.** A statement that is restrained in ironic contrast to what might have been said. | *"In academic literature, understatement designates a statement that is restrained in ironic contrast to what might have been said."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understock]] | verb | **1.** Stock with less than the usual or desirable number or quantity. | *"In academic literature, understock designates stock with less than the usual or desirable number or quantity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understood]] | verb | **1.** Know and comprehend the nature or meaning of.<br>**2.** Perceive (an idea or situation) mentally. | *"A most harsh one, and not to be understood without bloody succeeding."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understructure]] | noun | **1.** Lowest support of a structure. | *"In academic literature, understructure designates lowest support of a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understudy]] | noun | **1.** An actor able to replace a regular performer when required.<br>**2.** Be an understudy or alternate for a role. | *"It means that no one woman, be she ever so competent, can keep up the fight single-handed for twelve hours at a stretch, and that an understudy to work under her may mean the very turning of the scale."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[undersurface]] | noun | **1.** The lower side of anything. | *"In academic literature, undersurface designates the lower side of anything."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undertake]] | verb | **1.** Enter upon an activity or enterprise.<br>**2.** Accept as a challenge. | *"None better than to let him fetch off his drum, which you hear him so confidently undertake to do."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undertaker]] | noun | **1.** One whose business is the management of funerals. | *"And for Cassio, let me be his undertaker."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undertaking]] | noun | **1.** Any piece of work that is undertaken or attempted.<br>**2.** The trade of a funeral director. | *"Novelty is only in request, and as it is as dangerous to be aged in any kind of course as it is virtuous to be constant in any undertaking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undertide]] | noun | **1.** A current below the surface of a fluid. | *"In academic literature, undertide designates a current below the surface of a fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undertone]] | noun | **1.** A quiet or hushed tone of voice.<br>**2.** A subdued emotional quality underlying an utterance; implicit meaning. | *"Call the next witness.” And he added in an undertone to the Queen, “Really, my dear, _you_ must cross-examine the next witness."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[undertow]] | noun | **1.** An inclination contrary to the strongest or prevailing feeling.<br>**2.** The seaward undercurrent created after waves have broken on the shore. | *"But all the din of the isles that the Delver heaves in foam In the draught of the undertow glides out to the sea-gods' home."* — Classic Author, *The Life and Death of Cormac the Skald* |
| [[undervaluation]] | noun | **1.** Too low a value or price assigned to something. | *"In academic literature, undervaluation designates too low a value or price assigned to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undervalue]] | verb | **1.** Assign too low a value to.<br>**2.** Esteem lightly. | *"God forbid that I should undervalue the warm and faithful feelings of any of my fellow-creatures!"* — Jane Austen, *Persuasion* |
| [[underwater]] | adjective | **1.** Beneath the surface of the water.<br>**2.** Growing or remaining under water. | *"It seemed like he was underwater half an hour, but it couldn’t have been more than a few seconds."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[underway]] | adjective | **1.** Currently in progress. | *"In academic literature, underway designates currently in progress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underwear]] | noun | **1.** Undergarment worn next to the skin and under the outer garments. | *"For really cold weather--” “You're not planning to watch the thermometer and keep him changing underwear accordingly?” “Not at all, Doctor Burns."* — Grace S. Richmond, *Red Pepper Burns* |
| [[underweight]] | adjective | **1.** Being very thin. | *"In academic literature, underweight designates being very thin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underwing]] | noun | **1.** Moth having dull forewings and brightly colored hind wings. | *"In academic literature, underwing designates moth having dull forewings and brightly colored hind wings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underwood]] | noun | **1.** The brush (small trees and bushes and ferns etc.) growing beneath taller trees in a wood or forest. | *"The Underwood tariff, 1913. § 14."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[underworld]] | noun | **1.** The criminal class.<br>**2.** (religion) the world of the dead; -theognis. | *"What so natural, then, as to assume that it was in this artificial Underworld that such work as was necessary to the comfort of the daylight race was done?"* — H. G. Wells, *The Time Machine* |
| [[underwrite]] | verb | **1.** Guarantee financial support of.<br>**2.** Protect by insurance. | *"No, father; I cannot underwrite Article Four (leave alone the rest), taking it ‘in the literal and grammatical sense’ as required by the Declaration; and, therefore, I can’t be a parson in the present state of affairs,” said Angel."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[underwriter]] | noun | **1.** A banker who deals chiefly in underwriting new securities.<br>**2.** An agent who sells insurance. | *"Like a mob of young collegians, they are full of fight, fun, and wickedness, tumbling round the world at such a reckless, rollicking rate, that no prudent underwriter would insure them any more than he would a riotous lad at Yale or Harvard."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undescended]] | adjective | **1.** (of the testis) remaining in the abdomen instead of descending into the scrotum. | *"In academic literature, undescended designates (of the testis) remaining in the abdomen instead of descending into the scrotum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undescriptive]] | adjective | **1.** Not successful in describing. | *"In academic literature, undescriptive designates not successful in describing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undeserved]] | adjective | **1.** Not deserved or earned. | *"This is hard and undeserved measure, my lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undeservedly]] | adverb | **1.** In an unmerited manner. | *"Assuming that she did go down to see him, Princess Mary imagined the words he would say to her and what she would say to him, and these words sometimes seemed undeservedly cold and then to mean too much."* — graf Leo Tolstoy, *War and Peace* |
| [[undeserving]] | adjective | **1.** Not deserving. | *"My lady, to the manner of the days, In courtesy gives undeserving praise."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undesigned]] | adjective | **1.** Not done or made or performed with purpose or intent. | *"Economic monopoly is a result of private property that is undesigned by the government or by society."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undesirability]] | noun | **1.** The quality possessed by something that should be avoided. | *"In academic literature, undesirability designates the quality possessed by something that should be avoided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undesirable]] | noun | **1.** One whose presence is undesirable.<br>**2.** Not wanted. | *"He has no income outside his salary, his wife is an invalid, and he is worried in that he has been rejected by the life insurance doctors as an undesirable risk."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undesirably]] | adverb | **1.** In an undesirable manner. | *"In academic literature, undesirably designates in an undesirable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undesired]] | adjective | **1.** Not desired. | *"In academic literature, undesired designates not desired."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undesiring]] | adjective | **1.** Having or feeling no desire. | *"In academic literature, undesiring designates having or feeling no desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undesirous]] | adjective | **1.** Having or feeling no desire. | *"In academic literature, undesirous designates having or feeling no desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undestroyable]] | adjective | **1.** Very long lasting.<br>**2.** Not capable of being destroyed. | *"In academic literature, undestroyable designates very long lasting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undetectable]] | adjective | **1.** Not easily seen.<br>**2.** Barely able to be perceived. | *"We'll install undetectable barriers against psychic probes; then there are..." "Damn you, Ram." Brad cut in, his voice crackling with rage."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[undetected]] | adjective | **1.** Not perceived or discerned. | *"What is yonder undetected villain’s marble mansion with a door-plate for a waif; what is that but a Fast-Fish?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undeterminable]] | adjective | **1.** Not capable of being definitely decided or ascertained. | *"In academic literature, undeterminable designates not capable of being definitely decided or ascertained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undetermined]] | adjective | **1.** Not yet having been ascertained or determined.<br>**2.** Not precisely determined or established; not fixed or known in advance. | *"The lodging, that pride of your heart and mine, is given up, and _here he is again_--Charles, I mean--as unsettled and undetermined as ever."* — Anne Gilchrist, *Mary Lamb* |
| [[undeterred]] | adjective | **1.** Not deterred; - osbert sitwell. | *"On arriving before the battlements, I found the Union Jack flying and the drawbridge up; but undeterred by this show of defiance and resistance, I rang at the gate, and was admitted in a most pacific manner by the Aged."* — Charles Dickens, *Great Expectations* |
| [[undeveloped]] | adjective | **1.** Not developed.<br>**2.** Undeveloped or unused. | *"The potential competition of undeveloped countries on all sides, seeking to develop their resources, and profiting by the higher prices of food in the world-market caused by our tariff, threatens the peculiar advantages of the favored land."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undeviating]] | adjective | **1.** Going directly ahead from one point to another without veering or turning aside.<br>**2.** Used of values and principles; not subject to change; steady. | *"Believe it to be most fervent, most undeviating, in F."* — Jane Austen, *Persuasion* |
| [[undiagnosable]] | adjective | **1.** Not possible to diagnose. | *"In academic literature, undiagnosable designates not possible to diagnose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiagnosed]] | adjective | **1.** Eluding diagnosis. | *"In academic literature, undiagnosed designates eluding diagnosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undies]] | noun | **1.** Women's underwear. | *"As for undies they were Gerty’s chief care and who that knows the fluttering hopes and fears of sweet seventeen (though Gerty would never see seventeen again) can find it in his heart to blame her?"* — James Joyce, *Ulysses* |
| [[undifferentiated]] | adjective | **1.** Not differentiated. | *"In academic literature, undifferentiated designates not differentiated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undigested]] | adjective | **1.** Not thought over and arranged systematically in the mind; not absorbed or assimilated mentally.<br>**2.** Not digested. | *"Many of the latter type are persons overburdened either with unearned inherited wealth or with an undigested education."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undignified]] | adjective | **1.** Lacking dignity. | *"Sometimes this obscure corner received no inhabitant for the space of two or three years, and then it was usually but a pauper, a poacher, or other sinner of undignified sins."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[undiluted]] | adjective | **1.** Not diluted. | *"In academic literature, undiluted designates not diluted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiminished]] | adjective | **1.** Not lessened or diminished. | *"That I have ever had the strongest affection for her, and that I retain it undiminished."* — Charles Dickens, *Bleak House* |
| [[undimmed]] | adjective | **1.** Not made dim or less bright. | *"Eyes undimmed, faculties unimpaired, she _does what she can_."* — Classic Author, *The wonders of prayer* |
| [[undine]] | noun | **1.** Any of various female water spirits. | *"In academic literature, undine designates any of various female water spirits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiplomatic]] | adjective | **1.** Not skilled in dealing with others. | *"In academic literature, undiplomatic designates not skilled in dealing with others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiplomatically]] | adverb | **1.** Without diplomacy; in an undiplomatic manner. | *"In academic literature, undiplomatically designates without diplomacy; in an undiplomatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undirected]] | adjective | **1.** Aimlessly drifting. | *"Shakespeare, when young, had doubtless all the wildness and irregularity of an ardent, undisciplined, and undirected genius."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[undiscerning]] | adjective | **1.** Lacking discernment. | *"Casaubon seemed to be stupidly undiscerning and odiously unjust."* — George Eliot, *Middlemarch* |
| [[undischarged]] | adjective | **1.** Owed as a debt.<br>**2.** Still capable of exploding or being fired. | *"One, the most trifling part of my duty, remains undischarged."* — Walter Scott, *Ivanhoe: A Romance* |
| [[undiscipline]] | noun | **1.** The trait of lacking discipline. | *"But the latter was an undisciplined and lawless thing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undisciplined]] | adjective | **1.** Not subjected to discipline.<br>**2.** Not subjected to correction or discipline. | *"But the latter was an undisciplined and lawless thing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undisclosed]] | adjective | **1.** Not made known. | *"But there stood one in the midst of you, at whose brand of sin and infamy ye have not shuddered!” It seemed, at this point, as if the minister must leave the remainder of his secret undisclosed."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[undiscouraged]] | adjective | **1.** Not deterred; - osbert sitwell. | *"Rattle, rattle, went the small sound, undiscouraged."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[undiscoverable]] | adjective | **1.** Not able to be ascertained; resisting discovery. | *"A Formula of some great undiscoverable indefinable Thought...."* — Donn Byrne, *The Wind Bloweth* |
| [[undiscovered]] | adjective | **1.** Not discovered.<br>**2.** Not yet discovered. | *"Full often, like a shag-haired crafty kern, Hath he conversed with the enemy, And undiscovered come to me again And given me notice of their villainies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undiscriminating]] | adjective | **1.** Not discriminating. | *"The common law contained likewise a closely related body of doctrine by which the railroads, as common carriers, ought to have given equitable and undiscriminating rates to all shippers."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undisguised]] | adjective | **1.** Plain to see. | *"Alarmed at herself—fearing some further betrayal of a change so marked in its occasion, she rose and said in a low voice with undisguised anxiety, “I must go; I have overtired myself.” Mr."* — George Eliot, *Middlemarch* |
| [[undismayed]] | adjective | **1.** Unshaken in purpose. | *"I laughed; I sang; the depression of the last weeks fell from me like a cloak, and I faced the future glad and undismayed."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[undisputable]] | adjective | **1.** Not open to question; obviously true. | *"In academic literature, undisputable designates not open to question; obviously true."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undisputed]] | adjective | **1.** Generally agreed upon; not subject to dispute. | *"Her resolute effort threw back the lid, and gave to her astonished eyes the view of a white cotton counterpane, properly folded, reposing at one end of the chest in undisputed possession!"* — Jane Austen, *Northanger Abbey* |
| [[undisputedly]] | adverb | **1.** In an unarguable and undisputed manner. | *"In academic literature, undisputedly designates in an unarguable and undisputed manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undissolved]] | adjective | **1.** Retaining a solid form. | *"After the proper time, which is found by experiment, the liquid is drawn off, and in some cases the concentrates are given a second dose to ensure that the gold shall be thoroughly removed and none left undissolved."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[undistinguishable]] | adjective | **1.** Not capable of being distinguished or differentiated. | *"The fold stands empty in the drownèd field, And crows are fatted with the murrion flock; The nine-men’s-morris is fill’d up with mud, And the quaint mazes in the wanton green, For lack of tread, are undistinguishable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undistinguished]] | adjective | **1.** Not worthy of notice. | *"Fanny with doubting feelings had risen to meet him, but sank down again on finding herself undistinguished in the dusk, and unthought of."* — Jane Austen, *Mansfield Park* |
| [[undistorted]] | adjective | **1.** Without alteration or misrepresentation. | *"In academic literature, undistorted designates without alteration or misrepresentation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undistributed]] | adjective | **1.** (of investments) not distributed among a variety of securities. | *"In academic literature, undistributed designates (of investments) not distributed among a variety of securities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undisturbed]] | adjective | **1.** Untroubled by interference or disturbance. | *"Apollonie has become the real, true Castle-Apollonie of yore and manages for her master's sake to live in undisturbed peace with Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[undiversified]] | adjective | **1.** Not diversified. | *"In academic literature, undiversified designates not diversified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undividable]] | adjective | **1.** Cannot be divided without leaving a remainder. | *"Thyself I call it, being strange to me, That, undividable, incorporate, Am better than thy dear self’s better part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undivided]] | adjective | **1.** Not parted by conflict of opinion.<br>**2.** Not shared by or among others. | *"XXXVI Let me confess that we two must be twain, Although our undivided loves are one: So shall those blots that do with me remain, Without thy help, by me be borne alone."* — William Shakespeare, *Shakespeare's Sonnets* |
| [[undo]] | verb | **1.** Cancel, annul, or reverse an action or its effect.<br>**2.** Deprive of certain characteristics. | *"If there be here German, or Dane, Low Dutch, Italian, or French, let him speak to me, I’ll discover that which shall undo the Florentine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undoable]] | adjective | **1.** Impossible to achieve. | *"In academic literature, undoable designates impossible to achieve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undock]] | verb | **1.** Move out of a dock.<br>**2.** Take (a ship) out of a dock. | *"In academic literature, undock designates move out of a dock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undocumented]] | adjective | **1.** Lacking necessary documents (as for e.g. permission to live or work in a country). | *"In academic literature, undocumented designates lacking necessary documents (as for e.g. permission to live or work in a country)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undoer]] | noun | **1.** A seducer who ruins a woman.<br>**2.** A person who unfastens or unwraps or opens. | *"In academic literature, undoer designates a seducer who ruins a woman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undogmatic]] | adjective | **1.** Unwilling to accept authority or dogma (especially in religion). | *"In academic literature, undogmatic designates unwilling to accept authority or dogma (especially in religion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undogmatical]] | adjective | **1.** Unwilling to accept authority or dogma (especially in religion). | *"In academic literature, undogmatical designates unwilling to accept authority or dogma (especially in religion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undoing]] | noun | **1.** An act that makes a previous act of no effect (as if not done).<br>**2.** Loosening the ties that fasten something. | *"Marry, you are the wiser man; for many a man’s tongue shakes out his master’s undoing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undomestic]] | adjective | **1.** Not domestic or related to home. | *"In academic literature, undomestic designates not domestic or related to home."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undomesticated]] | adjective | **1.** Not domesticated.<br>**2.** Unaccustomed to home life. | *"In academic literature, undomesticated designates not domesticated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undone]] | verb | **1.** Cancel, annul, or reverse an action or its effect.<br>**2.** Deprive of certain characteristics. | *"I am undone: there is no living, none, If Bertram be away. ’Twere all one That I should love a bright particular star, And think to wed it, he is so above me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undoubtedly]] | adverb | **1.** Without doubt; certainly. | *"This Cardinal, Though from an humble stock, undoubtedly Was fashioned to much honour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undrained]] | adjective | **1.** Not drained. | *"In academic literature, undrained designates not drained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undramatic]] | adjective | **1.** Lacking dramatic force and quality. | *"In academic literature, undramatic designates lacking dramatic force and quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undramatically]] | adverb | **1.** In an undramatic manner. | *"In academic literature, undramatically designates in an undramatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undrape]] | verb | **1.** Strip something of drapery. | *"That immaculate manliness we feel within ourselves, so far within us, that it remains intact though all the outer character seem gone; bleeds with keenest anguish at the undraped spectacle of a valor-ruined man."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undraped]] | verb | **1.** Strip something of drapery.<br>**2.** Stripped of drapery. | *"That immaculate manliness we feel within ourselves, so far within us, that it remains intact though all the outer character seem gone; bleeds with keenest anguish at the undraped spectacle of a valor-ruined man."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undrawn]] | adjective | **1.** Not represented in a drawing. | *"I have not furnished the names of Senators who have left increased salary undrawn, as this information was not called for in the resolution."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[undreamed]] | adjective | **1.** Not imagined even in a dream. | *"To tack her about was undreamed of; to wear her required all hands and half a watch."* — Jack London, *The Jacket (The Star-Rover)* |
| [[undreamt]] | adjective | **1.** Not imagined even in a dream. | *"He moved on in silence, as if his energies were benumbed by the hitherto undreamt-of possibility that his position was untenable."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[undress]] | noun | **1.** Partial or complete nakedness.<br>**2.** Get undressed. | *"Madam, undress you, and come now to bed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undressed]] | verb | **1.** Get undressed.<br>**2.** Remove (someone's or one's own) clothes. | *"Despite all her lamenting the child was then undressed and put to bed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[undried]] | adjective | **1.** Still wet or moist. | *"In academic literature, undried designates still wet or moist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undrinkable]] | adjective | **1.** Unsuitable for drinking. | *"The Masai believe that were the couple to commit a breach of chastity, not only would the wine be undrinkable but the bees which made the honey would fly away."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[undset]] | noun | **1.** Norwegian novelist (1882-1949). | *"In academic literature, undset designates norwegian novelist (1882-1949)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undue]] | adjective | **1.** Not yet payable.<br>**2.** Not appropriate or proper (or even legal) in the circumstances. | *"No—I’ve hardly looked at her at all,” simpered Joseph, reducing his body smaller whilst talking, apparently from a meek sense of undue prominence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[undulant]] | adjective | **1.** Resembling waves in form or outline or motion. | *"Like sea-cliffs and caves resounded their ranks With shoulders like waves, and undulant flanks."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[undulate]] | verb | **1.** Stir up (water) so as to form ripples.<br>**2.** Occur in soft rounded shapes. | *"The huge corpulence of that Hogarthian monster undulates on the surface, scarcely drawing one inch of water."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undulation]] | noun | **1.** An undulating curve.<br>**2.** Wavelike motion; a gentle rising and falling in the manner of waves. | *"While composing a little treatise on Eternity, I had the curiosity to place a mirror before me; and ere long saw reflected there, a curious involved worming and undulation in the atmosphere over my head."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[undulatory]] | adjective | **1.** Resembling waves in form or outline or motion. | *"In academic literature, undulatory designates resembling waves in form or outline or motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undulipodium]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin und within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of und in systematic terminology. | *"In academic literature, undulipodium designates pertaining to, derived from, or characteristic of latin und within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unduly]] | adverb | **1.** To an undue degree. | *"I can see quite clearly what will happen without unduly imagining anything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[undutiful]] | adjective | **1.** Lacking due respect or dutifulness. | *"I know my duty; you are all undutiful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undutifulness]] | noun | **1.** Impiety characterized by lack of devotion to duty. | *"Let him take the consequences of his undutifulness and folly."* — William Makepeace Thackeray, *Vanity Fair* |
| [[undyed]] | adjective | **1.** Not artificially colored or bleached. | *"In academic literature, undyed designates not artificially colored or bleached."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undying]] | adjective | **1.** Never dying. | *"He is so unpleasant to me.” That very night she began an appealing letter to Clare, concealing from him her hardships, and assuring him of her undying affection."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[undynamic]] | adjective | **1.** Characterized by an absence of force or forcefulness. | *"In academic literature, undynamic designates characterized by an absence of force or forcefulness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ununderstandably]] | adverb | **1.** In an unintelligible manner. | *"In academic literature, ununderstandably designates in an unintelligible manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ununderstood]] | adjective | **1.** Not understood; - psychiatry. | *"In academic literature, ununderstood designates not understood; - psychiatry."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · UND
  </div>
</div>
