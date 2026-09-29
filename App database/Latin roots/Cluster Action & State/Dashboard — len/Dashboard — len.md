---
status: unread
type: root_dashboard
---
# Dashboard — len
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">len-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“soft or mild”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **len** means soft or mild. It describes soft, mild, gentle. In English, this root forms words such as *lene*, *lenience*, *leniency*, and *lenient*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: soft or mild
> The root **len** means soft or mild. It describes soft, mild, gentle. In English, this root forms words such as *lene*, *lenience*, *leniency*, and *lenient*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Soft or mild</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *lene* and *lenience*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **len** comes from a Latin word that means *"soft or mild"*.
  - At its core, it describes the quality or state of being soft or mild.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **len** in an English word, think of **action, energy, and state of being**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are soft or mild.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Lene**: An everyday English word showing the root's idea of *soft or mild*.
  - **Lenience**: The quality of being lenient.
  - **Leniency**: An everyday English word showing the root's idea of *soft or mild*.
  - **Lenient**: Disposed to be merciful.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">len</mark>, think of <mark class="hl-def">action, energy, and state of being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The adjective *lenis* and verb *lēnīre* supply the stem:
> - **Primary Stem:** `len-` (from *lenis*) — the base of softness words: *lenient*, *lenity*, *lenitive*, *lene*, *lenis*.
> - **Verb Stem:** `lēnī-` (from *lēnīre*) — *lenify*, *relent*.
>
> Prefix *re-* and suffixes (*-ent*, *-ity*, *-ive*, *-fy*) shape the family.

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
> Although the root means **"soft, gentle"**, its register shifts:
> - **Physical / Sensory Sense:** In [[lene]] and [[lenis]] it is mild, soft articulation (phonetics).
> - **Medical Sense:** In [[lenitive]] it is a soothing remedy.
> - **Moral / Judicial Sense:** In [[lenient]] and [[leniency]] it is mildness in judgment.
> - **Optical Sense:** In [[lens]] it is the lentil-shaped (lens) glass.

---

## 🔀 4. Prefix & Combining Dynamics on len

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | back, again | [[relent]], [[relentless]] | To soften *back* — to abandon harshness (or, negated, never to). |
| *(none)* | — | [[lenient]], [[lenity]], [[lenitive]], [[lens]] | Variants on the base of softness. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ent` | Adjective | [[lenient]] | Inclined to mildness. |
| `-ity` | Noun | [[lenity]], [[leniency]] | The quality of gentleness. |
| `-ive` | Adjective | [[lenitive]] | Soothing. |
| `-fy` | Verb | [[lenify]] | To soothe. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Science & Medicine** | [[lens]], [[lenitive]] | Optics, soothing ointments |
| ⚖️ **Law & Governance** | [[lenient]], [[leniency]] | Sentencing, pardons |
| 🎓 **Academic & Rhetoric** | [[lene]], [[lenis]] | Phonetics |
| 🗣️ **Everyday & Professional** | [[relent]], [[relentless]] | Negotiation, persistence |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[allen]] | noun | **1.** United states comedienne remembered as the confused but imperturbable partner of her husband, george burns (1906-1964).<br>**2.** United states filmmaker and comic actor (1935-). | *"Allen’s side, of having once left her clogs behind her at an inn, and that fortunately proved to be groundless."* — Jane Austen, *Northanger Abbey* |
| [[allentown]] | noun | **1.** A city in eastern pennsylvania; an industrial and commercial center. | *"These words are being written in the city of Allentown, Pa., where the writer is spending ten days in a series of Pentecostal services."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[lena]] | noun | **1.** A russian river in siberia; flows northward into the laptev sea. | *"AEMILIUS LEPIDUS, ” ” ” CICERO, PUBLIUS, POPILIUS LENA, Senators."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lenard]] | noun | **1.** German physicist who studied cathode rays (1862-1947). | *"In academic literature, lenard designates german physicist who studied cathode rays (1862-1947)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lene]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin len within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of len in systematic terminology. | *"In academic literature, lene designates pertaining to, derived from, or characteristic of latin len within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenience]] | noun | **1.** Mercifulness as a consequence of being lenient or tolerant.<br>**2.** A disposition to yield to the wishes of someone. | *"In academic literature, lenience designates mercifulness as a consequence of being lenient or tolerant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leniency]] | noun | **1.** Mercifulness as a consequence of being lenient or tolerant.<br>**2.** A disposition to yield to the wishes of someone. | *"The lawyer, too, was fairly provoked at the faithlessness of the debtor in his promises or his attention to the subject; thus matters dragged wearily for months, yet exercised leniency in pressing the claim."* — Classic Author, *The wonders of prayer* |
| [[lenient]] | adjective | **1.** Tolerant or lenient.<br>**2.** Not strict. | *"Nothing more, Rick; nothing more.” “And you, being a good man, can pass it as such, and forgive and pity the dreamer, and be lenient and encouraging when he wakes?” “Indeed I can."* — Charles Dickens, *Bleak House* |
| [[leniently]] | adverb | **1.** In a permissively lenient manner. | *"A lady so graceful and accomplished,” he said, kissing his right glove and afterwards extending it towards the pupils, “will look leniently on the deficiencies here."* — Charles Dickens, *Bleak House* |
| [[lenify]] | verb | **1.** Cause to be more favorably inclined; gain the good will of. | *"In academic literature, lenify designates cause to be more favorably inclined; gain the good will of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenin]] | noun | **1.** Russian founder of the bolsheviks and leader of the russian revolution and first head of the ussr (1870-1924). | *"In academic literature, lenin designates russian founder of the bolsheviks and leader of the russian revolution and first head of the ussr (1870-1924)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leningrad]] | noun | **1.** A city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia. | *"In academic literature, leningrad designates a city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[leninism]] | noun | **1.** The political and economic theories of lenin which provided the guiding doctrine of the soviet union; the modification of marxism by lenin stressed that imperialism is the highest form of capitalism (which shifts the struggle from developed to underdeveloped countries). | *"In academic literature, leninism designates the political and economic theories of lenin which provided the guiding doctrine of the soviet union; the modification of marxism by lenin stressed that imperialism is the highest form of capitalism (which shifts the struggle from developed to underdeveloped countries)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenis]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin len within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of len in systematic terminology. | *"In academic literature, lenis designates pertaining to, derived from, or characteristic of latin len within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenitive]] | noun | **1.** Remedy that eases pain and discomfort.<br>**2.** Moderating pain or sorrow by making it easier to bear. | *"In academic literature, lenitive designates remedy that eases pain and discomfort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenity]] | noun | **1.** Mercifulness as a consequence of being lenient or tolerant. | *"If he have power, Then vail your ignorance; if none, awake Your dangerous lenity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lennoaceae]] | noun | **1.** Family of fleshy parasitic herbs lacking green foliage and having heads of small flowers; california and mexico. | *"In academic literature, lennoaceae designates family of fleshy parasitic herbs lacking green foliage and having heads of small flowers; california and mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lennon]] | noun | **1.** English rock star and guitarist and songwriter who with paul mccartney wrote most of the music for the beatles (1940-1980). | *"In academic literature, lennon designates english rock star and guitarist and songwriter who with paul mccartney wrote most of the music for the beatles (1940-1980)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lens]] | noun | **1.** A transparent optical device used to converge or diverge transmitted light and to form images.<br>**2.** Genus of small erect or climbing herbs with pinnate leaves and small inconspicuous white flowers and small flattened pods: lentils. | *"She hardly observed that a tear descended slowly upon his cheek, a tear so large that it magnified the pores of the skin over which it rolled, like the object lens of a microscope."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[lense]] | noun | **1.** A transparent optical device used to converge or diverge transmitted light and to form images. | *"The creeping plants about the old manor-house were bowed with rows of heavy water drops, which had upon objects behind them the effect of minute lenses of high magnifying power."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[lensman]] | noun | **1.** Someone who takes photographs professionally. | *"In academic literature, lensman designates someone who takes photographs professionally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lent]] | noun | **1.** A period of 40 weekdays from ash wednesday to holy saturday.<br>**2.** Bestow a quality on. | *"Then does he say he lent me Some shipping, unrestored."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lenten]] | adjective | **1.** Of or relating to or suitable for lent. | *"To think, my lord, if you delight not in man, what Lenten entertainment the players shall receive from you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lententide]] | noun | **1.** A period of 40 weekdays from ash wednesday to holy saturday. | *"In academic literature, lententide designates a period of 40 weekdays from ash wednesday to holy saturday."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentia]] | noun | **1.** City in northern austria on the danube; noted as a cultural center. | *"In academic literature, lentia designates city in northern austria on the danube; noted as a cultural center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentibulariaceae]] | noun | **1.** Carnivorous aquatic or bog plants: genera utricularia, pinguicula, and genlisea. | *"In academic literature, lentibulariaceae designates carnivorous aquatic or bog plants: genera utricularia, pinguicula, and genlisea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentic]] | adjective | **1.** Of or relating to or living in still waters (as lakes or ponds). | *"In academic literature, lentic designates of or relating to or living in still waters (as lakes or ponds)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenticel]] | noun | **1.** One of many raised pores on the stems of woody plants that allow the interchange of gas between the atmosphere and the interior tissue. | *"In academic literature, lenticel designates one of many raised pores on the stems of woody plants that allow the interchange of gas between the atmosphere and the interior tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lenticular]] | adjective | **1.** Convex on both sides; shaped like a lentil. | *"Fore and aft rose two cages of medium height with inclined sides, and partly closed by thick lenticular glasses; one destined for the steersman who directed the _Nautilus_, the other containing a brilliant lantern to give light on the road."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[lentiform]] | adjective | **1.** Convex on both sides; shaped like a lentil. | *"In academic literature, lentiform designates convex on both sides; shaped like a lentil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentiginose]] | adjective | **1.** Relating to or covered with or resembling freckles. | *"In academic literature, lentiginose designates relating to or covered with or resembling freckles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentiginous]] | adjective | **1.** Relating to or covered with or resembling freckles. | *"In academic literature, lentiginous designates relating to or covered with or resembling freckles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentigo]] | noun | **1.** A small brownish spot (of the pigment melanin) on the skin. | *"In academic literature, lentigo designates a small brownish spot (of the pigment melanin) on the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentil]] | noun | **1.** Round flat seed of the lentil plant used for food.<br>**2.** The fruit or seed of a lentil plant. | *"And, provided with a lentil, he lighted a fire of dead wood that crackled joyously."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[lentinus]] | noun | **1.** A genus of fungus belonging to the family tricholomataceae. | *"In academic literature, lentinus designates a genus of fungus belonging to the family tricholomataceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentisk]] | noun | **1.** An evergreen shrub of the mediterranean region that is cultivated for its resin. | *"In academic literature, lentisk designates an evergreen shrub of the mediterranean region that is cultivated for its resin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lentissimo]] | adjective | **1.** (of tempo) very slow. | *"In academic literature, lentissimo designates (of tempo) very slow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lento]] | adjective | **1.** (of tempo) slow.<br>**2.** In music. | *"In academic literature, lento designates (of tempo) slow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millenary]] | noun | **1.** The 1000th anniversary (or the celebration of it).<br>**2.** A span of 1000 years. | *"In academic literature, millenary designates the 1000th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millennial]] | adjective | **1.** Relating to a millennium or span of a thousand years. | *"Millennial glory If all who ever partook of the sacrament had really commemorated the sufferings of Jesus and drunk of 34:12 his cup, they would have revolutionized the world."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[millennian]] | adjective | **1.** Relating to a millennium or span of a thousand years. | *"In academic literature, millennian designates relating to a millennium or span of a thousand years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millennium]] | noun | **1.** A span of 1000 years.<br>**2.** (new testament) in revelations it is foretold that those faithful to jesus will reign with jesus over the earth for a thousand years; the meaning of these words have been much debated; some denominations (e.g. jehovah's witnesses) expect it to be a thousand years of justice and peace and happiness. | *"The rank and file might be willing to talk of the millennium, but preferred to take it in instalments instead of waiting for it to come some centuries after they were dead."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[millenniumism]] | noun | **1.** Belief in the christian doctrine of the millennium mentioned in the book of revelations. | *"In academic literature, millenniumism designates belief in the christian doctrine of the millennium mentioned in the book of revelations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmillennial]] | adjective | **1.** Of or relating to the period following the millennium. | *"In academic literature, postmillennial designates of or relating to the period following the millennium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[relent]] | verb | **1.** Give in, as to influence or pressure. | *"Can you, my Lord of Winchester, behold My sighs and tears, and will not once relent?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[relentless]] | adjective | **1.** Not to be placated or appeased or moved by entreaty.<br>**2.** Never-ceasing. | *"Bucket shakes his relentless head."* — Charles Dickens, *Bleak House* |
| [[relentlessly]] | adverb | **1.** In a relentless manner. | *"The cry meets with no response, but instead, relentlessly, surely, aye, and most mercifully, the facts and events group themselves about the cowering spirit, that before Love celestial Light may arise."* — C. A. Frazer, *Atmâ* |
| [[relentlessness]] | noun | **1.** Mercilessness characterized by an unwillingness to relent or let up. | *"In academic literature, relentlessness designates mercilessness characterized by an unwillingness to relent or let up."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selenarctos]] | noun | **1.** Asiatic black bears; in some classifications not a separate genus from ursus. | *"In academic literature, selenarctos designates asiatic black bears; in some classifications not a separate genus from ursus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selene]] | noun | **1.** (greek mythology) goddess of the moon in ancient mythology; identified with roman luna.<br>**2.** A genus of carangidae. | *"The princess Selene, in moonblue robes, a silver crescent on her head, descends from a Sedan chair, borne by two giants."* — James Joyce, *Ulysses* |
| [[selenicereus]] | noun | **1.** Mostly epiphytic climbing cacti that bloom at night. | *"In academic literature, selenicereus designates mostly epiphytic climbing cacti that bloom at night."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selenipedium]] | noun | **1.** Genus of tall reedlike tropical american orchids; includes species with pods used locally as a substitute for vanilla. | *"In academic literature, selenipedium designates genus of tall reedlike tropical american orchids; includes species with pods used locally as a substitute for vanilla."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selenium]] | noun | **1.** A toxic nonmetallic element related to sulfur and tellurium; occurs in several allotropic forms; a stable grey metallike allotrope conducts electricity better in the light than in the dark and is used in photocells; occurs in sulfide ores (as pyrite). | *"The basis of it is a peculiar power possessed by the metal selenium when in a certain state."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[selenolatry]] | noun | **1.** The worship of the moon. | *"In academic literature, selenolatry designates the worship of the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[selenology]] | noun | **1.** The branch of astronomy that deals with the moon. | *"In academic literature, selenology designates the branch of astronomy that deals with the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somnolence]] | noun | **1.** A very sleepy state. | *"As a physiologist he believed in the artificial placation of malignant agencies chiefly operative during somnolence."* — James Joyce, *Ulysses* |
| [[somnolent]] | adjective | **1.** Inclined to or marked by drowsiness. | *"When they had passed the little town of Stourcastle, dumbly somnolent under its thick brown thatch, they reached higher ground."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[somnolently]] | adverb | **1.** In a drowsy manner. | *"In academic literature, somnolently designates in a drowsy manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LEN
  </div>
</div>
