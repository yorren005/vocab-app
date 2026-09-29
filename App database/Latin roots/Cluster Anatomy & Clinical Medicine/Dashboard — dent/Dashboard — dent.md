---
status: unread
type: root_dashboard
---
# Dashboard — dent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“tooth”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The natural organs, tissues, and inner workings of the human body.</span>
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

The root **dent** means tooth. It refers to the hard structures in the mouth used for biting or chewing. In English, this root forms words such as *dental*, *dentist*, *dentistry*, and *denture*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: tooth
> The root **dent** means tooth. It refers to the hard structures in the mouth used for biting or chewing. In English, this root forms words such as *dental*, *dentist*, *dentistry*, and *denture*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Tooth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *dental* and *dentist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dent** comes from a Latin word that means *"tooth"*.
  - At its core, it describes tooth.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **dent** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of tooth.
  - **Mental & Social**: How people experience, organize, or communicate about tooth.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Dental**: Of, relating to, or for the teeth or dentistry.
  - **Dentist**: A licensed medical professional qualified to diagnose, treat, and prevent diseases and conditions of the oral cavity and teeth.
  - **Dentistry**: The art, science, and profession concerned with the maintenance of oral health and treatment of dental diseases.
  - **Denture**: An artificial replacement for one or more teeth.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dent</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **dent** forms English vocabulary through nominal, adjectival, and prefix combinations:
> 
> ### 1. Primary Base Formations (*dent-*)
> - *dens* + *-ālis* → [[dental]] (adjective), `dentally` (adverb).
> - *dens* + French *-iste* → [[dentist]] (noun), [[dentistry]] (noun).
> - *dens* + *-ūra* → [[denture]] (noun, set of artificial teeth).
> - *dens* + *-īna* → [[dentin]] / `dentine` (noun, calcified tooth tissue).
> - *dens* + *-atus* → [[dentate]] (adjective, toothed).
> - *dens* + *fricāre* ("to rub") → [[dentifrice]] (noun, tooth cleaning paste/powder).
> - *dens* + *-itiō* → [[dentition]] (noun, tooth arrangement or eruption).
> 
> ### 2. Prefix & Numerical Compounds
> - **`in-` (into, upon):**
>   - *in-* + *dens* → Medieval Latin *indentāre* → [[indent]] (verb & noun), [[indentation]] (noun), [[indenture]] (noun & verb).
> - **`tri-` (three):**
>   - *trēs* + *dens* → Latin *tridens* → [[trident]] (three-pronged spear).
> - **`bi-` (two):**
>   - *bis* + *dens* → `bidentate` (having two teeth or prongs).
> - **`e-` / `ex-` (out of, lacking):**
>   - *e-* + *dens* + *-ulus* → [[edentulous]] (toothless).
>   - *e-* + *dens* + *-ate* → `edentate` (mammal lacking anterior teeth).
> 
> ### 3. Diminutive Forms (*denticul-*)
> - *denticulus* → [[denticle]] (noun, small tooth or placoid scale), `denticulate` (adjective).
> 
> ### 4. Romance Animal Metaphor
> - Old French *dent de lion* ("lion's tooth", from jagged leaves) → [[dandelion]] (noun).

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
> Although the root fundamentally denotes **"tooth"**, its semantic realization radiates across wide disciplinary spectra:
> - **Clinical Dentistry & Oral Health:** In [[dental]], [[dentist]], [[dentistry]], [[denture]], [[dentifrice]], and [[dentin]], it governs the diagnosis, hygiene, restoration, and tissue composition of the teeth.
> - **Law, Contracts & Typography:** In [[indent]], [[indentation]], and [[indenture]], it describes indenting paragraphs, jagged margins, and legally binding apprentice or labor contracts.
> - **Morphology, Botany & Zoology:** In [[dentate]], `denticle`, `denticulate`, [[dentition]], `bidentate`, and `edentate`, it classifies toothed leaf margins, shark placoid scales, and dental formulas.
> - **Mythology & Maritime Warfare:** In [[trident]], it names the mythological weapon of Neptune and modern submarine-launched ballistic missiles.
> - **Botany & Vernacular Floristics:** In [[dandelion]], it names the common yellow weed with sharply serrated lion-tooth foliage.

---

## 🔀 4. Prefix & Combining Dynamics on dent

| Prefix / Element | Component Meaning | Derived English Word | Modern Semantic Function |
| :--- | :--- | :--- | :--- |
| `in-` (into) | *indentāre* (to notch like teeth) | [[indent]] / [[indenture]] | To set back a line of text; to bind by a notched contract. |
| `tri-` (three) | *tridens* (three-toothed) | [[trident]] | A three-pronged fishing spear; weapon of Neptune. |
| `bi-` (two) | *bidentātus* (two-toothed) | `bidentate` | Having two tooth-like projections or ligand binding points. |
| `e-` / `ex-` (without) | *ēdentulus* (toothless) | [[edentulous]] | Having lost natural teeth; toothless jaw ridge. |
| `multi-` (many) | *multidentātus* | `multidentate` | Having multiple teeth or coordinating electron donors. |
| `-fric-` (to rub) | *dentifricium* | [[dentifrice]] | Paste, gel, or powder rubbed on teeth for cleaning. |
| `-lion` (lion) | OF *dent de lion* | [[dandelion]] | Composite plant named for its deeply serrated leaves. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🦷 **Clinical Dentistry & Prosthetics** | [[dental]], [[dentist]], [[denture]], [[dentin]], [[dentifrice]] | Endodontic root canals, dental caries, acrylic full dentures, remineralizing toothpastes |
| 📜 **Legal History & Labor Law** | [[indenture]], [[indent]] | Historical indentured servitude, bond indenture covenants in municipal finance |
| 🌿 **Botany & Taxonomy** | [[dentate]], `denticulate`, [[dandelion]] | Botanical leaf margin keys (serrate vs. dentate vs. crenate); lion's tooth foliage |
| 🦈 **Marine Zoology & Paleontology** | `denticle`, [[dentition]], [[trident]], `edentate` | Shark dermal denticles reducing drag; mammalian dental formula identification in fossils |
| 🖥️ **Typography & Document Formatting** | [[indent]], [[indentation]] | First-line paragraph indents, hanging indents, code indentation in syntax parsers |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[dent]] | noun | **1.** An appreciable consequence (especially a lessening).<br>**2.** A depression scratched or carved into a surface. | *"Colonel Dent was less showy; but, I thought, more lady-like."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[dental]] | noun | **1.** A consonant articulated with the tip of the tongue near the gum ridge.<br>**2.** Of or relating to the teeth. | *"He took a reel of dental floss from his waistcoat pocket and, breaking off a piece, twanged it smartly between two and two of his resonant unwashed teeth. —Bingbang, bangbang."* — James Joyce, *Ulysses* |
| [[dentate]] | adjective | **1.** Having toothlike projections in the margin. | *"In academic literature, dentate designates having toothlike projections in the margin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dented]] | verb | **1.** Make a depression into.<br>**2.** Of metal e.g. | *"How I snuffed that Tartar air!—how I spurned that turnpike earth!—that common highway all over dented with the marks of slavish heels and hoofs; and turned me to admire the magnanimity of the sea which will permit no records."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[dentifrice]] | noun | **1.** A substance for cleaning the teeth; applied with a toothbrush. | *"In academic literature, dentifrice designates a substance for cleaning the teeth; applied with a toothbrush."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dentist]] | noun | **1.** A person qualified to practice dentistry. | *"He cherished an extraordinary belief in the virtues of “shorts” as a disguise, and had in his own mind sketched a dress for himself that would have made him something between a dean and a dentist."* — Charles Dickens, *Great Expectations* |
| [[dentistry]] | noun | **1.** The branch of medicine dealing with the anatomy and development and diseases of the teeth. | *"The several uses of gold are constantly competing for it: its uses for rings, pens, ornaments, championship cups, photography, dentistry, delicate instruments, and as a circulating medium."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[dentition]] | noun | **1.** The eruption through the gums of baby teeth.<br>**2.** The kind and number and arrangement of teeth (collectively) in a person or animal. | *"In academic literature, dentition designates the eruption through the gums of baby teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denture]] | noun | **1.** A dental appliance that artificially replaces missing teeth. | *"In academic literature, denture designates a dental appliance that artificially replaces missing teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edental]] | adjective | **1.** Having few if any teeth. | *"In academic literature, edental designates having few if any teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[edentate]] | noun | **1.** Primitive terrestrial mammal with few if any teeth; of tropical central america and south america.<br>**2.** Having few if any teeth. | *"In academic literature, edentate designates primitive terrestrial mammal with few if any teeth; of tropical central america and south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indent]] | noun | **1.** An order for goods to be exported or imported.<br>**2.** The space left between the margin and the start of an indented line. | *"Shall we buy treason and indent with fears When they have lost and forfeited themselves?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indenture]] | noun | **1.** A concave cut into a surface or edge (as in a coastline).<br>**2.** Formal agreement between the issuer of bonds and the bondholders as to terms of the debt. | *"But, Francis, darest thou be so valiant as to play the coward with thy indenture, and show it a fair pair of heels, and run from it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[indentured]] | verb | **1.** Bind by or as if by indentures, as of an apprentice or servant.<br>**2.** Bound by contract. | *"In academic literature, indentured designates bind by or as if by indentures, as of an apprentice or servant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rodent]] | noun | **1.** Relatively small placental mammals having a single pair of constantly growing incisor teeth specialized for gnawing. | *"They moan, passing upon the clouds, horned and capricorned, the trumpeted with the tusked, the lionmaned, the giantantlered, snouter and crawler, rodent, ruminant and pachyderm, all their moving moaning multitude, murderers of the sun."* — James Joyce, *Ulysses* |
| [[trident]] | noun | **1.** A spear with three prongs. | *"He would not flatter Neptune for his trident Or Jove for’s power to thunder."* — William Shakespeare, *The Complete Works of William Shakespeare* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Anatomy & Clinical Medicine]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DENT
  </div>
</div>
