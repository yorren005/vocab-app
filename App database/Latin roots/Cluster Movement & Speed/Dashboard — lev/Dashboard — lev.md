---
status: unread
type: root_dashboard
---
# Dashboard — lev
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lev-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“light or lift”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **lev** means light or lift. It refers to radiant illumination that makes things visible. In English, this root forms words such as *elevate*, *lever*, *levity*, and *relieve*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: light or lift
> The root **lev** means light or lift. It refers to radiant illumination that makes things visible. In English, this root forms words such as *elevate*, *lever*, *levity*, and *relieve*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Light or lift</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *elevate* and *lever*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lev** comes from a Latin word that means *"light or lift"*.
  - At its core, it describes light or lift.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **lev** in an English word, think of **speed, haste, and rapid movement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of light or lift.
  - **Mental & Social**: How people experience, organize, or communicate about light or lift.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Elevate**: To raise or lift a physical object, limb, or mass to a higher spatial position or altitude.
  - **Lever**: A simple machine consisting of a rigid bar pivoted around a fixed fulcrum, used to transmit and multiply applied mechanical force.
  - **Levity**: Lightness of demeanor, speech, or disposition, especially when characterized by improper, disrespectful, or frivolous humor in the presence of grave or sacred matters.
  - **Relieve**: To alleviate, ease, or mitigate physical pain, psychological distress, anxiety, or acute discomfort.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lev</mark>, think of <mark class="hl-def">speed, haste, and rapid movement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **lev** operates through three historical morphological streams in English:
> - **Primary Adjectival Stem `lev-` (Latin *levis*):**
>   - Abstract noun of quality with Latin suffix *-itās*: Latin *levitās* $\to$ English [[levity]].
>   - 19th-century scientific neologisms formed on *levitās*: Latin *levitās* + verbal *-ate* $\to$ English [[levitate]] $\to$ noun of process [[levitation]].
> - **Verbal & Participial Bases `levā-` / `levāt-` (Latin *levō, levāre, levātus*):**
>   - Latin agent noun with suffix *-tor*: Latin *levātor* ("one who lifts") $\to$ English anatomical muscle and surgical tool [[levator]].
>   - Latin noun of means and mitigation with suffix *-mentum*: Latin *levāmentum* $\to$ English [[levament]] ("comfort, alleviation").
> - **The Romance / French Vernacular Stream (`lever` < Vulgar Latin *levāre*):**
>   - Old French noun of instrument formed with *-ier*: Old French *levier* ("a prying tool") $\to$ Middle English [[lever]].
>   - Abstract / functional noun formed with French *-age*: English *lever* + *-age* $\to$ English [[leverage]].
>   - Compound architectural noun: *cant* (angle/rim, from Latin *canthus*) + *lever* $\to$ English [[cantilever]].
>   - Old French feminine past participle noun: Old French *levée* ("act of raising") $\to$ English [[levy]].
>   - Latin noun of means *levāmen* $\to$ Old French *levain* $\to$ Middle English [[leaven]] $\to$ participial adjectives [[leavened]] and [[unleavened]] (with Germanic negative prefix *un-*).
> - **Prefix Formations on Verbal Stems:**
>   - **Prefix `ad-` (assimilated to `al-` before `l`):** Latin *alleviāre* (Late Latin *alleviātus*) $\to$ English [[alleviate]], noun [[alleviation]], adjective [[alleviative]], and agent noun [[alleviator]].
>   - **Prefix `ex-` (elided to `ē-` before `l`):** Latin *ēlevāre* ("to lift up") $\to$ English [[elevate]], noun of elevation/altitude [[elevation]], mechanical lifting apparatus [[elevator]], and functional adjective [[elevatory]].
>   - **Prefix `re-` ("again, back, restorative"):**
>     - French vernacular branch: Old French *relever* $\to$ English verb [[relieve]], nominal reflex [[relief]], and agent [[reliever]].
>     - Latin participial / Scots legal branch: Latin *relevāns, relevantis* $\to$ English [[relevant]], abstract nouns [[relevance]] and [[relevancy]].
>     - Privative negative branch `in-` (assimilated to `ir-` before `r`): English [[irrelevant]], abstract nouns [[irrelevance]] and [[irrelevancy]].

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
> Although anchored in the unified concept of **"lightness and lifting"**, the derivatives of `lev` radiate into specialized operational planes across science, law, mechanics, and culture:
> - **Classical Mechanics & Structural Engineering:** In [[lever]], [[leverage]], [[cantilever]], [[elevator]], and [[elevatory]], the root names simple machines that multiply force, projecting horizontal beams that support colossal loads, and mechanical hoisting cabs that enable modern vertical architecture.
> - **Pharmacology, Therapeutics & Palliative Medicine:** In [[alleviate]], [[alleviation]], [[alleviative]], [[alleviator]], [[relieve]], [[relief]], [[reliever]], and [[levament]], the root describes the easing of physical pain, the dampening of acute pathological symptoms, and the compassionate unburdening of human suffering.
> - **Epistemology, Forensic Jurisprudence & Evidence Law:** In [[relevant]], [[relevance]], [[relevancy]], [[irrelevant]], [[irrelevance]], and [[irrelevancy]], the root governs whether a piece of testimony, a document, or an argumentative proposition has the logical power to "lift up" and sustain a legal verdict or philosophical conclusion.
> - **Applied Physics & High-Speed Transit:** In [[levitate]] and [[levitation]], the root designates the physical phenomenon of overcoming gravitational acceleration without solid contact, whether via superconducting magnetic repulsion (Maglev) or high-intensity acoustic standing waves.
> - **Culinary Science, Zymology & Sacramental Theology:** In [[leaven]], [[leavened]], and [[unleavened]], the root designates biological fermentation that aerates bread dough, as well as the deep biblical symbolism of humility and ritual purity associated with flat, unfermented Passover bread.
> - **Public Finance, Sovereign Governance & Military Mobilization:** In [[levy]], the root captures the sovereign administrative power of collecting compulsory taxes or conscripting citizen-soldiers into armed service.
> - **Psychology, Temperament & Rhetorical Tone:** In [[levity]], [[elevate]], and [[elevation]], the root moves from frivolous, ill-timed humor that lacks moral weight (*levity*) to the uplifting and exalting of human spirit, intellect, and dignity (*elevation*).
> - **Gross Anatomy & Biomechanics:** In [[levator]], the root identifies specialized biological lifting muscles that hoist eyelids, shoulder blades, and the pelvic floor against gravity.

---

## 🔀 4. Prefix & Combining Dynamics on lev

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (assimilated to `al-`) | to, toward; intensive | [[alleviate]], [[alleviation]], [[alleviative]], [[alleviator]] | Movement *toward* lightness; the active mitigation, soothing, or reduction of physical pain or distress. |
| `ex-` (elided to `ē-`) | out of, upward from | [[elevate]], [[elevation]], [[elevator]], [[elevatory]] | Lifting *upward out of* a lower position; raising physically, socially, morally, or geometrically. |
| `re-` | again, back, restorative | [[relieve]], [[relief]], [[reliever]], [[relevant]], [[relevance]], [[relevancy]] | Easing a burden *again* to restore comfort; or *lifting up* an argument into legal and logical sustenance. |
| `in-` (assimilated to `ir-`) + `re-` | not (privative) + again, up | [[irrelevant]], [[irrelevance]], [[irrelevancy]] | *Not* lifting up the argument; lacking bearing, logical connection, or legal admissibility. |
| `un-` (Germanic privative) | not, un- | [[unleavened]] | *Not* raised with yeast; unfermented, flat, ritual bread. |
| `canti-` (Latin *canthus*, angle/rim) | corner, angle | [[cantilever]] | A beam anchored at an *angle/corner* that projects outward horizontally to lift and support weight. |
| *(unprefixed base)* | — | [[lever]], [[leverage]], [[levitate]], [[levitation]], [[levity]], [[levy]], [[leaven]], [[leavened]], [[levator]], [[levament]] | Direct manifestation of physical lightness, mechanical lifting, taxation, raising dough, or hovering. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-er` (instrument / agent) | Noun (Instrument / Agent) | [[lever]], [[cantilever]], [[reliever]] | A tool that lifts; an anchored projecting girder; one who eases distress or takes over a shift. |
| `-age` (Latin *-āticum*) | Noun (Function / Condition) | [[leverage]] | The mechanical advantage, strategic power, or financial borrowing ratio utilized. |
| `-ity` (Latin *-itās*) | Abstract Noun (Quality / State) | [[levity]] | The condition or quality of being light, frivolous, or lacking appropriate seriousness. |
| `-ate` (Latin *-ātus*) | Causative Verb | [[levitate]], [[elevate]], [[alleviate]] | To cause to float; to raise to a higher position; to make suffering lighter and more bearable. |
| `-ation` (Latin *-ātiō*) | Noun (Process / Vector Quantity) | [[levitation]], [[elevation]], [[alleviation]] | The act, process, or altitude measurement of hovering, lifting, or soothing pain. |
| `-or` (Latin *-tor*) | Agent / Instrument Noun | [[elevator]], [[alleviator]], [[levator]] | A mechanical hoisting cabin; one who mitigates hardship; a biological lifting muscle or surgical tool. |
| `-ory` (Latin *-ōrius*) | Adjective (Functional / Serving as) | [[elevatory]] | Functioning to elevate or lift upward (e.g., *elevatory tectonic movements*). |
| `-ive` (Latin *-īvus*) | Adjective (Disposition / Tendency) | [[alleviative]] | Having the property, tendency, or capacity to alleviate pain or reduce distress. |
| `-ant` (Latin *-āns, -antis*) | Present Participial Adjective | [[relevant]] | Bearing upon, sustaining, or lifting up the legal or logical case at hand. |
| `-ance` / `-ancy` (Latin *-antia*) | Abstract Noun (Quality / State) | [[relevance]], [[relevancy]], [[irrelevance]], [[irrelevancy]] | The property of bearing upon an issue; or the condition of being completely immaterial. |
| `-ment` (Latin *-mentum*) | Noun (Means / Instrument / Result) | [[levament]] | The comforting means or resulting state of alleviation from sorrow or pain. |
| `-en` (Old French *-ain* < *-āmen*) | Noun / Verb (Substance of Action) | [[leaven]] | The agent that raises dough; or the act of permeating and elevating a substance or tone. |
| `-ed` (participial suffix) | Adjective / Past Participle | [[leavened]], [[unleavened]] | Having undergone fermentation and rising; or prepared flat without any leavening agent. |
| `-y` (Old French *-ée*) | Noun / Verb (Action / Product) | [[levy]] | The sovereign collection of taxes or mobilization of soldiers; to impose an assessment. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚙️ **Classical Mechanics & Structural Engineering** | [[lever]], [[leverage]], [[cantilever]], [[elevator]], [[elevatory]] | Archimedean law of the lever; mechanical advantage in gearboxes and hydraulic cranes; cantilevered trusses in long-span bridge construction (e.g., the Forth Bridge); vertical passenger traction elevators in high-rise skyscrapers. |
| ⚖️ **Forensic Jurisprudence & Evidence Law** | [[relevant]], [[relevance]], [[relevancy]], [[irrelevant]], [[irrelevance]], [[irrelevancy]] | Federal Rules of Evidence (Rule 401: test for relevant evidence having probative value); Scots law preliminary hearings on relevancy; legal objections dismissing immaterial and prejudicial witness testimony. |
| 🩺 **Clinical Anatomy, Surgery & Orthopedics** | [[levator]] | Muscular anatomy of the human body (*levator scapulae*, *levator ani*, *levator palpebrae superioris*); surgical orthopedic bone elevators designed to lift depressed skull fractures and strip periosteum from bone shafts. |
| 💊 **Pharmacology, Anesthesiology & Palliative Care** | [[alleviate]], [[alleviation]], [[alleviative]], [[alleviator]], [[relieve]], [[relief]], [[reliever]], [[levament]] | Palliative administration of opioid and non-opioid analgesics to alleviate intractable oncological pain; fast-acting bronchodilator "rescue relievers" in acute asthma exacerbations; therapeutic relief of postoperative edema. |
| ⚡ **Applied Physics & High-Speed Rail** | [[levitate]], [[levitation]] | Superconducting magnetic levitation (Maglev) transit systems utilizing electrodynamic suspension (EDS); containerless material processing in acoustic and optical levitation traps for high-purity crystal growth. |
| 🍞 **Culinary Science, Zymology & Liturgical Theology** | [[leaven]], [[leavened]], [[unleavened]] | Sourdough fermentation kinetics (*Saccharomyces cerevisiae* and *Lactobacillus*); biochemical gluten matrix expansion under carbon dioxide production; Jewish ritual preparation of unleavened matzo for Passover (*Pesach*); Christian Eucharistic hosts. |
| 🏛️ **Public Finance, Sovereign Governance & Military** | [[levy]] | Sovereign statutory imposition of ad valorem property taxes, customs duties, and carbon levies; historical feudal *levée en masse* for national military defense during wartime mobilization. |
| 🎭 **Psychology, Ethics & Rhetorical Discourse** | [[levity]], [[elevate]], [[elevation]] | Cicero's moral critique of Roman *levitās* (fickleness and moral superficiality) versus *gravitās*; rhetorical elevation of civic discourse to inspire public virtue; unseemly levity during solemn judicial proceedings. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alleviant]] | noun | **1.** Remedy that alleviates pain without curing. | *"In academic literature, alleviant designates remedy that alleviates pain without curing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alleviate]] | verb | **1.** Provide physical relief, as from pain.<br>**2.** Make easier. | *"It may be that if we knew more of such strange afflictions we might be the better able to alleviate their intensity."* — Charles Dickens, *Bleak House* |
| [[alleviated]] | verb | **1.** Provide physical relief, as from pain.<br>**2.** Make easier. | *"While we were talking, and when I was glad to believe that I had alleviated (if I may use such a term) the shock he had had in seeing me, Richard came in."* — Charles Dickens, *Bleak House* |
| [[alleviation]] | noun | **1.** The feeling that comes when something burdensome is removed or reduced.<br>**2.** The act of reducing something unpleasant (as pain or annoyance). | *"Her presence was at first a strain upon Tess, but afterwards an alleviation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[alleviative]] | adjective | **1.** Moderating pain or sorrow by making it easier to bear. | *"In academic literature, alleviative designates moderating pain or sorrow by making it easier to bear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alleviator]] | noun | **1.** A therapist who makes suffering more endurable.<br>**2.** Remedy that alleviates pain without curing. | *"In academic literature, alleviator designates a therapist who makes suffering more endurable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alleviatory]] | adjective | **1.** Moderating pain or sorrow by making it easier to bear. | *"In academic literature, alleviatory designates moderating pain or sorrow by making it easier to bear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elevate]] | verb | **1.** Give a promotion to or assign to a higher position.<br>**2.** Raise from a lower to a higher position. | *"She felt that he had every thing to elevate him which general attention and deference, and especially the attention of all the young women, could do."* — Jane Austen, *Persuasion* |
| [[elevated]] | noun | **1.** A railway that is powered by electricity and that runs on a track that is raised above the street level.<br>**2.** Give a promotion to or assign to a higher position. | *"She had one eye declined for the loss of her husband, another elevated that the oracle was fulfilled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[elevation]] | noun | **1.** The event of something being raised upward.<br>**2.** The highest level or degree attainable; the highest stage of development. | *"Snagsby, from her elevation, instantly cries out, “No he don’t!” “My lit-tle woman!” says Mr."* — Charles Dickens, *Bleak House* |
| [[elevator]] | noun | **1.** Lifting device consisting of a platform or cage that is raised and lowered mechanically in a vertical shaft in order to move people from one floor to another in a building.<br>**2.** The airfoil on the tailplane of an aircraft that makes it ascend or descend. | *"His houses on the avenue were the best possible property, and his elevator row in the importers’ quarter was indeed a literal gold mine."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[eleven]] | noun | **1.** The cardinal number that is the sum of ten and one.<br>**2.** A team that plays football. | *"Thus we may see,” quoth he, “how the world wags. ’Tis but an hour ago since it was nine, And after one hour more ’twill be eleven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[eleven-plus]] | noun | **1.** (formerly in britain) an examination taken by 11 and 12 year old students to select suitable candidates for grammar school. | *"In academic literature, eleven-plus designates (formerly in britain) an examination taken by 11 and 12 year old students to select suitable candidates for grammar school."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eleven-sided]] | adjective | **1.** Having eleven sides. | *"In academic literature, eleven-sided designates having eleven sides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eleventh]] | noun | **1.** Position 11 in a countable series of things.<br>**2.** Coming next after the tenth and just before the twelfth in position. | *"Lord Mortimer of Scotland hath sent word That Douglas and the English rebels met The eleventh of this month at Shrewsbury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irrelevance]] | noun | **1.** The lack of a relation of something to the matter at hand. | *"Even the daemons they dismissed to irrelevance and non-entity."* — T. R. Glover, *The Jesus of History* |
| [[irrelevancy]] | noun | **1.** The lack of a relation of something to the matter at hand. | *"I am glad you are doing so well," with a strange irrelevancy of graciousness."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[irrelevant]] | adjective | **1.** Having no bearing on or connection with the subject at issue. | *"Her mother gave irrelevant information by way of answer: “He called to see the doctor to-day in Shaston."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[irrelevantly]] | adverb | **1.** In an irrelevant manner. | *"Why have we never met before?” “If you had told me you knew my grandfather when you appeared in the garden, I should not have been in the least surprised,” I answered rather irrelevantly."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[lev]] | noun | **1.** The basic unit of money in bulgaria. | *"I; Rev. i. 10; Psalms cxviii. 24; Lev. xxiii. 7, 11; Mark xv. 8; Psalms lxxxiv. 10, in which Christmas is called Anti- christ’s masse, and those Masse-mongers and Papists who observe it, etc."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[levallorphan]] | noun | **1.** Drug (trade name lorfan) that is related to morphine but that counteracts the respiratory depression produced by morphine poisoning but without affecting its analgesic effects. | *"In academic literature, levallorphan designates drug (trade name lorfan) that is related to morphine but that counteracts the respiratory depression produced by morphine poisoning but without affecting its analgesic effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levant]] | noun | **1.** A heavy morocco often used in bookbinding.<br>**2.** The former name for the geographical area of the eastern mediterranean that is now occupied by lebanon, syria, and israel. | *"I’ve been in the Levant, where some of your Middlemarch goods go—and then, again, in the Baltic."* — George Eliot, *Middlemarch* |
| [[levanter]] | noun | **1.** An easterly wind in the western mediterranean area. | *"So that Monsoons, Pampas, Nor-Westers, Harmattans, Trades; any wind but the Levanter and Simoom, might blow Moby Dick into the devious zig-zag world-circle of the Pequod’s circumnavigating wake."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[levantine]] | noun | **1.** (formerly) a native or inhabitant of the levant.<br>**2.** Of or relating to the levant or its inhabitants. | *"My mother was an Englishwoman and my father was a Levantine--half Jew, half Greek."* — Anthony Pryde, *Nightfall* |
| [[levator]] | noun | **1.** A muscle that serves to lift some body part (as the eyelid or lip). | *"In academic literature, levator designates a muscle that serves to lift some body part (as the eyelid or lip)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levee]] | noun | **1.** A formal reception of visitors or guests (as at a royal court).<br>**2.** A pier that provides a landing place on a river. | *"My bardship here, at your Levee On sic a day as this is, Is sure an uncouth sight to see, Amang thae birth-day dresses Sae fine this day."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[level]] | noun | **1.** A position on a scale of intensity or amount or quality.<br>**2.** A relative position or degree of value in a graded group. | *"I am not an impostor, that proclaim Myself against the level of mine aim, But know I think, and think I know most sure, My art is not past power nor you past cure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[level-headed]] | adjective | **1.** Exercising or showing good judgment. | *"In academic literature, level-headed designates exercising or showing good judgment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leveler]] | noun | **1.** A radical who advocates the abolition of social distinctions. | *"In academic literature, leveler designates a radical who advocates the abolition of social distinctions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levelheaded]] | adjective | **1.** Exercising or showing good judgment. | *"Being a levelheaded individual who could give points to not a few in point of shrewd observation he also remarked on his very dilapidated hat and slouchy wearing apparel generally testifying to a chronic impecuniosity."* — James Joyce, *Ulysses* |
| [[leveling]] | noun | **1.** Changing the ground level to a smooth horizontal or gently sloping surface.<br>**2.** Complete destruction of a building. | *"Finally, there is a widespread approval of the progressive rate just because it in so far acts as a leveling influence upon fortunes."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[leveller]] | noun | **1.** A radical who advocates the abolition of social distinctions. | *"The hollow echo of its fall reminded the waggoner painfully of the grim Leveller."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lever]] | noun | **1.** A rigid bar pivoted about a fulcrum.<br>**2.** A simple machine that gives a mechanical advantage when given a fulcrum. | *"But still the disappointed father held a strong lever; and Fred felt as if he were being banished with a malediction."* — George Eliot, *Middlemarch* |
| [[leverage]] | noun | **1.** The mechanical advantage gained by being in a position to use a lever.<br>**2.** Strategic advantage; power to act effectively. | *"If he could only shift his feet, get some sort of leverage."* — Donn Byrne, *The Wind Bloweth* |
| [[leveraging]] | noun | **1.** Investing with borrowed money as a way to amplify potential gains (at the risk of greater losses).<br>**2.** Supplement with leverage. | *"In academic literature, leveraging designates investing with borrowed money as a way to amplify potential gains (at the risk of greater losses)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leveret]] | noun | **1.** A young hare especially one in its first year. | *"But—eh? what?” These interrogatives were addressed to the footman who had come in to say that the keeper had found one of Dagley’s boys with a leveret in his hand just killed."* — George Eliot, *Middlemarch* |
| [[levi]] | noun | **1.** (new testament) disciple of jesus; traditionally considered to be the author of the first gospel. | *"Levi Everdene—that was the man’s name, sure. ‘Man,’ saith I in my hurry, but he were of a higher circle of life than that—’a was a gentleman-tailor really, worth scores of pounds."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[levi's]] | noun | **1.** A popular brand of jeans. | *"In academic literature, levi's designates a popular brand of jeans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levi-strauss]] | noun | **1.** French cultural anthropologist who promoted structural analysis of social systems (born in 1908). | *"In academic literature, levi-strauss designates french cultural anthropologist who promoted structural analysis of social systems (born in 1908)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leviathan]] | noun | **1.** The largest or most massive thing of its kind.<br>**2.** Monstrous sea creature symbolizing evil in the old testament. | *"We may as bootless spend our vain command Upon the enraged soldiers in their spoil As send precepts to the leviathan To come ashore."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[levirate]] | noun | **1.** The biblical institution whereby a man must marry the widow of his childless brother in order to maintain the brother's line. | *"In academic literature, levirate designates the biblical institution whereby a man must marry the widow of his childless brother in order to maintain the brother's line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levis]] | noun | **1.** A popular brand of jeans.<br>**2.** (new testament) disciple of jesus; traditionally considered to be the author of the first gospel. | *"Tell her, Levis, that she need not shrink from us as if we were not sinners, as well as herself."* — Martha Finley, *Elsie's Kith and Kin* |
| [[levisticum]] | noun | **1.** Genus of aromatic european herbs with yellow flowers. | *"In academic literature, levisticum designates genus of aromatic european herbs with yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levitate]] | verb | **1.** Cause to rise in the air and float, as if in defiance of gravity.<br>**2.** Be suspended in the air, as if in defiance of gravity. | *"EDWARD THE SEVENTH: _(Levitates over heaps of slain, in the garb and with the halo of Joking Jesus, a white jujube in his phosphorescent face.)_ My methods are new and are causing surprise."* — James Joyce, *Ulysses* |
| [[levitation]] | noun | **1.** The phenomenon of a person or thing rising into the air by apparently supernatural means.<br>**2.** Movement upward in virtue of lightness. | *"In academic literature, levitation designates the phenomenon of a person or thing rising into the air by apparently supernatural means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levite]] | noun | **1.** A member of the hebrew tribe of levi (especially the branch that provided male assistants to the temple priests). | *"Thrown thick o'er half a Continent, His blood-stained victims lie; The priest, in horror, lifts his hands, The Levite passes by."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[levitical]] | adjective | **1.** Of or relating to the book of leviticus in the bible. | *"In academic literature, levitical designates of or relating to the book of leviticus in the bible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leviticus]] | noun | **1.** The third book of the old testament; contains levitical law and ritual precedents. | *"In academic literature, leviticus designates the third book of the old testament; contains levitical law and ritual precedents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levitra]] | noun | **1.** Virility drug (trade name levitra) used to treat erectile dysfunction in men. | *"In academic literature, levitra designates virility drug (trade name levitra) used to treat erectile dysfunction in men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levity]] | noun | **1.** Feeling an inappropriate lack of seriousness.<br>**2.** A manner lacking seriousness. | *"Our graver business Frowns at this levity.—Gentle lords, let’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[levodopa]] | noun | **1.** The levorotatory form of dopa (trade names bendopa and brocadopa and larodopa); as a drug it is used to treat parkinson's disease. | *"In academic literature, levodopa designates the levorotatory form of dopa (trade names bendopa and brocadopa and larodopa); as a drug it is used to treat parkinson's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levorotary]] | adjective | **1.** Rotating to the left. | *"In academic literature, levorotary designates rotating to the left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levorotation]] | noun | **1.** Rotation to the left. | *"In academic literature, levorotation designates rotation to the left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levorotatory]] | adjective | **1.** Rotating to the left. | *"In academic literature, levorotatory designates rotating to the left."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levulose]] | noun | **1.** A simple sugar found in honey and in many ripe fruits. | *"In academic literature, levulose designates a simple sugar found in honey and in many ripe fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[levy]] | noun | **1.** A charge imposed and collected.<br>**2.** The act of drafting into military service. | *"He creates Lucius proconsul; and to you, the tribunes, For this immediate levy, he commands His absolute commission."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relevance]] | noun | **1.** The relation of something to the matter at hand. | *"In academic literature, relevance designates the relation of something to the matter at hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relevancy]] | noun | **1.** The relation of something to the matter at hand. | *"This reflection suggested some meaning—some relevancy—in the death’s head."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[relevant]] | adjective | **1.** Having a bearing on or connection with the subject at issue. | *"The more relevant question for us is: How came he to wait till he was at least about thirty years old before he began to teach in public?"* — T. R. Glover, *The Jesus of History* |
| [[relevantly]] | adverb | **1.** With relevance. | *"That way we shall be saying there is no God—nothing!” shouted Nicholas, banging the table—very little to the point as it seemed to his listeners, but quite relevantly to the course of his own thoughts."* — graf Leo Tolstoy, *War and Peace* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LEV
  </div>
</div>
