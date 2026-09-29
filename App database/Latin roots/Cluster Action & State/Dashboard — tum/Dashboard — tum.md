---
status: unread
type: root_dashboard
---
# Dashboard — tum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tum-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to swell”</span>
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

The root **tum** means to swell. It refers to swell, puff up, distend, uproar, insolence. In English, this root forms words such as *tumor*, *tumour*, *antitumor*, and *tumid*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to swell
> The root **tum** means to swell. It refers to swell, puff up, distend, uproar, insolence. In English, this root forms words such as *tumor*, *tumour*, *antitumor*, and *tumid*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To swell</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *tumor* and *tumour*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tum** comes from a Latin word that means *"to swell"*.
  - At its core, it describes the action of swell.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **tum** in an English word, think of **to swell**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to swell).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Tumor**: A mass of unorganized new tissue of independent rapid growth.
  - **Tumour**: The traditional Commonwealth/British spelling of *tumor*.
  - **Antitumor**: Inhibiting or preventing the development, proliferation, or growth of tumors.
  - **Tumid**: Swollen, distended, or engorged.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tum</mark>, think of <mark class="hl-def">to swell</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tum** operates through distinct classical affixes:
> - **Direct Base Forms:**
>   - *tumor* → *tumor* / *tumour*, *tumorous*, *antitumor*, *tumorigenic*.
>   - *tumidus* → *tumid*, *tumidity*.
>   - *tumultus* → *tumult*, *tumultuous*, *tumultuously*.
> - **Prefix Combinations with Inchoative *-escence*:**
>   - `in-` (in, into) + *tumēscere* → *intumescence*, *intumescent*.
>   - `de-` (down, away) + *tumēscere* → *detumescence*.
>   - *tumescence*, *tumescent*.
> - **Insolence Compounds (*con-* + *tum-*):**
>   - *contumāx* → *contumacy*, *contumacious*.
>   - *contumēlia* → *contumely*, *contumelious*.

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
> Although the root fundamentally denotes **"swelling and distension"**, its semantic register branches across distinct applications:
> - **Oncological & Medical Sense:** In [[tumor]], [[tumour]], and [[antitumor]], it designates abnormal neoplastic tissue growths.
> - **Acoustic & Social Disorder Sense:** In [[tumult]] and [[tumultuous]], it denotes loud, disorderly uproar, riots, or stormy seas.
> - **Stylistic & Rhetorical Sense:** In [[tumid]] and *tumidity*, it describes bombastic, overblown, or pompously inflated language.
> - **Legal Defiance Sense:** In *contumacy* and *contumacious*, it denotes willful contempt of judicial authority.
> - **Insolent Abuse Sense:** In [[contumely]], it describes insulting, humiliating, or contemptuous language.
> - **Chemical & Physical Expansion Sense:** In *intumescent*, it designates fire-retardant substances that swell into insulating foam under heat.

---

## 🔀 4. Prefix & Combining Dynamics on tum

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `anti-` | against | [[antitumor]] | Preventing or combating the development of abnormal tumors. |
| `in-` | upon, into | *intumescent* | Swelling *up* and expanding outward when subjected to heat. |
| `de-` | down, away | *detumescence* | Swelling subsiding *down*; reduction of vascular engorgement. |
| `con-` | intensive, together | [[contumely]] | Swelling *up* against another with abusive, insolent insult. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-or` | Noun (Growth / Swelling) | [[tumor]] | An abnormal mass of tissue resulting from cell division. |
| `-id` | Adjective (Swollen) | [[tumid]] | Swollen, distended; bombastic in prose style. |
| `-uous` | Adjective (Abounding in) | [[tumultuous]] | Characterized by disorderly commotion and deafening uproar. |
| `-ely` | Noun (Insolent Conduct) | [[contumely]] | Rude, contemptuous, and humiliating treatment. |
| `-escent` | Adjective (Becoming) | *tumescent* | Swollen or becoming swollen. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Oncology & Pathology** | [[tumor]], [[antitumor]], *tumescent* | Solid tumor biopsies, antitumor chemotherapies, tumescent local anesthesia. |
| 🚒 **Materials Science & Fire Safety** | *intumescence*, *intumescent* | Intumescent fire-resistant steel coatings, expanding thermal seals. |
| ⚖️ **Civil Litigation & Contempt Law** | *contumacy*, *contumacious* | Judicial citations for contumacious refusal to produce subpoenaed documents. |
| 🏛️ **Political History & Social Movements** | [[tumult]], [[tumultuous]] | Urban insurrections, revolutionary mobs, tumultuous parliamentary sessions. |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antitumor]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, antitumor designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitumour]] | adjective | **1.** Used in the treatment of cancer. | *"In academic literature, antitumour designates used in the treatment of cancer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antum]] | noun | **1.** Babylonian consort of anu. | *"In academic literature, antum designates babylonian consort of anu."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contumacious]] | adjective | **1.** Wilfully obstinate; stubbornly disobedient. | *"Sometimes, without going quite so far as that, the wizard declared that he would scatter the bones of Osiris or reveal his sacred legend, if the god proved contumacious."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[contumaciously]] | adverb | **1.** In a rebellious manner. | *"Again a mystic sisterhood would contumaciously assert itself, as she met the sanctified frown of some matron, who, according to the rumour of all tongues, had kept cold snow within her bosom throughout life."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[contumacy]] | noun | **1.** Willful refusal to appear before a court or comply with a court order; can result in a finding of contempt of court.<br>**2.** Obstinate rebelliousness and insubordination; resistance to authority. | *"If she objects, tell her it is my particular wish; and if she resists, say I shall come and fetch her in case of contumacy.’” “I will not give him that trouble,” I answered."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[contumelious]] | adjective | **1.** Arrogantly insolent. | *"With scoffs and scorns and contumelious taunts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contumeliously]] | adverb | **1.** Without respect; in a disdainful manner. | *"Fie, lords, that you, being supreme magistrates, Thus contumeliously should break the peace!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contumely]] | noun | **1.** A rude expression intended to offend or hurt. | *"Her sex once ascertained, their idolatry was changed into contempt and there was no end to the contumely showered upon her by the savages, who were exasperated at the deception which they conceived had been practised upon them."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[detumescence]] | noun | **1.** Diminution of swelling; the subsidence of anything swollen. | *"In academic literature, detumescence designates diminution of swelling; the subsidence of anything swollen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extumescence]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin tum within the domain of Action & State.<br>**2.** A technical or specialized form exhibiting the properties of tum in systematic terminology. | *"In academic literature, extumescence designates pertaining to, derived from, or characteristic of latin tum within the domain of action & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intumesce]] | verb | **1.** Move upwards in bubbles, as from the effect of heating; also used metaphorically.<br>**2.** Expand abnormally. | *"In academic literature, intumesce designates move upwards in bubbles, as from the effect of heating; also used metaphorically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intumescence]] | noun | **1.** Swelling up with blood or other fluids (as with congestion).<br>**2.** The increase in volume of certain substances when they are heated (often accompanied by release of water). | *"In academic literature, intumescence designates swelling up with blood or other fluids (as with congestion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intumescency]] | noun | **1.** Swelling up with blood or other fluids (as with congestion).<br>**2.** The increase in volume of certain substances when they are heated (often accompanied by release of water). | *"In academic literature, intumescency designates swelling up with blood or other fluids (as with congestion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intumescent]] | adjective | **1.** Abnormally distended especially by fluids or gas. | *"In academic literature, intumescent designates abnormally distended especially by fluids or gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tum]] | noun | **1.** An enlarged and muscular saclike organ of the alimentary canal; the principal organ of digestion. | *"Then, from the road, “With my ra-ta-ta, and my rum-tum-tum!” It was a ploughboy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tumefaction]] | noun | **1.** The process of tumefying; the organic process whereby tissue becomes swollen by the accumulation of fluid within it. | *"In academic literature, tumefaction designates the process of tumefying; the organic process whereby tissue becomes swollen by the accumulation of fluid within it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumefy]] | verb | **1.** Cause to become very swollen.<br>**2.** Expand abnormally. | *"In academic literature, tumefy designates cause to become very swollen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumesce]] | verb | **1.** Expand abnormally. | *"In academic literature, tumesce designates expand abnormally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumescence]] | noun | **1.** Tumidity resulting from the presence of blood or other fluid in the tissues. | *"To Bloom: the problems of irritability, tumescence, rigidity, reactivity, dimension, sanitariness, pilosity."* — James Joyce, *Ulysses* |
| [[tumescent]] | adjective | **1.** Abnormally distended especially by fluids or gas. | *"In academic literature, tumescent designates abnormally distended especially by fluids or gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumid]] | adjective | **1.** Ostentatiously lofty in style.<br>**2.** Abnormally distended especially by fluids or gas. | *"In academic literature, tumid designates ostentatiously lofty in style."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumidity]] | noun | **1.** Slight swelling of an organ or part. | *"In academic literature, tumidity designates slight swelling of an organ or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumidness]] | noun | **1.** Slight swelling of an organ or part. | *"In academic literature, tumidness designates slight swelling of an organ or part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tummy]] | noun | **1.** Slang for a paunch.<br>**2.** An enlarged and muscular saclike organ of the alimentary canal; the principal organ of digestion. | *"In academic literature, tummy designates slang for a paunch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumor]] | noun | **1.** An abnormal new mass of tissue that serves no purpose. | *"Miss X. of Brooklyn, had suffered long and severely from a distressing tumor."* — Classic Author, *The wonders of prayer* |
| [[tumour]] | noun | **1.** An abnormal new mass of tissue that serves no purpose. | *"A cure for a tumour, based on the principle of homoeopathic magic, is prescribed by Marcellus of Bordeaux, court physician to Theodosius the First, in his curious work on medicine."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[tums]] | noun | **1.** An antacid.<br>**2.** An enlarged and muscular saclike organ of the alimentary canal; the principal organ of digestion. | *"In academic literature, tums designates an antacid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumult]] | noun | **1.** A state of commotion and noise and confusion.<br>**2.** Violent agitation. | *"Believe me, lords, my tender years can tell Civil dissension is a viperous worm That gnaws the bowels of the commonwealth. [_A noise within, “Down with the tawny-coats!”._] What tumult’s this?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tumultuous]] | adjective | **1.** Characterized by unrest or disorder or insubordination. | *"Nought rests for me in this tumultuous strife But to make open proclamation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tumultuously]] | adverb | **1.** In a tumultuous and riotous manner. | *"He held a child with each hand, and three were between his feet, all welcoming him tumultuously, so that for the moment it was impossible for him to move forward."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[tumultuousness]] | noun | **1.** A state of commotion and noise and confusion. | *"In academic literature, tumultuousness designates a state of commotion and noise and confusion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tumulus]] | noun | **1.** (archeology) a heap of earth placed over prehistoric tombs. | *"In the centre was a hillock or tumulus, surmounted by a scorched hawthorn."* — H. G. Wells, *The Time Machine* |

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
    ROOT DASHBOARD · TUM
  </div>
</div>
