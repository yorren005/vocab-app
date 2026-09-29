---
status: unread
type: root_dashboard
---
# Dashboard — prot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πρῶτος (prôtos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“first”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'first'.</span>
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

The Greek root **prot** (πρῶτος (prôtos)) signifies first. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Protozoa*, *amphiprotic*, *antiproton*, *prot*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: first
> The Greek root **prot** fundamentally denotes **first**. The physical sensory observation and cognitive anchor underlying 'first'. In classical Greek antiquity, the root denoted 'first', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">first</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'first'.</mark>
> - **Everyday Connection**: Think of familiar words like *Protozoa*, *amphiprotic*, *antiproton*, *prot*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **prot** derives from Ancient Greek <mark class="hl-stem">πρῶτος (prôtos)</mark>, meaning "first".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with prot**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'first'.
  - Whenever you see **prot** in an English word, think immediately of **first**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">prot</mark>, think of <mark class="hl-def">first</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `prot-` (from *πρῶτος (prôtos)*).
> - **Combining Stem with -o- Connective:** `proto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Prot
> - **1. Direct & Concrete Anchor:** Literal instantiation of first in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on prot

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `prot-` | [[Protozoa]] | Primary root semantic foundation denoting first. |
| **Connecting -o-** | `proto-` | [[amphiprotic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `prot` | [[antiproton]] | Relational or directional modification of the core root sense. |

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
| [[amphiprotic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of first. | *"In academic literature, amphiprotic designates adjective*) pertaining to, derived from, or characteristic of first."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiproton]] | noun | **1.** The antiparticle of the proton. | *"In academic literature, antiproton designates the antiparticle of the proton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiprotozoal]] | noun | **1.** A medicinal drug used to fight diseases (like malaria) that are caused by protozoa. | *"In academic literature, antiprotozoal designates a medicinal drug used to fight diseases (like malaria) that are caused by protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypoproteinemia]] | noun | **1.** Abnormally low level of protein in the blood; can indicate inadequate diet or intestinal or renal disorders. | *"In academic literature, hypoproteinemia designates abnormally low level of protein in the blood; can indicate inadequate diet or intestinal or renal disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isoproterenol]] | noun | **1.** Drug (trade name isuprel) used to treat bronchial asthma and to stimulate the heart. | *"In academic literature, isoproterenol designates drug (trade name isuprel) used to treat bronchial asthma and to stimulate the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaproterenol]] | noun | **1.** A bronchodilator (trade name alupent) used to treat asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects include tachycardia and shakiness. | *"In academic literature, metaproterenol designates a bronchodilator (trade name alupent) used to treat asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects include tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prot]] | noun | **1.** Protestant.<br>**2.** First in time. | *"With more care for the safety of her new gown than for the comfort of her protégée, Mrs."* — Jane Austen, *Northanger Abbey* |
| [[protactinium]] | noun | **1.** A short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead. | *"In academic literature, protactinium designates a short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protagonism]] | noun | **1.** Active support of an idea or cause etc.; especially the act of pleading or arguing for something. | *"In academic literature, protagonism designates active support of an idea or cause etc.; especially the act of pleading or arguing for something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protagonist]] | noun | **1.** The principal character in a literary work (such as a drama or story).<br>**2.** The leading actor or principal character in a television show, movie, book, etc. | *"I am all of my past, as every protagonist of the Mendelian law must agree."* — Jack London, *The Jacket (The Star-Rover)* |
| [[protamine]] | noun | **1.** A simple protein found in fish sperm; rich in arginine; simpler in composition than globulin or albumin; counteracts the anticoagulant effect of heparin. | *"In academic literature, protamine designates a simple protein found in fish sperm; rich in arginine; simpler in composition than globulin or albumin; counteracts the anticoagulant effect of heparin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protanomaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek prot.<br>**2.** Specialized application within the domain of Beginning & Primacy. | *"In academic literature, protanomaly designates a term designating an entity, condition, or phenomenon derived from greek prot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protanopia]] | noun | **1.** Color blindness or color vision deficiency (CVD) is the decreased ability to see color, differences in color, or distinguish shades of color.<br>**2.** The severity of color blindness ranges from mostly unnoticeable to full absence of color perception.. | *"In academic literature, protanopia designates color blindness or color vision deficiency (cvd) is the decreased ability to see color, differences in color, or distinguish shades of color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protanopic]] | adjective | **1.** Inability to see the color red or to distinguish red and bluish-green. | *"In academic literature, protanopic designates inability to see the color red or to distinguish red and bluish-green."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protea]] | noun | **1.** Any tropical african shrub of the genus protea having alternate rigid leaves and dense colorful flower heads resembling cones. | *"In academic literature, protea designates any tropical african shrub of the genus protea having alternate rigid leaves and dense colorful flower heads resembling cones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteaceae]] | noun | **1.** Large family of australian and south african shrubs and trees with leathery leaves and clustered mostly tetramerous flowers; constitutes the order proteales. | *"In academic literature, proteaceae designates large family of australian and south african shrubs and trees with leathery leaves and clustered mostly tetramerous flowers; constitutes the order proteales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteales]] | noun | **1.** Coextensive with the family proteaceae. | *"In academic literature, proteales designates coextensive with the family proteaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protean]] | adjective | **1.** Taking on different forms. | *"The student of the poem is amazed, long before he gets over all these monologues, at the Protean capabilities of the poet’s own intellect."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[protease]] | noun | **1.** Any enzyme that catalyzes the splitting of proteins into smaller peptide fractions and amino acids by a process known as proteolysis. | *"In academic literature, protease designates any enzyme that catalyzes the splitting of proteins into smaller peptide fractions and amino acids by a process known as proteolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protect]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"The gods protect you, And bless the good remainders of the court!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protected]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"HELENA, a Gentlewoman protected by the Countess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protecting]] | verb | **1.** Shield from danger, injury, destruction, or damage.<br>**2.** Use tariffs to favor domestic industry. | *"I saw his face, and heard his voice, and felt the influence of his kind protecting manner in every line."* — Charles Dickens, *Bleak House* |
| [[protection]] | noun | **1.** The activity of protecting someone or something.<br>**2.** A covering that is intend to protect from damage or injury. | *"May it please you To take them in protection?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protectionism]] | noun | **1.** The policy of imposing duties or quotas on imports in order to protect home industries from overseas competition. | *"In academic literature, protectionism designates the policy of imposing duties or quotas on imports in order to protect home industries from overseas competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protectionist]] | noun | **1.** An advocate of protectionism. | *"The lack of money and the poverty of the newer country are looked upon by the protectionist as due to the importation of goods."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[protective]] | adjective | **1.** Intended or adapted to afford protection of some kind.<br>**2.** Showing care. | *"She had not known that men could be so disinterested, chivalrous, protective, in their love for women as he."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protectively]] | adverb | **1.** In a protective manner. | *"In academic literature, protectively designates in a protective manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protectiveness]] | noun | **1.** A feeling of protective affection.<br>**2.** The quality of providing protection. | *"If he had entered with a pistol in his hand he would scarcely have disturbed her trust in his protectiveness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protector]] | noun | **1.** A person who cares for persons or property. | *"Enter the funeral of King Henry the Fifth, attended on by the Duke of Bedford, Regent of France; the Duke of Gloucester, Protector; the Duke of Exeter, the Earl of Warwick, the Bishop of Winchester, the Duke of Somerset with Heralds, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protectorate]] | noun | **1.** A state or territory partly controlled by (but not a possession of) a stronger state but autonomous in internal affairs; protectorates are established by treaty. | *"Morocco had been a French protectorate since 1912, and thousands of French citizens and other Europeans had migrated to French and Spanish Morocco over the years and taken up residency."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[protectorship]] | noun | **1.** The position of protector. | *"Why, as you, my lord, An ’t like your lordly Lord Protectorship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protege]] | noun | **1.** A person who receives support and protection from an influential patron who furthers the protege's career. | *"Supposing herself the possessor of a ten cent note, over and above the twelve shillings, she went with her somewhat feeble protege over Jersey city ferry, and saw her safely in the cars."* — Classic Author, *The wonders of prayer* |
| [[protegee]] | noun | **1.** A woman protege. | *"Crawford doted on the girl; and it was the lady’s death which now obliged her _protegee_, after some months’ further trial at her uncle’s house, to find another home."* — Jane Austen, *Mansfield Park* |
| [[proteidae]] | noun | **1.** Mud puppies. | *"In academic literature, proteidae designates mud puppies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protein]] | noun | **1.** Any of various naturally occurring extremely complex substances that consist of amino-acid residues joined by peptide bonds, contain the elements carbon, hydrogen, nitrogen, oxygen, usually sulfur, and occasionally other elements (such as phosphorus or iron), and include many essential biological compounds (such as enzymes, hormones, or antibodies).<br>**2.** The total nitrogenous material in plant or animal substances. | *"Conduct research and develop drip, hydroponics and other agricultural systems, protein synthesis and manufacture, and ship to Coldfield, the Slingshot work site and the Logistics Depot high-quality foodstuffs suitable for storage and consumption."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[proteinaceous]] | adjective | **1.** Relating to or of the nature of protein. | *"In academic literature, proteinaceous designates relating to or of the nature of protein."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteinase]] | noun | **1.** Any enzyme that catalyzes the splitting of proteins into smaller peptide fractions and amino acids by a process known as proteolysis. | *"In academic literature, proteinase designates any enzyme that catalyzes the splitting of proteins into smaller peptide fractions and amino acids by a process known as proteolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteinuria]] | noun | **1.** The presence of excessive protein (chiefly albumin but also globulin) in the urine; usually a symptom of kidney disorder. | *"In academic literature, proteinuria designates the presence of excessive protein (chiefly albumin but also globulin) in the urine; usually a symptom of kidney disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteles]] | noun | **1.** Aardwolf. | *"Classical and authoritative lexicons catalog proteles as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteolysis]] | noun | **1.** The hydrolysis of proteins or peptides with formation of simpler and soluble products. | *"In academic literature, proteolysis designates the hydrolysis of proteins or peptides with formation of simpler and soluble products."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteolytic]] | adjective | **1.** Of or relating to proteolysis. | *"In academic literature, proteolytic designates of or relating to proteolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteome]] | noun | **1.** The full complement of proteins produced by a particular genome. | *"In academic literature, proteome designates the full complement of proteins produced by a particular genome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteomics]] | noun | **1.** The branch of genetics that studies the full set of proteins encoded by a genome. | *"In academic literature, proteomics designates the branch of genetics that studies the full set of proteins encoded by a genome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteosome]] | noun | **1.** A form of vaccine that can be administered by an inhaler. | *"In academic literature, proteosome designates a form of vaccine that can be administered by an inhaler."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proterochampsa]] | noun | **1.** Early archosaurian carnivore. | *"In academic literature, proterochampsa designates early archosaurian carnivore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proterozoic]] | noun | **1.** From 2,500 to 544 million years ago; bacteria and fungi; primitive multicellular organisms.<br>**2.** Formed in the later of two divisions of the precambrian era. | *"In academic literature, proterozoic designates from 2,500 to 544 million years ago; bacteria and fungi; primitive multicellular organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protest]] | noun | **1.** A formal and solemn declaration of objection.<br>**2.** The act of protesting; a public (often organized) manifestation of dissent. | *"I am a simple maid, and therein wealthiest That I protest I simply am a maid."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protestant]] | noun | **1.** An adherent of protestantism.<br>**2.** The protestant churches and denominations collectively. | *"But our schools being decidedly Protestant, and I preaching regularly, the opposition from Romanists was very strong; this, together with the extreme poverty of the people, made our income very small."* — Classic Author, *The wonders of prayer* |
| [[protestantism]] | noun | **1.** The theological system of any of the churches of western christendom that separated from the roman catholic church during the reformation. | *"Thou art in a parlous state, Angel Clare.” “_I_ glory in my Protestantism!” she said severely."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[protestation]] | noun | **1.** A formal and solemn declaration of objection.<br>**2.** A strong declaration of protest. | *"She kneels, and makes show of protestation unto him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protester]] | noun | **1.** A person who dissents from some established policy.<br>**2.** Someone who participates in a public display of group feeling. | *"Delphine proved another protester to add to the list."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[proteus]] | noun | **1.** (greek mythology) a prophetic god who served poseidon; was capable of changing his shape at will.<br>**2.** Type genus of the proteidae. | *"I can add colours to the chameleon, Change shapes with Proteus for advantages, And set the murderous Machiavel to school."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protirelin]] | noun | **1.** Hormone released by the hypothalamus that controls the release of thyroid-stimulating hormone from the anterior pituitary. | *"In academic literature, protirelin designates hormone released by the hypothalamus that controls the release of thyroid-stimulating hormone from the anterior pituitary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protist]] | noun | **1.** Any of a diverse taxonomic group and especially a kingdom (Protista synonym Protoctista) of eukaryotic organisms that are unicellular and sometimes colonial or less often multicellular and that typically include the protozoans, most algae, and often some fungi (such as slime molds). | *"In academic literature, protist designates any of a diverse taxonomic group and especially a kingdom (protista synonym protoctista) of eukaryotic organisms that are unicellular and sometimes colonial or less often multicellular and that typically include the protozoans, most algae, and often some fungi (such as slime molds)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protista]] | noun | **1.** Eukaryotic one-celled living organisms distinct from multicellular plants and animals: protozoa, slime molds, and eukaryotic algae. | *"In academic literature, protista designates eukaryotic one-celled living organisms distinct from multicellular plants and animals: protozoa, slime molds, and eukaryotic algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protistan]] | noun | **1.** Free-living or colonial organisms with diverse nutritional and reproductive modes. | *"In academic literature, protistan designates free-living or colonial organisms with diverse nutritional and reproductive modes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protium]] | noun | **1.** Genus of chiefly tropical american trees having fragrant wood and yielding gum elemi. | *"In academic literature, protium designates genus of chiefly tropical american trees having fragrant wood and yielding gum elemi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proto]] | adjective | **1.** Indicating the first or earliest or original. | *"What orders, your excellency?” said the huntsman in his deep bass, deep as a proto-deacon’s and hoarse with hallooing—and two flashing black eyes gazed from under his brows at his master, who was silent."* — graf Leo Tolstoy, *War and Peace* |
| [[proto-norse]] | noun | **1.** The germanic language of scandinavia up until about 700. | *"In academic literature, proto-norse designates the germanic language of scandinavia up until about 700."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proto-oncogene]] | noun | **1.** A normal gene that has the potential to become an oncogene. | *"In academic literature, proto-oncogene designates a normal gene that has the potential to become an oncogene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoactinium]] | noun | **1.** A short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead. | *"In academic literature, protoactinium designates a short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoanthropology]] | noun | **1.** The study humans prior to the invention of writing. | *"In academic literature, protoanthropology designates the study humans prior to the invention of writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoarchaeology]] | noun | **1.** The study of prehistoric human artifacts and human fossils. | *"In academic literature, protoarchaeology designates the study of prehistoric human artifacts and human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoarcheology]] | noun | **1.** The study of prehistoric human artifacts and human fossils. | *"In academic literature, protoarcheology designates the study of prehistoric human artifacts and human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoavis]] | noun | **1.** Most primitive avian type known; extinct bird of the triassic having bird-like jaw and hollow limbs and breastbone with dinosaur-like tail and hind limbs. | *"In academic literature, protoavis designates most primitive avian type known; extinct bird of the triassic having bird-like jaw and hollow limbs and breastbone with dinosaur-like tail and hind limbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoceratops]] | noun | **1.** Small horned dinosaur. | *"In academic literature, protoceratops designates small horned dinosaur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protocol]] | noun | **1.** A system of rules that explain the correct conduct and procedures to be followed in formal situations.<br>**2.** A set of conventions governing the treatment and especially the formatting of data in an electronic communications system. | *"Just the routine chit-chat of protocol: small talk about the inconveniences of long hops and living out of traveling kits."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[protoctist]] | noun | **1.** Any of the unicellular protists. | *"In academic literature, protoctist designates any of the unicellular protists."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoctista]] | noun | **1.** In most modern classifications, replacement for the protista; includes: protozoa; euglenophyta; chlorophyta; cryptophyta; heterokontophyta; rhodophyta; unicellular protists and their descendant multicellular organisms: regarded as distinct from plants and animals. | *"In academic literature, protoctista designates in most modern classifications, replacement for the protista; includes: protozoa; euglenophyta; chlorophyta; cryptophyta; heterokontophyta; rhodophyta; unicellular protists and their descendant multicellular organisms: regarded as distinct from plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protogeometric]] | adjective | **1.** Characteristic of the earliest phase of geometric art especially in greece. | *"In academic literature, protogeometric designates characteristic of the earliest phase of geometric art especially in greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoheme]] | noun | **1.** A complex red organic pigment containing iron and other atoms to which oxygen binds. | *"In academic literature, protoheme designates a complex red organic pigment containing iron and other atoms to which oxygen binds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protohemin]] | noun | **1.** A reddish-brown chloride of heme; produced from hemoglobin in laboratory tests for the presence of blood. | *"In academic literature, protohemin designates a reddish-brown chloride of heme; produced from hemoglobin in laboratory tests for the presence of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protohippus]] | noun | **1.** Pliocene horse approaching donkeys in size. | *"In academic literature, protohippus designates pliocene horse approaching donkeys in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protohistory]] | noun | **1.** The study humans prior to the invention of writing. | *"In academic literature, protohistory designates the study humans prior to the invention of writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protology]] | noun | **1.** The study of origins and first things. | *"In academic literature, protology designates the study of origins and first things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protomammal]] | noun | **1.** Probably warm-blooded; considered direct ancestor of mammals. | *"In academic literature, protomammal designates probably warm-blooded; considered direct ancestor of mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proton]] | noun | **1.** An elementary particle that is identical with the nucleus of the hydrogen atom, that along with the neutron is a constituent of all other atomic nuclei, that carries a positive charge numerically equal to the charge of an electron, and that has a mass of 1.673 × 10—27 kilogram.<br>**2.** Any of a group of drugs that inhibit the activity of pumps transporting hydrogen ions across cell membranes and are used to inhibit gastric acid secretion. | *"As soon as you pick up anything with it, Ben will throw his switch, and whatever is at the end of it will get a dose of pure protons."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[protoplasm]] | noun | **1.** The organized colloidal complex of organic and inorganic substances (such as proteins and water) that constitutes the living nucleus, cytoplasm, plastids, and mitochondria of the cell. | *"The oogonia are large spherical or ovoid cells, with a thickish membrane containing a granular protoplasm, or formative fluid."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[protoplast]] | noun | **1.** A biological unit consisting of a nucleus and the body of cytoplasm with which it interacts. | *"Those forms, unalterable first as last, proved him her copier, not the protoplast of nature: what could come of being free by action to exhibit tree for tree, bird, beast, for beast and bird, or prove earth bore one veritable man or woman more?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[protos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek prot.<br>**2.** Specialized application within the domain of Beginning & Primacy. | *"Through him the world obtained “a new truth--no conviction gained of an old one merely, made intense by a fresh appeal to the faded sense.” Cleon, the poet, writes to Protos in his Tyranny (that is, in the Greek sense, Sovereignty)."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[prototheria]] | noun | **1.** Echidnas; platypus. | *"In academic literature, prototheria designates echidnas; platypus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototherian]] | noun | **1.** Primitive oviparous mammals found only in australia and tasmania and new guinea. | *"In academic literature, prototherian designates primitive oviparous mammals found only in australia and tasmania and new guinea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypal]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypal designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototype]] | noun | **1.** An original model on which something is patterned : archetype.<br>**2.** An individual that exhibits the essential features of a later type. | *"In Diotima, the muse of his "Hyperion," whose prototype was Susette Gontard, he has found it--and now he feels that he is in a new world."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[prototypic]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypic designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypical]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypical designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Protozoa]] | noun | **1.** protozoan. | *"In academic literature, Protozoa designates in some classifications considered a superphylum or a subkingdom; comprises flagellates; ciliates; sporozoans; amoebas; foraminifers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoa]] | noun | **1.** In some classifications considered a superphylum or a subkingdom; comprises flagellates; ciliates; sporozoans; amoebas; foraminifers.<br>**2.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic. | *"In academic literature, protozoa designates **1.** in some classifications considered a superphylum or a subkingdom; comprises flagellates; ciliates; sporozoans; amoebas; foraminifers.<br>**2.** any of diverse minute acellular or unicellular organisms usually nonphotosynthetic."* — Academic Lexicon |
| [[protozoal]] | adjective | **1.** Of or relating to the protozoa. | *"In academic literature, protozoal designates of or relating to the protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoan]] | noun | **1.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic.<br>**2.** Of or relating to the protozoa. | *"In academic literature, protozoan designates any of diverse minute acellular or unicellular organisms usually nonphotosynthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoic]] | adjective | **1.** Of or relating to the protozoa. | *"In academic literature, protozoic designates of or relating to the protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoological]] | adjective | **1.** Concerning the branch of zoology that studies protozoans. | *"In academic literature, protozoological designates concerning the branch of zoology that studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoologist]] | noun | **1.** A zoologist who studies protozoans. | *"In academic literature, protozoologist designates a zoologist who studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoology]] | noun | **1.** The branch of zoology that studies protozoans. | *"In academic literature, protozoology designates the branch of zoology that studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoon]] | noun | **1.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic. | *"In academic literature, protozoon designates any of diverse minute acellular or unicellular organisms usually nonphotosynthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protract]] | verb | **1.** Lengthen in time; cause to be or last longer. | *"Let us bury him, And not protract with admiration what Is now due debt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[protracted]] | verb | **1.** Lengthen in time; cause to be or last longer.<br>**2.** Relatively long in duration; tediously protracted. | *"These delays so protracted the journey that the short day was spent and the long night had closed in before we came to St."* — Charles Dickens, *Bleak House* |
| [[protractedly]] | adverb | **1.** In a slow, leisurely or prolonged way;  -rossetti. | *"In academic literature, protractedly designates in a slow, leisurely or prolonged way;  -rossetti."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protractible]] | adjective | **1.** Able to be extended. | *"In academic literature, protractible designates able to be extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protractile]] | adjective | **1.** Able to be extended. | *"In academic literature, protractile designates able to be extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protraction]] | noun | **1.** The consequence of being lengthened in duration.<br>**2.** The act of prolonging something. | *"By the quantity of provision which I had consumed, I should guess that I had passed three weeks in this journey; and the continual protraction of hope, returning back upon the heart, often wrung bitter drops of despondency and grief from my eyes."* — Mary Wollstonecraft Shelley, *Frankenstein; or, the modern prometheus* |
| [[protractor]] | noun | **1.** Drafting instrument used to draw or measure angles. | *"In academic literature, protractor designates drafting instrument used to draw or measure angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protriptyline]] | noun | **1.** Tricyclic antidepressant used to treat clinical depression. | *"In academic literature, protriptyline designates tricyclic antidepressant used to treat clinical depression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protropin]] | noun | **1.** Trade name of a synthetic human growth hormone given to children deficient in the hormone; use by athletes and weightlifters is banned. | *"In academic literature, protropin designates trade name of a synthetic human growth hormone given to children deficient in the hormone; use by athletes and weightlifters is banned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrude]] | verb | **1.** Extend out or project in space.<br>**2.** Bulge outward. | *"In spite of her exceptional stoutness, which caused her to protrude her chest and stomach and throw back her head, this woman (who was “Uncle’s” housekeeper) trod very lightly."* — graf Leo Tolstoy, *War and Peace* |
| [[protruding]] | verb | **1.** Extend out or project in space.<br>**2.** Bulge outward. | *"The lid of the bag was thrust open and a thick unwieldy object which did not fit into it was protruding."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[protrusible]] | adjective | **1.** Capable of being thrust forward, as the tongue. | *"In academic literature, protrusible designates capable of being thrust forward, as the tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrusile]] | adjective | **1.** Capable of being thrust forward, as the tongue. | *"In academic literature, protrusile designates capable of being thrust forward, as the tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrusion]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** The act of projecting out from something. | *"Raffles’ slow wink and slight protrusion of his tongue was worse than a nightmare, because it held the certitude that it was not a nightmare, but a waking misery."* — George Eliot, *Middlemarch* |
| [[protrusive]] | adjective | **1.** Thrusting outward. | *"In academic literature, protrusive designates thrusting outward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protuberance]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** The condition of being protuberant; the condition of bulging out. | *"Cainy Ball and Joseph, who performed this latter operation, were if possible wetter than the rest; they resembled dolphins under a fountain, every protuberance and angle of their clothes dribbling forth a small rill."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[protuberant]] | adjective | **1.** Curving outward. | *"The Count, evidently noticing it, drew back; and with a grim sort of smile, which showed more than he had yet done his protuberant teeth, sat himself down again on his own side of the fireplace."* — Bram Stoker, *Dracula* |
| [[protuberate]] | verb | **1.** Cause to bulge out or project.<br>**2.** Form a rounded prominence. | *"In academic literature, protuberate designates cause to bulge out or project."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protura]] | noun | **1.** Minute wingless arthropods: telsontails. | *"In academic literature, protura designates minute wingless arthropods: telsontails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proturan]] | noun | **1.** Any of several minute primitive wingless and eyeless insects having a cone-shaped head; inhabit damp soil or decaying organic matter. | *"In academic literature, proturan designates any of several minute primitive wingless and eyeless insects having a cone-shaped head; inhabit damp soil or decaying organic matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unprotected]] | adjective | **1.** Lacking protection or defense. | *"An unprotected childhood in a cold world has beaten gentleness out of me.” He immediately said with more resentment: “That may be true, somewhat; but ah, Miss Everdene, it won’t do as a reason!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unprotectedness]] | noun | **1.** The property of being helpless in the face of attack. | *"A farmer passing through with his axe is but an intruder, and children straying home from school give one a feeling of solicitude at their unprotectedness."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[unprotective]] | adjective | **1.** Not affording protection. | *"In academic literature, unprotective designates not affording protection."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Beginning & Primacy]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PROT
  </div>
</div>
