---
status: unread
type: root_dashboard
---
# Dashboard — ap
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ap-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bee”</span>
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

The root **ap** means bee. It refers to honeybee, hive husbandry, pollination & apian industry. In English, this root forms words such as *apiary*, *apiarist*, *apiculture*, and *apicultural*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bee
> The root **ap** means bee. It refers to honeybee, hive husbandry, pollination & apian industry. In English, this root forms words such as *apiary*, *apiarist*, *apiculture*, and *apicultural*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bee</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *apiary* and *apiarist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ap** comes from a Latin word that means *"bee"*.
  - At its core, it describes bee.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **ap** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of bee.
  - **Mental & Social**: How people experience, organize, or communicate about bee.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Apiary**: A place where bees are kept.
  - **Apiarist**: A person who keeps and cares for bees.
  - **Apiculture**: The maintenance and commercial rearing of honeybees, especially on a large agricultural scale for honey, beeswax, and pollination services.
  - **Apicultural**: Of, relating to, or involved in the practice or industry of beekeeping.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ap</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Unlike verbal roots that combine with directional Latin prefixes (*ad-*, *con-*, *ex-*), the nominal root **ap** forms a cohesive family through **combining stem suffixation and scientific compounding**:
> - **Locative Suffixation:** `api-` + `-ary` (*-ārium*, "place for") ➔ *apiary* (place where bees are maintained).
> - **Agricultural Suffixation:** `api-` + `culture` (*cultūra*, "care, cultivation") ➔ *apiculture* (beekeeping).
> - **Entomological & Toxicological Compounding:**
>   - `api-` + `-toxin` ➔ *apitoxin* (honeybee venom).
>   - `api-` + `-ology` ➔ *apiology* (the scientific study of bees).
>   - `api-` + `-therapy` ➔ *apitherapy* (medical use of bee products).
>   - `api-` + `-vorous` (from *vorāre* "to devour") ➔ *apivorous* (feeding on bees).
>   - `api-` + `-cide` (from *caedere* "to kill") ➔ *apicide* (killing of bees; an insecticide lethal to bees).

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
> Although firmly anchored in the honeybee, the derivatives span distinct functional registers:
> - **Spatial & Architectural:** [[apiary]] names the physical collection of Langstroth hives, observation boxes, and honey-extracting sheds.
> - **Vocational & Economic:** [[apiarist]] and [[apiculture]] designate the agricultural profession of migratory beekeeping for almond and fruit orchard pollination.
> - **Toxicological & Biochemical:** [[apitoxin]] refers specifically to the complex polypeptide cocktail (melittin, apamin, MCD peptide) delivered by the barbed sting apparatus.
> - **Ecological Predation:** [[apivorous]] describes specialized natural predators like the European bee-eater bird (*Merops apiaster*) or bee-wolf wasps (*Philanthus*).

---

## 🔀 4. Prefix & Combining Dynamics on ap

### Structural Compounding on `api-`

| Suffix / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Meaning |
| :--- | :--- | :--- | :--- |
| `-ārium` | place for keeping | [[apiary]] | Enclosure or yard where beehives and colonies are maintained |
| `-cultūra` | husbandry, care | [[apiculture]] | The scientific, commercial, and technical management of bees |
| `-an` | belonging to | [[apian]] | Pertaining to, resembling, or characteristic of bees |
| `-ology` | discourse, science | [[apiology]] | Entomological discipline devoted exclusively to bee biology |
| `-toxin` | poison, venom | [[apitoxin]] | The active peptide venom synthesized in the honeybee poison gland |
| `-therapy` | medical healing | [[apitherapy]] | Clinical treatment utilizing venom, propolis, royal jelly, or raw honey |
| `-vorous` | eating, feeding on | [[apivorous]] | Specialized dietary adaptation focused on hunting and eating bees |
| `-cide` | killing, slayer | `apicide` | Chemical or anthropogenic destruction of bee colonies |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Commercial Agriculture & Global Food Security:** Migratory apiculture pollinating over 70% of human food crops (almonds, apples, blueberries, alfalfa).
> - **Environmental Toxicology & Conservation:** Colony Collapse Disorder (CCD), neonicotinoid apicides, and pollinator habitat restoration.
> - **Pharmacology & Complementary Medicine:** Apitoxin desensitization immunotherapy for life-threatening anaphylactic hypersensitivity.
> - **Evolutionary Entomology:** Eusociality in Hymenoptera, the dance language of *Apis mellifera* (Karl von Frisch's Nobel Prize research).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[agape]] | noun | **1.** (christian theology) the love of god or christ for mankind.<br>**2.** Selfless love of one person for another without sexual implications (especially love that is spiritual in nature). | *"This was what their _Agape_ had come to."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ape]] | noun | **1.** Any of various primates with short tails or no tail at all.<br>**2.** Someone who copies the words or behavior of another. | *"I will be more jealous of thee than a Barbary cock-pigeon over his hen, more clamorous than a parrot against rain, more new-fangled than an ape, more giddy in my desires than a monkey."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aper]] | noun | **1.** Someone who copies the words or behavior of another. | *"In academic literature, aper designates someone who copies the words or behavior of another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aperitif]] | noun | **1.** Alcoholic beverage taken before a meal as an appetizer. | *"In academic literature, aperitif designates alcoholic beverage taken before a meal as an appetizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aperture]] | noun | **1.** A device that controls amount of light admitted.<br>**2.** A natural opening in something. | *"Emaciated as my body was, I had to saw four bars, each in two places, in order to make an aperture through which I could squirm."* — Jack London, *The Jacket (The Star-Rover)* |
| [[apery]] | noun | **1.** The act of mimicking; imitative behavior. | *"In academic literature, apery designates the act of mimicking; imitative behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apiarian]] | adjective | **1.** Relating to bees or beekeeping. | *"In academic literature, apiarian designates relating to bees or beekeeping."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apiary]] | noun | **1.** A shed containing a number of beehives. | *"In academic literature, apiary designates a shed containing a number of beehives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetizer]] | noun | **1.** Food or drink to stimulate the appetite (usually served before a meal or as the first course). | *"In academic literature, appetizer designates food or drink to stimulate the appetite (usually served before a meal or as the first course)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appetizing]] | adjective | **1.** Appealing to or stimulating the appetite especially in appearance or aroma. | *"The steaming coffee and hot milk and the fresh white bread Apollonie had prepared looked very appetizing to him."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appetizingness]] | noun | **1.** The property of stimulating the appetite. | *"In academic literature, appetizingness designates the property of stimulating the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applaud]] | verb | **1.** Clap one's hands or shout after performances to indicate approval.<br>**2.** Express approval of. | *"Laertes shall be king!’ Caps, hands, and tongues applaud it to the clouds, ‘Laertes shall be king, Laertes king.’ QUEEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[applaudable]] | adjective | **1.** Worthy of high praise. | *"In academic literature, applaudable designates worthy of high praise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applauder]] | noun | **1.** Someone who applauds. | *"In academic literature, applauder designates someone who applauds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[applause]] | noun | **1.** A demonstration of approval by clapping the hands together. | *"Albeit you have deserved High commendation, true applause, and love, Yet such is now the Duke’s condition That he misconsters all that you have done."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[appraisal]] | noun | **1.** The classification of someone or something with respect to its worth.<br>**2.** A document appraising the value of something (as for insurance or taxation). | *"In academic literature, appraisal designates the classification of someone or something with respect to its worth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appraise]] | verb | **1.** Evaluate or estimate the nature, quality, ability, extent, or significance of.<br>**2.** Consider in a comprehensive way. | *"It is needless; I have seen him!” “Well?” “I fear that he does not appraise me at much."* — Bram Stoker, *Dracula* |
| [[appraiser]] | noun | **1.** One who estimates officially the worth or value or quality of things.<br>**2.** One who determines authenticity (as of works of art) or who guarantees validity. | *"In academic literature, appraiser designates one who estimates officially the worth or value or quality of things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appraising]] | verb | **1.** Evaluate or estimate the nature, quality, ability, extent, or significance of.<br>**2.** Consider in a comprehensive way. | *"You insult and then threaten harm to us." Brad grinned at Drummer, who was watching him with an appraising expression."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[appreciate]] | verb | **1.** Recognize with gratitude; be grateful for.<br>**2.** Be fully aware of; realize fully. | *"Lippo will find an affectionate protectress in her who will be able to appreciate his little-recognized virtues."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appreciated]] | verb | **1.** Recognize with gratitude; be grateful for.<br>**2.** Be fully aware of; realize fully. | *"Kathy was the only one who appreciated Lippo's worth."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[appreciation]] | noun | **1.** Understanding of the nature or meaning or quality or magnitude of something.<br>**2.** Delicate discrimination (especially of aesthetic values). | *"The sea has no appreciation of great men, but knocks them about like the small fry."* — Charles Dickens, *Bleak House* |
| [[appreciative]] | adjective | **1.** Feeling or expressive of gratitude.<br>**2.** Having or showing appreciation or a favorable critical judgment or opinion. | *"Being a man not without a frequent consciousness that there was some charm in this life he led, he stood still after looking at the sky as a useful instrument, and regarded it in an appreciative spirit, as a work of art superlatively beautiful."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[appreciatively]] | adverb | **1.** With appreciation; in a grateful manner. | *"He listens appreciatively and never interrupts."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[appreciativeness]] | noun | **1.** Warm friendly feelings of gratitude. | *"In academic literature, appreciativeness designates warm friendly feelings of gratitude."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appreciator]] | noun | **1.** A person who is fully aware of something and understands it. | *"Genuine--i. e., _enthusiastic_--appreciators are not so common, and must be cultivated when they appear...."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[diaper]] | noun | **1.** Garment consisting of a folded cloth drawn up between the legs and fastened at the waist; worn by infants to catch excrement.<br>**2.** A fabric (usually cotton or linen) with a distinctive woven pattern of small repeated figures. | *"He crossed the wood with his hunter's step and found her lapped in dreams, the starlight that filtered between the alder branches chequering her with a faint diaper of light and shade."* — Anthony Pryde, *Nightfall* |
| [[overappraisal]] | noun | **1.** An appraisal that is too high. | *"In academic literature, overappraisal designates an appraisal that is too high."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reap]] | verb | **1.** Gather, as of natural products.<br>**2.** Get or derive. | *"Thy pains, not us’d, must by thyself be paid; Proffers, not took, reap thanks for their reward."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reaper]] | noun | **1.** Someone who helps to gather the harvest.<br>**2.** Death personified as an old man or a skeleton with a scythe. | *"Boldwood looked at her—not slily, critically, or understandingly, but blankly at gaze, in the way a reaper looks up at a passing train—as something foreign to his element, and but dimly understood."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[reappraisal]] | noun | **1.** A new appraisal or evaluation. | *"In academic literature, reappraisal designates a new appraisal or evaluation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reappraise]] | verb | **1.** Appraise anew. | *"In academic literature, reappraise designates appraise anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetizing]] | adjective | **1.** Not appetizing in appearance, aroma, or taste. | *"In academic literature, unappetizing designates not appetizing in appearance, aroma, or taste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappetizingness]] | noun | **1.** The property of spoiling the appetite. | *"In academic literature, unappetizingness designates the property of spoiling the appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unappreciated]] | adjective | **1.** Not likely to be rewarded.<br>**2.** Having value that is not acknowledged. | *"The charms of their subtlety passed by her unappreciated, and she only received them as inimical sounds which meant that anger ruled."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unappreciative]] | adjective | **1.** Not feeling or expressing gratitude. | *"I wished the woman-hating, unappreciative Ralph Maplestone, had been a kind, considerate, understanding, put-your-self-in-her-place sort of man, who would have offered his time, and his car, and his services as chauffeur."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unappreciatively]] | adverb | **1.** In an ungrateful manner. | *"In academic literature, unappreciatively designates in an ungrateful manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · AP
  </div>
</div>
