---
status: unread
type: root_dashboard
---
# Dashboard — pneum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πνεῦμα (pneûma) (air</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis'.</span>
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

The Greek root **pneum** (πνεῦμα (pneûma) (air, breath, lung)) signifies pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *cardiopulmonary*, *pneumatology*, *pneumococcus*, *pneumonectomy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis
> The Greek root **pneum** fundamentally denotes **pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis**. The physical sensory observation and cognitive anchor underlying 'pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis'. In classical Greek antiquity, the root denoted 'pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis'.</mark>
> - **Everyday Connection**: Think of familiar words like *cardiopulmonary*, *pneumatology*, *pneumococcus*, *pneumonectomy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pneum** derives from Ancient Greek <mark class="hl-stem">πνεῦμα (pneûma) (air, breath, lung)</mark>, meaning "pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pneum**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis'.
  - Whenever you see **pneum** in an English word, think immediately of **pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pneum</mark>, think of <mark class="hl-def">pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pneum-` (from *πνεῦμα (pneûma) (air, breath, lung)*).
> - **Combining Stem with -o- Connective:** `pneumo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Pneum
> - **1. Direct & Concrete Anchor:** Literal instantiation of pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pneum

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pneum-` | [[cardiopulmonary]] | Primary root semantic foundation denoting pneumonia, pneumothorax, pneumonectomy, pneumococcus, pneumatology, pneumonitis. |
| **Connecting -o-** | `pneumo-` | [[pneumatology]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pneum` | [[pneumococcus]] | Relational or directional modification of the core root sense. |

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
| [[cardiopulmonary]] | noun | **1.** Of or relating to the heart and lungs.<br>**2.** A procedure designed to restore normal breathing after cardiac arrest that includes the clearance of air passages to the lungs, mouth-to-mouth method of artificial respiration, and heart massage by the exertion of pressure on the chest. | *"In academic literature, cardiopulmonary designates of or relating to the heart and lungs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumatic]] | noun | **1.** Of, relating to, or using gas (such as air or wind):.<br>**2.** Moved or worked by air pressure. | *"When it is fired it "kicks" backwards, against the force of a buffer of springs, or a hydraulic or pneumatic cylinder."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[pneumatically]] | adverb | **1.** In a pneumatic manner. | *"In academic literature, pneumatically designates in a pneumatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumatics]] | noun | **1.** The branch of mechanics that deals with the mechanical properties of gases. | *"In academic literature, pneumatics designates the branch of mechanics that deals with the mechanical properties of gases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumatology]] | noun | **1.** The study of spiritual beings or phenomena. | *"In academic literature, pneumatology designates the study of spiritual beings or phenomena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumatophore]] | noun | **1.** An air-filled root (submerged or exposed) that can function as a respiratory organ of a marsh or swamp plant. | *"In academic literature, pneumatophore designates an air-filled root (submerged or exposed) that can function as a respiratory organ of a marsh or swamp plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumococcal]] | adjective | **1.** Of or derived from or caused by bacteria of the genus pneumococcus. | *"In academic literature, pneumococcal designates of or derived from or caused by bacteria of the genus pneumococcus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumococcus]] | noun | **1.** A bacterium (Streptococcus pneumoniae) that causes an acute pneumonia involving one or more lobes of the lung. | *"In academic literature, pneumococcus designates a bacterium (streptococcus pneumoniae) that causes an acute pneumonia involving one or more lobes of the lung."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumoconiosis]] | noun | **1.** Chronic respiratory disease caused by inhaling metallic or mineral particles. | *"In academic literature, pneumoconiosis designates chronic respiratory disease caused by inhaling metallic or mineral particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumocytosis]] | noun | **1.** Pneumonia occurring in infants or in persons with impaired immune systems (as aids victims). | *"In academic literature, pneumocytosis designates pneumonia occurring in infants or in persons with impaired immune systems (as aids victims)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumoencephalogram]] | noun | **1.** An x ray of the brain made by replacing spinal fluid with a gas (usually oxygen) to improve contrast. | *"In academic literature, pneumoencephalogram designates an x ray of the brain made by replacing spinal fluid with a gas (usually oxygen) to improve contrast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumogastric]] | noun | **1.** A mixed nerve that supplies the pharynx and larynx and lungs and heart and esophagus and stomach and most of the abdominal viscera.<br>**2.** Of or relating to the vagus nerve. | *"In academic literature, pneumogastric designates a mixed nerve that supplies the pharynx and larynx and lungs and heart and esophagus and stomach and most of the abdominal viscera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumonectomy]] | noun | **1.** Excision of an entire lung or of one or more lobes of a lung. | *"In academic literature, pneumonectomy designates excision of an entire lung or of one or more lobes of a lung."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumonia]] | noun | **1.** An acute disease that is marked by inflammation of lung tissue accompanied by infiltration of alveoli and often bronchioles with white blood cells (such as neutrophils) and fibrinous exudate, is characterized by fever, chills, cough, difficulty in breathing, fatigue, chest pain, and reduced lung expansion, and is typically caused by an infectious agent (such as a bacterium, virus, or fungus).<br>**2.** Pneumonia affecting both lungs. | *"The wife of Deacon W. was sinking rapidly with pneumonia."* — Classic Author, *The wonders of prayer* |
| [[pneumonic]] | noun | **1.** Of, relating to, or affecting the lungs : pulmonic, pulmonary.<br>**2.** Of, relating to, or affected with pneumonia. | *"In academic literature, pneumonic designates of, relating to, or affecting the lungs : pulmonic, pulmonary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumonitis]] | noun | **1.** Acute or chronic inflammation of the lungs that is characterized especially by cough, shortness of breath, fatigue, and fever, and may result in the development of fibrotic scar tissue when chronic or untreated. | *"In academic literature, pneumonitis designates acute or chronic inflammation of the lungs that is characterized especially by cough, shortness of breath, fatigue, and fever, and may result in the development of fibrotic scar tissue when chronic or untreated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumonoconiosis]] | noun | **1.** Chronic respiratory disease caused by inhaling metallic or mineral particles. | *"In academic literature, pneumonoconiosis designates chronic respiratory disease caused by inhaling metallic or mineral particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumothorax]] | noun | **1.** A condition in which air or other gas is present in the pleural cavity and which occurs spontaneously as a result of disease or injury of lung tissue, rupture of air-filled pulmonary cysts, or puncture of the chest wall or is induced as a therapeutic measure to collapse the lung. | *"In academic literature, pneumothorax designates a condition in which air or other gas is present in the pleural cavity and which occurs spontaneously as a result of disease or injury of lung tissue, rupture of air-filled pulmonary cysts, or puncture of the chest wall or is induced as a therapeutic measure to collapse the lung."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pneumovax]] | noun | **1.** Vaccine (trade name pneumovax) effective against the 23 most common strains of pneumococcus. | *"In academic literature, pneumovax designates vaccine (trade name pneumovax) effective against the 23 most common strains of pneumococcus."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PNEUM
  </div>
</div>
