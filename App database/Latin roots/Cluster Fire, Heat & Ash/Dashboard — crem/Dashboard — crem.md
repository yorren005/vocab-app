---
status: unread
type: root_dashboard
---
# Dashboard — crem
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">crem-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to burn or consume by fire”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Bright warm flames crackling inside a hearth and radiating glowing heat.</span>
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

The root **crem** means to burn or consume by fire. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *cremate*, *cremation*, *crematorium*, and *crematory*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to burn or consume by fire
> The root **crem** means to burn or consume by fire. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *cremate*, *cremation*, *crematorium*, and *crematory*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To burn or consume by fire</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *cremate* and *cremation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **crem** comes from a Latin word that means *"to burn or consume by fire"*.
  - At its core, it describes the action of burn or consume by fire.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **crem** in an English word, think of **to burn or consume by fire**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to burn or consume by fire).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cremate**: To reduce to ashes and bone fragments by high-temperature burning in a dedicated furnace.
  - **Cremation**: The act, process, or ceremony of reducing a dead body to ashes by burning.
  - **Crematorium**: A building or facility equipped with industrial furnaces for cremating dead bodies, typically including a commemorative chapel and memorial grounds.
  - **Crematory**: A furnace or facility for cremating dead bodies.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">crem</mark>, think of <mark class="hl-def">to burn or consume by fire</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **crem** operates through two principal morphological bases in English:
>
> 1. **The Participial Stem `cremāt-`** (from *cremātum*, past participle of *cremāre*):
>    - Primary verb: *cremate*.
>    - Noun of action and process: *cremation*.
>    - Adjectives of relation: *cremational*, *cremative*.
>    - Institutional and spatial designations: *crematorium* (via *-ōrium*), *crematory* (via *-ory*).
>    - Agent and technological nouns: *cremator*, *cremationist*, *crematist*.
>    - Modern portmanteau: *cremains* (*crem*ated + re*mains*).
> 2. **The Prefixed Compound Stem `concrem-`** (from Latin *con-* "together" + *cremāre*):
>    - Anthropological and comparative ritual nouns: *concremation* (joint burning on a funeral pyre).
>    - Action verb: *concremate*.

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

> [!tip] 🌈 The Three Conceptual Provinces of `crem`
>
> ```
>                            ┌── 1. Mortuary Procedure & Funerary Rites (cremate, cremation, cremains)
>   [crem: consume by fire] ─┼── 2. Facilities, Technology & Apparatus (crematorium, crematory, cremator)
>                            └── 3. Social Reform & Anthropology (cremationist, crematist, concremation)
> ```
>
> 1. **Mortuary Procedure, Law & Funerary Rites:**
>    - The legal, ceremonial, and physical reduction of human remains to ashes: *cremate* (to burn a corpse to ash), *cremation* (the funeral rite), *cremains* (pulverized bone ash returned to families).
> 2. **Facilities, Architecture & Combustion Technology:**
>    - The physical plant and industrial retort designed for high-temperature thermal transformation: *crematorium* (the building and grounds), *crematory* (the furnace or institution), *cremator* (the furnace operator or the chamber itself).
> 3. **Social Movements, Advocacy & Anthropological History:**
>    - The intellectual reform movement that legalized cremation in modern times, and the cross-cultural study of burning rituals: *cremationist* (an advocate of cremation), *crematist*, *concremation* (the collective burning of widows or attendants on a leader's pyre).

---

## 🔀 4. Prefix & Combining Dynamics on crem

### Prefix Dynamics

| Prefix | Morpheme Meaning | Latin Source Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `con-` | together, completely | *concremāre* | [[concremation]], [[concremate]] | To burn *together* simultaneously; specifically burning attendants or a widow with the deceased. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ate` | Verb (To perform an action) | *cremāre* + *-ātus* | [[cremate]] | To reduce a dead body to ash in a furnace. |
| `-tion` | Noun (Process or rite) | *cremāre* + *-tiō* | [[cremation]] | The official process or funeral rite of cremating a corpse. |
| `-orium` | Noun (Place / establishment) | *cremāt-* + *-ōrium* | [[crematorium]] | A facility or chapel containing furnaces for cremation. |
| `-ory` | Noun / Adjective (Facility / Pertaining to) | *cremāt-* + *-ōrius* | [[crematory]] | A cremation facility (noun); relating to cremation (adjective). |
| `-or` | Noun (Agent / Instrument) | *cremāt-* + *-or* | [[cremator]] | A cremation furnace or the technician operating it. |
| `-ist` | Noun (Advocate / Practitioner) | *cremation* + *-ist* | [[cremationist]], [[crematist]] | One who promotes or advocates the practice of cremation. |
| `-al` | Adjective (Relational) | *cremation* + *-al* | [[cremational]] | Pertaining to or involving cremation. |
| `-ive` | Adjective (Tending to, having nature of) | *cremāt-* + *-ive* | [[cremative]] | Capable of or serving to cremate. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| ⚱️ **Mortuary Science & Funeral Law** | [[cremate]], [[cremation]], [[cremains]], [[cremator]] | **Cremation** requires strict legal protocols, including coroner clearance, removal of battery-operated cardiac pacemakers, and post-cremation processing (pulverization of bone fragments into **cremains**). |
| 🏛️ **Architecture & Urban Planning** | [[crematorium]], [[crematory]] | 19th- and 20th-century architects (such as Gunnar Asplund at Stockholm's Woodland Crematorium) developed a distinct genre of civic architecture balancing solemn spiritual landscape design with industrial filtration systems. |
| 📜 **Sociology, History & Public Health** | [[cremationist]], [[crematist]], [[concremation]] | Late Victorian **cremationists** framed the revival of cremation as an essential sanitary measure against overcrowded, disease-spreading municipal churchyards. Comparative ethnologists document **concremation** across ancient Eurasian and Mesoamerican cultures. |
| 🏺 **Classical Archaeology** | [[cremation]] | Archaeologists analyze calcined bone fragments from Roman *ustrinae* and Celtic urn fields using strontium and oxygen isotope ratios to determine geographic origins and nutritional status. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cremains]] | noun | **1.** The remains of a dead body after cremation. | *"In academic literature, cremains designates the remains of a dead body after cremation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cremate]] | verb | **1.** Reduce to ashes. | *"Cremate, 29. _See_ Burning, Giving, Relics."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[cremation]] | noun | **1.** The incineration of a dead body. | *"A reliquary, or shrine, of cupola-shape to contain remains after cremation, especially of the Buddha. _Subhūti_."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[crematorium]] | noun | **1.** A mortuary where corpses are cremated.<br>**2.** A furnace where a corpse can be burned and reduced to ashes. | *"In academic literature, crematorium designates a mortuary where corpses are cremated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crematory]] | noun | **1.** A mortuary where corpses are cremated.<br>**2.** A furnace where a corpse can be burned and reduced to ashes. | *"In academic literature, crematory designates a mortuary where corpses are cremated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cremona]] | noun | **1.** A city in lombardy on the po river; noted for the manufacture of fine violins from the 16th to the 18th centuries. | *"A lady coming into a room hastily with her mantua brushed down a Cremona fiddle that lay on a chair, and broke it; upon which, a gentleman that was present, burst into this exclamation from Virgil: Mantua, væ miseræ nimium vicina Cremonæ!"* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[decrement]] | noun | **1.** The amount by which something decreases.<br>**2.** A process of becoming smaller or shorter. | *"Increments and decrements of value on a great scale are unearned, and all classes of goods are affected, though in varying degrees. § II."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[excrement]] | noun | **1.** Waste matter (as urine or sweat but especially feces) discharged from the body. | *"Why is Time such a niggard of hair, being, as it is, so plentiful an excrement?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[increment]] | noun | **1.** A process of becoming larger or longer or more numerous or more important.<br>**2.** The amount by which something increases. | *"His book had gone through four editions, and, with the increment of the noble war poetry of "Drum Taps," had become a volume of size."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[incremental]] | adjective | **1.** Increasing gradually by regular degrees or additions. | *"In academic literature, incremental designates increasing gradually by regular degrees or additions."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Fire, Heat & Ash]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CREM
  </div>
</div>
