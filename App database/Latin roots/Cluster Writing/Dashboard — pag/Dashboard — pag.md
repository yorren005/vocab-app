---
status: unread
type: root_dashboard
---
# Dashboard — pag
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pag-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“page or fastened strip”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Carving clear dark letters onto paper to preserve thoughts in writing.</span>
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

The root **pag** means page or fastened strip. It refers to a written page, fastened sheet of parchment, or leaf. In English, this root forms words such as *page*, *paginate*, *pagination*, and *pageboy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: page or fastened strip
> The root **pag** means page or fastened strip. It refers to a written page, fastened sheet of parchment, or leaf. In English, this root forms words such as *page*, *paginate*, *pagination*, and *pageboy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Page or fastened strip</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *page* and *paginate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pag** comes from a Latin word that means *"page or fastened strip"*.
  - At its core, it describes page or fastened strip.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **pag** in an English word, think of **writing, records, and written words**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of page or fastened strip.
  - **Mental & Social**: How people experience, organize, or communicate about page or fastened strip.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Page**: One side of a leaf of something written or printed.
  - **Paginate**: To assign numbers to the pages of a book, report, or other document.
  - **Pagination**: The sequence of numbers assigned to pages in a book or document.
  - **Pageboy**: A youth who is a personal attendant to a person of high rank.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pag</mark>, think of <mark class="hl-def">writing, records, and written words</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `pag-` / `pagin-` (< Latin *pāgina*): Base nominal and verbal root.
- **Prefix Machinery**:
  - `re-` ("again, anew"): *repaginate, repagination*.
- **Suffixal Formations**:
  - `-ate`: *paginate*.
  - `-ation`: *pagination, repagination*.
  - `-boy`: *pageboy*.

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
                      ┌── The Physical & Digital Leaf: page
                      │
   [pag] ─────────────┼── Book Design & Numbering: paginate, pagination, repaginate, repagination
 (Fastened Leaf)      │
                      └── Attendant & Hairstyle: pageboy
```

---

## 🔀 4. Prefix & Combining Dynamics on pag
- **`pag-` + `-inate`**: *paginate* — to number the pages of a book or document.
- **`pagin-` + `-ation`**: *pagination* — the sequence of numbers assigned to pages in a book.
- **`re-` + `paginate`**: *repaginate* — to calculate and assign new page numbers after editing text.
- **`page-` + `boy`**: *pageboy* — a medieval youth in training for knighthood; a rounded bob hairstyle.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Publishing & Editorial Production**: Typesetting layouts; running heads and *pagination*; folio numbering.
- **Computer Science & Web Development**: Web *pages*; single-page applications (SPAs); memory *paging* in operating systems.
- **Archival Science & Paleography**: Folio Recto ($r$) and Verso ($v$) *page* indexing.
- **Fashion & Hair Styling**: The classic *pageboy* haircut (popularized in the 1950s).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[pagad]] | noun | **1.** A terrorist organization in south africa formed in 1996 to fight drug lords; evolved into a vigilante group with anti-western views closely allied with qibla; is believed to have ties to islamic extremists in the middle east; is suspected of conducting bouts of urban terrorism. | *"In academic literature, pagad designates a terrorist organization in south africa formed in 1996 to fight drug lords; evolved into a vigilante group with anti-western views closely allied with qibla; is believed to have ties to islamic extremists in the middle east; is suspected of conducting bouts of urban terrorism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagan]] | noun | **1.** A person who does not acknowledge your god.<br>**2.** A person who follows a polytheistic or pre-christian religion (not a christian or muslim or jew). | *"What a pagan rascal is this, an infidel!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paganini]] | noun | **1.** Italian violinist and composer of music for the violin (1782-1840). | *"In academic literature, paganini designates italian violinist and composer of music for the violin (1782-1840)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paganise]] | verb | **1.** Make pagan in character. | *"In academic literature, paganise designates make pagan in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paganism]] | noun | **1.** Any of various religions other than christianity or judaism or islamism. | *"He had persistently elevated Hellenic Paganism at the expense of Christianity; yet in that civilization an illegal surrender was not certain disesteem."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[paganize]] | verb | **1.** Make pagan in character. | *"In academic literature, paganize designates make pagan in character."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[page]] | noun | **1.** One side of one leaf (of a book or magazine or newspaper or letter etc.) or the written or pictorial matter it contains.<br>**2.** English industrialist who pioneered in the design and manufacture of aircraft (1885-1962). | *"A Page, servant to the Countess of Rossillon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pageant]] | noun | **1.** An elaborate representation of scenes from history etc; usually involves a parade with rich costumes.<br>**2.** A rich and spectacular ceremony. | *"If you will see a pageant truly played Between the pale complexion of true love And the red glow of scorn and proud disdain, Go hence a little, and I shall conduct you, If you will mark it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pageantry]] | noun | **1.** A rich and spectacular ceremony.<br>**2.** An elaborate representation of scenes from history etc; usually involves a parade with rich costumes. | *"This, my last boon, give me, For such kindness must relieve me, That you aptly will suppose What pageantry, what feats, what shows, What minstrelsy, and pretty din, The regent made in Mytilene To greet the king."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pageboy]] | noun | **1.** A boy who is employed to run errands.<br>**2.** A smooth hair style with the ends of the hair curled inward. | *"His satellites—the senior clerk, a countinghouse clerk, a scullery maid, a cook, two old women, a little pageboy, the coachman, and various domestic serfs—were seeing him off."* — graf Leo Tolstoy, *War and Peace* |
| [[pagellus]] | noun | **1.** Sea breams. | *"In academic literature, pagellus designates sea breams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pager]] | noun | **1.** An electronic device that generates a series of beeps when the person carrying it is being paged. | *"In academic literature, pager designates an electronic device that generates a series of beeps when the person carrying it is being paged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paget]] | noun | **1.** English pathologist who discovered the cause of trichinosis (1814-1899). | *"In the following carriage were the honourable Mrs Paget, Miss de Courcy and the honourable Gerald Ward A."* — James Joyce, *Ulysses* |
| [[paginate]] | verb | **1.** Number the pages of a book or manuscript. | *"In academic literature, paginate designates number the pages of a book or manuscript."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagination]] | noun | **1.** The system of numbering pages. | *"In academic literature, pagination designates the system of numbering pages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paging]] | noun | **1.** Calling out the name of a person (especially by a loudspeaker system).<br>**2.** The system of numbering pages. | *"In academic literature, paging designates calling out the name of a person (especially by a loudspeaker system)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagoda]] | noun | **1.** An asian temple; usually a pyramidal tower with an upward curving roof. | *"The mere gateway was of the size of a palace in itself, rising pagoda-like, in many retreating stories, each story fringed with tile-roofing."* — Jack London, *The Jacket (The Star-Rover)* |
| [[pagophila]] | noun | **1.** A genus of laridae. | *"In academic literature, pagophila designates a genus of laridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagophilus]] | noun | **1.** Harp seals. | *"In academic literature, pagophilus designates harp seals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagrus]] | noun | **1.** A genus of sparidae. | *"In academic literature, pagrus designates a genus of sparidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paguridae]] | noun | **1.** Hermit crabs. | *"In academic literature, paguridae designates hermit crabs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pagurus]] | noun | **1.** Type genus of the family paguridae. | *"In academic literature, pagurus designates type genus of the family paguridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propaganda]] | noun | **1.** Information that is spread for the purpose of promoting some cause. | *"In 1916, the centenary of the beginning of savings banks in this country, a nation-wide propaganda was undertaken by the American Bankers' Association for the encouragement of savings. § 4. #Investment banking#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[propagandise]] | verb | **1.** Subject to propaganda.<br>**2.** Spread by propaganda. | *"In academic literature, propagandise designates subject to propaganda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propagandist]] | noun | **1.** A person who disseminates messages calculated to assist some cause or some government.<br>**2.** Of or relating to or characterized by propaganda. | *"THE FREE-TRADE PROPAGANDISTS OF ENGLAND."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[propagandistic]] | adjective | **1.** Of or relating to or characterized by propaganda. | *"In academic literature, propagandistic designates of or relating to or characterized by propaganda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propagandize]] | verb | **1.** Subject to propaganda.<br>**2.** Spread by propaganda. | *"In academic literature, propagandize designates subject to propaganda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propagate]] | verb | **1.** Transmit from one generation to the next.<br>**2.** Travel through the air. | *"Attend me, then: I went to Antioch, Where, as thou know’st, against the face of death, I sought the purchase of a glorious beauty, From whence an issue I might propagate, Are arms to princes, and bring joys to subjects."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[propagation]] | noun | **1.** The spreading of something (a belief or practice) into new regions.<br>**2.** The act of producing offspring or multiplying by such production. | *"This we came not to Only for propagation of a dower Remaining in the coffer of her friends, From whom we thought it meet to hide our love Till time had made them for us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[propagative]] | adjective | **1.** Characterized by propagation or relating to propagation. | *"In academic literature, propagative designates characterized by propagation or relating to propagation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propagator]] | noun | **1.** Someone who propagates plants (as under glass).<br>**2.** Someone who spreads the news. | *"In academic literature, propagator designates someone who propagates plants (as under glass)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PAG
  </div>
</div>
