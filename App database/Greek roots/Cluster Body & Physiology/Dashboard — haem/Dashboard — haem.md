---
status: unread
type: root_dashboard
---
# Dashboard — haem
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">αἷμα αἵματος (haîma</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“blood”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'blood'.</span>
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

The Greek root **haem** (αἷμα αἵματος (haîma, haímatos)) signifies blood. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *anaemia*, *anemia*, *haem*, *haematemesis*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: blood
> The Greek root **haem** fundamentally denotes **blood**. The physical sensory observation and cognitive anchor underlying 'blood'. In classical Greek antiquity, the root denoted 'blood', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">blood</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'blood'.</mark>
> - **Everyday Connection**: Think of familiar words like *anaemia*, *anemia*, *haem*, *haematemesis*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **haem** derives from Ancient Greek <mark class="hl-stem">αἷμα αἵματος (haîma, haímatos)</mark>, meaning "blood".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with haem**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'blood'.
  - Whenever you see **haem** in an English word, think immediately of **blood**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">haem</mark>, think of <mark class="hl-def">blood</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `haem-` (from *αἷμα αἵματος (haîma, haímatos)*).
> - **Combining Stem with -o- Connective:** `haemo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Haem
> - **1. Direct & Concrete Anchor:** Literal instantiation of blood in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on haem

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `haem-` | [[anaemia]] | Primary root semantic foundation denoting blood. |
| **Connecting -o-** | `haemo-` | [[anemia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `haem` | [[haem]] | Relational or directional modification of the core root sense. |

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
| [[anaemia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"Not to run this striking and original simile out of breath, the Barter fly endured for a round twelve months, without showing signs of anaemia so pronounced as to look dangerous to his constitution."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[anaemic]] | adjective | **1.** Relating to anemia or suffering from anemia.<br>**2.** Lacking vigor or energy. | *"She likewise informed us, quite incidentally and "by the way," that Mrs Ross had disliked my hat and Mrs Bruce had asked if Charmion were anaemic--such a colourless skin!--and Mrs Someone Else thought it so "queer" that we should live together!"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[anemia]] | noun | **1.** A condition in which the blood is deficient in red blood cells, in hemoglobin, or in total volume. | *"How kind of Captain Hyde!" she drawled, as Lawrence, irritated by her manner, went to help Val, while Isabel was called indoors by Fanny to listen to a tale of distress, unravel a grievance, and prescribe for anemia."* — Anthony Pryde, *Nightfall* |
| [[anemic]] | adjective | **1.** Lacking vigor or energy.<br>**2.** Relating to anemia or suffering from anemia. | *"In academic literature, anemic designates lacking vigor or energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haem]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haem designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemagglutinate]] | verb | **1.** Cause the clumping together (of red blood cells). | *"In academic literature, haemagglutinate designates cause the clumping together (of red blood cells)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemagglutination]] | noun | **1.** Agglutination of red blood cells. | *"In academic literature, haemagglutination designates agglutination of red blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemal]] | adjective | **1.** Relating to the blood vessels or blood. | *"In academic literature, haemal designates relating to the blood vessels or blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemangioma]] | noun | **1.** Benign angioma consisting of a mass of blood vessels; some appear as birthmarks. | *"In academic literature, haemangioma designates benign angioma consisting of a mass of blood vessels; some appear as birthmarks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemanthus]] | noun | **1.** Genus of african deciduous or evergreen bulbous herbs: blood lilies. | *"In academic literature, haemanthus designates genus of african deciduous or evergreen bulbous herbs: blood lilies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematal]] | adjective | **1.** Relating to the blood vessels or blood. | *"In academic literature, haematal designates relating to the blood vessels or blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematemesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haematemesis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematic]] | adjective | **1.** Relating to or containing or affecting blood. | *"In academic literature, haematic designates relating to or containing or affecting blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematinic]] | noun | **1.** A medicine that increases the hemoglobin content of the blood; used to treat iron-deficiency anemia. | *"In academic literature, haematinic designates a medicine that increases the hemoglobin content of the blood; used to treat iron-deficiency anemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematite]] | noun | **1.** The principal form of iron ore; consists of ferric oxide in crystalline form; occurs in a red earthy form. | *"In academic literature, haematite designates the principal form of iron ore; consists of ferric oxide in crystalline form; occurs in a red earthy form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematobia]] | noun | **1.** European genus of bloodsucking flies. | *"In academic literature, haematobia designates european genus of bloodsucking flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocele]] | noun | **1.** Swelling caused by blood collecting in a body cavity (especially a swelling of the membrane covering the testis). | *"In academic literature, haematocele designates swelling caused by blood collecting in a body cavity (especially a swelling of the membrane covering the testis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematochezia]] | noun | **1.** Passage of stools containing blood (as from diverticulosis or colon cancer or peptic ulcer). | *"In academic literature, haematochezia designates passage of stools containing blood (as from diverticulosis or colon cancer or peptic ulcer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocoele]] | noun | **1.** Swelling caused by blood collecting in a body cavity (especially a swelling of the membrane covering the testis). | *"In academic literature, haematocoele designates swelling caused by blood collecting in a body cavity (especially a swelling of the membrane covering the testis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocolpometra]] | noun | **1.** Accumulation of blood in the vagina and uterus. | *"In academic literature, haematocolpometra designates accumulation of blood in the vagina and uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocolpos]] | noun | **1.** Accumulation of menstrual blood in the vagina (usually due to an imperforate hymen). | *"In academic literature, haematocolpos designates accumulation of menstrual blood in the vagina (usually due to an imperforate hymen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocrit]] | noun | **1.** The ratio of the volume occupied by packed red blood cells to the volume of the whole blood as measured by a hematocrit.<br>**2.** A measuring instrument to determine (usually by centrifugation) the relative amounts of corpuscles and plasma in the blood. | *"In academic literature, haematocrit designates the ratio of the volume occupied by packed red blood cells to the volume of the whole blood as measured by a hematocrit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocytopenia]] | noun | **1.** An abnormally low number of red blood cells in the blood. | *"In academic literature, haematocytopenia designates an abnormally low number of red blood cells in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematocyturia]] | noun | **1.** The presence of red blood cells in the urine. | *"In academic literature, haematocyturia designates the presence of red blood cells in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematogenesis]] | noun | **1.** The formation of blood cells in the living body (especially in the bone marrow). | *"In academic literature, haematogenesis designates the formation of blood cells in the living body (especially in the bone marrow)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematogenic]] | adjective | **1.** Pertaining to the formation of blood or blood cells. | *"In academic literature, haematogenic designates pertaining to the formation of blood or blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematohiston]] | noun | **1.** A colorless protein obtained by removing heme from hemoglobin; the oxygen carrying compound in red blood cells. | *"In academic literature, haematohiston designates a colorless protein obtained by removing heme from hemoglobin; the oxygen carrying compound in red blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematoidin]] | noun | **1.** An orange-yellow pigment in the bile that forms as a product of hemoglobin; excess amounts in the blood produce the yellow appearance observed in jaundice. | *"In academic literature, haematoidin designates an orange-yellow pigment in the bile that forms as a product of hemoglobin; excess amounts in the blood produce the yellow appearance observed in jaundice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematological]] | adjective | **1.** Of or relating to or involved in hematology. | *"In academic literature, haematological designates of or relating to or involved in hematology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematologist]] | noun | **1.** A doctor who specializes in diseases of the blood and blood-forming organs. | *"In academic literature, haematologist designates a doctor who specializes in diseases of the blood and blood-forming organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematology]] | noun | **1.** The branch of medicine that deals with diseases of the blood and blood-forming organs. | *"In academic literature, haematology designates the branch of medicine that deals with diseases of the blood and blood-forming organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematolysis]] | noun | **1.** Lysis of erythrocytes with the release of hemoglobin. | *"In academic literature, haematolysis designates lysis of erythrocytes with the release of hemoglobin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematoma]] | noun | **1.** A localized swelling filled with blood. | *"In academic literature, haematoma designates a localized swelling filled with blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematopodidae]] | noun | **1.** Oystercatchers. | *"In academic literature, haematopodidae designates oystercatchers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematopoiesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haematopoiesis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematopoietic]] | adjective | **1.** Pertaining to the formation of blood or blood cells. | *"In academic literature, haematopoietic designates pertaining to the formation of blood or blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematopus]] | noun | **1.** Oystercatchers. | *"In academic literature, haematopus designates oystercatchers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematoxylon]] | noun | **1.** Small genus of tropical american spiny bushy shrubs or trees. | *"In academic literature, haematoxylon designates small genus of tropical american spiny bushy shrubs or trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematoxylum]] | noun | **1.** Small genus of tropical american spiny bushy shrubs or trees. | *"In academic literature, haematoxylum designates small genus of tropical american spiny bushy shrubs or trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haematuria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haematuria designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemic]] | adjective | **1.** Relating to or containing or affecting blood. | *"In academic literature, haemic designates relating to or containing or affecting blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemitin]] | noun | **1.** A complex red organic pigment containing iron and other atoms to which oxygen binds. | *"In academic literature, haemitin designates a complex red organic pigment containing iron and other atoms to which oxygen binds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemochromatosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haemochromatosis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemodialysis]] | noun | **1.** Dialysis of the blood to remove toxic substances or metabolic wastes from the bloodstream; used in the case of kidney failure. | *"In academic literature, haemodialysis designates dialysis of the blood to remove toxic substances or metabolic wastes from the bloodstream; used in the case of kidney failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemodoraceae]] | noun | **1.** Some genera placed in family liliaceae. | *"In academic literature, haemodoraceae designates some genera placed in family liliaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemodorum]] | noun | **1.** Type genus of family haemodoraceae. | *"In academic literature, haemodorum designates type genus of family haemodoraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemogenesis]] | noun | **1.** The formation of blood cells in the living body (especially in the bone marrow). | *"In academic literature, haemogenesis designates the formation of blood cells in the living body (especially in the bone marrow)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoglobin]] | noun | **1.** A hemoprotein composed of globin and heme that gives red blood cells their characteristic color; function primarily to transport oxygen from the lungs to the body tissues. | *"In academic literature, haemoglobin designates a hemoprotein composed of globin and heme that gives red blood cells their characteristic color; function primarily to transport oxygen from the lungs to the body tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoglobinemia]] | noun | **1.** Presence of excessive hemoglobin in the blood plasma. | *"In academic literature, haemoglobinemia designates presence of excessive hemoglobin in the blood plasma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoglobinopathy]] | noun | **1.** A blood disease characterized by the presence of abnormal hemoglobins in the blood. | *"In academic literature, haemoglobinopathy designates a blood disease characterized by the presence of abnormal hemoglobins in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoglobinuria]] | noun | **1.** Presence of hemoglobin in the urine. | *"In academic literature, haemoglobinuria designates presence of hemoglobin in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemolysin]] | noun | **1.** Any substance that can cause lysis (destruction) of erythrocytes (red blood cells) and the release of their hemoglobin. | *"In academic literature, haemolysin designates any substance that can cause lysis (destruction) of erythrocytes (red blood cells) and the release of their hemoglobin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemolysis]] | noun | **1.** Lysis of erythrocytes with the release of hemoglobin. | *"In academic literature, haemolysis designates lysis of erythrocytes with the release of hemoglobin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemolytic]] | adjective | **1.** Relating to or involving or causing hemolysis. | *"In academic literature, haemolytic designates relating to or involving or causing hemolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemophile]] | noun | **1.** Someone who has hemophilia and is subject to uncontrollable bleeding. | *"In academic literature, haemophile designates someone who has hemophilia and is subject to uncontrollable bleeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemophilia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haemophilia designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemophiliac]] | noun | **1.** Someone who has hemophilia and is subject to uncontrollable bleeding. | *"In academic literature, haemophiliac designates someone who has hemophilia and is subject to uncontrollable bleeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemophilic]] | adjective | **1.** Relating to or having hemophilia. | *"In academic literature, haemophilic designates relating to or having hemophilia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haemophobia designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemopis]] | noun | **1.** Leeches. | *"Classical and authoritative lexicons catalog haemopis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemopoiesis]] | noun | **1.** The formation of blood cells in the living body (especially in the bone marrow). | *"In academic literature, haemopoiesis designates the formation of blood cells in the living body (especially in the bone marrow)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemopoietic]] | adjective | **1.** Pertaining to the formation of blood or blood cells. | *"In academic literature, haemopoietic designates pertaining to the formation of blood or blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoproteid]] | noun | **1.** Related to malaria parasite and having a phase in the viscera of various birds. | *"In academic literature, haemoproteid designates related to malaria parasite and having a phase in the viscera of various birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoproteidae]] | noun | **1.** Bird parasites. | *"In academic literature, haemoproteidae designates bird parasites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoprotein]] | noun | **1.** A conjugated protein linked to a compound of iron and porphyrin. | *"In academic literature, haemoprotein designates a conjugated protein linked to a compound of iron and porphyrin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoproteus]] | noun | **1.** Type genus of the family haemoproteidae. | *"In academic literature, haemoproteus designates type genus of the family haemoproteidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemoptysis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haemoptysis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemorrhage]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"Internal haemorrhage," said Lawrence."* — Anthony Pryde, *Nightfall* |
| [[haemorrhagic]] | adjective | **1.** Of or relating to a hemorrhage. | *"In academic literature, haemorrhagic designates of or relating to a hemorrhage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemorrhoid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to blood. | *"In academic literature, haemorrhoid designates adjective & noun*) resembling, having the physical form of, or akin to blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemorrhoidectomy]] | noun | **1.** Surgical procedure for tying hemorrhoids and excising them. | *"In academic literature, haemorrhoidectomy designates surgical procedure for tying hemorrhoids and excising them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemosiderin]] | noun | **1.** A granular brown substance composed of ferric oxide; left from the breakdown of hemoglobin; can be a sign of disturbed iron metabolism. | *"In academic literature, haemosiderin designates a granular brown substance composed of ferric oxide; left from the breakdown of hemoglobin; can be a sign of disturbed iron metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemosiderosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, haemosiderosis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemosporidia]] | noun | **1.** An order in the subclass telosporidia. | *"In academic literature, haemosporidia designates an order in the subclass telosporidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemosporidian]] | noun | **1.** Minute protozoans parasitic at some stage of the life cycle in blood cells of vertebrates including many pathogens. | *"In academic literature, haemosporidian designates minute protozoans parasitic at some stage of the life cycle in blood cells of vertebrates including many pathogens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemostasia]] | noun | **1.** Surgical procedure of stopping the flow of blood (as with a hemostat). | *"In academic literature, haemostasia designates surgical procedure of stopping the flow of blood (as with a hemostat)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemostasis]] | noun | **1.** Surgical procedure of stopping the flow of blood (as with a hemostat). | *"In academic literature, haemostasis designates surgical procedure of stopping the flow of blood (as with a hemostat)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemostat]] | noun | **1.** A surgical instrument that stops bleeding by clamping the blood vessel. | *"In academic literature, haemostat designates a surgical instrument that stops bleeding by clamping the blood vessel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemostatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of blood. | *"In academic literature, haemostatic designates adjective*) pertaining to, derived from, or characteristic of blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemothorax]] | noun | **1.** Accumulation of blood in the pleural cavity (the space between the lungs and the walls of the chest). | *"In academic literature, haemothorax designates accumulation of blood in the pleural cavity (the space between the lungs and the walls of the chest)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemulidae]] | noun | **1.** Grunts. | *"Classical and authoritative lexicons catalog haemulidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemulon]] | noun | **1.** Type genus of the haemulidae. | *"In academic literature, haemulon designates type genus of the haemulidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematemesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hematemesis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematocrit]] | noun | **1.** The ratio of the volume of red blood cells to the total volume of blood as determined by separation of red blood cells from the plasma usually by centrifugation. | *"In academic literature, hematocrit designates the ratio of the volume of red blood cells to the total volume of blood as determined by separation of red blood cells from the plasma usually by centrifugation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hematogenesis designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematophagous]] | noun | **1.** Feeding on blood. | *"In academic literature, hematophagous designates feeding on blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematopoiesis]] | noun | **1.** The formation of blood or of blood cells in the living body. | *"In academic literature, hematopoiesis designates the formation of blood or of blood cells in the living body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematopoietic]] | noun | **1.** The formation of blood or of blood cells in the living body. | *"In academic literature, hematopoietic designates the formation of blood or of blood cells in the living body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematuria]] | noun | **1.** The presence of blood or blood cells in the urine. | *"In academic literature, hematuria designates the presence of blood or blood cells in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemocoel]] | noun | **1.** A body cavity (as in arthropods or some mollusks) that contains blood or hemolymph and functions as part of the circulatory system. | *"In academic literature, hemocoel designates a body cavity (as in arthropods or some mollusks) that contains blood or hemolymph and functions as part of the circulatory system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemocyte]] | noun | **1.** A blood cell especially of an invertebrate animal. | *"In academic literature, hemocyte designates a blood cell especially of an invertebrate animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemoglobin]] | noun | **1.** An iron-containing respiratory pigment of vertebrate red blood cells that consists of a globin composed of four subunits each of which is linked to a heme molecule, that functions in oxygen transport to the tissues after conversion to oxygenated form in the gills or lungs, and that assists in carbon dioxide transport back to the gills or lungs after surrender of its oxygen.<br>**2.** Any of numerous iron-containing respiratory pigments of various organisms (such as invertebrates and yeasts). | *"In academic literature, hemoglobin designates an iron-containing respiratory pigment of vertebrate red blood cells that consists of a globin composed of four subunits each of which is linked to a heme molecule, that functions in oxygen transport to the tissues after conversion to oxygenated form in the gills or lungs, and that assists in carbon dioxide transport back to the gills or lungs after surrender of its oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemoglobinuria]] | noun | **1.** The presence of free hemoglobin in the urine. | *"In academic literature, hemoglobinuria designates the presence of free hemoglobin in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemolysis]] | noun | **1.** Lysis of red blood cells with liberation of hemoglobin. | *"In academic literature, hemolysis designates lysis of red blood cells with liberation of hemoglobin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemolytic]] | adjective | **1.** Relating to or involving or causing hemolysis. | *"In academic literature, hemolytic designates relating to or involving or causing hemolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemophagy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hemophagy designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemophilia]] | noun | **1.** A hereditary, sex-linked blood defect occurring almost exclusively in males that is marked by delayed clotting of the blood with prolonged or excessive internal or external bleeding after injury or surgery and in severe cases spontaneous bleeding into joints and muscles and that is caused by a deficiency of clotting factors.<br>**2.** The common form of hemophilia that is caused by a deficiency of factor VIII. | *"In academic literature, hemophilia designates a hereditary, sex-linked blood defect occurring almost exclusively in males that is marked by delayed clotting of the blood with prolonged or excessive internal or external bleeding after injury or surgery and in severe cases spontaneous bleeding into joints and muscles and that is caused by a deficiency of clotting factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemophiliac]] | noun | **1.** Of, resembling, or affected with a blood defect that is characterized by delayed clotting of the blood : of, resembling, or affected with hemophilia.<br>**2.** One affected with a blood defect that is characterized by delayed clotting of the blood : one affected with hemophilia —called also bleeder. | *"In academic literature, hemophiliac designates of, resembling, or affected with a blood defect that is characterized by delayed clotting of the blood : of, resembling, or affected with hemophilia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemorrhage]] | noun | **1.** A copious or heavy discharge of blood from the blood vessels.<br>**2.** A rapid and uncontrollable loss or outflow. | *"In 1882 she had many hemorrhages, and gradually grew worse, so that she could not use her left arm or shoulder without producing hemorrhage."* — Classic Author, *The wonders of prayer* |
| [[hemorrhagic]] | noun | **1.** A copious or heavy discharge of blood from the blood vessels.<br>**2.** A rapid and uncontrollable loss or outflow. | *"In academic literature, hemorrhagic designates a copious or heavy discharge of blood from the blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemorrhoid]] | noun | **1.** An abnormal mass of dilated and engorged blood vessels in swollen tissue that occurs internally in the anal canal or externally around the anus, that may be marked by bleeding, pain, or itching, and that when occurring internally often protrude through the outer sphincter of the anus and when occurring externally may lead to thrombosis —usually plural—called also piles. | *"In academic literature, hemorrhoid designates an abnormal mass of dilated and engorged blood vessels in swollen tissue that occurs internally in the anal canal or externally around the anus, that may be marked by bleeding, pain, or itching, and that when occurring internally often protrude through the outer sphincter of the anus and when occurring externally may lead to thrombosis —usually plural—called also piles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemorrhoidectomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hemorrhoidectomy designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemosiderin]] | noun | **1.** A yellowish-brown, iron-containing, granular pigment that is found within cells (such as macrophages), is composed chiefly of aggregates of ferritin, and is typically associated with bleeding and the breakdown of red blood cells (as in hemolytic anemia). | *"In academic literature, hemosiderin designates a yellowish-brown, iron-containing, granular pigment that is found within cells (such as macrophages), is composed chiefly of aggregates of ferritin, and is typically associated with bleeding and the breakdown of red blood cells (as in hemolytic anemia)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemosiderosis]] | noun | **1.** The excessive deposition of hemosiderin in bodily tissues (as of the liver, spleen, or lungs) that typically results from bleeding, the breakdown of red blood cells, or repeated transfusions and is usually not accompanied by tissue damage. | *"In academic literature, hemosiderosis designates the excessive deposition of hemosiderin in bodily tissues (as of the liver, spleen, or lungs) that typically results from bleeding, the breakdown of red blood cells, or repeated transfusions and is usually not accompanied by tissue damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemostasis]] | noun | **1.** Arrest of bleeding. | *"In academic literature, hemostasis designates arrest of bleeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemostat]] | noun | **1.** Hemostatic; especially : an instrument for compressing a bleeding vessel. | *"In academic literature, hemostat designates hemostatic; especially : an instrument for compressing a bleeding vessel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemostatic]] | adjective | **1.** Tending to check bleeding by contracting the tissues or blood vessels. | *"In academic literature, hemostatic designates tending to check bleeding by contracting the tissues or blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemotherapy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hemotherapy designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperaemia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hyperaemia designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperemia]] | noun | **1.** Excess of blood in a body part : congestion. | *"In academic literature, hyperemia designates excess of blood in a body part : congestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperemic]] | adjective | **1.** Relating to or caused by hyperemia. | *"In academic literature, hyperemic designates relating to or caused by hyperemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyphaema]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hyphaema designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyphema]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hyphema designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypovolemia]] | noun | **1.** A decrease in the volume of circulating blood in the body (as from traumatic injury or severe dehydration). | *"In academic literature, hypovolemia designates a decrease in the volume of circulating blood in the body (as from traumatic injury or severe dehydration)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypovolemic]] | adjective | **1.** Of or relating to a decrease in the volume of circulating blood. | *"In academic literature, hypovolemic designates of or relating to a decrease in the volume of circulating blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ischemia]] | noun | **1.** Deficient supply of blood to a body part (such as the heart or brain) that is due to obstruction of the inflow of arterial blood. | *"In academic literature, ischemia designates deficient supply of blood to a body part (such as the heart or brain) that is due to obstruction of the inflow of arterial blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ischemic]] | adjective | **1.** Relating to or affected by ischemia. | *"In academic literature, ischemic designates relating to or affected by ischemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[methemoglobin]] | noun | **1.** A soluble brown crystalline basic blood pigment that differs from hemoglobin in containing ferric iron and in being unable to combine reversibly with molecular oxygen. | *"In academic literature, methemoglobin designates a soluble brown crystalline basic blood pigment that differs from hemoglobin in containing ferric iron and in being unable to combine reversibly with molecular oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[methemoglobinemia]] | noun | **1.** The presence of methemoglobin in the blood. | *"In academic literature, methemoglobinemia designates the presence of methemoglobin in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microhematuria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, microhematuria designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microhemorrhage]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, microhemorrhage designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycythaemia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, polycythaemia designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · HAEM
  </div>
</div>
