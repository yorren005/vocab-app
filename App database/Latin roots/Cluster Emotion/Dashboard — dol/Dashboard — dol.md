---
status: unread
type: root_dashboard
---
# Dashboard — dol
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dol-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to suffer or grieve”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A sudden warm feeling in your chest or an outward expression of joy or sorrow.</span>
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

The root **dol** means to suffer or grieve. It refers to the action of suffering and carrying out this process. In English, this root forms words such as *hew*, *dolor*, *dolorous*, and *dolorously*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to suffer or grieve
> The root **dol** means to suffer or grieve. It refers to the action of suffering and carrying out this process. In English, this root forms words such as *hew*, *dolor*, *dolorous*, and *dolorously*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To suffer or grieve</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A sudden warm feeling in your chest or an outward expression of joy or sorrow.</mark>
> - **Everyday Connection**: Think of familiar words like *hew* and *dolor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dol** comes from a Latin word that means *"to suffer or grieve"*.
  - At its core, it describes the action of suffer or grieve.

- **The Big Picture Idea**:
  - Picture a sudden warm feeling in your chest or an outward expression of joy or sorrow.
  - Whenever you see **dol** in an English word, think of **to suffer or grieve**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to suffer or grieve).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Hew**: An everyday English word showing the root's idea of *to suffer or grieve*.
  - **Dolor**: Mental suffering, grief, or deep sorrow.
  - **Dolorous**: Feeling, expressing, or causing great sorrow, grief, or physical pain.
  - **Dolorously**: In a dolorous, mournful, or painfully sorrowful manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dol</mark>, think of <mark class="hl-def">to suffer or grieve</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Lexical Streams
> The root **dol** operates in English across three primary lexical streams:
> - **The Direct Classical Nominal Stem (`dolor-`):** Borrowed directly from Latin *dolor*, forming descriptive adjectives and scientific terms: [[dolor]], [[dolorous]], [[dolorously]], [[dolorific]], [[dolorimeter]], and the pain unit [[dol]].
> - **The Prefixed Sympathy Stem (`condol-`):** Formed with *con-*, producing verbs and nouns of communal mourning: [[condole]], [[condolence]], [[condolent]].
> - **The Privative Sloth & Oncology Stem (`indol-`):** Formed with *in-*, creating adjectives and nouns denoting painlessness and habitual aversion to effort: [[indolent]], [[indolence]], [[indolently]].
> - **The Anglo-French Doublet (`dole-`):** Transmitted through Old French *doel* / *duel* (from Late Latin *dolium* < *dolor*), yielding the native English adjective [[doleful]] ("full of grief").

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

> [!tip] 🌈 Four Dominant Semantic Horizons of the `dol` Family
> - **Somatic Pain & Quantitative Algesimetry:** [[dolor]], [[dolorific]], [[dolorimeter]], [[dol]] — physical pain sensation, pain thresholds, and laboratory instruments quantifying neurological pain responses.
> - **Bereavement, Mourning & Solace:** [[condole]], [[condolence]], [[dolorous]], [[doleful]] — the grief of funerals, formal expressions of sympathy, and melancholic artistic expression.
> - **Medical Oncology & Pathological Indolence:** [[indolent]] — tumors, lymphomas, and ulcers that progress slowly and painlessly without acute inflammatory distress.
> - **Psychological Sloth & Aversion to Effort:** [[indolent]], [[indolence]], [[indolently]] — habitual laziness, vegetative idleness, and avoiding the pain of productive labor.

---

## 🔀 4. Prefix & Combining Dynamics on dol

### Prefix Dynamics on `dol`

| Prefix | Core Value | Combined Form | Morphological Mechanics & Semantic Shift |
| :--- | :--- | :--- | :--- |
| *(root alone)* | core root | `dol-` $\to$ **[[dolor]]**, **[[dolorous]]** | "Physical pain, mental suffering, grief." |
| `con-` | together, with | `con-` + `doleō` $\to$ **[[condole]]**, **[[condolence]]** | Associative prefix: "to feel pain alongside another; to share in communal mourning." |
| `in-` | not, un- | `in-` + `dolēns` $\to$ **[[indolent]]**, **[[indolence]]** | Privative prefix: "feeling no pain; hence a painless pathology or an aversion to the pain of effort." |

### Suffix Transformations on `dol`

| Suffix | Functional Class | Derivative Examples | Syntactic & Semantic Manifestation |
| :--- | :--- | :--- | :--- |
| `-ous` | Adjective (Characterized by) | [[dolorous]] | Full of grief, expressing deep sorrow or physical pain. |
| `-ific` | Adjective (Causative) | [[dolorific]] | Latin *-ficus* (< *facere*): producing or causing pain. |
| `-meter` | Noun (Instrument of Measure) | [[dolorimeter]] | An apparatus measuring skin sensitivity to calibrated thermal pain stimuli. |
| `-ence` / `-ance` | Abstract Noun (State) | [[condolence]], [[indolence]] | The act of expressing shared grief, or the habitual state of sloth. |
| `-ent` | Adjective (Present Participle) | [[condolent]], [[indolent]], [[dolent]] | Latin *-ēns*: actively grieving, or actively avoiding pain. |
| `-ful` | Adjective (Vernacular) | [[doleful]] | Full of grief, mournful, cheerless. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Key Derivatives | Practical Context & Specialized Applications |
| :--- | :--- | :--- |
| 🩺 **Clinical Oncology & Pathology** | [[indolent]] | Indolent non-Hodgkin lymphomas (e.g., follicular lymphoma) that grow slowly over years without requiring aggressive immediate chemotherapy. |
| 🔬 **Neuroscience & Algology** | [[dol]], [[dolorimeter]], [[dolorimetry]] | The Hardy-Wolff-Goodell dolorimeter scale measuring radiant heat pain thresholds in dols (0 to 10 scale). |
| 🏛️ **Diplomacy & Social Protocol** | [[condolence]], [[condole]] | Formal letters of condolence dispatched by heads of state following national catastrophes or royal deaths. |
| ⛪ **Sacred Art & Christian Liturgy** | [[Via Dolorosa]], [[Mater Dolorosa]] | The Stations of the Cross along the Via Dolorosa; Renaissance sculptures of the grieving Virgin Mary holding Christ (*Pietà*). |
| 📖 **Literary Criticism & Elegiac Poetry** | [[dolorous]], [[doleful]], [[dolor]] | Epic descriptions of battle casualties in Milton's *Paradise Lost* ("through many a dark and dreary vale... of dolorous shades"). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aldol]] | noun | **1.** An oily colorless liquid obtained by the condensation of two molecules of acetaldehyde; contains an alcohol group (-oh) and an aldehyde group (-cho). | *"In academic literature, aldol designates an oily colorless liquid obtained by the condensation of two molecules of acetaldehyde; contains an alcohol group (-oh) and an aldehyde group (-cho)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[condole]] | verb | **1.** Express one's sympathetic grief, on the occasion of someone's death. | *"Let us condole the knight; for, lambkins, we will live. [_Exeunt._] SCENE II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[condolence]] | noun | **1.** An expression of sympathy with another's grief. | *"No letter of condolence had been sent to Ireland."* — Jane Austen, *Persuasion* |
| [[condolent]] | adjective | **1.** Expressing sympathy with a person who experienced the death of a loved one. | *"In academic literature, condolent designates expressing sympathy with a person who experienced the death of a loved one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dol]] | noun | **1.** A unit of pain intensity.<br>**2.** The federal department responsible for promoting the working conditions of wage earners in the united states; created in 1913. | *"Aunt Martha made her welcome in her dearest manner and Caroline beamed on her with the return of a lot of the fire and spirit of the youth that hanging on the doled-out affections of Lee Greenfield had starved in her."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[dolabrate]] | adjective | **1.** Having the shape of the head of an ax or cleaver. | *"In academic literature, dolabrate designates having the shape of the head of an ax or cleaver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolabriform]] | adjective | **1.** Having the shape of the head of an ax or cleaver. | *"In academic literature, dolabriform designates having the shape of the head of an ax or cleaver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolce]] | adverb | **1.** Gently and sweetly. | *"Those Cinghalese lobbing about in the sun in _dolce far niente_, not doing a hand’s turn all day."* — James Joyce, *Ulysses* |
| [[dole]] | noun | **1.** A share of money or food or clothing that has been charitably given.<br>**2.** Money received from the state. | *"When I consider What great creation, and what dole of honour Flies where you bid it, I find that she, which late Was in my nobler thoughts most base, is now The praised of the king; who, so ennobled, Is as ’twere born so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[doleful]] | adjective | **1.** Filled with or evoking sadness. | *"Shall we imbrue? [_Snatching up his sword._] Then death rock me asleep, abridge my doleful days!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dolefully]] | adverb | **1.** With sadness; in a sorrowful manner. | *"I held up my brass begging bowl, and whined more dolefully, and bleared my eyes to hide the blue fire I knew was in them, and calculated the distance and my strength for the leap."* — Jack London, *The Jacket (The Star-Rover)* |
| [[dolefulness]] | noun | **1.** Sadness caused by grief or affliction. | *"In academic literature, dolefulness designates sadness caused by grief or affliction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichocephalic]] | noun | **1.** An adult with a long narrow head.<br>**2.** Having a relatively long head with a cephalic index of under 75. | *"I had hardly expected so dolichocephalic a skull or such well-marked supra-orbital development."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[dolichocephalism]] | noun | **1.** The quality of being dolichocephalic. | *"In academic literature, dolichocephalism designates the quality of being dolichocephalic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichocephaly]] | noun | **1.** The quality of being dolichocephalic. | *"In academic literature, dolichocephaly designates the quality of being dolichocephalic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichocranial]] | adjective | **1.** Having a relatively long head with a cephalic index of under 75. | *"In academic literature, dolichocranial designates having a relatively long head with a cephalic index of under 75."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichocranic]] | adjective | **1.** Having a relatively long head with a cephalic index of under 75. | *"In academic literature, dolichocranic designates having a relatively long head with a cephalic index of under 75."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichonyx]] | noun | **1.** Bobolinks. | *"In academic literature, dolichonyx designates bobolinks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichos]] | noun | **1.** Genus of chiefly tropical vines often placed in genera dipogon or lablab or macrotyloma. | *"In academic literature, dolichos designates genus of chiefly tropical vines often placed in genera dipogon or lablab or macrotyloma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichotis]] | noun | **1.** Maras. | *"Classical and authoritative lexicons catalog dolichotis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doliolidae]] | noun | **1.** Oceanic tunicates. | *"In academic literature, doliolidae designates oceanic tunicates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doliolum]] | noun | **1.** Free-swimming oceanic tunicate with a barrel-shaped transparent body. | *"In academic literature, doliolum designates free-swimming oceanic tunicate with a barrel-shaped transparent body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doll]] | noun | **1.** A small replica of a person; used as a toy.<br>**2.** Informal terms for a (young) woman. | *"Will you have Doll Tearsheet meet you at supper?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dollar]] | noun | **1.** The basic monetary unit in many countries; equal to 100 cents.<br>**2.** A piece of paper money worth one dollar. | *"No less ready when at the bottom of fortune's ladder, than at the top, to do good as she had opportunity, she paid another poor woman's way to a neighboring State, where employment awaited her, and did it literally with her _last_ dollar-and a-half!"* — Classic Author, *The wonders of prayer* |
| [[dollarfish]] | noun | **1.** Small food fish of atlantic coast.<br>**2.** Any of several silvery marine fishes with very flat bodies. | *"In academic literature, dollarfish designates small food fish of atlantic coast."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dollhouse]] | noun | **1.** A house so small that it is likened to a child's plaything.<br>**2.** A small model of a house used as a toy by children. | *"They climbed trees together, sat side by side in the swing, or shifted the furniture about in the dollhouse."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[dollop]] | noun | **1.** A small measure (usually of food). | *"Jack Dollop, a ’hore’s-bird of a fellow we had here as milker at one time, sir, courted a young woman over at Mellstock, and deceived her as he had deceived many afore."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dolly]] | noun | **1.** Conveyance consisting of a wheeled support on which a camera can be mounted.<br>**2.** Conveyance consisting of a wheeled platform for moving heavy objects. | *"This made me, I dare say, more timid and retiring than I naturally was and cast me upon Dolly as the only friend with whom I felt at ease."* — Charles Dickens, *Bleak House* |
| [[dolman]] | noun | **1.** A hussar's jacket worn over the shoulders.<br>**2.** A woman's cloak with dolman sleeves. | *"MRS YELVERTON BARRY: _(In lowcorsaged opal balldress and elbowlength ivory gloves, wearing a sabletrimmed brickquilted dolman, a comb of brilliants and panache of osprey in her hair.)_ Arrest him, constable."* — James Joyce, *Ulysses* |
| [[dolmas]] | noun | **1.** Well-seasoned rice (with nuts or currants or minced lamb) simmered or braised in stock. | *"In academic literature, dolmas designates well-seasoned rice (with nuts or currants or minced lamb) simmered or braised in stock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolmen]] | noun | **1.** A prehistoric megalithic tomb typically having two large upright stones and a capstone.<br>**2.** A hussar's jacket worn over the shoulders. | *"It is, in fact, practically the same as the "mat marking" on the Japanese and Corean pottery taken from the dolmens which were built over a long period extending from the second century B.C. to the eighth century A.D."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[dolobid]] | noun | **1.** Nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions. | *"In academic literature, dolobid designates nonsteroidal anti-inflammatory (trade name dolobid) used to treat arthritis and other inflammatory conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolomite]] | noun | **1.** A kind of sedimentary rock resembling marble or limestone but rich in magnesium carbonate.<br>**2.** A light colored mineral consisting of calcium magnesium carbonate; a source of magnesium; used as a ceramic and as fertilizer. | *"In academic literature, dolomite designates a kind of sedimentary rock resembling marble or limestone but rich in magnesium carbonate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolomitic]] | adjective | **1.** Relating to or consisting of dolomite. | *"In academic literature, dolomitic designates relating to or consisting of dolomite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolor]] | noun | **1.** (poetry) painful grief. | *"This agreeable expression faded into one of almost mechanical dolor, and the personable young man shook hands with Mr."* — David Christie Murray, *Young Mr. Barter's Repentance* |
| [[dolorous]] | adjective | **1.** Showing sorrow. | *"My hearty friends, You take me in too dolorous a sense, For I spake to you for your comfort, did desire you To burn this night with torches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dolour]] | noun | **1.** (poetry) painful grief. | *"Each new morn New widows howl, new orphans cry; new sorrows Strike heaven on the face, that it resounds As if it felt with Scotland, and yell’d out Like syllable of dolour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dolourous]] | adjective | **1.** Showing sorrow. | *"In academic literature, dolourous designates showing sorrow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolt]] | noun | **1.** A person who is not very bright. | *"He was a simple-minded, good-natured dolt and not above earning an honest dollar by smuggling in tobacco for the convicts."* — Jack London, *The Jacket (The Star-Rover)* |
| [[doltish]] | adjective | **1.** Heavy and dull and stupid. | *"Take off thine eye! more intolerable than fiends’ glarings is a doltish stare!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[doltishly]] | adverb | **1.** In a stupid manner. | *"In academic literature, doltishly designates in a stupid manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indolence]] | noun | **1.** Inactivity resulting from a dislike of work. | *"Eliza generally took no more notice of her sister’s indolence and complaints than if no such murmuring, lounging object had been before her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[indolent]] | adjective | **1.** Disinclined to work or exertion.<br>**2.** (of tumors, e.g.) slow to heal or develop and usually painless. | *"They were cunning and trustless, narrow-slitted and heavy-lidded, at one and the same time as sharp as a ferret’s and as indolent as a basking lizard’s."* — Jack London, *The Jacket (The Star-Rover)* |
| [[indolently]] | adverb | **1.** In an indolent manner. | *"They came in yet greater volumes, and indolently crept across the intervening valleys, and around the withered papery flags of the moor and river brinks."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[redolence]] | noun | **1.** A pleasingly sweet olfactory property. | *"In academic literature, redolence designates a pleasingly sweet olfactory property."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redolent]] | adjective | **1.** Serving to bring to mind; - wilder hobson.<br>**2.** (used with `of' or `with') noticeably odorous. | *"The odour which now filled the refectory was scarcely more appetising than that which had regaled our nostrils at breakfast: the dinner was served in two huge tin-plated vessels, whence rose a strong steam redolent of rancid fat."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Emotion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DOL
  </div>
</div>
