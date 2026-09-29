---
status: unread
type: root_dashboard
---
# Dashboard — fug
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fug-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to flee”</span>
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

The root **fug** means to flee. It refers to the action of fleing and carrying out this process. In English, this root forms words such as *fugitive*, *refuge*, *refugee*, and *subterfuge*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to flee
> The root **fug** means to flee. It refers to the action of fleing and carrying out this process. In English, this root forms words such as *fugitive*, *refuge*, *refugee*, and *subterfuge*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To flee</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *fugitive* and *refuge*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fug** comes from a Latin word that means *"to flee"*.
  - At its core, it describes the action of flee.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **fug** in an English word, think of **to flee**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to flee).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Fugitive**: A person who flees from custody, persecution, or legal justice.
  - **Refuge**: Shelter or protection from danger, distress, calamity, or pursuit.
  - **Refugee**: A person forced to flee their home country to escape war, persecution, violence, or catastrophe.
  - **Subterfuge**: A deceptive stratagem, ruse, or artifice employed to conceal an underlying motive, evade a difficult situation, or avoid an obligation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fug</mark>, think of <mark class="hl-def">to flee</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **fug** exhibits four principal morphological mechanisms in English word generation:
> - **The Verbal Base Stem `fug-` / `fugi-`:** Preserved from Latin *fugiō* and *fugere*, producing direct adjectives and nouns of flight: *fug-itive*, *re-fug-e*, *re-fug-ium*, *tempus fug-it*.
> - **The Frequentative / Combining Suffix `-fuge`:** From Latin active/transitive *-fugus* and *fugāre* ("to put to flight, expel"). In English, it functions as an autonomous suffix denoting "a substance or machine that expels, repels, or flees from": *centri-fuge*, *febri-fuge*, *vermi-fuge*, *calci-fuge*, *aqui-fuge*, *lacti-fuge*, *taeni-fuge*, *insecti-fuge*.
> - **The Adjectival Base `fugāx` (Stem `fugac-`):** From Latin *fugāx* ("inclined to flee, swift, evanescent"), yielding the elevated literary family *fugac-ious*, *fugac-iously*, *fugac-iousness*, and the thermodynamic property *fugac-ity*.
> - **The Italian Musical Reflex `fuga`:** From Italian *fuga* ("flight, chase", directly from Latin *fuga*). In polyphonic counterpoint, one melodic voice introduces a theme and "flees," pursued by successive imitating voices entering in turn, producing *fugue*, *fugato*, and *fuguist*.
>
> English compounds this root through directional prefixes (*re-*, *subter-*), noun prefixes (*centri-*, *febri-*, *vermi-*, *luci-*, *nidi-*, *calci-*, *aqui-*), and structural suffixes (*-ive*, *-ee*, *-ium*, *-al*, *-ation*, *-ous*, *-ity*, *-ist*).

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
> Although the root fundamentally denotes **"to flee, escape, or shun"**, its semantic realization branches across eight distinct conceptual domains:
> - **Criminological, Legal & Penal Flight:** In [[fugitive]], [[fugitively]], [[fugitiveness]], and [[fugitation]], it signifies an individual actively fleeing arrest, custody, or judicial sentencing.
> - **Sanctuary, Asylum & Geopolitical Protection:** In [[refuge]], [[refugee]], [[refugeeism]], [[refugium]], and [[refugial]], the motion of fleeing is reversed into its protective terminus—the physical or geopolitical haven where pursuit stops.
> - **Stealth, Deception & Evasive Artifice:** In [[subterfuge]], the flight is covert and intellectual—slipping "underneath" (*subter-*) scrutiny or moral obligation through misdirection and cunning excuses.
> - **Rotational Physics & Mechanical Separation:** In [[centrifuge]], [[centrifugal]], [[centrifugally]], [[centrifugation]], [[ultracentrifuge]], and [[ultracentrifugation]], it describes physical matter accelerated radially outward away from a rotational axis.
> - **Pharmacological & Medical Expulsion:** In [[febrifuge]], [[vermifuge]], [[taenifuge]], [[lactifuge]], and [[insectifuge]], it acts as an active expeller—driving fevers, intestinal parasites, lactation, or insects away from the human host.
> - **Ecological, Ethological & Geological Aversion:** In [[lucifugous]] (fleeing light), [[nidifugous]] (fleeing the nest upon hatching), [[calcifuge]] (shunning lime-rich soil), and [[aquifuge]] (repelling groundwater), it reflects biological adaptation through spatial avoidance.
> - **Polyphonic Counterpoint & Psychiatric Dissociation:** In musical [[fugue]], [[fugato]], and [[fuguist]], voices flee and chase one another in intricate counterpoint; in psychiatric [[fugue]], the patient physically flees their identity during severe dissociative amnesia.
> - **Existential Ephemerality & Molecular Escape:** In [[fugacious]], [[fugaciously]], [[fugaciousness]], [[fugacity]], and the Latin maxim [[tempus fugit]], it describes the relentless flight of time, the fleeting evanescence of beauty, and the escaping tendency of gas molecules from liquid solutions.

---

## 🔀 4. Prefix & Combining Dynamics on fug

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Combining Element | Etymological Source | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | Latin *re-* ("back, away, again") | [[refuge]] / [[refugium]] / [[refugee]] | "To flee back" to a secure stronghold $\to$ a place of safety, sanctuary, or an individual seeking asylum. |
| `subter-` | Latin *subter* ("beneath, secretly") | [[subterfuge]] | "To flee secretly underneath" $\to$ a deceptive trick or evasion used to escape scrutiny or obligation. |
| `centri-` | Latin *centrum* ("center of circle") | [[centrifugal]] / [[centrifuge]] | "Fleeing the center" $\to$ acting outward from an axis of rotation; a machine separating mixtures by spin. |
| `febri-` | Latin *febris* ("fever") | [[febrifuge]] | "Driving fever away" $\to$ an antipyretic medication that reduces elevated body temperature. |
| `vermi-` | Latin *vermis* ("worm") | [[vermifuge]] | "Driving worms away" $\to$ an anthelmintic agent that expels parasitic worms from the digestive tract. |
| `luci-` | Latin *lux, lūcis* ("light") | [[lucifugous]] | "Fleeing the light" $\to$ shunning sunlight or artificial illumination; active only in darkness. |
| `nidi-` | Latin *nīdus* ("nest") | [[nidifugous]] | "Fleeing the nest" $\to$ leaving the nest immediately after hatching, fully mobile and self-feeding. |
| `calci-` | Latin *calx, calcis* ("lime, chalk") | [[calcifuge]] | "Fleeing lime" $\to$ a plant incapable of growing in alkaline, calcareous soils. |
| `aqui-` | Latin *aqua* ("water") | [[aquifuge]] | "Repelling water" $\to$ an impermeable rock stratum that neither absorbs nor transmits groundwater. |
| `ultra-` + `centri-` | Latin *ultra* ("beyond") + *centrum* | [[ultracentrifuge]] | "Beyond the center-fleeing machine" $\to$ an ultra-high-speed centrifuge generating hundreds of thousands of *g*. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-itive` | Adjective / Agent Noun | [[fugitive]] | One who is fleeing; characterized by flight, evasion, or transience. |
| `-acious` | Adjective of Disposition | [[fugacious]] | Prone to fleeing; characterized by extreme fleetingness, transience, or evanescence. |
| `-acity` | Abstract Noun of Quality / State | [[fugacity]] | The quality of fleeing quickly; *(Physics)* the measure of a gas's escaping tendency. |
| `-ee` | Noun of Personal Recipient | [[refugee]] | One who has fled to safety; a person seeking sanctuary from war or persecution. |
| `-ium` | Noun of Place / Enclosure | [[refugium]] | A physical site or isolated ecological zone serving as a safe retreat from extinction. |
| `-al` | Descriptive Adjective | [[centrifugal]], [[refugial]] | Pertaining to outward radial flight; relating to an ecological sanctuary. |
| `-ation` | Noun of Action / Process | [[centrifugation]], [[fugitation]] | The process of separating substances by spinning; *(Law)* the act of fleeing from justice. |
| `-ist` | Noun of Specialist / Agent | [[fuguist]] | A composer or performer who specializes in the construction of musical fugues. |
| `-ous` | Descriptive Adjective | [[lucifugous]], [[nidifugous]] | Characterized by a habitual biological tendency to flee light or leave the nest. |
| `-fuge` | Combining Noun / Agent | [[febrifuge]], [[vermifuge]], [[centrifuge]] | An agent, mechanism, or remedy that drives away or flees from a specific condition. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law, Criminology & Human Rights** | [[fugitive]], [[refugee]], [[refugeeism]], [[fugitation]] | Extradition treaties for criminal fugitives, the 1951 Geneva Refugee Convention, Scots court decrees of outlawry. |
| ⚛️ **Physics, Biochemistry & Laboratory Medicine** | [[centrifuge]], [[centrifugal]], [[centrifugation]], [[ultracentrifuge]], [[fugacity]] | Blood plasma fractionation, uranium isotope gas centrifuges, thermodynamic escaping tendencies of gases. |
| 💊 **Pharmacology & Parasitology** | [[febrifuge]], [[vermifuge]], [[taenifuge]], [[lactifuge]] | Antipyretic fever management, anthelmintic treatments for pinworms and tapeworms, lactation suppression. |
| 🌿 **Botany, Zoology & Hydrogeology** | [[calcifuge]], [[lucifugous]], [[nidifugous]], [[refugium]], [[aquifuge]] | Acid-loving ericaceous flora, photophobic cavernicolous fauna, precocial avian fledglings, impermeable rock formations. |
| 🎼 **Musicology & Western Classical Composition** | [[fugue]], [[fugato]], [[fuguist]] | Polyphonic counterpoint in Bach's *The Art of Fugue*, symphonic fugato passages in Beethoven, organ improvisation. |
| 🧠 **Psychiatry & Clinical Neurology** | [[fugue]] (*dissociative fugue*) | Acute psychological trauma inducing sudden travel away from home accompanied by complete retrograde amnesia of identity. |
| 📖 **Philosophy, Literature & Rhetoric** | [[tempus fugit]], [[fugacious]], [[subterfuge]] | Virgil's classical meditation on fleeting mortal time, rhetorical stratagems to evade debate accountability. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[centrifugal]] | adjective | **1.** Tending to move away from a center.<br>**2.** Tending away from centralization, as of authority. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centrifugate]] | verb | **1.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifugate designates rotate at very high speed in order to separate the liquids from the solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifugation]] | noun | **1.** The process of separating substances of different densities by the use of a centrifuge. | *"In academic literature, centrifugation designates the process of separating substances of different densities by the use of a centrifuge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifuge]] | noun | **1.** An apparatus that uses centrifugal force to separate particles from a suspension.<br>**2.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifuge designates an apparatus that uses centrifugal force to separate particles from a suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[febrifuge]] | noun | **1.** Any medicine that lowers body temperature to prevent or alleviate fever. | *"In academic literature, febrifuge designates any medicine that lowers body temperature to prevent or alleviate fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fug]] | noun | **1.** (british informal) an airless smoky smelly atmosphere. | *"In academic literature, fug designates (british informal) an airless smoky smelly atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugacious]] | adjective | **1.** Lasting a very short time. | *"It only occurs on the under surface of the leaves: the mycelium is very web-like and fugacious, the conceptacles minute, globose, and scattered (fig. 243)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[fugaciousness]] | noun | **1.** The lack of enduring qualities (used chiefly of plant parts). | *"In academic literature, fugaciousness designates the lack of enduring qualities (used chiefly of plant parts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugacity]] | noun | **1.** The tendency of a gas to expand or escape.<br>**2.** The lack of enduring qualities (used chiefly of plant parts). | *"In academic literature, fugacity designates the tendency of a gas to expand or escape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugal]] | adjective | **1.** Of or relating to or in the style of a musical fugue. | *"In academic literature, fugal designates of or relating to or in the style of a musical fugue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugally]] | adverb | **1.** In a fugal style. | *"In academic literature, fugally designates in a fugal style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugard]] | noun | **1.** South african playwright whose plays feature the racial tensions in south africa during apartheid (born in 1932). | *"In academic literature, fugard designates south african playwright whose plays feature the racial tensions in south africa during apartheid (born in 1932)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fuggy]] | adjective | **1.** (british informal) poorly ventilated. | *"In academic literature, fuggy designates (british informal) poorly ventilated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugitive]] | noun | **1.** Someone who flees from an uncongenial situation.<br>**2.** Someone who is sought by law officers; someone trying to elude justice. | *"Noble Ventidius, Whilst yet with Parthian blood thy sword is warm, The fugitive Parthians follow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fugleman]] | noun | **1.** A leader and organizer and spokesman (especially a political leader). | *"In academic literature, fugleman designates a leader and organizer and spokesman (especially a political leader)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugly]] | adjective | **1.** (slang) extremely ugly. | *"In academic literature, fugly designates (slang) extremely ugly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugo]] | noun | **1.** A bomb carried by a balloon. | *"In academic literature, fugo designates a bomb carried by a balloon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugu]] | noun | **1.** A blowfish highly prized as a delicacy in japan but highly dangerous because the skin and organs are poisonous. | *"In academic literature, fugu designates a blowfish highly prized as a delicacy in japan but highly dangerous because the skin and organs are poisonous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fugue]] | noun | **1.** Dissociative disorder in which a person forgets who they are and leaves home to creates a new life; during the fugue there is no memory of the former life; after recovering there is no memory for events during the dissociative state.<br>**2.** A dreamlike state of altered consciousness that may last for hours or days. | *"And what was played was a fugue—though Pétya had not the least conception of what a fugue is."* — graf Leo Tolstoy, *War and Peace* |
| [[refuge]] | noun | **1.** A safe place.<br>**2.** Something or someone turned to for assistance or security. | *"Their latest refuge Was to send him, for whose old love I have— Though I showed sourly to him—once more offered The first conditions, which they did refuse And cannot now accept, to grace him only That thought he could do more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[refugee]] | noun | **1.** An exile who flees for safety. | *"Louis Refugee and Freedmen's Home--Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[refugium]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fug within the domain of Motion.<br>**2.** A technical or specialized form exhibiting the properties of fug in systematic terminology. | *"In academic literature, refugium designates pertaining to, derived from, or characteristic of latin fug within the domain of motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subterfuge]] | noun | **1.** Something intended to misrepresent the true nature of an activity. | *"I only want to love you.” “But why?” Driven to subterfuge, she stammered— “Your father is a parson, and your mother wouldn’ like you to marry such as me."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ultracentrifugation]] | noun | **1.** Centrifugation at very high speeds. | *"In academic literature, ultracentrifugation designates centrifugation at very high speeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultracentrifuge]] | noun | **1.** A high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins.<br>**2.** Subject to the action of an ultracentrifuge. | *"In academic literature, ultracentrifuge designates a high speed centrifuge used to determine the relative molecular masses of large molecules in high polymers and proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · FUG
  </div>
</div>
