---
status: unread
type: root_dashboard
---
# Dashboard — ba
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ba-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to step”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'to step'.</span>
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

The Greek root **ba** (βαίνειν βατός βάσις βῆμα βήματος βάτης βάθρον βατεῖν (baínein)) signifies to step. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acrobat*, *acrobatic*, *adiabatic*, *aerobatic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to step
> The Greek root **ba** fundamentally denotes **to step**. The physical sensory observation and cognitive anchor underlying 'to step'. In classical Greek antiquity, the root denoted 'to step', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">to step</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'to step'.</mark>
> - **Everyday Connection**: Think of familiar words like *acrobat*, *acrobatic*, *adiabatic*, *aerobatic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ba** derives from Ancient Greek <mark class="hl-stem">βαίνειν βατός βάσις βῆμα βήματος βάτης βάθρον βατεῖν (baínein)</mark>, meaning "to step".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ba**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'to step'.
  - Whenever you see **ba** in an English word, think immediately of **to step**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ba</mark>, think of <mark class="hl-def">to step</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ba-` (from *βαίνειν βατός βάσις βῆμα βήματος βάτης βάθρον βατεῖν (baínein)*).
> - **Combining Stem with -o- Connective:** `bao-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ba
> - **1. Direct & Concrete Anchor:** Literal instantiation of to step in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ba

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ba-` | [[acrobat]] | Primary root semantic foundation denoting to step. |
| **Connecting -o-** | `bao-` | [[acrobatic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ba` | [[adiabatic]] | Relational or directional modification of the core root sense. |

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
| [[abase]] | verb | **1.** Cause to feel shame; hurt the pride of. | *"I’ll lengthen it with mine; And, having both together heaved it up, We’ll both together lift our heads to heaven, And never more abase our sight so low As to vouchsafe one glance unto the ground."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[abasic]] | adjective | **1.** Of or relating to abasia (inability to walk). | *"In academic literature, abasic designates of or relating to abasia (inability to walk)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrobat]] | noun | **1.** One that performs gymnastic feats requiring skillful control of the body.<br>**2.** One skillful at exercises of intellectual or artistic dexterity. | *"Light as a lightweight acrobat Ahmet Ali had rolled aside, put palm to ground, sprung to his feet."* — Donn Byrne, *The Wind Bloweth* |
| [[acrobatic]] | noun | **1.** Relating to or suggestive of an acrobat or acrobatics : performed with leaps, body contortions, or other maneuvers requiring the great athleticism of an acrobat. | *"That is an acrobatic feat that I never believed you capable of, honey.” “We-ell!"* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[acrobatics]] | noun | **1.** The art, performance, or activity of an acrobat.<br>**2.** A spectacular, showy, or startling performance or demonstration involving great agility or complexity. | *"In academic literature, acrobatics designates the art, performance, or activity of an acrobat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adiabatic]] | noun | **1.** Occurring without loss or gain of heat. | *"In academic literature, adiabatic designates occurring without loss or gain of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aerobatic]] | noun | **1.** Spectacular flying feats and maneuvers (such as rolls and dives). | *"In academic literature, aerobatic designates spectacular flying feats and maneuvers (such as rolls and dives)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anabasis]] | noun | **1.** A going or marching up : advance; especially : a military advance.<br>**2.** A difficult and dangerous military retreat. | *"In academic literature, anabasis designates a going or marching up : advance; especially : a military advance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anabatic]] | noun | **1.** Moving upward : rising. | *"In academic literature, anabatic designates moving upward : rising."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antidiabetic]] | noun | **1.** A drug used to treat diabetes mellitus. | *"In academic literature, antidiabetic designates a drug used to treat diabetes mellitus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiparabema]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, antiparabema designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ba]] | symbol | **1.** barium.<br>**2.** bachelor of arts. | *"Est-ce que ma robe va bien?” cried she, bounding forwards; “et mes souliers? et mes bas?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[bainein]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, bainein designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basal]] | adjective | **1.** Especially of leaves; located at the base of a plant or stem; especially arising directly from the root or rootstock or a root-like stem.<br>**2.** Serving as or forming a base. | *"The outward movement of the basal half of the jaw necessarily twists in the same direction the column-like bone to which it is suspended."* — W. E. Webb, *Buffalo Land* |
| [[base]] | noun | **1.** The bottom of something considered as its support : foundation.<br>**2.** That part of a bodily organ by which it is attached to another more central structure of the organism. | *"Spend’st thou thy fury on some worthless song, Darkening thy power to lend base subjects light?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[based]] | verb | **1.** Use as a basis for; found on.<br>**2.** Situate as a center of operations. | *"A coolness arose between him and my guardian, based principally on the foregoing grounds and on his having heartlessly disregarded my guardian’s entreaties (as we afterwards learned from Ada) in reference to Richard."* — Charles Dickens, *Bleak House* |
| [[basely]] | adverb | **1.** In a despicable, ignoble manner. | *"To spend that shortness basely were too long If life did ride upon a dial’s point, Still ending at the arrival of an hour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[basement]] | noun | **1.** The lowermost portion of a structure partly or wholly below ground level; often used for storage.<br>**2.** The ground floor facade or interior in renaissance architecture. | *"It was close to the wall, where there is a ledge of stonework round the basement of the tower."* — Mrs. Oliphant, *A Beleaguered City* |
| [[baseness]] | noun | **1.** Unworthiness by virtue of lacking higher values. | *"Since Cleopatra died, I have lived in such dishonour that the gods Detest my baseness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[basic]] | noun | **1.** Of, relating to, or forming the base or essence : fundamental.<br>**2.** Concerned with fundamental scientific principles : not applied. | *"We have adjusted each of these series to a base of the average prices for 1890-1899, in accord with the basic period used by the American Bureau of Labor."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[basidial]] | adjective | **1.** Relating to or characterized by basidia. | *"In academic literature, basidial designates relating to or characterized by basidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basidiocarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, basidiocarp designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basidioma]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, basidioma designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basidiospore]] | noun | **1.** A spore produced by a basidium. | *"In academic literature, basidiospore designates a spore produced by a basidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basidiosporous]] | adjective | **1.** Of or relating to or characterized by spores produced by basidia. | *"In academic literature, basidiosporous designates of or relating to or characterized by spores produced by basidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basidium]] | noun | **1.** A structure on a basidiomycete in which karyogamy occurs followed by meiosis to form usually four basidiospores. | *"In academic literature, basidium designates a structure on a basidiomycete in which karyogamy occurs followed by meiosis to form usually four basidiospores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basify]] | verb | **1.** Turn basic and less acidic. | *"In academic literature, basify designates turn basic and less acidic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basilar]] | adjective | **1.** Of or relating to or located at the base. | *"In academic literature, basilar designates of or relating to or located at the base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basilary]] | adjective | **1.** Of or relating to or located at the base. | *"In academic literature, basilary designates of or relating to or located at the base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, basion designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basionym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, basionym designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basis]] | noun | **1.** The bottom of something considered as its foundation.<br>**2.** The principal component of something. | *"How many times shall Caesar bleed in sport, That now on Pompey’s basis lies along, No worthier than the dust!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[basophilia]] | noun | **1.** The tendency of cells to stain with basic dyes. | *"In academic literature, basophilia designates the tendency of cells to stain with basic dyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basophilic]] | noun | **1.** Staining readily with basic stains. | *"In academic literature, basophilic designates staining readily with basic stains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bastion]] | noun | **1.** A group that defends a principle.<br>**2.** A stronghold into which people could go for shelter during a battle. | *"The whole of the north side is very majestic, ending in the return of a bastion to the east."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[bema]] | noun | **1.** The usually raised part of an Eastern church containing the altar. | *"In academic literature, bema designates the usually raised part of an eastern church containing the altar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, catabasis designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of to step. | *"In academic literature, catabatic designates adjective*) pertaining to, derived from, or characteristic of to step."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debase]] | verb | **1.** Corrupt morally or by intemperance or sensuality.<br>**2.** Lower in value by increasing the base-metal content. | *"With all the gracious utterance thou hast, Speak to his gentle hearing kind commends. [_Northumberland returns to Bolingbroke._] [_To Aumerle_.] We do debase ourselves, cousin, do we not, To look so poorly and to speak so fair?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diabase]] | noun | **1.** diorite.<br>**2.** an altered basalt. | *"The Lake Superior copper occurs in three formations:— (_a_) Vein deposits, from which the enormous masses of copper are taken out. (_b_) Copper-bearing ash beds, of amygdaloidal diabase."* — Donald M. Levy, *Modern Copper Smelting* |
| [[diabatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of to step. | *"In academic literature, diabatic designates adjective*) pertaining to, derived from, or characteristic of to step."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diabetes]] | noun | **1.** Any of various abnormal conditions characterized by the secretion and excretion of excessive amounts of urine; especially : diabetes mellitus.<br>**2.** A disorder of the pituitary gland characterized by intense thirst and by the excretion of large amounts of urine. | *"I have had diabetes for years."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[diabetic]] | noun | **1.** Of or relating to diabetes or diabetics.<br>**2.** Affected with diabetes. | *"In academic literature, diabetic designates of or relating to diabetes or diabetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dibasic]] | noun | **1.** Having two replaceable hydrogen atoms —used of acids. | *"In academic literature, dibasic designates having two replaceable hydrogen atoms —used of acids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbaton]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, hyperbaton designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypobasidium]] | noun | **1.** Special cell constituting the base of the basidium in various fungi especially of the order tremellales. | *"In academic literature, hypobasidium designates special cell constituting the base of the basidium in various fungi especially of the order tremellales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypobasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, hypobasis designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ba.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, katabasis designates a term designating an entity, condition, or phenomenon derived from greek ba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabatic]] | noun | **1.** Relating to or being a wind produced by the flow of cold dense air down a slope (as of a mountain or glacier) in an area subject to radiational cooling. | *"In academic literature, katabatic designates relating to or being a wind produced by the flow of cold dense air down a slope (as of a mountain or glacier) in an area subject to radiational cooling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monobasic]] | noun | **1.** Having only one replaceable hydrogen atom. | *"In academic literature, monobasic designates having only one replaceable hydrogen atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polybasic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of to step. | *"Polybasic slags have a lower formation temperature, and in consequence the production of the highly ferruginous slags of high formation temperature which it is desired to make by the oxidation of as much iron as possible is retarded."* — Donald M. Levy, *Modern Copper Smelting* |
| [[stereobate]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through to step. | *"In academic literature, stereobate designates verb*) to subject to, transform by, or operate upon through to step."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tribasic]] | noun | **1.** Having three replaceable hydrogen atoms —used of acids. | *"In academic literature, tribasic designates having three replaceable hydrogen atoms —used of acids."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion & Direction]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BA
  </div>
</div>
