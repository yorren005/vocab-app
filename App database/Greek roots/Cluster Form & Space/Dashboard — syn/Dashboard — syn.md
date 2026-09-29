---
status: unread
type: root_dashboard
---
# Dashboard — syn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">σύν (sún)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“with”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'with'.</span>
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

The Greek root **syn** (σύν (sún)) signifies with. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *syllogism*, *symbol*, *symmetry*, *sympathy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: with
> The Greek root **syn** fundamentally denotes **with**. The physical sensory observation and cognitive anchor underlying 'with'. In classical Greek antiquity, the root denoted 'with', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">with</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'with'.</mark>
> - **Everyday Connection**: Think of familiar words like *syllogism*, *symbol*, *symmetry*, *sympathy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **syn** derives from Ancient Greek <mark class="hl-stem">σύν (sún)</mark>, meaning "with".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with syn**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'with'.
  - Whenever you see **syn** in an English word, think immediately of **with**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">syn</mark>, think of <mark class="hl-def">with</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `syn-` (from *σύν (sún)*).
> - **Combining Stem with -o- Connective:** `syno-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Syn
> - **1. Direct & Concrete Anchor:** Literal instantiation of with in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on syn

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `syn-` | [[syllogism]] | Primary root semantic foundation denoting with. |
| **Connecting -o-** | `syno-` | [[symbol]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `syn` | [[symmetry]] | Relational or directional modification of the core root sense. |

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
| [[asymmetric]] | noun | **1.** Having two sides or halves that are not the same : not symmetrical.<br>**2.** Bonded to four different atoms or groups. | *"In academic literature, asymmetric designates having two sides or halves that are not the same : not symmetrical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetry]] | noun | **1.** Lack or absence of symmetry. | *"In academic literature, asymmetry designates lack or absence of symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchronous]] | noun | **1.** Not simultaneous or concurrent in time : not synchronous.<br>**2.** Of, used in, or being digital communication (as between computers) in which there is no timing requirement for transmission and in which the start of each character is individually signaled by the transmitting device. | *"In academic literature, asynchronous designates not simultaneous or concurrent in time : not synchronous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchrony]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, asynchrony designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasympathetic]] | noun | **1.** Originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels.<br>**2.** Of or relating to the parasympathetic nervous system. | *"In academic literature, parasympathetic designates originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllogise]] | verb | **1.** Reason by syllogisms. | *"In academic literature, syllogise designates reason by syllogisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllogism]] | noun | **1.** A deductive scheme of a formal argument consisting of a major and a minor premise and a conclusion (as in "every virtue is laudable; kindness is a virtue; therefore kindness is laudable").<br>**2.** A subtle, specious, or crafty argument. | *"If that this simple syllogism will serve, so; if it will not, what remedy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[syllogist]] | noun | **1.** Logician skilled in syllogistic reasoning. | *"In academic literature, syllogist designates logician skilled in syllogistic reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllogistic]] | adjective | **1.** Of or relating to or consisting of syllogism. | *"Mill commenced his labors, the only logic recognized was the syllogistic."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[syllogize]] | verb | **1.** Reason by syllogisms. | *"In academic literature, syllogize designates reason by syllogisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbol]] | noun | **1.** An authoritative summary of faith or doctrine : creed.<br>**2.** Something that stands for or suggests something else by reason of relationship, association, convention, or accidental resemblance; especially : a visible sign of something invisible. | *"This quantity theory may be expressed in the formula P = MR/N when P is the symbol for price, or the general price level, N is (1) above, R is (2), and M is (3)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[symbolic]] | noun | **1.** Using, employing, or exhibiting a symbol.<br>**2.** Consisting of or proceeding by means of symbols. | *"The long shadows of the forest had slipped downhill while we talked, had gone far beyond the ruined hovel, beyond the symbolic row of stakes."* — Joseph Conrad, *Heart of Darkness* |
| [[symbolical]] | adjective | **1.** Relating to or using or proceeding by means of symbols.<br>**2.** Serving as a visible symbol for something abstract. | *"Everything is symbolical, you know—the higher style of art: I like that up to a certain point, but not too far—it’s rather straining to keep up with, you know."* — George Eliot, *Middlemarch* |
| [[symbolically]] | adverb | **1.** In a symbolic manner.<br>**2.** By means of symbols. | *"As in droughty regions baptism by immersion could only be performed symbolically, Mr."* — George Eliot, *Middlemarch* |
| [[symbolise]] | verb | **1.** Represent or identify by using a symbol; use symbols.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"It may serve, let us hope, to symbolise some sweet moral blossom that may be found along the track, or relieve the darkening close of a tale of human frailty and sorrow."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[symbolism]] | noun | **1.** The art or practice of using symbols especially by investing things with a symbolic meaning or by expressing the invisible or intangible by means of visible or sensuous representations: such as.<br>**2.** Artistic imitation or invention that is a method of revealing or suggesting immaterial, ideal, or otherwise intangible truth or states. | *"Using the symbolism of the Hebrew religion and its tabernacle, he compares Jesus to the High Priest, but Jesus, he says, does not enter into the holiest alone."* — T. R. Glover, *The Jesus of History* |
| [[symbolist]] | noun | **1.** One who employs symbols or symbolism.<br>**2.** One skilled in the interpretation or explication of symbols. | *"In academic literature, symbolist designates one who employs symbols or symbolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolize]] | noun | **1.** To serve as a symbol of.<br>**2.** To represent, express, or identify by a symbol. | *"No, thought I, there must be some sober reason for this thing; furthermore, it must symbolize something unseen."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[symmetric]] | noun | **1.** Having, involving, or exhibiting symmetry.<br>**2.** Having corresponding points whose connecting lines are bisected by a given point or perpendicularly bisected by a given line or plane. | *"In academic literature, symmetric designates having, involving, or exhibiting symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrical]] | adjective | **1.** Having similarity in size, shape, and relative position of corresponding parts.<br>**2.** Exhibiting equivalence or correspondence among constituents of an entity or between different entities. | *"And we like ’em all the better for it, don’t we?” Mercury, with his hands in the pockets of his bright peach-blossom small-clothes, stretches his symmetrical silk legs with the air of a man of gallantry and can’t deny it."* — Charles Dickens, *Bleak House* |
| [[symmetrise]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrise designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrize]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrize designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetry]] | noun | **1.** Balanced proportions; also : beauty of form arising from balanced proportions.<br>**2.** The property of being symmetrical; especially : correspondence in size, shape, and relative position of parts on opposite sides of a dividing line or median plane or about a center or axis. | *"Since the receipt of the missive in the morning, Boldwood had felt the symmetry of his existence to be slowly getting distorted in the direction of an ideal passion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sympathetic]] | noun | **1.** Existing or operating through an affinity, interdependence, or mutual association.<br>**2.** Appropriate to one's mood, inclinations, or disposition. | *"I am so curious," said Loneli, taking leave, and Mea promised to give the sympathetic Loneli a full report of everything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sympathise]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** To feel or express sympathy or compassion. | *"While something in me,” he went on, “is acutely sensible to her charms, something else is as deeply impressed with her defects: they are such that she could sympathise in nothing I aspired to—co-operate in nothing I undertook."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sympathize]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** Be understanding of. | *"Then with the losers let it sympathize, For nothing can seem foul to those that win. [_The trumpet sounds_.] Enter Worcester and Vernon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sympathy]] | noun | **1.** A feeling or expression of sincere concern for someone who is experiencing something difficult or painful; also : the capacity for this.<br>**2.** The action of entering into or sharing the feelings or interests of another : empathy; also : the capacity for this. | *"Be what it is, The action of my life is like it, which I’ll keep, if but for sympathy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[synchroneity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchroneity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronous]] | noun | **1.** Happening, existing, or arising at precisely the same time.<br>**2.** Recurring or operating at exactly the same periods. | *"In academic literature, synchronous designates happening, existing, or arising at precisely the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronously]] | adverb | **1.** In synchrony; in a synchronous manner. | *"In academic literature, synchronously designates in synchrony; in a synchronous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrony]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchrony designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonym]] | noun | **1.** One of two or more words or expressions of the same language that have the same or nearly the same meaning in some or all senses.<br>**2.** A word, phrase, or name that by association is held to embody something (such as a concept or quality); also : an object held to do this. | *"His outlook upon time was as a transient flash of the eye now and then: that projection of consciousness into days gone by and to come, which makes the past a synonym for the pathetic and the future a word for circumspection, was foreign to Troy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[synonymist]] | noun | **1.** A student of synonyms. | *"In academic literature, synonymist designates a student of synonyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonymity]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express the same meaning. | *"In academic literature, synonymity designates the semantic relation that holds between two words that can (in a given context) express the same meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonymous]] | noun | **1.** Having the character of a synonym; also : alike in meaning or significance.<br>**2.** Having the same connotations, implications, or reference. | *"Charitable is here used in its original sense, as synonymous with benevolence and affection."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[synonymously]] | adverb | **1.** In a synonymous manner. | *"Vanity and pride are different things, though the words are often used synonymously."* — Jane Austen, *Pride and Prejudice* |
| [[synonymousness]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express the same meaning. | *"In academic literature, synonymousness designates the semantic relation that holds between two words that can (in a given context) express the same meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[system]] | noun | **1.** A regularly interacting or interdependent group of items forming a unified whole : such as.<br>**2.** A group of interacting bodies under the influence of related forces. | *"It is habitually hard upon Sir Leicester, whose countenance it greenly mottles in the manner of sage-cheese and in whose aristocratic system it effects a dismal revolution."* — Charles Dickens, *Bleak House* |
| [[systematic]] | noun | **1.** Relating to or consisting of a system.<br>**2.** Presented or formulated as a coherent body of ideas or principles. | *"Pardiggle, but her voice had not a friendly sound, I thought; it was much too business-like and systematic."* — Charles Dickens, *Bleak House* |
| [[systematise]] | verb | **1.** Arrange according to a system or reduce to a system. | *"Dryden, to a greater extent than is (we imagine) generally perceived, was Cowley systematised; and Cowley, who sank into the arms of Dryden, rose from the lap of Donne."* — Francis Thompson, *Shelley: An Essay* |
| [[systematism]] | noun | **1.** The habitual practice of systematization and classification. | *"In academic literature, systematism designates the habitual practice of systematization and classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematist]] | noun | **1.** A biologist who specializes in the classification of organisms into groups on the basis of their structure and origin and behavior.<br>**2.** An organizer who puts things in order. | *"In academic literature, systematist designates a biologist who specializes in the classification of organisms into groups on the basis of their structure and origin and behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematize]] | noun | **1.** To arrange in accord with a definite plan or scheme : order systematically. | *"Edson attempted to systematize her plan for a home and training school for nurses."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[systemic]] | noun | **1.** Of, relating to, or common to a system: such as.<br>**2.** Affecting the body generally. | *"In academic literature, systemic designates of, relating to, or common to a system: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemise]] | verb | **1.** Arrange according to a system or reduce to a system. | *"In academic literature, systemise designates arrange according to a system or reduce to a system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemize]] | verb | **1.** Arrange according to a system or reduce to a system. | *"Then, again, in 1825, Bernard Germain, Count de Lacépède, a great naturalist, published a scientific systemized whale book, wherein are several pictures of the different species of the Leviathan."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unsymbolic]] | adjective | **1.** Not standing for something else. | *"In academic literature, unsymbolic designates not standing for something else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsymmetric]] | adjective | **1.** Lacking symmetry. | *"In academic literature, unsymmetric designates lacking symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsympathetic]] | adjective | **1.** Not sympathetic or disposed toward.<br>**2.** (of characters in literature or drama) tending to evoke antipathetic feelings. | *"This consciousness upon which he had intruded was the single opportunity of existence ever vouchsafed to Tess by an unsympathetic First Cause—her all; her every and only chance."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unsynchronous]] | adjective | **1.** Not occurring together. | *"In academic literature, unsynchronous designates not occurring together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsystematic]] | adjective | **1.** Lacking systematic arrangement or method or organization. | *"But as to "Effie's" telling long magazine tales,--pshaw! she is the most unsystematic creature in the world."* — Effie Afton, *Eventide* |

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
    ROOT DASHBOARD · SYN
  </div>
</div>
