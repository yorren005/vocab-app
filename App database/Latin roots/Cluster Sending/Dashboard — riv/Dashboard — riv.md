---
status: unread
type: root_dashboard
---
# Dashboard — riv
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">riv-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stream”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Releasing a messenger or sending a written letter on a long journey.</span>
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

The root **riv** means stream. It refers to a small brook, running stream, or flowing creek. In English, this root forms words such as *run*, *river*, *rivulet*, and *riviera*.

---



## 💡 Core Meaning

> [!example] ✨ Core Concept: stream
> The root **riv** means stream. It refers to a small brook, running stream, or flowing creek. In English, this root forms words such as *run*, *river*, *rivulet*, and *riviera*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Stream</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Releasing a messenger or sending a written letter on a long journey.</mark>
> - **Everyday Connection**: Think of familiar words like *run* and *river*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **riv** comes from a Latin word that means *"stream"*.
  - At its core, it describes stream.

- **The Big Picture Idea**:
  - Picture releasing a messenger or sending a written letter on a long journey.
  - Whenever you see **riv** in an English word, think of **sending outward and dispatching**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of stream.
  - **Mental & Social**: How people experience, organize, or communicate about stream.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Run**: An everyday English word showing the root's idea of *stream*.
  - **River**: A large natural stream of water flowing in a channel to the sea, a lake, or another river.
  - **Rivulet**: A very small stream or brook of water.
  - **Riviera**: A coastal region with a warm climate, especially the French and Italian Mediterranean coasts.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">riv</mark>, think of <mark class="hl-def">sending outward and dispatching</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine



### 2.1 Morphological Stems

- **Hydrological Base:** *rīv-* (*rīvus*, diminutive *rīvulus*) $	o$ *river, rivulet, riviera*.

- **Hydraulic / Deductive Compounding:** `de-` + *rīvus* $	o$ *dērīvō, dērīvāre* $	o$ *derive, derivation, derivative, derivable*.

- **Sociological / Competition Stem:** *rīvālis* $	o$ *rival, rivalry, unrivaled*.

- **Shoreline / Arrival Blend:** *ad-* + *rīpa / rīvus* $	o$ *arrive, arrival*.



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



### 1. Geography, Hydrology & Topography

- *river* (a large natural stream of water flowing in a channel to the sea, a lake, or another stream).

- *rivulet* (a small stream of water or liquid).

- *riviera* (a coastal region with a subtropical climate and vegetation, especially along the Mediterranean).

- *arrive* (reach a destination at the end of a journey; literally "touch the riverbank").

- *arrival* (the action or process of arriving).



### 2. Mathematics, Linguistics & Logic

- *derive* (obtain something from a specified source; trace the derivation of a word; deduce).

- *derivation* (the obtaining or developing of something from a source; origin; formation of a word).

- *derivative (adj)* (imitative of the work of another person; derived from something else).

- *derivative (n)* (something based on another source; in calculus, the instantaneous rate of change of a function).

- *derivable* (capable of being derived or deduced).



### 3. Competition, Athletics & Commerce

- *rival (n)* (a person or thing competing with another for the same objective or for superiority).

- *rival (v)* (compete with; be the equal of or match for).

- *rival (adj)* (competing with another person or thing).

- *rivalry* (competition for the same objective or for superiority in the same field).

- *unrivaled* (better than everyone or everything of the same type; peerless).



---



## 🔀 4. Prefix & Combining Dynamics on riv



| Affix Dynamic | Morphological Formula | English Derivative | Semantic Vector | Example Context |

|:---|:---|:---|:---|:---|

| **Prefix `de-`** | `de-` + *rīvāre* | **derive** | Leading water away from source | *"Scientists derive active pharmaceutical compounds from marine sponges."* |

| **Action `-tion`** | *dērīvāre* + *-tiō* | **derivation** | The process of tracing back to source | *"The etymological dictionary traced the historical derivation of each word."* |

| **Sociological `-alis`**| *rīvus* + *-ālis* | **rival** | Contending over a shared brook | *"The two tech titans emerged as fierce rivals in artificial intelligence."* |

| **Diminutive `-ulet`** | *rīvulus* | **rivulet** | A tiny flowing trickle | *"A cold mountain rivulet meandered through the fern-filled hollow."* |

| **Negative `un-`** | `un-` + *rival* + *-ed* | **unrivaled** | Lacking any competitor | *"The pianist displayed an unrivaled technical mastery of the concerto."* |



---



## 🌐 5. Disciplinary & Real-World Domains



- 📐 **Calculus & Advanced Mathematics:** *first and second derivatives*, *derivative of a polynomial function*.

- 💼 **Finance & Capital Markets:** *financial derivatives* (options, futures, credit default swaps whose value derives from underlying assets).

- 🗣️ **Historical Linguistics & Etymology:** *morphological derivation vs inflection*.

- 🏟️ **Sports Culture & Business:** *cross-town athletic rivalries*, *corporate rivalry in patent litigation*.

- 🗺️ **Hydrology & Environmental Engineering:** *river basin management*, *diversion channels for flood control*.



---



## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arrival]] | noun | **1.** Accomplishment of an objective.<br>**2.** The act of arriving at a certain place. | *"This very day a Syracusian merchant Is apprehended for arrival here, And, not being able to buy out his life, According to the statute of the town Dies ere the weary sun set in the west."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arrive]] | verb | **1.** Reach a destination; arrive by movement or progress.<br>**2.** Succeed in a big way; get to the top. | *"But ere we could arrive the point propos’d, Caesar cried, “Help me, Cassius, or I sink!” I, as Aeneas, our great ancestor, Did from the flames of Troy upon his shoulder The old Anchises bear, so from the waves of Tiber Did I the tired Caesar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arrivederci]] | noun | **1.** A farewell remark. | *"In academic literature, arrivederci designates a farewell remark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arriver]] | noun | **1.** Someone who arrives (or has arrived). | *"In academic literature, arriver designates someone who arrives (or has arrived)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arriviste]] | noun | **1.** A person who has suddenly risen to a higher economic status but has not gained social acceptance of others in that class. | *"In academic literature, arriviste designates a person who has suddenly risen to a higher economic status but has not gained social acceptance of others in that class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derivable]] | adjective | **1.** Capable of being derived. | *"No such impression is derivable from the voluminous poetry of Browning."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[derivation]] | noun | **1.** The source or origin from which something derives (i.e. comes or issues).<br>**2.** (historical linguistics) an explanation of the historical origins of a word or phrase. | *"The etymology of the word Beltane is uncertain; the popular derivation of the first part from the Phoenician Baal is absurd."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[derivational]] | adjective | **1.** Characterized by inflections indicating a semantic relation between a word and its base. | *"In academic literature, derivational designates characterized by inflections indicating a semantic relation between a word and its base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derivative]] | noun | **1.** The result of mathematical differentiation; the instantaneous change of one quantity relative to another; df(x)/dx.<br>**2.** A compound obtained from, or regarded as derived from, another compound. | *"For honour, ’Tis a derivative from me to mine, And only that I stand for."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[derive]] | verb | **1.** Reason by deduction; establish by deduction.<br>**2.** Obtain. | *"Honours thrive When rather from our acts we them derive Than our fore-goers."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[derived]] | verb | **1.** Reason by deduction; establish by deduction.<br>**2.** Obtain. | *"My son corrupts a well-derived nature With his inducement."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deriving]] | noun | **1.** (historical linguistics) an explanation of the historical origins of a word or phrase.<br>**2.** Reason by deduction; establish by deduction. | *"Deriving his idiosyncrasies from both sides of the Channel, he showed at such junctures as the present the inelasticity of the Englishman, together with that blindness to the line where sentiment verges on mawkishness, characteristic of the French."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[erivan]] | noun | **1.** Capital of armenia. | *"In academic literature, erivan designates capital of armenia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rival]] | noun | **1.** The contestant you hope to defeat.<br>**2.** Be equal to in quality or ability. | *"O my Antonio, had I but the means To hold a rival place with one of them, I have a mind presages me such thrift That I should questionless be fortunate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rivalrous]] | adjective | **1.** Eager to surpass others. | *"In academic literature, rivalrous designates eager to surpass others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rivalry]] | noun | **1.** The act of competing as for profit or a prize. | *"No sooner did the dark queen hear the soberer richer note of Tess among those of the other work-people than a long-smouldering sense of rivalry inflamed her to madness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[rive]] | verb | **1.** Tear or be torn violently.<br>**2.** Separate or cut with a tool, such as a sharp instrument. | *"The soul and body rive not more in parting Than greatness going off."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[river]] | noun | **1.** A large natural stream of water (larger than a creek). | *"When she first met Mark Antony, she pursed up his heart upon the river of Cydnus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rivera]] | noun | **1.** Socialist mexican painter of murals (1886-1957). | *"In academic literature, rivera designates socialist mexican painter of murals (1886-1957)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[riverbank]] | noun | **1.** The bank of a river. | *"Catching sight of Laura he slipped across a low boundary wall, his brown mare, a thoroughbred, changing her feet in a ladylike way on the worn stones, and trotted down to the riverbank, raising his cap."* — Anthony Pryde, *Nightfall* |
| [[riverbed]] | noun | **1.** A channel occupied (or formerly occupied) by a river. | *"Asking what they were doing, he was told that there was a famous spring at the bottom of the river well known from the time when the riverbed was dry land."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[riverside]] | noun | **1.** The bank of a river.<br>**2.** A city in southern california. | *"It is the vilest murder-trap on the whole riverside, and I fear that Neville St."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[rivet]] | noun | **1.** Ornament consisting of a circular rounded protuberance (as on a vault or shield or belt).<br>**2.** Heavy pin having a head at one end and the other end being hammered flat after being passed through holes in the pieces that are fastened together. | *"Give him heedful note; For I mine eyes will rivet to his face; And after we will both our judgements join In censure of his seeming."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[riveter]] | noun | **1.** A worker who inserts and hammers rivets.<br>**2.** A machine for driving rivets. | *"In academic literature, riveter designates a worker who inserts and hammers rivets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[riveting]] | verb | **1.** Direct one's attention on something.<br>**2.** Fasten with a rivet or rivets. | *"When those invasions were renewed; when the efficacy and malignancy of them were attempted to be redoubled by the stamp act; when chains were formed for us; and preparations were made for riveting them on our limbs, what measures did we pursue?"* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[rivetter]] | noun | **1.** A worker who inserts and hammers rivets.<br>**2.** A machine for driving rivets. | *"In academic literature, rivetter designates a worker who inserts and hammers rivets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[riviera]] | noun | **1.** A coastal area between la spezia in italy and cannes in france. | *"He’s on his way to the Riviera and I’ve not yet heard from him."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[rivina]] | noun | **1.** Small genus of erect perennial shrubby herbs; tropical and subtropical america. | *"In academic literature, rivina designates small genus of erect perennial shrubby herbs; tropical and subtropical america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rivulet]] | noun | **1.** A small stream. | *"Burnie, dim. of burn, a rivulet."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[rivulus]] | noun | **1.** Found in small streams of tropical america; often kept in aquariums; usually hermaphroditic. | *"In academic literature, rivulus designates found in small streams of tropical america; often kept in aquariums; usually hermaphroditic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underivative]] | adjective | **1.** Not derivative or imitative. | *"In academic literature, underivative designates not derivative or imitative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underived]] | adjective | **1.** Not derived; primary or simple. | *"In academic literature, underived designates not derived; primary or simple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrivaled]] | adjective | **1.** Eminent beyond or above comparison. | *"On either side of the walk were bushes, long since placed without the discriminating eye of a landscape gardener but holding in their very randomness a charm unrivaled by any precise planting."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[unrivalled]] | adjective | **1.** Eminent beyond or above comparison. | *"Sir Clifford thinks of charging twopence for a peep at the whispering gallery in the spinal column; threepence to hear the echo in the hollow of his cerebellum; and sixpence for the unrivalled view from his forehead."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sending]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RIV
  </div>
</div>
