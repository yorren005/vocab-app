---
status: unread
type: root_dashboard
---
# Dashboard — nom
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nom-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“name”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Speaking words clearly so that an audience understands every sentence.</span>
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

The root **nom** means name. It refers to the specific word used to designate an individual or thing. In English, this root forms words such as *binomial*, *cognomen*, *ignominious*, and *ignominy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: name
> The root **nom** means name. It refers to the specific word used to designate an individual or thing. In English, this root forms words such as *binomial*, *cognomen*, *ignominious*, and *ignominy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Name</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Speaking words clearly so that an audience understands every sentence.</mark>
> - **Everyday Connection**: Think of familiar words like *binomial* and *cognomen*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nom** comes from a Latin word that means *"name"*.
  - At its core, it describes name.

- **The Big Picture Idea**:
  - Picture speaking words clearly so that an audience understands every sentence.
  - Whenever you see **nom** in an English word, think of **spoken words and speech**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of name.
  - **Mental & Social**: How people experience, organize, or communicate about name.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Binomial**: An algebraic expression consisting of two terms connected by a plus or minus sign.
  - **Cognomen**: An extra personal name given to an ancient Roman citizen, functioning either as a surname or a nickname.
  - **Ignominious**: Deserving or causing public disgrace or shame.
  - **Ignominy**: Public shame or disgrace.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nom</mark>, think of <mark class="hl-def">spoken words and speech</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin nōmen (name, reputation) ──> Stem nom-
  │
  ├── Grammar & Naming
  │     ├── noun (Anglo-French nom: part of speech)
  │     ├── pronoun (word substituting for a noun)
  │     └── cognomen (Roman third name, nickname)
  │
  ├── Inaccurate Naming
  │     └── mis- + nomer ───────────> misnomer (wrongly named)
  │
  ├── Reputation & Fame
  │     ├── re- + nom ──────────────> renown (widespread celebrity)
  │     └── renowned (famous, celebrated)
  │
  ├── Loss of Name & Disgrace (in- + nōmen)
  │     ├── ignominy (public disgrace, dishonor)
  │     └── ignominious (shameful, humiliating)
  │
  └── Algebraic Mathematics
        └── binomial (bi- + nomial: polynomial of two terms)
```

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

### Distinct Spheres of Manifestation
1. **Grammar & Parts of Speech**: *noun*, *pronoun* (fundamental linguistic elements designating persons, places, or things).
2. **Onomastics & Roman History**: *cognomen* (family branches, historical monikers).
3. **Accuracy of Language**: *misnomer* (calling a koala a "koala bear" when it is a marsupial).
4. **Public Reputation & Honor**: *renown*, *renowned*, *ignominy*, *ignominious* (immortal celebrity vs shameful humiliation).
5. **Algebra & Mathematics**: *binomial* (algebraic expressions with two terms, binomial theorem).

---

## 🔀 4. Prefix & Combining Dynamics on nom

### Affix Breakdown
- **mis- ("wrongly") + nomer**: *misnomer* (misnaming).
- **in- (privative "not, without") + nomen**: *ignominy*, *ignominious* (loss of name/repute).
- **re- ("again, intensive") + nom**: *renown*, *renowned* (repeatedly named, famous).
- **pro- ("in place of") + noun**: *pronoun* (standing in for a noun).
- **bi- ("two") + nomial**: *binomial* (having two names/terms).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Grammar & Syntax** | Parts of speech, nominal phrases, pronoun antecedents | *noun*, *pronoun* |
| **Algebra & Probability Theory** | Binomial theorem, binomial distribution in statistics | *binomial*, *binomial coefficients* |
| **Roman History & Epigraphy** | Roman onomastic formula, consular fasti, cognomina | *cognomen*, *tria nomina* |
| **Semantics & Lexical Precision** | Taxonomic misnomers, popular linguistic errors | *misnomer* |
| **Military History & Ethics** | Dishonorable discharge, ignominious rout, renown | *ignominy*, *ignominious*, *renown* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[agnomen]] | noun | **1.** An additional name or an epithet appended to a name (as in `ferdinand the great'). | *"In academic literature, agnomen designates an additional name or an epithet appended to a name (as in `ferdinand the great')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denominate]] | verb | **1.** Assign a name or title to. | *"WE SHOULD BE READY TO DENOMINATE INJURIES THOSE THINGS WHICH WERE IN REALITY THE JUSTIFIABLE ACTS OF INDEPENDENT SOVEREIGNTIES CONSULTING A DISTINCT INTEREST."* — Alexander Hamilton, *The Federalist Papers* |
| [[denomination]] | noun | **1.** A group of religious congregations having its own organization and a distinctive faith.<br>**2.** A class of one kind of unit in a system of numbers or measures or weights or money. | *"Another business man of that denomination in Boston, during fifteen years, has appropriated _thirty-nine thousand dollars_."* — Classic Author, *The wonders of prayer* |
| [[denominational]] | adjective | **1.** Relating to or characteristic of a particular religious denomination.<br>**2.** Relating to the face value of a banknote, coin, or stamp. | *"Mill to stand for an Irish constituency, and stated that the only opinion it would be necessary for him to change was the one he had so often expressed against denominational education."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[denominationalism]] | noun | **1.** A narrow-minded adherence to a particular sect or party or denomination.<br>**2.** The tendency, in protestantism, to separate into religious denominations or to advocate such separations. | *"The cause of denominationalism is the tenacious clinging to faith and doctrines."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[denominationally]] | adverb | **1.** With respect to denomination. | *"In academic literature, denominationally designates with respect to denomination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[denominator]] | noun | **1.** The divisor of a fraction. | *"I 540:6 the Lord do all these things;" but the prophet referred to divine law as stirring up the belief in evil to its utmost, when bringing it to the surface and re- 540:9 ducing it to its common denominator, nothingness."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[interdenominational]] | adjective | **1.** Occurring between or among or common to different churches or denominations. | *"In academic literature, interdenominational designates occurring between or among or common to different churches or denominations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noma]] | noun | **1.** Acute ulceration of the mucous membranes of the mouth or genitals; often seen in undernourished children. | *"In academic literature, noma designates acute ulceration of the mucous membranes of the mouth or genitals; often seen in undernourished children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomad]] | noun | **1.** A member of a people who have no permanent home but move about according to the seasons. | *"And all the sweetness, all the romance of an English midsummer night seized the heart of Lawrence, a nomad, a returned exile, and a man in love--as if he had never known England before."* — Anthony Pryde, *Nightfall* |
| [[nomadic]] | adjective | **1.** Migratory. | *"The complete lack of anything like a systematic education, and the nomadic life of the army did not fail to produce the most disastrous results in the wild and dissolute character of the young man."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[nome]] | noun | **1.** A town in western alaska on the southern coast of the seward peninsula; an important center of an alaskan gold rush at the beginning of the 20th century. | *"In academic literature, nome designates a town in western alaska on the southern coast of the seward peninsula; an important center of an alaskan gold rush at the beginning of the 20th century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomenclature]] | noun | **1.** A system of words used to name things in a particular discipline. | *"He seemed to be of too strange and mysterious a nature to belong to any variety among those of popular nomenclature."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[nomenklatura]] | noun | **1.** The system of patronage in communist countries; controlled by committees in the communist party. | *"In academic literature, nomenklatura designates the system of patronage in communist countries; controlled by committees in the communist party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomia]] | noun | **1.** A genus of bee; some are important pollinators of legumes. | *"In academic literature, nomia designates a genus of bee; some are important pollinators of legumes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominal]] | noun | **1.** A phrase that can function as the subject or object of a verb.<br>**2.** Relating to or constituting or bearing or giving a name. | *"Part of the remainder she was obliged to expend in winter clothing, leaving only a nominal sum for the whole inclement season at hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nominalism]] | noun | **1.** (philosophy) the doctrine that the various objects labeled by the same term have nothing in common but their name. | *"In academic literature, nominalism designates (philosophy) the doctrine that the various objects labeled by the same term have nothing in common but their name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominalist]] | noun | **1.** A philosopher who has adopted the doctrine of nominalism. | *"In academic literature, nominalist designates a philosopher who has adopted the doctrine of nominalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominalistic]] | adjective | **1.** Of or relating to nominalism. | *"In academic literature, nominalistic designates of or relating to nominalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominally]] | adverb | **1.** In name only. | *"And our dinner hour is nominally (for we dine at all hours) five!"* — Charles Dickens, *Bleak House* |
| [[nominate]] | verb | **1.** Propose as a candidate for some honor.<br>**2.** Put forward; nominate for appointment to an office or for an honor or position. | *"Can you nominate in order now the degrees of the lie?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nominated]] | verb | **1.** Propose as a candidate for some honor.<br>**2.** Put forward; nominate for appointment to an office or for an honor or position. | *"I did converse this _quondam_ day with a companion of the King’s, who is intituled, nominated, or called, Don Adriano de Armado."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nomination]] | noun | **1.** The act of officially naming a candidate.<br>**2.** The condition of having been proposed as a suitable candidate for appointment or election. | *"What imports the nomination of this gentleman?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nominative]] | noun | **1.** The category of nouns serving as the grammatical subject of a verb.<br>**2.** Serving as or indicating the subject of a verb and words identified with the subject of a copular verb. | *"In academic literature, nominative designates the category of nouns serving as the grammatical subject of a verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominator]] | noun | **1.** Someone who proposes a candidate for appointment or election. | *"In academic literature, nominator designates someone who proposes a candidate for appointment or election."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nominee]] | noun | **1.** A politician who is running for public office. | *"Thomas Pinckney of South Carolina was the Federal nominee for Vice-President, and Aaron Burr of the Republicans."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[nomogram]] | noun | **1.** A graphic representation of numerical relations. | *"In academic literature, nomogram designates a graphic representation of numerical relations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomograph]] | noun | **1.** A graphic representation of numerical relations. | *"In academic literature, nomograph designates a graphic representation of numerical relations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nomothetic]] | adjective | **1.** Relating to or involving the search for abstract universal principles. | *"In academic literature, nomothetic designates relating to or involving the search for abstract universal principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nondenominational]] | adjective | **1.** Not restricted to a particular religious denomination. | *"In academic literature, nondenominational designates not restricted to a particular religious denomination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonnomadic]] | adjective | **1.** Not nomadic or wandering. | *"In academic literature, nonnomadic designates not nomadic or wandering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prenominal]] | adjective | **1.** Of adjectives; placed before the nouns they modify. | *"In academic literature, prenominal designates of adjectives; placed before the nouns they modify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pronominal]] | noun | **1.** A phrase that functions as a pronoun.<br>**2.** Relating to pronouns. | *"In academic literature, pronominal designates a phrase that functions as a pronoun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undenominational]] | adjective | **1.** Not bound or devoted to the promotion of a particular denomination. | *"In academic literature, undenominational designates not bound or devoted to the promotion of a particular denomination."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NOM
  </div>
</div>
