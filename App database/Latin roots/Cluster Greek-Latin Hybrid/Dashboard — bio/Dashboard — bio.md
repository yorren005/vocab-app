---
status: unread
type: root_dashboard
---
# Dashboard — bio
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bio-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“life”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **bio** means life. It refers to living existence, vitality, and organic growth. In English, this root forms words such as *abiogenesis*, *abiotic*, *aerobe*, and *aerobic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: life
> The root **bio** means life. It refers to living existence, vitality, and organic growth. In English, this root forms words such as *abiogenesis*, *abiotic*, *aerobe*, and *aerobic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Life</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *abiogenesis* and *abiotic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bio** comes from a Latin word that means *"life"*.
  - At its core, it describes life.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **bio** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of life.
  - **Mental & Social**: How people experience, organize, or communicate about life.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Abiogenesis**: The natural process by which life arises from non-living matter.
  - **Abiotic**: Non-living.
  - **Aerobe**: A microorganism that requires gaseous oxygen for growth and survival.
  - **Aerobic**: Requiring free oxygen.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bio</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The element **bio-** functions with extraordinary flexibility in English word formation across three primary structural slots:
> - **Initial Combining Form:** `bio-` (attaching directly to nominal, verbal, or adjectival bases: *biochemistry*, *biodiversity*, *biohazard*, *biometrics*, *bioinformatics*)
> - **Medial Combining Form:** `-bio-` (prefixed by Greek or Latin modifiers: *autobiography*, *microbiology*, *macrobiotic*)
> - **Terminal Nominal / Adjectival Suffix:** `-biosis`, `-biotic`, `-be` (denoting states of life or biological agents: *symbiosis*, *antibiotic*, *aerobic*, *microbe*, *amphibious*)
>
> **Phonetic Elision Rule:** When compounding before a second element that begins with a vowel, the combining vowel `-o-` elides (e.g., *bio-* + *opsis* $ightarrow$ **biopsy**; *aēr* + *bios* $ightarrow$ **aerobe**).

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
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

> [!tip] 🌈 Shades of Meaning in Different Words
> The semantic manifestations of `bio` partition into five major intellectual zones:
> - **Narrative, History & Memoir:** *biography*, *biographer*, *autobiography*, *autobiographical* preserve the original Greek sense of a narrated human life span and career.
> - **Clinical Medicine & Pathology:** *biopsy*, *antibiotic*, *biomarker*, and *biohazard* describe diagnostic tissue examination, microbial combat, and pathogenic contamination.
> - **Ecology & Planetary Systems:** *biosphere*, *biome*, *biomass*, *biodiversity*, and *symbiosis* describe regional climate-ecosystems, living volume, and cooperative interspecies relationships.
> - **Cellular & Molecular Chemistry:** *biochemistry*, *biotechnology*, *bioinformatics*, and *bioluminescence* investigate metabolic pathways, genetic engineering, and cellular computation.
> - **Bioethics & Societal Governance:** *bioethics* and *biodegradable* govern the moral boundaries of gene editing, organ transplantation, and environmental consumer standards.

---

## 🔀 4. Prefix & Combining Dynamics on bio

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `anti-` (Greek) | against, counter | [[antibiotic]] | "Against microbial life"; destroying or inhibiting pathogenic bacteria. |
| `auto-` (Greek) | self | [[autobiography]] | The writing of one's own life by oneself. |
| `micro-` (Greek) | small, microscopic | [[microbe]], [[microbiology]] | Microscopic life; the science of bacteria, viruses, and unicellular fungi. |
| `sym-` / `syn-` (Greek) | together, with | [[symbiosis]], [[symbiotic]] | "Living together"; close, sustained ecological partnership between species. |
| `a-` / `an-` (privative) | without, lacking | [[abiotic]], [[abiogenesis]], [[anaerobic]] | Devoid of living organisms; life arising from non-living matter; living without oxygen. |
| `amphi-` (Greek) | both, on both sides | [[amphibian]], [[amphibious]] | "Living a double life"; organisms inhabiting both water and dry land. |

### Suffix & Second-Element Transformations (Grammatical & Categorical Roles)

| Suffix / Second Element | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-logy` (< Greek *logos*) | Noun (Discipline / Science) | [[biology]], [[microbiology]] | The organized scientific study of living organisms. |
| `-graphy` (< Greek *graphein*) | Noun (Written Account) | [[biography]], [[autobiography]] | The written record or narrative of a human lifetime. |
| `-opsy` (< Greek *opsis*, sight) | Noun (Visual Inspection) | [[biopsy]] | Examination of living tissue removed from the body. |
| `-genesis` (< Greek *genesis*) | Noun (Origin / Creation) | [[biogenesis]], [[abiogenesis]] | The historical origin or production of living forms. |
| `-cide` (< Latin *caedere*, to kill) | Noun / Adj. (Killer / Destruction)| [[biocide]], [[biocidal]] | A chemical agent that destroys living organisms or pests. |
| `-sphere` (< Greek *sphaira*, ball)| Noun (Enclosing Shell) | [[biosphere]] | The global planetary envelope containing all terrestrial life. |
| `-ome` (< Greek *-ōma*, mass) | Noun (Ecological Entity) | [[biome]] | A major regional biotic community defined by climate. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Cellular & Molecular Biology** | [[biology]], [[biochemistry]], [[biotechnology]] | Recombinant DNA technology, CRISPR gene editing, enzyme kinetics, metabolic mapping. |
| 🩺 **Clinical Medicine & Pathology** | [[biopsy]], [[antibiotic]], [[aerobic]], [[anaerobe]] | Histopathology tissue slicing, antibiotic susceptibility testing, infectious disease treatment. |
| 🌍 **Ecology & Environmental Policy** | [[biosphere]], [[biome]], [[biodiversity]], [[biodegradable]] | Global climate modeling, UNESCO Biosphere Reserves, conservation biology, compostable packaging. |
| 📚 **Literature, History & Life-Writing**| [[biography]], [[autobiography]], [[biographer]] | Literary criticism, historical memoirs, presidential memoirs, narrative non-fiction. |
| ⚖️ **Law, Bioethics & Forensics** | [[bioethics]], [[biometrics]], [[biohazard]] | Institutional Review Boards (IRBs), facial/retinal biometric identification, biosafety containment levels (BSL-1 through BSL-4). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[albion]] | noun | **1.** Archaic name for england or great britain; used poetically. | *"Normans, but bastard Normans, Norman bastards! _Mort de ma vie_, if they march along Unfought withal, but I will sell my dukedom, To buy a slobbery and a dirty farm In that nook-shotten isle of Albion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antibiotic]] | noun | **1.** A chemical substance derivable from a mold or bacterium that can kill microorganisms and cure bacterial infections.<br>**2.** Of or relating to antibiotic drugs. | *"In academic literature, antibiotic designates a chemical substance derivable from a mold or bacterium that can kill microorganisms and cure bacterial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autobiographer]] | noun | **1.** Someone who writes their own biography. | *"In academic literature, autobiographer designates someone who writes their own biography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autobiographic]] | adjective | **1.** Of or relating to or characteristic of an autobiographer.<br>**2.** Relating to or in the style of an autobiography. | *"It contains several autobiographic touches; it is the only known instance in which she has addressed herself to full-grown readers, and it is sagacious and far-seeing."* — Anne Gilchrist, *Mary Lamb* |
| [[autobiographical]] | adjective | **1.** Of or relating to or characteristic of an autobiographer.<br>**2.** Relating to or in the style of an autobiography. | *"To this extent, and within these limits, an author, methinks, may be autobiographical, without violating either the reader’s rights or his own."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[autobiography]] | noun | **1.** A biography of yourself. | *"My father, the author of the _Sinner's Friend_, narrates in his autobiography a circumstance which he often used to speak of with great emotion."* — Classic Author, *The wonders of prayer* |
| [[bioarm]] | noun | **1.** Any weapon usable in biological warfare. | *"In academic literature, bioarm designates any weapon usable in biological warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioassay]] | noun | **1.** Appraisal of the biological activity of a substance by testing its effect on an organism and comparing the result with some agreed standard.<br>**2.** Subject to a bio-assay. | *"In academic literature, bioassay designates appraisal of the biological activity of a substance by testing its effect on an organism and comparing the result with some agreed standard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioattack]] | noun | **1.** The use of bacteria or viruses or toxins to destroy men and animals or food. | *"In academic literature, bioattack designates the use of bacteria or viruses or toxins to destroy men and animals or food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biocatalyst]] | noun | **1.** A biochemical catalyst such as an enzyme. | *"In academic literature, biocatalyst designates a biochemical catalyst such as an enzyme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biocatalytic]] | adjective | **1.** Of or relating to biocatalysts. | *"In academic literature, biocatalytic designates of or relating to biocatalysts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochemical]] | adjective | **1.** Of or relating to biochemistry; involving chemical processes in living organisms. | *"In academic literature, biochemical designates of or relating to biochemistry; involving chemical processes in living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochemically]] | adverb | **1.** With respect to biochemistry. | *"In academic literature, biochemically designates with respect to biochemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochemist]] | noun | **1.** Someone with special training in biochemistry. | *"In academic literature, biochemist designates someone with special training in biochemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochemistry]] | noun | **1.** The organic chemistry of compounds and processes occurring in organisms; the effort to understand biology within the context of chemistry. | *"In academic literature, biochemistry designates the organic chemistry of compounds and processes occurring in organisms; the effort to understand biology within the context of chemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biochip]] | noun | **1.** A microchip that uses tiny strands of dna to latch onto and quickly recognize thousands of genes at a time; intended for use in a biological environment. | *"In academic literature, biochip designates a microchip that uses tiny strands of dna to latch onto and quickly recognize thousands of genes at a time; intended for use in a biological environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioclimatic]] | adjective | **1.** Of or concerned with the relations of climate and living organisms. | *"In academic literature, bioclimatic designates of or concerned with the relations of climate and living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioclimatology]] | noun | **1.** The study of effects of climate on living organisms. | *"In academic literature, bioclimatology designates the study of effects of climate on living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biodegradable]] | adjective | **1.** Capable of being decomposed by e.g. bacteria. | *"In academic literature, biodegradable designates capable of being decomposed by e.g. bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioelectricity]] | noun | **1.** Electric phenomena in animals or plants. | *"In academic literature, bioelectricity designates electric phenomena in animals or plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioengineering]] | noun | **1.** The branch of engineering science in which biological science is used to study the relation between workers and their environments. | *"In academic literature, bioengineering designates the branch of engineering science in which biological science is used to study the relation between workers and their environments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioethics]] | noun | **1.** The branch of ethics that studies moral values in the biomedical sciences. | *"The project's participants represented a broad array of disciplines and interests, including engineering, biomedicine, law, economics, psychology, bioethics, and philosophy."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[biologic]] | adjective | **1.** Pertaining to biology or to life and living things. | *"This is the problem of eugenics, the choice and biologic breeding of capable men to be the citizens of the nation, and broadly understood, it includes both the negro and the immigrant problems.] [Footnote 2: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[biological]] | adjective | **1.** Pertaining to biology or to life and living things.<br>**2.** Of parents and children; related by blood. | *"We have to "think like God," he says (Mark 8:33); and perhaps God is in his thoughts neither so legal nor so biological as we are; perhaps he does not think first of edicts or of biological and psychological laws."* — T. R. Glover, *The Jesus of History* |
| [[biologically]] | adverb | **1.** With respect to biology. | *"In academic literature, biologically designates with respect to biology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologism]] | noun | **1.** Use of biological principles in explaining human especially social behavior. | *"In academic literature, biologism designates use of biological principles in explaining human especially social behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologist]] | noun | **1.** (biology) a scientist who studies living organisms. | *"If this question is open to dispute among biologists, it is only as regards a minute increment of improvement."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[biologistic]] | adjective | **1.** Of or relating to biologism. | *"In academic literature, biologistic designates of or relating to biologism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biology]] | noun | **1.** The science that studies living organisms.<br>**2.** Characteristic life processes and phenomena of living organisms. | *"Every day he seemed to become more interested in biology, and his name appeared once or twice in some of the scientific reviews in connection with certain curious experiments."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[bioluminescence]] | noun | **1.** Luminescence produced by physiological processes (as in the firefly). | *"In academic literature, bioluminescence designates luminescence produced by physiological processes (as in the firefly)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioluminescent]] | adjective | **1.** (of living organisms) emitting light. | *"In academic literature, bioluminescent designates (of living organisms) emitting light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomass]] | noun | **1.** Plant materials and animal waste used as fuel.<br>**2.** The total mass of living matter in a given unit area. | *"In academic literature, biomass designates plant materials and animal waste used as fuel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biome]] | noun | **1.** A major biotic community characterized by the dominant forms of plant life and the prevailing climate. | *"In academic literature, biome designates a major biotic community characterized by the dominant forms of plant life and the prevailing climate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomedical]] | adjective | **1.** Relating to the activities and applications of science to clinical medicine. | *"In academic literature, biomedical designates relating to the activities and applications of science to clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomedicine]] | noun | **1.** The branch of medical science that applies biological and physiological principles to clinical practice.<br>**2.** The branch of medical science that studies the ability of organisms to withstand environmental stress (as in space travel). | *"The project's participants represented a broad array of disciplines and interests, including engineering, biomedicine, law, economics, psychology, bioethics, and philosophy."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[biometrics]] | noun | **1.** A branch of biology that studies biological phenomena and observations by means of statistical analysis. | *"In academic literature, biometrics designates a branch of biology that studies biological phenomena and observations by means of statistical analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biometry]] | noun | **1.** A branch of biology that studies biological phenomena and observations by means of statistical analysis. | *"In academic literature, biometry designates a branch of biology that studies biological phenomena and observations by means of statistical analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bionic]] | adjective | **1.** Of or relating to bionics.<br>**2.** Having particular physiological functions augmented or replaced by electronic or electromechanical components. | *"Men, women and children in all shapes and sizes: tall, short, stocky, slender, organic, bionic, robotic, and combinations thereof."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[bionics]] | noun | **1.** Application of biological principles to the study and design of engineering systems (especially electronic systems). | *"In academic literature, bionics designates application of biological principles to the study and design of engineering systems (especially electronic systems)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bionomic]] | adjective | **1.** Of or relating to the science of ecology. | *"In academic literature, bionomic designates of or relating to the science of ecology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bionomical]] | adjective | **1.** Of or relating to the science of ecology. | *"In academic literature, bionomical designates of or relating to the science of ecology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bionomics]] | noun | **1.** The branch of biology concerned with the relations between organisms and their environment. | *"In academic literature, bionomics designates the branch of biology concerned with the relations between organisms and their environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biont]] | noun | **1.** A discrete unit of living matter. | *"In academic literature, biont designates a discrete unit of living matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biopsy]] | noun | **1.** Examination of tissues or liquids from the living body to determine the existence or cause of a disease. | *"In academic literature, biopsy designates examination of tissues or liquids from the living body to determine the existence or cause of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioremediation]] | noun | **1.** The branch of biotechnology that uses biological process to overcome environmental problems.<br>**2.** The act of treating waste or pollutants by the use of microorganisms (as bacteria) that can break down the undesirable substances. | *"In academic literature, bioremediation designates the branch of biotechnology that uses biological process to overcome environmental problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biorhythm]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin bio within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of bio in systematic terminology. | *"In academic literature, biorhythm designates pertaining to, derived from, or characteristic of latin bio within the domain of greek-latin hybrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosafety]] | noun | **1.** Safety from exposure to infectious agents. | *"In academic literature, biosafety designates safety from exposure to infectious agents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioscience]] | noun | **1.** Any of the branches of natural science dealing with the structure and behavior of living organisms. | *"In academic literature, bioscience designates any of the branches of natural science dealing with the structure and behavior of living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioscope]] | noun | **1.** A south african movie theater.<br>**2.** A kind of early movie projector. | *"In academic literature, bioscope designates a south african movie theater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosphere]] | noun | **1.** The regions of the surface and atmosphere of the earth (or other planet) where living organisms exist. | *"In academic literature, biosphere designates the regions of the surface and atmosphere of the earth (or other planet) where living organisms exist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biostatistics]] | noun | **1.** A branch of biology that studies biological phenomena and observations by means of statistical analysis. | *"In academic literature, biostatistics designates a branch of biology that studies biological phenomena and observations by means of statistical analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosynthesis]] | noun | **1.** Production of a chemical compound by a living organism. | *"In academic literature, biosynthesis designates production of a chemical compound by a living organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosynthetic]] | adjective | **1.** Of or relating to biosynthesis. | *"In academic literature, biosynthetic designates of or relating to biosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosystematic]] | adjective | **1.** Of or relating to biosystematics. | *"In academic literature, biosystematic designates of or relating to biosystematics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosystematics]] | noun | **1.** Use of data (e.g. cytogenetic or biochemical) to assess taxonomic relations especially within an evolutionary framework. | *"In academic literature, biosystematics designates use of data (e.g. cytogenetic or biochemical) to assess taxonomic relations especially within an evolutionary framework."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosystematy]] | noun | **1.** Use of data (e.g. cytogenetic or biochemical) to assess taxonomic relations especially within an evolutionary framework. | *"In academic literature, biosystematy designates use of data (e.g. cytogenetic or biochemical) to assess taxonomic relations especially within an evolutionary framework."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biota]] | noun | **1.** All the plant and animal life of a particular region. | *"In academic literature, biota designates all the plant and animal life of a particular region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotech]] | noun | **1.** The branch of molecular biology that studies the use of microorganisms to perform specific industrial processes. | *"In academic literature, biotech designates the branch of molecular biology that studies the use of microorganisms to perform specific industrial processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotechnology]] | noun | **1.** The branch of molecular biology that studies the use of microorganisms to perform specific industrial processes.<br>**2.** The branch of engineering science in which biological science is used to study the relation between workers and their environments. | *"In academic literature, biotechnology designates the branch of molecular biology that studies the use of microorganisms to perform specific industrial processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioterrorism]] | noun | **1.** Terrorism using the weapons of biological warfare. | *"In academic literature, bioterrorism designates terrorism using the weapons of biological warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotic]] | adjective | **1.** Of or relating to living organisms. | *"In academic literature, biotic designates of or relating to living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotin]] | noun | **1.** A b vitamin that aids in body growth. | *"In academic literature, biotin designates a b vitamin that aids in body growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotite]] | noun | **1.** Dark brown to black mica found in igneous and metamorphic rock. | *"In academic literature, biotite designates dark brown to black mica found in igneous and metamorphic rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotitic]] | adjective | **1.** Relating to or involving biotite. | *"In academic literature, biotitic designates relating to or involving biotite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotype]] | noun | **1.** Organisms sharing a specified genotype or the genotype (or peculiarities) so shared. | *"In academic literature, biotype designates organisms sharing a specified genotype or the genotype (or peculiarities) so shared."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotypic]] | adjective | **1.** Of or relating to a biotype. | *"In academic literature, biotypic designates of or relating to a biotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebionite]] | noun | **1.** A member of a group of jews who (during the early history of the christian church) accepted jesus as the messiah; they accepted the gospel according to matthew but rejected the epistles of st. paul and continued to follow jewish law and celebrate jewish holidays; they were later declared heretic by the church of rome.<br>**2.** Of or relating to the ebionites or their religion. | *"And see, especially, the able articles, “Cerinthus” and “Ebionism and Ebionites”, in the ‘Dictionary of Christian Biography’, etc., edited by Dr."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[microbiologist]] | noun | **1.** A specialist in microbiology. | *"In academic literature, microbiologist designates a specialist in microbiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microbiology]] | noun | **1.** The branch of biology that studies microorganisms and their effects on humans. | *"In academic literature, microbiology designates the branch of biology that studies microorganisms and their effects on humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsymbiotic]] | adjective | **1.** Not parasitic on another organism. | *"In academic literature, nonsymbiotic designates not parasitic on another organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probiotic]] | noun | **1.** A beneficial bacterium found in the intestinal tract of healthy mammals; often considered to be a plant. | *"In academic literature, probiotic designates a beneficial bacterium found in the intestinal tract of healthy mammals; often considered to be a plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiosis]] | noun | **1.** The relation between two different species of organisms that are interdependent; each gains benefits from the other. | *"In academic literature, symbiosis designates the relation between two different species of organisms that are interdependent; each gains benefits from the other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiotic]] | adjective | **1.** Used of organisms (especially of different species) living together but not necessarily in a relation beneficial to each. | *"In academic literature, symbiotic designates used of organisms (especially of different species) living together but not necessarily in a relation beneficial to each."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BIO
  </div>
</div>
