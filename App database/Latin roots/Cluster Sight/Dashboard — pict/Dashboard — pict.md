---
status: unread
type: root_dashboard
---
# Dashboard — pict
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pict-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“painted or depicted”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking through clear glass and observing every fine detail in view.</span>
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

The root **pict** means painted or depicted. It refers to coloring a surface with pigments or painting a picture. In English, this root forms words such as *depict*, *depiction*, *depictive*, and *pictogram*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: painted or depicted
> The root **pict** means painted or depicted. It refers to coloring a surface with pigments or painting a picture. In English, this root forms words such as *depict*, *depiction*, *depictive*, and *pictogram*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Painted or depicted</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *depict* and *depiction*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pict** comes from a Latin word that means *"painted or depicted"*.
  - At its core, it describes painted or depicted.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **pict** in an English word, think of **seeing clearly and observing details**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of painted or depicted.
  - **Mental & Social**: How people experience, organize, or communicate about painted or depicted.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Depict**: To show or represent by a drawing, painting, or other art form. 2. To portray in words.
  - **Depiction**: The action of depicting something, or a representation of something in art or literature.
  - **Depictive**: Serving to depict, illustrate, or vividly represent.
  - **Pictogram**: A pictorial symbol for a word or phrase, used in maps, road signs, and computer interfaces.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pict</mark>, think of <mark class="hl-def">seeing clearly and observing details</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Participial Base:** *pict-* $\to$ *picture*, *pictorial*, *picturable*.
- **Directional Prefixation:**
  - `de-` + *pict* $\to$ *depict* (to represent by drawing or words), *depiction*, *depictive*.
- **Hybrid Formations:**
  - `pict-` + Greek `-graph` $\to$ *pictograph*, *pictography*, *pictogram*.
  - `pict-` + French `-esque` $\to$ *picturesque* (resembling a beautiful painting).

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

### 1. Visual Art & Photographic Media
- *picture* (a painting, drawing, or photograph).
- *pictorial* (of or expressed in pictures; illustrated).

### 2. Narrative & Graphic Representation
- *depict* (to show or represent by a drawing, painting, or other art form; portray in words).
- *depiction* (the action or result of depicting something).
- *depictive* (serving to depict or represent vividly).

### 3. Aesthetics & Landscape
- *picturesque* (visually attractive, especially in a quaint or charming manner like a painting).

### 4. Iconography & Semiotics
- *pictograph* (a pictorial symbol for a word or phrase, as in early writing systems).
- *pictogram* (a pictorial graphic symbol conveying meaning through visual resemblance).

---

## 🔀 4. Prefix & Combining Dynamics on pict

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `pict-` + `-ure` | Nominal result | An image or visual portrait captured in media | *picture* |
| `pict-` + `-orial` | Relational adjectival | Expressed in or consisting of illustrated imagery | *pictorial* |
| `pict-` + `-esque` | Aesthetic styling | Possessing the textured beauty suited to a canvas | *picturesque* |
| `de-` + `pict` | Intensive representation | Portraying a character, scene, or event in detail | *depict, depiction* |
| `pict-` + `-o-graph` | Semiotic compound | An ancient or modern picture symbol conveying information | *pictograph* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Visual Arts & Art History:** Linear perspective, Dutch golden age still-life pictures, portraiture.
- **Landscape Architecture & Aesthetics:** The 18th-century Picturesque movement (Capability Brown, Gilpin).
- **Semiotics & Information Design:** Pictograms in airport wayfinding, international hazard symbols (OSHA).
- **Cognitive Psychology:** Mental imagery, dual-coding theory (Paivio's verbal vs pictorial memory).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[depict]] | verb | **1.** Show in, or as in, a picture.<br>**2.** Give a description of. | *"When I depict it as a beautiful case, you see, miss,” Mr."* — Charles Dickens, *Bleak House* |
| [[depicted]] | verb | **1.** Show in, or as in, a picture.<br>**2.** Give a description of. | *"Guppy, with his hair flattened down upon his head and woe depicted in his face, looking up at me."* — Charles Dickens, *Bleak House* |
| [[depicting]] | noun | **1.** A representation by picture or portraiture.<br>**2.** Show in, or as in, a picture. | *"Goldwin Smith has truly observed that “metaphor has been exhausted in depicting the perfection of it, combined with the narrowness of her field;” and he has justly added that we need not go beyond her own comparison to the art of a miniature painter."* — Jane Austen, *Pride and Prejudice* |
| [[depiction]] | noun | **1.** A graphic or vivid verbal description.<br>**2.** A representation by picture or portraiture. | *"In academic literature, depiction designates a graphic or vivid verbal description."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depictive]] | adjective | **1.** Depicted in a recognizable manner. | *"In academic literature, depictive designates depicted in a recognizable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epictetus]] | noun | **1.** Greek philosopher who was a stoic (circa 50-130). | *"The story of Epictetus can be more briefly told, for there is very little to tell.[52] He was born at Hierapolis in Phrygia:--he was the slave of Nero's freedman Epaphroditus, and somehow managed to hear the lectures of the Stoic Musonius."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[pictograph]] | noun | **1.** A graphic character used in picture writing. | *"But these traces, and such hieroglyphics, or, to be more exact pictographs, as I have been able to decipher from the old documents, tell of one country, or perhaps it was only a city, over which this great golden idol of Quitzel presided."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[pictographic]] | adjective | **1.** Consisting of or characterized by the use of pictographs. | *"On the sculptured stones in the Copan valley there are characters which seem to resemble very ancient writing, but this pictographic writing is largely untranslatable."* — Victor Appleton, *Tom Swift in the Land of Wonders; Or, The Underground Search for the Idol of Gold* |
| [[pictor]] | noun | **1.** A constellation in the southern hemisphere near dorado and columba. | *"Pictor Ignotus. {Florence, 15--.} I could have painted pictures like that youth’s Ye praise so."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pictorial]] | noun | **1.** A periodical (magazine or newspaper) containing many pictures.<br>**2.** Pertaining to or consisting of pictures. | *"Rochester’s master-key, admitted us to the tapestried room, with its great bed and its pictorial cabinet."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pictorially]] | adverb | **1.** In a pictorial manner. | *"In academic literature, pictorially designates in a pictorial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pictural]] | adjective | **1.** Pertaining to or consisting of pictures. | *"In academic literature, pictural designates pertaining to or consisting of pictures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[picture]] | noun | **1.** A visual representation (of an object or scene or person or abstraction) produced on a surface.<br>**2.** Graphic art consisting of an artistic composition made by applying paints to a surface. | *"So either by thy picture or my love, Thyself away, art present still with me, For thou not farther than my thoughts canst move, And I am still with them, and they with thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pictured]] | verb | **1.** Imagine; conceive of; see in one's mind.<br>**2.** Show in, or as in, a picture. | *"She already saw the consequences and pictured the terrible scenes that would result if the three boys were obliged to live closely together."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[picturesque]] | adjective | **1.** Suggesting or suitable for a picture; pretty as a picture.<br>**2.** Strikingly expressive. | *"Who would make the vulgar very picturesque and faithful by putting back the hands upon the clock of time and cancelling a few hundred years of history."* — Charles Dickens, *Bleak House* |
| [[picturesquely]] | adverb | **1.** In a picturesque manner. | *"Peter Shelby put that objection much more picturesquely than Lee Greenfield," Aunt Augusta snapped."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[picturesqueness]] | noun | **1.** The quality of being strikingly expressive or vivid.<br>**2.** Visually vivid and pleasing. | *"The natural aptitude of the French for seizing the picturesqueness of things seems to be peculiarly evinced in what paintings and engravings they have of their whaling scenes."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[picturing]] | noun | **1.** Visual imagery.<br>**2.** Visual representation as by photography or painting. | *"I had been looking at the Ghost’s Walk lying in a deep shade of masonry afar off and picturing to myself the female shape that was said to haunt it when I became aware of a figure approaching through the wood."* — Charles Dickens, *Bleak House* |
| [[undepicted]] | adjective | **1.** Not pictured. | *"In academic literature, undepicted designates not pictured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpictured]] | adjective | **1.** Not pictured. | *"Some love might come across his life, and purify him, and shield him from those sins that seemed to be already stirring in spirit and in flesh—those curious unpictured sins whose very mystery lent them their subtlety and their charm."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[unpicturesque]] | adjective | **1.** Without beauty or charm. | *"In academic literature, unpicturesque designates without beauty or charm."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PICT
  </div>
</div>
