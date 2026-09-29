---
status: unread
type: root_dashboard
---
# Dashboard — plan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πλάνος</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wander”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'wander'.</span>
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

The Greek root **plan** (πλάνος, πλανάομαι, πλανᾶσθαι, πλανητός, πλανήτης (planâsthai, planáein, planētós, planḗtēs)) signifies wander. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *aplanetic*, *aplanogamete*, *exoplanet*, *planet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wander
> The Greek root **plan** fundamentally denotes **wander**. The physical sensory observation and cognitive anchor underlying 'wander'. In classical Greek antiquity, the root denoted 'wander', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">wander</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'wander'.</mark>
> - **Everyday Connection**: Think of familiar words like *aplanetic*, *aplanogamete*, *exoplanet*, *planet*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plan** derives from Ancient Greek <mark class="hl-stem">πλάνος, πλανάομαι, πλανᾶσθαι, πλανητός, πλανήτης (planâsthai, planáein, planētós, planḗtēs)</mark>, meaning "wander".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with plan**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'wander'.
  - Whenever you see **plan** in an English word, think immediately of **wander**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plan</mark>, think of <mark class="hl-def">wander</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `plan-` (from *πλάνος, πλανάομαι, πλανᾶσθαι, πλανητός, πλανήτης (planâsthai, planáein, planētós, planḗtēs)*).
> - **Combining Stem with -o- Connective:** `plano-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Plan
> - **1. Direct & Concrete Anchor:** Literal instantiation of wander in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on plan

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `plan-` | [[aplanetic]] | Primary root semantic foundation denoting wander. |
| **Connecting -o-** | `plano-` | [[aplanogamete]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `plan` | [[exoplanet]] | Relational or directional modification of the core root sense. |

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
| [[aplanatic]] | adjective | **1.** Free from or corrected for spherical aberration. | *"In academic literature, aplanatic designates free from or corrected for spherical aberration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aplanetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of wander. | *"In academic literature, aplanetic designates adjective*) pertaining to, derived from, or characteristic of wander."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aplanogamete]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plan.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, aplanogamete designates a term designating an entity, condition, or phenomenon derived from greek plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deplane]] | verb | **1.** Get off an airplane. | *"In academic literature, deplane designates get off an airplane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emplane]] | verb | **1.** Board a plane. | *"In academic literature, emplane designates board a plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enplane]] | verb | **1.** Board a plane. | *"In academic literature, enplane designates board a plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exoplanet]] | noun | **1.** A planet orbiting a star that is not our sun. | *"In academic literature, exoplanet designates a planet orbiting a star that is not our sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[explanandum]] | noun | **1.** (logic) a statement of something (a fact or thing or expression) to be explained. | *"In academic literature, explanandum designates (logic) a statement of something (a fact or thing or expression) to be explained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[explanans]] | noun | **1.** (logic) statements that explain the explicandum; the explanatory premises. | *"In academic literature, explanans designates (logic) statements that explain the explicandum; the explanatory premises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[explanation]] | noun | **1.** A statement that makes something comprehensible by describing the relevant structure or operation or circumstances etc.<br>**2.** Thought that makes something comprehensible. | *"What he wanted was perfectly correct but was not just suitable at that moment, and he needed an explanation."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[explanatory]] | adjective | **1.** Serving or intended to explain or make clear. | *"Snagsby addresses an explanatory cough to Mrs."* — Charles Dickens, *Bleak House* |
| [[monoplane]] | noun | **1.** An airplane with a single wing. | *"Thus, as a sample of my rovings: in a single interval of fifteen minutes of subconsciousness I have crawled and bellowed in the slime of the primeval world and sat beside Haas—further and cleaved the twentieth century air in a gas-driven monoplane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[periplaneta]] | noun | **1.** Cosmopolitan genus of large cockroaches. | *"In academic literature, periplaneta designates cosmopolitan genus of large cockroaches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plan]] | noun | **1.** A series of steps to be carried out or goals to be accomplished.<br>**2.** An arrangement scheme. | *"When Lippo had properly filled the box and set it in its right place, he quickly followed Mäzli, wondering what her plan was."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[planar]] | adjective | **1.** Involving two dimensions. | *"In academic literature, planar designates involving two dimensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planaria]] | noun | **1.** Free-swimming mostly freshwater flatworms; popular in laboratory studies for the ability to regenerate lost parts. | *"In academic literature, planaria designates free-swimming mostly freshwater flatworms; popular in laboratory studies for the ability to regenerate lost parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planarian]] | noun | **1.** Free-swimming mostly freshwater flatworms; popular in laboratory studies for the ability to regenerate lost parts. | *"In academic literature, planarian designates free-swimming mostly freshwater flatworms; popular in laboratory studies for the ability to regenerate lost parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planate]] | adjective | **1.** Having been flattened. | *"In academic literature, planate designates having been flattened."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planation]] | noun | **1.** The process of erosion whereby a level surface is produced. | *"Divine metaphysics reverses perverted 111:15 and physical hypotheses as to Deity, even as the ex- planation of optics rejects the incidental or inverted image and shows what this inverted image is meant to 111:18 represent."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[planchet]] | noun | **1.** A flat metal disk ready for stamping as a coin. | *"In academic literature, planchet designates a flat metal disk ready for stamping as a coin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planchette]] | noun | **1.** A triangular board supported on casters; when lightly touched with the fingertips it is supposed to spell out supernatural (or unconscious) messages. | *"Even planchette - the French toy which years ago pleased so many people - attested the con- 80:24 trol of mortal mind over its substratum, called matter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[planck]] | noun | **1.** German physicist whose explanation of blackbody radiation in the context of quantized energy emissions initiated quantum theory (1858-1947). | *"In academic literature, planck designates german physicist whose explanation of blackbody radiation in the context of quantized energy emissions initiated quantum theory (1858-1947)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plane]] | noun | **1.** An aircraft that has a fixed wing and is powered by propellers or jets.<br>**2.** (mathematics) an unbounded two-dimensional shape. | *"The air was rendered so transparent by the heavy fall of rain that the autumn hues of the middle distance were as rich as those near at hand, and the remote fields intercepted by the angle of the tower appeared in the same plane as the tower itself."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[plane-polarized]] | adjective | **1.** (of a moving wave) vibrating in a single plane. | *"In academic literature, plane-polarized designates (of a moving wave) vibrating in a single plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planeness]] | noun | **1.** The property of having two dimensions. | *"In academic literature, planeness designates the property of having two dimensions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planer]] | noun | **1.** A power tool for smoothing or shaping wood. | *"It could drive lathes, drills, planers, punches, polishers, in a word all the cunning machines of a great factory?"* — Mark Twain, *What Is Man? and Other Essays* |
| [[planera]] | noun | **1.** A deciduous tree of the family ulmaceae that grows in the southeastern united states. | *"In academic literature, planera designates a deciduous tree of the family ulmaceae that grows in the southeastern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planet]] | noun | **1.** Any of the large bodies that revolve around the sun in the solar system.<br>**2.** A similar body associated with another star. | *"Now the fleeting moon No planet is of mine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[planetal]] | adjective | **1.** Of or relating to or resembling the physical or orbital characteristics of a planet or the planets. | *"In academic literature, planetal designates of or relating to or resembling the physical or orbital characteristics of a planet or the planets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planetarium]] | noun | **1.** A building housing an instrument for projecting the positions of the planets onto a domed ceiling.<br>**2.** An optical device for projecting images of celestial bodies and other astronomical phenomena onto the inner surface of a hemispherical dome. | *"In academic literature, planetarium designates a building housing an instrument for projecting the positions of the planets onto a domed ceiling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planetary]] | adjective | **1.** Of or relating to or resembling the physical or orbital characteristics of a planet or the planets.<br>**2.** Of or relating to or characteristic of the planet earth or its inhabitants; - l.c.eiseley. | *"Be as a planetary plague when Jove Will o’er some high-viced city hang his poison In the sick air."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[planetesimal]] | noun | **1.** One of many small solid celestial bodies thought to have existed at an early stage in the development of the solar system. | *"In academic literature, planetesimal designates one of many small solid celestial bodies thought to have existed at an early stage in the development of the solar system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planetoid]] | noun | **1.** A small body resembling a planet; especially : asteroid. | *"Rings of laser arrays along the edge of the Extractor's hopper flashed alive and focused their beams on a large, slowly tumbling planetoid hundreds of kilometers across its minor dimension."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[planetonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plan.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, planetonym designates a term designating an entity, condition, or phenomenon derived from greek plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planimeter]] | noun | **1.** A measuring instrument for measuring the area of an irregular plane figure. | *"In academic literature, planimeter designates a measuring instrument for measuring the area of an irregular plane figure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planless]] | adjective | **1.** Aimlessly drifting. | *"In academic literature, planless designates aimlessly drifting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planned]] | verb | **1.** Have the will and intention to carry out some action.<br>**2.** Make plans for something. | *"So he planned to visit your brother and talk the plan over with him." This calmed Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[planner]] | noun | **1.** A person who makes plans.<br>**2.** A notebook for recording appointments and things to be done, etc. | *"As a Logistics Planner at Nouasseur, one of my projects was to prepare an element of U S Air Force Europe (USAFE) logistics plans to support the U S Strategic Air Command (SAC)."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[planning]] | noun | **1.** An act of formulating a program for a definite course of action.<br>**2.** The act or process of drawing up plans or layouts for some project or enterprise. | *"As we were going along, planning what we should do for Richard and Ada, I heard somebody calling “Esther!"* — Charles Dickens, *Bleak House* |
| [[plano]] | noun | **1.** A city in northeastern texas (suburb of dallas). | *"In academic literature, plano designates a city in northeastern texas (suburb of dallas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planoblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plan.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, planoblast designates a term designating an entity, condition, or phenomenon derived from greek plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planococcus]] | noun | **1.** A genus of pseudococcidae. | *"In academic literature, planococcus designates a genus of pseudococcidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planoconcave]] | adjective | **1.** Flat on one side and concave on the other. | *"In academic literature, planoconcave designates flat on one side and concave on the other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planoconvex]] | adjective | **1.** Flat on one side and convex on the other. | *"The free zoospores are of the form of a planoconvex lens, obtuse at the edge."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[planogamete]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plan.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, planogamete designates a term designating an entity, condition, or phenomenon derived from greek plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planographic]] | adjective | **1.** Of or relating to or involving planography. | *"In academic literature, planographic designates of or relating to or involving planography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planography]] | noun | **1.** The process of printing from a surface on which the printing areas are not raised but are ink-receptive (as opposed to ink repellent). | *"In academic literature, planography designates the process of printing from a surface on which the printing areas are not raised but are ink-receptive (as opposed to ink repellent)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planospore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plan.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, planospore designates a term designating an entity, condition, or phenomenon derived from greek plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plant]] | noun | **1.** Buildings for carrying on industrial labor.<br>**2.** (botany) a living organism lacking the power of locomotion. | *"Go charge Agrippa Plant those that have revolted in the van That Antony may seem to spend his fury Upon himself. [_Exeunt Caesar and his Train._] ENOBARBUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plant-eating]] | adjective | **1.** (of animals) feeding on plants. | *"In academic literature, plant-eating designates (of animals) feeding on plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantae]] | noun | **1.** (botany) the taxonomic kingdom comprising all living or extinct plants. | *"In academic literature, plantae designates (botany) the taxonomic kingdom comprising all living or extinct plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantagenet]] | noun | **1.** The family name of a line of english kings that reigned from 1154 to 1485. | *"O, that it could be proved That some night-tripping fairy had exchanged In cradle-clothes our children where they lay, And called mine Percy, his Plantagenet!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plantaginaceae]] | noun | **1.** Cosmopolitan family of small herbs and a few shrubs; most are troublesome weeds. | *"In academic literature, plantaginaceae designates cosmopolitan family of small herbs and a few shrubs; most are troublesome weeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantaginales]] | noun | **1.** Coextensive with the family plantaginaceae. | *"In academic literature, plantaginales designates coextensive with the family plantaginaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantago]] | noun | **1.** Type genus of the family plantaginaceae; large cosmopolitan genus of mostly small herbs. | *"In academic literature, plantago designates type genus of the family plantaginaceae; large cosmopolitan genus of mostly small herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantain]] | noun | **1.** Any of numerous plants of the genus plantago; mostly small roadside or dooryard weeds with elliptic leaves and small spikes of very small flowers; seeds of some used medicinally.<br>**2.** A banana tree bearing hanging clusters of edible angular greenish starchy fruits; tropics and subtropics. | *"O, sir, plantain, a plain plantain!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plantal]] | adjective | **1.** Of or relating to plants. | *"In academic literature, plantal designates of or relating to plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantar]] | adjective | **1.** Relating to or occurring on the undersurface of the foot. | *"In academic literature, plantar designates relating to or occurring on the undersurface of the foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantation]] | noun | **1.** An estate where cash crops are grown on a large scale (especially in tropical areas).<br>**2.** A newly established colony (especially in the colonization of north america). | *"Had I plantation of this isle, my lord,— ANTONIO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[planted]] | verb | **1.** Put or set (seeds, seedlings, or plants) into the ground.<br>**2.** Fix or set securely or deeply. | *"Yet at the first I saw the treasons planted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[planter]] | noun | **1.** The owner or manager of a plantation.<br>**2.** A worker who puts or sets seeds or seedlings into the ground. | *"Mason, a West India planter and merchant, was his old acquaintance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[planthopper]] | noun | **1.** Related to the leafhoppers and spittlebugs but rarely damages cultivated plants. | *"In academic literature, planthopper designates related to the leafhoppers and spittlebugs but rarely damages cultivated plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantigrade]] | noun | **1.** An animal that walks with the entire sole of the foot touching the ground as e.g. bears and human beings.<br>**2.** (of mammals) walking on the whole sole of the foot (as rabbits, raccoons, bears, and humans do). | *"In academic literature, plantigrade designates an animal that walks with the entire sole of the foot touching the ground as e.g. bears and human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planting]] | noun | **1.** The act of fixing firmly in place.<br>**2.** A collection of plants (trees or shrubs or flowers) in a particular area. | *"What have you been doing?” “Tending thrashing-machine and wimbling haybonds, and saying ‘Hoosh!’ to the cocks and hens when they go upon your seeds, and planting Early Flourballs and Thompson’s Wonderfuls with a dibble.” “Yes—I see."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[plantlet]] | noun | **1.** A young plant or a small plant. | *"In academic literature, plantlet designates a young plant or a small plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plantsman]] | noun | **1.** An expert in the science of cultivating plants (fruit or flowers or vegetables or ornamental plants). | *"In academic literature, plantsman designates an expert in the science of cultivating plants (fruit or flowers or vegetables or ornamental plants)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[planula]] | noun | **1.** The flat ciliated free-swimming larva of hydrozoan coelenterates. | *"In academic literature, planula designates the flat ciliated free-swimming larva of hydrozoan coelenterates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoplanet]] | noun | **1.** A hypothetical whirling gaseous mass within a giant cloud of gas and dust that rotates around a sun and is believed to give rise to a planet. | *"In academic literature, protoplanet designates a hypothetical whirling gaseous mass within a giant cloud of gas and dust that rotates around a sun and is believed to give rise to a planet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[replant]] | verb | **1.** Plant again or anew. | *"I will revenge his wrong to Lady Bona, And replant Henry in his former state."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unplanned]] | adjective | **1.** Without apparent forethought or prompting or planning.<br>**2.** Not done with purpose or intent. | *"I was never able to do it but that once, and that one time was wholly unplanned and unexpected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unplanted]] | adjective | **1.** Not planted. | *"In academic literature, unplanted designates not planted."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion & Direction]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLAN
  </div>
</div>
