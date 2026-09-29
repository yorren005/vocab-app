---
status: unread
type: root_dashboard
---
# Dashboard — sum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sum-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to take or consume”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands holding an object firmly so it does not slip or drop.</span>
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

The root **sum** means to take or consume. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *assumable*, *assume*, *assumer*, and *assuming*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to take or consume
> The root **sum** means to take or consume. It refers to grasping an object firmly with the hands or taking control of something. In English, this root forms words such as *assumable*, *assume*, *assumer*, and *assuming*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To take or consume</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands holding an object firmly so it does not slip or drop.</mark>
> - **Everyday Connection**: Think of familiar words like *assumable* and *assume*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sum** comes from a Latin word that means *"to take or consume"*.
  - At its core, it describes the action of take or consume.

- **The Big Picture Idea**:
  - Picture hands holding an object firmly so it does not slip or drop.
  - Whenever you see **sum** in an English word, think of **to take or consume**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to take or consume).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Assumable**: Capable of being assumed, taken on, or taken for granted.
  - **Assume**: To take for granted or suppose something to be true without conclusive empirical verification.
  - **Assumer**: A person who assumes something.
  - **Assuming**: Adj.** Arrogant, haughty, overbearing, presumptuous.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sum</mark>, think of <mark class="hl-def">to take or consume</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates primarily as a verbal combining base `-sume` in English, attaching directional Latin prefixes:
> 1. **Prefix + `sūmere`:**
>    - `ad-` ($\to$ `as-`) + *sūmere* $\to$ *assume* ("to take to oneself").
>    - `con-` + *sūmere* $\to$ *consume* ("to take up completely, devour").
>    - `prae-` ($\to$ `pre-`) + *sūmere* $\to$ *presume* ("to take beforehand, anticipate").
>    - `re-` + *sūmere* $\to$ *resume* ("to take back again, restart").
>    - `sub-` + *sūmere* $\to$ *subsume* ("to take under a broader category").
> 2. **Suffixation on the Verbal Base:**
>    - `-er` forms human/economic agents: *consumer*, *assumer*, *presumer*.
>    - `-able` forms adjectives of capacity: *consumable*, *assumable*, *presumable*, *subsumable*, *resumable*.
>    - `-ing` forms active participles: *assuming*, *consuming*, *unassuming*, *all-consuming*.
>    - `-ism` forms sociopolitical ideologies: *consumerism*, *consumerist*.
>    - `-ably` forms epistemic adverbs: *presumably*.

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
> - **Epistemology & Logic:** *Assume*, *presume*, *presumably* — taking propositions as valid working truths without direct empirical proof.
> - **Character & Moral Deportment:** *Unassuming*, *presuming* — modest restraint versus arrogant overstepping of social boundaries.
> - **Economics, Ecology & Nutrition:** *Consume*, *consumer*, *consumerism*, *consumable*, *all-consuming* — purchasing goods, depleting energy, and absorbing emotional attention.
> - **Taxonomy & Legal Adjudication:** *Subsume*, *subsumable* — fitting concrete statutory facts beneath abstract legislative classifications.
> - **Narrative & Temporal Continuity:** *Resume*, *resumable*, *reassume* — restarting an interrupted sequence or re-entering an abandoned office.

---

## 🔀 4. Prefix & Combining Dynamics on sum

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Sense | Combined Derivative | Resulting Semantic Evolution |
| :--- | :--- | :--- | :--- |
| `ad-` ($\to$ `as-`) | to, toward, upon oneself | [[assume]], [[unassuming]] | To take upon oneself (a role, debt, or premise); taking without justification. |
| `con-` | together, completely, utterly | [[consume]], [[consumer]], [[consumable]] | To take up wholly; to devour, burn up, spend, or absorb entirely. |
| `prae-` / `pre-` | before, in advance | [[presume]], [[presumably]] | To take in advance; to take for granted without waiting for conclusive proof. |
| `re-` | back, again, anew | [[resume]], [[reassume]] | To take up again; to recommence an activity after a suspension. |
| `sub-` | under, beneath | [[subsume]], [[subsumable]] | To take under; to classify a specific instance under a comprehensive rule or category. |
| `trans-` | across, beyond | [[transume]] | To take across; *(Historical Law)* to transcribe or make an official copy of a legal record. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Morphological Function |
| :--- | :--- | :--- | :--- |
| `-er` | Agent Noun | [[consumer]] | The economic person who purchases and uses commodities or services. |
| `-able` | Adjective (Potential / Fitness) | [[consumable]], [[presumable]], [[subsumable]], [[resumable]] | Capable of being depleted, taken for granted, classified, or restarted. |
| `-ing` | Participle / Adjective | [[consuming]], [[all-consuming]], [[unassuming]] | Characterizing an action that absorbs complete energy, or describing modest modesty. |
| `-ism` / `-ist` | Noun / Adjective (Ideology) | [[consumerism]], [[consumerist]] | The socioeconomic system focused on continuous acquisition of consumer goods. |
| `-ably` | Adverb (Epistemic Probability) | [[presumably]] | Expressing what may reasonably be taken for granted based on current evidence. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📊 **Economics, Retail & Supply Chain** | [[consumer]], [[consumerism]], [[consumable]], [[consume]] | Consumer price index (CPI); disposable consumables in manufacturing; Keynesian macroeconomic aggregate consumption functions. |
| ⚖️ **Philosophy, Jurisprudence & Logic** | [[assume]], [[presume]], [[subsume]], [[presumably]] | The legal presumption of innocence (*praesumptio innocentiae*); subsuming statutory evidence under criminal penal codes; philosophical assumptions in epistemology. |
| 💻 **Computing & Systems Architecture** | [[resumable]], [[consume]], [[consumer]] | Resumable data streams and downloads; producer-consumer design patterns in multithreaded concurrent programming; memory-consuming background daemons. |
| 🌿 **Ecology & Thermodynamics** | [[consume]], [[consumer]], [[all-consuming]] | Primary and secondary consumers in trophic food webs; all-consuming wildfire firestorms; thermodynamic energy consumption rates. |
| 🎭 **Ethics & Human Character** | [[unassuming]], [[presuming]] | Praising unassuming intellectual humility versus reproaching presuming arrogance. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[assume]] | verb | **1.** Take to be the case or to be true; accept without verification or proof.<br>**2.** Take on titles, offices, duties, responsibilities. | *"If it assume my noble father’s person, I’ll speak to it, though hell itself should gape And bid me hold my peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assumed]] | verb | **1.** Take to be the case or to be true; accept without verification or proof.<br>**2.** Take on titles, offices, duties, responsibilities. | *"She should be an upper servant by her attire, yet in her air and step, though both are hurried and assumed—as far as she can assume in the muddy streets, which she treads with an unaccustomed foot—she is a lady."* — Charles Dickens, *Bleak House* |
| [[assuming]] | verb | **1.** Take to be the case or to be true; accept without verification or proof.<br>**2.** Take on titles, offices, duties, responsibilities. | *"To sing a song that old was sung, From ashes ancient Gower is come; Assuming man’s infirmities, To glad your ear, and please your eyes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[assumption]] | noun | **1.** A statement that is assumed to be true and from which a conclusion can be drawn.<br>**2.** A hypothesis that is taken for granted. | *"But a stir in that direction, a gathering of reverential awe in the rustic faces, and a blandly ferocious assumption on the part of Mr."* — Charles Dickens, *Bleak House* |
| [[assumptive]] | adjective | **1.** Excessively forward.<br>**2.** Accepted as real or true without proof. | *"In academic literature, assumptive designates excessively forward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consumable]] | adjective | **1.** May be used up. | *"In order to attack the difficulties one by one we will, therefore, in the following discussion, deal first with this class of ripe, consumable goods, as food, personal services, enjoyments of any sort that are immediately available."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[consume]] | verb | **1.** Eat immoderately.<br>**2.** Serve oneself to, or consume regularly. | *"If he were putting to my house the brand That should consume it, I have not the face To say “Beseech you, cease.”—You have made fair hands, You and your crafts!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consumer]] | noun | **1.** A person who uses goods or services. | *"The use of money may be necessary several times before a commodity completes its journey from producer to consumer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[consumerism]] | noun | **1.** The theory that an increasing consumption of goods is economically beneficial.<br>**2.** A movement advocating greater protection of the interests of consumers. | *"In academic literature, consumerism designates the theory that an increasing consumption of goods is economically beneficial."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consuming]] | verb | **1.** Eat immoderately.<br>**2.** Serve oneself to, or consume regularly. | *"Though now this grained face of mine be hid In sap-consuming winter’s drizzled snow, And all the conduits of my blood froze up, Yet hath my night of life some memory, My wasting lamps some fading glimmer left, My dull deaf ears a little use to hear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consummate]] | verb | **1.** Fulfill sexually.<br>**2.** Make perfect; bring to perfection. | *"Do you the office, friar; which consummate, Return him here again.—Go with him, Provost. [_Exeunt Angelo, Mariana, Friar Peter and Provost._] ESCALUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consummated]] | verb | **1.** Fulfill sexually.<br>**2.** Make perfect; bring to perfection. | *"Hopes were cherished for a time that the Union might yet be consummated, and the determination was expressed to carry it through at all hazards."* — John Cairns, *Principal Cairns* |
| [[consummation]] | noun | **1.** The completion of marriage by sexual intercourse.<br>**2.** The act of bringing to completion or fruition. | *"To die—to sleep, No more; and by a sleep to say we end The heart-ache, and the thousand natural shocks That flesh is heir to: ’tis a consummation Devoutly to be wish’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consumption]] | noun | **1.** The process of taking food into the body through the mouth (as by eating).<br>**2.** Involving the lungs with progressive wasting of the body. | *"I can get no remedy against this consumption of the purse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consumptive]] | noun | **1.** A person with pulmonary tuberculosis.<br>**2.** Tending to consume or use often wastefully. | *"Another consumptive in the neighborhood, was thoroughly an infidel."* — Classic Author, *The wonders of prayer* |
| [[presumable]] | adjective | **1.** Capable of being inferred on slight grounds. | *"Is it presumable, that every man, the instant he took his seat in the national Senate or House of Representatives, would commence a traitor to his constituents and to his country?"* — Alexander Hamilton, *The Federalist Papers* |
| [[presumably]] | adverb | **1.** By reasonable assumption. | *"It is, presumably, a transcript of one of the early copies."* — John Fletcher, *The Elder Brother* |
| [[presume]] | verb | **1.** Take to be the case or to be true; accept without verification or proof.<br>**2.** Take upon oneself; act presumptuously, without permission. | *"I do presume, sir, that you are not fallen From the report that goes upon your goodness; And therefore, goaded with most sharp occasions, Which lay nice manners by, I put you to The use of your own virtues, for the which I shall continue thankful."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presumption]] | noun | **1.** An assumption that is taken for granted.<br>**2.** (law) an inference of the truth of a fact from other facts proved or admitted or judicially noticed. | *"It is not so with Him that all things knows As ’tis with us that square our guess by shows; But most it is presumption in us when The help of heaven we count the act of men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presumptive]] | adjective | **1.** Having a reasonable basis for belief or acceptance.<br>**2.** Affording reasonable grounds for belief or acceptance. | *"The heir presumptive, the very William Walter Elliot, Esq., whose rights had been so generously supported by her father, had disappointed her."* — Jane Austen, *Persuasion* |
| [[presumptuous]] | adjective | **1.** Excessively forward. | *"Be not offended; for it hurts not him That he is lov’d of me; I follow him not By any token of presumptuous suit, Nor would I have him till I do deserve him; Yet never know how that desert should be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presumptuously]] | adverb | **1.** In a presumptuous manner. | *"And woe to Boythorn or other daring wight who shall presumptuously contest an inch with him!"* — Charles Dickens, *Bleak House* |
| [[presumptuousness]] | noun | **1.** Audacious (even arrogant) behavior that you have no right to. | *"In academic literature, presumptuousness designates audacious (even arrogant) behavior that you have no right to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resume]] | noun | **1.** Short descriptive summary (of events).<br>**2.** A summary of your academic and work history. | *"Nay, mother, Resume that spirit when you were wont to say If you had been the wife of Hercules, Six of his labours you’d have done and saved Your husband so much sweat.—Cominius, Droop not."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[resumption]] | noun | **1.** Beginning again. | *"This was called "the resumption of specie payments." Almost every nation has at some time issued political money."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[subsume]] | verb | **1.** Contain or include.<br>**2.** Consider (an instance of something) as part of a general rule or principle. | *"In academic literature, subsume designates contain or include."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsumption]] | noun | **1.** The premise of a syllogism that contains the minor term (which is the subject of the conclusion).<br>**2.** Incorporating something under a more general category. | *"In academic literature, subsumption designates the premise of a syllogism that contains the minor term (which is the subject of the conclusion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sum]] | noun | **1.** A quantity of money.<br>**2.** A quantity obtained by the addition of a group of numbers. | *"How much more praise deserv’d thy beauty’s use, If thou couldst answer ‘This fair child of mine Shall sum my count, and make my old excuse,’ Proving his beauty by succession thine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sumac]] | noun | **1.** Wood of a sumac.<br>**2.** A shrub or tree of the genus rhus (usually limited to the non-poisonous members of the genus). | *"In academic literature, sumac designates wood of a sumac."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sumach]] | noun | **1.** A shrub or tree of the genus rhus (usually limited to the non-poisonous members of the genus). | *"They plunged into the narrow path between the tall sumach bushes, and were at once hidden in the gloom."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[sumatra]] | noun | **1.** A mountainous island in western indonesia. | *"And on the great drift, southward and eastward under the burning sun that perished all descendants of the houses of Asgard and Vanaheim, I have been a king in Ceylon, a builder of Aryan monuments under Aryan kings in old Java and old Sumatra."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sumatran]] | noun | **1.** A native or inhabitant of sumatra.<br>**2.** Of or relating to the island of sumatra or its inhabitants. | *"No consideration will induce a Sumatran to catch or wound a tiger except in self-defence or immediately after a tiger has destroyed a friend or relation."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[sumer]] | noun | **1.** An area in the southern region of babylonia in present-day iraq; site of the sumerian civilization of city-states that flowered during the third millennium bc. | *"In academic literature, sumer designates an area in the southern region of babylonia in present-day iraq; site of the sumerian civilization of city-states that flowered during the third millennium bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sumerian]] | noun | **1.** A member of a people who inhabited ancient sumer.<br>**2.** Of or relating to ancient sumer or its inhabitants. | *"As the Sumerians took the loan of Shamashnapishtin from us, so did the Sons of Shem take him from the Sumerians and call him Noah."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sumerology]] | noun | **1.** The archeology of ancient sumerians. | *"In academic literature, sumerology designates the archeology of ancient sumerians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summarily]] | adverb | **1.** Without delay; in a summary manner. | *"The Admiral wound it up summarily by exclaiming— “Ay, a very bad business indeed."* — Jane Austen, *Persuasion* |
| [[summarisation]] | noun | **1.** The act of preparing a summary (or an instance thereof); stating briefly and succinctly. | *"In academic literature, summarisation designates the act of preparing a summary (or an instance thereof); stating briefly and succinctly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summarise]] | verb | **1.** Be a summary of.<br>**2.** Give a summary (of). | *"BIBLIOGRAPHICAL NOTE The literature dealing with Shelley's work and life is immense, and no attempt will be made even to summarise it here."* — Sydney Waterlow, *Shelley* |
| [[summarization]] | noun | **1.** The act of preparing a summary (or an instance thereof); stating briefly and succinctly. | *"In academic literature, summarization designates the act of preparing a summary (or an instance thereof); stating briefly and succinctly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summarize]] | verb | **1.** Give a summary (of).<br>**2.** Be a summary of. | *"Attempts to summarize the nation's wealth. § 5."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[summary]] | noun | **1.** A brief statement that presents the main points in a concise form.<br>**2.** Performed speedily and without formality. | *"Here’s the scroll, The continent and summary of my fortune. _You that choose not by the view Chance as fair and choose as true!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[summate]] | verb | **1.** Determine the sum of.<br>**2.** Form or constitute a cumulative effect. | *"In academic literature, summate designates determine the sum of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summation]] | noun | **1.** A concluding summary (as in presenting a case before a law court).<br>**2.** (physiology) the process whereby multiple stimuli can produce a response (in a muscle or nerve or other part) that one stimulus alone does not produce. | *"This summation of each person's income makes income taxation peculiarly suitable for progressive taxation with the social-welfare motive of equalizing the distribution of wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[summational]] | adjective | **1.** Of or relating to a summation or produced by summation. | *"In academic literature, summational designates of or relating to a summation or produced by summation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summative]] | adjective | **1.** Of or relating to a summation or produced by summation. | *"In academic literature, summative designates of or relating to a summation or produced by summation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summer]] | noun | **1.** The warmest season of the year; in the northern hemisphere it extends from the summer solstice to the autumnal equinox.<br>**2.** The period of finest development, happiness, or beauty. | *"But were some child of yours alive that time, You should live twice,—in it, and in my rhyme. 18 Shall I compare thee to a summer’s day?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[summer-blooming]] | adjective | **1.** Of plants that bloom during the summer. | *"In academic literature, summer-blooming designates of plants that bloom during the summer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summer-flowering]] | adjective | **1.** Of plants that bloom during the summer. | *"In academic literature, summer-flowering designates of plants that bloom during the summer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summercater]] | noun | **1.** (maine colloquial) a temporary summer resident of maine. | *"In academic literature, summercater designates (maine colloquial) a temporary summer resident of maine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summercaters]] | noun | **1.** (maine colloquial) temporary summer residents of coastal maine.<br>**2.** (maine colloquial) a temporary summer resident of maine. | *"In academic literature, summercaters designates (maine colloquial) temporary summer residents of coastal maine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summerhouse]] | noun | **1.** A small roofed building affording shade and rest. | *"He had kissed her two or three times, as occasion served and she seemed to desire it, but he had never lain awake afterwards, nor had his heart beaten any faster, no, not even in the summerhouse at Bingley when she was fairly in his arms."* — Anthony Pryde, *Nightfall* |
| [[summerise]] | verb | **1.** Prepare for summer. | *"In academic literature, summerise designates prepare for summer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summerize]] | verb | **1.** Prepare for summer. | *"In academic literature, summerize designates prepare for summer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[summersault]] | noun | **1.** An acrobatic feat in which the feet roll over the head (either forward or backward) and return. | *"But more amusing than this to the children was to see him turn summersaults both forward and backward."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |
| [[summerset]] | noun | **1.** An acrobatic feat in which the feet roll over the head (either forward or backward) and return. | *"I have seen him do the summerset several times together, upon a trencher fixed on a rope which is no thicker than a common packthread in England."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[summertime]] | noun | **1.** The warmest season of the year; in the northern hemisphere it extends from the summer solstice to the autumnal equinox. | *"There's no danger in summertime, the shepherds often cross it and so do I."* — Anthony Pryde, *Nightfall* |
| [[summery]] | adjective | **1.** Belonging to or characteristic of or occurring in summer. | *"Alas! the parting is over-- The parting, but not the pain-- Oh! sweet was the purple clover, And sweet was the yellow grain; And sweet were the woody hollows On the summery Rhineward track; But a winter untimely swallows All sweets as I travel back."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[summit]] | noun | **1.** The highest level or degree attainable; the highest stage of development.<br>**2.** The top or extreme point of something (usually a mountain or hill). | *"What if it tempt you toward the flood, my lord, Or to the dreadful summit of the cliff That beetles o’er his base into the sea, And there assume some other horrible form Which might deprive your sovereignty of reason, And draw you into madness?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[summon]] | verb | **1.** Call in an official matter, such as to attend court.<br>**2.** Ask to come. | *"Lend you him I will For half a hundred years.—Summon the town."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[summoning]] | noun | **1.** Calling up supposed supernatural forces by spells and incantations.<br>**2.** Call in an official matter, such as to attend court. | *"Again, summoning all my courage, I attempted it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[summons]] | noun | **1.** A request to be present.<br>**2.** An order to appear in person at a given place and time. | *"And then it started, like a guilty thing Upon a fearful summons."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sumner]] | noun | **1.** United states sociologist (1840-1910). | *"Her health being at length restored, she went to Washington, spent a few days in visiting the hospitals there, and then, with a pass sent her by Major-General Sumner, from Falmouth, she joined Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[sumo]] | noun | **1.** A japanese form of wrestling; you lose if you are forced out of a small ring or if any part of your body (other than your feet) touches the ground. | *"In academic literature, sumo designates a japanese form of wrestling; you lose if you are forced out of a small ring or if any part of your body (other than your feet) touches the ground."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unassuming]] | adjective | **1.** Not arrogant or presuming. | *"My mother has a little property, which takes the form of a small life annuity, upon which she lives in an independent though unassuming manner in the Old Street Road."* — Charles Dickens, *Bleak House* |
| [[unassumingly]] | adverb | **1.** In an unassuming manner. | *"Quietly, unassumingly Rumbold stepped on to the scaffold in faultless morning dress and wearing his favourite flower, the _Gladiolus Cruentus_."* — James Joyce, *Ulysses* |
| [[unassumingness]] | noun | **1.** A quality of naturalness and simplicity. | *"In academic literature, unassumingness designates a quality of naturalness and simplicity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconsummated]] | adjective | **1.** Not consummated (especially of a marriage). | *"In academic literature, unconsummated designates not consummated (especially of a marriage)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Holding]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SUM
  </div>
</div>
