---
status: unread
type: root_dashboard
---
# Dashboard — blast
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">βλαστάνειν βλαστός βλάστημα (blastánein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“germ , embryo, bud, cell with nucleus”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'germ , embryo, bud, cell with nucleus'.</span>
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

The Greek root **blast** (βλαστάνειν βλαστός βλάστημα (blastánein)) signifies germ , embryo, bud, cell with nucleus. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *blast*, *blastema*, *blastochyle*, *blastocoele*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: germ , embryo, bud, cell with nucleus
> The Greek root **blast** fundamentally denotes **germ , embryo, bud, cell with nucleus**. The physical sensory observation and cognitive anchor underlying 'germ , embryo, bud, cell with nucleus'. In classical Greek antiquity, the root denoted 'germ , embryo, bud, cell with nucleus', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">germ , embryo, bud, cell with nucleus</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'germ , embryo, bud, cell with nucleus'.</mark>
> - **Everyday Connection**: Think of familiar words like *blast*, *blastema*, *blastochyle*, *blastocoele*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **blast** derives from Ancient Greek <mark class="hl-stem">βλαστάνειν βλαστός βλάστημα (blastánein)</mark>, meaning "germ , embryo, bud, cell with nucleus".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with blast**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'germ , embryo, bud, cell with nucleus'.
  - Whenever you see **blast** in an English word, think immediately of **germ , embryo, bud, cell with nucleus**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">blast</mark>, think of <mark class="hl-def">germ , embryo, bud, cell with nucleus</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `blast-` (from *βλαστάνειν βλαστός βλάστημα (blastánein)*).
> - **Combining Stem with -o- Connective:** `blasto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Blast
> - **1. Direct & Concrete Anchor:** Literal instantiation of germ , embryo, bud, cell with nucleus in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on blast

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `blast-` | [[blast]] | Primary root semantic foundation denoting germ , embryo, bud, cell with nucleus. |
| **Connecting -o-** | `blasto-` | [[blastema]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `blast` | [[blastochyle]] | Relational or directional modification of the core root sense. |

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
| [[blast]] | noun | **1.** A violent gust of wind.<br>**2.** The effect or accompaniment (such as sleet) of such a gust. | *"Now, Mars, I prithee, make us quick in work, That we with smoking swords may march from hence To help our fielded friends!—Come, blow thy blast. [_They sound a parley._] Enter two Senators with others on the walls of Corioles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[blasted]] | verb | **1.** Make a strident sound.<br>**2.** Hit hard. | *"To see ’t mine eyes are blasted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[blastema]] | noun | **1.** A mass of undifferentiated cells capable of growth and differentiation. | *"In academic literature, blastema designates a mass of undifferentiated cells capable of growth and differentiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastemal]] | adjective | **1.** Of or relating to blastemata. | *"In academic literature, blastemal designates of or relating to blastemata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastematic]] | adjective | **1.** Of or relating to blastemata. | *"In academic literature, blastematic designates of or relating to blastemata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastemic]] | adjective | **1.** Of or relating to blastemata. | *"In academic literature, blastemic designates of or relating to blastemata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blaster]] | noun | **1.** A workman employed to blast with explosives. | *"Drawing my heavy blaster I rake the beam across the doorway."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[blasting]] | verb | **1.** Make a strident sound.<br>**2.** Hit hard. | *"Here is your husband, like a mildew’d ear Blasting his wholesome brother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[blastocele]] | noun | **1.** The fluid-filled cavity inside a blastula. | *"In academic literature, blastocele designates the fluid-filled cavity inside a blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastochyle]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, blastochyle designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocladia]] | noun | **1.** A genus of fungi of the family blastodiaceae. | *"In academic literature, blastocladia designates a genus of fungi of the family blastodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocladiales]] | noun | **1.** Fungi that carry out asexual reproduction by thick-walled resting spores that produce zoospores upon germination; sometimes placed in class oomycetes. | *"In academic literature, blastocladiales designates fungi that carry out asexual reproduction by thick-walled resting spores that produce zoospores upon germination; sometimes placed in class oomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocoel]] | noun | **1.** The fluid-filled cavity of a blastula. | *"In academic literature, blastocoel designates the fluid-filled cavity of a blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocoele]] | noun | **1.** The fluid-filled cavity of a blastula. | *"In academic literature, blastocoele designates the fluid-filled cavity of a blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocoelic]] | adjective | **1.** Of or relating to a segmentation cavity. | *"In academic literature, blastocoelic designates of or relating to a segmentation cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocyst]] | noun | **1.** The modified blastula of a placental mammal having an outer layer composed of the trophoblast. | *"In academic literature, blastocyst designates the modified blastula of a placental mammal having an outer layer composed of the trophoblast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocyte]] | noun | **1.** An undifferentiated embryonic cell. | *"In academic literature, blastocyte designates an undifferentiated embryonic cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastocytoma]] | noun | **1.** A tumor composed of immature undifferentiated cells. | *"In academic literature, blastocytoma designates a tumor composed of immature undifferentiated cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastoderm]] | noun | **1.** A blastodisc after completion of cleavage and formation of the blastocoel. | *"In academic literature, blastoderm designates a blastodisc after completion of cleavage and formation of the blastocoel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastodermatic]] | adjective | **1.** Of or relating to a blastoderm. | *"In academic literature, blastodermatic designates of or relating to a blastoderm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastodermic]] | adjective | **1.** Of or relating to a blastoderm. | *"In academic literature, blastodermic designates of or relating to a blastoderm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastodiaceae]] | noun | **1.** A family of saprobic fungi of order blastocladiales. | *"In academic literature, blastodiaceae designates a family of saprobic fungi of order blastocladiales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastodisc]] | noun | **1.** A layer of cells on the inside of the blastula. | *"In academic literature, blastodisc designates a layer of cells on the inside of the blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastoff]] | noun | **1.** The launching of a missile or spacecraft to a specified destination. | *"In academic literature, blastoff designates the launching of a missile or spacecraft to a specified destination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastogenesis]] | noun | **1.** Asexual reproduction by budding.<br>**2.** Theory that inherited characteristics are transmitted by germ plasm. | *"In academic literature, blastogenesis designates asexual reproduction by budding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastogenetic]] | adjective | **1.** Of or relating to blastogenesis. | *"In academic literature, blastogenetic designates of or relating to blastogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastoma]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, blastoma designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomere]] | noun | **1.** Any cell resulting from cleavage of a fertilized egg. | *"In academic literature, blastomere designates any cell resulting from cleavage of a fertilized egg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomeric]] | adjective | **1.** Of or relating to a blastomere. | *"In academic literature, blastomeric designates of or relating to a blastomere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomyces]] | noun | **1.** Genus of pathogenic yeastlike fungi. | *"In academic literature, blastomyces designates genus of pathogenic yeastlike fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomycete]] | noun | **1.** Any of various yeastlike budding fungi of the genus blastomyces; cause disease in humans and other animals. | *"In academic literature, blastomycete designates any of various yeastlike budding fungi of the genus blastomyces; cause disease in humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomycosis]] | noun | **1.** Any of several infections of the skin or mucous membrane caused by blastomyces. | *"In academic literature, blastomycosis designates any of several infections of the skin or mucous membrane caused by blastomyces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastomycotic]] | adjective | **1.** Of or relating to or characteristic of blastomycosis. | *"In academic literature, blastomycotic designates of or relating to or characteristic of blastomycosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastoporal]] | adjective | **1.** Of or relating to a blastopore. | *"In academic literature, blastoporal designates of or relating to a blastopore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastopore]] | noun | **1.** The opening into the archenteron. | *"In academic literature, blastopore designates the opening into the archenteron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastoporic]] | adjective | **1.** Of or relating to a blastopore. | *"In academic literature, blastoporic designates of or relating to a blastopore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastosphere]] | noun | **1.** Early stage of an embryo produced by cleavage of an ovum; a liquid-filled sphere whose wall is composed of a single layer of cells; during this stage (about eight days after fertilization) implantation in the wall of the uterus occurs. | *"In academic literature, blastosphere designates early stage of an embryo produced by cleavage of an ovum; a liquid-filled sphere whose wall is composed of a single layer of cells; during this stage (about eight days after fertilization) implantation in the wall of the uterus occurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastospheric]] | adjective | **1.** Of or relating to a blastula. | *"In academic literature, blastospheric designates of or relating to a blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastula]] | noun | **1.** An early metazoan embryo typically having the form of a hollow fluid-filled rounded cavity bounded by a single layer of cells. | *"In academic literature, blastula designates an early metazoan embryo typically having the form of a hollow fluid-filled rounded cavity bounded by a single layer of cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[blastular]] | adjective | **1.** Of or relating to a blastula. | *"In academic literature, blastular designates of or relating to a blastula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cytotrophoblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, cytotrophoblast designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectoblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, ectoblast designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, endoblast designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entoblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, entoblast designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fibroblast]] | noun | **1.** A connective-tissue cell of mesenchymal origin that secretes proteins and especially molecular collagen from which the extracellular fibrillar matrix of connective tissue forms.<br>**2.** Any of several protein growth factors that stimulate the proliferation especially of endothelial cells and that promote angiogenesis. | *"In academic literature, fibroblast designates a connective-tissue cell of mesenchymal origin that secretes proteins and especially molecular collagen from which the extracellular fibrillar matrix of connective tissue forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypoblast]] | noun | **1.** The inner germ layer that develops into the lining of the digestive and respiratory systems. | *"In academic literature, hypoblast designates the inner germ layer that develops into the lining of the digestive and respiratory systems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megaloblast]] | noun | **1.** Abnormally large red blood cell present in pernicious anemia and folic acid deficiency. | *"In academic literature, megaloblast designates abnormally large red blood cell present in pernicious anemia and folic acid deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megaloblastic]] | adjective | **1.** Of or relating to megaloblasts. | *"In academic literature, megaloblastic designates of or relating to megaloblasts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesoblast]] | noun | **1.** The middle germ layer that develops into muscle and bone and cartilage and blood and connective tissue. | *"In academic literature, mesoblast designates the middle germ layer that develops into muscle and bone and cartilage and blood and connective tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesoblastic]] | adjective | **1.** Relating to or derived from the mesoderm. | *"In academic literature, mesoblastic designates relating to or derived from the mesoderm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoblast]] | noun | **1.** A large immature monocyte normally found in bone marrow. | *"In academic literature, monoblast designates a large immature monocyte normally found in bone marrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideroblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek blast.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, sideroblast designates a term designating an entity, condition, or phenomenon derived from greek blast."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life & Vitality]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BLAST
  </div>
</div>
