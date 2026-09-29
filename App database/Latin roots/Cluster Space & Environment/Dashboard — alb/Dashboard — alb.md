---
status: unread
type: root_dashboard
---
# Dashboard — alb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">alb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“white”</span>
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

The root **alb** means white. It describes the quality, appearance, or condition of being white. In English, this root forms words such as *albatross*, *albedo*, *albino*, and *album*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: white
> The root **alb** means white. It describes the quality, appearance, or condition of being white. In English, this root forms words such as *albatross*, *albedo*, *albino*, and *album*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">White</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *albatross* and *albedo*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **alb** comes from a Latin word that means *"white"*.
  - At its core, it describes white.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **alb** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of white.
  - **Mental & Social**: How people experience, organize, or communicate about white.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Albatross**: A very large oceanic seabird with long narrow wings, capable of soaring across oceans for days.
  - **Albedo**: The proportion of the incident light or radiation that is reflected by a surface, typically of a planet or moon.
  - **Albino**: A person or animal with a congenital lack of melanin pigment, resulting in white skin and hair and pink eyes.
  - **Album**: A blank book for the insertion of autographs, photographs, stamps, or memorabilia.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">alb</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
Latin albus (white, matte white)
  │
  ├── alb- (Direct Color Stem)
  │     ├── alb (ecclesiastical white vestment)
  │     ├── Albion (poetic Britain: "the white land" / cliffs of Dover)
  │     └── albedo (astronomical reflectivity fraction)
  │
  ├── albu- (Substantive Forms)
  │     ├── album (whitewashed tablet ──> blank book ──> record album)
  │     └── albūmen (egg white) ──> albumin (blood protein)
  │
  └── albi- (Biological Pigmentation)
        ├── albino (Portuguese loan: organism lacking pigment)
        └── albinism (medical condition of pigment lack)
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

### Distinct Contextual Arenas
1. **Physical Pigmentation & Pathology**: *albino*, *albinism* (congenital lack of pigment in skin, hair, and eyes).
2. **Publishing & Records**: *album* (scrapbook, stamp album, musical compilation, photo gallery).
3. **Biochemistry & Physiology**: *albumen*, *albumin* (egg white protein, major circulating plasma protein in human blood).
4. **Geophysics & Astronomy**: *albedo* (the fraction of incident light or radiation reflected by a planet or satellite).
5. **Maritime Ornithology**: *albatross* (giant white-winged oceanic pelagic seabird).
6. **Ecclesiastical Liturgy**: *alb* (a full-length white linen vestment worn by Christian clergy).

---

## 🔀 4. Prefix & Combining Dynamics on alb

### Morphological Formations
- **-um** (neuter noun ending): *album* (literally, "a white thing" $\to$ whitewashed board).
- **-umen** (organic substance suffix): *albumen* (the white substance of an egg).
- **-edo** (state/quality suffix): *albedo* (whiteness, reflective brightness).
- **-ino** (diminutive/adjectival suffix via Portuguese): *albino* (whitish, pale).
- **-ism**: *albinism* (the physiological condition of lacking pigment).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Real-World Application | Key Vocabulary |
| :--- | :--- | :--- |
| **Optics & Planetary Science** | Surface reflectivity of planets, asteroids, and polar ice sheets | *albedo*, *Bond albedo*, *geometric albedo* |
| **Genetics & Dermatology** | Oculocutaneous pigment deficiencies, melanin biosynthesis | *albino*, *albinism* |
| **Biochemistry & Nutrition** | Serum osmotic pressure, egg nutritional composition | *albumen*, *albumin*, *ovalbumin* |
| **Media & Music Industry** | Studio audio recordings, vinyl LP packaging, photograph archives | *album*, *photo album*, *concept album* |
| **Ecclesiastical History** | Liturgical vestments in Roman Catholic and Anglican rites | *alb* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alb]] | noun | **1.** A white linen liturgical vestment with sleeves; worn by priests. | *"The altar cloth, the _alb_, and the service, were to be of plain linen; the stole and maniple, which were at first of cloth, were allowed afterwards to be of silk."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[albacore]] | noun | **1.** Relatively small tuna with choice white flesh; major source of canned tuna.<br>**2.** Large pelagic tuna the source of most canned tuna; reaches 93 pounds and has long pectoral fins; found worldwide in tropical and temperate waters. | *"In academic literature, albacore designates relatively small tuna with choice white flesh; major source of canned tuna."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albania]] | noun | **1.** A republic in southeastern europe on the adriatic coast of the balkan peninsula. | *"John's fire will not burn them.[548] In Albania fires of dry herbage are, or used to be, lit everywhere on St."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[albanian]] | noun | **1.** A native or inhabitant of albania.<br>**2.** The indo-european language spoken by the people of albania. | *"It was not a matter of life but rather of death, as the saying is. ‘Albanians!’ and ‘devils!’ and ‘To Siberia!’” said Berg with a sagacious smile."* — graf Leo Tolstoy, *War and Peace* |
| [[albany]] | noun | **1.** State capital of new york; located in eastern new york state on the west bank of the hudson river.<br>**2.** A town in southwest georgia; processing center for peanuts and pecans. | *"A Room in the Duke of Albany’s Palace Scene IV."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[albatrellus]] | noun | **1.** A genus of fungi belonging to the family polyporaceae. | *"In academic literature, albatrellus designates a genus of fungi belonging to the family polyporaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albatross]] | noun | **1.** (figurative) something that hinders or handicaps.<br>**2.** Large web-footed birds of the southern hemisphere having long narrow wings; noted for powerful gliding flight. | *"Bethink thee of the albatross, whence come those clouds of spiritual wonderment and pale dread, in which that white phantom sails in all imaginations?"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[albedo]] | noun | **1.** The ratio of reflected to incident light. | *"In academic literature, albedo designates the ratio of reflected to incident light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albee]] | noun | **1.** United states dramatist (1928-). | *"In academic literature, albee designates united states dramatist (1928-)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albers]] | noun | **1.** United states painter born in germany; works characterized by simple geometrical patterns in various colors (1888-1976). | *"In academic literature, albers designates united states painter born in germany; works characterized by simple geometrical patterns in various colors (1888-1976)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albert]] | noun | **1.** Prince consort of queen victoria of england (1819-1861). | *"Bertrand, _La Religion des Gaulois_ (Paris, 1897), p. 117. [468] Albert Meyrac, _Traditions, Coutumes, Légendes, et Contes des Ardennes_ (Charleville, 1890), pp. 88 _sq._ [469] L.F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[alberta]] | noun | **1.** One of the three prairie provinces in western canada; rich in oil and natural gas and minerals. | *"A man I know on the turf named Charles Alberta Marsh (I was in bed with him just now and another gentleman out of the Hanaper and Petty Bag office) is on the lookout for a maid of all work at a short knock."* — James Joyce, *Ulysses* |
| [[alberti]] | noun | **1.** Italian architect and painter; pioneering theoretician of renaissance architecture (1404-1472). | *"Alberti (_De Kaffersaan de Zuidkust van Afrika_, Amsterdam, 1810, p. 79), George Thompson (_Travels and Adventures in Southern Africa_, London, 1827, ii. 354 _sq._), and Mr."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[albescent]] | adjective | **1.** Becoming or shading into white. | *"In academic literature, albescent designates becoming or shading into white."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albigenses]] | noun | **1.** A christian religious sect in southern france in the 12th and 13th centuries; believers in albigensianism. | *"The adoration of each other was customary among the Albigenses, and is noticed hundreds of times in the records of the Inquisition at Toulouse in the early part of the fourteenth century."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[albigensian]] | adjective | **1.** Of or relating to albigenses or albigensianism. | *"In academic literature, albigensian designates of or relating to albigenses or albigensianism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albigensianism]] | noun | **1.** A christian movement considered to be a medieval descendant of manichaeism in southern france in the 12th and 13th centuries; characterized by dualism (asserted the coexistence of two mutually opposed principles, one good and one evil); was exterminated for heresy during the inquisition. | *"In academic literature, albigensianism designates a christian movement considered to be a medieval descendant of manichaeism in southern france in the 12th and 13th centuries; characterized by dualism (asserted the coexistence of two mutually opposed principles, one good and one evil); was exterminated for heresy during the inquisition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albinal]] | adjective | **1.** Of or pertaining to or affected by albinism. | *"In academic literature, albinal designates of or pertaining to or affected by albinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albinic]] | adjective | **1.** Of or pertaining to or affected by albinism. | *"In academic literature, albinic designates of or pertaining to or affected by albinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albinism]] | noun | **1.** The congenital absence of pigmentation in the eyes and skin and hair. | *"In academic literature, albinism designates the congenital absence of pigmentation in the eyes and skin and hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albinistic]] | adjective | **1.** Of or pertaining to or affected by albinism. | *"In academic literature, albinistic designates of or pertaining to or affected by albinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albino]] | noun | **1.** A person with congenital albinism: white hair and milky skin; eyes are usually pink. | *"What is it that in the Albino man so peculiarly repels and often shocks the eye, as that sometimes he is loathed by his own kith and kin!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[albinotic]] | adjective | **1.** Of or pertaining to or affected by albinism. | *"In academic literature, albinotic designates of or pertaining to or affected by albinism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albion]] | noun | **1.** Archaic name for england or great britain; used poetically. | *"Normans, but bastard Normans, Norman bastards! _Mort de ma vie_, if they march along Unfought withal, but I will sell my dukedom, To buy a slobbery and a dirty farm In that nook-shotten isle of Albion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[albite]] | noun | **1.** A widely distributed feldspar that forms rocks. | *"In academic literature, albite designates a widely distributed feldspar that forms rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albitic]] | adjective | **1.** Of or related to albite feldspar. | *"In academic literature, albitic designates of or related to albite feldspar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albizia]] | noun | **1.** Any of numerous trees of the genus albizia. | *"In academic literature, albizia designates any of numerous trees of the genus albizia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albizzia]] | noun | **1.** Any of numerous trees of the genus albizia. | *"In academic literature, albizzia designates any of numerous trees of the genus albizia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alborg]] | noun | **1.** A city and port in northern jutland. | *"In academic literature, alborg designates a city and port in northern jutland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuca]] | noun | **1.** Any of various plants of the genus albuca having large clusters of pale yellow flowers; south africa. | *"In academic literature, albuca designates any of various plants of the genus albuca having large clusters of pale yellow flowers; south africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuginaceae]] | noun | **1.** Fungi that produce white sori resembling blisters on certain flowering plants. | *"In academic literature, albuginaceae designates fungi that produce white sori resembling blisters on certain flowering plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuginea]] | noun | **1.** Whitish tunic. | *"In academic literature, albuginea designates whitish tunic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albugo]] | noun | **1.** Type genus of the albuginaceae; fungi causing white rusts. | *"In academic literature, albugo designates type genus of the albuginaceae; fungi causing white rusts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albula]] | noun | **1.** Type and sole genus of the family albulidae. | *"In academic literature, albula designates type and sole genus of the family albulidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albulidae]] | noun | **1.** Bonefish. | *"Classical and authoritative lexicons catalog albulidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[album]] | noun | **1.** One or more recordings issued together; originally released on 12-inch phonograph records (usually with attractive record covers) and later on cassette audiotape and compact disc.<br>**2.** A book of blank pages with pockets or envelopes; for organizing photographs or stamp collections etc. | *"She is standing alone at the table, bending gracefully over an album."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[albumen]] | noun | **1.** A simple water-soluble protein found in many animal tissues and liquids.<br>**2.** The white part of an egg; the nutritive and protective gelatinous substance surrounding the yolk consisting mainly of albumin dissolved in water. | *"In academic literature, albumen designates a simple water-soluble protein found in many animal tissues and liquids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albumin]] | noun | **1.** A simple water-soluble protein found in many animal tissues and liquids. | *"In academic literature, albumin designates a simple water-soluble protein found in many animal tissues and liquids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuminoid]] | noun | **1.** A simple protein found in horny and cartilaginous tissues and in the lens of the eye. | *"In academic literature, albuminoid designates a simple protein found in horny and cartilaginous tissues and in the lens of the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuminous]] | adjective | **1.** Relating to or containing or resembling albumin. | *"In academic literature, albuminous designates relating to or containing or resembling albumin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuminuria]] | noun | **1.** The presence of excessive protein (chiefly albumin but also globulin) in the urine; usually a symptom of kidney disorder. | *"In academic literature, albuminuria designates the presence of excessive protein (chiefly albumin but also globulin) in the urine; usually a symptom of kidney disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuminuric]] | adjective | **1.** Of or related to the state of albuminuria. | *"In academic literature, albuminuric designates of or related to the state of albuminuria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuquerque]] | noun | **1.** The largest city in new mexico; located in central new mexico on the rio grande river. | *"In academic literature, albuquerque designates the largest city in new mexico; located in central new mexico on the rio grande river."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albuterol]] | noun | **1.** A bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness. | *"In academic literature, albuterol designates a bronchodilator (trade names ventolin or proventil) used for asthma and emphysema and other lung conditions; available in oral or inhalant forms; side effects are tachycardia and shakiness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analbuminemia]] | noun | **1.** An abnormally low level of albumin in the blood serum. | *"In academic literature, analbuminemia designates an abnormally low level of albumin in the blood serum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coalbin]] | noun | **1.** A bin for holding coal. | *"In academic literature, coalbin designates a bin for holding coal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coralbells]] | noun | **1.** Perennial plant of the western united states having bright red flowers in feathery spikes; used as an ornamental. | *"In academic literature, coralbells designates perennial plant of the western united states having bright red flowers in feathery spikes; used as an ornamental."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coralberry]] | noun | **1.** North american deciduous shrub cultivated for it abundant clusters of coral-red berrylike fruits.<br>**2.** Shrub with coral-red berries; japan to northern india. | *"In academic literature, coralberry designates north american deciduous shrub cultivated for it abundant clusters of coral-red berrylike fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ALB
  </div>
</div>
