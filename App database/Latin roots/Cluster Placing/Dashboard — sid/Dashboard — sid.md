---
status: unread
type: root_dashboard
---
# Dashboard — sid
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sid-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to sit or settle”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Setting an object gently down in its exact designated location.</span>
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

The root **sid** means to sit or settle. It refers to resting on a seat, settling down, or holding a meeting. In English, this root forms words such as *resident*, *president*, *subside*, and *reside*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to sit or settle
> The root **sid** means to sit or settle. It refers to resting on a seat, settling down, or holding a meeting. In English, this root forms words such as *resident*, *president*, *subside*, and *reside*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To sit or settle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *resident* and *president*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sid** comes from a Latin word that means *"to sit or settle"*.
  - At its core, it describes the action of sit or settle.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **sid** in an English word, think of **to sit or settle**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to sit or settle).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Resident**: A person who lives somewhere permanently or on a long-term basis.
  - **President**: The elected head of a republican state.
  - **Subside**: To become less intense, violent, or severe.
  - **Reside**: To have one's permanent home in a particular place.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sid</mark>, think of <mark class="hl-def">to sit or settle</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sid** generates vocabulary through diverse prefixation on the compounded stem *-sidēre*:
> - **Prefix *prae-* ("before, in front"):**
>   - *prae-* + *sedēre* $	o$ *praesidēre* $	o$ *preside*, *president*, *presidency*, *presidential*.
> - **Prefix *re-* ("back, remain"):**
>   - *re-* + *sedēre* $	o$ *resīdēre* $	o$ *reside*, *resident*, *residence*, *residential*, *residency*.
>   - *re-* + *sedeō* $	o$ *residuus* $	o$ *residue*, *residual*.
> - **Prefix *sub-* ("under, behind"):**
>   - *sub-* + *sīdō* ("to sink, settle") $	o$ *subside*, *subsidence* ("to sink down to the bottom; abate").
>   - *sub-* + *sedeō* $	o$ *subsidium* $	o$ *subsidy*, *subsidiary*, *subsidize*.
> - **Prefix *dis-* ("apart"):**
>   - *dis-* + *sedēre* $	o$ *dissidēre* $	o$ *dissident*, *dissidence* ("sitting apart; disagreeing").
> - **Prefix *in-* ("in, against"):**
>   - *in-* + *sedēre* $	o$ *insidiae* ("ambush") $	o$ *insidious*, *insidiously*, *insidiousness*.
> - **Prefix *ad-* ("at, near"):**
>   - *ad-* + *sedēre* $	o$ *assiduus* ("sitting constantly at work") $	o$ *assiduous*, *assiduously*, *assiduity*.

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
> - **Democratic Governance & Corporate Leadership:** *president*, *presidential*, *preside* (executive heads of state, presiding judges).
> - **Housing, Demographics & Habitats:** *reside*, *resident*, *residence*, *residential* (permanent domiciles, residential zoning).
> - **Political Defiance & Human Rights:** *dissident*, *dissidence* (regime critics, conscientious objectors).
> - **Geology, Hydrology & Disease:** *subside*, *subsidence* (soil subsidence, floodwaters receding, pain subsiding).
> - **Economics, Corporate Structure & Finance:** *subsidy*, *subsidize*, *subsidiary* (government agricultural subsidies, corporate subsidiary entities).
> - **Pathology, Treachery & Oncology:** *insidious* (slow, stealthy progression of asymptomatic malignancies).

---

## 🔀 4. Prefix & Combining Dynamics on sid

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `prae-` (in front) | `sedēre` | **[[preside]]** / **president** | Sitting in the seat of honor in front of an assembly to lead and govern. |
| `re-` (back, stay) | `sedēre` | **[[reside]]** / **resident** | Sitting back permanently in a dwelling place; that which remains behind (*residue*). |
| `dis-` (apart) | `sedēre` | **[[dissident]]** / **dissidence** | Sitting apart from the majority $	o$ holding opposing political or religious views. |
| `sub-` (under, below) | `sīdō` / `sedeō` | **[[subside]]** / **subsidy** | Sinking down to normal levels; troops sitting in reserve to give financial aid. |
| `in-` (in, against) | `sedēre` | **[[insidious]]** | Sitting in wait along the path $	o$ stealthily treacherous, subtle, and harmful. |
| `ad-` (to, near) | `sedēre` | **assiduous** | Sitting constantly at one's work desk $	o$ showing persistent, tireless diligence. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Constitutional Politics & Law** | *president*, *preside*, *presidency* | The constitutional powers of the President under Article II; presiding judges. |
| 🌍 **Geotechnical Engineering & Geology** | *subside*, *subsidence* | Ground subsidence caused by excessive subterranean aquifer groundwater pumping. |
| 🩺 **Clinical Oncology & Pathology** | *insidious* | The insidious onset of early-stage pancreatic cancer lacking overt symptoms. |
| 💰 **Public Finance & Corporate Law** | *subsidy*, *subsidize*, *subsidiary* | Government subsidies supporting renewable green energy; holding company subsidiaries. |
| 🏠 **Urban Planning & Demographics** | *residential*, *residence*, *resident* | Designing low-density residential zoning districts served by municipal transit. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[apsidal]] | adjective | **1.** Of or relating to an apse. | *"In academic literature, apsidal designates of or relating to an apse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[assiduity]] | noun | **1.** Great and constant diligence and attention. | *"Now, mine continually rove away; when I should be listening to Miss Scatcherd, and collecting all she says with assiduity, often I lose the very sound of her voice; I fall into a sort of dream."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[assiduous]] | adjective | **1.** Marked by care and persistent effort. | *"He gave her all the money he had, prayed with them, and sent at once a kind, assiduous physician."* — Classic Author, *The wonders of prayer* |
| [[assiduously]] | adverb | **1.** With care and persistence. | *"While Sir Walter and Elizabeth were assiduously pushing their good fortune in Laura Place, Anne was renewing an acquaintance of a very different description."* — Jane Austen, *Persuasion* |
| [[assiduousness]] | noun | **1.** Great and constant diligence and attention. | *"In academic literature, assiduousness designates great and constant diligence and attention."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consider]] | verb | **1.** Deem to be.<br>**2.** Give careful consideration to. | *"When I consider What great creation, and what dole of honour Flies where you bid it, I find that she, which late Was in my nobler thoughts most base, is now The praised of the king; who, so ennobled, Is as ’twere born so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[considerable]] | adjective | **1.** Large or relatively large in number or amount or extent or degree. | *"Come sit down with us and tell us what happened as soon as you feel more quiet; but no more such words, please." It took a considerable time before Bruno could tell his experience without breaking out again."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[considerably]] | adverb | **1.** To a great extent or degree. | *"Jellyby required a good deal of attention, the lattice-work up her back having widened considerably since I first knew her and her hair looking like the mane of a dustman’s horse."* — Charles Dickens, *Bleak House* |
| [[considerate]] | adjective | **1.** Showing concern for the rights and feelings of others. | *"KING RICHARD. [_Aside_.] I will converse with iron-witted fools And unrespective boys; none are for me That look into me with considerate eyes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[considerately]] | adverb | **1.** In a considerate manner. | *"Nothing of the kind.” “Then she had better go.” “Excuse me, my Lady,” Sir Leicester considerately interposes, “but perhaps this may be doing an injury to the young woman which she has not merited."* — Charles Dickens, *Bleak House* |
| [[considerateness]] | noun | **1.** Kind and considerate regard for others. | *"From the Maiden’s Blush, through all varieties of the Provence down to the Crimson Tuscany, the countenance of Oak’s acquaintance quickly graduated; whereupon he, in considerateness, turned away his head."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[consideration]] | noun | **1.** The process of giving careful thought to something.<br>**2.** Information that should be kept in mind when making a decision. | *"Let’s to supper, come, And drown consideration. [_Exeunt._] SCENE III."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[considered]] | verb | **1.** Deem to be.<br>**2.** Give careful consideration to. | *"Most meet That first we come to words, and therefore have we Our written purposes before us sent, Which if thou hast considered, let us know If ’twill tie up thy discontented sword And carry back to Sicily much tall youth That else must perish here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[desideratum]] | noun | **1.** Something desired as a necessity. | *"Let me add that it is the great desideratum by which this form of government can be rescued from the opprobrium under which it has so long labored, and be recommended to the esteem and adoption of mankind."* — Alexander Hamilton, *The Federalist Papers* |
| [[dissidence]] | noun | **1.** Disagreement; especially disagreement with the government. | *"In academic literature, dissidence designates disagreement; especially disagreement with the government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissident]] | noun | **1.** A person who dissents from some established policy.<br>**2.** Characterized by departure from accepted beliefs or standards. | *"His ostensible mission to meet with the President of Planet Pluto is, in actuality, a guise under which he intends to meet with dissident elements among our people."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[esidrix]] | noun | **1.** A diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension. | *"In academic literature, esidrix designates a diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconsiderable]] | adjective | **1.** Too small or unimportant to merit attention. | *"When I go into our little church on a Sunday, a considerable part of the inconsiderable congregation expect to see me drop, scorched and withered, on the pavement under the Dedlock displeasure."* — Charles Dickens, *Bleak House* |
| [[inconsiderate]] | adjective | **1.** Lacking regard for the rights or feelings of others.<br>**2.** Without proper consideration or reflection. | *"Doth the inconsiderate take _salve_ for _l’envoi_, and the word _l’envoi_ for a _salve?_ MOTH."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconsiderately]] | adverb | **1.** Without consideration; in an inconsiderate manner. | *"Poor Janet has been sadly taken in, and yet there was nothing improper on her side: she did not run into the match inconsiderately; there was no want of foresight."* — Jane Austen, *Mansfield Park* |
| [[inconsiderateness]] | noun | **1.** The quality of failing to be considerate of others. | *"John, saw impropriety in my inconsiderateness."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[inconsideration]] | noun | **1.** The quality of failing to be considerate of others. | *"In academic literature, inconsideration designates the quality of failing to be considerate of others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inside]] | noun | **1.** The region that is inside of something.<br>**2.** The inner or enclosed surface of something. | *"An I have not forgotten what the inside of a church is made of, I am a peppercorn, a brewer’s horse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inside-out]] | adjective | **1.** With the inside surface on the outside. | *"In academic literature, inside-out designates with the inside surface on the outside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insider]] | noun | **1.** An officer of a corporation or others who have access to private information about the corporation's operations. | *"A triangular opening faced towards the bows of the ship, so that the insider commanded a complete view forward."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[insidious]] | adjective | **1.** Beguiling but harmful.<br>**2.** Intended to entrap. | *"Having been honoured, like other strangers, with a place on the platform, I did not myself detect Lucifer at work among the multitude below; I merely suspected his insidious presence. [323] W.H.D."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[insidiously]] | adverb | **1.** In a harmfully insidious manner. | *"The thought of going home broke out afresh, insidiously avoiding the barriers of bemusement which he had tried to erect, and he turned abruptly away from the window, moving decisively so as to be able to move at all."* — Algis Budrys, *Citadel* |
| [[insidiousness]] | noun | **1.** Subtle and cumulative harmfulness (especially of a disease).<br>**2.** The quality of being designed to entrap. | *"Of course you have--that's the insidiousness of the devil's stuff."* — Grace S. Richmond, *Red Pepper Burns* |
| [[nonresident]] | noun | **1.** Someone who does not live in a particular place.<br>**2.** Not living in a particular place or owned by permanent residents. | *"In academic literature, nonresident designates someone who does not live in a particular place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonresidential]] | adjective | **1.** Not residential. | *"In academic literature, nonresidential designates not residential."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obsidian]] | noun | **1.** Acid or granitic glass formed by the rapid cooling of lava without crystallization; usually dark, but transparent in thin pieces. | *"In academic literature, obsidian designates acid or granitic glass formed by the rapid cooling of lava without crystallization; usually dark, but transparent in thin pieces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overside]] | adverb | **1.** Over the side of a boat. | *"Who will go?" They peered overside, and the uneasy movement that ran among them came from more than the roll and pitch of the deck underfoot."* — Poul Anderson, *The Valor of Cappen Varra* |
| [[preside]] | verb | **1.** Act as president. | *"Strangers filling their place!” No, except when she thought of her mother, and remembered where she had been used to sit and preside, she had no sigh of that description to heave."* — Jane Austen, *Persuasion* |
| [[presidency]] | noun | **1.** The tenure of a president.<br>**2.** The office and function of president. | *"You can’t offer him the Presidency of the Council; that is reserved for Poodle."* — Charles Dickens, *Bleak House* |
| [[president]] | noun | **1.** An executive officer of a firm or corporation.<br>**2.** The person who holds the office of head of state of the united states government. | *"A charge we bear i’ th’ war, And, as the president of my kingdom, will Appear there for a man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[presidential]] | adjective | **1.** Relating to a president or presidency.<br>**2.** Befitting a president. | *"In the year of a presidential election, however, Congress took no action in the matter."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[presidentially]] | adverb | **1.** In a presidential manner. | *"In academic literature, presidentially designates in a presidential manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presidentship]] | noun | **1.** The office and function of president. | *"In academic literature, presidentship designates the office and function of president."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presidio]] | noun | **1.** A fortress established in the southwestern united states by the spanish in order to protect their missions and other holdings. | *"In academic literature, presidio designates a fortress established in the southwestern united states by the spanish in order to protect their missions and other holdings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[presidium]] | noun | **1.** A permanent executive committee in socialist countries that has all the powers of some larger legislative body and that acts for it when it is not in session. | *"In academic literature, presidium designates a permanent executive committee in socialist countries that has all the powers of some larger legislative body and that acts for it when it is not in session."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reconsider]] | verb | **1.** Consider again; give new consideration to; usually with a view to changing.<br>**2.** Consider again (a bill) that had been voted upon before, with a view to altering it. | *"He shared pain, he sympathized with suffering; and his understanding of pain, and, above all, his choice of pain, taught men to reconsider it and to understand it, and altered the attitude of the world toward it."* — T. R. Glover, *The Jesus of History* |
| [[reconsideration]] | noun | **1.** A consideration of a topic (as in a meeting) with a view to changing an earlier decision.<br>**2.** Thinking again about a choice previously made. | *"A petition was addressed to the Home Secretary, advancing the circumstances which appeared to justify a request for a reconsideration of the sentence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[resid]] | noun | **1.** Oil products that remain after petroleum has been distilled. | *"The longer Clare resided here the less objection had he to his company, and the more did he like to share quarters with them in common."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reside]] | verb | **1.** Make one's home in a particular place or community.<br>**2.** Live (in a certain place). | *"I would not there reside, To put my father in impatient thoughts, By being in his eye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[residence]] | noun | **1.** Any address at which you dwell more than temporarily.<br>**2.** The official house or establishment of an important person (as a sovereign or president). | *"You have made shift to run into ’t, boots and spurs and all, like him that leapt into the custard; and out of it you’ll run again, rather than suffer question for your residence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[residency]] | noun | **1.** The act of dwelling in a place.<br>**2.** The position of physician who is receiving special training in a hospital (usually after completing an internship). | *"Morocco had been a French protectorate since 1912, and thousands of French citizens and other Europeans had migrated to French and Spanish Morocco over the years and taken up residency."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[resident]] | noun | **1.** Someone who lives at a particular place for a prolonged period or who was born there.<br>**2.** A physician (especially an intern) who lives in a hospital and cares for hospitalized patients under the supervision of the medical staff of the hospital. | *"Is this the Lord Talbot, uncle Gloucester, That hath so long been resident in France?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[residential]] | adjective | **1.** Used or designed for residence or limited to residences.<br>**2.** Of or relating to or connected with residence. | *"A very small part of the remainder is used for residential and commercial purposes, the rest being barren mountains, deserts, swamps, and forests."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[residentially]] | adverb | **1.** Used as a residence. | *"In academic literature, residentially designates used as a residence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[residual]] | noun | **1.** Something left after other parts have been taken away.<br>**2.** (often plural) a payment that is made to a performer or writer or director of a television show or commercial that is paid for every repeat showing. | *"Or were these memories of other times and places still residual, asleep, immured in solitary in brain cells similarly to the way I was immured in a cell in San Quentin?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[residuary]] | adjective | **1.** Entitled to the residue of an estate (after payment of debts and specific gifts).<br>**2.** Relating to or indicating a remainder. | *"It can’t be denied that undeserving people have been legatees, and even residuary legatees."* — George Eliot, *Middlemarch* |
| [[residue]] | noun | **1.** Matter that remains after something has been removed.<br>**2.** Something left after other parts have been taken away. | *"The residue of your fortune Go to my cave and tell me.—Good old man, Thou art right welcome as thy master is."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[residuum]] | noun | **1.** Something left after other parts have been taken away. | *"The advance of thought tends to strip the old animal and plant gods of their bestial and vegetable husk, and to leave their human attributes (which are always the kernel of the conception) as the final and sole residuum."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[sida]] | noun | **1.** Large genus of tropical subshrubs or herbs some of which yield fibers of mucilaginous substances. | *"In academic literature, sida designates large genus of tropical subshrubs or herbs some of which yield fibers of mucilaginous substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidalcea]] | noun | **1.** Genus of showy plants of western north america having palmate leaves and variously colored racemose flowers. | *"In academic literature, sidalcea designates genus of showy plants of western north america having palmate leaves and variously colored racemose flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side]] | noun | **1.** A place within a region identified relative to a center or reference location.<br>**2.** One of two or more contesting groups. | *"To side this title is impanelled A quest of thoughts, all tenants to the heart, And by their verdict is determined The clear eye’s moiety, and the dear heart’s part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[side-glance]] | noun | **1.** A glance sideways. | *"In academic literature, side-glance designates a glance sideways."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side-look]] | noun | **1.** A glance sideways. | *"In academic literature, side-look designates a glance sideways."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side-slip]] | verb | **1.** Slide sideways through the air in a downward direction in an airplane along an inclined lateral axis. | *"In academic literature, side-slip designates slide sideways through the air in a downward direction in an airplane along an inclined lateral axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side-to-side]] | adjective | **1.** Alternately left and right with respect to a central point. | *"In academic literature, side-to-side designates alternately left and right with respect to a central point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side-wheeler]] | noun | **1.** A paddle steamer having a paddle wheel on each side. | *"In academic literature, side-wheeler designates a paddle steamer having a paddle wheel on each side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[side-whiskers]] | noun | **1.** Facial hair that has grown down the side of a man's face in front of the ears (especially when the rest of the beard is shaved off). | *"In academic literature, side-whiskers designates facial hair that has grown down the side of a man's face in front of the ears (especially when the rest of the beard is shaved off)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidearm]] | adjective | **1.** (of pitches) made with the arm moving parallel to the ground.<br>**2.** In a sidearm manner. | *"He slipped the sidearm into the sheath at his waist and scanned the monitors displaying his areas of jurisdiction."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sidebar]] | noun | **1.** (law) a courtroom conference between the lawyers and the judge that is held out of the jury's hearing.<br>**2.** A short news story presenting sidelights on a major story. | *"In academic literature, sidebar designates (law) a courtroom conference between the lawyers and the judge that is held out of the jury's hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideboard]] | noun | **1.** A removable board fitted on the side of a wagon to increase its capacity.<br>**2.** A board that forms part of the side of a bed or crib. | *"The portraits of ancestors had been taken from the walls and the glinting pewter plates and goblets were gone from the large oaken sideboard."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sideburn]] | noun | **1.** Facial hair that has grown down the side of a man's face in front of the ears (especially when the rest of the beard is shaved off). | *"In academic literature, sideburn designates facial hair that has grown down the side of a man's face in front of the ears (especially when the rest of the beard is shaved off)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidecar]] | noun | **1.** A cocktail made of orange liqueur with lemon juice and brandy.<br>**2.** Conveyance consisting of a small carrier attached to the side of a motorcycle. | *"In academic literature, sidecar designates a cocktail made of orange liqueur with lemon juice and brandy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidekick]] | noun | **1.** A close friend who accompanies his buddies in their activities. | *"I'm here on counter-intelligence work, and I don't like your sending this guy," thumbing toward Brad, "and one of his sidekicks over to a UIPS ship on a highly sensitive assignment."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sidelight]] | noun | **1.** Light carried by a boat that indicates the boat's direction; vessels at night carry a red light on the port bow and a green light on the starboard bow. | *"Now carry out my orders to the letter.” As he spoke the gleam of the sidelights of a carriage came round the curve of the avenue."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[sideline]] | noun | **1.** A line that marks the side boundary of a playing field.<br>**2.** An auxiliary line of merchandise. | *"In academic literature, sideline designates a line that marks the side boundary of a playing field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidelong]] | adjective | **1.** (used especially of glances) directed to one side with or as if with doubt or suspicion or envy; - elizabeth bowen.<br>**2.** Situated at or extending to the side; ; - tennyson. | *"He drew out the weapon, which came forth with a slow sidelong wrench of its curved blade: a gush of blood followed, running down over Val's shirt, over his shabby coat, over the steps of Wanhope and the dry autumn turf."* — Anthony Pryde, *Nightfall* |
| [[sidereal]] | adjective | **1.** Of or relating to the stars or constellations.<br>**2.** (of divisions of time) determined by daily motion of the stars. | *"The whole sidereal system coruscated, reeled and fell in flame."* — Jack London, *The Jacket (The Star-Rover)* |
| [[siderite]] | noun | **1.** Iron ore in the form of ferrous carbonate.<br>**2.** A meteorite consisting principally of nickel and iron. | *"In academic literature, siderite designates iron ore in the form of ferrous carbonate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideritis]] | noun | **1.** Genus of woolly aromatic herbs or subshrubs or shrubs of mediterranean region. | *"In academic literature, sideritis designates genus of woolly aromatic herbs or subshrubs or shrubs of mediterranean region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideroblast]] | noun | **1.** An erythroblast having granules of ferritin. | *"In academic literature, sideroblast designates an erythroblast having granules of ferritin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[siderocyte]] | noun | **1.** An abnormal red blood cell containing granules of iron not bound in hemoglobin. | *"In academic literature, siderocyte designates an abnormal red blood cell containing granules of iron not bound in hemoglobin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideropenia]] | noun | **1.** A deficiency of iron; results from inadequate iron in the diet or from hemorrhage. | *"In academic literature, sideropenia designates a deficiency of iron; results from inadequate iron in the diet or from hemorrhage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[siderophilin]] | noun | **1.** A globulin in blood plasma that carries iron. | *"In academic literature, siderophilin designates a globulin in blood plasma that carries iron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[siderosis]] | noun | **1.** Fibrosis of the lung caused by iron dust; occurs among welders and other metal workers. | *"In academic literature, siderosis designates fibrosis of the lung caused by iron dust; occurs among welders and other metal workers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidesaddle]] | noun | **1.** A saddle for a woman; rider sits with both feet on the same side of the horse.<br>**2.** On or as if on a sidesaddle. | *"No sidesaddle or pillion for her, not for Joe."* — James Joyce, *Ulysses* |
| [[sideshow]] | noun | **1.** A subordinate incident of little importance relative to the main event.<br>**2.** A minor show that is part of a larger one (as at the circus). | *"In academic literature, sideshow designates a subordinate incident of little importance relative to the main event."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideslip]] | noun | **1.** An unexpected slide.<br>**2.** A flight maneuver; aircraft slides sideways in the air. | *"In academic literature, sideslip designates an unexpected slide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidesman]] | noun | **1.** (church of england) an assistant to the churchwarden; collects offerings of money in the church. | *"In academic literature, sidesman designates (church of england) an assistant to the churchwarden; collects offerings of money in the church."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidesplitter]] | noun | **1.** A joke that seems extremely funny. | *"In academic literature, sidesplitter designates a joke that seems extremely funny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidesplitting]] | adjective | **1.** Very funny. | *"In academic literature, sidesplitting designates very funny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidesplittingly]] | adverb | **1.** In a very humorous manner. | *"In academic literature, sidesplittingly designates in a very humorous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidestep]] | noun | **1.** A step to one side (as in boxing or dancing).<br>**2.** Avoid or try to avoid fulfilling, answering, or performing (duties, questions, or issues). | *"In academic literature, sidestep designates a step to one side (as in boxing or dancing)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidestroke]] | noun | **1.** A swimming stroke in which the arms move forward and backward while the legs do a scissors kick. | *"In academic literature, sidestroke designates a swimming stroke in which the arms move forward and backward while the legs do a scissors kick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideswipe]] | noun | **1.** A glancing blow from or on the side of something (especially motor vehicles).<br>**2.** Strike from the side. | *"In academic literature, sideswipe designates a glancing blow from or on the side of something (especially motor vehicles)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidetrack]] | noun | **1.** A short stretch of railroad track used to store rolling stock or enable trains on the same line to pass.<br>**2.** Wander from a direct or straight course. | *"In academic literature, sidetrack designates a short stretch of railroad track used to store rolling stock or enable trains on the same line to pass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidewalk]] | noun | **1.** Walk consisting of a paved area for pedestrians; usually beside a street or roadway. | *"I've got to step down-town on some business," and the captain fled with ponderous footsteps out through the dining-room to the little side entry where he hung his hat; then a moment later he went away, clicking his cane along the narrow sidewalk."* — Sarah Orne Jewett, *Strangers and Wayfarers* |
| [[sidewall]] | noun | **1.** The side of an automobile tire.<br>**2.** A wall that forms the side of a structure. | *"In academic literature, sidewall designates the side of an automobile tire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideward]] | adverb | **1.** Toward one side. | *"The group hurried past without a sideward glance, the metal feet of the ape-men ringing oddly loud on the granite of the echoing passage."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[sidewards]] | adverb | **1.** Toward one side. | *"In academic literature, sidewards designates toward one side."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sideway]] | adverb | **1.** With one side forward or to the front.<br>**2.** From the side; obliquely. | *"Has William Smallbury returned?” “No, ma’am.” “The new shepherd will want a man under him,” suggested Henery Fray, trying to make himself official again by a sideway approach towards her chair."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sideways]] | adjective | **1.** (of movement) at an angle.<br>**2.** With one side forward or to the front. | *"He was short, cadaverous, and withered, with his head sunk sideways between his shoulders and the breath issuing in visible smoke from his mouth as if he were on fire within."* — Charles Dickens, *Bleak House* |
| [[sidewinder]] | noun | **1.** Small pale-colored desert rattlesnake of southwestern united states; body moves in an s-shaped curve.<br>**2.** Air-to-air missile with infrared homing device. | *"In academic literature, sidewinder designates small pale-colored desert rattlesnake of southwestern united states; body moves in an s-shaped curve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sidewise]] | adverb | **1.** Toward one side.<br>**2.** With one side forward or to the front. | *"Not all at once could life return into the body that had been practically dead for ten days, and as a result, with no power as yet over my flesh, I gave at the knees, crumpled, pitched sidewise, and gashed my forehead against the wall."* — Jack London, *The Jacket (The Star-Rover)* |
| [[siding]] | noun | **1.** A short stretch of railroad track used to store rolling stock or enable trains on the same line to pass.<br>**2.** Material applied to the outside of a building to make it weatherproof. | *"The sacrifice is not much; and to oblige such a friend—I shall think you quite unkind, if you still refuse.” This was the first time of her brother’s openly siding against her, and anxious to avoid his displeasure, she proposed a compromise."* — Jane Austen, *Northanger Abbey* |
| [[sidle]] | verb | **1.** Move unobtrusively or furtively.<br>**2.** Move sideways. | *"Here I am, commander!” cries Phil, who has started from his chair and unaccountably begun to sidle away."* — Charles Dickens, *Bleak House* |
| [[sidney]] | noun | **1.** English poet (1554-1586). | *"Sir Philip Sidney’s Arcadia, the immortality of which was so fondly predicted by his admirers,* and which, in truth, was full of noble thoughts, delicate images, and graceful turns of language, is now scarcely ever mentioned."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[sidon]] | noun | **1.** The main city of ancient phoenicia. | *"Delilah [From a Picture] The sun has gone down, spreading wide on The sky-line one ray of red fire; Prepare the soft cushions of Sidon, Make ready the rich loom of Tyre."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[sids]] | noun | **1.** Sudden and unexpected death of an apparently healthy infant during sleep. | *"In academic literature, sids designates sudden and unexpected death of an apparently healthy infant during sleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subside]] | verb | **1.** Wear off or die down.<br>**2.** Sink to a lower level or form a depression. | *"There he again walks slowly up and down in the same attitude, subsiding, if a man so cool may have any need to subside, from the story he has related downstairs."* — Charles Dickens, *Bleak House* |
| [[subsidence]] | noun | **1.** An abatement in intensity or degree (as in the manifestations of a disease).<br>**2.** A gradual sinking to a lower level. | *"Is that _your_ branch?” A question which provoked much candid hilarity on the part of the two ladies; on the subsidence of which their entertainer, glancing at his daughter, remarked that she had grown."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[subsidiarity]] | noun | **1.** Secondary importance. | *"In academic literature, subsidiarity designates secondary importance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsidiary]] | noun | **1.** An assistant subject to the authority or control of another.<br>**2.** A company that is completely controlled by another company. | *"Silver, subsidiary | 385.8 | .90 | 14.953 to 1 4."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[subsiding]] | noun | **1.** A gradual sinking to a lower level.<br>**2.** Wear off or die down. | *"There he again walks slowly up and down in the same attitude, subsiding, if a man so cool may have any need to subside, from the story he has related downstairs."* — Charles Dickens, *Bleak House* |
| [[subsidisation]] | noun | **1.** Money (or other benefits) obtained as a subsidy.<br>**2.** The act of providing a subsidy. | *"In academic literature, subsidisation designates money (or other benefits) obtained as a subsidy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsidise]] | verb | **1.** Secure the assistance of by granting a subsidy, as of nations or military forces.<br>**2.** Support through subsidies. | *"Knowing that he was heir to a large fortune, he would subsidise any project or any grievance, only provided it were wild enough."* — Sydney Waterlow, *Shelley* |
| [[subsidised]] | verb | **1.** Secure the assistance of by granting a subsidy, as of nations or military forces.<br>**2.** Support through subsidies. | *"Impervious to fear is Rory’s son: he of the prudent soul. —For the old woman of Prince’s street, says the citizen, the subsidised organ."* — James Joyce, *Ulysses* |
| [[subsidiser]] | noun | **1.** Someone who assists or supports by giving a subsidy. | *"In academic literature, subsidiser designates someone who assists or supports by giving a subsidy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsidization]] | noun | **1.** Money (or other benefits) obtained as a subsidy.<br>**2.** The act of providing a subsidy. | *"In academic literature, subsidization designates money (or other benefits) obtained as a subsidy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsidize]] | verb | **1.** Support through subsidies.<br>**2.** Secure the assistance of by granting a subsidy, as of nations or military forces. | *"It has already been shown that when the tariff duty prevents the importation of foreign goods and by raising the price encourages domestic manufacture of the article, there is virtually taxation of the consumer to subsidize the private manufacturer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[subsidized]] | verb | **1.** Support through subsidies.<br>**2.** Secure the assistance of by granting a subsidy, as of nations or military forces. | *"At present development in this field is along two lines, that of subsidized trade-union relief (the Ghent system), and that of compulsory state insurance in certain industries."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[subsidizer]] | noun | **1.** Someone who assists or supports by giving a subsidy. | *"In academic literature, subsidizer designates someone who assists or supports by giving a subsidy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsidy]] | noun | **1.** A grant paid by a government to an enterprise that benefits the public. | *"Here’s the Lord Saye, which sold the towns in France; he that made us pay one-and-twenty fifteens, and one shilling to the pound, the last subsidy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unconsidered]] | adjective | **1.** Without proper consideration or reflection. | *"That you would love yourself, and in that love Not unconsidered leave your honour nor The dignity of your office, is the point Of my petition."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[underside]] | noun | **1.** The lower side of anything. | *"The underside of the mantel-shelf was flushed with the high-coloured light, and the legs of the table nearest the fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unpresidential]] | adjective | **1.** Not presidential. | *"In academic literature, unpresidential designates not presidential."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Placing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SID
  </div>
</div>
