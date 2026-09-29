---
status: unread
type: root_dashboard
---
# Dashboard — amph
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀμφί (amphí)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“both, on both sides of, both kinds”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'both, on both sides of, both kinds'.</span>
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

The Greek root **amph** (ἀμφί (amphí)) signifies both, on both sides of, both kinds. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Amphipoda*, *amph*, *amphibian*, *amphibious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: both, on both sides of, both kinds
> The Greek root **amph** fundamentally denotes **both, on both sides of, both kinds**. The physical sensory observation and cognitive anchor underlying 'both, on both sides of, both kinds'. In classical Greek antiquity, the root denoted 'both, on both sides of, both kinds', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">both, on both sides of, both kinds</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'both, on both sides of, both kinds'.</mark>
> - **Everyday Connection**: Think of familiar words like *Amphipoda*, *amph*, *amphibian*, *amphibious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **amph** derives from Ancient Greek <mark class="hl-stem">ἀμφί (amphí)</mark>, meaning "both, on both sides of, both kinds".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with amph**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'both, on both sides of, both kinds'.
  - Whenever you see **amph** in an English word, think immediately of **both, on both sides of, both kinds**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">amph</mark>, think of <mark class="hl-def">both, on both sides of, both kinds</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `amph-` (from *ἀμφί (amphí)*).
> - **Combining Stem with -o- Connective:** `ampho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Amph
> - **1. Direct & Concrete Anchor:** Literal instantiation of both, on both sides of, both kinds in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on amph

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `amph-` | [[Amphipoda]] | Primary root semantic foundation denoting both, on both sides of, both kinds. |
| **Connecting -o-** | `ampho-` | [[amph]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `amph` | [[amphibian]] | Relational or directional modification of the core root sense. |

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
| [[amph]] | noun | **1.** On both sides : of both kinds : both. | *"In academic literature, amph designates on both sides : of both kinds : both."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphetamine]] | noun | **1.** A central nervous system stimulant that increases energy and decreases appetite; used to treat narcolepsy and some forms of depression. | *"In academic literature, amphetamine designates a central nervous system stimulant that increases energy and decreases appetite; used to treat narcolepsy and some forms of depression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibia]] | noun | **1.** The class of vertebrates that live on land but breed in water; frogs; toads; newts; salamanders; caecilians. | *"In academic literature, amphibia designates the class of vertebrates that live on land but breed in water; frogs; toads; newts; salamanders; caecilians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibian]] | noun | **1.** An amphibious organism; especially : any of a class (Amphibia) of cold-blooded vertebrates (such as frogs, toads, or salamanders) intermediate in many characters between fish and reptiles and having gilled aquatic larvae and air-breathing adults.<br>**2.** An amphibious vehicle; especially : an airplane designed to take off from and land on either land or water. | *"With this monologue should be read the mystical description, in ‘The Passing of Arthur’ (Tennyson’s Idylls of the King), of “the last, dim, weird battle of the west”, beginning,-- “A deathwhite mist slept over sand and sea.” Amphibian."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[amphibiotic]] | adjective | **1.** Having an aquatic early or larval form and a terrestrial adult form. | *"In academic literature, amphibiotic designates having an aquatic early or larval form and a terrestrial adult form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibious]] | noun | **1.** Combining two characteristics.<br>**2.** Relating to or adapted for both land and water. | *"No one, it was probable, would ever appear to dispute my claim, unless it were the amphibious animals of the ocean."* — Jack London, *The Jacket (The Star-Rover)* |
| [[amphibole]] | noun | **1.** Hornblende.<br>**2.** Any of a group of complex silicate minerals with like crystal structures that contain calcium, sodium, magnesium, aluminum, or iron ions or a combination of them. | *"In academic literature, amphibole designates hornblende."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibolips]] | noun | **1.** Cynipid gall wasps, especially causing oak-apple galls. | *"In academic literature, amphibolips designates cynipid gall wasps, especially causing oak-apple galls."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibolite]] | noun | **1.** A usually metamorphic rock consisting essentially of amphibole. | *"In academic literature, amphibolite designates a usually metamorphic rock consisting essentially of amphibole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibology]] | noun | **1.** An ambiguous grammatical construction; e.g., `they are flying planes' can mean either that someone is flying planes or that something is flying planes. | *"In academic literature, amphibology designates an ambiguous grammatical construction; e.g., `they are flying planes' can mean either that someone is flying planes or that something is flying planes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiboly]] | noun | **1.** Amphibology. | *"In academic literature, amphiboly designates amphibology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibrach]] | noun | **1.** A metrical foot consisting of a long syllable between two short syllables in quantitative verse or of a stressed syllable between two unstressed syllables in accentual verse. | *"In academic literature, amphibrach designates a metrical foot consisting of a long syllable between two short syllables in quantitative verse or of a stressed syllable between two unstressed syllables in accentual verse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphicarpa]] | noun | **1.** Very small genus of twining vines of north america and asia: hog peanut. | *"In academic literature, amphicarpa designates very small genus of twining vines of north america and asia: hog peanut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphicarpaea]] | noun | **1.** Very small genus of twining vines of north america and asia: hog peanut. | *"In academic literature, amphicarpaea designates very small genus of twining vines of north america and asia: hog peanut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphictyony]] | noun | **1.** An association of neighboring states or tribes in ancient greece; established originally to defend a common religious center. | *"In academic literature, amphictyony designates an association of neighboring states or tribes in ancient greece; established originally to defend a common religious center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphidiploid]] | noun | **1.** (genetics) an organism or cell having a diploid set of chromosomes from each parent. | *"In academic literature, amphidiploid designates (genetics) an organism or cell having a diploid set of chromosomes from each parent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphidiploidy]] | noun | **1.** The condition of being amphidiploid. | *"In academic literature, amphidiploidy designates the condition of being amphidiploid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphigory]] | noun | **1.** Nonsensical writing (usually verse). | *"In academic literature, amphigory designates nonsensical writing (usually verse)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphimacer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek amph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, amphimacer designates a term designating an entity, condition, or phenomenon derived from greek amph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphimixis]] | noun | **1.** Reproduction involving the union or fusion of a male and a female gamete.<br>**2.** Union of sperm and egg in sexual reproduction. | *"In academic literature, amphimixis designates reproduction involving the union or fusion of a male and a female gamete."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphineura]] | noun | **1.** A class of gastropoda. | *"In academic literature, amphineura designates a class of gastropoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphioxidae]] | noun | **1.** Lancelets. | *"In academic literature, amphioxidae designates lancelets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphioxus]] | noun | **1.** Small translucent lancet-shaped burrowing marine animal; primitive forerunner of the vertebrates. | *"In academic literature, amphioxus designates small translucent lancet-shaped burrowing marine animal; primitive forerunner of the vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphipod]] | noun | **1.** Any of a large order (Amphipoda) of small crustaceans (such as the sand flea) with a laterally compressed body. | *"In academic literature, amphipod designates any of a large order (amphipoda) of small crustaceans (such as the sand flea) with a laterally compressed body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Amphipoda]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek amph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, Amphipoda designates small flat-bodied semiterrestrial crustaceans: whale lice; sand-hoppers; skeleton shrimp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphipoda]] | noun | **1.** Small flat-bodied semiterrestrial crustaceans: whale lice; sand-hoppers; skeleton shrimp. | *"In academic literature, amphipoda designates **1.** small flat-bodied semiterrestrial crustaceans: whale lice; sand-hoppers; skeleton shrimp."* — Academic Lexicon |
| [[amphiprion]] | noun | **1.** Damsel fishes. | *"In academic literature, amphiprion designates damsel fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiprostylar]] | adjective | **1.** Marked by columniation having free columns in porticoes either at both ends or at both sides of a structure. | *"In academic literature, amphiprostylar designates marked by columniation having free columns in porticoes either at both ends or at both sides of a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiprostyle]] | noun | **1.** Having columns at each end only. | *"In academic literature, amphiprostyle designates having columns at each end only."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiprotic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of first. | *"In academic literature, amphiprotic designates adjective*) pertaining to, derived from, or characteristic of first."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphisbaena]] | noun | **1.** (classical mythology) a serpent with a head at each end of its body.<br>**2.** Type genus of the amphisbaenidae. | *"In academic literature, amphisbaena designates (classical mythology) a serpent with a head at each end of its body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphisbaenia]] | noun | **1.** Type genus of the amphisbaenidae. | *"In academic literature, amphisbaenia designates type genus of the amphisbaenidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphisbaenidae]] | noun | **1.** Worm lizards. | *"In academic literature, amphisbaenidae designates worm lizards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphistylar]] | adjective | **1.** Having columns either at both ends or at both sides.<br>**2.** Marked by columniation having free columns in porticoes either at both ends or at both sides of a structure. | *"In academic literature, amphistylar designates having columns either at both ends or at both sides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphitheater]] | noun | **1.** A sloping gallery with seats for spectators (as in an operating room or theater).<br>**2.** An oval large stadium with tiers of seats; an arena in which contests and spectacles are held. | *"On reaching the lower end of the lane they found themselves near the shore of the Sound, in a kind of amphitheater surrounded by forest trees."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[amphitheatre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek thea.<br>**2.** Specialized application within the domain of Light & Vision. | *"He lifted his hand and opened his eyelids; gazed blank, and with a straining effort, on the sky, and toward the amphitheatre of trees: one saw that all to him was void darkness."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[amphitheatric]] | adjective | **1.** Of or related to an amphitheater. | *"In academic literature, amphitheatric designates of or related to an amphitheater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphitheatrical]] | adjective | **1.** Of or related to an amphitheater. | *"Then, again, in mountainous countries where the traveller is continually girdled by amphitheatrical heights; here and there from some lucky point of view you will catch passing glimpses of the profiles of whales defined along the undulating ridges."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[amphitropous]] | adjective | **1.** (of a plant ovule) partly inverted; turned back 90 degrees on its stalk. | *"In academic literature, amphitropous designates (of a plant ovule) partly inverted; turned back 90 degrees on its stalk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiuma]] | noun | **1.** Aquatic eel-shaped salamander having two pairs of very small feet; of still muddy waters in the southern united states. | *"In academic literature, amphiuma designates aquatic eel-shaped salamander having two pairs of very small feet; of still muddy waters in the southern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiumidae]] | noun | **1.** Congo snakes. | *"In academic literature, amphiumidae designates congo snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphora]] | noun | **1.** An ancient jar with two handles and a narrow neck; used to hold oil or wine. | *"Fig. 2.--Amphora of light coloured pottery with splashed glaze."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[amphoric]] | adjective | **1.** The sound heard in auscultation resembling the hollow sound made by blowing across the mouth of a bottle. | *"In academic literature, amphoric designates the sound heard in auscultation resembling the hollow sound made by blowing across the mouth of a bottle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphoteric]] | adjective | **1.** Having characteristics of both an acid and a base and capable of reacting as either. | *"In academic literature, amphoteric designates having characteristics of both an acid and a base and capable of reacting as either."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphotericin]] | noun | **1.** An antibiotic and antifungal agent. | *"In academic literature, amphotericin designates an antibiotic and antifungal agent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphoterism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek amph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, amphoterism designates a term designating an entity, condition, or phenomenon derived from greek amph."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Form & Space]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AMPH
  </div>
</div>
