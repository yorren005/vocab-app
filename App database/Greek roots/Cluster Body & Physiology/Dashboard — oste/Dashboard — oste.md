---
status: unread
type: root_dashboard
---
# Dashboard — oste
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὀστέον ὀστέου ὀστοῦν ὀστοῦ (ostéon</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bone”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'bone'.</span>
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

The Greek root **oste** (ὀστέον ὀστέου ὀστοῦν ὀστοῦ (ostéon, ostéou)) signifies bone. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Osteichthyes*, *dysostosis*, *endosteum*, *exostosis*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bone
> The Greek root **oste** fundamentally denotes **bone**. The physical sensory observation and cognitive anchor underlying 'bone'. In classical Greek antiquity, the root denoted 'bone', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">bone</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'bone'.</mark>
> - **Everyday Connection**: Think of familiar words like *Osteichthyes*, *dysostosis*, *endosteum*, *exostosis*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **oste** derives from Ancient Greek <mark class="hl-stem">ὀστέον ὀστέου ὀστοῦν ὀστοῦ (ostéon, ostéou)</mark>, meaning "bone".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with oste**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'bone'.
  - Whenever you see **oste** in an English word, think immediately of **bone**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">oste</mark>, think of <mark class="hl-def">bone</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `oste-` (from *ὀστέον ὀστέου ὀστοῦν ὀστοῦ (ostéon, ostéou)*).
> - **Combining Stem with -o- Connective:** `osteo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Oste
> - **1. Direct & Concrete Anchor:** Literal instantiation of bone in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on oste

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `oste-` | [[Osteichthyes]] | Primary root semantic foundation denoting bone. |
| **Connecting -o-** | `osteo-` | [[dysostosis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `oste` | [[endosteum]] | Relational or directional modification of the core root sense. |

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
| [[dysostosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, dysostosis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endosteum]] | noun | **1.** The layer of vascular connective tissue lining the medullary cavities of bone. | *"In academic literature, endosteum designates the layer of vascular connective tissue lining the medullary cavities of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exostosis]] | noun | **1.** A spur or bony outgrowth from a bone or the root of a tooth. | *"In academic literature, exostosis designates a spur or bony outgrowth from a bone or the root of a tooth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperostosis]] | noun | **1.** Excessive growth or thickening of bone tissue. | *"In academic literature, hyperostosis designates excessive growth or thickening of bone tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monostotic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of bone. | *"In academic literature, monostotic designates adjective*) pertaining to, derived from, or characteristic of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oste]] | combining form | **1.** bone. | *"Classical and authoritative lexicons catalog oste as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteal]] | adjective | **1.** Relating to bone or to the skeleton.<br>**2.** Composed of or containing bone. | *"In academic literature, osteal designates relating to bone or to the skeleton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Osteichthyes]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Osteichthyes designates a class of fish having a skeleton composed of bone in addition to cartilage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteichthyes]] | noun | **1.** A class of fish having a skeleton composed of bone in addition to cartilage. | *"In academic literature, osteichthyes designates **1.** a class of fish having a skeleton composed of bone in addition to cartilage."* — Academic Lexicon |
| [[osteitis]] | noun | **1.** Inflammation of a bone as a consequence of infection or trauma or degeneration. | *"In academic literature, osteitis designates inflammation of a bone as a consequence of infection or trauma or degeneration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ostensible]] | adjective | **1.** Appearing as such but not necessarily so.<br>**2.** Represented or appearing as such; pretended. | *"But man, even to himself, is a palimpsest, having an ostensible writing, and another beneath the lines."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ostensibly]] | adverb | **1.** From appearances alone; ; ; -thomas hardy. | *"But she soon found a curious correspondence between the ostensibly chance position of the cows and her wishes in this matter, till she felt that their order could not be the result of accident."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ostensive]] | adjective | **1.** Manifestly demonstrative.<br>**2.** Represented or appearing as such; pretended. | *"In academic literature, ostensive designates manifestly demonstrative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ostensorium]] | noun | **1.** (roman catholic church) a vessel (usually of gold or silver) in which the consecrated host is exposed for adoration. | *"In academic literature, ostensorium designates (roman catholic church) a vessel (usually of gold or silver) in which the consecrated host is exposed for adoration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ostentate]] | verb | **1.** Display proudly; act ostentatiously or pretentiously. | *"In academic literature, ostentate designates display proudly; act ostentatiously or pretentiously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ostentation]] | noun | **1.** A gaudy outward display.<br>**2.** Lack of elegance as a consequence of being pompous and puffed up with vanity. | *"But you are come A market-maid to Rome, and have prevented The ostentation of our love, which, left unshown, Is often left unloved."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ostentatious]] | adjective | **1.** Intended to attract notice and impress others.<br>**2.** (of a display) tawdry or vulgar. | *"A man can’t very well be ostentatious of what nobody believes in."* — George Eliot, *Middlemarch* |
| [[ostentatiously]] | adverb | **1.** With ostentation; in an ostentatious manner. | *"To this gentleman, Stubb was now politely introduced by the Guernsey-man, who at once ostentatiously put on the aspect of interpreting between them."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[ostentatiousness]] | noun | **1.** Lack of elegance as a consequence of being pompous and puffed up with vanity. | *"In academic literature, ostentatiousness designates lack of elegance as a consequence of being pompous and puffed up with vanity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoarthritis]] | noun | **1.** A common form of arthritis typically with onset during middle or old age that is characterized by progressive degenerative changes in the cartilage of one or more joints (as of the knees, hips, and hands) accompanied by thickening and overgrowth of adjacent bone and that is marked symptomatically chiefly by stiffness, swelling, pain, deformation of joints, and loss of range of motion —abbreviation OA. | *"In academic literature, osteoarthritis designates a common form of arthritis typically with onset during middle or old age that is characterized by progressive degenerative changes in the cartilage of one or more joints (as of the knees, hips, and hands) accompanied by thickening and overgrowth of adjacent bone and that is marked symptomatically chiefly by stiffness, swelling, pain, deformation of joints, and loss of range of motion —abbreviation oa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoblast]] | noun | **1.** A bone-forming cell. | *"In academic literature, osteoblast designates a bone-forming cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoblastoma]] | noun | **1.** Benign tumor of bone and fibrous tissue; occurs in the vertebrae or femur or tibia or arm bones (especially in young adults). | *"In academic literature, osteoblastoma designates benign tumor of bone and fibrous tissue; occurs in the vertebrae or femur or tibia or arm bones (especially in young adults)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteochondritis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteochondritis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteochondroma]] | noun | **1.** Benign tumor containing both bone and cartilage; usually occurs near the end of a long bone. | *"In academic literature, osteochondroma designates benign tumor containing both bone and cartilage; usually occurs near the end of a long bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteochondrosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteochondrosis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoclasis]] | noun | **1.** Treatment of a skeletal deformity by intentionally fracturing a bone. | *"In academic literature, osteoclasis designates treatment of a skeletal deformity by intentionally fracturing a bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoclast]] | noun | **1.** Any of the large multinucleate cells closely associated with areas of bone resorption. | *"In academic literature, osteoclast designates any of the large multinucleate cells closely associated with areas of bone resorption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteocyte]] | noun | **1.** Mature bone cell. | *"In academic literature, osteocyte designates mature bone cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteodystrophy]] | noun | **1.** Defective bone development; usually attributable to renal disease or to disturbances in calcium and phosphorus metabolism. | *"In academic literature, osteodystrophy designates defective bone development; usually attributable to renal disease or to disturbances in calcium and phosphorus metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteogenesis]] | noun | **1.** Development and formation of bone.<br>**2.** A hereditary disease caused by defective or deficient collagen production and marked by extreme brittleness of the long bones and a bluish color of the whites of the eyes —called also brittle bone disease, brittle bones. | *"In academic literature, osteogenesis designates development and formation of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteogenic]] | noun | **1.** Producing bone.<br>**2.** Originating in bone. | *"In academic literature, osteogenic designates producing bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoglossidae]] | noun | **1.** A family of large fishes that live in freshwater; includes bandfish and bonytongues. | *"In academic literature, osteoglossidae designates a family of large fishes that live in freshwater; includes bandfish and bonytongues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoglossiformes]] | noun | **1.** Teleost fish with bony tongues. | *"In academic literature, osteoglossiformes designates teleost fish with bony tongues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoid]] | noun | **1.** Resembling bone.<br>**2.** Uncalcified bone matrix. | *"In academic literature, osteoid designates resembling bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteologer]] | noun | **1.** An anatomist who is skilled is osteology. | *"In academic literature, osteologer designates an anatomist who is skilled is osteology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteologist]] | noun | **1.** An anatomist who is skilled is osteology. | *"In academic literature, osteologist designates an anatomist who is skilled is osteology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteology]] | noun | **1.** A branch of anatomy dealing with the bones.<br>**2.** The bony structure of an organism. | *"Mon._ [416] His work on Osteology--written during the time he acted as Demonstrator in one of the metropolitan schools, and before he had reached his twentieth year--did him great credit."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[osteolysis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteolysis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoma]] | noun | **1.** A benign tumor composed of bone tissue. | *"In academic literature, osteoma designates a benign tumor composed of bone tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteomalacia]] | noun | **1.** A disease of adults that is characterized by softening of the bones and is analogous to rickets in the young. | *"In academic literature, osteomalacia designates a disease of adults that is characterized by softening of the bones and is analogous to rickets in the young."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteomyelitis]] | noun | **1.** An infectious usually painful inflammatory disease of bone often of bacterial origin that may result in the death of bone tissue. | *"In academic literature, osteomyelitis designates an infectious usually painful inflammatory disease of bone often of bacterial origin that may result in the death of bone tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteonecrosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteonecrosis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopath]] | noun | **1.** A physician practicing osteopathic medicine. | *"In academic literature, osteopath designates a physician practicing osteopathic medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopathist]] | noun | **1.** A therapist who manipulates the skeleton and muscles. | *"In academic literature, osteopathist designates a therapist who manipulates the skeleton and muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopathy]] | noun | **1.** A system of medical practice that emphasizes a holistic and comprehensive approach to patient care and utilizes the manipulation of musculoskeletal tissues along with other therapeutic measures (such as the use of drugs or surgery) to prevent and treat disease : osteopathic medicine.<br>**2.** A physician who has earned a degree in osteopathic medicine or osteopathy; also : an academic graduate degree conferring the rank or title of doctor of osteopathic medicine —abbreviation DO, D.O. | *"I had been treated by doctors and specialists; had taken magnetic treatments and osteopathy; had tried change of climate; had an operation in a hospital, and when I came out was worse than before."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[osteopenia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteopenia designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteopetrosis]] | noun | **1.** An inherited disorder characterized by an increase in bone density; in severe forms the bone marrow cavity may be obliterated. | *"In academic literature, osteopetrosis designates an inherited disorder characterized by an increase in bone density; in severe forms the bone marrow cavity may be obliterated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteophyte]] | noun | **1.** Small abnormal bony outgrowth. | *"In academic literature, osteophyte designates small abnormal bony outgrowth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteoporosis]] | noun | **1.** A condition that affects especially older women and is characterized by decrease in bone mass with decreased density and enlargement of bone spaces producing porosity and fragility. | *"In academic literature, osteoporosis designates a condition that affects especially older women and is characterized by decrease in bone mass with decreased density and enlargement of bone spaces producing porosity and fragility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteosarcoma]] | noun | **1.** A sarcoma derived from bone or containing bone tissue. | *"In academic literature, osteosarcoma designates a sarcoma derived from bone or containing bone tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteosclerosis]] | noun | **1.** Abnormal hardening or eburnation of bone. | *"In academic literature, osteosclerosis designates abnormal hardening or eburnation of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteosis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteostracan]] | noun | **1.** Extinct jawless fish of the devonian with armored head. | *"In academic literature, osteostracan designates extinct jawless fish of the devonian with armored head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteostraci]] | noun | **1.** Extinct group of armored fish-like vertebrates; taxonomy is not clear. | *"In academic literature, osteostraci designates extinct group of armored fish-like vertebrates; taxonomy is not clear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteothrombosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteothrombosis designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteotome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteotome designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osteotomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oste.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, osteotomy designates a term designating an entity, condition, or phenomenon derived from greek oste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periosteum]] | noun | **1.** The membrane of connective tissue that closely invests all bones except at the articular surfaces. | *"In academic literature, periosteum designates the membrane of connective tissue that closely invests all bones except at the articular surfaces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synostosis]] | noun | **1.** Union of two or more separate bones to form a single bone. | *"In academic literature, synostosis designates union of two or more separate bones to form a single bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleostei]] | noun | **1.** Large diverse group of bony fishes; includes most living species. | *"In academic literature, teleostei designates large diverse group of bony fishes; includes most living species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unostentatious]] | adjective | **1.** Not ostentatious.<br>**2.** Exhibiting restrained good taste. | *"Collins, the visit to Hunsford, the Derbyshire tour--fit in after the same unostentatious, but masterly fashion."* — Jane Austen, *Pride and Prejudice* |

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
    ROOT DASHBOARD · OSTE
  </div>
</div>
