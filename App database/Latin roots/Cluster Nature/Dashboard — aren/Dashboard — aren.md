---
status: unread
type: root_dashboard
---
# Dashboard — aren
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">aren-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sand”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **aren** means sand. It refers to grains of sand, a sandy shore, or open soil. In English, this root forms words such as *arena*, *arenaceous*, *arenaceousness*, and *arenose*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sand
> The root **aren** means sand. It refers to grains of sand, a sandy shore, or open soil. In English, this root forms words such as *arena*, *arenaceous*, *arenaceousness*, and *arenose*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Sand</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *arena* and *arenaceous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aren** comes from a Latin word that means *"sand"*.
  - At its core, it describes sand.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **aren** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of sand.
  - **Mental & Social**: How people experience, organize, or communicate about sand.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Arena**: A central amphitheater floor covered with sand for gladiatorial shows.
  - **Arenaceous**: Composed of, resembling, or containing sand.
  - **Arenaceousness**: The state or quality of being arenaceous.
  - **Arenose**: An everyday English word showing the root's idea of *sand*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aren</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **aren** generates words through Latin nominal and adjectival derivatives:
> - **Direct Base Noun `arena`:**
>   - Transferred into English via French/Italian as the noun for sports complexes and political forums (*arena*).
> - **Adjectival Stems `arenace-` and `arenos-`:**
>   - Latin *arēnāceus* $\to$ English *arenaceous* (sandy, rock-composed).
>   - Latin *arēnōsus* $\to$ English *arenose* (full of sand).
> - **Combining Form `areni-`:**
>   - Compounding with Latin verbs: *arēna* + *colere* ("to dwell") $\to$ *arenicolous* (sand-inhabiting).
>   - Mineralogical suffixation: *arēna* + *-ite* $\to$ *arenite* (sandstone rock).
>   - Neo-classical disciplinary suffixation: *arēna* + *-logy* $\to$ *arenology* (the study of sand).

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
> - **Civic & Architectural Stage:** Modern sports stadiums, entertainment venues, and battlegrounds of public policy (*arena*).
> - **Sedimentary Geology & Petrology:** Clastic rocks composed of silicate sand grains, sandstone formations, and grain-size sorting (*arenaceous*, *arenite*, *arenose*).
> - **Sedimentological Science:** The specialized investigation of dune physics, coastal grain morphology, and sand transport (*arenology*).
> - **Marine Ecology & Invertebrate Zoology:** Animals adapted to living in or burrowing through sand along intertidal beaches (*arenicolous*, e.g., the lugworm *Arenicola marina*).

---

## 🔀 4. Prefix & Combining Dynamics on aren

### Prefix Dynamics
- *Note:* Because *arēna* is a concrete noun, it does not combine with verbal directional prefixes (`con-`, `ex-`, `re-`). Its derivatives are formed via compounding and nominal/adjectival suffixes.

### Suffix Dynamics
- **`-aceous` (Resembling / Full of):** *arenaceous* $\to$ having the properties or texture of sand.
- **`-ose` (Abundant in):** *arenose* $\to$ gritty, full of loose sand.
- **`-ite` (Mineral / Rock Type):** *arenite* $\to$ sandstone sedimentary rock.
- **`-colous` (*colere* "to inhabit"):** *arenicolous* $\to$ dwelling in sandy environments.
- **`-ology` (Field of Study):** *arenology* $\to$ the scientific study of sand deposits.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Sedimentary Petrology & Stratigraphy:** Classification of terrigenous clastic rocks—distinguishing *arenites* (<15% matrix) from *wackes* (>15% matrix), and evaluating *arenaceous* reservoir rocks for petroleum and aquifer potential.
> - **Architecture & Sports Management:** Design and acoustics of modern multi-purpose sports *arenas*, retractable domes, and crowd circulation logistics.
> - **Marine Zoology & Benthic Ecology:** The physiological adaptations of *arenicolous* organisms (annelid lugworms, mole crabs, razor clams) that maintain burrows against wave erosion.
> - **Coastal Geomorphology:** Aeolian sand dune migration, coastal barrier spit dynamics, and *arenological* beach renourishment engineering.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arena]] | noun | **1.** A particular environment or walk of life.<br>**2.** The central area of an ancient roman amphitheater where contests and spectacles were held; especially an area that was strewn with sand. | *"Among his fellow-students his reputation was maintained not merely by the honours he gained in the class lists, but by his prowess in the debating arena."* — John Cairns, *Principal Cairns* |
| [[arenaceous]] | adjective | **1.** Resembling or containing or abounding in sand; or growing in sandy areas. | *"In academic literature, arenaceous designates resembling or containing or abounding in sand; or growing in sandy areas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenaria]] | noun | **1.** Sandworts.<br>**2.** Turnstones. | *"In academic literature, arenaria designates sandworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenaria-melanocephala]] | noun | **1.** Common turnstone of the pacific coast of north america. | *"In academic literature, arenaria-melanocephala designates common turnstone of the pacific coast of north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenaviridae]] | noun | **1.** A family of arborviruses carried by arthropods. | *"In academic literature, arenaviridae designates a family of arborviruses carried by arthropods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenavirus]] | noun | **1.** Animal viruses belonging to the family arenaviridae. | *"In academic literature, arenavirus designates animal viruses belonging to the family arenaviridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenicolous]] | adjective | **1.** Growing or living or burrowing in sand. | *"In academic literature, arenicolous designates growing or living or burrowing in sand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenology]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin aren within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of aren in systematic terminology. | *"In academic literature, arenology designates pertaining to, derived from, or characteristic of latin aren within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arenose]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin aren within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of aren in systematic terminology. | *"In academic literature, arenose designates pertaining to, derived from, or characteristic of latin aren within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parenthesis]] | noun | **1.** Either of two punctuation marks (or) used to enclose textual material.<br>**2.** A message that departs from the main subject. | *"Aye, aye!” and opened and read it with evident pleasure, announcing to us in a parenthesis when he was about half-way through, that Boythorn was “coming down” on a visit."* — Charles Dickens, *Bleak House* |
| [[parenthetic]] | adjective | **1.** Qualifying or explaining; placed or as if placed in parentheses. | *"Mother, why did our grand relation keep on putting his hand up to his mistarshers?” “Hark at that child!” cried Mrs Durbeyfield, with parenthetic admiration."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parenthetical]] | noun | **1.** An expression in parentheses.<br>**2.** Qualifying or explaining; placed or as if placed in parentheses. | *"What could the wretched Joe do now, after his disregarded parenthetical interruptions, but stand up to his journeyman, and ask him what he meant by interfering betwixt himself and Mrs."* — Charles Dickens, *Great Expectations* |
| [[parenthetically]] | adverb | **1.** In a parenthetical manner. | *"Vholes parenthetically, “I believe I have already mentioned."* — Charles Dickens, *Bleak House* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AREN
  </div>
</div>
