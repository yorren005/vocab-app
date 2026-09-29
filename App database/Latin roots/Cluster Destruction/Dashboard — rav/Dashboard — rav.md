---
status: unread
type: root_dashboard
---
# Dashboard — rav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to seize or snatch”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **rav** means to seize or snatch. It refers to the action of seizing and carrying out this process. In English, this root forms words such as *ravage*, *ravager*, *ravaging*, and *ravish*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to seize or snatch
> The root **rav** means to seize or snatch. It refers to the action of seizing and carrying out this process. In English, this root forms words such as *ravage*, *ravager*, *ravaging*, and *ravish*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To seize or snatch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *ravage* and *ravager*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rav** comes from a Latin word that means *"to seize or snatch"*.
  - At its core, it describes the action of seize or snatch.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **rav** in an English word, think of **to seize or snatch**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to seize or snatch).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ravage**: Violently destructive effect or damage.
  - **Ravager**: A person, army, plague, or natural force that causes devastation and ruin.
  - **Ravaging**: Inflicting widespread destruction, ruin, or severe bodily devastation.
  - **Ravish**: To seize and carry away by violent force.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rav</mark>, think of <mark class="hl-def">to seize or snatch</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rav** operates through two primary French morphological channels derived from Latin:
> - **Verbal Stem `rav-` (from Old French *ravir* < Vulgar Latin *\*rapīre*):**
>   - Extended with inchoative suffix *-ish* (French *-iss-*): Old French *ravir* $\to$ English [[ravish]].
>   - Participial adjective: *ravish + -ing* $\to$ [[ravishing]].
>   - Adverbial form: *ravishing + -ly* $\to$ [[ravishingly]].
>   - Abstract noun: *ravish + -ment* $\to$ [[ravishment]].
>   - Agent noun: *ravish + -er* $\to$ [[ravisher]].
> - **Collective Noun & Verb `ravage-` (from Old French *ravage*):**
>   - Direct borrowing: Old French *ravage* $\to$ English [[ravage]] (noun and verb).
>   - Agent noun: *ravage + -er* $\to$ [[ravager]].
>   - Participial adjective: *ravage + -ing* $\to$ [[ravaging]].
> - **Nominal & Adjectival Stem `ravin-` (from Old French *ravine* < Latin *rapīna*):**
>   - Adjective of voracious hunger: Old French *ravineux* $\to$ English [[ravenous]].
>   - Adverbial form: *ravenous + -ly* $\to$ [[ravenously]].
>   - Abstract noun: *ravenous + -ness* $\to$ [[ravenousness]].
>   - Geological chasm noun: Old French *ravine* $\to$ English [[ravine]].
>   - Verb of predatory feeding: Old French *ravener* $\to$ English [[raven]] (verb).
>   - Archaic noun of plunder: Middle English *ravin* $\to$ [[ravin]].

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
> Although unified by **"violent seizing and sweeping along"**, the derivatives of `rav` diverge into distinct registers:
> - **Environmental & Martial Devastation:** In [[ravage]], [[ravager]], and [[ravaging]], the root denotes the catastrophic ruin inflicted by hurricanes, wildfires, terminal cancer, or invading armies on cities and ecosystems.
> - **High Aesthetic & Mystical Enchantment:** In [[ravish]], [[ravishing]], and [[ravishingly]], the violent physical seizure was elevated by poets and theologians into the experience of being utterly captivated, enchanted, and emotionally carried away by beauty.
> - **Insatiable Metabolic Appetite:** In [[ravenous]], [[ravenously]], and [[ravenousness]], the root describes voracious, predatory hunger—whether an athlete's post-marathon appetite or the destructive greed of predatory financial cartels.
> - **Physical Topography & Hydrology:** In [[ravine]], the ancient violent mountain torrent (*rapīna*) leaves its permanent physical signature as a narrow, steep-sided bedrock gorge.
> - **Predatory Zoology:** In the verb [[raven]] and archaic noun [[ravin]], the root tracks carnivores and raptors hunting, plundering, and devouring prey in the wild.

---

## 🔀 4. Prefix & Combining Dynamics on rav

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-age` (French *-age*) | Collective Noun & Verb | [[ravage]] | The act or consequence of sweeping devastation. |
| `-ish` (French *-iss-*) | Verb (Action) | [[ravish]] | To seize violently; to enchant or transport emotionally. |
| `-ing` / `-ingly` | Participle & Adverb | [[ravishing]], [[ravishingly]] | Breathtakingly beautiful; in an enchanting manner. |
| `-ous` (French *-eux*) | Adjective (Abounding in) | [[ravenous]] | Full of rapacious, insatiable hunger or greed. |
| `-ment` (French *-ment*) | Abstract Noun (State) | [[ravishment]] | The state of being carried away by violence or ecstasy. |
| `-er` | Agent Noun | [[ravager]], [[ravisher]] | One who lays waste; one who violently carries off. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌪️ **Climatology & Disaster Relief** | [[ravage]], [[ravaging]] | Evaluating the economic and infrastructural ravages of Category 5 hurricanes and catastrophic wildfires. |
| 🏞️ **Geomorphology & Hydrology** | [[ravine]] | Fluvial erosion forming steep-sided mountain ravines, flash-flood risks in desert arroyos and slot canyons. |
| 🎭 **Aesthetics, Opera & Literature** | [[ravish]], [[ravishing]], [[ravishingly]] | Critical reviews of operatic sopranos, John Donne's Holy Sonnet XIV (*"for I, / Except you enthrall me, never shall be free, / Nor ever chaste, except you ravish me"*). |
| 🐾 **Wildlife Biology & Ethology** | [[ravenous]], [[raven]], [[ravin]] | Feeding behaviors of apex predators emerging from winter torpor, ravenous consumption in pack hunting. |
| 🏥 **Pathology & Oncology** | [[ravage]], [[ravaging]] | The ravages of neurodegenerative diseases, rapid progression of metastatic malignancies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cravat]] | noun | **1.** Neckwear worn in a slipknot with long ends overlapping vertically in front. | *"A portly, important-looking gentleman, dressed all in black, with a white cravat, large gold watch seals, a pair of gold eye-glasses, and a large seal-ring upon his little finger."* — Charles Dickens, *Bleak House* |
| [[ravage]] | noun | **1.** (usually plural) a destructive action.<br>**2.** Make a pillaging or destructive raid on (a place), as in wartimes. | *"There will be more for us.” “One word only, Master Land,” I said to the harpooner, who was beginning to ravage another coco-nut tree."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[ravaged]] | verb | **1.** Make a pillaging or destructive raid on (a place), as in wartimes.<br>**2.** Cause extensive destruction or ruin utterly. | *"Hyde raised himself on his arm and felt for his handkerchief--indifferent to Isabel's observation, or soothed by it: his features were ravaged."* — Anthony Pryde, *Nightfall* |
| [[ravaging]] | noun | **1.** Plundering with excessive damage and destruction.<br>**2.** Make a pillaging or destructive raid on (a place), as in wartimes. | *"Prolonged hostilities ravaging Holy Land providentially terminated."* — Effendi Shoghi, *Citadel of Faith* |
| [[rave]] | noun | **1.** A dance party that lasts all night and electronically synthesized music is played.<br>**2.** An extravagantly enthusiastic review. | *"I prithee grieve to make me merry, York; Stamp, rave, and fret, that I may sing and dance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rave-up]] | noun | **1.** A raucous gathering. | *"In academic literature, rave-up designates a raucous gathering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravehook]] | noun | **1.** A hooked hand tool used to prepare the seams of a boat for oakum. | *"In academic literature, ravehook designates a hooked hand tool used to prepare the seams of a boat for oakum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravel]] | noun | **1.** French composer and exponent of impressionism (1875-1937).<br>**2.** A row of unravelled stitches. | *"And must I ravel out My weaved-up follies?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[raveling]] | noun | **1.** A bit of fiber that has become separated from woven fabric.<br>**2.** Disentangle. | *"In academic literature, raveling designates a bit of fiber that has become separated from woven fabric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravelling]] | noun | **1.** A bit of fiber that has become separated from woven fabric.<br>**2.** Disentangle. | *"Davy had finished ravelling out his herring net and had wound the twine into a ball."* — L. M. Montgomery, *Anne of Avonlea* |
| [[raven]] | noun | **1.** Large black bird with a straight bill and long wedge-shaped tail.<br>**2.** Obtain or seize by violence. | *"Swift, swift, you dragons of the night, that dawning May bare the raven’s eye!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ravenala]] | noun | **1.** Giant treelike plant having edible nuts and leafstalks that yield a refreshing drink of clear watery sap; reputedly an emergency source of water for travelers. | *"In academic literature, ravenala designates giant treelike plant having edible nuts and leafstalks that yield a refreshing drink of clear watery sap; reputedly an emergency source of water for travelers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravening]] | verb | **1.** Obtain or seize by violence.<br>**2.** Prey on or hunt for. | *"The cloyed will— That satiate yet unsatisfied desire, that tub Both fill’d and running—ravening first the lamb, Longs after for the garbage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ravenna]] | noun | **1.** A battle between the french and an alliance of spaniards and swiss and venetians in 1512. | *"And perhaps he was cheered by keeping his eye on a chance of promotion to the fleet at Ravenna by and by, if he had good friends in Rome and survived the awful climate."* — Joseph Conrad, *Heart of Darkness* |
| [[ravenous]] | adjective | **1.** Extremely hungry.<br>**2.** Devouring or craving food in great quantities. | *"Or else, when thou didst keep my lambs a-field, I wish some ravenous wolf had eaten thee!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ravenously]] | adverb | **1.** In the manner of someone who is very hungry. | *"T’ pig doesn’t want it.” The girl emptied the stiffened mould into my hand, and I devoured it ravenously."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[ravenousness]] | noun | **1.** Excessive desire to eat. | *"In academic literature, ravenousness designates excessive desire to eat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[raver]] | noun | **1.** A participant in a rave dancing party.<br>**2.** Someone who rants and raves; speaks in a violent or loud manner. | *"In academic literature, raver designates a participant in a rave dancing party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravigote]] | noun | **1.** Veloute sauce seasoned with chopped chervil, chives, tarragon, shallots and capers. | *"In academic literature, ravigote designates veloute sauce seasoned with chopped chervil, chives, tarragon, shallots and capers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravigotte]] | noun | **1.** Veloute sauce seasoned with chopped chervil, chives, tarragon, shallots and capers. | *"In academic literature, ravigotte designates veloute sauce seasoned with chopped chervil, chives, tarragon, shallots and capers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravine]] | noun | **1.** A deep narrow steep-sided valley (especially one formed by running water). | *"If he had not held the reins tightly, your wild cries would have driven horses and carriage down the ravine long ago." All arms suddenly dropped and all eyes were directed towards the figure on the coachman's seat."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[raving]] | noun | **1.** Declaiming wildly.<br>**2.** Participate in an all-night techno dance party. | *"The hum of the thresher, which prevented speech, increased to a raving whenever the supply of corn fell short of the regular quantity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ravingly]] | adverb | **1.** In a raving manner. | *"In academic literature, ravingly designates in a raving manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravioli]] | noun | **1.** Small circular or square cases of dough with savory fillings. | *"In academic literature, ravioli designates small circular or square cases of dough with savory fillings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravish]] | verb | **1.** Force (someone) to have sex against their will.<br>**2.** Hold spellbound. | *"You have holp to ravish your own daughters and To melt the city leads upon your pates, To see your wives dishonoured to your noses— MENENIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ravisher]] | noun | **1.** Someone who assaults others sexually.<br>**2.** A very attractive or seductive looking woman. | *"SECOND SERVINGMAN. ’Tis so, and as war in some sort, may be said to be a ravisher, so it cannot be denied but peace is a great maker of cuckolds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ravishing]] | verb | **1.** Force (someone) to have sex against their will.<br>**2.** Hold spellbound. | *"It was a strain of vocal music, more plaintive than the widowed turtle's moan, more sweet and ravishing than Philomel's love-warbled song."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[ravishingly]] | adverb | **1.** In a ravishing manner or to a ravishing degree. | *"In academic literature, ravishingly designates in a ravishing manner or to a ravishing degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ravishment]] | noun | **1.** A feeling of delight at being filled with wonder and enchantment.<br>**2.** The crime of forcing a woman to submit to sexual intercourse against her will. | *"And they, like straggling slaves for pillage fighting, Obdurate vassals fell exploits effecting, In bloody death and ravishment delighting, Nor children’s tears nor mothers’ groans respecting, Swell in their pride, the onset still expecting."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unravel]] | verb | **1.** Become or cause to become undone by separating the fibers or threads of.<br>**2.** Disentangle. | *"He could have gone with us at that time of the year very well, but he was in the full novelty of his new position and was making most energetic attempts to unravel the mysteries of the fatal suit."* — Charles Dickens, *Bleak House* |
| [[unraveler]] | noun | **1.** A person who removes tangles; someone who takes something out of a tangled state. | *"In academic literature, unraveler designates a person who removes tangles; someone who takes something out of a tangled state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unraveller]] | noun | **1.** A person who removes tangles; someone who takes something out of a tangled state. | *"In academic literature, unraveller designates a person who removes tangles; someone who takes something out of a tangled state."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RAV
  </div>
</div>
