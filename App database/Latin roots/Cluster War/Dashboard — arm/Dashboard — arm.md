---
status: unread
type: root_dashboard
---
# Dashboard — arm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">arm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“weapons or arms”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A protective shield deflecting a blow or soldiers marching in disciplined defense.</span>
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

The root **arm** means weapons or arms. It refers to protective equipment, shields, weapons, or gear used for defense. In English, this root forms words such as *armor*, *arms*, *armada*, and *armament*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: weapons or arms
> The root **arm** means weapons or arms. It refers to protective equipment, shields, weapons, or gear used for defense. In English, this root forms words such as *armor*, *arms*, *armada*, and *armament*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Weapons or arms</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *armor* and *arms*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **arm** comes from a Latin word that means *"weapons or arms"*.
  - At its core, it describes weapons or arms.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **arm** in an English word, think of **defense, struggle, and armed forces**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of weapons or arms.
  - **Mental & Social**: How people experience, organize, or communicate about weapons or arms.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Armor**: The metal coverings formerly worn by soldiers or fitted onto combat vehicles to protect against weapons.
  - **Arms**: Weapons and ammunition.
  - **Armada**: A fleet of warships, especially the historic Spanish naval force sent against England in 1588.
  - **Armament**: Military weapons and equipment.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arm</mark>, think of <mark class="hl-def">defense, struggle, and armed forces</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `arm-` (< Latin *arma*): Base nominal and verbal root.
- **Prefix Machinery**:
  - `dis-` ("apart, away"): *disarm* ("to deprive of weapons").
  - `re-` ("again"): *rearm* ("to equip with weapons anew").
- **Compound Syntagms**:
  - `arma` + `sistere` ("to halt"): *armistice*.
  - `all'` + `arme` ("to arms"): *alarm*.
  - `gens` + `d'armes` ("men of arms"): *gendarme*.
- **Suffixal Formations**:
  - `-or`: *armor*.
  - `-ament`: *armament*.
  - `-y`: *army*.
  - `-ada`: *armada*.

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
                      ┌── Weapons & Personal Defense: arm (weapon), arms, armor
                      │
   [arm] ─────────────┼── Military Formations & Fleets: army, armada, armament, gendarme
 (Weapons / Armor)    │
                      ├── Alerts & Cessation: alarm, armistice
                      │
                      └── Policy & Nature: disarm, rearm, armadillo
```

---

## 🔀 4. Prefix & Combining Dynamics on arm
- **`dis-` + `arm`**: *disarm* — to strip of weaponry; metaphorically, to disarm suspicion.
- **`re-` + `arm`**: *rearm* — to rebuild a nation's military stockpile.
- **`arm-` + `istice`**: *armistice* — a temporary standstill of active combat.
- **`al-` + `arm`**: *alarm* — an urgent warning bell; a sudden fright.

---

## 🌐 5. Disciplinary & Real-World Domains
- **International Geopolitics & Treaties**: Nuclear *disarmament* (SALT, START); *armistice* agreements (Panmunjom).
- **Military History & Defense Procurement**: Strategic *armaments*; mechanized *armies*; the Spanish *Armada*.
- **Heraldry & Vexillology**: Coats of *arms*; ancestral armorial bearings.
- **Zoology**: Cingulata morphology (*armadillos*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alarm]] | noun | **1.** Fear resulting from the awareness of danger.<br>**2.** A device that signals the occurrence of some undesirable event. | *"Forth at your eyes your spirits wildly peep, And, as the sleeping soldiers in the alarm, Your bedded hairs, like life in excrements, Start up and stand an end."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alarmed]] | verb | **1.** Fill with apprehension or alarm; cause to be unpleasantly surprised.<br>**2.** Warn or arouse to a sense of danger or call to a state of preparedness. | *"Warm yourself!” Richard shook him by both hands with an intuitive mixture of respect and frankness, and only saying (though with an earnestness that rather alarmed me, I was so afraid of Mr."* — Charles Dickens, *Bleak House* |
| [[alarming]] | verb | **1.** Fill with apprehension or alarm; cause to be unpleasantly surprised.<br>**2.** Warn or arouse to a sense of danger or call to a state of preparedness. | *"Gridley, a disappointed suitor, has been here to-day and has been alarming."* — Charles Dickens, *Bleak House* |
| [[alarmingly]] | adverb | **1.** In an alarming manner. | *"A correspondent of _The Illustrated Christian Weekly_, states that a mother of her acquaintance had a child taken alarmingly ill."* — Classic Author, *The wonders of prayer* |
| [[alarmism]] | noun | **1.** Needless warnings. | *"In academic literature, alarmism designates needless warnings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alarmist]] | noun | **1.** A person who alarms others needlessly. | *"In academic literature, alarmist designates a person who alarms others needlessly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arm]] | noun | **1.** A human limb; technically the part of the superior limb between the shoulder and the elbow but commonly used to refer to the whole superior limb.<br>**2.** Any projection that is thought to resemble a human arm. | *"He hath arm’d our answer, And Florence is denied before he comes: Yet, for our gentlemen that mean to see The Tuscan service, freely have they leave To stand on either part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armada]] | noun | **1.** A large fleet. | *"What was left of the INOR armada withdrew beyond the reach of the UIPS fleet's long-range weapons, careful to demonstrate that their retreat was in a direction away from the Slingshot Terminals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[armadillidiidae]] | noun | **1.** Pill bugs. | *"In academic literature, armadillidiidae designates pill bugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armadillidium]] | noun | **1.** Type genus of the armadillidiidae. | *"In academic literature, armadillidium designates type genus of the armadillidiidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armadillo]] | noun | **1.** Burrowing chiefly nocturnal mammal with body covered with strong horny plates. | *"These fishes, like the tortoise, the armadillo, the sea-hedgehog, and the Crustacea, are protected by a breastplate which is neither chalky nor stony, but real bone."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[armageddon]] | noun | **1.** (new testament) the scene of the final battle between the kings of the earth at the end of the world.<br>**2.** Any catastrophically destructive battle. | *"In academic literature, armageddon designates (new testament) the scene of the final battle between the kings of the earth at the end of the world."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armagnac]] | noun | **1.** Dry brandy distilled in the armagnac district of france. | *"Have you perused the letters from the Pope, The Emperor, and the Earl of Armagnac?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armament]] | noun | **1.** Weaponry used by military or naval force.<br>**2.** The act of equiping with weapons in preparation for war. | *"I want both of you to board the Sandbox and check all installed armament that can be directed against our fleet."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[armamentarium]] | noun | **1.** The collection of equipment and methods used in the practice of medicine. | *"In academic literature, armamentarium designates the collection of equipment and methods used in the practice of medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armature]] | noun | **1.** Coil in which voltage is induced by motion through a magnetic field. | *"Very different was the _Liodon dyspelor_, a still larger animal than the last, with a formidable armature."* — W. E. Webb, *Buffalo Land* |
| [[armchair]] | noun | **1.** Chair with a support on each side for arms. | *"Gradually the whole knot moved into the house and towards the uncle's armchair."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[armed]] | verb | **1.** Prepare oneself for a military confrontation.<br>**2.** Supply with arms. | *"And what Made the all-honoured, honest Roman, Brutus, With the armed rest, courtiers of beauteous freedom, To drench the Capitol, but that they would Have one man but a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armenia]] | noun | **1.** A landlocked republic in southwestern asia; formerly an asian soviet; modern armenia is but a fragment of ancient armenia which was one of the world's oldest civilizations; throughout 2500 years the armenian people have been invaded and oppressed by their neighbors. | *"His sons he there proclaimed the kings of kings: Great Media, Parthia, and Armenia He gave to Alexander; to Ptolemy he assigned Syria, Cilicia, and Phoenicia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armenian]] | noun | **1.** A native or inhabitant of armenia.<br>**2.** The indo-european language spoken predominantly in armenia, but also in azerbaijan. | *"Série, iv. (1884) pp. 14 _sqq._; William Simpson, _The Buddhist Praying Wheel_ (London, 1896), pp. 87 _sqq._ It is a popular Armenian idea that "the body of the sun has the shape of the wheel of a water-mill; it revolves and moves forward."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[armeria]] | noun | **1.** Shrubby or herbaceous low-growing evergreen perennials. | *"In academic literature, armeria designates shrubby or herbaceous low-growing evergreen perennials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armet]] | noun | **1.** A medieval helmet with a visor and a neck guard. | *"In academic literature, armet designates a medieval helmet with a visor and a neck guard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armiger]] | noun | **1.** A squire carrying the armor of a knight.<br>**2.** A nobleman entitled to bear heraldic arms. | *"In academic literature, armiger designates a squire carrying the armor of a knight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armilla]] | noun | **1.** A celestial globe consisting of metal hoops; used by early astronomers to determine the positions of stars.<br>**2.** (archeology) a bracelet worn around the wrist or arm. | *"In academic literature, armilla designates a celestial globe consisting of metal hoops; used by early astronomers to determine the positions of stars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armillaria]] | noun | **1.** Genus of edible mushrooms having white spores an annulus and blue juice; some are edible; some cause root rot. | *"In academic literature, armillaria designates genus of edible mushrooms having white spores an annulus and blue juice; some are edible; some cause root rot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armillariella]] | noun | **1.** A honey-colored diminutive form of genus armillaria; grows in clusters; edible (when cooked) but most attention has been on how to get rid of it. | *"In academic literature, armillariella designates a honey-colored diminutive form of genus armillaria; grows in clusters; edible (when cooked) but most attention has been on how to get rid of it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armillary]] | adjective | **1.** Of or relating to bracelets. | *"In academic literature, armillary designates of or relating to bracelets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armin]] | noun | **1.** German hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19). | *"In academic literature, armin designates german hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arming]] | noun | **1.** The act of equiping with weapons in preparation for war.<br>**2.** Prepare oneself for a military confrontation. | *"Ay, and the particular confirmations, point from point, to the full arming of the verity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arminian]] | noun | **1.** Adherent of arminianism.<br>**2.** Of or relating to arminianism. | *"Nae poison’d soor Arminian stank He let them taste; Frae Calvin’s well, aye clear, drank,— O, sic a feast! [Footnote 1: Rev."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[arminianism]] | noun | **1.** 17th century theology (named after its founder jacobus arminius) that opposes the absolute predestinarianism of john calvin and holds that human free will is compatible with god's sovereignty. | *"We dwell on the points of distinction between Calvinism and Arminianism when the greater part of our people do not know the difference between an Arminian and an Armenian, and some good old sister thinks we are preaching on the cruelty of the Turks."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[arminius]] | noun | **1.** Dutch protestant theologian who founded arminianism which opposed the absolute predestinarianism of john calvin (1559-1609).<br>**2.** German hero; leader at the battle of teutoburger wald in ad 9 (circa 18 bc - ad 19). | *"I have asked my friend Arminius, of Buda-Pesth University, to make his record; and, from all the means that are, he tell me of what he has been."* — Bram Stoker, *Dracula* |
| [[armistice]] | noun | **1.** A state of peace agreed to between opponents so they can discuss peace terms. | *"Five months later on the eve of the Armistice he was flung out of the service, a broken man, paralysed below the waist, cursing every one who came near him and chiefly the surgeons for not letting him die."* — Anthony Pryde, *Nightfall* |
| [[armless]] | adjective | **1.** Having no arms. | *"In academic literature, armless designates having no arms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armlet]] | noun | **1.** A band worn around the arm for decoration. | *"Nay, many a maiden has loved me, Thou may of the glittering armlet: For I've tricks of the tongue to beguile them And turn them from handsomer lads.” At this house they spent the night."* — Classic Author, *The Life and Death of Cormac the Skald* |
| [[armlike]] | adjective | **1.** Resembling an arm. | *"In academic literature, armlike designates resembling an arm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armoire]] | noun | **1.** A large wardrobe or cabinet; originally used for storing weapons. | *"In academic literature, armoire designates a large wardrobe or cabinet; originally used for storing weapons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armor]] | noun | **1.** Protective covering made of metal and used in combat.<br>**2.** A military unit consisting of armored fighting vehicles. | *"But it is so exciting to imagine that an old, old Baron of Wallerstätten might wander around the battlements in his armor."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[armor-bearer]] | noun | **1.** A squire carrying the armor of a knight. | *"In academic literature, armor-bearer designates a squire carrying the armor of a knight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armor-clad]] | adjective | **1.** Covered with heavy steel. | *"In academic literature, armor-clad designates covered with heavy steel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armor-plated]] | adjective | **1.** Covered with heavy steel. | *"In academic literature, armor-plated designates covered with heavy steel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armoracia]] | noun | **1.** Horseradish. | *"In academic literature, armoracia designates horseradish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armored]] | verb | **1.** Equip with armor.<br>**2.** Protected by armor (used of persons or things military). | *"Then only his lack of fear had armored him; and if he had known the truth, that would not have lasted a minute."* — Poul Anderson, *The Valor of Cappen Varra* |
| [[armorer]] | noun | **1.** A worker skilled in making armor or arms.<br>**2.** An enlisted man responsible for the upkeep of small arms and machine guns etc. | *"Preston; four corporals, one bugler, one armorer, and one hospital steward, with sixty-eight privates."* — Robert Coltman, *Beleaguered in Pekin: The Boxer's War Against the Foreigner* |
| [[armorial]] | adjective | **1.** Of or relating to heraldry or heraldic arms. | *"Such is the assemblage of armorial bearings on coach panels that the Herald’s College might be supposed to have lost its father and mother at a blow."* — Charles Dickens, *Bleak House* |
| [[armory]] | noun | **1.** A collection of resources.<br>**2.** All the weapons and equipment that a country has. | *"Pigmies rummaging the armory of a giant, and contending for the possession of weapons which they could not wield."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[armour]] | noun | **1.** A military unit consisting of armored fighting vehicles.<br>**2.** Protective covering made of metal and used in combat. | *"I’ll give thee, friend, An armour all of gold."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armour-clad]] | adjective | **1.** Covered with heavy steel. | *"In academic literature, armour-clad designates covered with heavy steel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armour-plated]] | adjective | **1.** Covered with heavy steel. | *"In academic literature, armour-plated designates covered with heavy steel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armoured]] | verb | **1.** Equip with armor.<br>**2.** Used of animals; provided with protective covering. | *"I love to think of fighting him, or telling him that I am not afraid." "Oh, yes, I am sure you would run away if the armoured knight with his wild eyes should come nearer," said Mea."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[armourer]] | noun | **1.** A worker skilled in making armor or arms.<br>**2.** An enlisted man responsible for the upkeep of small arms and machine guns etc. | *"Thou art The armourer of my heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armoury]] | noun | **1.** A collection of resources.<br>**2.** All the weapons and equipment that a country has. | *"Come, go with me into mine armoury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armrest]] | noun | **1.** A support for the arm. | *"He was dragging his feet, and when he got to the side of his big black buggy, he had to catch one hand on the dashboard and the other on the armrest so he could pull himself up to the seat."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[arms]] | noun | **1.** Weapons considered collectively.<br>**2.** The official symbols of a family, state, etc. | *"Why dost thou garter up thy arms o’ this fashion?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arms-runner]] | noun | **1.** A smuggler of guns. | *"In academic literature, arms-runner designates a smuggler of guns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[armstrong]] | noun | **1.** United states astronaut; the first man to set foot on the moon (july 20, 1969) (1930-).<br>**2.** United states pioneering jazz trumpeter and bandleader (1900-1971). | *"Johnson, Miss Armstrong, and Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[army]] | noun | **1.** A permanent organization of the military land forces of a nation or state.<br>**2.** A large number of people united for some specific purpose. | *"Enter, with a drum and colours, a party of the Florentine army, Bertram and Parolles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[armyworm]] | noun | **1.** Noctuid moth larvae that travel in multitudes destroying especially grass and grain.<br>**2.** Moth whose destructive larvae travel in multitudes. | *"In academic literature, armyworm designates noctuid moth larvae that travel in multitudes destroying especially grass and grain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disarm]] | verb | **1.** Remove offensive capability from.<br>**2.** Make less hostile; win over. | *"Disarm them, and let them question."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disarmament]] | noun | **1.** Act of reducing or depriving of arms. | *"In academic literature, disarmament designates act of reducing or depriving of arms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disarmer]] | noun | **1.** Someone opposed to violence as a means of settling disputes. | *"In academic literature, disarmer designates someone opposed to violence as a means of settling disputes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disarming]] | noun | **1.** Act of reducing or depriving of arms.<br>**2.** Remove offensive capability from. | *"Jane is one of the hunted that has turned and has come back to meet the pursuer with outstretched and disarming hand."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[earmark]] | noun | **1.** Identification mark on the ear of a domestic animal.<br>**2.** A distinctive characteristic or attribute. | *"In academic literature, earmark designates identification mark on the ear of a domestic animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[earmuff]] | noun | **1.** Either of a pair of ear coverings (usually connected by a headband) that are worn to keep the ears warm in cold weather. | *"In academic literature, earmuff designates either of a pair of ear coverings (usually connected by a headband) that are worn to keep the ears warm in cold weather."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overarm]] | adjective | **1.** With hand brought forward and down from above shoulder level. | *"In academic literature, overarm designates with hand brought forward and down from above shoulder level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rearm]] | verb | **1.** Arm again.<br>**2.** Arm anew. | *"In academic literature, rearm designates arm again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rearmament]] | noun | **1.** The act of arming again. | *"In academic literature, rearmament designates the act of arming again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rearmost]] | adjective | **1.** Located farthest to the rear. | *"In academic literature, rearmost designates located farthest to the rear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unalarming]] | adjective | **1.** Not alarming; assuaging alarm. | *"In academic literature, unalarming designates not alarming; assuaging alarm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarm]] | verb | **1.** Take away the weapons from; render harmless. | *"If he should do so, He leaves his back unarm’d, the French and Welsh Baying him at the heels: never fear that."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unarmed]] | verb | **1.** Take away the weapons from; render harmless.<br>**2.** (used of persons or the military) not having or using arms. | *"By heaven, Poins, I feel me much to blame, So idly to profane the precious time, When tempest of commotion, like the south Borne with black vapour, doth begin to melt And drop upon our bare unarmed heads."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unarmored]] | adjective | **1.** Used of animals; without protective covering.<br>**2.** (used of persons or things military) without protective armor. | *"In academic literature, unarmored designates used of animals; without protective covering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarmoured]] | adjective | **1.** Used of animals; without protective covering.<br>**2.** (used of persons or things military) without protective armor. | *"In academic literature, unarmoured designates used of animals; without protective covering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underarm]] | adjective | **1.** With hand brought forward and up from below shoulder level.<br>**2.** With the hand swung below shoulder level. | *"Don't know how many shots it holds and we need them all." She swung with that underarm motion which is the nearest any woman can achieve to a throw."* — Fletcher Pratt, *The Onslaught from Rigel* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster War]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARM
  </div>
</div>
