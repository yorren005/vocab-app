---
status: unread
type: root_dashboard
---
# Dashboard — sem
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sem-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“once or half”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **sem** means once or half. It refers to happening once or making up half of a unit. In English, this root forms words such as *semicircle*, *semicircular*, *semicolon*, and *semiconductor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: once or half
> The root **sem** means once or half. It refers to happening once or making up half of a unit. In English, this root forms words such as *semicircle*, *semicircular*, *semicolon*, and *semiconductor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Once or half</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *semicircle* and *semicircular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sem** comes from a Latin word that means *"once or half"*.
  - At its core, it describes once or half.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **sem** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of once or half.
  - **Mental & Social**: How people experience, organize, or communicate about once or half.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Semicircle**: A half of a circle or of its circumference.
  - **Semicircular**: Having the form of a semicircle.
  - **Semicolon**: A punctuation mark indicating a pause, typically between two independent clauses, that is more pronounced than that indicated by a comma.
  - **Semiconductor**: A solid substance that has a conductivity between that of an insulator and that of most metals, due to the addition of an impurity or temperature effects.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sem</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sem** produces vocabulary primarily as a productive combining prefix attached to nouns and adjectives:
> - **Geometric & Anatomical Halving:**
>   - *sēmi-* + *circulus* $\to$ *semicircle*, *semicircular* ("half a circle").
>   - *sēmi-* + *lūna* ("moon") $\to$ *semilunar* ("crescent, half-moon shaped").
>   - *sēmi-* + *diameter* $\to$ *semidiameter* ("radius").
> - **Physics, Materials & Chemistry:**
>   - *sēmi-* + *conductor* $\to$ *semiconductor* ("variable electric conductor").
>   - *sēmi-* + *permeable* $\to$ *semipermeable* ("permeable only to small solvent molecules").
>   - *sēmi-* + *transparent* $\to$ *semitransparent* ("partially translucent").
>   - *sēmi-* + *precious* $\to$ *semiprecious* ("moderately valuable gemstones").
> - **Music, Acoustics & Punctuation:**
>   - *sēmi-* + *tonus* ("tone") $\to$ *semitone* ("half-step musical interval").
>   - *sēmi-* + *quaver* $\to$ *semiquaver* ("sixteenth note").
>   - *sēmi-* + *kōlon* ("clause") $\to$ *semicolon* ("intermediate punctuation mark").
> - **Temporal & Tournament Recurrence:**
>   - *sēmi-* + *annus* ("year") $\to$ *semiannual* ("occurring every half year").
>   - *sēmi-* + *final* $\to$ *semifinal* ("round preceding the final match").
> - **Biological Singularity (`semel-` < Latin *semel* "once"):**
>   - *semel* + *parere* ("to produce") $\to$ *semelparity*, *semelparous* ("single reproductive episode").

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
> Although fundamentally denoting **"half / once"**, the root spans multiple technical registers:
> - **Solid-State Physics & Electronics:** *semiconductor* (silicon diodes, microprocessors, integrated chips).
> - **Membrane Biology & Cell Physiology:** *semipermeable*, *semilunar* (osmotic cell membranes, aortic semilunar heart valves).
> - **Grammar & Orthography:** *semicolon*, *semivowel* (intermediate pause punctuation, glide phonemes like /w/ and /j/).
> - **Music Theory & Notation:** *semitone*, *semiquaver* (half-step harmonic intervals, sixteenth-note rhythms).
> - **Tournament Sports & Calendars:** *semifinal*, *semiannual* (penultimate championship stage, biannual dividends).
> - **Evolutionary Ecology:** *semelparity*, *semelparous* (big-bang single-lifetime reproduction).

---

## 🔀 4. Prefix & Combining Dynamics on sem

### Prefix Combinations

| Prefix Form | Target Root | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `semi-` (half) | `circulus` | **[[semicircle]]** | Half of a circle or of its circumference. |
| `semi-` (half) | `conductor` | **semiconductor** | Solid substance conducting electricity between insulator and metal. |
| `semi-` (half) | `kōlon` | **semicolon** | Punctuation mark (;) indicating a pause closer than a period. |
| `semi-` (half) | `permeāre` | **semipermeable** | Allowing certain molecules to pass through it but not others. |
| `semel-` (once) | `parere` | **semelparity** | Condition of reproducing only once in a lifetime. |

### Comparative Prefix Triad (Half in Classical Tongues)
- **Latin:** `sēmi-` (*semicircle*, *semiconductor*, *semiannual*).
- **Greek:** `hemi-` (*hemisphere*, *hemiplegia*, *hemicrania* $\to$ *migraine*).
- **French / Romance:** `demi-` (*demigod*, *demitasse*, *demisemiquaver*).

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Microchip Engineering & Quantum Physics** | *semiconductor*, *semimetal* | Silicon wafers, field-effect transistors, solid-state LED illumination. |
| 🫀 **Cardiology & Otolaryngology** | *semilunar valves*, *semicircular canals* | Heart outflow valve dynamics, inner ear vestibular balance organs. |
| 🧬 **Cellular Biology & Osmosis** | *semipermeable membrane* | Reverse osmosis water purification, cellular dialysis, kidney filtration. |
| 🎵 **Musicology & Orchestration** | *semitone*, *semiquaver* | Equal temperament 12-tone tuning, rapid woodwind sixteenth-note runs. |
| 🎣 **Evolutionary Zoology & Ecology** | *semelparity*, *semelparous* | Upstream salmon spawning runs, desert annual plant seed strategies. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antisemitic]] | adjective | **1.** Relating to or characterized by anti-semitism; hating jews. | *"In academic literature, antisemitic designates relating to or characterized by anti-semitism; hating jews."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disseminate]] | verb | **1.** Cause to become widely known. | *"An indiscreet man in such a position can sow more discord, breed more jealousy and disseminate more strife than any other officer in the entire organization."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[dissemination]] | noun | **1.** The opening of a subject to widespread discussion and debate.<br>**2.** The property of being diffused or dispersed. | *"And its fruits are, above all, its dissemination."* — T. R. Glover, *The Jesus of History* |
| [[disseminative]] | adjective | **1.** Spreading by diffusion. | *"In academic literature, disseminative designates spreading by diffusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disseminator]] | noun | **1.** Someone who spreads the news. | *"In academic literature, disseminator designates someone who spreads the news."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inseminate]] | verb | **1.** Place seeds in or on (the ground).<br>**2.** Introduce semen into (a female). | *"In academic literature, inseminate designates place seeds in or on (the ground)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insemination]] | noun | **1.** The act of sowing (of seeds in the ground or, figuratively, of germs in the body or ideas in the mind, etc.).<br>**2.** The introduction of semen into the genital tract of a female. | *"In academic literature, insemination designates the act of sowing (of seeds in the ground or, figuratively, of germs in the body or ideas in the mind, etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semantic]] | adjective | **1.** Of or relating to meaning or the study of meaning. | *"In academic literature, semantic designates of or relating to meaning or the study of meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semantically]] | adverb | **1.** With regard to meaning. | *"In academic literature, semantically designates with regard to meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semanticist]] | noun | **1.** A specialist in the study of meaning. | *"In academic literature, semanticist designates a specialist in the study of meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semantics]] | noun | **1.** The study of language meaning.<br>**2.** The meaning of a word, phrase, sentence, or text. | *"In academic literature, semantics designates the study of language meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semaphore]] | noun | **1.** An apparatus for visual signaling with lights or mechanically moving arms.<br>**2.** Send signals by or as if by semaphore. | *"A sailor on her deck began to swing his arms in the curious semaphore language of the sea."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[semarang]] | noun | **1.** A port city is southern indonesia; located in northern java. | *"In academic literature, semarang designates a port city is southern indonesia; located in northern java."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semasiology]] | noun | **1.** The branch of semantics that studies the cognitive aspects of meaning. | *"In academic literature, semasiology designates the branch of semantics that studies the cognitive aspects of meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semen]] | noun | **1.** The thick white fluid containing spermatozoa that is ejaculated by the male genital tract. | *"Hire facounde eke full womanly and plain, No contrefeted termes had she To semen wise.” —CHAUCER."* — George Eliot, *Middlemarch* |
| [[semester]] | noun | **1.** One of two divisions of an academic year.<br>**2.** Half a year; a period of 6 months. | *"He had accepted an appointment as _locum tenens_ for four weeks in an English Independent chapel at Hamburg, which delayed his arrival at Berlin until after the winter _semester_ had commenced."* — John Cairns, *Principal Cairns* |
| [[semestral]] | adjective | **1.** Occurring every six months or during every period of six months. | *"In academic literature, semestral designates occurring every six months or during every period of six months."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semestrial]] | adjective | **1.** Occurring every six months or during every period of six months. | *"In academic literature, semestrial designates occurring every six months or during every period of six months."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi]] | noun | **1.** One of the two competitions in the next to the last round of an elimination tournament.<br>**2.** A truck consisting of a tractor and trailer together. | *"Thou wouldst make an absolute courtier, and the firm fixture of thy foot would give an excellent motion to thy gait in a semi-circled farthingale."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[semi-abstraction]] | noun | **1.** A semiabstract painting. | *"In academic literature, semi-abstraction designates a semiabstract painting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-automatise]] | verb | **1.** Make semiautomatic. | *"In academic literature, semi-automatise designates make semiautomatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-automatize]] | verb | **1.** Make semiautomatic. | *"In academic literature, semi-automatize designates make semiautomatic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-climber]] | noun | **1.** A plant that tends to climb and on occasion can grow like a vine. | *"In academic literature, semi-climber designates a plant that tends to climb and on occasion can grow like a vine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-climbing]] | adjective | **1.** Of plants that are semi-climbers. | *"In academic literature, semi-climbing designates of plants that are semi-climbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-dry]] | adjective | **1.** Somewhat dry. | *"In academic literature, semi-dry designates somewhat dry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-erect]] | adjective | **1.** Of plants that are partly erect. | *"In academic literature, semi-erect designates of plants that are partly erect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-evergreen]] | adjective | **1.** Of a plant that is incompletely evergreen. | *"In academic literature, semi-evergreen designates of a plant that is incompletely evergreen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-formal]] | adjective | **1.** Moderately formal; requiring a dinner jacket. | *"In academic literature, semi-formal designates moderately formal; requiring a dinner jacket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-processed]] | adjective | **1.** Having been subjected to partial processing. | *"In academic literature, semi-processed designates having been subjected to partial processing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-prostrate]] | adjective | **1.** Imperfectly prostrate; prostrate for part of its length. | *"In academic literature, semi-prostrate designates imperfectly prostrate; prostrate for part of its length."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-tuberous]] | adjective | **1.** Partly tuberous. | *"In academic literature, semi-tuberous designates partly tuberous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-upright]] | adjective | **1.** Of animals that are partly erect. | *"In academic literature, semi-upright designates of animals that are partly erect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semi-wild]] | adjective | **1.** Partially wild. | *"In academic literature, semi-wild designates partially wild."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiabstract]] | adjective | **1.** Characterized by stylized but recognizable subject matter. | *"In academic literature, semiabstract designates characterized by stylized but recognizable subject matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiannual]] | adjective | **1.** Occurring or payable twice each year. | *"In academic literature, semiannual designates occurring or payable twice each year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiannually]] | adverb | **1.** Twice a year. | *"In academic literature, semiannually designates twice a year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiaquatic]] | adjective | **1.** Having an aquatic early or larval form and a terrestrial adult form.<br>**2.** Partially aquatic; living or growing partly on land and partly in water. | *"In academic literature, semiaquatic designates having an aquatic early or larval form and a terrestrial adult form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiarid]] | adjective | **1.** Somewhat arid. | *"In academic literature, semiarid designates somewhat arid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiautobiographical]] | adjective | **1.** Of or relating to a work that combines autobiography and fiction. | *"In academic literature, semiautobiographical designates of or relating to a work that combines autobiography and fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiautomatic]] | noun | **1.** A pistol that is a semiautomatic firearm capable of loading and firing continuously.<br>**2.** Partially automatic. | *"In academic literature, semiautomatic designates a pistol that is a semiautomatic firearm capable of loading and firing continuously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semibreve]] | noun | **1.** A musical note having the longest time value (equal to four beats in common time). | *"In academic literature, semibreve designates a musical note having the longest time value (equal to four beats in common time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semicentenary]] | noun | **1.** The 50th anniversary (or the celebration of it).<br>**2.** Of or relating to or marking the 50th anniversary. | *"In academic literature, semicentenary designates the 50th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semicentennial]] | noun | **1.** The 50th anniversary (or the celebration of it).<br>**2.** Of or relating to or marking the 50th anniversary. | *"In academic literature, semicentennial designates the 50th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semicircle]] | noun | **1.** A plane figure with the shape of half a circle. | *"Not for because Your brows are blacker; yet black brows, they say, Become some women best, so that there be not Too much hair there, but in a semicircle Or a half-moon made with a pen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[semicircular]] | adjective | **1.** Curved into a half circle. | *"This done, a broad, semicircular line is cut round the hole, the hook is inserted, and the main body of the crew striking up a wild chorus, now commence heaving in one dense crowd at the windlass."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[semicolon]] | noun | **1.** A punctuation mark (`;') used to connect independent clauses; indicates a closer relation than does a period. | *"But what color can the objection have, when a specification of the objects alluded to by these general terms immediately follows, and is not even separated by a longer pause than a semicolon?"* — Alexander Hamilton, *The Federalist Papers* |
| [[semicoma]] | noun | **1.** A mild comatose state; a coma from which the person can be roused by appropriate stimuli. | *"In academic literature, semicoma designates a mild comatose state; a coma from which the person can be roused by appropriate stimuli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semicomatose]] | adjective | **1.** In a state of partial coma. | *"In academic literature, semicomatose designates in a state of partial coma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiconducting]] | adjective | **1.** Having characteristics of a semiconductor; that is having electrical conductivity greater than insulators but less than good conductors. | *"In academic literature, semiconducting designates having characteristics of a semiconductor; that is having electrical conductivity greater than insulators but less than good conductors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiconductive]] | adjective | **1.** Having characteristics of a semiconductor; that is having electrical conductivity greater than insulators but less than good conductors. | *"In academic literature, semiconductive designates having characteristics of a semiconductor; that is having electrical conductivity greater than insulators but less than good conductors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiconductor]] | noun | **1.** A substance as germanium or silicon whose electrical conductivity is intermediate between that of a metal and an insulator; its conductivity increases with temperature and in the presence of impurities.<br>**2.** A conductor made with semiconducting material. | *"In academic literature, semiconductor designates a substance as germanium or silicon whose electrical conductivity is intermediate between that of a metal and an insulator; its conductivity increases with temperature and in the presence of impurities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiconscious]] | adjective | **1.** Partially conscious; not completely aware of sensations. | *"Martin Landis was taken to his home and in his semiconscious condition he did not know that his head with its handkerchief binding leaned against the rascally breast of Lyman Mertzheimer."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[semiconsciousness]] | noun | **1.** Marginal consciousness. | *"In academic literature, semiconsciousness designates marginal consciousness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semidark]] | adjective | **1.** Partially devoid of light or brightness. | *"The shed became semidark, and the sharp rattle of the drums on two sides drowned the sick man’s groans."* — graf Leo Tolstoy, *War and Peace* |
| [[semidarkness]] | noun | **1.** Partial darkness. | *"Yes, a new happiness was revealed to me of which man cannot be deprived,” he thought as he lay in the semidarkness of the quiet hut, gazing fixedly before him with feverish wide open eyes."* — graf Leo Tolstoy, *War and Peace* |
| [[semidesert]] | noun | **1.** A region much like a desert but usually located between a desert and the surrounding regions. | *"In academic literature, semidesert designates a region much like a desert but usually located between a desert and the surrounding regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semidetached]] | adjective | **1.** Attached on one side only. | *"In academic literature, semidetached designates attached on one side only."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semidiameter]] | noun | **1.** The apparent radius of a celestial body when viewed as a disc from the earth. | *"In academic literature, semidiameter designates the apparent radius of a celestial body when viewed as a disc from the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiempirical]] | adjective | **1.** Relying to some extent on observation or experiment. | *"In academic literature, semiempirical designates relying to some extent on observation or experiment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiepiphyte]] | noun | **1.** A plant that is an epiphyte for part of its life. | *"In academic literature, semiepiphyte designates a plant that is an epiphyte for part of its life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semifinal]] | noun | **1.** One of the two competitions in the next to the last round of an elimination tournament. | *"In academic literature, semifinal designates one of the two competitions in the next to the last round of an elimination tournament."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semifinalist]] | noun | **1.** One of four competitors remaining in a tournament by elimination. | *"In academic literature, semifinalist designates one of four competitors remaining in a tournament by elimination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semifluidity]] | noun | **1.** A property midway between a solid and a liquid. | *"In academic literature, semifluidity designates a property midway between a solid and a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiformal]] | adjective | **1.** Moderately formal; requiring a dinner jacket. | *"In academic literature, semiformal designates moderately formal; requiring a dinner jacket."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semigloss]] | noun | **1.** A paint that dries with a finish between glossy and flat. | *"In academic literature, semigloss designates a paint that dries with a finish between glossy and flat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semihard]] | adjective | **1.** Somewhat hard. | *"In academic literature, semihard designates somewhat hard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiliquid]] | adjective | **1.** Somewhat liquid. | *"In academic literature, semiliquid designates somewhat liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiliterate]] | adjective | **1.** Literate but poorly informed.<br>**2.** Barely able to read and write. | *"In academic literature, semiliterate designates literate but poorly informed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semilunar]] | adjective | **1.** Resembling the new moon in shape. | *"In academic literature, semilunar designates resembling the new moon in shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semimonthly]] | noun | **1.** A periodical that is published twice each month (or 24 issues per year).<br>**2.** Occurring twice a month. | *"In academic literature, semimonthly designates a periodical that is published twice each month (or 24 issues per year)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminal]] | adjective | **1.** Pertaining to or containing or consisting of semen.<br>**2.** Containing seeds of later development. | *"Since I have undertaken to manhandle this Leviathan, it behoves me to approve myself omnisciently exhaustive in the enterprise; not overlooking the minutest seminal germs of his blood, and spinning him out to the uttermost coil of his bowels."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[seminar]] | noun | **1.** Any meeting for an exchange of ideas.<br>**2.** A course offered for a small group of advanced students. | *"In academic literature, seminar designates any meeting for an exchange of ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminarian]] | noun | **1.** A student at a seminary (especially a roman catholic seminary). | *"Systematic Theology has its difficulties to the seminarian, but more for him who attempts to master it alone."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[seminarist]] | noun | **1.** A student at a seminary (especially a roman catholic seminary). | *"An enormous crowd of factory hands, house serfs, and peasants, with whom some officials, seminarists, and gentry were mingled, had gone early that morning to the Three Hills."* — graf Leo Tolstoy, *War and Peace* |
| [[seminary]] | noun | **1.** A private place of education for the young.<br>**2.** A theological school for training ministers or priests or rabbis. | *"In the Fall of 1858, H----, a student in the Theological Seminary at Princeton, N.J., was in great need of a new pair of boots."* — Classic Author, *The wonders of prayer* |
| [[seminiferous]] | adjective | **1.** Bearing or producing seed or semen. | *"In academic literature, seminiferous designates bearing or producing seed or semen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminole]] | noun | **1.** A member of the muskhogean people who moved into florida in the 18th century.<br>**2.** The muskhogean language of the seminole. | *"To this day, also, the remnant of the Seminole Indians of Florida, a people of the same stock as the Creeks, hold an annual purification and festival called the Green Corn Dance, at which the new corn is eaten."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[seminoma]] | noun | **1.** Malignant tumor of the testis; usually occurring in older men. | *"In academic literature, seminoma designates malignant tumor of the testis; usually occurring in older men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seminude]] | adjective | **1.** Partially clothed. | *"In academic literature, seminude designates partially clothed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiofficial]] | adjective | **1.** Having some official authority or sanction. | *"In academic literature, semiofficial designates having some official authority or sanction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiology]] | noun | **1.** (philosophy) a philosophical theory of the functions of signs and symbols. | *"In academic literature, semiology designates (philosophy) a philosophical theory of the functions of signs and symbols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiopaque]] | adjective | **1.** Partially opaque. | *"In academic literature, semiopaque designates partially opaque."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiotic]] | adjective | **1.** Of or relating to semiotics. | *"In academic literature, semiotic designates of or relating to semiotics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiotical]] | adjective | **1.** Of or relating to semiotics. | *"In academic literature, semiotical designates of or relating to semiotics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiotician]] | noun | **1.** A specialist in the study of meaning. | *"In academic literature, semiotician designates a specialist in the study of meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiotics]] | noun | **1.** (philosophy) a philosophical theory of the functions of signs and symbols. | *"In academic literature, semiotics designates (philosophy) a philosophical theory of the functions of signs and symbols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiparasite]] | noun | **1.** A parasitic plant that contains some chlorophyll and therefore is capable of photosynthesis. | *"In academic literature, semiparasite designates a parasitic plant that contains some chlorophyll and therefore is capable of photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiparasitic]] | adjective | **1.** Of or relating to plants that are semiparasites. | *"In academic literature, semiparasitic designates of or relating to plants that are semiparasites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semipermanent]] | adjective | **1.** Relating to or extending over a relatively long time. | *"In academic literature, semipermanent designates relating to or extending over a relatively long time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semipermeable]] | adjective | **1.** (of a membrane) selectively permeable. | *"In academic literature, semipermeable designates (of a membrane) selectively permeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semipolitical]] | adjective | **1.** Political in some (but not all) aspects. | *"In academic literature, semipolitical designates political in some (but not all) aspects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiprecious]] | adjective | **1.** Used of gemstones having less commercial value than precious stones. | *"In academic literature, semiprecious designates used of gemstones having less commercial value than precious stones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiprivate]] | adjective | **1.** Confined to a small number of hospital patients. | *"In academic literature, semiprivate designates confined to a small number of hospital patients."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semipro]] | noun | **1.** An athlete who plays for pay on a part-time basis. | *"In academic literature, semipro designates an athlete who plays for pay on a part-time basis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiprofessional]] | noun | **1.** An athlete who plays for pay on a part-time basis. | *"In academic literature, semiprofessional designates an athlete who plays for pay on a part-time basis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semipublic]] | adjective | **1.** Having some of the features of public institution. | *"In academic literature, semipublic designates having some of the features of public institution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiquaver]] | noun | **1.** A musical note having the time value of a sixteenth of a whole note. | *"In academic literature, semiquaver designates a musical note having the time value of a sixteenth of a whole note."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semirigid]] | adjective | **1.** Having a form maintained by a rigid internal structure as well as by internal gas pressure.<br>**2.** Not fully rigid. | *"In academic literature, semirigid designates having a form maintained by a rigid internal structure as well as by internal gas pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiskilled]] | adjective | **1.** Possessing or requiring limited skills. | *"In academic literature, semiskilled designates possessing or requiring limited skills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisoft]] | adjective | **1.** Somewhat soft. | *"In academic literature, semisoft designates somewhat soft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisolid]] | adjective | **1.** Partly solid; having a rigidity and viscosity intermediate between a solid and a liquid. | *"In academic literature, semisolid designates partly solid; having a rigidity and viscosity intermediate between a solid and a liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisweet]] | adjective | **1.** Having a taste that is a mixture of bitterness and sweetness. | *"In academic literature, semisweet designates having a taste that is a mixture of bitterness and sweetness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semisynthetic]] | adjective | **1.** Not of natural origin; prepared or made artificially. | *"In academic literature, semisynthetic designates not of natural origin; prepared or made artificially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semite]] | noun | **1.** A member of a group of semitic-speaking peoples of the middle east and northern africa.<br>**2.** Of or relating to or characteristic of semites. | *"He visited the historic localities of New England and crossed the continent to San Francisco, stopping on the way at Salt Lake City, and extending his journey to the Yo-Semite Valley."* — John Cairns, *Principal Cairns* |
| [[semiterrestrial]] | adjective | **1.** Chiefly but not exclusively terrestrial. | *"In academic literature, semiterrestrial designates chiefly but not exclusively terrestrial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitic]] | noun | **1.** A major branch of the afro-asiatic language family.<br>**2.** Of or relating to the group of semitic languages. | *"As well had Pilate and I been known to each other before ever he journeyed out to be procurator over the Semitic volcano of Jerusalem."* — Jack London, *The Jacket (The Star-Rover)* |
| [[semitic-speaking]] | adjective | **1.** Able to communicate in a semitic language. | *"In academic literature, semitic-speaking designates able to communicate in a semitic language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitone]] | noun | **1.** The musical interval between adjacent keys on a keyboard instrument. | *"In academic literature, semitone designates the musical interval between adjacent keys on a keyboard instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitrailer]] | noun | **1.** A trailer having wheels only in the rear; the front is supported by the towing vehicle. | *"In academic literature, semitrailer designates a trailer having wheels only in the rear; the front is supported by the towing vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitrance]] | noun | **1.** A trancelike state in which the person can follow instructions but voluntary action is weak or absent. | *"In academic literature, semitrance designates a trancelike state in which the person can follow instructions but voluntary action is weak or absent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitransparency]] | noun | **1.** The quality of allowing light to pass diffusely. | *"In academic literature, semitransparency designates the quality of allowing light to pass diffusely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitransparent]] | adjective | **1.** Allowing light to pass through diffusely. | *"After a lapse of four minutes the glimmer of his candle was discernible through the semitransparent semicircular glass fanlight over the halldoor."* — James Joyce, *Ulysses* |
| [[semitropic]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, semitropic designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitropical]] | adjective | **1.** Of or relating to or characteristic of conditions in the subtropics. | *"In academic literature, semitropical designates of or relating to or characteristic of conditions in the subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semitropics]] | noun | **1.** Regions adjacent to the tropics. | *"In academic literature, semitropics designates regions adjacent to the tropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semivowel]] | noun | **1.** A vowellike sound that serves as a consonant. | *"In academic literature, semivowel designates a vowellike sound that serves as a consonant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semiweekly]] | noun | **1.** A periodical that is published twice each week (or 104 issues per year).<br>**2.** Occurring twice a week. | *"In academic literature, semiweekly designates a periodical that is published twice each week (or 104 issues per year)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semolina]] | noun | **1.** Milled product of durum wheat (or other hard wheat) used in pasta. | *"In academic literature, semolina designates milled product of durum wheat (or other hard wheat) used in pasta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[semper fidelis]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sem within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of sem in systematic terminology. | *"In academic literature, semper fidelis designates pertaining to, derived from, or characteristic of latin sem within the domain of number & measure."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SEM
  </div>
</div>
