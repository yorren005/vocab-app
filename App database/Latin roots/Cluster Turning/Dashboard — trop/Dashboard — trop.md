---
status: unread
type: root_dashboard
---
# Dashboard — trop
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">trop-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“turn or figure of speech”</span>
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

The root **trop** means turn or figure of speech. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *trope*, *tropical*, *tropic*, and *tropism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: turn or figure of speech
> The root **trop** means turn or figure of speech. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *trope*, *tropical*, *tropic*, and *tropism*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Turn or figure of speech</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *trope* and *tropical*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **trop** comes from a Latin word that means *"turn or figure of speech"*.
  - At its core, it describes turn or figure of speech.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **trop** in an English word, think of **turning, revolving, and changing direction**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of turn or figure of speech.
  - **Mental & Social**: How people experience, organize, or communicate about turn or figure of speech.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Trope**: A figurative or metaphorical use of a word or expression.
  - **Tropical**: Of, typical of, or peculiar to the tropics.
  - **Tropic**: Either of two parallels of latitude on the earth.
  - **Tropism**: The turning of all or part of an organism in a particular direction in response to an external stimulus.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">trop</mark>, think of <mark class="hl-def">turning, revolving, and changing direction</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `trop-` (< Greek *tropos* / *tropē*): The base nominal and combining form.
- **Classic Scientific Affixes**:
  - `helio-` ("sun"): *heliotrope* ("turning to the sun").
  - `photo-` ("light"): *phototropism* ("growth turning toward light").
  - `geo-` ("earth/gravity"): *geotropism* ("gravitational turning of plant roots").
  - `psycho-` ("mind"): *psychotropic* ("turning or altering mental state").
  - `apo-` ("away from"): *apostrophe* ("turning away to address an absent listener").
  - `en-` ("in"): *entropy* ("internal transformation / cosmic disorder").
  - `sub-` ("beneath"): *subtropical* ("bordering the tropics").

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
                      ┌── Rhetoric & Literature: trope, apostrophe
                      │
   [trop] ────────────┼── Geography & Meteorology: tropic, tropical, subtropical, troposphere
 (To Turn / Orient)   │
                      ├── Biology & Medicine: tropism, phototropism, geotropism, heliotrope, psychotropic
                      │
                      └── Physics & History: entropy, trophy
```

---

## 🔀 4. Prefix & Combining Dynamics on trop
- **`photo-` + `trop-` + `-ism`**: *phototropism* — directional growth response toward light.
- **`psycho-` + `trop-` + `-ic`**: *psychotropic* — substances turning or altering cognitive function.
- **`apo-` + `stroph-` / `trop-`**: *apostrophe* — rhetorical turning away from the audience.
- **`en-` + `trop-` + `-y`**: *entropy* — thermodynamic measure of irreversible disorder.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Thermodynamics & Information Theory**: The Second Law of Thermodynamics; Clausius and Shannon *entropy*.
- **Botany & Plant Physiology**: Auxin-driven *phototropism* and *geotropism*; *heliotropic* sunflowers.
- **Climatology & Earth Science**: The *Troposphere* (turbulent lowest atmospheric layer); *tropics* of Cancer and Capricorn.
- **Pharmacology & Psychiatry**: *Psychotropic* medications (antidepressants, antipsychotics).
- **Literary Theory & Semiotics**: Narrative *tropes*; irony, hyperbole, and metaphor.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[apostrophe]] | noun | **1.** Address to an absent or imaginary person.<br>**2.** The mark (') used to indicate the omission of one or more letters from a printed word. | *"Sit down!” This little apostrophe to Mrs."* — Charles Dickens, *Bleak House* |
| [[apostrophic]] | adjective | **1.** Of or characteristic of apostrophe. | *"In academic literature, apostrophic designates of or characteristic of apostrophe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apostrophise]] | verb | **1.** Use an apostrophe. | *"But it’s not worth your while to apostrophise me, or the air, about it; what you want to do, you do."* — Charles Dickens, *A Tale of Two Cities* |
| [[apostrophize]] | verb | **1.** Use an apostrophe. | *"If the author be old-fashioned enough to apostrophize the Gentle Reader, I know he must mean me, and docilely give ear, and presently tumble head-foremost into the treacherous pit he has digged for me."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[astropogon]] | noun | **1.** A genus of fish of the family apogonidae. | *"In academic literature, astropogon designates a genus of fish of the family apogonidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entropy]] | noun | **1.** (communication theory) a numerical measure of the uncertainty of an outcome.<br>**2.** (thermodynamics) a thermodynamic quantity representing the amount of energy in a system that is no longer available for doing mechanical work. | *"In academic literature, entropy designates (communication theory) a numerical measure of the uncertainty of an outcome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etropus]] | noun | **1.** A genus of bothidae. | *"In academic literature, etropus designates a genus of bothidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extropic]] | adjective | **1.** Of or relating to extropy. | *"In academic literature, extropic designates of or relating to extropy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extropy]] | noun | **1.** The prediction that human intelligence and technology will enable life to expand in an orderly way throughout the entire universe. | *"In academic literature, extropy designates the prediction that human intelligence and technology will enable life to expand in an orderly way throughout the entire universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geotropism]] | noun | **1.** An orienting response to gravity. | *"In academic literature, geotropism designates an orienting response to gravity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotrope]] | noun | **1.** Green chalcedony with red spots that resemble blood. | *"I recognised some euphorbias, with the caustic sugar coming from them; heliotropes, quite incapable of justifying their name, sadly drooped their clusters of flowers, both their colour and perfume half gone."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[heliotropism]] | noun | **1.** An orienting response to the sun. | *"In academic literature, heliotropism designates an orienting response to the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intropin]] | noun | **1.** A monoamine neurotransmitter found in the brain and essential for the normal functioning of the central nervous system; as a drug (trade names dopastat and intropin) it is used to treat shock and hypotension. | *"In academic literature, intropin designates a monoamine neurotransmitter found in the brain and essential for the normal functioning of the central nervous system; as a drug (trade names dopastat and intropin) it is used to treat shock and hypotension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protropin]] | noun | **1.** Trade name of a synthetic human growth hormone given to children deficient in the hormone; use by athletes and weightlifters is banned. | *"In academic literature, protropin designates trade name of a synthetic human growth hormone given to children deficient in the hormone; use by athletes and weightlifters is banned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtropic]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, subtropic designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtropical]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, subtropical designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subtropics]] | noun | **1.** Regions adjacent to the tropics. | *"In academic literature, subtropics designates regions adjacent to the tropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropaeolaceae]] | noun | **1.** Coextensive with the genus tropaeolum. | *"In academic literature, tropaeolaceae designates coextensive with the genus tropaeolum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropaeolum]] | noun | **1.** A tropical american genus of dicotyledonous climbing or diffuse pungent herbs constituting the family tropaeolaceae. | *"In academic literature, tropaeolum designates a tropical american genus of dicotyledonous climbing or diffuse pungent herbs constituting the family tropaeolaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trope]] | noun | **1.** Language used in a figurative or nonliteral sense. | *"Pure religion enthroned Through trope and metaphor, the Revelator, immortal scribe of Spirit and of a true idealism, furnishes the 571:24 mirror in which mortals may see their own image."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[trophy]] | noun | **1.** An award for success in war or hunting.<br>**2.** Something given as a token of victory. | *"The mere word’s a slave, Debauch’d on every tomb, on every grave A lying trophy, and as oft is dumb Where dust and damn’d oblivion is the tomb Of honour’d bones indeed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tropic]] | noun | **1.** Either of two parallels of latitude about 23.5 degrees to the north and south of the equator representing the points farthest north and south at which the sun can shine directly overhead and constituting the boundaries of the torrid zone or tropics.<br>**2.** Relating to or situated in or characteristic of the tropics (the region on either side of the equator). | *"Bathsheba was far from dreaming that the dark and silent shape upon which she had so carelessly thrown a seed was a hotbed of tropic intensity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tropical]] | adjective | **1.** Relating to or situated in or characteristic of the tropics (the region on either side of the equator).<br>**2.** Of or relating to the tropics, or either tropic. | *"I can lie down on the grass—in fine weather—and float along an African river, embracing all the natives I meet, as sensible of the deep silence and sketching the dense overhanging tropical growth as accurately as if I were there."* — Charles Dickens, *Bleak House* |
| [[tropically]] | adverb | **1.** In a tropical manner. | *"In academic literature, tropically designates in a tropical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropicbird]] | noun | **1.** Mostly white web-footed tropical seabird often found far from land. | *"In academic literature, tropicbird designates mostly white web-footed tropical seabird often found far from land."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropics]] | noun | **1.** The part of the earth's surface between the tropic of cancer and the tropic of capricorn; characterized by a hot climate.<br>**2.** Either of two parallels of latitude about 23.5 degrees to the north and south of the equator representing the points farthest north and south at which the sun can shine directly overhead and constituting the boundaries of the torrid zone or tropics. | *"He waited for her in the rare shadow of the birchtree, a tall powerful figure in a white drill suit of the tropics, his fair skin and black eyes shaded by a wide Panama hat."* — Anthony Pryde, *Nightfall* |
| [[tropidoclonion]] | noun | **1.** Lined snakes. | *"In academic literature, tropidoclonion designates lined snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropism]] | noun | **1.** An involuntary orienting response; positive or negative reaction to a stimulus source. | *"In academic literature, tropism designates an involuntary orienting response; positive or negative reaction to a stimulus source."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troponomy]] | noun | **1.** The place names of a region or a language considered collectively. | *"In academic literature, troponomy designates the place names of a region or a language considered collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troponym]] | noun | **1.** A word that denotes a manner of doing something. | *"In academic literature, troponym designates a word that denotes a manner of doing something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troponymy]] | noun | **1.** The semantic relation of being a manner of does something.<br>**2.** The place names of a region or a language considered collectively. | *"In academic literature, troponymy designates the semantic relation of being a manner of does something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropopause]] | noun | **1.** The region of discontinuity between the troposphere and the stratosphere. | *"In academic literature, tropopause designates the region of discontinuity between the troposphere and the stratosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troposphere]] | noun | **1.** The lowest atmospheric layer; from 4 to 11 miles high (depending on latitude). | *"In academic literature, troposphere designates the lowest atmospheric layer; from 4 to 11 miles high (depending on latitude)."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TROP
  </div>
</div>
