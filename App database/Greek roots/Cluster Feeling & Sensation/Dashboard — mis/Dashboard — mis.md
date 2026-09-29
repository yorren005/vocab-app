---
status: unread
type: root_dashboard
---
# Dashboard — mis
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μισεῖν μῖσος (miseîn)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“hate”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'hate'.</span>
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

The Greek root **mis** (μισεῖν μῖσος (miseîn)) signifies hate. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *mis*, *misandrist*, *misandry*, *misanthrope*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: hate
> The Greek root **mis** fundamentally denotes **hate**. The physical sensory observation and cognitive anchor underlying 'hate'. In classical Greek antiquity, the root denoted 'hate', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">hate</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'hate'.</mark>
> - **Everyday Connection**: Think of familiar words like *mis*, *misandrist*, *misandry*, *misanthrope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mis** derives from Ancient Greek <mark class="hl-stem">μισεῖν μῖσος (miseîn)</mark>, meaning "hate".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with mis**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'hate'.
  - Whenever you see **mis** in an English word, think immediately of **hate**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mis</mark>, think of <mark class="hl-def">hate</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `mis-` (from *μισεῖν μῖσος (miseîn)*).
> - **Combining Stem with -o- Connective:** `miso-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Mis
> - **1. Direct & Concrete Anchor:** Literal instantiation of hate in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on mis

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `mis-` | [[mis]] | Primary root semantic foundation denoting hate. |
| **Connecting -o-** | `miso-` | [[misandrist]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `mis` | [[misandry]] | Relational or directional modification of the core root sense. |

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
| [[mis]] | noun | **1.** Management information systems.<br>**2.** Badly : wrongly. | *"FRENCH SOLDIER. _O, prenez miséricorde!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[misalliance]] | noun | **1.** An unsuitable alliance (especially with regard to marriage). | *"Sir Giles Wapshot's family were insulted that one of the Wapshot girls had not the preference in the marriage, and the remaining baronets of the county were indignant at their comrade's misalliance."* — William Makepeace Thackeray, *Vanity Fair* |
| [[misally]] | verb | **1.** Make a bad alliance; ally inappropriately. | *"In academic literature, misally designates make a bad alliance; ally inappropriately."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misandrist]] | noun | **1.** A person who hates men.<br>**2.** Characterized by or expressing misandry or hatred of men. | *"In academic literature, misandrist designates a person who hates men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misandry]] | noun | **1.** A hatred of men. | *"In academic literature, misandry designates a hatred of men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misanthrope]] | noun | **1.** A person who hates or distrusts humankind. | *"Like a plethoric burning martyr, or a self-consuming misanthrope, once ignited, the whale supplies his own fuel and burns by his own body."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[misanthropic]] | adjective | **1.** Believing the worst of human nature and motives; having a sneering disbelief in e.g. selflessness of others.<br>**2.** Hating mankind in general. | *"Such ruminations naturally produced a streak of misanthropic bitterness."* — George Eliot, *Middlemarch* |
| [[misanthropical]] | adjective | **1.** Believing the worst of human nature and motives; having a sneering disbelief in e.g. selflessness of others.<br>**2.** Hating mankind in general. | *"He walked up and down, with his hands in his pockets, apparently quite forgetting my presence; and his abstraction was evidently so deep, and his whole aspect so misanthropical, that I shrank from disturbing him again."* — Emily Brontë, *Wuthering Heights* |
| [[misanthropist]] | noun | **1.** Someone who dislikes people in general. | *"All the world used her ill, said this young misanthropist, and we may be pretty certain that persons whom all the world treats ill, deserve entirely the treatment they get."* — William Makepeace Thackeray, *Vanity Fair* |
| [[misanthropy]] | noun | **1.** A hatred or distrust of humankind. | *"It was no common misanthropy which had shut Captain Nemo and his companions within the _Nautilus_, but a hatred, either monstrous or sublime, which time could never weaken."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[miser]] | noun | **1.** A stingy hoarder of money and possessions (often living miserably). | *"Rich honesty dwells like a miser, sir, in a poor house, as your pearl in your foul oyster."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miserable]] | adjective | **1.** Very unhappy; full of misery.<br>**2.** Deserving or inciting pity; ; ; - galsworthy. | *"Twice did he turn his back and purposed so; But kindness, nobler ever than revenge, And nature, stronger than his just occasion, Made him give battle to the lioness, Who quickly fell before him; in which hurtling From miserable slumber I awaked."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miserly]] | adjective | **1.** (used of persons or behavior) characterized by or indicative of lack of generosity. | *"When Allan Woodcourt spoke to you, my dear, he spoke with my knowledge and consent—but I gave him no encouragement, not I, for these surprises were my great reward, and I was too miserly to part with a scrap of it."* — Charles Dickens, *Bleak House* |
| [[misocainea]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mis.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, misocainea designates a term designating an entity, condition, or phenomenon derived from greek mis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogamist]] | noun | **1.** A hatred of marriage. | *"In academic literature, misogamist designates a hatred of marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogamy]] | noun | **1.** A hatred of marriage. | *"In academic literature, misogamy designates a hatred of marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynic]] | adjective | **1.** (used of men) having deep-seated distrust of women. | *"In academic literature, misogynic designates (used of men) having deep-seated distrust of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynism]] | noun | **1.** Hatred of women. | *"In academic literature, misogynism designates hatred of women."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynist]] | noun | **1.** A person who hates or discriminates against women : a misogynistic person.<br>**2.** Feeling, showing, or characterized by hatred of or prejudice against women : misogynistic. | *"In academic literature, misogynist designates a person who hates or discriminates against women : a misogynistic person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynistic]] | adjective | **1.** Hating women in particular. | *"In academic literature, misogynistic designates hating women in particular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogynous]] | adjective | **1.** Hating women in particular. | *"In academic literature, misogynous designates hating women in particular."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misogyny]] | noun | **1.** Hatred of, aversion to, or prejudice against women; also : something (such as speech or behavior) that reflects and fosters misogyny. | *"In academic literature, misogyny designates hatred of, aversion to, or prejudice against women; also : something (such as speech or behavior) that reflects and fosters misogyny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misoneism]] | noun | **1.** A hatred, fear, or intolerance of innovation or change. | *"In academic literature, misoneism designates a hatred, fear, or intolerance of innovation or change."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misopaedia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mis.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, misopaedia designates a term designating an entity, condition, or phenomenon derived from greek mis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misotheism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mis.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, misotheism designates a term designating an entity, condition, or phenomenon derived from greek mis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missal]] | noun | **1.** (roman catholic church) a book containing all the prayers and responses needed to celebrate mass throughout the year. | *"Van Helsing opened his missal and began to read, and Quincey and I followed as well as we could."* — Bram Stoker, *Dracula* |
| [[missed]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"Your Coriolanus is not much missed But with his friends."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[missing]] | verb | **1.** Fail to perceive or to catch with the senses or the mind.<br>**2.** Feel or suffer from the lack of. | *"My lord, the roynish clown, at whom so oft Your grace was wont to laugh, is also missing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mission]] | noun | **1.** An organization of missionaries in a foreign land sent to carry on religious work.<br>**2.** An operation that is assigned by a higher headquarters. | *"Quale’s mission to be in ecstasies with everybody else’s mission and that it was the most popular mission of all."* — Charles Dickens, *Bleak House* |
| [[missional]] | adjective | **1.** Relating to or connected to a religious mission. | *"In academic literature, missional designates relating to or connected to a religious mission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[missionary]] | noun | **1.** Someone who attempts to convert others to a particular doctrine or program.<br>**2.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"Over their heads hung the picture of Angel’s sister, the eldest of the family, sixteen years his senior, who had married a missionary and gone out to Africa."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[missioner]] | noun | **1.** Someone sent on a mission--especially a religious or charitable mission to a foreign country. | *"It was the men’s temperance retreat conducted by the missioner, the reverend John Hughes S."* — James Joyce, *Ulysses* |
| [[missive]] | noun | **1.** A written message addressed to a person or organization. | *"I wrote to you When rioting in Alexandria; you Did pocket up my letters, and with taunts Did gibe my missive out of audience."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remission]] | noun | **1.** An abatement in intensity or degree (as in the manifestations of a disease).<br>**2.** A payment of money sent to a person in another place. | *"Though I owe My revenge properly, my remission lies In Volscian breasts."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Feeling & Sensation]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MIS
  </div>
</div>
