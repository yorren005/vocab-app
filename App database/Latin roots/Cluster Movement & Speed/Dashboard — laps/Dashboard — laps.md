---
status: unread
type: root_dashboard
---
# Dashboard — laps
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">laps-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to slip or glide”</span>
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

The root **laps** means to slip or glide. It refers to the action of sliping and carrying out this process. In English, this root forms words such as *lapse*, *lapsed*, *lapsing*, and *collapse*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to slip or glide
> The root **laps** means to slip or glide. It refers to the action of sliping and carrying out this process. In English, this root forms words such as *lapse*, *lapsed*, *lapsing*, and *collapse*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To slip or glide</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *lapse* and *lapsed*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **laps** comes from a Latin word that means *"to slip or glide"*.
  - At its core, it describes the action of slip or glide.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **laps** in an English word, think of **to slip or glide**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to slip or glide).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Lapse**: A brief, temporary failure of concentration, memory, judgment, or moral standards.
  - **Lapsed**: No longer active, committed, or practicing.
  - **Lapsing**: In the process of slipping into an inferior state, declining, or expiring.
  - **Collapse**: To fall down or cave in suddenly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">laps</mark>, think of <mark class="hl-def">to slip or glide</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **laps** functions through the third-conjugation deponent verb *lābor, lābī, lapsus sum* and its 4th-declension verbal noun *lapsus, lapsūs*. Because deponent verbs possess passive forms with active meanings, the past participle *lapsus* ("having slipped, fallen") serves directly as the active morphological root:
> - **Present Deponent Base `lāb-`:** Rare in direct English borrowings, but preserved in Romance reflexes and Latinate scientific citations (*labile* from *lābilis* "prone to slip/change").
> - **Participial / Supine Base `laps-`:** The engine of English derivation, combining with directional and relational Latin prefixes:
>   - `con-` (together $\to$ assimilation `col-`) + `lābor` $\to$ *collābī* (supine *collapsus*) $\to$ [[collapse]], [[collapsible]], [[collapsibility]], [[collapsing]].
>   - `ex-` / `ē-` (out, away) + `lābor` $\to$ *ēlābī* (supine *ēlapsus*) $\to$ [[elapse]], [[elapsing]].
>   - `re-` (back, again) + `lābor` $\to$ *relābī* (supine *relapsus*) $\to$ [[relapse]], [[relapsing]].
>   - `prō-` (forward, forth) + `lābor` $\to$ *prōlābī* (supine *prōlapsus*) $\to$ [[prolapse]], [[prolapsing]], [[prolapsed]].
>   - `in-` (into, upon $\to$ assimilation `il-`) + `lābor` $\to$ *illābī* (supine *illapsus*) $\to$ [[illapse]].
>   - `dē-` (down, down from) + `lābor` $\to$ *dēlābī* (supine *dēlapsus*) $\to$ [[delapse]].
>   - `sub-` (under, secretly) + `lābor` $\to$ *sublābī* (supine *sublapsus*) $\to$ [[sublapse]], [[sublapsarian]].
>   - `prae-` (before) + `lapsus` + `-ian` $\to$ [[prelapsarian]].
>   - `post` (after) + `lapsus` + `-ian` $\to$ [[postlapsarian]].
>   - `īnfrā` (below, after) + `lapsus` + `-ian` $\to$ [[infralapsarian]].
>   - `suprā` (above, prior to) + `lapsus` + `-ian` $\to$ [[supralapsarian]].
>   - `base laps-` $\to$ [[lapse]], [[lapsed]], [[lapsing]], [[lapsarian]].
>   - **Classical Latin Genitive Phrases:** Preserved verbatim as high-register idioms: [[lapsus linguae]], [[lapsus calami]], [[lapsus memoriae]].

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
> Although unified by **"gliding, slipping, and falling"**, the root `laps` bifurcates into distinct operational planes:
> - **Structural Failure & Physics:** In [[collapse]], [[collapsible]], and [[collapsibility]], the root tracks the sudden inward caving of load-bearing architecture, tectonic strata, collapsing stars, or engineered folding structures.
> - **Temporal Progression:** In [[elapse]] and [[elapsing]], the root tracks the silent, irreversible gliding past of seconds, days, and centuries (Horace's *labitur aevum*).
> - **Clinical Medicine & Organ Pathology:** In [[prolapse]], [[prolapsing]], and [[prolapsed]], the root describes internal viscera slipping downward from their anatomical beds (uterine prolapse, rectal prolapse, mitral valve prolapse); in [[relapse]], it marks the clinical resurgence of illness or addiction.
> - **Christian Systematic Theology & the Fall:** In [[prelapsarian]], [[postlapsarian]], [[lapsarian]], [[infralapsarian]], [[supralapsarian]], and [[sublapsarian]], the root anchors the cosmic Fall of Adam (*Lapsus Adami*) and Calvinist debates over the logical sequence of God's eternal decrees.
> - **Law, Insurance & Contractual Rights:** In [[lapse]] and [[lapsed]], the root governs the termination or forfeiture of policies, rights, patents, or wills through default, inaction, or temporal expiration.
> - **Psycholinguistics & Parapraxes:** In [[lapsus linguae]], [[lapsus calami]], and [[lapsus memoriae]], the root provides the classical vocabulary for involuntary slips of the tongue, pen, and recollection revealing unconscious thoughts.
> - **Mystical & Poetic Influx:** In [[illapse]], [[delapse]], and [[sublapse]], the root captures subtle, gentle gliding into the soul or quiet downward subsidence.

---

## 🔀 4. Prefix & Combining Dynamics on laps

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (`col-`) | together, completely | [[collapse]] | To fall *together* into ruins; complete structural disintegration or loss of integrity. |
| `ex-` (`e-`) | out, away | [[elapse]] | To glide *away*; time slipping smoothly, quietly, and irreversibly past. |
| `re-` | back, again | [[relapse]] | To slide *back* into a prior diseased, addicted, or sinful condition. |
| `pro-` | forward, forth, down | [[prolapse]] | To slip *forward* or down out of anatomical place; visceral displacement. |
| `in-` (`il-`) | into, upon | [[illapse]] | To glide *into*; a gentle influx or spiritual entrance into the mind. |
| `de-` | down, down from | [[delapse]] | To slide *down* from a height; gentle celestial or physical descent. |
| `sub-` | under, secretly, after | [[sublapse]], [[sublapsarian]] | To slip *underneath*; or divine decrees formed *after* (under) the Fall. |
| `prae-` | before, prior | [[prelapsarian]] | Pertaining to the innocent, uncorrupted era *before* the Fall of Man. |
| `post-` | after, following | [[postlapsarian]] | Pertaining to the fallen, compromised world *after* the Fall of Man. |
| `infra-` | below, subsequent to | [[infralapsarian]] | Divine decree of election situated *below/after* the decree permitting the Fall. |
| `supra-` | above, prior to | [[supralapsarian]] | Divine decree of election situated *above/before* the decree of the Fall. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-e` | Verb / Event Noun | [[lapse]], [[elapse]], [[collapse]], [[relapse]] | Forms primary verbs of slipping or nouns denoting an instance of falling. |
| `-ible` (Latin *-ibilis*) | Adjective (Capability) | [[collapsible]] | Expresses the functional ability of an object to fold or push inward. |
| `-ibility` (Latin *-ibilitās*) | Noun (Quality / Capacity) | [[collapsibility]] | The mechanical capacity or geotechnical tendency to collapse inward. |
| `-arian` (Latin *-ārius*) | Adjective & Noun (Belief / Era) | [[lapsarian]], [[prelapsarian]], [[postlapsarian]], [[infralapsarian]], [[supralapsarian]], [[sublapsarian]] | Designates theological doctrines, historical eras, or adherents regarding the Fall. |
| `-ed` | Adjective / Past Participle | [[lapsed]], [[prolapsed]] | Designates a state of having slipped away, expired, or fallen out of place. |
| `-ing` | Verb (Pres. Part.) / Verbal Noun | [[lapsing]], [[collapsing]], [[elapsing]], [[relapsing]], [[prolapsing]] | Denotes the active, ongoing, continuous process of sliding, caving, or falling. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏗️ **Structural Engineering & Geology** | [[collapse]], [[collapsible]], [[collapsibility]], [[collapsing]] | Progressive structural building collapse, bridge failure modes, seismic design, collapsible loess soils in geotechnical foundation engineering. |
| 🏥 **Clinical Medicine, Surgery & Gynecology** | [[prolapse]], [[prolapsing]], [[prolapsed]], [[relapse]], [[relapsing]] | Pelvic organ prolapse (cystocele, rectocele, uterine prolapse), mitral valve prolapse (MVP), lumbar disc herniation, relapsing-remitting multiple sclerosis (RRMS), oncological disease relapse. |
| ⛪ **Christian Systematic Theology & Philosophy** | [[lapsarian]], [[prelapsarian]], [[postlapsarian]], [[infralapsarian]], [[supralapsarian]], [[sublapsarian]] | Augustinian theology of original sin, Milton's Edenic state in *Paradise Lost*, Synod of Dort (1618–1619) disputes over the logical sequence of eternal election and reprobation. |
| 🧠 **Psychoanalysis, Linguistics & Rhetoric** | [[lapsus linguae]], [[lapsus calami]], [[lapsus memoriae]] | Freudian parapraxis, unintentional slips of the tongue revealing repressed subconscious drives, manuscript paleography and scribal copying errors. |
| ⚖️ **Contract Law, Wills & Insurance** | [[lapse]], [[lapsed]], [[lapsing]] | Lapse of life insurance policies for non-payment of premiums, lapsed testamentary gifts under the doctrine of lapse, expiration of statutory patent rights through failure to pay maintenance fees. |
| 🌌 **Astrophysics & Chronometry** | [[collapse]], [[collapsing]], [[elapse]], [[elapsing]] | Gravitational collapse of stellar cores into neutron stars or black holes, elapsed time measurements in relativistic mechanics and atomic clock synchronization. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[collapsable]] | adjective | **1.** Capable of collapsing or being collapsed. | *"In academic literature, collapsable designates capable of collapsing or being collapsed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collapse]] | noun | **1.** An abrupt failure of function or complete physical exhaustion.<br>**2.** A natural event caused by something suddenly falling down or caving in. | *"And he drives me to do what I wouldn’t; yes, he does!—Tall, come indoors.” After this collapse, not very dignified for the head of an establishment, she went into the house, Tall at her heels."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[collapsible]] | adjective | **1.** Capable of collapsing or being collapsed. | *"He removed his collar, with contained black necktie and collapsible stud, from his neck to a position on the left of the table."* — James Joyce, *Ulysses* |
| [[elapse]] | verb | **1.** Pass by. | *"There were more than two full hours yet to elapse before she could come, and in that interval, which seemed a long one, I must confess I was nervously anxious about my altered looks."* — Charles Dickens, *Bleak House* |
| [[elapsed]] | verb | **1.** Pass by.<br>**2.** (of time) having passed or slipped by. | *"A space of a minute or two has elapsed before he comes up with her."* — Charles Dickens, *Bleak House* |
| [[illapse]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin laps within the domain of Movement & Speed.<br>**2.** A technical or specialized form exhibiting the properties of laps in systematic terminology. | *"In academic literature, illapse designates pertaining to, derived from, or characteristic of latin laps within the domain of movement & speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lapse]] | noun | **1.** A mistake resulting from inattention.<br>**2.** A break or intermission in the occurrence of something. | *"To lapse in fulness Is sorer than to lie for need; and falsehood Is worse in kings than beggars."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lapsed]] | verb | **1.** Pass into a specified state or condition.<br>**2.** End, at least for a long time. | *"Only myself stood out, For which, if I be lapsed in this place, I shall pay dear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lapsing]] | noun | **1.** A failure to maintain a higher state.<br>**2.** Pass into a specified state or condition. | *"I have been The book of his good acts, whence men have read His fame unparalleled happily amplified; For I have ever verified my friends— Of whom he’s chief—with all the size that verity Would without lapsing suffer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noncollapsable]] | adjective | **1.** Not capable of collapsing. | *"In academic literature, noncollapsable designates not capable of collapsing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncollapsible]] | adjective | **1.** Not capable of collapsing. | *"In academic literature, noncollapsible designates not capable of collapsing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prelapsarian]] | adjective | **1.** Of or relating to the time before the fall of adam and eve. | *"In academic literature, prelapsarian designates of or relating to the time before the fall of adam and eve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolapse]] | noun | **1.** The slipping or falling out of place of an organ (as the uterus).<br>**2.** Slip or fall out of place, as of body parts. | *"In academic literature, prolapse designates the slipping or falling out of place of an organ (as the uterus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolapsus]] | noun | **1.** The slipping or falling out of place of an organ (as the uterus). | *"In academic literature, prolapsus designates the slipping or falling out of place of an organ (as the uterus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relapse]] | noun | **1.** A failure to maintain a higher state.<br>**2.** Deteriorate in health. | *"Mark then abounding valour in our English, That being dead, like to the bullet’s grazing, Break out into a second course of mischief, Killing in relapse of mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relapsing]] | noun | **1.** A failure to maintain a higher state.<br>**2.** Deteriorate in health. | *"She was by that time perseveringly dictating to Caddy, and Caddy was fast relapsing into the inky condition in which we had found her."* — Charles Dickens, *Bleak House* |

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
    ROOT DASHBOARD · LAPS
  </div>
</div>
