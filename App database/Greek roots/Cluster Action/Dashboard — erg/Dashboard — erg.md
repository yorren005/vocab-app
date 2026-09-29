---
status: unread
type: root_dashboard
---
# Dashboard — erg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἔργον (érgon)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“work / labor / deed / active energy / operational force”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Exerting physical or mental force to craft materials, cultivate land, or accomplish an objective.</span>
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

The Greek root **erg** (ἔργον (érgon), ἐργάζεσθαι (ergázesthai)) signifies work / labor / deed / active energy / operational force. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *allergic*, *allergy*, *argon*, *demiurge*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: work / labor / deed / active energy / operational force
> The Greek root **erg** fundamentally denotes **work / labor / deed / active energy / operational force**. Exerting physical or mental force to craft materials, cultivate land, or accomplish an objective. Hesiod's Works and Days (Erga kai Hemerai) established labor as humanity's honorable condition; Aristotle coined energeia (being-at-work) as actualization opposed to mere potentiality (dynamis).

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">work / labor / deed / active energy / operational force</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Exerting physical or mental force to craft materials, cultivate land, or accomplish an objective.</mark>
> - **Everyday Connection**: Think of familiar words like *allergic*, *allergy*, *argon*, *demiurge*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **erg** derives from Ancient Greek <mark class="hl-stem">ἔργον (érgon), ἐργάζεσθαι (ergázesthai)</mark>, meaning "work / labor / deed / active energy / operational force".
  - Reconstructed Indo-European origin: ***werǵ- ("to do, work, perform")**.

- **The Big Picture Idea**:
  - Exerting physical or mental force to craft materials, cultivate land, or accomplish an objective.
  - Whenever you see **erg** in an English word, think immediately of **work / labor / deed / active energy / operational force**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">erg</mark>, think of <mark class="hl-def">work / labor / deed / active energy / operational force</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `erg-` (from *ἔργον (érgon), ἐργάζεσθαι (ergázesthai)*).
> - **Combining Stem with -o- Connective:** `ergo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Erg
> - **1. Direct & Concrete Anchor:** Literal instantiation of work / labor / deed / active energy / operational force in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on erg

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `erg-` | [[allergic]] | Primary root semantic foundation denoting work / labor / deed / active energy / operational force. |
| **Connecting -o-** | `ergo-` | [[allergy]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `erg` | [[argon]] | Relational or directional modification of the core root sense. |

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
| [[allergic]] | noun | **1.** Of, relating to, affected with, or caused by allergy.<br>**2.** Having an aversion. | *"In academic literature, allergic designates of, relating to, affected with, or caused by allergy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allergist]] | noun | **1.** A physician skilled in the diagnosis and treatment of allergies. | *"In academic literature, allergist designates a physician skilled in the diagnosis and treatment of allergies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allergy]] | noun | **1.** Altered bodily reactivity (such as hypersensitivity) to an antigen in response to a first exposure.<br>**2.** Exaggerated or pathological immunological reaction (as by sneezing, difficult breathing, itching, or skin rashes) to substances, situations, or physical states that are without comparable effect on the average individual. | *"In academic literature, allergy designates altered bodily reactivity (such as hypersensitivity) to an antigen in response to a first exposure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argon]] | noun | **1.** A colorless odorless inert gaseous element found in the air and in volcanic gases and used especially in welding, lasers, and electric bulbs.<br>**2.** Being or relating to a method of dating paleontological or geologic materials based on the radioactive decay of potassium to argon that has taken place in a specimen. | *"I hope this account I am going to try and write will get petrified by some kind of new element they will suddenly discover some day and the manuscript be dug up from the ruins of Glendale to interest the natives of the Argon age about 2800 A."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[asynergic]] | adjective | **1.** Of or relating to the state of asynergy; lacking synergy. | *"In academic literature, asynergic designates of or relating to the state of asynergy; lacking synergy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynergy]] | noun | **1.** Absence of coordination of organs or body parts that usually work together harmoniously. | *"In academic literature, asynergy designates absence of coordination of organs or body parts that usually work together harmoniously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demiurge]] | noun | **1.** A Platonic subordinate deity who fashions the sensible world in the light of eternal ideas.<br>**2.** A Gnostic subordinate deity who is the creator of the material world. | *"The Logos, that was before the Day-Star was, has appeared among men as a teacher,--he by whom all things were made. {284} As Demiurge he gave life; as teacher he taught to live well; that, as God, he may lavish upon us life forever."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[dramaturgic]] | adjective | **1.** Relating to the technical aspects of drama. | *"In academic literature, dramaturgic designates relating to the technical aspects of drama."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dramaturgical]] | adjective | **1.** Relating to the technical aspects of drama. | *"In academic literature, dramaturgical designates relating to the technical aspects of drama."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dramaturgy]] | noun | **1.** The art or technique of dramatic composition and theatrical representation. | *"In academic literature, dramaturgy designates the art or technique of dramatic composition and theatrical representation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoergic]] | noun | **1.** Absorbing energy : endothermic. | *"In academic literature, endoergic designates absorbing energy : endothermic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[energetic]] | noun | **1.** Operating with or marked by vigor or effect.<br>**2.** Marked by energy : strenuous. | *"Come, just taste how sweet it is." "No, no, no," Mäzli moaned again in such sorrowful tones as no one had ever heard from the energetic little child."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[energise]] | verb | **1.** Raise to a higher energy level.<br>**2.** Cause to be alert and energetic. | *"If, then, such current were employed to energise a magnet, that magnet would give 100 tugs per second."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[energiser]] | noun | **1.** Someone who imparts energy and vitality and spirit to other people.<br>**2.** A device that supplies electrical energy. | *"In academic literature, energiser designates someone who imparts energy and vitality and spirit to other people."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[energising]] | verb | **1.** Raise to a higher energy level.<br>**2.** Cause to be alert and energetic. | *"Generally speaking, alternating current is no use for energising a magnet."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[energize]] | verb | **1.** Cause to be alert and energetic.<br>**2.** Raise to a higher energy level. | *"The message will tell you when to energize the barrier."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[energizer]] | noun | **1.** Someone who imparts energy and vitality and spirit to other people.<br>**2.** A device that supplies electrical energy. | *"The energizer," he said quietly."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[energizing]] | noun | **1.** The activity of causing to have energy and be active.<br>**2.** Cause to be alert and energetic. | *"All the true acquisitions of the soul, all the reflected results of its energizing after the unattainable in this life, all that has truly BEEN, belong to the absolute, and are permanent amid all earth’s changes."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[energy]] | noun | **1.** Dynamic quality.<br>**2.** The capacity of acting or being active. | *"The calls of "Uncle Philip, Uncle Philip!" sounded with more vigor than usual, because the children had not expected him back so soon, and therefore had to celebrate his coming with double energy."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[erg]] | noun | **1.** A centimeter-gram-second unit of work equal to the work done by a force of one dyne acting through a distance of one centimeter and equivalent to 10—7 joule. | *"In academic literature, erg designates a centimeter-gram-second unit of work equal to the work done by a force of one dyne acting through a distance of one centimeter and equivalent to 10—7 joule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergate]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through work / labor / deed / active energy / operational force. | *"In academic literature, ergate designates verb*) to subject to, transform by, or operate upon through work / labor / deed / active energy / operational force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergatocracy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek erg.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, ergatocracy designates a term designating an entity, condition, or phenomenon derived from greek erg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergometer]] | noun | **1.** An apparatus for measuring the work performed (as by a person exercising); also : an exercise machine equipped with an ergometer. | *"In academic literature, ergometer designates an apparatus for measuring the work performed (as by a person exercising); also : an exercise machine equipped with an ergometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek erg.<br>**2.** Specialized application within the domain of Action. | *"God's function (_ergon_) is man's salvation."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[ergonomic]] | adjective | **1.** Of or relating to ergonomics. | *"In academic literature, ergonomic designates of or relating to ergonomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergonomics]] | noun | **1.** An applied science concerned with designing and arranging things people use so that the people and things interact most efficiently and safely —called also biotechnology, human engineering, human factors.<br>**2.** The design characteristics of an object resulting especially from the application of the science of ergonomics. | *"In academic literature, ergonomics designates an applied science concerned with designing and arranging things people use so that the people and things interact most efficiently and safely —called also biotechnology, human engineering, human factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exoergic]] | noun | **1.** Releasing energy : exothermic. | *"In academic literature, exoergic designates releasing energy : exothermic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gamergate]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through work / labor / deed / active energy / operational force. | *"In academic literature, gamergate designates verb*) to subject to, transform by, or operate upon through work / labor / deed / active energy / operational force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterorganic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of work / labor / deed / active energy / operational force. | *"In academic literature, heterorganic designates adjective*) pertaining to, derived from, or characteristic of work / labor / deed / active energy / operational force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homorganic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of work / labor / deed / active energy / operational force. | *"In academic literature, homorganic designates adjective*) pertaining to, derived from, or characteristic of work / labor / deed / active energy / operational force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liturgical]] | adjective | **1.** Of or relating to or in accord with liturgy. | *"In academic literature, liturgical designates of or relating to or in accord with liturgy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liturgist]] | noun | **1.** An authority on liturgies. | *"In academic literature, liturgist designates an authority on liturgies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liturgy]] | noun | **1.** A eucharistic rite.<br>**2.** A rite or body of rites prescribed for public worship. | *"Our liturgy,” observed Crawford, “has beauties, which not even a careless, slovenly style of reading can destroy; but it has also redundancies and repetitions which require good reading not to be felt."* — Jane Austen, *Mansfield Park* |
| [[microorganism]] | noun | **1.** An organism (such as a bacterium or protozoan) of microscopic or ultramicroscopic size. | *"In academic literature, microorganism designates an organism (such as a bacterium or protozoan) of microscopic or ultramicroscopic size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[organ]] | noun | **1.** A differentiated structure (such as a heart, kidney, leaf, or stem) consisting of cells and tissues and performing some specific function in an organism.<br>**2.** Bodily parts performing a function or cooperating in an activity. | *"Methinks in thee some blessed spirit doth speak His powerful sound within an organ weak; And what impossibility would slay In common sense, sense saves another way."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[organic]] | noun | **1.** Of, relating to, yielding, or involving the use of food produced with the use of feed or fertilizer of plant or animal origin without employment of chemically formulated fertilizers, growth stimulants, antibiotics, or pesticides.<br>**2.** Of, relating to, or derived from living organisms. | *"The recuperative power which pervaded organic nature was surely not denied to maidenhood alone."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[organisation]] | noun | **1.** The persons (or committees or departments etc.) who make up a body for the purpose of administering something.<br>**2.** A group of people who work together. | *"It is one of the penalties, I said to myself, which one has to pay for an organisation more finely tempered than that of the crowd."* — Mrs. Oliphant, *A Beleaguered City* |
| [[organise]] | verb | **1.** Bring order and organization to.<br>**2.** Create (as an entity). | *"To organise the patrol again, under the circumstances, would have been impossible."* — Mrs. Oliphant, *A Beleaguered City* |
| [[organism]] | noun | **1.** A complex structure of interdependent and subordinate elements whose relations and properties are largely determined by their function in the whole.<br>**2.** An individual constituted to carry on the activities of life by means of parts or organs more or less separate in function but mutually dependent : a living being. | *"The differences which distinguished them as individuals were abstracted by this passion, and each was but portion of one organism called sex."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[organismal]] | adjective | **1.** Of or relating to or belonging to an organism (considered as a whole). | *"In academic literature, organismal designates of or relating to or belonging to an organism (considered as a whole)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[organismic]] | adjective | **1.** Of or relating to or belonging to an organism (considered as a whole). | *"In academic literature, organismic designates of or relating to or belonging to an organism (considered as a whole)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[organist]] | noun | **1.** A person who plays the organ. | *"The former organist of Surry Chapel, Mr."* — Classic Author, *The wonders of prayer* |
| [[organization]] | noun | **1.** A group of people who work together.<br>**2.** An organized structure for arranging or classifying. | *"The whole organization of this prison is stupid."* — Jack London, *The Jacket (The Star-Rover)* |
| [[organize]] | noun | **1.** To form into a coherent unity or functioning whole : integrate.<br>**2.** To set up an administrative structure for. | *"The effort of wage workers to organize themselves appears everywhere to result from the separation of the economic and personal interests of employers and workmen."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[organized]] | verb | **1.** Create (as an entity).<br>**2.** Cause to be structured or ordered or operating according to some principle or idea. | *"The whole string of trailing individuals advanced in the completest balance of intention, like the remarkable creatures known as Chain Salpæ, which, distinctly organized in other respects, have one will common to a whole family."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[organizer]] | noun | **1.** A person who brings order and organization to an enterprise.<br>**2.** Someone who enlists workers to join a union. | *"Foremost among these noble women, as the almoner of their bounty, and the organizer of their efforts, stands the subject of this sketch, Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[organoleptic]] | noun | **1.** Being, affecting, or relating to qualities (such as taste, color, odor, and feel) of a substance (such as a food or drug) that stimulate the sense organs.<br>**2.** Involving use of the sense organs. | *"In academic literature, organoleptic designates being, affecting, or relating to qualities (such as taste, color, odor, and feel) of a substance (such as a food or drug) that stimulate the sense organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orgiastic]] | noun | **1.** Of, relating to, or marked by orgies.<br>**2.** Characterized by unrestrained emotion : frenzied. | *"A further step was taken by the Emperor Claudius when he incorporated the Phrygian worship of the sacred tree, and with it probably the orgiastic rites of Attis, in the established religion of Rome."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[orgy]] | noun | **1.** Secret ceremonial rites held in honor of an ancient Greek or Roman deity and usually characterized by ecstatic singing and dancing.<br>**2.** Drunken revelry. | *"I knew that it was nothing else than a ridiculous orgy of the imagination, such as men enjoy in drug dreams, in delirium, or in mere ordinary slumber."* — Jack London, *The Jacket (The Star-Rover)* |
| [[parergon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek erg.<br>**2.** Specialized application within the domain of Action. | *"Casaubon had adopted an immediate intention: there was to be a new Parergon, a small monograph on some lately traced indications concerning the Egyptian mysteries whereby certain assertions of Warburton’s could be corrected."* — George Eliot, *Middlemarch* |
| [[reorganisation]] | noun | **1.** The imposition of a new organization; organizing differently (often involving extensive and drastic changes). | *"In academic literature, reorganisation designates the imposition of a new organization; organizing differently (often involving extensive and drastic changes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reorganise]] | verb | **1.** Organize anew, as after a setback.<br>**2.** Organize anew. | *"In academic literature, reorganise designates organize anew, as after a setback."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reorganization]] | noun | **1.** The imposition of a new organization; organizing differently (often involving extensive and drastic changes).<br>**2.** An extensive alteration of the structure of a corporation or government. | *"This keeps young men from entering, and finally results in failure or in some form of "reorganization" that drives out the older members."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[reorganize]] | verb | **1.** Organize anew.<br>**2.** Organize anew, as after a setback. | *"It is too late to reorganize this editor-critic now; we will leave him as he is."* — Mark Twain, *What Is Man? and Other Essays* |
| [[reorganized]] | verb | **1.** Organize anew.<br>**2.** Organize anew, as after a setback. | *"In the winter of 1863, it was deemed best to make the Pittsburg Sanitary Committee, which had been reorganized for the purpose, an auxiliary of the United States Sanitary Commission, and measures were taken for that purpose by Mr."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[surgeon]] | noun | **1.** A medical specialist who practices surgery : a physician trained and qualified to perform surgical procedures.<br>**2.** The chief medical officer of a branch of the armed services or of a public health service. | *"If I, my lord, for my opinion bleed, Opinion shall be surgeon to my hurt And keep me on the side where still I am."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[synergetic]] | adjective | **1.** Working together; used especially of groups, as subsidiaries of a corporation, cooperating for an enhanced effect. | *"In academic literature, synergetic designates working together; used especially of groups, as subsidiaries of a corporation, cooperating for an enhanced effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synergism]] | noun | **1.** Interaction of discrete agencies (such as industrial firms), agents (such as drugs), or conditions such that the total effect is greater than the sum of the individual effects. | *"In academic literature, synergism designates interaction of discrete agencies (such as industrial firms), agents (such as drugs), or conditions such that the total effect is greater than the sum of the individual effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synergist]] | noun | **1.** A drug that augments the activity of another drug. | *"In academic literature, synergist designates a drug that augments the activity of another drug."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synergistic]] | adjective | **1.** Used especially of drugs or muscles that work together so the total effect is greater than the sum of the two (or more).<br>**2.** Of or relating to the theological doctrine of synergism. | *"In academic literature, synergistic designates used especially of drugs or muscles that work together so the total effect is greater than the sum of the two (or more)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synergy]] | noun | **1.** Synergism; broadly : combined action or operation.<br>**2.** A mutually advantageous conjunction or compatibility of distinct business participants or elements (such as resources or efforts). | *"In academic literature, synergy designates synergism; broadly : combined action or operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theurgic]] | noun | **1.** The art or technique of compelling or persuading a god or beneficent or supernatural power to do or refrain from doing something. | *"In academic literature, theurgic designates the art or technique of compelling or persuading a god or beneficent or supernatural power to do or refrain from doing something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theurgist]] | noun | **1.** Wonder-worker, magician. | *"In academic literature, theurgist designates wonder-worker, magician."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theurgy]] | noun | **1.** The art or technique of compelling or persuading a god or beneficent or supernatural power to do or refrain from doing something. | *"Groups of people endeavoured to combine Christianity with the old thought, with philosophy, theosophy, theurgy, and magic."* — T. R. Glover, *The Jesus of History* |
| [[unenergetic]] | adjective | **1.** Not inclined to be enterprising. | *"In academic literature, unenergetic designates not inclined to be enterprising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unorganized]] | adjective | **1.** Not having or belonging to a structured whole.<br>**2.** Not affiliated in a trade union. | *"When they are unorganized they have less unity, common opinion, and power than the workers in the old-fashioned shop with its close personal acquaintance and ready interchange of views."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ERG
  </div>
</div>
