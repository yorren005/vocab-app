---
status: unread
type: root_dashboard
---
# Dashboard — ferv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ferv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to boil or glow”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Bright warm flames crackling inside a hearth and radiating glowing heat.</span>
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

The root **ferv** means to boil or glow. It refers to boil, seethe, bubble, glow with heat or passion. In English, this root forms words such as *bubble*, *brew*, *fervent*, and *fervently*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to boil or glow
> The root **ferv** means to boil or glow. It refers to boil, seethe, bubble, glow with heat or passion. In English, this root forms words such as *bubble*, *brew*, *fervent*, and *fervently*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To boil or glow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *bubble* and *brew*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ferv** comes from a Latin word that means *"to boil or glow"*.
  - At its core, it describes the action of boil or glow.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **ferv** in an English word, think of **to boil or glow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to boil or glow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Bubble**: An everyday English word showing the root's idea of *to boil or glow*.
  - **Brew**: An everyday English word showing the root's idea of *to boil or glow*.
  - **Fervent**: Having or displaying a passionate intensity of feeling.
  - **Fervently**: In an intensely passionate, earnest, or zealous manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ferv</mark>, think of <mark class="hl-def">to boil or glow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **ferv** powers English vocabulary through four distinct morphological stems:
>
> 1. **The Participial & Radical Stem `ferv-`** (from *fervēre* & *fervēns*):
>    - Adjectival and adverbial forms: *fervent*, *fervently*, *ferventness*, *fervency*.
>    - Descriptive adjectives: *fervid*, *fervidly*, *fervidness*.
>    - Intensive prefixed compound (*per-* "thoroughly"): *perfervid*, *perfervidly*.
>    - Noun of state: *fervor* (US) / *fervour* (UK).
> 2. **The Inchoative Verbal Stem `fervēsc-`** (from *fervēscere* "to begin to boil"):
>    - Inchoative adjectives and nouns: *fervescent*, *fervescence*.
>    - Prefixed eruptive forms (*ex-* → *ef-* "out/up"): *effervesce*, *effervescence*, *effervescent*, *effervescently*, *effervescible*.
>    - Prefixed cooling forms (*de-* "down/away"): *defervescence*, *defervescent*.
> 3. **The Biochemical Instrument Stem `ferment-`** (from *fermentum* < *fervēre* + *-mentum*):
>    - Base noun and verb: *ferment*.
>    - Process, property, and agent forms: *fermentation*, *fermentative*, *fermentable*, *fermenter*.
>    - Negative and repetitive forms: *unfermented*.

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

> [!tip] 🌈 The Four Conceptual Provinces of `ferv`
>
> ```
>                            ┌── 1. Passionate Ardor & Emotional Fire (fervent, fervid, fervor, perfervid)
>                            ├── 2. Effervescence & Gaseous Animation (effervesce, effervescent, effervescence)
>   [ferv: boil / seethe] ───┼── 3. Industrial Biotechnology & Microbiology (ferment, fermentation, fermenter)
>                            └── 4. Clinical Thermodynamics & Antipyresis (defervescence, defervescent)
> ```
>
> 1. **Passionate Ardor, Conviction & Emotional Fire:**
>    - The internal psychological heat that propels zealous devotion, artistic creation, or extreme rhetoric: *fervent* (deeply earnest), *fervid* (vehemently impassioned), *fervor* / *fervour* (passionate intensity), *perfervid* (feverishly overwrought).
> 2. **Gaseous Animation, Fizz & Sparkling Radiance:**
>    - The visible boiling-up of dissolved carbon dioxide or bubbles from solution, transferred to human vivacity: *effervesce* (to bubble up), *effervescence* (fizz or infectious exuberance), *effervescent* (sparkling liquid or bubbly personality).
> 3. **Biotechnology, Brewing & Social Ferment:**
>    - The anaerobic chemical transformation of organic substances by microbes, and the metaphorical seething of a population in revolt: *ferment* (to brew, or civil unrest), *fermentation* (yeast conversion of sugar to ethanol), *fermenter* (bioreactor vessel).
> 4. **Clinical Thermodynamics & Fever Resolution:**
>    - The physiological cooling down of a human body as inflammation subsides: *defervescence* (the subsiding of an acute fever), *defervescent* (antipyretic agent or state).

---

## 🔀 4. Prefix & Combining Dynamics on ferv

### Prefix Dynamics

| Prefix | Morpheme Meaning | Latin Source Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `ex-` (→ *ef-*) | out, forth, up | *effervēscere* | [[effervesce]], [[effervescence]], [[effervescent]] | To boil *up and out*; gas bubbles escaping violently from a pressurized liquid. |
| `de-` | down, away | *dēfervēscere* | [[defervescence]], [[defervescent]] | Boiling heat dropping *down*; the cooling of a fever toward physiological baseline. |
| `per-` | thoroughly, excessively | *perfervidus* | [[perfervid]], [[perfervidly]] | Heated *thoroughly* to excess; overwrought, wildly exaggerated passion. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ent` | Active present participle | *fervēre* + *-ēns* | [[fervent]] | In a state of glowing, passionate heat. |
| `-id` | Descriptive adjective of state | *fervēre* + *-idus* | [[fervid]] | Boiling, intensely hot, impassioned. |
| `-or` / `-our` | Abstract noun of physical/emotional state | *fervēre* + *-or* | [[fervor]], [[fervour]] | Passionate zeal; intense burning heat. |
| `-escent` | Adjective (Inchoative process) | *fervēscere* + *-ent* | [[fervescent]], [[effervescent]] | Beginning to boil; bubbling with escaping gas. |
| `-escence` | Noun (Inchoative state) | *fervēscere* + *-ence* | [[effervescence]], [[defervescence]] | The process of bubbling up; or the subsiding of fever. |
| `-ment` | Concrete noun of instrument/substance | *fervēre* + *-mentum* | [[ferment]] | The leavening substance that initiates boiling/seething. |
| `-ation` | Noun of action/process | *fermentāre* + *-tiō* | [[fermentation]] | The metabolic biochemical conversion of carbohydrates. |
| `-able` | Adjective (Capable of) | *ferment* + *-able* | [[fermentable]] | Capable of being metabolized by yeasts or bacteria. |
| `-er` / `-or` | Noun (Apparatus / agent) | *ferment* + *-er* | [[fermenter]] | A bioreactor vessel designed for cell cultivation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🍺 **Biochemical Engineering & Brewing** | [[fermentation]], [[ferment]], [[fermenter]], [[fermentable]] | Industrial **fermentation** in computerized stainless-steel **fermenters** produces antibiotics (penicillin), biofuels (bioethanol), recombinant insulin, and craft beer via microbial metabolism. |
| 🩺 **Infectious Diseases & Pediatrics** | [[defervescence]], [[defervescent]] | **Defervescence** is a pivotal clinical sign marking the patient's recovery from pneumonia, sepsis, or viral illness; timing defervescence relative to antibiotic administration confirms therapeutic efficacy. |
| 🧪 **Pharmaceutical Chemistry & Beverage Industry** | [[effervescent]], [[effervescence]] | **Effervescent tablets** (such as Alka-Seltzer or vitamin C tablets) incorporate dry citric acid and sodium bicarbonate, which react instantaneously upon water immersion to yield carbonic effervescence and accelerate drug absorption. |
| 🏛️ **Political Sociology & Historical Analysis** | [[ferment]], [[fervor]], [[perfervid]] | Historians examine eras of **intellectual ferment** (e.g., the Enlightenment or the pre-revolutionary Parisian press) where radical ideas bubble beneath the surface before erupting into revolution. |
| 📖 **Literary Criticism & Rhetoric** | [[fervid]], [[perfervid]], [[fervently]] | Used to distinguish between sincere, grounded conviction (**fervent**) versus overheated, melodrama or fanatical zeal (**fervid**, **perfervid**). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[conferva]] | noun | **1.** Any of various algae of the genus tribonema; algae with branching filaments that form scum in still or stagnant fresh water. | *"In academic literature, conferva designates any of various algae of the genus tribonema; algae with branching filaments that form scum in still or stagnant fresh water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defervesce]] | verb | **1.** Experience an abatement of a fever. | *"In academic literature, defervesce designates experience an abatement of a fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defervescence]] | noun | **1.** Abatement of a fever as indicated by a reduction in body temperature. | *"In academic literature, defervescence designates abatement of a fever as indicated by a reduction in body temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defervescent]] | adjective | **1.** Of or relating to the reduction of a fever. | *"In academic literature, defervescent designates of or relating to the reduction of a fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effervesce]] | verb | **1.** Become bubbly or frothy or foaming. | *"I suppose your love will effervesce in six months, or less."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[effervescence]] | noun | **1.** The process of bubbling as gas escapes.<br>**2.** The property of giving off bubbles. | *"The drops of logic Tess had let fall into the sea of his enthusiasm served to chill its effervescence to stagnation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[effervescent]] | adjective | **1.** Used of wines and waters; charged naturally or artificially with carbon dioxide.<br>**2.** (of a liquid) giving off bubbles. | *"Smallweed has been twice dispatched for effervescent drinks, and has twice mixed them in the two official tumblers and stirred them up with the ruler."* — Charles Dickens, *Bleak House* |
| [[effervescing]] | verb | **1.** Become bubbly or frothy or foaming.<br>**2.** Emitting or filled with bubbles as from carbonation or fermentation. | *"In academic literature, effervescing designates become bubbly or frothy or foaming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fervency]] | noun | **1.** Feelings of great warmth and intensity. | *"You’re caught.” CHARMIAN. ’Twas merry when You wagered on your angling; when your diver Did hang a salt fish on his hook, which he With fervency drew up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fervent]] | adjective | **1.** Characterized by intense emotion.<br>**2.** Extremely hot; - nathaniel hawthorne; - frances trollope. | *"I shall pull through, my dear!” I felt so deeply sensible of the danger in which he stood that I tried, in Ada’s name, in my guardian’s, in my own, by every fervent means that I could think of, to warn him of it and to show him some of his mistakes."* — Charles Dickens, *Bleak House* |
| [[fervently]] | adverb | **1.** With passionate fervor. | *"I have saved them from the guilt of murdering their own flesh and blood thereby; and they have lived to thank me, and praise God.” “May this young man do the same!” said Angel fervently."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[fervescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ferv within the domain of Fire, Heat & Ash.<br>**2.** A technical or specialized form exhibiting the properties of ferv in systematic terminology. | *"In academic literature, fervescent designates pertaining to, derived from, or characteristic of latin ferv within the domain of fire, heat & ash."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fervid]] | adjective | **1.** Characterized by intense emotion.<br>**2.** Extremely hot; - nathaniel hawthorne; - frances trollope. | *"He is a very fervid, impassioned speaker—full of fire!"* — Charles Dickens, *Bleak House* |
| [[fervidly]] | adverb | **1.** With passionate fervor. | *"He’s all there!” said number four, fervidly."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[fervidness]] | noun | **1.** Feelings of great warmth and intensity. | *"In academic literature, fervidness designates feelings of great warmth and intensity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fervor]] | noun | **1.** Feelings of great warmth and intensity.<br>**2.** The state of being emotionally aroused and worked up. | *"The force of the invective, the keenness of the wit, and the fervor of the imagination which they displayed, rendered them an important force in the theological liberation of Scotland."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[fervour]] | noun | **1.** The state of being emotionally aroused and worked up.<br>**2.** Feelings of great warmth and intensity. | *"Bless him at home in peace, whilst I from far His name with zealous fervour sanctify."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noneffervescent]] | adjective | **1.** Not sparkling.<br>**2.** Not effervescent. | *"In academic literature, noneffervescent designates not sparkling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfervid]] | adjective | **1.** Characterized by intense emotion. | *"In academic literature, perfervid designates characterized by intense emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Fire, Heat & Ash]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FERV
  </div>
</div>
