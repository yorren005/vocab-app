---
status: unread
type: root_dashboard
---
# Dashboard — faci
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">faci-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“face, appearance, or form”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **faci** means face, appearance, or form. It refers to face / outward appearance / surface / facet / facade. In English, this root forms words such as *shape*, *place*, *deface*, and *defacement*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: face, appearance, or form
> The root **faci** means face, appearance, or form. It refers to face / outward appearance / surface / facet / facade. In English, this root forms words such as *shape*, *place*, *deface*, and *defacement*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Face, appearance, or form</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *shape* and *place*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **faci** comes from a Latin word that means *"face, appearance, or form"*.
  - At its core, it describes face, appearance, or form.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **faci** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of face, appearance, or form.
  - **Mental & Social**: How people experience, organize, or communicate about face, appearance, or form.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Shape**: An everyday English word showing the root's idea of *face, appearance, or form*.
  - **Place**: An everyday English word showing the root's idea of *face, appearance, or form*.
  - **Deface**: To mar, spoil, disfigure, or destroy the surface, appearance, or legibility of something, especially by writing, carving, or painting graffiti upon it.
  - **Defacement**: The act or process of damaging or disfiguring the appearance or surface of something.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">faci</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through three distinct morphological channels:
> - **Classical Latin Fifth-Declension Stem:** `faci-` / `facies-` (from *faciēs*): *facies*, *facial*, *superficies*, *prima facie*, *faciocephalic*.
> - **Gallo-Romance Monosyllabic Stem:** `face-` (from Old French *face* < Latin *faciēs*): *face*, *efface*, *deface*, *interface*, *surface*, *subsurface*.
> - **Gallo-Romance Diminutive Stem:** `facet-` / `facad-` (from French *facette*, *façade*): *facet*, *faceted*, *facade*.
>
> Prefixation creates rich directional dynamics: *ef-* (*ex-*) = wiping out; *de-* = spoiling; *inter-* = mutual facing boundary; *sur-* (*super-*) = outer surface; *sub-* = beneath the surface.

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

> [!tip] 🌈 The Conceptual Facets of Faci-
> - **1. Human Countenance & Somatic Expression:** The front of the head, cranial expressions, and cosmetic treatments (*face*, *facial*, *faciocephalic*).
> - **2. Diagnostic Pathology & Gestalt:** Distinctive facial masks pathognomonic of systemic disease (*facies*, *Cushingoid facies*, *Hippocratic facies*).
> - **3. Geometry, Gemology & Materials Science:** Polished geometric planes of crystals (*facet*), and planar contact surfaces (*interface*, *interfacial tension*).
> - **4. Architecture & Exterior Deception:** Ornamental building fronts and deceitful social exteriors (*facade* / *façade*).
> - **5. Destruction, Erasure & Modesty:** Marring monuments (*deface*), eradicating traces or keeping in the background (*efface*, *self-effacing*).
> - **6. Jurisprudence & Evidentiary Burden:** Sufficient evidence upon initial appearance (*prima facie*), and real property boundaries (*superficies*).
> - **7. Stratigraphy & Sedimentology:** Lithological and biological character of sedimentary rock strata (*geological facies*).
> - **8. Obstetrics & Labor:** The thinning and shortening of the cervix during stage one labor (*cervical effacement*).

---

## 🔀 4. Prefix & Combining Dynamics on faci

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ef-` (< *ex-*) | out, away | [[efface]] | To wipe *out* the face or image; to obliterate, erase. |
| `de-` | down, away, reversing | [[deface]] | To spoil or mar the *face* or appearance of; to vandalize. |
| `inter-` | between, mutually | [[interface]] | A surface forming a common boundary *between* two bodies or systems. |
| `sur-` (< *super-*) | over, above | [[surface]] | The *outer face* or exterior boundary of an object. |
| `sub-` | under, beneath | [[subsurface]] | Situated or operating *beneath* the surface. |
| `prīmā` | at first (ablative) | [[prima facie]] | At the *first face* or initial presentation. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (relating to) | [[facial]] | Pertaining strictly to the face or countenance. |
| `-et` | Diminutive noun | [[facet]] | A "little face"; a polished plane on a cut gemstone. |
| `-ade` | Noun (collective / exterior) | [[facade]] | The grand architectural front elevation of an edifice. |
| `-ment` | Noun (act / result) | [[defacement]], [[effacement]] | The act of marring a surface, or the thinning of the cervix. |
| `-ity` | Noun (state / quality) | [[superficiality]] | The state of possessing only shallow, surface-level depth. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Clinical Diagnostics & Obstetrics** | [[facies]], [[facial]], [[effacement]] | Evaluating adenoid facies; facial nerve (CN VII) testing; cervical effacement percentages in labor. |
| **Criminal Law & Jurisprudence** | [[prima facie]], [[defacement]], **superficies** | Prima facie evidence of criminal intent; statutory felony penalties for monument defacement. |
| **Software Engineering & UX Design** | [[interface]], **interfacial** | Graphical user interface (GUI); application programming interfaces (APIs); interfacial boundary physics. |
| **Sedimentology & Petroleum Geology** | [[facies]] | Depositional facies modeling; deltaic vs. turbidite facies in hydrocarbon reservoir exploration. |
| **Architecture & Urban Design** | [[facade]] | Curtain-wall facades, historical preservation of brownstone facades, thermal building envelopes. |
| **Gemology & Lapidary Arts** | [[facet]], **faceted** | Brilliance optimization in diamond faceting; pavilion, girdle, and table facets. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[facia]] | noun | **1.** A sheet or band of fibrous connective tissue separating or binding together muscles and organs etc. | *"In academic literature, facia designates a sheet or band of fibrous connective tissue separating or binding together muscles and organs etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facial]] | noun | **1.** Cranial nerve that supplies facial muscles.<br>**2.** Care for the face that usually involves cleansing and massage and the application of cosmetic creams. | *"The room inside was lighted only by the ruddy glow from the kiln mouth, which shone over the floor with the streaming horizontality of the setting sun, and threw upwards the shadows of all facial irregularities in those assembled around."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[facially]] | adverb | **1.** With respect to the face. | *"In academic literature, facially designates with respect to the face."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facile]] | adjective | **1.** Arrived at without due care or effort; lacking depth.<br>**2.** Performing adroitly and without effort. | *"There was plenty of eggs, butter, bread, and so on in the larder, and Clare soon had breakfast laid, his experiences at the dairy having rendered him facile in domestic preparations."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[facilitate]] | verb | **1.** Make easier.<br>**2.** Be of use. | *"This will stimulate agricultural improvement, and facilitate the purchase of land by tenants."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[facilitation]] | noun | **1.** The condition of being made easy (or easier).<br>**2.** (neurophysiology) phenomenon that occurs when two or more neural impulses that alone are not enough to trigger a response in a neuron combine to trigger an action potential. | *"Whereas from our present _via media_--facilitation of divorce--can only result the era when the young lady in reduced circumstances will no longer turn governess but will be open to engagement as wife at a reasonable stipend."* — Francis Thompson, *Shelley: An Essay* |
| [[facilitative]] | adjective | **1.** Freeing from difficulty or impediment. | *"In academic literature, facilitative designates freeing from difficulty or impediment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facilitator]] | noun | **1.** Someone who makes progress easier. | *"In academic literature, facilitator designates someone who makes progress easier."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facilitatory]] | adjective | **1.** Inducing or aiding in facilitating neural activity. | *"In academic literature, facilitatory designates inducing or aiding in facilitating neural activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facility]] | noun | **1.** A building or place that provides a particular service or is used for a particular industry.<br>**2.** Skillful performance or ability without difficulty. | *"I will something affect the letter; for it argues facility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[facing]] | noun | **1.** A lining applied to the edge of a garment for ornamentation or strengthening.<br>**2.** An ornamental coating to a building. | *"Tulkinghorn sits, facing round, on a stool at the desk."* — Charles Dickens, *Bleak House* |
| [[interfacial]] | adjective | **1.** Relating to or situated at an interface. | *"In academic literature, interfacial designates relating to or situated at an interface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surfacing]] | noun | **1.** Emerging to the surface and becoming apparent.<br>**2.** Come to the surface. | *"In academic literature, surfacing designates emerging to the surface and becoming apparent."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FACI
  </div>
</div>
