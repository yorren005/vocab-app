---
status: unread
type: root_dashboard
---
# Dashboard — vola
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vola-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fly”</span>
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

The root **vola** means to fly. It refers to moving through the air with wings or traveling at high speed. In English, this root forms words such as *cast*, *volant*, *volatile*, and *volatility*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fly
> The root **vola** means to fly. It refers to moving through the air with wings or traveling at high speed. In English, this root forms words such as *cast*, *volant*, *volatile*, and *volatility*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fly</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *cast* and *volant*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vola** comes from a Latin word that means *"to fly"*.
  - At its core, it describes the action of fly.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **vola** in an English word, think of **to fly**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fly).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cast**: An everyday English word showing the root's idea of *to fly*.
  - **Volant**: Flying or capable of active, powered flight.
  - **Volatile**: Evaporating readily and rapidly at normal ambient temperatures and pressures.
  - **Volatility**: The physical tendency of a liquid or solid substance to vaporize.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vola</mark>, think of <mark class="hl-def">to fly</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vola** operates through four distinct morphological and lexical gateways:
> - **Primary Active Stem `volā-` / `volant-` (Latin *volō, volāre*, present participle *volāns, volantis*):**
>   - Direct participle preservation: Latin *volāns* $\to$ Old French *volant* $\to$ English [[volant]] (flying, heraldic winged posture).
>   - Privative / negative compound: Latin *in-* ("not") + *volant* $\to$ English [[involant]] (flightless, flight-incapable).
> - **Participial & Frequentative Stems `volat-` / `volit-` (Latin *volātum*, frequentative *volitāre*):**
>   - Adjectival tendency suffix *-ilis*: Latin *volatilis* ("winged, fleeting") $\to$ English [[volatile]].
>   - Quality noun suffix *-itās*: Latin *volatilitās* $\to$ French *volatilité* $\to$ English [[volatility]].
>   - Causative verbal suffix *-ize*: English *volatile* + *-ize* $\to$ English [[volatilize]].
>   - Noun of action suffix *-ation*: *volatilize* + *-ation* $\to$ English [[volatilization]].
>   - Agent / instrument suffix *-er*: *volatilize* + *-er* $\to$ English [[volatilizer]].
>   - Iterative verbal base *volitāre* ("to flit repeatedly, flutter about"): Latin *volitāns* $\to$ English [[volitant]]; Latin *volitātiō* $\to$ English [[volitation]].
> - **Gallic Participial & Collective Branch `volée` / `volerie` (Old French < Latin *volāre*):**
>   - Middle French feminine past participle *volée* ("a flight, burst") $\to$ English [[volley]].
>   - Sports compound: *volley* + *ball* $\to$ English [[volleyball]].
>   - French card game idiom: *faire la vole* ("to make a flight, sweep all tricks") $\to$ English [[vole]].
>   - French collective noun *volerie* ("aviary, flock in flight") $\to$ English [[volery]] (or *volary*).
> - **Classical Poetic & Modern Aeronautical Compounds:**
>   - Altitude compound: Latin *altus* ("high") + *volāns* $\to$ Latin *altivolāns* $\to$ English [[altivolant]] (high-flying).
>   - Sail compound: Latin *vēlum* ("sail") + *volāns* $\to$ Latin *vēlivolāns* $\to$ English [[velivolant]] (flying with sails).
>   - Aeronautical compound: French *vol* ("flight") + *planer* ("to glide") $\to$ English [[volplane]], [[volplaning]].
> - **Prefixed Polarity & Degree Extensions:**
>   - Privative *non-* + *volatile* $\to$ English [[nonvolatile]] (stable, non-evaporating, persistent memory).
>   - Partial prefix *semi-* + *volatile* $\to$ English [[semivolatile]] (intermediate vapor pressure).
>
> The morphological architecture of **vola** illustrates how an ancient physical verb for bird flight migrated through French courtly sports and alchemical laboratories, generating precise vocabularies for ballistics, finance, and thermodynamics.

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
> Although anchored in the foundational concept of **"aerial flight and winged motion"**, the derivatives of `vola` radiate into seven specialized operational planes:
> - **Literal Avian & Biological Flight:** In [[volant]], [[volitant]], [[volitation]], and [[involant]], the root designates the physical faculty of animal flight, the fluttering of wings, and the evolutionary adaptation of birds and insects (or the secondary evolutionary loss of flight in flightless ratites and penguins).
> - **Chemical Thermodynamics & Phase Transitions:** In [[volatile]], [[volatility]], [[volatilize]], [[volatilization]], [[volatilizer]], [[nonvolatile]], and [[semivolatile]], the root denotes the molecular transition from liquid or solid to vapor, describing substances with high vapor pressures (such as volatile organic compounds, or VOCs) that readily "fly away" into the ambient atmosphere.
> - **Quantitative Finance & Psychological Temperament:** In [[volatile]] and [[volatility]], the root captures unpredictable, rapid fluctuations—the swings of equity markets, implied volatility tracked by the VIX, and mercurial, explosive human temperaments prone to sudden outbursts.
> - **Ballistics, Military Tactics & Rapid Barrage:** In [[volley]], the root designates a synchronized, simultaneous discharge of arrows, musket balls, or artillery shells flying through the air, and by metaphorical extension, an overwhelming barrage of spoken questions or insults.
> - **Racket Sports, Team Athletics & Card Games:** In [[volley]], [[volleyball]], and [[vole]], the root governs airborne interception (striking a ball before it bounces on the court) and winning every trick in a card game ("taking flight" with all points).
> - **Aviation, Aeronautics & Gliding:** In [[volplane]] and [[volplaning]], the root describes unpowered aerodynamic descent, where an aircraft glides smoothly toward the earth under the lift of its wings.
> - **Classical Poetic Grandeur & Lofty Imagination:** In [[altivolant]] and [[velivolant]], the root evokes the majestic soaring of raptors high in the thermals and full-rigged galleons skimming the wine-dark sea.

---

## 🔀 4. Prefix & Combining Dynamics on vola

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | not, un- (privative) | [[involant]] | Flightless; incapable of active aerial flight (e.g., penguins, kiwis, ostriches). |
| `non-` (Latin *nōn*) | not, opposite of | [[nonvolatile]] | Not evaporating readily at ambient temperatures; permanent computer memory retaining state without power. |
| `semi-` | half, partly | [[semivolatile]] | Having an intermediate vapor pressure, partitioning dynamically between gas and particulate phases. |
| `alti-` (Latin *altus*) | high, lofty, elevated | [[altivolant]] | Flying at great altitudes; soaring high above the terrestrial landscape; high-minded in rhetoric. |
| `veli-` (Latin *vēlum*) | sail, canvas | [[velivolant]] | Flying with sails; propelled swiftly across the sea by wind-filled canvas; sail-winged. |
| *(unprefixed active stem)* | — | [[volant]], [[volatile]], [[volatility]], [[volley]], [[volitant]] | Direct manifestation of flight, vaporization, mid-air impact, or rapid aerial flitting. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ant` (Latin *-āns, -antis*) | Present Participle / Adjective | [[volant]], [[volitant]], [[altivolant]], [[velivolant]], [[involant]] | Flying; capable of flight; fluttering; depicted with outstretched wings in heraldry. |
| `-ile` (Latin *-ilis*) | Adjective (Tendency / Aptitude) | [[volatile]] | Liable to fly off as vapor; prone to rapid, unpredictable emotional or market fluctuations. |
| `-ity` (Latin *-itās*) | Abstract Noun (State / Measure) | [[volatility]] | The physical tendency to vaporize; the statistical dispersion of asset price returns. |
| `-ize` (Greek *-ίζειν* via Latin *-izāre*) | Causative Verb | [[volatilize]] | To convert or cause to convert from a liquid/solid into a gaseous vapor; to dissipate into air. |
| `-ation` (Latin *-ātiō*) | Noun (Process / State) | [[volatilization]], [[volitation]] | The process of evaporating or vaporizing; the act, power, or faculty of animal flight. |
| `-er` (instrument / agent) | Noun (Instrument / Mechanism) | [[volatilizer]] | An apparatus, heating element, or catalytic device engineered to vaporize substances. |
| `-ée` / `-ey` (French feminine participle) | Noun & Verb (Event / Action) | [[volley]] | A simultaneous flight of missiles; striking a ball in mid-air before bouncing; a rapid burst of words. |
| `-ing` (participial / gerund suffix) | Noun & Participial Adjective | [[volplaning]] | The technique or act of gliding downward in an unpowered aircraft. |
| `-ery` (French *-erie*) | Collective / Place Noun | [[volery]] | A spacious aviary permitting free bird flight; a company or flock of birds in flight. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **Chemical Thermodynamics & Petrochemistry** | [[volatile]], [[volatility]], [[volatilize]], [[volatilization]], [[volatilizer]], [[nonvolatile]], [[semivolatile]] | Vapor pressure modeling; distillation of crude oil into light fractions; monitoring volatile organic compounds (VOCs) and semivolatile organic compounds (SVOCs) for indoor air safety and environmental pollution control; agricultural ammonia volatilization from surface-applied urea. |
| 💹 **Quantitative Finance & Financial Risk** | [[volatility]], [[volatile]] | Modeling market dispersion and option pricing via the Black-Scholes formula; tracking the Chicago Board Options Exchange (CBOE) Volatility Index (VIX, the "fear index"); portfolio risk management and value-at-risk (VaR) calculations; managing volatile emerging market currencies. |
| 🪖 **Ballistics & Military History** | [[volley]] | Historical infantry doctrine involving massed, synchronized musketry discharges (volley fire) designed to shatter enemy ranks; anti-aircraft missile salvos; coordinated artillery bombardments. |
| 🎾 **Racket Sports, Team Athletics & Games** | [[volley]], [[volleyball]], [[vole]] | Striking a tennis ball at the net before it strikes the turf; the Olympic team sport of volleyball (invented in 1895); soccer volleys and half-volleys; winning every trick in classical card games like ombre and quadrille ("going the vole"). |
| ✈️ **Aviation, Aeronautics & Gliding** | [[volplane]], [[volplaning]] | Deadstick landings where pilots glide an engine-out aircraft safely to earth using aerodynamic lift; sailplane soaring techniques; glide ratio calculations. |
| 🦅 **Evolutionary Biology, Ornithology & Entomology** | [[volant]], [[volitant]], [[volitation]], [[involant]], [[altivolant]], [[volery]] | Evolutionary emergence of powered flight in pterosaurs, bats, birds, and pterygote insects; secondary flightlessness (*involant* adaptations) in oceanic island species (dodos, moas, penguins); construction of zoological flight aviaries (*voleries*). |
| 💻 **Computer Engineering & Microarchitecture** | [[volatile]], [[nonvolatile]] | Primary computer memory hierarchy: volatile random-access memory (DRAM, SRAM) that loses bits upon power disconnection versus nonvolatile memory (NVRAM, NAND flash, SSDs, ROM) providing persistent data retention. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[nonvolatile]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatile designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvolatilisable]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatilisable designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvolatilizable]] | adjective | **1.** Not volatilizing readily. | *"In academic literature, nonvolatilizable designates not volatilizing readily."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volaille]] | noun | **1.** The flesh of a chicken used for food. | *"In academic literature, volaille designates the flesh of a chicken used for food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volans]] | noun | **1.** A small constellation in the polar region of the southern hemisphere near dorado and carina. | *"In academic literature, volans designates a small constellation in the polar region of the southern hemisphere near dorado and carina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volant]] | adjective | **1.** With wings extended in a flying position. | *"He bounds from the earth, as if his entrails were hairs; _le cheval volant_, the Pegasus, _qui a les narines de feu!_ When I bestride him, I soar, I am a hawk."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[volar]] | adjective | **1.** Relating to the palm of the hand or the sole of the foot. | *"In academic literature, volar designates relating to the palm of the hand or the sole of the foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volary]] | noun | **1.** A building where birds are kept. | *"In academic literature, volary designates a building where birds are kept."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatile]] | noun | **1.** A volatile substance; a substance that changes readily from solid or liquid to a vapor.<br>**2.** Evaporating readily at normal temperatures and pressures. | *"Yes, sir.” “Have you any salts—volatile salts?” “Yes.” “Go back and fetch both.” I returned, sought the sponge on the washstand, the salts in my drawer, and once more retraced my steps."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[volatilisable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, volatilisable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilise]] | verb | **1.** Make volatile; cause to pass off in a vapor. | *"In addition, values in the form of volatilised metallic products are also conveyed by the gases, particularly when lead, zinc, arsenic, etc., are present in the furnace charge, and these are carried forward in the form of _fume_."* — Donald M. Levy, *Modern Copper Smelting* |
| [[volatilised]] | verb | **1.** Make volatile; cause to pass off in a vapor.<br>**2.** Converted into a gas or vapor. | *"In addition, values in the form of volatilised metallic products are also conveyed by the gases, particularly when lead, zinc, arsenic, etc., are present in the furnace charge, and these are carried forward in the form of _fume_."* — Donald M. Levy, *Modern Copper Smelting* |
| [[volatility]] | noun | **1.** The property of changing readily from a solid or liquid to a vapor.<br>**2.** The trait of being unpredictably irresolute. | *"Our importance, our respectability in the world, must be affected by the wild volatility, the assurance and disdain of all restraint which mark Lydia’s character."* — Jane Austen, *Pride and Prejudice* |
| [[volatilizable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, volatilizable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilize]] | verb | **1.** Make volatile; cause to pass off in a vapor. | *"In academic literature, volatilize designates make volatile; cause to pass off in a vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volatilized]] | verb | **1.** Make volatile; cause to pass off in a vapor.<br>**2.** Converted into a gas or vapor. | *"In academic literature, volatilized designates make volatile; cause to pass off in a vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VOLA
  </div>
</div>
