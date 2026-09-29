---
status: unread
type: root_dashboard
---
# Dashboard — colon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">colon-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“settler or farmer”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Neighbors working together in a shared neighborhood to help one another.</span>
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

The root **colon** means settler or farmer. It refers to settling in a new territory, tilling the land, or farming. In English, this root forms words such as *native*, *indigenous*, *colonial*, and *colonialism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: settler or farmer
> The root **colon** means settler or farmer. It refers to settling in a new territory, tilling the land, or farming. In English, this root forms words such as *native*, *indigenous*, *colonial*, and *colonialism*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Settler or farmer</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *native* and *indigenous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **colon** comes from a Latin word that means *"settler or farmer"*.
  - At its core, it describes settler or farmer.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **colon** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of settler or farmer.
  - **Mental & Social**: How people experience, organize, or communicate about settler or farmer.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Native**: An everyday English word showing the root's idea of *settler or farmer*.
  - **Indigenous**: An everyday English word showing the root's idea of *settler or farmer*.
  - **Colonial**: Relating to a colony, especially the period before a nation's independence. 2. A person living in a colony.
  - **Colonialism**: The policy or practice of acquiring full or partial political control over another country, occupying it with settlers, and exploiting it economically.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">colon</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *colony* $\to$ *colonial*, *colonist*.
- **Ideological & Process Suffixes (`-ism` / `-ize`):**
  - *colonial* + *-ism* $\to$ *colonialism*.
  - *colon* + *-ize* $\to$ *colonize*, *colonization*.
- **Reversal Prefixation (`de-`):**
  - `de-` + *colonize* $\to$ *decolonize*, *decolonization*.

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

### 1. Imperial Governance & Settlement
- *colony* (a country or area under the full or partial political control of another country; a group of people of one nationality living in a foreign city).
- *colonist* (a settler in or inhabitant of a colony).
- *colonial* (relating to a colony, especially the period before independence).
- *colonialism* (the policy or practice of acquiring full or partial political control over another country).

### 2. Biology & Microbiology
- *colony* (a community of animals or plants of one kind living and growing together, such as ants or bacterial cultures).
- *colonize* (in biology, to establish oneself in an area or habitat).
- *colonization* (the action by a plant or animal of establishing itself in an area).

### 3. Independence & Sovereignty
- *decolonize* (free a colony from dependent status).
- *decolonization* (the action or process of a state withdrawing from a former colony, leaving it independent).

---

## 🔀 4. Prefix & Combining Dynamics on colon

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `colon-` + `-y` | Concrete entity | An overseas settlement, territory, or biological cluster | *colony* |
| `colon-` + `-ist` | Agentive settler | An individual emigrant settling permanently in a new outpost | *colonist* |
| `colon-` + `-ial-ism` | Ideological system | Imperial exploitation and political domination of colonies | *colonialism* |
| `colon-` + `-ize` | Factitive verb | Establishing settlers or biological populations in a new habitat | *colonize* |
| `de-` + `colonize` | Reversal prefixation | Dismantling foreign administrative rule; granting independence | *decolonize, decolonization* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Geopolitics & Postcolonial Theory:** Frantz Fanon, Edward Said's *Orientalism*, post-war African decolonization.
- **Microbiology & Laboratory Diagnostics:** Bacterial colony-forming units (CFU), agar plate streaking.
- **Entomology & Sociobiology:** Eusocial insect colonies (honeybees, army ants, termites).
- **Urban Toponymy:** The Roman origin of European cities (Cologne, Lincoln, Colchester).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[colon]] | noun | **1.** The part of the large intestine between the cecum and the rectum; it extracts moisture from food residues before they are excreted.<br>**2.** The basic unit of money in el salvador; equal to 100 centavos. | *"Colon was all of five feet eleven; in circumference, perhaps a score or so of inches."* — W. E. Webb, *Buffalo Land* |
| [[colonel]] | noun | **1.** A commissioned military officer in the united states army or air force or marines who ranks above a lieutenant colonel and below a brigadier general. | *"Snagsby whether he means Carrots, or the Colonel, or Gallows, or Young Chisel, or Terrier Tip, or Lanky, or the Brick."* — Charles Dickens, *Bleak House* |
| [[colonial]] | noun | **1.** A resident of a colony.<br>**2.** Of or relating to or characteristic of or inhabiting a colony. | *"But something had to be done; he had wasted many valuable years; and having an acquaintance who was starting on a thriving life as a Colonial farmer, it occurred to Angel that this might be a lead in the right direction."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[colonialism]] | noun | **1.** Exploitation by a stronger country of weaker one; the use of the weaker country's resources to strengthen and enrich the stronger country. | *"In academic literature, colonialism designates exploitation by a stronger country of weaker one; the use of the weaker country's resources to strengthen and enrich the stronger country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonialist]] | noun | **1.** A believer in colonialism. | *"In academic literature, colonialist designates a believer in colonialism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonic]] | noun | **1.** A water enema given to flush out the colon.<br>**2.** Of or relating to the colon. | *"In academic literature, colonic designates a water enema given to flush out the colon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonisation]] | noun | **1.** The act of colonizing; the establishment of colonies. | *"In academic literature, colonisation designates the act of colonizing; the establishment of colonies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonise]] | verb | **1.** Settle as a colony; of countries in the developing world.<br>**2.** Settle as colonists or establish a colony (in). | *"In academic literature, colonise designates settle as a colony; of countries in the developing world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonised]] | verb | **1.** Settle as a colony; of countries in the developing world.<br>**2.** Settle as colonists or establish a colony (in). | *"In academic literature, colonised designates settle as a colony; of countries in the developing world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coloniser]] | noun | **1.** Someone who helps to found a colony. | *"In academic literature, coloniser designates someone who helps to found a colony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonist]] | noun | **1.** A person who settles in a new colony or moves into new country. | *"Jaggers, still looking hard at me, “that he has received a letter, under date Portsmouth, from a colonist of the name of Purvis, or—” “Or Provis,” I suggested."* — Charles Dickens, *Great Expectations* |
| [[colonization]] | noun | **1.** The act of colonizing; the establishment of colonies. | *"The Mexican War was the result of the colonization of Texan territory by American settlers and the desire of powerful interests to extend the area of land open to slavery."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[colonize]] | verb | **1.** Settle as a colony; of countries in the developing world.<br>**2.** Settle as colonists or establish a colony (in). | *"What a country to attempt to colonize!"* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[colonized]] | verb | **1.** Settle as a colony; of countries in the developing world.<br>**2.** Settle as colonists or establish a colony (in). | *"The spinning-stick, a tool used in ancient times, developed into the Saxon spinning-wheel of the sixteenth century, the form used when America was colonized."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[colonizer]] | noun | **1.** Someone who helps to found a colony. | *"Hence they are good colonizers, able to work in Manchuria and Singapore, Canada and Panama."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[colonnade]] | noun | **1.** Structure consisting of a row of evenly spaced columns.<br>**2.** A structure composed of a series of arches supported by columns. | *"Kenge gave me his arm and we went round the corner, under a colonnade, and in at a side door."* — Charles Dickens, *Bleak House* |
| [[colonnaded]] | adjective | **1.** Having a series of columns arranged at regular intervals. | *"In academic literature, colonnaded designates having a series of columns arranged at regular intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonoscope]] | noun | **1.** An elongated fiberoptic endoscope for examining the entire colon from cecum to rectum. | *"In academic literature, colonoscope designates an elongated fiberoptic endoscope for examining the entire colon from cecum to rectum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonoscopy]] | noun | **1.** Visual examination of the colon (with a colonoscope) from the cecum to the rectum; requires sedation. | *"In academic literature, colonoscopy designates visual examination of the colon (with a colonoscope) from the cecum to the rectum; requires sedation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colony]] | noun | **1.** A body of people who settle far from home but maintain ties with their homeland; inhabitants remain nationals of their home state but are not literally under the home state's system of government.<br>**2.** A group of organisms of the same type living or growing together. | *"Behind dingy blind and curtain, in upper story and garret, skulking more or less under false names, false hair, false titles, false jewellery, and false histories, a colony of brigands lie in their first sleep."* — Charles Dickens, *Bleak House* |
| [[decolonisation]] | noun | **1.** The action of changing from colonial to independent status. | *"In academic literature, decolonisation designates the action of changing from colonial to independent status."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonise]] | verb | **1.** Grant independence to (a former colony). | *"In academic literature, decolonise designates grant independence to (a former colony)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonization]] | noun | **1.** The action of changing from colonial to independent status. | *"In academic literature, decolonization designates the action of changing from colonial to independent status."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decolonize]] | verb | **1.** Grant independence to (a former colony). | *"In academic literature, decolonize designates grant independence to (a former colony)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · COLON
  </div>
</div>
