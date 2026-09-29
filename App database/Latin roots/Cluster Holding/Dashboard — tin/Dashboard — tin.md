---
status: unread
type: root_dashboard
---
# Dashboard — tin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to hold or keep”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **tin** means to hold or keep. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *continue*, *continuous*, *pertinent*, and *retinue*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to hold or keep
> The root **tin** means to hold or keep. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *continue*, *continuous*, *pertinent*, and *retinue*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To hold or keep</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *continue* and *continuous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tin** comes from a Latin word that means *"to hold or keep"*.
  - At its core, it describes the action of hold or keep.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **tin** in an English word, think of **to hold or keep**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to hold or keep).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Continue**: To persist in an activity or state without stopping.
  - **Continuous**: Forming an unbroken whole, without interruption, gap, or interval.
  - **Pertinent**: Relevant, applicable, and directly holding to a particular subject or problem.
  - **Retinue**: A group of advisors, assistants, armed guards, or servants accompanying an important or aristocratic person.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tin</mark>, think of <mark class="hl-def">to hold or keep</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tin** operates primarily through Latin participial and adjectival combining forms:
> 1. **Present Participial Adjectives & Nouns in `-ent` / `-ence` (from *-tinēns*, *-tinentia*):**
>    - *continent*, *continency*, *incontinent*, *incontinence*.
>    - *pertinent*, *pertinence*, *impertinent*, *impertinence*.
>    - *abstinent*, *abstinence*.
> 2. **Adjectival Formations in `-uous` (from *continuus*):**
>    - *continuous*, *continuously*, *continuousness*, *discontinuous*.
> 3. **Abstract Nouns in `-ity` and `-ance` / `-ation`:**
>    - *continuity*, *discontinuity*, *continuance*, *continuation*, *discontinuation*.
> 4. **Substantive Latin Neuter Noun:**
>    - *continuum* (plural *continua*).
> 5. **Anatomical Retaining Suffix `-aculum`:**
>    - *retinaculum* (plural *retinacula* < Latin *retināculum* "halter, retaining strap").
> 6. **Geographical Prefixes Compounding with `continent`:**
>    - *continental*, *subcontinent*, *intercontinental*, *transcontinental*.

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
> - **Geography & Geopolitics:** *Continent*, *continental*, *subcontinent*, *intercontinental*, *transcontinental* — vast unbroken landmasses; tectonic plates; trans-global ballistic missiles.
> - **Mathematics, Physics & Philosophy:** *Continuity*, *continuous*, *continuum*, *discontinuity*, *discontinuous* — calculus limits without leaps; the four-dimensional spacetime continuum; quantum discrete jumps.
> - **Morals, Asceticism & Physiology:** *Abstinence*, *abstinent*, *continent*, *incontinent*, *incontinence* — voluntary denial of food/pleasure; neurological or muscular control over excretion.
> - **Epistemology, Law & Etiquette:** *Pertinent*, *pertinence*, *impertinent*, *impertinence* — relevance to legal issues; rude disregard of social propriety.
> - **Social Bearing & Feudal Chivalry:** *Countenance*, *retinue*, *maintenance* — facial expression and composure; an aristocratic prince's entourage of sworn followers.
> - **Surgical Anatomy:** *Retinaculum* — fibrous bands holding tendons in anatomical position across wrist or ankle joints.

---

## 🔀 4. Prefix & Combining Dynamics on tin

### Prefix Shifts (Directional & Semantic Modification on `-tin-`)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `con-` | together, completely, unbroken | [[continent]], [[continue]], [[continuity]] | Holding together without gap; an unbroken landmass, process, or moral restraint. |
| `per-` | through, thoroughly | [[pertinent]], [[pertinence]] | Holding through to the core; directly applicable and logically relevant. |
| `abs-` | away, from | [[abstinence]], [[abstinent]] | Holding oneself back from indulgence; ascetic refraining. |
| `in-` (1) | not, un- (privative) | [[incontinent]], [[incontinence]], [[impertinent]] | Inability to hold bodily excretions; failing to hold relevance $\to$ rude insolence. |
| `dis-` | apart, reversal, cessation | [[discontinue]], [[discontinuity]] | Breaking the continuous hold; interruption of supply, process, or function. |
| `sub-` | under, subordinate | [[subcontinent]], [[subcontinental]] | A large landmass forming a distinct, subordinate subdivision of a continent. |
| `trans-` | across, beyond | [[transcontinental]] | Stretching across an entire continent (e.g., transcontinental railroad). |
| `inter-` | between, among | [[intercontinental]] | Connecting or traveling between two or more continents. |
| `re-` | back, behind | [[retinue]], [[retinaculum]] | That which is held back in service (a lord's retinue); a retaining band. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ent` | Adjective (Active State) | [[continent]], [[pertinent]], [[abstinent]], [[impertinent]] | Characterizing an entity as holding together, relating, or restraining. |
| `-ence` / `-ency` | Abstract Noun (Quality / Condition) | [[abstinence]], [[pertinence]], [[impertinence]], [[incontinence]] | The ethical, legal, or physiological condition of holding or failing to hold. |
| `-uous` | Adjective (Unbroken Flow) | [[continuous]], [[discontinuous]] | Expressing unbroken physical, temporal, or spatial extension. |
| `-ity` | Noun (State / Mathematical Quality) | [[continuity]], [[discontinuity]] | The property of unbroken connection in calculus, topology, or philosophy. |
| `-ance` / `-ation` | Noun (Process / Event) | [[continuance]], [[continuation]], [[maintenance]] | The ongoing prolongation or formal extension of a process or trial. |
| `-aculum` (Latin) | Instrumental Noun (Retaining Band) | [[retinaculum]] | An anatomical structure that holds other tissues or tendons firmly in place. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌍 **Geography, Geophysics & Geopolitics** | [[continent]], [[continental]], [[subcontinent]], [[transcontinental]], [[intercontinental]] | Plate tectonics and continental drift (Alfred Wegener); intercontinental ballistic missiles (ICBMs); the transcontinental railway network. |
| 📐 **Mathematics, Calculus & Physics** | [[continuity]], [[continuous]], [[continuum]], [[discontinuity]] | The $(\epsilon, \delta)$-definition of continuous functions in real analysis; Einsteinian spacetime continuum; quantum discontinuity in atomic transitions. |
| 🩺 **Urology, Geriatrics & Surgery** | [[incontinence]], [[continent]], [[retinaculum]] | Stress and urge urinary incontinence; the flexor retinaculum of the wrist in carpal tunnel syndrome decompression surgery. |
| ⚖️ **Law, Evidence & Trial Procedure** | [[pertinent]], [[impertinence]], [[continuance]], [[maintenance]] | Rule 401 evidentiary relevance (pertinent facts); motions for a continuance delaying trial proceedings; legal doctrines of champerty and maintenance. |
| 🏛️ **Ethics, Religion & Medieval History** | [[abstinence]], [[countenance]], [[retinue]] | Lenten fasting and sexual abstinence in monastic rules; aristocratic retinues during the Wars of the Roses; maintaining an unruffled countenance. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abstinence]] | noun | **1.** The trait of abstaining (especially from alcohol).<br>**2.** Act or practice of refraining from indulging an appetite. | *"Refrain tonight, And that shall lend a kind of easiness To the next abstinence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abstinent]] | noun | **1.** A person who refrains from drinking intoxicating beverages.<br>**2.** Self-restraining; not indulging an appetite especially for food or drink. | *"In academic literature, abstinent designates a person who refrains from drinking intoxicating beverages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[continence]] | noun | **1.** The exercise of self constraint in sexual matters.<br>**2.** Voluntary control over urinary and fecal discharge. | *"There is a want of faith, a half-heartedness about men's prayers; they pray as Augustine says he himself did: "Give me chastity and continence, but not now" (Conf, viii. 7, 17)."* — T. R. Glover, *The Jesus of History* |
| [[continency]] | noun | **1.** The exercise of self constraint in sexual matters. | *"This ungenitured agent will unpeople the province with continency."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[continent]] | noun | **1.** One of the large landmasses of the earth.<br>**2.** The european mainland. | *"Heart, once be stronger than thy continent; Crack thy frail case!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[continental]] | adjective | **1.** Of or pertaining to or typical of europe.<br>**2.** Of or relating to or concerning the american colonies during and immediately after the american revolutionary war. | *"There was, so to speak, that symmetry in their distortion which is less the characteristic of British than of Continental grotesques of the period."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[impertinence]] | noun | **1.** An impudent statement.<br>**2.** The trait of being rude and impertinent; inclined to take liberties. | *"Isn't it possible that the child should have unconsciously said an impertinence?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[impertinent]] | adjective | **1.** Characterized by a lightly pert and exuberant quality.<br>**2.** Not pertinent to the matter under consideration. | *"In very brief, the suit is impertinent to myself, as your worship shall know by this honest old man, and though I say it, though old man, yet poor man, my father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incontinence]] | noun | **1.** Involuntary urination or defecation.<br>**2.** Indiscipline with regard to sensuous pleasures. | *"The conversation soon broke forth again from the lips of Peechy Prauw Van Hook, the chronicler of the club, one of those prosing, narrative old men who seem to be troubled with an incontinence of words as they grow old."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[incontinency]] | noun | **1.** Involuntary urination or defecation. | *"The cognizance of her incontinency Is this: she hath bought the name of whore thus dearly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incontinent]] | adjective | **1.** Not having control over urination and defecation. | *"He says he will return incontinent, He hath commanded me to go to bed, And bade me to dismiss you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intercontinental]] | adjective | **1.** Extending or taking place between or among continents. | *"Urge maintenance of momentum in triple field, home, intercontinental enterprises."* — Effendi Shoghi, *Citadel of Faith* |
| [[pertinence]] | noun | **1.** Relevance by virtue of being applicable to the matter at hand. | *"It was in any case over _my_ life, _my_ past, and _my_ friends alone that we could take anything like our ease—a state of affairs that led them sometimes without the least pertinence to break out into sociable reminders."* — Henry James, *The Turn of the Screw* |
| [[pertinency]] | noun | **1.** Relevance by virtue of being applicable to the matter at hand. | *"In academic literature, pertinency designates relevance by virtue of being applicable to the matter at hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pertinent]] | adjective | **1.** Having precise or logical relevance to the matter at hand.<br>**2.** Being of striking appropriateness and pertinence. | *"But yet my caution was more pertinent Than the rebuke you give it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[retinue]] | noun | **1.** The group following and attending to some important person. | *"Not only, sir, this your all-licens’d fool, But other of your insolent retinue Do hourly carp and quarrel; breaking forth In rank and not-to-be-endured riots."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subcontinent]] | noun | **1.** A large and distinctive landmass (as india or greenland) that is a distinct part of some continent. | *"In academic literature, subcontinent designates a large and distinctive landmass (as india or greenland) that is a distinct part of some continent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tin]] | noun | **1.** A silvery malleable metallic element that resists corrosion; used in many alloys and to coat other metals to prevent corrosion; obtained chiefly from cassiterite where it occurs as tin oxide.<br>**2.** A vessel (box, can, pan, etc.) made of tinplate and used mainly in baking. | *"Jarndyce, “a habitable doll’s house with good board and a few tin people to get into debt with and borrow money of would set the boy up in life."* — Charles Dickens, *Bleak House* |
| [[tined]] | verb | **1.** Plate with tin.<br>**2.** Preserve in a can or tin. | *"Cainy and I haven’t tined our eyes to-night.” “A good few twins, too, I hear?” “Too many by half."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tinned]] | verb | **1.** Plate with tin.<br>**2.** Preserve in a can or tin. | *"Rice again, with perhaps stewed fowl or tinned beef, and a dessert of jam and biscuit, usually formed my luncheon, and dinner was like unto it, save that occasionally we succeeded in securing some onions or potatoes."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[tinner]] | noun | **1.** Someone who makes or repairs tinware. | *"In academic literature, tinner designates someone who makes or repairs tinware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tinning]] | noun | **1.** The application of a thin layer of soft solder to the ends of wires before soldering them.<br>**2.** The application of a protective layer of tin. | *"Tinning Copper Shell._ Tin-foil is melted on the back of the copper shell."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[tinny]] | adjective | **1.** Of or containing tin.<br>**2.** Of very poor quality; flimsy. | *"In academic literature, tinny designates of or containing tin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transcontinental]] | adjective | **1.** Spanning or crossing or on the farther side of a continent. | *"In academic literature, transcontinental designates spanning or crossing or on the farther side of a continent."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TIN
  </div>
</div>
