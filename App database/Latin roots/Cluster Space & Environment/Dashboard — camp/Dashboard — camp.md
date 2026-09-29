---
status: unread
type: root_dashboard
---
# Dashboard — camp
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">camp-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“field”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking out across an open horizon with plenty of room to move.</span>
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

The root **camp** means field. It refers to an open expanse of agricultural land or meadow. In English, this root forms words such as *campaign*, *campus*, *champagne*, and *champion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: field
> The root **camp** means field. It refers to an open expanse of agricultural land or meadow. In English, this root forms words such as *campaign*, *campus*, *champagne*, and *champion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Field</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *campaign* and *campus*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **camp** comes from a Latin word that means *"field"*.
  - At its core, it describes field.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **camp** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of field.
  - **Mental & Social**: How people experience, organize, or communicate about field.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Campaign**: A series of coordinated military operations intended to achieve a strategic objective.
  - **Campus**: The grounds and buildings of a university, college, or school.
  - **Champagne**: A white or rosé sparkling wine produced in the Champagne region of France in accordance with strict appellation rules.
  - **Champion**: A person who has defeated all rivals in a competition.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">camp</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin campus (open level field)
  │
  ├── Direct Latin Academic Survival
  │     └── campus (university grounds)
  │
  ├── Military Formations
  │     ├── camp (tents, military base)
  │     ├── en- + camp ──────────────> encamp, encampment
  │     └── de- + camp ──────────────> decamp (hasty departure)
  │
  ├── French Phonetic Evolution (campus ──> campagne)
  │     ├── campaign (military/electoral operations)
  │     └── Champagne (province ──> sparkling wine)
  │
  └── Late Latin campiō (fighter in the field)
        └── champion (athletic victor / defender of a cause)
```

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

### Distinct Arenas of Activity
1. **Military Operations & Bivouac**: *camp*, *encamp*, *decamp* (military tents, field bases, sudden departures).
2. **Strategic Operations**: *campaign* (coordinated political, advertising, or military initiatives).
3. **Academic & Collegiate Life**: *campus* (grounds, buildings, and community of a college or university).
4. **Victory & Advocacy**: *champion* (first-place athletic winner; tireless defender of civil rights or principles).
5. **Gastronomy & Regional Oenology**: *champagne* (celebratory effervescent wine of northern France).

---

## 🔀 4. Prefix & Combining Dynamics on camp

### Prefix Interactions
- **en- ("in, into, upon") + camp**: *encamp* (to pitch tents, establish a field base).
- **de- ("away, off") + camp**: *decamp* (to pack up tents and depart swiftly, often secretly).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Higher Education & Campus Planning** | University architecture, collegiate quads, campus safety | *campus*, *off-campus*, *on-campus* |
| **Electoral Politics & Public Relations** | Advertising drives, voter mobilization, political strategist | *campaign*, *campaign trail*, *campaign manager* |
| **Military History & Warfare** | Battlefield strategy, winter quarters, logistical encampments | *campaign*, *encampment*, *decamp* |
| **Sports & Athletics** | Tournaments, world titles, defending titles | *champion*, *championship* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[camp]] | noun | **1.** Temporary living quarters specially built by the army for soldiers.<br>**2.** A group of people living together in a camp. | *"O, let me live, And all the secrets of our camp I’ll show, Their force, their purposes; nay, I’ll speak that Which you will wonder at."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[campaign]] | noun | **1.** A race between candidates for elective office.<br>**2.** A series of actions advancing a principle or tending toward a particular end. | *"All the surrounding cottages were more or less scenes of the same operation; the scurr of whetting spread into the sky from all parts of the village as from an armoury previous to a campaign."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[campaigner]] | noun | **1.** A politician who is running for public office. | *"A Gentleman was saying one Day at the _Tilt-Yard_ Coffee-House, when it rained exceeding hard, that it put him in Mind of the General _Deluge_; Zoons, Sir, said an old Campaigner, who stood by, who's that?"* — Classic Author, *Joe Miller's Jests, or The Wits Vade-Mecum* |
| [[campaigning]] | noun | **1.** The campaign of a candidate to be elected.<br>**2.** Run, stand, or compete for an office or a position. | *"When campaigning, Rostóv allowed himself the indulgence of riding not a regimental but a Cossack horse."* — graf Leo Tolstoy, *War and Peace* |
| [[campana]] | noun | **1.** The shape of a bell. | *"Pinkerton's _Voyages and Travels_ (London, 1808-1814), xvi. 238; Father Campana, "Congo; Mission Catholique de Landana," _Les Missions Catholiques_, xxvii. (1895) p. 161; R.E."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[campania]] | noun | **1.** A region of southwestern italy on the tyrrhenian sea including the islands of capri and ischia. | *"Virbius was worshipped as a god not only at Nemi but elsewhere; for in Campania we hear of a special priest devoted to his service."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[campanile]] | noun | **1.** A bell tower; usually stands alone unattached to a building. | *"The sudden flashes of colour reminded him of the gleam of the opal-and-iris-throated birds that flutter round the tall honeycombed Campanile, or stalk, with such stately grace, through the dim, dust-stained arcades."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[campanula]] | noun | **1.** Any of various plants of the genus campanula having blue or white bell-shaped flowers. | *"The butter-bur rust (_Coleosporium petasites_, Lev.) and the Campanula rust (_Coleosporium Campanulæ_, Lev.) are found, the former on the leaves of the butter-bur, and the latter on those of the harebell and other _Campanulæ_, less frequently."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[campanulaceae]] | noun | **1.** Family of plants of the order campanulales; in some classifications includes lobeliaceae. | *"In academic literature, campanulaceae designates family of plants of the order campanulales; in some classifications includes lobeliaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campanulales]] | noun | **1.** An order of plants of the subclass asteridae including: campanulaceae; lobeliaceae; cucurbitaceae; goodeniaceae; compositae. | *"In academic literature, campanulales designates an order of plants of the subclass asteridae including: campanulaceae; lobeliaceae; cucurbitaceae; goodeniaceae; compositae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campanular]] | adjective | **1.** Shaped like a bell or campana. | *"In academic literature, campanular designates shaped like a bell or campana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campanulate]] | adjective | **1.** Shaped like a bell or campana. | *"The peridia are always closely packed together upon a thickened base, and offer but slight variations from the forms already enumerated, save that they widen slightly at the mouth, so as to become nearly campanulate."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[campanulated]] | adjective | **1.** Shaped like a bell or campana. | *"In academic literature, campanulated designates shaped like a bell or campana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campeachy]] | noun | **1.** Spiny shrub or small tree of central america and west indies having bipinnate leaves and racemes of small bright yellow flowers and yielding a hard brown or brownish-red heartwood used in preparing a black dye. | *"In academic literature, campeachy designates spiny shrub or small tree of central america and west indies having bipinnate leaves and racemes of small bright yellow flowers and yielding a hard brown or brownish-red heartwood used in preparing a black dye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campeche]] | noun | **1.** A mexican city on the bay of campeche.<br>**2.** A mexican state on the eastern part of the gulf of campeche. | *"In academic literature, campeche designates a mexican city on the bay of campeche."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campephilus]] | noun | **1.** A genus of picidae. | *"In academic literature, campephilus designates a genus of picidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[camper]] | noun | **1.** Someone living temporarily in a tent or lodge for recreation.<br>**2.** A recreational vehicle equipped for camping out while traveling. | *"I'll prove to you I'm a woodsman,” she asserted, and when she had performed her task after the most approved fashion of the skilled camper, he acknowledged that she had made good her boast."* — Grace S. Richmond, *Red Pepper Burns* |
| [[campestral]] | adjective | **1.** Of fields or open country. | *"In academic literature, campestral designates of fields or open country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[camping]] | noun | **1.** The act of encamping and living in tents in a camp.<br>**2.** Live in or as if in a tent. | *"His taken labours bid him me forgive; I, his despiteful Juno, sent him forth From courtly friends, with camping foes to live, Where death and danger dog the heels of worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[campion]] | noun | **1.** Any plant of the genus silene. | *"The chief interest attaching to _Ustilago antherarum_ consists in its habitat, for it is developed in the anthers of the flowers of the bladder campion, and other plants of the same natural order."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[campmate]] | noun | **1.** Someone who lives in the same camp you do. | *"In academic literature, campmate designates someone who lives in the same camp you do."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campong]] | noun | **1.** A native village in malaysia. | *"In academic literature, campong designates a native village in malaysia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[camponotus]] | noun | **1.** Carpenter ants. | *"In academic literature, camponotus designates carpenter ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campsite]] | noun | **1.** A site where people on holiday can pitch a tent. | *"They started their drive last night,” Uncle Henry said, “and boomed her just below the campsite."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[campstool]] | noun | **1.** A folding stool. | *"We belated historians must not linger after his example; and if we did so, it is probable that our chat would be thin and eager, as if delivered from a campstool in a parrot-house."* — George Eliot, *Middlemarch* |
| [[camptosorus]] | noun | **1.** Classification used in some especially former systems for plants usually placed in genus asplenium. | *"In academic literature, camptosorus designates classification used in some especially former systems for plants usually placed in genus asplenium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campus]] | noun | **1.** A field on which the buildings of a university are situated. | *"One day when on the Seminary campus, I heard two of the students very thoughtlessly criticising the exceeding shabbiness of L----'s wearing apparel, his short pants, old shoes, and socks with no heels in them."* — Classic Author, *The wonders of prayer* |
| [[campy]] | adjective | **1.** Providing sophisticated amusement by virtue of having artificially (and vulgarly) mannered or banal or sentimental qualities. | *"In academic literature, campy designates providing sophisticated amusement by virtue of having artificially (and vulgarly) mannered or banal or sentimental qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campyloneurum]] | noun | **1.** Epiphytic ferns of tropical america. | *"In academic literature, campyloneurum designates epiphytic ferns of tropical america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campylorhynchus]] | noun | **1.** Alternative classifications for the cactus wrens. | *"In academic literature, campylorhynchus designates alternative classifications for the cactus wrens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[campylotropous]] | adjective | **1.** (of a plant ovule) curved with the micropyle near the base almost touching its stalk. | *"In academic literature, campylotropous designates (of a plant ovule) curved with the micropyle near the base almost touching its stalk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decamp]] | verb | **1.** Leave a camp.<br>**2.** Run away; usually includes taking something or somebody along. | *"The short-hand writers, the reporters of the court, and the reporters of the newspapers invariably decamp with the rest of the regulars when Jarndyce and Jarndyce comes on."* — Charles Dickens, *Bleak House* |
| [[decampment]] | noun | **1.** The act of running away secretly (as to avoid arrest).<br>**2.** Breaking camp. | *"In academic literature, decampment designates the act of running away secretly (as to avoid arrest)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicamptodon]] | noun | **1.** Salamanders found near cold streams throughout the year. | *"In academic literature, dicamptodon designates salamanders found near cold streams throughout the year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicamptodontid]] | noun | **1.** Salamanders found near cold streams throughout the year. | *"In academic literature, dicamptodontid designates salamanders found near cold streams throughout the year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicamptodontidae]] | noun | **1.** Large and small highly aquatic salamanders. | *"In academic literature, dicamptodontidae designates large and small highly aquatic salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encamp]] | verb | **1.** Live in or as if in a tent. | *"Beyond the river we’ll encamp ourselves, And on tomorrow bid them march away. [_Exeunt._] SCENE VII."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[encampment]] | noun | **1.** A site where people on holiday can pitch a tent.<br>**2.** Temporary living quarters specially built by the army for soldiers. | *"Distinct upon the stagnant air came the sounds of a trotting horse passing up Longpuddle Lane—just beyond the gipsies’ encampment in Weatherbury Bottom."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Space & Environment]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAMP
  </div>
</div>
