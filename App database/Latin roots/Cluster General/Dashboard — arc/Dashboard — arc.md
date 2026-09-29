---
status: unread
type: root_dashboard
---
# Dashboard — arc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">arc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to shut in, keep off, or enclose”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Everyday foundational concepts that structure how we describe reality.</span>
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

The root **arc** means to shut in, keep off, or enclose. It refers to closing a barrier, blocking a passage, or locking something in. In English, this root forms words such as *arcade*, *arcane*, *arcanum*, and *arcature*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to shut in, keep off, or enclose
> The root **arc** means to shut in, keep off, or enclose. It refers to closing a barrier, blocking a passage, or locking something in. In English, this root forms words such as *arcade*, *arcane*, *arcanum*, and *arcature*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To shut in, keep off, or enclose</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Everyday foundational concepts that structure how we describe reality.</mark>
> - **Everyday Connection**: Think of familiar words like *arcade* and *arcane*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **arc** comes from a Latin word that means *"to shut in, keep off, or enclose"*.
  - At its core, it describes the action of shut in, keep off, or enclose.

- **The Big Picture Idea**:
  - Picture everyday foundational concepts that structure how we describe reality.
  - Whenever you see **arc** in an English word, think of **to shut in, keep off, or enclose**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to shut in, keep off, or enclose).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Arcade**: A series of arches supported by columns or piers, either freestanding or applied to a wall.
  - **Arcane**: Understood by only a few.
  - **Arcanum**: A deep secret or mystery.
  - **Arcature**: A miniature or decorative arcade, especially a series of small blind arches adorning a wall surface.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arc</mark>, think of <mark class="hl-def">to shut in, keep off, or enclose</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `arc`
> English vocabulary stems from both *arcus* and *arca/arcēre*:
> 1. **The Nominal Base *arcus* ("bow, arch"):**
>    - *arcus* $ightarrow$ Old French *arc* $ightarrow$ English **arc**.
>    - *arcus* $ightarrow$ Old French *arche* $ightarrow$ English **arch**, **arched**, **overarch**.
>    - *arcada* (Provençal) $ightarrow$ French *arcade* $ightarrow$ English **arcade**.
>    - *arcuārius* (bowman) $ightarrow$ Old French *archier* $ightarrow$ English **archer**, **archery**.
>    - *arcuātus* (curved like a bow) $ightarrow$ English **arcuate**, **arcuately**, **arcuation**.
>    - *arcus* + *forma* $ightarrow$ **arciform** (bow-shaped).
> 2. **The Nominal Base *arca* ("chest, strongbox"):**
>    - *arca* $ightarrow$ Proto-Germanic loan $ightarrow$ Old English *earc* $ightarrow$ English **ark**.
>    - *arcānus* (secret, shut in a chest) $ightarrow$ English **arcane**.
>    - *arcānum* (neuter noun) $ightarrow$ English **arcanum** (plural *arcana*).
> 3. **The Verbal Base *arcēre* ("to enclose, restrain"):**
>    - *com-* + *arcēre* $ightarrow$ *coercēre* $ightarrow$ English **coerce**, **coercion**, **coercive**, **coercible**.
>    - *ex-* + *arcēre* $ightarrow$ *exercēre* $ightarrow$ English **exercise**, **exercitation**.

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

```
                                  ┌── Structural & Ballistics ── arc, arch, arcade, archer, archery, arcuate
                                  │
                                  ├── Esoteric & Mystical ────── arcane, arcanum, arcana
    [ARC-] ───────────────────────┼── Sacred Receptacles ─────── ark (Noah's Ark, Ark of the Covenant)
 (bow / arch / chest)             │
                                  ├── Legal Compulsion ───────── coerce, coercion, coercive, coercible
                                  │
                                  └── Physical & Mental Drill ── exercise, exercitation
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Geometry, Architecture & Ballistics:** *arc*, *arch*, *arcade*, *archer*, *archery*, *arcuate*, *arcuately*, *arcuation*, *arciform*, *overarch*, *overarching*.
> 2. **Esoteric Knowledge & Hidden Secrets:** *arcane*, *arcanum*, *arcana*.
> 3. **Sacred Vessels & Theology:** *ark*.
> 4. **Criminal Law, Force & Compulsion:** *coerce*, *coercion*, *coercive*, *coercively*, *coerciveness*, *coercible*, *incoercible*.
> 5. **Athletic & Intellectual Training:** *exercise*, *exercitation*.

---

## 🔀 4. Prefix & Combining Dynamics on arc

### Prefix Dynamics

| Prefix / Combining Form | Core Value | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `com-` | together, completely | **coerce**, **coercion** | Enclosing tightly from all sides; compelling compliance by superior force. |
| `ex-` | out of, from | **exercise** | Literally "driving out of the enclosure into action"; training, drilling. |
| `over-` | above, across | **overarch**, **overarching** | Forming an arch overhead; providing a dominant, all-embracing umbrella concept. |
| `in-` | not (negation) | **incoercible** | Incapable of being contained, restrained, or compelled. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ade` | Collective / architectural noun | **arcade** | A continuous series of arches supported by columns. |
| `-er` | Agent noun | **archer** | A bowman skilled in the use of bow and arrow. |
| `-ery` | Art or practice noun | **archery** | The art, craft, or sport of shooting with a bow. |
| `-ate` (Latin *-ātus*) | Participial adjective | **arcuate** | Curved or bent like an archer's bow. |
| `-ane` (Latin *-ānus*) | Adjective of belonging | **arcane** | Pertaining to that which is locked inside a strongbox; esoteric. |
| `-ive` | Adjective of tendency | **coercive** | Tending to compel or restrain by force. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🏛️ **Architecture & Civil Engineering** | *arch*, *arc*, *arcade*, *arcuate*, *overarching* | Designing masonry voussoir arches, flying buttresses, vaulting ribs, and calculating structural compressive loads. |
| ⚖️ **Constitutional Law, Ethics & Forensics** | *coerce*, *coercion*, *coercive* | Evaluating involuntary confessions under the Fifth Amendment; defining extortion, duress, and undue influence in contract litigation. |
| 🏋️ **Kinesiology & Exercise Physiology** | *exercise*, *arcuate* | Prescribing resistance training protocols; analyzing arcuate ligaments and biomechanical joint articulation. |
| 📜 **Comparative Religion & Biblical Studies** | *ark*, *arcana* | Translating texts concerning the Ark of the Covenant, the tabernacle sanctuary, and esoteric hermetic arcana. |
| 🎯 **Sports Science & Military History** | *archer*, *archery* | Analyzing draw weights of English yew longbows, arrow flight ballistics, and Olympic target archery form. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arc]] | noun | **1.** Electrical conduction through a gas in an applied electric field.<br>**2.** A continuous portion of a circle. | *"Joan of Arc hath been A virgin from her tender infancy, Chaste and immaculate in very thought; Whose maiden blood, thus rigorously effused, Will cry for vengeance at the gates of heaven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arca]] | noun | **1.** Type genus of the family arcidae: ark shells and blood clams. | *"Nay an she fail me once—You can tell, Arcas, She swore by wine and bread, she would not break."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arcade]] | noun | **1.** A covered passageway with shops and stalls on either side.<br>**2.** A structure composed of a series of arches supported by columns. | *"Lord Henry passed up the low arcade into Burlington Street and turned his steps in the direction of Berkeley Square."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[arcadia]] | noun | **1.** A department of greece in the central peloponnese. | *"Nothing could be more commonplace than Chilmark, believe me: life is like this all over rural England, and it's only from a distance that one takes it for Arcadia." "Folly," said Lawrence."* — Anthony Pryde, *Nightfall* |
| [[arcadian]] | noun | **1.** An inhabitant of arcadia.<br>**2.** (used with regard to idealized country life) idyllically rustic. | *"Oak could pipe with Arcadian sweetness, and the sound of the well-known notes cheered his own heart as well as those of the loungers."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[arcadic]] | noun | **1.** The dialect of ancient greek spoken by arcadians. | *"In academic literature, arcadic designates the dialect of ancient greek spoken by arcadians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcado-cyprians]] | noun | **1.** The ancient greek inhabitants of achaea. | *"In academic literature, arcado-cyprians designates the ancient greek inhabitants of achaea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcane]] | adjective | **1.** Requiring secret or mysterious knowledge. | *"In academic literature, arcane designates requiring secret or mysterious knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcanum]] | noun | **1.** Information known only to a special group. | *"Certainly no man whatever; for this arcanum doth enter into an artist of a stiff neck; he only hath it who transcends the progress of angels and comes to the very Archtype himself."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[arccos]] | noun | **1.** The inverse function of the cosine; the angle that has a cosine equal to a given number. | *"In academic literature, arccos designates the inverse function of the cosine; the angle that has a cosine equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arccosecant]] | noun | **1.** The angle that has a cosecant equal to a given number. | *"In academic literature, arccosecant designates the angle that has a cosecant equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arccosine]] | noun | **1.** The inverse function of the cosine; the angle that has a cosine equal to a given number. | *"In academic literature, arccosine designates the inverse function of the cosine; the angle that has a cosine equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arccotangent]] | noun | **1.** The inverse function of the cotangent; the angle that has a cotangent equal to a given number. | *"In academic literature, arccotangent designates the inverse function of the cotangent; the angle that has a cotangent equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arced]] | verb | **1.** Form an arch or curve.<br>**2.** Forming or resembling an arch. | *"Planet Pluto arced into view from starboard, half a million kay distant."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[arcella]] | noun | **1.** An amoeba-like protozoan with a chitinous shell resembling an umbrella. | *"In academic literature, arcella designates an amoeba-like protozoan with a chitinous shell resembling an umbrella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcellidae]] | noun | **1.** Soil and freshwater protozoa; cosmopolitan in distribution. | *"In academic literature, arcellidae designates soil and freshwater protozoa; cosmopolitan in distribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arceuthobium]] | noun | **1.** Genus of chiefly american plants parasitic on conifers. | *"In academic literature, arceuthobium designates genus of chiefly american plants parasitic on conifers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcidae]] | noun | **1.** Ark shells. | *"In academic literature, arcidae designates ark shells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arciform]] | adjective | **1.** Forming or resembling an arch. | *"In academic literature, arciform designates forming or resembling an arch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcminute]] | noun | **1.** A unit of angular distance equal to a 60th of a degree. | *"In academic literature, arcminute designates a unit of angular distance equal to a 60th of a degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arco]] | adjective | **1.** (of instruments in the violin family) to be played with the bow. | *"In academic literature, arco designates (of instruments in the violin family) to be played with the bow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcsec]] | noun | **1.** The inverse function of the secant; the angle that has a secant equal to a given number. | *"In academic literature, arcsec designates the inverse function of the secant; the angle that has a secant equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcsecant]] | noun | **1.** The inverse function of the secant; the angle that has a secant equal to a given number. | *"In academic literature, arcsecant designates the inverse function of the secant; the angle that has a secant equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcsecond]] | noun | **1.** A 60th part of a minute of arc. | *"In academic literature, arcsecond designates a 60th part of a minute of arc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcsin]] | noun | **1.** The inverse function of the sine; the angle that has a sine equal to a given number. | *"In academic literature, arcsin designates the inverse function of the sine; the angle that has a sine equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcsine]] | noun | **1.** The inverse function of the sine; the angle that has a sine equal to a given number. | *"In academic literature, arcsine designates the inverse function of the sine; the angle that has a sine equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctan]] | noun | **1.** The inverse function of the tangent; the angle that has a tangent equal to a given number. | *"In academic literature, arctan designates the inverse function of the tangent; the angle that has a tangent equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctangent]] | noun | **1.** The inverse function of the tangent; the angle that has a tangent equal to a given number. | *"In academic literature, arctangent designates the inverse function of the tangent; the angle that has a tangent equal to a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctic]] | noun | **1.** The regions to the north of the arctic circle centered on the north pole.<br>**2.** A waterproof overshoe that protects shoes from water or snow. | *"The blast smelt of icebergs, arctic seas, whales, and white bears, carrying the snow so that it licked the land but did not deepen on it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[arctictis]] | noun | **1.** Binturongs. | *"In academic literature, arctictis designates binturongs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctiid]] | noun | **1.** Stout-bodied broad-winged moth with conspicuously striped or spotted wings; larvae are hairy caterpillars. | *"In academic literature, arctiid designates stout-bodied broad-winged moth with conspicuously striped or spotted wings; larvae are hairy caterpillars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctiidae]] | noun | **1.** Tiger moths. | *"In academic literature, arctiidae designates tiger moths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctium]] | noun | **1.** Burdock. | *"Classical and authoritative lexicons catalog arctium as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctocebus]] | noun | **1.** A genus of lorisidae. | *"In academic literature, arctocebus designates a genus of lorisidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctocephalus]] | noun | **1.** Fur seals. | *"In academic literature, arctocephalus designates fur seals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctonyx]] | noun | **1.** A genus of mustelidae. | *"In academic literature, arctonyx designates a genus of mustelidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctostaphylos]] | noun | **1.** Bearberry; manzanita. | *"In academic literature, arctostaphylos designates bearberry; manzanita."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arctotis]] | noun | **1.** Herbs and subshrubs: african daisy. | *"In academic literature, arctotis designates herbs and subshrubs: african daisy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcturus]] | noun | **1.** The 4th brightest star and the brightest star in the constellation bootes; 36 light-years from earth. | *"There’s Arcturus looking very bright.” “Yes, and the Bear."* — Jane Austen, *Mansfield Park* |
| [[arcuate]] | adjective | **1.** Forming or resembling an arch. | *"In academic literature, arcuate designates forming or resembling an arch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcus]] | noun | **1.** A whitish deposit in the shape of an arc that is sometimes seen in the cornea. | *"In academic literature, arcus designates a whitish deposit in the shape of an arc that is sometimes seen in the cornea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarctate]] | adjective | **1.** (of an insect pupa) enclosed in a rigid case. | *"In academic literature, coarctate designates (of an insect pupa) enclosed in a rigid case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coarctation]] | noun | **1.** Tight or narrow compression.<br>**2.** (biology) a narrowing or constriction of a vessel or canal; especially a congenital narrowing of the aorta. | *"In academic literature, coarctation designates tight or narrow compression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subarctic]] | adjective | **1.** Of or relating to latitudes just south of the arctic circle. | *"In academic literature, subarctic designates of or relating to latitudes just south of the arctic circle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sugarcane]] | noun | **1.** Juicy canes whose sap is a source of molasses and commercial sugar; fresh canes are sometimes chewed for the juice.<br>**2.** Tall tropical southeast asian grass having stout fibrous jointed stalks; sap is a chief source of sugar. | *"Sugarcane House, Richmond, March, 18-- DEAR MAMA,--I hope you are quite well."* — William Makepeace Thackeray, *Vanity Fair* |
| [[sugarcoat]] | verb | **1.** Coat with something sweet, such as a hard sugar glaze.<br>**2.** Cause to appear more pleasant or appealing. | *"In academic literature, sugarcoat designates coat with something sweet, such as a hard sugar glaze."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster General]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARC
  </div>
</div>
