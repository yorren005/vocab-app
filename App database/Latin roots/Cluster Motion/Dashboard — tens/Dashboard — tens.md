---
status: unread
type: root_dashboard
---
# Dashboard — tens
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tens-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stretched, taut, or strain”</span>
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

The root **tens** means stretched, taut, or strain. It refers to stretching tight, pulling taut, or bearing strain. In English, this root forms words such as *tension*, *intense*, *tense*, and *extensive*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stretched, taut, or strain
> The root **tens** means stretched, taut, or strain. It refers to stretching tight, pulling taut, or bearing strain. In English, this root forms words such as *tension*, *intense*, *tense*, and *extensive*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Stretched, taut, or strain</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *tension* and *intense*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tens** comes from a Latin word that means *"stretched, taut, or strain"*.
  - At its core, it describes stretched, taut, or strain.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **tens** in an English word, think of **motion, travel, and moving forward**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of stretched, taut, or strain.
  - **Mental & Social**: How people experience, organize, or communicate about stretched, taut, or strain.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Tension**: The state of being stretched tight.
  - **Intense**: Existing in an extreme or heightened degree.
  - **Tense**: Stretched tight.
  - **Extensive**: Covering, affecting, or applying to a large spatial area, broad scope, or comprehensive range.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tens</mark>, think of <mark class="hl-def">motion, travel, and moving forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tens** functions as a highly adaptable morphological base, combining with classical Latin and Greek prefixes, adjectival formatives, abstract noun suffixes, and agent morphemes:
> - **Primary Participial Base `tens-` (Latin *tēnsus*):**
>   - Bare verbal / adjectival root: Latin *tēnsus* → English [[tense]], [[tensely]], [[tenseness]].
>   - Adjectival capability in `-ile`: Latin *tēnsilis* → English [[tensile]] → [[tensility]].
>   - Action / state noun in `-iō`: Latin *tēnsiō* → English [[tension]] → [[tensional]].
>   - Instrumental measurement compound in `-meter`: Latin *tēnsiō* + Greek *metron* → English [[tensiometer]].
>   - Agent / operational noun in `-or`: Modern Latin *tensor* (the stretcher) → English [[tensor]].
> - **Inward / Intensifying Compound Base `in-` + `tens-` (Latin *intendere* → *intēnsus*):**
>   - Base adjective: Latin *intēnsus* → English [[intense]] → [[intensely]] → [[intenseness]].
>   - Causative verbal engine in `-ify`: *intense* + *-ficāre* → English [[intensify]] → [[intensification]].
>   - Abstract qualitative noun in `-ity`: French *intensité* → English [[intensity]].
>   - Intensive / concentrated adjective in `-īvus`: Medieval Latin *intēnsīvus* → English [[intensive]] → [[intensively]] → [[intensiveness]].
>   - Logical / semantic noun in `-iō`: Latin *intēnsiō* (conceptual sense/content) → English [[intension]] → [[intensional]].
> - **Outward / Expanding Compound Base `ex-` + `tens-` (Latin *extendere* → *extēnsus*):**
>   - Broad coverage adjective in `-īvus`: Late Latin *extēnsīvus* → English [[extensive]] → [[extensively]] → [[extensiveness]].
>   - Modal capability adjective in `-ibilis`: Late Latin *extēnsibilis* → English [[extensible]] → [[extensibility]] (and negative [[inextensible]]).
>   - Noun of scope / lengthening in `-iō`: Latin *extēnsiō* → English [[extension]] → [[extensional]].
>   - Anatomical muscular agent in `-or`: Modern Latin *extēnsor* → English [[extensor]].
> - **Fore-Stretched / Facade Compound Base `prae-` + `tens-` & `obs-` + `tens-`:**
>   - Feigned claim noun: Anglo-Norman *pretence* (< Medieval Latin *praetēnsus*) → English [[pretense]].
>   - Affected claim noun in `-iō`: Medieval Latin *praetēnsiō* → English [[pretension]].
>   - Inflated adjective in `-ōsus`: French *prétentieux* → English [[pretentious]] → [[pretentiously]] → [[pretentiousness]] → [[unpretentious]].
>   - Displayed facade adjective: Medieval Latin *ostēnsibilis* (< *ostendere* < *obs-tendere*) → English [[ostensible]] → [[ostensibly]].
> - **Divergent & Under-Stretched Stems (`dis-`, `sub-`, `co-`):**
>   - Swelling / outward stretching: Latin *distēnsiō* → English [[distension]] → [[distensible]] → [[distensibility]].
>   - Geometric subtension: Latin *subtēnsus* → English [[subtension]].
>   - Co-equal spatial / temporal span: *co-* + *extensive* → English [[coextensive]] → [[coextensively]].
> - **Greco-Latin Hybrid Hemodynamic Stems (`hyper-`, `hypo-`, `normo-`):**
>   - Excessive arterial pressure: Greek *hyper-* + Latin *tēnsiō* → English [[hypertension]] → [[hypertensive]].
>   - Deficient arterial pressure: Greek *hypo-* + Latin *tēnsiō* → English [[hypotension]] → [[hypotensive]].
>   - Standard arterial pressure: Latin *norma* + *tēnsus* + *-ive* → English [[normotensive]].

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
> Although unified by the core concept of **"stretching, pulling taut, and exerting strain"**, the derivatives of `tens` bifurcate across specialized operational planes:
> - **Materials Science, Civil Engineering & Mechanics:** In [[tensile]], [[tensility]], [[tension]], and [[tensiometer]], the root defines mechanical forces that tend to stretch or elongate structural members. Engineers measure tensile strength (the maximum tensile stress a material can withstand before necking or ductile fracture) in steel rebar, carbon-fiber cables, and pre-stressed concrete tendons.
> - **Cardiovascular Medicine & Hemodynamics:** In [[hypertension]], [[hypertensive]], [[hypotension]], [[hypotensive]], and [[normotensive]], the root names the lateral hydraulic force exerted by circulating blood against the muscular and elastic walls of systemic arterioles. Here, vascular tone represents a continuous biological balance between vasodilation and vasoconstriction.
> - **Human Anatomy & Biomechanics:** In [[extensor]] and [[distension]], the root describes somatic movement and visceral volume changes. An *extensor* muscle straightens an articulated joint, increasing the anatomical angle between bones, while visceral *distension* tracks the ballooning of the stomach, intestines, or urinary bladder under fluid, gas, or bolus accumulation.
> - **Theoretical Physics & Spacetime Geometry:** In [[tensor]], the root names mathematical objects that generalize scalars and vectors to higher ranks, describing invariant multilinear geometric relations. In Einstein's General Relativity, the stress-energy-momentum tensor ($T_{\mu\nu}$) tells spacetime how to curve, and the Einstein tensor ($G_{\mu\nu}$) dictates how matter moves through curved spacetime.
> - **Logic, Formal Semantics & Epistemology:** In [[intension]], [[intensional]], [[extension]], [[extensional]], and [[coextensive]], the root grounds philosophical analysis. The *intension* of a concept is its internal informational content or defining attributes (sense), whereas its *extension* is the total class of real-world objects satisfying that concept (reference).
> - **Psychology, Interpersonal Friction & Dramatic Arts:** In [[tense]], [[tensely]], [[tenseness]], [[tension]], [[intense]], and [[intensity]], the root captures acute emotional strain, nervous vigilance, suppressed conflict between characters, and concentrated psychological focus.
> - **Social Posture, Rhetoric & Deception:** In [[pretense]], [[pretension]], [[pretentious]], [[pretentiousness]], [[unpretentious]], [[ostensible]], and [[ostensibly]], the root governs false outward displays—stretching forth an illusion, mask, or unjustified claim to mask covert realities or inflate personal importance.

---

## 🔀 4. Prefix & Combining Dynamics on tens

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Combining Form | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(bare root)* | stretched, tight | [[tense]], [[tensile]], [[tension]], [[tensor]] | Direct physical, mechanical, mathematical, or psychological tautness. |
| `in-` | into, inward, upon (intensive) | [[intense]], [[intensify]], [[intensive]], [[intension]] | Stretched inward; concentrated, acute, deep, or defining conceptual essence. |
| `ex-` (`e-`) | out, outward, forth | [[extensive]], [[extension]], [[extensible]], [[extensor]] | Stretched outward in space, time, operational scope, or joint articulation. |
| `prae-` (`pre-`) | before, in front of | [[pretense]], [[pretension]], [[pretentious]] | Stretched forth in advance; an asserted claim, theatrical facade, or affectation. |
| `ob-` $\to$ `os-` | in front of, before the eyes | [[ostensible]], [[ostensibly]] | Stretched out for public display; an apparent or professed justification masking reality. |
| `dis-` | apart, in different directions | [[distension]], [[distensible]], [[distensibility]] | Stretched apart from within; swollen, dilated, or expanded under internal pressure. |
| `sub-` | under, beneath | [[subtension]] | Stretched underneath or across an angle or arc in trigonometry. |
| `co-` (`com-`) | together, with, mutually | [[coextensive]], [[coextensively]] | Stretched over the exact same spatial boundaries, temporal duration, or semantic scope. |
| `hyper-` (Greek ὑπέρ) | over, beyond, excessive | [[hypertension]], [[hypertensive]] | Pathologically excessive arterial wall tension and elevated blood pressure. |
| `hypo-` (Greek ὑπό) | under, beneath, deficient | [[hypotension]], [[hypotensive]] | Abnormally low arterial blood pressure leading to reduced systemic perfusion. |
| `normo-` (Latin *norma*) | rule, pattern, standard | [[normotensive]] | Maintaining normal, healthy arterial blood pressure within standard clinical metrics. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ile` (Latin *-ilis*) | Adjective (Susceptibility) | [[tensile]] | Capable of being stretched or subjected to drawing forces without fracture. |
| `-ive` (Latin *-īvus*) | Adjective (Disposition / Scope) | [[intensive]], [[extensive]], [[pretentious]] | Having the quality, tendency, or capacity to stretch, concentrate, or project. |
| `-ible` (Latin *-ibilis*) | Adjective (Potentiality) | [[extensible]], [[distensible]], [[ostensible]] | Capable of undergoing expansion, dilation, or outward manifestation. |
| `-ion` (Latin *-iō*) | Noun (Action / Resultant State) | [[tension]], [[extension]], [[intension]], [[distension]] | The process, act, or physical/psychological state of being stretched. |
| `-or` (Latin *-or*) | Noun (Agent / Instrument) | [[tensor]], [[extensor]] | That which causes stretching: an anatomical muscle or a mathematical geometric operator. |
| `-ity` (Latin *-itās*) | Noun (Abstract Quality / Measure) | [[tensility]], [[intensity]], [[extensibility]], [[distensibility]] | The measurable property, degree, or essential state of being stretched or acute. |
| `-ness` (Old English *-nes*) | Noun (Inherent State) | [[tenseness]], [[intenseness]], [[extensiveness]], [[pretentiousness]] | The subjective or structural state of tautness, concentration, or affectation. |
| `-ify` / `-ification` | Verb & Noun (Causative Action) | [[intensify]], [[intensification]] | To cause to become stretched tight or concentrated; the process of making acute. |
| `-meter` (Greek μέτρον) | Noun (Measuring Device) | [[tensiometer]] | An instrument calibrated to measure surface tension, cable strain, or soil suction. |
| `-ly` (Old English *-līce*) | Adverb (Manner) | [[tensely]], [[intensely]], [[extensively]], [[pretentiously]], [[ostensibly]] | Performing an action in a strained, acute, far-reaching, or purported manner. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Cardiovascular Medicine & Hemodynamics** | [[hypertension]], [[hypertensive]], [[hypotension]], [[hypotensive]], [[normotensive]] | Ambulatory blood pressure monitoring, essential hypertension, secondary renovascular hypertension, hypertensive crisis, orthostatic hypotension, vasodilatory shock, sphygmomanometer cuff measurements. |
| 🏗️ **Materials Science & Structural Engineering** | [[tensile]], [[tensility]], [[tension]], [[tensional]], [[tensiometer]] | Stress-strain curves, ultimate tensile strength (UTS), Young's modulus, tension-leg oil platforms, suspension bridge hanger cables, post-tensioned prestressed concrete slabs, tensiometer soil matric potential. |
| 📐 **Mathematics, Differential Geometry & Theoretical Physics** | [[tensor]], [[tensional]] | Multilinear algebra, Riemann curvature tensor ($R^ho_{\sigma\mu\nu}$), Ricci tensor ($R_{\mu\nu}$), energy-momentum stress tensor ($T_{\mu\nu}$), rank-2 symmetric metric tensor ($g_{\mu\nu}$), Levi-Civita tensor permutation symbol. |
| 🧠 **Human Anatomy, Surgery & Gastroenterology** | [[extensor]], [[tensor]], [[distension]], [[distensible]], [[distensibility]] | Extensor carpi radialis longus, tensor fasciae latae, extensor digitorum communis, lateral epicondylitis (tennis elbow), acute abdominal distension from mechanical ileus, aortic compliance and vascular distensibility. |
| 💡 **Philosophy of Language, Logic & Semantics** | [[intension]], [[intensional]], [[extension]], [[extensional]], [[coextensive]] | Frege's distinction between Sinn (sense/intension) and Bedeutung (reference/extension), Carnapian intensional semantics, modal logic intensional operators, axiom of extensionality in Zermelo-Fraenkel set theory. |
| 🎭 **Dramaturgy, Literary Theory & Narrative Arts** | [[tension]], [[intense]], [[intensity]], [[pretense]] | Aristotle's dramatic conflict, rising narrative tension, catharsis, dramatic irony, Freytag's pyramid climax, screenwriting pacing techniques, high-stakes suspense, thematic intensity. |
| 🏛️ **Social Psychology, Sociology & Ethics** | [[tense]], [[tenseness]], [[pretension]], [[pretentious]], [[pretentiousness]], [[unpretentious]], [[ostensible]], [[ostensibly]] | Status anxiety, conspicuous consumption, intellectual snobbery, diplomatic tension during geopolitical crises, nonverbal behavioral tenseness, unpretentious cultural authenticity, ostensible diplomatic treaties. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[coextension]] | noun | **1.** Equality of extension or duration. | *"In academic literature, coextension designates equality of extension or duration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coextensive]] | adjective | **1.** Being of equal extent or scope or duration. | *"Economic relations never have been coextensive with political relations."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[distensible]] | adjective | **1.** Capable of being distended; able to stretch and expand. | *"In academic literature, distensible designates capable of being distended; able to stretch and expand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distension]] | noun | **1.** The act of expanding by pressure from within.<br>**2.** The state of being stretched beyond normal dimensions. | *"A silly girl!—silly girl!” The door was hurriedly burst open again, and in came running Cainy Ball out of breath, his mouth red and open, like the bell of a penny trumpet, from which he coughed with noisy vigour and great distension of face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[extensible]] | adjective | **1.** Capable of being protruded or stretched or opened out. | *"In academic literature, extensible designates capable of being protruded or stretched or opened out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensile]] | adjective | **1.** Capable of being protruded or stretched or opened out. | *"In academic literature, extensile designates capable of being protruded or stretched or opened out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extension]] | noun | **1.** A mutually agreed delay in the date set for the completion of a job or payment of a debt.<br>**2.** Act of expanding in scope; making more widely available. | *"He uttered a long guttural sigh—there was a contraction—an extension—then his muscles relaxed, and he lay still."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[extensional]] | adjective | **1.** Defining a word by listing the class of entities to which the word correctly applies. | *"In academic literature, extensional designates defining a word by listing the class of entities to which the word correctly applies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensive]] | adjective | **1.** Large in spatial extent or range or scope or quantity.<br>**2.** Broad in scope or content; ; ; ; ; - t.g.winner. | *"I am a School lady, I am a Visiting lady, I am a Reading lady, I am a Distributing lady; I am on the local Linen Box Committee and many general committees; and my canvassing alone is very extensive—perhaps no one’s more so."* — Charles Dickens, *Bleak House* |
| [[extensively]] | adverb | **1.** In a widespread way. | *"The tradition is that his rule was an exceedingly stern one, that he kept the children hard at work, and that he flogged extensively and remorselessly."* — John Cairns, *Principal Cairns* |
| [[extensiveness]] | noun | **1.** Large or extensive in breadth or importance or comprehensiveness. | *"In academic literature, extensiveness designates large or extensive in breadth or importance or comprehensiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extensor]] | noun | **1.** A skeletal muscle whose contraction extends or stretches a body part. | *"In academic literature, extensor designates a skeletal muscle whose contraction extends or stretches a body part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inextensible]] | adjective | **1.** Not extensile. | *"In academic literature, inextensible designates not extensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intense]] | adjective | **1.** Possessing or displaying a distinctive feature to a heightened degree.<br>**2.** Extremely sharp or intense. | *"I must go to him this minute," gasped Apollonie; she had spoken rapidly and with intense excitement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intensely]] | adverb | **1.** In an intense manner. | *"Was the mantle blue?" Loneli, who had been listening intensely, interrupted."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[intensification]] | noun | **1.** Action that makes something stronger or more extreme.<br>**2.** The act of increasing the contrast of (a photographic film). | *"Deepest love. [July 13, 1947] EVIDENCES OF NOTABLE EXPANSION Greatly welcome evidences of a notable expansion of activities and increased intensification of efforts for publicity."* — Effendi Shoghi, *Citadel of Faith* |
| [[intensified]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"The paint with which they were smeared, intensified in hue by the sunlight, imparted to them a look of having been dipped in liquid fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intensifier]] | noun | **1.** A modifier that has little meaning except to intensify the meaning it modifies. | *"In academic literature, intensifier designates a modifier that has little meaning except to intensify the meaning it modifies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensify]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"At times her whimsical fancy would intensify natural processes around her till they seemed a part of her own story."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[intensifying]] | verb | **1.** Increase in extent or intensity.<br>**2.** Make more intense, stronger, or more marked; ,. | *"By and by the beadle comes out, once more intensifying the sensation, which has rather languished in the interval."* — Charles Dickens, *Bleak House* |
| [[intension]] | noun | **1.** What you must know in order to determine the reference of an expression. | *"In academic literature, intension designates what you must know in order to determine the reference of an expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensional]] | adjective | **1.** Used of the set of attributes that distinguish the referents of a given word. | *"In academic literature, intensional designates used of the set of attributes that distinguish the referents of a given word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intensity]] | noun | **1.** The amount of energy transmitted (as by acoustic or electromagnetic radiation).<br>**2.** High level or degree; the property of being intense. | *"It may be that if we knew more of such strange afflictions we might be the better able to alleviate their intensity."* — Charles Dickens, *Bleak House* |
| [[intensive]] | noun | **1.** A modifier that has little meaning except to intensify the meaning it modifies.<br>**2.** Characterized by a high degree or intensity; often used as a combining form. | *"Intensive farming in Europe and America. § 8."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intensively]] | adverb | **1.** In an intensive manner. | *"Investment has advanced both intensively and extensively in a series of great waves."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intensiveness]] | noun | **1.** High level or degree; the property of being intense. | *"In academic literature, intensiveness designates high level or degree; the property of being intense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonextensile]] | adjective | **1.** Not extensile. | *"In academic literature, nonextensile designates not extensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pretense]] | noun | **1.** The act of giving a false appearance.<br>**2.** Pretending with intention to deceive. | *"An over-scrupulous jealousy of danger to the rights of the people, which is more commonly the fault of the head than of the heart, will be represented as mere pretense and artifice, the stale bait for popularity at the expense of the public good."* — Alexander Hamilton, *The Federalist Papers* |
| [[pretension]] | noun | **1.** A false or unsupportable quality.<br>**2.** The advancing of a claim. | *"Miss Tilney had a good figure, a pretty face, and a very agreeable countenance; and her air, though it had not all the decided pretension, the resolute stylishness of Miss Thorpe’s, had more real elegance."* — Jane Austen, *Northanger Abbey* |
| [[tense]] | noun | **1.** A grammatical category of verbs used to express distinctions of time.<br>**2.** Become stretched or tense or taut. | *"He went to the door, knocked, and waited with tense muscles and an aching brow."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tensed]] | verb | **1.** Become stretched or tense or taut.<br>**2.** Increase the tension on. | *"Out." O'Hare tensed, psy-blinked his view screen down to the instruments vital to his immediate mission, and mind-keyed several controls."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tensely]] | adverb | **1.** In a tense manner. | *"Flume, back against the opposite wall, weapon high and ready, peered tensely about."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tenseness]] | noun | **1.** The physical condition of being stretched or strained.<br>**2.** (psychology) a state of mental or emotional strain or suspense. | *"It was a week of strained tenseness; a certain electricity seemed at hand in the atmosphere, inhibiting speech."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[tensile]] | adjective | **1.** Of or relating to tension.<br>**2.** Capable of being shaped or bent or drawn out. | *"The average test on a number of plates gave— Tensile strength, 14·66 tons per square inch."* — Donald M. Levy, *Modern Copper Smelting* |
| [[tensimeter]] | noun | **1.** A manometer for measuring vapor pressure. | *"In academic literature, tensimeter designates a manometer for measuring vapor pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensiometer]] | noun | **1.** A measuring instrument for measuring the moisture content of soil.<br>**2.** A measuring instrument for measuring the tension in a wire or fiber or beam. | *"In academic literature, tensiometer designates a measuring instrument for measuring the moisture content of soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tension]] | noun | **1.** (psychology) a state of mental or emotional strain or suspense.<br>**2.** The physical condition of being stretched or strained. | *"The infant’s breathing grew more difficult, and the mother’s mental tension increased."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tensional]] | adjective | **1.** Of or relating to or produced by tension. | *"In academic literature, tensional designates of or relating to or produced by tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensionless]] | adjective | **1.** Free from tension. | *"In academic literature, tensionless designates free from tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensity]] | noun | **1.** The physical condition of being stretched or strained. | *"In academic literature, tensity designates the physical condition of being stretched or strained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tensor]] | noun | **1.** A generalization of the concept of a vector.<br>**2.** Any of several muscles that cause an attached structure to become tense or firm. | *"In academic literature, tensor designates a generalization of the concept of a vector."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TENS
  </div>
</div>
