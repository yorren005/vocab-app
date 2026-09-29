---
status: unread
type: root_dashboard
---
# Dashboard — taur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">taur-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bull or ox”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A powerful horned bull standing firmly in an open grassy pasture.</span>
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

The root **taur** means bull or ox. It refers to bull, steer, bovine virility, astronomical bull, biochemical taurine. In English, this root forms words such as *bull*, *taurine*, *taurocholate*, and *taurocholic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bull or ox
> The root **taur** means bull or ox. It refers to bull, steer, bovine virility, astronomical bull, biochemical taurine. In English, this root forms words such as *bull*, *taurine*, *taurocholate*, and *taurocholic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bull or ox</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A powerful horned bull standing firmly in an open grassy pasture.</mark>
> - **Everyday Connection**: Think of familiar words like *bull* and *taurine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **taur** comes from a Latin word that means *"bull or ox"*.
  - At its core, it describes bull or ox.

- **The Big Picture Idea**:
  - Picture a powerful horned bull standing firmly in an open grassy pasture.
  - Whenever you see **taur** in an English word, think of **a bull, ox, or bovine strength**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of bull or ox.
  - **Mental & Social**: How people experience, organize, or communicate about bull or ox.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bull**: An everyday English word showing the root's idea of *bull or ox*.
  - **Taurine**: A sulfur-containing aminosulfonic acid essential for bile acid coupling, cardiovascular modulation, retinal development, and osmoregulation.
  - **Taurocholate**: A sodium or potassium salt of taurocholic acid present in mammalian bile that acts as a powerful surfactant to emulsify dietary fats.
  - **Taurocholic**: Of or pertaining to taurocholic acid, a conjugated bile acid formed by the enzymatic coupling of cholic acid with taurine.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">taur</mark>, think of <mark class="hl-def">a bull, ox, or bovine strength</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **taur** enters English through Classical Latin astronomical borrowings, Greco-Latin mythological compounds, and biochemical discoveries:
> 1. **Astronomical & Zoological Borrowing:**
>    - Latin *taurus* ➔ *Taurus* (zodiac sign and constellation).
>    - `taur-` + `-ine` (*-īnus*) ➔ *taurine* (of a bull; the amino acid isolated from ox bile).
>    - `tauri-` + `forma` ("shape") ➔ *tauriform* (bull-shaped).
> 2. **Biochemical & Physiological Compounding:**
>    - *taurine* + Greek *cholē* ("bile") ➔ *taurocholate* / *taurocholic acid*.
> 3. **Greco-Latin Mythological Compounding:**
>    - *Minōs* (King Minos) + *tauros* ➔ *Minotaur* ("Bull of Minos").
>    - *kentron* ("goad, spike") + *tauros* ➔ *Centaur* ("bull-spearer").
>    - *tauros* + *machē* ("battle") ➔ *tauromachy* (bullfighting).
>    - *tauros* + *morphē* ("form") ➔ *tauromorphic* (having the shape of a bull).
> 4. **Sacrificial & Hispanic Cult Forms:**
>    - *tauros* + *ballein* ("to strike down") ➔ *taurobolium* (Roman bull-blood baptism).
>    - Spanish *toro* (< Latin *taurus*) + agent *-ero* ➔ *torero* (bullfighter).

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
> Although derived from the physical bull, the semantic branches divide into vivid categories:
> - **Biochemical Metabolism:** [[taurine]] acts as an essential intracellular osmolyte and neurotransmitter modulator, popularized worldwide as a key additive in energy drinks.
> - **Ancient Religious Mystery:** [[taurobolium]] was the most dramatic ritual of the late Roman Empire, where worshippers stood beneath wooden grates to be drenched in hot bull blood for spiritual rebirth.
> - **Mythological Labyrinth:** The [[Minotaur]] represents the terrifying hybrid of human intellect and bestial savagery.
> - **Arena Spectacle:** [[tauromachy]] and [[torero]] capture the deadly ritual choreography between matador and fighting bull in Spain and Latin America.

---

## 🔀 4. Prefix & Combining Dynamics on taur

### Structural Compounding on `taur-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-īnus` | belonging to | [[taurine]] | Pertaining to bulls; the aminosulfonic acid discovered in ox bile |
| `Minōs` | King of Crete | [[Minotaur]] | Mythological man-eating bull monster of the Knossos labyrinth |
| `machē` | battle, combat | [[tauromachy]] | The art, tradition, and spectacle of Iberian bullfighting |
| `cholē` | bile, gall | [[taurocholate]] | Conjugated bile acid salt emulsifying dietary lipids in the gut |
| `forma` | shape, contour | `tauriform` | Resembling the robust physical morphology or horns of a bull |
| `caedere` | to slay, kill | `tauricide` | The killing of a bull, or the person who slays it in an arena |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Human Nutrition & Metabolic Medicine:** Taurine supplementation in infant formula, cardiomyopathy prevention, energy beverages, and feline obligate nutrition.
> - **Observational Astronomy:** Constellation Taurus, the Crab Nebula (M1 supernova remnant), the Pleiades open star cluster.
> - **Classical Archaeology & Epigraphy:** Minoan bull-leaping frescoes at Knossos, Roman Mithraic temple bas-reliefs (*tauroctony*).
> - **Iberian Anthropology & Arts:** Ernest Hemingway's *Death in the Afternoon*, Goya and Picasso's tauromaquia etchings.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[tauriform]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin taur within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of taur in systematic terminology. | *"In academic literature, tauriform designates pertaining to, derived from, or characteristic of latin taur within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[taurine]] | noun | **1.** A colorless crystalline substance obtained from the bile of mammals.<br>**2.** Of or relating to or resembling a bull. | *"In academic literature, taurine designates a colorless crystalline substance obtained from the bile of mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[taurobolium]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin taur within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of taur in systematic terminology. | *"That Salvation was not from within, was the testimony of every man who underwent the _taurobolium_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[tauromachy]] | noun | **1.** The activity at a bullfight. | *"In academic literature, tauromachy designates the activity at a bullfight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[taurotragus]] | noun | **1.** African antelopes: elands. | *"In academic literature, taurotragus designates african antelopes: elands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[taurus]] | noun | **1.** Venezuelan master terrorist raised by a marxist-leninist father; trained and worked with many terrorist groups (born in 1949).<br>**2.** (astrology) a person who is born while the sun is in taurus. | *"Enter Caesar with his army and Taurus marching."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · TAUR
  </div>
</div>
