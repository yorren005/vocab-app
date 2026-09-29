---
status: unread
type: root_dashboard
---
# Dashboard — can_dog
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">can_dog-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“dog”</span>
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

The root **can_dog** means dog. It refers to loyal domesticated canines kept as companions or guards. In English, this root forms words such as *canine*, *canid*, *canis*, and *caninity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: dog
> The root **can_dog** means dog. It refers to loyal domesticated canines kept as companions or guards. In English, this root forms words such as *canine*, *canid*, *canis*, and *caninity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Dog</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *canine* and *canid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **can_dog** comes from a Latin word that means *"dog"*.
  - At its core, it describes dog.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **can_dog** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of dog.
  - **Mental & Social**: How people experience, organize, or communicate about dog.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Canine**: Of, relating to, or resembling a dog.
  - **Canid**: Any mammal belonging to the family Canidae, which includes domestic dogs, wolves, jackals, foxes, dingoes, and coyotes.
  - **Canis**: The formal taxonomic genus of carnivorans that includes domestic dogs , gray wolves , and golden jackals.
  - **Caninity**: The nature, character, or disposition of a dog.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">can_dog</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **can_dog** generates vocabulary through three distinct evolutionary pathways:
> 1. **Learned Latin Suffixation:**
>    - `can-` + `-ine` (*-īnus*) ➔ *canine* (pertaining to dogs; a tearing tooth).
>    - `can-` + `-id` (*-idae*) ➔ *canid* (a member of the dog family).
>    - `can-` + `-i-` + `-cide` (*caedere* "to kill") ➔ *canicide* (the killing of a dog).
> 2. **Diminutive Astronomical Formations:**
>    - `can-` + `-icula` ➔ *canicula* ("little dog") ➔ *canicular* (relating to Sirius and the dog days).
> 3. **Romance Vernacular Metamorphoses:**
>    - Latin *canis* + collective suffix *-ālia* ➔ Italian *canaglia* ➔ French *canaille* (the unruly pack / rabble).
>    - Vulgar Latin *\*canīle* ("dog place") ➔ Old Northern French *chenil* ➔ English *kennel*.
>    - Latin *canīcula* ("little dog") ➔ Old French *chenille* ("hairy caterpillar", resembling a fluffy puppy) ➔ English *chenille* (tufted velvety fabric).
>    - Latin *canāria* ("island of dogs") ➔ Spanish *Canarias* ➔ English *Canary* (islands and yellow songbird).

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
> The semantic pathways of *canis* illustrate extraordinary cultural radiation:
> - **Dental Anatomy:** [[canine]] tooth and `canine fossa` anchor human masticatory biomechanics for piercing food.
> - **Climatological Lore:** [[canicular]] days and [[Canicula]] reflect ancient Mediterranean astronomy linking midsummer drought to Sirius.
> - **Sociopolitical Contempt:** [[canaille]] translates the snarling, uncontrolled pack of street curs into aristocratic disdain for the working-class masses.
> - **Textile Craft:** [[chenille]] yarn mirrors the fuzzy hair of a small puppy via metaphorical caterpillar nomenclature.
> - **Geographical Ornithology:** The [[Canary]] bird derives its name from islands named after fierce mastiffs, not songbirds!

---

## 🔀 4. Prefix & Combining Dynamics on can_dog

### Structural Compounding on `can-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Historical / Scientific Shift |
| :--- | :--- | :--- | :--- |
| `-īnus` | belonging to | [[canine]] | Pertaining to a dog; designating the conical pointed eyetooth |
| `-idae` | zoological family | [[canid]] | Any member of the carnivoran family Canidae (wolves, foxes, dogs) |
| `-icula` | diminutive suffix | [[Canicula]] | "Little dog" — ancient designation for the dazzling Dog Star Sirius |
| `-āle` / `-īle` | place for keeping | [[kennel]] | Shelter, pen, or breeding facility for domestic hounds |
| `-aglia` (collective) | pack, throng | [[canaille]] | The contemptible mob or rabble (viewed as a pack of stray curs) |
| `-cide` | killer, slaying | [[canicide]] | The act or perpetrator of killing a dog |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Dentistry & Orthodontics:** Maxillary and mandibular canine impaction, canine guidance occlusion, and orthodontic retraction.
> - **Veterinary Science & Zoology:** Canine distemper virus, canine parvovirus, canid phylogeny, and domestication genetics.
> - **Astronomy & History of Science:** Sirius A and B binary systems in Canis Major, Egyptian heliacal rising, and midsummer canicular heat.
> - **Textile Design & Fashion:** Chenille yarn weaving, looped-pile upholstery, and velvet tufting.
> - **Archaeology & Classical Epigraphy:** Pompeian mosaic iconography (*cave canem*) and Roman rural estate architecture.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anticancer]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, anticancer designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcane]] | adjective | **1.** Requiring secret or mysterious knowledge. | *"In academic literature, arcane designates requiring secret or mysterious knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcanum]] | noun | **1.** Information known only to a special group. | *"Certainly no man whatever; for this arcanum doth enter into an artist of a stiff neck; he only hath it who transcends the progress of angels and comes to the very Archtype himself."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[can]] | noun | **1.** Airtight sealed metal container for food or drink or paint etc.<br>**2.** The quantity contained in a can. | *"For all that beauty that doth cover thee, Is but the seemly raiment of my heart, Which in thy breast doth live, as thine in me, How can I then be elder than thou art?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canaan]] | noun | **1.** An ancient country in southwestern asia on the east coast of the mediterranean sea; a place of pilgrimage for christianity and islam and judaism. | *"It is a land of oil, true enough: but not like Canaan; a land, also, of corn and wine."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[canaanite]] | noun | **1.** A member of an ancient semitic people who occupied canaan before it was conquered by the israelites.<br>**2.** The extinct language of the semitic people who occupied canaan before the israelite conquest. | *"I saw the sinful Canaanites Upon the shewbread dine, And spoil the temple vessels And drink the temple wine."* — Vachel Lindsay, *The Chinese Nightingale, and Other Poems* |
| [[canaanitic]] | noun | **1.** A group of semitic languages. | *"In academic literature, canaanitic designates a group of semitic languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canachites]] | noun | **1.** Spruce grouse. | *"In academic literature, canachites designates spruce grouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canada]] | noun | **1.** A nation in northern north america; the french were the first europeans to settle in mainland canada. | *"Cairns spent five months in the United States and Canada."* — John Cairns, *Principal Cairns* |
| [[canadian]] | noun | **1.** A native or inhabitant of canada.<br>**2.** A river rising in northeastern new mexico and flowing eastward across the texas panhandle to become a tributary of the arkansas river in oklahoma. | *"Besides, if I failed to go on now, it would be very difficult to get my borrowed team together again, and impossible to get my man again; and we could as well live without bread as without wood in a Canadian Winter."* — Classic Author, *The wonders of prayer* |
| [[canafistola]] | noun | **1.** Deciduous or semi-evergreen tree having scented sepia to yellow flowers in drooping racemes and pods whose pulp is used medicinally; tropical asia and central and south america and australia. | *"In academic literature, canafistola designates deciduous or semi-evergreen tree having scented sepia to yellow flowers in drooping racemes and pods whose pulp is used medicinally; tropical asia and central and south america and australia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canafistula]] | noun | **1.** Deciduous or semi-evergreen tree having scented sepia to yellow flowers in drooping racemes and pods whose pulp is used medicinally; tropical asia and central and south america and australia. | *"In academic literature, canafistula designates deciduous or semi-evergreen tree having scented sepia to yellow flowers in drooping racemes and pods whose pulp is used medicinally; tropical asia and central and south america and australia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canal]] | noun | **1.** (astronomy) an indistinct surface feature of mars once thought to be a system of channels; they are now believed to be an optical illusion.<br>**2.** A bodily passage or tube lined with epithelial cells and conveying a secretion or other substance. | *"A cent a ton-mile proved to be a paying rate on a small canal."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[canalicular]] | adjective | **1.** Relating to or like or having a canaliculus. | *"In academic literature, canalicular designates relating to or like or having a canaliculus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canaliculate]] | adjective | **1.** Having thin parallel channels. | *"In academic literature, canaliculate designates having thin parallel channels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canaliculus]] | noun | **1.** A small canal or duct as in some bones and parts of plants. | *"In academic literature, canaliculus designates a small canal or duct as in some bones and parts of plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canalisation]] | noun | **1.** The production of a canal or a conversion to canals.<br>**2.** Management through specified channels of communication. | *"In academic literature, canalisation designates the production of a canal or a conversion to canals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canalise]] | verb | **1.** Provide (a city) with a canal.<br>**2.** Direct the flow of. | *"In academic literature, canalise designates provide (a city) with a canal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canalization]] | noun | **1.** The production of a canal or a conversion to canals.<br>**2.** Management through specified channels of communication. | *"In academic literature, canalization designates the production of a canal or a conversion to canals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canalize]] | verb | **1.** Provide (a city) with a canal.<br>**2.** Direct the flow of. | *"In academic literature, canalize designates provide (a city) with a canal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cananga]] | noun | **1.** A genus of malayan tree. | *"In academic literature, cananga designates a genus of malayan tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canangium]] | noun | **1.** A genus of malayan tree. | *"In academic literature, canangium designates a genus of malayan tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canape]] | noun | **1.** An appetizer consisting usually of a thin slice of bread or toast spread with caviar or cheese or other savory food. | *"In academic literature, canape designates an appetizer consisting usually of a thin slice of bread or toast spread with caviar or cheese or other savory food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canara]] | noun | **1.** A historical region of southwestern india on the west coast. | *"In academic literature, canara designates a historical region of southwestern india on the west coast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canard]] | noun | **1.** A deliberately misleading fabrication. | *"I understood very soon that all that which was published in the "Gazette" of the sixteenth was a canard, and so I said to Don José de Montoria and his wife, who in their optimism attributed my incredulity to a lack of public spirit."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[canarese]] | noun | **1.** A member of a kannada-speaking group of people living chiefly in kanara in southern india. | *"In academic literature, canarese designates a member of a kannada-speaking group of people living chiefly in kanara in southern india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canaries]] | noun | **1.** A group of mountainous islands in the atlantic off the northwest coast of africa forming spanish provinces.<br>**2.** Someone acting as an informer or decoy for the police. | *"But, i’ faith, you have drunk too much canaries, and that’s a marvellous searching wine, and it perfumes the blood ere one can say “What’s this?” How do you now?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canary]] | noun | **1.** Someone acting as an informer or decoy for the police.<br>**2.** A female singer. | *"The best courtier of them all, when the court lay at Windsor, could never have brought her to such a canary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canary-yellow]] | adjective | **1.** Having the color of a canary; of a light to moderate yellow. | *"In academic literature, canary-yellow designates having the color of a canary; of a light to moderate yellow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canasta]] | noun | **1.** A form of rummy using two decks of cards and four jokers; jokers and deuces are wild; the object is to form groups of the same rank. | *"In academic literature, canasta designates a form of rummy using two decks of cards and four jokers; jokers and deuces are wild; the object is to form groups of the same rank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canavalia]] | noun | **1.** Herbs or woody vines of mainly american tropics and subtropics. | *"In academic literature, canavalia designates herbs or woody vines of mainly american tropics and subtropics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canavanine]] | noun | **1.** An amino acid found in the jack bean. | *"In academic literature, canavanine designates an amino acid found in the jack bean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancan]] | noun | **1.** A high-kicking dance of french origin performed by a female chorus line. | *"In part it was a modest _cancan_, in part a step dance, in part a skirt dance (so far as my tail-coat permitted), and in part original."* — H. G. Wells, *The Time Machine* |
| [[cancel]] | noun | **1.** A notation cancelling a previous sharp or flat.<br>**2.** Postpone indefinitely or annul something that was scheduled. | *"And so, great pow’rs, If you will take this audit, take this life, And cancel these cold bonds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cancellate]] | adjective | **1.** Having a latticelike structure pierced with holes or windows.<br>**2.** Having an open or latticed or porous structure. | *"In academic literature, cancellate designates having a latticelike structure pierced with holes or windows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancellated]] | adjective | **1.** Having a latticelike structure pierced with holes or windows.<br>**2.** Having an open or latticed or porous structure. | *"In academic literature, cancellated designates having a latticelike structure pierced with holes or windows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancellation]] | noun | **1.** The act of cancelling; calling off some arrangement.<br>**2.** The speech act of revoking or annulling or making void. | *"The wasteful process of shipping these sums back and forth is avoided by the cancellation of indebtedness between the two localities."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cancelled]] | verb | **1.** Postpone indefinitely or annul something that was scheduled.<br>**2.** Make up for. | *"Therefore, no more but this: Henry, your sovereign, Is prisoner to the foe, his state usurped, His realm a slaughter-house, his subjects slain, His statutes cancelled, and his treasure spent; And yonder is the wolf that makes this spoil."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cancellous]] | adjective | **1.** Having an open or latticed or porous structure. | *"In academic literature, cancellous designates having an open or latticed or porous structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancer]] | noun | **1.** Any malignant growth or tumor caused by abnormal and uncontrolled cell division; it may spread to other parts of the body through the lymphatic system or the blood stream.<br>**2.** (astrology) a person who is born while the sun is in cancer. | *"That were to enlard his fat-already pride, And add more coals to Cancer when he burns With entertaining great Hyperion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cancerous]] | adjective | **1.** Relating to or affected with cancer.<br>**2.** Like a cancer; an evil that grows and spreads. | *"In academic literature, cancerous designates relating to or affected with cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancerweed]] | noun | **1.** Sage of eastern united states. | *"In academic literature, cancerweed designates sage of eastern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancridae]] | noun | **1.** Many of the best known edible crabs. | *"In academic literature, cancridae designates many of the best known edible crabs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancroid]] | noun | **1.** The most common form of skin cancer.<br>**2.** Of or relating to a cancroid. | *"In academic literature, cancroid designates the most common form of skin cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cancun]] | noun | **1.** A popular island resort off the northeastern tip of the yucatan peninsula. | *"In academic literature, cancun designates a popular island resort off the northeastern tip of the yucatan peninsula."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cane]] | noun | **1.** A stick that people can lean on to help them walk.<br>**2.** A strong slender often flexible stem as of bamboos, reeds, rattans, or sugar cane. | *"He had a cane, he had an eye-glass, he had a snuff-box, he had rings, he had wristbands, he had everything but any touch of nature; he was not like youth, he was not like age, he was not like anything in the world but a model of deportment."* — Charles Dickens, *Bleak House* |
| [[canebrake]] | noun | **1.** A dense growth of cane (especially giant cane). | *"Young'un, if you go down in this damn river bottom, you'll get lost!" I scooted under a low-hanging limb and headed for a canebrake right ahead."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[canecutter]] | noun | **1.** A wood rabbit of southeastern united states swamps and lowlands. | *"In academic literature, canecutter designates a wood rabbit of southeastern united states swamps and lowlands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canella]] | noun | **1.** Highly aromatic inner bark of the canella winterana used as a condiment and a tonic. | *"In academic literature, canella designates highly aromatic inner bark of the canella winterana used as a condiment and a tonic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canella-alba]] | noun | **1.** Large evergreen shrub or small tree having white aromatic bark and leathery leaves and small purple to red flowers in terminal cymes. | *"In academic literature, canella-alba designates large evergreen shrub or small tree having white aromatic bark and leathery leaves and small purple to red flowers in terminal cymes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canellaceae]] | noun | **1.** One genus: aromatic tropical trees of eastern africa and florida to west indies. | *"In academic literature, canellaceae designates one genus: aromatic tropical trees of eastern africa and florida to west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canescent]] | adjective | **1.** Of greyish white.<br>**2.** Covered with fine whitish hairs or down. | *"In academic literature, canescent designates of greyish white."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canetti]] | noun | **1.** English writer born in germany (1905-1994). | *"In academic literature, canetti designates english writer born in germany (1905-1994)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canicula]] | noun | **1.** The brightest star in the sky; in canis major. | *"In academic literature, canicula designates the brightest star in the sky; in canis major."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canicular]] | adjective | **1.** Of or relating to the dog days of summer.<br>**2.** Relating to or especially immediately preceding or following the heliacal rising of canicula (the dog star). | *"In academic literature, canicular designates of or relating to the dog days of summer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canicule]] | noun | **1.** The hot period between early july and early september; a period of inactivity. | *"In academic literature, canicule designates the hot period between early july and early september; a period of inactivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canid]] | noun | **1.** Any of various fissiped mammals with nonretractile claws and typically long muzzles. | *"In academic literature, canid designates any of various fissiped mammals with nonretractile claws and typically long muzzles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canidae]] | noun | **1.** Dogs; wolves; jackals; foxes. | *"In academic literature, canidae designates dogs; wolves; jackals; foxes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canine]] | noun | **1.** One of the four pointed conical teeth (two in each jaw) located between the incisors and the premolars.<br>**2.** Any of various fissiped mammals with nonretractile claws and typically long muzzles. | *"Being thus assignable to no breed, he was the ideal embodiment of canine greatness—a generalization from what was common to all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[caning]] | noun | **1.** Work made of interlaced slender branches (especially willow branches).<br>**2.** Beat with a cane. | *"In academic literature, caning designates work made of interlaced slender branches (especially willow branches)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canis]] | noun | **1.** Type genus of the canidae: domestic and wild dogs; wolves; jackals. | *"Pliny, _Naturalis Historic_ xviii. 269 _sq_.: "_Exoritur dein post triduum fere ubique confessum inter omnes sidus ingens quod canis ortum vocamus, sole partem primam leonis ingresso."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[canistel]] | noun | **1.** Tropical tree of florida and west indies yielding edible fruit.<br>**2.** Ovoid orange-yellow mealy sweet fruit of florida and west indies. | *"In academic literature, canistel designates tropical tree of florida and west indies yielding edible fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canister]] | noun | **1.** A metallic cylinder packed with shot and used as ammunition in a firearm.<br>**2.** Metal container for storing dry foods such as tea or flour. | *"Thankee!” Having leisurely helped himself from a canister borrowed from somebody downstairs for the purpose, and having made a considerable show of tasting it, first with one side of his nose and then with the other, Mr."* — Charles Dickens, *Bleak House* |
| [[canna]] | noun | **1.** Any plant of the genus canna having large sheathing leaves and clusters of large showy flowers. | *"There Sophy tight, a lassie bright, Besides a handsome fortune: Wha canna win her in a night, Has little art in courtin’."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[cannabidaceae]] | noun | **1.** Two genera of erect or twining herbs that are pollinated by the wind, including the genera cannabis and humulus; term not used in all classifications; in some the genus cannabis is placed in the family moraceae and the genus humulus in the family urticaceae. | *"In academic literature, cannabidaceae designates two genera of erect or twining herbs that are pollinated by the wind, including the genera cannabis and humulus; term not used in all classifications; in some the genus cannabis is placed in the family moraceae and the genus humulus in the family urticaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannabin]] | noun | **1.** A resin obtained from the hemp plant; thought to be the active narcotic agent in marijuana. | *"In academic literature, cannabin designates a resin obtained from the hemp plant; thought to be the active narcotic agent in marijuana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannabis]] | noun | **1.** Any plant of the genus cannabis; a coarse bushy annual with palmate leaves and clusters of small green flowers; yields tough fibers and narcotic drugs.<br>**2.** The most commonly used illicit drug; considered a soft drug, it consists of the dried leaves of the hemp plant; smoked or chewed for euphoric effect. | *"In academic literature, cannabis designates any plant of the genus cannabis; a coarse bushy annual with palmate leaves and clusters of small green flowers; yields tough fibers and narcotic drugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannaceae]] | noun | **1.** Coextensive with the genus canna. | *"In academic literature, cannaceae designates coextensive with the genus canna."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannae]] | noun | **1.** Ancient city is southeastern italy where hannibal defeated the romans in 216 bc. | *"In academic literature, cannae designates ancient city is southeastern italy where hannibal defeated the romans in 216 bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canned]] | verb | **1.** Preserve in a can or tin.<br>**2.** Terminate the employment of; discharge from an office or position. | *"Chicago canned milk never gave more comfort than on this occasion, I assure you."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[cannelloni]] | noun | **1.** Tubular pasta filled with meat or cheese. | *"In academic literature, cannelloni designates tubular pasta filled with meat or cheese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannery]] | noun | **1.** A factory where food is canned. | *"Pine Camp was in the midst of a vast huckleberry country, and at the Forks a cannery had been established."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[cannes]] | noun | **1.** A port and resort city on the french riviera; site of an annual film festival. | *"So imprisoned and tortured was this gentle little heart, when in the month of March, Anno Domini 1815, Napoleon landed at Cannes, and Louis XVIII fled, and all Europe was in alarm, and the funds fell, and old John Sedley was ruined."* — William Makepeace Thackeray, *Vanity Fair* |
| [[cannibal]] | noun | **1.** A person who eats human flesh. | *"Vholes and his relations being minor cannibal chiefs and it being proposed to abolish cannibalism, indignant champions were to put the case thus: Make man-eating unlawful, and you starve the Vholeses!"* — Charles Dickens, *Bleak House* |
| [[cannibalic]] | adjective | **1.** Marked by barbarity suggestive of a cannibal; rapaciously savage. | *"In academic literature, cannibalic designates marked by barbarity suggestive of a cannibal; rapaciously savage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannibalise]] | verb | **1.** Eat human flesh.<br>**2.** Use parts of something to repair something else. | *"In academic literature, cannibalise designates eat human flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannibalism]] | noun | **1.** The practice of eating the flesh of your own kind. | *"Vholes and his relations being minor cannibal chiefs and it being proposed to abolish cannibalism, indignant champions were to put the case thus: Make man-eating unlawful, and you starve the Vholeses!"* — Charles Dickens, *Bleak House* |
| [[cannibalistic]] | adjective | **1.** Characteristic of cannibals or exhibiting cannibalism. | *"In academic literature, cannibalistic designates characteristic of cannibals or exhibiting cannibalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannibalize]] | verb | **1.** Eat human flesh.<br>**2.** Use parts of something to repair something else. | *"Repairs would be accomplished through use of anything from on-site fabricated bits-and-pieces to parts and assemblies cannibalized from wrecked aircraft."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[cannikin]] | noun | **1.** A wooden bucket.<br>**2.** A small can. | *"Some wine, ho! [_Sings._] _And let me the cannikin clink, clink, And let me the cannikin clink, clink: A soldier’s a man, O, man’s life’s but a span, Why then let a soldier drink._ Some wine, boys!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cannily]] | adverb | **1.** With foresight. | *"No, sir; all was very still.” “We shall get you off cannily, Dick: and it will be better, both for your sake, and for that of the poor creature in yonder."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[cannister]] | noun | **1.** Metal container for storing dry foods such as tea or flour. | *"In academic literature, cannister designates metal container for storing dry foods such as tea or flour."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannon]] | noun | **1.** A large artillery gun that is usually on wheels.<br>**2.** Heavy gun fired from a tank. | *"Then a soldier, Full of strange oaths and bearded like the pard, Jealous in honour, sudden and quick in quarrel, Seeking the bubble reputation Even in the cannon’s mouth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cannonade]] | noun | **1.** Intense and continuous artillery fire.<br>**2.** Attack with cannons or artillery. | *"The immortal tune ended, a fine DD rolling forth from the bass-viol with the sonorousness of a cannonade, and Gabriel delayed his entry no longer."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[cannonball]] | noun | **1.** A solid projectile that in former times was fired from a cannon. | *"In the course of the argument cannonballs, scimitars, boomerangs, blunderbusses, stinkpots, meatchoppers, umbrellas, catapults, knuckledusters, sandbags, lumps of pig iron were resorted to and blows were freely exchanged."* — James Joyce, *Ulysses* |
| [[cannoneer]] | noun | **1.** A serviceman in the artillery. | *"Give me the cups; And let the kettle to the trumpet speak, The trumpet to the cannoneer without, The cannons to the heavens, the heavens to earth, ‘Now the King drinks to Hamlet.’ Come, begin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cannula]] | noun | **1.** A small flexible tube inserted into a body cavity for draining off fluid or introducing medication. | *"In academic literature, cannula designates a small flexible tube inserted into a body cavity for draining off fluid or introducing medication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannular]] | adjective | **1.** Constituting a tube; having hollow tubes (as for the passage of fluids). | *"In academic literature, cannular designates constituting a tube; having hollow tubes (as for the passage of fluids)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulate]] | verb | **1.** Introduce a cannula or tube into. | *"In academic literature, cannulate designates introduce a cannula or tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulation]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, cannulation designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulisation]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, cannulisation designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulise]] | verb | **1.** Introduce a cannula or tube into. | *"In academic literature, cannulise designates introduce a cannula or tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulization]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, cannulization designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cannulize]] | verb | **1.** Introduce a cannula or tube into. | *"In academic literature, cannulize designates introduce a cannula or tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canny]] | adjective | **1.** Showing self-interest and shrewdness in dealing with others. | *"All the attractions in the world cannot worm shillings out of a public which is so prudent and canny that it has self-guarded itself by leaving its cash at home!"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[canoe]] | noun | **1.** Small and light boat; pointed at both ends; propelled with a paddle.<br>**2.** Travel by canoe. | *"I am taboo—sacred as the sacred canoe-house under the floor of which repose the bones of heaven alone knows how many previous kings of Raa Kook’s line."* — Jack London, *The Jacket (The Star-Rover)* |
| [[canoeist]] | noun | **1.** Someone paddling a canoe. | *"In academic literature, canoeist designates someone paddling a canoe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canola]] | noun | **1.** Vegetable oil made from rapeseed; it is high in monounsaturated fatty acids. | *"In academic literature, canola designates vegetable oil made from rapeseed; it is high in monounsaturated fatty acids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canon]] | noun | **1.** A rule or especially body of rules or principles generally established as valid and fundamental in a field or art or philosophy.<br>**2.** A priest who is a member of a cathedral chapter. | *"Besides, virginity is peevish, proud, idle, made of self-love, which is the most inhibited sin in the canon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canonic]] | adjective | **1.** Appearing in a biblical canon.<br>**2.** Of or relating to or required by canon law. | *"In academic literature, canonic designates appearing in a biblical canon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canonical]] | adjective | **1.** Appearing in a biblical canon.<br>**2.** Of or relating to or required by canon law. | *"But it may be more than a coincidence that his countrymen were impressed with his knowledge of the national literature; and traces of other than canonical books have been found in his teaching."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[canonically]] | adverb | **1.** In a canonical manner. | *"Behind this lightsome couple, so close to the Maypole that its boughs shaded his jovial face, stood the figure of an English priest, canonically dressed, yet decked with flowers, in heathen fashion, and wearing a chaplet of the native vine leaves."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[canonisation]] | noun | **1.** (roman catholic and eastern orthodox church) the act of admitting a deceased person into the canon of saints. | *"For them he is the "banner of freedom," which, "Torn but flying, Streams like a thunder-cloud against the wind." He has suffered that worst indignity of canonisation as a being saintly and superhuman, not subject to the morality of ordinary mortals."* — Sydney Waterlow, *Shelley* |
| [[canonise]] | verb | **1.** Treat as a sacred person.<br>**2.** Declare (a dead person) to be a saint. | *"On his house-top, he displayed pike and cap, as a good citizen must, and in a window he had stationed his saw inscribed as his “Little Sainte Guillotine”--for the great sharp female was by that time popularly canonised."* — Charles Dickens, *A Tale of Two Cities* |
| [[canonised]] | verb | **1.** Treat as a sacred person.<br>**2.** Declare (a dead person) to be a saint. | *"On his house-top, he displayed pike and cap, as a good citizen must, and in a window he had stationed his saw inscribed as his “Little Sainte Guillotine”--for the great sharp female was by that time popularly canonised."* — Charles Dickens, *A Tale of Two Cities* |
| [[canonist]] | noun | **1.** A specialist in canon law.<br>**2.** Pertaining to or characteristic of a body of rules and principles accepted as axiomatic; e.g. | *"In academic literature, canonist designates a specialist in canon law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canonization]] | noun | **1.** (roman catholic and eastern orthodox church) the act of admitting a deceased person into the canon of saints. | *"In academic literature, canonization designates (roman catholic and eastern orthodox church) the act of admitting a deceased person into the canon of saints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canonize]] | verb | **1.** Declare (a dead person) to be a saint.<br>**2.** Treat as a sacred person. | *"Why, even the churches that believe in saints don't canonize mortals until they have been a hundred years dead--they want to be sure they are dead and their mortal weaknesses forgotten." Amanda laughed."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[canonized]] | verb | **1.** Declare (a dead person) to be a saint.<br>**2.** Treat as a sacred person. | *"His champions are the prophets and apostles, His weapons holy saws of sacred writ, His study is his tilt-yard, and his loves Are brazen images of canonized saints."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canoodle]] | verb | **1.** Fondle or pet affectionately. | *"In academic literature, canoodle designates fondle or pet affectionately."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canopied]] | verb | **1.** Cover with a canopy.<br>**2.** Covered with or as with a canopy. | *"The flame o’ th’ taper Bows toward her and would under-peep her lids To see th’ enclosed lights, now canopied Under these windows white and azure, lac’d With blue of heaven’s own tinct."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canopus]] | noun | **1.** Supergiant star 650 light years from earth; second brightest star in the sky. | *"He points it burning towards Sirius; he says that Sirius shall twinkle like Canopus."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[canopy]] | noun | **1.** The transparent covering of an aircraft cockpit.<br>**2.** The umbrellalike part of a parachute that fills with air. | *"Gives not the hawthorn bush a sweeter shade To shepherds looking on their silly sheep Than doth a rich embroidered canopy To kings that fear their subjects’ treachery?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canorous]] | adjective | **1.** Richly melodious. | *"In academic literature, canorous designates richly melodious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cant]] | noun | **1.** Stock phrases that have become nonsense through endless repetition.<br>**2.** A slope in the turn of a road or track; the outside is higher than the inside in order to reduce the effects of centrifugal force. | *"I am no novel-reader—I seldom look into novels—Do not imagine that _I_ often read novels—It is really very well for a novel.” Such is the common cant."* — Jane Austen, *Northanger Abbey* |
| [[cantabile]] | adjective | **1.** Smooth and flowing. | *"In academic literature, cantabile designates smooth and flowing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantabrigian]] | noun | **1.** A resident of cambridge. | *"In academic literature, cantabrigian designates a resident of cambridge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantala]] | noun | **1.** Hard fiber used in making coarse twine; from philippine agave plants.<br>**2.** Philippine plant yielding a hard fibre used in making coarse twine. | *"In academic literature, cantala designates hard fiber used in making coarse twine; from philippine agave plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantaloup]] | noun | **1.** A variety of muskmelon vine having fruit with a tan rind and orange flesh.<br>**2.** The fruit of a cantaloup vine; small to medium-sized melon with yellowish flesh. | *"In academic literature, cantaloup designates a variety of muskmelon vine having fruit with a tan rind and orange flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantaloupe]] | noun | **1.** A variety of muskmelon vine having fruit with a tan rind and orange flesh.<br>**2.** The fruit of a cantaloup vine; small to medium-sized melon with yellowish flesh. | *"Look--what's that over there?" At nearly the same level as themselves and directly over the city of Newark a huge globular object, not unlike an enormous green cantaloupe, appeared to float in the air."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[cantankerous]] | adjective | **1.** Stubbornly obstructive and unwilling to cooperate; - spectator.<br>**2.** Having a difficult and contrary disposition; - dorothy sayers. | *"The hardy cantankerous Serb, Whom even the Turk couldn't curb, In having a go With Emperor Joe, Will the plans of the Kaiser disturb."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[cantankerously]] | adverb | **1.** In a bad mood. | *"In academic literature, cantankerously designates in a bad mood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantata]] | noun | **1.** A musical composition for voices and orchestra based on a religious text. | *"Hurrah!” cried the three hundred voices again, but instead of the band a choir began singing a cantata composed by Paul Ivánovich Kutúzov: Russians!"* — graf Leo Tolstoy, *War and Peace* |
| [[canted]] | verb | **1.** Heel over.<br>**2.** Departing or being caused to depart from the true vertical or horizontal. | *"A continual cascade played at the bows; a ceaseless whirling eddy in her wake; and, at the slightest motion from within, even but of a little finger, the vibrating, cracking craft canted over her spasmodic gunwale into the sea."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[canteen]] | noun | **1.** A flask for carrying water; used by soldiers or travelers.<br>**2.** Sells food and personal items to personnel at an institution or school or camp etc. | *"Only those things he always kept with him remained in his room; a small box, a large canteen fitted with silver plate, two Turkish pistols and a saber—a present from his father who had brought it from the siege of Ochákov."* — graf Leo Tolstoy, *War and Peace* |
| [[canter]] | noun | **1.** A smooth three-beat gait; between a trot and a gallop.<br>**2.** Ride at a canter. | *"Then there was a pony expressly for my riding, a chubby pony with a short neck and a mane all over his eyes who could canter—when he would—so easily and quietly that he was a treasure."* — Charles Dickens, *Bleak House* |
| [[canterbury]] | noun | **1.** A town in kent in southeastern england; site of the cathedral where thomas a becket was martyred in 1170; seat of the archbishop and primate of the anglican church. | *"But, my lads, my lads, tomorrow morning, by four o’clock early at Gad’s Hill, there are pilgrims going to Canterbury with rich offerings, and traders riding to London with fat purses."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cantering]] | verb | **1.** Ride at a canter.<br>**2.** Go at a canter, of horses. | *"They had reached the front of the house, and were about to go in, when a boy on horseback came cantering up the avenue, and handed a telegram to Edward."* — Martha Finley, *Elsie's Kith and Kin* |
| [[cantharellus]] | noun | **1.** A well-known genus of fungus; has funnel-shaped fruiting body; includes the chanterelles. | *"In academic literature, cantharellus designates a well-known genus of fungus; has funnel-shaped fruiting body; includes the chanterelles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canthus]] | noun | **1.** Either of the corners of the eye where the upper and lower eyelids meet. | *"In academic literature, canthus designates either of the corners of the eye where the upper and lower eyelids meet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canticle]] | noun | **1.** A hymn derived from the bible. | *"What a noble thing is that canticle in the fish’s belly!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[canticles]] | noun | **1.** An old testament book consisting of a collection of love poems traditionally attributed to solomon but actually written much later.<br>**2.** A hymn derived from the bible. | *"In academic literature, canticles designates an old testament book consisting of a collection of love poems traditionally attributed to solomon but actually written much later."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantilever]] | noun | **1.** Projecting horizontal beam fixed at one end only.<br>**2.** Project as a cantilever. | *"Gazing at it each day, there rose up slowly by degrees in his mind, like a dream, the picture of a great work on a new and startling principle--a modification of the cantilever to the necessities of the situation."* — Grant Allen, *Michael's Crag* |
| [[cantillate]] | verb | **1.** Recite with musical intonation; recite as a chant or a psalm. | *"In academic literature, cantillate designates recite with musical intonation; recite as a chant or a psalm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantillation]] | noun | **1.** Liturgical chanting. | *"In academic literature, cantillation designates liturgical chanting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantle]] | noun | **1.** The back of a saddle seat. | *"The greater cantle of the world is lost With very ignorance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[canto]] | noun | **1.** The highest part (usually the melody) in a piece of choral music.<br>**2.** A major division of a long poem. | *"Part three, for instance, contains a poem that reads like a parody of Belinda awaking in the first canto of Pope's _Rape of the Lock_."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[canton]] | noun | **1.** A city on the zhu jiang delta in southern china; the capital of guangdong province and a major deep-water port.<br>**2.** A small administrative division of a country. | *"The custom prevailed, for example, throughout the canton of Lucerne."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[cantonal]] | adjective | **1.** Of or relating to a canton. | *"In academic literature, cantonal designates of or relating to a canton."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantonese]] | noun | **1.** The dialect of chinese spoken in canton and neighboring provinces and in hong kong and elsewhere outside china. | *"In academic literature, cantonese designates the dialect of chinese spoken in canton and neighboring provinces and in hong kong and elsewhere outside china."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cantonment]] | noun | **1.** Temporary living quarters specially built by the army for soldiers. | *"Her Ladyship, our old acquaintance, is as much at home at Madras as at Brussels in the cantonment as under the tents."* — William Makepeace Thackeray, *Vanity Fair* |
| [[cantor]] | noun | **1.** The musical director of a choir.<br>**2.** The official of a synagogue who conducts the liturgical part of the service and sings or chants the prayers intended to be performed as solos. | *"In academic literature, cantor designates the musical director of a choir."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canty]] | adjective | **1.** Lively and brisk. | *"The clachan yill had made me canty, I was na fou, but just had plenty; I stacher’d whiles, but yet too tent aye To free the ditches; An’ hillocks, stanes, an’ bushes, kenn’d eye Frae ghaists an’ witches."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[canuck]] | noun | **1.** Informal term for canadians in general and french canadians in particular. | *"Our Jack Canuck is active, He plays a pretty goal, But make swift runs to cover When drums begin to roll."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[canulate]] | verb | **1.** Introduce a cannula or tube into. | *"In academic literature, canulate designates introduce a cannula or tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canulation]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, canulation designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canulisation]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, canulisation designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canulization]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, canulization designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[canute]] | noun | **1.** King of denmark and norway who forced edmund ii to divide england with him; on the death of edmund ii, canute became king of all england (994-1035). | *"The great castle of Norwich, built by Canute, and the great tower at Bury, prove their civilization and skill in architecture."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[canyon]] | noun | **1.** A ravine formed by a river in an area with little rainfall. | *"It was just a bleak waste of a landscape, barren of trees and vegetation, a shallow canyon with easy-sloping walls of rubble."* — Jack London, *The Jacket (The Star-Rover)* |
| [[canyonside]] | noun | **1.** The steeply sloping side of a canyon. | *"In academic literature, canyonside designates the steeply sloping side of a canyon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosecant]] | noun | **1.** Ratio of the hypotenuse to the opposite side of a right-angled triangle. | *"In academic literature, cosecant designates ratio of the hypotenuse to the opposite side of a right-angled triangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decant]] | verb | **1.** Pour out. | *"It is an ineffably oozy, stringy affair, most frequently found in the tubs of sperm, after a prolonged squeezing, and subsequent decanting."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[decantation]] | noun | **1.** The act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees. | *"In academic literature, decantation designates the act of gently pouring off a clear liquor (as from its original bottle) without disturbing the lees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decanter]] | noun | **1.** A bottle with a stopper; for serving wine or water. | *"He left his compliments, and would you partake of some refreshment”—there were biscuits and a decanter of wine on a small table—“and look over the paper,” which the young gentleman gave me as he spoke."* — Charles Dickens, *Bleak House* |
| [[discant]] | noun | **1.** A decorative musical accompaniment (often improvised) added above a basic melody. | *"In academic literature, discant designates a decorative musical accompaniment (often improvised) added above a basic melody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incan]] | noun | **1.** A member of the quechuan people living in the cuzco valley in peru.<br>**2.** Of or pertaining to the incas or their culture or empire. | *"In academic literature, incan designates a member of the quechuan people living in the cuzco valley in peru."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incantation]] | noun | **1.** A ritual recitation of words or sounds believed to have a magical effect. | *"He beheld it all by degrees, stared in stupefaction at the scene, as if he thought it an illusion raised by some fiendish incantation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[precancerous]] | adjective | **1.** Of or relating to a growth that is not malignant but is likely to become so if not treated. | *"In academic literature, precancerous designates of or relating to a growth that is not malignant but is likely to become so if not treated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recant]] | verb | **1.** Formally reject or disavow a formerly held belief, usually under pressure. | *"He shall do this, or else I do recant The pardon that I late pronounced here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recantation]] | noun | **1.** A disavowal or taking back of a previous assertion. | *"Your lord and master did well to make his recantation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secant]] | noun | **1.** A straight line that intersects a curve at two or more points.<br>**2.** Ratio of the hypotenuse to the adjacent side of a right-angled triangle. | *"In academic literature, secant designates a straight line that intersects a curve at two or more points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncannily]] | adverb | **1.** In an uncanny manner. | *"Ukridge became uncannily silent."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[uncanny]] | adjective | **1.** Suggesting the operation of supernatural influences; ; ; - john galsworthy; ; - henry kingsley.<br>**2.** Surpassing the ordinary or normal;  - george will. | *"It is always other people who tell, and those have been told again by others, that something uncanny has been seen at the castle."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |

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
    ROOT DASHBOARD · CAN_DOG
  </div>
</div>
