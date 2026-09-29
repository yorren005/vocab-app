---
status: unread
type: root_dashboard
---
# Dashboard — vill
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vill-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“country house or farm estate”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Laying bricks to build a sturdy home or resting inside a safe shelter.</span>
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

The root **vill** means country house or farm estate. It refers to a dwelling place, shelter, or family lineage. In English, this root forms words such as *settlement*, *ecology*, *villa*, and *villas*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: country house or farm estate
> The root **vill** means country house or farm estate. It refers to a dwelling place, shelter, or family lineage. In English, this root forms words such as *settlement*, *ecology*, *villa*, and *villas*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Country house or farm estate</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Laying bricks to build a sturdy home or resting inside a safe shelter.</mark>
> - **Everyday Connection**: Think of familiar words like *settlement* and *ecology*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vill** comes from a Latin word that means *"country house or farm estate"*.
  - At its core, it describes country house or farm estate.

- **The Big Picture Idea**:
  - Picture laying bricks to build a sturdy home or resting inside a safe shelter.
  - Whenever you see **vill** in an English word, think of **building, crafting, and dwelling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of country house or farm estate.
  - **Mental & Social**: How people experience, organize, or communicate about country house or farm estate.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Settlement**: An everyday English word showing the root's idea of *country house or farm estate*.
  - **Ecology**: An everyday English word showing the root's idea of *country house or farm estate*.
  - **Villa**: An ancient Roman country estate encompassing residential quarters, agricultural production facilities, and surrounding farmland.
  - **Villas**: Plural of villa.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vill</mark>, think of <mark class="hl-def">building, crafting, and dwelling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Compounding Behavior
> The root **vill** manifests across three primary historical stems:
> - **Primary Classical Noun:** `villa` (Latin *vīlla*):
>   - Borrowed directly into English as [[villa]] (plural [[villas]]).
>   - Learned Miltonic adjective: *vill- + -atic* → [[villatic]] ("rural, of a villa").
> - **Collective Settlement Stem:** `villātic-` (Latin *villāticus* "belonging to a country house"):
>   - Late Latin neuter *villāticum* → Old French *village* → English [[village]], [[villager]], [[villagery]].
> - **Feudal & Moral Pejorative Stem:** `villān-` (Latin *villānus* "farmhand"):
>   - Feudal legal doublet: Old French *vilain* → English [[villein]], [[villeinage]].
>   - Modern moral evolution: English [[villain]], [[villainous]], [[villainy]], [[villainously]].
> - **Pastoral Folk-Song Diminutive:**
>   - Italian *villanella* ("rustic country girl / song") → French → English [[villanelle]].

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

> [!tip] 🌈 Spectrum of Meaning Across Three Cultural Spheres
> 1. **Architecture & Pastoral Retreat:** The rural country residence, Mediterranean vacation estate, and rustic domestic farmstead ([[villa]], [[villas]], [[villatic]]).
> 2. **Communal Geography & Settlement:** The rural human habitat intermediate between a hamlet and a market town, its inhabitants, and village clusters ([[village]], [[villager]], [[villagery]]).
> 3. **Feudal Bondage, Moral Treachery & Literary Drama:** The medieval agricultural serf, the historical system of serfdom, and the evolution of aristocratic class prejudice into universal moral depravity and stage melodrama ([[villein]], [[villeinage]], [[villain]], [[villainous]], [[villainy]], [[villainously]], [[villanelle]]).

---

## 🔀 4. Prefix & Combining Dynamics on vill

### Prefix Dynamics
Because Latin *vīlla* is a root noun of place rather than an action verb, it accepts no directional Latin verbal prefixes; rather, its entire English family is generated through **social, diminutive, and grammatical suffixation**.

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-atic` | Adjective (Pertaining to) | [[villatic]] | Of or pertaining to a villa or country farmstead. |
| `-age` *(via OF)* | Noun (Collective Settlement) | [[village]] | A cluster of rural houses; an estate settlement. |
| `-er` | Noun (Resident Agent) | [[villager]] | A person who resides in a rural village. |
| `-ery` | Noun (Collective Body) | [[villagery]] | Villages or villagers viewed collectively. |
| `-ānus` → `-ein` | Noun (Feudal Peasant) | [[villein]] | An unfree tenant farmer bound to a feudal manor. |
| `-inage` | Noun (Feudal Condition) | [[villeinage]] | The legal status or tenure of a feudal serf. |
| `-ain` | Noun (Moral Scoundrel) | [[villain]] | A wicked person; the antagonist in a story. |
| `-ous` | Adjective (Characteristic) | [[villainous]] | Characterized by extreme wickedness or depravity. |
| `-y` | Noun (Abstract Quality / Act) | [[villainy]] | Depraved conduct; an atrocious or wicked action. |
| `-ously` | Adverb (Manner) | [[villainously]] | In a villainous, wicked, or treasonous manner. |
| `-elle` *(via Italian/French)* | Noun (Poetic Form) | [[villanelle]] | A 19-line fixed verse form rooted in rustic peasant song. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🏛️ **Archaeology & Roman History** | [[villa]], [[villas]], [[villatic]] | Excavation of Romano-British villas (e.g., Chedworth, Bignor), Roman agrarian slavery under Cato and Columella, and aristocratic luxury at Hadrian's Villa in Tivoli. |
| 🗺️ **Human Geography & Rural Sociology** | [[village]], [[villager]], [[villagery]] | Nucleated versus dispersed rural settlement patterns, agrarian land enclosure acts, parish administrative boundaries, and rural-to-urban demographic migration. |
| ⚖️ **Medieval History & Legal Feudalism** | [[villein]], [[villeinage]] | The Domesday Book (1086) census of villeins (*villani*), manorial court rolls, obligations of *corvée* labor, and the Peasants' Revolt of 1381 demanding the abolition of villeinage. |
| 🎭 **Narrative Theory & Creative Writing** | [[villain]], [[villainous]], [[villainy]], [[villanelle]] | Antagonist character development in screenwriting and drama, the Byronic antihero, and poetic composition using the rigorous alternating refrain of the villanelle (e.g., Dylan Thomas, Elizabeth Bishop). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[coville]] | noun | **1.** Desert shrub of southwestern united states and new mexico having persistent resinous aromatic foliage and small yellow flowers. | *"In academic literature, coville designates desert shrub of southwestern united states and new mexico having persistent resinous aromatic foliage and small yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evilly]] | adverb | **1.** In a wicked evil manner. | *"O monument And wonder of good deeds evilly bestowed!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sevilla]] | noun | **1.** A city in southwestern spain; a major port and cultural center; the capital of bullfighting in spain. | *"Full swiftly Harold wends his lonely way Where proud Sevilla triumphs unsubdued: Yet is she free--the spoiler's wished-for prey!"* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[seville]] | noun | **1.** A city in southwestern spain; a major port and cultural center; the capital of bullfighting in spain. | *"Fair is proud Seville; let her country boast Her strength, her wealth, her site of ancient days, But Cadiz, rising on the distant coast, Calls forth a sweeter, though ignoble praise."* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[villa]] | noun | **1.** Mexican revolutionary leader (1877-1923).<br>**2.** Detached or semidetached suburban house. | *"They had taken a little villa in Sils on the mountain, which they had seen advertised for the summer months."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[villa-lobos]] | noun | **1.** Brazilian composer (1887-1959). | *"In academic literature, villa-lobos designates brazilian composer (1887-1959)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[village]] | noun | **1.** A community of people smaller than a town.<br>**2.** A settlement smaller than a town. | *"And to that end I have been with Sir Oliver Martext, the vicar of the next village, who hath promised to meet me in this place of the forest and to couple us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[villager]] | noun | **1.** One who has lived in a village most of their life. | *"Till then, my noble friend, chew upon this: Brutus had rather be a villager Than to repute himself a son of Rome Under these hard conditions as this time Is like to lay upon us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[villahermosa]] | noun | **1.** A city in southeastern mexico; the capital of the state of tabasco. | *"In academic literature, villahermosa designates a city in southeastern mexico; the capital of the state of tabasco."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villain]] | noun | **1.** A wicked or evil person; someone who does evil deliberately.<br>**2.** The principal bad character in a film or work of fiction. | *"He hath out-villain’d villainy so far that the rarity redeems him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[villainage]] | noun | **1.** The legal status or condition of servitude of a villein or feudal serf. | *"In academic literature, villainage designates the legal status or condition of servitude of a villein or feudal serf."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villainess]] | noun | **1.** A woman villain. | *"In academic literature, villainess designates a woman villain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villainous]] | adjective | **1.** Extremely wicked. | *"I’ll tell thee, Charles, it is the stubbornest young fellow of France, full of ambition, an envious emulator of every man’s good parts, a secret and villainous contriver against me his natural brother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[villainousness]] | noun | **1.** The quality of evil by virtue of villainous behavior. | *"In academic literature, villainousness designates the quality of evil by virtue of villainous behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villainy]] | noun | **1.** The quality of evil by virtue of villainous behavior.<br>**2.** A criminal or vicious act. | *"He hath out-villain’d villainy so far that the rarity redeems him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[villard]] | noun | **1.** United states railroad magnate and businessman (1835-1900). | *"In academic literature, villard designates united states railroad magnate and businessman (1835-1900)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villein]] | noun | **1.** (middle ages) a person who is bound to the land and owned by the feudal lord. | *"The villein had the use of the stock, pastures, fields, woodlands, provided he kept them undiminished and undestroyed to transmit to his children."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[villeinage]] | noun | **1.** The legal status or condition of servitude of a villein or feudal serf.<br>**2.** Tenure by which a villein held land. | *"In academic literature, villeinage designates the legal status or condition of servitude of a villein or feudal serf."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villoma]] | noun | **1.** A benign epithelial tumor forming a rounded mass. | *"In academic literature, villoma designates a benign epithelial tumor forming a rounded mass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[villon]] | noun | **1.** French poet (flourished around 1460). | *"It must have been like this in ancient Paris when Villon thieved and sang, and the wolves came clamoring at the gates ... and the crusaders in warm Palestine...."* — Donn Byrne, *The Wind Bloweth* |
| [[villus]] | noun | **1.** A minute hairlike projection on mucous membrane. | *"In academic literature, villus designates a minute hairlike projection on mucous membrane."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Building & Dwelling]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VILL
  </div>
</div>
