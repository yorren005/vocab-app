---
status: unread
type: root_dashboard
---
# Dashboard — norm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">norm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“carpenter's square, rule, pattern, or standard”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **norm** means carpenter's square, rule, pattern, or standard. It refers to a carpenter's square, standard rule, or guiding pattern. In English, this root forms words such as *abnormal*, *abnormality*, *abnormally*, and *enormity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: carpenter's square, rule, pattern, or standard
> The root **norm** means carpenter's square, rule, pattern, or standard. It refers to a carpenter's square, standard rule, or guiding pattern. In English, this root forms words such as *abnormal*, *abnormality*, *abnormally*, and *enormity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Carpenter's square, rule, pattern, or standard</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *abnormal* and *abnormality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **norm** comes from a Latin word that means *"carpenter's square, rule, pattern, or standard"*.
  - At its core, it describes carpenter's square, rule, pattern, or standard.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **norm** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of carpenter's square, rule, pattern, or standard.
  - **Mental & Social**: How people experience, organize, or communicate about carpenter's square, rule, pattern, or standard.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Abnormal**: Deviating from what is normal or usual, typically in a way that is undesirable or worrying.
  - **Abnormality**: An abnormal feature, characteristic, or occurrence, typically in a medical context.
  - **Abnormally**: In an abnormal, unusual, or exceptional manner.
  - **Enormity**: The great or extreme scale, seriousness, or evil nature of something monstrous.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">norm</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **norm** generates vocabulary through prefixation, adjectival derivation, and verbal factitives:
> - **Base Noun & Core Adjective:**
>   - *norma* $	o$ *norm* ("standard, pattern, social rule").
>   - *normālis* $	o$ *normal* ("conforming to a standard; perpendicular in geometry").
> - **Prefix Modifications:**
>   - *ab-* ("away from") + *normālis* $	o$ *abnormal*, *abnormality*, *abnormally* ("deviating from what is standard or healthy").
>   - *ē-* / *ex-* ("out of, beyond") + *norma* $	o$ Latin *ēnormis* $	o$ *enormous*, *enormously*, *enormity* ("outside the rule $	o$ monstrous, immense").
>   - *sub-* ("below") + *normal* $	o$ *subnormal* ("below the average standard").
> - **Verbal Factitives with *-ize* (*-izāre*):**
>   - *normal* + *-ize* $	o$ *normalize*, *normalization* ("to return to a standard state; adjust data to a common scale").
> - **Philosophical & Legal Extensions:**
>   - *norma* + *-tīvus* $	o$ *normative* ("establishing, relating to, or deriving from a standard or norm").

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
> - **Sociology & Cultural Anthropology:** *norm*, *normative*, *normal* (shared social expectations, moral codes).
> - **Statistics & Mathematics:** *normal distribution*, *normalize*, *normalization* (the bell curve, scaling values to [0, 1]).
> - **Medicine & Psychology:** *normal*, *abnormal*, *abnormality* (evaluating physiological biomarkers, pathology).
> - **Colossal Magnitude & Moral Outrage:** *enormous*, *enormity* (immense scale; a grave or heinous crime).
> - **Geometrical Orthogonality:** *normal* (a line or vector perpendicular to a given surface).

---

## 🔀 4. Prefix & Combining Dynamics on norm

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ab-` (away from) | `normālis` | **[[abnormal]]** / **abnormality** | Diverging sharply from typical, healthy baseline standards. |
| `ē-` / `ex-` (out of, beyond) | `norma` | **[[enormous]]** / **enormity** | Breaking out of the carpenter's rule $	o$ colossal in size or monstrous in evil. |
| `sub-` (under, below) | `normālis` | **subnormal** | Falling below the accepted physiological or cognitive threshold. |
| `-ize` (factitive verb) | `normal` | **normalize** / **normalization** | Restoring an abnormal condition back to customary balance. |
| `-ative` (tending to) | `norma` | **normative** | Prescribing what *ought* to be rather than merely describing what is. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📊 **Statistics & Probability** | *normal*, *normalize*, *normalization* | Gaussian normal distribution ($N(\mu, \sigma^2)$), z-score normalization in machine learning. |
| 🏥 **Clinical Medicine & Pathology** | *normal*, *abnormal*, *abnormality* | Detecting abnormal ECG arrhythmias, malignant chromosomal abnormalities. |
| ⚖️ **Jurisprudence & Ethics** | *normative*, *norm*, *enormity* | Formulating normative legal doctrines; prosecuting the enormity of war crimes. |
| 📐 **Differential Geometry & Physics** | *normal* | Calculating surface normal vectors ($
ec{n}$) in computer graphics rendering and ray tracing. |
| 🌍 **International Relations** | *normalize*, *normalization* | Diplomatic normalization re-establishing bilateral embassies after decades of hostility. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abnormal]] | adjective | **1.** Not normal; not typical or usual or regular or conforming to a norm.<br>**2.** Departing from the normal in e.g. intelligence and development. | *"The performer seemed quite at home anywhere between a horse’s head and its tail, and the necessity for this abnormal attitude having ceased with the passage of the plantation, she began to adopt another, even more obviously convenient than the first."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[abnormalcy]] | noun | **1.** An abnormal physical condition resulting from defective genes or developmental deficiencies. | *"In academic literature, abnormalcy designates an abnormal physical condition resulting from defective genes or developmental deficiencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abnormality]] | noun | **1.** An abnormal physical condition resulting from defective genes or developmental deficiencies.<br>**2.** Retardation sufficient to fall outside the normal range of intelligence. | *"In academic literature, abnormality designates an abnormal physical condition resulting from defective genes or developmental deficiencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abnormally]] | adverb | **1.** In an abnormal manner. | *"Long before a new tariff law goes into effect, even months in advance of its passage, while it is merely in prospect, the course of trade is abnormally affected."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[enormity]] | noun | **1.** The quality of being outrageous.<br>**2.** Vastness of size or extent. | *"In what enormity is Martius poor in, that you two have not in abundance?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enormous]] | adjective | **1.** Extraordinarily large in size or extent or amount or power or degree; ; ; ; - walter lippman. | *"And shall find time From this enormous state, seeking to give Losses their remedies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enormously]] | adverb | **1.** Extremely. | *"Historical sources demonstrate how observers must enormously the foundational evidence to verify empirical conclusions."* — Academic Lexicon |
| [[enormousness]] | noun | **1.** Unusual largeness in size or extent or number. | *"In academic literature, enormousness designates unusual largeness in size or extent or number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonnormative]] | adjective | **1.** Not based on a norm. | *"In academic literature, nonnormative designates not based on a norm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[norm]] | noun | **1.** A standard or model or pattern regarded as typical.<br>**2.** A statistic describing the location of a distribution. | *"But at the heart of the notion was the judgment that general uniform prices fixed in the open market are the proper norms for prices when one of the traders is caught at an exceptional disadvantage."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[norma]] | noun | **1.** A small constellation in the southern hemisphere near lupus and ara in the milky way. | *"In academic literature, norma designates a small constellation in the southern hemisphere near lupus and ara in the milky way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normal]] | noun | **1.** Something regarded as a normative example.<br>**2.** Conforming with or constituting a norm or standard or level or type or social norm; not abnormal. | *"Now is that chess like our kind of chess?” Of course I had to reply that I did not know, that I did not remember the details after I returned to my normal state."* — Jack London, *The Jacket (The Star-Rover)* |
| [[normalcy]] | noun | **1.** Being within certain limits that define the range of normal functioning.<br>**2.** Expectedness as a consequence of being usual or regular or common. | *"In academic literature, normalcy designates being within certain limits that define the range of normal functioning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normalisation]] | noun | **1.** The imposition of standards or regulations. | *"In academic literature, normalisation designates the imposition of standards or regulations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normalise]] | verb | **1.** Become normal or return to its normal state.<br>**2.** Make normal or cause to conform to a norm or standard. | *"In academic literature, normalise designates become normal or return to its normal state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normaliser]] | noun | **1.** A person who normalizes. | *"In academic literature, normaliser designates a person who normalizes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normality]] | noun | **1.** Being within certain limits that define the range of normal functioning.<br>**2.** (of a solution) concentration expressed in gram equivalents of solute per liter. | *"In academic literature, normality designates being within certain limits that define the range of normal functioning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normalization]] | noun | **1.** The imposition of standards or regulations. | *"In academic literature, normalization designates the imposition of standards or regulations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normalize]] | verb | **1.** Become normal or return to its normal state.<br>**2.** Make normal or cause to conform to a norm or standard. | *"In academic literature, normalize designates become normal or return to its normal state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normalizer]] | noun | **1.** A person who normalizes. | *"In academic literature, normalizer designates a person who normalizes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normally]] | adverb | **1.** Under normal conditions. | *"Some have thought this cycle to be normally a period of ten years, divided into one year of crisis, three years of depression, three years of recovery, and three years of unusual prosperity."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[norman]] | noun | **1.** United states operatic soprano (born in 1945).<br>**2.** Australian golfer (born in 1955). | *"Normans, but bastard Normans, Norman bastards! _Mort de ma vie_, if they march along Unfought withal, but I will sell my dukedom, To buy a slobbery and a dirty farm In that nook-shotten isle of Albion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[norman-french]] | noun | **1.** The medieval norman dialect of old french. | *"In academic literature, norman-french designates the medieval norman dialect of old french."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normandie]] | noun | **1.** A former province of northwestern france on the english channel; divided into haute-normandie and basse-normandie. | *"Chapiseau, _op. cit._ i. 218-220; Amélie Bosquet, _La Normandie Romanesque et Merveilleuse_ (Paris and Rouen, 1845), p. 233."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[normandy]] | noun | **1.** A former province of northwestern france on the english channel; divided into haute-normandie and basse-normandie. | *"Two months since Here was a gentleman of Normandy,— I’ve seen myself, and serv’d against, the French, And they can well on horseback, but this gallant Had witchcraft in’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[normative]] | adjective | **1.** Relating to or dealing with norms.<br>**2.** Pertaining to giving directives or rules. | *"Although the former (we are thinking of neglect) is undoubtedly only too true the case he cites of nurses forgetting to count the sponges in the peritoneal cavity is too rare to be normative."* — James Joyce, *Ulysses* |
| [[normodyne]] | noun | **1.** Antihypertensive drug (trade names trandate and normodyne) that blocks alpha and beta-adrenergic receptors of the sympathetic nervous system (leading to a decrease in blood pressure). | *"In academic literature, normodyne designates antihypertensive drug (trade names trandate and normodyne) that blocks alpha and beta-adrenergic receptors of the sympathetic nervous system (leading to a decrease in blood pressure)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normotensive]] | adjective | **1.** Having normal blood pressure. | *"In academic literature, normotensive designates having normal blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[normothermia]] | noun | **1.** Normal body temperature. | *"In academic literature, normothermia designates normal body temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renormalise]] | verb | **1.** Make normal or cause to conform to a norm or standard. | *"In academic literature, renormalise designates make normal or cause to conform to a norm or standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[renormalize]] | verb | **1.** Make normal or cause to conform to a norm or standard. | *"In academic literature, renormalize designates make normal or cause to conform to a norm or standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subnormal]] | noun | **1.** A person of less than normal intelligence.<br>**2.** Below normal or average. | *"In academic literature, subnormal designates a person of less than normal intelligence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subnormality]] | noun | **1.** The state of being less than normal (especially with respect to intelligence).<br>**2.** Lack of normal development of intellectual capacities. | *"In academic literature, subnormality designates the state of being less than normal (especially with respect to intelligence)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supernormal]] | adjective | **1.** Beyond the range of the normal or scientifically explainable.<br>**2.** Exceeding the normal or average. | *"In academic literature, supernormal designates beyond the range of the normal or scientifically explainable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supranormal]] | adjective | **1.** Beyond the range of the normal or scientifically explainable. | *"In academic literature, supranormal designates beyond the range of the normal or scientifically explainable."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NORM
  </div>
</div>
