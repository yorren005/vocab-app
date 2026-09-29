---
status: unread
type: root_dashboard
---
# Dashboard — pan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πᾶς παντός πᾶν πασῶν παντότης πάντοθεν (pantós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“all”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'all'.</span>
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

The Greek root **pan** (πᾶς παντός πᾶν πασῶν παντότης πάντοθεν (pantós)) signifies all. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *continent*, *diapason*, *pan 2*, *pan*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: all
> The Greek root **pan** fundamentally denotes **all**. The physical sensory observation and cognitive anchor underlying 'all'. In classical Greek antiquity, the root denoted 'all', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">all</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'all'.</mark>
> - **Everyday Connection**: Think of familiar words like *continent*, *diapason*, *pan 2*, *pan*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pan** derives from Ancient Greek <mark class="hl-stem">πᾶς παντός πᾶν πασῶν παντότης πάντοθεν (pantós)</mark>, meaning "all".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pan**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'all'.
  - Whenever you see **pan** in an English word, think immediately of **all**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pan</mark>, think of <mark class="hl-def">all</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pan-` (from *πᾶς παντός πᾶν πασῶν παντότης πάντοθεν (pantós)*).
> - **Combining Stem with -o- Connective:** `pano-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

> [!tip] 🌈 The Conceptual Facets of Pan
> - **1. Direct & Concrete Anchor:** Literal instantiation of all in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pan

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pan-` | [[continent]] | Primary root semantic foundation denoting all. |
| **Connecting -o-** | `pano-` | [[diapason]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pan` | [[pan 2]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[contain]] | verb | **1.** Include or contain; have as a component.<br>**2.** Contain or hold; have within. | *"Look what thy memory cannot contain, Commit to these waste blanks, and thou shalt find Those children nursed, delivered from thy brain, To take a new acquaintance of thy mind."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contained]] | verb | **1.** Include or contain; have as a component.<br>**2.** Contain or hold; have within. | *"The last thrilled Salo most, because it contained a summons for him to come to his new home."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[container]] | noun | **1.** Any object that can be used to hold things (especially a large metal boxlike object of standardized dimensions that can be loaded from one form of transport to another). | *"They include high-mass-loaded container ships, construction rigs under tow and objects too large for the spunnel are routed through this sector when we're lined up."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[containment]] | noun | **1.** A policy of creating strategic alliances in order to check the expansion of a hostile power or ideology or to force it to negotiate peacefully.<br>**2.** (physics) a system designed to prevent the accidental release of radioactive material from a reactor. | *"How could He be otherwise, since the spiritual creation was the outgrowth, the emanation, of His infinite self- 519:6 containment and immortal wisdom? /Genesis/ ii. 1."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[continence]] | noun | **1.** The exercise of self constraint in sexual matters.<br>**2.** Voluntary control over urinary and fecal discharge. | *"There is a want of faith, a half-heartedness about men's prayers; they pray as Augustine says he himself did: "Give me chastity and continence, but not now" (Conf, viii. 7, 17)."* — T. R. Glover, *The Jesus of History* |
| [[continency]] | noun | **1.** The exercise of self constraint in sexual matters. | *"This ungenitured agent will unpeople the province with continency."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[continent]] | noun | **1.** One of the six or seven great divisions of land on the globe.<br>**2.** The continent of Europe —used with the. | *"Heart, once be stronger than thy continent; Crack thy frail case!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[continental]] | adjective | **1.** Of or pertaining to or typical of europe.<br>**2.** Of or relating to or concerning the american colonies during and immediately after the american revolutionary war. | *"There was, so to speak, that symmetry in their distortion which is less the characteristic of British than of Continental grotesques of the period."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[diapason]] | noun | **1.** A burst of sound.<br>**2.** The principal foundation stop in the organ extending through the complete range of the instrument. | *"As the dank earth weeps at thy languishment, So I at each sad strain will strain a tear And with deep groans the diapason bear; For burden-wise I’ll hum on Tarquin still, While thou on Tereus descants better skill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pan]] | noun | **1.** A usually broad, shallow, and open container for domestic use (as for cooking).<br>**2.** Any of various similar usually metal receptacles: such as. | *"Good Bardolph, put thy face between his sheets, and do the office of a warming-pan."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pan 2]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pan.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pan 2 designates a term designating an entity, condition, or phenomenon derived from greek pan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panacea]] | noun | **1.** A remedy for all ills or difficulties : cure-all. | *"Snagsby has to lay upon the table half a crown, his usual panacea for an immense variety of afflictions."* — Charles Dickens, *Bleak House* |
| [[pandemic]] | noun | **1.** Occurring over a wide geographic area (such as multiple countries or continents) and typically affecting a significant proportion of the population.<br>**2.** Characterized by very widespread growth or extent : epidemic. | *"In academic literature, pandemic designates occurring over a wide geographic area (such as multiple countries or continents) and typically affecting a significant proportion of the population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandemonium]] | noun | **1.** A wild uproar (as because of anger or excitement in a crowd of people); also : a chaotic situation.<br>**2.** The capital of Hell in Milton's Paradise Lost. | *"The pandemonium above has ceased almost as suddenly as it arose, passed like a fierce gust of wind; but they know that in the passing it has determined their fate."* — J. M. Barrie, *Peter Pan* |
| [[panic]] | noun | **1.** Of, relating to, or arising from a panic.<br>**2.** Of, relating to, or resembling a mental or emotional state (such as fear) that is extreme, sudden, and often groundless —originally used in allusion to the god Pan, who was believed to cause such a state. | *"He followed me when I called him: but cast a regretful look at the postern by which we had gone out, through which I had dragged him back in a panic (I confess it) unworthy of me."* — Mrs. Oliphant, *A Beleaguered City* |
| [[panicky]] | adjective | **1.** Thrown into a state of intense fear or desperation. | *"What time is she coming?" she asked in panicky way, as though she would flee before the visitor arrived."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[panoply]] | noun | **1.** A magnificent or impressive array.<br>**2.** A display of all appropriate appurtenances. | *"The strong man armed may find a stronger man come upon him and take from him the panoply in which he trusted (Luke 11:21, 22)."* — T. R. Glover, *The Jesus of History* |
| [[panoptic]] | noun | **1.** Being or presenting a comprehensive or panoramic view. | *"In academic literature, panoptic designates being or presenting a comprehensive or panoramic view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panoptical]] | adjective | **1.** Including everything visible in one view. | *"In academic literature, panoptical designates including everything visible in one view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panorama]] | noun | **1.** cyclorama.<br>**2.** a picture exhibited a part at a time by being unrolled before the spectator. | *"The sight, coming as it did, superimposed upon the other dark scenery of the previous days, formed a sort of climax to the whole panorama, and it was more than he could endure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[panoramic]] | adjective | **1.** As from an altitude or distance. | *"Below me, as I stand upon this mount, I see, in panoramic view displayed So clearly that with ease I could recount The mighty buildings and the ships fast stayed Within the harbour, Montreal, the port Of Canada, and once its chiefest fort."* — Wilfred S. Skeats, *The song of the exile* |
| [[pantheon]] | noun | **1.** The gods of a people; especially : the officially recognized gods.<br>**2.** A temple dedicated to all the gods. | *"And for an onset, Titus, to advance Thy name and honourable family, Lavinia will I make my empress, Rome’s royal mistress, mistress of my heart, And in the sacred Pantheon her espouse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pantology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pan.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pantology designates a term designating an entity, condition, or phenomenon derived from greek pan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parrhesia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pan.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, parrhesia designates a term designating an entity, condition, or phenomenon derived from greek pan."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Mathematics]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PAN
  </div>
</div>
