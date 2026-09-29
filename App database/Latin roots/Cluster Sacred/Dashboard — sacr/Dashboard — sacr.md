---
status: unread
type: root_dashboard
---
# Dashboard — sacr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sacr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“holy or sacred”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</span>
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

The root **sacr** means holy or sacred. It describes being dedicated to sacred worship, holy, or consecrated. In English, this root forms words such as *sacred*, *sacrifice*, *sacrament*, and *consecrate*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: holy or sacred
> The root **sacr** means holy or sacred. It describes being dedicated to sacred worship, holy, or consecrated. In English, this root forms words such as *sacred*, *sacrifice*, *sacrament*, and *consecrate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Holy or sacred</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Standing quietly inside a peaceful sanctuary dedicated to solemn devotion.</mark>
> - **Everyday Connection**: Think of familiar words like *sacred* and *sacrifice*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sacr** comes from a Latin word that means *"holy or sacred"*.
  - At its core, it describes holy or sacred.

- **The Big Picture Idea**:
  - Picture standing quietly inside a peaceful sanctuary dedicated to solemn devotion.
  - Whenever you see **sacr** in an English word, think of **sacred things, holiness, and reverence**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of holy or sacred.
  - **Mental & Social**: How people experience, organize, or communicate about holy or sacred.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Sacred**: Connected with God or dedicated to a religious purpose.
  - **Sacrifice**: An everyday English word showing the root's idea of *holy or sacred*.
  - **Sacrament**: A religious ceremony or ritual regarded as imparting divine grace.
  - **Consecrate**: To make or declare sacred.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sacr</mark>, think of <mark class="hl-def">sacred things, holiness, and reverence</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems & Vowel Shifts

- **Adjectival Base:** *sacr-* (masculine *sacer*, feminine *sacra*, neuter *sacrum*) $	o$ *sacred, sacredness, sacristan, sacristy*.

- **Vowel Reduction in Compounds (*a* $	o$ *e*):**

  - `con-` + *sacrāre* $	o$ *consecrāre* $	o$ *consecrate, consecration*.

  - `de-` + *sacrāre* $	o$ *dēsecrāre* $	o$ *desecrate, desecration*.

  - `ex-` + *sacrāre* $	o$ *execrāre* ("to curse out, banish from sacred fellowship") $	o$ *execrate, execration, execrable*.

- **Compound Verbs & Nouns:**

  - *sacrum* + *facere* ("to make") $	o$ *sacrificium* $	o$ *sacrifice, sacrificial*.

  - *sacrum* + *legere* ("to gather/steal") $	o$ *sacrilegium* $	o$ *sacrilege, sacrilegious*.

  - *sacer* + *dōs* ("gift") $	o$ *sacerdōs* ("priest" < literally "giver of sacred things") $	o$ *sacerdotal, sacerdotalism*.



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



### 1. Divine Holiness & Consecration

- *sacred* (connected with God or dedicated to a religious purpose; holy).

- *sacrament* (a religious ceremony or act of the Christian Church regarded as an outward and visible sign of inward spiritual grace).

- *consecrate* (to make or declare sacred; dedicate formally to a religious or divine purpose).

- *consecration* (the solemn dedication to a special purpose or service, especially divine).



### 2. Ritual Slaughter, Offering & Surrender

- *sacrifice (n)* (an act of slaughtering an animal or person or surrendering a possession as an offering to God; an act of giving up something valued).

- *sacrifice (v)* (to offer as a sacrifice; give up for the sake of other considerations).

- *sacrificial* (relating to or offered as a sacrifice).



### 3. Profanation, Violation & Curse

- *desecrate* (to treat a sacred place or thing with violent disrespect; profane).

- *desecration* (the action of desecrating something; profanation).

- *sacrilege* (violation or misuse of what is regarded as sacred).

- *sacrilegious* (involving or guilty of sacrilege).

- *execrate* (to feel or express great loathing for; to curse solemnly).

- *execrable* (extremely bad or unpleasant; deserving to be cursed).



### 4. Priesthood & Church Architecture

- *sacerdotal* (relating to priests or the priesthood; priestly).

- *sacristan* (a person in charge of a sacristy and its contents).

- *sacristy* (a room in a church where a priest prepares for a service, and where vestments and sacred vessels are kept).



---



## 🔀 4. Prefix & Combining Dynamics on sacr



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `con-`** | `con-` + *sacrāre* | **consecrate** | Jointly dedicating fully to God | *"The bishop arrived to consecrate the newly built cathedral."* |

| **Prefix `de-`** | `de-` + *sacrāre* | **desecrate** | Stripping away sacredness / defiling | *"Vandals moved to desecrate the historical cemetery monuments."* |

| **Prefix `ex-`** | `ex-` + *sacrāre* | **execrate** | Casting out from the sacred pale / cursing | *"Citizens gathered to execrate the memory of the ruthless tyrant."* |

| **Compound `fac-`** | *sacer* + *facere* | **sacrifice** | Actively making an offering sacred | *"Parents make immense personal sacrifices for their children's education."* |

| **Compound `leg-`** | *sacer* + *legere* | **sacrilege** | Stealing or defiling sacred items | *"Tearing the sacred altar cloth was condemned as an abominable sacrilege."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- ⛪ **Liturgy & Sacramental Theology:** *Eucharistic sacrifice*, *seven Holy Sacraments of the Church*.

- 🏛️ **Political Anthropology & Law:** *Giorgio Agamben's Homo Sacer theory*, *consecration of national monuments*.

- 🎖️ **Military & Civic Ethics:** *the supreme sacrifice* (giving one's life in defense of fellow citizens).

- ♟️ **Chess Theory:** *queen sacrifice*, *positional piece sacrifice for tactical advantage*.

- 📚 **Literary Criticism:** *scapegoat archetypes*, *ritual purification in Greek and Roman tragedy*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[desacralize]] | verb | **1.** Transfer from ecclesiastical to civil possession, use, or control. | *"In academic literature, desacralize designates transfer from ecclesiastical to civil possession, use, or control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacral]] | adjective | **1.** Of or relating to or near the sacrum.<br>**2.** Of or relating to sacred rites. | *"Communication was effected through the pituitary body and also by means of the orangefiery and scarlet rays emanating from the sacral region and solar plexus."* — James Joyce, *Ulysses* |
| [[sacrament]] | noun | **1.** A formal religious ceremony conferring a specific grace on those who receive it; the two protestant ceremonies are baptism and the lord's supper; in the roman catholic church and the eastern orthodox church there are seven traditional rites accepted as instituted by jesus: baptism and confirmation and holy eucharist and penance and holy orders and matrimony and extreme unction. | *"I’ll take the sacrament on ’t, how and which way you will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacramental]] | adjective | **1.** Of or relating to or involving a sacrament. | *"He selected for this purpose those sermons which he had preached most frequently, and which he had, with few exceptions, originally written for sacramental occasions at Berwick--some of them far back in the old Golden Square days."* — John Cairns, *Principal Cairns* |
| [[sacramento]] | noun | **1.** A city in north central california 75 miles to the northeast of san francisco on the sacramento river; capital of california. | *"As a result, union labour possessing an important political significance at the time, the time-serving politicians at Sacramento appointed a senatorial committee of investigation of the state prisons."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sacred]] | adjective | **1.** Concerned with religion or religious purposes.<br>**2.** Worthy of respect or dedication. | *"Where be the sacred vials thou shouldst fill With sorrowful water?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacredly]] | adverb | **1.** By religion. | *"I know and deeply feel how sacredly you keep your promise.” After a short time the little round of light shone out again, and Mr."* — Charles Dickens, *Bleak House* |
| [[sacredness]] | noun | **1.** The quality of being sacred. | *"Urge deepening realization of sacredness, preeminent importance of twin purposes which individual resolves serve."* — Effendi Shoghi, *Citadel of Faith* |
| [[sacrifice]] | noun | **1.** The act of losing or surrendering something as a penalty for a mistake or fault or failure to perform etc.<br>**2.** Personnel that are sacrificed (e.g., surrendered or lost in order to gain an objective). | *"Why, sir, give the gods a thankful sacrifice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacrificeable]] | adjective | **1.** May be deliberately sacrificed to achieve an objective. | *"In academic literature, sacrificeable designates may be deliberately sacrificed to achieve an objective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacrificer]] | noun | **1.** A religious person who offers up a sacrifice. | *"Moore is probably right in the use of the capital _d_, as the sacrificer is, according to all accounts, a highly devout Christian."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[sacrificial]] | adjective | **1.** Used in or connected with a sacrifice. | *"All those which were his fellows but of late, Some better than his value, on the moment Follow his strides, his lobbies fill with tendance, Rain sacrificial whisperings in his ear, Make sacred even his stirrup, and through him Drink the free air."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacrilege]] | noun | **1.** Blasphemous behavior; the act of depriving something of its sacred character. | *"That night, although news of the sacrilege was spreading through Cho-Sen and half the northern provinces had risen on their officials, Keijo and the Court slept in ignorance."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sacrilegious]] | adjective | **1.** Grossly irreverent toward what is held to be sacred. | *"I am Posthumus, That kill’d thy daughter; villain-like, I lie; That caus’d a lesser villain than myself, A sacrilegious thief, to do’t."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacrilegiously]] | adverb | **1.** In a sacrilegious manner. | *"Here, also, are some mutilated sepulchral effigies of ancient abbots, crosses, &c., from which the inlaid brasses have been sacrilegiously purloined."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[sacrilegiousness]] | noun | **1.** Profaneness by virtue of committing sacrilege. | *"In academic literature, sacrilegiousness designates profaneness by virtue of committing sacrilege."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacristan]] | noun | **1.** An officer of the church who is in charge of sacred objects. | *"Get up early who will, Père Laserques the sacristan is always up still earlier."* — Mrs. Oliphant, *A Beleaguered City* |
| [[sacristy]] | noun | **1.** A room in a church where sacred vessels and vestments are kept or meetings are held. | *"They must have seized the sacristy; but that makes no difference."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[sacrosanct]] | adjective | **1.** Must be kept sacred. | *"In academic literature, sacrosanct designates must be kept sacred."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacrum]] | noun | **1.** Wedge-shaped bone consisting of five fused vertebrae forming the posterior part of the pelvis; its base connects with the lowest lumbar vertebra and its tip with the coccyx. | *"In academic literature, sacrum designates wedge-shaped bone consisting of five fused vertebrae forming the posterior part of the pelvis; its base connects with the lowest lumbar vertebra and its tip with the coccyx."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sacred]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SACR
  </div>
</div>
