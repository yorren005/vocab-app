---
status: unread
type: root_dashboard
---
# Dashboard — sap
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sap-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to taste or be wise”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sitting quietly while turning ideas over in your mind to solve a problem.</span>
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

The root **sap** means to taste or be wise. It refers to perceiving flavors through the tongue, or having good judgment. In English, this root forms words such as *sapient*, *insipid*, and *savor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to taste or be wise
> The root **sap** means to taste or be wise. It refers to perceiving flavors through the tongue, or having good judgment. In English, this root forms words such as *sapient*, *insipid*, and *savor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To taste or be wise</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sitting quietly while turning ideas over in your mind to solve a problem.</mark>
> - **Everyday Connection**: Think of familiar words like *sapient* and *insipid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sap** comes from a Latin word that means *"to taste or be wise"*.
  - At its core, it describes the action of taste or be wise.

- **The Big Picture Idea**:
  - Picture sitting quietly while turning ideas over in your mind to solve a problem.
  - Whenever you see **sap** in an English word, think of **to taste or be wise**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to taste or be wise).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sapient**: Possessing or expressing great wisdom or discernment.
  - **Insipid**: An everyday English word showing the root's idea of *to taste or be wise*.
  - **Savor**: An everyday English word showing the root's idea of *to taste or be wise*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sap</mark>, think of <mark class="hl-def">to taste or be wise</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root branches into three distinct morphological families:
1. **The Pure Latin Stem `sap-` / `sapient-`**:
   - *sapient* (< Latin *sapiēns*, present participle of *sapere*).
   - *sapience* (< Latin *sapientia* "wisdom").
   - *sapid* (< Latin *sapidus* "savory, having flavor").
   - *insipid* (< Latin *insipidus* < *in-* "not" + *sapidus*).
2. **The Romance Phonological Softening `sag-`**:
   - Vulgar Latin *\*sabius* $\to$ Old French *sage* $\to$ English **sage** and **sagacious** (influenced by Latin *sagāx* "keen-scented, acute").
3. **The Culinary & Perceptual Shift `savor`**:
   - Latin noun *sapor* ("taste, flavor") $\to$ Old French *savour* $\to$ English **savor**, **savory**.

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

The cognitive architecture of *sap* links sensory flavor to intellectual mastery:
- **Species & Biological Taxonomy**: [[homosapiens]]
- **Philosophical Wisdom & Guidance**: [[sage]], [[sapient]], `sapience`
- **Scholarly & Practical Erudition**: [[savant]], [[savvy]]
- **Sensory Taste & Intellectual Flatness**: `sapid`, `sapidity`, `insipid`, `insipidity`, `savor`, `savory`

---

## 🔀 4. Prefix & Combining Dynamics on sap

1. **`in-` + `sap`** (*in-* "not, lacking"):
   - *insipid* $\to$ lacking flavor or taste; mentally dull, uninspiring, or bland.
   - *insipidity* $\to$ tedious dullness; total absence of piquancy or interest.
2. **`homo` + `sap`** (*homō* "human being" + *sapiēns* "wise"):
   - *Homo sapiens* $\to$ the biological species of modern humans, defined by cognitive self-awareness and rational thought.
3. **Suffixal Derivations**:
   - `sap` + `-ent` $\to$ *sapient* (possessing or displaying great wisdom).
   - `sap` + `-id` $\to$ *sapid* (having a pleasant taste; agreeable to the mind).

---

## 🌐 5. Disciplinary & Real-World Domains

- **Anthropology & Evolutionary Biology**: *Homo sapiens* speciation, cognitive revolution of the Upper Paleolithic.
- **Philosophy & Ethics**: the Stoic *sage* (*sophos* / *sapiens*), pursuit of *sapience*.
- **Neuroscience & Psychology**: savant syndrome (extraordinary cognitive abilities alongside developmental delays).
- **Gastronomy & Aesthetics**: *savory* dishes, *insipid* prose, *savoring* subtle experiential nuances.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[homosapiens]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sap within the domain of Thought.<br>**2.** A technical or specialized form exhibiting the properties of sap in systematic terminology. | *"In academic literature, homosapiens designates pertaining to, derived from, or characteristic of latin sap within the domain of thought."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sap]] | noun | **1.** A watery solution of sugars, salts, and minerals that circulates through the vascular system of a plant.<br>**2.** A person who lacks good judgment. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sapid]] | adjective | **1.** Full of flavor. | *"In academic literature, sapid designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapidity]] | noun | **1.** The taste experience when a savoury condiment is taken into the mouth.<br>**2.** A pleasant flavor. | *"In academic literature, sapidity designates the taste experience when a savoury condiment is taken into the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapidness]] | noun | **1.** A pleasant flavor. | *"In academic literature, sapidness designates a pleasant flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapience]] | noun | **1.** Ability to apply knowledge or experience or understanding or common sense and insight. | *"So sang the Hierarchies: Mean while the Son On his great Expedition now appeer’d, Girt with Omnipotence, with Radiance crown’d Of Majestie Divine, Sapience and Love Immense, and all his Father in him shon."* — John Milton, *Paradise Lost* |
| [[sapiens]] | adjective | **1.** Of or relating to or characteristic of homo sapiens. | *"In academic literature, sapiens designates of or relating to or characteristic of homo sapiens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapient]] | adjective | **1.** Acutely insightful and wise. | *"It shall be done; I will arraign them straight. [_To Edgar._] Come, sit thou here, most learned justicer; [_To the Fool._] Thou, sapient sir, sit here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sapiential]] | adjective | **1.** Characterized by wisdom, especially the wisdom of god. | *"In academic literature, sapiential designates characterized by wisdom, especially the wisdom of god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapiently]] | adverb | **1.** In a shrewd manner. | *"In academic literature, sapiently designates in a shrewd manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapindaceae]] | noun | **1.** Chiefly tropical new and old world deciduous and evergreen trees and shrubs bearing leathery drupes with yellow translucent flesh; most plants produce toxic saponins. | *"In academic literature, sapindaceae designates chiefly tropical new and old world deciduous and evergreen trees and shrubs bearing leathery drupes with yellow translucent flesh; most plants produce toxic saponins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapindales]] | noun | **1.** An order of dicotyledonous plants. | *"In academic literature, sapindales designates an order of dicotyledonous plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapindus]] | noun | **1.** Type genus of the sapindaceae. | *"In academic literature, sapindus designates type genus of the sapindaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapir]] | noun | **1.** Anthropologist and linguist; studied languages of north american indians (1884-1939). | *"In academic literature, sapir designates anthropologist and linguist; studied languages of north american indians (1884-1939)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapless]] | adjective | **1.** Lacking bodily or muscular strength or vitality.<br>**2.** Destitute of sap and other vital juices; dry; - norman mailer. | *"These eyes, like lamps whose wasting oil is spent, Wax dim, as drawing to their exigent; Weak shoulders, overborne with burdening grief, And pithless arms, like to a wither’d vine That droops his sapless branches to the ground."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sapling]] | noun | **1.** Young tree. | *"Come, you’re a young foolish sapling, and must be bowed as I would have you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sapodilla]] | noun | **1.** Large tropical american evergreen yielding chicle gum and edible fruit; sometimes placed in genus achras.<br>**2.** Tropical fruit with a rough brownish skin and very sweet brownish pulp. | *"In academic literature, sapodilla designates large tropical american evergreen yielding chicle gum and edible fruit; sometimes placed in genus achras."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponaceous]] | adjective | **1.** Resembling or having the qualities of soap. | *"In academic literature, saponaceous designates resembling or having the qualities of soap."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponaria]] | noun | **1.** Mostly perennial old world herbs. | *"In academic literature, saponaria designates mostly perennial old world herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponification]] | noun | **1.** A chemical reaction in which an ester is heated with an alkali (especially the alkaline hydrolysis of a fat or oil to make soap). | *"In academic literature, saponification designates a chemical reaction in which an ester is heated with an alkali (especially the alkaline hydrolysis of a fat or oil to make soap)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponified]] | verb | **1.** Become converted into soap by being hydrolized into an acid and alcohol as a result of being treated with an alkali.<br>**2.** Convert into soap by hydrolizing an ester into an acid and alcohol as a result of treating it with an alkali. | *"In academic literature, saponified designates become converted into soap by being hydrolized into an acid and alcohol as a result of being treated with an alkali."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponify]] | verb | **1.** Become converted into soap by being hydrolized into an acid and alcohol as a result of being treated with an alkali.<br>**2.** Convert into soap by hydrolizing an ester into an acid and alcohol as a result of treating it with an alkali. | *"In academic literature, saponify designates become converted into soap by being hydrolized into an acid and alcohol as a result of being treated with an alkali."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saponin]] | noun | **1.** Any of various plant glucosides that form soapy lathers when mixed and agitated with water; used in detergents and foaming agents and emulsifiers. | *"In academic literature, saponin designates any of various plant glucosides that form soapy lathers when mixed and agitated with water; used in detergents and foaming agents and emulsifiers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saporous]] | adjective | **1.** Full of flavor. | *"In academic literature, saporous designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapota]] | noun | **1.** Tropical fruit with a rough brownish skin and very sweet brownish pulp. | *"In academic literature, sapota designates tropical fruit with a rough brownish skin and very sweet brownish pulp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapotaceae]] | noun | **1.** Tropical trees or shrubs with milky juice and often edible fleshy fruit. | *"In academic literature, sapotaceae designates tropical trees or shrubs with milky juice and often edible fleshy fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapote]] | noun | **1.** Tropical american tree having wood like mahogany and sweet edible egg-shaped fruit; in some classifications placed in the genus calocarpum.<br>**2.** Brown oval fruit flesh makes excellent sherbet. | *"In academic literature, sapote designates tropical american tree having wood like mahogany and sweet edible egg-shaped fruit; in some classifications placed in the genus calocarpum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapper]] | noun | **1.** A military engineer who lays or detects and disarms mines.<br>**2.** A military engineer who does sapping (digging trenches or undermining fortifications). | *"It was the skill of an experienced tactician to deploy the northern levies as the sappers and miners; it was very becoming certainly."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[sappy]] | adjective | **1.** Ludicrous, foolish.<br>**2.** Abounding in sap. | *"There’s naething like the honest nappy; Whare’ll ye e’er see men sae happy, Or women sonsie, saft an’ sappy, ’Tween morn and morn, As them wha like to taste the drappie, In glass or horn?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[sapraemia]] | noun | **1.** Blood poisoning caused by putrefactive bacteria; results from eating putrefied matter. | *"In academic literature, sapraemia designates blood poisoning caused by putrefactive bacteria; results from eating putrefied matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapremia]] | noun | **1.** Blood poisoning caused by putrefactive bacteria; results from eating putrefied matter. | *"In academic literature, sapremia designates blood poisoning caused by putrefactive bacteria; results from eating putrefied matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprobe]] | noun | **1.** An organism that lives in and derives its nourishment from organic matter in stagnant or foul water. | *"In academic literature, saprobe designates an organism that lives in and derives its nourishment from organic matter in stagnant or foul water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprobic]] | adjective | **1.** Living in or being an environment rich in organic matter but lacking oxygen. | *"In academic literature, saprobic designates living in or being an environment rich in organic matter but lacking oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprolegnia]] | noun | **1.** Aquatic fungi growing chiefly on plant debris and animal remains. | *"In academic literature, saprolegnia designates aquatic fungi growing chiefly on plant debris and animal remains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprolegniales]] | noun | **1.** Order of chiefly aquatic fungi. | *"In academic literature, saprolegniales designates order of chiefly aquatic fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprolite]] | noun | **1.** A deposit of clay and disintegrating rock that is found in its original place. | *"In academic literature, saprolite designates a deposit of clay and disintegrating rock that is found in its original place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapropel]] | noun | **1.** Sludge (rich in organic matter) that accumulates at the bottom of lakes or oceans. | *"In academic literature, sapropel designates sludge (rich in organic matter) that accumulates at the bottom of lakes or oceans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprophagous]] | adjective | **1.** (of certain animals) feeding on dead or decaying animal matter. | *"In academic literature, saprophagous designates (of certain animals) feeding on dead or decaying animal matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprophyte]] | noun | **1.** An organism that feeds on dead organic matter especially a fungus or bacterium. | *"In academic literature, saprophyte designates an organism that feeds on dead organic matter especially a fungus or bacterium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprophytic]] | adjective | **1.** Obtaining food osmotically from dissolved organic material.<br>**2.** (of some plants or fungi) feeding on dead or decaying organic matter. | *"In academic literature, saprophytic designates obtaining food osmotically from dissolved organic material."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[saprozoic]] | adjective | **1.** (of certain animals) feeding on dead or decaying animal matter. | *"In academic literature, saprozoic designates (of certain animals) feeding on dead or decaying animal matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapsago]] | noun | **1.** A hard green swiss cheese made with skim-milk curd and flavored with clover. | *"In academic literature, sapsago designates a hard green swiss cheese made with skim-milk curd and flavored with clover."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sapsucker]] | noun | **1.** Small american woodpecker that feeds on sap from e.g. apple and maple trees. | *"In academic literature, sapsucker designates small american woodpecker that feeds on sap from e.g. apple and maple trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsaponified]] | adjective | **1.** Not converted into soap. | *"In academic literature, unsaponified designates not converted into soap."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Thought]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SAP
  </div>
</div>
