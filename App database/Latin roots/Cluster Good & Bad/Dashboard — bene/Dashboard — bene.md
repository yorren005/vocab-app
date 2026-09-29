---
status: unread
type: root_dashboard
---
# Dashboard — bene
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bene-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“well or good”</span>
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

The root **bene** means well or good. It refers to doing good, speaking blessing, wishing goodwill, inherent kindness. In English, this root forms words such as *benefit*, *beneficial*, *benefactor*, and *benevolent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: well or good
> The root **bene** means well or good. It refers to doing good, speaking blessing, wishing goodwill, inherent kindness. In English, this root forms words such as *benefit*, *beneficial*, *benefactor*, and *benevolent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Well or good</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Comparing a fresh, wholesome fruit against a damaged or spoiled one.</mark>
> - **Everyday Connection**: Think of familiar words like *benefit* and *beneficial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bene** comes from a Latin word that means *"well or good"*.
  - At its core, it describes well or good.

- **The Big Picture Idea**:
  - Picture comparing a fresh, wholesome fruit against a damaged or spoiled one.
  - Whenever you see **bene** in an English word, think of **goodness, benefits, or harm**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of well or good.
  - **Mental & Social**: How people experience, organize, or communicate about well or good.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Benefit**: An advantage, profit, or helpful effect.
  - **Beneficial**: Producing good or helpful results.
  - **Benefactor**: A person who gives money or other help to a person or cause, such as a charity or university.
  - **Benevolent**: Well-meaning and kindly.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bene</mark>, think of <mark class="hl-def">goodness, benefits, or harm</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `bene`
> Derivations split across adverbial compounds and the adjectival *bonus* family:
> 1. **Verbal Compounds with `bene-`:**
>    - With *facere* ("to do"): **benefit**, **beneficial**, **beneficially**, **beneficiary**, **benefactor**, **benefactress**, **benefaction**, **benefice**, **beneficed**, **beneficence**, **beneficent**, **beneficently**.
>    - With *dīcere* ("to speak"): **benediction**, **benedictory**, **benedictive**, **benison**, **Benedictine**.
>    - With *velle* ("to wish"): **benevolent**, **benevolence**, **benevolently**.
>    - With *genus* ("birth/kind"): **benign**, **benignly**, **benignant**, **benignancy**, **benignity**.
> 2. **Latin Formulaic Phrases:**
>    - **nota bene** (imperative: "note well", N.B.).
>    - **bene placito** ("at good pleasure").
>    - **bona fide**, **bona fides** ("in good faith").
> 3. **The Adjectival Stems (`bon-` / `boun-` < *bonus*):**
>    - **bonus**, **bounty**, **bountiful**, **bounteous**, **bonanza**, **bonhomie**.

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
                                  ┌── Active Generosity ──────── benefit, beneficial, benefactor, beneficence, beneficent
                                  │
                                  ├── Sacred Utterances ──────── benediction, benedictory, benison, Benedictine
    [BENE- / BON-] ───────────────┼── Altruistic Disposition ─── benevolent, benevolence, benevolently
(well / good / blessing)          │
                                  ├── Harmlessness & Grace ───── benign, benignly, benignant, benignity
                                  │
                                  └── Abundance & Good Faith ─── bonus, bounty, bountiful, bonanza, bona fide
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Philanthropy, Law & Endowments:** *benefit*, *beneficial*, *beneficially*, *beneficiary*, *benefactor*, *benefactress*, *benefaction*, *benefice*, *beneficed*.
> 2. **Bioethics & Moral Philosophy:** *beneficence*, *beneficent*, *beneficently*, *benevolent*, *benevolence*, *benevolently*.
> 3. **Liturgy, Theology & Monasticism:** *benediction*, *benedictory*, *benedictive*, *benison*, *Benedictine*.
> 4. **Oncology, Pathology & Demeanor:** *benign*, *benignly*, *benignant*, *benignancy*, *benignity*.
> 5. **Commerce, Prosperity & Jurisprudence:** *bonus*, *bounty*, *bountiful*, *bounteous*, *bonanza*, *bona fide*, *bona fides*, *nota bene*, *bene placito*, *bonhomie*.

---

## 🔀 4. Prefix & Combining Dynamics on bene

### The Semantic Fusion of `bene-` with Action Stems

| Combining Element   | Classical Meaning | Resulting Compound              | Semantic Synthesis                                                  |
| :------------------ | :---------------- | :------------------------------ | :------------------------------------------------------------------ |
| `-fic-` (*facere*)  | to do, make       | **beneficent**, **beneficence** | Actively performing good deeds; ethical duty of patient welfare.    |
| `-fact-` (*factum*) | deed, act         | **benefactor**, **benefaction** | One who finances noble causes or donates charitable capital.        |
| `-dic-` (*dīcere*)  | to say, proclaim  | **benediction**, **benison**    | Speaking good words; a formal liturgical blessing over congregants. |
| `-vol-` (*velle*)   | to wish, will     | **benevolent**, **benevolence** | Harboring a disposition of genuine goodwill and compassion.         |
| `-gn-` (*genus*)    | birth, kind       | **benign**, **benignant**       | "Well-born" $ightarrow$ gracious, gentle, and non-metastatic.     |

### The Universal Mirror Polarity: `bene-` vs. `mal-`

| Virtue (`bene-` / well) | IPA              | Vice (`mal-` / badly) | IPA              | Polar Meaning                                              |
| :---------------------- | :--------------- | :-------------------- | :--------------- | :--------------------------------------------------------- |
| **benefactor**          | /ˈben.ɪ.fæk.tər/ | **malefactor**        | /ˈmæl.ɪ.fæk.tər/ | Well-doer $\longleftrightarrow$ Criminal wrongdoer         |
| **beneficent**          | /bəˈnef.ɪ.sənt/  | **maleficent**        | /məˈlef.ɪ.sənt/  | Doing good $\longleftrightarrow$ Inflicting harm           |
| **benediction**         | /ˌben.ɪˈdɪk.ʃən/ | **malediction**       | /ˌmæl.ɪˈdɪk.ʃən/ | Holy blessing $\longleftrightarrow$ Destructive curse      |
| **benevolent**          | /bəˈnev.əl.ənt/  | **malevolent**        | /məˈlev.əl.ənt/  | Wishing goodwill $\longleftrightarrow$ Harboring spite     |
| **benign**              | /bɪˈnaɪn/        | **malign**            | /məˈlaɪn/        | Harmless/gracious $\longleftrightarrow$ Spiteful/injurious |
| **benignant**           | /bɪˈnɪɡ.nənt/    | **malignant**         | /məˈlɪɡ.nənt/    | Kindly $\longleftrightarrow$ Invasive/cancerous            |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Bioethics & Healthcare Law:** The Belmont Report establishes *beneficence* and *non-maleficence* as cardinal duties: healthcare providers must actively maximize potential patient benefits while minimizing harm.
> 2. **Surgical Oncology & Pathology:** Cytopathologists examine histopathological margins to classify neoplasms as *benign* (non-invasive, encapsulated) versus malignant (infiltrative).
> 3. **Estate Planning & Trust Law:** Wills and insurance policies designate named *beneficiaries* entitled to equitable distribution of trust assets.
> 4. **Ecclesiastical History:** The medieval investiture controversy centered on whether secular monarchs or the Pope held the authority to invest bishops with lucrative territorial *benefices*.
> 5. **Contract Law & Jurisprudence:** A *bona fide* purchaser for value without notice acquires legal title free of unrecorded equitable liens.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[beneath]] | adverb | **1.** In or to a place that is lower. | *"From below your duke to beneath your constable, it will fit any question."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[benefice]] | noun | **1.** An endowed church office giving income to its holder.<br>**2.** Endow with a benefice. | *"In some parishes, where the reputation of the curate in this respect stood higher than that of his rector, the relations between the two have been so strained in consequence that the bishop has had to translate the rector to another benefice."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[beneficed]] | verb | **1.** Endow with a benefice.<br>**2.** Having a benefice. | *"He will even speak well of the bishop, though I tell him it is unnatural in a beneficed clergyman; what can one do with a husband who attends so little to the decencies?"* — George Eliot, *Middlemarch* |
| [[beneficence]] | noun | **1.** Doing good; feeling beneficent.<br>**2.** The quality of being kind or helpful or generous. | *"Each fresh house was the one where they were to abide for ever, and each formed the base of operations for some new scheme of comprehensive beneficence."* — Sydney Waterlow, *Shelley* |
| [[beneficent]] | adjective | **1.** Doing or producing good.<br>**2.** Generous in assistance to the poor. | *"But you are a single person, sir, and may you long be spared to ask a married person such a question!” With this beneficent wish, Mr."* — Charles Dickens, *Bleak House* |
| [[beneficial]] | adjective | **1.** Promoting or enhancing well-being. | *"Therefore, merchant, I’ll limit thee this day To seek thy health by beneficial help."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[beneficially]] | adverb | **1.** In a beneficial manner. | *"Very soon their tent was completed, their "Diet Kitchen" arranged, the valuable supplies they had brought with them ready for distribution, and their work moving on smoothly and beneficially amid all the horrors of this terrible field."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[beneficiary]] | noun | **1.** The recipient of funds or other benefits.<br>**2.** The semantic role of the intended recipient who benefits from the happening denoted by the verb in the clause. | *"The beneficiary must have an _incurable interest_ in the property or person insured; that is, the beneficiary must actually suffer a loss by the occurrence insured against."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[beneficiate]] | verb | **1.** Process (ores or other raw materials), as by reduction. | *"In academic literature, beneficiate designates process (ores or other raw materials), as by reduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[beneficiation]] | noun | **1.** Crushing and separating ore into valuable substances or waste by any of a variety of techniques. | *"In academic literature, beneficiation designates crushing and separating ore into valuable substances or waste by any of a variety of techniques."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[benefit]] | noun | **1.** Financial assistance in time of need.<br>**2.** Something that aids or promotes well-being. | *"Lo thus by day my limbs, by night my mind, For thee, and for my self, no quiet find. 28 How can I then return in happy plight That am debarred the benefit of rest?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[benelux]] | noun | **1.** A customs union comprising belgium and netherlands and luxembourg. | *"Twenty-first, the establishment of summer schools in each of the Scandinavian and Benelux countries, as well as those of the Iberian Peninsula."* — Effendi Shoghi, *Citadel of Faith* |
| [[benet]] | noun | **1.** United states poet; brother of william rose benet (1898-1943).<br>**2.** United states writer; brother of stephen vincent benet (1886-1950). | *"In academic literature, benet designates united states poet; brother of william rose benet (1898-1943)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probenecid]] | noun | **1.** A uricosuric drug that reduces the level of uric acid in the blood; used to treat gout. | *"In academic literature, probenecid designates a uricosuric drug that reduces the level of uric acid in the blood; used to treat gout."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unbeneficed]] | adjective | **1.** Not having a benefice. | *"In academic literature, unbeneficed designates not having a benefice."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · BENE
  </div>
</div>
