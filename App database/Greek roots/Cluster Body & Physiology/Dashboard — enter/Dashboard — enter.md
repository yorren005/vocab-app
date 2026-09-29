---
status: unread
type: root_dashboard
---
# Dashboard — enter
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἔντερον (énteron) (intestine)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis'.</span>
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

The Greek root **enter** (ἔντερον (énteron) (intestine)) signifies enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *dysentery*, *enteral*, *enteritis*, *enterococcus*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis
> The Greek root **enter** fundamentally denotes **enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis**. The physical sensory observation and cognitive anchor underlying 'enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis'. In classical Greek antiquity, the root denoted 'enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis'.</mark>
> - **Everyday Connection**: Think of familiar words like *dysentery*, *enteral*, *enteritis*, *enterococcus*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **enter** derives from Ancient Greek <mark class="hl-stem">ἔντερον (énteron) (intestine)</mark>, meaning "enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with enter**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis'.
  - Whenever you see **enter** in an English word, think immediately of **enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">enter</mark>, think of <mark class="hl-def">enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `enter-` (from *ἔντερον (énteron) (intestine)*).
> - **Combining Stem with -o- Connective:** `entero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Enter
> - **1. Direct & Concrete Anchor:** Literal instantiation of enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on enter

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `enter-` | [[dysentery]] | Primary root semantic foundation denoting enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis. |
| **Connecting -o-** | `entero-` | [[enteral]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `enter` | [[enteritis]] | Relational or directional modification of the core root sense. |

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
| [[dysentery]] | noun | **1.** A disease characterized by severe diarrhea with passage of mucus and blood and usually caused by infection. | *"They were willing to be wounded, shot, to die, if need be, but after months of inaction they find themselves conquered by dysentery or fever."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[enter]] | verb | **1.** To come or go into.<br>**2.** Become a participant; be involved in. | *"Enter Bertram, the Countess of Rossillon, Helena, and Lafew, all in black."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enteral]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis. | *"In academic literature, enteral designates adjective*) pertaining to, derived from, or characteristic of enteritis, gastroenterology, enterococcus, dysentery, enteropathy, parenteral, enteral, enterocolitis, gastroenteritis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enteric]] | adjective | **1.** Of or relating to the enteron.<br>**2.** Of or relating to or inside the intestines. | *"In academic literature, enteric designates of or relating to the enteron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterics]] | noun | **1.** Rod-shaped gram-negative bacteria; most occur normally or pathogenically in intestines of humans and other animals. | *"In academic literature, enterics designates rod-shaped gram-negative bacteria; most occur normally or pathogenically in intestines of humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entering]] | noun | **1.** A movement into or inward.<br>**2.** The act of entering. | *"Enter Third Servingman; the First, entering, meets him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[enteritis]] | noun | **1.** Inflammation of the intestines and especially of the human ileum.<br>**2.** A disease of domestic animals (such as panleukopenia of cats) marked by enteritis and diarrhea. | *"In academic literature, enteritis designates inflammation of the intestines and especially of the human ileum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterobacteria]] | noun | **1.** Rod-shaped gram-negative bacteria; most occur normally or pathogenically in intestines of humans and other animals. | *"In academic literature, enterobacteria designates rod-shaped gram-negative bacteria; most occur normally or pathogenically in intestines of humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterobacteriaceae]] | noun | **1.** A large family of gram-negative rod-shaped bacteria of the order eubacteriales. | *"In academic literature, enterobacteriaceae designates a large family of gram-negative rod-shaped bacteria of the order eubacteriales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterobiasis]] | noun | **1.** Infestation with or disease caused by pinworms (genus Enterobius, especially E. vermicularis) that occurs especially in children. | *"In academic literature, enterobiasis designates infestation with or disease caused by pinworms (genus enterobius, especially e. vermicularis) that occurs especially in children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterobius]] | noun | **1.** Pinworms. | *"Classical and authoritative lexicons catalog enterobius as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enteroceptor]] | noun | **1.** Any receptor that responds to stimuli inside the body. | *"In academic literature, enteroceptor designates any receptor that responds to stimuli inside the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterococcus]] | noun | **1.** Any of a genus (Enterococcus) of gram-positive bacteria that resemble streptococci and were formerly classified with them; especially : a bacterium (E. faecalis) normally present in the intestine.<br>**2.** Any of several enterococci (such as Enterococcus faecalis and E. faecium) that are resistant to vancomycin and other commonly used antibiotics (such as cephalosporin and tetracycline) and are typically benign colonizers of the gastrointestinal tract and female genital tract but may cause severe infections (as of the urinary tract or bloodstream) especially in hospitalized patients with weakened immune systems and in individuals who are on long-term regimens of antibiotics —abbreviation VRE. | *"In academic literature, enterococcus designates any of a genus (enterococcus) of gram-positive bacteria that resemble streptococci and were formerly classified with them; especially : a bacterium (e. faecalis) normally present in the intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterocolitis]] | noun | **1.** Enteritis affecting both the large and small intestine. | *"In academic literature, enterocolitis designates enteritis affecting both the large and small intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterokinase]] | noun | **1.** Enzyme in the intestinal juice that converts inactive trypsinogen into active trypsin. | *"In academic literature, enterokinase designates enzyme in the intestinal juice that converts inactive trypsinogen into active trypsin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterolith]] | noun | **1.** A calculus occurring in the intestines. | *"In academic literature, enterolith designates a calculus occurring in the intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterolithiasis]] | noun | **1.** The presence of calculi in the intestines. | *"In academic literature, enterolithiasis designates the presence of calculi in the intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterolobium]] | noun | **1.** Small genus of tropical american timber trees closely allied to genus albizia. | *"In academic literature, enterolobium designates small genus of tropical american timber trees closely allied to genus albizia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enteron]] | noun | **1.** The alimentary canal (especially of an embryo or a coelenterate). | *"In academic literature, enteron designates the alimentary canal (especially of an embryo or a coelenterate)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enteropathy]] | noun | **1.** A disease of the intestinal tract. | *"In academic literature, enteropathy designates a disease of the intestinal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enteroptosis]] | noun | **1.** An abnormally downward position of the intestines in the abdominal cavity. | *"In academic literature, enteroptosis designates an abnormally downward position of the intestines in the abdominal cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterostenosis]] | noun | **1.** Abnormal narrowing of the intestine. | *"In academic literature, enterostenosis designates abnormal narrowing of the intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterostomy]] | noun | **1.** Surgical operation that creates a permanent opening through the abdominal wall into the intestine. | *"In academic literature, enterostomy designates surgical operation that creates a permanent opening through the abdominal wall into the intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterotomy]] | noun | **1.** Surgical operation that creates a permanent opening through the abdominal wall into the intestine. | *"In academic literature, enterotomy designates surgical operation that creates a permanent opening through the abdominal wall into the intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterotoxemia]] | noun | **1.** A disease of cattle and sheep that is attributed to toxins absorbed from the intestines. | *"In academic literature, enterotoxemia designates a disease of cattle and sheep that is attributed to toxins absorbed from the intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterotoxin]] | noun | **1.** A cytotoxin specific for the cells of the intestinal mucosa. | *"In academic literature, enterotoxin designates a cytotoxin specific for the cells of the intestinal mucosa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterovirus]] | noun | **1.** Any of a group of picornaviruses that infect the gastrointestinal tract and can spread to other areas (especially the nervous system). | *"In academic literature, enterovirus designates any of a group of picornaviruses that infect the gastrointestinal tract and can spread to other areas (especially the nervous system)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entertain]] | verb | **1.** Provide entertainment for.<br>**2.** Take into consideration, have in view. | *"I play the noble housewife with the time, to entertain it so merrily with a fool."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entertained]] | verb | **1.** Provide entertainment for.<br>**2.** Take into consideration, have in view. | *"Were’t not that we stand up against them all, ’Twere pregnant they should square between themselves, For they have entertained cause enough To draw their swords."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entertainer]] | noun | **1.** A person who tries to please or amuse. | *"When every grief is entertain’d that’s offer’d, Comes to the entertainer— SEBASTIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entertaining]] | verb | **1.** Provide entertainment for.<br>**2.** Take into consideration, have in view. | *"That were to enlard his fat-already pride, And add more coals to Cancer when he burns With entertaining great Hyperion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entertainingly]] | adverb | **1.** In an entertaining manner. | *"He was here on a visit not long ago, young Beecher was, and he talked most entertainingly about his discoveries."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[entertainment]] | noun | **1.** An activity that is diverting and that holds the attention. | *"When your lordship sees the bottom of his success in’t, and to what metal this counterfeit lump of ore will be melted, if you give him not John Drum’s entertainment, your inclining cannot be removed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entity]] | noun | **1.** That which is perceived or known or inferred to have its own distinct existence (living or nonliving). | *"The soundlessness impressed her as a positive entity rather than as the mere negation of noise."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[entrance]] | noun | **1.** Something that provides access (to get in or get out).<br>**2.** A movement into or inward. | *"The reason that I gather he is mad, Besides this present instance of his rage, Is a mad tale he told today at dinner Of his own doors being shut against his entrance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entranced]] | verb | **1.** Attract; cause to be enamored.<br>**2.** Put into a trance. | *"She hath not been entranced above five hours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[entrancement]] | noun | **1.** A feeling of delight at being filled with wonder and enchantment. | *"In academic literature, entrancement designates a feeling of delight at being filled with wonder and enchantment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entrancing]] | verb | **1.** Attract; cause to be enamored.<br>**2.** Put into a trance. | *"He was a lovely boy, clad in skeleton leaves and the juices that ooze out of trees but the most entrancing thing about him was that he had all his first teeth."* — J. M. Barrie, *Peter Pan* |
| [[entrant]] | noun | **1.** A commodity that enters competition with established merchandise.<br>**2.** Any new participant in some activity. | *"In academic literature, entrant designates a commodity that enters competition with established merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entree]] | noun | **1.** The principal dish of a meal.<br>**2.** The right to enter. | *"She had a most harmless delight in being fine; and our heroine’s entree into life could not take place till after three or four days had been spent in learning what was mostly worn, and her chaperon was provided with a dress of the newest fashion."* — Jane Austen, *Northanger Abbey* |
| [[entry]] | noun | **1.** An item inserted in a written record.<br>**2.** The act of beginning something new. | *"My hands are of your color, but I shame To wear a heart so white. [_Knocking within._] I hear knocking At the south entry:—retire we to our chamber."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exenterate]] | verb | **1.** Remove the contents of (an organ). | *"In academic literature, exenterate designates remove the contents of (an organ)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exenteration]] | noun | **1.** Surgical removal of the organs within a body cavity (as those of the pelvis). | *"In academic literature, exenteration designates surgical removal of the organs within a body cavity (as those of the pelvis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gastroenteritis]] | noun | **1.** Inflammation of the lining membrane of the stomach and the intestines characterized especially by nausea, vomiting, diarrhea, and cramps. | *"In academic literature, gastroenteritis designates inflammation of the lining membrane of the stomach and the intestines characterized especially by nausea, vomiting, diarrhea, and cramps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenteral]] | noun | **1.** Situated or occurring outside the intestine; especially : introduced otherwise than by way of the intestines. | *"In academic literature, parenteral designates situated or occurring outside the intestine; especially : introduced otherwise than by way of the intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenterally]] | adverb | **1.** By parenteral means. | *"In academic literature, parenterally designates by parenteral means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reentrant]] | adjective | **1.** (of angles) pointing inward. | *"In academic literature, reentrant designates (of angles) pointing inward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reentry]] | noun | **1.** The act of entering again. | *"In academic literature, reentry designates the act of entering again."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ENTER
  </div>
</div>
