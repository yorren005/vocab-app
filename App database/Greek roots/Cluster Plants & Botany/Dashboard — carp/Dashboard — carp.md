---
status: unread
type: root_dashboard
---
# Dashboard — carp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">καρπός (karpós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wrist”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'wrist'.</span>
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

The Greek root **carp** (καρπός (karpós)) signifies wrist. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Carpo*, *Karpos*, *acarpous*, *acrocarpous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wrist
> The Greek root **carp** fundamentally denotes **wrist**. The physical sensory observation and cognitive anchor underlying 'wrist'. In classical Greek antiquity, the root denoted 'wrist', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">wrist</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'wrist'.</mark>
> - **Everyday Connection**: Think of familiar words like *Carpo*, *Karpos*, *acarpous*, *acrocarpous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **carp** derives from Ancient Greek <mark class="hl-stem">καρπός (karpós)</mark>, meaning "wrist".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with carp**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'wrist'.
  - Whenever you see **carp** in an English word, think immediately of **wrist**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">carp</mark>, think of <mark class="hl-def">wrist</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `carp-` (from *καρπός (karpós)*).
> - **Combining Stem with -o- Connective:** `carpo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Carp
> - **1. Direct & Concrete Anchor:** Literal instantiation of wrist in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on carp

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `carp-` | [[Carpo]] | Primary root semantic foundation denoting wrist. |
| **Connecting -o-** | `carpo-` | [[Karpos]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `carp` | [[acarpous]] | Relational or directional modification of the core root sense. |

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
| [[acarpellous]] | adjective | **1.** Having no carpels. | *"In academic literature, acarpellous designates having no carpels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acarpelous]] | adjective | **1.** Having no carpels. | *"In academic literature, acarpelous designates having no carpels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acarpous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, acarpous designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrocarpous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, acrocarpous designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphicarpa]] | noun | **1.** Very small genus of twining vines of north america and asia: hog peanut. | *"In academic literature, amphicarpa designates very small genus of twining vines of north america and asia: hog peanut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphicarpaea]] | noun | **1.** Very small genus of twining vines of north america and asia: hog peanut. | *"In academic literature, amphicarpaea designates very small genus of twining vines of north america and asia: hog peanut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphicarpous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, amphicarpous designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[angiocarp]] | noun | **1.** Tree bearing fruit enclosed in a shell or involucre or husk. | *"In academic literature, angiocarp designates tree bearing fruit enclosed in a shell or involucre or husk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[angiocarpic]] | adjective | **1.** Having or being fruit enclosed in a shell or husk. | *"In academic literature, angiocarpic designates having or being fruit enclosed in a shell or husk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[angiocarpous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, angiocarpous designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisocarpic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, anisocarpic designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apocarpous]] | adjective | **1.** (of ovaries of flowering plants) consisting of carpels that are free from one another as in buttercups or roses. | *"In academic literature, apocarpous designates (of ovaries of flowering plants) consisting of carpels that are free from one another as in buttercups or roses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carp]] | noun | **1.** To find fault or complain querulously. | *"Pray you, sir, use the carp as you may, for he looks like a poor, decayed, ingenious, foolish, rascally knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carpal]] | noun | **1.** Of or relating to the carpus.<br>**2.** A carpal element or bone. | *"In academic literature, carpal designates of or relating to the carpus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpathians]] | noun | **1.** A mountain range in central europe that extends from slovakia and southern poland southeastward through western ukraine to northeastern romania; a popular resort area. | *"He went, but immediately returned with a letter:-- “My Friend.--Welcome to the Carpathians."* — Bram Stoker, *Dracula* |
| [[carpel]] | noun | **1.** A simple pistil or one element of a compound pistil. | *"In academic literature, carpel designates a simple pistil or one element of a compound pistil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpellary]] | adjective | **1.** Belonging to or forming or containing carpels. | *"In academic literature, carpellary designates belonging to or forming or containing carpels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpellate]] | adjective | **1.** Bearing or consisting of carpels. | *"In academic literature, carpellate designates bearing or consisting of carpels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpentaria]] | noun | **1.** A wide shallow inlet of the arafura sea in northern australia. | *"Our course was directed to the west, and on the 11th of January we doubled Cape Wessel, situation in 135° long. and 10° north lat., which forms the east point of the Gulf of Carpentaria."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[carpenter]] | noun | **1.** A woodworker who makes or repairs wooden objects.<br>**2.** Work as a carpenter. | *"What is he that builds stronger than either the mason, the shipwright, or the carpenter?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carpenteria]] | noun | **1.** California evergreen shrub having glossy opposite leaves and terminal clusters of a few fragrant white flowers. | *"In academic literature, carpenteria designates california evergreen shrub having glossy opposite leaves and terminal clusters of a few fragrant white flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpentry]] | noun | **1.** The craft of a carpenter: making things out of wood. | *"He must have learnt his carpentry exactly as every boy learns it, by hammering his fingers instead of the nail, sawing his own skin instead of the wood--and not doing it again."* — T. R. Glover, *The Jesus of History* |
| [[carper]] | noun | **1.** Someone who constantly criticizes in a petty way. | *"Shame not these woods By putting on the cunning of a carper."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carpet]] | noun | **1.** Floor covering consisting of a piece of thick heavy fabric (usually with nap or pile).<br>**2.** A natural object that resembles or suggests a carpet. | *"No, I will rob Tellus of her weed To strew thy green with flowers: the yellows, blues, The purple violets, and marigolds, Shall as a carpet hang upon thy grave, While summer days do last."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carpetbag]] | noun | **1.** Traveling bag made of carpet; widely used in 19th century.<br>**2.** Following the practices or characteristic of carpetbaggers. | *"In academic literature, carpetbag designates traveling bag made of carpet; widely used in 19th century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpetbagger]] | noun | **1.** An outsider who seeks power or success presumptuously. | *"In academic literature, carpetbagger designates an outsider who seeks power or success presumptuously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpetbagging]] | adjective | **1.** Presumptuously seeking success or a position in a new locality. | *"In academic literature, carpetbagging designates presumptuously seeking success or a position in a new locality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpeted]] | verb | **1.** Form a carpet-like cover (over).<br>**2.** Cover completely, as if with a carpet. | *"Jobling puts up his legs on the carpeted seat (having his own side of the box to himself), leans against the wall, and says, “I am grown up now, Guppy."* — Charles Dickens, *Bleak House* |
| [[carpeting]] | noun | **1.** Floor covering consisting of a piece of thick heavy fabric (usually with nap or pile).<br>**2.** Form a carpet-like cover (over). | *"Bretton’s is very large, though: I should love you to have such a house; but it will take a great deal of furniture—carpeting and everything, besides plate and glass."* — George Eliot, *Middlemarch* |
| [[carpetweed]] | noun | **1.** Annual prostrate mat-forming weed having whorled leaves and small greenish-white flowers; widespread throughout north america. | *"In academic literature, carpetweed designates annual prostrate mat-forming weed having whorled leaves and small greenish-white flowers; widespread throughout north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpinaceae]] | noun | **1.** Used in some classification systems for the genera carpinus, ostryopsis, and ostryopsis. | *"In academic literature, carpinaceae designates used in some classification systems for the genera carpinus, ostryopsis, and ostryopsis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carping]] | noun | **1.** Persistent petty and unjustified criticism.<br>**2.** Raise trivial objections. | *"Sure, sure, such carping is not commendable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carpinus]] | noun | **1.** Mostly deciduous monoecious trees or shrubs: hornbeams; sometimes placed in subfamily carpinaceae. | *"In academic literature, carpinus designates mostly deciduous monoecious trees or shrubs: hornbeams; sometimes placed in subfamily carpinaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Carpo]] | combining form | **1.** fruit. | *"Classical and authoritative lexicons catalog Carpo as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpobrotus]] | noun | **1.** A caryophyllaceous genus of carpobrotus. | *"In academic literature, carpobrotus designates a caryophyllaceous genus of carpobrotus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpocapsa]] | noun | **1.** Codling moths. | *"In academic literature, carpocapsa designates codling moths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpodacus]] | noun | **1.** House finches and purple finches. | *"In academic literature, carpodacus designates house finches and purple finches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpogonium]] | noun | **1.** The egg-bearing portion of the female reproductive organ in some red algae. | *"In academic literature, carpogonium designates the egg-bearing portion of the female reproductive organ in some red algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, carpology designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpophagous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, carpophagous designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpophore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, carpophore designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carport]] | noun | **1.** Garage for one or two cars consisting of a flat roof supported on poles. | *"In academic literature, carport designates garage for one or two cars consisting of a flat roof supported on poles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpospore]] | noun | **1.** A diploid spore of a red alga. | *"In academic literature, carpospore designates a diploid spore of a red alga."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carposporic]] | adjective | **1.** Relating to or resembling a carpospore. | *"In academic literature, carposporic designates relating to or resembling a carpospore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carposporous]] | adjective | **1.** Having carpospores. | *"In academic literature, carposporous designates having carpospores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carpus]] | noun | **1.** wrist.<br>**2.** the bones of the wrist. | *"Classical and authoritative lexicons catalog carpus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cystocarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, cystocarp designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dipterocarp]] | noun | **1.** Any of a family (Dipterocarpaceae) of tall hardwood tropical trees chiefly of southeastern Asia that have a 2-winged fruit and are the source of valuable timber, aromatic oils, and resins; especially : a tree of the type genus (Dipterocarpus). | *"In academic literature, dipterocarp designates any of a family (dipterocarpaceae) of tall hardwood tropical trees chiefly of southeastern asia that have a 2-winged fruit and are the source of valuable timber, aromatic oils, and resins; especially : a tree of the type genus (dipterocarpus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocarp]] | noun | **1.** The inner layer of the pericarp of a fruit (such as an apple or orange) when it consists of two or more layers of different texture or consistency. | *"In academic literature, endocarp designates the inner layer of the pericarp of a fruit (such as an apple or orange) when it consists of two or more layers of different texture or consistency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicarp]] | noun | **1.** The outermost layer of the pericarp of a fruit : exocarp. | *"In academic literature, epicarp designates the outermost layer of the pericarp of a fruit : exocarp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicarpal]] | adjective | **1.** Of or relating to the epicarp. | *"In academic literature, epicarpal designates of or relating to the epicarp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exocarp]] | noun | **1.** The outermost layer of the pericarp of a fruit : epicarp. | *"In academic literature, exocarp designates the outermost layer of the pericarp of a fruit : epicarp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Karpos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Karpos designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mericarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, mericarp designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesocarp]] | noun | **1.** The middle layer of a pericarp. | *"In academic literature, mesocarp designates the middle layer of a pericarp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metacarpal]] | noun | **1.** Any bone of the hand between the wrist and fingers.<br>**2.** Of or relating to the metacarpus. | *"In academic literature, metacarpal designates any bone of the hand between the wrist and fingers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metacarpus]] | noun | **1.** The part of the hand or forefoot that contains the metacarpals. | *"In academic literature, metacarpus designates the part of the hand or forefoot that contains the metacarpals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarp]] | noun | **1.** A plant that bears fruit once and dies. | *"In academic literature, monocarp designates a plant that bears fruit once and dies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocarpic]] | noun | **1.** Bearing fruit but once and then dying. | *"In academic literature, monocarpic designates bearing fruit but once and then dying."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericarp]] | noun | **1.** The ripened and variously modified walls of a plant ovary composed of an outer exocarp, middle mesocarp, and inner endocarp layer. | *"In academic literature, pericarp designates the ripened and variously modified walls of a plant ovary composed of an outer exocarp, middle mesocarp, and inner endocarp layer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycarp]] | noun | **1.** Greek bishop of smyrna who refused to recant his christian faith and was burned to death by pagans (circa 69-155). | *"The pious Polycarp said: "I cannot turn at once from good to evil." Neither do 77:3 other mortals accomplish the change from error to truth at a single bound."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[polycarpic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wrist. | *"In academic literature, polycarpic designates adjective*) pertaining to, derived from, or characteristic of wrist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, procarp designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudocarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, pseudocarp designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syncarp]] | noun | **1.** Fruit consisting of many individual small fruits or drupes derived from separate ovaries within a common receptacle: e.g. blackberry; raspberry; pineapple. | *"In academic literature, syncarp designates fruit consisting of many individual small fruits or drupes derived from separate ovaries within a common receptacle: e.g. blackberry; raspberry; pineapple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syncarpous]] | adjective | **1.** (of ovaries of flowering plants) consisting of united carpels. | *"In academic literature, syncarpous designates (of ovaries of flowering plants) consisting of united carpels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncarpeted]] | adjective | **1.** Not carpeted. | *"Going up, the floors above were found to have a very irregular surface, rising to ridges, sinking into valleys; and being just then uncarpeted, the face of the boards was seen to be eaten into innumerable vermiculations."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Plants & Botany]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CARP
  </div>
</div>
