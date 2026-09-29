---
status: unread
type: root_dashboard
---
# Dashboard — electr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἤλεκτρον (ḗlektron)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“amber”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'amber'.</span>
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

The Greek root **electr** (ἤλεκτρον (ḗlektron)) signifies amber. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *electr*, *electric*, *electricity*, *electromagnetic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: amber
> The Greek root **electr** fundamentally denotes **amber**. The physical sensory observation and cognitive anchor underlying 'amber'. In classical Greek antiquity, the root denoted 'amber', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">amber</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'amber'.</mark>
> - **Everyday Connection**: Think of familiar words like *electr*, *electric*, *electricity*, *electromagnetic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **electr** derives from Ancient Greek <mark class="hl-stem">ἤλεκτρον (ḗlektron)</mark>, meaning "amber".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with electr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'amber'.
  - Whenever you see **electr** in an English word, think immediately of **amber**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">electr</mark>, think of <mark class="hl-def">amber</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `electr-` (from *ἤλεκτρον (ḗlektron)*).
> - **Combining Stem with -o- Connective:** `electro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Electr
> - **1. Direct & Concrete Anchor:** Literal instantiation of amber in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on electr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `electr-` | [[electr]] | Primary root semantic foundation denoting amber. |
| **Connecting -o-** | `electro-` | [[electric]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `electr` | [[electricity]] | Relational or directional modification of the core root sense. |

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
| [[antielectron]] | noun | **1.** An elementary particle with positive charge; interaction of a positron and an electron results in annihilation. | *"In academic literature, antielectron designates an elementary particle with positive charge; interaction of a positron and an electron results in annihilation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electr]] | noun | **1.** Electricity.<br>**2.** Electric : electric and : electrically. | *"In academic literature, electr designates electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electra]] | noun | **1.** (greek mythology) the daughter of agamemnon and clytemnestra; persuaded her brother (orestes) to avenge agamemnon's death by helping her to kill clytemnestra and her lover (aegisthus). | *"In academic literature, electra designates (greek mythology) the daughter of agamemnon and clytemnestra; persuaded her brother (orestes) to avenge agamemnon's death by helping her to kill clytemnestra and her lover (aegisthus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electric]] | noun | **1.** Of, relating to, or operated by electricity.<br>**2.** Exciting as if by electric shock; also : charged with strong emotion. | *"The effect upon her old lover was electric, far stronger than the effect of his presence upon her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[electrical]] | adjective | **1.** Relating to or concerned with electricity.<br>**2.** Using or providing or producing or transmitting or operated by electricity. | *"In short, she is rendered harmless by being, in electrical language, insulated."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[electrically]] | adverb | **1.** By electricity. | *"Time sweeps by us on electrically-driven, ball-bearing pinions."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[electrician]] | noun | **1.** A person who installs or repairs electrical or telephone lines. | *"Before describing it, it may sharpen the reader's interest to mention a wonderful experiment which was made by Varley, the famous electrician, on the first successful Atlantic cable."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electricity]] | noun | **1.** A fundamental form of energy observable in positive and negative forms that occurs naturally (as in lightning) or is produced (as in a generator) and that is expressed in terms of the movement and interaction of electrons.<br>**2.** Electric current or power. | *"All was as quick as electricity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[electrification]] | noun | **1.** The activity of thrilling or markedly exciting some person or group.<br>**2.** The act of providing electricity. | *"Take the one instance of the electrification of a railway."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrify]] | verb | **1.** Excite suddenly and intensely.<br>**2.** Charge (a conductor) with electricity. | *"Nothing of the dream had been real but my burst of laughter, a sound never before heard in that grave sanctuary, and so abhorrent to the ears of wisdom, as to electrify the fraternity."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[electrifying]] | verb | **1.** Excite suddenly and intensely.<br>**2.** Charge (a conductor) with electricity. | *"Brooke, “going into electrifying your land and that kind of thing, and making a parlor of your cow-house."* — George Eliot, *Middlemarch* |
| [[electrocardiogram]] | noun | **1.** The tracing made by an electrocardiograph; also : the procedure for producing an electrocardiogram. | *"In academic literature, electrocardiogram designates the tracing made by an electrocardiograph; also : the procedure for producing an electrocardiogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiograph]] | noun | **1.** An instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action. | *"In academic literature, electrocardiograph designates an instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiographic]] | adjective | **1.** Of or relating to an electrocardiograph. | *"In academic literature, electrocardiographic designates of or relating to an electrocardiograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiography]] | noun | **1.** An instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action. | *"In academic literature, electrocardiography designates an instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocautery]] | noun | **1.** Application of a needle heated by an electric current to destroy tissue (as to remove warts). | *"In academic literature, electrocautery designates application of a needle heated by an electric current to destroy tissue (as to remove warts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrochemical]] | adjective | **1.** Of or involving electrochemistry. | *"In academic literature, electrochemical designates of or involving electrochemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrochemistry]] | noun | **1.** Branch of chemistry that deals with the chemical action of electricity and the production of electricity by chemical reactions. | *"DEPOSITING THE SHELL Those who are not technically familiar with electrochemistry are prone to think that the length of time a mold is kept in the electrolytic bath, i. e., the copper bath, determines the thickness of the shell deposited thereon."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electrocute]] | verb | **1.** Kill by electric shock.<br>**2.** Kill by electrocution, as in the electric chair. | *"Gob, they ought to drown him in the sea after and electrocute and crucify him to make sure of their job. —But what about the fighting navy, says Ned, that keeps our foes at bay? —I’ll tell you what about it, says the citizen."* — James Joyce, *Ulysses* |
| [[electrocution]] | noun | **1.** Execution by electricity.<br>**2.** Killing by electric shock. | *"In academic literature, electrocution designates execution by electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocutioner]] | noun | **1.** An executioner who uses electricity to kill the condemned person. | *"In academic literature, electrocutioner designates an executioner who uses electricity to kill the condemned person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrode]] | noun | **1.** A conductor used to establish electrical contact with a nonmetallic part of a circuit.<br>**2.** An element in a semiconductor device (such as a transistor) that emits or collects electrons or holes or controls their movements. | *"Since, however, it may not be easy for the general reader to carry all these terms in his mind, we will, when it is necessary to differentiate between the two electrodes, call one the in-electrode and the other the out-electrode."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrodeposition]] | noun | **1.** The deposition of a substance on an electrode by the action of electricity (especially by electrolysis). | *"In academic literature, electrodeposition designates the deposition of a substance on an electrode by the action of electricity (especially by electrolysis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrodynamometer]] | noun | **1.** Measuring instrument that uses the interaction of the magnetic fields of two coils to measure current or voltage or power. | *"In academic literature, electrodynamometer designates measuring instrument that uses the interaction of the magnetic fields of two coils to measure current or voltage or power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalogram]] | noun | **1.** The tracing of brain waves made by an electroencephalograph. | *"In academic literature, electroencephalogram designates the tracing of brain waves made by an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalograph]] | noun | **1.** An apparatus for detecting and recording brain waves. | *"In academic literature, electroencephalograph designates an apparatus for detecting and recording brain waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalographic]] | adjective | **1.** Of or relating to an electroencephalograph. | *"In academic literature, electroencephalographic designates of or relating to an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrograph]] | noun | **1.** An apparatus for the electrical transmission of pictures.<br>**2.** Electrical device used for etching by electrolytic means. | *"In academic literature, electrograph designates an apparatus for the electrical transmission of pictures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrologist]] | noun | **1.** Someone skilled in the use of electricity to remove moles or warts or hair roots. | *"In academic literature, electrologist designates someone skilled in the use of electricity to remove moles or warts or hair roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrolysis]] | noun | **1.** The producing of chemical changes by passage of an electric current through an electrolyte.<br>**2.** Subjection to this action. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolyte]] | noun | **1.** A nonmetallic electric conductor in which current is carried by the movement of ions.<br>**2.** A substance that when dissolved in a suitable solvent or when fused becomes an ionic conductor. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolytic]] | noun | **1.** Of or relating to electrolysis or an electrolyte; also : produced by or used in electrolysis. | *"Deposition of Shell._ The molded case is put in the electrolytic bath for the deposition of shell thereon. _12."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electromagnet]] | noun | **1.** A core of magnetic material (such as iron) surrounded by a coil of wire through which an electric current is passed to magnetize the core. | *"In academic literature, electromagnet designates a core of magnetic material (such as iron) surrounded by a coil of wire through which an electric current is passed to magnetize the core."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetic]] | noun | **1.** Of, relating to, or produced by electromagnetism.<br>**2.** A pulse of high-intensity electromagnetic radiation generated especially by a nuclear blast high above the earth's surface and held to disrupt electronic and electrical systems —abbreviation EMP. | *"In academic literature, electromagnetic designates of, relating to, or produced by electromagnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetics]] | noun | **1.** The branch of physics concerned with electromagnetic phenomena. | *"In academic literature, electromagnetics designates the branch of physics concerned with electromagnetic phenomena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetism]] | noun | **1.** Magnetism produced by an electric current.<br>**2.** The branch of physics concerned with electromagnetic phenomena. | *"In academic literature, electromagnetism designates magnetism produced by an electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromechanical]] | adjective | **1.** Of or relating to or involving an electrically operated mechanical device. | *"In academic literature, electromechanical designates of or relating to or involving an electrically operated mechanical device."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrometer]] | noun | **1.** Meter to measure electrostatic voltage differences; draws no current from the source. | *"The galvanometer has a near relative, the electrometer, the astounding delicacy of which renders it equally interesting."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electromotive]] | adjective | **1.** Concerned with or producing electric current. | *"In academic literature, electromotive designates concerned with or producing electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyogram]] | noun | **1.** A tracing made by an electromyograph. | *"In academic literature, electromyogram designates a tracing made by an electromyograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyograph]] | noun | **1.** An instrument that converts the electrical activity associated with functioning skeletal muscle into a visual record or into sound and is used to diagnose neuromuscular disorders and in biofeedback training. | *"In academic literature, electromyograph designates an instrument that converts the electrical activity associated with functioning skeletal muscle into a visual record or into sound and is used to diagnose neuromuscular disorders and in biofeedback training."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromyography]] | noun | **1.** An instrument that converts the electrical activity associated with functioning skeletal muscle into a visual record or into sound and is used to diagnose neuromuscular disorders and in biofeedback training. | *"In academic literature, electromyography designates an instrument that converts the electrical activity associated with functioning skeletal muscle into a visual record or into sound and is used to diagnose neuromuscular disorders and in biofeedback training."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electron]] | noun | **1.** An elementary particle consisting of a charge of negative electricity equal to about 1.602 × 10—19 coulomb and having a mass when at rest of about 9.109 × 10—31 kilogram or about 1/1836 that of a proton.<br>**2.** The system of electrons surrounding the nucleus of an atom. | *"And it's balanced by the negative charges, the electrons, that revolve around it."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[electronegative]] | adjective | **1.** Having a negative charge. | *"In academic literature, electronegative designates having a negative charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electronegativity]] | noun | **1.** (chemistry) the tendency of an atom or radical to attract electrons in the formation of an ionic bond. | *"In academic literature, electronegativity designates (chemistry) the tendency of an atom or radical to attract electrons in the formation of an ionic bond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroneutral]] | adjective | **1.** Having no net electric charge. | *"In academic literature, electroneutral designates having no net electric charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electronic]] | noun | **1.** Of or relating to electrons.<br>**2.** Of, relating to, or utilizing devices constructed or working by the methods or principles of electronics. | *"Hodak, acting as clumsily as he could, slammed and locked the passageway safety doors with the loudest noises he could generate, broadcasting the unusual activity to all within hearing range and for electronic sensor pickup."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[electronically]] | adverb | **1.** By electronic means. | *"All rooms, corridors and exterior approaches leading to the meeting site were physically and electronically searched, and the identity disks of all individuals passing through the area scrutinized and verified."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[electronics]] | noun | **1.** The branch of physics that deals with the emission and effects of electrons and with the use of electronic devices. | *"In academic literature, electronics designates the branch of physics that deals with the emission and effects of electrons and with the use of electronic devices."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoresis]] | noun | **1.** The motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode. | *"In academic literature, electrophoresis designates the motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoretic]] | adjective | **1.** Of or relating to electrophoresis. | *"In academic literature, electrophoretic designates of or relating to electrophoresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoridae]] | noun | **1.** Small family comprising the electric eels. | *"In academic literature, electrophoridae designates small family comprising the electric eels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophorus]] | noun | **1.** A simple electrostatic generator that generates repeated charges of static electricity.<br>**2.** Type genus of the family electrophoridae; electric eels. | *"Then comes the "Electrophorus," an electrical instrument suggested by Volta, which was thought at the time a grand invention for the purpose of getting light (Fig. 6 A)."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[electroplate]] | noun | **1.** Any artifact that has been plated with a thin coat of metal by electrolysis.<br>**2.** Coat with metal by electrolysis. | *"This observation was the first step in the process of electroplating, which is electrotyping when applied to the art of typography."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[electroplater]] | noun | **1.** A plater who uses electrolysis. | *"In academic literature, electroplater designates a plater who uses electrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electropositive]] | adjective | **1.** Having a positive charge. | *"In academic literature, electropositive designates having a positive charge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroretinogram]] | noun | **1.** A graphical recording of the electrical activity of the retina that results when light is flashed into the eye. | *"In academic literature, electroretinogram designates a graphical recording of the electrical activity of the retina that results when light is flashed into the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroscope]] | noun | **1.** Measuring instrument that detects electric charge; two gold leaves diverge owing to repulsion of charges with like sign. | *"In its simplest form the electrometer is called the "electroscope." Two strips of gold-leaf are suspended by their ends under a glass or metal shade."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electroshock]] | noun | **1.** The administration of a strong electric current that passes through the brain to induce convulsions and coma. | *"In academic literature, electroshock designates the administration of a strong electric current that passes through the brain to induce convulsions and coma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrosleep]] | noun | **1.** Unconsciousness brought about by the passage of a low voltage electric current through the brain. | *"In academic literature, electrosleep designates unconsciousness brought about by the passage of a low voltage electric current through the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrostatic]] | adjective | **1.** Concerned with or producing or caused by static electricity. | *"It is a convenient form of what is called an electrostatic condenser."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrostatically]] | adverb | **1.** In an electrostatic manner. | *"In academic literature, electrostatically designates in an electrostatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrostatics]] | noun | **1.** The branch of physics that deals with static electricity. | *"In academic literature, electrostatics designates the branch of physics that deals with static electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrosurgery]] | noun | **1.** Surgery performed with electrical devices (as in electrocautery). | *"In academic literature, electrosurgery designates surgery performed with electrical devices (as in electrocautery)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrotherapist]] | noun | **1.** Someone who specializes in the treatment of disease by electricity. | *"In academic literature, electrotherapist designates someone who specializes in the treatment of disease by electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrotherapy]] | noun | **1.** The therapeutic application of electricity to the body (as in the treatment of various forms of paralysis). | *"In academic literature, electrotherapy designates the therapeutic application of electricity to the body (as in the treatment of various forms of paralysis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrum]] | noun | **1.** An alloy of gold and silver. | *"In academic literature, electrum designates an alloy of gold and silver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microelectronic]] | adjective | **1.** Of or relating to or consisting of miniature electronic components. | *"In academic literature, microelectronic designates of or relating to or consisting of miniature electronic components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microelectronics]] | noun | **1.** The branch of electronics that deals with miniature components. | *"In academic literature, microelectronics designates the branch of electronics that deals with miniature components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyelectrolyte]] | noun | **1.** A substance of high molecular weight (such as a protein) that is an electrolyte. | *"In academic literature, polyelectrolyte designates a substance of high molecular weight (such as a protein) that is an electrolyte."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Physics & Chemistry]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ELECTR
  </div>
</div>
