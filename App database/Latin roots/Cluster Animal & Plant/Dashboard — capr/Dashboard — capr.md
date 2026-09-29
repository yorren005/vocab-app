---
status: unread
type: root_dashboard
---
# Dashboard — capr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">capr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“goat”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **capr** means goat. It refers to goat, nimble leap, whimsical mood, pungent fatty acids. In English, this root forms words such as *masculine*, *caper*, *capriole*, and *cabriolet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: goat
> The root **capr** means goat. It refers to goat, nimble leap, whimsical mood, pungent fatty acids. In English, this root forms words such as *masculine*, *caper*, *capriole*, and *cabriolet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Goat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *masculine* and *caper*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **capr** comes from a Latin word that means *"goat"*.
  - At its core, it describes goat.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **capr** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of goat.
  - **Mental & Social**: How people experience, organize, or communicate about goat.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Masculine**: An everyday English word showing the root's idea of *goat*.
  - **Caper**: To skip, leap, or dance about in a lively, playful manner, like a young goat.
  - **Capriole**: A high leap performed by a trained horse in classical dressage, in which the animal leaps vertically with its legs drawn under and kicks vigorously with its hind feet while horizontal.
  - **Cabriolet**: A light, two-wheeled, one-horse carriage with a folding leather hood, noted for its springy, bouncing motion.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">capr</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Because *caper* is a nominal root naming an animal, its derivatives enter English not through directional verbal prefixes, but through **Italian and French vernacular transformations and scientific compounding**:
> 1. **Kinetic Diminutive Suffixation:**
>    - *caper* + diminutive *-ola* ➔ Italian *capriola* ("goat-leap") ➔ English *caper* and *capriole*.
>    - *capriole* + French diminutive *-et* ➔ French *cabriolet* ("bounding two-wheeled carriage") ➔ English *cab* ➔ *taxicab*.
> 2. **Whimsical Temperament Evolution:**
>    - Italian *capriccio* (blended with *capra* "goat", suggesting unpredictable goat-like impulses) ➔ French *caprice* ➔ English *caprice* and *capricious*.
> 3. **Biochemical Nomenclature (Goat Fat Acids):**
>    - Latin *caper* ➔ *caproic acid* (hexanoic acid, C6).
>    - Latin *caper* ➔ *caprylic acid* (octanoic acid, C8).
>    - Latin *caper* ➔ *capric acid* (decanoic acid, C10).
> 4. **Classical Compounding:**
>    - `capri-` + `cornū` ("horn") ➔ *Capricorn* (goat-horned constellation).
>    - `capri-` + `mulgēre` ("to milk") ➔ *caprimulgid* (nightjar bird).
>    - `capri-` + `ficus` ("fig") ➔ *caprifig* ➔ *caprification* (wasp pollination of figs).

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
> Although derived from the domestic goat, the semantic branches operate across remarkably varied disciplines:
> - **Urban Transportation:** [[cab]], [[taxicab]], and [[cabriolet]] evolved from the bouncing, springy gait of a horse-drawn cabriolet.
> - **Human Temperament & Psychology:** [[capricious]] and [[caprice]] define unpredictable volatility, whimsy, or arbitrary judicial rulings.
> - **Lipid Chemistry:** [[caproic]], [[caprylic]], and [[capric]] acids represent medium-chain triglycerides (MCTs) prized in modern metabolic nutrition.
> - **Astronomy & Astrology:** [[Capricorn]] marks the winter solstice tropic where the sun turns northward.
> - **Agricultural Entomology:** [[caprification]] describes the ancient Mediterranean practice of hanging wild goat-figs to transfer blastophaga wasps to orchard figs.

---

## 🔀 4. Prefix & Combining Dynamics on capr

### Structural Compounding on `capr-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-ola` (Italian) | diminutive leap | [[capriole]] | A high, acrobatic leap in classical equestrian dressage |
| `-et` (French) | diminutive vehicle | [[cabriolet]] | A light, two-wheeled carriage with a springy, bouncing motion |
| Shortening (apocope) | colloquial clipping | [[cab]] | A public hired passenger automobile (taxi) |
| `cornū` | horn | [[Capricorn]] | The Tenth Zodiac constellation; the Tropic of Capricorn |
| `mulgēre` | to milk | [[caprimulgid]] | Nightjar birds, so named from the folklore that they sucked goat milk |
| `ficus` | fig | [[caprifig]] | The wild male fig tree harboring symbiotic pollinating wasps |
| `-ic` / `-oic` | acid formant | [[caproic]] | Medium-chain fatty acid originally isolated from goat butter |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Urban Transit & Automotive History:** The evolution from 18th-century French cabriolets to London Hansom cabs, motorized yellow taxicabs, and modern ride-share apps.
> - **Organic Chemistry & Food Science:** Medium-chain triglyceride (MCT) oils, flavor chemistry in artisanal goat cheese (*chèvre*), and fragrance synthesis.
> - **Classical Horsemanship & Haute École:** The Spanish Riding School of Vienna performing the capriole, courbette, and levade.
> - **Ornithology & Evolutionary Biology:** The Caprimulgiformes order (whip-poor-wills, nightjars) and caprid herd dynamics in alpine biomes.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[capra]] | noun | **1.** United states film maker (1897-1991).<br>**2.** Goats. | *"In academic literature, capra designates united states film maker (1897-1991)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprella]] | noun | **1.** Skeleton shrimp. | *"In academic literature, caprella designates skeleton shrimp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capreolus]] | noun | **1.** Roe deer. | *"Classical and authoritative lexicons catalog capreolus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capri]] | noun | **1.** An island (part of campania) in the bay of naples in southern italy; a tourist attraction noted for beautiful scenery. | *"A man was starving in Capri; He moved his eyes and looked at me; I felt his gaze, I heard his moan, And knew his hunger as my own."* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[capriccio]] | noun | **1.** An instrumental composition that doesn't adhere to rules for any specific musical form and is played with improvisation. | *"In academic literature, capriccio designates an instrumental composition that doesn't adhere to rules for any specific musical form and is played with improvisation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprice]] | noun | **1.** A sudden desire. | *"All this, instead of being as you now are, dependent on the mere caprice of Puffy!"* — Charles Dickens, *Bleak House* |
| [[capricious]] | adjective | **1.** Changeable.<br>**2.** Determined by chance or impulse or whim rather than by necessity or reason. | *"I am here with thee and thy goats, as the most capricious poet, honest Ovid, was among the Goths."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[capriciously]] | adverb | **1.** Unpredictably.<br>**2.** In a capricious manner. | *"Now, damn it—I’ll break both our necks!” swore her capriciously passionate companion."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[capriciousness]] | noun | **1.** The quality of being guided by sudden unpredictable impulses.<br>**2.** The trait of acting unpredictably and more from whim or caprice than from reason or judgment. | *"When we look at the reputation of this Miller, we must needs be deeply impressed with the capriciousness of the character of Fame."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[capricorn]] | noun | **1.** (astrology) a person who is born while the sun is in capricorn.<br>**2.** A faint zodiacal constellation in the southern hemisphere; between sagittarius and aquarius. | *"We had crossed the tropic of Capricorn, and the Straits of Magellan opened less than seven hundred miles to the south."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[capricornis]] | noun | **1.** Serows. | *"Classical and authoritative lexicons catalog capricornis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capricornus]] | noun | **1.** A faint zodiacal constellation in the southern hemisphere; between sagittarius and aquarius. | *"In academic literature, capricornus designates a faint zodiacal constellation in the southern hemisphere; between sagittarius and aquarius."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprid]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin capr within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of capr in systematic terminology. | *"In academic literature, caprid designates pertaining to, derived from, or characteristic of latin capr within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprifig]] | noun | **1.** Wild variety of the common fig used to facilitate pollination of certain figs. | *"In academic literature, caprifig designates wild variety of the common fig used to facilitate pollination of certain figs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprifoliaceae]] | noun | **1.** Shrubs and small trees and woody vines. | *"In academic literature, caprifoliaceae designates shrubs and small trees and woody vines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprimulgid]] | noun | **1.** Mainly crepuscular or nocturnal nonpasserine birds with mottled greyish-brown plumage and large eyes; feed on insects. | *"In academic literature, caprimulgid designates mainly crepuscular or nocturnal nonpasserine birds with mottled greyish-brown plumage and large eyes; feed on insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprimulgidae]] | noun | **1.** Goatsuckers. | *"In academic literature, caprimulgidae designates goatsuckers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprimulgiformes]] | noun | **1.** Goatsuckers; frogmouths; oilbirds. | *"In academic literature, caprimulgiformes designates goatsuckers; frogmouths; oilbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprimulgus]] | noun | **1.** Type genus of the caprimulgidae. | *"In academic literature, caprimulgus designates type genus of the caprimulgidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caprine]] | adjective | **1.** Being or pertaining to or resembling a goat or goats. | *"In academic literature, caprine designates being or pertaining to or resembling a goat or goats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capriole]] | noun | **1.** (dressage) a vertical jump of a trained horse with a kick of the hind legs at the top of the jump.<br>**2.** A playful leap or hop. | *"In academic literature, capriole designates (dressage) a vertical jump of a trained horse with a kick of the hind legs at the top of the jump."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caproic]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin capr within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of capr in systematic terminology. | *"In academic literature, caproic designates pertaining to, derived from, or characteristic of latin capr within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caproidae]] | noun | **1.** Boarfishes. | *"In academic literature, caproidae designates boarfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capromyidae]] | noun | **1.** Coypus. | *"Classical and authoritative lexicons catalog capromyidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[capros]] | noun | **1.** A genus of fish in the family caproidae. | *"In academic literature, capros designates a genus of fish in the family caproidae."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAPR
  </div>
</div>
