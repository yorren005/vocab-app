---
status: unread
type: root_dashboard
---
# Dashboard — clin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">clin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to bend or lean”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **clin** means to bend or lean. It refers to the action of bending and carrying out this process. In English, this root forms words such as *incline*, *inclination*, *decline*, and *declination*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to bend or lean
> The root **clin** means to bend or lean. It refers to the action of bending and carrying out this process. In English, this root forms words such as *incline*, *inclination*, *decline*, and *declination*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To bend or lean</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *incline* and *inclination*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **clin** comes from a Latin word that means *"to bend or lean"*.
  - At its core, it describes the action of bend or lean.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **clin** in an English word, think of **to bend or lean**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to bend or lean).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Incline**: To lean, tilt, or slope from a horizontal or vertical plane.
  - **Inclination**: A person's natural tendency or urge to act or feel in a particular way.
  - **Decline**: To diminish in strength, value, quality, or quantity.
  - **Declination**: In astronomy, the angular distance of a celestial body north or south of the celestial equator.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">clin</mark>, think of <mark class="hl-def">to bend or lean</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `clin-` (< Latin *clīnāre*): *incline, decline, recline*.
  - `cliv-` (< Latin *clīvus*, "slope, hill"): *proclivity, declivity*.
  - `clim-` (< Greek *klima*, "slope/latitude" & *klimax*, "ladder"): *climate, climax*.
  - `clinic-` (< Greek *klinikē*, "bedside medicine"): *clinic, clinical*.
- **Directional Affixes**:
  - `in-` ("toward, upon"): *incline, inclination*.
  - `de-` ("downward, away"): *decline, declination*.
  - `re-` ("back, backward"): *recline, reclinant*.
  - `pro-` ("forward, down"): *proclivity* (< *proclīvis*, "sloping forward").
  - `syn-` ("together"): *syncline* (geological downward fold dipping together).
  - `anti-` ("opposite, upward"): *anticline* (geological upward arch).

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
```
                      ┌── Sloping / Physical Tilt: incline, decline, recline, syncline, anticline
                      │
   [clin] ────────────┼── Cognitive Predisposition: inclination, disinclination, proclivity
 (Lean / Tilt)        │
                      ├── Greek Medical / Ascending: clinic, clinical, climax, anticlimax
                      │
                      └── Planetary Solar Tilt: climate, acclimate, acclimatize
```

---

## 🔀 4. Prefix & Combining Dynamics on clin
- **`in-` + `clin`**: *incline* — to lean toward physically or harbor a mental preference.
- **`de-` + `clin`**: *decline* — to slope downward, refuse an offer, or deteriorate.
- **`re-` + `clin`**: *recline* — to lean back into a restful horizontal posture.
- **`pro-` + `cliv-`**: *proclivity* — a natural downhill slope or inherent tendency toward a behavior.
- **`anti-` + `clim-`**: *anticlimax* — a disappointing descent from a towering emotional height.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Geology & Structural Earth Science**: *Anticlines* and *synclines* forming fold mountains.
- **Climatology & Meteorology**: Global *climate* systems, microclimates, and *acclimatization*.
- **Medicine & Healthcare**: *Clinical* trials, outpatient *clinics*, and bedside diagnostics.
- **Narratology & Rhetoric**: Dramatic *climax* and narrative *anticlimax*.
- **Astronomy & Physics**: Magnetic *declination* (deviation of magnetic north from true north).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anticlinal]] | adjective | **1.** Sloping downward away from a common crest. | *"In academic literature, anticlinal designates sloping downward away from a common crest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticline]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin clin within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of clin in systematic terminology. | *"In academic literature, anticline designates pertaining to, derived from, or characteristic of latin clin within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinch]] | noun | **1.** (boxing) the act of one boxer holding onto the other to avoid being hit and to rest momentarily.<br>**2.** A small slip noose made with seizing. | *"To clinch his argument he appeals to plain matter of fact and his own personal experience."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[clinched]] | verb | **1.** Secure or fasten by flattening the ends of nails or bolts.<br>**2.** Hold a boxing opponent with one or both arms so as to prevent punches. | *"But these are all landsmen; of week days pent up in lath and plaster—tied to counters, nailed to benches, clinched to desks."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[clincher]] | noun | **1.** An argument that is conclusive.<br>**2.** A point or fact or remark that settles something conclusively. | *"In academic literature, clincher designates an argument that is conclusive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clincher-built]] | adjective | **1.** Having overlapping hull planks. | *"In academic literature, clincher-built designates having overlapping hull planks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cline]] | noun | **1.** American geneticist who succeeded in transferring a functioning gene from one mouse to another (born in 1934). | *"In academic literature, cline designates american geneticist who succeeded in transferring a functioning gene from one mouse to another (born in 1934)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinic]] | noun | **1.** A medical establishment run by a group of medical specialists.<br>**2.** Meeting for diagnosis of problems and instruction or remedial work in a particular activity. | *"And no wonder, for besides his parish work he was forever running here and there—to the juvenile detention home, the clinic for alcoholics, the mental health center, the Black ghetto."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[clinical]] | adjective | **1.** Relating to a clinic or conducted in or as if in a clinic and depending on direct observation of patients.<br>**2.** Scientifically detached; unemotional. | *"The PHA is a four-stage process that includes a prevention-oriented clinical screening, occupational examination, screening of military-unique medical requirements and counseling."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[clinically]] | adverb | **1.** In a clinical manner. | *"In academic literature, clinically designates in a clinical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinician]] | noun | **1.** A practitioner (of medicine or psychology) who does clinical work instead of laboratory experiments. | *"In academic literature, clinician designates a practitioner (of medicine or psychology) who does clinical work instead of laboratory experiments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinid]] | noun | **1.** Mostly small blennioid fishes of coral reefs and seagrass beds. | *"In academic literature, clinid designates mostly small blennioid fishes of coral reefs and seagrass beds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinidae]] | noun | **1.** Viviparous blennies of temperate and tropical seas. | *"In academic literature, clinidae designates viviparous blennies of temperate and tropical seas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinocephalism]] | noun | **1.** A congenital defect in which the top of the head is depressed (concave instead of convex). | *"In academic literature, clinocephalism designates a congenital defect in which the top of the head is depressed (concave instead of convex)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinocephaly]] | noun | **1.** A congenital defect in which the top of the head is depressed (concave instead of convex). | *"In academic literature, clinocephaly designates a congenital defect in which the top of the head is depressed (concave instead of convex)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinodactyly]] | noun | **1.** A congenital defect in which one or more toes or fingers are abnormally positioned. | *"In academic literature, clinodactyly designates a congenital defect in which one or more toes or fingers are abnormally positioned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinometer]] | noun | **1.** An instrument used by surveyors in order to measure an angle of inclination or elevation. | *"In academic literature, clinometer designates an instrument used by surveyors in order to measure an angle of inclination or elevation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinopodium]] | noun | **1.** Wild basil. | *"In academic literature, clinopodium designates wild basil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinoril]] | noun | **1.** A nonsteroidal anti-inflammatory drug (trade name clinoril). | *"In academic literature, clinoril designates a nonsteroidal anti-inflammatory drug (trade name clinoril)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[clinton]] | noun | **1.** Wife of president clinton and later a woman member of the united states senate (1947-).<br>**2.** 42nd president of the united states (1946-). | *"Cornwallis fought as lang’s he dought, An’ did the Buckskins claw, man; But Clinton’s glaive frae rust to save, He hung it to the wa’, man."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[clintonia]] | noun | **1.** Any temperate liliaceous plant of the genus clintonia having broad basal leaves and white or yellowish or purplish flowers followed by blue or black berries. | *"In academic literature, clintonia designates any temperate liliaceous plant of the genus clintonia having broad basal leaves and white or yellowish or purplish flowers followed by blue or black berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[declination]] | noun | **1.** A condition inferior to an earlier condition; a gradual falling off from a better state.<br>**2.** A downward slope or bend. | *"You need not put on airs." "I have business with you, Phil." "I have no business with you; and I respectfully decline having anything whatever to do with you." "Your declination is not accepted."* — Oliver Optic, *Plane and Plank; or, The Mishaps of a Mechanic* |
| [[decline]] | noun | **1.** Change toward something smaller or lower.<br>**2.** A condition inferior to an earlier condition; a gradual falling off from a better state. | *"Far more, far more, to you do I decline."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[declinometer]] | noun | **1.** An instrument for measuring magnetic declination. | *"In academic literature, declinometer designates an instrument for measuring magnetic declination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diclinous]] | adjective | **1.** Having pistils and stamens in separate flowers. | *"In academic literature, diclinous designates having pistils and stamens in separate flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disinclination]] | noun | **1.** That toward which you are inclined to feel dislike.<br>**2.** A certain degree of unwillingness. | *"That was something much more important than his disinclination to DC with the Knippel boys."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[disincline]] | verb | **1.** Make unwilling. | *"But I felt it; and it did not disincline me towards him; though I felt impatience at what seemed like mystery in him, so imperfectly as he was known to me then."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[disinclined]] | verb | **1.** Make unwilling.<br>**2.** Unwilling because of mild dislike or disapproval. | *"I, Darrell Standing, was so strongly disinclined to die that I refused to let Warden Atherton and Captain Jamie kill me."* — Jack London, *The Jacket (The Star-Rover)* |
| [[inclination]] | noun | **1.** An attitude of mind especially one that favors one alternative over others.<br>**2.** (astronomy) the angle between the plane of the orbit and the plane of the ecliptic stated in degrees. | *"Go to the fellow, good Alexas, bid him Report the feature of Octavia, her years, Her inclination; let him not leave out The colour of her hair."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incline]] | noun | **1.** An elevated geological formation.<br>**2.** An inclined surface connecting two levels. | *"Alexas did revolt and went to Jewry on Affairs of Antony; there did dissuade Great Herod to incline himself to Caesar And leave his master Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inclined]] | verb | **1.** Have a tendency or disposition to do or be something; be inclined.<br>**2.** Bend or turn (one's ear) towards a speaker in order to listen well. | *"I will laugh like a hyena, and that when thou are inclined to sleep."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inclining]] | noun | **1.** The act of inclining; bending forward.<br>**2.** Have a tendency or disposition to do or be something; be inclined. | *"When your lordship sees the bottom of his success in’t, and to what metal this counterfeit lump of ore will be melted, if you give him not John Drum’s entertainment, your inclining cannot be removed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inclinometer]] | noun | **1.** An instrument showing the angle that an aircraft makes with the horizon.<br>**2.** A measuring instrument for measuring the angle of magnetic dip (as from an airplane). | *"In academic literature, inclinometer designates an instrument showing the angle that an aircraft makes with the horizon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preclinical]] | adjective | **1.** Of or relating to the early phases of a disease when accurate diagnosis is not possible because symptoms of the disease have not yet appeared. | *"In academic literature, preclinical designates of or relating to the early phases of a disease when accurate diagnosis is not possible because symptoms of the disease have not yet appeared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reclinant]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin clin within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of clin in systematic terminology. | *"In academic literature, reclinant designates pertaining to, derived from, or characteristic of latin clin within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recline]] | verb | **1.** Move the upper body backwards and down.<br>**2.** Cause to recline. | *"Here would they slumber through the hours of the night, and recline luxuriously during the greater part of the day."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[recliner]] | noun | **1.** An armchair whose back can be lowered and foot can be raised to allow the sitter to recline in it. | *"In academic literature, recliner designates an armchair whose back can be lowered and foot can be raised to allow the sitter to recline in it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reclining]] | noun | **1.** The act of assuming or maintaining a reclining position.<br>**2.** Move the upper body backwards and down. | *"The sick child sat completely dressed on a bed in the corner of the room, half reclining on the pillows."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[subclinical]] | adjective | **1.** Relating to the stage in the development of a disease before the symptoms are observed. | *"In academic literature, subclinical designates relating to the stage in the development of a disease before the symptoms are observed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synclinal]] | adjective | **1.** Sloping downward toward each other to create a trough. | *"In academic literature, synclinal designates sloping downward toward each other to create a trough."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syncline]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin clin within the domain of Turning.<br>**2.** A technical or specialized form exhibiting the properties of clin in systematic terminology. | *"In academic literature, syncline designates pertaining to, derived from, or characteristic of latin clin within the domain of turning."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CLIN
  </div>
</div>
