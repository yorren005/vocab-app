---
status: unread
type: root_dashboard
---
# Dashboard — neur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">νεῦρον (neûron)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“nerve , sinew”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'nerve , sinew'.</span>
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

The Greek root **neur** (νεῦρον (neûron)) signifies nerve , sinew. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *aponeurosis*, *endoneurium*, *epineurium*, *neur*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: nerve , sinew
> The Greek root **neur** fundamentally denotes **nerve , sinew**. The physical sensory observation and cognitive anchor underlying 'nerve , sinew'. In classical Greek antiquity, the root denoted 'nerve , sinew', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">nerve , sinew</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'nerve , sinew'.</mark>
> - **Everyday Connection**: Think of familiar words like *aponeurosis*, *endoneurium*, *epineurium*, *neur*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **neur** derives from Ancient Greek <mark class="hl-stem">νεῦρον (neûron)</mark>, meaning "nerve , sinew".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with neur**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'nerve , sinew'.
  - Whenever you see **neur** in an English word, think immediately of **nerve , sinew**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">neur</mark>, think of <mark class="hl-def">nerve , sinew</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `neur-` (from *νεῦρον (neûron)*).
> - **Combining Stem with -o- Connective:** `neuro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Neur
> - **1. Direct & Concrete Anchor:** Literal instantiation of nerve , sinew in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on neur

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `neur-` | [[aponeurosis]] | Primary root semantic foundation denoting nerve , sinew. |
| **Connecting -o-** | `neuro-` | [[endoneurium]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `neur` | [[epineurium]] | Relational or directional modification of the core root sense. |

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
| [[amphineura]] | noun | **1.** A class of gastropoda. | *"In academic literature, amphineura designates a class of gastropoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurin]] | noun | **1.** A b vitamin that prevents beriberi; maintains appetite and growth. | *"In academic literature, aneurin designates a b vitamin that prevents beriberi; maintains appetite and growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurism]] | noun | **1.** A cardiovascular disease characterized by a saclike widening of an artery resulting from weakening of the artery wall. | *"Hearts palpitated, fearfully preparing themselves for future incurable aneurism."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[aneurismal]] | adjective | **1.** Relating to or affected by an aneurysm. | *"In academic literature, aneurismal designates relating to or affected by an aneurysm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurismatic]] | adjective | **1.** Relating to or affected by an aneurysm. | *"In academic literature, aneurismatic designates relating to or affected by an aneurysm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurysm]] | noun | **1.** An abnormal blood-filled bulge of a blood vessel and especially an artery resulting from weakening (as from disease) of the vessel wall. | *"In academic literature, aneurysm designates an abnormal blood-filled bulge of a blood vessel and especially an artery resulting from weakening (as from disease) of the vessel wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurysmal]] | adjective | **1.** Relating to or affected by an aneurysm. | *"In academic literature, aneurysmal designates relating to or affected by an aneurysm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aneurysmatic]] | adjective | **1.** Relating to or affected by an aneurysm. | *"In academic literature, aneurysmatic designates relating to or affected by an aneurysm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aponeurosis]] | noun | **1.** A broad flat sheet of dense fibrous collagenous connective tissue that covers, invests, and forms the terminations and attachments of various muscles. | *"In academic literature, aponeurosis designates a broad flat sheet of dense fibrous collagenous connective tissue that covers, invests, and forms the terminations and attachments of various muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aponeurotic]] | adjective | **1.** Of or relating to an aponeurosis. | *"In academic literature, aponeurotic designates of or relating to an aponeurosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoneurium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, endoneurium designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epineurium]] | noun | **1.** The external connective-tissue sheath of a nerve trunk. | *"In academic literature, epineurium designates the external connective-tissue sheath of a nerve trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononeuropathy]] | noun | **1.** Any neuropathy of a single nerve trunk. | *"In academic literature, mononeuropathy designates any neuropathy of a single nerve trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neur]] | combining form | **1.** nerve.<br>**2.** neural : neural and. | *"Classical and authoritative lexicons catalog neur as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neural]] | noun | **1.** Of, relating to, or affecting a nerve or the nervous system.<br>**2.** Situated in the region of or on the same side of the body as the brain and spinal cord : dorsal. | *"In academic literature, neural designates of, relating to, or affecting a nerve or the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuralgia]] | noun | **1.** Acute paroxysmal pain radiating along the course of one or more nerves usually without demonstrable changes in the nerve structure.<br>**2.** An intense paroxysmal neuralgia involving one or more branches of the trigeminal nerve. | *"From that moment she was subject to severe neuralgia, sick-headaches, at least monthly, and sometimes even weekly."* — Classic Author, *The wonders of prayer* |
| [[neuralgic]] | adjective | **1.** Of or relating to or suffering from neuralgia. | *"For fifteen years, with few exceptions, she had had severe neuralgic sick headaches monthly or oftener."* — Classic Author, *The wonders of prayer* |
| [[neuralgy]] | noun | **1.** Acute spasmodic pain along the course of one or more nerves. | *"In academic literature, neuralgy designates acute spasmodic pain along the course of one or more nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurapraxia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neurapraxia designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurasthenia]] | noun | **1.** A condition that is characterized especially by physical and mental exhaustion usually with accompanying symptoms (such as headache and irritability), is of unknown cause but is often associated with depression or emotional stress, and is sometimes considered similar to or identical with chronic fatigue syndrome. | *"Ich weiss, es liegt im Koerper; aber--aber--"[88] In its origin then, Lenau's Weltschmerz differs altogether from that of Hoelderlin, who exhibits no such symptoms of neurasthenia."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[neurasthenic]] | noun | **1.** A person suffering a nervous breakdown.<br>**2.** Of or relating to or suffering from neurasthenia. | *"Sadger,[76] marks the neurasthenic, and often constitutes a hereditary taint."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[neurectomy]] | noun | **1.** Surgical removal of all or part of a nerve. | *"In academic literature, neurectomy designates surgical removal of all or part of a nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurilemma]] | noun | **1.** Thin membranous sheath around a nerve fiber. | *"In academic literature, neurilemma designates thin membranous sheath around a nerve fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurilemoma]] | noun | **1.** Tumor of the fibrous covering of a peripheral nerve. | *"In academic literature, neurilemoma designates tumor of the fibrous covering of a peripheral nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurinoma]] | noun | **1.** Tumor (usually benign) of the sheath surrounding a nerve. | *"In academic literature, neurinoma designates tumor (usually benign) of the sheath surrounding a nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuritis]] | noun | **1.** An inflammatory or degenerative lesion of a nerve marked especially by pain, sensory disturbances, and impaired or lost reflexes. | *"I didn't know one suffered, with paralysis." "He has racking neuritis in his shoulders and back." "That's bad."* — Anthony Pryde, *Nightfall* |
| [[neuroanatomic]] | adjective | **1.** Of or relating to neural tissue or the nervous system. | *"In academic literature, neuroanatomic designates of or relating to neural tissue or the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroanatomical]] | adjective | **1.** Of or relating to neural tissue or the nervous system. | *"In academic literature, neuroanatomical designates of or relating to neural tissue or the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroanatomy]] | noun | **1.** The anatomy of the nervous system. | *"In academic literature, neuroanatomy designates the anatomy of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurobiological]] | adjective | **1.** Of or relating to the biological study of the nervous system.<br>**2.** With respect to neurobiology. | *"In academic literature, neurobiological designates of or relating to the biological study of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurobiologist]] | noun | **1.** A specialist in neurobiology. | *"In academic literature, neurobiologist designates a specialist in neurobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurobiology]] | noun | **1.** The branch of biology that deals with the anatomy and physiology and pathology of the nervous system. | *"In academic literature, neurobiology designates the branch of biology that deals with the anatomy and physiology and pathology of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroblast]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neuroblast designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroblastoma]] | noun | **1.** A malignant tumor formed of embryonic ganglion cells. | *"In academic literature, neuroblastoma designates a malignant tumor formed of embryonic ganglion cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurochemical]] | noun | **1.** Any organic substance that occurs in neural activity. | *"In academic literature, neurochemical designates any organic substance that occurs in neural activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurocranium]] | noun | **1.** In human anatomy, the neurocranium, also known as the braincase, brainpan, brain-pan, or brainbox, is the upper and back part of the skull, which forms a protective case around the brain.<br>**2.** In the human skull, the neurocranium includes the calvaria or skullcap. | *"In academic literature, neurocranium designates in human anatomy, the neurocranium, also known as the braincase, brainpan, brain-pan, or brainbox, is the upper and back part of the skull, which forms a protective case around the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurocyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neurocyte designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurodermatitis]] | noun | **1.** Dermatitis in which localized areas (especially the forearms or back of the neck or outer part of the ankle) itch persistently; cause is unknown. | *"In academic literature, neurodermatitis designates dermatitis in which localized areas (especially the forearms or back of the neck or outer part of the ankle) itch persistently; cause is unknown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroendocrine]] | noun | **1.** Of, relating to, or being a hormonal substance that influences the activity of nerves.<br>**2.** Of, relating to, or functioning in neurosecretion. | *"In academic literature, neuroendocrine designates of, relating to, or being a hormonal substance that influences the activity of nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroendocrinology]] | noun | **1.** A branch of the life sciences dealing with neurosecretion and the physiological interaction between the central nervous system and the endocrine system. | *"In academic literature, neuroendocrinology designates a branch of the life sciences dealing with neurosecretion and the physiological interaction between the central nervous system and the endocrine system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroepithelioma]] | noun | **1.** Malignant tumor of the neuroepithelium. | *"In academic literature, neuroepithelioma designates malignant tumor of the neuroepithelium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroepithelium]] | noun | **1.** Epithelium associated with special sense organs and containing sensory nerve endings. | *"In academic literature, neuroepithelium designates epithelium associated with special sense organs and containing sensory nerve endings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroethics]] | noun | **1.** The study of ethical implications of treatments for neurological diseases. | *"In academic literature, neuroethics designates the study of ethical implications of treatments for neurological diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurofibroma]] | noun | **1.** Tumor of the fibrous covering of a peripheral nerve. | *"In academic literature, neurofibroma designates tumor of the fibrous covering of a peripheral nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurofibromatosis]] | noun | **1.** A disorder inherited as an autosomal dominant and characterized especially by brown spots on the skin, neurofibromas of peripheral nerves, and deformities of subcutaneous tissue and bone. | *"In academic literature, neurofibromatosis designates a disorder inherited as an autosomal dominant and characterized especially by brown spots on the skin, neurofibromas of peripheral nerves, and deformities of subcutaneous tissue and bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurogenesis]] | noun | **1.** Neurogenesis is the process by which nervous system cells, the neurons, are produced by neural stem cells (NSCs).<br>**2.** This occurs in all species of animals except the porifera (sponges) and placozoans. | *"In academic literature, neurogenesis designates neurogenesis is the process by which nervous system cells, the neurons, are produced by neural stem cells (nscs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurogenic]] | adjective | **1.** Arising in or stimulated by nerve tissues. | *"In academic literature, neurogenic designates arising in or stimulated by nerve tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroglia]] | noun | **1.** glia. | *"Classical and authoritative lexicons catalog neuroglia as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurogliacyte]] | noun | **1.** A cell of the neuroglia. | *"In academic literature, neurogliacyte designates a cell of the neuroglia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroglial]] | adjective | **1.** Relating to or consisting of neuroglia. | *"In academic literature, neuroglial designates relating to or consisting of neuroglia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurohormone]] | noun | **1.** A hormone that is released by nerve impulses (e.g., norepinephrine or vasopressin). | *"In academic literature, neurohormone designates a hormone that is released by nerve impulses (e.g., norepinephrine or vasopressin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurohypophysis]] | noun | **1.** The posterior lobe of the pituitary body; primarily glandular in nature. | *"In academic literature, neurohypophysis designates the posterior lobe of the pituitary body; primarily glandular in nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurolemma]] | noun | **1.** Thin membranous sheath around a nerve fiber. | *"In academic literature, neurolemma designates thin membranous sheath around a nerve fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroleptic]] | noun | **1.** Tranquilizer used to treat psychotic conditions when a calming effect is desired. | *"In academic literature, neuroleptic designates tranquilizer used to treat psychotic conditions when a calming effect is desired."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurolinguist]] | noun | **1.** Someone trained in neuroscience and linguistics who studies brain processes during language production and reception. | *"In academic literature, neurolinguist designates someone trained in neuroscience and linguistics who studies brain processes during language production and reception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurolinguistics]] | noun | **1.** The branch of linguistics that studies the relation between language and the structure and function of the nervous system. | *"In academic literature, neurolinguistics designates the branch of linguistics that studies the relation between language and the structure and function of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurologic]] | noun | **1.** A branch of medicine concerned especially with the structure, function, and diseases of the nervous system. | *"In academic literature, neurologic designates a branch of medicine concerned especially with the structure, function, and diseases of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurological]] | adjective | **1.** Of or relating to or used in or practicing neurology. | *"In academic literature, neurological designates of or relating to or used in or practicing neurology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurologist]] | noun | **1.** One specializing in neurology; especially : a physician skilled in the diagnosis and treatment of disease of the nervous system. | *"In academic literature, neurologist designates one specializing in neurology; especially : a physician skilled in the diagnosis and treatment of disease of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurology]] | noun | **1.** A branch of medicine concerned especially with the structure, function, and diseases of the nervous system. | *"In academic literature, neurology designates a branch of medicine concerned especially with the structure, function, and diseases of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurolysin]] | noun | **1.** Any toxin that affects neural tissues. | *"In academic literature, neurolysin designates any toxin that affects neural tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroma]] | noun | **1.** Any tumor derived from cells of the nervous system. | *"In academic literature, neuroma designates any tumor derived from cells of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuromatous]] | adjective | **1.** Of or relating to or caused by neuromas. | *"In academic literature, neuromatous designates of or relating to or caused by neuromas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuromorphology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neuromorphology designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuromotor]] | adjective | **1.** Relating to a nerve fiber or impulse passing toward motor effectors. | *"In academic literature, neuromotor designates relating to a nerve fiber or impulse passing toward motor effectors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuromuscular]] | adjective | **1.** Affecting or characteristic of both neural and muscular tissue. | *"In academic literature, neuromuscular designates affecting or characteristic of both neural and muscular tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuron]] | noun | **1.** A grayish or reddish granular cell that is the fundamental functional unit of nervous tissue transmitting and receiving nerve impulses and having cytoplasmic processes which are highly differentiated frequently as multiple dendrites or usually as solitary axons which conduct impulses to and away from the cell body : nerve cell.<br>**2.** Interneuron. | *"In academic literature, neuron designates a grayish or reddish granular cell that is the fundamental functional unit of nervous tissue transmitting and receiving nerve impulses and having cytoplasmic processes which are highly differentiated frequently as multiple dendrites or usually as solitary axons which conduct impulses to and away from the cell body : nerve cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuronal]] | adjective | **1.** Of or relating to neurons. | *"In academic literature, neuronal designates of or relating to neurons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neurone designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuronic]] | adjective | **1.** Of or relating to neurons. | *"In academic literature, neuronic designates of or relating to neurons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurontin]] | noun | **1.** An anticonvulsant (trade name neurontin) used to control some types of seizures in the treatment of epilepsy; also used to manage neuralgia caused by shingles. | *"In academic literature, neurontin designates an anticonvulsant (trade name neurontin) used to control some types of seizures in the treatment of epilepsy; also used to manage neuralgia caused by shingles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropathic]] | noun | **1.** Damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency.<br>**2.** A condition (such as Guillain-Barré syndrome) marked by neuropathy. | *"In academic literature, neuropathic designates damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropathology]] | noun | **1.** Pathology of the nervous system. | *"In academic literature, neuropathology designates pathology of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropathy]] | noun | **1.** Damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency.<br>**2.** A condition (such as Guillain-Barré syndrome) marked by neuropathy. | *"In academic literature, neuropathy designates damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurophysiological]] | adjective | **1.** Of or concerned with neurophysiology. | *"In academic literature, neurophysiological designates of or concerned with neurophysiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurophysiology]] | noun | **1.** The branch of neuroscience that studies the physiology of the nervous system. | *"In academic literature, neurophysiology designates the branch of neuroscience that studies the physiology of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropil]] | noun | **1.** The complex network of unmyelinated axones, dendrites, and glial branches that form the bulk of the central nervous system's grey matter and in which nerve cell bodies are embedded. | *"In academic literature, neuropil designates the complex network of unmyelinated axones, dendrites, and glial branches that form the bulk of the central nervous system's grey matter and in which nerve cell bodies are embedded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropile]] | noun | **1.** The complex network of unmyelinated axones, dendrites, and glial branches that form the bulk of the central nervous system's grey matter and in which nerve cell bodies are embedded. | *"In academic literature, neuropile designates the complex network of unmyelinated axones, dendrites, and glial branches that form the bulk of the central nervous system's grey matter and in which nerve cell bodies are embedded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroplastic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of nerve , sinew. | *"In academic literature, neuroplastic designates adjective*) pertaining to, derived from, or characteristic of nerve , sinew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroplasty]] | noun | **1.** Plastic surgery of the nerves. | *"In academic literature, neuroplasty designates plastic surgery of the nerves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropsychiatric]] | adjective | **1.** Of or relating to neuropsychiatry. | *"He's been in neuropsychiatric hospitals more than once."* — Randall Garrett, *Deadly decoy* |
| [[neuropsychiatry]] | noun | **1.** The branch of medicine dealing with mental disorders attributable to diseases of the nervous system. | *"In academic literature, neuropsychiatry designates the branch of medicine dealing with mental disorders attributable to diseases of the nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropsychological]] | adjective | **1.** Of or concerned with neuropsychology. | *"In academic literature, neuropsychological designates of or concerned with neuropsychology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropsychology]] | noun | **1.** The branch of psychology that is concerned with the physiological bases of psychological processes. | *"In academic literature, neuropsychology designates the branch of psychology that is concerned with the physiological bases of psychological processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroptera]] | noun | **1.** An order of insects including: lacewings; antlions; dobsonflies; alderflies; fish flies; mantispids; spongeflies.<br>**2.** Insect having biting mouthparts and four large membranous wings with netlike veins. | *"In academic literature, neuroptera designates an order of insects including: lacewings; antlions; dobsonflies; alderflies; fish flies; mantispids; spongeflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropteran]] | noun | **1.** Insect having biting mouthparts and four large membranous wings with netlike veins. | *"In academic literature, neuropteran designates insect having biting mouthparts and four large membranous wings with netlike veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropteron]] | noun | **1.** Insect having biting mouthparts and four large membranous wings with netlike veins. | *"In academic literature, neuropteron designates insect having biting mouthparts and four large membranous wings with netlike veins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurosarcoma]] | noun | **1.** A malignant neoplasm of nerve tissue and fibrous tissue and connective tissue. | *"In academic literature, neurosarcoma designates a malignant neoplasm of nerve tissue and fibrous tissue and connective tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroscience]] | noun | **1.** A branch (such as neurophysiology) of the life sciences that deals with the anatomy, physiology, biochemistry, or molecular biology of nerves and nervous tissue and especially with their relation to behavior and learning. | *"In academic literature, neuroscience designates a branch (such as neurophysiology) of the life sciences that deals with the anatomy, physiology, biochemistry, or molecular biology of nerves and nervous tissue and especially with their relation to behavior and learning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroscientist]] | noun | **1.** A neurobiologist who specializes in the study of the brain. | *"In academic literature, neuroscientist designates a neurobiologist who specializes in the study of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurosis]] | noun | **1.** A mental and emotional disorder that affects only part of the personality, is accompanied by a less distorted perception of reality than in a psychosis, does not result in disturbance of the use of language, and is accompanied by various physical, physiological, and mental disturbances (such as visceral symptoms, anxieties, or phobias).<br>**2.** Anxiety disorder. | *"In academic literature, neurosis designates a mental and emotional disorder that affects only part of the personality, is accompanied by a less distorted perception of reality than in a psychosis, does not result in disturbance of the use of language, and is accompanied by various physical, physiological, and mental disturbances (such as visceral symptoms, anxieties, or phobias)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurospora]] | noun | **1.** Genus of fungi with black perithecia used extensively in genetic research; includes some forms with orange spore masses that cause severe damage in bakeries. | *"In academic literature, neurospora designates genus of fungi with black perithecia used extensively in genetic research; includes some forms with orange spore masses that cause severe damage in bakeries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurosurgeon]] | noun | **1.** Surgery of nervous structures (such as nerves, the brain, or the spinal cord). | *"In academic literature, neurosurgeon designates surgery of nervous structures (such as nerves, the brain, or the spinal cord)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurosurgery]] | noun | **1.** Surgery of nervous structures (such as nerves, the brain, or the spinal cord). | *"In academic literature, neurosurgery designates surgery of nervous structures (such as nerves, the brain, or the spinal cord)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurosyphilis]] | noun | **1.** Syphilis of the central nervous system. | *"In academic literature, neurosyphilis designates syphilis of the central nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotic]] | noun | **1.** Of, relating to, constituting, or affected with neurosis.<br>**2.** One affected with a neurosis. | *"In academic literature, neurotic designates of, relating to, constituting, or affected with neurosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotically]] | adverb | **1.** In a neurotic manner. | *"In academic literature, neurotically designates in a neurotic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroticism]] | noun | **1.** A neurotic character, condition, or trait. | *"In academic literature, neuroticism designates a neurotic character, condition, or trait."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotoxic]] | adjective | **1.** Poisonous to nerves or nerve cells. | *"In academic literature, neurotoxic designates poisonous to nerves or nerve cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotoxin]] | noun | **1.** A poisonous substance (such as tetrodotoxin or saxitoxin) that acts on the nervous system and disrupts the normal function of nerve cells. | *"In academic literature, neurotoxin designates a poisonous substance (such as tetrodotoxin or saxitoxin) that acts on the nervous system and disrupts the normal function of nerve cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotransmitter]] | noun | **1.** A substance (such as norepinephrine or acetylcholine) that transmits nerve impulses across a synapse. | *"In academic literature, neurotransmitter designates a substance (such as norepinephrine or acetylcholine) that transmits nerve impulses across a synapse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotrichus]] | noun | **1.** Shrew moles. | *"In academic literature, neurotrichus designates shrew moles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotropic]] | adjective | **1.** (of a virus, toxin, or chemical) tending to attack or affect the nervous system preferentially. | *"In academic literature, neurotropic designates (of a virus, toxin, or chemical) tending to attack or affect the nervous system preferentially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurotropism]] | noun | **1.** An affinity for neural tissues. | *"In academic literature, neurotropism designates an affinity for neural tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perineurium]] | noun | **1.** The connective-tissue sheath that surrounds a bundle of nerve fibers. | *"In academic literature, perineurium designates the connective-tissue sheath that surrounds a bundle of nerve fibers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyneuritis]] | noun | **1.** Inflammation of many or all of the peripheral nerves (as in leprosy). | *"In academic literature, polyneuritis designates inflammation of many or all of the peripheral nerves (as in leprosy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyneuropathy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, polyneuropathy designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unneurotic]] | adjective | **1.** Not neurotic. | *"In academic literature, unneurotic designates not neurotic."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · NEUR
  </div>
</div>
