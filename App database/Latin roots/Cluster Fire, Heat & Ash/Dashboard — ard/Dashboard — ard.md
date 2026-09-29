---
status: unread
type: root_dashboard
---
# Dashboard — ard
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ard-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to burn”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Bright warm flames crackling inside a hearth and radiating glowing heat.</span>
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

The root **ard** means to burn. It refers to burn, blaze, glow, consume with fire or passion. In English, this root forms words such as *ardent*, *ardor*, *arson*, and *arsonist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to burn
> The root **ard** means to burn. It refers to burn, blaze, glow, consume with fire or passion. In English, this root forms words such as *ardent*, *ardor*, *arson*, and *arsonist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To burn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *ardent* and *ardor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ard** comes from a Latin word that means *"to burn"*.
  - At its core, it describes the action of burn.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **ard** in an English word, think of **to burn**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to burn).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ardent**: Very enthusiastic, passionate, or fervent.
  - **Ardor**: Great warmth or intensity of feeling.
  - **Arson**: The criminal act of deliberately and maliciously setting fire to property.
  - **Arsonist**: A person who intentionally and maliciously commits the crime of arson.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ard</mark>, think of <mark class="hl-def">to burn</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **ard** builds English vocabulary through two principal stems:
>
> 1. **The Present / Participial Stem `ard-` / `ardent-`** (from *ardēre* & *ardēns*):
>    - Attaches participial suffix *-ent* to form the primary adjective: *ardent*.
>    - Attaches adverbial suffix *-ly* to form: *ardently*.
>    - Attaches abstract nominal suffix *-ency* to form: *ardency*.
>    - Attaches nominal suffix of state *-or* / *-our* to form: *ardor* (US) / *ardour* (UK).
> 2. **The Participial / Supine Stem `ars-`** (from *arsum*, *ārsus*):
>    - Forms the legal nominal abstract via Norman French: *arson* (< Late Latin *ārsiōnem*).
>    - Attaches agent suffix *-ist* to form: *arsonist*.
>    - Attaches adjectival suffix *-ous* to form: *arsonous*.
>    - Forms the historical legal assaying term: *arsura* (testing coins by fire).

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

> [!tip] 🌈 The Three Conceptual Provinces of `ard`
>
> ```
>                           ┌── 1. Fervent Passion & Zeal (ardent, ardently, ardency)
>   [ard: burn / blaze] ────┼── 2. Radiant Emotional Energy (ardor, ardour)
>                           └── 3. Destructive Fire & Criminality (arson, arsonist, arsonous, arsura)
> ```
>
> 1. **Fervent Passion, Zeal & Advocacy:**
>    - The psychological fire that animates devotion to an idea, cause, or person: *ardent* (enthusiastic, zealous), *ardently* (passionately), *ardency* (warmth of temperament).
> 2. **Radiant Emotional Energy & Heat:**
>    - The sustained inner glow of intense feeling: *ardor* / *ardour* (warmth of feeling, eagerness, poetic burning heat).
> 3. **Destructive Combustion & Legal Felonies:**
>    - The deliberate, malicious application of flame to human property: *arson* (criminal fire-setting), *arsonist* (perpetrator of arson), *arsonous* (pertaining to or constituting arson), *arsura* (medieval trial of coinage purity by fire).

---

## 🔀 4. Prefix & Combining Dynamics on ard

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ent` | Active present participle | *ardēre* + *-ēns* | [[ardent]] | In the state of burning; figuratively glowing with fiery zeal. |
| `-ly` | Manner adverb | *ardent* + *-ly* | [[ardently]] | In a passionate, fervent, or zealous manner. |
| `-ency` | Abstract state or quality | *ardēns* + *-ia* | [[ardency]] | The quality or state of burning warmth, zeal, or eager passion. |
| `-or` / `-our` | Abstract noun of physical/emotional state | *ardēre* + *-or* | [[ardor]], [[ardour]] | Fierce heat; warmth of emotion, enthusiasm, and devotion. |
| `-on` (Norman) | Noun of action (< *-iōnem*) | *ārsiō* | [[arson]] | The criminal act of willfully setting fire to property. |
| `-ist` | Agent / perpetrator | *arson* + *-ist* | [[arsonist]] | One who maliciously commits the crime of arson. |
| `-ous` | Characterized by | *arson* + *-ous* | [[arsonous]] | Pertaining to, involving, or guilty of the crime of arson. |
| `-ura` | Condition or legal process | *ārsus* + *-ūra* | [[arsura]] | *(Hist. Law)* The assaying or testing of gold and silver coins by fire. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| ⚖️ **Criminal Law & Forensic Science** | [[arson]], [[arsonist]], [[arsonous]] | **Arson** is classified as an aggravated felony under common law and modern statutory codes. Forensic arson investigators examine burn patterns, pour marks, and accelerant residues (e.g., via gas chromatography) to prove incendiary origin. |
| 🏛️ **Political Rhetoric & Philosophy** | [[ardent]], [[ardor]], [[ardency]] | Used to describe fervent political advocacy, revolutionary zeal, and dedicated civic action (e.g., an ardent abolitionist, revolutionary ardor). |
| 🍷 **Distillation & Chemistry (Historical)** | [[ardent]] | In historical distillation and apothecary texts, **ardent spirits** referred to concentrated ethyl alcohol (whisky, brandy, rectified spirits) because of its inflammable nature and burning sensation on the palate. |
| 💰 **Numismatics & Medieval Law** | [[arsura]] | In medieval English exchequer records (such as the Domesday Book and Pipe Rolls), payments were evaluated *ad arsuram* ("at the burning") to test the purity of silver pennies by melting sample batches. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acardia]] | noun | **1.** Congenital absence of the heart (as in the development of some monsters). | *"In academic literature, acardia designates congenital absence of the heart (as in the development of some monsters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arda]] | noun | **1.** An agency of the intelligence community that conducts advanced research and development related to information technology. | *"In academic literature, arda designates an agency of the intelligence community that conducts advanced research and development related to information technology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ardea]] | noun | **1.** Type genus of the ardeidae: large new and old world herons. | *"Her letter now is sealed, and on it writ “At Ardea to my lord with more than haste.” The post attends, and she delivers it, Charging the sour-faced groom to hie as fast As lagging fowls before the northern blast."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ardeb]] | noun | **1.** A unit of dry measure used in egypt. | *"In academic literature, ardeb designates a unit of dry measure used in egypt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ardeidae]] | noun | **1.** Herons; egrets; night herons; bitterns. | *"In academic literature, ardeidae designates herons; egrets; night herons; bitterns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ardennes]] | noun | **1.** A wooded plateau in the champagne-ardenne region of france; the site of intense fighting in world war i and world war ii. | *"I was in the Ardennes during the war, and I saw some of its perils--but these were nothing to what we encountered now."* — Mrs. Oliphant, *A Beleaguered City* |
| [[ardent]] | adjective | **1.** Characterized by intense emotion.<br>**2.** Characterized by strong enthusiasm. | *"Takes virtuous copies to be wicked, like those that under hot ardent zeal would set whole realms on fire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ardently]] | adverb | **1.** In an ardent manner. | *"But, alas, Being a natural sister of our sex, Your sorrow beats so ardently upon me That it shall make a counter-reflect ’gainst My brother’s heart and warm it to some pity, Though it were made of stone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ardisia]] | noun | **1.** Tropical evergreen subshrubs (some climbers) to trees of asia and australasia to americas. | *"In academic literature, ardisia designates tropical evergreen subshrubs (some climbers) to trees of asia and australasia to americas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ardor]] | noun | **1.** A feeling of strong eagerness (usually in favor of a person or cause).<br>**2.** Intense feeling of love. | *"Yes, and listen what happened afterwards," Mea continued with more ardor than before."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[ardour]] | noun | **1.** A feeling of strong eagerness (usually in favor of a person or cause).<br>**2.** Intense feeling of love. | *"Proclaim no shame When the compulsive ardour gives the charge, Since frost itself as actively doth burn, And reason panders will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ards]] | noun | **1.** Acute lung injury characterized by coughing and rales; inflammation of the lungs which become stiff and fibrous and cannot exchange oxygen; occurs among persons exposed to irritants such as corrosive chemical vapors or ammonia or chlorine etc. | *"He voted for it and put on his topboots to ride to Dublin from the Ards of Down to do so."* — James Joyce, *Ulysses* |
| [[arduous]] | adjective | **1.** Characterized by effort to the point of exhaustion; especially physical effort.<br>**2.** Taxing to the utmost; testing powers of endurance; ; ; - f.d.roosevelt. | *"Their legs are so hard as to encourage the idea that they must have devoted the greater part of their long and arduous lives to pedestrian exercises and the walking of matches."* — Charles Dickens, *Bleak House* |
| [[arduously]] | adverb | **1.** In an arduous manner. | *"They were singing discordantly, arduously, and with great effort, evidently not because they wished to sing, but because they wanted to show they were drunk and on a spree."* — graf Leo Tolstoy, *War and Peace* |
| [[arduousness]] | noun | **1.** Extreme effortfulness. | *"In academic literature, arduousness designates extreme effortfulness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eardrop]] | noun | **1.** An earring with a pendant ornament. | *"THE FAN: _(Folding together, rests against her left eardrop.)_ Have you forgotten me?"* — James Joyce, *Ulysses* |
| [[eardrum]] | noun | **1.** The membrane in the ear that vibrates to sound. | *"In academic literature, eardrum designates the membrane in the ear that vibrates to sound."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Fire, Heat & Ash]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARD
  </div>
</div>
