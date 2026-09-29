---
status: unread
type: root_dashboard
---
# Dashboard — hum
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hum-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“human or man”</span>
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

The root **hum** means human or man. It refers to an adult male human or humanity as a whole. In English, this root forms words such as *god*, *divine*, *exhumation*, and *exhume*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: human or man
> The root **hum** means human or man. It refers to an adult male human or humanity as a whole. In English, this root forms words such as *god*, *divine*, *exhumation*, and *exhume*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Human or man</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Neighbors working together in a shared neighborhood to help one another.</mark>
> - **Everyday Connection**: Think of familiar words like *god* and *divine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hum** comes from a Latin word that means *"human or man"*.
  - At its core, it describes human or man.

- **The Big Picture Idea**:
  - Picture neighbors working together in a shared neighborhood to help one another.
  - Whenever you see **hum** in an English word, think of **community, society, and shared life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of human or man.
  - **Mental & Social**: How people experience, organize, or communicate about human or man.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **God**: An everyday English word showing the root's idea of *human or man*.
  - **Divine**: An everyday English word showing the root's idea of *human or man*.
  - **Exhumation**: The action of digging up something buried, especially a human corpse.
  - **Exhume**: To dig out something buried, especially a corpse, from the ground.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hum</mark>, think of <mark class="hl-def">community, society, and shared life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Human Species Base (`homō, hominis`):**
  - *human*, *humane*, *humanity*, *humanitarian*, *humanism*, *humanize*, *inhuman*, *inhumane*.
  - *hominid* (member of the biological family Hominidae).
  - *homage* (feudal oath of becoming the lord's man).
- **Earth / Ground Base (`humus`):**
  - *humus* (organic soil component).
  - `ex-` + *humus* $\to$ *exhume* (dig up from the earth), *exhumation*.
  - *posthumous* (folk etymology < *post humus*).
- **Lowliness Base (`humilis`):**
  - *humble*, *humility*.
  - *humiliate* (bring low to the ground), *humiliation*, *humiliating*.

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

### 1. The Human Species & Compassion
- *human* (relating to or characteristic of humankind).
- *humane* (having or showing compassion or benevolence).
- *humanity* (the human race; the quality of being humane; the humanities).
- *humanitarian* (concerned with or seeking to promote human welfare).
- *inhuman* (lacking human qualities of compassion and mercy; cruel).
- *inhumane* (without compassion for misery or suffering; cruel).

### 2. Lowliness, Modesty & Degradation
- *humble* (having or showing a modest or low estimate of one's own importance; of low social rank).
- *humility* (a modest or low view of one's own importance; humbleness).
- *humiliate* (make someone feel ashamed and foolish by injuring their dignity).
- *humiliation* (the state of being humiliated; mortification).

### 3. Soil, Archaeology & Forensic Medicine
- *humus* (the organic component of soil, formed by the decomposition of leaves and plant material).
- *exhume* (dig out something buried, especially a corpse, from the ground).
- *exhumation* (the action of digging up something buried).
- *posthumous* (occurring, awarded, or appearing after the death of the originator).

---

## 🔀 4. Prefix & Combining Dynamics on hum

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `hum-` + `-an` | Species relational | Belonging to the mortal, earthborn human family | *human, humanity* |
| `hum-` + `-ane` | Ethical quality | Possessing the tenderness, empathy, and mercy of civilized humanity | *humane, inhumane* |
| `humil-` + `-ity` | Moral virtue | Staying close to the ground; freedom from pride and hubris | *humility, humble* |
| `humili-` + `-ate` | Degrading factitive | Knocking someone down into the dirt; destroying dignity | *humiliate, humiliation* |
| `ex-` + `hum-` + `-e` | Extraction prefix | Digging a body out from the cold earth for forensic autopsy | *exhume, exhumation* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Forensic Pathology & Criminal Justice:** Judicial exhumation orders, forensic anthropology.
- **Agronomy & Soil Science:** Humus content, soil carbon sequestration, topsoil depletion.
- **International Humanitarian Law:** The Geneva Conventions, humanitarian corridors, crimes against humanity.
- **Evolutionary Anthropology:** Fossil hominids, *Homo sapiens*, *Homo neanderthalensis*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[dehumanisation]] | noun | **1.** The act of degrading people with respect to their best qualities. | *"In academic literature, dehumanisation designates the act of degrading people with respect to their best qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehumanise]] | verb | **1.** Deprive of human qualities.<br>**2.** Make mechanical or routine. | *"In academic literature, dehumanise designates deprive of human qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehumanised]] | verb | **1.** Deprive of human qualities.<br>**2.** Make mechanical or routine. | *"In academic literature, dehumanised designates deprive of human qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehumanization]] | noun | **1.** The act of degrading people with respect to their best qualities. | *"In academic literature, dehumanization designates the act of degrading people with respect to their best qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehumanize]] | verb | **1.** Deprive of human qualities.<br>**2.** Make mechanical or routine. | *"I combat it as having a tendency to dehumanize the negro—to take away from him the right of ever striving to be a man."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[dehumanized]] | verb | **1.** Deprive of human qualities.<br>**2.** Make mechanical or routine. | *"In academic literature, dehumanized designates deprive of human qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehumidify]] | verb | **1.** Make less humid. | *"In academic literature, dehumidify designates make less humid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exhumation]] | noun | **1.** The act of digging something out of the ground (especially a corpse) where it has been buried. | *"In academic literature, exhumation designates the act of digging something out of the ground (especially a corpse) where it has been buried."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exhume]] | verb | **1.** Dig up for reburial or for medical investigation; of dead bodies. | *"This monster whose remains we were now exhuming was allied to the alligator, as one of the great family of lizards, and had died in the same manner--his head on the shores of the basin, his tail in its depths."* — W. E. Webb, *Buffalo Land* |
| [[hum]] | noun | **1.** The state of being or appearing to be actively engaged in an activity.<br>**2.** An islamic fundamentalist group in pakistan that fought the soviet union in afghanistan in the 1980s; now operates as a terrorist organization primarily in kashmir and seeks kashmir's accession by pakistan. | *"Yet to bite his lip And hum at good Cominius much unhearts me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[human]] | noun | **1.** Any living or extinct member of the family hominidae characterized by superior intelligence, articulate speech, and erect carriage.<br>**2.** Characteristic of humanity. | *"I know into what straits of fortune she is driven and it is not impossible to me, if it appear not inconvenient to you, to set her before your eyes tomorrow, human as she is, and without any danger."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[human-centered]] | adjective | **1.** Marked by humanistic values and devotion to human welfare. | *"In academic literature, human-centered designates marked by humanistic values and devotion to human welfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[human-centred]] | adjective | **1.** Marked by humanistic values and devotion to human welfare. | *"In academic literature, human-centred designates marked by humanistic values and devotion to human welfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[human-sized]] | adjective | **1.** Having the approximate size of a human being. | *"In academic literature, human-sized designates having the approximate size of a human being."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humane]] | adjective | **1.** Pertaining to or concerned with the humanities.<br>**2.** Marked or motivated by concern with the alleviation of suffering. | *"Noble tribunes, It is the humane way: the other course Will prove too bloody, and the end of it Unknown to the beginning."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humanely]] | adverb | **1.** In a humane manner. | *"If they would yield us but the superfluity while it were wholesome, we might guess they relieved us humanely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humaneness]] | noun | **1.** The quality of compassion or consideration for others (people or animals). | *"As I have said, every convict testified to the humaneness of Warden Atherton’s administration."* — Jack London, *The Jacket (The Star-Rover)* |
| [[humanisation]] | noun | **1.** The act of making more human. | *"In academic literature, humanisation designates the act of making more human."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humanise]] | verb | **1.** Make more humane. | *"She wanted—what some people want throughout life—a grief that should deeply touch her, and thus humanise and make her capable of sympathy."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[humanism]] | noun | **1.** The doctrine that people's duty is to promote human welfare.<br>**2.** The doctrine emphasizing a person's capacity for self-realization through reason; rejects religion and the supernatural. | *"In academic literature, humanism designates the doctrine that people's duty is to promote human welfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humanist]] | noun | **1.** A classical scholar or student of the liberal arts.<br>**2.** An advocate of the principles of humanism; someone concerned with the interests and welfare of humans. | *"Can the drunken old Poets make up my Vines? (I know they can drink 'em) or your excellent Humanists sell 'em the Merchants for my best advantage?"* — John Fletcher, *The Elder Brother* |
| [[humanistic]] | adjective | **1.** Of or pertaining to a philosophy asserting human dignity and man's capacity for fulfillment through reason and scientific method and often rejecting religion; - wendell thomas.<br>**2.** Of or pertaining to renaissance humanism. | *"In academic literature, humanistic designates of or pertaining to a philosophy asserting human dignity and man's capacity for fulfillment through reason and scientific method and often rejecting religion; - wendell thomas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humanitarian]] | noun | **1.** Someone devoted to the promotion of human welfare and to social reforms.<br>**2.** An advocate of the principles of humanism; someone concerned with the interests and welfare of humans. | *"She had truly never thought so far as that, and his lucid picture of possible offspring who would scorn her was one that brought deadly convictions to an honest heart which was humanitarian to its centre."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[humanitarianism]] | noun | **1.** The doctrine that people's duty is to promote human welfare. | *"In academic literature, humanitarianism designates the doctrine that people's duty is to promote human welfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humanities]] | noun | **1.** Studies intended to provide general knowledge and intellectual skills (rather than occupational or professional skills).<br>**2.** The quality of being humane. | *"The humanities and amenities of life had no attraction for him—its peaceful enjoyments no charm."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[humanity]] | noun | **1.** The quality of being humane.<br>**2.** The quality of being human. | *"A rarer spirit never Did steer humanity, but you gods will give us Some faults to make us men."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humanization]] | noun | **1.** The act of making more human. | *"This definition has been weakened by anthropo- 517:3 morphism, or a humanization of Deity."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[humanize]] | verb | **1.** Make more humane. | *"I’ve seen hundreds worse looking at your time of life, I have indeed.” The fair Volumnia, not quite unconscious perhaps of the humanizing influence of her charms, pauses in the writing of cocked-hat notes and meditatively adjusts the pearl necklace."* — Charles Dickens, *Bleak House* |
| [[humankind]] | noun | **1.** All of the living human inhabitants of the earth. | *"To all humankind besides, Tess was only a passing thought."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[humanlike]] | adjective | **1.** Suggesting human characteristics for animals or inanimate things. | *"In academic literature, humanlike designates suggesting human characteristics for animals or inanimate things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humanly]] | adverb | **1.** In the manner of human beings. | *"Now, Charley,” said I after letting her go on for a little while, “if I am to be ill, my great trust, humanly speaking, is in you."* — Charles Dickens, *Bleak House* |
| [[humanness]] | noun | **1.** The quality of being human. | *"And yet I ever found in Jake Oppenheimer all the cardinal traits of right humanness."* — Jack London, *The Jacket (The Star-Rover)* |
| [[humanoid]] | noun | **1.** An automaton that resembles a human being. | *"In academic literature, humanoid designates an automaton that resembles a human being."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humans]] | noun | **1.** All of the living human inhabitants of the earth.<br>**2.** Any living or extinct member of the family hominidae characterized by superior intelligence, articulate speech, and erect carriage. | *"Populated by humans and their robots, colonies extended from the voids above Mercury and Venus through the Asteroids, the satellites of the gas planets, to Planet Pluto."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[humate]] | noun | **1.** Material that is high in humic acids. | *"In academic literature, humate designates material that is high in humic acids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humble]] | verb | **1.** Cause to be unpretentious.<br>**2.** Cause to feel shame; hurt the pride of. | *"But since your worth, wide as the ocean is, The humble as the proudest sail doth bear, My saucy bark (inferior far to his) On your broad main doth wilfully appear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humbled]] | verb | **1.** Cause to be unpretentious.<br>**2.** Cause to feel shame; hurt the pride of. | *"Who were below him He us’d as creatures of another place, And bow’d his eminent top to their low ranks, Making them proud of his humility, In their poor praise he humbled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humbleness]] | noun | **1.** The state of being humble and unimportant.<br>**2.** A humble feeling. | *"It is to be all made of fantasy, All made of passion, and all made of wishes, All adoration, duty, and observance, All humbleness, all patience, and impatience, All purity, all trial, all observance, And so am I for Phoebe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humbling]] | verb | **1.** Cause to be unpretentious.<br>**2.** Cause to feel shame; hurt the pride of. | *"The gods themselves, Humbling their deities to love, have taken The shapes of beasts upon them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hume]] | noun | **1.** Scottish philosopher whose sceptical philosophy restricted human knowledge to that which can be perceived by the senses (1711-1776). | *"But, by the grace of God, and Hume’s advice, Your grace’s title shall be multiplied."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humectant]] | noun | **1.** Any substance that is added to another substance to keep it moist. | *"In academic literature, humectant designates any substance that is added to another substance to keep it moist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humerus]] | noun | **1.** Bone extending from the shoulder to the elbow. | *"In academic literature, humerus designates bone extending from the shoulder to the elbow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humic]] | adjective | **1.** Of or relating to or derived from humus. | *"In academic literature, humic designates of or relating to or derived from humus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humid]] | adjective | **1.** Containing or characterized by a great deal of water vapor. | *"We’ll push on,” said Gabriel, remounting his humid steed."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[humidify]] | verb | **1.** Make (more) humid. | *"In academic literature, humidify designates make (more) humid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humidity]] | noun | **1.** Wetness in the atmosphere. | *"We’ll use this unwholesome humidity, this gross watery pumpion; we’ll teach him to know turtles from jays."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humidness]] | noun | **1.** Wetness in the atmosphere. | *"In academic literature, humidness designates wetness in the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humification]] | noun | **1.** The process of the formation of humus from plant remains. | *"In academic literature, humification designates the process of the formation of humus from plant remains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humified]] | adjective | **1.** Converted to humus. | *"In academic literature, humified designates converted to humus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humify]] | verb | **1.** Convert (plant remains) into humus. | *"In academic literature, humify designates convert (plant remains) into humus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humiliate]] | verb | **1.** Cause to feel shame; hurt the pride of. | *"Since that night that Polk humiliated me as completely as a man can humiliate a woman, he has looked at me like a whipped child, and I haven't looked at him at all I have used Jane as a wide-spread fan behind which to hide from him."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[humiliated]] | verb | **1.** Cause to feel shame; hurt the pride of.<br>**2.** Subdued or brought low in condition or status. | *"I was so humiliated, hurt, spurned, offended, angry, sorry,—I cannot hit upon the right name for the smart—God knows what its name was,—that tears started to my eyes."* — Charles Dickens, *Great Expectations* |
| [[humiliating]] | verb | **1.** Cause to feel shame; hurt the pride of.<br>**2.** Causing awareness of your shortcomings. | *"It was so humiliating to reflect on the constant deception practised on her father and Elizabeth; to consider the various sources of mortification preparing for them!"* — Jane Austen, *Persuasion* |
| [[humiliatingly]] | adverb | **1.** In a humiliating manner. | *"That was all there was of it--he had failed, failed so absolutely, so humiliatingly, so publicly--this was the way he put it to himself--that he was in disgrace."* — Grace S. Richmond, *Red Pepper Burns* |
| [[humiliation]] | noun | **1.** State of disgrace or loss of self-respect.<br>**2.** Strong feelings of embarrassment. | *"I raised my mother up, praying and beseeching her not to stoop before me in such affliction and humiliation."* — Charles Dickens, *Bleak House* |
| [[humility]] | noun | **1.** A disposition to be humble; a lack of false pride.<br>**2.** A humble feeling. | *"Who were below him He us’d as creatures of another place, And bow’d his eminent top to their low ranks, Making them proud of his humility, In their poor praise he humbled."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humin]] | noun | **1.** A black humic substance that is not soluble in water. | *"In academic literature, humin designates a black humic substance that is not soluble in water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hummer]] | noun | **1.** A singer who produces a tune without opening the lips or forming words.<br>**2.** (baseball) a pitch thrown with maximum velocity. | *"If so, come to Wingham this summer, Forget the world's trouble and strife, Our program will sure be a hummer, We'll give you the time of your life."* — Abner Cosens, *War Rhymes by Wayfarer* |
| [[humming]] | noun | **1.** A humming noise.<br>**2.** The act of singing with closed lips. | *"Upon mine honour, sir, I heard a humming, And that a strange one too, which did awake me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hummingbird]] | noun | **1.** Tiny american bird having brilliant iridescent plumage and long slender bills; wings are specialized for vibrating flight. | *"In academic literature, hummingbird designates tiny american bird having brilliant iridescent plumage and long slender bills; wings are specialized for vibrating flight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hummock]] | noun | **1.** A small natural hill. | *"We had just floundered and flopped round a bend, when I saw an islet, a mere grassy hummock of bright green, in the middle of the stream."* — Joseph Conrad, *Heart of Darkness* |
| [[hummus]] | noun | **1.** A thick spread made from mashed chickpeas, tahini, lemon juice and garlic; used especially as a dip for pita; originated in the middle east. | *"In academic literature, hummus designates a thick spread made from mashed chickpeas, tahini, lemon juice and garlic; used especially as a dip for pita; originated in the middle east."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humongous]] | adjective | **1.** (used informally) very large. | *"In academic literature, humongous designates (used informally) very large."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humor]] | noun | **1.** A message whose ingenuity or verbal skill or incongruity has the power to evoke laughter.<br>**2.** The trait of appreciating (and being able to express) the humorous. | *"That sickness left me with a bad humor, which, for two years, kept me covered with boils."* — Classic Author, *The wonders of prayer* |
| [[humoral]] | adjective | **1.** Of or relating to bodily fluids. | *"In academic literature, humoral designates of or relating to bodily fluids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humoring]] | noun | **1.** The act of indulging or gratifying a desire.<br>**2.** Put into a good mood. | *"Christine and Aunt Phillis, who had been left in charge of Miss Deane, had had a sore trial of patience in waiting upon her, humoring her whims, listening to her fretting and complaints, and trying to soothe and entertain her."* — Martha Finley, *Elsie's Kith and Kin* |
| [[humorist]] | noun | **1.** Someone who acts speaks or writes in an amusing way. | *"In Hoelderlin we have the ardent Hellenic idealist; Lenau gives expression to all the pathos of Weltschmerz, Heine is its satirist, the misanthrope, while in Raabe we even have a pessimistic humorist."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[humorless]] | adjective | **1.** Lacking humor; - truman capote. | *"In academic literature, humorless designates lacking humor; - truman capote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humorlessly]] | adverb | **1.** In a humorless manner. | *"In academic literature, humorlessly designates in a humorless manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humorous]] | adjective | **1.** Full of or characterized by humor. | *"The Duke is humorous; what he is indeed More suits you to conceive than I to speak of."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humorously]] | adverb | **1.** In a humorous manner. | *"So he replied, humorously— “Well, Lydgate is a good-looking young fellow, you know.” “Not one that _I_ would employ,” said Mrs."* — George Eliot, *Middlemarch* |
| [[humorousness]] | noun | **1.** The trait of merry joking. | *"The youngsters, not immediately within sight, seemed rather bright and desirable appurtenances than otherwise; the incidents of daily life were not without humorousness and jollity in their aspect there."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[humour]] | noun | **1.** A characteristic (habitual or relatively temporary) state of feeling.<br>**2.** A message whose ingenuity or verbal skill or incongruity has the power to evoke laughter. | *"And every humour hath his adjunct pleasure, Wherein it finds a joy above the rest, But these particulars are not my measure, All these I better in one general best."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[humourist]] | noun | **1.** Someone who acts speaks or writes in an amusing way. | *"The apothecary, after some interjections of hesitation, owned there was a doctor in the village, an odd sort of a humourist; but he believed he had not much to do in the way of his profession, and was not much used to the forms of prescription."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[humourless]] | adjective | **1.** Lacking humor; - truman capote. | *"In academic literature, humourless designates lacking humor; - truman capote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humourlessly]] | adverb | **1.** In a humorless manner. | *"In academic literature, humourlessly designates in a humorless manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humourous]] | adjective | **1.** Full of or characterized by humor. | *"FRANCIS BEAUMONT Born 1584 Died 1616 JOHN FLETCHER Born 1579 Died 1625 THE ELDER BROTHER THE SPANISH CURATE WIT WITHOUT MONEY BEGGARS BUSH THE HUMOUROUS LIEUTENANT THE FAITHFUL SHEPHERDESS THE TEXT EDITED BY ARNOLD GLOVER, M.A."* — John Fletcher, *The Elder Brother* |
| [[humous]] | noun | **1.** A thick spread made from mashed chickpeas, tahini, lemon juice and garlic; used especially as a dip for pita; originated in the middle east. | *"And came the day when I moved my cattle on, and my plough-men went back and forth across the slopes’ contour—ploughing the rich sod under to rot to live and crawling humous in which to bed my seeds of crops to be."* — Jack London, *The Jacket (The Star-Rover)* |
| [[humulin]] | noun | **1.** A form of insulin (trade name humulin) made from recombinant dna that is identical to human insulin; used to treat diabetics who are allergic to preparations made from beef or pork insulin. | *"In academic literature, humulin designates a form of insulin (trade name humulin) made from recombinant dna that is identical to human insulin; used to treat diabetics who are allergic to preparations made from beef or pork insulin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humulus]] | noun | **1.** Hops: hardy perennial vines of europe, north america and central and eastern asia producing a latex sap; in some classifications included in the family urticaceae. | *"In academic literature, humulus designates hops: hardy perennial vines of europe, north america and central and eastern asia producing a latex sap; in some classifications included in the family urticaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[humus]] | noun | **1.** Partially decomposed organic matter; the organic component of soil.<br>**2.** A thick spread made from mashed chickpeas, tahini, lemon juice and garlic; used especially as a dip for pita; originated in the middle east. | *"This prevents the growing of cover crops, and the sensitive soil, naked, a mere surface dust-mulch, has its humus burned out of it by the sun."* — Jack London, *The Jacket (The Star-Rover)* |
| [[infrahuman]] | adjective | **1.** Belonging to a group below humans in evolutionary development. | *"In academic literature, infrahuman designates belonging to a group below humans in evolutionary development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhuman]] | adjective | **1.** Without compunction or human feeling.<br>**2.** Belonging to or resembling something nonhuman. | *"If it should prove That thou art so inhuman,—’twill not prove so: And yet I know not, thou didst hate her deadly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inhumane]] | adjective | **1.** Lacking and reflecting lack of pity or compassion. | *"In academic literature, inhumane designates lacking and reflecting lack of pity or compassion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhumanely]] | adverb | **1.** In an inhumane manner. | *"In academic literature, inhumanely designates in an inhumane manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhumaneness]] | noun | **1.** The quality of lacking compassion or consideration for others. | *"In academic literature, inhumaneness designates the quality of lacking compassion or consideration for others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhumanity]] | noun | **1.** The quality of lacking compassion or consideration for others.<br>**2.** An act of atrocious cruelty. | *"It was a dreadful picture of ingratitude and inhumanity; and Anne felt, at some moments, that no flagrant open crime could have been worse."* — Jane Austen, *Persuasion* |
| [[inhumation]] | noun | **1.** The ritual placing of a corpse in a grave. | *"In academic literature, inhumation designates the ritual placing of a corpse in a grave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhume]] | verb | **1.** Place in a grave or tomb. | *"In academic literature, inhume designates place in a grave or tomb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inhumed]] | verb | **1.** Place in a grave or tomb.<br>**2.** Placed in a grave. | *"In academic literature, inhumed designates place in a grave or tomb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonhuman]] | adjective | **1.** Not human; not belonging to or produced by or appropriate to human beings. | *"In academic literature, nonhuman designates not human; not belonging to or produced by or appropriate to human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posthumous]] | adjective | **1.** Occurring or coming into existence after a person's death. | *"This help on his part was continued by his seeing through the press Wilson's posthumous book, _Counsels of an Invalid_, which appeared in 1862."* — John Cairns, *Principal Cairns* |
| [[posthumously]] | adverb | **1.** After death. | *"In academic literature, posthumously designates after death."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subhuman]] | adjective | **1.** Less than human or not worthy of a human being.<br>**2.** Unfit for human beings. | *"In academic literature, subhuman designates less than human or not worthy of a human being."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superhuman]] | adjective | **1.** Above or beyond the human or demanding more than human power or endurance. | *"The simple consciousness that superhuman strain was no longer required had at once put a period to her power to continue it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unhuman]] | adjective | **1.** Divested of human qualities or attributes. | *"Hideous and soulless dwellers underground, they knew not old age; a sword could hew them asunder, but before it reached their deep-seated life, their unhuman strength had plucked a man apart."* — Poul Anderson, *The Valor of Cappen Varra* |
| [[unhumorous]] | adjective | **1.** Lacking humor; - truman capote. | *"In academic literature, unhumorous designates lacking humor; - truman capote."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · HUM
  </div>
</div>
