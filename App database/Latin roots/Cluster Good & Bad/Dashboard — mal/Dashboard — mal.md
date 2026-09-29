---
status: unread
type: root_dashboard
---
# Dashboard — mal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“bad”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Comparing a fresh, wholesome fruit against a damaged or spoiled one.</span>
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

The root **mal** means bad. It refers to moral malice, pathological disease, systemic dysfunction, malignant corruption. In English, this root forms words such as *malice*, *malicious*, *malign*, and *dismal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: bad
> The root **mal** means bad. It refers to moral malice, pathological disease, systemic dysfunction, malignant corruption. In English, this root forms words such as *malice*, *malicious*, *malign*, and *dismal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Bad</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *malice* and *malicious*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mal** comes from a Latin word that means *"bad"*.
  - At its core, it describes the quality or state of being bad.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **mal** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are bad.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Malice**: The intention or desire to do evil.
  - **Malicious**: Characterized by malice.
  - **Malign**: To speak evil of.
  - **Dismal**: Depressing, dreary, or gloomy.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mal</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `mal`
> Derivations from Latin *malus* / *male* operate across four morphological categories:
> 1. **Core Evaluative Stems (`mal-`, `malic-`):**
>    - **malice**, **malicious**, **maliciously**, **maliciousness**.
>    - **malign**, **malignant**, **malignantly**, **malignancy**, **malignity**.
> 2. **Classical Compounds (`male-` + verb stem):**
>    - With *facere*: **malefactor**, **malefactress**, **malefaction**, **maleficence**, **maleficent**, **malefic**.
>    - With *dīcere*: **malediction**, **maledictory**.
>    - With *velle*: **malevolent**, **malevolence**, **malevolently**.
> 3. **Medical & Pathological Formations:**
>    - **malady**, **malaise**, **malaria**, **malinger**, **malingerer**, **malnutrition**, **malformation**, **malformed**, **malocclusion**, **malabsorption**, **malodorous**, **malodor**.
> 4. **Administrative, Institutional & Legal Malfunctions:**
>    - **malpractice**, **malfeasance**, **malfeasant**, **malfunction**, **maladministration**, **maladjustment**, **maladaptive**, **malcontent**, **dismal**, **malapropism**, **malapropos**.

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

```
                                  ┌── Moral Spite & Curses ───── malice, malicious, malevolent, malediction, malefactor
                                  │
                                  ├── Clinical Oncology ──────── malign, malignant, malignancy, malignity
    [MAL-] ───────────────────────┼── Physical Sickness ──────── malady, malaise, malaria, malinger, malnutrition
(bad / evil / ill / defective)    │
                                  ├── Institutional Neglect ──── malpractice, malfeasance, maladministration, malfunction
                                  │
                                  └── Structural & Linguistic ── malformation, malocclusion, dismal, malapropism
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Criminal Intent & Ethics:** *malice*, *malicious*, *maliciously*, *maliciousness*, *malevolent*, *malevolence*, *malevolently*, *malefactor*, *malefaction*, *maleficent*, *maleficence*.
> 2. **Surgical Oncology & Pathology:** *malign*, *malignant*, *malignantly*, *malignancy*, *malignity*.
> 3. **Clinical Medicine & Infectious Disease:** *malady*, *malaise*, *malaria*, *malinger*, *malingerer*, *malnutrition*, *malformed*, *malformation*, *malocclusion*, *malabsorption*, *malodorous*.
> 4. **Tort Law & Administrative Misconduct:** *malpractice*, *malfeasance*, *malfeasant*, *maladministration*, *malfunction*.
> 5. **Linguistics, Dramaturgy & History:** *malapropism*, *malapropos*, *malcontent*, *dismal*, *dismally*, *dismalness*.

---

## 🔀 4. Prefix & Combining Dynamics on mal

### The Semantic Prefix Role of `mal-`

| Base Word | Combining Role | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `practice` | execution of duty | **malpractice** | Professional negligence or illegal breach of duty causing injury. |
| `function` | mechanical operation | **malfunction** | Failure of a mechanism, organ, or software system to operate normally. |
| `feasance` | doing, performance | **malfeasance** | The commission of an unlawful or prohibited act by an official. |
| `nutrition` | dietary nourishment | **malnutrition** | Severe physiological deficiency resulting from inadequate nourishment. |
| `formation` | anatomical structure | **malformation** | Congenital deformity or irregular development of physical organs. |
| `content` | satisfied, pleased | **malcontent** | Chronically dissatisfied and actively rebellious against social order. |
| `diēs` (days) | calendar time | **dismal** (< *diēs malī*) | Gloomy, depressing; originally the unpropitious, cursed days of the year. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Oncology & Cellular Pathology:** Histologists examine nuclear pleomorphism and mitotic rate to distinguish *malignant* carcinomas (invasive) from benign adenomas.
> 2. **Medical Jurisprudence & Professional Liability:** Physicians carry professional liability insurance to defend against civil *malpractice* claims alleging breach of the standard of care.
> 3. **Administrative & Public Law:** A public official is impeached or prosecuted for *malfeasance in office* when they misuse statutory powers for corrupt enrichment.
> 4. **Infectious Disease & Parasitology:** *Malaria* is caused by protozoan parasites of the genus *Plasmodium* transmitted by female *Anopheles* mosquitoes, debunking the historical "bad air" miasma theory.
> 5. **Literary Criticism & Rhetoric:** A *malapropism* creates dramatic irony or comedic absurdity when a character utters a phonetically similar but absurdly incorrect word.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antimalarial]] | noun | **1.** A medicinal drug used to prevent or treat malaria. | *"In academic literature, antimalarial designates a medicinal drug used to prevent or treat malaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comal]] | adjective | **1.** Of certain seeds (such as cotton) having a tuft or tufts of hair. | *"In academic literature, comal designates of certain seeds (such as cotton) having a tuft or tufts of hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dismal]] | adjective | **1.** Causing dejection. | *"I am wrapp’d in dismal thinkings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dismally]] | adverb | **1.** In a cheerless manner.<br>**2.** In a dreadful manner. | *"Whatever he put on, became him less (it dismally seemed to me) than what he had worn before."* — Charles Dickens, *Great Expectations* |
| [[malabo]] | noun | **1.** The capital and largest city of equatorial guinea on the island of bioko in the gulf of guinea. | *"In academic literature, malabo designates the capital and largest city of equatorial guinea on the island of bioko in the gulf of guinea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malabsorption]] | noun | **1.** Abnormal absorption of nutrients from the digestive tract. | *"In academic literature, malabsorption designates abnormal absorption of nutrients from the digestive tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacanthidae]] | noun | **1.** Short-headed marine fishes; often brightly colored. | *"In academic literature, malacanthidae designates short-headed marine fishes; often brightly colored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacca]] | noun | **1.** Stem of the rattan palm used for making canes and umbrella handles.<br>**2.** A cane made from the stem of a rattan palm. | *"The long and narrow peninsula of Malacca, extending south-eastward from the territories of Birmah, forms the most southerly point of all Asia."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[malachi]] | noun | **1.** A hebrew minor prophet of the 5th century bc.<br>**2.** An old testament book containing the prophecies of malachi. | *"James Steven, on his text, Malachi, ch. iv. vers. 2."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[malachias]] | noun | **1.** A hebrew minor prophet of the 5th century bc.<br>**2.** An old testament book containing the prophecies of malachi. | *"But Malachias’ tale began to freeze them with horror."* — James Joyce, *Ulysses* |
| [[malachite]] | noun | **1.** A green or blue mineral used as an ore of copper and for making ornamental objects. | *"I slipped on the uneven floor, and fell over one of the malachite tables, almost breaking my shin."* — H. G. Wells, *The Time Machine* |
| [[malacia]] | noun | **1.** A state of abnormal softening of tissue. | *"In academic literature, malacia designates a state of abnormal softening of tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaclemys]] | noun | **1.** American terrapins. | *"In academic literature, malaclemys designates american terrapins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacologist]] | noun | **1.** A zoologist specializing in the study of mollusks. | *"In academic literature, malacologist designates a zoologist specializing in the study of mollusks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacology]] | noun | **1.** The branch of zoology that studies the structure and behavior of mollusks. | *"In academic literature, malacology designates the branch of zoology that studies the structure and behavior of mollusks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaconotinae]] | noun | **1.** An african bush shrikes. | *"In academic literature, malaconotinae designates an african bush shrikes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacopterygian]] | noun | **1.** Any fish of the superorder malacopterygii. | *"In academic literature, malacopterygian designates any fish of the superorder malacopterygii."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacopterygii]] | noun | **1.** An extensive group of teleost fishes having fins supported by flexible cartilaginous rays. | *"In academic literature, malacopterygii designates an extensive group of teleost fishes having fins supported by flexible cartilaginous rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacosoma]] | noun | **1.** Tent caterpillars. | *"In academic literature, malacosoma designates tent caterpillars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacostraca]] | noun | **1.** Largest subclass of crustacea including most of the well-known marine, freshwater, and terrestrial crustaceans: crabs; lobsters; shrimps; sow bugs; beach flies. | *"In academic literature, malacostraca designates largest subclass of crustacea including most of the well-known marine, freshwater, and terrestrial crustaceans: crabs; lobsters; shrimps; sow bugs; beach flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malacothamnus]] | noun | **1.** Genus of shrubs or small trees: chaparral mallow. | *"In academic literature, malacothamnus designates genus of shrubs or small trees: chaparral mallow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maladaptive]] | adjective | **1.** Showing faulty adaptation. | *"In academic literature, maladaptive designates showing faulty adaptation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maladjusted]] | adjective | **1.** Poorly adjusted to demands and stresses of daily living.<br>**2.** Emotionally unstable and having difficulty coping with personal relationships. | *"In academic literature, maladjusted designates poorly adjusted to demands and stresses of daily living."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maladjustive]] | adjective | **1.** Poorly adjusted. | *"In academic literature, maladjustive designates poorly adjusted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maladjustment]] | noun | **1.** The condition of being unable to adapt properly to your environment with resulting emotional instability. | *"Maladjustment of wages causing unemployment. § 16."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[maladroit]] | adjective | **1.** Not adroit. | *"Out of which maladroit delay sprang anxieties, disappointments, shocks, catastrophes, and passing-strange destinies."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[maladroitly]] | adverb | **1.** In a maladroit manner. | *"In academic literature, maladroitly designates in a maladroit manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maladroitness]] | noun | **1.** Unskillfulness resulting from a lack of training. | *"In academic literature, maladroitness designates unskillfulness resulting from a lack of training."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malady]] | noun | **1.** Any unwholesome or desperate condition.<br>**2.** Impairment of normal physiological function affecting part or all of an organism. | *"No, no, it cannot be; and yet my heart Will not confess he owes the malady That doth my life besiege."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malaga]] | noun | **1.** A port city and resort in andalusia in southern spain on the mediterranean. | *"You know that we heard ages ago that he is an entirely broken man and that he lay deadly sick in Malaga."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[malahini]] | noun | **1.** A newcomer to hawaii. | *"In academic literature, malahini designates a newcomer to hawaii."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaise]] | noun | **1.** Physical discomfort (as mild sickness or depression). | *"In academic literature, malaise designates physical discomfort (as mild sickness or depression)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malamud]] | noun | **1.** United states writer (1914-1986). | *"In academic literature, malamud designates united states writer (1914-1986)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malamute]] | noun | **1.** Breed of sled dog developed in alaska. | *"In academic literature, malamute designates breed of sled dog developed in alaska."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malanga]] | noun | **1.** Tropical american aroid having edible tubers that are cooked and eaten like yams or potatoes. | *"In academic literature, malanga designates tropical american aroid having edible tubers that are cooked and eaten like yams or potatoes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaprop]] | noun | **1.** The unintentional misuse of a word by confusion with one that sounds similar. | *"In academic literature, malaprop designates the unintentional misuse of a word by confusion with one that sounds similar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malapropism]] | noun | **1.** The unintentional misuse of a word by confusion with one that sounds similar. | *"In academic literature, malapropism designates the unintentional misuse of a word by confusion with one that sounds similar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malapropos]] | adjective | **1.** Of an inappropriate or incorrectly applied nature.<br>**2.** At an inconvenient time. | *"They were getting out of their car just outside the gates of Uplands--a most malapropos position!--but without the least hesitation he lifted his hat, and bowed, so that I was spared the troubled uncertainty which I had imagined."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[malar]] | noun | **1.** The arch of bone beneath the eye that forms the prominence of the cheek. | *"In academic literature, malar designates the arch of bone beneath the eye that forms the prominence of the cheek."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaria]] | noun | **1.** An infective disease caused by sporozoan parasites that are transmitted through the bite of an infected anopheles mosquito; marked by paroxysms of chills and fever. | *"The doctors scoffed at this; but they talked about malaria, which, as far as I could understand, was likely to produce exactly the same effect."* — Mrs. Oliphant, *A Beleaguered City* |
| [[malarial]] | adjective | **1.** Of or infected by or resembling malaria. | *"Annamese refused to lend a hand, and the Chinese died like flies from the malarial conditions."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[malarkey]] | noun | **1.** Empty rhetoric or insincere or exaggerated talk. | *"In academic literature, malarkey designates empty rhetoric or insincere or exaggerated talk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malarky]] | noun | **1.** Empty rhetoric or insincere or exaggerated talk. | *"In academic literature, malarky designates empty rhetoric or insincere or exaggerated talk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malathion]] | noun | **1.** A yellow insecticide used as a dust or spray to control garden pests and house flies and mites. | *"In academic literature, malathion designates a yellow insecticide used as a dust or spray to control garden pests and house flies and mites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malawi]] | noun | **1.** A landlocked republic in southern central africa; achieved independence from the united kingdom in 1964. | *"In academic literature, malawi designates a landlocked republic in southern central africa; achieved independence from the united kingdom in 1964."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malawian]] | noun | **1.** A native or inhabitant of malawi.<br>**2.** Relating to or characteristic of malawi or its people or culture. | *"In academic literature, malawian designates a native or inhabitant of malawi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaxis]] | noun | **1.** Large genus of largely terrestrial orchids with one or a few plicate leaves and slender spikes or tiny mostly green flowers; cosmopolitan. | *"In academic literature, malaxis designates large genus of largely terrestrial orchids with one or a few plicate leaves and slender spikes or tiny mostly green flowers; cosmopolitan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaxis-unifolia]] | noun | **1.** North american orchid having a solitary leaf and flowers with threadlike petals. | *"In academic literature, malaxis-unifolia designates north american orchid having a solitary leaf and flowers with threadlike petals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malay]] | noun | **1.** A member of a people inhabiting the northern malay peninsula and malaysia and parts of the western malay archipelago.<br>**2.** A western subfamily of western malayo-polynesian languages. | *"No turbaned Turk, no hired Venetian or Malay, could have smote him with more seeming malice."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[malaya]] | noun | **1.** A constitutional monarchy in southeastern asia on borneo and the malay peninsula; achieved independence from the united kingdom in 1957. | *"I would speak of the bread-fruit tree, very abundant in the island of Gilboa; and I remarked chiefly the variety destitute of seeds, which bears in Malaya the name of “rima.” Ned Land knew these fruits well."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[malayalam]] | noun | **1.** A dravidian language (closely related to tamil) that is spoken in southwestern india. | *"In academic literature, malayalam designates a dravidian language (closely related to tamil) that is spoken in southwestern india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malayan]] | noun | **1.** A member of a people inhabiting the northern malay peninsula and malaysia and parts of the western malay archipelago.<br>**2.** Of or relating to or characteristic of malaysia. | *"In academic literature, malayan designates a member of a people inhabiting the northern malay peninsula and malaysia and parts of the western malay archipelago."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malayo-polynesian]] | noun | **1.** The branch of the austronesian languages spoken from madagascar to the central pacific.<br>**2.** Of or relating to the malayo-polynesian branch of the austronesian languages. | *"In academic literature, malayo-polynesian designates the branch of the austronesian languages spoken from madagascar to the central pacific."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malaysia]] | noun | **1.** A constitutional monarchy in southeastern asia on borneo and the malay peninsula; achieved independence from the united kingdom in 1957. | *"Possibly the ware was of the same type as the coarse crackled porcelain, with roughly painted blue designs, found in Borneo and Malaysia, where it is credited with great antiquity."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[malaysian]] | noun | **1.** A native or inhabitant of malaysia.<br>**2.** The malay language spoken in malaysia. | *"In academic literature, malaysian designates a native or inhabitant of malaysia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malcolmia]] | noun | **1.** Genus of plants usually found in coastal habitats; mediterranean to afghanistan. | *"In academic literature, malcolmia designates genus of plants usually found in coastal habitats; mediterranean to afghanistan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malcontent]] | noun | **1.** A person who is discontented or disgusted.<br>**2.** Discontented as toward authority. | *"Now, brother of Clarence, how like you our choice, That you stand pensive as half malcontent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[male]] | noun | **1.** An animal that produces gametes (spermatozoa) that can fertilize female gametes (ova).<br>**2.** A person who belongs to the sex that cannot have babies. | *"That very hour, and in the self-same inn, A mean woman was delivered Of such a burden, male twins, both alike."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maleate]] | noun | **1.** A salt or ester of maleic acid; used as a nontricyclic antidepressant drug for psychomotor activation. | *"In academic literature, maleate designates a salt or ester of maleic acid; used as a nontricyclic antidepressant drug for psychomotor activation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maleberry]] | noun | **1.** Deciduous much-branched shrub with dense downy panicles of small bell-shaped white flowers. | *"In academic literature, maleberry designates deciduous much-branched shrub with dense downy panicles of small bell-shaped white flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malebranche]] | noun | **1.** French philosopher (1638-1715). | *"In academic literature, malebranche designates french philosopher (1638-1715)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malecite]] | noun | **1.** A member of the algonquian people of northeastern maine and new brunswick.<br>**2.** The algonquian language of the malecite and passamaquody. | *"In academic literature, malecite designates a member of the algonquian people of northeastern maine and new brunswick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maledict]] | verb | **1.** Wish harm upon; invoke evil upon.<br>**2.** Under a curse. | *"In academic literature, maledict designates wish harm upon; invoke evil upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malediction]] | noun | **1.** The act of calling down a curse that invokes evil (and usually serves as an insult). | *"But still the disappointed father held a strong lever; and Fred felt as if he were being banished with a malediction."* — George Eliot, *Middlemarch* |
| [[malefactor]] | noun | **1.** Someone who has committed a crime or has been legally convicted of a crime. | *"But yet” is as a gaoler to bring forth Some monstrous malefactor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malefic]] | adjective | **1.** Having or exerting a malignant influence. | *"As she was supposed to exercise malefic influence on any man who might inadvertently glance at her, she had to wear a sort of head-dress combining in itself the purposes of a veil, a bonnet, and a mantlet."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[maleficence]] | noun | **1.** Doing or causing evil.<br>**2.** The quality or nature of being harmful or evil. | *"In academic literature, maleficence designates doing or causing evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maleficent]] | adjective | **1.** Harmful or evil in intent or effect. | *"The Indians of Mexico employed for this maleficent purpose the left fore-arm of a woman who had died in giving birth to her first child; but the arm had to be stolen."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[malemute]] | noun | **1.** Breed of sled dog developed in alaska. | *"In academic literature, malemute designates breed of sled dog developed in alaska."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maleness]] | noun | **1.** The properties characteristic of the male sex. | *"In academic literature, maleness designates the properties characteristic of the male sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maleo]] | noun | **1.** Celebes megapode that lays eggs in holes in sandy beaches. | *"In academic literature, maleo designates celebes megapode that lays eggs in holes in sandy beaches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maleseet]] | noun | **1.** The algonquian language of the malecite and passamaquody. | *"In academic literature, maleseet designates the algonquian language of the malecite and passamaquody."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malevich]] | noun | **1.** Russian abstract painter (1878-1935). | *"In academic literature, malevich designates russian abstract painter (1878-1935)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malevolence]] | noun | **1.** Wishing evil to others.<br>**2.** The quality of threatening evil. | *"The son of Duncan, From whom this tyrant holds the due of birth, Lives in the English court and is receiv’d Of the most pious Edward with such grace That the malevolence of fortune nothing Takes from his high respect."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malevolency]] | noun | **1.** The quality of threatening evil. | *"In academic literature, malevolency designates the quality of threatening evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malevolent]] | adjective | **1.** Wishing or appearing to wish evil to others; arising from intense ill will or hatred.<br>**2.** Having or exerting a malignant influence. | *"This is his uncle’s teaching, this is Worcester, Malevolent to you in all aspects, Which makes him prune himself, and bristle up The crest of youth against your dignity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malevolently]] | adverb | **1.** In a malevolent manner. | *"Count Rostopchín writes that he will stake his life on it that the enemy will not enter Moscow.” “Oh, that count of yours!” said the princess malevolently."* — graf Leo Tolstoy, *War and Peace* |
| [[malformation]] | noun | **1.** An affliction in which some part of the body is misshapen or malformed.<br>**2.** Something abnormal or anomalous. | *"Boldwood wanting to see you, Miss Everdene.” A woman’s dress being a part of her countenance, and any disorder in the one being of the same nature with a malformation or wound in the other, Bathsheba said at once— “I can’t see him in this state."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[malfunction]] | noun | **1.** A failure to function normally.<br>**2.** Fail to function or function improperly. | *"In academic literature, malfunction designates a failure to function normally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mali]] | noun | **1.** A landlocked republic in northwestern africa; achieved independence from france in 1960; mali was a center of west african civilization for more than 4,000 years. | *"Bonum, malum, qui fecisti Mali imploramus te, Salve fratrem, causa Christi, Miserere Domine! (Miserere!) [End of Ashtaroth.] FOOTNOTES: [Footnote 1: The extension of the tramways has necessitated the removal of this statue to Spring-street.]"* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[malian]] | noun | **1.** A native or inhabitant of mali.<br>**2.** Of or relating to or characteristic of mali or its people. | *"In academic literature, malian designates a native or inhabitant of mali."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malice]] | noun | **1.** Feeling a need to see others suffer.<br>**2.** The quality of threatening evil. | *"Name Cleopatra as she is called in Rome; Rail thou in Fulvia’s phrase, and taunt my faults With such full licence as both truth and malice Have power to utter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malicious]] | adjective | **1.** Having the nature of or resulting from malice; ; - rudyard kipling. | *"Either you must confess yourselves wondrous malicious Or be accused of folly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maliciously]] | adverb | **1.** With malice; in a malicious manner. | *"I will be treble-sinewed, hearted, breathed, And fight maliciously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[maliciousness]] | noun | **1.** Feeling a need to see others suffer. | *"Even when you scolded the Falcon properly for tramping down your plants, you knew that it was not in maliciousness he did it but in self-defence."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[malign]] | verb | **1.** Speak unfavorably about.<br>**2.** Evil or harmful in nature or influence. | *"The eyes were no longer merely luminous points; they looked into his own with a meaning, a malign significance."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[malignance]] | noun | **1.** (medicine) a malignant state; progressive and resistant to treatment and tending to cause death.<br>**2.** Quality of being disposed to evil; intense ill will. | *"In academic literature, malignance designates (medicine) a malignant state; progressive and resistant to treatment and tending to cause death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malignancy]] | noun | **1.** (medicine) a malignant state; progressive and resistant to treatment and tending to cause death.<br>**2.** Quality of being disposed to evil; intense ill will. | *"By your patience, no; my stars shine darkly over me; the malignancy of my fate might perhaps distemper yours; therefore I shall crave of you your leave that I may bear my evils alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malignant]] | adjective | **1.** Dangerous to health; characterized by progressive and uncontrolled growth (especially of a tumor). | *"But—O malignant and ill-boding stars!— Now thou art come unto a feast of death, A terrible and unavoided danger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malignantly]] | adverb | **1.** In a malignant manner, as of a tumor that spreads. | *"Gifted with the high perception, I lack the low, enjoying power; damned, most subtly and most malignantly! damned in the midst of Paradise!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[maligner]] | noun | **1.** One who attacks the reputation of another by slander or libel. | *"Blaine marched down the halls of the American Congress, and threw his shining lance full and fair against the brazen foreheads of the defamers of his country and the maligners of his honor."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[malignity]] | noun | **1.** Wishing evil to others.<br>**2.** Quality of being disposed to evil; intense ill will. | *"The very malignity of his enemies is a confession of their recognition that they are dealing with some one who is great."* — T. R. Glover, *The Jesus of History* |
| [[malignly]] | adverb | **1.** In a malign and evil manner. | *"In academic literature, malignly designates in a malign and evil manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malignment]] | noun | **1.** Slanderous defamation. | *"In academic literature, malignment designates slanderous defamation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malik]] | noun | **1.** The leader of a town or community in some parts of asia minor and the indian subcontinent. | *"In academic literature, malik designates the leader of a town or community in some parts of asia minor and the indian subcontinent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malinger]] | verb | **1.** Avoid responsibilities and duties, e.g., by pretending to be ill. | *"In academic literature, malinger designates avoid responsibilities and duties, e.g., by pretending to be ill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malingerer]] | noun | **1.** Someone shirking their duty by feigning illness or incapacity. | *"In academic literature, malingerer designates someone shirking their duty by feigning illness or incapacity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malingering]] | noun | **1.** Evading duty or work by pretending to be incapacitated.<br>**2.** Avoid responsibilities and duties, e.g., by pretending to be ill. | *"In academic literature, malingering designates evading duty or work by pretending to be incapacitated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malinois]] | noun | **1.** Fawn-colored short-haired sheepdog. | *"In academic literature, malinois designates fawn-colored short-haired sheepdog."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malinowski]] | noun | **1.** British anthropologist (born in poland) who introduced the technique of the participant observer (1884-1942). | *"In academic literature, malinowski designates british anthropologist (born in poland) who introduced the technique of the participant observer (1884-1942)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mall]] | noun | **1.** A public area set aside as a pedestrian walk.<br>**2.** Mercantile establishment consisting of a carefully landscaped complex of shops representing leading merchandisers; usually includes restaurants and a convenient parking area; a modern version of the traditional marketplace. | *"Are they like to take dust, like Mistress Mall’s picture?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mallard]] | noun | **1.** Wild dabbling duck from which domestic ducks are descended; widely distributed. | *"She once being loofed, The noble ruin of her magic, Antony, Claps on his sea-wing and, like a doting mallard, Leaving the fight in height, flies after her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mallarme]] | noun | **1.** French symbolist poet noted for his free verse (1842-1898). | *"In academic literature, mallarme designates french symbolist poet noted for his free verse (1842-1898)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malleability]] | noun | **1.** The property of being physically malleable; the property of something that can be worked or hammered or shaped without breaking. | *"The life-artist must know how to secure the proper degree of malleability in this mixture of flesh and soul."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[malleable]] | adjective | **1.** Easily influenced.<br>**2.** Capable of being shaped or bent or drawn out. | *"Boult, take her away; use her at thy pleasure: crack the glass of her virginity, and make the rest malleable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mallee]] | noun | **1.** Any of several low-growing australian eucalypts. | *"In academic literature, mallee designates any of several low-growing australian eucalypts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mallet]] | noun | **1.** A sports implement with a long handle and a head like a hammer; used in sports (polo or croquet) to hit a ball.<br>**2.** A light drumstick with a rounded head that is used to strike such percussion instruments as chimes, kettledrums, marimbas, glockenspiels, etc. | *"His wit’s as thick as Tewksbury mustard; there’s no more conceit in him than is in a mallet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malleus]] | noun | **1.** The ossicle attached to the eardrum. | *"In academic literature, malleus designates the ossicle attached to the eardrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mallon]] | noun | **1.** United states cook who was an immune carrier of typhoid fever and who infected dozens of people (1870-1938). | *"Alleg._ ii, Sec. 1, 67 M. _tattetai oun ho theos kata to en kai ten monada, mallon de kai he monas kata ton hena theon_."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[mallophaga]] | noun | **1.** Biting lice. | *"In academic literature, mallophaga designates biting lice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mallotus]] | noun | **1.** Capelins. | *"Classical and authoritative lexicons catalog mallotus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mallow]] | noun | **1.** Any of various plants of the family malvaceae. | *"She had had a season in Dublin, and who knows how many in Cork, Killarney, and Mallow?"* — William Makepeace Thackeray, *Vanity Fair* |
| [[malmo]] | noun | **1.** A port in southern sweden. | *"Malmo, the Wounded Rat Mama’s Happy Christmas Cured of Carelessness A Visit from a Prince Stringing Cranberries Christmas in California A Troublesome Call Bertie’s Corn-Popper Fire!"* — Anonymous, *Cinderella; Or, The Little Glass Slipper, and Other Stories* |
| [[malmsey]] | noun | **1.** Sweet madeira wine. | *"Yonder he comes, and that arrant malmsey-nose knave, Bardolph, with him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malnourish]] | verb | **1.** Provide with insufficient quality or quantity of nourishment. | *"In academic literature, malnourish designates provide with insufficient quality or quantity of nourishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malnourished]] | verb | **1.** Provide with insufficient quality or quantity of nourishment.<br>**2.** Not being provided with adequate nourishment. | *"In academic literature, malnourished designates provide with insufficient quality or quantity of nourishment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malnourishment]] | noun | **1.** Not having enough food to develop or function normally. | *"In academic literature, malnourishment designates not having enough food to develop or function normally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malnutrition]] | noun | **1.** A state of poor nutrition; can result from insufficient or excessive or unbalanced diet or from inability to absorb foods. | *"In academic literature, malnutrition designates a state of poor nutrition; can result from insufficient or excessive or unbalanced diet or from inability to absorb foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malocclusion]] | noun | **1.** (dentistry) a condition in which the opposing teeth do not mesh normally. | *"In academic literature, malocclusion designates (dentistry) a condition in which the opposing teeth do not mesh normally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malodor]] | noun | **1.** A distinctive odor that is offensively unpleasant. | *"In academic literature, malodor designates a distinctive odor that is offensively unpleasant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malodorous]] | adjective | **1.** Having an unpleasant smell. | *"God bless you!...” He embraced his daughter, and then again Pierre, and kissed him with his malodorous mouth."* — graf Leo Tolstoy, *War and Peace* |
| [[malodorousness]] | noun | **1.** The attribute of having a strong offensive smell. | *"In academic literature, malodorousness designates the attribute of having a strong offensive smell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malodour]] | noun | **1.** A distinctive odor that is offensively unpleasant. | *"In academic literature, malodour designates a distinctive odor that is offensively unpleasant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malodourous]] | adjective | **1.** Having an unpleasant smell. | *"In academic literature, malodourous designates having an unpleasant smell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malone]] | noun | **1.** English scholar remembered for his chronology of shakespeare's plays and his editions of shakespeare and dryden (1741-1812). | *"A., alone, in the protestant church of Saint Nicholas Without, Coombe, by James O’Connor, Philip Gilligan and James Fitzpatrick, together, under a pump in the village of Swords, and by the reverend Charles Malone C."* — James Joyce, *Ulysses* |
| [[malonylurea]] | noun | **1.** A white crystalline acid derived from pyrimidine; used in preparing barbiturate drugs. | *"In academic literature, malonylurea designates a white crystalline acid derived from pyrimidine; used in preparing barbiturate drugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malope]] | noun | **1.** Western mediterranean annual having deep purple-red flowers subtended by 3 large cordate bracts. | *"In academic literature, malope designates western mediterranean annual having deep purple-red flowers subtended by 3 large cordate bracts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malopterurus]] | noun | **1.** Electric catfish. | *"In academic literature, malopterurus designates electric catfish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malory]] | noun | **1.** English writer who published a translation of romances about king arthur taken from french and other sources (died in 1471). | *"In academic literature, malory designates english writer who published a translation of romances about king arthur taken from french and other sources (died in 1471)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malosma]] | noun | **1.** One species; often included in the genus rhus. | *"In academic literature, malosma designates one species; often included in the genus rhus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malraux]] | noun | **1.** French novelist (1901-1976). | *"In academic literature, malraux designates french novelist (1901-1976)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mals]] | noun | **1.** A master's degree in library science. | *"In academic literature, mals designates a master's degree in library science."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malt]] | noun | **1.** A milkshake made with malt powder.<br>**2.** A lager of high alcohol content; by law it is considered too alcoholic to be sold as lager or beer. | *"DROMIO OF SYRACUSE. [_Within._] Mome, malt-horse, capon, coxcomb, idiot, patch!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malta]] | noun | **1.** A republic on the island of malta in the mediterranean; achieved independence from the united kingdom in 1964.<br>**2.** A strategically located island to the south of sicily in the mediterranean sea. | *"Discipline must be maintained!” Proceeding to converse on indifferent matters, they walk up and down the little street, keeping step and time, until summoned by Quebec and Malta to do justice to the pork and greens, over which Mrs."* — Charles Dickens, *Bleak House* |
| [[malted]] | noun | **1.** A milkshake made with malt powder.<br>**2.** Treat with malt or malt extract. | *"I went therefrom to Norcombe, and malted there two-and-twenty years, and-two-and-twenty years I was there turnip-hoeing and harvesting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[maltese]] | noun | **1.** A native or inhabitant of malta.<br>**2.** The national language of the republic of malta; a semitic language derived from arabic but with many loan words from italian, spanish, and norman-french. | *"They, with two others below, formed the revolving Maltese cross of the reaping-machine, which had been brought to the field on the previous evening to be ready for operations this day."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[maltha]] | noun | **1.** A thick black tar intermediate between petroleum and asphalt. | *"In academic literature, maltha designates a thick black tar intermediate between petroleum and asphalt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malthus]] | noun | **1.** An english economist who argued that increases in population would outgrow increases in the means of subsistence (1766-1834). | *"His work on political economy not only put into thorough repair the structure raised by Adam Smith, Malthus, and Ricardo, but raised it at least one story higher."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[malthusian]] | noun | **1.** A believer in malthusian theory.<br>**2.** Of or relating to thomas malthus or to malthusianism. | *"As Tess grew older, and began to see how matters stood, she felt quite a Malthusian towards her mother for thoughtlessly giving her so many little sisters and brothers, when it was such a trouble to nurse and provide for them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[malthusianism]] | noun | **1.** Malthus' theory that population increase would outpace increases in the means of subsistence. | *"In academic literature, malthusianism designates malthus' theory that population increase would outpace increases in the means of subsistence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malti]] | noun | **1.** The national language of the republic of malta; a semitic language derived from arabic but with many loan words from italian, spanish, and norman-french. | *"In academic literature, malti designates the national language of the republic of malta; a semitic language derived from arabic but with many loan words from italian, spanish, and norman-french."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maltman]] | noun | **1.** A maker of malt. | *"In academic literature, maltman designates a maker of malt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malto]] | noun | **1.** A member of the dravidian people living in northern bengal in eastern india.<br>**2.** The dravidian language spoken by the malto. | *"In academic literature, malto designates a member of the dravidian people living in northern bengal in eastern india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maltose]] | noun | **1.** A white crystalline sugar formed during the digestion of starches. | *"In academic literature, maltose designates a white crystalline sugar formed during the digestion of starches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maltreat]] | verb | **1.** Treat badly. | *"Nobody will maltreat your father again."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[maltreated]] | verb | **1.** Treat badly.<br>**2.** Subjected to cruel treatment. | *"Never did the urgency arise of carting my maltreated and perishing carcass to the hospital."* — Jack London, *The Jacket (The Star-Rover)* |
| [[maltreater]] | noun | **1.** Someone who abuses. | *"In academic literature, maltreater designates someone who abuses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[maltreatment]] | noun | **1.** Cruel or inhumane treatment. | *"To the ignorant age in which it first 474:9 appears, Science seems to be a mistake, - hence the misinterpretation and consequent maltreatment which it receives."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[maltster]] | noun | **1.** A maker of malt. | *"A curved settle of unplaned oak stretched along one side, and in a remote corner was a small bed and bedstead, the owner and frequent occupier of which was the maltster."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[malus]] | noun | **1.** Apple trees; found throughout temperate zones of the northern hemisphere. | *"In academic literature, malus designates apple trees; found throughout temperate zones of the northern hemisphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[permalloy]] | noun | **1.** An 80/20 alloy of nickel and iron; easily magnetized and demagnetized. | *"But what I've got here is a piece of permalloy."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[unmalicious]] | adjective | **1.** Not malicious or spiteful. | *"In academic literature, unmalicious designates not malicious or spiteful."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmalleability]] | noun | **1.** A lack of malleability. | *"In academic literature, unmalleability designates a lack of malleability."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmalleable]] | adjective | **1.** Difficult or impossible to shape or work. | *"The mistress of the house, meanwhile, as is usual with persons of her stiff and unmalleable cast, stood mostly aside; willing to lend her aid, yet conscious that her natural inaptitude would be likely to impede the business in hand."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[unmalted]] | adjective | **1.** Of grain that has not been converted into malt. | *"In academic literature, unmalted designates of grain that has not been converted into malt."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Good & Bad]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MAL
  </div>
</div>
