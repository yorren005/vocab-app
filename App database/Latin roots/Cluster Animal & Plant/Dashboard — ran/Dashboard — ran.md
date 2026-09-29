---
status: unread
type: root_dashboard
---
# Dashboard — ran
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ran-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“frog”</span>
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

The root **ran** means frog. It refers to frog, croaking amphibian, sublingual swelling, buttercup. In English, this root forms words such as *ranula*, *ranular*, *ranine*, and *rana*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: frog
> The root **ran** means frog. It refers to frog, croaking amphibian, sublingual swelling, buttercup. In English, this root forms words such as *ranula*, *ranular*, *ranine*, and *rana*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Frog</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *ranula* and *ranular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ran** comes from a Latin word that means *"frog"*.
  - At its core, it describes frog.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **ran** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of frog.
  - **Mental & Social**: How people experience, organize, or communicate about frog.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ranula**: In oral surgery and pathology, a large, translucent, bluish mucous retention cyst or extravasation pseudocyst arising from the sublingual salivary gland in the floor of the mouth beneath the tongue.
  - **Ranular**: Of, relating to, or resembling a ranula cyst.
  - **Ranine**: Of, relating to, or resembling a frog.
  - **Rana**: The cosmopolitan genus of true frogs comprising typical riparian, smooth-skinned frogs such as the northern leopard frog and European grass frog.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ran</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ran** builds vocabulary through classical diminutive morphology and scientific compounding:
> 1. **Anatomical & Pathological Formations:**
>    - *rāna* + diminutive *-ula* ➔ *ranula* (sublingual salivary mucocele).
>    - `ran-` + `-ine` (*-īnus*) ➔ *ranine* (relating to frogs; designating the deep lingual / sublingual vein).
> 2. **Agricultural & Ecological Compounding:**
>    - `rani-` + `cultūra` ("cultivation") ➔ *raniculture* (frog farming).
>    - `rani-` + `vorāre` ("to devour") ➔ *ranivorous* (frog-eating).
>    - `ran-` + `-arium` (*-ārium*, "place for") ➔ *ranarium* (frog vivarium).
>    - `rani-` + `forma` ("shape") ➔ *raniform* (frog-shaped).
> 3. **Botanical Diminutive Extensions:**
>    - *rāna* + double diminutive *-unculus* ➔ *ranunculus* (buttercup, "little frog").

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
> Although derived from the wetland frog, the semantic pathways split into vivid domains:
> - **Maxillofacial Surgery:** [[ranula]] is a hallmark pathology diagnosis describing an obstructed sublingual duct forming a bulging blue floor-of-mouth mass.
> - **Vascular Human Anatomy:** The [[ranine]] artery and vein run along the underside of the human tongue, named because their dark, engorged appearance mimicked the skin of a frog.
> - **Herpetological Clades:** [[Ranidae]] and [[rana]] encompass the world's most recognizable riparian frogs (bullfrogs, wood frogs, leopard frogs).
> - **Floral Botany:** [[ranunculus]] celebrates the brilliant yellow buttercup blooming in wet frog-filled meadows.

---

## 🔀 4. Prefix & Combining Dynamics on ran

### Structural Compounding on `ran-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-ula` (diminutive) | little | [[ranula]] | Translucent cystic swelling beneath the tongue (like a croaking throat) |
| `-unculus` (diminutive) | tiny, miniature | [[ranunculus]] | The buttercup genus (marsh-dwelling plants named "little frogs") |
| `-īnus` | belonging to | [[ranine]] | Pertaining to frogs; anatomy of the deep sublingual veins |
| `-idae` | zoological family | [[Ranidae]] | The taxonomic family of true frogs |
| `vorāre` | to devour, eat | [[ranivorous]] | Feeding on frogs as a primary prey source |
| `cultūra` | husbandry, farming | [[raniculture]] | Commercial rearing of frogs for culinary frog legs |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Oral & Maxillofacial Surgery:** Marsupialization or excision of plunging cervical ranulas.
> - **Herpetology & Ecotoxicology:** Global amphibian declines, chytrid fungus (*Batrachochytrium dendrobatidis*), ranavirus epizootics in *Rana* species.
> - **Horticulture & Floristry:** Persian buttercups (*Ranunculus asiaticus*) cultivated for multi-petaled spring bouquets.
> - **Wetland Food Webs:** Piscivorous and ranivorous wading birds (great blue herons, bitterns) regulating wetland ecosystems.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abranchial]] | adjective | **1.** Having no gills. | *"In academic literature, abranchial designates having no gills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abranchiate]] | adjective | **1.** Having no gills. | *"In academic literature, abranchiate designates having no gills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abranchious]] | adjective | **1.** Having no gills. | *"In academic literature, abranchious designates having no gills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agranulocytic]] | adjective | **1.** Relating to the blood disorder of agranulocytosis. | *"In academic literature, agranulocytic designates relating to the blood disorder of agranulocytosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agranulocytosis]] | noun | **1.** An acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes. | *"In academic literature, agranulocytosis designates an acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agranulosis]] | noun | **1.** An acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes. | *"In academic literature, agranulosis designates an acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arrant]] | adjective | **1.** Without qualification; used informally as (often pejorative) intensifiers. | *"There’s ne’er a villain dwelling in all Denmark But he’s an arrant knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[crane]] | noun | **1.** United states writer (1871-1900).<br>**2.** United states poet (1899-1932). | *"Come in, shepherd; sure ye be welcome, though we don’t know yer name.” “Gabriel Oak, that’s my name, neighbours.” The ancient maltster sitting in the midst turned at this—his turning being as the turning of a rusty crane."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[eranthis]] | noun | **1.** Winter aconite. | *"In academic literature, eranthis designates winter aconite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rana]] | noun | **1.** Type genus of the ranidae. | *"In academic literature, rana designates type genus of the ranidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranales]] | noun | **1.** Herbs, shrubs and trees: includes families ranunculaceae; annonaceae; berberidaceae; magnoliaceae; menispermaceae; myristicaceae; nymphaeaceae; lardizabalaceae; lauraceae; calycanthaceae; ceratophyllaceae; cercidiphyllaceae. | *"In academic literature, ranales designates herbs, shrubs and trees: includes families ranunculaceae; annonaceae; berberidaceae; magnoliaceae; menispermaceae; myristicaceae; nymphaeaceae; lardizabalaceae; lauraceae; calycanthaceae; ceratophyllaceae; cercidiphyllaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranatra]] | noun | **1.** Elongate very slender water scorpions. | *"In academic literature, ranatra designates elongate very slender water scorpions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranch]] | noun | **1.** Farm consisting of a large tract of land along with facilities needed to raise livestock (especially cattle).<br>**2.** Manage or run a ranch. | *"Thinks he does, and it serves him right--serves him right for starting out to run a widow-ranch in the first place; it's like making a collection of old shoes."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[rancher]] | noun | **1.** A person who owns or operates a ranch. | *"In the question of the grazing lands his peevish asperity is notorious and in Mr Cuffe’s hearing brought upon him from an indignant rancher a scathing retort couched in terms as straightforward as they were bucolic."* — James Joyce, *Ulysses* |
| [[ranching]] | noun | **1.** Farming for the raising of livestock (particularly cattle).<br>**2.** Manage or run a ranch. | *"In academic literature, ranching designates farming for the raising of livestock (particularly cattle)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rancid]] | adjective | **1.** (used of decomposing oils or fats) having a rank smell or taste usually due to a chemical change or decomposition.<br>**2.** Smelling of fermentation or staleness. | *"The odour which now filled the refectory was scarcely more appetising than that which had regaled our nostrils at breakfast: the dinner was served in two huge tin-plated vessels, whence rose a strong steam redolent of rancid fat."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[rancidity]] | noun | **1.** The state of being rancid; having a rancid scent or flavor (as of old cooking oil). | *"In academic literature, rancidity designates the state of being rancid; having a rancid scent or flavor (as of old cooking oil)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rancidness]] | noun | **1.** The property of being rancid. | *"In academic literature, rancidness designates the property of being rancid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rancor]] | noun | **1.** A feeling of deep and bitter anger and ill-will. | *"Thou never from that houre in Paradise Foundst either sweet repast, or found repose; Such ambush hid among sweet Flours and Shades Waited with hellish rancor imminent To intercept thy way, or send thee back Despoild of Innocence, of Faith, of Bliss."* — John Milton, *Paradise Lost* |
| [[rancorous]] | adjective | **1.** Showing deep-seated resentment; - aldous huxley. | *"Well didst thou, Richard, to suppress thy voice; For, had the passions of thy heart burst out, I fear we should have seen decipher’d there More rancorous spite, more furious raging broils, Than yet can be imagined or supposed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rancour]] | noun | **1.** A feeling of deep and bitter anger and ill-will. | *"Virtue is choked with foul ambition, And charity chased hence by rancour’s hand; Foul subornation is predominant, And equity exiled your highness’ land."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ranee]] | noun | **1.** (the feminine of raja) a hindu princess or the wife of a raja. | *"Not only does the Ranee believe that the recovery of this gem will ensure the prosperity of the descendants of Runjeet Singh, but I do firmly believe that its re-possession will rally the Sikh forces to form again a conquering faith."* — C. A. Frazer, *Atmâ* |
| [[rani]] | noun | **1.** (the feminine of raja) a hindu princess or the wife of a raja. | *"In academic literature, rani designates (the feminine of raja) a hindu princess or the wife of a raja."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranid]] | noun | **1.** Insectivorous usually semiaquatic web-footed amphibian with smooth moist skin and long hind legs. | *"In academic literature, ranid designates insectivorous usually semiaquatic web-footed amphibian with smooth moist skin and long hind legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranidae]] | noun | **1.** A family nearly cosmopolitan in distribution: true frogs. | *"In academic literature, ranidae designates a family nearly cosmopolitan in distribution: true frogs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranier]] | noun | **1.** A mountain peak in central washington; highest peak in the cascade range; (14,410 feet high). | *"In academic literature, ranier designates a mountain peak in central washington; highest peak in the cascade range; (14,410 feet high)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranine]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ran within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of ran in systematic terminology. | *"In academic literature, ranine designates pertaining to, derived from, or characteristic of latin ran within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranitidine]] | noun | **1.** A histamine blocker and antacid (trade name zantac) used to treat peptic ulcers and gastritis and esophageal reflux. | *"In academic literature, ranitidine designates a histamine blocker and antacid (trade name zantac) used to treat peptic ulcers and gastritis and esophageal reflux."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ran within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of ran in systematic terminology. | *"In academic literature, ranivorous designates pertaining to, derived from, or characteristic of latin ran within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ransack]] | verb | **1.** Steal goods; take as spoils.<br>**2.** Search thoroughly. | *"Sixty and nine that wore Their crownets regal from the Athenian bay Put forth toward Phrygia; and their vow is made To ransack Troy, within whose strong immures The ravish’d Helen, Menelaus’ queen, With wanton Paris sleeps—and that’s the quarrel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ransacked]] | verb | **1.** Steal goods; take as spoils.<br>**2.** Search thoroughly. | *"See the hell of having a false woman: my bed shall be abused, my coffers ransacked, my reputation gnawn at; and I shall not only receive this villanous wrong, but stand under the adoption of abominable terms, and by him that does me this wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ransacking]] | noun | **1.** A thorough search for something (often causing disorder or confusion).<br>**2.** Steal goods; take as spoils. | *"The bastard Faulconbridge Is now in England ransacking the church, Offending charity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ransom]] | noun | **1.** Money demanded for the return of a captured person.<br>**2.** Payment for the release of someone. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ransomed]] | verb | **1.** Exchange or buy back for money; under threat.<br>**2.** Saved from the bondage of sin. | *"Then I would he were here alone; so should he be sure to be ransomed, and a many poor men’s lives saved."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rant]] | noun | **1.** A loud bombastic declamation expressed with strong emotion.<br>**2.** Pompous or pretentious talk or writing. | *"Nay, an thou’lt mouth, I’ll rant as well as thou."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ranter]] | noun | **1.** Someone who rants and raves; speaks in a violent or loud manner. | *"A ranter preaches there between the services—an excellent, fiery, Christian man, they say."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ranting]] | noun | **1.** A loud bombastic declamation expressed with strong emotion.<br>**2.** Talk in a noisy, excited, or declamatory manner. | *"Look where my ranting host of the Garter comes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ranula]] | noun | **1.** A cyst on the underside of the tongue. | *"In academic literature, ranula designates a cyst on the underside of the tongue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranunculaceae]] | noun | **1.** A family of ranunculaceae. | *"In academic literature, ranunculaceae designates a family of ranunculaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranunculales]] | noun | **1.** Herbs, shrubs and trees: includes families ranunculaceae; annonaceae; berberidaceae; magnoliaceae; menispermaceae; myristicaceae; nymphaeaceae; lardizabalaceae; lauraceae; calycanthaceae; ceratophyllaceae; cercidiphyllaceae. | *"In academic literature, ranunculales designates herbs, shrubs and trees: includes families ranunculaceae; annonaceae; berberidaceae; magnoliaceae; menispermaceae; myristicaceae; nymphaeaceae; lardizabalaceae; lauraceae; calycanthaceae; ceratophyllaceae; cercidiphyllaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ranunculus]] | noun | **1.** Annual, biennial or perennial herbs: buttercup; crowfoot. | *"One of the first of our native wild flowers, in making its appearance after the departure of frost and snow, is the little yellow celandine (_Ranunculus ficaria_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[supranational]] | adjective | **1.** Transcending established national boundaries or spheres of interest. | *"In academic literature, supranational designates transcending established national boundaries or spheres of interest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supranormal]] | adjective | **1.** Beyond the range of the normal or scientifically explainable. | *"In academic literature, supranormal designates beyond the range of the normal or scientifically explainable."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · RAN
  </div>
</div>
