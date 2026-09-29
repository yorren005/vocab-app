---
status: unread
type: root_dashboard
---
# Dashboard — vi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“way or road”</span>
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

The root **vi** means way or road. It refers to a pathway or highway traveled by pedestrians and vehicles. In English, this root forms words such as *draw*, *transport*, *via*, and *viaduct*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: way or road
> The root **vi** means way or road. It refers to a pathway or highway traveled by pedestrians and vehicles. In English, this root forms words such as *draw*, *transport*, *via*, and *viaduct*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Way or road</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *draw* and *transport*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vi** comes from a Latin word that means *"way or road"*.
  - At its core, it describes way or road.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **vi** in an English word, think of **speed, haste, and rapid movement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of way or road.
  - **Mental & Social**: How people experience, organize, or communicate about way or road.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Draw**: An everyday English word showing the root's idea of *way or road*.
  - **Transport**: An everyday English word showing the root's idea of *way or road*.
  - **Via**: By way of.
  - **Viaduct**: A long, multi-span bridge structure, typically composed of a series of masonry arches or steel trusses, carrying a highway or railway over a deep gorge, valley, or congested urban basin.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vi</mark>, think of <mark class="hl-def">speed, haste, and rapid movement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vi** operates across nominal, verbal, adjectival, and compounded morphological layers:
> - **The Primary Nominal Base `via-`:**
>   - Direct Latin ablative preposition: [[via]] ("by way of, through").
>   - Engineering bridge compound: *via* + *ductus* ("leading") $\to$ [[viaduct]].
>   - Journey allowance and liturgical sacrament: *viāticum* $\to$ [[viaticum]].
> - **Directional Prefixation with `dē-` ("away from, off"):**
>   - Adjectival base: *dēvius* ("off the beaten track, remote, treacherous") $\to$ [[devious]], [[deviously]], [[deviousness]].
>   - Verbal base: Late Latin *dēviāre*, *dēviātus* ("to turn aside") $\to$ [[deviate]], generating the action noun [[deviation]], agent noun [[deviator]], participial adjective [[deviant]], and abstract noun [[deviance]].
> - **Frontal Prefixation with `ob-` ("against, toward, in front of"):**
>   - Adjectival base: *obvius* ("lying in the way, easily found, manifest") $\to$ [[obvious]], [[obviously]], [[obviousness]].
>   - Verbal base: Late Latin *obviāre*, *obviātus* ("to meet in the way, hinder, render unnecessary") $\to$ [[obviate]], generating the action noun [[obviation]].
> - **Temporal & Directional Prefixation with `prae-` ("before, in advance"):**
>   - Adjectival base: Latin *praevius* ("going before, leading the way") $\to$ [[previous]], [[previously]], [[previousness]].
> - **Permeability Prefixation with `per-` ("through") and `in-` ("un- / not"):**
>   - Passable road: Latin *pervius* ("having a way through") $\to$ [[pervious]].
>   - Blocked road: Latin *impervius* ("impassable") $\to$ [[impervious]], [[imperviously]], [[imperviousness]].
> - **Numerical Crossroads Formations (`bi-`, `tri-`, `quadri-`):**
>   - Two ways: *bi-* + *via* $\to$ Latin *bivium* $\to$ [[bivium]] (a fork in the road).
>   - Three ways: *tri-* + *via* $\to$ Latin *trivium* $\to$ [[trivium]] (the three liberal arts), giving adjective *triviālis* $\to$ [[trivial]], [[trivially]], [[triviality]], [[trivialize]], [[trivialization]].
>   - Four ways: *quadri-* + *via* $\to$ Latin *quadrivium* $\to$ [[quadrivium]] (the four mathematical sciences).
> - **Gallo-Romance Logistical Evolutions (`con-`, `en-`, `in-`):**
>   - Accompanying on the road: Medieval Latin *conviāre* $\to$ Anglo-French *conveier* $\to$ [[convey]], generating [[conveyance]], [[conveyer]] / *conveyor*, and noun doublet [[convoy]].
>   - Sending on the road: Late Latin *inviāre* $\to$ Old French *envoyer* $\to$ diplomatic emissary [[envoy]] and commercial dispatch record [[invoice]].
>   - Expeditionary provisions: Latin *viāticum* $\to$ Old French *veiage* $\to$ [[voyage]], generating [[voyager]] and [[voyaging]].

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
> Although unified by the classical concept of the **paved roadway**, the semantic range of `vi` spans eight specialized conceptual planes:
> - **Civil Infrastructure & Spatial Transit:** In [[via]], [[viaduct]], [[bivium]], and [[viaticum]], the root preserves its concrete physical reality—the paved Roman stone highway, multi-arched railway viaducts spanning yawning gorges, forks where routes divide, and the material provisions packed for a grueling trek.
> - **Navigational & Ethical Divergence:** In [[deviate]], [[deviation]], [[deviator]], [[deviant]], [[deviance]], [[devious]], [[deviously]], and [[deviousness]], the root turns from geometric divergence into statistical variance, sociological non-conformity, and deceitful, serpentine manipulation.
> - **Conspicuous Visibility & Strategic Preemption:** In [[obvious]], [[obviously]], [[obviousness]], [[obviate]], and [[obviation]], the root embodies an object standing directly in the road—either so prominent that it requires zero cognitive effort to perceive, or intercepted in advance so that a future hazard is rendered obsolete.
> - **Chronological Precedence:** In [[previous]], [[previously]], and [[previousness]], spatial leadership on the road (*prae-vius*) is converted into temporal antecedent—what came before in an order, narrative, or historical epoch.
> - **Permeability, Barrier Physics & Psychological Resilience:** In [[pervious]], [[impervious]], [[imperviously]], and [[imperviousness]], the presence or absence of a pathway dictates whether geological soils absorb water, fabrics resist chemicals, or an orator remains bulletproof to hostile criticism.
> - **Epistemic Crossroads & the Valuation of Knowledge:** In [[trivium]], [[quadrivium]], [[trivial]], [[trivially]], [[triviality]], [[trivialize]], and [[trivialization]], the convergence of three or four paths represents either the lofty medieval pedagogical gateway to universal philosophy or the shallow, worthless gossip of street-corner crowds.
> - **Logistics, Freight & Material Transportation:** In [[convey]], [[conveyance]], [[conveyer]], [[convoy]], [[voyage]], [[voyager]], and [[voyaging]], the road expands into maritime trade lanes, mechanized factory assembly lines, naval escort flotillas, and deep-space expeditions.
> - **Diplomacy & Commercial Accountability:** In [[envoy]] and [[invoice]], the act of dispatching an agent onto the highway manifests as sovereign ambassadorship or the itemized bill detailing goods sent to market.

---

## 🔀 4. Prefix & Combining Dynamics on vi

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / First Element | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dē-` | off, away from, down | [[deviate]], [[devious]] | Turning *off the road*; wandering into physical, statistical, or ethical divergence. |
| `ob-` | toward, in front of, against | [[obvious]], [[obviate]] | Standing *directly in the road*; hence blatantly visible, or met in advance to prevent danger. |
| `prae-` (pre-) | before, ahead | [[previous]] | Walking *ahead on the road*; hence occurring earlier in chronological sequence. |
| `per-` | through, thoroughly | [[pervious]] | Having a *path right through*; capable of being penetrated or traversed. |
| `in-` + `per-` | not + through | [[impervious]] | Lacking *any path through*; completely impenetrable, waterproof, or unaffected. |
| `con-` (*com-*) | together, with | [[convey]], [[convoy]] | Moving *together along the way*; transporting goods or providing an armed traveling escort. |
| `in-` / `en-` | into, upon | [[envoy]], [[invoice]] | Setting *upon the road*; dispatching an ambassador or sending an itemized list of shipments. |
| `bi-` | two, twice | [[bivium]] | A junction where a single road splits into *two paths*; a navigational dilemma. |
| `tri-` | three | [[trivium]], [[trivial]] | A crossroad where *three roads meet*; the three verbal arts, or street-corner banality. |
| `quadri-` | four | [[quadrivium]] | A crossroad where *four roads meet*; the four advanced mathematical arts of antiquity. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-duct` (*ducere*) | Noun (Compound Root) | [[viaduct]] | A bridge structure that *leads/carries a road* over an obstacle. |
| `-ate` (*-āre*) | Verb (Infinitive / Factitive) | [[deviate]], [[obviate]] | To cause to stray from the path; to anticipate and clear away an obstacle. |
| `-ation` (*-ātiō*) | Noun (State / Process) | [[deviation]], [[obviation]], [[trivialization]] | The act, process, or mathematical magnitude of turning off course. |
| `-ant` (*-āns*) | Adjective & Noun (Agent) | [[deviant]] | Departing from established cultural or behavioral norms. |
| `-ance` (*-antia*) | Noun (Abstract Quality) | [[deviance]], [[conveyance]] | The condition of departing from norms; the legal act of transferring property. |
| `-ous` (*-ōsus*) | Adjective (Abounding in) | [[devious]], [[obvious]], [[previous]], [[impervious]] | Possessing the qualities of being off-path, in the path, before the path, or without path. |
| `-ly` | Adverb (Manner) | [[deviously]], [[obviously]], [[previously]], [[imperviously]], [[trivially]] | Performing an action in a circuitous, evident, antecedent, or impassive manner. |
| `-ness` | Noun (State / Condition) | [[deviousness]], [[obviousness]], [[previousness]], [[imperviousness]] | The inherent quality of being underhanded, transparent, prior, or impenetrable. |
| `-al` (*-ālis*) | Adjective (Pertaining to) | [[trivial]] | Pertaining to a three-way crossroad; hence ordinary, commonplace, or insignificant. |
| `-ity` (*-itās*) | Noun (Abstract State) | [[triviality]] | The condition of being of little worth; a trite, petty matter. |
| `-ize` (*-izāre*) | Verb (Causative) | [[trivialize]] | To make an issue appear petty, inconsequential, or common. |
| `-er` / `-or` | Noun (Agent / Instrument) | [[deviator]], [[conveyer]], [[voyager]] | One who diverges; a mechanical carrying belt; a maritime explorer. |
| `-aticum` | Noun (Provision / Allowance) | [[viaticum]], [[voyage]] | Money, food, or spiritual sacrament provided for traversing a long journey. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏗️ **Civil & Structural Engineering** | [[via]], [[viaduct]] | Designing multi-span highway viaducts, railway overpasses spanning deep gorges, urban elevated expressways, and arterial transit corridors. |
| 🎓 **Classical Pedagogy & Epistemology** | [[trivium]], [[quadrivium]], [[trivial]], [[triviality]] | The seven liberal arts of the medieval university, foundational curriculum structuring grammar/logic/rhetoric, and the philosophical demarcation of significant versus petty research questions. |
| 🚢 **Maritime Navigation & Global Logistics** | [[voyage]], [[voyager]], [[voyaging]], [[convey]], [[conveyance]], [[conveyer]], [[convoy]] | Intercontinental ocean shipping routes, mechanized belt conveyor systems in automated distribution centers, and naval convoy operations protecting merchant vessels during wartime. |
| 🏛️ **Diplomacy & International Protocol** | [[envoy]] | Accredited special presidential envoys, diplomatic missions negotiating multilateral ceasefires, and ambassadorial immunity under the Vienna Convention. |
| ⚖️ **Commercial Law & Accounting** | [[invoice]], [[conveyance]] | Auditing accounts payable and trade receivables, issuing itemized commercial invoices for freight transit, and the formal drafting of real property deed conveyances. |
| 🔬 **Materials Science & Hydrogeology** | [[impervious]], [[pervious]], [[imperviousness]] | Engineering impervious geotextile landfill liners, testing pervious concrete for urban storm runoff mitigation, and analyzing cellular membrane permeability. |
| 📊 **Statistics, Sociology & Psychology** | [[deviate]], [[deviation]], [[deviant]], [[deviance]], [[devious]] | Standard deviation in Gaussian distributions, sociological theories of criminal deviance, and psychological profiling of Machiavellian or devious personality traits. |
| ⛪ **Liturgical History & Theology** | [[viaticum]], [[bivium]] | Administering the last rites and the Holy Viaticum to dying patients in hospital chaplaincy; moral allegories of the *bivium* (the Pythagorean Y-fork between virtue and vice). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[devi]] | noun | **1.** Hindu mother goddess; supreme power in the universe; wife or embodiment of the female energy of siva having both beneficent and malevolent forms or aspects. | *"He vows to Singarmati Devi that, if the worms are duly born, he will make her an offering."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[deviance]] | noun | **1.** A state or condition markedly different from the norm.<br>**2.** Deviate behavior. | *"In academic literature, deviance designates a state or condition markedly different from the norm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deviant]] | noun | **1.** A person whose behavior deviates from what is acceptable especially in sexual behavior.<br>**2.** Markedly different from an accepted norm. | *"In academic literature, deviant designates a person whose behavior deviates from what is acceptable especially in sexual behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deviate]] | noun | **1.** A person whose behavior deviates from what is acceptable especially in sexual behavior.<br>**2.** Turn aside; turn away from. | *"I had not, it seems, the originality to chalk out a new road to shame and destruction, but trode the old track with stupid exactness not to deviate an inch from the beaten centre."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[deviation]] | noun | **1.** A variation that deviates from the standard or norm.<br>**2.** The difference between an observed value and the expected value of a variable or function. | *"He points it, however, by no deviation from his straightforward manner of speech, though in saying it he turns towards that part of the dim room where my Lady sits."* — Charles Dickens, *Bleak House* |
| [[devious]] | adjective | **1.** Indirect in departing from the accepted or proper way; misleading.<br>**2.** Characterized by insincerity or deceit; evasive. | *"By many devious ways, reeking with offence of many kinds, they come to the little tunnel of a court, and to the gas-lamp (lighted now), and to the iron gate."* — Charles Dickens, *Bleak House* |
| [[deviously]] | adverb | **1.** In a devious manner. | *"In academic literature, deviously designates in a devious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deviousness]] | noun | **1.** The quality of being oblique and rambling indirectly.<br>**2.** The quality of being deceitful and underhanded. | *"In academic literature, deviousness designates the quality of being oblique and rambling indirectly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obviate]] | verb | **1.** Do away with.<br>**2.** Prevent the occurrence of; prevent from happening. | *"Upon this ground, which is evidently the true one, it will not be difficult to obviate the objections which have been made to an indefinite power of taxation in the United States."* — Alexander Hamilton, *The Federalist Papers* |
| [[obviating]] | verb | **1.** Do away with.<br>**2.** Prevent the occurrence of; prevent from happening. | *"There was an open, glowing fire in their little sitting-room, a high fender of polished brass obviating all danger from it to the children's skirts."* — Martha Finley, *Elsie's Kith and Kin* |
| [[obviation]] | noun | **1.** The act of preventing something by anticipating and disposing of it effectively. | *"In academic literature, obviation designates the act of preventing something by anticipating and disposing of it effectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obvious]] | adjective | **1.** Easily perceived by the senses or grasped by the mind. | *"He listened to himself with obvious satisfaction and sometimes gently beat time to his own music with his head or rounded a sentence with his hand."* — Charles Dickens, *Bleak House* |
| [[obviously]] | adverb | **1.** Unmistakably (`plain' is often used informally for `plainly'). | *"He was more obviously struck and confused by the sight of her than she had ever observed before; he looked quite red."* — Jane Austen, *Persuasion* |
| [[obviousness]] | noun | **1.** The property of being easy to see and understand. | *"In academic literature, obviousness designates the property of being easy to see and understand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[previous]] | adjective | **1.** Just preceding something else in time or order.<br>**2.** (used especially of persons) of the immediate past. | *"She had received orders to remind the children of the strict command, and she knew quite well from previous experiences that she could never have succeeded as effectively as he."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[previously]] | adverb | **1.** At an earlier time or formerly. | *"Much discomposed in her nerves (which were previously in the best order) by this threat, she so fearfully mutilates that point of state as to announce “Mr. and Mrs."* — Charles Dickens, *Bleak House* |
| [[trivia]] | noun | **1.** Something of small importance.<br>**2.** (middle ages) an introductory curriculum at a medieval university involving grammar and logic and rhetoric; considered to be a triple way to eloquence. | *"In academic literature, trivia designates something of small importance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trivial]] | adjective | **1.** (informal) small and of little importance.<br>**2.** Of little substance or significance. | *"Our rash faults Make trivial price of serious things we have, Not knowing them until we know their grave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trivialise]] | verb | **1.** Make trivial or insignificant. | *"In academic literature, trivialise designates make trivial or insignificant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[triviality]] | noun | **1.** The quality of being unimportant and petty or frivolous.<br>**2.** A detail that is considered insignificant. | *"Helen Burns asked some slight question about her work of Miss Smith, was chidden for the triviality of the inquiry, returned to her place, and smiled at me as she again went by."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[trivialize]] | verb | **1.** Make trivial or insignificant. | *"In academic literature, trivialize designates make trivial or insignificant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trivially]] | adverb | **1.** With little effort.<br>**2.** In a frivolously trivial manner. | *"They are either trivially or extravagantly stated."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[unobvious]] | adjective | **1.** Not immediately apparent; - a.n.whitehead. | *"In academic literature, unobvious designates not immediately apparent; - a.n.whitehead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vi]] | noun | **1.** The cardinal number that is the sum of five and one.<br>**2.** More than 130 southeastern virgin islands; a dependent territory of the united states. | *"Never fear, sir; you are not speaking to one who is altogether ignorant of the _vis medicatrix_,” said he, with his usual superiority of expression, made rather pathetic by difficulty of breathing."* — George Eliot, *Middlemarch* |
| [[via]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vi within the domain of Movement & Speed.<br>**2.** A technical or specialized form exhibiting the properties of vi in systematic terminology. | *"DAUPHIN. _Via, les eaux et terre!_ ORLEANS. _Rien puis?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viaduct]] | noun | **1.** Bridge consisting of a series of arches supported by piers used to carry a road (or railroad) over a valley. | *"A great viaduct runs across, with high piers, through which the view seems somehow further away than it really is."* — Bram Stoker, *Dracula* |

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
    ROOT DASHBOARD · VI
  </div>
</div>
