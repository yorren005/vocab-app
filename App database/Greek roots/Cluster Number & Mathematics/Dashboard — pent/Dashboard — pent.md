---
status: unread
type: root_dashboard
---
# Dashboard — pent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">pent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“five”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'five'.</span>
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

The Greek root **pent** (πέντε πεντάς πεντάδος πεντάκις πενταπλάσιος πενταχοῦ (pénte)) signifies five. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *diapente*, *pent*, *pentachoric*, *pentad*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: five
> The Greek root **pent** fundamentally denotes **five**. The physical sensory observation and cognitive anchor underlying 'five'. In classical Greek antiquity, the root denoted 'five', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">five</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'five'.</mark>
> - **Everyday Connection**: Think of familiar words like *diapente*, *pent*, *pentachoric*, *pentad*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pent** derives from Ancient Greek <mark class="hl-stem">πέντε πεντάς πεντάδος πεντάκις πενταπλάσιος πενταχοῦ (pénte)</mark>, meaning "five".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pent**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'five'.
  - Whenever you see **pent** in an English word, think immediately of **five**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pent</mark>, think of <mark class="hl-def">five</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pent-` (from *πέντε πεντάς πεντάδος πεντάκις πενταπλάσιος πενταχοῦ (pénte)*).
> - **Combining Stem with -o- Connective:** `pento-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Pent
> - **1. Direct & Concrete Anchor:** Literal instantiation of five in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pent

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pent-` | [[diapente]] | Primary root semantic foundation denoting five. |
| **Connecting -o-** | `pento-` | [[pent]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pent` | [[pentachoric]] | Relational or directional modification of the core root sense. |

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
| [[diapente]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pent.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, diapente designates a term designating an entity, condition, or phenomenon derived from greek pent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pent]] | noun | **1.** Shut up : confined, repressed —usually used with up. | *"Ah, Gloucester, hide thee from their hateful looks, And, in thy closet pent up, rue my shame, And ban thine enemies, both mine and thine!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pentachoric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of five. | *"In academic literature, pentachoric designates adjective*) pertaining to, derived from, or characteristic of five."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentacle]] | noun | **1.** A star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon. | *"In academic literature, pentacle designates a star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentad]] | noun | **1.** A group of five. | *"In academic literature, pentad designates a group of five."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentaerythritol]] | noun | **1.** A coronary vasodilator (trade name peritrate) used to treat angina pectoris. | *"In academic literature, pentaerythritol designates a coronary vasodilator (trade name peritrate) used to treat angina pectoris."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentagon]] | noun | **1.** A polygon of five angles and five sides.<br>**2.** The U.S. military leadership. | *"Atch (Copy of letter from) Meyer Moldeven April 26, 1993 To: Secretary of Defense The Pentagon Washington, DC 20301 Honorable Secretary: [The opening paragraph in the original letter cited a number of suicides in a military organization."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[pentagonal]] | adjective | **1.** Of or relating to or shaped like a pentagon. | *"The two pentagonal towers on the right and left were appropriated to the inferior offices of the castle."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[pentagram]] | noun | **1.** A figure of a 5-pointed star usually made with alternate points connected by a continuous line and used as a magic or occult symbol; also : a similar 6-pointed star (such as a Solomon's seal). | *"In academic literature, pentagram designates a figure of a 5-pointed star usually made with alternate points connected by a continuous line and used as a magic or occult symbol; also : a similar 6-pointed star (such as a solomon's seal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentahedron]] | noun | **1.** A solid bounded by five faces. | *"In academic literature, pentahedron designates a solid bounded by five faces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentail]] | noun | **1.** Brown tree shrew having a naked tail bilaterally fringed with long stiff hairs on the distal third; of malaysia. | *"In academic literature, pentail designates brown tree shrew having a naked tail bilaterally fringed with long stiff hairs on the distal third; of malaysia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentalpha]] | noun | **1.** Pentalpha is a puzzle where the goal is to place nine stones on the ten intersections of a pentagram.<br>**2.** The puzzle is used as a confidence trick in Mexico, where it is known as estrella mágica. | *"In academic literature, pentalpha designates pentalpha is a puzzle where the goal is to place nine stones on the ten intersections of a pentagram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamerous]] | noun | **1.** Divided into or consisting of five parts; specifically : having each floral whorl consisting of five or a multiple of five members. | *"In academic literature, pentamerous designates divided into or consisting of five parts; specifically : having each floral whorl consisting of five or a multiple of five members."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentameter]] | noun | **1.** A line of verse consisting of five metrical feet. | *"In academic literature, pentameter designates a line of verse consisting of five metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamethylenetetrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, pentamethylenetetrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentangle]] | noun | **1.** A star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon. | *"In academic literature, pentangle designates a star with 5 points; formed by 5 straight lines between the vertices of a pentagon and enclosing another pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentangular]] | adjective | **1.** Of or relating to or shaped like a pentagon. | *"In academic literature, pentangular designates of or relating to or shaped like a pentagon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentastomid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, pentastomid designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentastomida]] | noun | **1.** Tongue worms. | *"In academic literature, pentastomida designates tongue worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentasyllabic]] | adjective | **1.** Having or characterized by or consisting of five syllables. | *"In academic literature, pentasyllabic designates having or characterized by or consisting of five syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentateuch]] | noun | **1.** The first of three divisions of the hebrew scriptures comprising the first five books of the hebrew bible considered as a unit. | *"Colenso, Bishop of Natal, in South Africa; he published works questioning the inspiration and historical accuracy of certain parts of the Bible, among which was ‘The Pentateuch, and the Book of Joshua critically examined’. -- Holy-Cross Day."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pentathlete]] | noun | **1.** An athlete who competes in a pentathlon. | *"In academic literature, pentathlete designates an athlete who competes in a pentathlon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentathlon]] | noun | **1.** An athletic contest involving participation by each contestant in five different events; especially : modern pentathlon.<br>**2.** A composite contest in which all contestants compete in a 300-meter freestyle swim, a 4000-meter cross-country run, a 5000-meter 30-jump equestrian steeplechase, épée fencing, and target shooting at 25 meters. | *"In academic literature, pentathlon designates an athletic contest involving participation by each contestant in five different events; especially : modern pentathlon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatone]] | noun | **1.** A gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted. | *"In academic literature, pentatone designates a gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatonic]] | noun | **1.** Consisting of five tones; specifically : being or relating to a scale in which the tones are arranged like a major scale with the fourth and seventh tones omitted. | *"In academic literature, pentatonic designates consisting of five tones; specifically : being or relating to a scale in which the tones are arranged like a major scale with the fourth and seventh tones omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pent.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pentatope designates a term designating an entity, condition, or phenomenon derived from greek pent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentavalent]] | adjective | **1.** Having a valence of five. | *"In academic literature, pentavalent designates having a valence of five."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentazocine]] | noun | **1.** Analgesic drug (trade name talwin) that is less addictive than morphine. | *"In academic literature, pentazocine designates analgesic drug (trade name talwin) that is less addictive than morphine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pente]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pent.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pente designates a term designating an entity, condition, or phenomenon derived from greek pent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentecost]] | noun | **1.** Seventh sunday after easter; commemorates the emanation of the holy spirit to the apostles; a quarter day in scotland.<br>**2.** (judaism) jewish holy day celebrated on the sixth of sivan to celebrate moses receiving the ten commandments. | *"You know since Pentecost the sum is due, And since I have not much importun’d you, Nor now I had not, but that I am bound To Persia, and want guilders for my voyage; Therefore make present satisfaction, Or I’ll attach you by this officer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pentecostal]] | noun | **1.** Any member of a pentecostal religious body.<br>**2.** Of or relating to or characteristic of any of various pentecostal religious bodies or their members. | *"Pentecostal power 46:30 His students then received the Holy Ghost."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[pentecostalism]] | noun | **1.** Of, relating to, or suggesting Pentecost.<br>**2.** Of, relating to, or constituting any of various Christian religious bodies that emphasize individual experiences of grace, spiritual gifts (such as glossolalia and faith healing), expressive worship, and evangelism. | *"In academic literature, pentecostalism designates of, relating to, or suggesting pentecost."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentecostalist]] | noun | **1.** Any member of a pentecostal religious body. | *"In academic literature, pentecostalist designates any member of a pentecostal religious body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentimento]] | noun | **1.** The reappearance in a painting of an underlying image that had been painted over (usually when the later painting becomes transparent with age). | *"In academic literature, pentimento designates the reappearance in a painting of an underlying image that had been painted over (usually when the later painting becomes transparent with age)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentlandite]] | noun | **1.** A mineral (iron and nickel sulphide) that is the chief ore of nickel. | *"In academic literature, pentlandite designates a mineral (iron and nickel sulphide) that is the chief ore of nickel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentobarbital]] | noun | **1.** A barbiturate (trade name nembutal) used as a sedative and hypnotic and antispasmodic. | *"In academic literature, pentobarbital designates a barbiturate (trade name nembutal) used as a sedative and hypnotic and antispasmodic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentode]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek pent.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pentode designates a term designating an entity, condition, or phenomenon derived from greek pent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentose]] | noun | **1.** Any monosaccharide sugar containing five atoms of carbon per molecule. | *"There was my pentose and methyl-pentose determination in grapes and wines to which I had devoted my last summer vacation at the Asti Vineyards."* — Jack London, *The Jacket (The Star-Rover)* |
| [[pentothal]] | noun | **1.** Barbiturate that is a hygroscopic powder (trade name pentothal) that is a strong barbiturate that acts rapidly; induces a relaxed state when injected as a general anesthetic. | *"In academic literature, pentothal designates barbiturate that is a hygroscopic powder (trade name pentothal) that is a strong barbiturate that acts rapidly; induces a relaxed state when injected as a general anesthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentoxide]] | noun | **1.** An oxide containing five atoms of oxygen in the molecule.<br>**2.** A yellowish-red crystalline compound V2O5 used especially in glass manufacture and as a catalyst. | *"In academic literature, pentoxide designates an oxide containing five atoms of oxygen in the molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentoxifylline]] | noun | **1.** A drug (trade name trental) used to treat claudication; believed to increase the flexibility of red blood cells so they can flow through the blood vessels to the legs and feet. | *"In academic literature, pentoxifylline designates a drug (trade name trental) used to treat claudication; believed to increase the flexibility of red blood cells so they can flow through the blood vessels to the legs and feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentylenetetrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, pentylenetetrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repent]] | verb | **1.** Turn away from sin or do penitence.<br>**2.** Feel remorse for; feel sorry for; be contrite about. | *"I have been, madam, a wicked creature, as you and all flesh and blood are; and indeed I do marry that I may repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentance]] | noun | **1.** Remorse for your past conduct. | *"The one you may do with sterling money, and the other with current repentance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentant]] | adjective | **1.** Feeling or expressing remorse for misdeeds. | *"There is no malice in this burning coal; The breath of heaven hath blown his spirit out And strew’d repentant ashes on his head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repentantly]] | adverb | **1.** Showing remorse. | *"Who throws me aside and refuses forgiveness when it is repentantly implored?" "What signifies the pardon of a wretch like me?" said he, in a tone of agony."* — Effie Afton, *Eventide* |

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
    ROOT DASHBOARD · PENT
  </div>
</div>
