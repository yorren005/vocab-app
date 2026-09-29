---
status: unread
type: root_dashboard
---
# Dashboard — the
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">the</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“the”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'the'.</span>
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

The Greek root **the** (*the*) signifies the. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Bibliotheca*, *Thea*, *Themis*, *Theodore*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: the
> The Greek root **the** fundamentally denotes **the**. The physical sensory observation and cognitive anchor underlying 'the'. In classical Greek antiquity, the root denoted 'the', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">the</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'the'.</mark>
> - **Everyday Connection**: Think of familiar words like *Bibliotheca*, *Thea*, *Themis*, *Theodore*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **the** derives from Ancient Greek **the**, meaning "the".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with the**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'the'.
  - Whenever you see **the** in an English word, think immediately of **the**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">the</mark>, think of <mark class="hl-def">the</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `the-` (from **the**).
> - **Combining Stem with -o- Connective:** `theo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of The
> - **1. Direct & Concrete Anchor:** Literal instantiation of the in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on the

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `the-` | [[Bibliotheca]] | Primary root semantic foundation denoting the. |
| **Connecting -o-** | `theo-` | [[Thea]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `the` | [[Themis]] | Relational or directional modification of the core root sense. |

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
| [[anathema]] | noun | **1.** Someone or something intensely disliked or loathed —usually used in the phrase be anathema (to).<br>**2.** One that is cursed by ecclesiastical authority. | *"He that is accursed, let him be accursed still,” was the pitiless anathema written in this spoliated effort of his new-born solicitousness."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[anathematic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, anathematic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anathematise]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment. | *"Dent here bent over to the pious lady and whispered something in her ear; I suppose, from the answer elicited, it was a reminder that one of the anathematised race was present."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[anathematize]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment. | *"Everywhere Bonaparte was anathematized and in Moscow nothing but the coming war was talked of."* — graf Leo Tolstoy, *War and Peace* |
| [[anthesis]] | noun | **1.** The action or period of opening of a flower. | *"In academic literature, anthesis designates the action or period of opening of a flower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antithesis]] | noun | **1.** The direct opposite.<br>**2.** The rhetorical contrast of ideas by means of parallel arrangements of words, clauses, or sentences (as in "action, not words" or "they promised freedom and provided slavery"). | *"You feel he does not strain after effect--epigram, antithesis, or alliteration."* — T. R. Glover, *The Jesus of History* |
| [[antithetic]] | noun | **1.** Being in direct and unequivocal opposition : directly opposite or opposed.<br>**2.** Constituting or marked by antithesis. | *"True enough,” said the man of bitter moods, looking round upon the company with the antithetic laughter that comes from a keener appreciation of the miseries of life than ordinary men are capable of."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[antithetical]] | adjective | **1.** Sharply contrasted in character or purpose. | *"The two types of worship are in some measure antithetical: in the one, the animal is not eaten because it is revered; in the other, it is revered because it is eaten."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[antithetically]] | adverb | **1.** With antithesis; in an antithetical manner. | *"In academic literature, antithetically designates with antithesis; in an antithetical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apothecial]] | adjective | **1.** Of or relating to the apothecium of some lichens and fungi. | *"In academic literature, apothecial designates of or relating to the apothecium of some lichens and fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apothecium]] | noun | **1.** A spore-bearing structure in many lichens and fungi consisting of a discoid or cupped body bearing asci on the exposed flat or concave surface. | *"In academic literature, apothecium designates a spore-bearing structure in many lichens and fungi consisting of a discoid or cupped body bearing asci on the exposed flat or concave surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheism]] | noun | **1.** A lack of belief or a strong disbelief in the existence of a god or any gods.<br>**2.** A philosophical or religious position characterized by disbelief in the existence of a god or any gods. | *"It were far more sensible for those who deny the fitness and necessity of prayer to take the ground of the atheist and say plainly "We do not pray, for there is no God to pray to," for to deny prayer, is practical atheism."* — Classic Author, *The wonders of prayer* |
| [[atheist]] | noun | **1.** A person who does not believe in the existence of God or any gods : one who subscribes to or advocates atheism. | *"It were far more sensible for those who deny the fitness and necessity of prayer to take the ground of the atheist and say plainly "We do not pray, for there is no God to pray to," for to deny prayer, is practical atheism."* — Classic Author, *The wonders of prayer* |
| [[atheistic]] | noun | **1.** A person who does not believe in the existence of God or any gods : one who subscribes to or advocates atheism. | *"A future life?” Prince Andrew repeated, but Pierre, giving him no time to reply, took the repetition for a denial, the more readily as he knew Prince Andrew’s former atheistic convictions."* — graf Leo Tolstoy, *War and Peace* |
| [[atheistical]] | adjective | **1.** Related to or characterized by or given to atheism.<br>**2.** Rejecting any belief in gods. | *"In academic literature, atheistical designates related to or characterized by or given to atheism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[athematic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, athematic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Bibliotheca]] | noun | **1.** A collection of books.<br>**2.** A list of books. | *"In academic literature, Bibliotheca designates a collection of books."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bibliothecal]] | adjective | **1.** Of or relating to a library or bibliotheca or a librarian. | *"In academic literature, bibliothecal designates of or relating to a library or bibliotheca or a librarian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bibliothecarial]] | adjective | **1.** Of or relating to a library or bibliotheca or a librarian. | *"In academic literature, bibliothecarial designates of or relating to a library or bibliotheca or a librarian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bodega]] | noun | **1.** A storehouse for maturing wine. | *"I saw John Henry Menton casually in the Bodega just now and it will cost me a fall if I don’t..."* — James Joyce, *Ulysses* |
| [[boutique]] | noun | **1.** A small shop dealing in fashionable clothing or accessories.<br>**2.** A small shop within a large department store. | *"In academic literature, boutique designates a small shop dealing in fashionable clothing or accessories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deem]] | noun | **1.** To come to think or judge : consider.<br>**2.** To have an opinion : believe. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diathesis]] | noun | **1.** Constitutional predisposition to a particular disease or abnormality. | *"The patient may tell you that he has a humor in the blood, a scrofulous diathesis."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[ditheism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ditheism designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doom]] | noun | **1.** A law or ordinance especially in Anglo-Saxon England.<br>**2.** Judgment, decision; especially : a judicial condemnation or sentence. | *"Tell him, from his all-obeying breath I hear The doom of Egypt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[doomed]] | noun | **1.** People who are destined to die soon.<br>**2.** Decree or designate beforehand. | *"This is the way To Julius Caesar’s ill-erected tower, To whose flint bosom my condemned lord Is doomed a prisoner by proud Bolingbroke."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enthesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, enthesis designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enthetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, enthetic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enthusiasm]] | noun | **1.** Strong excitement of feeling : ardor.<br>**2.** Something inspiring zeal or fervor. | *"He had been away on a journey and had not made his appearance for several weeks in Nolla, and his coming was therefore greeted with special enthusiasm."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[enthusiastic]] | adjective | **1.** Having or showing great excitement and interest. | *"Our friends at the castle and even Philip, who certainly was not easily filled with enthusiasm, were extremely enthusiastic about our new playmate."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[epenthesis]] | noun | **1.** The insertion or development of a sound or letter in the body of a word (such as \ə\ in \ˈa-thə-ˌlēt\ athlete). | *"In academic literature, epenthesis designates the insertion or development of a sound or letter in the body of a word (such as \ə\ in \ˈa-thə-ˌlēt\ athlete)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epenthetic]] | noun | **1.** The insertion or development of a sound or letter in the body of a word (such as \ə\ in \ˈa-thə-ˌlēt\ athlete). | *"In academic literature, epenthetic designates the insertion or development of a sound or letter in the body of a word (such as \ə\ in \ˈa-thə-ˌlēt\ athlete)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epitheca]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, epitheca designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epithet]] | noun | **1.** A characterizing word or phrase accompanying or occurring in place of the name of a person or thing.<br>**2.** A disparaging or abusive word or phrase. | *"A most singular and choice epithet. [_Draws out his table-book._] HOLOFERNES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[heterotheca]] | noun | **1.** Genus of yellow-flowered north american herbs. | *"In academic literature, heterotheca designates genus of yellow-flowered north american herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothec]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hypothec designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothecate]] | verb | **1.** Pledge without delivery or title of possession.<br>**2.** To believe especially on uncertain or tentative grounds. | *"In academic literature, hypothecate designates pledge without delivery or title of possession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothesis]] | noun | **1.** A proposed explanation for something (such as a phenomenon of unknown cause) that is tentatively assumed in order to test whether it agrees with facts that are known or can be determined.<br>**2.** A predicted or anticipated outcome. | *"Now, too, the policeman begins to push at doors; to try fastenings; to be suspicious of bundles; and to administer his beat, on the hypothesis that every one is either robbing or being robbed."* — Charles Dickens, *Bleak House* |
| [[hypothesise]] | verb | **1.** To believe especially on uncertain or tentative grounds. | *"In academic literature, hypothesise designates to believe especially on uncertain or tentative grounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothesize]] | verb | **1.** To believe especially on uncertain or tentative grounds. | *"Still, we can hypothesize, even if we cannot prove and establish."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[hypothetical]] | noun | **1.** A hypothetical possibility, circumstance, statement, proposal, situation, etc.<br>**2.** Based primarily on surmise rather than adequate evidence. | *"That was a hypothetical case, arising out of Sir Leicester’s unconsciously carrying the matter with so high a hand."* — Charles Dickens, *Bleak House* |
| [[hypothetically]] | adverb | **1.** By hypothesis. | *"Grose looked straight out of the window, but I felt that, hypothetically, I had a right to know what young persons engaged for Bly were expected to do."* — Henry James, *The Turn of the Screw* |
| [[metathesis]] | noun | **1.** A linguistic process of transposition of sounds or syllables within a word or words within a sentence.<br>**2.** A chemical reaction between two compounds in which parts of each are interchanged to form two new compounds (ab+cd=ad+cb). | *"In academic literature, metathesis designates a linguistic process of transposition of sounds or syllables within a word or words within a sentence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotheism]] | noun | **1.** The doctrine or belief that there is but one God. | *"Israel had stood for monotheism and that not the monotheism of Greek philosophy, a dogma of the schools consistent with the cults of Egypt and Phrygia, with hierodules and a deified Antinous."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monotheist]] | noun | **1.** A believer in one god. | *"Christ, as the true spiritual idea, is the ideal of God now and forever, here and everywhere. 361:6 The Jew who believes in the First Commandment is a monotheist; he has one omnipresent God."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monotheistic]] | adjective | **1.** Believing that there is only one god. | *"Its business now was to reconcile its own monotheistic dogma with popular polytheistic practice."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[monothematic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, monothematic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomothetic]] | noun | **1.** Relating to, involving, or dealing with abstract, general, or universal statements or laws. | *"In academic literature, nomothetic designates relating to, involving, or dealing with abstract, general, or universal statements or laws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oligosynthetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, oligosynthetic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenthesis]] | noun | **1.** An amplifying or explanatory word, phrase, or sentence inserted in a passage from which it is usually set off by punctuation.<br>**2.** A remark or passage that departs from the theme of a discourse : digression. | *"Aye, aye!” and opened and read it with evident pleasure, announcing to us in a parenthesis when he was about half-way through, that Boythorn was “coming down” on a visit."* — Charles Dickens, *Bleak House* |
| [[parenthetic]] | noun | **1.** Of, relating to, or expressed in a parenthesis.<br>**2.** Enclosed in parentheses. | *"Mother, why did our grand relation keep on putting his hand up to his mistarshers?” “Hark at that child!” cried Mrs Durbeyfield, with parenthetic admiration."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parenthetical]] | noun | **1.** An expression in parentheses.<br>**2.** Qualifying or explaining; placed or as if placed in parentheses. | *"What could the wretched Joe do now, after his disregarded parenthetical interruptions, but stand up to his journeyman, and ask him what he meant by interfering betwixt himself and Mrs."* — Charles Dickens, *Great Expectations* |
| [[parenthetically]] | adverb | **1.** In a parenthetical manner. | *"Vholes parenthetically, “I believe I have already mentioned."* — Charles Dickens, *Bleak House* |
| [[perithecium]] | noun | **1.** Flask-shaped ascocarp. | *"Very common. (Plate XI. figs. 240-242.) CHÆTOMIUM, _Kze._ Perithecium thin, brittle, mouthless; sporangia linear, containing dark lemon-shaped spores. _Berk."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[polysynthetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, polysynthetic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytheism]] | noun | **1.** Belief in or worship of more than one god. | *"As a French scholar has said, where there is polytheism there are no false gods."* — T. R. Glover, *The Jesus of History* |
| [[polytheistic]] | noun | **1.** Of, relating to, or characterized by polytheism : believing in or worshiping multiple gods. | *"No polytheistic religion can exclude gods from its pantheon; all divinities that man can devise have a right there."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[prosthesis]] | noun | **1.** An artificial device to replace or augment a missing or impaired part of the body. | *"In academic literature, prosthesis designates an artificial device to replace or augment a missing or impaired part of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetic]] | noun | **1.** Of, relating to, or being a prosthesis; also : of or relating to prosthetics.<br>**2.** Of, relating to, or constituting a nonprotein group of a conjugated protein. | *"In academic literature, prosthetic designates of, relating to, or being a prosthesis; also : of or relating to prosthetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetics]] | noun | **1.** The branch of medicine dealing with the production and use of artificial body parts. | *"In academic literature, prosthetics designates the branch of medicine dealing with the production and use of artificial body parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetist]] | noun | **1.** An expert in prosthetics. | *"In academic literature, prosthetist designates an expert in prosthetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prothesis]] | noun | **1.** The addition of a sound to the beginning of a word (as in Old French estat—whence English estate—from Latin status). | *"In academic literature, prothesis designates the addition of a sound to the beginning of a word (as in old french estat—whence english estate—from latin status)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prothetic]] | noun | **1.** The addition of a sound to the beginning of a word (as in Old French estat—whence English estate—from Latin status). | *"In academic literature, prothetic designates the addition of a sound to the beginning of a word (as in old french estat—whence english estate—from latin status)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudothecium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, pseudothecium designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redeem]] | verb | **1.** Save from sins.<br>**2.** Restore the honor or worth of. | *"Return forgetful Muse, and straight redeem, In gentle numbers time so idly spent, Sing to the ear that doth thy lays esteem, And gives thy pen both skill and argument."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[synthesis]] | noun | **1.** The composition or combination of parts or elements so as to form a whole.<br>**2.** The production of a substance by the union of chemical elements, groups, or simpler compounds or by the degradation of a complex compound. | *"There is no higher synthesis that can make them one and the same thing."* — T. R. Glover, *The Jesus of History* |
| [[synthesise]] | verb | **1.** Combine so as to form a more complex, product. | *"In academic literature, synthesise designates combine so as to form a more complex, product."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synthesiser]] | noun | **1.** An intellectual who synthesizes or uses synthetic methods.<br>**2.** (music) an electronic instrument (usually played with a keyboard) that generates and modifies sounds electronically and can imitate a variety of other musical instruments. | *"In academic literature, synthesiser designates an intellectual who synthesizes or uses synthetic methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synthesist]] | noun | **1.** An intellectual who synthesizes or uses synthetic methods. | *"In academic literature, synthesist designates an intellectual who synthesizes or uses synthetic methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synthesize]] | verb | **1.** Combine so as to form a more complex, product.<br>**2.** Combine and form a synthesis. | *"His voice was on our tapes, and easy to synthesize."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synthetic]] | noun | **1.** Relating to or involving synthesis : not analytic.<br>**2.** Attributing to a subject something determined by observation rather than analysis of the nature of the subject and not resulting in self-contradiction if negated. | *"Mill's credit, the great critical power that could gather valuable truths from so many discordant sources, and the wonderful synthetic ability required to weld these and his own contributions into one organic whole."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[synthetical]] | adjective | **1.** Involving or of the nature of synthesis (combining separate elements to form a coherent whole) as opposed to analysis; - p.s.welch.<br>**2.** Of a proposition whose truth value is determined by observation or facts. | *"In academic literature, synthetical designates involving or of the nature of synthesis (combining separate elements to form a coherent whole) as opposed to analysis; - p.s.welch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synthetically]] | adverb | **1.** By synthesis; in a synthetic manner. | *"In academic literature, synthetically designates by synthesis; in a synthetic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synthetism]] | noun | **1.** A genre of french painting characterized by bright flat shapes and symbolic treatments of abstract ideas. | *"In academic literature, synthetism designates a genre of french painting characterized by bright flat shapes and symbolic treatments of abstract ideas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Thea]] | noun | **1.** As soon as the slightest provocation is given : immediately.<br>**2.** —used in phrases such as march to the beat of a different drummer to describe a person who thinks, lives, or behaves in an unusual way. | *"In academic literature, Thea designates as soon as the slightest provocation is given : immediately."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theca]] | noun | **1.** An enveloping sheath or case of an animal or animal part. | *"In academic literature, theca designates an enveloping sheath or case of an animal or animal part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thecium]] | noun | **1.** Small containing structure. | *"In academic literature, thecium designates small containing structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thematic]] | noun | **1.** Of, relating to, or constituting a theme.<br>**2.** Of or relating to the stem of a word. | *"In academic literature, thematic designates of, relating to, or constituting a theme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theme]] | noun | **1.** A subject or topic of discourse or of artistic representation.<br>**2.** A specific and distinctive quality, characteristic, or concern. | *"Your wife and brother Made wars upon me, and their contestation Was theme for you; you were the word of war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[Themis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, Themis designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theobromine]] | noun | **1.** A bitter alkaloid C7H8N4O2 closely related to caffeine that occurs especially in cacao beans and has stimulant and diuretic properties. | *"In academic literature, theobromine designates a bitter alkaloid c7h8n4o2 closely related to caffeine that occurs especially in cacao beans and has stimulant and diuretic properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theocracy]] | noun | **1.** Government of a state by immediate divine guidance or by officials who are regarded as divinely guided.<br>**2.** A state governed by a theocracy. | *"In the latter case they are kings as well as gods, and the government is a theocracy."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[theocratic]] | adjective | **1.** Of or relating to or being a theocracy. | *"In academic literature, theocratic designates of or relating to or being a theocracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theodicy]] | noun | **1.** Defense of God's goodness and omnipotence in view of the existence of evil. | *"In academic literature, theodicy designates defense of god's goodness and omnipotence in view of the existence of evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Theodore]] | noun | **1.** Badlands in three areas along the Little Missouri River in western North Dakota.<br>**2.** Frederick 1862—1934 English composer. | *"Brocklehurst; remember me to Mrs. and Miss Brocklehurst, and to Augusta and Theodore, and Master Broughton Brocklehurst.” “I will, madam."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[theogony]] | noun | **1.** An account of the origin and descent of the gods. | *"Truth is not the basis of 170:3 theogony."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[theological]] | adjective | **1.** Of or relating to or concerning theology. | *"I used to be quite up in that scene of Milton’s when I was theological."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[theologically]] | adverb | **1.** As regards theology.<br>**2.** In a theological manner. | *"In academic literature, theologically designates as regards theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theologist]] | noun | **1.** Someone who is learned in theology or who speculates about theology. | *"In academic literature, theologist designates someone who is learned in theology or who speculates about theology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theology]] | noun | **1.** The study of religious faith, practice, and experience; especially : the study of God and of God's relation to the world.<br>**2.** A theological theory or system. | *"Some people might have cried “Alas, poor Theology!” at the hideous defacement—the last grotesque phase of a creed which had served mankind well in its time."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[theophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek the.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, theophobia designates a term designating an entity, condition, or phenomenon derived from greek the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thes]] | noun | **1.** tea dance. | *"O Let Me In Thes Ae Night O Lassie, are ye sleepin yet, Or are ye waukin, I wad wit?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[thesaurus]] | noun | **1.** A book of words or of information about a particular field or set of concepts; especially : a book of words and their synonyms.<br>**2.** A list of subject headings or descriptors usually with a cross-reference system for use in the organization of a collection of documents for reference and retrieval. | *"In academic literature, thesaurus designates a book of words or of information about a particular field or set of concepts; especially : a book of words and their synonyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thesis]] | noun | **1.** A dissertation (as by a candidate for an academic degree) presenting results of original research and usually providing evidence to support a specific view.<br>**2.** An idea put forth for discussion or proof : hypothesis. | *"Titan’s: Prometheus’. -- “I answer, Have ye not to argue out {540} The very primal thesis, plainest law, --Man is not God but hath God’s end to serve, A master to obey, a course to take, Somewhat to cast off, somewhat to become?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[Timothy]] | noun | **1.** A European perennial grass (Phleum pratense) that has long cylindrical spikes and is widely grown for hay in the U.S.<br>**2.** A disciple of the apostle Paul. | *"He loved Paul of Tarsus, liked St John, hated St James as much as he dared, and regarded with mixed feelings Timothy, Titus, and Philemon."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[treasure]] | noun | **1.** Wealth (such as money, jewels, or precious metals) stored up or hoarded.<br>**2.** Wealth of any kind or in any form : riches. | *"Yet fear her O thou minion of her pleasure, She may detain, but not still keep her treasure!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[treasured]] | verb | **1.** Hold dear.<br>**2.** Be fond of; be attached to. | *"The recollection of them, he said, would go with him wherever he went and would be always treasured."* — Charles Dickens, *Bleak House* |
| [[treasurer]] | noun | **1.** An officer charged with receiving and disbursing funds. | *"I had a treasury and a treasurer, to say nothing of a regiment of scribes."* — Jack London, *The Jacket (The Star-Rover)* |
| [[tritheism]] | noun | **1.** The doctrine that the Father, Son, and Holy Spirit are three distinct Gods. | *"In academic literature, tritheism designates the doctrine that the father, son, and holy spirit are three distinct gods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tritheist]] | noun | **1.** Someone (not an orthodox christian) who believes that the father and son and holy ghost are three separate gods. | *"In academic literature, tritheist designates someone (not an orthodox christian) who believes that the father and son and holy ghost are three separate gods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unenthusiastic]] | adjective | **1.** Not enthusiastic; lacking excitement or ardor. | *"There was a strong assumption of superiority in this Puritanic toleration, hardly less trying to the blond flesh of an unenthusiastic sister than a Puritanic persecution."* — George Eliot, *Middlemarch* |
| [[unthematic]] | adjective | **1.** Not relating to a melodic subject. | *"In academic literature, unthematic designates not relating to a melodic subject."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · THE
  </div>
</div>
