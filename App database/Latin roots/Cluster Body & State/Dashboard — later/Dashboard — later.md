---
status: unread
type: root_dashboard
---
# Dashboard — later
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">later-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“side”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body and its healthy or changing physical states.</span>
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

The root **later** means side. It refers to side, flank, facet, directional plane. In English, this root forms words such as *ambilateral*, *anterolateral*, *bilateral*, and *bilateralism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: side
> The root **later** means side. It refers to side, flank, facet, directional plane. In English, this root forms words such as *ambilateral*, *anterolateral*, *bilateral*, and *bilateralism*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Side</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *ambilateral* and *anterolateral*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **later** comes from a Latin word that means *"side"*.
  - At its core, it describes side.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **later** in an English word, think of **the human body and its conditions**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of side.
  - **Mental & Social**: How people experience, organize, or communicate about side.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ambilateral**: Relating to or affecting both sides of the body or a structure.
  - **Anterolateral**: Situated in the front and toward the side.
  - **Bilateral**: Having or affecting two sides.
  - **Bilateralism**: The conduct of political, economic, or diplomatic relations between two sovereign states.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">later</mark>, think of <mark class="hl-def">the human body and its conditions</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **later** operates across English morphology through:
> - **Nominal Stem:** *later-* (from the oblique cases: genitive *lateris*, dative *laterī*, accusative *latus*, ablative *latere*, plural *latera*).
> - **Adjectival Formative:** Latin *laterālis* (stem `laterāl-` → English *lateral*).
> - **Compounding with Numerical Prefixes:** *ūnus* ("one" → *unilateral*), *bi-* ("two" → *bilateral*), *tres* ("three" → *trilateral*), *quattuor / quadri-* ("four" → *quadrilateral*), *multus* ("many" → *multilateral*), *aequus* ("equal" → *equilateral*).
> - **Compounding with Positional / Relational Prefixes:** *com-* ("together, alongside" → *collateral*), *contrā* ("opposite" → *contralateral*), *ipse* ("same" → *ipsilateral*), *dorsum* ("back" → *dorsolateral*), *venter* ("belly" → *ventrolateral*), *ante* ("front" → *anterolateral*), *post* ("back" → *posterolateral*).
>
> English pairs *lateral* with geopolitical suffixes (*-ism*, *-ist*), neurological verbalizers (*-ize*, *-ization*), and adverbs (*-ly*).

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
> The family distributes across diverse political, geometrical, anatomical, and financial domains:
> - **Geopolitics & International Diplomacy:** [[unilateral]] (one-sided action), [[unilateralism]] (policy of acting alone), [[bilateral]] (two-party agreement), [[bilateralism]] (two-nation pacts), [[multilateral]] (many-nation alliance), [[multilateralism]] (international collective security), [[trilateral]] (involving three nations, e.g. NAFTA).
> - **Finance, Law & Military Strategy:** [[collateral]] (property pledged alongside a loan; incidental/secondary damage; parallel bloodlines), [[collaterally]] (indirectly; side-by-side).
> - **Geometry & Structural Dimensions:** [[equilateral]] (having equal sides), [[quadrilateral]] (four-sided figure), [[septilateral]] (seven-sided).
> - **Neuroanatomy, Surgery & Clinical Medicine:** [[lateral]] (at or towards the side), [[lateralize]] (localize on one side of brain), [[lateralization]] (hemispheric brain specialization), [[laterality]] (handedness), [[contralateral]] (opposite side of body), [[ipsilateral]] (same side of body), [[dorsolateral]] (back and side), [[ventrolateral]] (belly and side), [[anterolateral]] (front and side), [[posterolateral]] (back and side), [[ambilateral]] (affecting both sides).

---

## 🔀 4. Prefix & Combining Dynamics on later

### Compounding Numerical & Directional Modifiers

| Combining Element | Meaning             | Combined Derivative | Resulting Semantic Shift                                                       |
| :---------------- | :------------------ | :------------------ | :----------------------------------------------------------------------------- |
| **uni-**          | one (*ūnus*)        | [[unilateral]]      | Undertaken or decided by one party or nation alone without consultation.       |
| **bi-**           | two (*bis*)         | [[bilateral]]       | Involving mutual rights and obligations between two distinct parties or sides. |
| **tri-**          | three (*tres*)      | [[trilateral]]      | Involving three distinct sides, parties, or governments.                       |
| **multi-**        | many (*multus*)     | [[multilateral]]    | Agreed upon or participated in by three or more sovereign states.              |
| **aequi-**        | equal (*aequus*)    | [[equilateral]]     | Having all boundary edges or sides of equal geometric length.                  |
| **quadri-**       | four (*quattuor*)   | [[quadrilateral]]   | A closed plane figure bounded by four straight sides.                          |
| **col- (com-)**   | together, alongside | [[collateral]]      | Situated side by side; accompanying; an asset pledged alongside debt.          |
| **contra-**       | opposite, against   | [[contralateral]]   | Originating on or affecting the opposite lateral half of the anatomical body.  |
| **ipsi-**         | self, same (*ipse*) | [[ipsilateral]]     | Situated on or affecting the very same side of the body.                       |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective forming | [[lateral]] | Pertaining to, situated at, or directed toward the side. |
| **-ism** | Political / Philosophical doctrine | [[multilateralism]] | The diplomatic philosophy of international cooperation and collective pacts. |
| **-ize** | Functional verbalizer | [[lateralize]] | To concentrate a cognitive function in one cerebral hemisphere. |
| **-ation** | Process noun | [[lateralization]] | The developmental process of hemispheric neural specialization. |
| **-ity** | Condition / Tendency noun | [[laterality]] | The behavioral preference for one side of the body (e.g. right-handedness). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **International Relations & Diplomacy** | [[unilateral]], [[bilateral]], [[multilateral]], [[multilateralism]] | Structuring bilateral free trade agreements, multilateral climate accords (Paris Agreement), and unilateral sanctions. |
| **Banking, Finance & Contract Law** | [[collateral]], [[collaterally]] | Securing commercial credit lines with real estate collateral, margin loans, and legal covenants on collateralized debt obligations (CDOs). |
| **Neuroscience & Clinical Neurology** | [[lateralization]], [[contralateral]], [[ipsilateral]], [[dorsolateral]] | Assessing stroke patients (where left hemisphere infarction produces contralateral right hemiplegia), fMRI imaging of the dorsolateral prefrontal cortex (DLPFC). |
| **Euclidean Geometry & Engineering** | [[equilateral]], [[quadrilateral]], [[trilateral]] | Structural truss calculations using equilateral triangles, CAD modeling of quadrilateral mesh networks. |
| **Sports & Kinesiology** | [[lateral]], [[laterally]] | Executing lateral rugby passes, offensive linemen lateral agility drills, and lateral collateral ligament (LCL) knee stability testing. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bilateral]] | adjective | **1.** Having identical parts on each side of an axis.<br>**2.** Affecting or undertaken by two parties. | *"In academic literature, bilateral designates having identical parts on each side of an axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bilateralism]] | noun | **1.** The property of being symmetrical about a vertical plane. | *"In academic literature, bilateralism designates the property of being symmetrical about a vertical plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bilaterality]] | noun | **1.** The property of being symmetrical about a vertical plane. | *"In academic literature, bilaterality designates the property of being symmetrical about a vertical plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bilaterally]] | adverb | **1.** With the involvement of two parties or governments.<br>**2.** So as to involve two sides or parts. | *"In academic literature, bilaterally designates with the involvement of two parties or governments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collateral]] | noun | **1.** A security pledged for the repayment of a loan.<br>**2.** Descended from a common ancestor but through different lines. | *"In his bright radiance and collateral light Must I be comforted, not in his sphere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[collateralize]] | verb | **1.** Pledge as a collateral. | *"In academic literature, collateralize designates pledge as a collateral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contralateral]] | adjective | **1.** On or relating to the opposite side (of the body). | *"In academic literature, contralateral designates on or relating to the opposite side (of the body)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dilater]] | noun | **1.** A surgical instrument that is used to dilate or distend an opening or an organ. | *"In academic literature, dilater designates a surgical instrument that is used to dilate or distend an opening or an organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elater]] | noun | **1.** Any of various widely distributed beetles. | *"In academic literature, elater designates any of various widely distributed beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elaterid]] | noun | **1.** Any of various widely distributed beetles. | *"In academic literature, elaterid designates any of various widely distributed beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elateridae]] | noun | **1.** Click beetles and certain fireflies. | *"In academic literature, elateridae designates click beetles and certain fireflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilateral]] | noun | **1.** A figure whose sides are all equal.<br>**2.** Having all sides or faces equal. | *"In the first course, there was a shoulder of mutton cut into an equilateral triangle, a piece of beef into a rhomboides, and a pudding into a cycloid."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[later]] | adjective | **1.** Coming at a subsequent time or stage.<br>**2.** At or toward an end or late period or stage of development. | *"The talk first started from a misfortune which happened years ago, and later on the matter came up and people thought a similar misfortune had taken place again."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[lateral]] | noun | **1.** A pass to a receiver upfield from the passer.<br>**2.** Situated at or extending to the side; ; - tennyson. | *"This dugong, which also bears the name of the halicore, closely resembles the manatee; its oblong body terminated in a lengthened tail, and its lateral fins in perfect fingers."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[lateralisation]] | noun | **1.** Localization of function on either the right or left sides of the brain. | *"In academic literature, lateralisation designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterality]] | noun | **1.** Localization of function on either the right or left sides of the brain.<br>**2.** The property of using one hand more than the other. | *"In academic literature, laterality designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lateralization]] | noun | **1.** Localization of function on either the right or left sides of the brain. | *"In academic literature, lateralization designates localization of function on either the right or left sides of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lateralize]] | verb | **1.** Move or displace to one side so as to make lateral. | *"In academic literature, lateralize designates move or displace to one side so as to make lateral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterally]] | adverb | **1.** To or by or from the side.<br>**2.** In a lateral direction or location. | *"But to think she can carr’ on alone!” He allowed his head to swing laterally three or four times in silence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lateran]] | noun | **1.** The site in rome containing the church of rome and the lateran palace. | *"In academic literature, lateran designates the site in rome containing the church of rome and the lateran palace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laterite]] | noun | **1.** A red soil produced by rock decay; contains insoluble deposits of ferric and aluminum oxides. | *"In academic literature, laterite designates a red soil produced by rock decay; contains insoluble deposits of ferric and aluminum oxides."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LATER
  </div>
</div>
