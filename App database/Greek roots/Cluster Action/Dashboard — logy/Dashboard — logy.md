---
status: unread
type: root_dashboard
---
# Dashboard — logy
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">λογία (logía) (study of)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology'.</span>
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

The Greek root **logy** (λογία (logía) (study of)) signifies biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *biology*, *cardiology*, *dermatology*, *endocrinology*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology
> The Greek root **logy** fundamentally denotes **biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology**. The physical sensory observation and cognitive anchor underlying 'biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology'. In classical Greek antiquity, the root denoted 'biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology'.</mark>
> - **Everyday Connection**: Think of familiar words like *biology*, *cardiology*, *dermatology*, *endocrinology*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **logy** derives from Ancient Greek <mark class="hl-stem">λογία (logía) (study of)</mark>, meaning "biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with logy**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology'.
  - Whenever you see **logy** in an English word, think immediately of **biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">logy</mark>, think of <mark class="hl-def">biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `logy-` (from *λογία (logía) (study of)*).
> - **Combining Stem with -o- Connective:** `logyo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Logy
> - **1. Direct & Concrete Anchor:** Literal instantiation of biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on logy

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `logy-` | [[biology]] | Primary root semantic foundation denoting biology, cardiology, dermatology, endocrinology, gastroenterology, hematology, neurology, oncology, pathology, psychology, radiology. |
| **Connecting -o-** | `logyo-` | [[cardiology]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `logy` | [[dermatology]] | Relational or directional modification of the core root sense. |

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
| [[analogical]] | noun | **1.** Of, relating to, or based on analogy.<br>**2.** Expressing or implying analogy. | *"Though the certainty of this criterion is far from demonstrable, yet it has the savor of analogical probability."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[analogise]] | verb | **1.** Make an analogy. | *"In academic literature, analogise designates make an analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogist]] | noun | **1.** One who searches for or reasons from analogies. | *"In academic literature, analogist designates one who searches for or reasons from analogies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogize]] | noun | **1.** To use or exhibit analogy.<br>**2.** To compare by analogy. | *"In academic literature, analogize designates to use or exhibit analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogous]] | noun | **1.** Similar or comparable to something else either in general or in some specific detail : similar in a way that invites comparison : showing an analogy or a likeness that permits one to draw an analogy. | *"A process somewhat analogous to that of alleged formations of the universe, time and times ago, was observable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[analogously]] | adverb | **1.** In an analogous manner. | *"In academic literature, analogously designates in an analogous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogy]] | noun | **1.** A comparison of two otherwise unlike things based on resemblance of a particular aspect; also : one of the two things being compared.<br>**2.** Resemblance in some particulars between things otherwise unlike : similarity. | *"The sweet scenes of autumn were for a while put by, unless some tender sonnet, fraught with the apt analogy of the declining year, with declining happiness, and the images of youth and hope, and spring, all gone together, blessed her memory."* — Jane Austen, *Persuasion* |
| [[apologetic]] | noun | **1.** Feeling or showing regret : regretfully acknowledging fault or failure : expressing an apology.<br>**2.** Offered in defense or vindication. | *"The old woman was terribly apologetic about having gone into the room."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[apologise]] | verb | **1.** Defend, explain, clear away, or make excuses for by reasoning.<br>**2.** Acknowledge faults or shortcomings or failing. | *"Rochester; “and in the interim, I shall myself look out for employment and an asylum for you.” “Thank you, sir; I am sorry to give—” “Oh, no need to apologise!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[apologist]] | noun | **1.** Someone who speaks or writes in defense of someone or something that is typically controversial, unpopular, or subject to criticism. | *"He speaks of "the friendly Apollo." But the weakness of Plutarch as an apologist is his weakness as biographer--he never really gets at the bottom of anything."* — T. R. Glover, *The Jesus of History* |
| [[apologize]] | noun | **1.** To express regret for something done or said : to make an apology.<br>**2.** To offer a defense or excuse or admission of fault for (something)—used in negative statements. | *"The relations between us are of an unfortunate description, Lady Dedlock; but as they are not of my making, I will not apologize for them."* — Charles Dickens, *Bleak House* |
| [[apology]] | noun | **1.** An admission of error or discourtesy accompanied by an expression of regret.<br>**2.** An expression of regret for not being able to do something. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[biologic]] | adjective | **1.** Pertaining to biology or to life and living things. | *"This is the problem of eugenics, the choice and biologic breeding of capable men to be the citizens of the nation, and broadly understood, it includes both the negro and the immigrant problems.] [Footnote 2: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[biological]] | adjective | **1.** Pertaining to biology or to life and living things.<br>**2.** Of parents and children; related by blood. | *"We have to "think like God," he says (Mark 8:33); and perhaps God is in his thoughts neither so legal nor so biological as we are; perhaps he does not think first of edicts or of biological and psychological laws."* — T. R. Glover, *The Jesus of History* |
| [[biologically]] | adverb | **1.** With respect to biology. | *"In academic literature, biologically designates with respect to biology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologism]] | noun | **1.** The use of biological explanations in the analysis of social situations. | *"In academic literature, biologism designates the use of biological explanations in the analysis of social situations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologist]] | noun | **1.** A branch of knowledge that deals with living organisms and vital processes.<br>**2.** The plant and animal life of a region or environment. | *"If this question is open to dispute among biologists, it is only as regards a minute increment of improvement."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[biologistic]] | adjective | **1.** Of or relating to biologism. | *"In academic literature, biologistic designates of or relating to biologism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biology]] | noun | **1.** A branch of knowledge that deals with living organisms and vital processes.<br>**2.** The plant and animal life of a region or environment. | *"Every day he seemed to become more interested in biology, and his name appeared once or twice in some of the scientific reviews in connection with certain curious experiments."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[cardiologic]] | adjective | **1.** Of or relating to or used in or practicing cardiology. | *"In academic literature, cardiologic designates of or relating to or used in or practicing cardiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiologist]] | noun | **1.** The study of the heart and its action and diseases. | *"In academic literature, cardiologist designates the study of the heart and its action and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiology]] | noun | **1.** The study of the heart and its action and diseases. | *"In academic literature, cardiology designates the study of the heart and its action and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dermatologic]] | adjective | **1.** Of or relating to or practicing dermatology. | *"In academic literature, dermatologic designates of or relating to or practicing dermatology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dermatological]] | adjective | **1.** Of or relating to or practicing dermatology. | *"In academic literature, dermatological designates of or relating to or practicing dermatology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dermatologist]] | noun | **1.** A branch of medicine dealing with the skin, its structure, functions, and diseases. | *"In academic literature, dermatologist designates a branch of medicine dealing with the skin, its structure, functions, and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dermatology]] | noun | **1.** A branch of medicine dealing with the skin, its structure, functions, and diseases. | *"In academic literature, dermatology designates a branch of medicine dealing with the skin, its structure, functions, and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrinologist]] | noun | **1.** Physician who specializes in the diagnosis and treatment of conditions affecting the endocrine system. | *"In academic literature, endocrinologist designates physician who specializes in the diagnosis and treatment of conditions affecting the endocrine system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrinology]] | noun | **1.** A branch of medicine concerned with the structure, function, and disorders of the endocrine glands. | *"In academic literature, endocrinology designates a branch of medicine concerned with the structure, function, and disorders of the endocrine glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eulogise]] | verb | **1.** Praise formally and eloquently. | *"On a fine still autumn evening the 'crying of the neck' has a wonderful effect at a distance, far finer than that of the Turkish muezzin, which Lord Byron eulogises so much, and which he says is preferable to all the bells of Christendom."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[eulogist]] | noun | **1.** An orator who delivers eulogies or panegyrics. | *"When the time does come, it will suffice if a kind eulogist will say for me, as one said for Grant, "Let his faults … be writ in water." Lige, my condition came about slowly."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[eulogistic]] | adjective | **1.** Formally expressing praise. | *"Though I never knew what they were (being in Welsh), further than that they were highly eulogistic of the lineage of Morgan ap-Kerrig."* — Charles Dickens, *Bleak House* |
| [[eulogize]] | verb | **1.** Praise formally and eloquently. | *"You will live, but perhaps I shall die, since he is weary of carrying me." The lame marshal went on praising and eulogizing Kalelealuaka as he drew near."* — Classic Author, *Hawaiian folk tales* |
| [[eulogy]] | noun | **1.** A commendatory oration or writing especially in honor of one deceased.<br>**2.** High praise. | *"It is remarkable how little of the adjective there is--no compliment, no eulogy, no heroic touches, no sympathetic turn of phrase, no great passages of encomium or commendation."* — T. R. Glover, *The Jesus of History* |
| [[exobiology]] | noun | **1.** A branch of biology concerned with the search for life outside the earth and with the effects of extraterrestrial environments on living organisms. | *"In academic literature, exobiology designates a branch of biology concerned with the search for life outside the earth and with the effects of extraterrestrial environments on living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenterologist]] | noun | **1.** A branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines. | *"In academic literature, gastroenterologist designates a branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenterology]] | noun | **1.** A branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines. | *"In academic literature, gastroenterology designates a branch of medicine concerned with the structure, functions, diseases, and pathology of the stomach and intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematologic]] | adjective | **1.** Of or relating to or involved in hematology. | *"In academic literature, hematologic designates of or relating to or involved in hematology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematological]] | adjective | **1.** Of or relating to or involved in hematology. | *"In academic literature, hematological designates of or relating to or involved in hematology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematologist]] | noun | **1.** A doctor who specializes in diseases of the blood and blood-forming organs. | *"In academic literature, hematologist designates a doctor who specializes in diseases of the blood and blood-forming organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hematology]] | noun | **1.** A medical science that deals with the blood and blood-forming organs. | *"In academic literature, hematology designates a medical science that deals with the blood and blood-forming organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterologic]] | adjective | **1.** Not corresponding in structure or evolutionary origin. | *"In academic literature, heterologic designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterological]] | adjective | **1.** Not corresponding in structure or evolutionary origin. | *"In academic literature, heterological designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterologous]] | adjective | **1.** Not corresponding in structure or evolutionary origin.<br>**2.** Derived from organisms of a different but related species. | *"In academic literature, heterologous designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterology]] | noun | **1.** (biology) the lack of correspondence of apparently similar body parts. | *"In academic literature, heterology designates (biology) the lack of correspondence of apparently similar body parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologic]] | adjective | **1.** Similar in evolutionary origin but not in function. | *"In academic literature, homologic designates similar in evolutionary origin but not in function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homological]] | adjective | **1.** Similar in evolutionary origin but not in function. | *"In academic literature, homological designates similar in evolutionary origin but not in function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologise]] | verb | **1.** Make homologous. | *"In academic literature, homologise designates make homologous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologize]] | verb | **1.** Be homologous.<br>**2.** Make homologous. | *"In academic literature, homologize designates be homologous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologous]] | noun | **1.** Having the same relative position, value, or structure: such as.<br>**2.** Exhibiting biological homology. | *"The spheres are to each other as the squares of their homologous sides."* — Mark Twain, *What Is Man? and Other Essays* |
| [[homology]] | noun | **1.** A similarity often attributable to common origin.<br>**2.** Correspondence or similarity in form or function between parts (such as the wing of a bat and the human arm) of different species resulting from modification of a trait possessed by a common ancestor : similarity of traits reflecting common descent and ancestry. | *"In academic literature, homology designates a similarity often attributable to common origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[loginess]] | noun | **1.** A dull and listless state resulting from weariness. | *"In academic literature, loginess designates a dull and listless state resulting from weariness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logy]] | adjective | **1.** Stunned or confused and slow to react (as from blows or drunkenness or exhaustion). | *"Ann usually set in to give me the family particulars when I was logy with sleep a Sunday night."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[microbiologist]] | noun | **1.** A specialist in microbiology. | *"In academic literature, microbiologist designates a specialist in microbiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microbiology]] | noun | **1.** A branch of biology dealing with microscopic forms of life. | *"In academic literature, microbiology designates a branch of biology dealing with microscopic forms of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neology]] | noun | **1.** A newly invented word or phrase.<br>**2.** The act of inventing a word or phrase. | *"In academic literature, neology designates a newly invented word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleobiology]] | noun | **1.** A branch of paleontology concerned with the biology of fossil organisms. | *"In academic literature, paleobiology designates a branch of paleontology concerned with the biology of fossil organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek palae.<br>**2.** Specialized application within the domain of Beginning & Primacy. | *"In academic literature, paleology designates a term designating an entity, condition, or phenomenon derived from greek palae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protology]] | noun | **1.** The study of origins and first things. | *"In academic literature, protology designates the study of origins and first things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiological]] | adjective | **1.** Of or relating to radiology. | *"In academic literature, radiological designates of or relating to radiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiologist]] | noun | **1.** A medical specialist who uses radioactive substances and x-rays in the treatment of disease. | *"In academic literature, radiologist designates a medical specialist who uses radioactive substances and x-rays in the treatment of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiology]] | noun | **1.** A branch of medicine concerned with the use of radiant energy (such as X-rays) or radioactive material in the diagnosis and treatment of disease.<br>**2.** The science of radioactive substances and high-energy radiations. | *"In academic literature, radiology designates a branch of medicine concerned with the use of radiant energy (such as x-rays) or radioactive material in the diagnosis and treatment of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trilogy]] | noun | **1.** A series of three dramas or literary works or sometimes three musical compositions that are closely related and develop a single theme. | *"In academic literature, trilogy designates a series of three dramas or literary works or sometimes three musical compositions that are closely related and develop a single theme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unapologetic]] | adjective | **1.** Unwilling to make or express an apology. | *"In academic literature, unapologetic designates unwilling to make or express an apology."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LOGY
  </div>
</div>
