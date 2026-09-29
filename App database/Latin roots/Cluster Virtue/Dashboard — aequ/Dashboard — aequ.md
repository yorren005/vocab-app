---
status: unread
type: root_dashboard
---
# Dashboard — aequ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">aequ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“even, fair, equal, or level”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing up courageously for what is fair, moral, and honorable.</span>
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

The root **aequ** means even, fair, equal, or level. It describes having the same measure, value, or size, or being balanced and fair. In English, this root forms words such as *equal*, *equality*, *equalize*, and *equalization*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: even, fair, equal, or level
> The root **aequ** means even, fair, equal, or level. It describes having the same measure, value, or size, or being balanced and fair. In English, this root forms words such as *equal*, *equality*, *equalize*, and *equalization*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Even, fair, equal, or level</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing up courageously for what is fair, moral, and honorable.</mark>
> - **Everyday Connection**: Think of familiar words like *equal* and *equality*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aequ** comes from a Latin word that means *"even, fair, equal, or level"*.
  - At its core, it describes even, fair, equal, or level.

- **The Big Picture Idea**:
  - Picture standing up courageously for what is fair, moral, and honorable.
  - Whenever you see **aequ** in an English word, think of **virtue, integrity, and good character**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of even, fair, equal, or level.
  - **Mental & Social**: How people experience, organize, or communicate about even, fair, equal, or level.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Equal**: Being the same in quantity, size, degree, or value.
  - **Equality**: The state of being equal, especially in status, rights, and opportunities.
  - **Equalize**: To make equal, uniform, or balanced across parties.
  - **Equalization**: The act or process of making equal or uniform.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aequ</mark>, think of <mark class="hl-def">virtue, integrity, and good character</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `aequ-` (< Latin *aequus*): Base adjectival root.
  - `equi-` (combining form): *equilibrium, equinox, equivalent*.
  - `iniqu-` (< Latin *inīquus*, with vowel weakening $ae 	o ar{i}$): *iniquity, iniquitous*.
- **Compound Syntagms**:
  - `aequ-` + `animus` ("mind/spirit"): *equanimity*.
  - `aequ-` + `lībra` ("scales/balance"): *equilibrium*.
  - `aequ-` + `nox` ("night"): *equinox*.
  - `aequ-` + `valēre` ("to be worth"): *equivalent*.
  - `aequ-` + `tās` (abstract noun): *equity*.

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
                      ┌── Mathematics & Astronomy: equation, equator, equatorial, equinox
                      │
   [aequ] ────────────┼── Jurisprudence & Ethics: equity, equitable, inequity, iniquity, iniquitous
 (Level / Equal)      │
                      ├── Physics & Balance: equilibrium, equipoise, equivalent, equivalence
                      │
                      └── Psychology & Demeanor: equanimity, equal, equality, equalize
```

---

## 🔀 4. Prefix & Combining Dynamics on aequ
- **`equi-` + `libr-`**: *equilibrium* — balance between opposing physical forces or mental impulses.
- **`equi-` + `nox`**: *equinox* — the biannual moment of equal daylight and darkness.
- **`equi-` + `val-`**: *equivalent* — possessing equal value, force, or significance.
- **`in-` + `aequ-`**: *iniquity* — gross moral wickedness (literally "uneven, unlevel conduct").

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Legal Philosophy**: *Equity* law (remedies, injunctions, trusts); *inequitable* distribution.
- **Astrophysics & Climatology**: The *Equator*; vernal and autumnal *equinoxes*; *equatorial* climates.
- **Physics & Chemistry**: Dynamic chemical *equilibrium*; Le Chatelier's principle; *equipoise*.
- **Mathematics & Algebra**: Algebraic *equations*; differential systems; *equivalence* relations.
- **Psychiatry & Stoic Philosophy**: Mental *equanimity* under existential stress.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adequacy]] | noun | **1.** The quality of being able to meet a need satisfactorily:.<br>**2.** The quality of being sufficient for the end in view. | *"Casaubon’s learning he must have before him the same materials as German scholars—has he not?” Dorothea’s timidity was due to an indistinct consciousness that she was in the strange situation of consulting a third person about the adequacy of Mr."* — George Eliot, *Middlemarch* |
| [[adequate]] | adjective | **1.** Having the requisite qualities or resources to meet a task.<br>**2.** Sufficient for the purpose. | *"He had by this time grown used to being in love; the passion now startled him less even when it tortured him more, and he felt himself adequate to the situation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[adequately]] | adverb | **1.** In an adequate manner or to an adequate degree. | *"It is for sale, but its value has not been adequately appreciated, and I would not part with it.' 'What is its price?' 'I have done affixing any nominal sum."* — Classic Author, *The wonders of prayer* |
| [[adequateness]] | noun | **1.** The quality of being able to meet a need satisfactorily:. | *"In academic literature, adequateness designates the quality of being able to meet a need satisfactorily:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arequipa]] | noun | **1.** A city in southern peru founded in 1540 on the site of an ancient inca city. | *"In academic literature, arequipa designates a city in southern peru founded in 1540 on the site of an ancient inca city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coequal]] | adjective | **1.** Having the same standing before the law. | *"The union is composed of seven coequal and sovereign states, and each state or province is a composition of equal and independent cities."* — Alexander Hamilton, *The Federalist Papers* |
| [[disequilibrium]] | noun | **1.** Loss of equilibrium attributable to an unstable situation in which some forces outweigh others. | *"In academic literature, disequilibrium designates loss of equilibrium attributable to an unstable situation in which some forces outweigh others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equable]] | adjective | **1.** Not varying.<br>**2.** Not easily irritated. | *"The equable manner in which Mrs."* — Charles Dickens, *Bleak House* |
| [[equably]] | adverb | **1.** In an equable manner. | *"In a happy compromise between her two states of existence, she had already become, with her workbasket before her, the equably vivacious companion with a slight judicious flavouring of information, when the Billickin announced herself."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[equal]] | noun | **1.** A person who is of equal standing with another in a group.<br>**2.** Be identical or equivalent to. | *"The Florentines and Senoys are by th’ ears; Have fought with equal fortune, and continue A braving war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equalisation]] | noun | **1.** The act of making equal or uniform. | *"In academic literature, equalisation designates the act of making equal or uniform."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equalise]] | verb | **1.** Compensate; make the score equal.<br>**2.** Make equal, uniform, corresponding, or matching. | *"The reefs were still numerous, but more equalised, and marked on the chart with extreme precision."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[equaliser]] | noun | **1.** Electronic equipment that reduces frequency distortion.<br>**2.** A weight that balances another weight. | *"In academic literature, equaliser designates electronic equipment that reduces frequency distortion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equalitarian]] | noun | **1.** A person who believes in the equality of all people. | *"In academic literature, equalitarian designates a person who believes in the equality of all people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equalitarianism]] | noun | **1.** The doctrine of the equality of mankind and the desirability of political and economic and social equality. | *"In academic literature, equalitarianism designates the doctrine of the equality of mankind and the desirability of political and economic and social equality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equality]] | noun | **1.** The quality of being the same in quantity or measure or value or status.<br>**2.** A state of being essentially equal or equivalent; equally balanced. | *"He is, of course, handsomely paid, and he associates almost on a footing of equality with the highest society.” Everybody starts."* — Charles Dickens, *Bleak House* |
| [[equalization]] | noun | **1.** The act of making equal or uniform. | *"This has led in many cases to absurd underassessment, which boards of equalization have proved powerless to remedy in any great measure."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[equalize]] | verb | **1.** Compensate; make the score equal.<br>**2.** Make equal, uniform, corresponding, or matching. | *"In the attempt to remedy the great evil of unemployment, public works of every kind might be planned and distributed in time so as to better equalize the demand for labor and materials."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[equalizer]] | noun | **1.** Electronic equipment that reduces frequency distortion.<br>**2.** A weight that balances another weight. | *"Interest is therefore the equalizer of the value of things in different periods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[equally]] | adverb | **1.** To the same degree (often followed by `as').<br>**2.** In equal amounts or shares; in a balanced or impartial way. | *"When it appears to you where this begins, Turn your displeasure that way, for our faults Can never be so equal that your love Can equally move with them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equanil]] | noun | **1.** A sedative and tranquilizer (trade name miltown and equanil and meprin) used to treat muscle tension and anxiety. | *"In academic literature, equanil designates a sedative and tranquilizer (trade name miltown and equanil and meprin) used to treat muscle tension and anxiety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equanimity]] | noun | **1.** Steadiness of mind under stress. | *"An exhausted composure, a worn-out placidity, an equanimity of fatigue not to be ruffled by interest or satisfaction, are the trophies of her victory."* — Charles Dickens, *Bleak House* |
| [[equanimous]] | adjective | **1.** In full control of your faculties. | *"In academic literature, equanimous designates in full control of your faculties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equatability]] | noun | **1.** Capability of being equated. | *"In academic literature, equatability designates capability of being equated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equate]] | verb | **1.** Consider or describe as similar, equal, or analogous.<br>**2.** Be equivalent or parallel, in mathematics. | *"This they connected with God after the manner familiar to Jewish thinkers, and following the same lead, began to equate it with God, as a separate being."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[equating]] | noun | **1.** The act of regarding as equal.<br>**2.** Consider or describe as similar, equal, or analogous. | *"In academic literature, equating designates the act of regarding as equal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equation]] | noun | **1.** A mathematical statement that two expressions are equal.<br>**2.** A state of being essentially equal or equivalent; equally balanced. | *"Material causes and emotional effects are not to be arranged in regular equation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[equator]] | noun | **1.** An imaginary line around the earth forming the great circle that is equidistant from the north and south poles.<br>**2.** A circle dividing a sphere or other surface into two usually equal and symmetrical parts. | *"I, Adam Strang, invariably assume my consciousness on a group of low, sandy islands somewhere under the equator in what must be the western Pacific Ocean."* — Jack London, *The Jacket (The Star-Rover)* |
| [[equatorial]] | noun | **1.** A telescope whose mounting has only two axes of motion, one parallel to the earth's axis and the other one at right angles to it.<br>**2.** Of or relating to or at an equator. | *"No possible endeavor then could enable her commander to make the great passage southwards, double Cape Horn, and then running down sixty degrees of latitude arrive in the equatorial Pacific in time to cruise there."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[equerry]] | noun | **1.** An official charged with the care of the horses of princes or nobles.<br>**2.** A personal attendant of the british royal family. | *"There are festivals and entertainments going continually on, and the Duke has his chamberlains and equerries, and the Duchess her mistress of the wardrobe and ladies of honour, just like any other and more potent potentates."* — William Makepeace Thackeray, *Vanity Fair* |
| [[equestrian]] | noun | **1.** A man skilled in equitation.<br>**2.** Of or relating to or composed of knights. | *"A fine young shepherd he is too, ma’am.” “Whose shepherd is he?” said the equestrian in a clear voice."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[equetus]] | noun | **1.** Drumfish. | *"Classical and authoritative lexicons catalog equetus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equiangular]] | adjective | **1.** Having all angles equal. | *"In academic literature, equiangular designates having all angles equal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equid]] | noun | **1.** Hoofed mammals having slender legs and a flat coat with a narrow mane along the back of the neck. | *"In academic literature, equid designates hoofed mammals having slender legs and a flat coat with a narrow mane along the back of the neck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equidae]] | noun | **1.** Horses; asses; zebras; extinct animals. | *"In academic literature, equidae designates horses; asses; zebras; extinct animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equidistant]] | adjective | **1.** The same distance apart at every point. | *"The footprints forming this recent impression were full of information as to pace; they were in equidistant pairs, three or four feet apart, the right and left foot of each pair being exactly opposite one another."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[equidistribution]] | noun | **1.** A flat distribution having equal frequencies of occurrence. | *"In academic literature, equidistribution designates a flat distribution having equal frequencies of occurrence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilateral]] | noun | **1.** A figure whose sides are all equal.<br>**2.** Having all sides or faces equal. | *"In the first course, there was a shoulder of mutton cut into an equilateral triangle, a piece of beef into a rhomboides, and a pudding into a cycloid."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[equilibrate]] | verb | **1.** Bring to a chemical stasis or equilibrium.<br>**2.** Bring into balance or equilibrium. | *"In academic literature, equilibrate designates bring to a chemical stasis or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibration]] | noun | **1.** Stabilization by bringing into equilibrium. | *"In academic literature, equilibration designates stabilization by bringing into equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibrise]] | verb | **1.** Bring into balance or equilibrium. | *"In academic literature, equilibrise designates bring into balance or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equilibrium]] | noun | **1.** A stable situation in which forces cancel one another.<br>**2.** A chemical reaction and its reverse proceed at equal rates. | *"His equilibrium disturbed, he was in extremity at once."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[equilibrize]] | verb | **1.** Bring into balance or equilibrium. | *"In academic literature, equilibrize designates bring into balance or equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equine]] | noun | **1.** Hoofed mammals having slender legs and a flat coat with a narrow mane along the back of the neck.<br>**2.** Resembling a horse. | *"The same wise judge of matters equine Who still preferred some slim four-year-old To the big-boned stock of mighty Berold, And, for strong Cotnar, drank French weak wine, He also must be such a lady’s scorner!"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[equinoctial]] | noun | **1.** The great circle on the celestial sphere midway between the celestial poles.<br>**2.** Relating to the vicinity of the equator. | *"In sooth, thou wast in very gracious fooling last night when thou spok’st of Pigrogromitus, of the Vapians passing the equinoctial of Queubus; ’twas very good, i’ faith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equinox]] | noun | **1.** Either of two times of the year when the sun crosses the plane of the earth's equator and day and night are of equal length.<br>**2.** (astronomy) either of the two celestial points at which the celestial equator intersects the ecliptic. | *"You see this fellow that is gone before, He is a soldier fit to stand by Cæsar And give direction: and do but see his vice, ’Tis to his virtue a just equinox, The one as long as th’ other. ’Tis pity of him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equip]] | verb | **1.** Provide with (something) usually for a specific purpose.<br>**2.** Provide with abilities or understanding. | *"The States-General have authority to enter into treaties and alliances; to make war and peace; to raise armies and equip fleets; to ascertain quotas and demand contributions."* — Alexander Hamilton, *The Federalist Papers* |
| [[equipage]] | noun | **1.** Equipment and supplies of a military force.<br>**2.** A vehicle with wheels drawn by one or more horses. | *"Tulkinghorn; and the complete equipage whirls though the law-stationery business at wild speed all round the clock."* — Charles Dickens, *Bleak House* |
| [[equipment]] | noun | **1.** An instrumentality needed for an undertaking or to perform a service. | *"In the business of preparation and equipment he soon lost himself, and even his grief at parting from Ada, who remained in Hertfordshire while he, Mr."* — Charles Dickens, *Bleak House* |
| [[equipoise]] | noun | **1.** Equality of distribution. | *"They belong to divine Principle, and support the equipoise of that thought-force, which launched the earth in its orbit and said to the 124:24 proud wave, "Thus far and no farther." Spirit is the life, substance, and continuity of all things."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[equipoised]] | adjective | **1.** Lacking lateral dominance; being neither right-handed nor left-handed. | *"In academic literature, equipoised designates lacking lateral dominance; being neither right-handed nor left-handed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equipotent]] | adjective | **1.** Having equal strength or efficacy. | *"In academic literature, equipotent designates having equal strength or efficacy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equipped]] | verb | **1.** Provide with (something) usually for a specific purpose.<br>**2.** Provide with abilities or understanding. | *"I told them that the place was not at all badly equipped, but that it was rather small, and the patients were of course very mixed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[equipping]] | noun | **1.** The act of equiping with weapons in preparation for war.<br>**2.** Provide with (something) usually for a specific purpose. | *"Is the power of raising armies and equipping fleets necessary?"* — Alexander Hamilton, *The Federalist Papers* |
| [[equiprobable]] | adjective | **1.** Equally probable. | *"In academic literature, equiprobable designates equally probable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equipt]] | adjective | **1.** Provided or fitted out with what is necessary or useful or appropriate. | *"In academic literature, equipt designates provided or fitted out with what is necessary or useful or appropriate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equisetaceae]] | noun | **1.** Sole surviving family of the equisetales: fern allies. | *"In academic literature, equisetaceae designates sole surviving family of the equisetales: fern allies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equisetales]] | noun | **1.** Lower tracheophytes in existence since the devonian. | *"In academic literature, equisetales designates lower tracheophytes in existence since the devonian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equisetatae]] | noun | **1.** Horsetails and related forms. | *"In academic literature, equisetatae designates horsetails and related forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equisetum]] | noun | **1.** Horsetails; coextensive with the family equisetaceae. | *"In academic literature, equisetum designates horsetails; coextensive with the family equisetaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equitable]] | adjective | **1.** Fair to all parties as dictated by reason and conscience. | *"Some ill-conditioned growling fellow may say to me, ‘What’s the use of these legal and equitable abuses?"* — Charles Dickens, *Bleak House* |
| [[equitably]] | adverb | **1.** In an equitable manner. | *"The king, Raa Kook, is at least six inches above six feet, and though he would weigh fully three hundred pounds, is so equitably proportioned that one could not call him fat."* — Jack London, *The Jacket (The Star-Rover)* |
| [[equitation]] | noun | **1.** The sport of siting on the back of a horse while controlling its movements. | *"In academic literature, equitation designates the sport of siting on the back of a horse while controlling its movements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equity]] | noun | **1.** The difference between the market value of a property and the claims held against it.<br>**2.** The ownership interest of shareholders in a corporation. | *"An the Prince and Poins be not two arrant cowards, there’s no equity stirring."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equivalence]] | noun | **1.** A state of being essentially equal or equivalent; equally balanced.<br>**2.** Essential equality and interchangeability. | *"There is a complete lack of economic equivalence in the relation of parent and child in early years."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[equivalent]] | noun | **1.** A person or thing equal to another in value or measure or force or effect or significance etc.<br>**2.** The atomic weight of an element that has the same combining capacity as a given weight of another element; the standard is 8 for oxygen. | *"If he does, however, they will leave me in peace, which may be a decent equivalent for the reversion."* — Jane Austen, *Persuasion* |
| [[equivocal]] | adjective | **1.** Open to two or more interpretations; or of uncertain nature or significance; or (often) intended to mislead.<br>**2.** Open to question; ; -anna jameson. | *"What an equivocal companion is this!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equivocally]] | adverb | **1.** In an ambiguous manner. | *"Paitrick, a partridge; used equivocally of a wanton girl."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[equivocalness]] | noun | **1.** Unclearness by virtue of having more than one meaning. | *"In academic literature, equivocalness designates unclearness by virtue of having more than one meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[equivocate]] | verb | **1.** Be deliberately ambiguous or unclear in order to mislead or withhold information. | *"Faith, here’s an equivocator, that could swear in both the scales against either scale, who committed treason enough for God’s sake, yet could not equivocate to heaven: O, come in, equivocator. [_Knocking._] Knock, knock, knock!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equivocation]] | noun | **1.** A statement that is not literally false but that cleverly avoids an unpleasant truth.<br>**2.** Intentionally vague or ambiguous. | *"We must speak by the card, or equivocation will undo us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equivocator]] | noun | **1.** A respondent who avoids giving a clear direct answer. | *"Faith, here’s an equivocator, that could swear in both the scales against either scale, who committed treason enough for God’s sake, yet could not equivocate to heaven: O, come in, equivocator. [_Knocking._] Knock, knock, knock!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equus]] | noun | **1.** Type genus of the equidae: only surviving genus of the family equidae. | *"In academic literature, equus designates type genus of the equidae: only surviving genus of the family equidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadequacy]] | noun | **1.** Lack of an adequate quantity or number.<br>**2.** A lack of competence. | *"One source of her inadequacy is the novelty of the occasion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inadequate]] | adjective | **1.** Lacking the requisite qualities or resources to meet a task.<br>**2.** Not sufficient to meet a need. | *"She tried several ballads, but found them inadequate; till, recollecting the psalter that her eyes had so often wandered over of a Sunday morning before she had eaten of the tree of knowledge, she chanted: “O ye Sun and Moon ..."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[inadequately]] | adverb | **1.** In an inadequate manner or to an inadequate degree. | *"But all this might remain inadequately estimated, were not something said here of the peculiar usages of whaling-vessels when meeting each other in foreign seas, and especially on a common cruising-ground."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[inadequateness]] | noun | **1.** Unsatisfactoriness by virtue of being inadequate. | *"Here, then, are three sources of vague and incorrect definitions: indistinctness of the object, imperfection of the organ of conception, inadequateness of the vehicle of ideas."* — Alexander Hamilton, *The Federalist Papers* |
| [[inequality]] | noun | **1.** Lack of equality. | *"O gracious Duke, Harp not on that; nor do not banish reason For inequality; but let your reason serve To make the truth appear where it seems hid, And hide the false seems true."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inequitable]] | adjective | **1.** Not equitable or fair. | *"The exemptions from taxation in feudal times were great and, viewed from our standpoint, were inequitable, for the upper classes escaped while the peasants bore most of the burdens."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inequitably]] | adverb | **1.** In an inequitable manner. | *"In academic literature, inequitably designates in an inequitable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inequity]] | noun | **1.** Injustice by virtue of not conforming with rules or standards. | *"In academic literature, inequity designates injustice by virtue of not conforming with rules or standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonequivalence]] | noun | **1.** Not interchangeable. | *"In academic literature, nonequivalence designates not interchangeable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonequivalent]] | adjective | **1.** Not equal or interchangeable in value, quantity, or significance. | *"In academic literature, nonequivalent designates not equal or interchangeable in value, quantity, or significance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unequal]] | adjective | **1.** Poorly balanced or matched in quantity or value or measure.<br>**2.** Lacking the requisite qualities or resources to meet a task. | *"To punish me for what you make me do Seems much unequal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unequaled]] | adjective | **1.** Radically distinctive and without equal. | *"With an artistic touch which has placed the sketches just published among 'the books which are books,' he has given an unequaled picture of a boyhood lived under tropical skies."* — Classic Author, *Hawaiian folk tales* |
| [[unequalised]] | adjective | **1.** Not caused to be equal. | *"In academic literature, unequalised designates not caused to be equal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unequalized]] | adjective | **1.** Not caused to be equal. | *"The losses of wages meantime remain unequalized by insurance indemnities."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unequalled]] | adjective | **1.** Radically distinctive and without equal. | *"The view it commands of Cook’s Court at one end (not to mention a squint into Cursitor Street) and of Coavinses’ the sheriff’s officer’s backyard at the other she regards as a prospect of unequalled beauty."* — Charles Dickens, *Bleak House* |
| [[unequally]] | adverb | **1.** In an unequal or partial manner. | *"Worldly goods are divided unequally, and man must not repine."* — Charles Dickens, *Bleak House* |
| [[unequipped]] | adjective | **1.** Without necessary physical or intellectual equipment. | *"In academic literature, unequipped designates without necessary physical or intellectual equipment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unequivocal]] | adjective | **1.** Admitting of no doubt or misunderstanding; having only one meaning or interpretation and leading to only one conclusion.<br>**2.** Clearly defined or formulated; - r.b.taney. | *"Such are the open, unequivocal expressions of contempt and disgust, with which many treat the doctrines of the cross."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[unequivocally]] | adverb | **1.** In an unambiguous manner. | *"And it appears yet more unequivocally, that there is no pretense for the parallel which has been attempted between him and the king of Great Britain."* — Alexander Hamilton, *The Federalist Papers* |
| [[unequivocalness]] | noun | **1.** Clarity achieved by the avoidance of ambiguity. | *"In academic literature, unequivocalness designates clarity achieved by the avoidance of ambiguity."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Virtue]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AEQU
  </div>
</div>
