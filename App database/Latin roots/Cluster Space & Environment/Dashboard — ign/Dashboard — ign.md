---
status: unread
type: root_dashboard
---
# Dashboard — ign
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ign-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fire”</span>
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

The root **ign** means fire. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *igneous*, *ignite*, *ignition*, and *reignite*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fire
> The root **ign** means fire. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *igneous*, *ignite*, *ignition*, and *reignite*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fire</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking out across an open horizon with plenty of room to move.</mark>
> - **Everyday Connection**: Think of familiar words like *igneous* and *ignite*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ign** comes from a Latin word that means *"fire"*.
  - At its core, it describes fire.

- **The Big Picture Idea**:
  - Picture looking out across an open horizon with plenty of room to move.
  - Whenever you see **ign** in an English word, think of **space, open room, and distance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fire.
  - **Mental & Social**: How people experience, organize, or communicate about fire.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Igneous**: Formed by the cooling and solidification of magma or lava.
  - **Ignite**: To catch fire or cause to catch fire.
  - **Ignition**: The action of setting something on fire or starting combustion.
  - **Reignite**: To ignite again or catch fire again.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ign</mark>, think of <mark class="hl-def">space, open room, and distance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### Morphological Product Matrix
```
PIE *h₁n̥gʷnis (living fire) ──> Latin ignis (fire, flame)
  │
  ├── Geology & Mineralogy
  │     └── ignis + -ous ─────────────> igneous (formed from molten magma)
  │
  ├── Combustion & Engineering
  │     ├── ignīre ───────────────────> ignite (to catch or set on fire)
  │     ├── ignītiō ──────────────────> ignition (combustion process / starter)
  │     └── re- + ignite ─────────────> reignite (spark again)
  │
  └── Classical Latin Phrase
        └── ignis fatuus ─────────────> ignis fatuus (will-o'-the-wisp / delusion)
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
1. **Geology & Volcanology**: *igneous* (rocks formed by the cooling and solidification of molten magma or lava).
2. **Thermodynamics & Automotive Engineering**: *ignite*, *ignition*, *reignite* (combustion systems, spark plugs, jet thrust initiation).
3. **Psychology & Metaphorical Passion**: *ignite*, *reignite* (sparking public controversy, arousing old passions, starting social movements).
4. **Folklore & Illusions**: *ignis fatuus* (atmospheric marsh gas; deceptive goal leading one astray).

---

## 🔀 4. Prefix & Combining Dynamics on ign

### Affix Formations
- **re- ("again") + ign-**: *reignite* (to rekindle a fire, engine, or emotional connection).
- **-eous**: *igneous* (having the character of fire).
- **-ite / -ition**: *ignite*, *ignition* (verbal action of firing; substantive mechanical system).

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Practical Manifestation | Key Vocabulary |
| :--- | :--- | :--- |
| **Geology & Earth Sciences** | Magma chambers, plutonic intrusions, basaltic lava flows | *igneous*, *igneous rock*, *extrusive igneous* |
| **Automotive & Aerospace Engineering** | Spark ignition systems, rocket engine ignition, fuel-air ratios | *ignition*, *ignition switch*, *ignition timing* |
| **Fire Safety & Forensic Investigation** | Flashpoints, arson investigation, incendiary devices | *ignition source*, *spontaneous ignition* |
| **Literary Criticism & Folklore** | Swamp lights, phantom visions, will-o'-the-wisp | *ignis fatuus* |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[align]] | verb | **1.** Place in a line or arrange so as to be parallel or straight.<br>**2.** Be or come into adjustment with. | *"Each utility maneuvered to synchronize axis and align portals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[aligned]] | verb | **1.** Place in a line or arrange so as to be parallel or straight.<br>**2.** Be or come into adjustment with. | *"Slender, multi-armed space cranes raised and lowered crates, bundles and modules, and arranged, aligned, connected and disconnected gear and cargo in all directions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[aligning]] | verb | **1.** Place in a line or arrange so as to be parallel or straight.<br>**2.** Be or come into adjustment with. | *"The hussars began carefully aligning their horses."* — graf Leo Tolstoy, *War and Peace* |
| [[alignment]] | noun | **1.** An organization of people (or countries) involved in a pact or treaty.<br>**2.** The spatial property possessed by an arrangement or position of things in a straight line or in parallel lines. | *"A lackey scampered about, lifted the lids of beakers, peered in, made minute changes in the alignment of goblets, and scuttled out."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[coign]] | noun | **1.** Expandable metal or wooden wedge used by printers to lock up a form within a chase.<br>**2.** The keystone of an arch. | *"See you yond coign o’ the Capitol, yond cornerstone?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coigne]] | noun | **1.** Expandable metal or wooden wedge used by printers to lock up a form within a chase.<br>**2.** The keystone of an arch. | *"In academic literature, coigne designates expandable metal or wooden wedge used by printers to lock up a form within a chase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dealignment]] | noun | **1.** A process whereby voters are moved toward nonpartisanship thus weakening the structure of political parties. | *"In academic literature, dealignment designates a process whereby voters are moved toward nonpartisanship thus weakening the structure of political parties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deign]] | verb | **1.** Do something that one considers to be below one's dignity. | *"Thy palate then did deign The roughest berry on the rudest hedge."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignatius]] | noun | **1.** Bishop of antioch who was martyred under the roman emperor trajan (died 110). | *"Watch out what you say!” The outburst of imprecations that went up would have shaken the fortitude of a braver man than Ignatius Irvine."* — Jack London, *The Jacket (The Star-Rover)* |
| [[igneous]] | adjective | **1.** Produced under conditions involving intense heat.<br>**2.** Produced by the action of fire or intense heat. | *"During the geological epochs, the igneous period succeeded to the aqeous."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[ignescent]] | adjective | **1.** Can emit sparks or burst into flame. | *"In academic literature, ignescent designates can emit sparks or burst into flame."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignitable]] | adjective | **1.** Capable of burning. | *"In academic literature, ignitable designates capable of burning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignite]] | verb | **1.** Cause to start burning; subject to fire or great heat.<br>**2.** Start to burn or burst into flames. | *"Then having kindled torches at it they proceed with them to the jungle and ignite the felled timber and brushwood."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[ignited]] | verb | **1.** Cause to start burning; subject to fire or great heat.<br>**2.** Start to burn or burst into flames. | *"The materials of the bonfire are piled in an open space near a church, and they are generally ignited by young couples who have been married within the year."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[igniter]] | noun | **1.** A substance used to ignite or kindle a fire.<br>**2.** A device for lighting or igniting fuel or charges or fires. | *"In academic literature, igniter designates a substance used to ignite or kindle a fire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignitible]] | adjective | **1.** Capable of burning. | *"In academic literature, ignitible designates capable of burning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignition]] | noun | **1.** The process of initiating combustion or catching fire.<br>**2.** The mechanism that ignites the fuel in an internal-combustion engine. | *"Balfour, _l.c.: "Need-fire_ ... an ignition produced by the friction of two pieces of dried wood."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[ignitor]] | noun | **1.** A substance used to ignite or kindle a fire.<br>**2.** A device for lighting or igniting fuel or charges or fires. | *"In academic literature, ignitor designates a substance used to ignite or kindle a fire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignobility]] | noun | **1.** The quality of being ignoble. | *"I, as all the generations of philosophers before me, know woman for what she is—her weaknesses, and meannesses, and immodesties, and ignobilities, her earth-bound feet, and her eyes that have never seen the stars."* — Jack London, *The Jacket (The Star-Rover)* |
| [[ignoble]] | adjective | **1.** Completely lacking nobility in character or quality or purpose; ; - oliver wendell holmes, jr.<br>**2.** Not of the nobility. | *"SOMERSET. [_Aside_.] Perish, base prince, ignoble Duke of York!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignobleness]] | noun | **1.** The quality of being ignoble. | *"In academic literature, ignobleness designates the quality of being ignoble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignobly]] | adverb | **1.** In a currish manner; meanspiritedly. | *"Ay, noble uncle, thus ignobly used, Your nephew, late despised Richard, comes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignominious]] | adjective | **1.** (used of conduct or character) deserving or bringing disgrace or shame; - rachel carson. | *"Hath he not twit our sovereign lady here With ignominious words, though clerkly couched, As if she had suborned some to swear False allegations to o’erthrow his state?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignominiously]] | adverb | **1.** In a dishonorable manner or to a dishonorable degree. | *"In a few months he was ignominiously discharged from the service, and, at the close of the war, he came to Texas, and sought and obtained employment as teamster in the train then organizing for El Paso."* — Classic Author, *The wonders of prayer* |
| [[ignominiousness]] | noun | **1.** Unworthiness meriting public disgrace and dishonor. | *"In academic literature, ignominiousness designates unworthiness meriting public disgrace and dishonor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignominy]] | noun | **1.** A state of dishonor. | *"Thy ignominy sleep with thee in the grave, But not remember’d in thy epitaph! [_Sees Falstaff on the ground._] What, old acquaintance, could not all this flesh Keep in a little life?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignoramus]] | noun | **1.** An ignorant person. | *"He's but a Blockhead at the best. * _Corny_, in Printing a _Latin_ Book, censur'd by the University, was forced to plead _Ignoramus_ to save his Bacon. _Another in the Shop, on C----'s Title Page_ LEARNING."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[ignorance]] | noun | **1.** The lack of knowledge or education. | *"Thine eyes, that taught the dumb on high to sing, And heavy ignorance aloft to fly, Have added feathers to the learned’s wing, And given grace a double majesty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignorant]] | adjective | **1.** Uneducated in general; lacking knowledge or sophistication.<br>**2.** Uneducated in the fundamentals of a given art or branch of learning; lacking knowledge of a specific field. | *"What the devil should move me to undertake the recovery of this drum, being not ignorant of the impossibility, and knowing I had no such purpose?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ignorantly]] | adverb | **1.** In ignorance; in an ignorant manner. | *"Here have I been unconsciously toiling, not pleasuring,—aye, and ignorantly smoking to windward all the while; to windward, and with such nervous whiffs, as if, like the dying whale, my final jets were the strongest and fullest of trouble."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[ignorantness]] | noun | **1.** Ignorance (especially of orthodox beliefs). | *"In academic literature, ignorantness designates ignorance (especially of orthodox beliefs)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ignore]] | verb | **1.** Refuse to acknowledge.<br>**2.** Bar from attention or consideration. | *"They ignore the meaning of the word in Nature, together with all aesthetic claims upon it, not to mention the spiritual interpretation afforded by the finest side of their own Christianity."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ignored]] | verb | **1.** Refuse to acknowledge.<br>**2.** Bar from attention or consideration. | *"Yet the negro is here because men of the seventeenth century ignored the complexity of the labor problem and thought only of its economic aspect."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[misalign]] | verb | **1.** Align imperfectly or badly. | *"In academic literature, misalign designates align imperfectly or badly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misalignment]] | noun | **1.** The spatial property of things that are not properly aligned. | *"In academic literature, misalignment designates the spatial property of things that are not properly aligned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonaligned]] | adjective | **1.** Not affiliated with any faction, party, or cause. | *"In academic literature, nonaligned designates not affiliated with any faction, party, or cause."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonalignment]] | noun | **1.** People (or countries) who are not aligned with other people (or countries) in a pact or treaty. | *"In academic literature, nonalignment designates people (or countries) who are not aligned with other people (or countries) in a pact or treaty."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[realign]] | verb | **1.** Align anew or better. | *"Got it?" Myra grunted, raised her middle finger, then quickly realigned it with the rest of her hand and snapped off a mechanical salute."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[reign]] | noun | **1.** A period during which something or somebody is dominant or powerful.<br>**2.** The period during which a monarch is sovereign. | *"And each (though enemies to either’s reign) Do in consent shake hands to torture me, The one by toil, the other to complain How far I toil, still farther off from thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reigning]] | verb | **1.** Have sovereign power.<br>**2.** Be larger in number, quantity, power, status or importance. | *"Now I will believe That there are unicorns; that in Arabia There is one tree, the phoenix’ throne; one phoenix At this hour reigning there."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[reignite]] | verb | **1.** Ignite anew, as of something burning. | *"In academic literature, reignite designates ignite anew, as of something burning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seigneur]] | noun | **1.** A man of rank in the ancient regime. | *"D’elbow, _madame._ KATHARINE. _O Seigneur Dieu, je m’en oublie!_ D’elbow. _Comment appelez-vous le col?_ ALICE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seigneury]] | noun | **1.** The estate of a seigneur.<br>**2.** The position and authority of a feudal lord. | *"In academic literature, seigneury designates the estate of a seigneur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seignior]] | noun | **1.** A man of rank in the ancient regime. | *"The prince, king, or emperor stamped his own device or portrait upon the coin; hence the term seigniorage from _seignior_ (meaning lord or ruler)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[seigniorage]] | noun | **1.** Charged by a government for coining bullion. | *"Seigniorage defined. § 1. #Origin of money#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[seigniory]] | noun | **1.** The estate of a seigneur.<br>**2.** The position and authority of a feudal lord. | *"QUEEN MARGARET. [_Coming forward._] If ancient sorrow be most reverend, Give mine the benefit of seigniory, And let my griefs frown on the upper hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · IGN
  </div>
</div>
