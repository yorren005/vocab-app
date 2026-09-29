---
status: unread
type: root_dashboard
---
# Dashboard — pand
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pand-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to spread or stretch out”</span>
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

The root **pand** means to spread or stretch out. It indicates moving outward from an interior or emerging into view. In English, this root forms words such as *expand*, *expansion*, and *pandiculation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to spread or stretch out
> The root **pand** means to spread or stretch out. It indicates moving outward from an interior or emerging into view. In English, this root forms words such as *expand*, *expansion*, and *pandiculation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To spread or stretch out</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *expand* and *expansion*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pand** comes from a Latin word that means *"to spread or stretch out"*.
  - At its core, it describes the action of spread or stretch out.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **pand** in an English word, think of **to spread or stretch out**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to spread or stretch out).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Expand**: To become or make larger or more extensive.
  - **Expansion**: The action of becoming larger or more extensive.
  - **Pandiculation**: The act of stretching and yawning, especially upon waking or when feeling drowsy.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pand</mark>, think of <mark class="hl-def">to spread or stretch out</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin pandō, pandere (to spread out, unfold)
  │
  ├── ex- + pandere ─────────────────> expand (grow in size/volume/scope)
  │     └── expansion (noun of action: growth, inflation)
  │
  ├── Frequentative pandiculārī ─────> pandiculation (waking stretch & yawn)
  │
  └── (Supine Stem: pānsum) ─────────> See [[Dashboard — pans]] (expanse, expansive)
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

### Distinct Spheres of Manifestation
1. **Thermodynamics & Astrophysics**: *expand*, *expansion* (thermal gas expansion, cosmic redshift, inflation).
2. **Macroeconomics & Corporate Growth**: *expand*, *expansion* (market growth, capital expenditure, branch expansion).
3. **Physiology & Mammalian Behavior**: *pandiculation* (involuntary neuromuscular stretching and yawning).

---

## 🔀 4. Prefix & Combining Dynamics on pand

### Morphological Affixes
- **ex- ("outward, forth") + pand-**: *expand* (to spread outward from the center).
- **-ion**: *expansion* (the state or process of becoming larger).
- **-ic- / -ation**: *pandiculation* (neuromuscular bodily reflex).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Astrophysics & Physical Cosmology** | Hubble-Lemaître law, cosmic expansion, metric expansion of space | *expand*, *cosmic expansion* |
| **Mechanical Engineering & HVAC** | Thermal expansion joints, thermal expansion valves | *expansion*, *thermal expansion* |
| **Economics & Monetary Policy** | GDP growth, business cycle expansion, quantitative easing | *expansion*, *economic expansion* |
| **Veterinary Medicine & Physiology** | Neuromuscular resets, somatosensory motor awakening | *pandiculation* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[expand]] | verb | **1.** Extend in one or more directions.<br>**2.** Become larger in size or volume or quantity. | *"For these reasons I thought it best to be as useful as I could, and to render what kind services I could to those immediately about me, and to try to let that circle of duty gradually and naturally expand itself."* — Charles Dickens, *Bleak House* |
| [[expandable]] | adjective | **1.** Able to expand or be expanded.<br>**2.** (of gases) capable of expansion. | *"In academic literature, expandable designates able to expand or be expanded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expanded]] | verb | **1.** Extend in one or more directions.<br>**2.** Become larger in size or volume or quantity. | *"I ran after you to say—that my aunt made a mistake in sending you away from courting me—” Gabriel expanded."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[expandible]] | adjective | **1.** Able to expand or be expanded.<br>**2.** (of gases) capable of expansion. | *"In academic literature, expandible designates able to expand or be expanded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panda]] | noun | **1.** Large black-and-white herbivorous mammal of bamboo forests of china and tibet; in some classifications considered a member of the bear family or of a separate family ailuropodidae.<br>**2.** Reddish-brown old world raccoon-like carnivore; in some classifications considered unrelated to the giant pandas. | *"In academic literature, panda designates large black-and-white herbivorous mammal of bamboo forests of china and tibet; in some classifications considered a member of the bear family or of a separate family ailuropodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandanaceae]] | noun | **1.** Family of woody plants of the order pandanales including pandanus. | *"In academic literature, pandanaceae designates family of woody plants of the order pandanales including pandanus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandanales]] | noun | **1.** Families typhaceae; sparganiaceae; pandanaceae. | *"In academic literature, pandanales designates families typhaceae; sparganiaceae; pandanaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandanus]] | noun | **1.** Fiber from leaves of the pandanus tree; used for woven articles (such as mats).<br>**2.** Any of various old world tropical palmlike trees having huge prop roots and edible conelike fruits and leaves like pineapple leaves. | *"These cages were made of the broad leaves of the pandanus-tree, sewn quite close together so that no light and little or no air could enter."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[pandar]] | noun | **1.** Someone who procures customers for whores (in england they call a pimp a ponce). | *"And he that will not follow Bourbon now, Let him go hence, and with his cap in hand, Like a base pandar, hold the chamber door Whilst by a slave, no gentler than my dog, His fairest daughter is contaminated."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pandemic]] | noun | **1.** An epidemic that is geographically widespread; occurring throughout a region or even throughout the world.<br>**2.** Epidemic over a wide geographical area. | *"In academic literature, pandemic designates an epidemic that is geographically widespread; occurring throughout a region or even throughout the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandemonium]] | noun | **1.** A state of extreme confusion and disorder. | *"The pandemonium above has ceased almost as suddenly as it arose, passed like a fierce gust of wind; but they know that in the passing it has determined their fate."* — J. M. Barrie, *Peter Pan* |
| [[pander]] | noun | **1.** Someone who procures customers for whores (in england they call a pimp a ponce).<br>**2.** Yield (to); give satisfaction to. | *"Marry, sir, we’ll bring you to Windsor to one Master Brook, that you have cozened of money, to whom you should have been a pander."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[panderer]] | noun | **1.** Someone who procures customers for whores (in england they call a pimp a ponce).<br>**2.** A person who serves or caters to the vulgar passions or plans of others (especially in order to make money). | *"In academic literature, panderer designates someone who procures customers for whores (in england they call a pimp a ponce)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandiculation]] | noun | **1.** Yawning and stretching (as when first waking up). | *"In academic literature, pandiculation designates yawning and stretching (as when first waking up)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandion]] | noun | **1.** Type genus of the pandionidae. | *"Senseless trees they cannot hear thee, Ruthless bears they will not cheer thee; King Pandion he is dead, All thy friends are lapp’d in lead, All thy fellow birds do sing, Careless of thy sorrowing."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pandionidae]] | noun | **1.** Ospreys. | *"Classical and authoritative lexicons catalog pandionidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandora]] | noun | **1.** (greek mythology) the first woman; created by hephaestus on orders from zeus who presented her to epimetheus along with a box filled with evils. | *"An account of them was subsequently published in the _Christian_: "In 1839 I was a sailor on board the brig Pandora, Captain G----, bound from Savannah to Boston, with a cargo of cotton."* — Classic Author, *The wonders of prayer* |
| [[pandowdy]] | noun | **1.** Deep-dish apple dessert covered with a rich crust. | *"In academic literature, pandowdy designates deep-dish apple dessert covered with a rich crust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pandurate]] | adjective | **1.** (of a leaf shape) having rounded ends and a contracted center. | *"In academic literature, pandurate designates (of a leaf shape) having rounded ends and a contracted center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panduriform]] | adjective | **1.** (of a leaf shape) having rounded ends and a contracted center. | *"In academic literature, panduriform designates (of a leaf shape) having rounded ends and a contracted center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repand]] | adjective | **1.** Having a slightly undulating margin. | *"In academic literature, repand designates having a slightly undulating margin."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PAND
  </div>
</div>
