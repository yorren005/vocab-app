---
status: unread
type: root_dashboard
---
# Dashboard — mamm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mamm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“breast”</span>
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

The root **mamm** means breast. It refers to breast, teat, udder, milk-secreting gland, mammalian class. In English, this root forms words such as *teat*, *mammal*, *mammalian*, and *mammary*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: breast
> The root **mamm** means breast. It refers to breast, teat, udder, milk-secreting gland, mammalian class. In English, this root forms words such as *teat*, *mammal*, *mammalian*, and *mammary*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Breast</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *teat* and *mammal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mamm** comes from a Latin word that means *"breast"*.
  - At its core, it describes breast.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **mamm** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of breast.
  - **Mental & Social**: How people experience, organize, or communicate about breast.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Teat**: An everyday English word showing the root's idea of *breast*.
  - **Mammal**: Any of a class of warm-blooded higher vertebrates that nourish their young with milk secreted by mammary glands, have skin more or less covered with hair, and possess three middle ear bones.
  - **Mammalian**: Of, relating to, or characteristic of mammals.
  - **Mammary**: Of or relating to the breasts, udders, or milk-secreting glands.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mamm</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mamm** generates English terms across classical taxonomy, radiology, and anatomical modeling:
> 
> ### 1. Linnaean Taxonomic Formations
> - *mamma* + *-ālis* → *mammalis* → `mammalia` (class) → [[mammal]] (noun), [[mammalian]] (adjective & noun).
> 
> ### 2. Anatomical Suffix Formations
> - *mamma* + *-ārius* → [[mammary]] (adjective, of the breasts/glands).
> - *mamma* + *-ātus* → `mammate` (adjective, having breasts).
> 
> ### 3. Diminutive Forms (*mammill-*)
> - *mamma* + diminutive *-illa* → *mammilla* ("nipple, papilla").
> - *mammilla* + *-āris* → [[mammillary]] (adjective, nipple-shaped).
> - *mammilla* + *-ātus* → `mammillate` / `mammillated` (adjective, studded with rounded knobs).
> - *Mammillaria* (genus of pincushion cacti covered in nipple-like tubercles).
> 
> ### 4. Radiographic & Surgical Compounds
> - *mamma* + Greek *-gramma* ("record, writing") → [[mammogram]] (radiographic image).
> - *mamma* + Greek *-graphē* ("process of imaging") → [[mammography]] (imaging examination).
> - *mammography* + *-ic* → `mammographic` (adjective).
> - *mamma* + Greek *-plastīa* ("surgical shaping") → [[mammoplasty]] (breast plastic surgery).

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
> Although the root fundamentally denotes **"the breast and milk gland"**, its modern application spans distinct branches:
> - **Evolutionary & Systematic Zoology:** In [[mammal]] and [[mammalian]], it encompasses all 6,400+ living species—from the duck-billed platypus and blue whale to human beings—united by mammary glands, neocortex, and hair.
> - **Diagnostic Radiology & Preventative Medicine:** In [[mammogram]], [[mammography]], and `mammographic`, it describes digital tomosynthesis and X-ray screening protocols essential for early detection of breast carcinoma.
> - **Plastic & Reconstructive Surgery:** In [[mammoplasty]], it encompasses augmentation, reduction, and flap reconstruction following mastectomy.
> - **Neuroanatomy & Cognitive Memory:** In [[mammillary]], it designates the paired mammillary bodies (*corpora mamillaria*) of the hypothalamus, crucial relay centers in the limbic circuit of Papez for recollective memory.
> - **Botany & Mineralogy:** In `Mammillaria` and `mammillated`, it describes globular cacti and rounded botryoidal mineral deposits resembling nipples.

---

## 🔀 4. Prefix & Combining Dynamics on mamm

| Suffix / Combining Form | Grammatical Function | Derived Word | Conceptual Result |
| :--- | :--- | :--- | :--- |
| `-al` (*-ālis*) | Noun (taxonomic class) | [[mammal]] | A warm-blooded vertebrate that nurses young with milk. |
| `-ian` | Adjective / Noun | [[mammalian]] | Characteristic of or belonging to the class Mammalia. |
| `-ary` (*-ārius*) | Adjective (pertaining to) | [[mammary]] | Of or relating to the breast or milk-producing glands. |
| `-gram` | Gk. noun (image/record) | [[mammogram]] | A diagnostic X-ray photograph of the breast. |
| `-graphy` | Gk. noun (imaging process) | [[mammography]] | The radiographic procedure used to screen breast tissue. |
| `-plasty` | Gk. noun (surgical molding) | [[mammoplasty]] | Plastic or reconstructive surgery performed on the breast. |
| `-illary` | Lat. diminutive + *-aris* | [[mammillary]] | Resembling a nipple or breast; hypothalamic structures. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🦁 **Evolutionary Biology & Zoology** | [[mammal]], `mammalia`, [[mammalian]] | Monotremes vs. marsupials vs. placentals; lactation evolution from ancestral apocrine sweat glands |
| 🩺 **Oncology & Diagnostic Radiology** | [[mammogram]], [[mammography]], `mammographic` | BI-RADS diagnostic scoring, annual screening guidelines, digital breast tomosynthesis (3D mammography) |
| 🧠 **Neuroscience & Neuroanatomy** | [[mammillary]] | Mammillary bodies, Korsakoff syndrome (thiamine deficiency memory loss), fornix axonal projections |
| ✂️ **Plastic & Reconstructive Surgery** | [[mammoplasty]] | Deep inferior epigastric perforator (DIEP) flap reconstruction, reduction mammoplasty, implant placement |
| 🌵 **Botanical Taxonomy** | `Mammillaria`, `mammillate` | Identification of desert cacti displaying spiral rows of nipple-like areole tubercles |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[mamma]] | noun | **1.** Informal terms for a mother.<br>**2.** Milk-secreting organ of female mammals. | *"Nobody doubts her right to have precedence of mamma, but it would be more becoming in her not to be always insisting on it."* — Jane Austen, *Persuasion* |
| [[mammal]] | noun | **1.** Any warm-blooded vertebrate having the skin more or less covered with hair; young are born alive except for the small subclass of monotremes and nourished with milk. | *"I admired this curious mammal, with its rounded head ornamented with short ears, its round eyes, and white whiskers like those of a cat, with webbed feet and nails, and tufted tail."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[mammalia]] | noun | **1.** Warm-blooded vertebrates characterized by mammary glands in the female. | *"I concluded definitely that it belonged to the vertebrate branch, class mammalia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[mammalian]] | noun | **1.** Any warm-blooded vertebrate having the skin more or less covered with hair; young are born alive except for the small subclass of monotremes and nourished with milk.<br>**2.** Of or relating to the class mammalia. | *"Following close upon the Reptilian came the Mammalian age, and I hold that with the largest of the mammals came man, rude in tastes and uncouth in form, but even then ruling as king of the animal creation."* — W. E. Webb, *Buffalo Land* |
| [[mammalogist]] | noun | **1.** One skilled in the study of mammals. | *"In academic literature, mammalogist designates one skilled in the study of mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammalogy]] | noun | **1.** The branch of zoology that studies mammals. | *"In academic literature, mammalogy designates the branch of zoology that studies mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammary]] | adjective | **1.** Of or relating to the milk-giving gland of the female. | *"In academic literature, mammary designates of or relating to the milk-giving gland of the female."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammea]] | noun | **1.** American and asiatic trees having edible one-seeded fruit. | *"In academic literature, mammea designates american and asiatic trees having edible one-seeded fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammee]] | noun | **1.** Tropical american tree having wood like mahogany and sweet edible egg-shaped fruit; in some classifications placed in the genus calocarpum.<br>**2.** Tropical american tree having edible fruit with a leathery rind. | *"In academic literature, mammee designates tropical american tree having wood like mahogany and sweet edible egg-shaped fruit; in some classifications placed in the genus calocarpum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammilla]] | noun | **1.** The small projection of a mammary gland. | *"In academic literature, mammilla designates the small projection of a mammary gland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammillaria]] | noun | **1.** Any cactus of the genus mammillaria. | *"In academic literature, mammillaria designates any cactus of the genus mammillaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammogram]] | noun | **1.** X-ray film of the soft tissue of the breast. | *"In academic literature, mammogram designates x-ray film of the soft tissue of the breast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammography]] | noun | **1.** A diagnostic procedure to detect breast tumors by the use of x rays. | *"In academic literature, mammography designates a diagnostic procedure to detect breast tumors by the use of x rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammon]] | noun | **1.** Wealth regarded as an evil influence.<br>**2.** (new testament) a personification of wealth and avarice as an evil spirit. | *"I know poetry is not dead, nor genius lost; nor has Mammon gained power over either, to bind or slay: they will both assert their existence, their presence, their liberty and strength again one day."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[mammoplasty]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin mamm within the domain of Anatomy & Clinical Medicine.<br>**2.** A technical or specialized form exhibiting the properties of mamm in systematic terminology. | *"In academic literature, mammoplasty designates pertaining to, derived from, or characteristic of latin mamm within the domain of anatomy & clinical medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammoth]] | noun | **1.** Any of numerous extinct elephants widely distributed in the pleistocene; extremely large with hairy coats and long upcurved tusks.<br>**2.** So exceedingly large or extensive as to suggest a giant or mammoth. | *"I have scratched the reindeer’s semblance and the semblance of the hairy mammoth on ivory tusks gotten of the chase and on the rock walls of cave shelters when the winter storms moaned outside."* — Jack London, *The Jacket (The Star-Rover)* |
| [[mammothermography]] | noun | **1.** The use of thermography to detect breast tumors (which appear as hot spots). | *"In academic literature, mammothermography designates the use of thermography to detect breast tumors (which appear as hot spots)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammut]] | noun | **1.** Extinct type genus of the mammutidae: mastodons. | *"In academic literature, mammut designates extinct type genus of the mammutidae: mastodons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammuthus]] | noun | **1.** Extinct genus: mammoths. | *"In academic literature, mammuthus designates extinct genus: mammoths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammutidae]] | noun | **1.** Extinct family: mastodons. | *"In academic literature, mammutidae designates extinct family: mastodons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammy]] | noun | **1.** An offensive term for a black nursemaid in the southern u.s.<br>**2.** Informal terms for a mother. | *"Poor mammy has her leg broken."[781] [Wounded witches in Swabia.] In Swabia the witches are liable to accidents of the same sort when they go about their business in the form of animals."* — James George Frazer, *Balder the Beautiful, Volume I.* |

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
    ROOT DASHBOARD · MAMM
  </div>
</div>
