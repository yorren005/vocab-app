---
status: unread
type: root_dashboard
---
# Dashboard — dem
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">δῆμος (dêmos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“people”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'people'.</span>
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

The Greek root **dem** (δῆμος (dêmos)) signifies people. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Damocles*, *apodeme*, *dem 2*, *dem*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: people
> The Greek root **dem** fundamentally denotes **people**. The physical sensory observation and cognitive anchor underlying 'people'. In classical Greek antiquity, the root denoted 'people', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">people</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'people'.</mark>
> - **Everyday Connection**: Think of familiar words like *Damocles*, *apodeme*, *dem 2*, *dem*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dem** derives from Ancient Greek <mark class="hl-stem">δῆμος (dêmos)</mark>, meaning "people".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with dem**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'people'.
  - Whenever you see **dem** in an English word, think immediately of **people**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dem</mark>, think of <mark class="hl-def">people</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `dem-` (from *δῆμος (dêmos)*).
> - **Combining Stem with -o- Connective:** `demo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Dem
> - **1. Direct & Concrete Anchor:** Literal instantiation of people in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on dem

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `dem-` | [[Damocles]] | Primary root semantic foundation denoting people. |
| **Connecting -o-** | `demo-` | [[apodeme]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `dem` | [[dem 2]] | Relational or directional modification of the core root sense. |

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
| [[apodeme]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek dem.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, apodeme designates a term designating an entity, condition, or phenomenon derived from greek dem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Damocles]] | noun | **1.** A courtier of ancient Syracuse held to have been seated at a banquet beneath a sword hung by a single hair.<br>**2.** An impending disaster. | *"Like Damocles at his celebrated banquet, Rebecca perpetually beheld, amid that gorgeous display, the sword which was suspended over the heads of her people by a single hair."* — Walter Scott, *Ivanhoe: A Romance* |
| [[dem]] | noun | **1.** Demonstrative. | *"Gonzenbach, _op. cit._ Nos. 26, 27; _Der Pentamerone, aus dem Neapolitanischen übertragen_ von Felix Liebrecht (Breslau, 1846), No. 23, vol. i. pp. 294 _sqq._)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[dem 2]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek dem.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, dem 2 designates a term designating an entity, condition, or phenomenon derived from greek dem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagogue]] | noun | **1.** A political leader who appeals to popular prejudices and who makes false claims and promises in order to gain power.<br>**2.** A leader in ancient times who championed the cause of the common people. | *"Do you know that the orange lodges agitated for repeal of the union twenty years before O’Connell did or before the prelates of your communion denounced him as a demagogue?"* — James Joyce, *Ulysses* |
| [[deme]] | noun | **1.** A unit of local government in ancient Attica.<br>**2.** A local population of closely related interbreeding organisms. | *"In academic literature, deme designates a unit of local government in ancient attica."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demise]] | noun | **1.** The time when something ends.<br>**2.** Transfer by a lease or by a will. | *"Tell me what state, what dignity, what honour, Canst thou demise to any child of mine?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demist]] | verb | **1.** Free from mist. | *"In academic literature, demist designates free from mist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democracy]] | noun | **1.** Government by the people : rule of the majority : such as.<br>**2.** A form of government in which the people elect representatives to make decisions, policies, laws, etc. according to law —called also representative democracy. | *"This theory is, in a way, based on an appeal to experience, as to the effect of property on human character, and it has the virtue of expressing one of the ideals of modern democracy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[democratic]] | noun | **1.** Of, relating to, or constituting one of the two major political parties in the U.S. that is usually associated with government regulation of business, finance, and industry, with federally funded education and social services, with separation of church and state, with support for abortion rights, affirmative action, gun control, and policies and laws that protect and support the rights of workers and minorities, and with internationalism and multilateralism in foreign policy.<br>**2.** Based on a form of government in which the people choose leaders by voting : of, relating to, or favoring democracy. | *"The Christian religion has acted both directly and indirectly on the Scottish peasantry, and it has done so the more powerfully because of the democratic character of the Presbyterian form which that religion took in Scotland."* — John Cairns, *Principal Cairns* |
| [[democratise]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratise designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratize]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratize designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographer]] | noun | **1.** A scientist who studies the growth and density of populations and their vital statistics. | *"In academic literature, demographer designates a scientist who studies the growth and density of populations and their vital statistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographic]] | noun | **1.** The statistical characteristics of human populations (such as age or income) used especially to identify markets.<br>**2.** A market or segment of the population identified by demographics. | *"In academic literature, demographic designates the statistical characteristics of human populations (such as age or income) used especially to identify markets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demographist]] | noun | **1.** A scientist who studies the growth and density of populations and their vital statistics. | *"In academic literature, demographist designates a scientist who studies the growth and density of populations and their vital statistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demography]] | noun | **1.** The statistical study of human populations especially with reference to size and density, distribution, and vital statistics. | *"In academic literature, demography designates the statistical study of human populations especially with reference to size and density, distribution, and vital statistics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonym]] | noun | **1.** A word (such as Nevadan or Sooner) used to denote a person who inhabits or is native to a particular place. | *"In academic literature, demonym designates a word (such as nevadan or sooner) used to denote a person who inhabits or is native to a particular place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek dem.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, demophobia designates a term designating an entity, condition, or phenomenon derived from greek dem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demotic]] | noun | **1.** Of, relating to, or written in a simplified form of the ancient Egyptian hieratic writing.<br>**2.** Popular, common. | *"Here is another difficult text: (Figure 2) It is demotic—a style of Egyptian writing and a phase of the language which had perished from the knowledge of all men twenty-five hundred years before the Christian era."* — Mark Twain, *What Is Man? and Other Essays* |
| [[demure]] | adjective | **1.** Affectedly modest or shy especially in a playful or provocative way. | *"There’s never none of these demure boys come to any proof; for thin drink doth so over-cool their blood, and making many fish meals, that they fall into a kind of male green-sickness; and then, when they marry, they get wenches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diadem]] | noun | **1.** Crown; specifically : a royal headband. | *"I found her trimming up the diadem On her dead mistress; tremblingly she stood, And on the sudden dropped."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ecdemic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of people. | *"In academic literature, ecdemic designates adjective*) pertaining to, derived from, or characteristic of people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endemic]] | noun | **1.** Native to a particular locality or region; often, specifically : restricted or peculiar to a particular locality or region.<br>**2.** Persisting over time in a particular region or population. | *"What endemic characteristics were present?"* — James Joyce, *Ulysses* |
| [[endemical]] | adjective | **1.** Of or relating to a disease (or anything resembling a disease) constantly present to greater or lesser extent in a particular locality. | *"In academic literature, endemical designates of or relating to a disease (or anything resembling a disease) constantly present to greater or lesser extent in a particular locality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endemism]] | noun | **1.** Nativeness by virtue of originating or occurring naturally (as in a particular place). | *"In academic literature, endemism designates nativeness by virtue of originating or occurring naturally (as in a particular place)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epidemiologic]] | adjective | **1.** Of or relating to epidemiology. | *"In academic literature, epidemiologic designates of or relating to epidemiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epidemiological]] | adjective | **1.** Of or relating to epidemiology. | *"In academic literature, epidemiological designates of or relating to epidemiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epidemiologist]] | noun | **1.** A medical scientist who studies the transmission and control of epidemic diseases. | *"In academic literature, epidemiologist designates a medical scientist who studies the transmission and control of epidemic diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epidemiology]] | noun | **1.** A branch of medical science that deals with the incidence, distribution, and control of disease in a population.<br>**2.** The sum of the factors controlling the presence or absence of a disease or pathogen. | *"In academic literature, epidemiology designates a branch of medical science that deals with the incidence, distribution, and control of disease in a population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monodomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek dem.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, monodomy designates a term designating an entity, condition, or phenomenon derived from greek dem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polydomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek dem.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, polydomy designates a term designating an entity, condition, or phenomenon derived from greek dem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemocratic]] | adjective | **1.** Not in agreement with or according to democratic doctrine or practice or ideals. | *"I commend the virtuous democracy of this Chamber to read that bill, and then tell this Senate whether there ever was a more undemocratic measure than the bill propounded in Virginia by the party whose cause they espouse."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society & Governance]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DEM
  </div>
</div>
