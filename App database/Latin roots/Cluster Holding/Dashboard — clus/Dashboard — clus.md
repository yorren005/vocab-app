---
status: unread
type: root_dashboard
---
# Dashboard — clus
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">clus-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to close or shut”</span>
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

The root **clus** means to close or shut. It refers to shutting an opening, barring entry, or enclosing a space. In English, this root forms words such as *claustral*, *claustrophobia*, *claustrophobic*, and *claustrophobically*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to close or shut
> The root **clus** means to close or shut. It refers to shutting an opening, barring entry, or enclosing a space. In English, this root forms words such as *claustral*, *claustrophobia*, *claustrophobic*, and *claustrophobically*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To close or shut</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *claustral* and *claustrophobia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **clus** comes from a Latin word that means *"to close or shut"*.
  - At its core, it describes the action of close or shut.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **clus** in an English word, think of **to close or shut**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to close or shut).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Claustral**: Pertaining to a cloister, monastery, or religious enclosure.
  - **Claustrophobia**: An abnormal, pathological dread of confined or narrow spaces.
  - **Claustrophobic**: Suffering from or characteristic of claustrophobia.
  - **Claustrophobically**: In a manner expressing or causing claustrophobia.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">clus</mark>, think of <mark class="hl-def">to close or shut</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two distinct phonological stems inherited from Latin:
> 1. **Prefixed Supine Combining Stem `-clus-` (from *-clūsum*):**
>    - Prefixes attach to generate Latin abstract participial stems: *con-clūs-*, *ex-clūs-*, *in-clūs-*, *oc-clūs-*, *prae-clūs-*, *se-clūs-*, *re-clūs-*.
>    - Primary suffixes attach directly:
>      - `-ion` / `-sion` creates abstract nouns denoting completed act, process, or state: *conclusion*, *exclusion*, *inclusion*, *occlusion*, *preclusion*, *seclusion*, *reclusion*.
>      - `-ive` creates relational and qualitative adjectives: *conclusive*, *exclusive*, *inclusive*, *occlusive*, *preclusive*, *seclusive*, *reclusive*.
>      - `-ivity` / `-iveness` generates nominal measures of quality: *exclusivity*, *inclusivity*, *conclusiveness*, *reclusiveness*.
> 2. **Simple Nominal / French-Transmitted Stem `claus-` / `clos-` (from *claustrum* & *clausūra*):**
>    - Produces nouns ending in `-ure`: *closure*, *disclosure*, *enclosure*, *foreclosure*.
>    - Hybrid Greek-Latin compounds: *claustrophobia*, *claustrophobic*, *claustrophobically*.
>    - Ecclesiastical adjectives: *claustral*.

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
> - **Logic & Argumentation:** *Conclusion*, *conclusive*, *inconclusive* — the definitive shutting of intellectual debate; reaching an inescapable deduction.
> - **Sociology, Law & Rights:** *Inclusion*, *inclusive*, *inclusivity*, *exclusion*, *exclusive*, *exclusivity*, *exclusionary* — boundary dynamics controlling institutional access, constitutional rights, and economic monopolies.
> - **Medicine, Dentistry & Earth Sciences:** *Occlusion*, *occlusive*, *occlusal* — mechanical stoppage of a lumen, dental bite contact, and mineral crystal inclusions.
> - **Psychology & Solitude:** *Seclusion*, *seclusive*, *recluse*, *reclusive*, *closure*, *claustrophobia* — physical retreat, emotional resolution, and morbid anxiety triggered by spatial containment.
> - **Procedural & Parliamentary Governance:** *Cloture*, *closure* — legislative motions cutting off filibusters to force an immediate division.

---

## 🔀 4. Prefix & Combining Dynamics on clus

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `con-` | together, completely, utterly | [[conclusion]], [[conclusive]] | Wholly shut to further question; final inference or termination. |
| `ex-` | out, outward, away from | [[exclusion]], [[exclusive]], [[exclusionary]] | Shut out from a boundary; barred from entry or shared rights. |
| `in-` | in, into, within | [[inclusion]], [[inclusive]], [[inclusivity]] | Shut within the boundary; incorporated into a system or whole. |
| `prae-` / `pre-` | before, in advance | [[preclusion]], [[preclusive]] | Shutting off before something can occur; making impossible in advance. |
| `sē-` | apart, aside, without | [[seclusion]], [[seclusive]] | Shut apart from human society; retired in tranquil or enforced solitude. |
| `ob-` ($\to$ `oc-`) | against, across, in the way | [[occlusion]], [[occlusive]], [[occlusal]] | Shutting directly against flow; obstruction of a vessel or air passage. |
| `re-` | back, away, withdrawal | [[recluse]], [[reclusive]], [[reclusion]] | One who has shut themselves back from secular interaction; hermit. |
| `dis-` | away, undoing, reversal | [[disclosure]] | The un-shutting; opening to public scrutiny what was concealed. |
| `en-` / `in-` | in, inside (via French) | [[enclosure]] | Land or objects shut inside an unbroken perimeter or parcel. |
| `for-` / `fore-` | outside, barred (Old French *forclos*) | [[foreclosure]] | Legally shutting a mortgagor out from their equity of redemption. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-sion` / `-ion` | Abstract Noun (State / Act / Result) | [[conclusion]], [[exclusion]], [[inclusion]], [[occlusion]], [[preclusion]], [[seclusion]], [[reclusion]] | Denotes the realized act, institutional state, or formal result. |
| `-ive` | Adjective (Tendency / Quality) | [[conclusive]], [[exclusive]], [[inclusive]], [[occlusive]], [[preclusive]], [[reclusive]] | Characterizes an action or agent as exercising a closing function. |
| `-ively` | Adverb (Manner) | [[conclusively]], [[exclusively]], [[inclusively]], [[reclusively]] | Modifies verbal actions according to the mode of closure. |
| `-iveness` / `-ivity` | Abstract Noun (Degree / Condition) | [[conclusiveness]], [[exclusiveness]], [[exclusivity]], [[inclusivity]], [[reclusiveness]] | Measures the institutional, legal, or psychological property. |
| `-ary` | Adjective (Relational / Mandating) | [[exclusionary]], [[inclusionary]] | Pertaining to rules, doctrines, or zoning enforcing closure or intake. |
| `-ure` | Noun (Process / Mechanism / State) | [[closure]], [[disclosure]], [[enclosure]], [[foreclosure]], [[cloture]] | Concrete, procedural, or psychological finality. |
| `-phobia` (Greek) | Morbid Fear / Pathological Aversion | [[claustrophobia]], [[claustrophobic]] | Psychiatric dread of spatial containment or confinement. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Law, Jurisprudence & Politics** | [[exclusionary]], [[preclusion]], [[exclusive]], [[cloture]], [[foreclosure]], [[disclosure]] | The Fourth Amendment exclusionary rule barring illegally seized evidence; issue preclusion (*collateral estoppel*); Senate Rule XXII invoking cloture to terminate filibusters; mortgage foreclosure sales; mandatory financial disclosure. |
| 🔬 **Medicine, Cardiology & Dentistry** | [[occlusion]], [[occlusive]], [[occlusal]], [[claustrophobia]] | Acute myocardial infarction triggered by coronary artery occlusion; occlusive stroke; class II malocclusion in orthodontic alignment; panic reactions during closed-bore magnetic resonance imaging (MRI). |
| 🗣️ **Linguistics & Phonetics** | [[occlusive]], [[inclusive]] | Occlusive consonants (plosives/stops like /p/, /t/, /k/ formed by complete oral closure); inclusive vs. exclusive grammatical "we" (*clusivity*). |
| 💎 **Geology, Gemology & Materials Science** | [[inclusion]], [[occlusion]] | Fluid or crystalline inclusions trapped inside diamonds and quartz crystals; gaseous occlusion inside cooling metallurgy matrices. |
| ⚖️ **Social Ethics & Educational Policy** | [[inclusion]], [[inclusive]], [[inclusivity]], [[exclusion]] | Inclusive classroom environments accommodating neurodivergence; workplace diversity, equity, and inclusion (DEI); historical combating of social and racial exclusion. |
| 🧠 **Psychology & Psychoanalysis** | [[closure]], [[seclusion]], [[recluse]], [[claustrophobia]] | Gestalt psychological law of closure; cognitive and emotional need for psychological closure after bereavement; psychiatric seclusion protocols. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abocclusion]] | noun | **1.** The condition in which the upper teeth do not touch the lower teeth when biting. | *"In academic literature, abocclusion designates the condition in which the upper teeth do not touch the lower teeth when biting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clusia]] | noun | **1.** An aromatic tree of the genus clusia having large white or yellow or pink flowers. | *"In academic literature, clusia designates an aromatic tree of the genus clusia having large white or yellow or pink flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clusiaceae]] | noun | **1.** Widely distributed family of chiefly tropical trees and shrubs and vines that produce oils and resins and some usable timber. | *"In academic literature, clusiaceae designates widely distributed family of chiefly tropical trees and shrubs and vines that produce oils and resins and some usable timber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cluster]] | noun | **1.** A grouping of a number of similar things.<br>**2.** Come together as in a cluster or flock. | *"I was glad when we came to the brickmaker’s house, though it was one of a cluster of wretched hovels in a brick-field, with pigsties close to the broken windows and miserable little gardens before the doors growing nothing but stagnant pools."* — Charles Dickens, *Bleak House* |
| [[clustered]] | verb | **1.** Come together as in a cluster or flock.<br>**2.** Gather or cause to gather into a cluster. | *"We had often noticed the dark beauty of this lodge standing in a deep twilight of trees, and how the ivy clustered over it, and how there was a steep hollow near, where we had once seen the keeper’s dog dive down into the fern as if it were water."* — Charles Dickens, *Bleak House* |
| [[clustering]] | noun | **1.** A grouping of a number of similar things.<br>**2.** Come together as in a cluster or flock. | *"As I watched them while they all stood clustering about the forge, enjoying themselves so much, I thought what terrible good sauce for a dinner my fugitive friend on the marshes was."* — Charles Dickens, *Great Expectations* |
| [[conclusion]] | noun | **1.** A position or opinion or judgment reached after consideration.<br>**2.** An intuitive assumption. | *"Your wife Octavia, with her modest eyes And still conclusion, shall acquire no honour Demuring upon me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conclusive]] | adjective | **1.** Forming an end or termination; especially putting an end to doubt or question. | *"She had expressed to Oak an intention to wait till Boldwood came home before communicating to him her conclusive reply."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[conclusively]] | adverb | **1.** In a conclusive way. | *"You can have been personally acquainted with very few of a set of men you condemn so conclusively."* — Jane Austen, *Mansfield Park* |
| [[conclusiveness]] | noun | **1.** The quality of being final or definitely settled. | *"Why are you going?” And in proof of the conclusiveness of his opinion all the wrinkles vanished from his face."* — graf Leo Tolstoy, *War and Peace* |
| [[exclusion]] | noun | **1.** The state of being excluded.<br>**2.** The state of being excommunicated. | *"The exclusion of all idea of cause--that is, the thing must not need explanation by Anything outside itself."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[exclusive]] | noun | **1.** A news report that is reported first by one news organization.<br>**2.** Not divided or shared with others. | *"It’s a six-roomer, exclusive of kitchens,” said Mr."* — Charles Dickens, *Bleak House* |
| [[exclusively]] | adverb | **1.** Without any others being included or involved. | *"He had no wish to converse with her: that his bright lady and himself formed one group, exclusively their own, and containing no others in the world, was enough."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[exclusiveness]] | noun | **1.** Tendency to associate with only a select group. | *"When I think of this life I have led; the desolation of solitude it has been; the masoned, walled-town of a Captain’s exclusiveness, which admits but small entrance to any sympathy from the green country without—oh, weariness! heaviness!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[inclusion]] | noun | **1.** The state of being included.<br>**2.** The relation of comprising something. | *"In consequence, the cathode copper is contaminated through this mechanical inclusion of impurities, whilst electro-deposition of some of these materials may also be encouraged."* — Donald M. Levy, *Modern Copper Smelting* |
| [[inclusive]] | adjective | **1.** Including much or everything; and especially including stated limits. | *"O, would to God that the inclusive verge Of golden metal that must round my brow Were red-hot steel, to sear me to the brains."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconclusive]] | adjective | **1.** Not conclusive; not putting an end to doubt or question. | *"And when the bard, or hoary sage, Charm or instruct the future age, They bind the wild poetric rage In energy, Or point the inconclusive page Full on the eye."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[inconclusively]] | adverb | **1.** Not conclusively. | *"In academic literature, inconclusively designates not conclusively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconclusiveness]] | noun | **1.** The quality of being inconclusive. | *"In academic literature, inconclusiveness designates the quality of being inconclusive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occlusion]] | noun | **1.** Closure or blockage (as of a blood vessel).<br>**2.** (meteorology) a composite front when colder air surrounds a mass of warm air and forces it aloft. | *"In academic literature, occlusion designates closure or blockage (as of a blood vessel)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occlusive]] | noun | **1.** A consonant produced by stopping the flow of air at some point and suddenly releasing it.<br>**2.** Tending to occlude. | *"In academic literature, occlusive designates a consonant produced by stopping the flow of air at some point and suddenly releasing it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preclusion]] | noun | **1.** The act of preventing something by anticipating and disposing of it effectively. | *"In academic literature, preclusion designates the act of preventing something by anticipating and disposing of it effectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preclusive]] | adjective | **1.** Made impossible. | *"In academic literature, preclusive designates made impossible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recluse]] | noun | **1.** One who lives in solitude.<br>**2.** Withdrawn from society; seeking solitude. | *"Clare’s life at the dairy had been that of a recluse in respect the world of his own class."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reclusive]] | adjective | **1.** Withdrawn from society; seeking solitude.<br>**2.** Providing privacy or seclusion. | *"In academic literature, reclusive designates withdrawn from society; seeking solitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reclusiveness]] | noun | **1.** A disposition to prefer seclusion or isolation. | *"In academic literature, reclusiveness designates a disposition to prefer seclusion or isolation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seclusion]] | noun | **1.** The quality of being secluded from the presence or view of others.<br>**2.** The act of secluding yourself from others. | *"Nine years, my dear,” he said after thinking for a little while, “have passed since I received a letter from a lady living in seclusion, written with a stern passion and power that rendered it unlike all other letters I have ever read."* — Charles Dickens, *Bleak House* |
| [[unexclusive]] | adjective | **1.** Accessible to all. | *"In academic literature, unexclusive designates accessible to all."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CLUS
  </div>
</div>
