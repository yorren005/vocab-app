---
status: unread
type: root_dashboard
---
# Dashboard — chlor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">χλωρός (khlōrós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“green”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'green'.</span>
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

The Greek root **chlor** (χλωρός (khlōrós)) signifies green. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *chlor*, *chloranthy*, *chlorine*, *chlorophobia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: green
> The Greek root **chlor** fundamentally denotes **green**. The physical sensory observation and cognitive anchor underlying 'green'. In classical Greek antiquity, the root denoted 'green', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">green</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'green'.</mark>
> - **Everyday Connection**: Think of familiar words like *chlor*, *chloranthy*, *chlorine*, *chlorophobia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **chlor** derives from Ancient Greek <mark class="hl-stem">χλωρός (khlōrós)</mark>, meaning "green".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with chlor**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'green'.
  - Whenever you see **chlor** in an English word, think immediately of **green**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">chlor</mark>, think of <mark class="hl-def">green</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `chlor-` (from *χλωρός (khlōrós)*).
> - **Combining Stem with -o- Connective:** `chloro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Chlor
> - **1. Direct & Concrete Anchor:** Literal instantiation of green in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on chlor

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `chlor-` | [[chlor]] | Primary root semantic foundation denoting green. |
| **Connecting -o-** | `chloro-` | [[chloranthy]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `chlor` | [[chlorine]] | Relational or directional modification of the core root sense. |

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
| [[chlor]] | combining form | **1.** green.<br>**2.** chlorine : containing chlorine. | *"Classical and authoritative lexicons catalog chlor as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorambucil]] | noun | **1.** An alkalating agent (trade name leukeran) used to treat some kinds of cancer. | *"In academic literature, chlorambucil designates an alkalating agent (trade name leukeran) used to treat some kinds of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloramine]] | noun | **1.** Any of several compounds containing chlorine and nitrogen; used as an antiseptic in wounds. | *"In academic literature, chloramine designates any of several compounds containing chlorine and nitrogen; used as an antiseptic in wounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloramine-t]] | noun | **1.** Any of several compounds containing chlorine and nitrogen; used as an antiseptic in wounds. | *"In academic literature, chloramine-t designates any of several compounds containing chlorine and nitrogen; used as an antiseptic in wounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloramphenicol]] | noun | **1.** An oral antibiotic (trade name chloromycetin) used to treat serious infections (especially typhoid fever). | *"In academic literature, chloramphenicol designates an oral antibiotic (trade name chloromycetin) used to treat serious infections (especially typhoid fever)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloranthaceae]] | noun | **1.** Small family of tropical herbs and shrubs and trees. | *"In academic literature, chloranthaceae designates small family of tropical herbs and shrubs and trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloranthus]] | noun | **1.** Type genus of the chloranthaceae. | *"In academic literature, chloranthus designates type genus of the chloranthaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloranthy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chlor.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, chloranthy designates a term designating an entity, condition, or phenomenon derived from greek chlor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorate]] | noun | **1.** Any salt of chloric acid. | *"Would he obtain air by chemical means, in getting by heat the oxygen contained in chlorate of potash, and in absorbing carbonic acid by caustic potash?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[chlorella]] | noun | **1.** Any alga of the genus chlorella. | *"In academic literature, chlorella designates any alga of the genus chlorella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorenchyma]] | noun | **1.** Parenchyma whose cells contain chloroplasts. | *"In academic literature, chlorenchyma designates parenchyma whose cells contain chloroplasts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloride]] | noun | **1.** Any compound containing a chlorine atom.<br>**2.** Any salt of hydrochloric acid (containing the chloride ion). | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[chlorinate]] | verb | **1.** Treat or combine with chlorine.<br>**2.** Disinfect with chlorine. | *"In academic literature, chlorinate designates treat or combine with chlorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorination]] | noun | **1.** The addition or substitution of chlorine in organic compounds.<br>**2.** Disinfection of water by the addition of small amounts of chlorine or a chlorine compound. | *"In academic literature, chlorination designates the addition or substitution of chlorine in organic compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorine]] | noun | **1.** A halogen element that is isolated as a heavy greenish-yellow diatomic gas of pungent odor and is used especially as a bleach, oxidizing agent, and disinfectant in water purification.<br>**2.** A heavy reddish-yellow gas ClO2 used especially as a bleach and disinfectant. | *"Here I have a metal called antimony, which is easily acted upon by chlorine."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[chlorinity]] | noun | **1.** A measure of the quantity of chlorine or other halides in water (especially seawater). | *"In academic literature, chlorinity designates a measure of the quantity of chlorine or other halides in water (especially seawater)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloris]] | noun | **1.** Tufted or perennial or annual grasses having runners: finger grass; windmill grass. | *"On Chloris Requesting me to give her a Spring of Blossomed Thorn."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[chlorite]] | noun | **1.** A generally green or black mineral; it occurs as a constituent of many rocks typically in the form of a flat crystal. | *"In academic literature, chlorite designates a generally green or black mineral; it occurs as a constituent of many rocks typically in the form of a flat crystal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroacetophenone]] | noun | **1.** A tear gas that is weaker than cs gas but lasts longer. | *"In academic literature, chloroacetophenone designates a tear gas that is weaker than cs gas but lasts longer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorobenzene]] | noun | **1.** A colorless volatile flammable liquid with an almond odor that is made from chlorine and benzene; used as a solvent and in the production of phenol and ddt and other organic compounds. | *"In academic literature, chlorobenzene designates a colorless volatile flammable liquid with an almond odor that is made from chlorine and benzene; used as a solvent and in the production of phenol and ddt and other organic compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorobenzylidenemalononitrile]] | noun | **1.** A tear gas that is stronger than cn gas but wears off faster; can be deployed by grenades or cluster bombs; can cause skin burns and fatal pulmonary edema. | *"In academic literature, chlorobenzylidenemalononitrile designates a tear gas that is stronger than cn gas but wears off faster; can be deployed by grenades or cluster bombs; can cause skin burns and fatal pulmonary edema."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorococcales]] | noun | **1.** Unicellular green algae that reproduce by spores. | *"In academic literature, chlorococcales designates unicellular green algae that reproduce by spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorococcum]] | noun | **1.** Type genus of chlorococcales; unicellular green algae occurring singly or in a layer on soil or damp rock. | *"In academic literature, chlorococcum designates type genus of chlorococcales; unicellular green algae occurring singly or in a layer on soil or damp rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorofluorocarbon]] | noun | **1.** A fluorocarbon with chlorine; formerly used as a refrigerant and as a propellant in aerosol cans. | *"In academic literature, chlorofluorocarbon designates a fluorocarbon with chlorine; formerly used as a refrigerant and as a propellant in aerosol cans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroform]] | noun | **1.** A volatile liquid haloform (chcl3); formerly used as an anesthetic.<br>**2.** Anesthetize with chloroform. | *"M., of the 3rd of July, she left Washington carrying only some chloroform and a few stimulants, reached Westminster at four A."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[chlorofucin]] | noun | **1.** The chlorophyll present in brown algae, diatoms, and flagellates. | *"In academic literature, chlorofucin designates the chlorophyll present in brown algae, diatoms, and flagellates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloromycetin]] | noun | **1.** An oral antibiotic (trade name chloromycetin) used to treat serious infections (especially typhoid fever). | *"In academic literature, chloromycetin designates an oral antibiotic (trade name chloromycetin) used to treat serious infections (especially typhoid fever)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophis]] | noun | **1.** African green snakes. | *"In academic literature, chlorophis designates african green snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chlor.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, chlorophobia designates a term designating an entity, condition, or phenomenon derived from greek chlor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophoneus]] | noun | **1.** A genus of malaconotinae. | *"In academic literature, chlorophoneus designates a genus of malaconotinae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophthalmidae]] | noun | **1.** Small family of soft-finned bottom-dwellers with large eyes; relatives of lizardfishes. | *"In academic literature, chlorophthalmidae designates small family of soft-finned bottom-dwellers with large eyes; relatives of lizardfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyceae]] | noun | **1.** Algae distinguished chiefly by having flagella and a clear green color, their chlorophyll being masked little if at all by other pigments. | *"In academic literature, chlorophyceae designates algae distinguished chiefly by having flagella and a clear green color, their chlorophyll being masked little if at all by other pigments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyl]] | noun | **1.** Any of a group of green pigments found in photosynthetic organisms; there are four naturally occurring forms. | *"In academic literature, chlorophyl designates any of a group of green pigments found in photosynthetic organisms; there are four naturally occurring forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyll]] | noun | **1.** The green photosynthetic pigment found chiefly in the chloroplasts of plants and occurring especially as a blue-black ester C55H72MgN4O5 or a dark green ester C55H70MgN4O6 —called also respectively chlorophyll a, chlorophyll b.<br>**2.** A waxy green chlorophyll-containing substance extracted from green plants and used as a coloring agent or deodorant. | *"In academic literature, chlorophyll designates the green photosynthetic pigment found chiefly in the chloroplasts of plants and occurring especially as a blue-black ester c55h72mgn4o5 or a dark green ester c55h70mgn4o6 —called also respectively chlorophyll a, chlorophyll b."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyllose]] | adjective | **1.** Relating to or being or containing chlorophyll. | *"In academic literature, chlorophyllose designates relating to or being or containing chlorophyll."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyllous]] | adjective | **1.** Relating to or being or containing chlorophyll. | *"In academic literature, chlorophyllous designates relating to or being or containing chlorophyll."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyta]] | noun | **1.** Large division of chiefly freshwater eukaryotic algae that possess chlorophyll a and b, store food as starch, and cellulose cell walls; classes chlorophyceae, ulvophyceae, and charophyceae; obviously ancestral to land plants. | *"In academic literature, chlorophyta designates large division of chiefly freshwater eukaryotic algae that possess chlorophyll a and b, store food as starch, and cellulose cell walls; classes chlorophyceae, ulvophyceae, and charophyceae; obviously ancestral to land plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorophyte]] | noun | **1.** Algae that are clear green in color; often growing on wet ricks or damp wood or the surface of stagnant water. | *"In academic literature, chlorophyte designates algae that are clear green in color; often growing on wet ricks or damp wood or the surface of stagnant water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloropicrin]] | noun | **1.** A heavy colorless insoluble liquid compound that causes tears and vomiting; used as a pesticide and as tear gas. | *"In academic literature, chloropicrin designates a heavy colorless insoluble liquid compound that causes tears and vomiting; used as a pesticide and as tear gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroplast]] | noun | **1.** A plastid that contains chlorophyll and is the site of photosynthesis. | *"In academic literature, chloroplast designates a plastid that contains chlorophyll and is the site of photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroprene]] | noun | **1.** Derivative of butadiene used in making neoprene by polymerization. | *"In academic literature, chloroprene designates derivative of butadiene used in making neoprene by polymerization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroquine]] | noun | **1.** An antimalarial drug used to treat malaria and amebic dysentery and systemic lupus erythematosus. | *"In academic literature, chloroquine designates an antimalarial drug used to treat malaria and amebic dysentery and systemic lupus erythematosus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorosis]] | noun | **1.** Iron deficiency anemia in young women; characterized by weakness and menstrual disturbances and a green color to the skin. | *"In academic literature, chlorosis designates iron deficiency anemia in young women; characterized by weakness and menstrual disturbances and a green color to the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorothiazide]] | noun | **1.** A diuretic drug (trade name diuril) used in the treatment of edema and hypertension. | *"In academic literature, chlorothiazide designates a diuretic drug (trade name diuril) used in the treatment of edema and hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorotic]] | adjective | **1.** Of or pertaining to or suffering from chlorosis. | *"In academic literature, chlorotic designates of or pertaining to or suffering from chlorosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chloroxylon]] | noun | **1.** Deciduous trees of india and sri lanka. | *"In academic literature, chloroxylon designates deciduous trees of india and sri lanka."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlortetracycline]] | noun | **1.** A yellow crystalline antibiotic (trade name aureomycin) used to treat certain bacterial and rickettsial diseases. | *"In academic literature, chlortetracycline designates a yellow crystalline antibiotic (trade name aureomycin) used to treat certain bacterial and rickettsial diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorthalidone]] | noun | **1.** A diuretic (trade names hygroton and thalidone) used to control hypertension and conditions that cause edema; effective in lowering blood pressure to prevent heart attacks. | *"In academic literature, chlorthalidone designates a diuretic (trade names hygroton and thalidone) used to control hypertension and conditions that cause edema; effective in lowering blood pressure to prevent heart attacks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chlorura]] | noun | **1.** Towhees. | *"Classical and authoritative lexicons catalog chlorura as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dechlorinate]] | verb | **1.** Remove chlorine from (water). | *"In academic literature, dechlorinate designates remove chlorine from (water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypochlorite]] | noun | **1.** Any salt or ester of hypochlorous acid. | *"In academic literature, hypochlorite designates any salt or ester of hypochlorous acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pyrochlore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chlor.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, pyrochlore designates a term designating an entity, condition, or phenomenon derived from greek chlor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichloride]] | noun | **1.** Any compound containing three chlorine atoms in each molecule. | *"In academic literature, trichloride designates any compound containing three chlorine atoms in each molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichlormethiazide]] | noun | **1.** Diuretic drug (trade name naqua) used to treat hypertension. | *"In academic literature, trichlormethiazide designates diuretic drug (trade name naqua) used to treat hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichloroethane]] | noun | **1.** A heavy colorless highly toxic liquid used as a solvent to clean electronic components and for dry cleaning and as a fumigant; causes cancer and liver and lung damage. | *"In academic literature, trichloroethane designates a heavy colorless highly toxic liquid used as a solvent to clean electronic components and for dry cleaning and as a fumigant; causes cancer and liver and lung damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichloroethylene]] | noun | **1.** A heavy colorless highly toxic liquid used as a solvent to clean electronic components and for dry cleaning and as a fumigant; causes cancer and liver and lung damage. | *"In academic literature, trichloroethylene designates a heavy colorless highly toxic liquid used as a solvent to clean electronic components and for dry cleaning and as a fumigant; causes cancer and liver and lung damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichloromethane]] | noun | **1.** A volatile liquid haloform (chcl3); formerly used as an anesthetic. | *"In academic literature, trichloromethane designates a volatile liquid haloform (chcl3); formerly used as an anesthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light & Vision]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CHLOR
  </div>
</div>
