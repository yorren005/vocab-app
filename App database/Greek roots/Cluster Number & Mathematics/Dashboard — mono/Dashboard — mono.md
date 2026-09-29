---
status: unread
type: root_dashboard
---
# Dashboard — mono
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">mono</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“One”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'One'.</span>
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

The Greek root **mono** (*mono*) signifies One. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *monopoly*, *traffic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: One
> The Greek root **mono** fundamentally denotes **One**. The physical sensory observation and cognitive anchor underlying 'One'. In classical Greek antiquity, the root denoted 'One', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">One</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'One'.</mark>
> - **Everyday Connection**: Think of familiar words like *monopoly*, *traffic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mono** derives from Ancient Greek **mono**, meaning "One".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with mono**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'One'.
  - Whenever you see **mono** in an English word, think immediately of **One**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mono</mark>, think of <mark class="hl-def">One</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `mono-` (from **mono**).
> - **Combining Stem with -o- Connective:** `monoo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Mono
> - **1. Direct & Concrete Anchor:** Literal instantiation of One in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on mono

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `mono-` | [[monopoly]] | Primary root semantic foundation denoting One. |
| **Connecting -o-** | `monoo-` | [[traffic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `mono` | [[mono]] | Relational or directional modification of the core root sense. |

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
| [[antimonopoly]] | adjective | **1.** Of laws and regulations; designed to protect trade and commerce from unfair business practices. | *"In academic literature, antimonopoly designates of laws and regulations; designed to protect trade and commerce from unfair business practices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demonolatry]] | noun | **1.** The acts or rites of worshiping devils. | *"In academic literature, demonolatry designates the acts or rites of worshiping devils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mono]] | noun | **1.** An acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing.<br>**2.** Designating sound transmission or recording or reproduction over a single channel. | *"In forming a slag of similar oxygen ratio, thus— Mono-silicate of lime, 2CaO ."* — Donald M. Levy, *Modern Copper Smelting* |
| [[monoamine]] | noun | **1.** A molecule containing one amine group (especially one that is a neurotransmitter). | *"In academic literature, monoamine designates a molecule containing one amine group (especially one that is a neurotransmitter)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoatomic]] | adjective | **1.** Of or relating to an element consisting of a single atom. | *"In academic literature, monoatomic designates of or relating to an element consisting of a single atom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocanthidae]] | noun | **1.** Filefishes. | *"In academic literature, monocanthidae designates filefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocanthus]] | noun | **1.** Type genus of the monocanthidae. | *"In academic literature, monocanthus designates type genus of the monocanthidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarboxylic]] | adjective | **1.** Containing one carboxyl group. | *"In academic literature, monocarboxylic designates containing one carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarp]] | noun | **1.** A plant that bears fruit once and dies. | *"In academic literature, monocarp designates a plant that bears fruit once and dies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarpic]] | noun | **1.** Bearing fruit but once and then dying. | *"In academic literature, monocarpic designates bearing fruit but once and then dying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochamus]] | noun | **1.** Sawyer beetles. | *"In academic literature, monochamus designates sawyer beetles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromacy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromacy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromasy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromasy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromat]] | noun | **1.** A person who is completely color-blind. | *"In academic literature, monochromat designates a person who is completely color-blind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromatic]] | noun | **1.** Having or consisting of one color or hue.<br>**2.** Monochrome. | *"The oat-harvest began, and all the men were a-field under a monochromatic Lammas sky, amid the trembling air and short shadows of noon."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromatism]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromatism designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochrome]] | noun | **1.** A painting, drawing, or photograph in a single hue.<br>**2.** Of, relating to, or made with a single color or hue. | *"The fields were sallow with the impure light, and all were tinged in monochrome, as if beheld through stained glass."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromia]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromia designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromic]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromic designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromous]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromous designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocle]] | noun | **1.** Lens for correcting defective vision in one eye; held in place by facial muscles. | *"In his left eye flashes the monocle of Cashel Boyle O’Connor Fitzmaurice Tisdall Farrell."* — James Joyce, *Ulysses* |
| [[monocled]] | adjective | **1.** Wearing, or having the face adorned with, eyeglasses or an eyeglass. | *"In academic literature, monocled designates wearing, or having the face adorned with, eyeglasses or an eyeglass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinal]] | adjective | **1.** Of a geological structure in which all strata are inclined in the same direction. | *"In academic literature, monoclinal designates of a geological structure in which all strata are inclined in the same direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocline]] | noun | **1.** A geological formation in which all strata are inclined in the same direction. | *"In academic literature, monocline designates a geological formation in which all strata are inclined in the same direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinic]] | adjective | **1.** Having three unequal crystal axes with one oblique intersection. | *"In academic literature, monoclinic designates having three unequal crystal axes with one oblique intersection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclinous]] | adjective | **1.** Having pistils and stamens in the same flower. | *"In academic literature, monoclinous designates having pistils and stamens in the same flower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoclonal]] | noun | **1.** Any of a class of antibodies produced in the laboratory by a single clone of cells or a cell line and consisting of identical antibody molecules.<br>**2.** Forming or derived from a single clone. | *"In academic literature, monoclonal designates any of a class of antibodies produced in the laboratory by a single clone of cells or a cell line and consisting of identical antibody molecules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocot]] | noun | **1.** A monocotyledonous flowering plant; the stem grows by deposits on its inside. | *"In academic literature, monocot designates a monocotyledonous flowering plant; the stem grows by deposits on its inside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledon]] | noun | **1.** Any of a class or subclass (Liliopsida or Monocotyledoneae) of chiefly herbaceous angiospermous plants having an embryo with a single cotyledon, usually parallel-veined leaves, and floral organs arranged in cycles of three —called also monocot. | *"In academic literature, monocotyledon designates any of a class or subclass (liliopsida or monocotyledoneae) of chiefly herbaceous angiospermous plants having an embryo with a single cotyledon, usually parallel-veined leaves, and floral organs arranged in cycles of three —called also monocot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledonae]] | noun | **1.** Comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae. | *"In academic literature, monocotyledonae designates comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledones]] | noun | **1.** Comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae. | *"In academic literature, monocotyledones designates comprising seed plants that produce an embryo with a single cotyledon and parallel-veined leaves: includes grasses and lilies and palms and orchids; divided into four subclasses or superorders: alismatidae; arecidae; commelinidae; and liliidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocotyledonous]] | noun | **1.** Any of a class or subclass (Liliopsida or Monocotyledoneae) of chiefly herbaceous angiospermous plants having an embryo with a single cotyledon, usually parallel-veined leaves, and floral organs arranged in cycles of three —called also monocot. | *"In academic literature, monocotyledonous designates any of a class or subclass (liliopsida or monocotyledoneae) of chiefly herbaceous angiospermous plants having an embryo with a single cotyledon, usually parallel-veined leaves, and floral organs arranged in cycles of three —called also monocot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocracy]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"In academic literature, monocracy designates a form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoculture]] | noun | **1.** The cultivation of a single crop (on a farm or area or country). | *"In academic literature, monoculture designates the cultivation of a single crop (on a farm or area or country)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocycle]] | noun | **1.** A vehicle with a single wheel that is driven by pedals. | *"In academic literature, monocycle designates a vehicle with a single wheel that is driven by pedals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocyte]] | noun | **1.** A large white blood cell with finely granulated chromatin dispersed throughout the nucleus that is formed in the bone marrow, enters the blood, and migrates into the connective tissue where it differentiates into a macrophage. | *"In academic literature, monocyte designates a large white blood cell with finely granulated chromatin dispersed throughout the nucleus that is formed in the bone marrow, enters the blood, and migrates into the connective tissue where it differentiates into a macrophage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocytosis]] | noun | **1.** Increase in the number of monocytes in the blood; symptom of monocytic leukemia. | *"In academic literature, monocytosis designates increase in the number of monocytes in the blood; symptom of monocytic leukemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoecious]] | noun | **1.** Having pistillate and staminate flowers on the same plant.<br>**2.** Having male and female sex organs in the same individual : hermaphroditic. | *"In academic literature, monoecious designates having pistillate and staminate flowers on the same plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoestrous]] | adjective | **1.** Having one estrous cycle per year. | *"In academic literature, monoestrous designates having one estrous cycle per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoicous]] | adjective | **1.** Having male and female reproductive organs in the same plant or animal. | *"In academic literature, monoicous designates having male and female reproductive organs in the same plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolatry]] | noun | **1.** The worship of a single god but without claiming that it is the only god. | *"In academic literature, monolatry designates the worship of a single god but without claiming that it is the only god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolingual]] | noun | **1.** A person who knows only one language.<br>**2.** Using or knowing only one language. | *"In academic literature, monolingual designates a person who knows only one language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolingually]] | adverb | **1.** In a monolingual manner. | *"In academic literature, monolingually designates in a monolingual manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolith]] | noun | **1.** A single great stone often in the form of an obelisk or column.<br>**2.** A massive structure. | *"The place took its name from a stone pillar which stood there, a strange rude monolith, from a stratum unknown in any local quarry, on which was roughly carved a human hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monolithic]] | noun | **1.** Of, relating to, or resembling a monolith : huge, massive.<br>**2.** Formed from a single crystal. | *"In academic literature, monolithic designates of, relating to, or resembling a monolith : huge, massive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologist]] | noun | **1.** An entertainer who performs alone. | *"In academic literature, monologist designates an entertainer who performs alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologue]] | noun | **1.** soliloquy.<br>**2.** a dramatic sketch performed by one actor. | *"I didn't expect this to be a monologue, by far."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[monologuise]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuise designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologuize]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuize designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomania]] | noun | **1.** Mental illness especially when limited in expression to one idea or area of thought.<br>**2.** Excessive concentration on a single object or idea. | *"It’s a monomania with him to think he is possessed of documents."* — Charles Dickens, *Bleak House* |
| [[monomaniac]] | noun | **1.** A person suffering from monomania. | *"The White Whale swam before him as the monomaniac incarnation of all those malicious agencies which some deep men feel eating in them, till they are left living on with half a heart and half a lung."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[monomaniacal]] | adjective | **1.** Obsessed with a single subject or idea. | *"Well suppressed, indeed, and kept firmly in check for his daughter's sake, and by his brave wife's aid; but insanity, none the less, of the profoundest monomaniacal pattern, for all that."* — Grant Allen, *Michael's Crag* |
| [[monomer]] | noun | **1.** A chemical compound that can undergo polymerization. | *"In academic literature, monomer designates a chemical compound that can undergo polymerization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monometallic]] | adjective | **1.** Containing one atom of metal in the molecule. | *"In academic literature, monometallic designates containing one atom of metal in the molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorium]] | noun | **1.** A genus of formicidae. | *"In academic literature, monomorium designates a genus of formicidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorphemic]] | adjective | **1.** Consisting of only one morpheme. | *"In academic literature, monomorphemic designates consisting of only one morpheme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononeuropathy]] | noun | **1.** Any neuropathy of a single nerve trunk. | *"In academic literature, mononeuropathy designates any neuropathy of a single nerve trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monongahela]] | noun | **1.** A river that rises in northern west virginia and flows north into pennsylvania where it joins the allegheny river at pittsburgh to form the ohio river. | *"Would now, it were old Orleans whiskey, or old Ohio, or unspeakable old Monongahela!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mononuclear]] | adjective | **1.** Having only one nucleus. | *"In academic literature, mononuclear designates having only one nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononucleate]] | adjective | **1.** Having only one nucleus. | *"In academic literature, mononucleate designates having only one nucleus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononucleosis]] | noun | **1.** An acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing. | *"In academic literature, mononucleosis designates an acute disease characterized by fever and swollen lymph nodes and an abnormal increase of mononuclear leucocytes or monocytes in the bloodstream; not highly contagious; some believe it can be transmitted by kissing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolise]] | verb | **1.** Have and control fully and exclusively.<br>**2.** Have or exploit a monopoly of. | *"Indeed more than foremost, for in the minds of many he monopolises the credit for this invention."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[monopolist]] | noun | **1.** A person who monopolizes.<br>**2.** Opposing, prohibiting, or restricting monopolies. | *"In this case the privilege is socially earned by the monopolist; it is not gotten for nothing."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolistic]] | adjective | **1.** Having exclusive control over a commercial activity by possession or legal grant. | *"Monopolistic aspect of organization and particular wages. § 14."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolize]] | noun | **1.** To get a monopoly of : assume complete possession or control of. | *"Nor did she monopolize the conversation."* — L. M. Montgomery, *Anne of Avonlea* |
| [[monopoly]] | noun | **1.** Exclusive ownership through legal privilege, command of supply, or concerted action; specifically : exclusive control of a particular market that is marked by the power to control prices and exclude competition.<br>**2.** Exclusive possession or control. | *"No, faith; lords and great men will not let me; if I had a monopoly out, they would have part on’t and ladies too, they will not let me have all the fool to myself; they’ll be snatching."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[monorail]] | noun | **1.** A railway having a single track. | *"In academic literature, monorail designates a railway having a single track."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monorchidism]] | noun | **1.** Failure of one testes to descend into the scrotum. | *"In academic literature, monorchidism designates failure of one testes to descend into the scrotum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monorchism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orch.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, monorchism designates a term designating an entity, condition, or phenomenon derived from greek orch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosaccharide]] | noun | **1.** A sugar that is not decomposable into simpler sugars by hydrolysis, is classed as either an aldose or ketose, and contains one or more hydroxyl groups per molecule —called also simple sugar. | *"In academic literature, monosaccharide designates a sugar that is not decomposable into simpler sugars by hydrolysis, is classed as either an aldose or ketose, and contains one or more hydroxyl groups per molecule —called also simple sugar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosaccharose]] | noun | **1.** A sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates. | *"In academic literature, monosaccharose designates a sugar (like sucrose or fructose) that does not hydrolyse to give other sugars; the simplest group of carbohydrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosemous]] | adjective | **1.** Having only one meaning. | *"In academic literature, monosemous designates having only one meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosemy]] | noun | **1.** Having a single meaning (absence of ambiguity) usually of individual words or phrases. | *"In academic literature, monosemy designates having a single meaning (absence of ambiguity) usually of individual words or phrases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosomy]] | noun | **1.** Having one less than the diploid number of chromosomes. | *"In academic literature, monosomy designates having one less than the diploid number of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosyllabic]] | adjective | **1.** Having or characterized by or consisting of one syllable. | *"I made some attempts to draw her into conversation, but she seemed a person of few words: a monosyllabic reply usually cut short every effort of that sort."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[monosyllabically]] | adverb | **1.** In a monosyllabic manner. | *"In academic literature, monosyllabically designates in a monosyllabic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosyllable]] | noun | **1.** A word or utterance of one syllable. | *"Smallweed’s favourite adjective of disparagement is so close to his tongue that he begins the words “my dear friend” with the monosyllable “brim,” thus converting the possessive pronoun into brimmy and appearing to have an impediment in his speech."* — Charles Dickens, *Bleak House* |
| [[monotheism]] | noun | **1.** The doctrine or belief that there is but one God. | *"Israel had stood for monotheism and that not the monotheism of Greek philosophy, a dogma of the schools consistent with the cults of Egypt and Phrygia, with hierodules and a deified Antinous."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monotheist]] | noun | **1.** A believer in one god. | *"Christ, as the true spiritual idea, is the ideal of God now and forever, here and everywhere. 361:6 The Jew who believes in the First Commandment is a monotheist; he has one omnipresent God."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monotheistic]] | adjective | **1.** Believing that there is only one god. | *"Its business now was to reconcile its own monotheistic dogma with popular polytheistic practice."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monothelitism]] | noun | **1.** The theological doctrine that christ had only one will even though he had two natures (human and divine); condemned as heretical in the third council of constantinople. | *"In academic literature, monothelitism designates the theological doctrine that christ had only one will even though he had two natures (human and divine); condemned as heretical in the third council of constantinople."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotone]] | noun | **1.** A succession of syllables, words, or sentences in one unvaried key or pitch.<br>**2.** A single unvaried musical tone. | *"His reading of Scripture had no elocutionary pretensions about it; it was quiet, and to a large extent gone through in a monotone; but two things about it made it very impressive."* — John Cairns, *Principal Cairns* |
| [[monotonic]] | noun | **1.** Characterized by the use of or uttered in a monotone.<br>**2.** Having the property either of never increasing or of never decreasing as the values of the independent variable or the subscripts of the terms increase. | *"In academic literature, monotonic designates characterized by the use of or uttered in a monotone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotonous]] | noun | **1.** Uttered or sounded in one unvarying tone : marked by a sameness of pitch and intensity.<br>**2.** Tediously uniform or unvarying. | *"Rouncewell that the rain makes such a monotonous pattering on the terrace that he can’t read the paper even by the fireside in his own snug dressing-room."* — Charles Dickens, *Bleak House* |
| [[monotonously]] | adverb | **1.** In a monotonous manner. | *"They tossed and turned on their little beds, and the cheese-wring dripped monotonously downstairs."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monotony]] | noun | **1.** Tedious sameness.<br>**2.** Sameness of tone or sound. | *"Why do you ask?” “Anything to vary this detestable monotony."* — Charles Dickens, *Bleak House* |
| [[monotremata]] | noun | **1.** Coextensive with the subclass prototheria. | *"In academic literature, monotremata designates coextensive with the subclass prototheria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotreme]] | noun | **1.** Any of an order (Monotremata) of egg-laying mammals comprising the platypuses and echidnas. | *"In academic literature, monotreme designates any of an order (monotremata) of egg-laying mammals comprising the platypuses and echidnas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotropa]] | noun | **1.** Leafless fleshy saprophytic plants; in some classifications placed in the family pyrolaceae. | *"In academic literature, monotropa designates leafless fleshy saprophytic plants; in some classifications placed in the family pyrolaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotropaceae]] | noun | **1.** Used in some classification for saprophytic herbs sometimes included in the family pyrolaceae: genera monotropa and sarcodes. | *"In academic literature, monotropaceae designates used in some classification for saprophytic herbs sometimes included in the family pyrolaceae: genera monotropa and sarcodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotype]] | noun | **1.** (biology) a taxonomic group with a single member (a single species or genus).<br>**2.** A typesetting machine operated from a keyboard that sets separate characters. | *"The linotype and monotype machines, uncanny in their operations, have also come into common practice."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[monotypic]] | noun | **1.** Including a single representative —used especially of a genus with only one species. | *"In academic literature, monotypic designates including a single representative —used especially of a genus with only one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monounsaturated]] | adjective | **1.** (of long-chain carbon compounds especially fats) saturated except for one multiple bond. | *"In academic literature, monounsaturated designates (of long-chain carbon compounds especially fats) saturated except for one multiple bond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[traffic]] | noun | **1.** The vehicles, pedestrians, ships, or planes moving along a route.<br>**2.** Congestion of vehicles. | *"For having traffic with thyself alone, Thou of thyself thy sweet self dost deceive, Then how when nature calls thee to be gone, What acceptable audit canst thou leave?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trafficker]] | noun | **1.** Someone who promotes or exchanges goods or services for money. | *"No, "where is the likeness between the philosopher and the Christian? the disciple of Greece and of heaven? the trafficker in fame and in life? the friend and the foe of error?" (c. 46). {336} The Christian artisan knows God better than Plato did."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |

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
    ROOT DASHBOARD · MONO
  </div>
</div>
