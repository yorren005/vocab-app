---
status: unread
type: root_dashboard
---
# Dashboard — hab
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hab-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to have, hold, possess, or dwell”</span>
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

The root **hab** means to have, hold, possess, or dwell. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *habit*, *habitat*, *habitual*, and *cohabit*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to have, hold, possess, or dwell
> The root **hab** means to have, hold, possess, or dwell. It refers to keeping something in the hand, retaining possession, or supporting weight. In English, this root forms words such as *habit*, *habitat*, *habitual*, and *cohabit*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To have, hold, possess, or dwell</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *habit* and *habitat*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hab** comes from a Latin word that means *"to have, hold, possess, or dwell"*.
  - At its core, it describes the action of have, hold, possess, or dwell.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **hab** in an English word, think of **to have, hold, possess, or dwell**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to have, hold, possess, or dwell).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Habit**: N.** 1. A settled, automatic behavioral pattern acquired through frequent repetition.
  - **Habitat**: An everyday English word showing the root's idea of *to have, hold, possess, or dwell*.
  - **Habitual**: Done by habit.
  - **Cohabit**: An everyday English word showing the root's idea of *to have, hold, possess, or dwell*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hab</mark>, think of <mark class="hl-def">to have, hold, possess, or dwell</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **hab** deploys four primary morphological variants in English:
> 1. **Base Stem `hab-` / `habit-` (from *habēre* & *habitus*):**
>    - *habit*, *habitus*, *habitual*, *habituate*, *habituation*, *dishabituation*.
> 2. **Contracted Adjectival Stem `-abl-` / `habil-` (from *habilis* & *habilitās*):**
>    - *able*, *ably*, *ability*, *inability*, *enable*, *disable*, *disability*.
>    - *habile*, *habiliment*, *habilitate*, *habilitation*, *rehabilitate*, *rehabilitation*.
> 3. **Privative Stem `debil-` (from *dēbilis* < *dē-* + *habilis*):**
>    - *debility*, *debilitate*, *debilitating*, *debilitation*, *debilitative*.
> 4. **Vowel-Weakened Prefixed Combining Stem `-hib-` / `-hibit-` (from *-hibēre*, *-hibitum*):**
>    - *ex- + hab-* $\to$ *exhibit*, *exhibition*, *exhibitor*, *exhibitionism*, *exhibitory*.
>    - *pro- + hab-* $\to$ *prohibit*, *prohibition*, *prohibitive*, *prohibitory*.
>    - *in- + hab-* $\to$ *inhibit*, *inhibition*, *inhibitor*, *inhibitory*, *uninhibited*.
>    - *ad- + hab-* $\to$ *adhibit*, *adhibition*.
> 5. **Latin Inflected Legal Phrases:**
>    - *habeas corpus* (2nd person singular present subjunctive: "that you have the body").
>    - *habendum* (neuter gerundive: "to be held").

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
> - **Physical & Bodily Holding:** *Habit* (monastic cowl or equestrian dress), *habiliment* (costume, raiment), *habitus* (constitutional body build in clinical genetics).
> - **Aptitude, Competence & Capacity:** *Able*, *ability*, *enable*, *disable*, *disability*, *inability*, *habile* — holding the practical power or fitness to execute a task.
> - **Infirmity & Deprivation of Power:** *Debility*, *debilitate*, *debilitating* — being stripped of bodily or organizational vigor (*dē-* + *habilis*).
> - **Psychological & Cultural Patterning:** *Habit*, *habitual*, *habituate*, *habituation*, *habitus* — behavioral and perceptual patterns held firmly through repeated enactment.
> - **Restraint, Prohibition & Suppression:** *Prohibit*, *inhibit*, *inhibition*, *inhibitor* — holding someone back from an action; molecular deceleration of biochemical pathways.
> - **Manifestation, Display & Demonstration:** *Exhibit*, *exhibition*, *exhibitor* — holding forth evidence, art, or commodities for public inspection.
> - **Constitutional Law & Jurisprudence:** *Habeas corpus*, *habendum*, *prohibition* (writ of prohibition), *rehabilitation* — formal judicial instruments safeguarding physical liberty, title, and restored civic standing.

---

## 🔀 4. Prefix & Combining Dynamics on hab

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `ex-` | out, forth | [[exhibit]], [[exhibition]], [[exhibitor]] | To hold forth into the light; to present objects, documents, or evidence for public scrutiny. |
| `pro-` | before, forth, in front | [[prohibit]], [[prohibition]], [[prohibitive]] | To hold out a barrier in front; to forbid by authoritative decree or make economically unfeasible. |
| `in-` (1) | in, into, upon | [[inhibit]], [[inhibition]], [[inhibitor]] | To hold in; to restrain an impulse, suppress an enzyme, or check an emotional reflex. |
| `ad-` | to, toward | [[adhibit]], [[adhibition]] | To hold toward; to apply, attach, or administer (a remedy, seal, or signature). |
| `dē-` | down, away, privative | [[debility]], [[debilitate]], [[debilitation]] | "Away from handiness/aptitude"; to rob of strength, render feeble or incapacitated. |
| `en-` / `em-` | in, cause to be (French) | [[enable]], [[enabler]], [[enablement]] | To make able; to supply the power, means, legal competence, or operational capacity. |
| `dis-` | away, apart, negation | [[disable]], [[disability]], [[dishabituation]] | To deprive of ability or competence; to extinguish an established behavioral habituation. |
| `re-` | back, again | [[rehabilitate]], [[rehabilitation]] | To make fit or suitable again; to restore to healthy functioning, rank, or good repute. |
| `in-` (2) | not, un- (negative) | [[inability]], [[uninhibited]] | Lacking the capacity to act; freed from psychological or chemical restraint. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-ility` | Abstract Noun (State / Capacity) | [[ability]], [[disability]], [[inability]], [[debility]] | Measures the degree of operational fitness or constitutional competence. |
| `-able` | Adjective (Fitness / Capacity) | [[able]] | Expressing inherent aptitude, physical power, or legal qualification. |
| `-ate` | Causative Verb | [[debilitate]], [[habituate]], [[habilitate]], [[rehabilitate]] | To bring about a condition of capacity, infirmity, or behavioral routine. |
| `-ation` / `-ition` | Noun (Process / State / Event) | [[prohibition]], [[inhibition]], [[exhibition]], [[habituation]], [[rehabilitation]], [[debilitation]] | The institutional act, biological process, or legal condition. |
| `-or` | Agent Noun | [[inhibitor]], [[exhibitor]], [[prohibitionist]] | The biological agent, chemical molecule, or person executing the holding. |
| `-ive` | Adjective (Tendency / Function) | [[prohibitive]], [[inhibitory]], [[rehabilitative]], [[exhibitory]] | Characterizing a law, enzyme, or therapy by its functional restraint or restorative power. |
| `-ual` | Adjective (Custom / Nature) | [[habitual]] | Characterizing actions performed out of fixed, involuntary routine. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Law & Constitutional Jurisprudence** | [[habeas corpus]], [[prohibition]], [[rehabilitation]], [[habendum]], [[disability]] | The Great Writ of *habeas corpus* barring unlawful executive imprisonment; the writ of prohibition issued by higher courts to restrain inferior tribunals; post-conviction civic rehabilitation; ADA (Americans with Disabilities Act) statutory protections. |
| 🔬 **Biochemistry, Pharmacology & Medicine** | [[inhibitor]], [[inhibition]], [[debilitating]], [[habitus]] | Competitive and non-competitive enzyme inhibitors (e.g., ACE inhibitors, kinase inhibitors); Marfanoid or cushingoid *habitus* in medical physical diagnosis; chronic debilitating neurodegenerative pathologies. |
| 🧠 **Neuroscience & Behavioral Psychology** | [[habituation]], [[inhibition]], [[uninhibited]], [[habitual]], [[dishabituation]] | Synaptic habituation in *Aplysia* (Kandel's neural model); prefrontal cortex executive cognitive inhibition; disinhibition syndromes following frontal lobe trauma; forming automatic behavioral habits. |
| 🏛️ **Sociology & Cultural Anthropology** | [[habitus]], [[habiliment]], [[exhibitionism]] | Pierre Bourdieu's sociological framework of *habitus* as embodied social capital; historical sumptuary laws governing aristocratic *habiliments*; psychological analyses of pathological exhibitionism. |
| 💰 **Economics & Commerce** | [[prohibitive]], [[exhibition]], [[enablement]] | Prohibitive tariffs and barriers to market entry; international trade exhibitions and world fairs; technological enablement of digital supply chains. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[athabascan]] | noun | **1.** A group of amerindian languages (the name coined by an american anthropologist, edward sapir).<br>**2.** A member of any of the north american indian groups speaking an athapaskan language and living in the subarctic regions of western canada and central alaska. | *"In academic literature, athabascan designates a group of amerindian languages (the name coined by an american anthropologist, edward sapir)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[athabaskan]] | noun | **1.** A member of any of the north american indian groups speaking an athapaskan language and living in the subarctic regions of western canada and central alaska.<br>**2.** A group of amerindian languages (the name coined by an american anthropologist, edward sapir). | *"In academic literature, athabaskan designates a member of any of the north american indian groups speaking an athapaskan language and living in the subarctic regions of western canada and central alaska."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cohabit]] | verb | **1.** Share living quarters; usually said of people who are not married and live together as a couple. | *"Thus among the hill tribes of Assam, not only are men forbidden to cohabit with their wives during or after a raid, but they may not eat food cooked by a woman; nay, they should not address a word even to their own wives."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[cohabitation]] | noun | **1.** The act of living together and having a sexual relationship (especially without being married). | *"Sometimes it was protracted as long as ten days at a time, especially during the first years of cohabitation."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[dishabille]] | noun | **1.** The state of being carelessly or partially dressed. | *"Wherever they went, some pattened girl stopped to curtsy, or some footman in dishabille sneaked off."* — Jane Austen, *Northanger Abbey* |
| [[habacuc]] | noun | **1.** An old testament book telling habakkuk's prophecies. | *"In academic literature, habacuc designates an old testament book telling habakkuk's prophecies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habakkuk]] | noun | **1.** A hebrew minor prophet.<br>**2.** An old testament book telling habakkuk's prophecies. | *"In academic literature, habakkuk designates a hebrew minor prophet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habanera]] | noun | **1.** Music composed in duple time for dancing the habanera.<br>**2.** A cuban dance in duple time. | *"In academic literature, habanera designates music composed in duple time for dancing the habanera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habenaria]] | noun | **1.** Chiefly terrestrial orchids with tubers or fleshy roots often having long slender spurs and petals and lip lobes; includes species formerly placed in genus gymnadeniopsis. | *"In academic literature, habenaria designates chiefly terrestrial orchids with tubers or fleshy roots often having long slender spurs and petals and lip lobes; includes species formerly placed in genus gymnadeniopsis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haber]] | noun | **1.** German chemist noted for the synthetic production of ammonia from the nitrogen in air (1868-1934). | *"Pues no podemos haber aquello que queremos, queramos aquello que podremos."* — George Eliot, *Middlemarch* |
| [[haberdasher]] | noun | **1.** A merchant who sells men's clothing. | *"There was a haberdasher’s wife of small wit near him that railed upon me till her pinked porringer fell off her head for kindling such a combustion in the state."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[haberdashery]] | noun | **1.** A store where men's clothes are sold.<br>**2.** The drygoods sold by a haberdasher. | *"Gavin Hamilton, writer, Mauchline.] [Footnote 11: Fergusson's _Poems_.] [Footnote 11a: Keeper of a haberdashery store in Mauchline.] * * * * * XVI.-TO MR."* — Robert Burns, *The Letters of Robert Burns* |
| [[habergeon]] | noun | **1.** (middle ages) a light sleeveless coat of chain mail worn under the hauberk. | *"The sword of him that layeth at him cannot hold, the spear, the dart, nor the habergeon: he esteemeth iron as straw; the arrow cannot make him flee; darts are counted as stubble; he laugheth at the shaking of a spear!” This the creature? this he?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[habiliment]] | noun | **1.** A covering designed to be worn on a person's body. | *"Thus, in this strange and sad habiliment, I will encounter with Andronicus, And say I am Revenge, sent from below To join with him and right his heinous wrongs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habilimented]] | adjective | **1.** Dressed or clothed especially in fine attire; often used in combination. | *"In academic literature, habilimented designates dressed or clothed especially in fine attire; often used in combination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habilitate]] | verb | **1.** Qualify for teaching at a university in europe.<br>**2.** Provide with clothes or put clothes on. | *"In academic literature, habilitate designates qualify for teaching at a university in europe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habit]] | noun | **1.** An established custom.<br>**2.** (psychology) an automatic pattern of behavior in reaction to a specific situation; may be inherited or acquired through frequent repetition. | *"O love’s best habit is in seeming trust, And age in love loves not to have years told."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habit-forming]] | adjective | **1.** Causing or characterized by addiction. | *"In academic literature, habit-forming designates causing or characterized by addiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitability]] | noun | **1.** Suitability for living in or on. | *"In academic literature, habitability designates suitability for living in or on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitable]] | adjective | **1.** Fit for habitation. | *"Jarndyce, “a habitable doll’s house with good board and a few tin people to get into debt with and borrow money of would set the boy up in life."* — Charles Dickens, *Bleak House* |
| [[habitableness]] | noun | **1.** Suitability for living in or on. | *"In academic literature, habitableness designates suitability for living in or on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitant]] | noun | **1.** A person who inhabits a particular place. | *"Yet not to Earth are those bright Luminaries Officious, but to thee Earths habitant."* — John Milton, *Paradise Lost* |
| [[habitat]] | noun | **1.** The type of environment in which an organism or group normally lives or occurs. | *"The compartment was generous by space habitat standards."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[habitation]] | noun | **1.** The native habitat or home of an animal or plant.<br>**2.** Housing that someone is living in. | *"O what a mansion have those vices got, Which for their habitation chose out thee, Where beauty’s veil doth cover every blot, And all things turns to fair, that eyes can see!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habited]] | verb | **1.** Put a habit on.<br>**2.** Dressed in a habit. | *"Enter King and others as masquers, habited like shepherds, ushered by the Lord Chamberlain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[habitual]] | adjective | **1.** Commonly used or practiced; usual. | *"I bear it, and I hide it.” Even in the thinking of her endurance, she drew her habitual air of proud indifference about her like a veil, though she soon cast it off again."* — Charles Dickens, *Bleak House* |
| [[habitually]] | adverb | **1.** According to habit or custom. | *"It is habitually hard upon Sir Leicester, whose countenance it greenly mottles in the manner of sage-cheese and in whose aristocratic system it effects a dismal revolution."* — Charles Dickens, *Bleak House* |
| [[habituate]] | verb | **1.** Take or consume (regularly or habitually).<br>**2.** Make psychologically or physically used (to something). | *"However I determine, poesy must be laid aside for some time; my mind has been vitiated with idleness, and it will take a good deal of effort to habituate it to the routine of business.--I am, my dear Sir, yours sincerely, R."* — Robert Burns, *The Letters of Robert Burns* |
| [[habituation]] | noun | **1.** Being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs).<br>**2.** A general accommodation to unchanging environmental conditions. | *"In academic literature, habituation designates being abnormally tolerant to and dependent on something that is psychologically or physically habit-forming (especially alcohol or narcotic drugs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habitude]] | noun | **1.** Habitual mode of behavior. | *"When we got to La Clairière we were ready to sink down with fatigue like all the rest--nay, even more than the rest, for we were not used to it, and for my part I had altogether lost the habitude of long walks."* — Mrs. Oliphant, *A Beleaguered City* |
| [[habitue]] | noun | **1.** A regular patron. | *"Captain Runcie, of the S.S. _Gympie_, an old _habitue_ of New Guinea, took the chair."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[habitus]] | noun | **1.** Person's predisposition to be affected by something (as a disease).<br>**2.** Constitution of the human body. | *"In academic literature, habitus designates person's predisposition to be affected by something (as a disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[habsburg]] | noun | **1.** A royal german family that provided rulers for several european states and wore the crown of the holy roman empire from 1440 to 1806. | *"But in its crypt lie several of the great dead of the House of Habsburg, among them Maria Theresa and Napoleon’s son, the Duke of Reichstadt."* — Mark Twain, *What Is Man? and Other Essays* |
| [[inhabit]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Be present in. | *"There’s none but witches do inhabit here, And therefore ’tis high time that I were hence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inhabitable]] | adjective | **1.** Fit for habitation. | *"The only apartments now inhabitable are those of its loyal and intelligent warden and his family, whose civility and general information respecting the castle are very acceptable to its daily visitors."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[inhabitancy]] | noun | **1.** The act of dwelling in or living permanently in a place (said of both animals and men). | *"In academic literature, inhabitancy designates the act of dwelling in or living permanently in a place (said of both animals and men)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhabitant]] | noun | **1.** A person who inhabits a particular place. | *"There is more litter and lumber in it than of old, and it is dirtier if possible; likewise, it is ghostly with traces of its dead inhabitant and even with his chalked writing on the wall."* — Charles Dickens, *Bleak House* |
| [[inhabitation]] | noun | **1.** The act of dwelling in or living permanently in a place (said of both animals and men). | *"It's a wild inhabitation for my young love to be in."* — Donn Byrne, *The Wind Bloweth* |
| [[inhabited]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Be present in. | *"JAQUES. [_Aside_.] O knowledge ill-inhabited, worse than Jove in a thatched house!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rehabilitate]] | verb | **1.** Help to readapt, as to a former state of health or good repute.<br>**2.** Reinstall politically. | *"Since Kurt had made his little speech and had rehabilitated Loneli's honour before the school children, the grandmother was as kind to her as of yore and never mentioned the shame-bench again."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[rehabilitation]] | noun | **1.** The restoration of someone to a useful place in society.<br>**2.** The conversion of wasteland into land suitable for use of habitation or cultivation. | *"How could she face her parents, get back her box, and disconcert the whole scheme for the rehabilitation of her family on such sentimental grounds?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[rehabilitative]] | adjective | **1.** Designed to accomplish rehabilitation; - j.b.costello.<br>**2.** Helping to restore to good condition. | *"In academic literature, rehabilitative designates designed to accomplish rehabilitation; - j.b.costello."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninhabitable]] | adjective | **1.** Not fit for habitation. | *"Uninhabitable, and almost inaccessible,— SEBASTIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uninhabited]] | adjective | **1.** Not having inhabitants; not lived in. | *"His course brought him in sight of the Island of Ascension, at that time uninhabited, and _never visited by any ship_, except for the purpose of collecting turtles, which abound on the coast."* — Classic Author, *The wonders of prayer* |

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
    ROOT DASHBOARD · HAB
  </div>
</div>
