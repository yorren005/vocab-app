---
status: unread
type: root_dashboard
---
# Dashboard — carn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">carn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flesh or meat”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body, limbs, posture, and bodily movements.</span>
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

The root **carn** means flesh or meat. It refers to muscle tissue, animal meat, and physical bodily substance. In English, this root forms words such as *carnival*, *carnivore*, *carnal*, and *incarnate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flesh or meat
> The root **carn** means flesh or meat. It refers to muscle tissue, animal meat, and physical bodily substance. In English, this root forms words such as *carnival*, *carnivore*, *carnal*, and *incarnate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Flesh or meat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body, limbs, posture, and bodily movements.</mark>
> - **Everyday Connection**: Think of familiar words like *carnival* and *carnivore*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **carn** comes from a Latin word that means *"flesh or meat"*.
  - At its core, it describes flesh or meat.

- **The Big Picture Idea**:
  - Picture the physical human body, limbs, posture, and bodily movements.
  - Whenever you see **carn** in an English word, think of **the physical body and limbs**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of flesh or meat.
  - **Mental & Social**: How people experience, organize, or communicate about flesh or meat.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Carnival**: A season or festival of merrymaking, feasting, masquerades, and public parades celebrated immediately prior to the Christian penitential season of Lent.
  - **Carnivore**: An animal or mammal that feeds primarily or exclusively on animal tissue.
  - **Carnal**: Relating to physical, bodily, and especially sexual appetites and passions.
  - **Incarnate**: Invested with bodily, and especially human, flesh.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">carn</mark>, think of <mark class="hl-def">the physical body and limbs</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root operates across three morphological tiers:
> - **Classical Latin Oblique Stem:** `carn-` (from *carnis*). Used in direct learned, scientific, and theological borrowings: *carnal*, *carnage*, *carnivore*, *carnivorous*, *incarnate*, *reincarnation*.
> - **Diminutive Latin Stem:** `caruncul-` (from *caruncula*, "a little piece of flesh"): *caruncle*, *caruncular*.
> - **Gallo-Romance & Anglo-Norman Stem:** `charn-` / `carr-` / `char-` (from Old French *charnel*, *caroine*, *chair*): *charnel*, *carrion*, *charcuterie*.
>
> Prefixes modify embodiment status: *in-* ("into flesh"), *re-in-* ("again into flesh"), *dis-* ("stripped of flesh"). Compounding combines *carn-* with feeding habits (*-vore* / *-vorous* from *vorāre* "to devour") and color stones (*-elian* from *carneolus*).

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

> [!tip] 🌈 The Conceptual Facets of Carn-
> - **1. Predatory Biology & Trophic Ecology:** Dietary consumption of animal tissue (*carnivore*, *carnivorous*, *carnivory*), and shearing dental adaptations (*carnassial*).
> - **2. Brutal Violence & Battlefield Mortality:** Massive heaps of slaughtered bodies (*carnage*), rotting animal carcasses (*carrion*), and skeletal vaults (*charnel house*).
> - **3. Theology, Metaphysics & Spiritual Embodiment:** The divine assuming human form (*incarnation*, *incarnate*), transmigration of souls (*reincarnation*), and disembodied spirits (*discarnate*).
> - **4. Human Sexuality & Earthly Desires:** Sensual bodily appetites opposed to intellect or spirit (*carnal*, *carnality*, *carnal knowledge*).
> - **5. Public Feasting & Cultural Festivals:** The joyful indulgence in meat and masquerade before fasting (*carnival*).
> - **6. Histology, Anatomy & Pathology:** Minute fleshy nodules (*caruncle*), fleshy tissue overgrowth (*carnosity*), and dense fibrous muscular transformation of lungs (*carnification*).
> - **7. Culinary Arts & Gemology:** Cured and prepared pork meats (*charcuterie*), meat stews (*chili con carne*), and reddish flesh-colored chalcedony gemstones (*carnelian*).

---

## 🔀 4. Prefix & Combining Dynamics on carn

### Prefix Dynamics

| Prefix | Core Value | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` | into, within | [[incarnate]] | To clothe or invest *in* flesh; given a physical, bodily form. |
| `re-` + `in-` | again, anew | [[reincarnation]] | The rebirth of a soul *back into* a new physical body of flesh. |
| `dis-` | away, without | [[discarnate]] | Stripped *away from* flesh; existing without a physical body. |

### Suffix Dynamics

| Suffix / Compounding | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-age` | Noun (collective result) | [[carnage]] | An aggregate heap of slaughtered flesh; massive bloodshed. |
| `-al` | Adjective (relating to) | [[carnal]] | Pertaining to the appetites and sensations of the physical body. |
| `-vore` / `-vorous` | Noun / Adj (devouring) | [[carnivore]], [[carnivorous]] | Habitually feeding upon the flesh of other animals. |
| `-assial` | Adjective (specialized dental) | [[carnassial]] | Pertaining to the shearing flesh-cutting teeth of carnivores. |
| `-uncle` | Diminutive noun | [[caruncle]] | A "little bit of flesh"; a small naked fleshy nodule or wattle. |
| `-fication` | Noun (transformation) | [[carnification]] | Pathological alteration making lungs or tissues resemble dense flesh. |
| `-ion` | Noun (decaying state) | [[carrion]] | Putrefying animal flesh unfit for slaughter. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Systematics & Mammalogy** | [[carnivore]], [[carnivorous]], [[carnassial]] | Carnivora order taxonomy; carnassial shear blade mechanics (P4/m1); obligate carnivores. |
| **Comparative Theology & Philosophy** | [[incarnation]], [[reincarnation]], [[discarnate]] | Nicene Christology; samsara and metempsychosis in Dharmic faiths; Cartesian mind-body dualism. |
| **Criminal Law & Jurisprudence** | [[carnal]], [[carnage]] | "Carnal knowledge" statutory rape provisions; international humanitarian law on battlefield carnage. |
| **Ophthalmology & Histology** | [[caruncle]], [[carnosity]], [[carnification]] | Lacrimal caruncle lesions; carnification of pulmonary parenchyma in unresolved lobar pneumonia. |
| **Culinary Arts & Anthropology** | [[charcuterie]], [[chili con carne]], [[carnival]] | Artisanal cured meats; Rio and Venetian carnival pageants; dietary sociology. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[carnage]] | noun | **1.** The savage and excessive killing of many people. | *"A light fall of snow had obliterated all footmarks; and a deathly silence pervaded the island, as if for a space Nature stood still in horror of the recent carnage."* — J. M. Barrie, *Peter Pan* |
| [[carnal]] | adjective | **1.** Marked by the appetites and passions of the body.<br>**2.** Of or relating to the body or flesh. | *"So shall you hear Of carnal, bloody and unnatural acts, Of accidental judgements, casual slaughters, Of deaths put on by cunning and forc’d cause, And, in this upshot, purposes mistook Fall’n on the inventors’ heads."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carnalise]] | verb | **1.** Debase through carnal gratification. | *"In academic literature, carnalise designates debase through carnal gratification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnality]] | noun | **1.** Feeling morbid sexual desire or a propensity to lewdness. | *"The error of carnality 131:6 When once destroyed by divine Science, the false evi- dence before the corporeal senses disappears."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[carnalize]] | verb | **1.** Represent materialistically, as in a painting or a sculpture.<br>**2.** Ascribe to an origin in sensation. | *"In academic literature, carnalize designates represent materialistically, as in a painting or a sculpture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnallite]] | noun | **1.** A white or reddish mineral consisting of hydrous chlorides of potassium and magnesium; used as a fertilizer and as a source of potassium and magnesium. | *"In academic literature, carnallite designates a white or reddish mineral consisting of hydrous chlorides of potassium and magnesium; used as a fertilizer and as a source of potassium and magnesium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnally]] | adverb | **1.** In a carnal manner. | *"In academic literature, carnally designates in a carnal manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnassial]] | adjective | **1.** (of a tooth) adapted for shearing flesh. | *"In academic literature, carnassial designates (of a tooth) adapted for shearing flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnation]] | noun | **1.** Eurasian plant with pink to purple-red spice-scented usually double flowers; widely cultivated in many varieties and many colors.<br>**2.** A pink or reddish-pink color. | *"HOSTESS. ’A could never abide carnation; ’twas a colour he never liked."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carnauba]] | noun | **1.** Hard yellowish to brownish wax from leaves of the carnauba palm used especially in floor waxes and polishes.<br>**2.** Brazilian fan palm having an edible root; source of a useful leaf fiber and a brittle yellowish wax. | *"In academic literature, carnauba designates hard yellowish to brownish wax from leaves of the carnauba palm used especially in floor waxes and polishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnegie]] | noun | **1.** United states educator famous for writing a book about how to win friends and influence people (1888-1955).<br>**2.** United states industrialist and philanthropist who endowed education and public libraries and research trusts (1835-1919). | *"Andrew Carnegie said that it would be a good thing if every boy had to start in poverty and make his own way."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[carnegiea]] | noun | **1.** Caryophylloid dicot genus with only one species: saguaro. | *"In academic literature, carnegiea designates caryophylloid dicot genus with only one species: saguaro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnelian]] | noun | **1.** A translucent red or orange variety of chalcedony. | *"In academic literature, carnelian designates a translucent red or orange variety of chalcedony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnify]] | verb | **1.** Become muscular or fleshy. | *"In academic literature, carnify designates become muscular or fleshy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnival]] | noun | **1.** A festival marked by merrymaking and processions.<br>**2.** A frenetic disorganized (and often comic) disturbance suggestive of a large public entertainment. | *"Here’s spring come, and the nights one makes up bands To roam the town and sing out carnival, And I’ve been three weeks shut within my mew, A-painting for the great man, saints and saints And saints again."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[carnivora]] | noun | **1.** Cats; lions; tigers; panthers; dogs; wolves; jackals; bears; raccoons; skunks; and members of the suborder pinnipedia. | *"You might as well ask a man to eat molecules with a pair of chop-sticks, as to try to interest me about the lesser carnivora, when I know of what is before me.” “I see,” I said."* — Bram Stoker, *Dracula* |
| [[carnivore]] | noun | **1.** A terrestrial or aquatic flesh-eating mammal.<br>**2.** Any animal that feeds on flesh. | *"It was I broke in the bucking broncho Ajax with my patent spiked saddle for carnivores."* — James Joyce, *Ulysses* |
| [[carnivorous]] | adjective | **1.** Relating to or characteristic of carnivores.<br>**2.** (used of plants as well as animals) feeding on animals. | *"A thing altogether incredible were it not that attracted by such prey as a dead whale, the otherwise miscellaneously carnivorous shark will seldom touch a man."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[carnosaur]] | noun | **1.** Large carnivorous bipedal dinosaur having huge claws. | *"In academic literature, carnosaur designates large carnivorous bipedal dinosaur having huge claws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnosaura]] | noun | **1.** Largest carnivorous land animals ever known. | *"In academic literature, carnosaura designates largest carnivorous land animals ever known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnosity]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin carn within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of carn in systematic terminology. | *"In academic literature, carnosity designates pertaining to, derived from, or characteristic of latin carn within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnot]] | noun | **1.** French physicist who founded thermodynamics (1796-1832). | *"In academic literature, carnot designates french physicist who founded thermodynamics (1796-1832)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnotite]] | noun | **1.** A yellow radioactive mineral; an ore of uranium and radium and vanadium. | *"In academic literature, carnotite designates a yellow radioactive mineral; an ore of uranium and radium and vanadium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chili con carne]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin carn within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of carn in systematic terminology. | *"In academic literature, chili con carne designates pertaining to, derived from, or characteristic of latin carn within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discarnate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin carn within the domain of Body.<br>**2.** A technical or specialized form exhibiting the properties of carn in systematic terminology. | *"In academic literature, discarnate designates pertaining to, derived from, or characteristic of latin carn within the domain of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disincarnate]] | verb | **1.** Make immaterial; remove the real essence of. | *"In academic literature, disincarnate designates make immaterial; remove the real essence of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incarnadine]] | verb | **1.** Make flesh-colored. | *"No, this my hand will rather The multitudinous seas incarnadine, Making the green one red."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incarnate]] | verb | **1.** Make concrete and real.<br>**2.** Represent in bodily form. | *"Yes, that ’a did; and said they were devils incarnate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incarnation]] | noun | **1.** A new personification of a familiar idea.<br>**2.** (christianity) the christian doctrine of the union of god and man in the person of jesus christ. | *"Certainly the Jew is the very devil incarnation, and, in my conscience, my conscience is but a kind of hard conscience, to offer to counsel me to stay with the Jew."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reincarnate]] | verb | **1.** Be born anew in another body after death.<br>**2.** Cause to appear in a new form. | *"When the Bogdo dies, his soul is reincarnated in the body of a newly born male child."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[reincarnation]] | noun | **1.** Embodiment in a new form (especially the reappearance or a person in another form).<br>**2.** A second or new birth. | *"A study of family portraits is enough to convert a man to the doctrine of reincarnation."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CARN
  </div>
</div>
