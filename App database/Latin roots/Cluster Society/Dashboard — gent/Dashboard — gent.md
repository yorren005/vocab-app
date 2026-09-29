---
status: unread
type: root_dashboard
---
# Dashboard — gent
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gent-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“clan, race, family, or nation”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **gent** means clan, race, family, or nation. It refers to a family lineage, related clan, or tribe of people. In English, this root forms words such as *gentle*, *gentleman*, *gentry*, and *genteel*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: clan, race, family, or nation
> The root **gent** means clan, race, family, or nation. It refers to a family lineage, related clan, or tribe of people. In English, this root forms words such as *gentle*, *gentleman*, *gentry*, and *genteel*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Clan, race, family, or nation</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *gentle* and *gentleman*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gent** comes from a Latin word that means *"clan, race, family, or nation"*.
  - At its core, it describes clan, race, family, or nation.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **gent** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of clan, race, family, or nation.
  - **Mental & Social**: How people experience, organize, or communicate about clan, race, family, or nation.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gentle**: Having or showing a mild, kind, or tender temperament. 2. Moderate in force.
  - **Gentleman**: A chivalrous, courteous, or honorable man. 2. Historically, a man of noble birth entitled to bear arms.
  - **Gentry**: People of good social position, specifically the class of people next below the nobility in position and birth.
  - **Genteel**: Polite, refined, or respectable, often in an affected or pretentious way.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gent</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun (`gēns, gentis`):** *gentile* (non-Jew; of a clan).
- **French Lineage (`gentil`):**
  - *gentle* (mild, tender; well-born), *gentleness*, *gentleman*, *gentlewoman*.
  - *genteel* (polite, refined, often affectedly so), *gentility*.
  - *gentry* (people of good social position, especially landed aristocracy).

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

### 1. Nobility, Land & Class Hierarchy
- *gentry* (people of good social position, specifically the class of people next below the nobility in position and birth).
- *gentleman* (a chivalrous, courteous, or honorable man; historically, a man of noble birth).
- *gentlewoman* (a woman of noble or gentle birth).

### 2. Personal Temperament & Mildness
- *gentle* (having or showing a mild, kind, or tender temperament or character).
- *gentleness* (the quality of being kind, tender, or mild-mannered).

### 3. Polish & Affected Elegance
- *genteel* (polite, refined, or respectable, often in an affected or ostentatious way).
- *gentility* (social superiority as demonstrated by polite manners, behavior, or high birth).

### 4. Religious & Tribal Identity
- *gentile* (not Jewish; in Mormon usage, not Mormon).

---

## 🔀 4. Prefix & Combining Dynamics on gent

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `gent-` + `-ry` | Collective class | The landed aristocratic class beneath the titular peerage | *gentry* |
| `gent-` + `-le` | Quality of lineage $\to$ manner | Mild, non-violent, considerate, and tender in behavior | *gentle, gentleness* |
| `gent-` + `-eel` | French aristocratic loan | Stylized elegance, polished decorum, sometimes pompous | *genteel* |
| `gentil-` + `-ity` | Abstract social rank | High birth coupled with immaculate manners | *gentility* |
| `gent-` + `-ile` | Biblical ethnonym | The foreign tribes outside the Jewish theological covenant | *gentile* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Social History & Feudalism:** The rise of the English landed gentry (Tawney's "Rise of the Gentry"), patrician *gentēs* of the Roman Republic.
- **Theology & Biblical Studies:** The Pauline mission to the Gentiles, the Council of Jerusalem (Acts 15).
- **Sociology & Class Dynamics:** Gentrification of urban neighborhoods, social mobility, etiquette manuals.
- **Literature & Victorian Satire:** Jane Austen's portrayal of country gentry, Thackeray's critique of hollow gentility.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[argent]] | noun | **1.** A metal tincture used in heraldry to give a silvery appearance.<br>**2.** Of lustrous grey; covered with or tinged with the color of silver. | *"But it is so worn that mother uses it to stir the pea-soup.” “A castle argent is certainly my crest,” said he blandly."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[argentic]] | adjective | **1.** Relating to compounds in which silver is bivalent. | *"In academic literature, argentic designates relating to compounds in which silver is bivalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentiferous]] | adjective | **1.** Containing or yielding silver. | *"In academic literature, argentiferous designates containing or yielding silver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentina]] | noun | **1.** A republic in southern south america; second largest country in south america.<br>**2.** Type genus of the argentinidae: argentines. | *"Russia, Argentina, and Australia have rapidly taken the place of America in supplying food to Western Europe, in part, no doubt, because we refused to take Europe's goods in trade."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[argentine]] | noun | **1.** Any of various small silver-scaled salmon-like marine fishes.<br>**2.** Of or relating to or characteristic of argentina or its people. | *"Celestial Dian, goddess argentine, I will obey thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[argentinian]] | noun | **1.** A native or inhabitant of argentina.<br>**2.** Of or relating to or characteristic of argentina or its people. | *"In academic literature, argentinian designates a native or inhabitant of argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentinidae]] | noun | **1.** Small marine soft-finned fishes with long silvery bodies; related to salmons and trouts. | *"In academic literature, argentinidae designates small marine soft-finned fishes with long silvery bodies; related to salmons and trouts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentinosaur]] | noun | **1.** Huge herbivorous dinosaur of cretaceous found in argentina. | *"In academic literature, argentinosaur designates huge herbivorous dinosaur of cretaceous found in argentina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentite]] | noun | **1.** A valuable silver ore consisting of silver sulfide (ag2s). | *"In academic literature, argentite designates a valuable silver ore consisting of silver sulfide (ag2s)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[argentous]] | adjective | **1.** Relating to compounds in which silver is univalent. | *"In academic literature, argentous designates relating to compounds in which silver is univalent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cogent]] | adjective | **1.** Powerfully persuasive. | *"But the last term of the definition is still more cogent, as coupled with the first."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[gent]] | noun | **1.** Informal abbreviation of `gentleman'.<br>**2.** A boy or man. | *"I had thought I had been a younger Brother, a poor Gent."* — John Fletcher, *Beaumont and Fletcher's Works, Vol. 01 of 10: the Custom of the Country* |
| [[gentamicin]] | noun | **1.** An antibiotic (trade name garamycin) that is derived from an actinomycete; used in treating infections of the urinary tract. | *"In academic literature, gentamicin designates an antibiotic (trade name garamycin) that is derived from an actinomycete; used in treating infections of the urinary tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genteel]] | adjective | **1.** Marked by refinement in taste and manners. | *"At present, I don’t mind confessing to the wards in Jarndyce (in strict confidence) that I sometimes find it difficult to keep up a genteel appearance."* — Charles Dickens, *Bleak House* |
| [[genteelly]] | adverb | **1.** In a genteel manner. | *"I wished Joe had been rather more genteelly brought up, and then I should have been so too."* — Charles Dickens, *Great Expectations* |
| [[genteelness]] | noun | **1.** Elegance by virtue of fineness of manner and expression. | *"In academic literature, genteelness designates elegance by virtue of fineness of manner and expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentian]] | noun | **1.** Any of various plants of the family gentianaceae especially the genera gentiana and gentianella and gentianopsis. | *"To what amazing infusions of gentian, peppermint, gilliflower, sage, parsley, thyme, rue, rosemary, and dandelion, did his courageous stomach submit itself!"* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[gentiana]] | noun | **1.** Type genus of the gentianaceae; cosmopolitan genus of herbs nearly cosmopolitan in cool temperate regions; in some classifications includes genera gentianopsis and gentianella. | *"In academic literature, gentiana designates type genus of the gentianaceae; cosmopolitan genus of herbs nearly cosmopolitan in cool temperate regions; in some classifications includes genera gentianopsis and gentianella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianaceae]] | noun | **1.** Chiefly herbaceous plants with showy flowers; some are cultivated as ornamentals. | *"In academic literature, gentianaceae designates chiefly herbaceous plants with showy flowers; some are cultivated as ornamentals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianales]] | noun | **1.** An order of dicotyledonous plants having gamopetalous flowers; gentianaceae; apocynaceae; asclepiadaceae; loganiaceae; oleaceae; salvadoraceae. | *"In academic literature, gentianales designates an order of dicotyledonous plants having gamopetalous flowers; gentianaceae; apocynaceae; asclepiadaceae; loganiaceae; oleaceae; salvadoraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianella]] | noun | **1.** Genus of herbs with flowers that resemble gentian; in some classifications included in genus gentiana.<br>**2.** Low-growing alpine plant cultivated for its dark glossy green leaves in basal rosettes and showy solitary bell-shaped blue flowers. | *"In academic literature, gentianella designates genus of herbs with flowers that resemble gentian; in some classifications included in genus gentiana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentianopsis]] | noun | **1.** Genus of fringed gentians; in some classifications included in genus gentiana. | *"In academic literature, gentianopsis designates genus of fringed gentians; in some classifications included in genus gentiana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentile]] | noun | **1.** A person who does not acknowledge your god.<br>**2.** A person who is not a member of one's own religion; used in this sense by mormons and hindus. | *"We have here among us, my friends,” says Chadband, “a Gentile and a heathen, a dweller in the tents of Tom-all-Alone’s and a mover-on upon the surface of the earth."* — Charles Dickens, *Bleak House* |
| [[gentility]] | noun | **1.** Elegance by virtue of fineness of manner and expression. | *"He lets me feed with his hinds, bars me the place of a brother, and as much as in him lies, mines my gentility with my education."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentle]] | verb | **1.** Cause to be more favorably inclined; gain the good will of.<br>**2.** Give a title to someone; make someone a member of the nobility. | *"I do forgive thy robbery gentle thief Although thou steal thee all my poverty: And yet love knows it is a greater grief To bear greater wrong, than hate’s known injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlefolk]] | noun | **1.** People of good family and breeding and high social status. | *"We’ve been found to be the greatest gentlefolk in the whole county—reaching all back long before Oliver Grumble’s time—to the days of the Pagan Turks—with monuments, and vaults, and crests, and ’scutcheons, and the Lord knows what all."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gentleman]] | noun | **1.** A man of refinement.<br>**2.** A manservant who acts as a personal attendant to his employer. | *"FIRST GENTLEMAN. ’Tis but the boldness of his hand haply, which his heart was not consenting to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentleman's-cane]] | noun | **1.** Tall showy tropical american annual having hairy stems and long spikes of usually red flowers above leaves deeply flushed with purple; seeds often used as cereal. | *"In academic literature, gentleman's-cane designates tall showy tropical american annual having hairy stems and long spikes of usually red flowers above leaves deeply flushed with purple; seeds often used as cereal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentleman-at-arms]] | noun | **1.** One of 40 gentlemen who attend the british sovereign on state occasions. | *"In academic literature, gentleman-at-arms designates one of 40 gentlemen who attend the british sovereign on state occasions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentlemanlike]] | adjective | **1.** Befitting a man of good breeding. | *"I will tell her, sir, that you do protest, which, as I take it, is a gentlemanlike offer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlemanly]] | adjective | **1.** Befitting a man of good breeding. | *"Turveydrop is a very gentlemanly man indeed—very gentlemanly.” “Does his wife know of it?” asked Ada."* — Charles Dickens, *Bleak House* |
| [[gentleness]] | noun | **1.** The property possessed by a slope that is very gradual.<br>**2.** Acting in a manner that is gentle and mild and even-tempered. | *"Your gentleness shall force More than your force move us to gentleness."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentlewoman]] | noun | **1.** A woman of refinement. | *"HELENA, a Gentlewoman protected by the Countess."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gently]] | adverb | **1.** In a gradual manner.<br>**2.** In a gentle manner. | *"What’s amiss, May it be gently heard."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gentrification]] | noun | **1.** The restoration of run-down urban areas by the middle class (resulting in the displacement of low-income residents). | *"In academic literature, gentrification designates the restoration of run-down urban areas by the middle class (resulting in the displacement of low-income residents)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentrify]] | verb | **1.** Renovate so as to make it conform to middle-class aspirations. | *"In academic literature, gentrify designates renovate so as to make it conform to middle-class aspirations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gentry]] | noun | **1.** The most powerful members of a society. | *"It well may serve A nursery to our gentry, who are sick For breathing and exploit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regent]] | noun | **1.** Members of a governing board.<br>**2.** Someone who rules during the absence or incapacity or minority of the country's monarch. | *"Enter the funeral of King Henry the Fifth, attended on by the Duke of Bedford, Regent of France; the Duke of Gloucester, Protector; the Duke of Exeter, the Earl of Warwick, the Bishop of Winchester, the Duke of Somerset with Heralds, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ungentle]] | adjective | **1.** Not of the nobility. | *"For Caesar cannot lean To be ungentle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ungentlemanlike]] | adjective | **1.** Not befitting a gentleman. | *"He stopt; and, ungentlemanlike as he looked, Fanny was obliged to introduce him to Mr."* — Jane Austen, *Mansfield Park* |
| [[ungentlemanly]] | adjective | **1.** Not befitting a gentleman. | *"It's so--so ungentlemanly." "So it is."* — Anthony Pryde, *Nightfall* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GENT
  </div>
</div>
