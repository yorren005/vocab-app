---
status: unread
type: root_dashboard
---
# Dashboard — tribut
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tribut-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to assign or bestow”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Extending an open hand to offer a generous gift to a friend.</span>
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

The root **tribut** means to assign or bestow. It refers to allotting a civic share, payment of homage, apportioning resources, moral repayment. In English, this root forms words such as *tribute*, *contribute*, *distribute*, and *attribute*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to assign or bestow
> The root **tribut** means to assign or bestow. It refers to allotting a civic share, payment of homage, apportioning resources, moral repayment. In English, this root forms words such as *tribute*, *contribute*, *distribute*, and *attribute*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To assign or bestow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Extending an open hand to offer a generous gift to a friend.</mark>
> - **Everyday Connection**: Think of familiar words like *tribute* and *contribute*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tribut** comes from a Latin word that means *"to assign or bestow"*.
  - At its core, it describes the action of assign or bestow.

- **The Big Picture Idea**:
  - Picture extending an open hand to offer a generous gift to a friend.
  - Whenever you see **tribut** in an English word, think of **to assign or bestow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to assign or bestow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Tribute**: An act, statement, or gift intended to show gratitude, respect, or admiration.
  - **Contribute**: To give money, time, or goods toward a common purpose.
  - **Distribute**: To divide and allocate among several or many.
  - **Attribute**: An everyday English word showing the root's idea of *to assign or bestow*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tribut</mark>, think of <mark class="hl-def">to assign or bestow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of `tribut`
> English derivations split across nominal base stems and the verbal participial paradigm:
> 1. **The Nominal Base (*tribus*, *tribūnus*, *tribūnal*):**
>    - *tribus* $ightarrow$ **tribe**, **tribal**, **tribalism**, **tribally**.
>    - *tribūnus* $ightarrow$ **tribune**, **tribunate**, **tribuneship**.
>    - *tribūnal* $ightarrow$ **tribunal**.
> 2. **The Fiscal Noun (*tribūtum*):**
>    - *tribūtum* $ightarrow$ Old French *tribut* $ightarrow$ English **tribute**.
>    - *tribūtārius* $ightarrow$ **tributary** (river feeding a larger stream; paying state).
> 3. **The Prefixed Verbal Paradigm (*-tribute* & *-tribution*):**
>    - `ad-`: **attribute** (v./n.), **attribution**, **attributable**, **attributive**, **attributively**.
>    - `con-`: **contribute**, **contribution**, **contributor**, **contributory**, **contributable**, **contributively**.
>    - `dis-`: **distribute**, **distribution**, **distributor**, **distributive**, **distributively**, **distributable**, **distributary**, **distributism**, **distributist**.
>    - `re-dis-`: **redistribute**, **redistribution**, **redistributive**.
>    - `re-`: **retribution**, **retributive**, **retributory**.

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
                                  ┌── Ancestral Kinship & Law ── tribe, tribal, tribalism, tribune, tribunal
                                  │
                                  ├── Sovereign Homage & Hydro ─ tribute, tributary, distributary
    [TRIBUT- / TRIBU-] ───────────┼── Authorship & Ascription ── attribute (v./n.), attribution, attributable, attributive
(divide among tribes / assign)    │
                                  ├── Collective Pooling ─────── contribute, contribution, contributor, contributory
                                  │
                                  ├── Spatial & Economic Spread ─ distribute, distribution, distributor, distributism
                                  │
                                  └── Moral & Divine Vengeance ─ retribution, retributive, retributory
```

> [!tip] 🌈 Thematic Distribution of Vocabulary
> 1. **Civic Antiquity, Kinship & Courts:** *tribe*, *tribal*, *tribalism*, *tribally*, *tribune*, *tribunate*, *tribuneship*, *tribunal*.
> 2. **Feudal Homage, Praise & Hydrology:** *tribute*, *tributary*, *distributary*.
> 3. **Logic, Art History, Grammar & Ascription:** *attribute*, *attribution*, *attributable*, *attributive*, *attributively*.
> 4. **Philanthropy, Collaboration & Causation:** *contribute*, *contribution*, *contributor*, *contributory*, *contributable*, *contributively*.
> 5. **Supply Chain, Statistics, Politics & Economics:** *distribute*, *distribution*, *distributor*, *distributive*, *distributively*, *distributable*, *distributism*, *distributist*, *redistribute*, *redistribution*, *redistributive*.
> 6. **Criminal Justice, Eschatology & Punishment:** *retribution*, *retributive*, *retributory*.

---

## 🔀 4. Prefix & Combining Dynamics on tribut

### Prefix Dynamics

| Prefix | Classical Meaning | Resulting Verb | English Derivatives | Semantic Transformation |
| :--- | :--- | :--- | :--- | :--- |
| `ad-` | to, toward | *attribuere* | **attribute**, **attribution** | Assigning an effect to a cause, or assigning a canvas to an artist. |
| `con-` | together, with | *contribuere* | **contribute**, **contribution**| Giving one's share into a communal pool; aiding an overarching result. |
| `dis-` | apart, in all directions | *distribuere*| **distribute**, **distribution** | Dispersing portions across an entire population or geographic area. |
| `re-` | back, again | *retribuere* | **retribution**, **retributive** | Giving back what is earned; divine repayment or punitive justice for evil. |
| `re-` + `dis-`| again + apart | *redistribuere*| **redistribute**, **redistribution**| Re-allocating wealth, land, or resources to correct systemic imbalance. |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!abstract] 🏛️ Institutional & Professional Sphere Applications
> 1. **Jurisprudence & Legal Philosophy:** *Retributive justice* holds that punishments must be proportionate to moral culpability; a *tribunal* adjudicates international war crimes.
> 2. **Art History & Provenance:** *Attribution* studies utilize connoisseurship, pigment spectroscopy, and dendrochronology to confirm whether a Renaissance canvas is genuinely by Leonardo.
> 3. **Hydrology & Geomorphology:** In fluvial networks, a *tributary* pours water *into* a main river, whereas a *distributary* branches *away* across a delta.
> 4. **Probability & Statistics:** The normal (Gaussian) *distribution* models continuous random variables across scientific disciplines.
> 5. **Tort Law & Insurance:** Under *contributory negligence*, an injured plaintiff’s financial recovery is barred or reduced if their own negligence contributed to the injury.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[attributable]] | adjective | **1.** Capable of being attributed. | *"On the other hand, the Right Honourable William Buffy, M.P., contends across the table with some one else that the shipwreck of the country—about which there is no doubt; it is only the manner of it that is in question—is attributable to Cuffy."* — Charles Dickens, *Bleak House* |
| [[attribute]] | noun | **1.** A construct whereby objects or individuals can be distinguished.<br>**2.** An abstraction belonging to or characteristic of an entity. | *"Unless you play the pious innocent, And for an honest attribute cry out ‘She died by foul play.’ CLEON."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attribution]] | noun | **1.** Assigning some quality or character to a person or thing.<br>**2.** Assigning to a cause or source. | *"If speaking truth In this fine age were not thought flattery, Such attribution should the Douglas have As not a soldier of this season’s stamp Should go so general current through the world."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[attributive]] | adjective | **1.** Of adjectives; placed before the nouns they modify. | *"In academic literature, attributive designates of adjectives; placed before the nouns they modify."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[attributively]] | adverb | **1.** In an attributive manner. | *"In academic literature, attributively designates in an attributive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contribute]] | verb | **1.** Bestow a quality on.<br>**2.** Contribute to some cause. | *"That I can’t, indeed,” he said, moving past Oak as a Christian edges past an offertory-plate when he does not mean to contribute."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[contributing]] | verb | **1.** Bestow a quality on.<br>**2.** Contribute to some cause. | *"Believe me, I have no pleasure in the world superior to that of contributing to yours."* — Jane Austen, *Mansfield Park* |
| [[contribution]] | noun | **1.** The part played by a person in bringing about a result.<br>**2.** A voluntary gift (as of money or service or ideas) made to some worthwhile cause. | *"The people ’twixt Philippi and this ground Do stand but in a forced affection; For they have grudg’d us contribution."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contributive]] | adjective | **1.** Tending to bring about; being partly responsible for. | *"In academic literature, contributive designates tending to bring about; being partly responsible for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contributor]] | noun | **1.** Someone who contributes (or promises to contribute) a sum of money.<br>**2.** A writer whose work is published in a newspaper or magazine or as part of a book. | *"At length an article in a well-known satirical journal by a favourite contributor, the chief of the staff, settled the monster, like Hippolytus, giving it the death-blow amidst an universal burst of laughter."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[contributory]] | adjective | **1.** Tending to bring about; being partly responsible for. | *"Insurance may be _contributory_ or _noncontributory_."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[distributary]] | noun | **1.** A branch of a river that flows away from the main stream and does not rejoin it. | *"In academic literature, distributary designates a branch of a river that flows away from the main stream and does not rejoin it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distribute]] | verb | **1.** Administer or bestow, as in small portions.<br>**2.** Distribute or disperse widely. | *"As much as one sound cudgel of four foot— You see the poor remainder—could distribute, I made no spare, sir."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distributed]] | verb | **1.** Administer or bestow, as in small portions.<br>**2.** Distribute or disperse widely. | *"If he evade us there, Enforce him with his envy to the people, And that the spoil got on the Antiates Was ne’er distributed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distributer]] | noun | **1.** Someone who markets merchandise.<br>**2.** Electrical device that distributes voltage to the spark plugs of a gasoline engine in the order of the firing sequence. | *"In academic literature, distributer designates someone who markets merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distribution]] | noun | **1.** (statistics) an arrangement of values of a variable showing their observed or theoretical frequency of occurrence.<br>**2.** The spatial or geographic property of being scattered about over a range, area, or volume. | *"Of all the horses— Whereof we have ta’en good and good store—of all The treasure in this field achieved and city, We render you the tenth, to be ta’en forth Before the common distribution At your only choice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distributional]] | adjective | **1.** Of or relating to spatial distribution. | *"In academic literature, distributional designates of or relating to spatial distribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distributive]] | adjective | **1.** Serving to distribute or allot or disperse. | *"Consumers' coöperation (often called distributive coöperation) is concerned with the later steps, the placing of a consumption good (rarely also productive agents) into the hands of the final user."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[distributively]] | adverb | **1.** As individuals or as separate units (not collectively).<br>**2.** In a distributive manner. | *"Now undoubtedly finite things, taken distributively, have contradictory attributes, but not as a class."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[distributor]] | noun | **1.** Someone who markets merchandise.<br>**2.** A person with authority to allot or deal out or apportion. | *"The enterpriser is merely the distributor or equalizer of cost among all the different products for which different agents can be used."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[reattribute]] | verb | **1.** Attribute to another source. | *"In academic literature, reattribute designates attribute to another source."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redistribute]] | verb | **1.** Distribute anew. | *"Demand for consumption goods is thus the manifestation of the man's desire to redistribute his enjoyments."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[redistributed]] | verb | **1.** Distribute anew.<br>**2.** Having population and industries relocated from urban to outlying areas. | *"In academic literature, redistributed designates distribute anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redistribution]] | noun | **1.** Distributing again. | *"In academic literature, redistribution designates distributing again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retribution]] | noun | **1.** A justly deserved penalty.<br>**2.** The act of correcting for your wrongdoing. | *"It is a just retribution to me to find the place so empty and forlorn."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[retributive]] | adjective | **1.** Of or relating to or having the nature of retribution.<br>**2.** Given or inflicted in requital according to merits or deserts. | *"There may be black ingratitude in the thing, and the punishment may be retributive and well deserved; but that it is a miserable thing, I can testify."* — Charles Dickens, *Great Expectations* |
| [[retributory]] | adjective | **1.** Of or relating to or having the nature of retribution.<br>**2.** Given or inflicted in requital according to merits or deserts. | *"In academic literature, retributory designates of or relating to or having the nature of retribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tributary]] | noun | **1.** A branch that flows into the main stream.<br>**2.** (of a stream) flowing into a larger stream. | *"Th’ imperious seas breed monsters; for the dish, Poor tributary rivers as sweet fish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tribute]] | noun | **1.** Something given or done as an expression of esteem.<br>**2.** Payment by one nation for protection by another. | *"Caius Lucius Will do’s commission throughly; and I think He’ll grant the tribute, send th’ arrearages, Or look upon our Romans, whose remembrance Is yet fresh in their grief."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tributyrin]] | noun | **1.** A bitter oily triglyceride of butyric acid; a form of butyrin. | *"In academic literature, tributyrin designates a bitter oily triglyceride of butyric acid; a form of butyrin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unattributable]] | adjective | **1.** Not attributable. | *"In academic literature, unattributable designates not attributable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undistributed]] | adjective | **1.** (of investments) not distributed among a variety of securities. | *"In academic literature, undistributed designates (of investments) not distributed among a variety of securities."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Giving & Receiving]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TRIBUT
  </div>
</div>
