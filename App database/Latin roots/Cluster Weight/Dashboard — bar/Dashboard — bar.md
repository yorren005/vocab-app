---
status: unread
type: root_dashboard
---
# Dashboard — bar
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bar-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“weight, pressure, or heavy”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lifting a dense iron dumbbell and feeling its heavy downward pull.</span>
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

The root **bar** means weight, pressure, or heavy. It refers to physical weight, atmospheric pressure, or heavy force. In English, this root forms words such as *barometer*, *barometric*, *isobar*, and *baryon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: weight, pressure, or heavy
> The root **bar** means weight, pressure, or heavy. It refers to physical weight, atmospheric pressure, or heavy force. In English, this root forms words such as *barometer*, *barometric*, *isobar*, and *baryon*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Weight, pressure, or heavy</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lifting a dense iron dumbbell and feeling its heavy downward pull.</mark>
> - **Everyday Connection**: Think of familiar words like *barometer* and *barometric*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bar** comes from a Latin word that means *"weight, pressure, or heavy"*.
  - At its core, it describes weight, pressure, or heavy.

- **The Big Picture Idea**:
  - Picture lifting a dense iron dumbbell and feeling its heavy downward pull.
  - Whenever you see **bar** in an English word, think of **weight, heaviness, and pressure**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of weight, pressure, or heavy.
  - **Mental & Social**: How people experience, organize, or communicate about weight, pressure, or heavy.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Barometer**: An instrument measuring atmospheric pressure, used especially in forecasting the weather and determining altitude.
  - **Barometric**: Of or relating to atmospheric pressure as measured by a barometer.
  - **Isobar**: A line on a weather map connecting points having the same atmospheric pressure at a given time.
  - **Baryon**: A composite subatomic particle made up of three quarks, having greater mass than leptons or mesons.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bar</mark>, think of <mark class="hl-def">weight, heaviness, and pressure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `bar-` / `bary-` (< Greek *baros* / *barys*): Base nominal and adjectival combining forms.
- **Prefix & Combining Machinery**:
  - `iso-` ("equal"): *isobar*.
  - `hyper-` ("over, high"): *hyperbaric*.
  - `meter` ("measure"): *barometer, barometric*.
  - `tone` ("sound/pitch"): *baritone*.
  - `-on` (elementary particle): *baryon*.
  - `iatr-` ("physician, medical treatment"): *bariatrics*.

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
                      ┌── Meteorology & Pressure: bar, barometer, barometric, isobar
                      │
   [bar] ─────────────┼── Subatomic Physics: baryon
 (Weight / Pressure)  │
                      ├── Medicine & Physiology: bariatric, bariatrics, hyperbaric, baroreceptor
                      │
                      └── Music & Acoustic Timbre: baritone
```

---

## 🔀 4. Prefix & Combining Dynamics on bar
- **`bar-` + `-ometer`**: *barometer* — an instrument measuring atmospheric pressure.
- **`iso-` + `bar`**: *isobar* — a line on a weather map connecting points of equal atmospheric pressure.
- **`hyper-` + `bar-` + `-ic`**: *hyperbaric* — characterized by air or oxygen pressure greater than normal atmospheric pressure.
- **`bar-` + `iatr-` + `-ics`**: *bariatrics* — the branch of medicine that deals with the causes, prevention, and treatment of obesity.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Meteorology & Synoptic Climatology**: *Barometric* pressure gradients; cyclonic depressions; *isobars*.
- **Subatomic Particle Physics**: *Baryon* number conservation; protons and neutrons as composite triquark baryons.
- **Diving Medicine & Hyperbarics**: *Hyperbaric* chambers for carbon monoxide poisoning and air embolisms.
- **Cardiovascular Physiology**: *Baroreceptor* reflex loops regulating systemic vascular resistance.
- **Opera & Choral Music**: Operatic *baritone* roles (Rigoletto, Figaro, Don Giovanni).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antibaryon]] | noun | **1.** The antiparticle of a baryon; a hadron with a baryon number of -1. | *"In academic literature, antibaryon designates the antiparticle of a baryon; a hadron with a baryon number of -1."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bar]] | noun | **1.** A room or establishment where alcoholic drinks are served over a counter.<br>**2.** A counter where you can obtain food or drink. | *"I bar confusion. ’Tis I must make conclusion Of these most strange events."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[baraka]] | noun | **1.** United states writer of poems and plays about racial conflict (born in 1934). | *"On the morning of that day (_Ashur_) all water or, according to some people, only spring water is endowed with a magical virtue (_baraka_), especially before sunrise."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[baranduki]] | noun | **1.** Terrestrial siberian squirrel. | *"In academic literature, baranduki designates terrestrial siberian squirrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barany]] | noun | **1.** Austrian physician who developed a rotational method for testing the middle ear (1876-1936). | *"In academic literature, barany designates austrian physician who developed a rotational method for testing the middle ear (1876-1936)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barcarole]] | noun | **1.** A boating song sung by venetian gondoliers. | *"He heard them as a boy in Ringabella, Crosshaven, Ringabella, singing their barcaroles."* — James Joyce, *Ulysses* |
| [[barcarolle]] | noun | **1.** A boating song sung by venetian gondoliers. | *"Sónya was sitting at the clavichord, playing the prelude to Denísov’s favorite barcarolle."* — graf Leo Tolstoy, *War and Peace* |
| [[barcelona]] | noun | **1.** A city in northeastern spain on the mediterranean; 2nd largest spanish city and the largest port and commercial center; has been a center for radical political beliefs. | *"There was a fellow I knew once in Barcelona, queer fellow, used to call it his postprandial."* — James Joyce, *Ulysses* |
| [[bare]] | verb | **1.** Lay bare.<br>**2.** Make public. | *"His left cheek is a cheek of two pile and a half, but his right cheek is worn bare."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bare-ass]] | adjective | **1.** (used informally) completely unclothed. | *"In academic literature, bare-ass designates (used informally) completely unclothed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bare-assed]] | adjective | **1.** (used informally) completely unclothed. | *"In academic literature, bare-assed designates (used informally) completely unclothed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bare-breasted]] | adjective | **1.** Having the breasts uncovered or featuring such nudity. | *"In academic literature, bare-breasted designates having the breasts uncovered or featuring such nudity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bare-knuckle]] | adjective | **1.** Characterized by disorderly action and disregard for rules. | *"In academic literature, bare-knuckle designates characterized by disorderly action and disregard for rules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bare-knuckled]] | adjective | **1.** Characterized by disorderly action and disregard for rules. | *"In academic literature, bare-knuckled designates characterized by disorderly action and disregard for rules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bareback]] | adjective | **1.** Riding without a saddle.<br>**2.** Without a saddle. | *"A bareback rider in a circus never had such work as this."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[barebacked]] | adjective | **1.** Riding without a saddle.<br>**2.** Without a saddle. | *"In academic literature, barebacked designates riding without a saddle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bareboat]] | noun | **1.** A vessel (such as a yacht) that can be chartered without a captain or crew or provisions. | *"In academic literature, bareboat designates a vessel (such as a yacht) that can be chartered without a captain or crew or provisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bareboating]] | noun | **1.** Boating by chartering a bareboat and providing your own crew and provisions. | *"In academic literature, bareboating designates boating by chartering a bareboat and providing your own crew and provisions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bared]] | verb | **1.** Lay bare.<br>**2.** Make public. | *"Shave the head and tie the beard, and say it was the desire of the penitent to be so bared before his death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barefaced]] | adjective | **1.** With no effort to conceal.<br>**2.** Unrestrained by convention or propriety; ; ; - los angeles times; ; ; - bertrand russell. | *"And was ever anything so meanly done as what I did—to skulk away like that from a man who was only civil and kind!” Clearly she did not think his barefaced praise of her person an insult now."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[barefacedly]] | adverb | **1.** Without shame. | *"In academic literature, barefacedly designates without shame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barefoot]] | adjective | **1.** Without shoes.<br>**2.** Without shoes on. | *"Ambitious love hath so in me offended That barefoot plod I the cold ground upon, With sainted vow my faults to have amended."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barefooted]] | adjective | **1.** Without shoes.<br>**2.** Without shoes on. | *"They were standing in a group, in their nightgowns, barefooted, at the window, the last red rays of the west still warming their faces and necks and the walls around them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[barehanded]] | adjective | **1.** With bare hands. | *"In academic literature, barehanded designates with bare hands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bareheaded]] | adjective | **1.** Having the head uncovered. | *"Enter the Duke, attended; Egeon, bareheaded; with the Headsman and other Officers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barelegged]] | adjective | **1.** Having the legs uncovered by clothing. | *"In academic literature, barelegged designates having the legs uncovered by clothing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barely]] | adverb | **1.** Only a very short time before; ; ; ; ; - w.b.yeats.<br>**2.** In a sparse or scanty way. | *"Ay, so you serve us Till we serve you; but when you have our roses, You barely leave our thorns to prick ourselves, And mock us with our bareness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bareness]] | noun | **1.** A bleak and desolate atmosphere.<br>**2.** The state of being unclothed and exposed (especially of a part of the body). | *"What old December’s bareness everywhere!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bari]] | noun | **1.** Capital city of the apulia region on the adriatic coast. | *"Happily, about two o’clock, Ned Land brought down a magnificent hog; from the brood of those the natives call “bari-outang.” The animal came in time for us to procure real quadruped meat, and he was well received."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[baric]] | adjective | **1.** Of or relating to or containing barium. | *"In academic literature, baric designates of or relating to or containing barium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barilla]] | noun | **1.** Bushy plant of old world salt marshes and sea beaches having prickly leaves; burned to produce a crude soda ash.<br>**2.** Algerian plant formerly burned to obtain calcium carbonate. | *"Copper barilla or copper sand, an impure native metal from Chili, was formerly of importance."* — Donald M. Levy, *Modern Copper Smelting* |
| [[baring]] | noun | **1.** The removal of covering.<br>**2.** Lay bare. | *"Or the baring of my beard, and to say it was in stratagem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barish]] | noun | **1.** Kamarupan languages spoken in the state of assam in northeastern india. | *"In academic literature, barish designates kamarupan languages spoken in the state of assam in northeastern india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barite]] | noun | **1.** A white or colorless mineral (baso4); the main source of barium. | *"In academic literature, barite designates a white or colorless mineral (baso4); the main source of barium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baritone]] | noun | **1.** A male singer.<br>**2.** The second lowest adult male singing voice. | *"He listened long enough to hear himself characterized by a baritone as a stinking Jew, and by a treble as not her style and a bit too gay but quite the gentleman, before he raised the latch and stepped in."* — Anthony Pryde, *Nightfall* |
| [[barium]] | noun | **1.** A soft silvery metallic element of the alkali earth group; found in barite. | *"For instance, I have in one bottle an alcoholic solution of a lithium salt, in another of a barium, in a third of a strontium, and so on."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[barley]] | noun | **1.** A grain of barley.<br>**2.** Cultivated since prehistoric times; grown for forage and grain. | *"Can sodden water, A drench for sur-rein’d jades, their barley-broth, Decoct their cold blood to such valiant heat?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barley-sugar]] | noun | **1.** A brittle transparent candy made by melting and cooling cane sugar. | *"In academic literature, barley-sugar designates a brittle transparent candy made by melting and cooling cane sugar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barleycorn]] | noun | **1.** A grain of barley. | *"John Barleycorn: A Ballad There was three kings into the east, Three kings both great and high, And they hae sworn a solemn oath John Barleycorn should die."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[barm]] | noun | **1.** A commercial leavening agent containing yeast cells; used to raise the dough in making bread and for fermenting beer or whiskey. | *"Are not you he That frights the maidens of the villagery, Skim milk, and sometimes labour in the quern, And bootless make the breathless housewife churn, And sometime make the drink to bear no barm, Mislead night-wanderers, laughing at their harm?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barmaid]] | noun | **1.** A female bartender. | *"It was with his barmaid wife that he had spent the last three days in Bristol, and his father did not know where he was."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[barman]] | noun | **1.** An employee who mixes and serves alcoholic drinks at a bar. | *"The barman rushed forward and raised his hand in respectful greeting."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[barmbrack]] | noun | **1.** A rich currant cake or bun. | *"In academic literature, barmbrack designates a rich currant cake or bun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barmy]] | adjective | **1.** Marked by spirited enjoyment.<br>**2.** Informal or slang terms for mentally irregular. | *"In academic literature, barmy designates marked by spirited enjoyment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barn]] | noun | **1.** An outlying farm building for storing grain or animal feed and housing farm animals.<br>**2.** (physics) a unit of nuclear cross section; the effective circular area that one particle presents to another as a target for an encounter. | *"In respect of the love he bears our house—he shows in this, he loves his own barn better than he loves our house."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barnacle]] | noun | **1.** Marine crustaceans with feathery food-catching appendages; free-swimming as larvae; as adults form a hard shell and live attached to submerged surfaces.<br>**2.** European goose smaller than the brant; breeds in the far north. | *"From that hour I clove to Queequeg like a barnacle; yea, till poor Queequeg took his last long dive."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[barnburner]] | noun | **1.** Someone who burns down a barn.<br>**2.** An impressively successful event. | *"In academic literature, barnburner designates someone who burns down a barn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barndoor]] | noun | **1.** An opaque adjustable flap on a lamp fixture; used in photography to cut off light from particular areas. | *"Presently they heard the muffled tread of a horse, and the farmer rode up to the barndoor."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[barnful]] | noun | **1.** The quantity that a barn will hold. | *"In academic literature, barnful designates the quantity that a barn will hold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barnstorm]] | verb | **1.** Appear at county fairs and carnivals as a stunt flier and parachute jumper.<br>**2.** Tour the country making political speeches, giving lectures, or presenting plays. | *"In academic literature, barnstorm designates appear at county fairs and carnivals as a stunt flier and parachute jumper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barnstormer]] | noun | **1.** An actor who travels around the country presenting plays.<br>**2.** A pilot who travels around the country giving exhibits of stunt flying and parachuting. | *"Edwin Booth An old actor at the Player's Club told me that Edwin Booth first impersonated Hamlet when a barnstormer in California."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[barnum]] | noun | **1.** United states showman who popularized the circus (1810-1891). | *"Forty hard-bitten lifers waited for the guard Barnum to go to sleep on his shift."* — Jack London, *The Jacket (The Star-Rover)* |
| [[barnyard]] | noun | **1.** A yard adjoining a barn. | *"She had left the barnyard because it was so noisy there that she could not collect her wits, and had hidden herself between the rows of tall red hollyhocks which border one side of the garden."* — Charlotte B. Herr, *The Wise Mamma Goose* |
| [[barograph]] | noun | **1.** A recording barometer; automatically records on paper the variations in atmospheric pressure. | *"In academic literature, barograph designates a recording barometer; automatically records on paper the variations in atmospheric pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barographic]] | adjective | **1.** Relating to or registered by a barograph. | *"In academic literature, barographic designates relating to or registered by a barograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barometer]] | noun | **1.** An instrument that measures atmospheric pressure. | *"The barometer did not go down, nor was there any rain, but an unusual greyness wrapped earth and sky."* — Mrs. Oliphant, *A Beleaguered City* |
| [[barometric]] | adjective | **1.** Relating to atmospheric pressure or indicated by a barometer. | *"It is entirely a question of barometric pressure.” Lestrade looked startled."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[barometrical]] | adjective | **1.** Relating to atmospheric pressure or indicated by a barometer. | *"In academic literature, barometrical designates relating to atmospheric pressure or indicated by a barometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baron]] | noun | **1.** A nobleman (in various countries) of varying rank.<br>**2.** A british peer of the lowest rank. | *"What say you then to Falconbridge, the young baron of England?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[baronage]] | noun | **1.** The peers of a kingdom considered as a group. | *"With baronage and joy they bring him in."* — Classic Author, *The Song of Roland* |
| [[baronduki]] | noun | **1.** Terrestrial siberian squirrel. | *"In academic literature, baronduki designates terrestrial siberian squirrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baroness]] | noun | **1.** A noblewoman who holds the rank of baron or who is the wife or widow of a baron. | *"Baroness Wallerstätten, the mistress of the castle at that time, had often consulted the rector as to many things."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[baronet]] | noun | **1.** A member of the british order of honor; ranks below a baron but above a knight. | *"Sir Leicester Dedlock is only a baronet, but there is no mightier baronet than he."* — Charles Dickens, *Bleak House* |
| [[baronetage]] | noun | **1.** The collective body of baronets.<br>**2.** The state of a baronet. | *"She knew, that when he now took up the Baronetage, it was to drive the heavy bills of his tradespeople, and the unwelcome hints of Mr Shepherd, his agent, from his thoughts."* — Jane Austen, *Persuasion* |
| [[baronetcy]] | noun | **1.** The rank or dignity or position of a baronet or baroness.<br>**2.** The title of a baron. | *"Sir Leicester and the baronetcy, Sir Leicester and Chesney Wold, Sir Leicester and his ancestors and his patrimony”—Mr."* — Charles Dickens, *Bleak House* |
| [[baronetise]] | verb | **1.** Confer baronetcy upon. | *"In academic literature, baronetise designates confer baronetcy upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baronetize]] | verb | **1.** Confer baronetcy upon. | *"In academic literature, baronetize designates confer baronetcy upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barong]] | noun | **1.** A knife resembling a cleaver; used in the philippines. | *"In academic literature, barong designates a knife resembling a cleaver; used in the philippines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baronial]] | adjective | **1.** Impressive in appearance. | *"It seemed hardly possible that by such comparatively small mouthfuls he could keep up the vitality diffused through so broad, baronial, and superb a person."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[barony]] | noun | **1.** The estate of a baron.<br>**2.** The rank or dignity or position of a baronet or baroness. | *"My lord, I’ll tell you what: If my young lord your son have not the day, Upon mine honour, for a silken point I’ll give my barony, never talk of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[baroque]] | noun | **1.** The historic period from about 1600 until 1750 when the baroque style of art, architecture, and music flourished in europe.<br>**2.** Elaborate and extensive ornamentation in decorative art and architecture that flourished in europe in the 17th century. | *"In academic literature, baroque designates the historic period from about 1600 until 1750 when the baroque style of art, architecture, and music flourished in europe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baroqueness]] | noun | **1.** Elaborate and extensive ornamentation in decorative art and architecture that flourished in europe in the 17th century. | *"In academic literature, baroqueness designates elaborate and extensive ornamentation in decorative art and architecture that flourished in europe in the 17th century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baroreceptor]] | noun | **1.** A sensory receptor that responds to pressure. | *"In academic literature, baroreceptor designates a sensory receptor that responds to pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barosaur]] | noun | **1.** A dinosaur that could grow to be as tall as a building five stories tall. | *"In academic literature, barosaur designates a dinosaur that could grow to be as tall as a building five stories tall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barosaurus]] | noun | **1.** A dinosaur that could grow to be as tall as a building five stories tall. | *"In academic literature, barosaurus designates a dinosaur that could grow to be as tall as a building five stories tall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barouche]] | noun | **1.** A horse-drawn carriage having four wheels; has an outside seat for the driver and facing inside seats for two couples and a folding top. | *"Now, Miss Summerson,” said he, “we are off, if you please!” He gave me his arm, and the two officers courteously bowed me out, and we found at the door a phaeton or barouche with a postilion and post horses."* — Charles Dickens, *Bleak House* |
| [[barrack]] | noun | **1.** A building or group of buildings used to house military personnel.<br>**2.** Lodge in barracks. | *"Peeping in at the gate of the barrack-yard, we found everything very quiet at that time in the morning, and I asked a sergeant standing on the guardhouse-steps where he lived."* — Charles Dickens, *Bleak House* |
| [[barracking]] | noun | **1.** Shouting to interrupt a speech with which you disagree.<br>**2.** Lodge in barracks. | *"In academic literature, barracking designates shouting to interrupt a speech with which you disagree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barracouta]] | noun | **1.** A large marine food fish common on the coasts of australia, new zealand, and southern africa. | *"In academic literature, barracouta designates a large marine food fish common on the coasts of australia, new zealand, and southern africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barracuda]] | noun | **1.** Any voracious marine fish of the genus sphyraena having an elongated cylindrical body and large mouth with projecting lower jaw and long strong teeth. | *"In academic literature, barracuda designates any voracious marine fish of the genus sphyraena having an elongated cylindrical body and large mouth with projecting lower jaw and long strong teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrage]] | noun | **1.** The rapid and continuous delivery of linguistic communication (spoken or written).<br>**2.** The heavy fire of artillery to saturate an area rather than hit a specific target. | *"Now." Hodak directed a final lengthy barrage of rifle bursts at the entry."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[barramundi]] | noun | **1.** A species of large perch noted for its sporting and eating qualities; lives in marine, estuary, and freshwater habitats. | *"The harbours swarm with edible fish of all kinds, the king-fish, sea salmon, barramundi, cod, yellow tail, and a host of others."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[barranquilla]] | noun | **1.** A port city of northern colombia near the caribbean on the magdalena river. | *"In academic literature, barranquilla designates a port city of northern colombia near the caribbean on the magdalena river."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrater]] | noun | **1.** Someone guilty of barratry. | *"In academic literature, barrater designates someone guilty of barratry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrator]] | noun | **1.** Someone guilty of barratry. | *"In academic literature, barrator designates someone guilty of barratry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barratry]] | noun | **1.** Traffic in ecclesiastical offices or preferments.<br>**2.** The crime of a judge whose judgment is influenced by bribery. | *"Clarke, "he cannot be convicted of barratry, unless he is always at variance with some person or other, a mover of suits and quarrels, who disturbs the peace under colour of law."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[barred]] | verb | **1.** Prevent from entering; keep out.<br>**2.** Render unsuitable for passage. | *"Purpose so barred, it follows Nothing is done to purpose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrel]] | noun | **1.** A tube through which a bullet travels when a gun is fired.<br>**2.** A cylindrical container that holds liquids. | *"Alexander died, Alexander was buried, Alexander returneth into dust; the dust is earth; of earth we make loam; and why of that loam whereto he was converted might they not stop a beer-barrel?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrel-shaped]] | adjective | **1.** Having the general shape of a barrel. | *"In academic literature, barrel-shaped designates having the general shape of a barrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barreled]] | verb | **1.** Put in barrels.<br>**2.** Put in or stored in a barrel. | *"At the window, with a double-barreled gun in his hands, stood a short, square, red-headed man."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[barrelfish]] | noun | **1.** Blackish fish of new england waters. | *"In academic literature, barrelfish designates blackish fish of new england waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrelful]] | noun | **1.** The quantity that a barrel (of any size) will hold. | *"In academic literature, barrelful designates the quantity that a barrel (of any size) will hold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrelhouse]] | noun | **1.** A cheap drinking and dancing establishment. | *"In academic literature, barrelhouse designates a cheap drinking and dancing establishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrelled]] | verb | **1.** Put in barrels.<br>**2.** Put in or stored in a barrel. | *"It was double-barrelled, and he had, meanwhile, in some way fastened his hand-kerchief to the trigger, and with his foot on the other end was in the act of turning the second barrel upon himself."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[barrels]] | noun | **1.** The amount that many barrels might hold.<br>**2.** A tube through which a bullet travels when a gun is fired. | *"Place barrels of pitch upon the fatal stake, That so her torture may be shortened."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barren]] | noun | **1.** An uninhabited wilderness that is worthless for cultivation.<br>**2.** Providing no shelter or sustenance. | *"Who lets so fair a house fall to decay, Which husbandry in honour might uphold, Against the stormy gusts of winter’s day And barren rage of death’s eternal cold?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrenness]] | noun | **1.** The state (usually of a woman) of having no children or being unable to have children.<br>**2.** The quality of yielding nothing of value. | *"I found it by the barrenness, hard in the palm of the hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrenwort]] | noun | **1.** Slow-growing creeping plant with semi-evergreen leaves on erect wiry stems; used as ground cover. | *"In academic literature, barrenwort designates slow-growing creeping plant with semi-evergreen leaves on erect wiry stems; used as ground cover."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrette]] | noun | **1.** A pin for holding women's hair in place. | *"In academic literature, barrette designates a pin for holding women's hair in place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barretter]] | noun | **1.** A resistor inserted into a circuit to compensate for changes (as those arising from temperature fluctuations). | *"In academic literature, barretter designates a resistor inserted into a circuit to compensate for changes (as those arising from temperature fluctuations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barricade]] | noun | **1.** A barrier set up by police to stop traffic on a street or road in order to catch a fugitive or inspect traffic etc.<br>**2.** A barrier (usually thrown up hastily) to impede the advance of an enemy. | *"So, in order that he might be quite undisturbed, he piled up some forms and chairs against the door on the inside, forgetting entirely that the upper part of it was obscure glass and that his barricade was perfectly visible from without."* — John Cairns, *Principal Cairns* |
| [[barricaded]] | verb | **1.** Render unsuitable for passage.<br>**2.** Prevent access to by barricading. | *"This barricaded door corresponded clearly with the shuttered window outside, and yet I could see by the glimmer from beneath it that the room was not in darkness."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[barricado]] | verb | **1.** Block off with barricades. | *"Man is enemy to virginity; how may we barricado it against him?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrie]] | noun | **1.** Scottish dramatist and novelist; created peter pan (1860-1937). | *"Barrie [James Matthew Barrie] A Millennium Fulcrum Edition produced in 1991 by Duncan Research."* — J. M. Barrie, *Peter Pan* |
| [[barrier]] | noun | **1.** A structure or object that impedes free movement.<br>**2.** Any condition that makes it difficult to make progress or to achieve an objective. | *"We both felt painfully sensible that between us and these people there was an iron barrier which could not be removed by our new friend."* — Charles Dickens, *Bleak House* |
| [[barring]] | noun | **1.** The act of excluding someone by a negative vote or veto.<br>**2.** Prevent from entering; keep out. | *"Casaubon’s codicil, barring Dorothea’s marriage with Will, except under a penalty, was enough to cast unfitness over any relation at all between them."* — George Eliot, *Middlemarch* |
| [[barrio]] | noun | **1.** A spanish-speaking quarter in a town or city (especially in the united states).<br>**2.** An urban area in a spanish-speaking country. | *"From that line to the circumference ran several streets, some of them broken, like the Calles de la Diezma, Barrio Verde, de los Clavos, and de Pabostre."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[barrister]] | noun | **1.** A british or canadian lawyer who speaks in the higher courts of law on behalf of either the defense or prosecution. | *"I intend to go to town and eat my dinners as a barrister, since, they say, that is the preparation for all public business."* — George Eliot, *Middlemarch* |
| [[barroom]] | noun | **1.** A room or establishment where alcoholic drinks are served over a counter. | *"His barroom immediately became the place where they held prayer-meetings." VICTORIES OVER BAD HABITS, TOBACCO, OPIUM, ETC."* — Classic Author, *The wonders of prayer* |
| [[barrow]] | noun | **1.** The quantity that a barrow will hold.<br>**2.** (archeology) a heap of earth placed over prehistoric tombs. | *"Go fetch me a quart of sack; put a toast in ’t. [_Exit Bardolph._] Have I lived to be carried in a basket like a barrow of butcher’s offal, and to be thrown in the Thames?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barrow-boy]] | noun | **1.** A hawker of fruit and vegetables from a barrow. | *"In academic literature, barrow-boy designates a hawker of fruit and vegetables from a barrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrow-man]] | noun | **1.** A hawker of fruit and vegetables from a barrow. | *"In academic literature, barrow-man designates a hawker of fruit and vegetables from a barrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrowful]] | noun | **1.** The quantity that a barrow will hold. | *"In academic literature, barrowful designates the quantity that a barrow will hold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barrymore]] | noun | **1.** United states actor; son of maurice barrymore and georgiana barrymore (1882-1942).<br>**2.** United states actress; daughter of maurice barrymore and georgiana barrymore (1879-1959). | *"In spite of his considerable wealth he was simple in his personal tastes, and his indoor servants at Baskerville Hall consisted of a married couple named Barrymore, the husband acting as butler and the wife as housekeeper."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[bars]] | noun | **1.** Gymnastic apparatus consisting of two parallel wooden rods supported on uprights.<br>**2.** A room or establishment where alcoholic drinks are served over a counter. | *"He lets me feed with his hinds, bars me the place of a brother, and as much as in him lies, mines my gentility with my education."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barstow]] | noun | **1.** A town in southeastern california. | *"In academic literature, barstow designates a town in southeastern california."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bart]] | noun | **1.** A member of the british order of honor; ranks below a baron but above a knight. | *"And where’s Bart?” Grandfather Smallweed inquires of Judy, Bart’s twin sister."* — Charles Dickens, *Bleak House* |
| [[bartender]] | noun | **1.** An employee who mixes and serves alcoholic drinks at a bar. | *"Brad hefted Scarf's weapon, slipped it into 'safe' and, passing the bar, handed it to the bartender with a nod that was returned with a respectful wave."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[barter]] | noun | **1.** An equal exchange.<br>**2.** Exchange goods without involving money. | *"But with a baser man of arms by far Once in contempt they would have barter’d me, Which I disdaining scorn’d, and craved death Rather than I would be so vile-esteem’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[barterer]] | noun | **1.** A trader who exchanges goods and not money. | *"In academic literature, barterer designates a trader who exchanges goods and not money."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barth]] | noun | **1.** Swiss protestant theologian (1886-1968).<br>**2.** United states novelist (born in 1930). | *"Now by the fact of Lauriston and Barthélemi having been sent, and by the reports of the guerrillas, Kutúzov was almost sure that the wound was mortal."* — graf Leo Tolstoy, *War and Peace* |
| [[barthelme]] | noun | **1.** United states author of sometimes surrealistic stories (1931-1989). | *"In academic literature, barthelme designates united states author of sometimes surrealistic stories (1931-1989)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartholdi]] | noun | **1.** French sculptor best known for creating the statue of liberty now in new york harbor. | *"In academic literature, bartholdi designates french sculptor best known for creating the statue of liberty now in new york harbor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartholin]] | noun | **1.** Danish physician who discovered bartholin's gland (1585-1629). | *"In academic literature, bartholin designates danish physician who discovered bartholin's gland (1585-1629)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartlesville]] | noun | **1.** A town in northeastern oklahoma. | *"In academic literature, bartlesville designates a town in northeastern oklahoma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartlett]] | noun | **1.** United states explorer who accompanied peary's expedition to the north pole and who led many other arctic trips (1875-1946).<br>**2.** United states publisher and editor who compiled a book of familiar quotations (1820-1905). | *"Farr, of Norwalk, Ohio--Miss Bartlett, of the Soldiers' Aid Society, Peoria, Ill.--Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[bartok]] | noun | **1.** Hungarian composer and pianist who collected hungarian folk music; in 1940 he moved to the united states (1881-1945). | *"In academic literature, bartok designates hungarian composer and pianist who collected hungarian folk music; in 1940 he moved to the united states (1881-1945)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartonia]] | noun | **1.** Annual grown especially for its fragrant golden nocturnal flowers. | *"In academic literature, bartonia designates annual grown especially for its fragrant golden nocturnal flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bartramia]] | noun | **1.** A genus of scolopacidae. | *"In academic literature, bartramia designates a genus of scolopacidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baruch]] | noun | **1.** Economic advisor to united states presidents (1870-1965).<br>**2.** A disciple of and secretary for the prophet jeremiah. | *"On the Improvement of the Understanding (Treatise on the Emendation of the Intellect) by Baruch Spinoza [Benedict de Spinoza] Translated by R."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[barunduki]] | noun | **1.** Terrestrial siberian squirrel. | *"In academic literature, barunduki designates terrestrial siberian squirrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barycenter]] | noun | **1.** (astronomy) the common center of mass around which two or more bodies revolve. | *"In academic literature, barycenter designates (astronomy) the common center of mass around which two or more bodies revolve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barye]] | noun | **1.** The absolute unit of pressure equal to one dyne per square centimeter. | *"In academic literature, barye designates the absolute unit of pressure equal to one dyne per square centimeter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baryon]] | noun | **1.** Any of the elementary particles having a mass equal to or greater than that of a proton and that participate in strong interactions; a hadron with a baryon number of +1. | *"In academic literature, baryon designates any of the elementary particles having a mass equal to or greater than that of a proton and that participate in strong interactions; a hadron with a baryon number of +1."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baryshnikov]] | noun | **1.** Russian dancer and choreographer who migrated to the united states (born in 1948). | *"In academic literature, baryshnikov designates russian dancer and choreographer who migrated to the united states (born in 1948)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[baryta]] | noun | **1.** Any of several compounds of barium. | *"It was the bisulphate of baryta.” “No, no, the mystery!” I cried."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[barytes]] | noun | **1.** A white or colorless mineral (baso4); the main source of barium. | *"In academic literature, barytes designates a white or colorless mineral (baso4); the main source of barium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barytic]] | adjective | **1.** Of or relating to or containing baryta. | *"In academic literature, barytic designates of or relating to or containing baryta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barytone]] | noun | **1.** A male singer. | *"Oh, my eye!” Songs followed--college songs, popular airs, opera bits--all delivered in' a resounding barytone and accompanied by thumping chords improvised by the performer."* — Grace S. Richmond, *Red Pepper Burns* |
| [[debar]] | verb | **1.** Bar temporarily; from school, office, etc.<br>**2.** Prevent the occurrence of; prevent from happening. | *"The fear o’ hell’s a hangman’s whip, To haud the wretch in order; But where ye feel your honour grip, Let that aye be your border; Its slightest touches, instant pause— Debar a’ side-pretences; And resolutely keep its laws, Uncaring consequences."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[debarment]] | noun | **1.** The state of being debarred (excluded from enjoying certain possessions or rights or practices).<br>**2.** The act of prevention by legal means. | *"In academic literature, debarment designates the state of being debarred (excluded from enjoying certain possessions or rights or practices)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disbar]] | verb | **1.** Remove from the bar; expel from the practice of law by official action. | *"In academic literature, disbar designates remove from the bar; expel from the practice of law by official action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disbarment]] | noun | **1.** The act of expelling a lawyer from the practice of law. | *"In academic literature, disbarment designates the act of expelling a lawyer from the practice of law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unbar]] | verb | **1.** Remove a bar from (a door). | *"Yet am I better Than one that’s sick o’ th’ gout, since he had rather Groan so in perpetuity than be cur’d By th’ sure physician death, who is the key T’ unbar these locks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unbarred]] | verb | **1.** Remove a bar from (a door).<br>**2.** Not firmly fastened or secured. | *"Let me in, Peter.” It was Tink, and quickly he unbarred to her."* — J. M. Barrie, *Peter Pan* |
| [[unbarreled]] | adjective | **1.** Not in a barrel. | *"In academic literature, unbarreled designates not in a barrel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unbarrelled]] | adjective | **1.** Not in a barrel. | *"In academic literature, unbarrelled designates not in a barrel."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Weight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BAR
  </div>
</div>
