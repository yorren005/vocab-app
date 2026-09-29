---
status: unread
type: root_dashboard
---
# Dashboard — langu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">langu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be faint, sluggish, or weary”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **langu** means to be faint, sluggish, or weary. It refers to the action of bing and carrying out this process. In English, this root forms words such as *languid*, *languidly*, *languidness*, and *languish*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be faint, sluggish, or weary
> The root **langu** means to be faint, sluggish, or weary. It refers to the action of bing and carrying out this process. In English, this root forms words such as *languid*, *languidly*, *languidness*, and *languish*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be faint, sluggish, or weary</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *languid* and *languidly*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **langu** comes from a Latin word that means *"to be faint, sluggish, or weary"*.
  - At its core, it describes the action of be faint, sluggish, or weary.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **langu** in an English word, think of **to be faint, sluggish, or weary**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be faint, sluggish, or weary).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Languid**: Displaying or characterized by a disinclination for physical exertion, effort, or quick motion.
  - **Languidly**: In a languid, listless, or unhurried manner.
  - **Languidness**: The state, condition, or quality of being languid.
  - **Languish**: To lose vitality, strength, or vigor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">langu</mark>, think of <mark class="hl-def">to be faint, sluggish, or weary</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **langu** generates English vocabulary through four primary morphological channels:
>
> - **1. Classical Adjectival Base `languid-` (from Latin *languidus* < *langueō* + *-idus*):**
>   - In Latin, the suffix *-idus* formed adjectives denoting a continuing physical or psychological state or condition (e.g., *fluere* $\to$ *fluidus*; *torpēre* $\to$ *torpidus*; *calēre* $\to$ *calidus*). *Languidus* literally meant "in a continuing state of faintness or slackness."
>   - Direct English adjectival borrowing: Latin *languidus* $\to$ English [[languid]] ("drooping, weak, sluggish, slow").
>   - Modal adverbial formation: *languid* + native suffix *-ly* $\to$ English [[languidly]] ("in a slow, listless, unhurried manner").
>   - Abstract noun of quality: *languid* + native suffix *-ness* $\to$ English [[languidness]] ("the state of being languid, listlessness").
>
> - **2. Old French Inchoative Verbal Stem `languiss-` (from Vulgar Latin *\*languīre* < Latin *languēscere*):**
>   - Latin verbs with inchoative or iterative suffixes in *-ēscere* passed into French with an extended present participle and subjunctive stem in *-iss-* (e.g., *finīre* $\to$ *finiss-*; *florēre* $\to$ *floriss-* $\to$ English *flourish*; *perīre* $\to$ *periss-* $\to$ English *perish*). Anglo-French *languiss-* was adopted into Middle English as the characteristic verbal suffix *-ish*.
>   - Primary base verb: Anglo-French *languiss-* $\to$ Middle English *languisshen* $\to$ Modern English [[languish]] ("to grow weak, droop, pine, endure prolonged neglect").
>   - Agent noun derivation: *languish* + agent suffix *-er* $\to$ English [[languisher]] ("one who pines, droops, or suffers in prolonged neglect").
>   - Participial adjective & substantive: *languish* + *-ing* $\to$ English [[languishing]] ("drooping, wasting, looking with tender yearning").
>   - Expressive manner adverb: *languishing* + *-ly* $\to$ English [[languishingly]] ("with tender longing, wistfully, feebly").
>   - Abstract noun of suffering or romantic pining: Old French *languissement* $\to$ English [[languishment]] ("the state of languishing, tender melancholy, prolonged distress").
>
> - **3. Classical Abstract Nominal Base `languōr-` (from Latin *languor, languōris*):**
>   - In Latin, the suffix *-or* formed third-declension masculine abstract nouns expressing physical or emotional conditions (e.g., *amor*, *timor*, *horror*, *torpor*, *pallor*, *rigor*). *Languor* named the condition of being *languidus*.
>   - Direct English nominal borrowing: Latin *languor* $\to$ Middle English *langour* $\to$ Modern English [[languor]] ("tiredness, sluggish stillness, sweet indolence").
>   - Adjectival extension: Latin *languōr-* + *-ōsus* ("full of") $\to$ Anglo-French *languerus* $\to$ English [[languorous]] ("full of languor, dreamily relaxed, inducing lethargy").
>   - Modal adverbial formation: *languorous* + *-ly* $\to$ English [[languorously]] ("in a dreamy, leisurely, luxurious, unhurried manner").
>   - Abstract substantive of quality: *languorous* + *-ness* $\to$ English [[languorousness]] ("the quality of dreamy, sweet indolence or atmospheric stillness").
>
> - **4. Italian Participial & Prefixed Compounding Channels:**
>   - Musical Italian present participle doublet: Latin *languēns, languentis* $\to$ Italian *languente* $\to$ English musical directive [[languente]] ("in a drooping, fainting, plaintive style").
>   - Iterative prefixed compound: Latin/English prefix *re-* ("again, anew") + *languish* $\to$ English [[relanguish]] ("to sink back into weakness, neglect, or stagnation").
>
> The morphological matrix of **langu** is remarkably unified: unlike action roots (*ag-*, *fac-*, *curr-*) that accept dozens of directional spatial prefixes, *langu* denotes an indivisible, intrinsic state of depleted energy. Its vocabulary expands primarily through rich **suffixal stratification**—producing fine-grained distinctions between somatic fatigue, romantic melancholy, legal detention, and musical performance.

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
> Although the root core is **"slack, faint, drooping, decelerating"**, its manifestation shifts dramatically across distinct human operational planes:
>
> - **Physical, Somatic & Clinical Plane (Bodily Fatigue & Malaise):** In [[languid]], [[languidly]], [[languidness]], and [[languor]], the root captures physical debility, convalescence, or heat-induced fatigue. The pulse is soft and compressible, the eyes are heavy-lidded, and muscular exertion is felt as an impossible burden.
> - **Aesthetic, Sensual & Decadent Plane (Sweet Torpor & Poetic Melancholy):** In [[languorous]], [[languorously]], [[languorousness]], and [[languor]], the negative connotation of exhaustion is inverted into a luxurious, voluptuous pleasure. It evokes Mediterranean verandas, heavy floral fragrances, velvet cushions, the drone of summer cicadas, and the refined stillness of fin-de-siècle art where haste is deemed unrefined.
> - **Jurisprudential, Penological & Political Plane (Prolonged Confinement & Neglect):** In [[languish]], [[languisher]], [[languishment]], and [[relanguish]], the root moves into social and institutional reality. It designates the slow, cruel passage of time for individuals trapped in dungeons, asylum wards, or legal limbo without trial, as well as legislative bills forgotten in parliamentary committees.
> - **Expressive, Musical & Vocal Plane (Plaintive Sighs & Drooping Melody):** In [[languente]], [[languishing]], and [[languishingly]], the root enters the vocal and instrumental arts. It describes music that gradually slows down, softens its attack, and sighs with wistful melancholy, mimicking the physical droop of a dying breath.
> - **Botanical & Ecological Plane (Wilting & Plasmolysis):** In [[languish]] and [[relanguish]], the root preserves Virgil's cut-flower simile, describing crops suffering from severe drought, house plants dying in poor soil, or ecosystems parched beneath an unyielding sun.

---

## 🔀 4. Prefix & Combining Dynamics on langu

### Prefix Shifts (Directional & Semantic Modification)

Because *languēre* named an intrinsic, stative condition of exhaustion rather than a spatial physical displacement (such as running, carrying, or throwing), classical Latin formed almost no directional compounds with *con-*, *ex-*, *in-*, or *trans-*. Its primary prefixed development occurs via the iterative prefix *re-*:

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `re-` | again, anew; backward | [[relanguish]] | Iterative return: to sink *again* into faintness, weakness, debility, or administrative stagnation after a temporary revival. |
| *(unprefixed base)* | — (simplex root) | [[languid]], [[languish]], [[languor]], [[languente]] | Pure, unmediated expression of slackness, drooping posture, drained vitality, and kinetic deceleration. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function & Semantic Result |
| :--- | :--- | :--- | :--- |
| `-id` (Latin *-idus*) | State/Condition Adjective | [[languid]] | Designates a persistent physical or mental state of faintness, slackness, or sluggish inertia. |
| `-ly` (Proto-Germanic *\*-līk-*) | Manner Adverb | [[languidly]], [[languishingly]], [[languorously]] | Modifies verbs to express action performed in a slow, listless, wistful, or dreamily indolent manner. |
| `-ness` (Proto-Germanic *\*-assu-*) | Inherent Quality Noun | [[languidness]], [[languorousness]] | Forms native abstract nouns denoting the enduring quality of physical sluggishness or sweet, dreamy stillness. |
| `-ish` (Anglo-French *-iss-* < Latin *-ēscere*) | Inchoative / Dynamic Verb | [[languish]] | Converts the stative condition into a progressive process: to become faint, droop, pine away, or endure prolonged neglect. |
| `-er` (agent suffix) | Personal Agent Noun | [[languisher]] | Names the human subject who endures prolonged imprisonment, pining sorrow, or physical decline. |
| `-ing` (participial suffix) | Verbal Adjective & Gerund | [[languishing]] | Describes ongoing decline, tender wistfulness, or the active process of wasting in confinement. |
| `-ment` (Latin *-mentum*) | Action / State Noun | [[languishment]] | Substantivizes the process of languishing into an enduring state of sorrow, decline, or captivity. |
| `-or` (Latin *-or*) | Classical Abstract Noun | [[languor]] | Designates the primal condition or feeling of lassitude, heavy relaxation, or sweet inertia. |
| `-ous` (Latin *-ōsus*) | Adjective (Full of) | [[languorous]] | Characterizes an entity, atmosphere, or melody as permeated by or inducing heavy, pleasant languor. |
| `-ente` (Italian < Latin *-ēns*) | Musical Directive Participle | [[languente]] | Serves as an expressive performance directive denoting a drooping, fainting, or plaintively fading delivery. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Clinical Medicine, Geriatrics & Pathology** | [[languor]], [[languid]], [[languish]] | Diagnostic characterization of asthenic states, myalgic encephalomyelitis / chronic fatigue syndrome (ME/CFS), post-viral malaise, end-stage oncological cachexia, and geriatric frailty. In historical medicine, *languor* denoted profound somatic prostration preceding vasovagal syncope or hemodynamic shock. A *languid pulse* describes a soft, compressible, low-volume arterial wave indicating hypovolemia or cardiogenic depression. |
| 📖 **Romantic & Decadent Literature & Aesthetics** | [[languor]], [[languorous]], [[languorously]], [[languorousness]] | The central motif of 19th-century European aestheticism (Charles Baudelaire's *Les Fleurs du mal*, John Keats's *Ode on Melancholy*, Walter Pater's *Studies in the History of the Renaissance*, and Algernon Charles Swinburne). *Languor* was celebrated as an elite sensibility—the sweet melancholy of unhurried perception, sensual indolence, and refined fatigue in explicit opposition to the utilitarian frenzy and smog-choked machinery of industrial capitalism. |
| 🎵 **Musicology & Expressive Performance** | [[languente]], [[languishingly]], [[languishing]] | Explicit expressive tempo and character directives (*languente*, *languendo*) appearing in Italian Renaissance madrigals (Carlo Gesualdo, Claudio Monteverdi) and 19th-century Romantic piano and vocal repertoire (Frédéric Chopin, Franz Liszt, Pyotr Ilyich Tchaikovsky). Instructs the performer to loosen rhythmic propulsion, soften dynamic attack, and impart a drooping, dying, or sorrowfully sighing affect (*mancando*, *morendo*). |
| ⚖️ **Jurisprudence, Penology & Human Rights** | [[languish]], [[languishing]], [[languishment]], [[languisher]] | Technical rhetoric in international human rights advocacy, *habeas corpus* litigation, and prison reform (Amnesty International, the UN Standard Minimum Rules for the Treatment of Prisoners / Nelson Mandela Rules). Describes individuals subjected to indefinite detention without formal indictment, prolonged solitary confinement, or political prisoners forgotten in penal colonies under authoritarian regimes. |
| 🌿 **Botany & Horticultural Pathology** | [[languish]], [[languid]], [[relanguish]] | Agronomic and botanical diagnosis of severe environmental stress: loss of cellular turgor pressure (*plasmolysis*), foliage flagging under acute drought, etiolation from insufficient solar radiation, iron chlorosis, or fungal vascular wilts (*Fusarium*, *Verticillium*), wherein crops or garden plantings droop, yellow, and cease vegetative growth. |
| 🏛️ **Political Science & Legislative Process** | [[languish]], [[relanguish]], [[languishment]] | Parliamentary and congressional analysis denoting statutory gridlock: high-priority reform bills that remain stranded indefinitely in committee dockets without hearings, stalled multilateral disarmament treaties, or international climate agreements that fail to secure ratification and fade into institutional irrelevance. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[interlanguage]] | noun | **1.** A common language used by speakers of different languages. | *"In academic literature, interlanguage designates a common language used by speakers of different languages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[language]] | noun | **1.** A systematic means of communicating by the use of sounds or conventional symbols.<br>**2.** (language) communication by word of mouth. | *"Those girls of Italy, take heed of them; They say our French lack language to deny If they demand; beware of being captives Before you serve."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[languedoc-roussillon]] | noun | **1.** A region in south central france; named after the medieval dialect of french that was spoken there. | *"In academic literature, languedoc-roussillon designates a region in south central france; named after the medieval dialect of french that was spoken there."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[languid]] | adjective | **1.** Lacking spirit or liveliness. | *"For whom everything must be languid and pretty."* — Charles Dickens, *Bleak House* |
| [[languidly]] | adverb | **1.** In a languid and lethargic manner. | *"And, what is very strange, I found him—” “Not to be any out-of-the-way person, I am afraid!” Lady Dedlock languidly anticipates."* — Charles Dickens, *Bleak House* |
| [[languish]] | verb | **1.** Lose vigor, health, or flesh, as through grief.<br>**2.** Have a desire for something or someone who is not present. | *"What, of death too, That rids our dogs of languish?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[languisher]] | noun | **1.** A person who languishes. | *"In academic literature, languisher designates a person who languishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[languor]] | noun | **1.** A relaxed comfortable feeling.<br>**2.** A feeling of lack of interest or energy. | *"Shall I ever forget the manner in which those handsome proud eyes seemed to spring out of their languor and to hold mine!"* — Charles Dickens, *Bleak House* |
| [[languorous]] | adjective | **1.** Lacking spirit or liveliness. | *"The atmosphere beneath is languorous, and is so tinged with azure that what artists call the middle distance partakes also of that hue, while the horizon beyond is of the deepest ultramarine."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[languorously]] | adverb | **1.** In a languorous manner. | *"In academic literature, languorously designates in a languorous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[langur]] | noun | **1.** Slender long-tailed monkey of asia. | *"The sacrifice of a goat takes place, and a month later, that of a _langur_ (_Entellus_ monkey) or a bamboo-rat is considered necessary."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LANGU
  </div>
</div>
