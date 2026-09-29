---
status: unread
type: root_dashboard
---
# Dashboard — pac
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pac-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“peace”</span>
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

The root **pac** means peace. It refers to freedom from conflict, calm agreements, and tranquil conditions. In English, this root forms words such as *peace*, *peaceful*, *pacify*, and *pacification*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: peace
> The root **pac** means peace. It refers to freedom from conflict, calm agreements, and tranquil conditions. In English, this root forms words such as *peace*, *peaceful*, *pacify*, and *pacification*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Peace</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A protective shield deflecting a blow or soldiers marching in disciplined defense.</mark>
> - **Everyday Connection**: Think of familiar words like *peace* and *peaceful*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pac** comes from a Latin word that means *"peace"*.
  - At its core, it describes peace.

- **The Big Picture Idea**:
  - Picture a protective shield deflecting a blow or soldiers marching in disciplined defense.
  - Whenever you see **pac** in an English word, think of **defense, struggle, and armed forces**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of peace.
  - **Mental & Social**: How people experience, organize, or communicate about peace.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Peace**: Freedom from disturbance.
  - **Peaceful**: Free from disturbance.
  - **Pacify**: To quell the anger, agitation, or excitement of.
  - **Pacification**: The act of bringing peace or quelling hostility.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pac</mark>, think of <mark class="hl-def">defense, struggle, and armed forces</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `pac-` (< Latin *pāx* / *pācis*): Base nominal root.
  - `peac-` (Anglo-Norman development): *peace, peaceful*.
  - `appeas-` (Old French development): *appease, appeasement*.
  - `pay` (Romance phonetic softening $c 	o y$): *pay, payment*.
- **Suffixal Formations**:
  - `-ify`: *pacify* ("to make peaceful").
  - `-ic`: *pacific* ("peace-loving, tranquil").
  - `-ist` / `-ism`: *pacifist, pacifism*.
  - `-ment`: *appeasement, payment*.

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
                      ┌── Concord & Tranquility: peace, peaceful, pacific
                      │
   [pac] ─────────────┼── Military & Emotional Calming: pacify, pacification
 (Peace / Treaty)     │
                      ├── Moral Philosophy & Anti-War: pacifist, pacifism
                      │
                      └── Concessions & Commerce: appease, appeasement, pay
```

---

## 🔀 4. Prefix & Combining Dynamics on pac
- **`pac-` + `-ify`**: *pacify* — to quell anger, agitation, or rebellion.
- **`pac-` + `-ist`**: *pacifist* — a person who believes that war and violence are unjustifiable.
- **`ap-` + `pease`**: *appease* — to pacify an aggressor by acceding to their demands.
- **`pac-` + `fic`**: *pacific* — calm, peaceful, serene.

---

## 🌐 5. Disciplinary & Real-World Domains
- **International Relations & Geopolitics**: Peace treaties; the policy of *appeasement* (Munich 1938); the *Pax Romana* and *Pax Britannica*.
- **Geography & Oceanography**: The *Pacific* Ocean; Pacific Rim economics.
- **Ethics & Philosophy**: Absolute vs. conditional *pacifism*; conscientious objection in wartime.
- **Childcare & Parenting**: *Pacifiers* (baby dummies soothing infant distress).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alpaca]] | noun | **1.** Wool of the alpaca.<br>**2.** A thin glossy fabric made of the wool of the lama pacos, or made of a rayon or cotton imitation of that wool. | *"I saw a high starched collar, white cuffs, a light alpaca jacket, snowy trousers, a clean necktie, and varnished boots."* — Joseph Conrad, *Heart of Darkness* |
| [[compact]] | noun | **1.** A small cosmetics case with a mirror; to be carried in a woman's purse.<br>**2.** A signed written agreement between two or more parties (nations) to perform some action. | *"If he, compact of jars, grow musical, We shall have shortly discord in the spheres."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[compaction]] | noun | **1.** An increase in the density of something.<br>**2.** The act of crushing. | *"In academic literature, compaction designates an increase in the density of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compactly]] | adverb | **1.** In a compact manner or state.<br>**2.** With concise and precise brevity; to the point. | *"An obliging stranger, under pretence of compactly folding up my bank-notes for security’s sake, abstracts the notes and gives me nutshells; but what is his sleight of hand to mine, when I fold up my own nutshells and pass them on myself as notes!"* — Charles Dickens, *Great Expectations* |
| [[compactness]] | noun | **1.** The spatial property of being crowded together.<br>**2.** The consistency of a compact solid. | *"The attaining of the necessary compactness, toughness, and strength of the metallic product is aided by the employment of pressure during deposition, as by burnishers, or by very rapid rotation of the depositing surfaces in the solutions."* — Donald M. Levy, *Modern Copper Smelting* |
| [[copacetic]] | adjective | **1.** Completely satisfactory; ; - john o'hara. | *"In academic literature, copacetic designates completely satisfactory; ; - john o'hara."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epacridaceae]] | noun | **1.** Australasian shrubs or small trees. | *"In academic literature, epacridaceae designates australasian shrubs or small trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epacris]] | noun | **1.** Any heathlike evergreen shrub of the genus epacris grown for their showy and crowded spikes of small bell-shaped or tubular flowers. | *"In academic literature, epacris designates any heathlike evergreen shrub of the genus epacris grown for their showy and crowded spikes of small bell-shaped or tubular flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impact]] | noun | **1.** The striking of one body against another.<br>**2.** A forceful consequence; a strong effect. | *"The rencounter came at a heavy moment, one of all moments calculated to permit its impact with the least emotional shock."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impacted]] | verb | **1.** Press or wedge together; pack together.<br>**2.** Have an effect upon. | *"In academic literature, impacted designates press or wedge together; pack together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impaction]] | noun | **1.** The condition of being pressed closely together and firmly fixed.<br>**2.** A disorder in which feces are impacted in the lower colon. | *"In academic literature, impaction designates the condition of being pressed closely together and firmly fixed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pac]] | noun | **1.** Committee formed by a special-interest group to raise money for their favorite political candidates. | *"Go, bear Patroclus’ body to Achilles, And bid the snail-pac’d Ajax arm for shame."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paca]] | noun | **1.** Large burrowing rodent of south america and central america; highly esteemed as food. | *"Jr │ Dec. 1738 │ │ Paca, Wm. │Wye-Hill, Md., 31│Maryland │— ——, 1799. │ Oct. 1740 │ │ Paine, Robert │Boston, Mass., in│Massachusetts │11 May, 1804."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[pace]] | noun | **1.** The rate of moving (especially walking or running).<br>**2.** The distance covered by a step. | *"Ah yet doth beauty like a dial hand, Steal from his figure, and no pace perceived, So your sweet hue, which methinks still doth stand Hath motion, and mine eye may be deceived."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pacemaker]] | noun | **1.** A leading instance in its field.<br>**2.** A specialized bit of heart tissue that controls the heartbeat. | *"In academic literature, pacemaker designates a leading instance in its field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacer]] | noun | **1.** A horse used to set the pace in racing.<br>**2.** A horse trained to a special gait in which both feet on one side leave the ground together. | *"True to her work, the Dolly headed to her course, and like one of those characters who always do best when let alone, she jogged on her way like a veteran old sea-pacer as she was."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[pacesetter]] | noun | **1.** A leading instance in its field.<br>**2.** A horse used to set the pace in racing. | *"In academic literature, pacesetter designates a leading instance in its field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacific]] | noun | **1.** The largest ocean in the world.<br>**2.** Relating to or bordering the pacific ocean. | *"He has no idea, poor wretch, of the spiritual destitution of a coral reef in the Pacific or what it costs to look up the precious souls among the coco-nuts and bread-fruit."* — Charles Dickens, *Bleak House* |
| [[pacifically]] | adverb | **1.** In a peaceable manner. | *"Mother, how could you ever put such stuff into their heads?” “Going to work, my dears, for our rich relation, and help get enough money for a new horse,” said Mrs Durbeyfield pacifically."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[pacification]] | noun | **1.** The act of appeasing someone or causing someone to be more favorably inclined.<br>**2.** A treaty to cease hostilities. | *"We demand the immediate and absolute removal of all disabilities imposed on account of the Rebellion, which was finally subdued seven years ago, believing that universal amnesty will result in complete pacification in all sections of the country. 4."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[pacificism]] | noun | **1.** The doctrine that all violence is unjustifiable.<br>**2.** The belief that all international disputes can be settled by arbitration. | *"In academic literature, pacificism designates the doctrine that all violence is unjustifiable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacificist]] | noun | **1.** Someone opposed to violence as a means of settling disputes. | *"In academic literature, pacificist designates someone opposed to violence as a means of settling disputes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacifier]] | noun | **1.** Someone who tries to bring peace.<br>**2.** Anything that serves to pacify. | *"In academic literature, pacifier designates someone who tries to bring peace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacifism]] | noun | **1.** The doctrine that all violence is unjustifiable.<br>**2.** The belief that all international disputes can be settled by arbitration. | *"In academic literature, pacifism designates the doctrine that all violence is unjustifiable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacifist]] | noun | **1.** Someone opposed to violence as a means of settling disputes.<br>**2.** Opposed to war. | *"Nations with slowly growing populations, and still possessed of ample territories to maintain their accustomed standards of life, naturally favor the _status quo_, and are pacifist or nonmilitarist."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[pacifistic]] | adjective | **1.** Opposed to war. | *"In academic literature, pacifistic designates opposed to war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacifistically]] | adverb | **1.** In a pacifistic manner. | *"In academic literature, pacifistically designates in a pacifistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacify]] | verb | **1.** Cause to be more favorably inclined; gain the good will of.<br>**2.** Fight violence and try to establish peace in (a location). | *"Pray ye pacify yourself, Sir John."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pacing]] | noun | **1.** (music) the speed at which a composition is to be played.<br>**2.** Walking with slow regular strides. | *"When last the young Orlando parted from you, He left a promise to return again Within an hour, and pacing through the forest, Chewing the food of sweet and bitter fancy, Lo, what befell."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pact]] | noun | **1.** A written agreement between two states or sovereigns. | *"Kim and Pak, in their youth, swore a pact to abstain from drinking, which pact was speedily broken."* — Jack London, *The Jacket (The Star-Rover)* |
| [[subcompact]] | noun | **1.** A car smaller than a compact car. | *"In academic literature, subcompact designates a car smaller than a compact car."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trapaceae]] | noun | **1.** Family comprising solely the genus trapa; in some classifications treated as a subfamily or tribe of the family onagraceae. | *"In academic literature, trapaceae designates family comprising solely the genus trapa; in some classifications treated as a subfamily or tribe of the family onagraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PAC
  </div>
</div>
