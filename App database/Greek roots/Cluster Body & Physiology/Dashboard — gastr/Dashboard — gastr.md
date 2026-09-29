---
status: unread
type: root_dashboard
---
# Dashboard — gastr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">γαστήρ γαστρός (gastḗr</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stomach”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'stomach'.</span>
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

The Greek root **gastr** (γαστήρ γαστρός (gastḗr, gastrós)) signifies stomach. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Myxogastria*, *epigastric*, *epigastrium*, *gasteroid*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stomach
> The Greek root **gastr** fundamentally denotes **stomach**. The physical sensory observation and cognitive anchor underlying 'stomach'. In classical Greek antiquity, the root denoted 'stomach', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">stomach</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'stomach'.</mark>
> - **Everyday Connection**: Think of familiar words like *Myxogastria*, *epigastric*, *epigastrium*, *gasteroid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gastr** derives from Ancient Greek <mark class="hl-stem">γαστήρ γαστρός (gastḗr, gastrós)</mark>, meaning "stomach".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with gastr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'stomach'.
  - Whenever you see **gastr** in an English word, think immediately of **stomach**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gastr</mark>, think of <mark class="hl-def">stomach</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `gastr-` (from *γαστήρ γαστρός (gastḗr, gastrós)*).
> - **Combining Stem with -o- Connective:** `gastro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Gastr
> - **1. Direct & Concrete Anchor:** Literal instantiation of stomach in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on gastr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `gastr-` | [[Myxogastria]] | Primary root semantic foundation denoting stomach. |
| **Connecting -o-** | `gastro-` | [[epigastric]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `gastr` | [[epigastrium]] | Relational or directional modification of the core root sense. |

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
| [[epigastric]] | noun | **1.** Lying upon or over the stomach.<br>**2.** Of, relating to, supplying, or draining the anterior walls of the abdomen. | *"In academic literature, epigastric designates lying upon or over the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigastrium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gastr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"Immediately he received a blow in the epigastrium that stretched him almost insensible on the floor."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[gasteroid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to stomach. | *"In academic literature, gasteroid designates adjective & noun*) resembling, having the physical form of, or akin to stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastr]] | combining form | **1.** stomach.<br>**2.** gastric and. | *"Classical and authoritative lexicons catalog gastr as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastralgia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek alg.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, gastralgia designates a term designating an entity, condition, or phenomenon derived from greek alg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrectomy]] | noun | **1.** Surgical removal of all or part of the stomach. | *"In academic literature, gastrectomy designates surgical removal of all or part of the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastric]] | noun | **1.** Of or relating to the stomach.<br>**2.** A laparoscopic surgical procedure for the treatment of severe obesity that involves placing an adjustable band around the upper stomach to create a small pouch which empties into the remaining stomach through a narrow outlet. | *"Another reason which Sag-Harbor (he went by that name) urged for his want of faith in this matter of the prophet, was something obscurely in reference to his incarcerated body and the whale’s gastric juices."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[gastrin]] | noun | **1.** Any of various polypeptide hormones that are secreted by the gastric mucosa and induce secretion of gastric juice. | *"In academic literature, gastrin designates any of various polypeptide hormones that are secreted by the gastric mucosa and induce secretion of gastric juice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastritis]] | noun | **1.** Inflammation especially of the mucous membrane of the stomach. | *"Up to that time, for seventeen years, I had suffered with indigestion and gastritis in the worst form, often being overcome from a seeming pressure against the heart."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[gastroboletus]] | noun | **1.** A genus of fungi belonging to the family secotiaceae; they resemble boletes but the spores are not discharged from the basidium. | *"In academic literature, gastroboletus designates a genus of fungi belonging to the family secotiaceae; they resemble boletes but the spores are not discharged from the basidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrocnemius]] | noun | **1.** The muscle in the back part of the leg that forms the greater part of the calf; responsible for the plantar flexion of the foot. | *"In academic literature, gastrocnemius designates the muscle in the back part of the leg that forms the greater part of the calf; responsible for the plantar flexion of the foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrocybe]] | noun | **1.** A genus of fungi of the family secotiaceae. | *"In academic literature, gastrocybe designates a genus of fungi of the family secotiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroduodenal]] | adjective | **1.** Of or relating to the stomach and the duodenum. | *"In academic literature, gastroduodenal designates of or relating to the stomach and the duodenum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenteritis]] | noun | **1.** Inflammation of the lining membrane of the stomach and the intestines characterized especially by nausea, vomiting, diarrhea, and cramps. | *"In academic literature, gastroenteritis designates inflammation of the lining membrane of the stomach and the intestines characterized especially by nausea, vomiting, diarrhea, and cramps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenterologist]] | noun | **1.** A branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines. | *"In academic literature, gastroenterologist designates a branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenterology]] | noun | **1.** A branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines. | *"In academic literature, gastroenterology designates a branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenterostomy]] | noun | **1.** Surgical creation of an opening between the stomach wall and the small intestines; performed when the normal opening has been eliminated. | *"In academic literature, gastroenterostomy designates surgical creation of an opening between the stomach wall and the small intestines; performed when the normal opening has been eliminated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroesophageal]] | adjective | **1.** Of or relating to or involving the stomach and esophagus. | *"In academic literature, gastroesophageal designates of or relating to or involving the stomach and esophagus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrogavage]] | noun | **1.** Feeding a nutrient solution into the stomach through a tube through a surgically created opening. | *"In academic literature, gastrogavage designates feeding a nutrient solution into the stomach through a tube through a surgically created opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrointestinal]] | noun | **1.** Of, relating to, affecting, or including both stomach and intestine.<br>**2.** The part of the digestive system that consists of the stomach and intestines. | *"In academic literature, gastrointestinal designates of, relating to, affecting, or including both stomach and intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrolith]] | noun | **1.** A stone or pebble ingested by an animal and functioning to grind food in gastric digestion. | *"In academic literature, gastrolith designates a stone or pebble ingested by an animal and functioning to grind food in gastric digestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrolobium]] | noun | **1.** Any of various australian evergreen shrubs of the genus gastrolobium having whorled compound leaves poisonous to livestock and showy yellow to deep reddish-orange flowers followed by two-seeded pods. | *"In academic literature, gastrolobium designates any of various australian evergreen shrubs of the genus gastrolobium having whorled compound leaves poisonous to livestock and showy yellow to deep reddish-orange flowers followed by two-seeded pods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastromy]] | noun | **1.** Surgical incision into the stomach. | *"In academic literature, gastromy designates surgical incision into the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastromycete]] | noun | **1.** Any fungus of the class gasteromycetes. | *"In academic literature, gastromycete designates any fungus of the class gasteromycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastromycetes]] | noun | **1.** Fungi in which the hymenium is enclosed until after spores have matured: puffballs; earth stars; stinkhorn fungi.<br>**2.** Any fungus of the class gasteromycetes. | *"In academic literature, gastromycetes designates fungi in which the hymenium is enclosed until after spores have matured: puffballs; earth stars; stinkhorn fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastronome]] | noun | **1.** A person devoted to refined sensuous enjoyment (especially good food and drink). | *"In academic literature, gastronome designates a person devoted to refined sensuous enjoyment (especially good food and drink)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastronomic]] | noun | **1.** The art or science of good eating.<br>**2.** Culinary customs or style. | *"In academic literature, gastronomic designates the art or science of good eating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastronomical]] | adjective | **1.** Of or relating to gastronomy. | *"In academic literature, gastronomical designates of or relating to gastronomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastronomy]] | noun | **1.** The art or science of good eating.<br>**2.** Culinary customs or style. | *"On the doorstep, she met the little urchin whose marvellous feats of gastronomy have been recorded in the earlier pages of our narrative."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[gastroparesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gastr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, gastroparesis designates a term designating an entity, condition, or phenomenon derived from greek gastr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrophryne]] | noun | **1.** Primarily tropical narrow-mouthed toads. | *"In academic literature, gastrophryne designates primarily tropical narrow-mouthed toads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastropod]] | noun | **1.** Any of a large class (Gastropoda) of mollusks (such as snails and slugs) usually with a univalve shell or none and a distinct head bearing sensory organs. | *"In academic literature, gastropod designates any of a large class (gastropoda) of mollusks (such as snails and slugs) usually with a univalve shell or none and a distinct head bearing sensory organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastropoda]] | noun | **1.** Snails and slugs and their relatives. | *"In academic literature, gastropoda designates snails and slugs and their relatives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroptosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gastr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, gastroptosis designates a term designating an entity, condition, or phenomenon derived from greek gastr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroschisis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gastr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, gastroschisis designates a term designating an entity, condition, or phenomenon derived from greek gastr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroscope]] | noun | **1.** A type of endoscope for visually examining the stomach. | *"In academic literature, gastroscope designates a type of endoscope for visually examining the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroscopy]] | noun | **1.** An endoscope for viewing the interior of the stomach. | *"In academic literature, gastroscopy designates an endoscope for viewing the interior of the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrostomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stomat.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, gastrostomy designates a term designating an entity, condition, or phenomenon derived from greek stomat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrotrich]] | noun | **1.** Any of a phylum (Gastrotricha) of minute aquatic pseudocoelomate animals that usually have a spiny or scaly cuticle and cilia on the ventral surface. | *"In academic literature, gastrotrich designates any of a phylum (gastrotricha) of minute aquatic pseudocoelomate animals that usually have a spiny or scaly cuticle and cilia on the ventral surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrula]] | noun | **1.** Double-walled stage of the embryo resulting from invagination of the blastula; the outer layer of cells is the ectoderm and the inner layer differentiates into the mesoderm and endoderm. | *"In academic literature, gastrula designates double-walled stage of the embryo resulting from invagination of the blastula; the outer layer of cells is the ectoderm and the inner layer differentiates into the mesoderm and endoderm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastrulation]] | noun | **1.** The process in which a gastrula develops from a blastula by the inward migration of cells. | *"In academic literature, gastrulation designates the process in which a gastrula develops from a blastula by the inward migration of cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesogastric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stomach. | *"In academic literature, mesogastric designates adjective*) pertaining to, derived from, or characteristic of stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Myxogastria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gastr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Myxogastria designates a term designating an entity, condition, or phenomenon derived from greek gastr."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & Physiology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GASTR
  </div>
</div>
