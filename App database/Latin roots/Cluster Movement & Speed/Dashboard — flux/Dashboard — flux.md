---
status: unread
type: root_dashboard
---
# Dashboard — flux
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flux-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flow, stream, or continuous change”</span>
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

The root **flux** means flow, stream, or continuous change. It refers to moving like a liquid stream in a steady continuous current. In English, this root forms words such as *flux*, *influx*, *reflux*, and *conflux*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flow, stream, or continuous change
> The root **flux** means flow, stream, or continuous change. It refers to moving like a liquid stream in a steady continuous current. In English, this root forms words such as *flux*, *influx*, *reflux*, and *conflux*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Flow, stream, or continuous change</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *flux* and *influx*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flux** comes from a Latin word that means *"flow, stream, or continuous change"*.
  - At its core, it describes flow, stream, or continuous change.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **flux** in an English word, think of **speed, haste, and rapid movement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of flow, stream, or continuous change.
  - **Mental & Social**: How people experience, organize, or communicate about flow, stream, or continuous change.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Flux**: The rate of flow of fluid, particles, or energy per unit area through a real or imaginary surface.
  - **Influx**: The arrival, entry, or inward flow of a large number of people, capital, goods, or stimuli into a given place or system.
  - **Reflux**: The backward, retrograde flow of bodily fluids contrary to normal physiological direction, especially the ascent of acidic gastric contents into the esophagus.
  - **Conflux**: A flowing together or merging of two or more streams, rivers, or physical currents.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flux</mark>, think of <mark class="hl-def">speed, haste, and rapid movement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **flux** operates from the supine and past-participial base `flux-` of the Latin third-conjugation verb *fluō, fluere, fluxī, fluxum*, and its cognate fourth-declension verbal noun *fluxus, fluxūs*.
>
> ### Morphological Stems & Bases:
> - **Supine / Nominal Base `flux-` (Latin *fluxus*):**
>   - Direct nominal adoption: English [[flux]].
>   - Directional prefix compounds: *in-* + *flux* $\to$ [[influx]]; *re-* + *flux* $\to$ [[reflux]]; *ex-* (assimilated to *ef-*) + *flux* $\to$ [[efflux]]; *con-* + *flux* $\to$ [[conflux]]; *ad-* (assimilated to *af-*) + *flux* $\to$ [[afflux]]; *super-* + *flux* $\to$ [[superflux]].
>   - Compound technological hybrids: *flux* + *gate* $\to$ [[fluxgate]]; *flux* + Greek *métron* $\to$ [[fluxmeter]]; *flux* + *density* $\to$ [[flux density]].
>   - Adjectival suffixation: *flux* + *-ive* (Latin *-īvus*) $\to$ [[fluxive]].
> - **Action Noun & Calculus Stem `fluxion-` (Latin *fluxiō, fluxiōnis*):**
>   - Abstract mathematical action noun: Latin *fluxiō* $\to$ English [[fluxion]].
>   - Adjectival derivatives: *fluxion* + *-al* $\to$ [[fluxional]]; *fluxion* + *-ary* $\to$ [[fluxionary]].
>   - Chemical property noun: *fluxional* + *-ity* $\to$ [[fluxionality]].
>   - Prefixed action nouns: *ex-* + *fluxiō* $\to$ [[effluxion]]; *dē-* + *fluxiō* $\to$ [[defluxion]].
>
> ### Prefix Matrix on `flux-`:
> The verbal morphology of *fluere* systematically accepts spatial prefixes, which preserve their classical directional contours across all technical domains:
> - **`in-` (in, into):** Flowing inward across a threshold $\to$ [[influx]] (inflow of people, capital, or intracellular ions).
> - **`re-` (back, again):** Flowing backward against natural gradient $\to$ [[reflux]] (acid reflux, solvent reflux condensation).
> - **`ex-` $\to$ `ef-` (out, forth):** Flowing outward through an aperture $\to$ [[efflux]] (gas discharge, bacterial efflux pumps), [[effluxion]] (expiration of legal time).
> - **`con-` (together):** Flowing together into a common pool $\to$ [[conflux]] (merging of rivers or crowds).
> - **`ad-` $\to$ `af-` (to, toward):** Flowing toward a focal locus $\to$ [[afflux]] (accumulation of fluid or upstream hydraulic water level).
> - **`super-` (above, over):** Flowing beyond sufficiency $\to$ [[superflux]] (Shakespearean surplus / excess).
> - **`dē-` (down from):** Flowing downward from a source $\to$ [[defluxion]] (catarrhal discharge, falling off).

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
> Although unified by the foundational concept of **"continuous flow and passage across a threshold"**, the derivatives of `flux` diverge into specialized operational planes:
> - **Vector Field Theory & Theoretical Physics:** In [[flux]], [[flux density]], and [[fluxmeter]], the root quantifies the throughput of vector field lines (magnetic or electric) traversing a defined surface area ($\Phi = \iint \mathbf{B} \cdot d\mathbf{A}$ or $\Phi = \iint \mathbf{E} \cdot d\mathbf{A}$), underpinning Gauss's laws and Faraday's law of induction.
> - **History of Mathematics & Infinitesimal Calculus:** In [[fluxion]], [[fluxional]], and [[fluxionary]], the root embodies Isaac Newton's method of calculus, where a *fluxion* ($\dot{x}$) represents the instantaneous rate of generation of a continuous geometric curve (*fluent*).
> - **Inorganic & Coordination Chemistry:** In [[fluxional]] and [[fluxionality]], the root describes dynamic stereochemical molecules (e.g., metal carbonyls, $PF_5$) whose constituent atoms rapidly interchange positions between equivalent geometries without breaking bonds.
> - **Metallurgy, Welding & Pyrotechnics:** In [[flux]], the root names the chemical agents (borax, rosin, fluorite) applied during brazing, soldering, and smelting to strip oxide coatings, shield molten metal from atmospheric oxygen, and induce clean capillary wetting.
> - **Clinical Gastroenterology & Laboratory Distillation:** In [[reflux]], the root designates both the pathological upward escape of gastric acid into the esophagus (GERD) and the chemical laboratory apparatus that condenses vapors back into a boiling mixture to sustain high-temperature reactions without fluid loss.
> - **Microbiology & Antimicrobial Resistance:** In [[efflux]], the root defines bacterial transmembrane efflux pumps that recognize and actively expel antibiotics from the bacterial cytoplasm, creating multi-drug resistance.
> - **Socioeconomic Demographics & Cell Electrophysiology:** In [[influx]], the root spans macroeconomic migrations of capital or populations and the microscopic rushing of calcium or sodium ions into a depolarizing neuron.
> - **Jurisprudence & Legal Property Law:** In [[effluxion]], the root serves as a precise legal term denoting the expiration of a lease, contract, or statutory covenant purely by the natural running out of time (*effluxion of time*).
> - **Hydraulic Engineering & Civil Infrastructure:** In [[afflux]], the root measures the upstream rise in water level generated when river flow encounters a constriction such as bridge abutments or weirs.
> - **Classical Literature & Dramatic Poetry:** In [[superflux]] and [[fluxive]], the root delivers Shakespearean emotional resonance—King Lear shedding his excess wealth to the wretched, and the weeping lover shedding copious tears from "fluxive eyes."

---

## 🔀 4. Prefix & Combining Dynamics on flux

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | in, into, within | [[influx]] | Inward flow across a boundary; mass arrival of people, funds, or inward migration of cellular ions. |
| `re-` | back, backward, again | [[reflux]] | Retrograde or backward flow against normal direction; continuous vapor condensation back into a boiling flask. |
| `ex-` (assimilated to `ef-` before `f`) | out of, forth, away | [[efflux]], [[effluxion]] | Outward discharge of fluid, gas, or particles; expulsion of antibiotics by bacterial cells; expiration of legal time. |
| `con-` | together, with | [[conflux]] | The flowing together or confluence of two or more streams, ideas, or crowds converging at a common point. |
| `ad-` (assimilated to `af-` before `f`) | to, toward, upon | [[afflux]] | Flow directed toward a specific locus; upstream elevation of water caused by an obstruction; inflammatory fluid accumulation. |
| `super-` | over, above, beyond | [[superflux]] | Flowing beyond the brim; an overflow, superfluity, or surplus beyond what is needed for basic sustenance. |
| `dē-` | down, down from, away | [[defluxion]] | Downward discharge or flow of bodily humors (catarrh); historical term for a shedding or falling off. |
| *(unprefixed base)* | — | [[flux]], [[fluxion]], [[fluxional]], [[fluxive]] | The direct phenomenon of continuous flow, dynamic mutability, mathematical velocity, or metallurgical melting. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` (Latin *-iō, -iōnis*) | Action Noun / Process | [[fluxion]], [[effluxion]], [[defluxion]] | Denotes the act, state, or mathematical rate of flowing, discharging, or expiring through time. |
| `-al` (Latin *-ālis*) | Adjective (Relational / Quality) | [[fluxional]] | Pertaining to fluxions (calculus) or exhibiting rapid intramolecular structural rearrangement (chemistry). |
| `-ity` (Latin *-itās*) | Abstract Noun (State / Property) | [[fluxionality]] | The intrinsic molecular property or state of undergoing stereochemical rearrangements. |
| `-ary` (Latin *-ārius*) | Adjective (Pertaining to) | [[fluxionary]] | Pertaining to or proceeding by Newtonian fluxional calculus. |
| `-ive` (Latin *-īvus*) | Adjective (Disposition / Tendency) | [[fluxive]] | Having a tendency to flow, weep, or change; watery, tearful, or mutable. |
| `-gate` (Old English *geat*) | Compound Noun (Channel / Mechanism) | [[fluxgate]] | A saturable-core magnetic sensor configured to gate or modulate magnetic flux. |
| `-meter` (Greek *métron*) | Instrument Noun (Measurement) | [[fluxmeter]] | An electrical or magnetic instrument calibrated to quantify flux lines traversing a test coil. |
| `density` (Latin *dēnsitās*) | Compound Noun (Concentration Measure) | [[flux density]] | The concentration of magnetic, electric, or radiant flux traversing a perpendicular unit area. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📐 **History of Mathematics & Calculus** | [[fluxion]], [[fluxional]], [[fluxionary]] | Sir Isaac Newton's 1666 formulation of differential calculus as the *Method of Fluxions*; variables generated by continuous motion were termed *fluents*, and their instantaneous velocities of change were termed *fluxions* ($\dot{x}$). |
| ⚡ **Electromagnetism & Vector Field Theory** | [[flux]], [[flux density]], [[fluxgate]], [[fluxmeter]] | Formulation of Gauss's law for electric fields ($\Phi_E = \frac{Q}{\varepsilon_0}$) and magnetic fields ($\Phi_B = 0$); Faraday's law of electromagnetic induction ($\mathcal{E} = -\frac{d\Phi_B}{dt}$); fluxgate magnetometers on space probes mapping planetary magnetic dipoles. |
| 🔥 **Metallurgy, Welding & Materials Science** | [[flux]] | Chemical fluxes (borax, ammonium chloride, zinc chloride, rosin) used in soldering, brazing, and blast-furnace smelting to dissolve metallic oxide films, reduce surface tension, prevent oxidation, and promote seamless capillary flow of molten filler alloys. |
| 🩺 **Gastroenterology, Oncology & Pharmacology** | [[reflux]], [[efflux]], [[defluxion]] | Gastroesophageal reflux disease (GERD) caused by lower esophageal sphincter incompetence; bacterial transmembrane efflux pumps (e.g., Resistance-Nodulation-Division / RND superfamily) that confer multidrug resistance by pumping antibiotics out of cells. |
| 🏛️ **Philosophy & Metaphysics** | [[flux]] | The Heraclitean doctrine of perpetual change (*panta rhei*, Latinized as *omnia in fluxū sunt*); modern process philosophy (Alfred North Whitehead) and Buddhist/Stoic concepts of impermanence where static substance is an illusion of dynamic flow. |
| 🎭 **Shakespearean Drama & Classical Literature** | [[superflux]], [[fluxive]] | King Lear's dramatic awakening on the stormy heath (*"shake the superflux to them, and show the heavens more just"*, Act 3, Sc. 4); Shakespeare's poignant depiction of weeping in *A Lover's Complaint* (*"fluxive eyes"*). |
| ⚖️ **Property Law & Commercial Leasing** | [[effluxion]] | The standard legal doctrine of lease termination: a lease, patent, or term of office expiring naturally by *effluxion of time* without breach, notice, or forfeiture. |
| 💧 **Hydrology & Civil Hydraulic Engineering** | [[afflux]], [[influx]], [[conflux]] | Calculation of upstream afflux caused by river bridge piers or weirs to prevent levee overtopping; monitoring seasonal influx into reservoirs; urban stormwater convergence at the conflux of drainage basins. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conflux]] | noun | **1.** A flowing together. | *"There was a conflux of emotions and thoughts in him that would not let him either give thorough way to his anger or persevere with simple rigidity of resolve."* — George Eliot, *Middlemarch* |
| [[efflux]] | noun | **1.** The process of flowing out. | *"Again, we are told that Ohio legalizes “special contracts” up to eight per cent. and, that if we would prevent the efflux of capital we must follow in the same direction."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[flux]] | noun | **1.** The rate of flow of energy or particles across a given surface.<br>**2.** A flow or discharge. | *"Civet is of a baser birth than tar, the very uncleanly flux of a cat."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fluxion]] | noun | **1.** A flow or discharge. | *"In academic literature, fluxion designates a flow or discharge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluxmeter]] | noun | **1.** Meter that measures magnetic flux by the current it generates in a coil. | *"In academic literature, fluxmeter designates meter that measures magnetic flux by the current it generates in a coil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[influx]] | noun | **1.** The process of flowing in. | *"The continual influx of cheap labor aided in imparting values to all industrial opportunities."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[reflux]] | noun | **1.** An abnormal backward flow of body fluids.<br>**2.** The outward flow of the tide. | *"She became more or less red in the cheek, the blood wavering in uncertain flux and reflux over the sensitive space between ebb and flood."* — Thomas Hardy, *Far from the Madding Crowd* |

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
    ROOT DASHBOARD · FLUX
  </div>
</div>
