---
status: unread
type: root_dashboard
---
# Dashboard — fid
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fid-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“faith or trust”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Placing your full trust in a loyal friend or keeping a solemn promise.</span>
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

The root **fid** means faith or trust. It refers to faith, trust, reliance, fidelity. In English, this root forms words such as *fidelity*, *confident*, *confide*, and *infidel*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: faith or trust
> The root **fid** means faith or trust. It refers to faith, trust, reliance, fidelity. In English, this root forms words such as *fidelity*, *confident*, *confide*, and *infidel*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Faith or trust</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Placing your full trust in a loyal friend or keeping a solemn promise.</mark>
> - **Everyday Connection**: Think of familiar words like *fidelity* and *confident*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fid** comes from a Latin word that means *"faith or trust"*.
  - At its core, it describes faith or trust.

- **The Big Picture Idea**:
  - Picture placing your full trust in a loyal friend or keeping a solemn promise.
  - Whenever you see **fid** in an English word, think of **trust, loyalty, and faith**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of faith or trust.
  - **Mental & Social**: How people experience, organize, or communicate about faith or trust.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Fidelity**: Faithfulness to a person, cause, or belief, demonstrated by continuing loyalty and support.
  - **Confident**: Feeling or showing certainty about something.
  - **Confide**: To tell someone about a secret or private matter while trusting them not to repeat it.
  - **Infidel**: A person who does not believe in a particular religion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fid</mark>, think of <mark class="hl-def">trust, loyalty, and faith</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Dynamics
> The root **fid** generates English vocabulary across three primary morphological stems:
> 
> 1. **The Nominal / Radical Stem `fid-` / `fide-`** (from *fīdēs, fideī*):
>    - Produces abstract nouns, doctrinal terms, and Latin compounds: *fidelity*, *infidelity*, *fideism*, *bona fide*, *perfidy*.
> 2. **The Verbal Present Stem `fīd-` / `fid-`** (from *fīdō, fīdere*):
>    - Attaches to Latin prefixes to express directional modes of reliance: *confide* (rely together/wholly), *diffident* (lacking reliance).
> 3. **The Fiduciary & Participial Stem `fidūc-` / `fidā-`** (from *fidūcia* and Medieval/Romance *\*fīdāre*):
>    - *fidūcia* → *fiduciary*, *fiducial*.
>    - *\*affīdāre* → *affidavit*, *affiance*.
>    - *\*disfīdāre* → *defy*, *defiance*.
>    - *\*fīdāre* → *fiancé*, *fiancée*.
> 4. **The Norman-French Reflex `feith-` / `feal-`** (from Anglo-Norman *feid* / *feelté*):
>    - *faith*, *faithful*, *faithless*, *fealty*.

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

> [!tip] 🌈 The Six Cognitive Landscapes of `fid`
> 
> ```
>                           ┌── 1. Sacred Duty & Belief (faith, fidelis, sola fide)
>                           ├── 2. Feudal & Relational Loyalty (fealty, fidelity, semper fidelis)
>                           ├── 3. Law, Finance & Public Trust (fiduciary, fiducial, affidavit, bona fide)
>   [fid: faith / trust] ───┼── 4. Psychological Self-Reliance (confidence, diffident, diffidence)
>                           ├── 5. Intimate Secrecy & Betrothal (confide, confidant, affiance, fiancé)
>                           └── 6. Rupture, Betrayal & Defiance (perfidy, infidel, defy, defiance)
> ```
> 
> 1. **Sacred Duty, Religion & Theology:**
>    - The spiritual surrender to truth without empirical proof: *faith*, *faithful*, *fideism*, *sola fide* (salvation by faith alone).
> 2. **Feudal & Institutional Loyalty:**
>    - The reciprocal allegiance binding individual to sovereign, cause, or marital partner: *fealty*, *fidelity*, *infidelity*, *semper fidelis*.
> 3. **Law, Equity & Fiduciary Governance:**
>    - The formalization of trust into binding legal duties and verified declarations: *fiduciary* (holding assets in trust), *fiducial* (fixed baseline of standard), *affidavit* (sworn statement), *bona fide* (in good faith), *uberrima fides* (utmost good faith).
> 4. **Psychology & Self-Reliance:**
>    - The emotional posture of trusting in one's own faculties or trembling in hesitation: *confidence*, *confident*, *diffident*, *diffidence*.
> 5. **Intimate Secrecy & Matrimonial Pledges:**
>    - The quiet sheltering of private vulnerabilities: *confide*, *confidant*, *confidante*, *confidential*; and the formal pledge of marriage: *affiance*, *fiancé*, *fiancée*.
> 6. **Betrayal, Renunciation & Rebellion:**
>    - The deliberate destruction or repudiation of trust: *perfidy* (calculated treachery), *infidel* (one who denies faith), *defy* and *defiance* (renouncing fealty to an authority and standing in open revolt).

---

## 🔀 4. Prefix & Combining Dynamics on fid

### Prefix Dynamics

| Prefix | Morpheme Meaning | Classical Latin Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `ad-` (→ *af-*) | to, toward | *\*affīdāre* (Med. Lat.) | [[affidavit]], [[affiance]] | To bind faith *to* someone; to pledge one's faith under oath or in marriage. |
| `con-` | together, completely | *confīdere* | [[confide]], [[confidence]], [[confidant]] | To trust *completely with* someone; to pool trust or share innermost secrets. |
| `dis-` (→ *dif-*) | away, apart, un- | *diffīdere* | [[diffident]], [[diffidence]] | Trust pulled *away* from oneself; hesitant, bashful, lacking self-assurance. |
| `dis-` (→ *de-*) | apart, undoing | *\*disfīdāre* (Vulg. Lat.) | [[defy]], [[defiance]] | To strip *away* one's pledged faith/allegiance to a lord; to challenge and rebel. |
| `in-` | not, un- | *īnfidēlis* | [[infidel]], [[infidelity]] | *Lacking* faith; faithless in marriage, duty, or religious communion. |
| `per-` | through, to ruin, badly | *perfidia*, *perfidus* | [[perfidy]], [[perfidious]] | Trust turned *to ruin* through deceit; violating sworn faith; treachery. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ence` / `-ance` | Abstract state or condition | *con-* + *fid-* + *-ence* | [[confidence]], [[defiance]], [[diffidence]] | The ongoing state of trusting, resisting, or hesitating. |
| `-ent` / `-ant` | Active participle (person or quality) | *con-* + *fid-* + *-ent* | [[confident]], [[defiant]], [[diffident]], [[confidant]] | One who trusts, one who defies, or the quality of being assured. |
| `-ential` | Relational adjective | *confidentia* + *-ālis* | [[confidential]] | Pertaining to private trust and guarded communication. |
| `-ary` | One serving as / having nature of | *fīdūcia* + *-ārius* | [[fiduciary]] | Characterized by or holding a sacred position of trust over assets. |
| `-ity` | Quality or degree | *fidēlis* + *-tās* | [[fidelity]], [[infidelity]], [[confidentiality]] | The objective measure of steadfastness, treason, or privacy. |
| `-ty` (Norman) | Quality (doublet of *-ity*) | *feelté* | [[fealty]] | Feudal obligation of fidelity sworn to a lord. |
| `-ous` | Full of, characterized by | *perfidiosus* | [[perfidious]] | Filled with calculated deceit and breach of faith. |
| `-ism` | System of doctrine | *fīdēs* + *-isme* | [[fideism]] | The doctrine that religious truth rests solely on faith. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| ⚖️ **Law & Jurisprudence** | [[fiduciary]], [[affidavit]], [[bona fide]], [[mala fide]], [[uberrima fides]] | **Fiduciary duty** represents the highest legal standard of care in corporate governance and trusts. **Affidavits** are written testimony executed under sworn oath before an officer of the court. **Uberrima fides** ("utmost good faith") is the foundational doctrine of maritime and insurance law requiring full material disclosure. |
| 🔬 **Science & Statistics** | [[fiducial]], [[confidence]], [[fidelity]] | **Fiducial markers** are fixed reference points on printed circuit boards or patient imaging scans that allow optical and surgical instruments to calibrate spatial coordinates. **Confidence intervals** define the statistical probability range within which a population parameter lies. |
| 🔊 **Acoustics & Technology** | [[fidelity]], [[high-fidelity (hi-fi)]] | Describes the exactness and precision with which an audio recording or visual system reproduces the authentic sound waves or photonic data of the original performance. |
| 🏛️ **Military, Heraldry & History** | [[semper fidelis]], [[fealty]], [[defy]], [[defiance]] | The motto *Semper Fidelis* encapsulates the institutional ethos of the US Marine Corps. **Fealty** structured the entire vassal-lord contract of medieval European feudalism. **Defiance** originated as the formal legal act of breaking the feudal bond. |
| 🧠 **Psychology & Interpersonal Dynamics** | [[confidence]], [[diffident]], [[confide]], [[confidant]], [[infidelity]] | Explores the psychological spectrum from inner self-assurance (**confidence**) to paralyzing social anxiety (**diffidence**), the emotional vulnerability of sharing secrets with a **confidant**, and the traumatic dissolution of relational bonds (**infidelity**). |
| ⛪ **Theology & Philosophy** | [[faith]], [[fideism]], [[sola fide]], [[infidel]] | **Fideism** (exemplified by Tertullian and Kierkegaard) argues that spiritual truth transcends human reason. **Sola fide** was Martin Luther's central Reformation doctrine of justification by faith alone. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affidavit]] | noun | **1.** Written declaration made under oath; a written statement sworn to be true before someone legally authorized to administer an oath. | *"Will you do me the favour to mention (as it may interest her) that I have something to tell her on her return in reference to the person who copied the affidavit in the Chancery suit, which so powerfully stimulated her curiosity."* — Charles Dickens, *Bleak House* |
| [[confidant]] | noun | **1.** Someone to whom private matters are confided. | *"So reasoned Edmund, till his father made him the confidant of a scheme which placed Fanny’s chance of seeing the second lieutenant of H.M.S."* — Jane Austen, *Mansfield Park* |
| [[confidante]] | noun | **1.** A female confidant. | *"Liddy,” she said, with a lighter heart, for youth and hope had begun to reassert themselves; “you are to be my confidante for the present—somebody must be—and I choose you."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[confide]] | verb | **1.** Reveal in private; tell confidentially.<br>**2.** Confer a trust upon. | *"It was so delightful to know that she could confide in me and like me!"* — Charles Dickens, *Bleak House* |
| [[confidence]] | noun | **1.** Freedom from doubt; belief in yourself and your abilities.<br>**2.** A feeling of trust (in someone or something). | *"Upon thy certainty and confidence What dar’st thou venture?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confident]] | adjective | **1.** Having or marked by confidence or assurance.<br>**2.** Persuaded of; very sure. | *"I do think I saw’t this morning; confident I am Last night ’twas on mine arm; I kiss’d it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confidential]] | adjective | **1.** Entrusted with private information and the confidence of another.<br>**2.** (of information) given in confidence or in secret. | *"Leonore, entering, greeted one after the other in such an engaging, confidential way that she made them feel as if they were old friends."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[confidentiality]] | noun | **1.** The state of being secret.<br>**2.** Discretion in keeping secret information. | *"I've screened my recollections so as to honor my commitments to confidentiality."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[confidentially]] | adverb | **1.** In a confidential manner. | *"Do you know that, Kurt," he said confidentially, "I only wonder how she could get hold of such a basket full, you know, without being--you know--" With this he made the unmistakable motion of Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[confidently]] | adverb | **1.** With confidence; in a confident manner. | *"None better than to let him fetch off his drum, which you hear him so confidently undertake to do."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confiding]] | verb | **1.** Reveal in private; tell confidentially.<br>**2.** Confer a trust upon. | *"Next comes his sister Mea, whose fault is that she is too submissive and confiding."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[confidingly]] | adverb | **1.** With trust; in a trusting manner. | *"Skimpole gaily, innocently, and confidingly as he looked at his drawing with his head on one side, “here you see me utterly incapable of helping myself, and entirely in your hands!"* — Charles Dickens, *Bleak House* |
| [[diffidence]] | noun | **1.** Lack of self-confidence. | *"We have been guided by thee hitherto, And of thy cunning had no diffidence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diffident]] | adjective | **1.** Showing modest reserve.<br>**2.** Lacking self-confidence. | *"When she left off—and she had not laughed languidly, but with real enjoyment—I said, in my diffident way with her,— “I hope I may suppose that you would not be amused if they did me any harm.” “No, no you may be sure of that,” said Estella."* — Charles Dickens, *Great Expectations* |
| [[diffidently]] | adverb | **1.** In a diffident manner. | *"’Tis a very noble quality in ye.” “Heh-heh! well, I wish to noise nothing abroad—nothing at all,” murmured Poorgrass, diffidently."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fidelity]] | noun | **1.** Accuracy with which an electronic system reproduces the sound or image of its input signal.<br>**2.** The quality of being faithful. | *"By my fidelity, this is not well, Master Ford, this wrongs you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fiducial]] | adjective | **1.** Relating to or of the nature of a legal trust (i.e. the holding of something in trust for another).<br>**2.** Used as a fixed standard of reference for comparison or measurement. | *"In academic literature, fiducial designates relating to or of the nature of a legal trust (i.e. the holding of something in trust for another)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fiduciary]] | noun | **1.** A person who holds assets in trust for a beneficiary.<br>**2.** Relating to or of the nature of a legal trust (i.e. the holding of something in trust for another). | *"Fiduciary money, metal and paper 6."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[infidel]] | noun | **1.** A person who does not acknowledge your god. | *"What a pagan rascal is this, an infidel!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infidelity]] | noun | **1.** The quality of being unfaithful. | *"A----, who professed infidelity, and who was, I think, as near an atheist as any I ever met."* — Classic Author, *The wonders of prayer* |
| [[overconfidence]] | noun | **1.** Total certainty or greater certainty than circumstances warrant. | *"In academic literature, overconfidence designates total certainty or greater certainty than circumstances warrant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overconfident]] | adjective | **1.** Marked by excessive confidence. | *"In academic literature, overconfident designates marked by excessive confidence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfidious]] | adjective | **1.** Tending to betray; especially having a treacherous character as attributed to the carthaginians by the romans. | *"He’s quoted for a most perfidious slave, With all the spots o’ the world tax’d and debauch’d: Whose nature sickens but to speak a truth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perfidiously]] | adverb | **1.** In a perfidious manner. | *"On ordinary occasions it might not be exerted with the requisite firmness, and on extraordinary occasions it might be perfidiously abused."* — Alexander Hamilton, *The Federalist Papers* |
| [[perfidiousness]] | noun | **1.** Betrayal of a trust. | *"In academic literature, perfidiousness designates betrayal of a trust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfidy]] | noun | **1.** Betrayal of a trust.<br>**2.** An act of deliberate betrayal. | *"By my soul, the countenance of that fellow when he was a boy was the blackest image of perfidy, cowardice, and cruelty ever set up as a scarecrow in a field of scoundrels."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Faith]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FID
  </div>
</div>
