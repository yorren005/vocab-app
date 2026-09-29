---
status: unread
type: root_dashboard
---
# Dashboard — phon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">phon</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sound”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'sound'.</span>
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

The Greek root **phon** (*phon*) signifies sound. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acrophonic*, *acrophony*, *allophone*, *antiphon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sound
> The Greek root **phon** fundamentally denotes **sound**. The physical sensory observation and cognitive anchor underlying 'sound'. In classical Greek antiquity, the root denoted 'sound', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">sound</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'sound'.</mark>
> - **Everyday Connection**: Think of familiar words like *acrophonic*, *acrophony*, *allophone*, *antiphon*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phon** derives from Ancient Greek **phon**, meaning "sound".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with phon**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'sound'.
  - Whenever you see **phon** in an English word, think immediately of **sound**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phon</mark>, think of <mark class="hl-def">sound</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `phon-` (from **phon**).
> - **Combining Stem with -o- Connective:** `phono-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Phon
> - **1. Direct & Concrete Anchor:** Literal instantiation of sound in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on phon

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `phon-` | [[acrophonic]] | Primary root semantic foundation denoting sound. |
| **Connecting -o-** | `phono-` | [[acrophony]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `phon` | [[allophone]] | Relational or directional modification of the core root sense. |

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
| [[acrophonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of sound. | *"In academic literature, acrophonic designates adjective*) pertaining to, derived from, or characteristic of sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrophony]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, acrophony designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allophone]] | noun | **1.** One of two or more variants of the same phoneme. | *"In academic literature, allophone designates one of two or more variants of the same phoneme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allophonic]] | adjective | **1.** Pertaining to allophones. | *"In academic literature, allophonic designates pertaining to allophones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiphon]] | noun | **1.** A psalm, anthem, or verse sung responsively.<br>**2.** A verse usually from Scripture said or sung before and after a canticle, psalm, or psalm verse as part of the liturgy. | *"In academic literature, antiphon designates a psalm, anthem, or verse sung responsively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiphonal]] | noun | **1.** Bound collection of antiphons.<br>**2.** Containing or using responses; alternating. | *"After dinner the chair-bearers gathered round and with the aid of the interpreter I took down as best I could some of their calls and responses, a sort of antiphonal chorus handed down from generation to generation of coolies."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[antiphonary]] | noun | **1.** Bound collection of antiphons.<br>**2.** Relating to or resembling an antiphon or antiphony. | *"In academic literature, antiphonary designates bound collection of antiphons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiphony]] | noun | **1.** Responsive alternation between two groups especially of singers. | *"In academic literature, antiphony designates responsive alternation between two groups especially of singers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aphonia]] | noun | **1.** Loss of voice and of all but whispered speech. | *"In academic literature, aphonia designates loss of voice and of all but whispered speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aphonic]] | noun | **1.** Loss of voice and of all but whispered speech. | *"In academic literature, aphonic designates loss of voice and of all but whispered speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apophony]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, apophony designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archiphoneme]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, archiphoneme designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophonic]] | adjective | **1.** Having an unpleasant sound; - john mccarten. | *"In academic literature, cacophonic designates having an unpleasant sound; - john mccarten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophonous]] | noun | **1.** Marked by cacophony : harsh-sounding. | *"In academic literature, cacophonous designates marked by cacophony : harsh-sounding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cacophony]] | noun | **1.** Harsh or jarring sound : dissonance; specifically : harshness in the sound of words or phrases.<br>**2.** An incongruous or chaotic mixture : a striking combination. | *"In academic literature, cacophony designates harsh or jarring sound : dissonance; specifically : harshness in the sound of words or phrases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diaphone]] | noun | **1.** A foghorn that makes a signal consisting of two tones. | *"In academic literature, diaphone designates a foghorn that makes a signal consisting of two tones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diaphony]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, diaphony designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diplophonia]] | noun | **1.** The production, by the voice, of sounds of two different pitches simultaneously. | *"In academic literature, diplophonia designates the production, by the voice, of sounds of two different pitches simultaneously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysphonia]] | noun | **1.** Defective use of the voice. | *"In academic literature, dysphonia designates defective use of the voice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecphonesis]] | noun | **1.** An exclamatory rhetorical device. | *"In academic literature, ecphonesis designates an exclamatory rhetorical device."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonic]] | noun | **1.** Pleasing or sweet sound; especially : the acoustic effect produced by words so formed or combined as to please the ear.<br>**2.** A harmonious succession of words having a pleasing sound. | *"In academic literature, euphonic designates pleasing or sweet sound; especially : the acoustic effect produced by words so formed or combined as to please the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonical]] | adjective | **1.** Of or relating to or characterized by euphony. | *"In academic literature, euphonical designates of or relating to or characterized by euphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonious]] | noun | **1.** Pleasing to the ear. | *"So Goslina Shaw was the euphonious sobriquet of baby No. 2, and the joyful grandame returned it to the bed beside the pale face of its mother, where 'twas quackling off to sleep, when Mr."* — Effie Afton, *Eventide* |
| [[euphonium]] | noun | **1.** A bass horn (brass wind instrument) that is the tenor of the tuba family. | *"In academic literature, euphonium designates a bass horn (brass wind instrument) that is the tenor of the tuba family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonize]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through sound. | *"In academic literature, euphonize designates verb*) to subject to, transform by, or operate upon through sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphonous]] | adjective | **1.** Having a pleasant sound. | *"In academic literature, euphonous designates having a pleasant sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphony]] | noun | **1.** Pleasing or sweet sound; especially : the acoustic effect produced by words so formed or combined as to please the ear.<br>**2.** A harmonious succession of words having a pleasing sound. | *"If a girl she may be compelled to answer to "Little Slave," and if a boy to "Baldhead." But the names usually given indicate the place or time of birth, the hope of the parent for the child, or exhibit the parent's love of beauty or euphony."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |
| [[heterophonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of sound. | *"In academic literature, heterophonic designates adjective*) pertaining to, derived from, or characteristic of sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterophony]] | noun | **1.** Independent variation on a single melody by two or more voices. | *"In academic literature, heterophony designates independent variation on a single melody by two or more voices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophone]] | noun | **1.** One of two or more words pronounced alike but different in meaning or derivation or spelling (such as the words to, too, and two).<br>**2.** A character or group of characters pronounced the same as another character or group. | *"In academic literature, homophone designates one of two or more words pronounced alike but different in meaning or derivation or spelling (such as the words to, too, and two)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophonic]] | adjective | **1.** Having the same sound.<br>**2.** Having a single melodic line with accompaniment. | *"In academic literature, homophonic designates having the same sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophonous]] | noun | **1.** One of two or more words pronounced alike but different in meaning or derivation or spelling (such as the words to, too, and two).<br>**2.** A character or group of characters pronounced the same as another character or group. | *"In academic literature, homophonous designates one of two or more words pronounced alike but different in meaning or derivation or spelling (such as the words to, too, and two)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homophony]] | adjective | **1.** chordal.<br>**2.** of or relating to homophones. | *"Classical and authoritative lexicons catalog homophony as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypophonesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, hypophonesis designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideophone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, ideophone designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[idiophone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, idiophone designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isophone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, isophone designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logophonetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of sound. | *"In academic literature, logophonetic designates adjective*) pertaining to, derived from, or characteristic of sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megaphone]] | noun | **1.** A cone-shaped device used to intensify or direct the voice —sometimes used figuratively.<br>**2.** To transmit or address through or as if through a megaphone. | *"JOHN O’CONNELL: _(Foghorns stormily through his megaphone.)_ Dignam, Patrick T, deceased."* — James Joyce, *Ulysses* |
| [[microphone]] | noun | **1.** An instrument whereby sound waves are caused to generate or modulate an electric current usually for the purpose of transmitting, recording, or amplifying sound (such as speech or music).<br>**2.** A small microphone that is hung around the neck or clipped to the clothing of the user. | *"Drummer picked up a microphone, Brad beside him."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[microphoning]] | noun | **1.** The transduction of sound waves into electrical waves (by a microphone). | *"In academic literature, microphoning designates the transduction of sound waves into electrical waves (by a microphone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misophonia]] | noun | **1.** A condition in which one or more common sounds (such as the ticking of a clock, the hum of a fluorescent light, or the chewing or breathing of another person) cause an atypical emotional response (such as disgust, distress, panic, or anger) in the affected person hearing the sound. | *"In academic literature, misophonia designates a condition in which one or more common sounds (such as the ticking of a clock, the hum of a fluorescent light, or the chewing or breathing of another person) cause an atypical emotional response (such as disgust, distress, panic, or anger) in the affected person hearing the sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophonic]] | noun | **1.** Having a single unaccompanied melodic line.<br>**2.** Of or relating to sound transmission, recording, or reproduction involving a single transmission path. | *"In academic literature, monophonic designates having a single unaccompanied melodic line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monophony]] | noun | **1.** Monophonic music. | *"In academic literature, monophony designates monophonic music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphophonology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, morphophonology designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"I'm sure proud Hawk phoned." I had a hard time trying to catch up with Grandpa."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[phonaesthesia]] | noun | **1.** Any correspondence between the sound of a word and its meaning; examples include onomatopoeia and the use of phonesthemes. | *"In academic literature, phonaesthesia designates any correspondence between the sound of a word and its meaning; examples include onomatopoeia and the use of phonesthemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonaesthetics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, phonaesthetics designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonate]] | verb | **1.** Utter speech sounds. | *"In academic literature, phonate designates utter speech sounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonation]] | noun | **1.** The sound made by the vibration of vocal folds modified by the resonance of the vocal tract. | *"In academic literature, phonation designates the sound made by the vibration of vocal folds modified by the resonance of the vocal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phone]] | noun | **1.** A device by which sound (such as speech) is converted into electrical impulses and transmitted (as by wire or radio waves) to one or more specific receivers : telephone : such as.<br>**2.** A telephone that operates by means of a landline. | *"You can 'phone from the post office." Lawrence had secured a box ten days ago, but he strolled out, thinking that the husband and wife might understand each other better when alone."* — Anthony Pryde, *Nightfall* |
| [[phone-in]] | noun | **1.** A program in which the audience participates by telephone. | *"In academic literature, phone-in designates a program in which the audience participates by telephone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonebook]] | noun | **1.** A directory containing an alphabetical list of telephone subscribers and their telephone numbers. | *"In academic literature, phonebook designates a directory containing an alphabetical list of telephone subscribers and their telephone numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoneme]] | noun | **1.** Any of the abstract units of the phonetic system of a language that correspond to a set of similar speech sounds (such as the velar \k\ of cool and the palatal \k\ of keel) which are perceived to be a single distinctive sound in the language. | *"In academic literature, phoneme designates **1.** any of the abstract units of the phonetic system of a language that correspond to a set of similar speech sounds (such as the velar \k\ of cool and the palatal \k\ of keel) which are perceived to be a single distinctive sound in the language."* — Academic Lexicon |
| [[phonemic]] | noun | **1.** Of, relating to, or having the characteristics of a phoneme.<br>**2.** Constituting members of different phonemes (such as \n\ and \m\ in English). | *"In academic literature, phonemic designates of, relating to, or having the characteristics of a phoneme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonemics]] | noun | **1.** The study of the sound system of a given language and the analysis and classification of its phonemes. | *"In academic literature, phonemics designates the study of the sound system of a given language and the analysis and classification of its phonemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoner]] | noun | **1.** The person initiating a telephone call. | *"In academic literature, phoner designates the person initiating a telephone call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonesthemic]] | noun | **1.** The common feature of sound occurring in a group of symbolic words. | *"In academic literature, phonesthemic designates the common feature of sound occurring in a group of symbolic words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonetic]] | noun | **1.** Representing the sounds and other phenomena of speech: such as.<br>**2.** Constituting an alteration of ordinary spelling that better represents the spoken language, that employs only characters of the regular alphabet, and that is used in a context of conventional spelling. | *"Titus Munson Coan, whose familiarity with the languages of the Pacific has enabled me to harmonise the spelling of foreign words in ‘Typee’ and ‘Omoo,’ though without changing the phonetic method of printing adopted by Mr."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[phonetically]] | adverb | **1.** By phonetics. | *"Unusual polysyllables of foreign origin she interpreted phonetically or by false analogy or by both: metempsychosis (met him pike hoses), _alias_ (a mendacious person mentioned in sacred scripture)."* — James Joyce, *Ulysses* |
| [[phonetician]] | noun | **1.** A specialist in phonetics. | *"In academic literature, phonetician designates a specialist in phonetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonetics]] | noun | **1.** The system of speech sounds of a language or group of languages.<br>**2.** The study and systematic classification of the sounds made in spoken utterance. | *"In academic literature, phonetics designates the system of speech sounds of a language or group of languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoney]] | noun | **1.** A person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives.<br>**2.** Fraudulent; having a misleading appearance. | *"In academic literature, phoney designates a person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonic]] | noun | **1.** Of, relating to, or producing sound : acoustic.<br>**2.** Of or relating to the sounds of speech. | *"How was a glyphic comparison of the phonic symbols of both languages made in substantiation of the oral comparison?"* — James Joyce, *Ulysses* |
| [[phonics]] | noun | **1.** The science of sound : acoustics.<br>**2.** A method of teaching beginners to read and pronounce words by learning the phonetic value of letters, letter groups, and especially syllables. | *"In academic literature, phonics designates the science of sound : acoustics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonogram]] | noun | **1.** A character or symbol used to represent a word, syllable, or phoneme.<br>**2.** A succession of orthographic letters that occurs with the same phonetic value in several words (such as the ight of bright, fight, and flight). | *"In academic literature, phonogram designates a character or symbol used to represent a word, syllable, or phoneme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonogramic]] | adjective | **1.** Of or relating to a phonogram. | *"In academic literature, phonogramic designates of or relating to a phonogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonograph]] | noun | **1.** An instrument for reproducing sounds by means of the vibration of a stylus or needle following a spiral groove on a revolving disc or cylinder. | *"Seward’s Diary._ (Kept in phonograph) _25 May._--Ebb tide in appetite to-day."* — Bram Stoker, *Dracula* |
| [[phonologic]] | adjective | **1.** Of or relating to phonology. | *"In academic literature, phonologic designates of or relating to phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonological]] | adjective | **1.** Of or relating to phonology. | *"In academic literature, phonological designates of or relating to phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonologist]] | noun | **1.** A specialist in phonology. | *"In academic literature, phonologist designates a specialist in phonology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonology]] | noun | **1.** The science of speech sounds including especially the history and theory of sound changes in a language or in two or more related languages.<br>**2.** The phonetics and phonemics of a language at a particular time. | *"In academic literature, phonology designates the science of speech sounds including especially the history and theory of sound changes in a language or in two or more related languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonophobia]] | noun | **1.** An intolerance of or hypersensitivity to sound.<br>**2.** Fear of sounds and especially loud, sudden sounds. | *"In academic literature, phonophobia designates an intolerance of or hypersensitivity to sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phonosemantics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phon.<br>**2.** Specialized application within the domain of Sound & Auditory. | *"In academic literature, phonosemantics designates a term designating an entity, condition, or phenomenon derived from greek phon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phony]] | noun | **1.** A person who professes beliefs and opinions that he or she does not hold in order to conceal his or her real feelings or motives.<br>**2.** Fraudulent; having a misleading appearance. | *"That phony note at the Hotel Granada, for instance."* — Randall Garrett, *Deadly decoy* |
| [[polyphone]] | noun | **1.** A letter that has two or more pronunciations. | *"In academic literature, polyphone designates a letter that has two or more pronunciations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphonic]] | noun | **1.** Of, relating to, or marked by polyphony.<br>**2.** Being a polyphone. | *"In academic literature, polyphonic designates of, relating to, or marked by polyphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphonically]] | adverb | **1.** In a polyphonic manner. | *"In academic literature, polyphonically designates in a polyphonic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphonous]] | adjective | **1.** Of or relating to or characterized by polyphony. | *"In academic literature, polyphonous designates of or relating to or characterized by polyphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphony]] | noun | **1.** A style of musical composition employing two or more simultaneous but relatively independent melodic lines : counterpoint. | *"In academic literature, polyphony designates a style of musical composition employing two or more simultaneous but relatively independent melodic lines : counterpoint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxophone]] | noun | **1.** One of a group of single-reed woodwind instruments usually ranging from soprano to bass and characterized by a conical metal tube and finger keys. | *"In academic literature, saxophone designates one of a group of single-reed woodwind instruments usually ranging from soprano to bass and characterized by a conical metal tube and finger keys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saxophonist]] | noun | **1.** A musician who plays the saxophone. | *"In academic literature, saxophonist designates a musician who plays the saxophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonic]] | noun | **1.** Harmonious, symphonious.<br>**2.** Relating to or having the form or character of a symphony. | *"In academic literature, symphonic designates harmonious, symphonious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonious]] | adjective | **1.** Harmonious in sound. | *"In academic literature, symphonious designates harmonious in sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonise]] | verb | **1.** Play or sound together, in harmony. | *"In academic literature, symphonise designates play or sound together, in harmony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonist]] | noun | **1.** A composer of symphonies. | *"In academic literature, symphonist designates a composer of symphonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphonize]] | verb | **1.** Play or sound together, in harmony. | *"In academic literature, symphonize designates play or sound together, in harmony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphony]] | noun | **1.** Consonance of sounds.<br>**2.** Ritornello. | *"Casaubon, or rather from the symphony of hopeful dreams, admiring trust, and passionate self devotion which that learned gentleman had set playing in her soul."* — George Eliot, *Middlemarch* |
| [[telephone]] | noun | **1.** A device by which sound (such as speech) is converted into electrical impulses and transmitted (as by wire or radio waves) to one or more specific receivers : phone : such as.<br>**2.** A telephone that operates by means of a landline. | *"Telephone companies are similarly taxed, but sometimes on the number of transmitters, or of subscribers, or on each plant, or otherwise."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[telephoner]] | noun | **1.** The person initiating a telephone call. | *"In academic literature, telephoner designates the person initiating a telephone call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephonic]] | noun | **1.** Of, relating to, or conveyed by a telephone. | *"In academic literature, telephonic designates of, relating to, or conveyed by a telephone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephonist]] | noun | **1.** Someone who helps callers get the person they are calling. | *"In academic literature, telephonist designates someone who helps callers get the person they are calling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephony]] | noun | **1.** The use or operation of an apparatus (such as a telephone) for transmission of sounds as electrical signals between widely removed points. | *"For wireless _telephony_ what is wanted is a continuous uninterrupted train of waves, such as those from the "Poulsen arc," and a receiver of the magnetic type."* — Thomas W. Corbin, *Marvels of Scientific Invention* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sound & Auditory]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHON
  </div>
</div>
