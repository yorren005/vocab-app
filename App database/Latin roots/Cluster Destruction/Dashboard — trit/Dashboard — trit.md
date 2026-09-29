---
status: unread
type: root_dashboard
---
# Dashboard — trit
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">trit-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to rub or wear”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **trit** means to rub or wear. It refers to rubbing, friction, abrasive wear, and crushing to powder. In English, this root forms words such as *bore*, *trite*, *triteness*, and *tritely*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to rub or wear
> The root **trit** means to rub or wear. It refers to rubbing, friction, abrasive wear, and crushing to powder. In English, this root forms words such as *bore*, *trite*, *triteness*, and *tritely*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To rub or wear</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *bore* and *trite*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **trit** comes from a Latin word that means *"to rub or wear"*.
  - At its core, it describes the action of rub or wear.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **trit** in an English word, think of **to rub or wear**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to rub or wear).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Bore**: An everyday English word showing the root's idea of *to rub or wear*.
  - **Trite**: Hackneyed, stale, or boring through constant use.
  - **Triteness**: The state, quality, or condition of being trite, hackneyed, or commonplace.
  - **Tritely**: In a trite, banal, or hackneyed manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">trit</mark>, think of <mark class="hl-def">to rub or wear</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Stems & Compounding Mechanisms
> The root **trit** manifests in English across four principal morphological forms:
> - **Participial / Supine Stem (`trit-`):** Derived from Latin *trītum*, forming adjectives like [[trite]] ("rubbed smooth, commonplace"), nouns like [[detritus]] ("matter rubbed off"), and theological terms like [[contrite]] ("thoroughly bruised").
> - **Frequentative / Iterative Stem (`tritur-`):** Derived from the Late Latin frequentative verb *tritūrāre* ("to thrash, grind thoroughly, pulverize"), yielding technical terms such as [[triturate]] and [[trituration]].
> - **Present & Nominal Stem (`ter-` / `teri-` / `teret-`):** Preserved in Latin *dētrīmentum* (via the extended stem *dētrī-*, "a wearing down") and the adjective *teres, teretis* ("rubbed smooth, cylindrical, rounded"), surviving in the botanical and anatomical term [[terete]].
> - **Instrumental Derivative (`tribul-`):** Derived from the Latin instrumental noun *tribulum* (the threshing sledge, *terere* + instrumental suffix *-bulum*), which generated the Church Latin verb *tribulāre* ("to oppress, afflict, thresh spiritually") and yielded [[tribulation]].

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

> [!tip] 🌈 The Five Distinct Semantic Streams of `trit`
> The physical act of rubbing and grinding bifurcated into distinct cultural, scientific, and theological vocabularies:
> - **The Rhetorical & Literary Domain:** [[trite]], [[triteness]], [[tritely]] — where linguistic novelty is worn smooth by excessive, uncritical usage.
> - **The Theological & Penitential Domain:** [[contrite]], [[contrition]], [[attrition]], [[tribulation]] — Christian Latin appropriated the vocabulary of grain-threshing and rock-crushing to describe the painful inner grinding of the sinner's pride before God.
> - **The Geological & Ecological Domain:** [[detritus]], [[detrital]], [[detritivore]], [[detritivorous]] — rock weathering, sediment formation, and the vital recycling of decaying organic particles in ecosystems.
> - **The Military, Corporate & Material Domain:** [[attrition]], [[attritional]], [[detriment]], [[detrimental]] — the gradual wearing away of enemy armies, corporate staff, or physical structural integrity through sustained friction or friction-like stress.
> - **The Pharmaceutical & Chemical Domain:** [[triturate]], [[trituration]], [[triturator]] — reducing compounds to microfine powders to increase surface area and bioavailability.

---

## 🔀 4. Prefix & Combining Dynamics on trit

### Prefix Dynamics (Directional Modulation of Friction)

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` | to, toward, against | `ad-` + `trit-` $\to$ **[[attrition]]** | Assimilation of *d* to *t* ($ad- \to at-$): "rubbing against something; friction that wears down surface mass or combatant capacity." |
| `con-` | together, completely | `con-` + `trit-` $\to$ **[[contrite]]** | Intensive prefix indicating thorough, comprehensive action: "crushed all together, thoroughly bruised in spirit by remorse." |
| `de-` | down, away from | `de-` + `trit-` $\to$ **[[detritus]]**, **[[detriment]]** | Privative and directional: "rubbed off, worn away from the parent body," yielding loose fragments or legal/material injury. |
| `inter-` | between, among | `inter-` + `trī-` $\to$ **[[intertrigo]]** | Locative prefix: "chafing or inflammation caused by the friction of two opposing folds of skin rubbing together." |

### Suffix Dynamics (Functional & Grammatical Stabilization)

| Suffix | Functional Role | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ate` | Verb formative (iterative) | [[triturate]], [[tribulate]] | Causes an action: to grind down thoroughly or to subject to harrowing affliction. |
| `-tion` / `-ion` | Abstract noun of action / state | [[contrition]], [[attrition]], [[trituration]], [[tribulation]] | The process, psychological state, or concrete result of abrasive grinding. |
| `-ment` | Noun of result / instrument | [[detriment]] | Latin *-mentum*: that which results from being rubbed away; hence damage, injury, loss. |
| `-us` | Latin 4th-declension noun | [[detritus]] | Literally "that which has been rubbed off"; loose geological fragments or organic debris. |
| `-ivore` | Noun (feeding agent) | [[detritivore]] | *detritus* + Latin *vorāre* ("to devour"): an organism subsisting on decomposed organic waste. |
| `-ness` / `-ly` | Vernacular noun / adverb | [[triteness]], [[tritely]], [[contritely]] | Adapting classical participial adjectives into native English registers of style and manner. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| 🪨 **Geology & Sedimentology** | [[detritus]], [[detrital]] | Detrital rocks (sandstone, shale) formed from fragments of pre-existing minerals rubbed off by weathering and hydraulic erosion. |
| 🌿 **Ecology & Soil Biology** | [[detritivore]], [[detritivorous]] | Organisms such as earthworms, millipedes, and dung beetles that decompose organic detritus, driving vital nutrient cycles. |
| 💊 **Pharmacy & Dentistry** | [[triturate]], [[trituration]], [[triturator]] | Thoroughly grinding homeopathic remedies with lactose, or mechanical triturators mixing dental amalgam alloy with liquid mercury. |
| ⚔️ **Military Science & Geopolitics** | [[attrition]], [[attritional]] | A war of attrition (e.g., the Western Front in WWI) where neither side seeks swift breakthrough, but aims to grind down the opponent's manpower and materiel. |
| ⛪ **Theology & Moral Philosophy** | [[contrition]], [[contrite]], [[attrition]], [[tribulation]] | Catholic sacramental theology distinguishes *contritio* (sorrow for sin arising from perfect love of God) from *attritio* (imperfect sorrow motivated by fear of hell). |
| ✍️ **Rhetoric & Literary Criticism** | [[trite]], [[triteness]], [[tritely]] | Style analysis censuring clichéd phrases, predictable metaphors, and stale tropes worn out by endless mechanical reproduction. |
| 🩺 **Dermatology & Clinical Medicine** | [[intertrigo]], [[intertriginous]] | Erythematous, macerated inflammatory rash developing in skin-to-skin contact folds (axillary, inframammary, inguinal) due to moisture and friction. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attrited]] | adjective | **1.** Worn by rubbing or friction. | *"In academic literature, attrited designates worn by rubbing or friction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attrition]] | noun | **1.** Erosion by friction.<br>**2.** The wearing down of rock particles by friction due to water or wind or ice. | *"But the incidents of his adventure grew sensibly sharper and clearer under the attrition of thinking them over, and so he presently found himself leaning to the impression that the thing might not have been a dream, after all."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[attritional]] | adjective | **1.** Relating to or caused by attrition. | *"In academic literature, attritional designates relating to or caused by attrition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contrite]] | adjective | **1.** Feeling or expressing pain or sorrow for sins or offenses. | *"I Richard’s body have interred new, And on it have bestow’d more contrite tears Than from it issued forced drops of blood."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contritely]] | adverb | **1.** In a rueful manner. | *"It is going to be the regret of my life." "Truly, I'm sorry, sweetheart," he answered most contritely."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[contriteness]] | noun | **1.** Sorrow for sin arising from fear of damnation. | *"In academic literature, contriteness designates sorrow for sin arising from fear of damnation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contrition]] | noun | **1.** Sorrow for sin arising from fear of damnation. | *"Snagsby!” It was necessary for her mistress to comfort her—which she did, I must say, with a good deal of contrition—before she could be got beyond this."* — Charles Dickens, *Bleak House* |
| [[detrition]] | noun | **1.** Erosion by friction.<br>**2.** The wearing down of rock particles by friction due to water or wind or ice. | *"In academic literature, detrition designates erosion by friction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detritus]] | noun | **1.** The remains of something that has been destroyed or broken up.<br>**2.** Loose material (stone fragments and silt etc) that is worn away from rocks. | *"The strip cut across and through narrow streets and alleys lined with huts fused from the gray detritus of the planet."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tritanopia]] | noun | **1.** Rare form of dichromacy characterized by a lowered sensitivity to blue light resulting in an inability to distinguish blue and yellow. | *"In academic literature, tritanopia designates rare form of dichromacy characterized by a lowered sensitivity to blue light resulting in an inability to distinguish blue and yellow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tritanopic]] | adjective | **1.** Inability to see the color blue or to distinguish the colors blue and yellow. | *"In academic literature, tritanopic designates inability to see the color blue or to distinguish the colors blue and yellow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trite]] | adjective | **1.** Repeated too often; overfamiliar through overuse. | *"Still, to a close observer, they are just as perceptible; the difference is that their media of manifestation are less trite and familiar than such well-known ones as the bursting of the buds or the fall of the leaf."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tritely]] | adverb | **1.** In a trite manner. | *"He nodded to himself as he drew off his trousers and stood up, saying tritely: —Redheaded women buck like goats."* — James Joyce, *Ulysses* |
| [[triteness]] | noun | **1.** Unoriginality as a result of being dull and hackneyed. | *"But, when we ridicule the triteness of monumental verses, we forget that Sorrow reads far deeper in them than we can, and finds a profound and individual purport in what seems so vague and inexpressive, unless interpreted by her."* — Nathaniel Hawthorne, *Chippings with a Chisel (From "Twice Told Tales")* |
| [[triticum]] | noun | **1.** Annual cereal grasses from mediterranean area; widely cultivated in temperate regions. | *"In academic literature, triticum designates annual cereal grasses from mediterranean area; widely cultivated in temperate regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tritium]] | noun | **1.** A radioactive isotope of hydrogen; atoms of tritium have three times the mass of ordinary hydrogen atoms. | *"In academic literature, tritium designates a radioactive isotope of hydrogen; atoms of tritium have three times the mass of ordinary hydrogen atoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tritoma]] | noun | **1.** A plant of the genus kniphofia having long grasslike leaves and tall scapes of red or yellow drooping flowers. | *"In academic literature, tritoma designates a plant of the genus kniphofia having long grasslike leaves and tall scapes of red or yellow drooping flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[triton]] | noun | **1.** (greek mythology) a sea god; son of poseidon.<br>**2.** The largest moon of neptune. | *"Hear you this Triton of the minnows?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[triturus]] | noun | **1.** Chiefly aquatic salamanders. | *"In academic literature, triturus designates chiefly aquatic salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TRIT
  </div>
</div>
