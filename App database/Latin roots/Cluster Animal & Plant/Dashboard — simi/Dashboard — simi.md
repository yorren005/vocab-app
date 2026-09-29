---
status: unread
type: root_dashboard
---
# Dashboard — simi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">simi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“monkey or ape”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **simi** means monkey or ape. It refers to ape, monkey, snub-nosed primate, evolutionary mimicry. In English, this root forms words such as *feminine*, *simian*, *prosimian*, and *simiiformes*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: monkey or ape
> The root **simi** means monkey or ape. It refers to ape, monkey, snub-nosed primate, evolutionary mimicry. In English, this root forms words such as *feminine*, *simian*, *prosimian*, and *simiiformes*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Monkey or ape</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *feminine* and *simian*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **simi** comes from a Latin word that means *"monkey or ape"*.
  - At its core, it describes monkey or ape.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **simi** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of monkey or ape.
  - **Mental & Social**: How people experience, organize, or communicate about monkey or ape.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Feminine**: An everyday English word showing the root's idea of *monkey or ape*.
  - **Simian**: Of, relating to, or resembling monkeys or apes.
  - **Prosimian**: Any lower primate belonging to the suborder Strepsirrhini and Tarsiiformes, characterized by larger olfactory lobes and smaller brain-to-body ratios than true apes.
  - **Simiiformes**: The formal taxonomic infraorder of primates that includes New World monkeys , Old World monkeys , and apes and humans.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">simi</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **simi** combines through Latin adjectival suffixation and phylogenetic compounding:
> 1. **Primary Adjectival Derivation:**
>    - `simi-` + `-an` (*-ānus*) ➔ *simian* (of or resembling apes).
>    - `simi-` + `-ous` (*-ōsus*) ➔ *simious* (ape-like).
> 2. **Taxonomic Prefixation & Compounding:**
>    - `pro-` ("before, ancestral") + `simian` ➔ *prosimian* (primitive primates preceding true monkeys).
>    - `simi-` + `forma` ("shape, form") ➔ *simiiform* ➔ *Simiiformes* (the anthropoid suborder).
>    - `simi-` + `-id` (*-idae*) ➔ *simiid* (member of the family Simiidae).
> 3. **Verbal Derivations:**
>    - `simian` + `-ize` ➔ *simianize* ➔ *simianization*.

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
> Although firmly anchored in the ape, the derivatives operate across distinct intellectual axes:
> - **Biological Cladistics:** [[Simiiformes]] and [[simian]] categorize the 300+ species of anthropoid primates sharing fused frontal bones and trichromatic vision.
> - **Evolutionary Transitions:** [[prosimian]] marks the earlier evolutionary radiation of lemurs, lorises, and bushbabies.
> - **Medical Genetics:** The [[simian crease]] serves as a classic physical marker in dysmorphology exams for Trisomy 21 and fetal alcohol spectrum disorder.
> - **Cultural Anthropology:** [[simianize]] examines how racist 19th-century colonial cartoons weaponized ape comparisons against marginalized populations.

---

## 🔀 4. Prefix & Combining Dynamics on simi

### Structural Compounding on `simi-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `pro-` | before, prior | [[prosimian]] | Lower primates (lemurs, tarsiers) evolutionary precursors to true apes |
| `-ānus` | belonging to | [[simian]] | Relating to monkeys or apes; displaying primate posture or features |
| `forma` | form, structure | [[Simiiformes]] | Major primate infraorder comprising all monkeys, apes, and humans |
| `-idae` | family suffix | [[simiid]] | Member of the historical great ape family Simiidae |
| `-ize` | to make, render | `simianize` | To depict, caricature, or transform into an ape-like appearance |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Biological Anthropology & Primatology:** Primate tool use (Jane Goodall), hominid fossil ancestors (*Australopithecus*), and catarrhine vs. platyrrhine evolution.
> - **Clinical Genetics & Pediatrics:** Dermatoglyphic hand analysis, single transverse palmar crease diagnostics.
> - **Virology & Oncology:** Simian immunodeficiency virus (SIV, precursor to HIV), simian vacuolating virus 40 (SV40).
> - **Art History & Caricature Studies:** *Singerie* paintings of the Flemish and French Rococo (Watteau, Teniers); political satire.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[assimilable]] | adjective | **1.** Able to be absorbed and incorporated into body tissues. | *"In academic literature, assimilable designates able to be absorbed and incorporated into body tissues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assimilate]] | verb | **1.** Take up mentally.<br>**2.** Become similar to one's environment. | *"If we do not definitely set our minds to assimilate the ideas of Jesus, we shall make too little of the heart of God."* — T. R. Glover, *The Jesus of History* |
| [[assimilating]] | verb | **1.** Take up mentally.<br>**2.** Become similar to one's environment. | *"Middlemarch, in fact, counted on swallowing Lydgate and assimilating him very comfortably."* — George Eliot, *Middlemarch* |
| [[assimilation]] | noun | **1.** The state of being assimilated; people of different backgrounds come to see themselves as part of a larger national family.<br>**2.** The social process of absorbing one cultural group into harmony with another. | *"One is struck with the amount of that unconscious assimilation of experience which we find in his words, and which is in itself an index to his nature."* — T. R. Glover, *The Jesus of History* |
| [[assimilative]] | adjective | **1.** Capable of mentally absorbing ; ,.<br>**2.** Capable of taking (gas, light, or liquids) into a solution; "an assimilative substance. | *"How much of this country would now be worth preserving if the North had been covered by Africans as is South Carolina to-day, in view of their non-assimilative character?"* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[assimilator]] | noun | **1.** Someone (especially a child) who learns (as from a teacher) or takes up knowledge or beliefs. | *"In academic literature, assimilator designates someone (especially a child) who learns (as from a teacher) or takes up knowledge or beliefs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assimilatory]] | adjective | **1.** Capable of taking (gas, light, or liquids) into a solution; "an assimilative substance. | *"In academic literature, assimilatory designates capable of taking (gas, light, or liquids) into a solution; "an assimilative substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissimilar]] | adjective | **1.** Not similar.<br>**2.** Not alike or similar. | *"The new face, too, was like a new picture introduced to the gallery of memory; and it was dissimilar to all the others hanging there: firstly, because it was masculine; and, secondly, because it was dark, strong, and stern."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[dissimilarity]] | noun | **1.** The quality of being dissimilar. | *"The dissimilarity is not so strong."* — Jane Austen, *Mansfield Park* |
| [[dissimilate]] | verb | **1.** Become dissimilar by changing the sound qualities.<br>**2.** Make dissimilar; cause to become less similar. | *"In academic literature, dissimilate designates become dissimilar by changing the sound qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissimilation]] | noun | **1.** A linguistic process by which one of two similar sounds in a word becomes less like the other.<br>**2.** Breakdown in living organisms of more complex substances into simpler ones together with release of energy. | *"In academic literature, dissimilation designates a linguistic process by which one of two similar sounds in a word becomes less like the other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissimilitude]] | noun | **1.** Dissimilarity evidenced by an absence of likeness. | *"But to render the contrast in this respect still more striking, it may be of use to throw the principal circumstances of dissimilitude into a closer group."* — Alexander Hamilton, *The Federalist Papers* |
| [[prosimian]] | noun | **1.** Primitive primates having large ears and eyes and characterized by nocturnal habits. | *"In academic literature, prosimian designates primitive primates having large ears and eyes and characterized by nocturnal habits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosimii]] | noun | **1.** Not used in all classifications; in some classifications considered coextensive with the lemuroidea; in others includes both lemuroidea and tarsioidea. | *"In academic literature, prosimii designates not used in all classifications; in some classifications considered coextensive with the lemuroidea; in others includes both lemuroidea and tarsioidea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[simian]] | noun | **1.** An ape or monkey.<br>**2.** Relating to or resembling an ape. | *"With a wail of anguish the simian clutched at the precious object."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[simiid]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin simi within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of simi in systematic terminology. | *"In academic literature, simiid designates pertaining to, derived from, or characteristic of latin simi within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[simiiform]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin simi within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of simi in systematic terminology. | *"In academic literature, simiiform designates pertaining to, derived from, or characteristic of latin simi within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[similar]] | adjective | **1.** Marked by correspondence or resemblance.<br>**2.** Having the same or similar characteristics. | *"The talk first started from a misfortune which happened years ago, and later on the matter came up and people thought a similar misfortune had taken place again."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[similarity]] | noun | **1.** The quality of being similar.<br>**2.** A gestalt principle of organization holding that (other things being equal) parts of a stimulus field that are similar to each other tend to be perceived as belonging together as a unit. | *"It was, perhaps, one of those cases in which advice is good or bad only as the event decides; and for myself, I certainly never should, in any circumstance of tolerable similarity, give such advice."* — Jane Austen, *Persuasion* |
| [[similarly]] | adverb | **1.** In like or similar manner; ; - samuel johnson. | *"Thus night pursues its leaden course, finding the court still out of bed through the unwonted hours, still treating and being treated, still conducting itself similarly to a court that has had a little money left it unexpectedly."* — Charles Dickens, *Bleak House* |
| [[simile]] | noun | **1.** A figure of speech that expresses a resemblance between things of different kinds (usually formed with `like' or `as'). | *"A good swift simile, but something currish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[similitude]] | noun | **1.** Similarity in appearance or character or nature between persons or things.<br>**2.** A duplicate copy. | *"Thus, the sperm whale and the humpbacked whale, each has a hump; but there the similitude ceases."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unsimilarity]] | noun | **1.** The quality of being dissimilar. | *"In academic literature, unsimilarity designates the quality of being dissimilar."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SIMI
  </div>
</div>
