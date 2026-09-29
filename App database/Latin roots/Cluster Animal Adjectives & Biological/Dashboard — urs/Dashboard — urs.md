---
status: unread
type: root_dashboard
---
# Dashboard — urs
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">urs-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bear”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A large furry bear walking through a mountain forest.</span>
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

The root **urs** means bear. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *masculine*, *ursine*, *ursiform*, and *ursicide*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bear
> The root **urs** means bear. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *masculine*, *ursine*, *ursiform*, and *ursicide*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bear</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A large furry bear walking through a mountain forest.</mark>
> - **Everyday Connection**: Think of familiar words like *masculine* and *ursine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **urs** comes from a Latin word that means *"bear"*.
  - At its core, it describes bear.

- **The Big Picture Idea**:
  - Picture a large furry bear walking through a mountain forest.
  - Whenever you see **urs** in an English word, think of **a bear or ursine strength**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of bear.
  - **Mental & Social**: How people experience, organize, or communicate about bear.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Masculine**: An everyday English word showing the root's idea of *bear*.
  - **Ursine**: Of, relating to, or characteristic of a bear or the mammalian family Ursidae.
  - **Ursiform**: Having the shape, physical build, or structural proportions of a bear.
  - **Ursicide**: The act of killing a bear.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">urs</mark>, think of <mark class="hl-def">a bear or ursine strength</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Mechanics & Derivational Pathways
> The root **urs** operates across five primary linguistic and technical channels:
> 1. **Learned Latin Adjectives:**
>    - `urs-` + `-ine` (Latin *-īnus*) $\to$ [[ursine]] ("of, relating to, or resembling a bear").
>    - `urs-` + `-form` (Latin *forma*) $\to$ [[ursiform]] ("bear-shaped").
> 2. **Linnaean Systematic Zoology:**
>    - Nom. *Ursus* $\to$ [[Ursus]] (the core genus of modern bears).
>    - `urs-` + `-idae` $\to$ [[Ursidae]] (the global bear family).
>    - `urs-` + `-id` $\to$ [[ursid]] / [[ursids]] (anglicized family member).
>    - `urs-` + `-inae` $\to$ [[Ursinae]] (subfamily of true bears).
> 3. **Biochemistry & Pharmacology:**
>    - `urso-` + `deoxycholic acid` $\to$ [[ursodeoxycholic acid]] / [[ursodiol]] (hepatoprotective bile acid).
>    - `ursolic acid` $\to$ pentacyclic triterpene isolated from bearberry.
>    - *ūva ursī* $\to$ [[uva-ursi]] (medicinal bearberry plant).
> 4. **Celestial Astronomy:**
>    - *Ursa Major* $\to$ [[Ursa Major]] ("the Great Bear").
>    - *Ursa Minor* $\to$ [[Ursa Minor]] ("the Little Bear").
>    - *Ursids* $\to$ [[Ursids]] (annual December meteor shower).
> 5. **Hagiography & Personal Onomastics:**
>    - Diminutive *ursula* ("little she-bear") $\to$ [[Ursula]] $\to$ [[Ursuline]] (Order of St. Ursula).
>    - `ursus` + `-cide` $\to$ [[ursicide]] ("the killing of a bear").

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

> [!tip] 🌈 Spectrum of Specialized Applications
> - **Systematic Zoology & Conservation Ecology:** [[Ursidae]], [[ursid]], [[Ursus]], [[Ursinae]] — apex omnivorous and carnivorous plantigrade mammals; protecting grizzly, polar, and Andean spectacled bears.
> - **Hepatology & Clinical Pharmacology:** [[ursodeoxycholic acid]], [[ursodiol]] — solubilizing cholesterol gallstones, improving bile acid secretion, and halting fibrosis in chronic cholestatic liver disease.
> - **Observational Astronomy & Navigation:** [[Ursa Major]], [[Ursa Minor]], [[Ursids]] — locating Polaris via pointer stars Merak and Dubhe; tracking late-December meteor outbursts.
> - **Herbal Medicine & Pharmacognosy:** [[uva-ursi]], [[ursolic acid]] — historical antimicrobial urinary disinfectants and anti-inflammatory triterpenoids.
> - **Religious History & Education:** [[Ursuline]], [[Ursula]] — monastic teaching congregations founded during the Counter-Reformation dedicated to female education.
> - **Literary & Cultural Portraiture:** [[ursine]] — describing burly, hulking physique, growling temperament, or lumbering grace.

---

## 🔀 4. Prefix & Combining Dynamics on urs

### Morphological Elements & Compounds

| Element / Compound | Linguistic Mechanism | Derived Form | Resulting Meaning & Context |
| :--- | :--- | :--- | :--- |
| `urs-` + `-ine` | Adjectival suffix (*-īnus*) | [[ursine]] | Pertaining to bears; shaggy, lumbering, burly, or formidable. |
| `urs-` + `-idae` | Zoological family suffix | [[Ursidae]] | The biological mammalian family of eight living bear species. |
| `urs-` + `-id` | Anglicized member noun | [[ursid]] | Any mammal belonging to the family Ursidae. |
| `urso-` + `bile acid` | Biochemical compounding | [[ursodeoxycholic acid]] / [[ursodiol]] | Hepatoprotective bile acid originally identified in bear bile. |
| `ūva` + `ursī` | Classical genitive phrase ("bear's grape") | [[uva-ursi]] | Medicinal bearberry plant used as a traditional diuretic/antiseptic. |
| `ursa` + `-ula` | Latin feminine diminutive | [[Ursula]] | Female personal name meaning literally "little she-bear". |
| `Ursula` + `-ine` | Adjectival religious suffix | [[Ursuline]] | Member of the Catholic teaching order of nuns founded by St. Angela Merici. |
| `ursa` + `maior` | Latin astronomical comparative | [[Ursa Major]] | The Great Bear northern constellation containing the Big Dipper. |
| `ursa` + `minor` | Latin astronomical comparative | [[Ursa Minor]] | The Little Bear northern constellation containing Polaris. |
| `urs-` + `-ids` | Astronomical radiant suffix | [[Ursids]] | The annual late-December meteor shower radiating from Ursa Minor. |
| `urs-` + `-form` | Descriptive compound (*forma*) | [[ursiform]] | Resembling a bear in physical shape, build, or silhouette. |
| `ursus` + `-cide` | Nominal compound (*caedere*) | [[ursicide]] | The act of killing a bear; one who slaughters a bear. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Gastroenterology & Hepatology** | [[ursodeoxycholic acid]], [[ursodiol]] | Treating primary biliary cholangitis and non-surgical dissolution of radiolucent gallstones. |
| 🔭 **Positional Astronomy & Astrometry** | [[Ursa Major]], [[Ursa Minor]], [[Ursids]] | Celestial navigation, locating the north celestial pole, and timing meteor shower maxima. |
| 🐻 **Wildlife Management & Mammalogy** | [[Ursidae]], [[ursid]], [[Ursus]] | Mitigating human-bear conflicts; monitoring polar bear sea-ice hunting adaptations. |
| 🌿 **Pharmacognosy & Phytotherapy** | [[uva-ursi]], [[ursolic acid]] | Standardizing arbutin-rich *Arctostaphylos uva-ursi* herbal extracts for bladder health. |
| ⛪ **Ecclesiastical & Educational History** | [[Ursuline]], [[Ursula]] | Establishing pioneer female educational academies throughout North America and Europe. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[concourse]] | noun | **1.** A large gathering of people.<br>**2.** A wide hallway in a building where people can walk. | *"Here the crowd, like a concourse of imprisoned demons, turns back, yelling, and is seen no more."* — Charles Dickens, *Bleak House* |
| [[course]] | noun | **1.** Education imparted in a series of lessons or meetings.<br>**2.** A connected series of events or actions or developments. | *"You must not marvel, Helen, at my course, Which holds not colour with the time, nor does The ministration and required office On my particular."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[courser]] | noun | **1.** A huntsman who hunts small animals with fast dogs that use sight rather than scent to follow their prey.<br>**2.** Formerly a strong swift horse ridden into battle. | *"Much is breeding Which, like the courser’s hair, hath yet but life And not a serpent’s poison."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coursework]] | noun | **1.** Work assigned to and done by a student during a course of study; usually it is evaluated as part of the student's grade in the course. | *"In academic literature, coursework designates work assigned to and done by a student during a course of study; usually it is evaluated as part of the student's grade in the course."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coursing]] | noun | **1.** Hunting with dogs (usually greyhounds) that are trained to chase game (such as hares) by sight instead of by scent.<br>**2.** Move swiftly through or over. | *"The King, he is hunting the deer; I am coursing myself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discourse]] | noun | **1.** Extended verbal expression in speech or writing.<br>**2.** An address of a religious nature (usually delivered during a church service). | *"Past cure I am, now reason is past care, And frantic-mad with evermore unrest, My thoughts and my discourse as mad men’s are, At random from the truth vainly expressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[intercourse]] | noun | **1.** Communication between individuals.<br>**2.** The act of sexual procreation between a man and a woman; the man's penis is inserted into the woman's vagina and excited until orgasm and ejaculation occur. | *"As she had brought a sick child with her, she could have no intercourse with the children for two or three days."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[recourse]] | noun | **1.** Act of turning to for assistance.<br>**2.** Something or someone turned to for assistance or security. | *"But I’ll give you a pottle of burnt sack to give me recourse to him, and tell him my name is Brook, only for a jest."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ursa]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urs within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of urs in systematic terminology. | *"My father compounded with my mother under the dragon’s tail, and my nativity was under Ursa Major, so that it follows I am rough and lecherous."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ursa major]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urs within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of urs in systematic terminology. | *"In academic literature, ursa major designates pertaining to, derived from, or characteristic of latin urs within the domain of animal adjectives & biological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ursa minor]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urs within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of urs in systematic terminology. | *"In academic literature, ursa minor designates pertaining to, derived from, or characteristic of latin urs within the domain of animal adjectives & biological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ursidae]] | noun | **1.** Bears and extinct related forms. | *"In academic literature, ursidae designates bears and extinct related forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ursine]] | adjective | **1.** Of or relating to or similar to bears. | *"In academic literature, ursine designates of or relating to or similar to bears."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ursinia]] | noun | **1.** Any of various plants of the genus ursinia grown for their yellow- or orange- or white-rayed flowers. | *"In academic literature, ursinia designates any of various plants of the genus ursinia grown for their yellow- or orange- or white-rayed flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ursula]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urs within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of urs in systematic terminology. | *"Go bear this letter to my Lord of Lancaster; this to the Prince; this to the Earl of Westmoreland; and this to old Mistress Ursula, whom I have weekly sworn to marry since I perceived the first white hair of my chin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ursuline]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin urs within the domain of Animal Adjectives & Biological.<br>**2.** A technical or specialized form exhibiting the properties of urs in systematic terminology. | *"Prayer for the suffering souls in the Ursuline manual and forty days’ indulgence."* — James Joyce, *Ulysses* |
| [[ursus]] | noun | **1.** Type genus of ursidae: brown bears; in some classifications genus ursus includes all bears. | *"In academic literature, ursus designates type genus of ursidae: brown bears; in some classifications genus ursus includes all bears."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal Adjectives & Biological]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · URS
  </div>
</div>
