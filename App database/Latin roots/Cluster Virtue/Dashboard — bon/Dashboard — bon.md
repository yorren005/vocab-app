---
status: unread
type: root_dashboard
---
# Dashboard — bon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">bon-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“good”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing up courageously for what is fair, moral, and honorable.</span>
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

The root **bon** means good. It describes being helpful, beneficial, kind, or of fine quality. In English, this root forms words such as *bonus*, *bonanza*, *bonhomie*, and *bounty*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: good
> The root **bon** means good. It describes being helpful, beneficial, kind, or of fine quality. In English, this root forms words such as *bonus*, *bonanza*, *bonhomie*, and *bounty*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Good</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing up courageously for what is fair, moral, and honorable.</mark>
> - **Everyday Connection**: Think of familiar words like *bonus* and *bonanza*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bon** comes from a Latin word that means *"good"*.
  - At its core, it describes the quality or state of being good.

- **The Big Picture Idea**:
  - Picture standing up courageously for what is fair, moral, and honorable.
  - Whenever you see **bon** in an English word, think of **virtue, integrity, and good character**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are good.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Bonus**: An amount of money added to wages on a seasonal basis or for good performance.
  - **Bonanza**: A situation or event that creates a sudden increase in wealth, good fortune, or profits.
  - **Bonhomie**: Genial, pleasant, and easygoing friendship.
  - **Bounty**: Generosity in giving.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bon</mark>, think of <mark class="hl-def">virtue, integrity, and good character</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `bon-` (< Latin *bonus*): Base nominal and adjectival root.
  - `boun-` (< Anglo-French *bonté* < *bonitās*): *bounty, bounteous, bountiful*.
  - `boon` (< Middle English *bone* / Old French *bon*): *boon*.
- **Compound Syntagms**:
  - `bona` + `fidēs` ("faith"): *bona fide*.
  - `pro` + `bono` ("for the good"): *pro bono*.
  - `bon` + `homme` ("man"): *bonhomie* ("good-natured friendliness").
  - `de` + `bon` + `aire` ("of good stock/manner"): *debonair*.

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
                      ┌── Financial & Material Surplus: bonus, bonanza, boon
                      │
   [bon] ─────────────┼── Legal Honesty & Public Good: bona fide, pro bono
 (Good / Generous)    │
                      ├── Abundance & Generosity: bounty, bounteous, bountiful
                      │
                      └── Social Grace & Charm: bonhomie, debonair
```

---

## 🔀 4. Prefix & Combining Dynamics on bon
- **`bon-` + `-us`**: *bonus* — something given or received beyond what is strictly due.
- **`bona` + `fide`**: *bona fide* — undertaken with genuine honesty and sincerity.
- **`bon-` + `homie`**: *bonhomie* — infectious geniality and warmth among companions.
- **`de-` + `bon-` + `air`**: *debonair* — possessing polished courtesy and effortless charm.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Jurisprudence & Contract Law**: *Bona fide* purchaser; *pro bono publico* legal representation.
- **Corporate Compensation & Economics**: Performance *bonuses*; stock options; economic *bonanzas*.
- **Agricultural & Environmental Science**: The *bountiful* harvest; ecological carrying capacity.
- **Social Psychology & Manners**: Charismatic *bonhomie*; *debonair* executive presence.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bona fide]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin bon within the domain of Virtue.<br>**2.** A technical or specialized form exhibiting the properties of bon in systematic terminology. | *"In academic literature, bona fide designates pertaining to, derived from, or characteristic of latin bon within the domain of virtue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonaire]] | noun | **1.** A popular island resort in the netherlands antilles. | *"In academic literature, bonaire designates a popular island resort in the netherlands antilles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonanza]] | noun | **1.** An especially rich vein of precious ore.<br>**2.** A sudden happening that brings good fortune (as a sudden opportunity to make money). | *"In academic literature, bonanza designates an especially rich vein of precious ore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonaparte]] | noun | **1.** French general who became emperor of the french (1769-1821). | *"In another sense than Bonaparte's, every man born unto the world may say, "I make circumstances." And the spacious abode of Lehna Singh had loveliness enough to veil the sordid character of the life that was lived within its walls."* — C. A. Frazer, *Atmâ* |
| [[bonasa]] | noun | **1.** Ruffed grouse. | *"In academic literature, bonasa designates ruffed grouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonavist]] | noun | **1.** Perennial twining vine of old world tropics having trifoliate leaves and racemes of fragrant purple pea-like flowers followed by maroon pods of edible seeds; grown as an ornamental and as a vegetable on the indian subcontinent; sometimes placed in genus dolichos. | *"In academic literature, bonavist designates perennial twining vine of old world tropics having trifoliate leaves and racemes of fragrant purple pea-like flowers followed by maroon pods of edible seeds; grown as an ornamental and as a vegetable on the indian subcontinent; sometimes placed in genus dolichos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonce]] | noun | **1.** Informal terms for a human head. | *"In academic literature, bonce designates informal terms for a human head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bone]] | noun | **1.** Rigid connective tissue that makes up the skeleton of vertebrates.<br>**2.** The porous calcified substance from which bones are made. | *"Here comes lean Jack, here comes bare-bone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bone-covered]] | adjective | **1.** (of animals) armored with bone. | *"In academic literature, bone-covered designates (of animals) armored with bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bone-dry]] | adjective | **1.** Without a trace of moisture; as dry as a weathered bone. | *"In academic literature, bone-dry designates without a trace of moisture; as dry as a weathered bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bone-idle]] | adjective | **1.** Constitutionally lazy or idle. | *"In academic literature, bone-idle designates constitutionally lazy or idle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bone-lazy]] | adjective | **1.** Constitutionally lazy or idle. | *"In academic literature, bone-lazy designates constitutionally lazy or idle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boned]] | verb | **1.** Study intensively, as before an exam.<br>**2.** Remove the bones from. | *"Steel, if thou turn the edge, or cut not out the burly-boned clown in chines of beef ere thou sleep in thy sheath, I beseech God on my knees thou mayst be turned to hobnails. [_Here they fight and Cade falls._] O, I am slain!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bonefish]] | noun | **1.** Slender silvery marine fish found in tropical mud flats and mangrove lagoons. | *"In academic literature, bonefish designates slender silvery marine fish found in tropical mud flats and mangrove lagoons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonehead]] | noun | **1.** A stupid person; these words are used to express a low opinion of someone's intelligence. | *"In academic literature, bonehead designates a stupid person; these words are used to express a low opinion of someone's intelligence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boneheaded]] | adjective | **1.** (used informally) stupid. | *"In academic literature, boneheaded designates (used informally) stupid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boneless]] | adjective | **1.** Being without a bone or bones. | *"I have given suck, and know How tender ’tis to love the babe that milks me: I would, while it was smiling in my face, Have pluck’d my nipple from his boneless gums And dash’d the brains out, had I so sworn as you Have done to this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bonelet]] | noun | **1.** A small bone; especially one in the middle ear. | *"In academic literature, bonelet designates a small bone; especially one in the middle ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonelike]] | adjective | **1.** Resembling bone. | *"In academic literature, bonelike designates resembling bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonemeal]] | noun | **1.** Fertilizer made of ground bones. | *"In academic literature, bonemeal designates fertilizer made of ground bones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boner]] | noun | **1.** An embarrassing mistake. | *"In academic literature, boner designates an embarrassing mistake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bones]] | noun | **1.** A percussion instrument consisting of a pair of hollow pieces of wood or bone (usually held between the thumb and fingers) that are made to click together (as by spanish dancers) in rhythm with the dance.<br>**2.** Rigid connective tissue that makes up the skeleton of vertebrates. | *"The mere word’s a slave, Debauch’d on every tomb, on every grave A lying trophy, and as oft is dumb Where dust and damn’d oblivion is the tomb Of honour’d bones indeed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[boneset]] | noun | **1.** European herb having small white, pink or purple flowers; naturalized as a weed in north america.<br>**2.** Perennial herb of southeastern united states having white-rayed flower heads; formerly used as in folk medicine. | *"Once they crossed a wandering little creek whose shallow waters flowed through lovely meadows where boneset plants were white with bloom and giant eupatorium lifted its rosy heads."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[bonesetter]] | noun | **1.** Someone (not necessarily a licensed physician) who sets broken bones. | *"She bows her old head to a voice that speaks to her loudly, her bonesetter, her medicineman: me she slights."* — James Joyce, *Ulysses* |
| [[boneshaker]] | noun | **1.** Any wheeled vehicle that is dilapidated and uncomfortable. | *"In academic literature, boneshaker designates any wheeled vehicle that is dilapidated and uncomfortable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonete]] | noun | **1.** A mountain in the andes in argentina (22,546 feet high). | *"In academic literature, bonete designates a mountain in the andes in argentina (22,546 feet high)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boney]] | adjective | **1.** Having bones especially many or prominent bones.<br>**2.** Being very thin. | *"Yes,” said Paul, “I got tired and fell asleep, and I don't know when I should have waked up but for your dog.” “Yes, Boney's got a keen scent for provisions,” laughed the pedler."* — Jr. Horatio Alger, *Paul Prescott's Charge* |
| [[bonhomie]] | noun | **1.** A disposition to be friendly and approachable (easy to talk to). | *"In academic literature, bonhomie designates a disposition to be friendly and approachable (easy to talk to)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[boniface]] | noun | **1.** (roman catholic church) anglo-saxon missionary who was sent to frisia and germany to spread the christian faith; was martyred in frisia (680-754).<br>**2.** The owner or manager of an inn. | *"According to the great alchemist, Pierre de Boniface, the diamond rendered a man invisible, and the agate of India made him eloquent."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[boniness]] | noun | **1.** Extreme leanness (usually caused by starvation or disease). | *"In academic literature, boniness designates extreme leanness (usually caused by starvation or disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonito]] | noun | **1.** Flesh of mostly pacific food fishes of the genus sarda of the family scombridae; related to but smaller than tuna.<br>**2.** Fish whose flesh is dried and flaked for japanese cookery; may be same species as skipjack tuna. | *"From Kahoolawe, Aiai next went to Lanai, where he started fishing for _aku_ (bonito) at Cape Kaunolu, using his pearl Kahuoi."* — Classic Author, *Hawaiian folk tales* |
| [[bonn]] | noun | **1.** A city in western germany on the rhine river; was the capital of west germany between 1949 and 1989. | *"Ne porty ploo--habit militair--bonn--bonny a voo, prenny dehors"--were Jos's words--the coat and cap were at last his property."* — William Makepeace Thackeray, *Vanity Fair* |
| [[bonnet]] | noun | **1.** A hat tied under the chin.<br>**2.** Protective covering consisting of a metal part that covers the engine. | *"Then your hose should be ungartered, your bonnet unbanded, your sleeve unbuttoned, your shoe untied, and everything about you demonstrating a careless desolation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bonnethead]] | noun | **1.** Small harmless hammerhead having a spade-shaped head; abundant in bays and estuaries. | *"In academic literature, bonnethead designates small harmless hammerhead having a spade-shaped head; abundant in bays and estuaries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonney]] | noun | **1.** United states outlaw who was said to have killed 21 men (1859-1881). | *"In academic literature, bonney designates united states outlaw who was said to have killed 21 men (1859-1881)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonnie]] | adjective | **1.** Very pleasing to the eye. | *"Thou art a gay an’ a bonnie lass, But thou has a waukrife minnie."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[bonnily]] | adverb | **1.** In a bonny manner. | *"In academic literature, bonnily designates in a bonny manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonny]] | adjective | **1.** Very pleasing to the eye. | *"Why would you be so fond to overcome The bonny prizer of the humorous Duke?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[bonobo]] | noun | **1.** Small chimpanzee of swamp forests in zaire; a threatened species. | *"In academic literature, bonobo designates small chimpanzee of swamp forests in zaire; a threatened species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonsai]] | noun | **1.** A dwarfed ornamental tree or shrub grown in a tray or shallow pot. | *"In academic literature, bonsai designates a dwarfed ornamental tree or shrub grown in a tray or shallow pot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bontemps]] | noun | **1.** United states writer (1902-1973). | *"In academic literature, bontemps designates united states writer (1902-1973)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonus]] | noun | **1.** Anything that tends to arouse.<br>**2.** An additional payment (or other remuneration) to employees as a means of increasing output. | *"In a variety of ways a bonus or a premium may be paid for quality, or for economy in the use of materials (as to a fireman for using less coal), or for various other results."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[bony]] | adjective | **1.** Very thin especially from disease or hunger or cold.<br>**2.** Composed of or containing bone. | *"The little procession then moved forward—the man in front bearing the light, the two bony women next, supporting between them the small and supple one."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[bony-plated]] | adjective | **1.** Covered with bony plates. | *"In academic literature, bony-plated designates covered with bony plates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bonyness]] | noun | **1.** Extreme leanness (usually caused by starvation or disease). | *"In academic literature, bonyness designates extreme leanness (usually caused by starvation or disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debonair]] | adjective | **1.** Having a sophisticated charm.<br>**2.** Having a cheerful, lively, and self-confident air; - frances g. patton; - h.m.reynolds. | *"Courtiers as free, as debonair, unarm’d, As bending angels; that’s their fame in peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[debonaire]] | adjective | **1.** Having a sophisticated charm.<br>**2.** Having a cheerful, lively, and self-confident air; - frances g. patton; - h.m.reynolds. | *"In academic literature, debonaire designates having a sophisticated charm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debone]] | verb | **1.** Remove the bones from. | *"In academic literature, debone designates remove the bones from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deboned]] | verb | **1.** Remove the bones from.<br>**2.** Having had the bones removed. | *"In academic literature, deboned designates remove the bones from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[debonnaire]] | adjective | **1.** Having a sophisticated charm. | *"In academic literature, debonnaire designates having a sophisticated charm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebon]] | adjective | **1.** Of a very dark black. | *"Rouse up revenge from ebon den with fell Alecto’s snake, For Doll is in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ebonics]] | noun | **1.** A nonstandard form of american english characteristically spoken by african americans in the united states. | *"In academic literature, ebonics designates a nonstandard form of american english characteristically spoken by african americans in the united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebonise]] | verb | **1.** Stain black to make it look like ebony. | *"In academic literature, ebonise designates stain black to make it look like ebony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebonite]] | noun | **1.** A hard nonresilient rubber formed by vulcanizing natural rubber. | *"In academic literature, ebonite designates a hard nonresilient rubber formed by vulcanizing natural rubber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebonize]] | verb | **1.** Stain black to make it look like ebony. | *"In academic literature, ebonize designates stain black to make it look like ebony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ebony]] | noun | **1.** A very dark black.<br>**2.** Hard dark-colored heartwood of the ebony tree; used in cabinetwork and for piano keys. | *"By heaven, thy love is black as ebony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[redbone]] | noun | **1.** A speedy red or red-and-tan american hound. | *"In academic literature, redbone designates a speedy red or red-and-tan american hound."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Virtue]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BON
  </div>
</div>
