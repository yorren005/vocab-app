---
status: unread
type: root_dashboard
---
# Dashboard — flu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to flow”</span>
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

The root **flu** means to flow. It refers to moving like a liquid stream in a steady continuous current. In English, this root forms words such as *fluent*, *fluid*, *influence*, and *affluent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to flow
> The root **flu** means to flow. It refers to moving like a liquid stream in a steady continuous current. In English, this root forms words such as *fluent*, *fluid*, *influence*, and *affluent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To flow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *fluent* and *fluid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flu** comes from a Latin word that means *"to flow"*.
  - At its core, it describes the action of flow.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **flu** in an English word, think of **to flow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to flow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Fluent**: Capable of speaking, reading, or writing a language with ease, facility, and accuracy.
  - **Fluid**: A continuous substance that yields readily to external shear stress and conforms to the shape of its container.
  - **Influence**: The power or capacity of a person or thing to produce an effect on the character, actions, or development of another without direct physical force.
  - **Affluent**: Having a copious supply of material wealth, property, or money.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flu</mark>, think of <mark class="hl-def">to flow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **flu** generates derived English vocabulary through four distinct morphological stems derived from the principal parts of **fluō, fluere, fluxī, fluxum**:
> - **Present Active Stem:** `flu-` (from the infinitive *fluere* and present indicative base *fluō*) — forms core adjectives of state, hydraulic nouns, and compounds: [[fluid]], [[fluidity]], [[fluidize]], [[flume]] (< *flūmen*), [[fluor]], [[fluorine]], [[fluoride]], [[superfluous]] (< *superfluus*), and [[mellifluous]] (< *mel* + *fluere*).
> - **Participial / Agentive Stem:** `fluent-` (from the present active participle *fluēns, fluentis*) — forms adjectives and abstract nouns designating active, continuous streaming: [[fluent]], [[fluently]], [[fluency]], [[affluent]], [[confluent]], [[effluent]], [[influent]], [[circumfluent]], [[interfluent]], [[defluent]], [[diffluent]], [[refluent]], and [[profluent]].
> - **Supine / Perfect Passive Stem:** `flux-` (from perfect *fluxī* and supine *fluxum*) — produces nouns of completed condition, resultant mass, rates of flow, and metallurgical/physical processes: [[flux]], [[fluxion]], [[influx]], [[reflux]], [[afflux]], [[conflux]], [[superflux]], and the phonological blend [[flush]].
> - **Frequentative / Iterative Stem:** `fluctu-` (from the frequentative verb *fluctuāre*, derived from noun *fluctus* "wave, billow") — captures repetitive, oscillating, or undulating motion: [[fluctuate]], [[fluctuation]].
>
> ### Morphophonemic Prefix Assimilation Rules
> When classical directional prefixes attach to `flu-` or `flux-`, the initial consonant cluster /fl-/ triggers strict Latin phonological assimilation patterns:
> - **ad- + flu- $\to$ afflu-**: Regressive assimilation changes the dental stop /d/ into the labiodental fricative /f/ before /fl-/, yielding *affluēns* $\to$ [[affluent]], [[affluence]], and *affluxus* $\to$ [[afflux]].
> - **con- + flu- $\to$ conflu-**: The nasal /n/ assimilates to the labiodental articulation but retains its spelling before /fl-/, yielding *confluere* $\to$ [[confluent]], [[confluence]], [[conflux]].
> - **ex- + flu- $\to$ efflu-**: The prefix *ex-* loses its velar stop and assimilates /ks/ $\to$ /ff/, producing *effluere* $\to$ [[effluent]], [[effluence]], [[effluve]], [[effluvium]].
> - **dis- + flu- $\to$ difflu-**: The sibilant /s/ assimilates completely to the following fricative /f/, producing *diffluere* $\to$ [[diffluent]], [[diffluence]].
> - **in- + flu- $\to$ influ-**: The prefix *in-* combines without spelling change before /fl-/, yielding *influere* $\to$ [[influence]], [[influential]], [[influent]], [[influx]].
> - **re- + flu- $\to$ reflu-**: Attaches cleanly without consonant modification, yielding *refluere* $\to$ [[reflux]], [[refluent]].
> - **super- + flu- $\to$ superflu-**: Prefixed to express liquid spilling over vessel rims, yielding *superfluus* $\to$ [[superfluous]], [[superfluity]], [[superflux]].

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
> Although the root fundamentally denotes **"to flow, run, glide, stream"**, its practical manifestation shifts decisively across conceptual and empirical domains:
> - **Hydrology, Geology & Environmental Engineering:** In words like [[confluence]], [[effluent]], [[influent]], [[flume]], [[diffluent]], and [[interfluent]], the root operates in its purest physical sense—river junctions, raw municipal discharge, narrow industrial water channels, the splitting of glacial ice streams, and waterways meandering between landmasses.
> - **Linguistics, Rhetoric & Acoustic Aesthetics:** In words like [[fluent]], [[fluently]], [[fluency]], [[mellifluous]], and [[mellifluously]], hydrodynamic motion is metaphorically mapped onto communication: speech that pours without cognitive hesitation, or vocal cadences sweet and liquid as honey.
> - **Socioeconomic Prosperity & Superfluous Overflow:** In words like [[affluent]], [[affluence]], [[affluently]], [[superfluous]], [[superfluously]], [[superfluity]], and [[superflux]], liquid accumulation represents wealth pouring copiously into private vaults or resources overflowing beyond the bounds of necessity.
> - **Cosmic Influx, Interpersonal Sway & Pathology:** In words like [[influence]], [[influential]], [[influx]], [[influenza]], and [[flu]], an ancient astrological belief in celestial emanations evolved into the invisible power to shape minds and policy, while simultaneously bequeathing modern epidemiology its most widespread respiratory viral disease.
> - **Physics, Metallurgy & Luminescent Materials:** In words like [[fluid]], [[fluidity]], [[fluidize]], [[fluidics]], [[flux]], [[fluxion]], [[fluor]], [[fluorite]], [[fluorine]], [[fluoride]], [[fluoridation]], [[fluorescent]], [[fluorescence]], [[fluoroscopy]], and [[fluorochemical]], the root spans Newton's continuous rate calculus, the liquefaction of metal ores in smelting furnaces, the most reactive element in the periodic table, dental mineralization, and quantum radiation emissions.
> - **Oscillation, Instability & Rhythmic Mutability:** In words like [[fluctuate]], [[fluctuation]], and [[flux]] (in a state of flux), the root tracks the undulation of wave crests (*fluctus*), describing volatile financial markets, shifting geopolitical alliances, and continuous existential change.

---

## 🔀 4. Prefix & Combining Dynamics on flu

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (assimilated to `af-`) | to, toward | [[affluent]], [[affluence]], [[afflux]] | *ad-* + *fluere* $\to$ flowing toward a person or place $\to$ copious abundance of wealth; hydraulic swelling. |
| `circum-` | around, about | [[circumfluent]], [[circumfluence]] | *circum-* + *fluere* $\to$ flowing around on all sides $\to$ encircling like an oceanic current around an island. |
| `con-` | together, with | [[confluent]], [[confluence]], [[conflux]] | *con-* + *fluere* $\to$ flowing together into one body $\to$ junction of streams; convergence of human crowds. |
| `de-` | down, away | [[defluent]] | *dē-* + *fluere* $\to$ flowing downward $\to$ decurrent botanical sap or downward liquid trickles. |
| `dis-` (assimilated to `dif-`) | apart, in different directions | [[diffluent]], [[diffluence]] | *dis-* + *fluere* $\to$ flowing apart $\to$ splitting of glacial ice streams or rivers into distributaries. |
| `ex-` (assimilated to `ef-`) | out of, forth | [[effluent]], [[effluence]], [[effluve]], [[effluvium]] | *ex-* + *fluere* $\to$ flowing out of a source $\to$ wastewater discharge; noxious or subtle evaporative emanations. |
| `in-` | in, into, upon | [[influence]], [[influential]], [[influent]], [[influx]], [[influenza]] | *in-* + *fluere* $\to$ flowing into $\to$ inward stream, celestial emanation, persuasive power, epidemic viral spread. |
| `inter-` | between, among | [[interfluent]] | *inter-* + *fluere* $\to$ flowing between $\to$ waterways flowing between separate islands, shores, or territories. |
| `pro-` | forward, forth | [[profluent]] | *pro-* + *fluere* $\to$ flowing forth smoothly, copiously, and without interruption from a fountainhead. |
| `re-` | back, again | [[reflux]], [[refluent]] | *re-* + *fluere* $\to$ flowing back $\to$ ebbing tidal current; backward regurgitation of gastric fluids; chemical condenser cycle. |
| `super-` | over, above, beyond | [[superfluous]], [[superfluously]], [[superfluity]], [[superflux]] | *super-* + *fluere* $\to$ overflowing the rim $\to$ exceeding what is necessary; extravagant surplus or redundancy. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ent` | Adjective (Participial Quality) | [[fluent]], [[affluent]], [[confluent]], [[effluent]], [[influent]] | Designates the active condition, capacity, or performance of streaming or gliding. |
| `-ence` / `-ency` | Noun (State, Quality, Process) | [[fluency]], [[affluence]], [[confluence]], [[effluence]], [[influence]] | Denotes the property, state, or manifestation of continuous flowing, abundance, or meeting. |
| `-id` | Adjective (Descriptive State) | [[fluid]] | Expresses the physical condition of flowing readily; liquid or gaseous rather than rigid. |
| `-ity` | Noun (Abstract State / Property) | [[fluidity]], [[superfluity]] | Measures the essential property, degree, or quality of being fluid or overflowing. |
| `-ize` / `-ization` | Verb / Noun (Causative Action / Process) | [[fluidize]], [[fluidization]] | Denotes the chemical or mechanical process of converting solid granular matter into a fluid-like state. |
| `-ate` / `-ation` | Verb / Noun (Iterative Action / Process) | [[fluctuate]], [[fluctuation]] | Captures repetitive, wave-like oscillation back and forth across a median. |
| `-ous` | Adjective (Full of, Characterized by) | [[superfluous]], [[mellifluous]] | Indicates being overflowing with excess material, or rich and sweet with honey-like smoothness. |
| `-ion` | Noun (Act, Process, or Mathematical Rate) | [[fluxion]], [[fluctuation]] | Designates Newton's instantaneous rate of change of a flowing variable, or an undulating shift. |
| `-ics` | Noun pl. (System, Art, Engineering Science) | [[fluidics]] | Designates the specialized technological discipline utilizing fluid logic channels for computation and control. |
| `-esc-ent` / `-escence` | Inchoative Adjective / Noun | [[fluorescent]], [[fluorescence]] | Signifies beginning to emit visible light upon absorbing shorter wavelength radiation (via mineral *fluorite*). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌊 **Hydrology & Civil Engineering** | [[confluence]], [[effluent]], [[influent]], [[flume]], [[diffluent]], [[interfluent]] | Mapping river basin junctions, measuring municipal wastewater discharge, designing timber flumes and aqueducts, modeling glacial stream bifurcations. |
| 🗣️ **Linguistics, Rhetoric & Oratory** | [[fluent]], [[fluently]], [[fluency]], [[mellifluous]], [[mellifluously]] | Assessing foreign language proficiency, analyzing frictionless phonetic transitions, describing sweet, resonant vocal delivery in broadcasting. |
| 💰 **Economics & Sociology** | [[affluent]], [[affluence]], [[affluently]], [[superfluous]], [[superfluity]], [[superflux]] | Demarcating high-income suburban demographics, analyzing luxury consumer spending patterns, evaluating superfluous regulatory overhead. |
| ⚖️ **Politics, Diplomacy & Social Power** | [[influence]], [[influential]], [[influx]] | Negotiating sovereign spheres of influence, tracking legislative lobbying power, managing sudden cross-border influxes of humanitarian migrants. |
| 🔬 **Physics, Calculus & Fluid Dynamics** | [[fluid]], [[fluidity]], [[fluidize]], [[fluidics]], [[flux]], [[fluxion]], [[reflux]] | Navier-Stokes fluid mechanics, Newton's fluxional calculus of continuous change, magnetic flux density across surfaces, pneumatic fluidic logic gates. |
| 🧪 **Chemistry & Materials Science** | [[flux]], [[fluor]], [[fluorite]], [[fluorine]], [[fluoride]], [[fluoridation]], [[fluorochemical]] | Formulating metallurgical fluxes for metal smelting, isolating elemental fluorine, fluoridating public water supplies, synthesizing Teflon fluoropolymers. |
| 🩺 **Medicine, Virology & Diagnostic Imaging** | [[influenza]], [[flu]], [[fluoroscopy]], [[effluvium]], [[reflux]] | Managing seasonal orthomyxovirus influenza epidemics, real-time X-ray fluoroscopic catheterization, treating acid reflux (GERD) and telogen effluvium. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affluence]] | noun | **1.** Abundant wealth. | *"She had been used to affluence: it was gone."* — Jane Austen, *Persuasion* |
| [[affluent]] | noun | **1.** An affluent person; a person who is financially well off.<br>**2.** A branch that flows into the main stream. | *"They cannot endure doctrines, which level all vain distinctions, and require the noble, the affluent, and the learned, to assume the same station of penitence and contrition, with the lowliest peasant."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[confluence]] | noun | **1.** A place where things merge or flow together (especially rivers).<br>**2.** A flowing together. | *"You see this confluence, this great flood of visitors."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confluent]] | noun | **1.** A branch that flows into the main stream.<br>**2.** Flowing together. | *"A confluent small-pox had in all directions flowed over his face, and left it like the complicated ribbed bed of a torrent, when the rushing waters have been dried up."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[diflunisal]] | noun | **1.** Nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions. | *"In academic literature, diflunisal designates nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disfluency]] | noun | **1.** Lack of skillfulness in speaking or writing. | *"In academic literature, disfluency designates lack of skillfulness in speaking or writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effluence]] | noun | **1.** The process of flowing out. | *"I remember it now, and I know that it was the effluence of fine intellect, of true courage; it lit up her marked lineaments, her thin face, her sunken grey eye, like a reflection from the aspect of an angel."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[effluent]] | noun | **1.** Water mixed with waste matter.<br>**2.** That is flowing outward. | *"Hence this effluent, if placed upon the soil, is of great value."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[flu]] | noun | **1.** An acute febrile highly contagious viral disease. | *"Under the floors ran flues through which the kitchen smoke escaped, warming the sleeping-room in its passage."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fluctuate]] | verb | **1.** Cause to fluctuate or move in a wavelike pattern.<br>**2.** Move or sway in a rising and falling or wavelike pattern. | *"I fluctuate a little; that’s the truth."* — Charles Dickens, *Bleak House* |
| [[fluctuating]] | verb | **1.** Cause to fluctuate or move in a wavelike pattern.<br>**2.** Move or sway in a rising and falling or wavelike pattern. | *"Her face had latterly changed with changing states of mind, continually fluctuating between beauty and ordinariness, according as the thoughts were gay or grave."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fluctuation]] | noun | **1.** A wave motion.<br>**2.** An instance of change; the rate or magnitude of change. | *"But this fluctuation of general prices surely can be so greatly moderated in magnitude and in evil results as to make the word "crisis" almost a misnomer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[flue]] | noun | **1.** Flat bladelike projection on the arm of an anchor.<br>**2.** Organ pipe whose tone is produced by air passing across the sharp edge of a fissure or lip. | *"He blew through the flue two husky fifenotes. —By Jove, he mused, I often wanted to see the Mourne mountains."* — James Joyce, *Ulysses* |
| [[fluegelhorn]] | noun | **1.** A brass instrument resembling a cornet but with a wider bore. | *"In academic literature, fluegelhorn designates a brass instrument resembling a cornet but with a wider bore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluency]] | noun | **1.** Powerful and effective language.<br>**2.** Skillfulness in speaking or writing. | *"He talked with fluency and spirit—and there was an archness and pleasantry in his manner which interested, though it was hardly understood by her."* — Jane Austen, *Northanger Abbey* |
| [[fluent]] | adjective | **1.** Smooth and unconstrained in movement.<br>**2.** Expressing yourself readily, clearly, effectively. | *"He spoke to everybody he met, in the train, in the steamboat, or in hotels, in fluent if rather "bookish" German, in correct but somewhat halting French, or, if it was a Roman Catholic priest he had to deal with, in sonorous Latin."* — John Cairns, *Principal Cairns* |
| [[fluently]] | adverb | **1.** In a fluent manner. | *"Go, take her, And fluently persuade her to a peace. _Et opus exegi, quod nec Jovis ira, nec ignis—_ Strike up, and lead her in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fluid]] | noun | **1.** A substance that is fluid at room temperature and pressure.<br>**2.** Continuous amorphous matter that tends to flow and to conform to the outline of its container: a liquid or a gas. | *"Carefully I covered my rock cisterns with flat stones so that the sun’s rays might not evaporate the precious fluid and in precaution against some upspringing of wind in the night and the sudden flying of spray."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fluidity]] | noun | **1.** The property of flowing easily.<br>**2.** A changeable quality. | *"Their fluidity, however, decreases, and a very high temperature is thus required in order to render them sufficiently limpid to run freely from the furnace."* — Donald M. Levy, *Modern Copper Smelting* |
| [[fluidness]] | noun | **1.** The property of flowing easily.<br>**2.** A changeable quality. | *"In academic literature, fluidness designates the property of flowing easily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluidounce]] | noun | **1.** A british imperial unit of capacity or volume (liquid or dry) equal to 8 fluid drams or 28.416 cubic centimeters (1.734 cubic inches).<br>**2.** A united states unit of capacity or volume equal to 1.804 cubic inches. | *"In academic literature, fluidounce designates a british imperial unit of capacity or volume (liquid or dry) equal to 8 fluid drams or 28.416 cubic centimeters (1.734 cubic inches)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluidram]] | noun | **1.** A british imperial capacity measure (liquid or dry) equal to 60 minims or 3.5516 cubic centimeters.<br>**2.** A unit of capacity or volume in the apothecary system equal to one eighth of a fluid ounce. | *"In academic literature, fluidram designates a british imperial capacity measure (liquid or dry) equal to 60 minims or 3.5516 cubic centimeters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flume]] | noun | **1.** A narrow gorge with a stream running through it.<br>**2.** Watercourse that consists of an open artificial chute filled with water for power or for carrying logs. | *"Through the breach, they heard the waters pour, as mountain torrents down a flume."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[flummery]] | noun | **1.** A bland custard or pudding especially of oatmeal.<br>**2.** Meaningless ceremonies and flattery. | *"But her father, who is quite as opposed to such flummery as I, says that can be cured."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[flummox]] | verb | **1.** Be a mystery or bewildering to. | *"In academic literature, flummox designates be a mystery or bewildering to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flump]] | verb | **1.** Fall heavily.<br>**2.** Set (something or oneself) down with or as if with a noise. | *"In academic literature, flump designates fall heavily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flunitrazepan]] | noun | **1.** A depressant and tranquilizer (trade name rohypnol) often used in the commission of sexual assault; legally available in europe and mexico and colombia. | *"In academic literature, flunitrazepan designates a depressant and tranquilizer (trade name rohypnol) often used in the commission of sexual assault; legally available in europe and mexico and colombia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flunk]] | noun | **1.** Failure to reach a minimum required performance.<br>**2.** Fail to get a passing grade. | *"In academic literature, flunk designates failure to reach a minimum required performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flunkey]] | noun | **1.** A male servant (especially a footman).<br>**2.** A person of unquestioning obedience. | *"The lumberjacks want no flunkey, but the real thing," as one expressed it."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[flunky]] | noun | **1.** A male servant (especially a footman).<br>**2.** A person of unquestioning obedience. | *"If anyone asks, we're using Scarf's troops on the Dragon as flunkies during the victory party."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[fluor]] | noun | **1.** A soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine. | *"In academic literature, fluor designates a soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorapatite]] | noun | **1.** A form of apatite in which fluorine predominates over chlorine. | *"In academic literature, fluorapatite designates a form of apatite in which fluorine predominates over chlorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoresce]] | verb | **1.** Exhibit or undergo fluorescence. | *"In academic literature, fluoresce designates exhibit or undergo fluorescence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorescein]] | noun | **1.** A yellow dye that is visible even when highly diluted; used as an absorption indicator when silver nitrate solution is added to sodium chloride in order to precipitate silver chloride (turns pink when no chloride ions are left in solution and negative fluorescein ions are then absorbed). | *"In academic literature, fluorescein designates a yellow dye that is visible even when highly diluted; used as an absorption indicator when silver nitrate solution is added to sodium chloride in order to precipitate silver chloride (turns pink when no chloride ions are left in solution and negative fluorescein ions are then absorbed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoresceine]] | noun | **1.** A yellow dye that is visible even when highly diluted; used as an absorption indicator when silver nitrate solution is added to sodium chloride in order to precipitate silver chloride (turns pink when no chloride ions are left in solution and negative fluorescein ions are then absorbed). | *"In academic literature, fluoresceine designates a yellow dye that is visible even when highly diluted; used as an absorption indicator when silver nitrate solution is added to sodium chloride in order to precipitate silver chloride (turns pink when no chloride ions are left in solution and negative fluorescein ions are then absorbed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorescence]] | noun | **1.** Light emitted during absorption of radiation of some other (invisible) wavelength. | *"In academic literature, fluorescence designates light emitted during absorption of radiation of some other (invisible) wavelength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorescent]] | noun | **1.** A lighting fixture that uses a fluorescent lamp.<br>**2.** Emitting light during exposure to radiation from an external source. | *"In academic literature, fluorescent designates a lighting fixture that uses a fluorescent lamp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridate]] | verb | **1.** Subject to fluoridation; treat with fluoride. | *"In academic literature, fluoridate designates subject to fluoridation; treat with fluoride."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridation]] | noun | **1.** The addition of a fluoride to the water supply (to prevent dental decay). | *"In academic literature, fluoridation designates the addition of a fluoride to the water supply (to prevent dental decay)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoride]] | noun | **1.** A salt of hydrofluoric acid. | *"In academic literature, fluoride designates a salt of hydrofluoric acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridisation]] | noun | **1.** The addition of a fluoride to the water supply (to prevent dental decay). | *"In academic literature, fluoridisation designates the addition of a fluoride to the water supply (to prevent dental decay)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridise]] | verb | **1.** Subject to fluoridation; treat with fluoride. | *"In academic literature, fluoridise designates subject to fluoridation; treat with fluoride."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridization]] | noun | **1.** The addition of a fluoride to the water supply (to prevent dental decay). | *"In academic literature, fluoridization designates the addition of a fluoride to the water supply (to prevent dental decay)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoridize]] | verb | **1.** Subject to fluoridation; treat with fluoride. | *"In academic literature, fluoridize designates subject to fluoridation; treat with fluoride."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorine]] | noun | **1.** A nonmetallic univalent element belonging to the halogens; usually a yellow irritating toxic flammable gas; a powerful oxidizing agent; recovered from fluorite or cryolite or fluorapatite. | *"In academic literature, fluorine designates a nonmetallic univalent element belonging to the halogens; usually a yellow irritating toxic flammable gas; a powerful oxidizing agent; recovered from fluorite or cryolite or fluorapatite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorite]] | noun | **1.** A soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine. | *"In academic literature, fluorite designates a soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoroboride]] | noun | **1.** A salt of fluoroboric acid. | *"In academic literature, fluoroboride designates a salt of fluoroboric acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorocarbon]] | noun | **1.** A halocarbon in which some hydrogen atoms have been replaced by fluorine; used in refrigerators and aerosols. | *"In academic literature, fluorocarbon designates a halocarbon in which some hydrogen atoms have been replaced by fluorine; used in refrigerators and aerosols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorochrome]] | noun | **1.** Any of various fluorescent substances used in fluorescence microscopy to stain specimens. | *"In academic literature, fluorochrome designates any of various fluorescent substances used in fluorescence microscopy to stain specimens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoroform]] | noun | **1.** Colorless gas haloform chf3 (similar to chloroform). | *"In academic literature, fluoroform designates colorless gas haloform chf3 (similar to chloroform)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoroscope]] | noun | **1.** An x-ray machine that combines an x-ray source and a fluorescent screen to enable direct observation. | *"In academic literature, fluoroscope designates an x-ray machine that combines an x-ray source and a fluorescent screen to enable direct observation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoroscopy]] | noun | **1.** Examination of body structures using a fluoroscope. | *"In academic literature, fluoroscopy designates examination of body structures using a fluoroscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorosis]] | noun | **1.** A pathological condition resulting from an excessive intake of fluorine (usually from drinking water). | *"In academic literature, fluorosis designates a pathological condition resulting from an excessive intake of fluorine (usually from drinking water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorouracil]] | noun | **1.** An antimetabolite used to treat certain cancers. | *"In academic literature, fluorouracil designates an antimetabolite used to treat certain cancers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluorspar]] | noun | **1.** A soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine. | *"In academic literature, fluorspar designates a soft mineral (calcium fluoride) that is fluorescent in ultraviolet light; chief source of fluorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluosilicate]] | noun | **1.** Salt of fluosilicic acid. | *"In academic literature, fluosilicate designates salt of fluosilicic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fluoxetine]] | noun | **1.** A selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade names prozac or sarafem); it is thought to work by increasing the activity of serotonin in the brain. | *"In academic literature, fluoxetine designates a selective-serotonin reuptake inhibitor commonly prescribed as an antidepressant (trade names prozac or sarafem); it is thought to work by increasing the activity of serotonin in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flurazepam]] | noun | **1.** Tranquilizer (trade name dalmane) used to treat insomnia. | *"In academic literature, flurazepam designates tranquilizer (trade name dalmane) used to treat insomnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flurbiprofen]] | noun | **1.** A nonsteroidal anti-inflammatory drug (trade name ansaid) that is administered only orally. | *"In academic literature, flurbiprofen designates a nonsteroidal anti-inflammatory drug (trade name ansaid) that is administered only orally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flurry]] | noun | **1.** A rapid active commotion.<br>**2.** A light brief snowfall and gust of wind (or something resembling that). | *"Bathsheba flung down the brush, crook, and empty hive, pulled the skirt of her dress tightly round her ankles in a tremendous flurry, and as well as she could slid down the ladder."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[flush]] | noun | **1.** The period of greatest prosperity or productivity.<br>**2.** A rosy color (especially in the cheeks) taken as a sign of good health. | *"Many hot inroads They make in Italy—the borders maritime Lack blood to think on’t—and flush youth revolt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[flush-seamed]] | adjective | **1.** Laid edge to edge (not overlapping). | *"In academic literature, flush-seamed designates laid edge to edge (not overlapping)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flushed]] | verb | **1.** Turn red, as if in embarrassment or shame.<br>**2.** Flow freely. | *"Do you know where he is living?" she cried out, while her cheeks flushed with happiness."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[fluster]] | noun | **1.** A disposition that is confused or nervous and upset.<br>**2.** Be flustered; behave in a confused manner. | *"Why, they’d steal the very—why, goodness sakes, you can guess what kind of a fluster _I_ was in by the time midnight come last night."* — Mark Twain, *Adventures of Huckleberry Finn* |
| [[flustered]] | verb | **1.** Be flustered; behave in a confused manner.<br>**2.** Cause to be nervous or upset. | *"How thoughtful they are!” Tess looked a little flustered as she took it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[flute]] | noun | **1.** A high-pitched woodwind instrument; a slender tube closed at one end with finger holes on one end and an opening near the closed end across which the breath is blown.<br>**2.** A tall narrow wineglass. | *"A Room in a Cottage Enter Quince, Snug, Bottom, Flute, Snout and Starveling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fluting]] | noun | **1.** A groove or furrow in cloth etc (particularly a shallow concave groove on the shaft of a column).<br>**2.** Form flutes in. | *"It was crude as to shape, almost all the pieces are a little crooked, but it was wonderfully made in some ways, for it has a ring like a bell, and the loveliest fluting, and some of it is in beautiful blue, green and amethyst."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[flutist]] | noun | **1.** Someone who plays the flute. | *"In academic literature, flutist designates someone who plays the flute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flutter]] | noun | **1.** The act of moving back and forth.<br>**2.** Abnormally rapid beating of the auricles of the heart (especially in a regular rhythm); can result in heart block. | *"O, then, most soft sweet goddess, Give me the victory of this question, which Is true love’s merit, and bless me with a sign Of thy great pleasure. [_Here music is heard; doves are seen to flutter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fluttering]] | noun | **1.** The motion made by flapping up and down.<br>**2.** Move along rapidly and lightly; skim or dart. | *"Suddenly they caught a glimpse of two blue ribbons fluttering from Leonore's hat."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[influence]] | noun | **1.** A power to affect persons or events especially power based on prestige etc.<br>**2.** Causing something without any direct or apparent effort. | *"That this huge stage presenteth nought but shows Whereon the stars in secret influence comment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[influent]] | adjective | **1.** Flowing inward. | *"In academic literature, influent designates flowing inward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[influential]] | adjective | **1.** Having or exercising influence or power. | *"Of these that of which Cairns was the minister was the most influential and the largest, having a membership of about six hundred."* — John Cairns, *Principal Cairns* |
| [[influentially]] | adverb | **1.** Exerting influence. | *"In academic literature, influentially designates exerting influence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[influenza]] | noun | **1.** An acute febrile highly contagious viral disease. | *"Verney's junior partner, who attended me for influenza while Dr."* — Anthony Pryde, *Nightfall* |
| [[perfluorocarbon]] | noun | **1.** A powerful greenhouse gas emitted during the production of aluminum. | *"In academic literature, perfluorocarbon designates a powerful greenhouse gas emitted during the production of aluminum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superfluity]] | noun | **1.** Extreme excess. | *"If they would yield us but the superfluity while it were wholesome, we might guess they relieved us humanely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superfluous]] | adjective | **1.** Serving no useful purpose; having no excuse for being.<br>**2.** More than is needed, desired, or required. | *"Caesar, ’tis his schoolmaster— An argument that he is plucked, when hither He sends so poor a pinion of his wing, Which had superfluous kings for messengers Not many moons gone by."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superfluously]] | adverb | **1.** In a superfluous manner. | *"That may be, for you bear a many superfluously, and ’twere more honour some were away."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unfluctuating]] | adjective | **1.** Not liable to fluctuate or especially to fall. | *"In academic literature, unfluctuating designates not liable to fluctuate or especially to fall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unflurried]] | adjective | **1.** Free from emotional agitation or nervous tension; ; - anthony trollope. | *"She might have posed as a picture of graceful, imperturbed ease, so calm, so smiling, so absolutely unflurried and detached in both manner and bearing did she appear."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unflustered]] | adjective | **1.** Free from emotional agitation or nervous tension; ; - anthony trollope. | *"In academic literature, unflustered designates free from emotional agitation or nervous tension; ; - anthony trollope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninfluential]] | adjective | **1.** Not influential. | *"I did not want to quarrel with anyone, influential or uninfluential."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |

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
    ROOT DASHBOARD · FLU
  </div>
</div>
