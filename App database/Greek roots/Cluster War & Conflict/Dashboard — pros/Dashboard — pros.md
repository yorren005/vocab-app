---
status: unread
type: root_dashboard
---
# Dashboard — pros
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πρός</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“forth, forward”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'forth, forward'.</span>
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

The Greek root **pros** (πρός, πρόσθεν, πρόσθιος (prós, prósthen, prósthios)) signifies forth, forward. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *prosenchyma*, *prosophobia*, *prosthion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: forth, forward
> The Greek root **pros** fundamentally denotes **forth, forward**. The physical sensory observation and cognitive anchor underlying 'forth, forward'. In classical Greek antiquity, the root denoted 'forth, forward', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">forth, forward</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'forth, forward'.</mark>
> - **Everyday Connection**: Think of familiar words like *prosenchyma*, *prosophobia*, *prosthion*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pros** derives from Ancient Greek <mark class="hl-stem">πρός, πρόσθεν, πρόσθιος (prós, prósthen, prósthios)</mark>, meaning "forth, forward".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pros**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'forth, forward'.
  - Whenever you see **pros** in an English word, think immediately of **forth, forward**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pros</mark>, think of <mark class="hl-def">forth, forward</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pros-` (from *πρός, πρόσθεν, πρόσθιος (prós, prósthen, prósthios)*).
> - **Combining Stem with -o- Connective:** `proso-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Pros
> - **1. Direct & Concrete Anchor:** Literal instantiation of forth, forward in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pros

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pros-` | [[prosenchyma]] | Primary root semantic foundation denoting forth, forward. |
| **Connecting -o-** | `proso-` | [[prosophobia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pros` | [[prosthion]] | Relational or directional modification of the core root sense. |

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
| [[amphiprostylar]] | adjective | **1.** Marked by columniation having free columns in porticoes either at both ends or at both sides of a structure. | *"In academic literature, amphiprostylar designates marked by columniation having free columns in porticoes either at both ends or at both sides of a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiprostyle]] | noun | **1.** Having columns at each end only. | *"In academic literature, amphiprostyle designates having columns at each end only."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysprosium]] | noun | **1.** A trivalent metallic element of the rare earth group; forms compounds that are highly magnetic. | *"In academic literature, dysprosium designates a trivalent metallic element of the rare earth group; forms compounds that are highly magnetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosaic]] | adjective | **1.** Not fanciful or imaginative.<br>**2.** Lacking wit or imagination. | *"Directly the assuring and prosaic light of the world’s active hours had grown strong, she crept from under her hillock of leaves, and looked around boldly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[prosaically]] | adverb | **1.** In a matter-of-fact manner. | *"In academic literature, prosaically designates in a matter-of-fact manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosaicness]] | noun | **1.** Commonplaceness as a consequence of being humdrum and not exciting. | *"In academic literature, prosaicness designates commonplaceness as a consequence of being humdrum and not exciting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosauropoda]] | noun | **1.** The earliest known dinosaurs. | *"In academic literature, prosauropoda designates the earliest known dinosaurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proscenium]] | noun | **1.** The stage of an ancient Greek or Roman theater.<br>**2.** The part of a modern stage in front of the curtain. | *"When the lights went up after the first act Lawrence found himself looking directly across the rather small and narrow proscenium at a lady in the opposite box."* — Anthony Pryde, *Nightfall* |
| [[prosciutto]] | noun | **1.** Italian salt-cured ham usually sliced paper thin. | *"In academic literature, prosciutto designates italian salt-cured ham usually sliced paper thin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proscribe]] | verb | **1.** Command against. | *"The speaker knows that this beau monde does not proscribe love, provided it be in accordance with the proprieties which IT has determined upon and established. v. 5."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[proscribed]] | verb | **1.** Command against.<br>**2.** Excluded from use or mention. | *"But in a fatal moment, yielding to those propensities and passions, the indulgence of which had so long rendered him a scourge to society, he had quitted his haven of rest and repentance, and had come back to the country where he was proscribed."* — Charles Dickens, *Great Expectations* |
| [[proscription]] | noun | **1.** A decree that prohibits something.<br>**2.** Rejection by means of an act of banishing or proscribing someone. | *"So you thought him, And took his voice who should be prick’d to die In our black sentence and proscription."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prose]] | noun | **1.** Ordinary writing as distinguished from verse.<br>**2.** Matter of fact, commonplace, or dull expression. | *"O sweet Maria, empress of my love, These numbers will I tear, and write in prose."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prosecute]] | verb | **1.** Conduct a prosecution in a court of law.<br>**2.** Bring a criminal action against (in a trial). | *"Why should not I then prosecute my right?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prosecution]] | noun | **1.** The institution and conduct of legal proceedings against a defendant for criminal behavior.<br>**2.** The lawyers acting for the state to put the case against the defendant. | *"It opposed no positive action to the making of monopolistic contracts and to the formation of combinations, but declared them to be illegal and provided for their prosecution and punishment after the mischief had been done."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prosecutor]] | noun | **1.** A government official who conducts criminal prosecutions on behalf of the state. | *"Either this must be the case, or the local courts must be excluded from a concurrent jurisdiction in matters of national concern, else the judiciary authority of the Union may be eluded at the pleasure of every plaintiff or prosecutor."* — Alexander Hamilton, *The Federalist Papers* |
| [[proselyte]] | noun | **1.** A new convert; especially a gentile converted to judaism. | *"They deem themselves a righteous band, And for religion's sake They bravely compass sea and land One proselyte to make."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[proselytise]] | verb | **1.** Convert to another faith or religion. | *"In academic literature, proselytise designates convert to another faith or religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proselytism]] | noun | **1.** The practice of proselytizing.<br>**2.** The state of being a proselyte; spiritual rebirth resulting from the zeal of crusading advocacy of the gospel. | *"In academic literature, proselytism designates the practice of proselytizing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proselytize]] | verb | **1.** Convert to another faith or religion. | *"His loyalty had been already extensively drawn upon, and there remained now to be tried an attempt upon his proselytizing zeal."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[prosencephalon]] | noun | **1.** forebrain.<br>**2.** the anterior of the three primary divisions of the developing vertebrate brain or the corresponding part of the adult brain that includes especially the cerebral hemispheres, the thalamus, and the hypothalamus and that especially in higher vertebrates is the main control center for sensory and associative information processing, visceral functions, and voluntary motor functions —called also prosencephalon. | *"In academic literature, prosencephalon designates forebrain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosenchyma]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pros.<br>**2.** Specialized application within the domain of War & Conflict. | *"In academic literature, prosenchyma designates a term designating an entity, condition, or phenomenon derived from greek pros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proserpina]] | noun | **1.** Goddess of the underworld; counterpart of greek persephone. | *"Thou grumblest and railest every hour on Achilles; and thou art as full of envy at his greatness as Cerberus is at Proserpina’s beauty—ay, that thou bark’st at him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proserpine]] | noun | **1.** Goddess of the underworld; counterpart of greek persephone. | *"We maids that have our livers perished, cracked to pieces with love, we shall come there, and do nothing all day long but pick flowers with Proserpine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prosily]] | adverb | **1.** In a prosy manner. | *"Oak knew her instantly as the heroine of the yellow waggon, myrtles, and looking-glass: prosily, as the woman who owed him twopence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[prosimian]] | noun | **1.** Primitive primates having large ears and eyes and characterized by nocturnal habits. | *"In academic literature, prosimian designates primitive primates having large ears and eyes and characterized by nocturnal habits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosimii]] | noun | **1.** Not used in all classifications; in some classifications considered coextensive with the lemuroidea; in others includes both lemuroidea and tarsioidea. | *"In academic literature, prosimii designates not used in all classifications; in some classifications considered coextensive with the lemuroidea; in others includes both lemuroidea and tarsioidea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosiness]] | noun | **1.** Commonplaceness as a consequence of being humdrum and not exciting. | *"In academic literature, prosiness designates commonplaceness as a consequence of being humdrum and not exciting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosodic]] | adjective | **1.** Of or relating to the rhythmic aspect of language or to the suprasegmental phonemes of pitch and stress and juncture and nasalization and voicing. | *"In academic literature, prosodic designates of or relating to the rhythmic aspect of language or to the suprasegmental phonemes of pitch and stress and juncture and nasalization and voicing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosodion]] | noun | **1.** Religious music used in a procession. | *"In academic literature, prosodion designates religious music used in a procession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosody]] | noun | **1.** The patterns of stress and intonation in a language.<br>**2.** (prosody) a system of versification. | *"Nor do we find in him any of those new metrical effects, those sublime inventions in prosody, with which the great masters astonish us."* — Sydney Waterlow, *Shelley* |
| [[prosom]] | noun | **1.** A frequently prescribed sleeping pill (trade name prosom). | *"In academic literature, prosom designates a frequently prescribed sleeping pill (trade name prosom)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pros.<br>**2.** Specialized application within the domain of War & Conflict. | *"In academic literature, prosophobia designates a term designating an entity, condition, or phenomenon derived from greek pros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosopis]] | noun | **1.** Genus of tropical or subtropical branching shrubs or trees: mesquite. | *"In academic literature, prosopis designates genus of tropical or subtropical branching shrubs or trees: mesquite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosopium]] | noun | **1.** Whitefishes. | *"In academic literature, prosopium designates whitefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosopopoeia]] | noun | **1.** A figure of speech in which an imaginary or absent person is represented as speaking or acting.<br>**2.** Personification. | *"In academic literature, prosopopoeia designates a figure of speech in which an imaginary or absent person is represented as speaking or acting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostaglandin]] | noun | **1.** A potent substance that acts like a hormone and is found in many bodily tissues (and especially in semen); produced in response to trauma and may affect blood pressure and metabolism and smooth muscle activity. | *"In academic literature, prostaglandin designates a potent substance that acts like a hormone and is found in many bodily tissues (and especially in semen); produced in response to trauma and may affect blood pressure and metabolism and smooth muscle activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostate]] | noun | **1.** Prostate gland.<br>**2.** A firm partly muscular partly glandular body that is situated about the base of the mammalian male urethra and that secretes an alkaline viscid fluid which is a major constituent of the semen. | *"My trouble was pronounced by some to be Bright's disease, by others gravel on the kidneys with very acute inflammation of the bladder and prostate gland."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[prostatectomy]] | noun | **1.** Surgical removal or resection of the prostate gland. | *"In academic literature, prostatectomy designates surgical removal or resection of the prostate gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostatic]] | adjective | **1.** Relating to the prostate gland. | *"In academic literature, prostatic designates relating to the prostate gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostatitis]] | noun | **1.** Inflammation of the prostate gland characterized by perineal pain and irregular urination and (if severe) chills and fever. | *"In academic literature, prostatitis designates inflammation of the prostate gland characterized by perineal pain and irregular urination and (if severe) chills and fever."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostheon]] | noun | **1.** Craniometric point that is the most anterior point in the midline on the alveolar process of the maxilla. | *"In academic literature, prostheon designates craniometric point that is the most anterior point in the midline on the alveolar process of the maxilla."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthesis]] | noun | **1.** An artificial device to replace or augment a missing or impaired part of the body. | *"In academic literature, prosthesis designates an artificial device to replace or augment a missing or impaired part of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetic]] | noun | **1.** Of, relating to, or being a prosthesis; also : of or relating to prosthetics.<br>**2.** Of, relating to, or constituting a nonprotein group of a conjugated protein. | *"In academic literature, prosthetic designates of, relating to, or being a prosthesis; also : of or relating to prosthetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetics]] | noun | **1.** The branch of medicine dealing with the production and use of artificial body parts. | *"In academic literature, prosthetics designates the branch of medicine dealing with the production and use of artificial body parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthetist]] | noun | **1.** An expert in prosthetics. | *"In academic literature, prosthetist designates an expert in prosthetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pros.<br>**2.** Specialized application within the domain of War & Conflict. | *"In academic literature, prosthion designates a term designating an entity, condition, or phenomenon derived from greek pros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthodontia]] | noun | **1.** The branch of dentistry dealing with the replacement of teeth and related mouth or jaw structures by artificial devices. | *"In academic literature, prosthodontia designates the branch of dentistry dealing with the replacement of teeth and related mouth or jaw structures by artificial devices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthodontic]] | adjective | **1.** Of or relating to prosthodontics. | *"In academic literature, prosthodontic designates of or relating to prosthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthodontics]] | noun | **1.** The branch of dentistry dealing with the replacement of teeth and related mouth or jaw structures by artificial devices. | *"In academic literature, prosthodontics designates the branch of dentistry dealing with the replacement of teeth and related mouth or jaw structures by artificial devices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosthodontist]] | noun | **1.** A dentist who is expert in prosthodontics. | *"In academic literature, prosthodontist designates a dentist who is expert in prosthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostigmin]] | noun | **1.** A cholinergic drug (trade name prostigmin) used to treat some ophthalmic conditions and to treat myasthenia gravis. | *"In academic literature, prostigmin designates a cholinergic drug (trade name prostigmin) used to treat some ophthalmic conditions and to treat myasthenia gravis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostitute]] | noun | **1.** A woman who engages in sexual intercourse for money.<br>**2.** Sell one's body; exchange sex for money. | *"I say we must not So stain our judgment, or corrupt our hope, To prostitute our past-cure malady To empirics, or to dissever so Our great self and our credit, to esteem A senseless help, when help past sense we deem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prostitution]] | noun | **1.** Offering sexual intercourse for pay. | *"When I was a Son of the Mountain and a Son of the Bull, prostitution had no meaning."* — Jack London, *The Jacket (The Star-Rover)* |
| [[prostrate]] | verb | **1.** Get into a prostrate position, as in submission.<br>**2.** Render helpless or defenseless. | *"I will fall prostrate at his feet, And never rise until my tears and prayers Have won his grace to come in person hither And take perforce my husband from the abbess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prostration]] | noun | **1.** An abrupt failure of function or complete physical exhaustion.<br>**2.** Abject submission; the emotional equivalent of prostrating your body. | *"Troy, in his prostration at this time, had no perception that in the futility of these romantic doings, dictated by a remorseful reaction from previous indifference, there was any element of absurdity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[prostyle]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek styl.<br>**2.** Specialized application within the domain of Medicine & Pathology. | *"In academic literature, prostyle designates a term designating an entity, condition, or phenomenon derived from greek styl."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosy]] | adjective | **1.** Lacking wit or imagination. | *"But Ben was gifted with a spirit of fun, sometimes running into mischief, which was constantly bursting out in new directions, in spite of his father's numerous and rather prosy lectures."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[pseudoprostyle]] | adjective | **1.** Marked by columniation having free columns in a portico only across the opening to the structure. | *"In academic literature, pseudoprostyle designates marked by columniation having free columns in a portico only across the opening to the structure."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster War & Conflict]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PROS
  </div>
</div>
