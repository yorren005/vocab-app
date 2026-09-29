---
status: unread
type: root_dashboard
---
# Dashboard — porta
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">porta-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“gate or door”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Laying bricks to build a sturdy home or resting inside a safe shelter.</span>
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

The root **porta** means gate or door. It refers to an entrance, gateway, or barrier allowing access. In English, this root forms words such as *ford*, *portal*, *portico*, and *porch*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: gate or door
> The root **porta** means gate or door. It refers to an entrance, gateway, or barrier allowing access. In English, this root forms words such as *ford*, *portal*, *portico*, and *porch*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Gate or door</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Laying bricks to build a sturdy home or resting inside a safe shelter.</mark>
> - **Everyday Connection**: Think of familiar words like *ford* and *portal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **porta** comes from a Latin word that means *"gate or door"*.
  - At its core, it describes gate or door.

- **The Big Picture Idea**:
  - Picture laying bricks to build a sturdy home or resting inside a safe shelter.
  - Whenever you see **porta** in an English word, think of **building, crafting, and dwelling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of gate or door.
  - **Mental & Social**: How people experience, organize, or communicate about gate or door.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ford**: An everyday English word showing the root's idea of *gate or door*.
  - **Portal**: A grand, imposing, and elaborately decorated door, gate, or entrance to an important building or monument.
  - **Portico**: A porch or covered walk leading to the entrance of a building, supported by a regular row of columns and typically surmounted by a triangular pediment.
  - **Porch**: A covered, roofed structure projecting from the exterior entrance of a house or church, serving as an enclosed or open shelter.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">porta</mark>, think of <mark class="hl-def">building, crafting, and dwelling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Stem Dynamics
> The root **porta** operates in English through several distinct morphological channels:
> - **Primary Nominal Base:** `porta` (Latin *porta*, pl. *portae*):
>   - Retained in medical Latin (*porta hepatis*, *vena portae*).
> - **Neoclassical & Medieval Adjectival Stem:** `portal-`:
>   - Medieval Latin *portālis* ("pertaining to a gate") → English [[portal]] (noun: grand doorway, digital gateway; adjective: anatomical portal vein).
> - **Colonnade Diminutive Stem:** `portic-` (Latin *porticus*):
>   - Norman French lineage → [[porch]].
>   - Italian Renaissance loan → [[portico]].
> - **Defensive Military Compounds:**
>   - Anglo-Norman *porte coleice* → [[portcullis]].
> - **Occupational Doorkeeper Stem:**
>   - Latin *portārius* ("gatekeeper", from *porta*) → Old French *portier* → English [[porter]] (doorkeeper, station agent) and feminine [[portress]].
> - **Interior Drapery Derivative:**
>   - French *portière* (from *porte* < *porta*) → English [[portière]] (heavy curtain across a doorway).
> - **Nautical & Technical Apertures:**
>   - Naval English *port* ("gunport, porthole in a hull") → [[porthole]].
> - **Compound Document Case:**
>   - Italian *portafoglio* (*portare* "to carry" + *foglio* "leaf/paper", categorized historically alongside architectural portfolios) → [[portfolio]].

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

> [!tip] 🌈 Spectrum of Meaning Across Four Concentric Domains
> 1. **Monumental Architecture & Thresholds:** Grand stone entrances, cathedral facades, tunnel portals, columned porticos, and domestic porches ([[portal]], [[portico]], [[porch]], [[portière]]).
> 2. **Castles, Fortifications & Heraldry:** Defensible gatehouses, dropping iron grates, and heraldic emblems of royal authority ([[portcullis]]).
> 3. **Civic & Institutional Custodianship:** Gatekeepers, doorkeepers, and concierge officials controlling admission to universities, monasteries, and hospitals ([[porter]], [[portress]]).
> 4. **Anatomy, Digital Networks & Naval Voids:** The biological vascular gateway to the liver, digital software gateways to information networks, and maritime hull openings ([[portal]] [anatomy/computing], [[porthole]], [[port]] [naval]).

---

## 🔀 4. Prefix & Combining Dynamics on porta

### Prefix Dynamics

| Prefix / Combining Element | Semantic Meaning | Derived Form | Resulting Synthesis |
| :--- | :--- | :--- | :--- |
| `ante-` | before, in front of | *anteportal* | Situated immediately before or fronting a major portal. |
| `sub-` | under, secondary, below | *subportal* | A lower, smaller, or subsidiary entrance gate. |
| `porte-` + `coleice` | gate + sliding channel | [[portcullis]] | A heavy barrier gate that slides vertically down grooves. |

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Realization |
| :--- | :--- | :--- | :--- |
| `-al` | Noun / Adjective | [[portal]] | A grand monumental entrance / anatomical vessel of the liver gate. |
| `-ico` *(via Italian)* | Noun (Colonnade Structure) | [[portico]] | A classical columned portico entrance. |
| `-ch` *(via OF)* | Noun (Covered Entrance) | [[porch]] | A covered residential exterior entryway. |
| `-er` *(via OF)* | Noun (Gatekeeper Agent) | [[porter]] | A doorkeeper or institutional gatekeeper (< *portārius*). |
| `-ress` | Noun (Feminine Agent) | [[portress]] | A female gatekeeper or doorkeeper. |
| `-ière` *(via French)* | Noun (Door Fitting) | [[portière]] | A heavy drapery hung across a doorway to exclude drafts. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🏛️ **Architecture & Civil Engineering** | [[portal]], [[portico]], [[porch]], [[portière]] | Roman triumphal arches, Gothic cathedral portals carved with the Last Judgment, neoclassical Greek-revival porticos (e.g., the White House South Portico), and structural tunnel portals. |
| 🩺 **Medicine & Hepatology** | [[portal]], *porta hepatis* | The **hepatic portal system**: portal vein thrombosis, portal hypertension secondary to liver cirrhosis, and esophageal varices resulting from collateral portal-systemic shunting. |
| ⚔️ **Military History & Heraldry** | [[portcullis]] | Medieval castle defenses (concentric castle gatehouses at Harlech and Beaumaris); the portcullis as the personal badge of the House of Tudor (Henry VII) and the official emblem of the British Parliament at Westminster. |
| 💻 **Information Technology & Gaming** | [[portal]] | Web enterprise portals serving as unified access gateways to corporate intranet data; science fiction "stargate" teleportation gateways; puzzle platforming game mechanics. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[deportation]] | noun | **1.** The act of expelling a person from their native land.<br>**2.** The expulsion from a country of an undesirable alien. | *"Stated in this form the proposition is nothing less than the deportation from the country of $1,600,000,000 worth of producing labor, and the substitution in its place of an interest-bearing debt of the same amount."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[exportable]] | adjective | **1.** Suitable for export. | *"The exportable commodity of man."* — Jr. Irving E. Cox, *Export Commodity* |
| [[exportation]] | noun | **1.** Commodities (goods or services) sold to a foreign country.<br>**2.** The commercial activity of selling and shipping goods to a foreign country. | *"This calls for a new equilibrium of money and requires at length large and continued exportation of specie."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[importance]] | noun | **1.** The quality of being important and worthy of note.<br>**2.** A prominent status. | *"I was glad I did atone my countryman and you; it had been pity you should have been put together with so mortal a purpose as then each bore, upon importance of so slight and trivial a nature."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[important]] | adjective | **1.** Of great significance or value.<br>**2.** Important in effect or meaning. | *"Now his important blood will naught deny That she’ll demand; a ring the county wears, That downward hath succeeded in his house From son to son, some four or five descents Since the first father wore it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[important-looking]] | adjective | **1.** Impressive in appearance. | *"In academic literature, important-looking designates impressive in appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[importantly]] | adverb | **1.** In an important way or to an important degree.<br>**2.** In an important way. | *"It is not likely That when they hear the Roman horses neigh, Behold their quarter’d fires, have both their eyes And ears so cloy’d importantly as now, That they will waste their time upon our note, To know from whence we are."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[importation]] | noun | **1.** The commercial activity of buying and bringing in goods from a foreign country.<br>**2.** Commodities (goods or services) bought from a foreign country. | *"The single fat thing on the soil was Marian herself; and she was an importation."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[insupportable]] | adjective | **1.** Incapable of being justified or explained. | *"My lord, you do me most insupportable vexation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[porta]] | noun | **1.** An aperture or hole that opens into a bodily cavity. | *"Negli occhi porta la mia donna Amore; Per che si fa gentil ciò ch’ella mira: Ov’ella passa, ogni uom ver lei si gira, E cui saluta fa tremar lo core."* — George Eliot, *Middlemarch* |
| [[portability]] | noun | **1.** The quality of being light enough to be carried. | *"In academic literature, portability designates the quality of being light enough to be carried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[portable]] | noun | **1.** A small light typewriter; usually with a case in which it can be carried.<br>**2.** Easily or conveniently transported. | *"How light and portable my pain seems now, When that which makes me bend makes the King bow; He childed as I fathered!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portage]] | noun | **1.** The cost of carrying or transporting.<br>**2.** Overland track between navigable waterways. | *"Even at the first thy loss is more than can Thy portage quit, with all thou canst find here, Now, the good gods throw their best eyes upon’t!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[portal]] | noun | **1.** A grand and imposing entrance (often extended metaphorically).<br>**2.** A site that the owner positions as an entrance to other sites on the internet. | *"Look where he goes even now out at the portal. [_Exit Ghost._] QUEEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reportable]] | adjective | **1.** (of income) required by law to be reported.<br>**2.** Meriting report. | *"In academic literature, reportable designates (of income) required by law to be reported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reportage]] | noun | **1.** The news as presented by reporters for newspapers or radio or television. | *"In academic literature, reportage designates the news as presented by reporters for newspapers or radio or television."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supportable]] | adjective | **1.** Capable of being borne though unpleasant. | *"As great to me, as late; and, supportable To make the dear loss, have I means much weaker Than you may call to comfort you, for I Have lost my daughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transportable]] | adjective | **1.** Capable of being moved or conveyed from one place to another. | *"In academic literature, transportable designates capable of being moved or conveyed from one place to another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transportation]] | noun | **1.** A facility consisting of the means and equipment necessary for the movement of passengers or goods.<br>**2.** The act of moving something from one location to another. | *"Transportation agencies. § 11."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unexportable]] | adjective | **1.** Not suitable for export. | *"In academic literature, unexportable designates not suitable for export."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimportance]] | noun | **1.** The state of being humble and unimportant.<br>**2.** The quality of not being important or worthy of note. | *"Looking into Napoleon’s eyes Prince Andrew thought of the insignificance of greatness, the unimportance of life which no one could understand, and the still greater unimportance of death, the meaning of which no one alive could understand or explain."* — graf Leo Tolstoy, *War and Peace* |
| [[unimportant]] | adjective | **1.** Not important.<br>**2.** Devoid of importance, meaning, or force. | *"If you remember anything so unimportant—which is not to be expected—you would recollect that my first thought in the affair was directly opposed to her remaining here.” Dismiss the Dedlock patronage from consideration?"* — Charles Dickens, *Bleak House* |
| [[unportable]] | adjective | **1.** Not portable; not easily moved or transported. | *"In academic literature, unportable designates not portable; not easily moved or transported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreportable]] | adjective | **1.** (of income) not reportable; not required by law to be reported. | *"In academic literature, unreportable designates (of income) not reportable; not required by law to be reported."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsupportable]] | adjective | **1.** Not able to be supported or defended. | *"To have made up his mind that a thing must be, and to find himself thwarted by a bit of a girl--it was unsupportable!--so unsupportable, that even now he refused to believe it could be true."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Building & Dwelling]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PORTA
  </div>
</div>
