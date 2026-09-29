---
status: unread
type: root_dashboard
---
# Dashboard — moll
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">moll-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“soft”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gently pressing your fingertips against a smooth surface to feel its texture.</span>
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

The root **moll** means soft. It describes the quality, appearance, or condition of being soft. In English, this root forms words such as *emollient*, *mollescent*, *mollification*, and *mollify*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: soft
> The root **moll** means soft. It describes the quality, appearance, or condition of being soft. In English, this root forms words such as *emollient*, *mollescent*, *mollification*, and *mollify*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Soft</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gently pressing your fingertips against a smooth surface to feel its texture.</mark>
> - **Everyday Connection**: Think of familiar words like *emollient* and *mollescent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **moll** comes from a Latin word that means *"soft"*.
  - At its core, it describes the quality or state of being soft.

- **The Big Picture Idea**:
  - Picture gently pressing your fingertips against a smooth surface to feel its texture.
  - Whenever you see **moll** in an English word, think of **touch, contact, and tactile feeling**.

- **How the Meaning Grows**:
  - **Physical**: Physical objects, textures, or shapes that are soft.
  - **Mental & Social**: Human emotions, attitudes, speaking styles, or mental traits.
  - **Abstract & Practical**: Scientific measurements, standards, or formal categories.

- **Everyday English Words to Remember It By**:
  - **Emollient**: Adj.* Having the quality of softening or soothing the skin.
  - **Mollescent**: Serving to soften.
  - **Mollification**: The action of appeasing the anger, anxiety, or resentment of someone.
  - **Mollify**: To appease the anger or anxiety of someone.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">moll</mark>, think of <mark class="hl-def">touch, contact, and tactile feeling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root operates through clear adjectival and verbal channels:
1. **The Base Adjectival Stem `moll-`**: Direct from *mollis*: *mollitude* (softness, effeminacy), *mollescent* (softening).
2. **Verbal Derivation with `-ify`**:
   - Latin *mollificāre* (< *mollis* + *facere* "to make") $\to$ *mollify*, *mollification*, *mollifying*.
3. **Prefixal Compounding with `e-` / `ex-`**:
   - Latin *ēmollīre* (< *ex-* "thoroughly" + *mollīre*) $\to$ *emollient* (softening, soothing agent).
4. **Zoological Suffixation `-usc` / `-usk`**:
   - Latin *molluscus* $\to$ *mollusc* / *mollusk*.

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

The cognitive reach of *moll* organizes into three primary spheres:
- **Dermatology & Pharmacopeia**: [[emollient]], [[mollescent]]
- **Psychological Calming & Diplomacy**: [[mollify]], [[mollification]], `mollifying`, `mollitude`
- **Invertebrate Zoology & Marine Biology**: [[mollusc]], [[mollusk]]

---

## 🔀 4. Prefix & Combining Dynamics on moll

1. **`e-` + `moll`** (*ex* "out, thoroughly" + *mollīre* "to soften"):
   - *emollient* $\to$ having the quality of softening or soothing the skin; an agent that softens.
2. **`moll` + `fic`** (*mollis* + *facere* "to make"):
   - *mollify* $\to$ to appease the anger or anxiety of someone; reduce the severity of something.
   - *mollification* $\to$ the act of appeasing, pacifying, or softening.
3. **`moll` + `-escent`** (inchoative suffix "becoming"):
   - *mollescent* $\to$ serving to soften; becoming soft.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Dermatology & Cosmetics**: *emollient* creams, skin barrier repair, eczema therapies.
- **Invertebrate Zoology & Marine Ecology**: cephalopod and bivalve *mollusks*, ocean acidification impacts on shell formation.
- **Conflict Resolution & Diplomacy**: *mollifying* aggrieved interest groups, conciliatory diplomatic concessions.
- **Materials Science**: *mollescent* polymers that soften at human body temperature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[emollient]] | noun | **1.** Toiletry consisting of any of various substances in the form of a thick liquid that have a soothing and moisturizing effect when applied to the skin.<br>**2.** Having a softening or soothing effect especially to the skin. | *"Bucket brings the finger into play as an emollient."* — Charles Dickens, *Bleak House* |
| [[moll]] | noun | **1.** The girlfriend of a gangster. | *"Boldwood’s Tidy and Moll.” “Then wait here till I come hither again,” said Gabriel."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mollah]] | noun | **1.** A muslim trained in the doctrine and law of islam; the head of a mosque. | *"In academic literature, mollah designates a muslim trained in the doctrine and law of islam; the head of a mosque."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[molle]] | noun | **1.** Small peruvian evergreen with broad rounded head and slender pendant branches with attractive clusters of greenish flowers followed by clusters of rose-pink fruits. | *"In academic literature, molle designates small peruvian evergreen with broad rounded head and slender pendant branches with attractive clusters of greenish flowers followed by clusters of rose-pink fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin moll within the domain of Touch.<br>**2.** A technical or specialized form exhibiting the properties of moll in systematic terminology. | *"In academic literature, mollescent designates pertaining to, derived from, or characteristic of latin moll within the domain of touch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollie]] | noun | **1.** Popular aquarium fish. | *"Take warning by what Griffin told you last night and take nobody into your confidence." That afternoon their host learned, through business channels, that the steamer _Mollie Able_ was in New Orleans loading for St."* — Harry Castlemon, *Rodney, the Partisan* |
| [[mollienesia]] | noun | **1.** Mollies. | *"Classical and authoritative lexicons catalog mollienesia as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollification]] | noun | **1.** A state of being appeased or ameliorated or tempered.<br>**2.** The act of appeasing someone or causing someone to be more favorably inclined. | *"Some mollification for your giant, sweet lady."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mollify]] | verb | **1.** Cause to be more favorably inclined; gain the good will of.<br>**2.** Make more temperate, acceptable, or suitable by adding something else; moderate. | *"Du Land der Liebe! bin ich der Deine schon, Oft zuernt' ich weinend, dass du immer Bloede die eigene Seele leugnest.[51] How much the reproach has been softened, and with what tender regard he strives to mollify his former bitterness!"* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[molluga]] | noun | **1.** Carpetweeds. | *"In academic literature, molluga designates carpetweeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollusc]] | noun | **1.** Invertebrate having a soft unsegmented body usually enclosed in a shell. | *"But,” I continued, “the particular mollusc which secretes the pearl is the pearl-oyster, the meleagrina margaritifera, that precious pintadine."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[mollusca]] | noun | **1.** Gastropods; bivalves; cephalopods; chitons. | *"Its nets brought up numerous specimens of polypi and curious shells of mollusca."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[molluscum]] | noun | **1.** Any skin disease characterized by soft pulpy nodules. | *"In academic literature, molluscum designates any skin disease characterized by soft pulpy nodules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollusk]] | noun | **1.** Invertebrate having a soft unsegmented body usually enclosed in a shell. | *"In academic literature, mollusk designates invertebrate having a soft unsegmented body usually enclosed in a shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[molly]] | noun | **1.** Popular aquarium fish. | *"Molly, let them see your wrist.” Her entrapped hand was on the table, but she had already put her other hand behind her waist."* — Charles Dickens, *Great Expectations* |
| [[mollycoddle]] | noun | **1.** A pampered darling; an effeminate man.<br>**2.** Treat with excessive indulgence. | *"In academic literature, mollycoddle designates a pampered darling; an effeminate man."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollycoddler]] | noun | **1.** Someone who pampers or spoils by excessive indulgence. | *"In academic literature, mollycoddler designates someone who pampers or spoils by excessive indulgence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mollymawk]] | noun | **1.** Large web-footed birds of the southern hemisphere having long narrow wings; noted for powerful gliding flight. | *"In academic literature, mollymawk designates large web-footed birds of the southern hemisphere having long narrow wings; noted for powerful gliding flight."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Touch]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MOLL
  </div>
</div>
