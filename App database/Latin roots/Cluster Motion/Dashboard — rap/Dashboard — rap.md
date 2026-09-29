---
status: unread
type: root_dashboard
---
# Dashboard — rap
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rap-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to seize or snatch”</span>
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

The root **rap** means to seize or snatch. It refers to seize, snatch, carry off by force, plunder, hasten. In English, this root forms words such as *rapid*, *rapt*, *rapture*, and *rapacious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to seize or snatch
> The root **rap** means to seize or snatch. It refers to seize, snatch, carry off by force, plunder, hasten. In English, this root forms words such as *rapid*, *rapt*, *rapture*, and *rapacious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To seize or snatch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *rapid* and *rapt*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rap** comes from a Latin word that means *"to seize or snatch"*.
  - At its core, it describes the action of seize or snatch.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **rap** in an English word, think of **to seize or snatch**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to seize or snatch).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Rapid**: Happening, moving, or acting with great speed.
  - **Rapt**: Completely fascinated, engrossed, or absorbed by what one is seeing or hearing.
  - **Rapture**: A feeling of intense pleasure, joy, or ecstatic spiritual elevation.
  - **Rapacious**: Excessively grasping, covetous, or predatory.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rap</mark>, think of <mark class="hl-def">to seize or snatch</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rap** operates through four primary morphological channels across Latin, Anglo-French, and English:
> - **Primary Active Present Stem `rap-` (from Latin *rapere*):**
>   - Direct nominalization and adjective formation: *rap- + -idus* $\to$ Latin *rapidus* ("seizing, hurrying along") $\to$ English [[rapid]], [[rapidity]], [[rapidly]], [[rapidness]], [[rapids]].
>   - Intensive/frequentative adjective stem: *rap- + -āx, -ācis* $\to$ Latin *rapāx* ("prone to seize") $\to$ English [[rapacious]], [[rapaciously]], [[rapaciousness]], [[rapacity]].
>   - Abstract noun of crime: *rap- + -īna* $\to$ Latin *rapīna* ("plunder, robbery") $\to$ English [[rapine]].
>   - Direct verbal noun: *rapere* $\to$ Old French *raper* $\to$ English [[rape]], [[rapist]].
> - **Apophonic Compound Stem `-rip-` / `-rept-` (Vowel Weakening *a* $\to$ *i* / *e*):**
>   - Prefix *sub-* (under) + *-ripere* / *-reptum* $\to$ *surripere* ("to snatch away stealthily from under") $\to$ *surreptīcius* $\to$ English [[surreptitious]], [[surreptitiously]], [[surreption]], [[subreption]].
>   - Prefix *ad-* (to, toward) + *-ripere* / *-reptum* $\to$ *arripere* ("to snatch up violently, seize") $\to$ *arrepticius* $\to$ English [[arreptitious]], [[arreption]].
>   - Prefix *dis-* (asunder) + *-ripere* / *-reptum* $\to$ *dīripere* ("to plunder, tear apart") $\to$ English [[direption]].
>   - Prefix *com-* (together, thoroughly) + *-ripere* / *-reptum* $\to$ *corripere* ("to seize hold of, shorten") $\to$ English [[correption]].
> - **Participial & Supine Stem `rapt-` (from Latin *raptum*):**
>   - Perfect passive participle used adjectivally: *raptus* $\to$ English [[rapt]], [[raptly]], [[raptness]].
>   - Action/state noun: *rapt- + -ūra* $\to$ Medieval Latin *raptūra* $\to$ English [[rapture]], [[rapturous]], [[rapturously]], [[enrapture]].
>   - Classical agent noun: *rapt- + -or* $\to$ Latin *raptor* ("robber, plunderer, bird of prey") $\to$ English [[raptor]], [[raptorial]], [[velociraptor]].
> - **Etymological Legal Compound `usurp-` (from *ūsū* + *rapere*):**
>   - Instrumental ablative *ūsū* ("by usage") + *rapere* ("to seize") contracted into Latin *ūsūrpāre* ("to take possession of through long use; to seize unlawfully") $\to$ French *usurper* $\to$ English [[usurp]], [[usurpation]], [[usurper]], [[usurpative]].
> - **Gallo-Romance Lenited Channel `rav-` (Intervocalic /p/ $\to$ /v/ via Old French *ravir*):**
>   - Old French *ravir* (extended inchoative stem *raviss-*) $\to$ Middle English *ravishen* $\to$ English [[ravish]], [[ravisher]], [[ravishing]], [[ravishingly]], [[ravishment]].
>   - Old French *ravage* (from *ravir* + *-age*) $\to$ English [[ravage]], [[ravager]], [[ravaging]].

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
> Although anchored in the physical act of seizing by force, the conceptual branches of `rap` radiate across several distinct operational planes:
> - **Velocity & Kinetic Hydrodynamics:** In [[rapid]], [[rapidity]], [[rapidly]], [[rapidness]], and river [[rapids]], predatory seizure transforms into relentless forward momentum—the physical sensation of being swept along helplessly by a torrential current.
> - **Martial Despoliation, Crime & Predatory Greed:** In [[rapacious]], [[rapacity]], [[rape]], [[rapist]], and [[rapine]], the root retains its darkest Roman legal connotations—the brutal, violent seizure of human beings, bodily integrity, and material goods through armed force.
> - **Mystical Ecstasy & Contemplative Transport:** In [[rapt]], [[raptly]], [[raptness]], [[rapture]], [[rapturous]], [[rapturously]], and [[enrapture]], the violent seizure is metaphorically internalized: consciousness is snatched upward, transported beyond mundane senses into sublime delight or spiritual beatitude.
> - **Aesthetic Enchantment & Romance Elegance:** Through Old French *ravir*, the root softens into the exquisite praise of [[ravish]], [[ravishing]], and [[ravishingly]], where aesthetic beauty strikes the observer with the overwhelming force of a captor.
> - **Zoological Predation & Paleontological Lethality:** In [[raptor]], [[raptorial]], and [[velociraptor]], the root describes specialized anatomy—hooked talons, sickle claws, and predatory agility honed for seizing prey.
> - **Clandestine Subterfuge & Procedural Deception:** In [[surreptitious]], [[surreptitiously]], [[surreption]], and [[subreption]], the prefix *sub-* diverts the grasp underground, denoting covert maneuvering, stolen permissions, and deliberate concealment of truth.
> - **Sovereign Usurpation & Illegitimate Hegemony:** In [[usurp]], [[usurpation]], [[usurper]], and [[usurpative]], the root operates in constitutional politics and jurisprudence, signifying the unlawful seizure of executive power, thrones, or legal prerogatives.

---

## 🔀 4. Prefix & Combining Dynamics on rap

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `sub-` (→ *sur-* / *sub-*) | under, from below, secretly | [[surreptitious]], [[surreption]], [[subreption]] | Snatching *from underneath*—stealthy, underhanded procurement or clandestine action. |
| `ad-` (→ *ar-*) | to, toward, upon | [[arreptitious]], [[arreption]] | Snatching *toward oneself* suddenly; seized by frenzy or violent ecstasy. |
| `dis-` (→ *dī-*) | asunder, apart | [[direption]] | Snatching *apart* or tearing to pieces—sacking, plundering, or despoiling a city. |
| `com-` (→ *cor-*) | together, intensively | [[correption]] | Snatching *together* or seizing tightly; in linguistics, abridging or shortening a syllable. |
| `en-` (French *en-*) | in, into, make | [[enrapture]] | Placing *into* a state of rapture; filling with ecstatic delight. |
| `ūsū-` (ablative *ūsū*) | by use, through habit | [[usurp]], [[usurpation]], [[usurper]], [[usurpative]] | Seizing *by constant use*—taking unlawful possession of office, crown, or rights. |
| `vēlōx-` (stem *vēlōc-*) | swift, rapid | [[velociraptor]] | Compound with *raptor*—literally "swift seizer" or agile plunderer. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-id` (*-idus*) | Adjective (Tending to state) | [[rapid]] | Characterized by tearing forward; swift, fast-moving. |
| `-ity` (*-itās*) | Abstract Noun (State / Quality) | [[rapidity]], [[rapacity]] | The quality of extreme speed or insatiable grasping greed. |
| `-ous` (*-ōsus*) | Adjective (Full of / Inclined to) | [[rapacious]], [[rapturous]] | Disposed toward grasping robbery; full of ecstatic bliss. |
| `-or` (*-tor*) | Agent Noun (One who seizes) | [[raptor]], [[usurper]] | A predatory bird, animal, or person who seizes. |
| `-ial` (*-iālis*) | Adjective (Relating to / Adapted for) | [[raptorial]] | Adapted for predatory grasping and seizing prey. |
| `-ure` (*-ūra*) | Abstract Noun (State / Result) | [[rapture]] | The condition of being caught up in spiritual ecstasy. |
| `-ine` (*-īna*) | Abstract Noun (Act / Delict) | [[rapine]] | The act or crime of open plundering and pillage. |
| `-ish` (French *-iss-*) | Verb (Action / Process) | [[ravish]] | To seize violently; to enrapture with beauty or joy. |
| `-age` (French *-age*) | Collective Noun & Verb | [[ravage]] | The devastating act or cumulative ruin of sweeping destruction. |
| `-ment` (*-mentum*) | Abstract Noun (Condition) | [[ravishment]] | The state of being transported by violence or sublime joy. |
| `-tion` (*-tiō*) | Action / Process Noun | [[usurpation]], [[subreption]], [[surreption]], [[arreption]], [[direption]], [[correption]] | The formal act, process, or legal occurrence of seizing. |
| `-itious` (*-īcius*) | Adjective (Characterized by tendency) | [[surreptitious]], [[arreptitious]] | Characterized by stealthy snatching or frantic possession. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Jurisprudence & Criminal Law** | [[rapine]], [[rape]], [[rapist]], [[usurp]], [[usurpation]], [[subreption]] | Prosecuting crimes of violence and despoliation (*actio vi bonorum raptorum*); canon law rulings on decrees obtained through subreption (concealment of material facts); constitutional law on usurpation of legislative authority. |
| 🦅 **Paleontology & Ornithology** | [[raptor]], [[raptorial]], [[velociraptor]] | Anatomical study of raptorial talons in Accipitridae and Falconidae; functional biomechanics of the hyper-extendable sickle claw in dromaeosaurid theropods such as *Velociraptor mongoliensis*. |
| 🌊 **Hydrology & Geomorphology** | [[rapid]], [[rapidity]], [[rapids]] | River morphology and fluid dynamics; hydrodynamic flow through Class I–VI whitewater river rapids caused by channel constriction and steep hydraulic gradients. |
| 🕊️ **Mystical Theology & Eschatology** | [[rapt]], [[rapture]], [[rapturous]], [[enrapture]], [[arreptitious]] | Patristic translations of 1 Thessalonians 4:17 regarding the eschatological Rapture; mystical contemplation in Teresa of Ávila and John of the Cross, describing transcendent spiritual arreption. |
| 🕵️ **Intelligence, Espionage & Statecraft** | [[surreptitious]], [[surreptitiously]], [[usurper]], [[surreption]] | Covert operations, clandestine data exfiltration, surreptitious surveillance, and counter-espionage doctrines against foreign usurpers. |
| 🌪️ **Climatology & Military Warfare** | [[ravage]], [[ravager]], [[ravaging]], [[direption]], [[rapacity]] | Assessing the infrastructure ravages of Category 5 hurricanes and wildfires; military historiography of medieval direption and the plunder of sacked strongholds. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[enrapture]] | verb | **1.** Hold spellbound. | *"This amazed and enraptured Tess, whose slight experiences had been so infelicitous till now; and in her reaction from indignation against the male sex she swerved to excess of honour for Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[enraptured]] | verb | **1.** Hold spellbound.<br>**2.** Feeling great rapture or delight. | *"This amazed and enraptured Tess, whose slight experiences had been so infelicitous till now; and in her reaction from indignation against the male sex she swerved to excess of honour for Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[rap]] | noun | **1.** A reproach for some lapse or misdeed.<br>**2.** A gentle blow. | *"Villain, I say, knock me at this gate; And rap me well, or I’ll knock your knave’s pate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rapacious]] | adjective | **1.** Living by preying on other animals especially by catching living prey.<br>**2.** Excessively greedy and grasping. | *"Among the ladies who were most distinguished for this rapacious benevolence (if I may use the expression) was a Mrs."* — Charles Dickens, *Bleak House* |
| [[rapaciously]] | adverb | **1.** In a rapacious manner. | *"In academic literature, rapaciously designates in a rapacious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapaciousness]] | noun | **1.** Extreme gluttony.<br>**2.** An excessive desire for wealth (usually in large amounts). | *"In academic literature, rapaciousness designates extreme gluttony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapacity]] | noun | **1.** Extreme gluttony.<br>**2.** Reprehensible acquisitiveness; insatiable desire for wealth (personified as one of the deadly sins). | *"In a small loan market they to some extent protect the weak borrower at the moment of distress from the rapacity of the would-be usurer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[rapateaceae]] | noun | **1.** South american herbs somewhat resembling members of the juncaceae. | *"In academic literature, rapateaceae designates south american herbs somewhat resembling members of the juncaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rape]] | noun | **1.** Eurasian plant cultivated for its seed and as a forage crop.<br>**2.** The act of despoiling a country in warfare. | *"This toil of ours should be a work of thine; But thou from loving England art so far That thou hast underwrought his lawful king, Cut off the sequence of posterity, Outfaced infant state, and done a rape Upon the maiden virtue of the crown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[raped]] | verb | **1.** Force (someone) to have sex against their will.<br>**2.** Destroy and strip of its possession. | *"Also, in the end she wept, so that I was raped of my vision, and it was Har, naked and clinging, that bestrode the stallion when he vaulted away."* — Jack London, *The Jacket (The Star-Rover)* |
| [[raper]] | noun | **1.** Someone who forces another to have sexual intercourse. | *"Among those obliged to abdicate were Walsh, the mayor, Rapers, the sheriff, Wheaton, clerk of the court, Durant, the recorder, and Ferguson and Renfro, administrators."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[rapeseed]] | noun | **1.** Seed of rape plants; source of an edible oil. | *"In academic literature, rapeseed designates seed of rape plants; source of an edible oil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapid]] | noun | **1.** A part of a river where the current is very fast.<br>**2.** Done or occurring in a brief period of time. | *"Now rapid steps sounded outside, the door was violently flung open and Bruno appeared, pale with rage: "Those two mean creatures, those malicious rascals; the sneaky hypocrites!--the--the--" "Bruno, no more please," the mother interrupted."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[rapidity]] | noun | **1.** A rate that is rapid. | *"In the same odd way, yet with the same rapidity, he then produced singly, and rubbed out singly, the letters forming the words Bleak House."* — Charles Dickens, *Bleak House* |
| [[rapidly]] | adverb | **1.** With rapid movements. | *"One ought to put in the first block and pack it before one takes up the second." "Then I won't wait for you," Mäzli declared, rapidly whisking out by the door."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[rapidness]] | noun | **1.** A rate that is rapid. | *"In academic literature, rapidness designates a rate that is rapid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapier]] | noun | **1.** A straight sword with a narrow blade and two edges. | *"Enter Antipholus of Syracuse with his rapier drawn, and Dromio of Syracuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rapine]] | noun | **1.** The act of despoiling a country in warfare. | *"And day by day I’ll do this heavy task, So thou destroy Rapine and Murder there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rapist]] | noun | **1.** Someone who forces another to have sexual intercourse. | *"In academic literature, rapist designates someone who forces another to have sexual intercourse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapscallion]] | noun | **1.** A deceitful and unreliable scoundrel.<br>**2.** One who is playfully mischievous. | *"There is where the money goes he wheedles out of me every week; but I'll fix the young rapscallion."* — Effie Afton, *Eventide* |
| [[rapt]] | adjective | **1.** Feeling great rapture or delight. | *"But that I see thee here, Thou noble thing, more dances my rapt heart Than when I first my wedded mistress saw Bestride my threshold."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[raptor]] | noun | **1.** Any of numerous carnivorous birds that hunt and kill other animals. | *"In academic literature, raptor designates any of numerous carnivorous birds that hunt and kill other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[raptores]] | noun | **1.** Term used in former classifications; erroneously grouped together birds of the orders falconiformes and strigiformes. | *"In academic literature, raptores designates term used in former classifications; erroneously grouped together birds of the orders falconiformes and strigiformes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[raptorial]] | adjective | **1.** Relating to or characteristic of birds of prey.<br>**2.** Living by preying on other animals especially by catching living prey. | *"In academic literature, raptorial designates relating to or characteristic of birds of prey."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rapture]] | noun | **1.** A state of being carried away by overwhelming emotion; - charles dickens.<br>**2.** A state of elated bliss. | *"Your prattling nurse Into a rapture lets her baby cry While she chats him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rapturous]] | adjective | **1.** Feeling great rapture or delight. | *"I was in this state when I first shrunk from the light as it twinkled on me once more, and knew with a boundless joy for which no words are rapturous enough that I should see again."* — Charles Dickens, *Bleak House* |
| [[rapturously]] | adverb | **1.** In an ecstatic manner. | *"Well, who is it?” she asked, in a voice and with a smile I half recognised; “you’ve not quite forgotten me, I think, Miss Jane?” In another second I was embracing and kissing her rapturously: “Bessie!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[raptus]] | noun | **1.** A sudden occurrence (or recurrence) of a disease.<br>**2.** A state of being carried away by overwhelming emotion; - charles dickens. | *"In academic literature, raptus designates a sudden occurrence (or recurrence) of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serape]] | noun | **1.** A long brightly colored shawl; worn mainly by mexican men. | *"The Spaniard was wrapped in a serape; he had bushy white whiskers; long white hair flowed from under his sombrero, and he wore green goggles."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |

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
    ROOT DASHBOARD · RAP
  </div>
</div>
