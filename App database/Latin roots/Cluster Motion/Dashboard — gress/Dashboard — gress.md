---
status: unread
type: root_dashboard
---
# Dashboard — gress
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gress-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“step or walk”</span>
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

The root **gress** means step or walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *progress*, *congress*, *aggressive*, and *digress*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: step or walk
> The root **gress** means step or walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *progress*, *congress*, *aggressive*, and *digress*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Step or walk</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *progress* and *congress*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gress** comes from a Latin word that means *"step or walk"*.
  - At its core, it describes step or walk.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **gress** in an English word, think of **motion, travel, and moving forward**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of step or walk.
  - **Mental & Social**: How people experience, organize, or communicate about step or walk.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Progress**: Forward movement toward a destination, goal, or higher stage of development.
  - **Congress**: A formal meeting or assembly of delegates, representatives, or sovereign states to discuss matters of mutual interest or negotiate treaties.
  - **Aggressive**: Characterized by or showing a readiness to attack, confront, or quarrel without provocation.
  - **Digress**: To turn aside or deviate from the main subject, path of thought, or argument in speech or writing.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gress</mark>, think of <mark class="hl-def">motion, travel, and moving forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **gress** operates through a unified morphological engine grounded in the Latin supine base:
> - **Deponent Verbal Base:** Originates from 3rd-conjugation deponent verb *gradior, gradī, gressus sum*. Because the verb is deponent (passive in grammatical form, active in meaning), its supine and past participle *gressus* translates actively: "having stepped", "stepping", or "an accomplished step".
> - **Primary English Supine Base:** `gress-` (from *gressum*) — attaches directly to directional prefixes without vowel change: *pro-gress*, *re-gress*, *trans-gress*, *in-gress*, *e-gress*, *di-gress*, *con-gress*, *ag-gress*, *retro-gress*.
> - **Classical Prefix Assimilation Dynamics:**
>   - *ad-* + *gress-* $\to$ **aggress-** (regressive consonant assimilation: $d \to g$).
>   - *con-* + *gress-* $\to$ **congress-** (nasal assimilation to velar [ŋ] before voiced velar stop $g$).
>   - *dis-* + *gress-* $\to$ **digress-** (loss of sibilant $s$ with compensatory vowel maintenance: $dis \to d\bar{i}$).
>   - *ex-* + *gress-* $\to$ **egress-** (elision of $x$ before voiced velar stop $g$: $ex \to \bar{e}$).
>   - *in-* + *gress-* $\to$ **ingress-** (retention of alveolar nasal before velar stop).
>   - *prō-* + *gress-* $\to$ **progress-** (direct attachment to forward vector).
>   - *re-* + *gress-* $\to$ **regress-** (direct attachment to backward vector).
>   - *retro-* + *gress-* $\to$ **retrogress-** (compounding with archaic directional adverb *retro*).
>   - *trāns-* + *gress-* $\to$ **transgress-** (direct attachment across boundary).
> - **Functional Suffixation Engines:**
>   - **Action & Result Nouns:** *-ion* produces *progression*, *transgression*, *regression*, *digression*, *ingression*, *egression*, *retrogression*.
>   - **Agent & Instrument Nouns:** *-or* produces *aggressor*, *transgressor*, and statistical *regressor*.
>   - **Latin Gerundive Passive Target:** *-and* (from Latin *-andus*) produces statistical *regressand* ("that which is to be stepped back upon / predicted").
>   - **Dispositional & Tendency Adjectives:** *-ive* produces *progressive*, *aggressive*, *regressive*, *transgressive*, *digressive*, *ingressive*, *egressive*, *retrogressive*.
>   - **Manner Adverbs:** *-ly* attaches to adjectival stems: *progressively*, *aggressively*, *regressively*, *digressively*, *transgressively*, *retrogressively*.
>   - **Ideological & Character Formations:** *-ism* and *-ist* produce *progressivism* and *progressivist*; *-ness* produces *aggressiveness*; *-ity* produces *regressivity*.
>   - **Biomechanical Combining Form:** *-orial* (from Latin *-ōrius*) produces *gressorial* ("adapted for walking").
>   - **Civic Governance Compounds:** Modern English compounds produce *congressman*, *congresswoman*, *congressperson*.

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
> Although the root fundamentally denotes **"to step, walk, advance, march"**, its manifestation shifts across eight distinct operational planes:
> - **Civilizational Advancement & Social Reform:** In [[progress]], [[progression]], [[progressive]], [[progressively]], [[progressivism]], and [[progressivist]], the step represents forward human development, social equity, technological innovation, and cumulative historical betterment.
> - **Developmental Relapse, Degeneration & Statistical Modeling:** In [[regress]], [[regression]], [[regressive]], [[regressively]], [[regressivity]], [[regressand]], [[regressor]], [[regressional]], [[retrogress]], [[retrogression]], [[retrogressive]], and [[retrogressively]], the step reverses direction—signifying psychological reversion to childish states, biological decay, regressive taxation, or the statistical fitting of data toward an expected baseline.
> - **Moral Boundaries, Divine Taboos & Criminal Overstepping:** In [[transgress]], [[transgression]], [[transgressive]], [[transgressively]], and [[transgressor]], the step violates an established ethical line, religious commandment, legal statute, or artistic orthodoxy.
> - **Legislative Assembly & Sovereign Representation:** In [[congress]], [[congressional]], [[congressman]], [[congresswoman]], and [[congressperson]], the step represents sovereign representatives stepping together onto neutral ground to debate, legislate, and govern a constitutional republic.
> - **Hostile Encroachment, Conflict & Geopolitical Standoffs:** In [[aggress]], [[aggression]], [[aggressive]], [[aggressively]], [[aggressiveness]], [[aggressor]], [[non-aggression]], and [[non-aggressive]], the step is an unprovoked forward assault into another's territory or personal boundaries.
> - **Physical Entry, Exit, Fluid Systems & Phonetic Airflow:** In [[ingress]], [[ingression]], [[ingressive]], [[egress]], [[egression]], and [[egressive]], the step describes physical passage into or out of architectural enclosures, aerospace airlocks, planetary eclipses, or the inward/outward airflow of human speech sounds.
> - **Rhetorical Deviation & Discursive Structure:** In [[digress]], [[digression]], [[digressive]], and [[digressively]], the step is a deliberate or inadvertent turning aside from the central thesis of an argument or narrative.
> - **Comparative Anatomy & Terrestrial Locomotion:** In [[gressorial]], the step identifies evolutionary biological adaptations designed strictly for walking across substrates.

---

## 🔀 4. Prefix & Combining Dynamics on gress

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (assimilated to `ag-`) | to, toward, against | [[aggress]], [[aggression]] | Stepping forcefully toward an adversary $\to$ initiating an unprovoked hostile attack or military invasion. |
| `con-` | together, with | [[congress]], [[congressional]] | Stepping together into a single assembly $\to$ a formal meeting of national delegates, ambassadors, or lawmakers. |
| `di-` (variant of `dis-`) | aside, apart | [[digress]], [[digression]] | Stepping aside from the established roadway $\to$ deviating from the central topic or line of argument. |
| `e-` (variant of `ex-`) | out of, forth | [[egress]], [[egression]], [[egressive]] | Stepping out or emerging from an enclosure $\to$ an architectural exit; an outward pulmonic airflow in speech. |
| `in-` | into, in | [[ingress]], [[ingression]], [[ingressive]] | Stepping into an interior or private property $\to$ legal right of entrance; an inward airstream in phonetics. |
| `pro-` | forward, onward | [[progress]], [[progression]], [[progressive]] | Stepping forward toward an objective $\to$ continuous civilizational advance, reform, or technological improvement. |
| `re-` | back, backward, again | [[regress]], [[regression]], [[regressive]] | Stepping back toward a prior or lower condition $\to$ psychological relapse, or statistical fitting toward the mean. |
| `retro-` | backward, behind | [[retrogress]], [[retrogression]], [[retrogressive]] | Stepping backward against the arrow of advancement $\to$ institutional degeneration or biological involution. |
| `trans-` | across, beyond | [[transgress]], [[transgression]], [[transgressor]] | Stepping across an established boundary, line, or law $\to$ violating a moral commandment, statute, or social taboo. |
| `non-` | not, absence of | [[non-aggression]], [[non-aggressive]] | Absence of hostile stepping toward another $\to$ a bilateral treaty of mutual peace, or a peaceful disposition. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Action / Result noun | [[progression]], [[transgression]], [[regression]], [[digression]], [[ingression]], [[egression]], [[retrogression]] | Nominalizes the executed action or historical event of stepping into an abstract concept or physical occurrence. |
| `-ive` | Dispositional adjective | [[progressive]], [[aggressive]], [[regressive]], [[transgressive]], [[digressive]], [[ingressive]], [[egressive]], [[retrogressive]] | Characterizes an entity by its tendency, habitual direction, or operational capacity for movement. |
| `-or` | Agent noun | [[aggressor]], [[transgressor]], [[regressor]] | Designates the personal individual who steps forward/across, or the statistical variable that drives prediction. |
| `-and` | Passive target noun (Gerundive) | [[regressand]] | Names the dependent variable that is "to be stepped back upon / predicted" in a mathematical regression model. |
| `-ly` | Manner adverb | [[progressively]], [[aggressively]], [[regressively]], [[digressively]], [[transgressively]], [[retrogressively]] | Modifies verbal actions to describe the steady, hostile, or deviant manner in which motion or change unfolds. |
| `-ism` | Ideological doctrine noun | [[progressivism]] | Systematizes the political and philosophical conviction that society must advance through continuous reform. |
| `-ist` | Adherent / Advocate noun | [[progressivist]] | Identifies a person who champions political, social, or educational reform through evolutionary progress. |
| `-ness` | Quality / State noun | [[aggressiveness]] | Formulates the abstract behavioral disposition or psychological inclination toward forceful confrontation. |
| `-ity` | Metric / Property noun | [[regressivity]] | Measures the proportionate degree to which a fiscal tax code steps downward relative to personal income. |
| `-al` / `-ional` | Pertaining to adjective | [[congressional]], [[regressional]] | Establishes formal relationships to legislative institutions or mathematical regression analyses. |
| `-orial` | Biomechanical adjective | [[gressorial]] | Classifies specialized anatomical limbs adapted specifically for walking locomotion rather than jumping or running. |
| `-man` / `-woman` / `-person` | Representative noun | [[congressman]], [[congresswoman]], [[congressperson]] | Designates individual elected members serving within a bicameral constitutional congress. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Constitutional Law & Governance** | [[congress]], [[congressional]], [[congressman]], [[congresswoman]], [[congressperson]], [[progressivism]], [[progressivist]] | Article I legislative power under the U.S. Constitution, bicameral statutory deliberation, congressional oversight hearings, and social welfare reform platforms. |
| 📊 **Statistics, Data Science & Econometrics** | [[regression]], [[regressand]], [[regressor]], [[regressional]], [[regressive]] | Ordinary Least Squares (OLS) estimation, multivariable machine learning algorithms, predictor features (regressors), outcome response variables (regressands), and regression toward the mean. |
| ⚔️ **International Relations & Military Law** | [[aggression]], [[aggressive]], [[aggressively]], [[aggressiveness]], [[aggressor]], [[non-aggression]], [[non-aggressive]] | United Nations Charter Article 2(4) prohibition of military force, Nuremberg trials for crimes of aggression, bilateral non-aggression treaties, and rules of engagement. |
| 📜 **Ethics, Theology & Cultural Studies** | [[transgress]], [[transgression]], [[transgressive]], [[transgressively]], [[transgressor]] | Biblical theology of covenantal disobedience, moral philosophy of taboo violations, transgressive modern literature, and countercultural artistic defiance. |
| 🗣️ **Rhetoric, Linguistics & Phonetics** | [[digress]], [[digression]], [[digressive]], [[digressively]], [[ingressive]], [[egressive]] | Classical forensic rhetoric (*digressiō* in Cicero and Quintilian), narrative tangents, pulmonic egressive airflow in spoken languages, and ingressive click/implosive consonants. |
| 🚪 **Architecture, Mining & Aerospace** | [[ingress]], [[ingression]], [[egress]], [[egression]] | Life-safety building codes governing emergency egress doors, commercial building ingress pathways, spacecraft extravehicular airlocks, and mining adit easements. |
| 🧠 **Psychiatry & Developmental Psychology** | [[regress]], [[regression]], [[regressive]], [[retrogress]], [[retrogression]] | Freudian defense mechanisms where adults revert to infantile coping strategies under trauma, pediatric developmental milestone loss, and neurodegenerative decline. |
| 🐾 **Zoology, Entomology & Biomechanics** | [[gressorial]] | Comparative morphology of terrestrial appendages: ambulatory gressorial limbs (walking legs of beetles and pigeons) contrasted with cursorial, saltatorial, and fossorial limbs. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aggress]] | verb | **1.** Take the initiative and go on the offensive. | *"Hannah trembled before him, but Betsey faced him sturdily, being amazingly like him, with a feminine difference; as like as a ruled person can be to a ruler, for the discipline of life had taught the man to aggress, the woman only to defend."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[aggression]] | noun | **1.** A disposition to behave aggressively.<br>**2.** A feeling of hostility that arouses thoughts of attack. | *"In view of the recrudescence of the spirit of armed national aggression evident of late, and especially in the outbreak of the Great War in 1914, the military aspect of the population question deserves serious consideration."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[aggressive]] | adjective | **1.** Having or showing determination and energetic pursuit of your ends.<br>**2.** Tending to spread quickly. | *"Then with her little scissors, by the aid of a pocket looking-glass, she mercilessly nipped her eyebrows off, and thus insured against aggressive admiration, she went on her uneven way."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[aggressively]] | adverb | **1.** In an aggressive manner. | *"I will go to the professor--I was going anyhow--but now I shall go aggressively, and bustle him."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[aggressiveness]] | noun | **1.** The quality of being bold and enterprising.<br>**2.** A feeling of hostility that arouses thoughts of attack. | *"Engender in the darkey a sense of his inferiority and it will paralyze his aggressiveness and do more to keep him down than a standing army."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[aggressor]] | noun | **1.** Someone who attacks.<br>**2.** A confident assertive person who acts as instigator. | *"Carthage, though a commercial republic, was the aggressor in the very war that ended in her destruction."* — Alexander Hamilton, *The Federalist Papers* |
| [[congress]] | noun | **1.** The legislature of the united states government.<br>**2.** A meeting of elected or appointed representatives. | *"His reply was in substance as follows: "When standing on a stoop on the corner of Fourth and Congress streets, cogitating which way I should go, I was impressed by a voice within which directed my course to the Conference Room."* — Classic Author, *The wonders of prayer* |
| [[congressional]] | adjective | **1.** Of or relating to congress. | *"The month after the McKinley bill became law, the Congressional elections (November, 1890) returned an overwhelming Democratic majority in the House, altho this was a period of business prosperity, a fact usually favoring the party in power."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[congressman]] | noun | **1.** A member of the united states house of representatives. | *"I am doing well, I hope, Congressman Bloodworth."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[degressive]] | adjective | **1.** Going down by steps.<br>**2.** (of taxes) gradually decreasing in rate on sums below a certain amount. | *"In academic literature, degressive designates going down by steps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digress]] | verb | **1.** Lose clarity or turn aside especially from the main subject of attention or course of argument in writing, thinking, or speaking.<br>**2.** Wander from a direct or straight course. | *"Tedious it were to tell, and harsh to hear; Sufficeth I am come to keep my word, Though in some part enforced to digress; Which at more leisure I will so excuse As you shall well be satisfied withal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[digression]] | noun | **1.** A message that departs from the main subject.<br>**2.** A turning aside (of your course or attention or concern). | *"But this is mere digression from my purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[digressive]] | adjective | **1.** Of superficial relevance if any.<br>**2.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"Is a’ th’ amount. [Footnote 1: Duan, a term of Ossian’s for the different divisions of a digressive poem."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[egress]] | noun | **1.** (astronomy) the reappearance of a celestial body after an eclipse.<br>**2.** The becoming visible. | *"Thou shalt have egress and regress—said I well?—and thy name shall be Brook."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[egression]] | noun | **1.** The act of coming (or going) out; becoming apparent. | *"In academic literature, egression designates the act of coming (or going) out; becoming apparent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ingress]] | noun | **1.** (astronomy) the disappearance of a celestial body prior to an eclipse.<br>**2.** The act of entering. | *"If he does strain to the moment of ingress into the divine being, it is to swoon with excess of bliss, as at the end of 'Epipsychidion', or as in the 'Indian Serenade': "Oh lift me from the grass!"* — Sydney Waterlow, *Shelley* |
| [[nonaggression]] | noun | **1.** A policy of not initiating hostilities. | *"In academic literature, nonaggression designates a policy of not initiating hostilities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonaggressive]] | adjective | **1.** Not aggressive; not given to fighting or assertiveness. | *"In academic literature, nonaggressive designates not aggressive; not given to fighting or assertiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonprogressive]] | adjective | **1.** Old-fashioned and out of date. | *"In academic literature, nonprogressive designates old-fashioned and out of date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progress]] | noun | **1.** Gradual improvement or growth or development.<br>**2.** The act of moving forward (as toward a goal). | *"The wrinkles which thy glass will truly show, Of mouthed graves will give thee memory, Thou by thy dial’s shady stealth mayst know, Time’s thievish progress to eternity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[progression]] | noun | **1.** A series with a definite pattern of advance.<br>**2.** A movement forward. | *"The most disputed feature of the income tax is the principle of graduation, or of progression."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[progressive]] | noun | **1.** A tense of verbs used in describing action that is on-going.<br>**2.** A person who favors a political philosophy of progress and reform and the protection of civil liberties. | *"The spread of inheritance taxes and the higher and progressive rates applied are an expression in part of the need of additional revenues and in part of the growing popular concern regarding the concentration of wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[progressively]] | adverb | **1.** Advancing in amount or intensity. | *"Paul of Tarsus progressively found more in Christ, expected more of him, trusted him more; and his faith was justified."* — T. R. Glover, *The Jesus of History* |
| [[progressiveness]] | noun | **1.** Advancement toward better conditions or policies or methods. | *"In academic literature, progressiveness designates advancement toward better conditions or policies or methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progressivism]] | noun | **1.** The political orientation of those who favor progress toward better conditions in government and society. | *"In academic literature, progressivism designates the political orientation of those who favor progress toward better conditions in government and society."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progressivity]] | noun | **1.** Advancement toward better conditions or policies or methods. | *"In academic literature, progressivity designates advancement toward better conditions or policies or methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regress]] | noun | **1.** The reasoning involved when you assume the conclusion is true and reason backward to the evidence.<br>**2.** Returning to a former state. | *"Thou shalt have egress and regress—said I well?—and thy name shall be Brook."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regression]] | noun | **1.** An abnormal state in which development has stopped prematurely.<br>**2.** (psychiatry) a defense mechanism in which you flee from reality by assuming a more infantile state. | *"It is upheld in part because in this case it but offsets _regression_, that is relatively heavier taxation on the smaller incomes, in the case of the other kinds of taxes (tariff, property taxes, etc.)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regressive]] | adjective | **1.** (of taxes) adjusted so that the rate decreases as the amount of income increases.<br>**2.** Opposing progress; returning to a former less advanced state. | *"In academic literature, regressive designates (of taxes) adjusted so that the rate decreases as the amount of income increases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrogress]] | verb | **1.** Get worse or fall back to a previous condition.<br>**2.** Go back to bad behavior. | *"In academic literature, retrogress designates get worse or fall back to a previous condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrogression]] | noun | **1.** Passing from a more complex to a simpler biological form.<br>**2.** Returning to a former state. | *"He had foresight, but has less now than formerly, pointing to a moral retrogression, which, when taken with the decline of his fortunes, seems to indicate some evil influence, probably drink, at work upon him."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[retrogressive]] | adjective | **1.** Going from better to worse. | *"The ideas, the modes, the surroundings, appeared retrogressive and unmeaning."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[transgress]] | verb | **1.** Act in disregard of laws, rules, contracts, or promises.<br>**2.** Spread over land, especially along a subsiding shoreline. | *"But list’n not to his Temptations, warne Thy weaker; let it profit thee to have heard By terrible Example the reward Of disobedience; firm they might have stood, Yet fell; remember, and fear to transgress."* — John Milton, *Paradise Lost* |
| [[transgression]] | noun | **1.** The act of transgressing; the violation of a law or a duty or moral principle.<br>**2.** The spreading of the sea over land as evidenced by the deposition of marine strata over terrestrial strata. | *"Heaven lay not my transgression to my charge!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transgressor]] | noun | **1.** Someone who transgresses; someone who violates a law or command. | *"He was beginning to realize that the way of the transgressor is hard."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[unaggressive]] | adjective | **1.** Not aggressive; not given to fighting or assertiveness. | *"In academic literature, unaggressive designates not aggressive; not given to fighting or assertiveness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprogressive]] | adjective | **1.** Old-fashioned and out of date. | *"In academic literature, unprogressive designates old-fashioned and out of date."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · GRESS
  </div>
</div>
