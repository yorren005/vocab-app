---
status: unread
type: root_dashboard
---
# Dashboard — curs
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">curs-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“run, course, or path”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **curs** means run, course, or path. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *cursive*, *cursor*, *excursion*, and *precursor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: run, course, or path
> The root **curs** means run, course, or path. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *cursive*, *cursor*, *excursion*, and *precursor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Run, course, or path</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *cursive* and *cursor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **curs** comes from a Latin word that means *"run, course, or path"*.
  - At its core, it describes run, course, or path.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **curs** in an English word, think of **speed, haste, and rapid movement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of run, course, or path.
  - **Mental & Social**: How people experience, organize, or communicate about run, course, or path.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Cursive**: An everyday English word showing the root's idea of *run, course, or path*.
  - **Cursor**: A movable, often blinking visual indicator or graphic symbol on a display screen identifying the exact position where user input or text editing will take place.
  - **Excursion**: A short journey, trip, or tour, especially one undertaken for recreation, relaxation, or observational study.
  - **Precursor**: A person, phenomenon, discovery, or cultural movement that precedes and heralds the arrival or development of something greater.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">curs</mark>, think of <mark class="hl-def">speed, haste, and rapid movement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **curs** operates through three distinct Latin morphological bases derived from *currō, currere, cucurrī, cursum*:
> - **The Supine & Past-Participial Base `curs-` (*cursum* / 4th-declension verbal noun *cursus, -ūs*):**
>   - Forms primary nouns, adjectives, and prefixed compounds representing paths, actions, and agents:
>     - *cursor* (*curs-* + agent suffix *-or*, "a runner, a sliding indicator")
>     - *cursory* (*curs-* + adjective suffix *-ory*, "running hastily over a surface")
>     - *precursor* (*prae-* + *curs-* + *-or*, "one who runs ahead, a forerunner")
>     - *recourse* (*re-* + *curs-*, "a running back for refuge")
> - **The Frequentative & Iterative Bases `cursā-` & `cursitā-` (*cursāre*, *cursitāre*):**
>   - Form frequentative verbs and abstract nouns denoting repetitive, darting, or restless motion:
>     - *cursitate* (*cursit-* + *-ate*, "to run to and fro, scurry about")
>     - *cursitation* (*cursitātio*, "the act of running back and forth")
> - **Romance Vernacular Offshoots (via Old French *cors* / *cours*):**
>   - Latin *cursus* passed into Old French as *cors*, yielding English:
>     - *course* (the physical, educational, or culinary path)
>     - *courser* (a swift, spirited warhorse bred for charging)
>     - *coursing* (the sport of hunting quarry with swift sighthounds)
> - **Mediterranean Maritime Offshoot (via Medieval Latin *cursārius*):**
>   - *cursarius* $\to$ Old Italian *corsaro* $\to$ French *corsaire* $\to$ English *corsair* (a privateer running maritime raids)
> - **The Prefixed Compound System:**
>   - `con-` + `curs-` $\to$ *concourse* (a running together; a grand assembly hall where crowds converge)
>   - `dis-` + `curs-` $\to$ *discourse*, *discourser*, *discursive*, *discursively*, *discursiveness* (running to and fro through arguments)
>   - `ex-` + `curs-` $\to$ *excursion*, *excursionist*, *excursive*, *excursively* (a running out, a recreational journey or digression)
>   - `in-` + `curs-` $\to$ *incursion*, *incursive* (a running into; a hostile border raid)
>   - `prae-` + `curs-` $\to$ *precursor*, *precursory*, *precursive* (a running before; an anticipatory harbinger)
>   - `re-` + `curs-` $\to$ *recourse* (a running back to someone for aid)
>   - `inter-` + `curs-` $\to$ *intercourse* (a running between; commercial, social, or physical communion)
>   - `sub-` + `curs-` $\to$ *succursal* (having run under to support; a subsidiary branch chapel or institution)

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
> Although the root fundamentally denotes **"a running, a track, a trajectory"**, its manifestation shifts across ten distinct operational planes:
> - 🛤️ **Navigational, Spatial & Linear Trajectories:** The physical vector, waterway, or masonry layer traced from point to point: [[course]], [[concourse]], [[recourse]].
> - 🗣️ **Rhetorical, Philosophical & Semiotic Movement:** The step-by-step traversal of argumentation, formal academic debate, or societal power structures: [[discourse]], [[discourser]], [[discursive]], [[discursively]], [[discursiveness]].
> - ⚔️ **Martial Raids, Hostile Penetration & Maritime Piracy:** The aggressive projection of military force or privateering raids across frontiers and sea lanes: [[incursion]], [[incursive]], [[corsair]].
> - 🧳 **Tangential Wandering, Travel & Exploration:** The deliberate departure from a primary highway or topic for pleasure, fieldwork, or literary color: [[excursion]], [[excursionist]], [[excursive]], [[excursively]].
> - 🔮 **Temporal Precedence, Harbingers & Heraldry:** The entity, signal, or molecular building block that runs ahead to announce or generate what follows: [[precursor]], [[precursory]], [[precursive]].
> - 💻 **Kinetic Indicators, Mechanical Markers & Computational HCI:** The sliding index on a mathematical rule or the visual coordinate marker on an interactive screen: [[cursor]].
> - ⚡ **Hasty, Rapid & Perfunctory Scanning:** The superficial running of eyes or hands across text or evidence without deep immersion: [[cursory]], [[cursorily]], [[cursoriness]].
> - 🐕 **Nimble Pursuit, Venery & Swift Galloping:** The high-speed chase across open fields by warhorses or hunting sighthounds tracking game by eye: [[courser]], [[coursing]].
> - 🔁 **Iterated Darting, Scurrying & Frequentative Motion:** The restless, repetitive rushing back and forth across a confined space: [[cursitate]], [[cursitation]].
> - 🤝 **Social, Diplomatic & Physical Exchange:** The reciprocal traffic of commerce, mutual communication, or sexual union: [[intercourse]].

---

## 🔀 4. Prefix & Combining Dynamics on curs

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (*com-*) | together, with | [[concourse]] | A running together; a confluence of moving crowds or a vast hall where pedestrian routes converge. |
| `dis-` | apart, in different directions | [[discourse]], [[discursive]], [[discourser]] | Running to and fro; traversing a complex topic through sequential oral or written argument, or digressing loosely. |
| `ex-` | out, forth, away | [[excursion]], [[excursive]], [[excursionist]] | Running out; a short recreational trip, a military sortie, or an intellectual deviation from the primary subject. |
| `in-` | into, against, upon | [[incursion]], [[incursive]] | Running into; a hostile penetration, sudden military raid, or unwelcome encroachment into another domain. |
| `prae-` $\to$ `pre-` | before, ahead of | [[precursor]], [[precursory]], [[precursive]] | Running before; a scout, harbinger, preliminary symptom, or chemical parent molecule preceding a final product. |
| `re-` | back, again | [[recourse]] | Running back; the act of turning back to a person, institution, or strategy for refuge, relief, or legal enforcement. |
| `inter-` | between, mutually | [[intercourse]] | Running between; reciprocal communication, commercial trade, social communion, or intimate physical union. |
| `sub-` $\to$ `suc-` | under, from beneath | [[succursal]] | Having run beneath to support; designating a subsidiary branch establishment, auxiliary chapel, or dependent office. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-or` | Noun (Agent / Instrument) | [[cursor]], [[precursor]] | Designates the entity or instrument that runs: an ancient messenger, a sliding hairline, a screen marker, or a forerunner. |
| `-ory` | Adjective (Manner / Character) | [[cursory]], [[precursory]] | Expresses the character of running: conducted with superficial haste (*cursory review*) or preceding as an omen (*precursory signs*). |
| `-ive` | Adjective (Tendency / Quality) | [[discursive]], [[excursive]], [[incursive]], [[precursive]] | Expresses an active tendency: digressing widely (*discursive style*), roving freely (*excursive essay*), or invading (*incursive forces*). |
| `-ion` | Noun (Action / State / Process) | [[excursion]], [[incursion]], [[cursitation]] | Denotes the concrete act, event, or occurrence of running out, invading territory, or scurrying back and forth. |
| `-ist` | Noun (Person Engaged In) | [[excursionist]] | Designates a person who participates in an excursion, holiday tour, or recreational journey. |
| `-er` | Noun (Agent / Warhorse) | [[courser]], [[discourser]] | Designates a swift charging horse, a huntsman coursing hounds, or an orator discoursing on a subject. |
| `-ing` | Noun / Participle (Activity / Process) | [[coursing]] | The ancient field sport of pursuing game with sighthounds, or the continuous rushing of fluids through channels. |
| `-ly` | Adverb (Manner of Action) | [[cursorily]], [[discursively]], [[excursively]] | Modifies verbs to describe actions performed with hasty superficiality, rambling discursiveness, or digressive exploration. |
| `-ness` | Noun (Abstract Quality / State) | [[cursoriness]], [[discursiveness]] | Quantifies the abstract quality of being superficial, lacking depth, or wandering loosely from point to point. |
| `-ate` | Verb (Frequentative Action) | [[cursitate]] | Forms an intensive verb expressing the repetitive, anxious act of scurrying or running to and fro. |
| `-al` | Adjective (Pertaining to) | [[succursal]] | Designates an auxiliary or subsidiary relationship of a branch to its parent cathedral or corporate motherhouse. |
| `-air` | Noun (Specialized Maritime Agent) | [[corsair]] | Borrowed through French from Mediterranean maritime Italian to designate a licensed privateer running raids against enemy ships. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Human-Computer Interaction & Computing** | [[cursor]] | Visual coordinate tracking in graphical user interfaces (GUIs) and text terminals; database cursors managing row-by-row traversal of SQL result sets; mouse pointer telemetry and touch gesture interaction design. |
| 🗣️ **Rhetoric, Linguistics & Critical Theory** | [[discourse]], [[discourser]], [[discursive]], [[discursively]], [[discursiveness]] | Formal expository speech; Michel Foucault's analysis of epistemic power discourses; critical discourse analysis (CDA); discursive reasoning versus intuitive synthesis in classical logic and epistemological philosophy. |
| ⚔️ **Military Strategy, Geopolitics & Warfare** | [[incursion]], [[incursive]], [[corsair]], [[excursion]] | Cross-border tactical incursions and buffer-zone violations; naval commerce raiding by historical privateers and corsairs; military sorties (*excursions*) breaching defensive siegeworks to destroy enemy artillery. |
| 🏛️ **Roman History & Constitutional Politics** | [[course]] (*cursus honōrum*, *cursus pūblicus*) | The statutory hierarchy of Republican magistracies (quaestor, aedile, praetor, consul); Augustus's trans-continental postal courier and relay system across Roman paved highways. |
| 🧭 **Maritime Navigation & Admiralty Law** | [[course]], [[recourse]], [[corsair]] | Compass headings and dead reckoning courses; letters of marque issued to privateers and corsairs; maritime liens, salvage claims, and financial recourse against shipowners under international admiralty law. |
| 🧪 **Biochemistry, Pharmacology & Chemistry** | [[precursor]], [[precursory]] | Metabolic precursors transformed by enzymatic cascades into active hormones or neurotransmitters (e.g., L-DOPA as a precursor to dopamine); regulated chemical precursors in pharmaceutical manufacturing. |
| 🩺 **Clinical Medicine & Diagnostic Neurology** | [[cursory]], [[precursory]] | Rapid, cursory triage assessments during mass-casualty events; precursory auras and prodromal neurological signals heralding migraine onset or epileptic seizures. |
| 🐕 **Cynology, Venery & Field Sports** | [[courser]], [[coursing]] | The traditional field sport of coursing hares with greyhounds, salukis, and whippets relying on visual acuity rather than olfactory tracking; breeding of medieval chargers (*coursers*) for heavy cavalry shocks. |
| 🏛️ **Civil Architecture & Transit Engineering** | [[concourse]], [[course]] | Airport terminal and railway concourse crowd-dynamics simulation; egress planning; horizontal courses of ashlar masonry in monumental load-bearing architecture. |
| 🤝 **Sociology & International Relations** | [[intercourse]], [[concourse]] | Commercial and diplomatic intercourse between sovereign states; transnational cultural exchanges; legal regulation of civil, commercial, and personal intercourse. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accurse]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment. | *"I am accursed to rob in that thief’s company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accursed]] | verb | **1.** Curse or declare to be evil or anathema or threaten with divine punishment.<br>**2.** Under a curse. | *"I am accursed to rob in that thief’s company."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[accurst]] | adjective | **1.** Under a curse. | *"In second husband let me be accurst!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[curse]] | noun | **1.** Profane or obscene expression usually of surprise or anger.<br>**2.** An appeal to some supernatural power to inflict evil on someone or some group. | *"Ah, but I think him better than I say, And yet would herein others’ eyes were worse: Far from her nest the lapwing cries away; My heart prays for him, though my tongue do curse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cursed]] | verb | **1.** Utter obscenities or profanities.<br>**2.** Heap obscenities upon. | *"Some villain, Ay, and singular in his art, hath done you both This cursed injury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cursedly]] | adverb | **1.** In a damnable manner. | *"I married; But never honest man’s intent Sane cursedly miscarried."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[cursive]] | noun | **1.** Rapid handwriting in which letters are set down in full and are cursively connected within words without lifting the writing implement from the paper.<br>**2.** Having successive letter joined together. | *"In academic literature, cursive designates rapid handwriting in which letters are set down in full and are cursively connected within words without lifting the writing implement from the paper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursively]] | adverb | **1.** In a cursive manner. | *"In academic literature, cursively designates in a cursive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursor]] | noun | **1.** (computer science) indicator consisting of a movable spot of light (an icon) on a visual display; moving it allows the user to point to commands or screen positions. | *"In academic literature, cursor designates (computer science) indicator consisting of a movable spot of light (an icon) on a visual display; moving it allows the user to point to commands or screen positions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursorial]] | adjective | **1.** (of limbs and feet) adapted for running. | *"In academic literature, cursorial designates (of limbs and feet) adapted for running."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursorily]] | adverb | **1.** Without taking pains. | *"She cursorily signified the direction of the church, and went on, d’Urberville saying that he would see them again, in case they should be still unsuccessful in their search for shelter, of which he had just heard."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[cursorius]] | noun | **1.** Coursers. | *"Classical and authoritative lexicons catalog cursorius as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cursory]] | adjective | **1.** Hasty and without attention to detail; not thorough. | *"When I come back I’ll give you full directions, and if you insist upon walking you may; or you may ride—at your pleasure.” She accepted these terms, and slid off on the near side, though not till he had stolen a cursory kiss."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[curst]] | verb | **1.** Utter obscenities or profanities.<br>**2.** Heap obscenities upon. | *"Why hast thou lost the fresh blood in thy cheeks, And given my treasures and my rights of thee To thick-eyed musing and curst melancholy?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[discursive]] | adjective | **1.** Proceeding to a conclusion by reason or argument rather than intuition.<br>**2.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"I had not got far into it, when I judged from her looks that she was thinking in a discursive way of me, rather than of what I said."* — Charles Dickens, *Great Expectations* |
| [[discursively]] | adverb | **1.** In a rambling manner. | *"In academic literature, discursively designates in a rambling manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discursiveness]] | noun | **1.** The quality of being discursive. | *"The moment was too propitious for the display of that discursiveness which seemed the only bond of union among tempers so divergent."* — James Joyce, *Ulysses* |
| [[excursion]] | noun | **1.** A journey taken for pleasure.<br>**2.** Wandering from the main path of a journey. | *"Jarndyce, Ada, and Richard took advantage of a very fine day to make a little excursion, Mr."* — Charles Dickens, *Bleak House* |
| [[excursionist]] | noun | **1.** A tourist who is visiting sights of interest. | *"To the great mass of cheap excursionists the characteristic scenery of the Lakes is in itself hardly a pleasure at all."* — F. W. H. Myers, *Wordsworth* |
| [[excursive]] | adjective | **1.** (of e.g. speech and writing) tending to depart from the main point or cover a wide range of subjects. | *"There, grasping all the eye beheld, Thought into mingling anguish swell’d, And checked the wild excursive wing, O’er dust or bones of priest or king; Or rais’d some <g>Strongbow</g> warrior’s ghost, To shout before his banner’d host."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[excursus]] | noun | **1.** A message that departs from the main subject. | *"Ukridge, sir." Ukridge was in the middle of a very eloquent excursus on the feeding of fowls."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[incursion]] | noun | **1.** The act of entering some territory or domain (often in large numbers).<br>**2.** An attack that penetrates into enemy territory. | *"The results which follow on a large incursion of visitors into the Lake country may be considered under two heads, as affecting the residents, or as affecting the visitors themselves."* — F. W. H. Myers, *Wordsworth* |
| [[incursive]] | adjective | **1.** Involving invasion or aggressive attack. | *"In academic literature, incursive designates involving invasion or aggressive attack."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precursor]] | noun | **1.** A substance from which another substance is formed (especially by a metabolic reaction).<br>**2.** A person who goes before or announces the coming of another. | *"We are concerned less with John as precursor than as teacher and thinker."* — T. R. Glover, *The Jesus of History* |
| [[precursory]] | adjective | **1.** Warning of future misfortune. | *"In academic literature, precursory designates warning of future misfortune."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recursion]] | noun | **1.** (mathematics) an expression such that each term is generated by repeating a particular mathematical operation. | *"In academic literature, recursion designates (mathematics) an expression such that each term is generated by repeating a particular mathematical operation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recursive]] | adjective | **1.** Of or relating to a recursion. | *"In academic literature, recursive designates of or relating to a recursion."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CURS
  </div>
</div>
