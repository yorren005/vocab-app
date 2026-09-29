---
status: unread
type: root_dashboard
---
# Dashboard — pop
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pop-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“people”</span>
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

The root **pop** means people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *depopulate*, *populace*, *popular*, and *popularity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: people
> The root **pop** means people. It refers to a community of persons, citizens, or a national population. In English, this root forms words such as *depopulate*, *populace*, *popular*, and *popularity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">People</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *depopulate* and *populace*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pop** comes from a Latin word that means *"people"*.
  - At its core, it describes people.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **pop** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of people.
  - **Mental & Social**: How people experience, organize, or communicate about people.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Depopulate**: To substantially reduce the number of people in an area through war, disease, or emigration.
  - **Populace**: The people living in a particular country or area.
  - **Popular**: Liked, admired, or enjoyed by many people or by a particular group.
  - **Popularity**: The state or condition of being liked, admired, or supported by many people.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pop</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Phonological Divergence & Stem Mapping
- **Direct Nominal Stem (*popul-*)**: Preserved directly in *populace*, *popular*, *population*, *populous*, *depopulate*, *popularize*, *unpopular*, *vox populi*.
- **The Classical Sound Shift (*poplicos* $\to$ *pūblicus*)**: Produced the entire English "public" branch: *public*, *republic*, *publicity*, *publication*.

### Morphological Product Matrix
```
Latin populus (a people, nation)
  │
  ├── popul- (direct demographic stem)
  │     ├── + -aris ──────────────> popularis ───────> popular, popularity, popularize, unpopular
  │     ├── + -atio ──────────────> populatio ───────> population, populous
  │     ├── + de- + -atus ────────> depopulāre ──────> depopulate
  │     ├── + -ace (via Italian) ─> popolaccio ──────> populace (the common people)
  │     └── vox populi (Latin idiom) ────────────────> vox populi
  │
  └── poplicos ──> Latin pūblicus (belonging to the people)
        │
        ├── pūblicus ────────────────────────────────> public
        └── rēs pūblica (public commonwealth) ───────> republic
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

### Thematic Spheres
1. **Demography & Human Settlement**: *population*, *populous*, *depopulate* (statistical numbers, urban density, human ecology).
2. **Social Affinity & Cultural Appeal**: *popular*, *popularity*, *popularize*, *unpopular* (widespread admiration, accessible knowledge, mass culture).
3. **The Common Citizenry**: *populace*, *vox populi* (the ordinary masses as a cultural or political collective).
4. **Constitutional Order & Civic Space**: *public*, *republic* (open communal governance, non-monarchical statehood).

---

## 🔀 4. Prefix & Combining Dynamics on pop

### Prefix Combinations
- **de- ("removal, reversal") + popul-**: Produces *depopulate* (to strip a territory of its human inhabitants through famine, war, or plague).
- **un- ("not") + popul-**: Produces *unpopular* (disliked or rejected by the general populace).
- **res ("thing, affair") + public-**: Produces *republic* (the sovereign commonwealth).

### Suffix Formations
- **-ar / -arity**: *popular*, *popularity* (state or quality of being favored by the people).
- **-ize / -ation**: *popularize*, *population* (dynamic process of spreading to the masses; demographic count).
- **-ous**: *populous* (densely filled with human beings).
- **-ace**: *populace* (the collective multitude).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Real-World Application | Key Vocabulary |
| :--- | :--- | :--- |
| **Demography & Urban Geography** | Census data, demographic transition models, urbanization | *population*, *populous*, *depopulate* |
| **Political Science & Statecraft** | Democratic theory, voter referendums, constitutional design | *republic*, *public*, *vox populi*, *popular sovereignty* |
| **Public Administration & Law** | Civil infrastructure, freedom of information, public sphere | *public policy*, *public sector*, *res publica* |
| **Media & Cultural Studies** | Mass communication, public relations, entertainment trends | *popularize*, *popularity*, *populace* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antipope]] | noun | **1.** Someone who is elected pope in opposition to another person who is held to be canonically elected. | *"In academic literature, antipope designates someone who is elected pope in opposition to another person who is held to be canonically elected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depopulate]] | verb | **1.** Reduce in population. | *"Where is this viper That would depopulate the city and Be every man himself?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[depopulated]] | verb | **1.** Reduce in population.<br>**2.** Having lost inhabitants as by war or disease. | *"They have already depopulated the whole of Baffin’s Bay, and are annihilating a class of useful animals."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[depopulation]] | noun | **1.** The condition of having reduced numbers of inhabitants (or no inhabitants at all). | *"A depopulation was also going on."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[overpopulate]] | verb | **1.** Cause to have too great a population. | *"Umney fainted. ‘What a monstrous climate!’ said the American Minister calmly, as he lit a long cheroot. ‘I guess the old country is so overpopulated that they have not enough decent weather for everybody."* — Oscar Wilde, *Lord Arthur Savile's Crime; The Portrait of Mr. W.H., and Other Stories* |
| [[overpopulation]] | noun | **1.** Too much population. | *"In academic literature, overpopulation designates too much population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pop]] | noun | **1.** An informal term for a father; probably derived from baby talk.<br>**2.** A sweet drink containing carbonated water and flavoring. | *"For Heaven’s sake, pop thy hands under the pump, Deb!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[popcorn]] | noun | **1.** Corn having small ears and kernels that burst when exposed to dry heat.<br>**2.** Small kernels of corn exploded by heat. | *"It's so you can sit on the kitchen floor and string popcorn to hang on the big tree at church."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[pope]] | noun | **1.** The head of the roman catholic church.<br>**2.** English poet and satirist (1688-1744). | *"Under my feet I’ll stamp thy cardinal’s hat; In spite of Pope or dignities of church, Here by the cheeks I’ll drag thee up and down."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[popery]] | noun | **1.** Offensive terms for the practices and rituals of the roman catholic church. | *"A PROPOSAL humbly offered to the Parliament, for the more effectual preventing the farther Growth of _Popery_."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[popeyed]] | adjective | **1.** With eyes or mouth open in surprise.<br>**2.** Having bulging eyes. | *"In academic literature, popeyed designates with eyes or mouth open in surprise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popillia]] | noun | **1.** A genus of scarabaeidae. | *"In academic literature, popillia designates a genus of scarabaeidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popinjay]] | noun | **1.** A vain and talkative person (chatters like a parrot).<br>**2.** An archaic term for a parrot. | *"At Aix a nominal king, chosen from among the youth for his skill in shooting at a popinjay, presided over the midsummer festival."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[popish]] | adjective | **1.** Of or relating to or supporting romanism. | *"This was some portion of a Romish book—some infamous Popish publication."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[popishly]] | adverb | **1.** Like the pope; in a popish manner. | *"In academic literature, popishly designates like the pope; in a popish manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[poplar]] | noun | **1.** Soft light-colored non-durable wood of the poplar.<br>**2.** Any of numerous trees of north temperate regions having light soft wood and flowers borne in catkins. | *"A poplar in the immediate foreground was like an ink stroke on burnished tin."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[poplin]] | noun | **1.** A ribbed fabric used in clothing and upholstery. | *"And his mother had gone off shopping to buy linen for the house at Cushendhu, poplin for dresses, delft from Holland for the kitchen and glass from Waterford for the sideboard in the dining-room."* — Donn Byrne, *The Wind Bloweth* |
| [[popliteal]] | adjective | **1.** Of or relating to the area behind the knee joint. | *"In academic literature, popliteal designates of or relating to the area behind the knee joint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popover]] | noun | **1.** Light hollow muffin made of a puff batter (individual yorkshire pudding) baked in a deep muffin cup. | *"Then, with a characteristic change of subject, she added: “My, but you should have tasted of the popovers I made for breakfast this morning!” “I should like to,” smiled Aunt Hannah."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[popper]] | noun | **1.** British philosopher (born in austria) who argued that scientific theories can never be proved to be true, but are tested by attempts to falsify them (1902-1994).<br>**2.** A container of stimulant drug (amyl nitrate or butyl nitrite). | *"Malmo, the Wounded Rat Mama’s Happy Christmas Cured of Carelessness A Visit from a Prince Stringing Cranberries Christmas in California A Troublesome Call Bertie’s Corn-Popper Fire!"* — Anonymous, *Cinderella; Or, The Little Glass Slipper, and Other Stories* |
| [[popping]] | noun | **1.** A sharp explosive sound as from a gunshot or drawing a cork.<br>**2.** Bulge outward. | *"Hence for several hours in the early morning of Christmas Day such a popping and banging of firearms goes on that a stranger might think a stubborn skirmish was in progress."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[popsicle]] | noun | **1.** Ice cream or water ice on a small wooden stick. | *"In academic literature, popsicle designates ice cream or water ice on a small wooden stick."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[populace]] | noun | **1.** People in general considered as a whole. | *"From the whole extent of the invisible vale came a multitudinous intonation; it forced upon their fancy that a great city lay below them, and that the murmur was the vociferation of its populace."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[popular]] | adjective | **1.** Regarded with great favor, approval, or affection especially by the general public.<br>**2.** Carried on by or for the people (or citizens) at large. | *"Seld-shown flamens Do press among the popular throngs and puff To win a vulgar station."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[popularisation]] | noun | **1.** An interpretation that easily understandable and acceptable.<br>**2.** The act of making something attractive to the general public. | *"In academic literature, popularisation designates an interpretation that easily understandable and acceptable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popularise]] | verb | **1.** Cater to popular taste to make popular and present to the general public; bring into general or common use.<br>**2.** Make understandable to the general public. | *"In 1793 the number suddenly goes up to sixty-six: the increase is due to the heartiness with which he took up the scheme of George Thomson to popularise and perpetuate the best old Scottish airs by fitting them with words worthy of their merits."* — Robert Burns, *The Letters of Robert Burns* |
| [[populariser]] | noun | **1.** Someone who makes attractive to the general public. | *"In academic literature, populariser designates someone who makes attractive to the general public."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popularism]] | noun | **1.** Music adapted to the understanding and taste of the majority. | *"In academic literature, popularism designates music adapted to the understanding and taste of the majority."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[popularity]] | noun | **1.** The quality of being widely admired or accepted or sought after. | *"The beadle, though generally understood in the neighbourhood to be a ridiculous institution, is not without a certain popularity for the moment, if it were only as a man who is going to see the body."* — Charles Dickens, *Bleak House* |
| [[popularization]] | noun | **1.** An interpretation that easily understandable and acceptable.<br>**2.** The act of making something attractive to the general public. | *"Only in our self-confident day of the popularization of knowledge—thanks to that most powerful engine of ignorance, the diffusion of printed matter—has the question of the freedom of will been put on a level on which the question itself cannot exist."* — graf Leo Tolstoy, *War and Peace* |
| [[popularize]] | verb | **1.** Cater to popular taste to make popular and present to the general public; bring into general or common use.<br>**2.** Make understandable to the general public. | *"But vain to popularize profundities, and all truth is profound."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[popularizer]] | noun | **1.** Someone who makes attractive to the general public. | *"The cultivators in each age may, in a sense, be said to be the interpreters and popularizers of those who have preceded them; and it is in this sense, and in this sense only, that this part can be attributed to Mill."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[popularly]] | adverb | **1.** Among the people. | *"Nevertheless, the old sea-traditions, the immemorial credulities, popularly invested this old Manxman with preternatural powers of discernment."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[populate]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Fill with inhabitants. | *"In European countries the railways were built through comparatively densely populated districts to connect cities already of large size."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[populated]] | verb | **1.** Inhabit or live in; be an inhabitant of.<br>**2.** Fill with inhabitants. | *"In European countries the railways were built through comparatively densely populated districts to connect cities already of large size."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[population]] | noun | **1.** The people who inhabit a territory or state.<br>**2.** A group of organisms of the same species inhabiting a given area. | *"It was at this fair that new engagements were entered into for the twelve months following the ensuing Lady-Day, and those of the farming population who thought of changing their places duly attended at the county-town where the fair was held."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[populism]] | noun | **1.** The political doctrine that supports the rights and powers of the common people in their struggle with the privileged elite. | *"In academic literature, populism designates the political doctrine that supports the rights and powers of the common people in their struggle with the privileged elite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[populist]] | noun | **1.** An advocate of democratic principles. | *"At the same moment that the demand for pop-bottles is increased, the demand for other things is decreased, possibly that for pop-corn or pop-guns or Populist papers--who can tell?"* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[populous]] | adjective | **1.** Densely populated. | *"Nay, the dust Should have ascended to the roof of heaven, Raised by your populous troops."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[populus]] | noun | **1.** A genus of trees of the family salicaceae that is found in the northern hemisphere; poplars. | *"In academic literature, populus designates a genus of trees of the family salicaceae that is found in the northern hemisphere; poplars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subpopulation]] | noun | **1.** A population that is part of a larger population. | *"In academic literature, subpopulation designates a population that is part of a larger population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpopulated]] | adjective | **1.** Having a lower population density than normal or desirable. | *"In academic literature, underpopulated designates having a lower population density than normal or desirable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpopular]] | adjective | **1.** Regarded with disfavor or lacking general approval. | *"The gaps remain, and there are not unpopular lodgings among the rubbish."* — Charles Dickens, *Bleak House* |
| [[unpopularity]] | noun | **1.** The quality of lacking general approval or acceptance. | *"They were with him in popularity and in unpopularity; they were with him in danger, when Herod tried to kill him and he went out of Herod's territory."* — T. R. Glover, *The Jesus of History* |
| [[unpopulated]] | adjective | **1.** With no people living there. | *"In academic literature, unpopulated designates with no people living there."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vox populi]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pop within the domain of Society.<br>**2.** A technical or specialized form exhibiting the properties of pop in systematic terminology. | *"In academic literature, vox populi designates pertaining to, derived from, or characteristic of latin pop within the domain of society."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · POP
  </div>
</div>
